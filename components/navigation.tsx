"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import BioLexaLogo from "./biolexa-logo"
import ThemeToggle from "./theme-toggle"

const ease = [0.25, 0.1, 0.25, 1] as const

export interface NavItem {
  label: string
  type?: "internal" | "external" | "anchor"
  internal?: string
  external?: string
  anchor?: string
  isCTA?: boolean
  href?: string // fallback/legacy support
}

export interface NavGroup {
  label: string
  links: NavItem[]
}

export type MenuItem = NavItem | NavGroup

interface NavigationProps {
  items?: MenuItem[]
}

const defaultNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/aboutus" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
]

export function getLinkHref(item: NavItem): string {
  if (item.href) return item.href
  if (item.type === "internal") return item.internal || "/"
  if (item.type === "external") return item.external || "/"
  if (item.type === "anchor") return item.anchor || "/"
  return "/"
}

export default function Navigation({ items }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { scrollY } = useScroll()

  const activeItems = items || defaultNavItems

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 120) {
      setHidden(true)
      setActiveDropdown(null)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        initial="visible"
        transition={{ duration: 0.35, ease }}
        className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-background)]/85 border-b border-[var(--color-border)]"
        style={{ transition: "background-color 0.3s ease, border-color 0.3s ease" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2" aria-label="BioLexa home">
              <BioLexaLogo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {activeItems.map((item, idx) => {
                const isGroup = "links" in item && Array.isArray(item.links)

                if (isGroup) {
                  const group = item as NavGroup
                  const isDropdownOpen = activeDropdown === group.label
                  return (
                    <div
                      key={idx}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(group.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors py-2 cursor-pointer"
                      >
                        {group.label}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-1 w-48 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] shadow-xl p-2 z-50 flex flex-col gap-1"
                          >
                            {group.links.map((link, lIdx) => (
                              <Link
                                key={lIdx}
                                href={getLinkHref(link)}
                                className="block px-4 py-2 text-sm rounded-lg text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-primary)] transition-all font-medium"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                } else {
                  const link = item as NavItem
                  const href = getLinkHref(link)
                  if (link.isCTA) {
                    return (
                      <Link
                        key={idx}
                        href={href}
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md active:scale-95 transition-all"
                      >
                        {link.label}
                      </Link>
                    )
                  }
                  return (
                    <Link
                      key={idx}
                      href={href}
                      className="relative text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors group py-2"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  )
                }
              })}
              <ThemeToggle />
            </div>

            {/* Mobile right cluster */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className="p-2 rounded-md text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-xs bg-[var(--color-background)] z-[70] md:hidden border-r border-[var(--color-border)] shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
                <BioLexaLogo size="md" animated={false} />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-md text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <motion.div
                variants={{
                  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                }}
                initial="initial"
                animate="animate"
                className="flex-1 overflow-y-auto p-4 flex flex-col gap-2"
              >
                {activeItems.map((item, idx) => {
                  const isGroup = "links" in item && Array.isArray(item.links)

                  if (isGroup) {
                    const group = item as NavGroup
                    return (
                      <motion.div
                        key={idx}
                        variants={{
                          initial: { opacity: 0, x: -16 },
                          animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease } },
                        }}
                        className="space-y-1"
                      >
                        <p className="px-4 py-1 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                          {group.label}
                        </p>
                        {group.links.map((link, lIdx) => (
                          <Link
                            key={lIdx}
                            href={getLinkHref(link)}
                            onClick={() => setIsOpen(false)}
                            className="block px-6 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-primary)] transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )
                  } else {
                    const link = item as NavItem
                    const href = getLinkHref(link)
                    return (
                      <motion.div
                        key={idx}
                        variants={{
                          initial: { opacity: 0, x: -16 },
                          animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease } },
                        }}
                      >
                        <Link
                          href={href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                            link.isCTA
                              ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] text-center shadow-md my-2"
                              : "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-primary)]"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    )
                  }
                })}
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
