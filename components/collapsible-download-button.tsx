"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Download, X } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"

const ease = [0.25, 0.1, 0.25, 1] as const

const brochureSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  message: z.string().optional(),
})

const triggerBrochureDownload = () => {
  const link = document.createElement("a")
  link.href = "/brochure.pdf"
  link.download = "biolexa-brochure.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function CollapsibleDownloadButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = brochureSchema.safeParse(formData)
    if (!validation.success) {
      toast.error(validation.error.errors[0]?.message || "Invalid form inputs")
      return
    }

    setIsSubmitting(true)
    toast.loading("Submitting...")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message:
            formData.message?.trim() ||
            "Brochure download request from the website.",
        }),
      })
      const data = await res.json()
      toast.dismiss()
      if (data.success) {
        toast.success("Thank you! Your brochure is downloading.")
        triggerBrochureDownload()
        setFormData({ name: "", email: "", phone: "", message: "" })
        setIsOpen(false)
      } else {
        toast.error("Failed to submit. Please try again.")
      }
    } catch {
      toast.dismiss()
      toast.error("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <motion.div
        className="fixed bottom-16 left-2 z-50 overflow-hidden rounded-full"
        initial={{ width: 125 }}
        animate={{ width: 44 }}
        whileHover={{ width: 140 }}
        transition={{ duration: 0.4, ease }}
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-start bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-3 py-2.5 rounded-full w-full cursor-pointer"
          aria-label="Download brochure"
          style={{ transition: "background-color 0.3s ease" }}
        >
          <Download size={20} className="mr-3 flex-shrink-0" />
          <span className="whitespace-nowrap font-medium text-sm">Brochure</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="brochure-modal-title"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !isSubmitting && setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
              className="relative w-full max-w-md max-h-[calc(100dvh-2rem)] flex flex-col bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] overflow-hidden"
              style={{ boxShadow: "var(--shadow-lg)" }}
            >
              <button
                type="button"
                onClick={() => !isSubmitting && setIsOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full text-[var(--color-text-secondary)] bg-[var(--color-background)]/70 hover:bg-[var(--color-surface)] cursor-pointer"
                style={{ transition: "background-color 0.2s ease" }}
              >
                <X size={18} />
              </button>

              <div className="px-6 pt-5 pb-5 overflow-y-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-2.5 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] text-xs font-semibold tracking-wide uppercase">
                  <Download size={12} /> Brochure
                </div>
                <h3
                  id="brochure-modal-title"
                  className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-1"
                >
                  Download Our Brochure
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-5">
                  Share a few details and we'll start your download right away.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[var(--color-text-primary)]">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)] disabled:opacity-60"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[var(--color-text-primary)]">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)] disabled:opacity-60"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[var(--color-text-primary)]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      disabled={isSubmitting}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)] disabled:opacity-60"
                      placeholder="+91 92186 30464"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[var(--color-text-primary)]">
                      Message <span className="text-[var(--color-text-muted)] font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)] resize-none disabled:opacity-60"
                      placeholder="Tell us anything specific you're looking for..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg font-semibold shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ transition: "background-color 0.3s ease" }}
                  >
                    <Download size={18} />
                    {isSubmitting ? "Submitting..." : "Submit & Download"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
