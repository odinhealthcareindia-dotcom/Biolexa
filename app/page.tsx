import { getHomepage } from "@/lib/sanity/queries"
import PageBuilder from "@/components/PageBuilder"
import StaticHome from "@/components/StaticHome"

// Incremental Static Regeneration (ISR) with revalidation fallback
export const revalidate = 60 

export default async function Home() {
  const data = await getHomepage()

  if (data?.blocks && data.blocks.length > 0) {
    return <PageBuilder blocks={data.blocks} />
  }

  // Automatic fallback to static landing page layout
  return <StaticHome />
}
