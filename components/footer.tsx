"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { ImFacebook2 } from "react-icons/im"
import BioLexaLogo from "./biolexa-logo"

const ease = [0.25, 0.1, 0.25, 1] as const

const column = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease },
}

const staggerColumns = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, amount: 0.1 },
}

export default function Footer() {
  return (
    <footer className="bg-[oklch(0.269_0_0)] text-white py-16 border-t border-[oklch(0.269_0_0)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerColumns}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-4 gap-8 mb-8"
        >
          {/* Company */}
          <motion.div variants={column}>
            <Link href="/" className="inline-flex items-center" aria-label="BioLexa home">
              <BioLexaLogo size="md" animated={false} invertOnDark />
            </Link>
            <p className="text-white/70 text-sm mt-4 mb-4 leading-relaxed">
              Intelligent healthcare solutions and quality pharmaceutical products — built on trust, precision, and
              forward-moving partnerships.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/9218630464?text=Hi%20can%20I%20Know%20more%20about%20BioLexa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                <FaWhatsapp size={22} />
              </a>
              <a
                href="https://www.facebook.com/biolexa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                <ImFacebook2 size={22} />
              </a>
              <a
                href="https://www.instagram.com/biolexa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                <FaInstagram size={22} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={column}>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/70 hover:text-[var(--color-primary)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/aboutus" className="text-white/70 hover:text-[var(--color-primary)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/70 hover:text-[var(--color-primary)] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-[var(--color-primary)] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={column}>
            <h4 className="font-semibold mb-4 text-white">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/products?category=tablets"
                  className="text-white/70 hover:text-[var(--color-primary)] transition-colors"
                >
                  Tablets
                </a>
              </li>
              <li>
                <a
                  href="/products?category=capsules"
                  className="text-white/70 hover:text-[var(--color-primary)] transition-colors"
                >
                  Capsules
                </a>
              </li>
              <li>
                <a
                  href="/products?category=injections"
                  className="text-white/70 hover:text-[var(--color-primary)] transition-colors"
                >
                  Injections
                </a>
              </li>
              <li>
                <a
                  href="/products?category=syrups"
                  className="text-white/70 hover:text-[var(--color-primary)] transition-colors"
                >
                  Syrups
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={column}>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex flex-col gap-2 items-start">
                <a
                  className="flex gap-2 items-start text-white/70 hover:text-[var(--color-primary)] transition-colors"
                  href="https://www.google.com/maps/search/?api=1&query=Plot+1+Chambaghat+Industrial+Area+Solan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={18} className="mt-1 flex-shrink-0" />
                  <span>Plot no : 1, Chambaghat, Industrial area, Solan, Himachal Pradesh 173213</span>
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={18} />
                <a
                  href="tel:+919218630464"
                  className="text-white/70 hover:text-[var(--color-primary)] transition-colors"
                >
                  +91 92186 30464
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Mail size={18} />
                <a
                  href="mailto:biolexaindia@gmail.com"
                  className="text-white/70 hover:text-[var(--color-primary)] transition-colors"
                >
                  biolexaindia@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="border-t border-white/15 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70 gap-4">
            <p>&copy; {new Date().getFullYear()} BioLexa. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
