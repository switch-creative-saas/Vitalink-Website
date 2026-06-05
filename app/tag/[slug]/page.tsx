import { getBlogPostsByTag, getAllTags } from "@/lib/contentful";
import { BlogCard } from "@/components/blog/blog-card";
import { SectionContainer } from "@/components/landing/section-container";
import { Metadata } from "next";
import Link from "next/link";

interface TagPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    slug: tag.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tagName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${tagName} | VitaLink Insights`,
    description: `Explore articles tagged with ${tagName} on VitaLink Insights - healthcare innovation and public health intelligence.`,
    openGraph: {
      title: `${tagName} | VitaLink Insights`,
      description: `Explore articles tagged with ${tagName} on VitaLink Insights - healthcare innovation and public health intelligence.`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const tagName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const posts = await getBlogPostsByTag(tagName);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Tag Header */}
      <section className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] py-16">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-block mb-4">
              <span className="text-white/80 hover:text-white text-sm">
                ← Back to Blog
              </span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              #{tagName}
            </h1>
            <p className="text-lg text-white/90">
              Explore articles tagged with {tagName}.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Articles Grid */}
      <SectionContainer className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.sys.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No articles found with this tag.</p>
              <Link href="/blog">
                <button className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#2563EB]/90">
                  Browse All Articles
                </button>
              </Link>
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  );
}

export const revalidate = 3600; // Revalidate every hour
