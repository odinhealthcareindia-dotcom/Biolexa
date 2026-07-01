import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get("secret")

    // Secure check: Validate the revalidation token signature
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid validation secret token" }, { status: 401 })
    }

    const body = await req.json()
    const { _type, slug } = body

    if (!_type) {
      return NextResponse.json({ message: "Missing document type in payload" }, { status: 400 })
    }

    const slugStr = typeof slug === "object" ? slug.current : slug

    // Purge corresponding route cache depending on document type
    if (_type === "homepage") {
      revalidatePath("/")
    } else if (_type === "aboutpage") {
      revalidatePath("/aboutus")
    } else if (_type === "post") {
      revalidatePath("/blog")
      if (slugStr) {
        revalidatePath(`/blog/${slugStr}`)
      }
      revalidatePath("/feed.xml")
      revalidatePath("/sitemap.xml")
    } else if (_type === "product") {
      revalidatePath("/products")
      if (slugStr) {
        revalidatePath(`/products/${slugStr}`)
      }
      revalidatePath("/sitemap.xml")
    } else if (_type === "page" && slugStr) {
      revalidatePath(`/${slugStr}`)
    } else if (_type === "siteSettings" || _type === "navigation") {
      // Global settings/menus update should invalidate primary templates
      revalidatePath("/")
      revalidatePath("/aboutus")
      revalidatePath("/products")
      revalidatePath("/blog")
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error: any) {
    console.error("Revalidation hook error:", error)
    return NextResponse.json({ message: error.message || "Internal revalidation error" }, { status: 500 })
  }
}
export async function GET() {
  return new Response("Webhook endpoint ready for POST calls", { status: 200 })
}
