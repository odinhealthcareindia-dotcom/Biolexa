export interface BlogArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  readTime: string
  featured: boolean
  image: string
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "1",
    title: "The Future of Pharmaceutical Innovation",
    slug: "the-future-of-pharmaceutical-innovation",
    excerpt: "Exploring the latest advancements in drug development and their impact on healthcare.",
    content: "Exploring the latest advancements in drug development and their impact on healthcare. Modern laboratories are discovering new formulas and compounds daily.",
    author: "Dr. Rajesh Kumar",
    date: "2024-11-15",
    category: "Industry Insights",
    readTime: "5 min read",
    featured: true,
    image: "https://i.ibb.co/Qv5WPN6p/New-Project.jpg",
  },
  {
    id: "2",
    title: "GMP Certification: What It Means for Your Health",
    slug: "gmp-certification-what-it-means-for-your-health",
    excerpt: "Understanding Good Manufacturing Practice and why it matters for pharmaceutical safety.",
    content: "Understanding Good Manufacturing Practice and why it matters for pharmaceutical safety. GMP ensures that products are consistently produced and controlled according to quality standards.",
    author: "Dr. Priya Sharma",
    date: "2024-11-10",
    category: "Regulatory",
    readTime: "7 min read",
    featured: true,
    image: "https://i.ibb.co/mCQGcmpk/Chat-GPT-Image-Dec-10-2025-11-50-17-PM.png",
  },
  {
    id: "3",
    title: "Vitamin Deficiency: Signs and Solutions",
    slug: "vitamin-deficiency-signs-and-solutions",
    excerpt: "A comprehensive guide to recognizing vitamin deficiencies and treatment options.",
    content: "A comprehensive guide to recognizing vitamin deficiencies and treatment options. Proper diet and supplements play a crucial role in maintaining balanced health.",
    author: "Dr. Amit Patel",
    date: "2024-11-05",
    category: "Health Tips",
    readTime: "6 min read",
    featured: false,
    image: "https://i.ibb.co/V0jvtgFs/Chat-GPT-Image-Dec-11-2025-11-37-35-AM.png",
  },
  {
    id: "4",
    title: "Antibiotic Resistance: A Global Challenge",
    slug: "antibiotic-resistance-a-global-challenge",
    excerpt: "How proper antibiotic usage can help combat the growing resistance crisis.",
    content: "How proper antibiotic usage can help combat the growing resistance crisis. Over-prescription and misuse are key drivers of bacterial evolution.",
    author: "Dr. Neha Gupta",
    date: "2024-10-28",
    category: "Industry Insights",
    readTime: "8 min read",
    featured: false,
    image: "https://i.ibb.co/tw4nQxMm/product-image.png",
  },
  {
    id: "5",
    title: "Diabetes Management: Best Practices",
    slug: "diabetes-management-best-practices",
    excerpt: "Effective strategies for managing diabetes through medication and lifestyle changes.",
    content: "Effective strategies for managing diabetes through medication and lifestyle changes. Monitoring glucose levels, regular exercise, and portion control are standard recommendations.",
    author: "Dr. Sanjay Singh",
    date: "2024-10-20",
    category: "Health Tips",
    readTime: "6 min read",
    featured: false,
    image: "https://i.ibb.co/gMgJhTDk/Untitled-design-4.png",
  },
  {
    id: "6",
    title: "ISO Standards in Pharmaceutical Manufacturing",
    slug: "iso-standards-in-pharmaceutical-manufacturing",
    excerpt: "An overview of ISO compliance requirements and quality assurance processes.",
    content: "An overview of ISO compliance requirements and quality assurance processes. ISO standards verify that manufacturing organizations execute rigorous security audits.",
    author: "Dr. Anjali Verma",
    date: "2024-10-12",
    category: "Regulatory",
    readTime: "7 min read",
    featured: false,
    image: "https://i.ibb.co/mFMbs5zY/Untitled-design-5.png",
  },
]
