import React from 'react';
import Components from 'vac/posts/post/components';
import type { PostPageProps } from 'types/posts';

export interface PostViewProps extends PostPageProps {}

const PostView: React.FC<PostViewProps> = ({ data }) => {
  return <Components.Content dangerouslySetInnerHTML={{ __html: data.content }} />;
};

export default PostView;
