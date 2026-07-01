import { defineField, defineType } from "sanity"

export default defineType({
  name: "customLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Link Label / Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Internal Path / Page Reference", value: "internal" },
          { title: "External URL", value: "external" },
          { title: "Anchor Section (e.g., #contact)", value: "anchor" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
    }),
    defineField({
      name: "internal",
      title: "Internal Link / Path",
      type: "string",
      description: "Relative URL starting with '/', e.g., '/products', '/aboutus' or reference a page.",
      hidden: ({ parent }) => parent?.type !== "internal",
    }),
    defineField({
      name: "external",
      title: "External URL",
      type: "url",
      description: "Absolute URL starting with http:// or https://",
      hidden: ({ parent }) => parent?.type !== "external",
    }),
    defineField({
      name: "anchor",
      title: "Anchor Link ID",
      type: "string",
      description: "e.g., '#contact'",
      hidden: ({ parent }) => parent?.type !== "anchor",
    }),
    defineField({
      name: "isCTA",
      title: "Style as Call-to-Action Button",
      type: "boolean",
      description: "If checked, this link will be highlighted as a button in navigation.",
      initialValue: false,
    }),
  ],
})
