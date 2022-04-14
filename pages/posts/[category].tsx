import React from 'react';
import fs from 'fs';
import { join } from 'path';
import Head from 'next/head';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import PostListController from 'vac/posts/post-list/PostListController';
import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next';
import type { PostCategoryList, PostFrontmatter, PostListPageProps } from 'types/posts';
import type { ParsedUrlQuery } from 'querystring';

interface PostListParams extends NodeJS.Dict<string | string[]> {
  category: string;
}

const PostList: NextPage<PostListPageProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Blog - qudwnbj</title>
      </Head>
      <PostListController data={data} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: GetStaticPathsResult<ParsedUrlQuery>['paths'] = [];
  const postsDirectory = join(process.cwd(), 'posts/blog');
  const postsCategories = fs.readdirSync(postsDirectory);

  for (let i = 0; i < postsCategories.length; i += 1) {
    paths.push({ params: { category: postsCategories[i] } });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostListPageProps, PostListParams> = async ({
  params,
}) => {
  if (!params) return { notFound: true };

  const categoryList: PostCategoryList[] = [];
  const postList: PostFrontmatter[] = [];
  const postsDirectory = join(process.cwd(), 'posts/blog');
  const postsCategories = fs.readdirSync(postsDirectory);

  for (let i = 0; i < postsCategories.length; i += 1) {
    const posts = fs.readdirSync(join(postsDirectory, postsCategories[i]));
    categoryList.push({ name: postsCategories[i], count: posts.length });
  }

  const categoryDirectory = join(postsDirectory, params.category);
  const categoryPosts = fs.readdirSync(categoryDirectory);

  for (let i = 0; i < categoryPosts.length; i += 1) {
    const postPath = join(categoryDirectory, categoryPosts[i]);
    const post = fs.readFileSync(postPath, 'utf-8');
    const {
      data: { date, ...frontmatter },
    } = matter(post);
    postList.push({
      ...(frontmatter as Omit<PostFrontmatter, 'date'>),
      date: dayjs(date as Date).valueOf(),
    });
  }

  return {
    props: {
      data: {
        category: params.category,
        postList,
        categoryList,
      },
    },
  };
};

export default PostList;
