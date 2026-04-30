"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion"
import { Menu, X } from "lucide-react"
import BioLexaLogo from "./biolexa-logo"
import ThemeToggle from "./theme-toggle"

const ease = [0.25, 0.1, 0.25, 1] as const

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/aboutus" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 120) {
      setHidden(true)
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
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
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
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-xs bg-[var(--color-background)] z-[70] md:hidden border-r border-[var(--color-border)] shadow-xl"
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
                className="flex flex-col p-4 gap-1"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      initial: { opacity: 0, x: -16 },
                      animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease } },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-lg text-base font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
