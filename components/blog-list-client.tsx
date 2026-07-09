"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Search, Clock } from "lucide-react"
import { useState, useMemo } from "react"
import Link from "next/link"

const ease = [0.25, 0.1, 0.25, 1] as const

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ""
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
}

export interface MappedPost {
  id: string
  title: string
  slug: string
  excerpt: string
  authorName: string
  authorImage?: string
  date: string
  categoryName: string
  readTime: string
  featured: boolean
  image: string
}

interface BlogListClientProps {
  posts: MappedPost[]
}

const cardItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, amount: 0.1 },
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const categories = useMemo(() => {
    return Array.from(new Set(posts.map((a) => a.categoryName).filter(Boolean)))
  }, [posts])

  const filteredArticles = useMemo(() => {
    return posts.filter((article) => {
      debugger
      const matchesCategory = !selectedCategory || article.categoryName === selectedCategory
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [posts, selectedCategory, searchTerm])

  const featuredArticles = useMemo(() => posts.filter((a) => a.featured), [posts])
  const regularArticles = useMemo(() => {
    if (selectedCategory || searchTerm) {
      return filteredArticles
    }
    return filteredArticles.filter((a) => !a.featured)
  }, [filteredArticles, selectedCategory, searchTerm])

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
              Healthcare & <span className="text-[var(--color-primary)]">Wellness Blog</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
            >
              Insights, tips, and industry updates from BioLexa pharmaceutical experts.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && !selectedCategory && !searchTerm && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease }}
              className="text-3xl font-bold mb-8 text-[var(--color-text-primary)]"
            >
              Featured Articles
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {featuredArticles.slice(0, 2).map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="block group"
                >
                  <motion.article
                    variants={cardItem}
                    whileHover={{ scale: 1.01, borderColor: "var(--color-primary)" }}
                    className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl overflow-hidden cursor-pointer h-full flex flex-col justify-between"
                    style={{ transition: "border-color 0.3s ease, transform 0.2s ease" }}
                  >
                    <div>
                      <div className="relative h-56 overflow-hidden bg-gray-100">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute top-4 right-4 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                      <div className="p-6">
                        <span className="bg-[var(--color-primary-soft)] text-[var(--color-primary)] px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider">
                          {article.categoryName}
                        </span>
                        <h3 className="text-xl font-bold mt-3 mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-[var(--color-text-secondary)] mb-4 text-sm line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {article.authorName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(article.date)}
                        </span>
                      </div>
                      <ArrowRight size={18} className="text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.article>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Listing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
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
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar filter */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)]">
                <h2 className="text-lg font-semibold mb-6 text-[var(--color-text-primary)]">Categories</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${selectedCategory === null
                      ? "bg-[var(--color-primary)] text-white font-semibold"
                      : "hover:bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"
                      }`}
                  >
                    All Articles
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${selectedCategory === category
                        ? "bg-[var(--color-primary)] text-white font-semibold"
                        : "hover:bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Showing {regularArticles.length} articles
                  </p>
                </div>
              </div>
            </motion.aside>

            {/* Articles List */}
            <div className="lg:col-span-3">
              {regularArticles.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true, amount: 0.05 }}
                  className="space-y-6"
                >
                  {regularArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/blog/${article.slug}`}
                      className="block group"
                    >
                      <motion.article
                        variants={cardItem}
                        whileHover={{ scale: 1.01, borderColor: "var(--color-primary)" }}
                        className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 cursor-pointer"
                        style={{ transition: "border-color 0.3s ease, transform 0.2s ease" }}
                      >
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="sm:w-48 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <span className="bg-[var(--color-primary-soft)] text-[var(--color-primary)] px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider">
                                {article.categoryName}
                              </span>
                              <h3 className="text-xl font-bold mt-3 mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                                {article.title}
                              </h3>
                              <p className="text-[var(--color-text-secondary)] mb-4 text-sm line-clamp-2 leading-relaxed">
                                {article.excerpt}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                              <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                                <span className="flex items-center gap-1">
                                  <User size={14} />
                                  {article.authorName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  {formatDate(article.date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock size={14} />
                                  {article.readTime}
                                </span>
                              </div>
                              <ArrowRight
                                size={18}
                                className="text-[var(--color-primary)] group-hover:translate-x-1 transition-transform"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-12 text-center"
                >
                  <p className="text-lg text-[var(--color-text-secondary)]">
                    No articles found matching your search.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
