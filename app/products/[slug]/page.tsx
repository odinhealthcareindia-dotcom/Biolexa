import { notFound } from "next/navigation"
import { getProduct, getRelatedProducts as getSanityRelated, mapSanityProduct, getProducts } from "@/lib/sanity/queries"
import { getProductBySlug, getRelatedProducts as getStaticRelated, generateSlug } from "@/utils/products"
import ProductDetailsClient from "@/components/product-details-client"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

// Combines legacy static product slugs with Sanity slugs for pre-rendering
export async function generateStaticParams() {
  const staticModule = await import("@/utils/products")
  const staticSlugs = staticModule.PRODUCTS.map((p) => ({
    slug: generateSlug(p.Name),
  }))

  try {
    const cmsProducts = await getProducts()
    const cmsSlugs = cmsProducts.map((p: any) => ({
      slug: p.slug,
    }))
    return [...staticSlugs, ...cmsSlugs]
  } catch {
    return staticSlugs
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  
  // 1. Try fetching from CMS
  const rawProduct = await getProduct(slug)
  const product = mapSanityProduct(rawProduct) || getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  const siteName = "BioLexa"
  const metaTitle = product.seo?.metaTitle || `${product.Name} | ${siteName}`
  const metaDesc = product.seo?.metaDescription || `${product.Name} - Formulation: ${product.Composition}. Packaging: ${product.Packing}.`

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      images: [{ url: product["Image-link"] }],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  // 1. Try to find the product in Sanity
  const rawProduct = await getProduct(slug)
  let product = mapSanityProduct(rawProduct)
  let relatedProducts = []

  if (product) {
    // Fetch related products from Sanity
    const rawRelated = await getSanityRelated(product["Sub-Sub-Category"], slug)
    relatedProducts = rawRelated.map(mapSanityProduct).filter(Boolean)
  } else {
    // 2. Fall back to static mock database
    const staticProduct = getProductBySlug(slug)
    if (!staticProduct) {
      notFound()
    }
    product = staticProduct
    relatedProducts = getStaticRelated(product["Sub-Sub-Category"], product.Id)
  }

  return <ProductDetailsClient product={product as any} relatedProducts={relatedProducts as any} />
}
