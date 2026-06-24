import { getAllTagSlugs, getAllTags, getPostsByTagSlug } from "@/sanity/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { SectionContainer } from "@/components/landing/section-container";
import { Metadata } from "next";
import Link from "next/link";

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllTagSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getAllTags();
  const tagName = tags.find((tag) => tag.slug === slug)?.name || slug.split("-").join(" ");

  return {
    title: `${tagName} | VitaLink Insights`,
    description: `Explore articles tagged with ${tagName} on VitaLink Insights - healthcare innovation and public health intelligence.`,
    alternates: {
      canonical: `https://vitalink.africa/tag/${slug}`,
    },
    openGraph: {
      title: `${tagName} | VitaLink Insights`,
      description: `Explore articles tagged with ${tagName} on VitaLink Insights - healthcare innovation and public health intelligence.`,
      url: `https://vitalink.africa/tag/${slug}`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tags = await getAllTags();
  const tagName = tags.find((tag) => tag.slug === slug)?.name || slug.split("-").join(" ");
  const posts = await getPostsByTagSlug(slug);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      <section className="bg-white pt-28 pb-14 lg:pt-36 lg:pb-20">
        <SectionContainer>
          <div className="max-w-4xl">
            <Link href="/blog" className="text-sm font-medium text-[#2563EB] hover:underline">
              Back to Blog
            </Link>
            <h1 className="mt-5 text-4xl font-bold text-foreground sm:text-5xl">
              #{tagName}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore articles tagged with {tagName}.
            </p>
          </div>
        </SectionContainer>
      </section>

      <SectionContainer className="py-14 lg:py-20">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-xl border border-border bg-white p-8 text-center shadow-sm">
            <p className="mb-4 text-muted-foreground">No articles found with this tag.</p>
            <Link href="/blog" className="font-medium text-[#2563EB] hover:underline">
              Browse all articles
            </Link>
          </div>
        )}
      </SectionContainer>
      <FooterSection />
    </main>
  );
}

export const revalidate = 60;
