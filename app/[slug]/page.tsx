import { notFound } from "next/navigation"
import { getPage } from "@/lib/sanity/queries"
import PageBuilder from "@/components/PageBuilder"
import { Metadata } from "next"
import { urlFor } from "@/lib/sanity/image"

interface CustomPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: CustomPageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await getPage(slug)

  if (!data) {
    return { title: "Page Not Found" }
  }

  const title = data.seo?.metaTitle || data.title
  const description = data.seo?.metaDescription || ""
  const shareImage = data.seo?.shareImage 
    ? urlFor(data.seo.shareImage).width(1200).height(630).url()
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(shareImage && { images: [{ url: shareImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(shareImage && { images: [shareImage] }),
    },
  }
}

export default async function CustomDynamicPage({ params }: CustomPageProps) {
  const { slug } = await params
  const data = await getPage(slug)

  if (!data) {
    notFound()
  }

  // Pass the page blocks to the PageBuilder to render dynamic content
  return <PageBuilder blocks={data.blocks || []} />
}
