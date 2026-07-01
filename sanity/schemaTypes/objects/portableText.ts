import { defineField, defineType } from "sanity"

export default defineType({
  name: "portableText",
  title: "Portable Text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 1", value: "h1" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "External Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
              },
              {
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
                initialValue: true,
              },
            ],
          },
        ],
      },
    },
    // Standard Image
    {
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alternative Text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    },
    // Simple Table
    {
      type: "object",
      name: "customTable",
      title: "Table",
      fields: [
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            {
              type: "object",
              name: "tableRow",
              fields: [
                defineField({
                  name: "cells",
                  title: "Cells",
                  type: "array",
                  of: [{ type: "string" }],
                }),
              ],
            },
          ],
        }),
      ],
    },
    // Code block with syntax highlighting
    {
      type: "object",
      name: "codeBlock",
      title: "Code Block",
      fields: [
        defineField({
          name: "language",
          title: "Language",
          type: "string",
          options: {
            list: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "JSON", value: "json" },
              { title: "Bash", value: "bash" },
            ],
          },
          initialValue: "javascript",
        }),
        defineField({
          name: "code",
          title: "Code Content",
          type: "text",
        }),
      ],
    },
    // Custom Callout Box
    {
      type: "object",
      name: "callout",
      title: "Callout Box",
      fields: [
        defineField({
          name: "type",
          title: "Callout Type",
          type: "string",
          options: {
            list: [
              { title: "Info (Blue)", value: "info" },
              { title: "Warning (Yellow)", value: "warning" },
              { title: "Error (Red)", value: "error" },
              { title: "Success (Green)", value: "success" },
            ],
          },
          initialValue: "info",
        }),
        defineField({
          name: "text",
          title: "Message Text",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
      ],
    },
    // File Download Button
    {
      type: "object",
      name: "fileDownload",
      title: "File Download",
      fields: [
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          initialValue: "Download File",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "file",
          title: "File Attachment",
          type: "file",
          validation: (Rule) => Rule.required(),
        }),
      ],
    },
  ],
})
