import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/sanity/queries"

// Escapes special XML entity characters to avoid parsing errors
function escapeXml(unsafe: string): string {
  if (!unsafe) return ""
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case "&":
        return "&amp;"
      case "'":
        return "&apos;"
      case '"':
        return "&quot;"
      default:
        return c
    }
  })
}

export async function GET() {
  const baseUrl = "https://biolexa.in"
  let posts = []
  
  try {
    posts = await getAllPosts()
  } catch (error) {
    console.error("Error fetching posts for RSS feed:", error)
  }

  // If Sanity is empty, load fallback static mock articles
  if (posts.length === 0) {
    try {
      const { BLOG_ARTICLES } = await import("@/utils/blog")
      posts = BLOG_ARTICLES.map(a => ({
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        publishedAt: a.date,
      }))
    } catch {
      // no-op
    }
  }

  const feedItems = posts
    .map(
      (post: any) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${escapeXml(post.excerpt || "")}</description>
      <pubDate>${new Date(post.publishedAt || new Date()).toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${post.slug}</guid>
    </item>
  `
    )
    .join("")

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>BioLexa Healthcare &amp; Wellness Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Latest insights, health tips, and pharmaceutical regulatory updates from BioLexa experts</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${feedItems}
  </channel>
</rss>
  `

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
