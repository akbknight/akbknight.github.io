# akbknight.github.io

Personal portfolio website for Akshay Kumar = software engineer and MBA candidate specializing in data analytics and business intelligence. Live at [akbknight.github.io](https://akbknight.github.io).

## What this project is

A performance-first portfolio built to showcase five years of professional work spanning government systems engineering, enterprise backend infrastructure, and data analytics. The site uses a sticky sidebar navigation pattern with scroll-spy tracking, smooth Framer Motion transitions, and a custom cursor — presenting experience, projects, and creative work in a single, cohesive layout.

The design system is minimal by intent: amber gold accents on a near-black background in dark mode, persistent preference storage, and zero reliance on third-party UI component libraries. Every interaction is purpose-built.

## Key features

- Sticky sidebar layout with real-time scroll-spy section tracking
- Dark and light mode with `localStorage` persistence
- Custom cursor — precise dot plus spring-physics ring (Framer Motion `useSpring`)
- Section entrance animations driven by IntersectionObserver
- Photography section pulling live Pexels API data filtered to `@akbknight` uploads
- Fully responsive — breakpoint-tuned for 375px mobile through 1440px desktop
- Static export via Next.js 16 with GitHub Actions CI/CD to GitHub Pages

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (static export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Fonts | Zodiak (display) · Satoshi (body) · JetBrains Mono (code) |
| Icons | Lucide React |
| CI/CD | GitHub Actions → GitHub Pages |

## How to run

```bash
# Clone the repository
git clone https://github.com/akbknight/akbknight.github.io.git
cd akbknight.github.io

# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:3000

# Build static export
npm run build
# Output goes to the /out directory
```

**Requirements:** Node.js 18+. The photography section reads a `PEXELS_API_KEY` environment variable. Without it the section renders as a graceful fallback — nothing breaks.

## Skills demonstrated

- **Component architecture:** custom hooks (`useScrollSpy`), context-driven theming (`ThemeProvider`), strict TypeScript throughout
- **Animation engineering:** Framer Motion spring physics, scroll-triggered variants, velocity-deformed cursor tracking
- **CI/CD:** GitHub Actions workflow with secret injection, Next.js static export, and automated GitHub Pages deployment
- **Responsive design:** mobile-first layout with Tailwind breakpoints, fluid typography, no layout shift on load
- **Performance:** static site generation, `next/font` optimization, lazy-loaded Pexels assets

## Author

**Akshay Kumar**
[linkedin.com/in/akshaykumardl](https://www.linkedin.com/in/akshaykumardl/)
