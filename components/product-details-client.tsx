"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Package, Tag } from "lucide-react"
import Link from "next/link"
import { type Product, generateSlug } from "@/utils/products"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import toast from "react-hot-toast"

const ease = [0.25, 0.1, 0.25, 1] as const

interface ProductDetailsClientProps {
  product: Product
  relatedProducts: Product[]
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = contactSchema.safeParse(formData)
    if (!validation.success) {
      toast.error(validation.error.errors[0]?.message || "Invalid form inputs")
      return
    }
    toast.loading("Sending message...")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      toast.dismiss()
      if (data.success) {
        toast.success("Message sent successfully!")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        toast.error("Failed to send message")
      }
    } catch {
      toast.dismiss()
      toast.error("Something went wrong")
    }
  }

  const handleDownload = async () => {
    try {
      const imageUrl = product["Visual-aid"]
      if (!imageUrl) {
        toast.error("Image not available for download")
        return
      }
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "visual-aid.jpg"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed", error)
    }
  }

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
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Products</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-primary)]">{product.Name}</h1>
            <p className="text-white/90 text-lg max-w-2xl">{product.Composition}</p>
          </motion.div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease }}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 flex items-center justify-center"
            >
              <img
                src={product["Image-link"] || "/placeholder.svg"}
                alt={product.Name}
                className="max-w-full h-auto max-h-96 object-contain rounded-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="flex flex-col justify-center"
            >
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[var(--color-secondary)] text-white rounded-full">
                    <Tag size={16} />
                    {product.Category}
                  </span>
                </div>

                <h2 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">{product.Name}</h2>
                <p className="text-[var(--color-text-secondary)] text-lg mb-6 leading-relaxed">
                  {product.Composition}
                </p>

                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-[var(--color-border)]">
                  <Package size={20} className="text-[var(--color-primary)]" />
                  <span className="text-[var(--color-text-secondary)]">Category:</span>
                  <span className="font-medium text-[var(--color-text-primary)]">{product.Category}</span>
                </div>
                <div className="flex items-center gap-2 mb-8 pb-6 border-b border-[var(--color-border)]">
                  <Package size={20} className="text-[var(--color-primary)]" />
                  <span className="text-[var(--color-text-secondary)]">Sub-Category:</span>
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {product["Sub-category"]}, {product["Sub-Sub-Category"]}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <span className="text-[var(--color-text-secondary)] text-lg">Price</span>
                  <a
                    href={`https://wa.me/9218630464?text=Hi%20can%20I%20Know%20more%20about%20${product.Name}%20${product.Category}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-primary-hover)] transition-colors"
                  >
                    <span className="text-3xl font-bold text-[var(--color-primary)]">Enquire</span>
                  </a>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-4 rounded-lg font-semibold text-lg cursor-pointer shadow-md"
                      style={{ transition: "background-color 0.3s ease" }}
                    >
                      Contact for Information
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Contact for Information</DialogTitle>
                      <DialogDescription>
                        Get in touch with us for more details about {product.Name}.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit">Send Message</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual-aid Section */}
      {product["Visual-aid"] && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease }}
            >
              <h2 className="text-2xl font-bold mb-8 text-[var(--color-text-primary)]">Visual Aid</h2>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 flex flex-col items-center">
                <img
                  src={product["Visual-aid"]}
                  alt="Visual aid"
                  className="max-w-full h-auto max-h-96 object-contain rounded-lg mb-4"
                />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleDownload}
                  className="inline-flex items-center px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg font-semibold"
                  style={{ transition: "background-color 0.3s ease" }}
                >
                  Download Image
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease }}
              className="text-2xl font-bold mb-8 text-[var(--color-text-primary)]"
            >
              Related Products
            </motion.h2>
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ whileInView: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.Id}
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                  }}
                  whileHover={{ scale: 1.02, borderColor: "var(--color-primary)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6 cursor-pointer group"
                  style={{ transition: "border-color 0.3s ease, transform 0.2s ease" }}
                >
                  <Link href={`/products/${generateSlug(relatedProduct.Name)}`}>
                    <div className="text-5xl mb-4 group-hover:scale-105 transition-transform">
                      <div className="w-full h-32 flex items-center justify-center">
                        <img
                          src={relatedProduct["Image-link"] || "/placeholder.svg"}
                          alt={relatedProduct.Name}
                          className="max-h-full object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {relatedProduct.Name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">{relatedProduct.Composition}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--color-secondary)] text-white rounded-full">
                        {relatedProduct.Category}
                      </span>
                      <span className="text-sm font-bold text-[var(--color-primary)]">View Details</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </main>
  )
}
