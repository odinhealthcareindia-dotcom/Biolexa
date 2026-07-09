"use client"

import { motion } from "framer-motion"
import { Filter, Search, Send } from "lucide-react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { type Product, generateSlug } from "@/utils/products"
import EnquiryModal from "@/components/EnquiryModal"

const ease = [0.25, 0.1, 0.25, 1] as const

const cardItem = {
  initial: { opacity: 1, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.06 } },
  viewport: { once: true, amount: 0.05 },
}

interface ProductsListClientProps {
  products: Product[]
}

export default function ProductsListClient({ products }: ProductsListClientProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  function openModal(product: Product) {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const categoryMap = useMemo(() => {
    const map = new Map<string, Map<string, Set<string>>>()
    products.forEach((product) => {
      if (!map.has(product.Category)) map.set(product.Category, new Map())
      const subMap = map.get(product.Category)!
      if (!subMap.has(product["Sub-category"])) subMap.set(product["Sub-category"], new Set())
      subMap.get(product["Sub-category"])!.add(product["Sub-Sub-Category"])
    })
    return map
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = !selectedCategory || product.Category === selectedCategory
      const matchesSubCategory = !selectedSubCategory || product["Sub-category"] === selectedSubCategory
      const matchesSubSubCategory =
        !selectedSubSubCategory || product["Sub-Sub-Category"] === selectedSubSubCategory
      const matchesSearch =
        product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.Composition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product["Sub-category"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        product["Sub-Sub-Category"].toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSubCategory && matchesSubSubCategory && matchesSearch
    })
  }, [products, selectedCategory, selectedSubCategory, selectedSubSubCategory, searchTerm])

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-[var(--color-primary)]/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-text-primary)]"
            >
              Our Product <span className="text-[var(--color-primary)]">Catalog</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
            >
              Browse the BioLexa range of pharmaceutical products.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-[var(--color-text-muted)]" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories Filter */}
            <motion.aside
              initial={{ opacity: 1, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="lg:col-span-1"
            >
              <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-6">
                  <Filter size={20} className="text-[var(--color-primary)]" />
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Categories</h2>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setSelectedSubCategory(null)
                      setSelectedSubSubCategory(null)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${selectedCategory === null && selectedSubCategory === null && selectedSubSubCategory === null
                      ? "bg-[var(--color-primary)] text-white font-semibold"
                      : "hover:bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"
                      }`}
                  >
                    All Products
                  </button>
                  {Array.from(categoryMap.entries()).map(([category, subMap]) => (
                    <div key={category} className="space-y-2">
                      <button
                        onClick={() => {
                          setSelectedCategory(category)
                          setSelectedSubCategory(null)
                          setSelectedSubSubCategory(null)
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${selectedCategory === category && selectedSubCategory === null && selectedSubSubCategory === null
                          ? "bg-[var(--color-primary)] text-white font-semibold"
                          : "hover:bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"
                          }`}
                      >
                        {category}
                      </button>
                      {selectedCategory === category &&
                        Array.from(subMap.entries()).map(([subCat, subSubSet]) => (
                          <div key={subCat} className="ml-4 space-y-1">
                            <button
                              onClick={() => {
                                setSelectedSubCategory(subCat)
                                setSelectedSubSubCategory(null)
                              }}
                              className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${selectedSubCategory === subCat && selectedSubSubCategory === null
                                ? "bg-[var(--color-primary)] text-white font-semibold"
                                : "hover:bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"
                                }`}
                            >
                              {subCat}
                            </button>
                            {selectedSubCategory === subCat &&
                              Array.from(subSubSet).map((subSub) => (
                                <button
                                  key={subSub}
                                  onClick={() => setSelectedSubSubCategory(subSub)}
                                  className={`w-full text-left px-4 py-2 rounded-lg transition-all text-xs ml-4 ${selectedSubSubCategory === subSub
                                    ? "bg-[var(--color-primary)] text-white font-semibold"
                                    : "hover:bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"
                                    }`}
                                >
                                  {subSub}
                                </button>
                              ))}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>
              </div>
            </motion.aside>

            {/* Products Grid */}
            <div className="lg:col-span-3 w-full">
              {filteredProducts.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true, amount: 0.05 }}
                  className="grid grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.Id}
                      variants={cardItem}
                      whileHover={{ scale: 1.02, borderColor: "var(--color-primary)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push(`/products/${generateSlug(product.Name)}`)}
                      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 cursor-pointer group overflow-hidden flex flex-col"
                      style={{ transition: "border-color 0.3s ease, transform 0.2s ease" }}
                    >
                      <div className="text-5xl mb-4 group-hover:scale-105 transition-transform">

                        <div className="w-full h-32 flex items-center justify-center">
                          <img
                            src={product["Image-link"] || "/placeholder.svg"}
                            alt={product.Name}
                            className="max-h-full object-contain"
                          />
                        </div>

                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                        {product.Name}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-3 w-full text-ellipsis overflow-hidden text-nowrap">
                        {product.Composition}
                      </p>
                      <div className="flex items-center pt-4 border-t border-[var(--color-border)] mt-auto">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--color-secondary)] text-white rounded-full">
                          {product.Category}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openModal(product)
                        }}
                        className="mt-3 w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:scale-95 text-white py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-200 cursor-pointer group/btn"
                      >
                        <Send size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        Send Enquiry
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-12 text-center"
                >
                  <p className="text-lg text-[var(--color-text-secondary)]">
                    No products found matching your search.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
    </main>
  )
}
