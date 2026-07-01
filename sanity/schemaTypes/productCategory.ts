import { DashboardIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  icon: DashboardIcon,
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
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
