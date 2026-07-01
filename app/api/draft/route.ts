import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug")
  const type = searchParams.get("type")

  // Verify the preview secret token
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid preview token", { status: 401 })
  }

  // Enable Draft Mode in Next.js
  const draft = await draftMode()
  draft.enable()

  // Resolve redirect URL
  let redirectUrl = "/"
  if (slug) {
    if (type === "post") {
      redirectUrl = `/blog/${slug}`
    } else if (type === "product") {
      redirectUrl = `/products/${slug}`
    } else if (type === "page") {
      redirectUrl = `/${slug}`
    } else if (type === "aboutpage") {
      redirectUrl = "/aboutus"
    }
  }

  redirect(redirectUrl)
}
