import { Calendar, Clock, ArrowRight, Search, Tag, TrendingUp, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionContainer } from "@/components/landing/section-container";
import type { BlogCategory, BlogPost, BlogTag } from "@/sanity/lib/types";
import { slugify } from "@/sanity/lib/slugify";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const imageUrl = urlForImage(post.featuredImage)?.width(1200).height(675).url() || "/placeholder.jpg";

  const date = new Date(post.publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className={`group ${featured ? "col-span-full" : ""}`}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden rounded-xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className={`relative ${featured ? "aspect-[21/9]" : "aspect-[16/9]"} overflow-hidden`}>
            <Image
              src={imageUrl}
              alt={post.featuredImage?.title || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 left-4">
              {post.category && (
                <span className="inline-block px-3 py-1 bg-[#2563EB] text-white text-xs font-semibold rounded-full">
                  {post.category}
                </span>
              )}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              )}
            </div>
            <h2 className={`font-bold text-foreground mb-2 line-clamp-2 ${featured ? "text-2xl" : "text-lg"}`}>
              {post.title}
            </h2>
            <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
            <div className="flex items-center gap-2 text-[#2563EB] font-medium group-hover:gap-3 transition-all">
              <span>Read more</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

interface SidebarProps {
  categories: BlogCategory[];
  popularPosts: BlogPost[];
  tags: BlogTag[];
}

export function Sidebar({ categories, popularPosts, tags }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search
        </h3>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search articles..."
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.slug || category.title}>
              <Link
                href={`/category/${category.slug || slugify(category.title)}`}
                className="block text-sm text-muted-foreground hover:text-[#2563EB] transition-colors py-1"
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Popular Posts
        </h3>
        <ul className="space-y-4">
          {popularPosts.slice(0, 5).map((post) => (
            <li key={post._id}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <h4 className="text-sm font-medium text-foreground group-hover:text-[#2563EB] transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(post.publishedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 15).map((tag) => (
            <Link
              key={tag.slug || tag.name}
              href={`/tag/${tag.slug || slugify(tag.name)}`}
              className="inline-block px-3 py-1 bg-[#F8FAFC] text-sm text-muted-foreground hover:bg-[#2563EB] hover:text-white rounded-full transition-colors"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Stay Updated
        </h3>
        <p className="text-sm text-white/90 mb-4">
          Get the latest healthcare insights delivered to your inbox.
        </p>
        <Input
          type="email"
          placeholder="Enter your email"
          className="bg-white/20 border-white/30 text-white placeholder:text-white/70 mb-3"
        />
        <Button
          size="sm"
          className="w-full bg-white text-[#2563EB] hover:bg-white/90"
        >
          Subscribe
        </Button>
      </div>
    </aside>
  );
}
