export interface PostCategoryList {
  name: string;
  totalPosts: number;
}

export interface PostFrontmatter {
  title: string;
  date: number;
}

export interface PostPageProps extends PostFrontmatter {
  content: string;
  categoryList: PostCategoryList[];
}
