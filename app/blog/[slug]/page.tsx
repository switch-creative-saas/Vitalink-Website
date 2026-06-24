import React from "react";
import { getAllPosts, getPostBySlug, slugify } from "@/sanity/lib/blog";
import type { BlogPost } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Facebook, Linkedin, Share2, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { NewsletterSignup } from "@/components/blog/newsletter-signup";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { SectionContainer } from "@/components/landing/section-container";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vitalink.africa";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: BlogPost["featuredImage"] }) => {
      const imageUrl = urlForImage(value)?.width(1200).height(675).url();
      if (!imageUrl) return null;

      return (
        <div className="relative my-8 aspect-[16/9] overflow-hidden rounded-xl border border-border">
          <Image
            src={imageUrl}
            alt={value?.alt || "VitaLink article supporting visual"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold text-foreground">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 text-xl font-bold text-foreground">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 text-base leading-8 text-muted-foreground">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-8 border-l-4 border-[#2563EB] bg-[#EFF6FF] px-5 py-4 text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-muted-foreground">{children}</ol>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        className="font-medium text-[#2563EB] underline-offset-4 hover:underline"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | VitaLink Insights",
    };
  }

  const imageUrl = urlForImage(post.featuredImage)?.width(1200).height(630).url();
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post._updatedAt,
      authors: [post.author],
      images: imageUrl ? [{ url: imageUrl, alt: post.featuredImageAlt || post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const allPosts = await getAllPosts();

  if (!post) {
    return (
      <main className="relative min-h-screen overflow-x-hidden bg-white">
        <Navigation />
        <SectionContainer className="flex min-h-[60vh] items-center justify-center pt-28">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-foreground">Article Not Found</h1>
            <Button asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </SectionContainer>
        <FooterSection />
      </main>
    );
  }

  const imageUrl = urlForImage(post.featuredImage)?.width(1400).height(700).url() || "/placeholder.jpg";
  const authorPhotoUrl = urlForImage(post.authorPhoto)?.width(120).height(120).url();
  const categorySlug = post.categorySlug || (post.category ? slugify(post.category) : "insights");
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const date = new Date(post.publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const relatedPosts = allPosts
    .filter((candidate) => candidate._id !== post._id && candidate.category === post.category)
    .slice(0, 3);

  const articleSchema = {
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
    dateModified: post._updatedAt,
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
      "@id": articleUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article>
        <header className="bg-white pt-28 pb-10 lg:pt-36 lg:pb-16">
          <SectionContainer>
            <div className="mx-auto max-w-4xl">
              <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-[#2563EB]">
                  Home
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-[#2563EB]">
                  Insights
                </Link>
                {post.category && (
                  <>
                    <span>/</span>
                    <Link href={`/category/${categorySlug}`} className="hover:text-[#2563EB]">
                      {post.category}
                    </Link>
                  </>
                )}
              </nav>

              {post.category && (
                <Link href={`/category/${categorySlug}`} className="inline-block">
                  <span className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#2563EB]">
                    {post.category}
                  </span>
                </Link>
              )}

              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  {authorPhotoUrl && (
                    <div className="relative h-11 w-11 overflow-hidden rounded-full border border-border">
                      <Image src={authorPhotoUrl} alt={post.author} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-foreground">{post.author}</p>
                    <p className="text-xs">{post.authorPosition || post.authorBio}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {date}
                </span>
                {post.readingTime && (
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readingTime} min read
                  </span>
                )}
              </div>
            </div>
          </SectionContainer>
        </header>

        <SectionContainer className="py-10">
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-[21/9] overflow-hidden rounded-xl border border-border bg-[#F8FAFC]">
              <Image
                src={imageUrl}
                alt={post.featuredImageAlt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>
          </div>
        </SectionContainer>

        <SectionContainer className="pb-14 lg:pb-20">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="min-w-0 rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              {post.content?.length ? (
                <PortableText value={post.content as never} components={portableTextComponents} />
              ) : (
                <p className="text-muted-foreground">{post.excerpt}</p>
              )}
            </div>

            <aside className="space-y-4">
              <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Share2 className="h-4 w-4 text-[#2563EB]" />
                  Share article
                </p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href={`https://twitter.com/intent/tweet?url=${articleUrl}&text=${post.title}`} aria-label="Share on Twitter">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${articleUrl}`} aria-label="Share on LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`} aria-label="Share on Facebook">
                      <Facebook className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </SectionContainer>
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-[#F8FAFC] py-14 lg:py-20">
          <SectionContainer>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                Related Articles
              </p>
              <h2 className="mt-2 text-2xl font-bold text-foreground">
                Continue reading
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </SectionContainer>
        </section>
      )}

      <SectionContainer className="py-14 lg:py-20">
        <NewsletterSignup variant="hero" />
      </SectionContainer>

      <FooterSection />
    </main>
  );
}

export const revalidate = 60;
