import { createClient } from "contentful";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error(
    "CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN must be defined in environment variables"
  );
}

export const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
});

export const previewClient = createClient({
  space: spaceId,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || accessToken,
  host: "preview.contentful.com",
});

export interface BlogPostFields {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: {
    fields: {
      title: string;
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
    };
  };
  content: any;
  author: string;
  authorBio: string;
  authorPhoto: {
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  };
  category: string;
  tags: string[];
  publishedDate: string;
  seoTitle: string;
  seoDescription: string;
  readingTime: number;
  status: "Draft" | "Published" | "Scheduled";
  featuredArticle: boolean;
}

export interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: BlogPostFields;
}

export async function getAllBlogPosts(preview = false): Promise<BlogPost[]> {
  const client = preview ? previewClient : contentfulClient;
  
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.status": "Published",
    order: ["-fields.publishedDate"],
  });

  return response.items as unknown as BlogPost[];
}

export async function getFeaturedBlogPost(preview = false): Promise<BlogPost | null> {
  const client = preview ? previewClient : contentfulClient;
  
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.status": "Published",
    "fields.featuredArticle": true,
    limit: 1,
  });

  return response.items[0] as unknown as BlogPost || null;
}

export async function getBlogPostBySlug(slug: string, preview = false): Promise<BlogPost | null> {
  const client = preview ? previewClient : contentfulClient;
  
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  });

  return response.items[0] as unknown as BlogPost || null;
}

export async function getBlogPostsByCategory(category: string, preview = false): Promise<BlogPost[]> {
  const client = preview ? previewClient : contentfulClient;
  
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.status": "Published",
    "fields.category": category,
    order: ["-fields.publishedDate"],
  });

  return response.items as unknown as BlogPost[];
}

export async function getBlogPostsByTag(tag: string, preview = false): Promise<BlogPost[]> {
  const client = preview ? previewClient : contentfulClient;
  
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.status": "Published",
    "fields.tags": tag,
    order: ["-fields.publishedDate"],
  });

  return response.items as unknown as BlogPost[];
}

export async function searchBlogPosts(query: string, preview = false): Promise<BlogPost[]> {
  const client = preview ? previewClient : contentfulClient;
  
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.status": "Published",
    query: query,
    order: ["-fields.publishedDate"],
  });

  return response.items as unknown as BlogPost[];
}

export async function getAllCategories(preview = false): Promise<string[]> {
  const client = preview ? previewClient : contentfulClient;
  
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.status": "Published",
    select: ["fields.category"],
  });

  const categories = new Set<string>();
  response.items.forEach((item: any) => {
    if (item.fields.category) {
      categories.add(item.fields.category);
    }
  });

  return Array.from(categories);
}

export async function getAllTags(preview = false): Promise<string[]> {
  const client = preview ? previewClient : contentfulClient;
  
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.status": "Published",
    select: ["fields.tags"],
  });

  const tags = new Set<string>();
  response.items.forEach((item: any) => {
    if (item.fields.tags) {
      item.fields.tags.forEach((tag: string) => tags.add(tag));
    }
  });

  return Array.from(tags);
}

export async function getPopularPosts(preview = false, limit = 5): Promise<BlogPost[]> {
  const client = preview ? previewClient : contentfulClient;
  
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.status": "Published",
    order: ["-fields.publishedDate"],
    limit,
  });

  return response.items as unknown as BlogPost[];
}
