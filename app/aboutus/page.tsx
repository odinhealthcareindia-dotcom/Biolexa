import { getAboutpage } from "@/lib/sanity/queries"
import StaticAbout from "@/components/StaticAbout"
import SanityAbout from "@/components/SanityAbout"

// Incremental Static Regeneration (ISR) with revalidation
export const revalidate = 60

export default async function AboutUs() {
  const data = await getAboutpage()

  if (!data || !data.sections || data.sections.length === 0) {
    return <StaticAbout />
  }

  return <SanityAbout data={data} />
}

