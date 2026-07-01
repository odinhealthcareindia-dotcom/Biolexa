/**
 * Sanity.io Product Migration Script
 * This script imports all products from `utils/product.js` into Sanity.
 * Run with: node scripts/migrate-products.js
 */

const fs = require("fs")
const path = require("path")

// Automatically load local env variables from .env and .env.local files
function loadEnv() {
  const envPaths = [
    path.join(__dirname, "../.env.local"),
    path.join(__dirname, "../.env"),
  ]

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8")
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith("#")) return
        const parts = trimmed.split("=")
        if (parts.length >= 2) {
          const key = parts[0].trim()
          let val = parts.slice(1).join("=").trim()
          // Strip quotes if they wrap the value
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.substring(1, val.length - 1)
          }
          if (!process.env[key]) {
            process.env[key] = val
          }
        }
      })
    }
  }
}

loadEnv()

const { createClient } = require("@sanity/client")

// Read and convert utils/product.js dynamically to CommonJS to load it safely
const originalProductJsPath = path.join(__dirname, "../utils/product.js")
const tempProductJsPath = path.join(__dirname, "temp-product.cjs")

if (!fs.existsSync(originalProductJsPath)) {
  console.error("❌ Error: utils/product.js not found.")
  process.exit(1)
}

const originalContent = fs.readFileSync(originalProductJsPath, "utf8")
const convertedContent = originalContent.replace("export default PRODUCTS;", "module.exports = PRODUCTS;")
fs.writeFileSync(tempProductJsPath, convertedContent, "utf8")

const productsData = require("./temp-product.cjs")

// Delete the temporary file immediately after requiring
try {
  fs.unlinkSync(tempProductJsPath)
} catch (e) {
  // no-op
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production"
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error("❌ Error: Missing SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN environment variables.")
  console.log("Please make sure your .env or .env.local file contains the keys:")
  console.log("NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx")
  console.log("SANITY_API_WRITE_TOKEN=yyyy")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-01",
  token,
  useCdn: false,
})

// Helper to generate a slug from product name
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

async function migrate() {
  console.log(`🚀 Starting migration of ${productsData.length} products to Sanity...`)

  // Step 1: Create or fetch categories first to reference them
  const categoryMap = new Map()
  const uniqueCategories = [...new Set(productsData.map(p => p.Category.trim()))]
  
  console.log(`📦 Creating ${uniqueCategories.length} product categories in Sanity...`)
  
  for (const catName of uniqueCategories) {
    const slug = generateSlug(catName)
    try {
      const doc = {
        _type: "productCategory",
        _id: `category-${slug}`, // deterministic ID
        title: catName,
        slug: { _type: "slug", current: slug },
      }
      await client.createOrReplace(doc)
      categoryMap.set(catName, doc._id)
      console.log(`✅ Created category: ${catName}`)
    } catch (err) {
      console.error(`❌ Failed to create category ${catName}:`, err.message)
    }
  }

  // Step 2: Create product documents
  let count = 0
  for (const item of productsData) {
    count++
    const cleanName = item.Name.trim()
    const slug = generateSlug(cleanName)
    const categoryRefId = categoryMap.get(item.Category.trim())

    const doc = {
      _type: "product",
      _id: `product-${item.Id}`, // deterministic ID matching legacy ID
      id: item.Id,
      name: cleanName,
      slug: { _type: "slug", current: slug },
      brandName: "BioLexa",
      category: item.Category.trim(),
      subcategory: item["Sub-category"] ? item["Sub-category"].trim() : "",
      subsubcategory: item["Sub-Sub-Category"] ? item["Sub-Sub-Category"].trim() : "",
      composition: item.Composition.trim(),
      packing: item.Packing.trim(),
      mrp: Number(item.Mrp) || 0,
      imageLink: item["Image-link"],
      visualAidLink: item["Visual-aid"] === "NA" ? null : item["Visual-aid"],
      status: "active",
      featured: false,
    }

    if (categoryRefId) {
      doc.categoryRef = {
        _type: "reference",
        _ref: categoryRefId,
      }
    }

    try {
      await client.createOrReplace(doc)
      console.log(`[${count}/${productsData.length}] ✅ Migrated product: ${cleanName}`)
    } catch (err) {
      console.error(`❌ Failed to migrate product ${cleanName}:`, err.message)
    }
  }

  console.log("🎉 Migration finished successfully!")
}

migrate().catch(err => {
  console.error("💥 Fatal migration error:", err)
})
