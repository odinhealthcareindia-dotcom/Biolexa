import { InfoOutlineIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "aboutpage",
  title: "About Us Content",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "About Us",
      readOnly: true,
    }),
    defineField({
      name: "headerTitle",
      title: "Header Headline",
      type: "string",
      initialValue: "About BioLexa",
    }),
    defineField({
      name: "headerTagline",
      title: "Header Tagline",
      type: "string",
      initialValue: "Intelligent healthcare, modern formulations, and partnerships built to last.",
    }),
    defineField({
      name: "sections",
      title: "About Us Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "aboutSection",
          title: "About Section",
          fields: [
            defineField({ name: "title", title: "Section Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "image", title: "Section Image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
            defineField({ name: "imageAlt", title: "Image Alt Text", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "content", title: "Content (Rich Text)", type: "portableText", validation: (Rule) => Rule.required() }),
            defineField({ name: "reverse", title: "Reverse Layout (Image on Right)", type: "boolean", initialValue: false }),
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "About Us SEO",
      type: "seo",
    }),
  ],
})
