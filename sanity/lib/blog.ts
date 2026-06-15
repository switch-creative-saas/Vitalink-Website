import { sanityClient } from "./client";
import { isSanityConfigured } from "./env";
import {
  allPostsQuery,
  categoriesQuery,
  featuredPostsQuery,
  popularPostsQuery,
  postBySlugQuery,
  postsByCategoryQuery,
  postsByTagQuery,
  searchPostsQuery,
  tagsQuery,
} from "../queries/blog";
import type { BlogCategory, BlogPost } from "./types";
export { slugify } from "./slugify";
export type { BlogCategory, BlogImage, BlogPost } from "./types";

const emptyPosts: BlogPost[] = [];
const emptyCategories: BlogCategory[] = [];
const emptyTags: string[] = [];

async function fetchFromSanity<T>(
  query: string,
  params: Record<string, string> = {},
  tags: string[] = ["blogPost"]
): Promise<T | null> {
  if (!isSanityConfigured) return null;

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60, tags },
    });
  } catch (error) {
    console.error("Sanity API error:", error);
    return null;
  }
}

export async function getAllPosts() {
  return (await fetchFromSanity<BlogPost[]>(allPostsQuery)) ?? emptyPosts;
}

export async function getFeaturedPosts() {
  return (await fetchFromSanity<BlogPost[]>(featuredPostsQuery)) ?? emptyPosts;
}

export async function getPopularPosts() {
  return (await fetchFromSanity<BlogPost[]>(popularPostsQuery)) ?? emptyPosts;
}

export async function getPostBySlug(slug: string) {
  return await fetchFromSanity<BlogPost | null>(postBySlugQuery, { slug });
}

export async function getPostsByCategory(slug: string) {
  return (
    (await fetchFromSanity<BlogPost[]>(postsByCategoryQuery, { slug }, [
      "blogPost",
      "category",
    ])) ?? emptyPosts
  );
}

export async function getPostsByTag(tag: string) {
  return (await fetchFromSanity<BlogPost[]>(postsByTagQuery, { tag })) ?? emptyPosts;
}

export async function searchPosts(query: string) {
  const sanitizedQuery = `${query.trim()}*`;
  if (sanitizedQuery.length < 3) return emptyPosts;

  return (
    (await fetchFromSanity<BlogPost[]>(searchPostsQuery, { query: sanitizedQuery })) ??
    emptyPosts
  );
}

export async function getAllCategories() {
  return (
    (await fetchFromSanity<BlogCategory[]>(categoriesQuery, {}, ["category"])) ??
    emptyCategories
  );
}

export async function getAllTags() {
  return (await fetchFromSanity<string[]>(tagsQuery)) ?? emptyTags;
}
