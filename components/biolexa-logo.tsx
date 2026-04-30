"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface BioLexaLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  animated?: boolean
  /** Force white "Lexa" — useful on dark backgrounds (footer, hero overlays). */
  invertOnDark?: boolean
}

const heightMap = {
  sm: 28,
  md: 36,
  lg: 52,
}

const widthMap = {
  sm: 100,
  md: 130,
  lg: 190,
}

/**
 * BioLexa wordmark — uses /public/biolexa-logo.png as the canonical brand asset.
 * Keep the source PNG with transparent background; size is controlled here.
 */
export default function BioLexaLogo({
  size = "md",
  className = "",
  animated = true,
  invertOnDark = false,
}: BioLexaLogoProps) {
  const height = heightMap[size]
  const width = widthMap[size]

  const Wordmark = (
    <span
      className={`inline-flex items-center ${className}`}
      style={{
        height,
        // Footer / dark hero contexts: invert "Lexa" black -> white via CSS filter
        filter: invertOnDark ? "invert(1) hue-rotate(180deg)" : undefined,
      }}
    >
      <Image
        src="/BioLexa-logo.png"
        alt="BioLexa"
        width={width}
        height={height}
        priority
        className="object-contain"
        style={{ height, width: "auto" }}
      />
    </span>
  )

  if (!animated) return Wordmark

  return (
    <motion.span
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="inline-flex"
    >
      {Wordmark}
    </motion.span>
  )
}
