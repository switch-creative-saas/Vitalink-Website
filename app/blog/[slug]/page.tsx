import React from "react";
import { getPostBySlug, getAllPosts } from "@/lib/contentful";
import { BlogPost } from "@/lib/contentful";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, Share2, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/landing/section-container";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vitalink.africa";

// Custom rich text renderer for Contentful GraphQL API
function renderRichText(content: any): React.ReactNode {
  if (!content) return null;

  const renderNode = (node: any): React.ReactNode => {
    if (!node) return null;

    switch (node.nodeType) {
      case "heading-1":
        return <h1 className="text-3xl font-bold text-foreground mt-8 mb-4">{renderContent(node.content)}</h1>;
      case "heading-2":
        return <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{renderContent(node.content)}</h2>;
      case "heading-3":
        return <h3 className="text-xl font-bold text-foreground mt-6 mb-3">{renderContent(node.content)}</h3>;
      case "heading-4":
        return <h4 className="text-lg font-bold text-foreground mt-4 mb-2">{renderContent(node.content)}</h4>;
      case "heading-5":
        return <h5 className="text-base font-bold text-foreground mt-4 mb-2">{renderContent(node.content)}</h5>;
      case "heading-6":
        return <h6 className="text-sm font-bold text-foreground mt-4 mb-2">{renderContent(node.content)}</h6>;
      case "paragraph":
        return <p className="text-muted-foreground leading-relaxed mb-4">{renderContent(node.content)}</p>;
      case "list-item":
        return <li className="text-muted-foreground mb-1">{renderContent(node.content)}</li>;
      case "unordered-list":
        return <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">{renderContent(node.content)}</ul>;
      case "ordered-list":
        return <ol className="list-decimal pl-6 mb-4 space-y-2 text-muted-foreground">{renderContent(node.content)}</ol>;
      case "blockquote":
        return (
          <blockquote className="border-l-4 border-[#2563EB] pl-4 my-6 italic text-muted-foreground">
            {renderContent(node.content)}
          </blockquote>
        );
      case "hr":
        return <hr className="my-8 border-border" />;
      case "hyperlink":
        return (
          <a
            href={node.data.uri}
            className="text-[#2563EB] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {renderContent(node.content)}
          </a>
        );
      case "text":
        if (node.marks?.length > 0) {
          const isBold = node.marks.some((mark: any) => mark.type === "bold");
          const isItalic = node.marks.some((mark: any) => mark.type === "italic");
          const isUnderline = node.marks.some((mark: any) => mark.type === "underline");
          const isCode = node.marks.some((mark: any) => mark.type === "code");

          let text = node.value;
          if (isBold) text = <strong>{text}</strong>;
          if (isItalic) text = <em>{text}</em>;
          if (isUnderline) text = <u>{text}</u>;
          if (isCode) text = <code className="bg-[#F8FAFC] px-1 py-0.5 rounded text-sm font-mono">{text}</code>;
          return text;
        }
        return node.value;
      default:
        return null;
    }
  };

  const renderContent = (content: any[]): React.ReactNode => {
    if (!content) return null;
    return content.map((node, index) => <React.Fragment key={index}>{renderNode(node)}</React.Fragment>);
  };

  return renderContent(content);
}

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const imageUrl = post.featuredImage?.url
    ? `https:${post.featuredImage.url}`
    : "";

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPostBySlug(params.slug);
  const allPosts = await getAllPosts();

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = post.featuredImage?.url
    ? `https:${post.featuredImage.url}`
    : "/placeholder.jpg";

  const authorPhotoUrl = post.authorPhoto?.url
    ? `https:${post.authorPhoto.url}`
    : "/placeholder.jpg";

  const date = new Date(post.publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const relatedPosts = allPosts
    .filter((p) => p.sys.id !== post.sys.id && p.category === post.category)
    .slice(0, 3);

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.publishedDate,
    dateModified: post.sys.updatedAt,
    publisher: {
      "@type": "Organization",
      name: "VitaLink",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  // Breadcrumb Schema
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      {/* Article Header */}
      <article className="bg-white border-b border-border">
        <SectionContainer className="py-12">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <Link
              href={`/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-block mb-4"
            >
              <span className="inline-block px-3 py-1 bg-[#2563EB] text-white text-xs font-semibold rounded-full">
                {post.category}
              </span>
            </Link>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                {authorPhotoUrl && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={authorPhotoUrl}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium text-foreground">{post.author}</p>
                  <p className="text-xs">{post.authorBio}</p>
                </div>
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

            {/* Social Share */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </SectionContainer>
      </article>

      {/* Hero Image */}
      <div className="bg-white border-b border-border">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={post.featuredImage?.title || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* Article Content */}
      <article className="bg-[#F8FAFC] py-12">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {renderRichText(post.content.json)}
            </div>
          </div>
        </SectionContainer>
      </article>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] py-16">
        <SectionContainer>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated With Healthcare Innovation
            </h2>
            <p className="text-white/90 mb-8">
              Get the latest healthcare insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/70"
              />
              <Button className="bg-white text-[#2563EB] hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-12">
          <SectionContainer>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.sys.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-[#F8FAFC] rounded-xl p-6 border border-border hover:shadow-md transition-shadow">
                      <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                        <Image
                          src={
                            relatedPost.featuredImage?.url
                              ? `https:${relatedPost.featuredImage.url}`
                              : "/placeholder.jpg"
                          }
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-[#2563EB] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(relatedPost.publishedDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </SectionContainer>
        </section>
      )}

      {/* Comments Placeholder */}
      <section className="bg-[#F8FAFC] py-12">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Comments</h2>
            <div className="bg-white rounded-xl p-8 border border-border text-center">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Comments are coming soon. Share your thoughts on social media in the meantime!
              </p>
              <Button variant="outline" className="rounded-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}

export const revalidate = 3600; // Revalidate every hour
