import { getAllProducts } from "@/utils/products"
import ProductsListClient from "@/components/products-list-client"

export { metadata } from "./metadata"

export default async function ProductsPage() {
  const products = await getAllProducts()

  return <ProductsListClient products={products} />
}
