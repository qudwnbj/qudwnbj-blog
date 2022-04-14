export interface PostCategoryList {
  name: string;
  count: number;
}

export interface PostFrontmatter {
  title: string;
  date: number;
  category?: string;
}

export interface PostPageProps {
  data: {
    content: string;
    categoryList: PostCategoryList[];
  } & PostFrontmatter;
}

export interface PostListPageProps {
  data: {
    category: string;
    postList: PostFrontmatter[];
    categoryList: PostCategoryList[];
  };
}
