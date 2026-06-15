import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getFeaturedPosts,
  getPopularPosts,
  slugify,
} from "@/sanity/lib/blog";
import { BlogCard, Sidebar } from "@/components/blog/blog-card";
import { GlobeBackground } from "@/components/GlobeBackground";
import { NewsletterSignup } from "@/components/blog/newsletter-signup";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { SectionContainer } from "@/components/landing/section-container";
import { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vitalink.africa";

export const metadata: Metadata = {
  title: "VitaLink Insights | Healthcare Innovation Across Africa",
  description:
    "Healthcare innovation, public health intelligence, digital transformation, and healthcare infrastructure across Africa.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "VitaLink Insights",
    description:
      "Healthcare innovation, public health intelligence, digital transformation, and healthcare infrastructure across Africa.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VitaLink Insights",
    description:
      "Healthcare innovation, public health intelligence, digital transformation, and healthcare infrastructure across Africa.",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const [allPosts, featuredPosts, categories, tags, popularPosts] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories(),
    getAllTags(),
    getPopularPosts(),
  ]);

  const featuredPost = featuredPosts[0] || allPosts[0] || null;
  const recentPosts = allPosts;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />

      <section className="relative overflow-hidden bg-white pt-28 pb-16 lg:pt-36 lg:pb-24">
        <GlobeBackground />
        <SectionContainer>
          <div className="relative z-10 max-w-4xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold mb-6">
              VitaLink Insights
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
              VitaLink Insights
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Healthcare innovation, public health intelligence, digital transformation,
              and healthcare infrastructure across Africa.
            </p>
            <Link
              href="/search"
              className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground shadow-sm hover:border-[#2563EB]/30 hover:text-[#2563EB] transition-colors"
            >
              <Search className="h-4 w-4" />
              Search insights
            </Link>
          </div>
        </SectionContainer>
      </section>

      <SectionContainer className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-12">
            {featuredPost && (
              <section>
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                      Featured Article
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-foreground">
                      Editor&apos;s pick
                    </h2>
                  </div>
                </div>
                <BlogCard post={featuredPost} featured />
              </section>
            )}

            <section>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                  Recent Articles
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  Latest thinking from VitaLink
                </h2>
              </div>
              {recentPosts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {recentPosts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-white p-8 text-muted-foreground shadow-sm">
                  New VitaLink insights will appear here once posts are published in Sanity.
                </div>
              )}
            </section>

            <section>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                  Categories
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  Explore by topic
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.slug || category.title}
                    href={`/category/${category.slug || slugify(category.title)}`}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted-foreground hover:border-[#2563EB]/40 hover:text-[#2563EB] transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </section>

            <NewsletterSignup variant="hero" />
          </div>

          <Sidebar categories={categories} popularPosts={popularPosts} tags={tags} />
        </div>
      </SectionContainer>

      <FooterSection />
    </main>
  );
}
