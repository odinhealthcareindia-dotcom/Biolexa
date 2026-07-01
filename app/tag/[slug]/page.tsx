import { notFound } from "next/navigation"
import { getTag, getPostsByTag } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import BlogListClient, { type MappedPost } from "@/components/blog-list-client"

interface TagPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params
  const tag = await getTag(slug)

  if (!tag) {
    return { title: "Tag Not Found" }
  }

  return {
    title: `Articles Tagged "${tag.title}" | BioLexa Blog`,
    description: `Browse articles tagged with ${tag.title} from BioLexa experts.`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const tag = await getTag(slug)

  if (!tag) {
    notFound()
  }

  const rawPosts = await getPostsByTag(slug)
  const posts: MappedPost[] = rawPosts.map((p: any) => ({
    id: p._id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || "",
    authorName: p.author?.name || "BioLexa Editor",
    authorImage: p.author?.image ? urlFor(p.author.image).url() : undefined,
    date: p.publishedAt || new Date().toISOString(),
    categoryName: p.categories?.[0]?.title || "Uncategorized",
    readTime: p.readTime || "5 min read",
    featured: false,
    image: p.mainImage ? urlFor(p.mainImage).url() : "/placeholder.svg",
  }))

  return (
    <div>
      <section className="bg-[var(--color-surface)] py-8 border-b border-[var(--color-border)] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">Tag Filter</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">#{tag.title}</h2>
        </div>
      </section>
      <BlogListClient posts={posts} />
    </div>
  )
}
