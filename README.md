# 🚀 Alessio Maiola - Portfolio

[![Deploy](https://github.com/SirAlex01/SirAlex01.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/SirAlex01/SirAlex01.github.io/actions/workflows/pages.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

> Personal portfolio website showcasing my projects, skills, and experience in AI, Machine Learning, and Cybersecurity.

🔗 **Live Site**: [siralex01.github.io](https://siralex01.github.io)

---

## 📋 About

I'm **Alessio Maiola**, a Software Engineer with a Master's degree in Engineering in Computer Science from **Sapienza University of Rome**. My expertise spans:

- 🤖 **Artificial Intelligence & Machine Learning**
- 🔒 **Cybersecurity & CTF Competitions** (TRX Team)
- 💻 **Full-Stack Development**
- 📊 **Data Engineering**

This portfolio showcases my journey, projects, and technical skills.

---

## ✨ Features

### 🎨 Design & UX
- **Monochrome design system** - every colour, radius, shadow, easing and
  type step is a token in `app/globals.css`; components never hardcode values
- **Dark/Light mode** driven by the same tokens, no duplicated styles
- **Pure-CSS ambient backdrop** (wave fronts + grain + vignette), no image
- **Interactive animations** using Framer Motion, with a shared `Reveal`
  primitive so scroll entrances are consistent site-wide
- **Accessible**: semantic HTML, ARIA labels, a single focus treatment,
  skip-to-content link, and full `prefers-reduced-motion` support

### 🚀 Technical Highlights
- Built with **Next.js 16** (App Router)
- **Static export** for GitHub Pages deployment
- **SEO optimized** with metadata, sitemap, robots.txt, and structured data (JSON-LD)
- **Open Graph & Twitter Card** integration for social sharing
- **Performance optimized** with lazy loading and image optimization
- **Type-safe** with TypeScript

### 📱 Sections
- **Presentation**: Introduction with rotating logo animation
- **Education**: Academic background with animated timeline
- **CTFs**: Cybersecurity competition achievements
- **Projects**: Interactive carousel and expandable project cards
- **Skills**: Categorized technical skills with smooth animations
- **Contact**: Social links and contact information

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16, React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Framer Motion 12 |
| **Carousel** | Embla Carousel |
| **Icons** | React Icons, Lucide |
| **Deployment** | GitHub Pages, GitHub Actions |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SirAlex01/SirAlex01.github.io.git
   cd SirAlex01.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

### Build & Deploy

```bash
# Build for production
npm run build

# Lint code
npx eslint .

# Start site
npx serve@latest out
```

The site automatically deploys to GitHub Pages via GitHub Actions when pushing to the `main` branch.

---

## 📁 Project Structure

```
SirAlex01.github.io/
├── app/
│   ├── components/
│   │   ├── home-sections/    # Main page sections
│   │   ├── navbar/            # Navigation components
│   │   ├── footer/            # Footer component
│   │   └── ui/                # Reusable UI components
│   ├── projects/              # Projects page
│   ├── contacts/              # Contacts page
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Home page
│   ├── sitemap.ts             # SEO sitemap
│   └── robots.ts              # Robots.txt
├── public/                    # Static assets
│   ├── animations/            # Lottie animations
│   ├── cc/                    # Project images
│   └── ...
├── .github/workflows/         # CI/CD workflows
└── next.config.ts             # Next.js configuration
```

---

## 🎯 Key Features Explained

### 🎴 Project Cards
- **Expandable cards** with smooth spring animations
- **Drag-to-scroll** skills badges with threshold detection
- **Object-fill images** to prevent cropping
- **Click-to-expand** with backdrop blur effects

### 🎠 Project Carousel
- **Touch/swipe enabled** with Embla Carousel
- **Keyboard navigation** support
- **YouTube integration** for video demos
- **Mobile-optimized** pagination dots

### 🔍 SEO Optimization
- **Structured data** (JSON-LD) for rich search results
- **Open Graph & Twitter Cards** for social sharing
- **Sitemap & Robots.txt** for search engine crawling
- **Page-specific metadata** for better indexing
- **Semantic HTML** with proper heading hierarchy

---

## 📫 Contact

- **Email**: [alessio.maiola2001@gmail.com](mailto:alessio.maiola2001@gmail.com)
- **LinkedIn**: [Alessio Maiola](https://www.linkedin.com/in/alessio-maiola-275718331)
- **GitHub**: [@SirAlex01](https://github.com/SirAlex01)
- **Website**: [siralex01.github.io](https://siralex01.github.io)

---

<div align="center">
  <p>Made with ❤️ by Alessio Maiola</p>
  <p>⭐ Star this repo if you like it!</p>
</div>
