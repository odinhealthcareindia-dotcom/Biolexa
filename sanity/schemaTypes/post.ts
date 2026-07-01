import { DocumentTextIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
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
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alternative Text" }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt / Short Summary",
      type: "text",
      description: "Brief summary shown on blog listing cards.",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "portableText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Reading Time (e.g., '5 min read')",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      description: "Display in the featured hero grid at /blog.",
      initialValue: false,
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    }),
    defineField({
      name: "seo",
      title: "Article SEO Metadata",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection
      return {
        ...selection,
        subtitle: author ? `by ${author}` : "",
      };
    },
  },
})
