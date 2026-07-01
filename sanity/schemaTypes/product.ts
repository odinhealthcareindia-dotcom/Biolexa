import { PackageIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "id",
      title: "Product ID (Legacy)",
      type: "number",
      description: "Numeric ID matching the legacy static product database.",
    }),
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      initialValue: "BioLexa",
    }),
    defineField({
      name: "categoryRef",
      title: "Product Category",
      type: "reference",
      to: [{ type: "productCategory" }],
    }),
    defineField({
      name: "category",
      title: "Category (String/Legacy)",
      type: "string",
      description: "e.g., 'Orals', 'Skin Range'",
    }),
    defineField({
      name: "subcategory",
      title: "Sub-category",
      type: "string",
      description: "e.g., 'TABLETS', 'CAPSULES', 'OINTMENTS'",
    }),
    defineField({
      name: "subsubcategory",
      title: "Sub-Sub-Category",
      type: "string",
      description: "e.g., 'Anti-analgesic', 'Anti-Biotic'",
    }),
    defineField({
      name: "composition",
      title: "Composition / Formulation",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "packing",
      title: "Packaging (Packing)",
      type: "string",
      description: "e.g., '10x10 Blister', '30gm'",
    }),
    defineField({
      name: "mrp",
      title: "MRP (Price)",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "imageLink",
      title: "Legacy Image Link (External URL)",
      type: "string",
      description: "External URL from legacy database, e.g. i.ibb.co link.",
    }),
    defineField({
      name: "visualAidLink",
      title: "Legacy Visual Aid Link (External URL)",
      type: "string",
      description: "External URL from legacy database for visual aids.",
    }),
    defineField({
      name: "images",
      title: "Product Images (Asset Pipeline)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Upload fresh high-quality product images.",
    }),
    defineField({
      name: "brochure",
      title: "Brochure / Technical PDF",
      type: "file",
      description: "Upload product brochure or certification sheets.",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      description: "Brief summary shown on catalog pages.",
    }),
    defineField({
      name: "longDescription",
      title: "Long Description / Details",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      description: "If enabled, this product is displayed on the homepage slider.",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Out Of Stock", value: "out-of-stock" },
          { title: "Discontinued", value: "discontinued" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "seo",
      title: "Product SEO",
      type: "seo",
    }),
  ],
})
