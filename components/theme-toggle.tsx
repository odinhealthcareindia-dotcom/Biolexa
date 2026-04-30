"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const current = mounted ? (theme === "system" ? resolvedTheme : theme) : "light"
  const isDark = current === "dark"

  const toggle = () => setTheme(isDark ? "light" : "dark")

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] text-[var(--color-text-primary)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inline-flex"
          >
            <Moon size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inline-flex"
          >
            <Sun size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
