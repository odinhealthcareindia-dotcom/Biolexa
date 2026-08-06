/**
 * Reset & Re-Migrate Products Script
 *
 * This script:
 *   1. Deletes ALL documents of type "product" from Sanity
 *   2. Deletes ALL documents of type "productCategory" from Sanity
 *   3. Re-uploads everything from utils/product.js
 *
 * Run with:  node scripts/reset-and-migrate-products.js
 */

const fs = require("fs")
const path = require("path")

// ── Load env variables ──────────────────────────────────────────────
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
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
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

// ── Sanity Client ───────────────────────────────────────────────────
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production"
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error(
    "❌ Missing SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env / .env.local"
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-01",
  token,
  useCdn: false,
})

// ── Load product data ───────────────────────────────────────────────
const originalProductJsPath = path.join(__dirname, "../utils/product.js")
const tempProductJsPath = path.join(__dirname, "temp-product.cjs")

if (!fs.existsSync(originalProductJsPath)) {
  console.error("❌ utils/product.js not found.")
  process.exit(1)
}

const originalContent = fs.readFileSync(originalProductJsPath, "utf8")
const convertedContent = originalContent.replace(
  "export default PRODUCTS;",
  "module.exports = PRODUCTS;"
)
fs.writeFileSync(tempProductJsPath, convertedContent, "utf8")
const productsData = require("./temp-product.cjs")

try {
  fs.unlinkSync(tempProductJsPath)
} catch (_) {
  /* no-op */
}

// ── Helpers ─────────────────────────────────────────────────────────
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// ── Step 1: Delete all documents of a given type ────────────────────
async function deleteAllOfType(typeName) {
  // Loop until there are truly zero documents left.
  // Sanity GROQ has a default result cap, so we explicitly request a large range.
  let pass = 0

  while (true) {
    pass++

    // Fetch ALL IDs — use [0...50000] to override Sanity's default limit
    const ids = await client.fetch(
      `*[_type == $type][0...50000]._id`,
      { type: typeName }
    )

    if (ids.length === 0) {
      if (pass === 1) {
        console.log(`   ℹ️  No existing "${typeName}" documents to delete.`)
      } else {
        console.log(`   ✅ All "${typeName}" documents deleted.\n`)
      }
      return
    }

    console.log(`   🗑  Pass ${pass}: Found ${ids.length} "${typeName}" documents to delete...`)

    // Delete in batches of 100
    const BATCH_SIZE = 100
    for (let i = 0; i < ids.length; i += BATCH_SIZE) {
      const batch = ids.slice(i, i + BATCH_SIZE)
      const tx = client.transaction()
      for (const id of batch) {
        tx.delete(id)
      }
      await tx.commit({ purge: true })
      console.log(
        `   ✅ Deleted batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} docs)`
      )
    }
  }
}


// ── Step 2: Re-upload categories + products ─────────────────────────
async function uploadProducts() {
  // 2a. Create categories
  const categoryMap = new Map()
  const uniqueCategories = [
    ...new Set(productsData.map((p) => p.Category.trim())),
  ]

  console.log(
    `📦 Creating ${uniqueCategories.length} product categories in Sanity...`
  )

  for (const catName of uniqueCategories) {
    const slug = generateSlug(catName)
    try {
      const doc = {
        _type: "productCategory",
        _id: `category-${slug}`,
        title: catName,
        slug: { _type: "slug", current: slug },
      }
      await client.createOrReplace(doc)
      categoryMap.set(catName, doc._id)
      console.log(`   ✅ Category: ${catName}`)
    } catch (err) {
      console.error(`   ❌ Category "${catName}":`, err.message)
    }
  }

  // 2b. Create products
  console.log(
    `\n📦 Uploading ${productsData.length} products to Sanity...`
  )

  let count = 0
  for (const item of productsData) {
    count++
    const cleanName = item.Name.trim()
    const slug = generateSlug(cleanName)
    const categoryRefId = categoryMap.get(item.Category.trim())

    const doc = {
      _type: "product",
      _id: `product-${item.Id}`,
      id: item.Id,
      name: cleanName,
      slug: { _type: "slug", current: slug },
      brandName: "BioLexa",
      category: item.Category.trim(),
      subcategory: item["Sub-category"] ? item["Sub-category"].trim() : "",
      subsubcategory: item["Sub-Sub-Category"]
        ? item["Sub-Sub-Category"].trim()
        : "",
      composition: item.Composition.trim(),
      packing: item.Packing.trim(),
      mrp: Number(item.Mrp) || 0,
      imageLink: item["Image-link"],
      visualAidLink:
        item["Visual-aid"] === "NA" ? null : item["Visual-aid"],
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
      console.log(
        `   [${count}/${productsData.length}] ✅ ${cleanName}`
      )
    } catch (err) {
      console.error(
        `   [${count}/${productsData.length}] ❌ ${cleanName}:`,
        err.message
      )
    }
  }
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════════════════")
  console.log("  🔄 RESET & RE-MIGRATE PRODUCTS")
  console.log("═══════════════════════════════════════════════════════\n")

  // Step 1 — Delete products FIRST (they hold references to categories)
  console.log("STEP 1: Deleting all existing products...\n")
  await deleteAllOfType("product")

  // Step 2 — Now safe to delete categories (no more references)
  console.log("STEP 2: Deleting all existing categories...\n")
  await deleteAllOfType("productCategory")

  // Step 3 — Re-upload
  console.log("STEP 3: Re-uploading products from utils/product.js...\n")
  await uploadProducts()

  console.log("\n═══════════════════════════════════════════════════════")
  console.log("  🎉 DONE! All products have been reset & re-uploaded.")
  console.log("═══════════════════════════════════════════════════════\n")
}

main().catch((err) => {
  console.error("💥 Fatal error:", err)
  process.exit(1)
})
