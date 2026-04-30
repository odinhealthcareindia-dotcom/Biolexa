"use client"

import type React from "react"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, Check, Pill, Syringe, FlaskConical, Droplets } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { z } from "zod"
import toast from "react-hot-toast"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const ease = [0.25, 0.1, 0.25, 1] as const

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, amount: 0.2 },
}

const cardItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease },
}

// Counter that animates 0 -> value when scrolled into view
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, value, motionVal])

  useEffect(() => {
    return spring.on("change", (latest) => setDisplay(Math.round(latest)))
  }, [spring])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [carouselApi, setCarouselApi] = useState<any>(null)

  useEffect(() => {
    if (!carouselApi) return
    const interval = setInterval(() => {
      carouselApi.scrollNext()
    }, 10000)
    return () => clearInterval(interval)
  }, [carouselApi])

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

  const features = [
    { title: "GMP Certified", description: "Manufacturing facility certified by Good Manufacturing Practice" },
    { title: "ISO Compliance", description: "Meets all international ISO standards for quality assurance" },
    { title: "Wide Range", description: "Extensive portfolio of pharmaceutical products across categories" },
    { title: "24/7 Support", description: "Dedicated customer support team available round the clock" },
  ]

  const categories = [
    { name: "Tablets", Icon: Pill },
    { name: "Capsules", Icon: FlaskConical },
    { name: "Injections", Icon: Syringe },
    { name: "Syrups", Icon: Droplets },
  ]

  const stats = [
    { value: 350, suffix: "+", label: "Quality-Assured Products" },
    { value: 100, suffix: "+", label: "PCD Associates" },
    { value: 9, suffix: "+", label: "Therapeutic Segments" },
    { value: 24, suffix: "/7", label: "Customer Support" },
  ]

  const heroSlides = [
    {
      title: "Intelligent Healthcare Solutions",
      description:
        "BioLexa delivers cutting-edge pharmaceutical products with trusted certifications and excellence in every formulation.",
      image: "https://i.ibb.co/Qv5WPN6p/New-Project.jpg",
      ctaText: "Explore Products",
      ctaLink: "/products",
    },
    {
      title: "GMP Certified Excellence",
      description:
        "Manufacturing facility certified by Good Manufacturing Practice ensuring the highest quality standards.",
      image: "https://i.ibb.co/mCQGcmpk/Chat-GPT-Image-Dec-10-2025-11-50-17-PM.png",
      ctaText: "Learn More",
      ctaLink: "/products",
    },
    {
      title: "A Wide Range of Products",
      description:
        "Extensive portfolio of pharmaceutical products across multiple categories for all your healthcare needs.",
      image: "https://i.ibb.co/V0jvtgFs/Chat-GPT-Image-Dec-11-2025-11-37-35-AM.png",
      ctaText: "View Catalog",
      ctaLink: "/products",
    },
  ]

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* Hero Carousel Section */}
      <section className="relative overflow-hidden">
        <Carousel className="w-full" opts={{ loop: true }} setApi={setCarouselApi}>
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="text-white py-24 px-4 sm:px-6 lg:px-24 relative overflow-hidden min-h-[520px] flex items-center">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

                  <div className="max-w-7xl mx-auto relative z-10 w-full">
                    <motion.div
                      key={`slide-${index}`}
                      initial="initial"
                      animate="animate"
                      variants={{ animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
                      className="max-w-3xl"
                    >
                      <motion.div
                        variants={{
                          initial: { opacity: 0, y: 12 },
                          animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                        }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-xs font-semibold tracking-wide uppercase"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" /> BioLexa
                      </motion.div>

                      <h1 className="text-4xl sm:text-5xl text-white/90 lg:text-6xl font-bold mb-6 text-balance leading-tight">
                        {slide.title.split(" ").map((word, i) => (
                          <motion.span
                            key={i}
                            variants={{
                              initial: { opacity: 0, y: 20 },
                              animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                            }}
                            className="inline-block mr-3"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </h1>

                      <motion.p
                        variants={{
                          initial: { opacity: 0, y: 20 },
                          animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                        }}
                        className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div
                        variants={{
                          initial: { opacity: 0, y: 30 },
                          animate: {
                            opacity: 1,
                            y: 0,
                            transition: { type: "spring", stiffness: 120, damping: 18 },
                          },
                        }}
                        className="flex gap-4 flex-wrap"
                      >
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                          <Link
                            href={slide.ctaLink}
                            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 shadow-lg"
                            style={{ transition: "background-color 0.3s ease" }}
                          >
                            {slide.ctaText} <ArrowRight size={18} />
                          </Link>
                        </motion.div>
                        <motion.a
                          href="#contact"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          className="bg-white text-[var(--color-secondary)] px-8 py-3 rounded-lg font-semibold inline-flex items-center"
                        >
                          Contact Us
                        </motion.a>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
        </Carousel>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto">
          <motion.h2 {...fadeInUp} className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Welcome to <span className="text-[var(--color-primary)]">BioLexa</span>
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-center text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-14"
          >
            Your Trusted ISO 9001:2015–Certified Pharmaceutical Partner
          </motion.p>

          <div className="flex flex-col-reverse md:flex-row items-center md:space-x-8 space-y-6 md:space-y-0 max-w-5xl mx-auto gap-6">
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease }}
              className="flex-1 space-y-4"
            >
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                Modern Healthcare, Built on Trust
              </h3>

              <p className="text-[var(--color-text-secondary)] leading-relaxed text-justify">
                <strong className="text-[var(--color-text-primary)]">BioLexa</strong> is an ISO 9001:2015–certified
                pharmaceutical company offering a wide portfolio of GMP-WHO certified products across Dermatology &
                Cosmetics, Cardiology & Diabetology, General Medicine, Critical Care, Dental Care, Ophthalmology,
                Gynecology, and Pediatrics.
              </p>

              <p className="text-[var(--color-text-secondary)] leading-relaxed text-justify">
                We provide PAN India <strong className="text-[var(--color-text-primary)]">PCD Pharma Franchise</strong>{" "}
                opportunities with{" "}
                <strong className="text-[var(--color-text-primary)]">exclusive monopoly rights</strong>, ensuring our
                partners grow with complete support — promotional materials, marketing assistance, competitive pricing,
                and timely delivery.
              </p>

              <p className="text-[var(--color-text-secondary)] leading-relaxed text-justify">
                At BioLexa, we focus on long-term partnerships built on trust, innovation, and professional support to
                help you succeed in the fast-growing pharmaceutical industry.
              </p>
            </motion.article>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease }}
              className="flex-1"
            >
              <img
                src="https://i.ibb.co/tw4nQxMm/product-image.png"
                alt="BioLexa pharmaceuticals — product and franchise overview"
                className="w-full h-auto rounded-xl shadow-md object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={cardItem}
                className="text-center p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <div className="text-4xl sm:text-5xl font-bold text-[var(--color-primary)] mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto">
          <motion.h2 {...fadeInUp} className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Why Choose <span className="text-[var(--color-primary)]">BioLexa</span>
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-center text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12"
          >
            Confident, precise, forward-moving — the principles behind every BioLexa product.
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={cardItem}
                whileHover={{ scale: 1.02, borderColor: "var(--color-primary)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease }}
                className="bg-[var(--color-background)] p-6 rounded-xl border border-[var(--color-border)] cursor-default"
                style={{ transition: "border-color 0.3s ease, transform 0.2s ease" }}
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-soft)] flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[var(--color-text-primary)]">{feature.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto">
          <motion.h2 {...fadeInUp} className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Our Product Categories
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-center text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12"
          >
            From everyday essentials to specialty formulations.
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((category, i) => (
              <motion.div
                key={i}
                variants={cardItem}
                whileHover={{ scale: 1.02, borderColor: "var(--color-primary)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-[var(--color-surface)] p-8 rounded-xl border border-[var(--color-border)] cursor-pointer text-center"
                style={{ transition: "border-color 0.3s ease, transform 0.2s ease" }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center">
                  <category.Icon className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)]">{category.name}</h3>
              </motion.div>
            ))}
          </motion.div>
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.3, ease }} className="text-center mt-10">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-lg font-semibold shadow-md"
                style={{ transition: "background-color 0.3s ease" }}
              >
                View All Products <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto">
          <motion.h2 {...fadeInUp} className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Get in Touch
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-center text-[var(--color-text-secondary)] mb-12"
          >
            Tell us about your needs — our team will reach out within one business day.
          </motion.p>
          <motion.form
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div variants={cardItem}>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)]"
                placeholder="Your name"
              />
            </motion.div>
            <motion.div variants={cardItem}>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)]"
                placeholder="your@email.com"
              />
            </motion.div>
            <motion.div variants={cardItem}>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)]"
                placeholder="+91 92186 30464"
              />
            </motion.div>
            <motion.div variants={cardItem}>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)] resize-none"
                placeholder="Your inquiry..."
              />
            </motion.div>
            <motion.button
              variants={cardItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg font-semibold shadow-md"
              style={{ transition: "background-color 0.3s ease" }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>
    </main>
  )
}
