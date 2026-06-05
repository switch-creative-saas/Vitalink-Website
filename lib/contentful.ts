const CONTENTFUL_GRAPHQL_URL = "https://graphql.contentful.com/content/v1/spaces";
const CONTENTFUL_PREVIEW_URL = "https://graphql.contentful.com/content/v1/spaces";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const previewToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error(
    "CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN must be defined in environment variables"
  );
}

export interface Asset {
  title: string;
  url: string;
  width?: number;
  height?: number;
}

export interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: Asset | null;
  content: any;
  author: string;
  authorBio: string;
  authorPhoto: Asset | null;
  category: string;
  tags: string[];
  publishedDate: string;
  seoTitle: string;
  seoDescription: string;
  readingTime: number;
  status: "Draft" | "Published" | "Scheduled";
  featuredArticle: boolean;
}

interface ContentfulResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

interface BlogPostCollection {
  blogPostCollection: {
    items: BlogPost[];
  };
}

interface BlogPostSingle {
  blogPostCollection: {
    items: BlogPost[];
  };
}

async function fetchContentful<T>(
  query: string,
  preview = false
): Promise<T | null> {
  const url = `${CONTENTFUL_GRAPHQL_URL}/${spaceId}`;
  const token = preview ? (previewToken || accessToken) : accessToken;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 }, // ISR: Revalidate every hour
    });

    if (!response.ok) {
      console.error(`Contentful API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const result: ContentfulResponse<T> = await response.json();

    if (result.errors) {
      console.error(`GraphQL errors: ${result.errors.map((e) => e.message).join(", ")}`);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching from Contentful:", error);
    return null;
  }
}

const ALL_POSTS_QUERY = `
  query GetAllPosts($preview: Boolean) {
    blogPostCollection(preview: $preview, where: { status: "Published" }, order: publishedDate_DESC) {
      items {
        sys {
          id
          createdAt
          updatedAt
          publishedAt
        }
        title
        slug
        excerpt
        featuredImage {
          title
          url
          width
          height
        }
        author
        authorBio
        authorPhoto {
          title
          url
        }
        category
        tags
        publishedDate
        seoTitle
        seoDescription
        readingTime
        status
        featuredArticle
      }
    }
  }
`;

const FEATURED_POST_QUERY = `
  query GetFeaturedPost($preview: Boolean) {
    blogPostCollection(preview: $preview, where: { status: "Published", featuredArticle: true }, limit: 1) {
      items {
        sys {
          id
          createdAt
          updatedAt
          publishedAt
        }
        title
        slug
        excerpt
        featuredImage {
          title
          url
          width
          height
        }
        author
        authorBio
        authorPhoto {
          title
          url
        }
        category
        tags
        publishedDate
        seoTitle
        seoDescription
        readingTime
        status
        featuredArticle
      }
    }
  }
`;

const POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: String!, $preview: Boolean) {
    blogPostCollection(preview: $preview, where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
          createdAt
          updatedAt
          publishedAt
        }
        title
        slug
        excerpt
        featuredImage {
          title
          url
          width
          height
        }
        content {
          json
        }
        author
        authorBio
        authorPhoto {
          title
          url
        }
        category
        tags
        publishedDate
        seoTitle
        seoDescription
        readingTime
        status
        featuredArticle
      }
    }
  }
`;

const POSTS_BY_CATEGORY_QUERY = `
  query GetPostsByCategory($category: String!, $preview: Boolean) {
    blogPostCollection(preview: $preview, where: { status: "Published", category: $category }, order: publishedDate_DESC) {
      items {
        sys {
          id
          createdAt
          updatedAt
          publishedAt
        }
        title
        slug
        excerpt
        featuredImage {
          title
          url
          width
          height
        }
        author
        authorBio
        authorPhoto {
          title
          url
        }
        category
        tags
        publishedDate
        seoTitle
        seoDescription
        readingTime
        status
        featuredArticle
      }
    }
  }
`;

const POSTS_BY_TAG_QUERY = `
  query GetPostsByTag($tag: String!, $preview: Boolean) {
    blogPostCollection(preview: $preview, where: { status: "Published", tags_contains: $tag }, order: publishedDate_DESC) {
      items {
        sys {
          id
          createdAt
          updatedAt
          publishedAt
        }
        title
        slug
        excerpt
        featuredImage {
          title
          url
          width
          height
        }
        author
        authorBio
        authorPhoto {
          title
          url
        }
        category
        tags
        publishedDate
        seoTitle
        seoDescription
        readingTime
        status
        featuredArticle
      }
    }
  }
`;

const SEARCH_QUERY = `
  query SearchPosts($query: String!, $preview: Boolean) {
    blogPostCollection(preview: $preview, where: { status: "Published", title_contains: $query }, order: publishedDate_DESC) {
      items {
        sys {
          id
          createdAt
          updatedAt
          publishedAt
        }
        title
        slug
        excerpt
        featuredImage {
          title
          url
          width
          height
        }
        author
        authorBio
        authorPhoto {
          title
          url
        }
        category
        tags
        publishedDate
        seoTitle
        seoDescription
        readingTime
        status
        featuredArticle
      }
    }
  }
`;

const CATEGORIES_QUERY = `
  query GetCategories($preview: Boolean) {
    blogPostCollection(preview: $preview, where: { status: "Published" }) {
      items {
        category
      }
    }
  }
`;

const TAGS_QUERY = `
  query GetTags($preview: Boolean) {
    blogPostCollection(preview: $preview, where: { status: "Published" }) {
      items {
        tags
      }
    }
  }
`;

const POPULAR_POSTS_QUERY = `
  query GetPopularPosts($limit: Int!, $preview: Boolean) {
    blogPostCollection(preview: $preview, where: { status: "Published" }, order: publishedDate_DESC, limit: $limit) {
      items {
        sys {
          id
          createdAt
          updatedAt
          publishedAt
        }
        title
        slug
        excerpt
        featuredImage {
          title
          url
          width
          height
        }
        author
        authorBio
        authorPhoto {
          title
          url
        }
        category
        tags
        publishedDate
        seoTitle
        seoDescription
        readingTime
        status
        featuredArticle
      }
    }
  }
`;

export async function getAllPosts(preview = false): Promise<BlogPost[]> {
  const data = await fetchContentful<BlogPostCollection>(
    ALL_POSTS_QUERY,
    preview
  );
  return data?.blogPostCollection.items || [];
}

export async function getFeaturedPosts(preview = false): Promise<BlogPost[]> {
  const data = await fetchContentful<BlogPostSingle>(
    FEATURED_POST_QUERY,
    preview
  );
  return data?.blogPostCollection.items || [];
}

export async function getPostBySlug(slug: string, preview = false): Promise<BlogPost | null> {
  const data = await fetchContentful<BlogPostSingle>(
    POST_BY_SLUG_QUERY,
    preview
  );
  return data?.blogPostCollection.items[0] || null;
}

export async function getPostsByCategory(category: string, preview = false): Promise<BlogPost[]> {
  const data = await fetchContentful<BlogPostCollection>(
    POSTS_BY_CATEGORY_QUERY,
    preview
  );
  return data?.blogPostCollection.items || [];
}

export async function getPostsByTag(tag: string, preview = false): Promise<BlogPost[]> {
  const data = await fetchContentful<BlogPostCollection>(
    POSTS_BY_TAG_QUERY,
    preview
  );
  return data?.blogPostCollection.items || [];
}

export async function searchPosts(query: string, preview = false): Promise<BlogPost[]> {
  const data = await fetchContentful<BlogPostCollection>(
    SEARCH_QUERY,
    preview
  );
  return data?.blogPostCollection.items || [];
}

export async function getAllCategories(preview = false): Promise<string[]> {
  const data = await fetchContentful<BlogPostCollection>(
    CATEGORIES_QUERY,
    preview
  );
  if (!data) return [];
  const categories = new Set(data.blogPostCollection.items.map((item) => item.category));
  return Array.from(categories);
}

export async function getAllTags(preview = false): Promise<string[]> {
  const data = await fetchContentful<BlogPostCollection>(
    TAGS_QUERY,
    preview
  );
  if (!data) return [];
  const tags = new Set(data.blogPostCollection.items.flatMap((item) => item.tags));
  return Array.from(tags);
}

export async function getPopularPosts(preview = false, limit = 5): Promise<BlogPost[]> {
  const data = await fetchContentful<BlogPostCollection>(
    POPULAR_POSTS_QUERY,
    preview
  );
  return data?.blogPostCollection.items || [];
}
