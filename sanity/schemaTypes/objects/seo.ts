import { defineField, defineType } from "sanity"

export default defineType({
  name: "seo",
  title: "SEO Settings",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Ideal length: 50-60 characters. Overrides standard title.",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "Ideal length: 120-160 characters. Recommended for search result snippets.",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Keywords relevant for search engine crawlers.",
    }),
    defineField({
      name: "shareImage",
      title: "Share Image (OpenGraph)",
      type: "image",
      description: "Image shown when page is shared on social media. Aspect ratio: 1200x630 pixels.",
      options: { hotspot: true },
    }),
  ],
})
