import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import ScrollRestorationManager from "./components/ui/scroll-restoration";
    
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alessio Maiola - Portfolio",
  description: "Portfolio Website of Alessio Maiola",
  icons: {
    icon: [{ url: "/logo_colored.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollRestorationManager />
        <Navbar />
        <main className="flex-1">
          <div
            className="fixed inset-0 -z-50 bg-cover bg-center bg-no-repeat filter blur-md dark:blur-lg brightness-100 dark:brightness-104 dark:invert"
            style={{
              backgroundImage: 'url("background_2.jpg")',
            }}
          />
          {children}
        </main>
       <Footer />
      </body>
    </html>
  );
}
