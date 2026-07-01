import { defineLive } from "next-sanity/live"
import { client } from "./client"

// Read token with preview permissions for draft mode live previewing
const token = process.env.SANITY_API_READ_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
