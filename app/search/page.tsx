"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { SectionContainer } from "@/components/landing/section-container";
import type { BlogPost } from "@/sanity/lib/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = (await response.json()) as { posts: BlogPost[] };
      setResults(data.posts);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      {/* Search Header */}
      <section className="bg-white pt-28 pb-14 lg:pt-36 lg:pb-20">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Search
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find articles, insights, and healthcare innovation content.
            </p>
            <div className="relative max-w-2xl">
              <input
                type="search"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-white border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Search Results */}
      <SectionContainer className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          {loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Searching...</p>
            </div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No results found for "{query}"
              </p>
              <p className="text-sm text-muted-foreground">
                Try different keywords or browse our categories.
              </p>
            </div>
          )}

          {!loading && query.length < 2 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Enter at least 2 characters to search.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <p className="text-muted-foreground mb-6">
                Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {results.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </SectionContainer>
      <FooterSection />
    </main>
  );
}
