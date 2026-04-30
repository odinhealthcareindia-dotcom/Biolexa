"use client"
import Image from "next/image"
import { motion } from "framer-motion"

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
  return (
    <motion.section
      {...fadeInUp}
      className="py-10 md:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="md:w-1/2"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={500}
            height={300}
            className="rounded-xl shadow-md w-full h-auto object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: reverse ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className={`md:w-1/2 ${reverse ? "md:pr-8" : "md:pl-8"}`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--color-text-primary)]">{title}</h2>
          <div className="text-[var(--color-text-secondary)] leading-relaxed">{children}</div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default function AboutUs() {
  return (
    <main className="bg-[var(--color-background)]">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-text-primary)]"
          >
            About <span className="text-[var(--color-primary)]">BioLexa</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Intelligent healthcare, modern formulations, and partnerships built to last.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Section
          imageSrc="https://i.ibb.co/Qv5WPN6p/New-Project.jpg"
          imageAlt="BioLexa pharmaceutical company"
          title="About BioLexa"
        >
          <p className="text-justify">
            <strong className="text-[var(--color-text-primary)]">BioLexa</strong> is a trusted and fast-growing Indian
            pharmaceutical company, established with a commitment to deliver high-quality, affordable medicines while
            creating profitable and long-term opportunities for PCD Pharma Franchise partners across India.
          </p>
          <p className="text-justify mt-4">
            Founded by <strong className="text-[var(--color-text-primary)]">Mr. Raman Aggarwal</strong>, BioLexa
            started its journey with only 7 products and has today grown into a strong pharmaceutical organization
            with a portfolio of 350+ products covering multiple therapeutic segments. Our consistent growth reflects
            our focus on quality, ethical practices, and partner-centric business models.
          </p>
        </Section>

        <Section
          imageSrc="https://i.ibb.co/tw4nQxMm/product-image.png"
          imageAlt="Why choose BioLexa"
          title="Why Choose BioLexa for PCD Franchise?"
          reverse
        >
          <p className="text-justify">
            At BioLexa, we believe that our success lies in the success of our franchise partners. We offer{" "}
            <strong className="text-[var(--color-text-primary)]">PAN-India PCD Pharma Franchise opportunities</strong>{" "}
            with exclusive monopoly rights, ensuring no internal competition and maximum growth potential for our
            associates.
          </p>
        </Section>

        <Section
          imageSrc="https://i.ibb.co/gMgJhTDk/Untitled-design-4.png"
          imageAlt="BioLexa key strengths"
          title="Our Key Strengths"
        >
          <ul className="list-disc list-inside space-y-2 text-justify">
            <li>350+ Quality-Assured Products across major therapeutic segments</li>
            <li>
              WHO-GMP Certified Manufacturing through our own unit,{" "}
              <a
                className="text-[var(--color-primary)] underline font-semibold hover:text-[var(--color-primary-hover)]"
                href="https://www.lenuslifecare.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lenus Lifecare Pvt. Ltd.
              </a>
              , and reputed associate manufacturers
            </li>
            <li>Monopoly-Based PCD Franchise Model</li>
            <li>Attractive Margins & Competitive Pricing</li>
            <li>Timely Product Supply & Consistent Availability</li>
            <li>Ethical Promotion & Transparent Dealings</li>
          </ul>
        </Section>

        <Section
          imageSrc="https://i.ibb.co/mFMbs5zY/Untitled-design-5.png"
          imageAlt="Manufacturing and quality assurance"
          title="Manufacturing & Quality Assurance"
          reverse
        >
          <p className="text-justify">
            Quality is the backbone of BioLexa. Our in-house manufacturing facility, Lenus Lifecare Pvt. Ltd., is
            WHO-GMP certified and manufactures injections, ointments, soft gelatin capsules, and ophthalmic products.
            Tablets, capsules, syrups, and suspensions are produced through carefully selected WHO-GMP approved
            third-party manufacturers, ensuring strict quality control at every stage.
          </p>
        </Section>

        <Section
          imageSrc="https://i.ibb.co/V0jvtgFs/Chat-GPT-Image-Dec-11-2025-11-37-35-AM.png"
          imageAlt="Wide therapeutic product range"
          title="Wide Therapeutic Product Range"
        >
          <p className="text-justify mb-4">
            Our diversified product portfolio enables franchise partners to cover multiple medical specialties,
            including:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>General Medicine</li>
            <li>Cardiology & Diabetology</li>
            <li>Dermatology & Cosmetics</li>
            <li>Gynecology</li>
            <li>Pediatrics</li>
            <li>Orthopedics</li>
            <li>Ophthalmology</li>
            <li>Dental Care</li>
            <li>Critical Care</li>
          </ul>
          <p className="text-justify mt-4">
            This wide coverage helps our PCD partners build strong doctor networks and expand business rapidly in
            their respective territories.
          </p>
        </Section>

        <Section
          imageSrc="https://i.ibb.co/0V6frfjx/Untitled-design-3.png"
          imageAlt="Complete franchise support"
          title="Complete Franchise Support"
          reverse
        >
          <p className="text-justify mb-4">
            To ensure smooth business operations and market success, BioLexa provides:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>High-quality visual aids & promotional materials</li>
            <li>Marketing and launch support</li>
            <li>Product training and guidance</li>
            <li>Dedicated support team</li>
            <li>Long-term association focus</li>
          </ul>
          <p className="text-justify mt-4">
            With a growing network of 100+ successful PCD associates across India, BioLexa continues to strengthen its
            presence as a preferred PCD Pharma Company.
          </p>
        </Section>

        <Section
          imageSrc="https://i.ibb.co/8Dj8h1jn/Untitled-design-6.png"
          imageAlt="BioLexa vision"
          title="Our Vision"
        >
          <p className="text-justify">
            To become a leading PCD-focused pharmaceutical company by offering reliable medicines, ethical business
            practices, and growth-driven franchise opportunities that contribute to better healthcare access across
            India.
          </p>
        </Section>
      </div>
    </main>
  )
}
