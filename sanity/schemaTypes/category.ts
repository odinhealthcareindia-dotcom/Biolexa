import { FolderIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "category",
  title: "Blog Category",
  type: "document",
  icon: FolderIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
})
