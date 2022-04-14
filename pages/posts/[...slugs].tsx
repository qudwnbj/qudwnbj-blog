import React from 'react';
import fs from 'fs';
import { join } from 'path';
import Head from 'next/head';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import markdownToHtml from 'lib/markdownToHtml';
import PostController from 'vac/posts/post/PostController';
import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { PostCategoryList, PostFrontmatter, PostPageProps } from 'types/posts';

interface PostParams extends NodeJS.Dict<string | string[]> {
  slugs: string[];
}

const Post: NextPage<PostPageProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.title} - qudwnbj</title>
      </Head>
      <PostController data={data} />
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
    categoryList.push({ name: postsCategories[i], count: posts.length });
  }

  const [fileDir, fileName] = params.slugs;
  const filePath = join(postsDirectory, `${fileDir}/${fileName}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const {
    data: { date, ...frontmatter },
    content,
  } = matter(fileContents);
  const contentToHtml = await markdownToHtml(content);

  return {
    props: {
      data: {
        ...(frontmatter as Omit<PostFrontmatter, 'date'>),
        date: dayjs(date as Date).valueOf(),
        content: contentToHtml,
        categoryList,
      },
    },
  };
};

export default Post;
