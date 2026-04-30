import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Toaster } from "react-hot-toast"
import CollapsibleDownloadButton from "@/components/collapsible-download-button"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "BioLexa | Intelligent Healthcare Solutions",
    template: "%s | BioLexa",
  },
  description:
    "BioLexa delivers cutting-edge healthcare technology and intelligent solutions for modern medical professionals. GMP & ISO certified pharmaceutical partner.",
  keywords: [
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
  ],
  generator: "v0.app",
  robots: "index, follow",
  authors: [{ name: "BioLexa" }],
  creator: "BioLexa",
  publisher: "BioLexa",
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    title: "BioLexa | Intelligent Healthcare Solutions",
    description: "Cutting-edge healthcare technology and intelligent solutions for modern medical professionals.",
    url: "https://biolexa.in",
    siteName: "BioLexa",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BioLexa - Intelligent Healthcare Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BioLexa | Intelligent Healthcare Solutions",
    description: "Intelligent healthcare technology from BioLexa",
    creator: "@biolexa",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://biolexa.in",
  },
  icons: {
    icon: '/favicon.ico',          // standard favicon
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png', // iOS home screen icon
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "BioLexa",
              description: "Intelligent Healthcare Solutions and Pharmaceutical Products",
              url: "https://biolexa.in",
              telephone: "+919218630464",
              email: "biolexaindia@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Plot no : 1",
                addressLocality: "Chambaghat, Industrial area, Solan",
                addressRegion: "Himachal Pradesh",
                postalCode: "173213",
                addressCountry: "IN",
              },
              sameAs: ["https://www.facebook.com/biolexa"],
            }),
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
          <Navigation />
          {children}
          <Toaster position="top-right" />
          <CollapsibleDownloadButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
