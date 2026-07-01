import { getAllPosts } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import BlogListClient, { type MappedPost } from "@/components/blog-list-client"

export { metadata } from "./metadata"

export const revalidate = 60

export default async function BlogPage() {
  const sanityPosts = await getAllPosts()

  // Map Sanity post data structure to a unified interface
  let posts: MappedPost[] = sanityPosts.map((p: any) => ({
    id: p._id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || "",
    authorName: p.author?.name || "BioLexa Editor",
    authorImage: p.author?.image ? urlFor(p.author.image).url() : undefined,
    date: p.publishedAt || new Date().toISOString(),
    categoryName: p.categories?.[0]?.title || "Uncategorized",
    readTime: p.readTime || "5 min read",
    featured: p.featured || false,
    image: p.mainImage ? urlFor(p.mainImage).url() : "/placeholder.svg",
  }))

  // Fallback to static mock articles if CMS does not have published posts yet
  if (posts.length === 0) {
    const { BLOG_ARTICLES } = await import("@/utils/blog")
    posts = BLOG_ARTICLES.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      authorName: a.author,
      date: a.date,
      categoryName: a.category,
      readTime: a.readTime,
      featured: a.featured,
      image: a.image,
    }))
  }

  return <BlogListClient posts={posts} />
}
