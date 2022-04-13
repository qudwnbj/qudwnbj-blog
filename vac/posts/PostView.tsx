import React from 'react';
import { PostPageProps } from 'types/posts';

export interface PostViewProps extends PostPageProps {}

const PostView: React.FC<PostViewProps> = ({ title, date, content, categoryList }) => {
  return <div>{content}</div>;
};

export default PostView;
