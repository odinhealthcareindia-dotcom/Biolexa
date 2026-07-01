import { CogIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General Info" },
    { name: "contact", title: "Contact Details" },
    { name: "social", title: "Social Links" },
    { name: "seo", title: "Global SEO" },
    { name: "announcement", title: "Announcement Bar" },
    { name: "cookies", title: "Cookie Banner" },
  ],
  fields: [
    // General Group
    defineField({
      name: "siteName",
      title: "Website Name",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Website Tagline",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "logo",
      title: "Website Logo (Light Background)",
      type: "image",
      group: "general",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoDark",
      title: "Website Logo (Dark Background / Header)",
      type: "image",
      group: "general",
      options: { hotspot: true },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "general",
    }),

    // Contact Group
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phoneNumbers",
      title: "Phone Numbers",
      type: "array",
      of: [{ type: "string" }],
      group: "contact",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      description: "Include country code, e.g. +919218630464",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Business Address",
      type: "text",
      group: "contact",
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g., 'Mon - Sat: 9:00 AM - 6:00 PM'",
      group: "contact",
    }),

    // Social Group
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      group: "social",
      fields: [
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
        defineField({ name: "twitter", title: "X (Twitter)", type: "url" }),
      ],
    }),

    // Announcement Bar Group
    defineField({
      name: "announcement",
      title: "Announcement Bar Settings",
      type: "object",
      group: "announcement",
      fields: [
        defineField({ name: "enabled", title: "Enable Announcement Bar", type: "boolean" }),
        defineField({ name: "text", title: "Text Content", type: "string" }),
        defineField({ name: "link", title: "Link Path / URL", type: "string" }),
      ],
    }),

    // Cookies Group
    defineField({
      name: "cookies",
      title: "Cookie Banner Settings",
      type: "object",
      group: "cookies",
      fields: [
        defineField({ name: "enabled", title: "Enable Cookie Banner", type: "boolean" }),
        defineField({ name: "text", title: "Disclaimer Text", type: "text" }),
      ],
    }),

    // SEO Group
    defineField({
      name: "seo",
      title: "Default SEO Metadata",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "copyright",
      title: "Footer Copyright Text",
      type: "string",
      group: "general",
      description: "e.g., 'BioLexa. All rights reserved.'",
    }),
    defineField({
      name: "googleAnalyticsId",
      title: "Google Analytics ID (G-XXXXXX)",
      type: "string",
      group: "general",
    }),
  ],
})
