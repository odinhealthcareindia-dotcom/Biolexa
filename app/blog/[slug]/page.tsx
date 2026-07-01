import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getPost, mapSanityProduct } from "@/lib/sanity/queries"
import { getClient } from "@/lib/sanity/client"
import { urlFor } from "@/lib/sanity/image"
import NewsletterForm from "@/components/NewsletterForm"
import PortableText from "@/components/PortableText"
import { Calendar, User, Clock, ChevronRight, Facebook, Twitter, Linkedin, Mail, ArrowLeft, ArrowRight } from "lucide-react"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

// Helper to generate Table of Contents from Portable Text headings
function extractHeadings(body: any[]) {
  if (!body || !Array.isArray(body)) return []
  return body
    .filter((block) => block._type === "block" && /^h[23]$/.test(block.style))
    .map((block) => {
      const text = block.children?.map((c: any) => c.text).join("") || ""
      const slug = text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
      return { text, slug, level: block.style }
    })
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: "Article Not Found" }
  }

  const title = post.seo?.metaTitle || `${post.title} | BioLexa Blog`
  const description = post.seo?.metaDescription || post.excerpt
  const shareImage = post.seo?.shareImage 
    ? urlFor(post.seo.shareImage).width(1200).height(630).url()
    : post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : "/og-image.jpg"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: shareImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  let post = await getPost(slug)
  let isStatic = false

  // Fallback to static mock articles if not found in Sanity
  if (!post) {
    const { BLOG_ARTICLES } = await import("@/utils/blog")
    const staticPost = BLOG_ARTICLES.find((a) => a.slug === slug)
    if (!staticPost) {
      notFound()
    }
    isStatic = true
    // Map static post structure to match post document
    post = {
      _id: staticPost.id,
      title: staticPost.title,
      slug: staticPost.slug,
      publishedAt: staticPost.date,
      excerpt: staticPost.excerpt,
      readTime: staticPost.readTime,
      mainImage: null as any,
      body: [{ _type: "block", style: "normal", children: [{ _type: "span", text: staticPost.content }] }],
      author: { name: staticPost.author },
      categories: [{ title: staticPost.category, slug: staticPost.category.toLowerCase().replace(/\s+/g, "-") }],
      legacyImage: staticPost.image,
    }
  }

  const headings = extractHeadings(post.body)
  const category = post.categories?.[0]
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(900).height(500).url() : (post.legacyImage || "/placeholder.svg")
  const authorImg = post.author?.image ? urlFor(post.author.image).width(100).height(100).url() : null
  const shareUrl = `https://biolexa.in/blog/${post.slug}`

  // Fetch adjacent posts for previous / next navigation (Sanity only)
  let prevPost = null
  let nextPost = null
  if (!isStatic) {
    try {
      const sanityClient = getClient()
      prevPost = await sanityClient.fetch(
        `*[_type == "post" && publishedAt < $publishedAt] | order(publishedAt desc)[0]{ title, "slug": slug.current }`,
        { publishedAt: post.publishedAt }
      )
      nextPost = await sanityClient.fetch(
        `*[_type == "post" && publishedAt > $publishedAt] | order(publishedAt asc)[0]{ title, "slug": slug.current }`,
        { publishedAt: post.publishedAt }
      )
    } catch (e) {
      console.error("Error fetching adjacent posts:", e)
    }
  }

  // Articles syndication Schema JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: imageUrl,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "BioLexa Editor",
    },
    publisher: {
      "@type": "Organization",
      name: "BioLexa",
      logo: {
        "@type": "ImageObject",
        url: "https://biolexa.in/BioLexa-logo.png",
      },
    },
    description: post.excerpt,
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-8 font-medium">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:text-[var(--color-primary)] transition-colors">Blog</Link>
          {category && (
            <>
              <ChevronRight size={12} />
              <Link href={`/category/${category.slug}`} className="hover:text-[var(--color-primary)] transition-colors">
                {category.title}
              </Link>
            </>
          )}
          <ChevronRight size={12} />
          <span className="text-[var(--color-text-secondary)] font-semibold truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Hero Area */}
        <header className="mb-10 text-center sm:text-left">
          {category && (
            <span className="inline-block bg-[var(--color-primary-soft)] text-[var(--color-primary)] px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-4">
              {category.title}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 text-sm text-[var(--color-text-secondary)] border-y border-[var(--color-border)] py-4">
            <div className="flex items-center gap-2">
              {authorImg ? (
                <img src={authorImg} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <User size={18} className="text-[var(--color-primary)]" />
              )}
              <span className="font-medium text-[var(--color-text-primary)]">{post.author?.name || "BioLexa Editor"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>
                {new Date(post.publishedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>{post.readTime || "5 min read"}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md mb-10 border border-[var(--color-border)]">
          <Image src={imageUrl} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-6">
            <article className="prose max-w-none">
              <PortableText value={post.body} />
            </article>

            {/* Share buttons */}
            <div className="border-t border-b border-[var(--color-border)] py-6 my-8 flex items-center justify-between flex-wrap gap-4">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">Share this article:</span>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all text-[var(--color-text-secondary)]"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all text-[var(--color-text-secondary)]"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all text-[var(--color-text-secondary)]"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all text-[var(--color-text-secondary)]"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Prev / Next buttons */}
            {(prevPost || nextPost) && (
              <div className="grid grid-cols-2 gap-4 border-b border-[var(--color-border)] pb-8 mb-8">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="flex flex-col p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all group items-start">
                    <span className="text-xs font-semibold text-[var(--color-text-muted)] flex items-center gap-1">
                      <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" /> Previous Post
                    </span>
                    <span className="text-sm font-bold text-[var(--color-text-primary)] mt-2 line-clamp-1 group-hover:text-[var(--color-primary)]">{prevPost.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="flex flex-col p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all group items-end text-right">
                    <span className="text-xs font-semibold text-[var(--color-text-muted)] flex items-center gap-1">
                      Next Post <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="text-sm font-bold text-[var(--color-text-primary)] mt-2 line-clamp-1 group-hover:text-[var(--color-primary)]">{nextPost.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}

            {/* Related posts */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="space-y-6 pt-4">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Related Articles</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {post.relatedPosts.map((related: any) => {
                    const rImg = related.mainImage ? urlFor(related.mainImage).width(400).height(240).url() : "/placeholder.svg"
                    return (
                      <Link key={related._id} href={`/blog/${related.slug}`} className="group">
                        <div className="border border-[var(--color-border)] bg-[var(--color-surface)] rounded-xl overflow-hidden hover:border-[var(--color-primary)] transition-all h-full">
                          <div className="relative aspect-video w-full">
                            <Image src={rImg} alt={related.title} fill className="object-cover" />
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                              {related.title}
                            </h4>
                            <span className="text-xs text-[var(--color-text-muted)] mt-2 block">
                              {new Date(related.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Newsletter CTA */}
            <NewsletterForm />

            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] sticky top-24">
                <h3 className="font-bold text-base text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2.5 text-sm font-medium">
                  {headings.map((h, i) => (
                    <a
                      key={i}
                      href={`#${h.slug}`}
                      className={`block hover:text-[var(--color-primary)] text-[var(--color-text-secondary)] transition-colors leading-snug ${
                        h.level === "h3" ? "pl-4 text-xs font-normal" : ""
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
