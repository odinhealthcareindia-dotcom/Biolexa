"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Search } from "lucide-react"
import { useState, useMemo } from "react"

const ease = [0.25, 0.1, 0.25, 1] as const

interface BlogArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  readTime: string
  featured: boolean
  image: string
}

const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "1",
    title: "The Future of Pharmaceutical Innovation",
    excerpt: "Exploring the latest advancements in drug development and their impact on healthcare.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Rajesh Kumar",
    date: "2024-11-15",
    category: "Industry Insights",
    readTime: "5 min read",
    featured: true,
    image: "/pharmaceutical-research.jpg",
  },
  {
    id: "2",
    title: "GMP Certification: What It Means for Your Health",
    excerpt: "Understanding Good Manufacturing Practice and why it matters for pharmaceutical safety.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Priya Sharma",
    date: "2024-11-10",
    category: "Regulatory",
    readTime: "7 min read",
    featured: true,
    image: "/gmp-certification.jpg",
  },
  {
    id: "3",
    title: "Vitamin Deficiency: Signs and Solutions",
    excerpt: "A comprehensive guide to recognizing vitamin deficiencies and treatment options.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Amit Patel",
    date: "2024-11-05",
    category: "Health Tips",
    readTime: "6 min read",
    featured: false,
    image: "/vitamins-health.jpg",
  },
  {
    id: "4",
    title: "Antibiotic Resistance: A Global Challenge",
    excerpt: "How proper antibiotic usage can help combat the growing resistance crisis.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Neha Gupta",
    date: "2024-10-28",
    category: "Industry Insights",
    readTime: "8 min read",
    featured: false,
    image: "/antibiotics-resistance.jpg",
  },
  {
    id: "5",
    title: "Diabetes Management: Best Practices",
    excerpt: "Effective strategies for managing diabetes through medication and lifestyle changes.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Sanjay Singh",
    date: "2024-10-20",
    category: "Health Tips",
    readTime: "6 min read",
    featured: false,
    image: "/diabetes-management.jpg",
  },
  {
    id: "6",
    title: "ISO Standards in Pharmaceutical Manufacturing",
    excerpt: "An overview of ISO compliance requirements and quality assurance processes.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Anjali Verma",
    date: "2024-10-12",
    category: "Regulatory",
    readTime: "7 min read",
    featured: false,
    image: "/iso-standards.jpg",
  },
]

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

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const categories = Array.from(new Set(BLOG_ARTICLES.map((a) => a.category)))

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory = !selectedCategory || article.category === selectedCategory
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const featuredArticles = BLOG_ARTICLES.filter((a) => a.featured)
  const regularArticles = filteredArticles.filter((a) => !a.featured)

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* Header Section */}
      <section className="bg-[var(--color-secondary)] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-[var(--color-primary)]/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Healthcare & <span className="text-[var(--color-primary)]">Wellness</span> Blog
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Insights, tips, and industry updates from BioLexa pharmaceutical experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
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
              {featuredArticles.map((article) => (
                <motion.article
                  key={article.id}
                  variants={cardItem}
                  whileHover={{ scale: 1.02, borderColor: "var(--color-primary)" }}
                  className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl overflow-hidden group cursor-pointer"
                  style={{ transition: "border-color 0.3s ease, transform 0.2s ease" }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-4 right-4 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="bg-[var(--color-primary-soft)] text-[var(--color-primary)] px-2 py-1 rounded text-xs font-medium">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold mt-3 mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                      <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(article.date).toLocaleDateString()}
                        </span>
                      </div>
                      <ArrowRight size={18} className="text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)]">
                <h2 className="text-lg font-semibold mb-6 text-[var(--color-text-primary)]">Categories</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === null
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
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedCategory === category
                          ? "bg-[var(--color-primary)] text-white font-semibold"
                          : "hover:bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Showing {regularArticles.length} articles
                  </p>
                </div>
              </div>
            </motion.aside>

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
                    <motion.article
                      key={article.id}
                      variants={cardItem}
                      whileHover={{ scale: 1.01, borderColor: "var(--color-primary)" }}
                      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 group cursor-pointer"
                      style={{ transition: "border-color 0.3s ease, transform 0.2s ease" }}
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="sm:w-48 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="bg-[var(--color-primary-soft)] text-[var(--color-primary)] px-2 py-1 rounded text-xs font-medium">
                              {article.category}
                            </span>
                            <h3 className="text-xl font-bold mt-3 mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-[var(--color-text-secondary)] mb-4">{article.excerpt}</p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                              <span className="flex items-center gap-1">
                                <User size={14} />
                                {article.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(article.date).toLocaleDateString()}
                              </span>
                              <span>{article.readTime}</span>
                            </div>
                            <ArrowRight
                              size={18}
                              className="text-[var(--color-primary)] group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.article>
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
