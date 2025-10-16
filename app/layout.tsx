import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
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
        <Navbar />
        <main className="flex-1">
          <div
            className="fixed inset-0 -z-50 bg-cover bg-center bg-no-repeat filter blur-sm dark:blur-md brightness-150 dark:brightness-80 invert dark:invert-0"
            style={{
              backgroundImage: 'url("background.jpg")',
            }}
          />
        </main>
      </body>
    </html>
  );
}
