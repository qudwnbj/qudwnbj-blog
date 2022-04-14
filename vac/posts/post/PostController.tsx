import React from 'react';
import PostView from 'vac/posts/post/PostView';
import type { PostPageProps } from 'types/posts';
import type { PostViewProps } from 'vac/posts/post/PostView';

const PostController: React.FC<PostPageProps> = ({ data }) => {
  const viewProps: PostViewProps = {
    data,
  };
  return <PostView {...viewProps} />;
};

export default PostController;
