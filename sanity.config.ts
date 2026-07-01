import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemaTypes"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  basePath: "/studio",
  name: "biolexa-studio",
  title: "BioLexa Content Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content Manager")
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title("Global Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Global Site Settings")
              ),
            // Singleton: Homepage
            S.listItem()
              .title("Homepage Content")
              .id("homepage")
              .child(
                S.document()
                  .schemaType("homepage")
                  .documentId("homepage")
                  .title("Homepage Content")
              ),
            // Singleton: About Page
            S.listItem()
              .title("About Us Content")
              .id("aboutpage")
              .child(
                S.document()
                  .schemaType("aboutpage")
                  .documentId("aboutpage")
                  .title("About Us Content")
              ),
            S.divider(),
            // Navigation
            S.documentTypeListItem("navigation").title("Navigation Menus"),
            S.documentTypeListItem("page").title("Custom Dynamic Pages"),
            S.divider(),
            // Products
            S.documentTypeListItem("product").title("Products Catalog"),
            S.documentTypeListItem("productCategory").title("Product Categories"),
            S.divider(),
            // Blog
            S.documentTypeListItem("post").title("Blog Articles"),
            S.documentTypeListItem("author").title("Authors"),
            S.documentTypeListItem("category").title("Blog Categories"),
            S.documentTypeListItem("tag").title("Blog Tags"),
            S.divider(),
            // Leads & Subscriptions
            S.documentTypeListItem("lead").title("Leads & Subscribers"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
