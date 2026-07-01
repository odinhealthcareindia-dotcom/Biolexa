import { notFound } from "next/navigation"
import { getCategory, getPostsByCategory, mapSanityProduct } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import BlogListClient, { type MappedPost } from "@/components/blog-list-client"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${category.title} Articles | BioLexa Blog`,
    description: category.description || `Articles related to ${category.title} from BioLexa experts.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const rawPosts = await getPostsByCategory(slug)
  const posts: MappedPost[] = rawPosts.map((p: any) => ({
    id: p._id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || "",
    authorName: p.author?.name || "BioLexa Editor",
    authorImage: p.author?.image ? urlFor(p.author.image).url() : undefined,
    date: p.publishedAt || new Date().toISOString(),
    categoryName: category.title,
    readTime: p.readTime || "5 min read",
    featured: false,
    image: p.mainImage ? urlFor(p.mainImage).url() : "/placeholder.svg",
  }))

  return (
    <div>
      <section className="bg-[var(--color-surface)] py-8 border-b border-[var(--color-border)] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">Category Filter</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">{category.title}</h2>
          {category.description && (
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-xl mx-auto">{category.description}</p>
          )}
        </div>
      </section>
      <BlogListClient posts={posts} />
    </div>
  )
}
