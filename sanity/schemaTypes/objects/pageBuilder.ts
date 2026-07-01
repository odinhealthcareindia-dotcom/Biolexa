import { defineField, defineType } from "sanity"

export default defineType({
  name: "pageBuilder",
  title: "Page Builder Blocks",
  type: "array",
  of: [
    // 1. Hero Block
    {
      type: "object",
      name: "heroBlock",
      title: "Hero Banner",
      fields: [
        defineField({ name: "title", title: "Headline", type: "string" }),
        defineField({ name: "subtitle", title: "Sub-headline / Description", type: "text" }),
        defineField({ name: "backgroundImage", title: "Background Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "ctaText", title: "Primary CTA Button Text", type: "string" }),
        defineField({ name: "ctaLink", title: "Primary CTA Button Path / Link", type: "string" }),
        defineField({ name: "ctaTextSecondary", title: "Secondary CTA Button Text", type: "string" }),
        defineField({ name: "ctaLinkSecondary", title: "Secondary CTA Button Path / Link", type: "string" }),
      ],
    },
    // 2. Rich Text Block
    {
      type: "object",
      name: "richTextBlock",
      title: "Rich Text Section",
      fields: [
        defineField({ name: "content", title: "Content", type: "portableText" }),
      ],
    },
    // 3. Single Image
    {
      type: "object",
      name: "imageBlock",
      title: "Single Image Section",
      fields: [
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "alt", title: "Alternative Text", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    },
    // 4. Image Gallery
    {
      type: "object",
      name: "galleryBlock",
      title: "Image Gallery",
      fields: [
        defineField({ name: "title", title: "Gallery Title", type: "string" }),
        defineField({
          name: "images",
          title: "Images",
          type: "array",
          of: [{ type: "image", options: { hotspot: true } }],
        }),
      ],
    },
    // 5. Video Block
    {
      type: "object",
      name: "videoBlock",
      title: "Video Section",
      fields: [
        defineField({ name: "title", title: "Section Title", type: "string" }),
        defineField({ name: "videoUrl", title: "YouTube / Vimeo Video URL", type: "url" }),
        defineField({ name: "videoFile", title: "Direct MP4 File Upload", type: "file" }),
      ],
    },
    // 6. FAQ Block
    {
      type: "object",
      name: "faqBlock",
      title: "FAQ Section (Accordion)",
      fields: [
        defineField({ name: "title", title: "FAQ Title", type: "string", initialValue: "Frequently Asked Questions" }),
        defineField({
          name: "items",
          title: "FAQ Items",
          type: "array",
          of: [
            {
              type: "object",
              name: "faqItem",
              fields: [
                defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "answer", title: "Answer", type: "text", validation: (Rule) => Rule.required() }),
              ],
            },
          ],
        }),
      ],
    },
    // 7. Testimonials Block
    {
      type: "object",
      name: "testimonialsBlock",
      title: "Testimonials Slider",
      fields: [
        defineField({ name: "title", title: "Section Title", type: "string", initialValue: "What Our Customers Say" }),
        defineField({
          name: "items",
          title: "Testimonials",
          type: "array",
          of: [
            {
              type: "object",
              name: "testimonialItem",
              fields: [
                defineField({ name: "customerName", title: "Customer Name", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "designation", title: "Designation / Role", type: "string" }),
                defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
                defineField({ name: "rating", title: "Rating (1 to 5)", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
                defineField({ name: "reviewText", title: "Review", type: "text", validation: (Rule) => Rule.required() }),
              ],
            },
          ],
        }),
      ],
    },
    // 8. CTA Section
    {
      type: "object",
      name: "ctaBlock",
      title: "Call To Action Banner",
      fields: [
        defineField({ name: "title", title: "Headline", type: "string" }),
        defineField({ name: "description", title: "Description Text", type: "text" }),
        defineField({ name: "ctaLink", title: "Link Button", type: "customLink" }),
      ],
    },
    // 9. Cards Block
    {
      type: "object",
      name: "cardsBlock",
      title: "Cards Grid",
      fields: [
        defineField({ name: "title", title: "Section Title", type: "string" }),
        defineField({ name: "subtitle", title: "Section Subtitle", type: "text" }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "cardItem",
              fields: [
                defineField({ name: "title", title: "Card Title", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "description", title: "Card Description", type: "text" }),
                defineField({ name: "iconName", title: "Lucide Icon Name (e.g., 'Check', 'Pill', 'FlaskConical')", type: "string" }),
                defineField({ name: "link", title: "Card Link (Optional)", type: "customLink" }),
              ],
            },
          ],
        }),
      ],
    },
    // 10. Statistics Block
    {
      type: "object",
      name: "statisticsBlock",
      title: "Statistics Panel",
      fields: [
        defineField({ name: "title", title: "Section Title", type: "string" }),
        defineField({
          name: "items",
          title: "Stats Items",
          type: "array",
          of: [
            {
              type: "object",
              name: "statItem",
              fields: [
                defineField({ name: "value", title: "Numeric Value (e.g., 350)", type: "number", validation: (Rule) => Rule.required() }),
                defineField({ name: "suffix", title: "Suffix (e.g., '+', '/7')", type: "string" }),
                defineField({ name: "label", title: "Label Description", type: "string", validation: (Rule) => Rule.required() }),
              ],
            },
          ],
        }),
      ],
    },
    // 11. Timeline Block
    {
      type: "object",
      name: "timelineBlock",
      title: "Timeline Chronology",
      fields: [
        defineField({ name: "title", title: "Section Title", type: "string" }),
        defineField({
          name: "items",
          title: "Timeline Events",
          type: "array",
          of: [
            {
              type: "object",
              name: "timelineEvent",
              fields: [
                defineField({ name: "date", title: "Year / Date (e.g., '2024')", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "title", title: "Event Title", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "description", title: "Event Description", type: "text" }),
              ],
            },
          ],
        }),
      ],
    },
    // 12. Team Grid
    {
      type: "object",
      name: "teamBlock",
      title: "Team Members Grid",
      fields: [
        defineField({ name: "title", title: "Section Title", type: "string", initialValue: "Our Team" }),
        defineField({
          name: "members",
          title: "Members List",
          type: "array",
          of: [
            {
              type: "object",
              name: "teamMember",
              fields: [
                defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "role", title: "Role / Position", type: "string" }),
                defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
              ],
            },
          ],
        }),
      ],
    },
    // 13. Contact Form Block
    {
      type: "object",
      name: "contactFormBlock",
      title: "Contact Form Section",
      fields: [
        defineField({ name: "title", title: "Headline", type: "string", initialValue: "Get in Touch" }),
        defineField({ name: "subtitle", title: "Description Text", type: "text", initialValue: "Tell us about your needs — our team will reach out within one business day." }),
      ],
    },
    // 14. Product Grid
    {
      type: "object",
      name: "productGridBlock",
      title: "Product Listing Grid",
      fields: [
        defineField({ name: "title", title: "Headline", type: "string" }),
        defineField({ name: "categoryFilter", title: "Category Filter Tag (Optional)", type: "string" }),
        defineField({ name: "featuredOnly", title: "Show Featured Products Only", type: "boolean", initialValue: false }),
      ],
    },
    // 15. Logo Grid
    {
      type: "object",
      name: "logoGridBlock",
      title: "Logo Showcase Grid",
      fields: [
        defineField({ name: "title", title: "Section Title", type: "string" }),
        defineField({
          name: "logos",
          title: "Logos",
          type: "array",
          of: [
            {
              type: "object",
              name: "logoItem",
              fields: [
                defineField({ name: "name", title: "Partner Name", type: "string" }),
                defineField({ name: "logoImage", title: "Logo Image", type: "image" }),
              ],
            },
          ],
        }),
      ],
    },
    // 16. Custom HTML
    {
      type: "object",
      name: "htmlBlock",
      title: "Custom HTML Embed",
      fields: [
        defineField({ name: "htmlCode", title: "HTML Code", type: "text", description: "Embed scripts, Google maps, or iframe widgets." }),
      ],
    },
    // 17. Quote
    {
      type: "object",
      name: "quoteBlock",
      title: "Quote Section",
      fields: [
        defineField({ name: "quote", title: "Quote Text", type: "text", validation: (Rule) => Rule.required() }),
        defineField({ name: "author", title: "Author Name", type: "string" }),
      ],
    },
  ],
})
