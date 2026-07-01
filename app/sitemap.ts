import { MetadataRoute } from "next"
import { getProducts, getAllPosts } from "@/lib/sanity/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://biolexa.in"

  // Core Static Pages
  const routes = [
    "",
    "/aboutus",
    "/products",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  try {
    // Dynamic Blog Post URLs
    const posts = await getAllPosts()
    const postUrls = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))

    // Dynamic Product Detail URLs
    const products = await getProducts()
    const productUrls = products.map((product: any) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    return [...routes, ...postUrls, ...productUrls]
  } catch (error) {
    console.error("Error generating sitemap dynamically:", error)
    return routes
  }
}
