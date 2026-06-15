import { getAllCategories, getPostsByCategory } from "@/sanity/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { SectionContainer } from "@/components/landing/section-container";
import { Metadata } from "next";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((item) => item.slug === slug);
  const title = category?.title || "Category";

  return {
    title: `${title} | VitaLink Insights`,
    description:
      category?.description ||
      `Explore ${title} articles on VitaLink Insights - healthcare innovation and public health intelligence.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((item) => item.slug === slug);
  const title = category?.title || slug.split("-").join(" ");
  const posts = await getPostsByCategory(slug);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      <section className="bg-white pt-28 pb-14 lg:pt-36 lg:pb-20">
        <SectionContainer>
          <div className="max-w-4xl">
            <Link href="/blog" className="text-sm font-medium text-[#2563EB] hover:underline">
              Back to Blog
            </Link>
            <h1 className="mt-5 text-4xl font-bold capitalize text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {category?.description || `Explore insights and articles about ${title}.`}
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
            <p className="mb-4 text-muted-foreground">No articles found in this category.</p>
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
