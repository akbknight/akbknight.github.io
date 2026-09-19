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
  title: "Akshay Kumar — Analytics Engineer & MBA Candidate",
  description:
    "Analytics Engineer and MBA Candidate at American University Kogod School of Business. Former U.S. Department of State programmer. Building data pipelines, forensic audits, and strategic intelligence systems.",
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/favicon.svg",
  },
  openGraph: {
    title: "Akshay Kumar — Analytics Engineer & MBA Candidate",
    description: "Former U.S. State Dept Programmer · Kogod MBA · Forensic Systems & Data Pipelines",
    url: "https://akbknight.github.io",
    siteName: "Akshay Kumar Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
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
