export const postFields = `
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  "featuredImageAlt": featuredImage.alt,
  content,
  "author": coalesce(author->name, "VitaLink Editorial Team"),
  "authorBio": coalesce(authorBio, author->bio),
  "authorPhoto": coalesce(authorPhoto, author->photo),
  "authorPosition": author->position,
  "category": category->title,
  "categorySlug": category->slug.current,
  "tags": tags[]->{ name, "slug": slug.current },
  publishedDate,
  seoTitle,
  seoDescription,
  featuredArticle,
  readingTime,
  status
`;

const publishedFilter = `(!defined(status) || status in ["published", "Published"])`;

export const allPostsQuery = `
  *[_type == "blogPost" && ${publishedFilter}] | order(publishedDate desc) {
    ${postFields}
  }
`;

export const featuredPostsQuery = `
  *[_type == "blogPost" && ${publishedFilter} && featuredArticle == true] | order(publishedDate desc) {
    ${postFields}
  }
`;

export const popularPostsQuery = `
  *[_type == "blogPost" && ${publishedFilter}] | order(publishedDate desc)[0...5] {
    ${postFields}
  }
`;

export const postBySlugQuery = `
  *[_type == "blogPost" && ${publishedFilter} && slug.current == $slug][0] {
    ${postFields}
  }
`;

export const postsByCategoryQuery = `
  *[_type == "blogPost" && ${publishedFilter} && category->slug.current == $slug] | order(publishedDate desc) {
    ${postFields}
  }
`;

export const postsByTagQuery = `
  *[_type == "blogPost" && ${publishedFilter} && $slug in tags[]->slug.current] | order(publishedDate desc) {
    ${postFields}
  }
`;

export const searchPostsQuery = `
  *[
    _type == "blogPost" &&
    ${publishedFilter} &&
    (
      title match $query ||
      excerpt match $query ||
      pt::text(content) match $query ||
      tags[]->name match $query
    )
  ] | order(publishedDate desc) {
    ${postFields}
  }
`;

export const categoriesQuery = `
  *[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current,
    description
  }
`;

export const tagsQuery = `
  *[_type == "tag" && defined(slug.current)] | order(name asc) {
    name,
    "slug": slug.current
  }
`;
