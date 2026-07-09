"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { urlFor } from "@/lib/sanity/image"
import PortableText from "@/components/PortableText"

const ease = [0.25, 0.1, 0.25, 1] as const

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease },
}

interface SectionProps {
  imageSrc: string
  imageAlt: string
  title: string
  reverse?: boolean
  children: React.ReactNode
}

function Section({ imageSrc, imageAlt, title, reverse = false, children }: SectionProps) {
  const hasImage = !!imageSrc
  return (
    <motion.section
      {...fadeInUp}
      className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-[var(--color-border)] last:border-0"
    >
      <div className={`flex flex-col ${hasImage ? (reverse ? "md:flex-row-reverse" : "md:flex-row") : ""} items-center gap-8 max-w-7xl mx-auto`}>
        {hasImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="md:w-1/2 w-full"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={500}
              height={350}
              className="rounded-xl shadow-md w-full h-auto object-cover"
            />
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, x: hasImage ? (reverse ? -30 : 30) : 0, y: hasImage ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className={`${hasImage ? "md:w-1/2 w-full" : "w-full"} ${hasImage ? (reverse ? "md:pr-8" : "md:pl-8") : ""}`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--color-text-primary)]">{title}</h2>
          <div className="text-[var(--color-text-secondary)] leading-relaxed">{children}</div>
        </motion.div>
      </div>
    </motion.section>
  )
}

interface SectionData {
  title: string
  image?: any
  imageAlt?: string
  content: any
  reverse?: boolean
}

interface SanityAboutProps {
  data: {
    headerTitle?: string
    headerTagline?: string
    sections: SectionData[]
  }
}

export default function SanityAbout({ data }: SanityAboutProps) {
  return (
    <main className="bg-[var(--color-background)]">
      {/* Title Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-text-primary)]"
          >
            {data.headerTitle ? (
              data.headerTitle.includes("BioLexa") ? (
                <>
                  {data.headerTitle.split("BioLexa")[0]}
                  <span className="text-[var(--color-primary)]">BioLexa</span>
                  {data.headerTitle.split("BioLexa")[1]}
                </>
              ) : (
                data.headerTitle
              )
            ) : (
              <>
                About <span className="text-[var(--color-primary)]">BioLexa</span>
              </>
            )}
          </motion.h1>
          {data.headerTagline && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
            >
              {data.headerTagline}
            </motion.p>
          )}
        </div>
      </section>

      {/* Sections List */}
      <div className="py-8">
        {data.sections.map((section, idx) => {
          const imageSrc = section.image ? urlFor(section.image).url() : ""
          return (
            <Section
              key={idx}
              imageSrc={imageSrc}
              imageAlt={section.imageAlt || "Section Image"}
              title={section.title}
              reverse={section.reverse}
            >
              <PortableText value={section.content} />
            </Section>
          )
        })}
      </div>
    </main>
  )
}
