import { defineField, defineType } from "sanity"

export default defineType({
  name: "lead",
  title: "Leads & Subscribers",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "type",
      title: "Lead Type",
      type: "string",
      options: {
        list: [
          { title: "Newsletter Subscription", value: "newsletter" },
          { title: "Contact Form Submission", value: "contact" },
        ],
      },
      initialValue: "newsletter",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Unsubscribed", value: "unsubscribed" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "type",
    },
  },
})
