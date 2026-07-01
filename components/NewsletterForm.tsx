"use client"

import type React from "react"
import { useState } from "react"
import toast from "react-hot-toast"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setLoading(true)
    const toastId = toast.loading("Subscribing to newsletter...")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      toast.dismiss(toastId)

      if (data.success) {
        toast.success(data.message || "Subscribed successfully!")
        setEmail("")
      } else {
        toast.error(data.message || "Failed to subscribe")
      }
    } catch (error) {
      toast.dismiss(toastId)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubscribe} className="bg-[var(--color-primary-soft)] p-6 rounded-xl border border-red-100 flex flex-col text-center w-full">
      <span className="text-3xl mb-3">📬</span>
      <h4 className="font-bold text-lg text-[var(--color-text-primary)] mb-2">Subscribe to Newsletter</h4>
      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
        Stay updated with the latest pharmaceutical innovation, health guidance, and PCD franchise opportunities.
      </p>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full px-3 py-2 rounded-lg border border-red-200 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] bg-white text-gray-800 text-center mb-2"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  )
}
