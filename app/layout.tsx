import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import ScrollRestorationManager from "./components/ui/scroll-restoration";
import StructuredData from "./components/ui/structured-data";
import AmbientBackground from "./components/ui/ambient-background";
import { ThemeProvider } from "./components/ui/theme-provider";

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Heading face. Ubuntu Mono is the font Ubuntu ships as its terminal default,
 * requested by name for its letterforms. Only the 700 weight is loaded, since
 * every heading class uses it - the 400 would be dead payload.
 */
const ubuntuMono = Ubuntu_Mono({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://siralex01.github.io"),
  // Kept in the 50-60 character band search engines display without
  // truncating, and carrying the primary keywords rather than just the name.
  title: "Alessio Maiola - AI & Cybersecurity Software Engineer",
  description: "Software Engineer specialized in AI, Machine Learning, and Cybersecurity. Master's graduate from Sapienza University of Rome, CTF player with TRX.",
  applicationName: "Alessio Maiola Portfolio",
  authors: [{ name: "Alessio Maiola", url: "https://siralex01.github.io" }],
  creator: "Alessio Maiola",
  publisher: "Alessio Maiola",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "Alessio Maiola",
    "Maiola",
    "AI",
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "Intelligenza Artificiale",
    "Apprendimento Automatico",
    "CyberSecurity",
    "Cyber Security",
    "Software Engineer",
    "Software Developer",
    "Sicurezza Informatica",
    "Ingegnere Informatico",
    "Computer Science",
    "Data Science",
    "Python",
    "Portfolio",
    "Web Development",
    "Full Stack Developer",
    "CTF",
    "Capture The Flag",
    "Hacking",
    "Programming",
    "Programmazione",
    "Developer Portfolio",
    "Tech Portfolio",
  ],
  icons: {
    icon: [{ url: "/logo_colored.webp", type: "image/png" }],
  },
  openGraph: {
    title: "Alessio Maiola - AI & Cybersecurity Software Engineer",
    description: "Software Engineer specialized in AI, Machine Learning, and Cybersecurity. Master's graduate from Sapienza University of Rome, CTF player with TRX.",
    url: "https://siralex01.github.io",
    siteName: "Alessio Maiola Portfolio",
    images: [
      {
        url: "/logo_colored.webp",
        width: 1200,
        height: 630,
        alt: "Alessio Maiola Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alessio Maiola - AI & Cybersecurity Software Engineer",
    description: "Software Engineer specialized in AI, Machine Learning, and Cybersecurity. Master's graduate from Sapienza University of Rome, CTF player with TRX.",
    images: ["/logo_colored.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Headings use Ubuntu Mono; body and data use Geist. See the typography
    // note in globals.css.
    //
    // The font variables must live on <html>, not <body>. Tailwind's
    // `@theme inline` maps --font-sans to var(--font-geist-sans) on :root; if
    // the font class is on <body>, that source variable is undefined at :root,
    // --font-sans resolves to nothing, and every font-family declaration using
    // it becomes invalid at computed-value time - silently dropping the whole
    // type system back to the system stack.
    //
    // The inline theme script sets `class="dark"` on <html> before hydration,
    // which React would otherwise report as a server/client attribute mismatch.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${ubuntuMono.variable}`}
    >
      <head>
        <StructuredData />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <ScrollRestorationManager />
          <AmbientBackground />
          <a
            href="#main"
            className="btn btn-secondary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--z-top)]"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
