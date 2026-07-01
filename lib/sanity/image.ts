import imageUrlBuilder from "@sanity/image-url"
import { client } from "./client"

const builder = imageUrlBuilder(client)

// Reusable function to build image URLs from Sanity image assets
export function urlFor(source: any) {
  return builder.image(source)
}
