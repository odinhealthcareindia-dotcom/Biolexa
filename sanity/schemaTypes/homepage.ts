import { HomeIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "homepage",
  title: "Homepage Content",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Homepage",
      readOnly: true,
    }),
    defineField({
      name: "blocks",
      title: "Homepage Blocks",
      type: "pageBuilder",
      description: "Arrange layout sections for the landing page.",
    }),
    defineField({
      name: "seo",
      title: "Homepage SEO",
      type: "seo",
    }),
  ],
})
