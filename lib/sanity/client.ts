import { createClient } from "next-sanity"

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder"
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-01"

// Public client for standard static/dynamic page generation
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production", // Enable CDN in production for caching
})

// Helper to instantiate server-side client (optionally with token for draft preview data)
export const getClient = (previewToken?: string) => {
  if (previewToken) {
    return client.withConfig({
      useCdn: false,
      token: previewToken,
    })
  }
  return client
}

// Write client helper for handling forms/leads submissions securely
export const getWriteClient = () => {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN in env variables.")
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  })
}
