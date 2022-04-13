import React from 'react';
import PostView from 'vac/posts/PostView';
import type { PostPageProps } from 'types/posts';
import type { PostViewProps } from 'vac/posts/PostView';

const PostController: React.FC<PostPageProps> = ({ title, date, content, categoryList }) => {
  const viewProps: PostViewProps = {
    title,
    date,
    content,
    categoryList,
  };
  return <PostView {...viewProps} />;
};

export default PostController;
