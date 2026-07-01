import { client } from "./client"
import { urlFor } from "./image"

// -------------------------------------------------------------
// GROQ Queries
// -------------------------------------------------------------

// Global Site Settings Query
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  logo,
  logoDark,
  favicon,
  email,
  phoneNumbers,
  whatsapp,
  address,
  googleMapsUrl,
  businessHours,
  socials,
  announcement,
  cookies,
  seo,
  copyright,
  googleAnalyticsId
}`

// Navigation Menu Query
export const navigationQuery = `*[_type == "navigation" && slug.current == $slug][0]{
  title,
  items[]{
    _type == "customLink" => {
      label,
      type,
      internal,
      external,
      anchor,
      isCTA
    },
    _type == "navGroup" => {
      label,
      links[]{
        label,
        type,
        internal,
        external,
        anchor,
        isCTA
      }
    }
  }
}`

// Homepage Content Query
export const homepageQuery = `*[_type == "homepage"][0]{
  title,
  blocks,
  seo
}`

// Aboutpage Content Query
export const aboutpageQuery = `*[_type == "aboutpage"][0]{
  title,
  headerTitle,
  headerTagline,
  sections[]{
    title,
    image,
    imageAlt,
    content,
    reverse
  },
  seo
}`

// Product List Query
export const productsQuery = `*[_type == "product"] | order(id asc){
  id,
  name,
  "slug": slug.current,
  brandName,
  category,
  subcategory,
  subsubcategory,
  composition,
  packing,
  mrp,
  imageLink,
  visualAidLink,
  images,
  shortDescription,
  longDescription,
  featured,
  status
}`

// Single Product Details Query
export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0]{
  id,
  name,
  "slug": slug.current,
  brandName,
  category,
  subcategory,
  subsubcategory,
  composition,
  packing,
  mrp,
  imageLink,
  visualAidLink,
  images,
  brochure,
  shortDescription,
  longDescription,
  featured,
  status,
  seo
}`

// Related Products Query
export const relatedProductsQuery = `*[_type == "product" && subsubcategory == $subsubcategory && slug.current != $slug][0...3]{
  id,
  name,
  "slug": slug.current,
  category,
  composition,
  imageLink,
  images
}`

// Blog Posts list Query
export const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  author->{
    name,
    image
  },
  mainImage,
  categories[]->{
    title,
    "slug": slug.current
  },
  publishedAt,
  excerpt,
  readTime,
  featured
}`

// Single Blog Post Details Query
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  author->{
    name,
    image,
    bio
  },
  mainImage,
  categories[]->{
    title,
    "slug": slug.current
  },
  tags[]->{
    title,
    "slug": slug.current
  },
  publishedAt,
  excerpt,
  body,
  readTime,
  featured,
  relatedPosts[]->{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt
  },
  seo
}`

// Category Listing Query
export const categoryQuery = `*[_type == "category" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  description
}`

// Posts by Category Query
export const postsByCategoryQuery = `*[_type == "post" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  author->{
    name,
    image
  },
  mainImage,
  publishedAt,
  excerpt,
  readTime
}`

// Tag Listing Query
export const tagQuery = `*[_type == "tag" && slug.current == $slug][0]{
  title,
  "slug": slug.current
}`

// Posts by Tag Query
export const postsByTagQuery = `*[_type == "post" && references(*[_type == "tag" && slug.current == $tagSlug]._id)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  author->{
    name,
    image
  },
  mainImage,
  publishedAt,
  excerpt,
  readTime
}`

// Custom Page Query
export const pageQuery = `*[_type == "page" && slug.current == $slug][0]{
  title,
  blocks,
  seo
}`

// -------------------------------------------------------------
// Data Fetching Functions
// -------------------------------------------------------------

export async function getSiteSettings() {
  try {
    const data = await client.fetch(siteSettingsQuery)
    return data || null
  } catch (error) {
    console.error("Error fetching site settings from Sanity:", error)
    return null
  }
}

export async function getNavigation(slug: string) {
  try {
    const data = await client.fetch(navigationQuery, { slug })
    return data || null
  } catch (error) {
    console.error(`Error fetching navigation ${slug} from Sanity:`, error)
    return null
  }
}

export async function getHomepage() {
  try {
    const data = await client.fetch(homepageQuery)
    return data || null
  } catch (error) {
    console.error("Error fetching homepage from Sanity:", error)
    return null
  }
}

export async function getAboutpage() {
  try {
    const data = await client.fetch(aboutpageQuery)
    return data || null
  } catch (error) {
    console.error("Error fetching aboutpage from Sanity:", error)
    return null
  }
}

export async function getProducts() {
  try {
    return await client.fetch(productsQuery)
  } catch (error) {
    console.error("Error fetching products from Sanity:", error)
    return []
  }
}

export async function getProduct(slug: string) {
  try {
    return await client.fetch(productBySlugQuery, { slug })
  } catch (error) {
    console.error(`Error fetching product ${slug} from Sanity:`, error)
    return null
  }
}

export async function getRelatedProducts(subsubcategory: string, slug: string) {
  try {
    return await client.fetch(relatedProductsQuery, { subsubcategory, slug })
  } catch (error) {
    console.error("Error fetching related products from Sanity:", error)
    return []
  }
}

export async function getAllPosts() {
  try {
    return await client.fetch(postsQuery)
  } catch (error) {
    console.error("Error fetching posts from Sanity:", error)
    return []
  }
}

export async function getPost(slug: string) {
  try {
    return await client.fetch(postBySlugQuery, { slug })
  } catch (error) {
    console.error(`Error fetching post ${slug} from Sanity:`, error)
    return null
  }
}

export async function getCategory(slug: string) {
  try {
    return await client.fetch(categoryQuery, { slug })
  } catch (error) {
    console.error(`Error fetching category ${slug} from Sanity:`, error)
    return null
  }
}

export async function getPostsByCategory(categorySlug: string) {
  try {
    return await client.fetch(postsByCategoryQuery, { categorySlug })
  } catch (error) {
    console.error(`Error fetching posts by category ${categorySlug} from Sanity:`, error)
    return []
  }
}

export async function getTag(slug: string) {
  try {
    return await client.fetch(tagQuery, { slug })
  } catch (error) {
    console.error(`Error fetching tag ${slug} from Sanity:`, error)
    return null
  }
}

export async function getPostsByTag(tagSlug: string) {
  try {
    return await client.fetch(postsByTagQuery, { tagSlug })
  } catch (error) {
    console.error(`Error fetching posts by tag ${tagSlug} from Sanity:`, error)
    return []
  }
}

export async function getPage(slug: string) {
  try {
    return await client.fetch(pageQuery, { slug })
  } catch (error) {
    console.error(`Error fetching page ${slug} from Sanity:`, error)
    return null
  }
}

// Mapper to transform Sanity product documents to legacy schema types
export function mapSanityProduct(p: any): any {
  if (!p) return null
  
  let downloadUrl = "NA"
  if (p.brochure?.asset?._ref) {
    const parts = p.brochure.asset._ref.split("-")
    const id = parts[1]
    const ext = parts[2]
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
    downloadUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`
  }

  return {
    Id: p.id || 0,
    Category: p.category || "",
    "Sub-category": p.subcategory || "",
    "Sub-Sub-Category": p.subsubcategory || "",
    Name: p.name || "",
    Composition: p.composition || "",
    Packing: p.packing || "",
    Mrp: p.mrp || 0,
    "Image-link": p.images?.[0] ? urlFor(p.images[0]).url() : (p.imageLink || "/placeholder.svg"),
    "Visual-aid": downloadUrl !== "NA" ? downloadUrl : (p.visualAidLink || "NA"),
    brandName: p.brandName || "BioLexa",
    shortDescription: p.shortDescription || "",
    longDescription: p.longDescription || null,
    images: p.images || [],
    featured: p.featured || false,
    status: p.status || "active",
    seo: p.seo || null,
  }
}

