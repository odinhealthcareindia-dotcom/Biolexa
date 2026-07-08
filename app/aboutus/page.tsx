import { getAboutpage } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import PortableText from "@/components/PortableText"
import StaticAbout from "@/components/StaticAbout"
import Image from "next/image"

// Incremental Static Regeneration (ISR) with revalidation
export const revalidate = 60

export default async function AboutUs() {
  const data = await getAboutpage()

  // if (!data || !data.sections || data.sections.length === 0) {
  //   return <StaticAbout />
  // }
  if (true) {
    return <StaticAbout />
  }

  return (
    <main className="bg-[var(--color-background)]">
      {/* Title Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
            {data.headerTitle || "About Us"}
          </h1>
          {data.headerTagline && (
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              {data.headerTagline}
            </p>
          )}
        </div>
      </section>

      {/* Sections List */}
      <div className="py-8">
        {data.sections.map((section: any, idx: number) => {
          const imageSrc = section.image ? urlFor(section.image).url() : ""
          return (
            <section
              key={idx}
              className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-[var(--color-border)] last:border-0"
            >
              <div className={`flex flex-col ${section.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 max-w-7xl mx-auto`}>
                <div className="md:w-1/2 w-full">
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={section.imageAlt || "Section Image"}
                      width={500}
                      height={350}
                      className="rounded-xl shadow-md w-full h-auto object-cover"
                    />
                  )}
                </div>
                <div className={`md:w-1/2 w-full ${section.reverse ? "md:pr-8" : "md:pl-8"}`}>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
                    {section.title}
                  </h2>
                  <div className="text-[var(--color-text-secondary)] leading-relaxed">
                    <PortableText value={section.content} />
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
