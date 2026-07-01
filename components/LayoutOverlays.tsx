"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CollapsibleDownloadButton from "@/components/collapsible-download-button"
import ChatBot from "@/components/ChatBot"

interface LayoutOverlaysProps {
  children: React.ReactNode
  settings: any
  navigation: any
}

export default function LayoutOverlays({ children, settings, navigation }: LayoutOverlaysProps) {
  const pathname = usePathname()
  const isStudio = pathname ? pathname.startsWith("/studio") : false

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      {/* Announcement Bar */}
      {settings?.announcement?.enabled && settings?.announcement?.text && (
        <div className="bg-[var(--color-primary)] text-white text-center py-2 px-4 text-xs font-semibold select-none flex items-center justify-center gap-2">
          <span>{settings.announcement.text}</span>
          {settings.announcement.link && (
            <a href={settings.announcement.link} className="underline hover:opacity-90 transition-opacity">
              Learn More &rarr;
            </a>
          )}
        </div>
      )}

      <Navigation items={navigation?.items} />
      {children}
      <CollapsibleDownloadButton />
      <Footer settings={settings} />
      <ChatBot />
    </>
  )
}
