import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LenisProvider } from "@/components/LenisProvider";
import { ViewfinderCursor } from "@/components/ViewfinderCursor";
import "./globals.css";

// Only JetBrains Mono via next/font — sets --font-mono CSS variable
// Zodiak + Satoshi loaded from Fontshare CDN (link tags below)
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akshay Kumar",
  description:
    "Software engineer and MBA candidate at American University. Former U.S. Department of State programmer. Building data pipelines, dashboards, and AI tools.",
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/favicon.svg",
  },
  openGraph: {
    title: "Akshay Kumar",
    description: "Software engineer. MBA candidate. Former U.S. State Dept.",
    url: "https://akbknight.github.io",
    siteName: "Akshay Kumar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <head>
        {/* Fontshare: Zodiak (editorial display serif) + Satoshi (clean sans) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=zodiak@400,500,700&f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LenisProvider>
            <ViewfinderCursor />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
