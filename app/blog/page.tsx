import { getAllPosts, getFeaturedPosts, getAllCategories, getAllTags, getPopularPosts } from "@/lib/contentful";
import { BlogCard, Sidebar } from "@/components/blog/blog-card";
import { SectionContainer } from "@/components/landing/section-container";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "VitaLink Insights | Healthcare Innovation Blog",
  description: "Healthcare innovation, public health intelligence, digital transformation, and expert health education from VitaLink.",
  openGraph: {
    title: "VitaLink Insights | Healthcare Innovation Blog",
    description: "Healthcare innovation, public health intelligence, digital transformation, and expert health education from VitaLink.",
    type: "website",
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const [allPosts, featuredPosts, categories, tags, popularPosts] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories(),
    getAllTags(),
    getPopularPosts(),
  ]);

  const featuredPost = featuredPosts[0] || null;
  const recentPosts = featuredPost
    ? allPosts.filter((post) => post.sys.id !== featuredPost.sys.id)
    : allPosts;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] py-20 lg:py-32">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              VitaLink Insights
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Healthcare innovation, public health intelligence, digital transformation, and expert health education.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Blog Content */}
      <SectionContainer className="py-12 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Filter Controls */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm font-medium text-foreground">Filter by:</span>
                <Link
                  href="/blog"
                  className="px-3 py-1 bg-[#2563EB] text-white text-xs font-semibold rounded-full"
                >
                  All
                </Link>
                {categories.slice(0, 5).map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1 bg-[#F8FAFC] text-muted-foreground text-xs font-medium rounded-full hover:bg-[#2563EB] hover:text-white transition-colors"
                  >
                    {category}
                  </Link>
                ))}
                <Link
                  href="/search"
                  className="px-3 py-1 bg-[#F8FAFC] text-muted-foreground text-xs font-medium rounded-full hover:bg-[#2563EB] hover:text-white transition-colors"
                >
                  Search
                </Link>
              </div>
            </div>

            {/* Featured Article */}
            {featuredPost && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Featured Article</h2>
                <BlogCard post={featuredPost} featured />
              </div>
            )}

            {/* Recent Articles */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Recent Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {recentPosts.map((post) => (
                  <BlogCard key={post.sys.id} post={post} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              categories={categories}
              popularPosts={popularPosts}
              tags={tags}
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
