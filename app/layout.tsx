import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/components/theme-provider"
import LayoutOverlays from "@/components/LayoutOverlays"

// Sanity imports
import { getSiteSettings, getNavigation } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import { SanityLive } from "@/lib/sanity/live"
import Clarity from '@microsoft/clarity';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

const projectId = "xy4wxev1u6"

Clarity.init(projectId);

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  const siteName = settings?.siteName || "BioLexa"
  const defaultTitle = settings?.seo?.metaTitle || `${siteName} | Intelligent Healthcare Solutions`
  const defaultDesc = settings?.seo?.metaDescription || settings?.tagline ||
    "BioLexa delivers cutting-edge healthcare technology and intelligent solutions for modern medical professionals. GMP & ISO certified pharmaceutical partner."

  const keywords = settings?.seo?.keywords || [
    "BioLexa",
    "intelligent healthcare",
    "pharmaceutical products",
    "tablets",
    "capsules",
    "injections",
    "healthcare technology",
    "GMP certified",
    "ISO certified",
    "pharmaceutical distributor",
    "medicine supplier",
  ]

  const shareImage = settings?.seo?.shareImage
    ? urlFor(settings.seo.shareImage).width(1200).height(630).url()
    : "/og-image.jpg"

  return {
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: defaultDesc,
    keywords,
    robots: "index, follow",
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: true,
      telephone: true,
      address: true,
    },
    openGraph: {
      title: defaultTitle,
      description: defaultDesc,
      url: "https://biolexa.in",
      siteName,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: `${siteName} - Intelligent Healthcare Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDesc,
      images: [shareImage],
    },
    alternates: {
      canonical: "https://biolexa.in",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSiteSettings()
  const navigation = await getNavigation("main-menu")

  // Fallback values for Structured Data
  const siteName = settings?.siteName || "BioLexa"
  const phone = settings?.phoneNumbers?.[0] || "+919218630464"
  const email = settings?.email || "biolexaindia@gmail.com"
  const addressText = settings?.address || "Plot no : 1, Chambaghat, Industrial area, Solan, Himachal Pradesh 173213"

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    description: settings?.tagline || "Intelligent Healthcare Solutions and Pharmaceutical Products",
    url: "https://biolexa.in",
    telephone: phone.replace(/\s/g, ""),
    email: email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot no : 1",
      addressLocality: "Chambaghat, Industrial area, Solan",
      addressRegion: "Himachal Pradesh",
      postalCode: "173213",
      addressCountry: "IN",
    },
    sameAs: [
      settings?.socials?.facebook || "https://www.facebook.com/biolexa",
      settings?.socials?.instagram,
      settings?.socials?.linkedin,
    ].filter(Boolean),
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF3333" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          id="microsoft-clarity"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xy4wxev1u6");
            `
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="biolexa_theme"
          disableTransitionOnChange={false}
        >
          <LayoutOverlays settings={settings} navigation={navigation}>
            {children}
          </LayoutOverlays>
          <Toaster position="top-right" />
        </ThemeProvider>

        {/* Mount SanityLive to enable live-preview refresh loops */}
        <SanityLive />
      </body>
    </html>
  )
}
