import { PortableText as SanityPortableText, type PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import { urlFor } from "@/lib/sanity/image"
import { Check, Info, AlertTriangle, AlertCircle, FileText, Download } from "lucide-react"

// Types matching Sanity portable text custom blocks
interface CustomTableProps {
  value: {
    rows?: {
      cells?: string[]
    }[]
  }
}

interface CodeBlockProps {
  value: {
    language?: string
    code?: string
  }
}

interface CalloutProps {
  value: {
    type?: "info" | "warning" | "error" | "success"
    text: string
  }
}

interface FileDownloadProps {
  value: {
    label?: string
    file?: any
  }
}

function generateIdFromBlock(value: any): string | undefined {
  if (!value?.children || !Array.isArray(value.children)) return undefined
  const text = value.children.map((c: any) => c.text).join("")
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="relative w-full aspect-video">
            <Image
              src={urlFor(value).url() || ""}
              alt={value.alt || "Article Image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              loading="lazy"
            />
          </div>
          {value.caption && (
            <figcaption className="p-3 text-center text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    customTable: ({ value }: CustomTableProps) => {
      const rows = value?.rows || []
      if (!rows.length) return null
      return (
        <div className="my-6 overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-sm border-collapse text-left bg-[var(--color-surface)]">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] font-semibold text-[var(--color-text-primary)]">
                {rows[0]?.cells?.map((cell, idx) => (
                  <th key={idx} className="p-4">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-alt)]/50 transition-colors">
                  {row.cells?.map((cell, cellIdx) => (
                    <td key={cellIdx} className="p-4 text-[var(--color-text-secondary)]">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    codeBlock: ({ value }: CodeBlockProps) => {
      const code = value?.code || ""
      const language = value?.language || "javascript"
      return (
        <div className="my-6 overflow-hidden rounded-xl border border-[var(--color-border)]">
          <div className="bg-[var(--color-surface-alt)] px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] flex justify-between items-center">
            <span>{language.toUpperCase()}</span>
          </div>
          <pre className="p-4 overflow-x-auto bg-[#1E1E1E] text-[#D4D4D4] font-mono text-sm leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      )
    },
    callout: ({ value }: CalloutProps) => {
      const type = value?.type || "info"
      const text = value?.text || ""

      const styles = {
        info: {
          bg: "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/50",
          text: "text-blue-800 dark:text-blue-200",
          icon: <Info className="w-5 h-5 text-blue-500" />,
        },
        warning: {
          bg: "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50",
          text: "text-amber-800 dark:text-amber-200",
          icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        },
        error: {
          bg: "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50",
          text: "text-red-800 dark:text-red-200",
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        },
        success: {
          bg: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/50",
          text: "text-green-800 dark:text-green-200",
          icon: <Check className="w-5 h-5 text-green-500" />,
        },
      }

      const style = styles[type]

      return (
        <div className={`my-6 flex items-start gap-3 p-4 rounded-xl border ${style.bg}`}>
          <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
          <p className={`text-sm font-medium ${style.text}`}>{text}</p>
        </div>
      )
    },
    fileDownload: ({ value }: FileDownloadProps) => {
      const label = value?.label || "Download Document"
      if (!value?.file) return null
      
      // Construct file download URL from Sanity file asset reference
      const ref = value.file.asset?._ref
      let downloadUrl = ""
      if (ref) {
        const parts = ref.split("-")
        const id = parts[1]
        const ext = parts[2]
        // Example: file-e29f3d9b4b-pdf -> https://cdn.sanity.io/files/project_id/dataset/e29f3d9b4b.pdf
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
        downloadUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`
      }

      return (
        <div className="my-6">
          <a
            href={downloadUrl}
            download
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:scale-95 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md"
          >
            <Download size={16} />
            <span>{label}</span>
          </a>
        </div>
      )
    },
  },
  block: {
    normal: ({ children }) => <p className="mb-4 text-justify leading-relaxed text-[var(--color-text-secondary)]">{children}</p>,
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-[var(--color-text-primary)]">{children}</h1>,
    h2: ({ children, value }) => {
      const id = generateIdFromBlock(value)
      return <h2 id={id} className="text-2xl font-bold mt-7 mb-3 text-[var(--color-text-primary)] scroll-mt-24">{children}</h2>
    },
    h3: ({ children, value }) => {
      const id = generateIdFromBlock(value)
      return <h3 id={id} className="text-xl font-bold mt-6 mb-2 text-[var(--color-text-primary)] scroll-mt-24">{children}</h3>
    },
    h4: ({ children }) => <h4 className="text-lg font-bold mt-5 mb-2 text-[var(--color-text-primary)]">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[var(--color-primary)] bg-[var(--color-surface)] px-6 py-4 italic text-[var(--color-text-secondary)] rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1.5 text-[var(--color-text-secondary)]">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-[var(--color-text-secondary)]">{children}</ol>,
  },
}

export default function PortableText({ value }: { value: any }) {
  if (!value) return null
  return <SanityPortableText value={value} components={components} />
}
