"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"

const ease = [0.25, 0.1, 0.25, 1] as const

export default function CollapsibleDownloadButton() {
  const onButtonClick = () => {
    const link = document.createElement("a")
    link.href = "/brochure.pdf"
    link.download = "biolexa-brochure.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      className="fixed bottom-16 left-2 z-50 overflow-hidden rounded-full"
      initial={{ width: 125 }}
      animate={{ width: 44 }}
      whileHover={{ width: 140 }}
      transition={{ duration: 0.4, ease }}
      style={{ boxShadow: "var(--shadow-lg)" }}
    >
      <motion.button
        onClick={onButtonClick}
        whileTap={{ scale: 0.96 }}
        className="flex items-center justify-start bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-3 py-2.5 rounded-full w-full cursor-pointer"
        aria-label="Download brochure"
        style={{ transition: "background-color 0.3s ease" }}
      >
        <Download size={20} className="mr-3 flex-shrink-0" />
        <span className="whitespace-nowrap font-medium text-sm">Brochure</span>
      </motion.button>
    </motion.div>
  )
}
