import { searchPosts } from "@/sanity/lib/blog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (query.trim().length < 2) {
    return Response.json({ posts: [] });
  }

  const posts = await searchPosts(query);
  return Response.json({ posts });
}
