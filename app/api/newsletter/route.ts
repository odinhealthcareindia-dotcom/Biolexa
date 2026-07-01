import { NextResponse } from "next/server"
import { getWriteClient } from "@/lib/sanity/client"
import { z } from "zod"

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validation = newsletterSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0]?.message || "Invalid email" },
        { status: 400 }
      )
    }

    const { email } = validation.data
    const client = getWriteClient()

    // Check if the subscriber already exists to avoid redundant records
    const existing = await client.fetch(
      `*[_type == "lead" && email == $email][0]`,
      { email }
    )

    if (existing) {
      if (existing.status !== "active") {
        await client
          .patch(existing._id)
          .set({ status: "active" })
          .commit()
      }
      return NextResponse.json({ success: true, message: "You are already subscribed!" })
    }

    // Create a new lead document in Sanity
    await client.create({
      _type: "lead",
      email,
      type: "newsletter",
      status: "active",
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Thank you for subscribing!" })
  } catch (error: any) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Server error processing subscription" },
      { status: 500 }
    )
  }
}
