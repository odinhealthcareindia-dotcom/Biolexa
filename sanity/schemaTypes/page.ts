import { DocumentIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "page",
  title: "Custom Dynamic Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blocks",
      title: "Page Blocks",
      type: "pageBuilder",
      description: "Assemble dynamic content sections for this page.",
    }),
    defineField({
      name: "seo",
      title: "Page SEO",
      type: "seo",
    }),
  ],
})
