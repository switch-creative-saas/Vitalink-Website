import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getFeaturedPosts,
  getPopularPosts,
  slugify,
} from "@/sanity/lib/blog";
import { BlogCard, Sidebar } from "@/components/blog/blog-card";
import { PageHero } from "@/components/landing/page-hero";
import { NewsletterSignup } from "@/components/blog/newsletter-signup";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { SectionContainer } from "@/components/landing/section-container";
import { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vitalink.africa";

export const metadata: Metadata = {
  title: "VitaLink Blog",
  description:
    "Research, perspectives, and updates on healthcare infrastructure, AI in medicine, disease surveillance, and public health across Africa from the VitaLink team.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "VitaLink Blog",
    description:
      "Insights on healthcare infrastructure, AI in medicine, and public health across Africa.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VitaLink Insights",
    description:
      "Research and updates on healthcare infrastructure, AI in medicine, disease surveillance, and public health across Africa.",
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
    <main className="relative min-h-screen overflow-x-clip bg-white">
      <Navigation />

      <PageHero
        align="left"
        eyebrow="VitaLink Insights"
        title="Notes on running better care"
        lead="Guides, product updates and perspectives on hospital operations, AI in medicine and public health in Nigeria."
      >
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
        >
          <Search className="h-4 w-4" />
          Search articles
        </Link>
      </PageHero>

      <SectionContainer className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-12">
            {featuredPost && (
              <section>
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Featured Article
                    </p>
                    <h2 className="mt-2 text-2xl font-normal tracking-[-0.02em] text-ink">
                      Editor&apos;s pick
                    </h2>
                  </div>
                </div>
                <BlogCard post={featuredPost} featured />
              </section>
            )}

            <section>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Recent Articles
                </p>
                <h2 className="mt-2 text-2xl font-normal tracking-[-0.02em] text-ink">
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Categories
                </p>
                <h2 className="mt-2 text-2xl font-normal tracking-[-0.02em] text-ink">
                  Explore by topic
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.slug || category.title}
                    href={`/category/${category.slug || slugify(category.title)}`}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
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
