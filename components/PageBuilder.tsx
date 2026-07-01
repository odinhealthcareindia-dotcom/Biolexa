"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import * as Icons from "lucide-react"
import { ArrowRight, Check, Send, Download } from "lucide-react"
import { z } from "zod"
import toast from "react-hot-toast"
import { urlFor } from "@/lib/sanity/image"
import PortableText from "./PortableText"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { getLinkHref } from "./navigation"

const ease = [0.25, 0.1, 0.25, 1] as const

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

// Dynamic Icon Loader
function DynamicIcon({ name, className = "w-6 h-6 text-[var(--color-primary)]" }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle
  return <IconComponent className={className} />
}

// Animated Counter Component
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

// -------------------------------------------------------------
// Blocks Components
// -------------------------------------------------------------

// Hero Banner Block
function HeroBlock({ block }: any) {
  const image = block.backgroundImage ? urlFor(block.backgroundImage).url() : ""
  return (
    <section className="relative overflow-hidden min-h-[550px] flex items-center text-white py-24 px-4 sm:px-6 lg:px-24">
      {image && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-xs font-semibold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" /> BioLexa
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            {block.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            {block.subtitle}
          </p>
          <div className="flex gap-4 flex-wrap">
            {block.ctaText && block.ctaLink && (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href={block.ctaLink}
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 shadow-lg transition-colors"
                >
                  {block.ctaText} <ArrowRight size={18} />
                </Link>
              </motion.div>
            )}
            {block.ctaTextSecondary && block.ctaLinkSecondary && (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href={block.ctaLinkSecondary}
                  className="bg-white text-[var(--color-secondary)] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold inline-flex items-center transition-colors"
                >
                  {block.ctaTextSecondary}
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Card Grid / Feature List Block
function CardsBlock({ block }: any) {
  const cards = block.cards || []
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto">
        {block.title && (
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            {block.title}
          </h2>
        )}
        {block.subtitle && (
          <p className="text-center text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12">
            {block.subtitle}
          </p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease }}
              whileHover={{ scale: 1.02, borderColor: "var(--color-primary)" }}
              className="bg-[var(--color-background)] p-6 rounded-xl border border-[var(--color-border)] flex flex-col justify-between"
              style={{ transition: "border-color 0.3s ease, transform 0.2s ease" }}
            >
              <div>
                {card.iconName && (
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-soft)] flex items-center justify-center mb-4">
                    <DynamicIcon name={card.iconName} />
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-2 text-[var(--color-text-primary)]">{card.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">{card.description}</p>
              </div>
              {card.link?.label && (
                <Link
                  href={getLinkHref(card.link)}
                  className="text-sm font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 mt-auto"
                >
                  {card.link.label} &rarr;
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Block
function TestimonialsBlock({ block }: any) {
  const items = block.items || []
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[var(--color-text-primary)]">
          {block.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((testimonial: any, idx: number) => {
            const photo = testimonial.photo ? urlFor(testimonial.photo).width(80).height(80).url() : null
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease }}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-xl relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm italic leading-relaxed mb-6">
                    "{testimonial.reviewText}"
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-4 mt-auto">
                  {photo ? (
                    <img
                      src={photo}
                      alt={testimonial.customerName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-bold flex items-center justify-center">
                      {testimonial.customerName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--color-text-primary)]">{testimonial.customerName}</h4>
                    <p className="text-xs text-[var(--color-text-muted)]">{testimonial.designation}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Statistics Block
function StatisticsBlock({ block }: any) {
  const items = block.items || []
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto">
        {block.title && (
          <h2 className="text-3xl font-bold text-center mb-8">{block.title}</h2>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((stat: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="text-center p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <div className="text-4xl sm:text-5xl font-bold text-[var(--color-primary)] mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Accordion Block
function FAQBlock({ block }: any) {
  const items = block.items || []
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-[var(--color-text-primary)]">
          {block.title}
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {items.map((faq: any, idx: number) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="border border-[var(--color-border)] bg-[var(--color-background)] rounded-xl px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--color-text-secondary)] leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

// CTA Banner Block
function CtaBlock({ block }: any) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-secondary)] text-white relative overflow-hidden text-center">
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[var(--color-primary)]/40 via-transparent to-transparent" />
      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        {block.title && <h2 className="text-3xl sm:text-4xl font-bold">{block.title}</h2>}
        {block.description && <p className="text-white/80 text-lg leading-relaxed">{block.description}</p>}
        {block.ctaLink?.label && (
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block pt-4">
            <Link
              href={getLinkHref(block.ctaLink)}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 shadow-lg"
            >
              {block.ctaLink.label} &rarr;
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Contact Form Block
function ContactFormBlock({ block }: any) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = contactSchema.safeParse(formData)
    if (!validation.success) {
      toast.error(validation.error.errors[0]?.message || "Invalid form inputs")
      return
    }
    const t = toast.loading("Sending message...")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      toast.dismiss(t)
      if (data.success) {
        toast.success("Message sent successfully!")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        toast.error("Failed to send message")
      }
    } catch {
      toast.dismiss(t)
      toast.error("Something went wrong")
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[var(--color-text-primary)]">
          {block.title || "Get in Touch"}
        </h2>
        {block.subtitle && (
          <p className="text-center text-[var(--color-text-secondary)] mb-12">
            {block.subtitle}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)]"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">Phone</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)]"
              placeholder="+91 92186 30464"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">Message</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)] resize-none"
              placeholder="Your inquiry..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send size={16} />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </section>
  )
}

// Logo Showcase Grid
function LogoGridBlock({ block }: any) {
  const logos = block.logos || []
  return (
    <section className="py-16 bg-[var(--color-surface-alt)]/50 px-4 sm:px-6 lg:px-8 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto">
        {block.title && <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-8">{block.title}</h3>}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((logoItem: any, idx: number) => {
            const src = logoItem.logoImage ? urlFor(logoItem.logoImage).url() : ""
            if (!src) return null
            return (
              <div key={idx} className="h-10 relative aspect-[3/1] grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image src={src} alt={logoItem.name || "Client Logo"} fill className="object-contain" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Custom HTML Block
function HtmlBlock({ block }: any) {
  if (!block.htmlCode) return null
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div dangerouslySetInnerHTML={{ __html: block.htmlCode }} />
    </section>
  )
}

// Double Quote Block
function QuoteBlock({ block }: any) {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto text-center border-y border-[var(--color-border)] my-12 bg-[var(--color-surface)] rounded-2xl">
      <p className="text-xl sm:text-2xl font-serif text-[var(--color-text-primary)] italic leading-relaxed mb-4">
        "{block.quote}"
      </p>
      {block.author && (
        <cite className="text-sm font-semibold text-[var(--color-primary)] uppercase not-italic tracking-wider">
          — {block.author}
        </cite>
      )}
    </section>
  )
}

// Dynamic Timeline Block
function TimelineBlock({ block }: any) {
  const items = block.items || []
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto">
        {block.title && <h2 className="text-3xl font-bold text-center mb-12">{block.title}</h2>}
        <div className="relative border-l-2 border-[var(--color-border)] ml-4 md:ml-32 space-y-12">
          {items.map((event: any, idx: number) => (
            <div key={idx} className="relative pl-8">
              <span className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-background)]" />
              <div className="absolute left-[-110px] top-1 hidden md:block w-20 text-right font-bold text-[var(--color-primary)] text-lg">
                {event.date}
              </div>
              <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-1 flex items-center gap-2">
                <span className="md:hidden text-sm font-semibold text-[var(--color-primary)] bg-[var(--color-primary-soft)] px-2 py-0.5 rounded">
                  {event.date}
                </span>
                {event.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// Page Builder Component Engine
// -------------------------------------------------------------

interface PageBuilderProps {
  blocks?: any[]
}

export default function PageBuilder({ blocks }: PageBuilderProps) {
  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <>
      {blocks.map((block, idx) => {
        switch (block._type) {
          case "heroBlock":
            return <HeroBlock key={idx} block={block} />
          case "richTextBlock":
            return (
              <section key={idx} className="py-16 px-4 max-w-4xl mx-auto leading-relaxed">
                <PortableText value={block.content} />
              </section>
            )
          case "imageBlock":
            const imgSrc = block.image ? urlFor(block.image).url() : ""
            return imgSrc ? (
              <section key={idx} className="py-12 px-4 max-w-5xl mx-auto">
                <figure className="rounded-2xl overflow-hidden border border-[var(--color-border)]">
                  <img src={imgSrc} alt={block.alt || "Visual content"} className="w-full h-auto" />
                  {block.caption && (
                    <figcaption className="bg-[var(--color-surface)] p-3 text-center text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)]">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              </section>
            ) : null
          case "galleryBlock":
            return (
              <section key={idx} className="py-16 px-4 max-w-7xl mx-auto">
                {block.title && <h2 className="text-2xl font-bold text-center mb-8">{block.title}</h2>}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {block.images?.map((img: any, gIdx: number) => (
                    <div key={gIdx} className="relative aspect-video rounded-xl overflow-hidden border border-[var(--color-border)]">
                      <Image src={urlFor(img).url() || ""} alt="Gallery image" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )
          case "videoBlock":
            const fileUrl = block.videoFile?.asset?._ref 
              ? `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}/${block.videoFile.asset._ref.split("-")[1]}.${block.videoFile.asset._ref.split("-")[2]}`
              : ""
            return (
              <section key={idx} className="py-16 px-4 max-w-5xl mx-auto text-center">
                {block.title && <h2 className="text-2xl font-bold mb-6">{block.title}</h2>}
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-[var(--color-border)] bg-black">
                  {block.videoUrl ? (
                    <iframe
                      src={block.videoUrl.replace("watch?v=", "embed/")}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                    />
                  ) : fileUrl ? (
                    <video src={fileUrl} controls className="absolute inset-0 w-full h-full object-contain" />
                  ) : null}
                </div>
              </section>
            )
          case "faqBlock":
            return <FAQBlock key={idx} block={block} />
          case "testimonialsBlock":
            return <TestimonialsBlock key={idx} block={block} />
          case "ctaBlock":
            return <CtaBlock key={idx} block={block} />
          case "cardsBlock":
            return <CardsBlock key={idx} block={block} />
          case "statisticsBlock":
            return <StatisticsBlock key={idx} block={block} />
          case "timelineBlock":
            return <TimelineBlock key={idx} block={block} />
          case "logoGridBlock":
            return <LogoGridBlock key={idx} block={block} />
          case "htmlBlock":
            return <HtmlBlock key={idx} block={block} />
          case "quoteBlock":
            return <QuoteBlock key={idx} block={block} />
          case "contactFormBlock":
            return <ContactFormBlock key={idx} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
