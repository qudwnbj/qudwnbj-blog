import React from 'react';
import { PostListPageProps } from 'types/posts';

const PostListController: React.FC<PostListPageProps> = ({ data }) => {
  return <div>{data.category}</div>;
};

export default PostListController;
