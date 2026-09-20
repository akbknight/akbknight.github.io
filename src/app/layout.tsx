import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akbknight.github.io"),
  title: "Akshay Kumar — Analytics Engineer, STEM MBA & Data Strategist",
  description:
    "MBA candidate at American University Kogod School of Business (May 2027) with 7+ years in data integration, forensic audits, and operational analytics. Former U.S. Department of State business analyst (Ambassador Commended).",
  keywords: [
    "Data Science",
    "Analytics Engineer",
    "STEM MBA",
    "Washington D.C.",
    "Business Intelligence",
    "Machine Learning",
    "Python",
    "SQL",
    "Predictive Analytics",
    "U.S. Department of State",
    "Capital One",
    "Kogod School of Business",
    "American University",
    "Data Engineering",
    "Time-Series Forecasting",
    "DuckDB",
    "Three.js",
    "Forensic Audits",
  ],
  authors: [{ name: "Akshay Kumar", url: "https://akbknight.github.io" }],
  creator: "Akshay Kumar",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/brand/favicon.svg", type: "image/svg+xml" }],
    apple: "/brand/logo-contained.svg",
  },
  openGraph: {
    title: "Akshay Kumar — Analytics Engineer & STEM MBA Candidate",
    description:
      "Former U.S. Department of State Business Analyst (Ambassador Commended) & Kogod STEM MBA Candidate. Building high-throughput data pipelines, forensic software audits, and automated intelligence systems.",
    url: "https://akbknight.github.io",
    siteName: "Akshay Kumar Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/logo-contained.svg",
        width: 800,
        height: 800,
        alt: "Akshay Kumar — Analytics Engineer & STEM MBA",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Akshay Kumar — Analytics Engineer & STEM MBA Candidate",
    description:
      "Former U.S. Department of State Business Analyst (Ambassador Commended) & Kogod STEM MBA Candidate.",
    creator: "@akbknight",
    images: ["/brand/logo-contained.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://akbknight.github.io/#person",
      "name": "Akshay Kumar",
      "jobTitle": "Analytics Engineer & Business Analyst",
      "url": "https://akbknight.github.io",
      "sameAs": [
        "https://www.linkedin.com/in/akshaykumardl/",
        "https://github.com/akbknight"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "U.S. Department of State"
      },
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "American University, Kogod School of Business",
          "department": "Business Analytics & Artificial Intelligence"
        },
        {
          "@type": "CollegeOrUniversity",
          "name": "Maharishi Dayanand University",
          "department": "Computer Science and Engineering"
        }
      ],
      "knowsAbout": [
        "Data Science",
        "Analytics Engineering",
        "Business Intelligence",
        "Forensic Software Auditing",
        "Time-Series Forecasting",
        "Python",
        "SQL",
        "Three.js",
        "DuckDB",
        "Predictive Modeling"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Washington",
        "addressRegion": "DC",
        "addressCountry": "US"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://akbknight.github.io/#website",
      "url": "https://akbknight.github.io",
      "name": "Akshay Kumar Portfolio",
      "description": "Analytics Engineering, Forensic Audits & Strategic DataOps",
      "publisher": {
        "@id": "https://akbknight.github.io/#person"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="antialiased font-sans selection:bg-sky-500/20 selection:text-sky-400">
        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
