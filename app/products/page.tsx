import { getProducts, mapSanityProduct } from "@/lib/sanity/queries"
import ProductsListClient from "@/components/products-list-client"

export { metadata } from "./metadata"

export const revalidate = 60

export default async function ProductsPage() {
  const rawProducts = await getProducts()
  let products = rawProducts.map(mapSanityProduct)

  // Fallback to static mock products if CMS has no published product documents yet
  if (products.length === 0) {
    const staticModule = await import("@/utils/products")
    products = staticModule.PRODUCTS
  }

  return <ProductsListClient products={products} />
}
