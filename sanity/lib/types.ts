export interface BlogImage {
  url?: string;
  title?: string;
  alt?: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
}

export interface BlogCategory {
  title: string;
  slug: string;
  description?: string;
}

export interface BlogPost {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: BlogImage;
  featuredImageAlt?: string;
  content?: unknown[];
  author: string;
  authorBio?: string;
  authorPhoto?: BlogImage;
  authorPosition?: string;
  category?: string;
  categorySlug?: string;
  tags?: string[];
  publishedDate: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredArticle?: boolean;
  readingTime?: number;
  status?: string;
}
