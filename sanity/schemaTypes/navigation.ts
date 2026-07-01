import { MenuIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "navigation",
  title: "Navigation Menu",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "title",
      title: "Menu Title",
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
      name: "items",
      title: "Menu Items",
      type: "array",
      of: [
        // Standard single link
        {
          type: "customLink",
          title: "Single Link",
        },
        // Group of links for dropdown / nested menu
        {
          type: "object",
          name: "navGroup",
          title: "Dropdown Menu Group",
          fields: [
            defineField({
              name: "label",
              title: "Group Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              title: "Group Links",
              type: "array",
              of: [{ type: "customLink" }],
            }),
          ],
        },
      ],
    }),
  ],
})
