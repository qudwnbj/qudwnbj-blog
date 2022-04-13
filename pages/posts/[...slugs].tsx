import React from 'react';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import Head from 'next/head';
import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { PostCategoryList, PostFrontmatter, PostPageProps } from 'types/posts';
import PostController from 'vac/posts/PostController';

interface PostParams extends NodeJS.Dict<string | string[]> {
  slugs: string[];
}

const Post: NextPage<PostPageProps> = ({ title, date, content, categoryList }) => {
  return (
    <>
      <Head>
        <title>{title} - qudwnbj</title>
      </Head>
      <PostController title={title} date={date} content={content} categoryList={categoryList} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: GetStaticPathsResult<ParsedUrlQuery>['paths'] = [];
  const postsDirectory = join(process.cwd(), 'posts/blog');
  const postsCategories = fs.readdirSync(postsDirectory);

  for (let i = 0; i < postsCategories.length; i += 1) {
    const posts = fs.readdirSync(join(postsDirectory, postsCategories[i]));
    for (let j = 0; j < posts.length; j += 1) {
      const postFileName = posts[j].replace(/\.md$/, '');
      paths.push({ params: { slugs: [postsCategories[i], postFileName] } });
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps, PostParams> = async ({ params }) => {
  if (!params) return { notFound: true };

  const categoryList: PostCategoryList[] = [];
  const postsDirectory = join(process.cwd(), 'posts/blog');
  const postsCategories = fs.readdirSync(postsDirectory);

  for (let i = 0; i < postsCategories.length; i += 1) {
    const posts = fs.readdirSync(join(postsDirectory, postsCategories[i]));
    categoryList.push({ name: postsCategories[i], totalPosts: posts.length });
  }

  const [category, fileName] = params.slugs;
  const filePath = join(postsDirectory, `${category}/${fileName}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const {
    data: { date, ...frontmatter },
    content,
  } = matter(fileContents);

  return {
    props: {
      ...(frontmatter as Omit<PostFrontmatter, 'date'>),
      date: dayjs(date as Date).valueOf(),
      content,
      categoryList,
    },
  };
};

export default Post;
