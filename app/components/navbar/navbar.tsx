"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { Menu } from "lucide-react";
import { navLinks } from "./nav-links";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  
    const handleScroll = () => setScrolled(window.scrollY > 50);
  
    // ✅ Run immediately on mount (so if you're not at the top, it updates instantly)
    handleScroll();
    window.addEventListener("scroll", handleScroll);
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rawPathname = usePathname();
  const pathname = rawPathname?.replace(/\/$/, "") || "/";

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkStyle = (path: string) => {
    const normalizedPath = path.replace(/\/$/, "") || "/";
    const isActive = pathname === normalizedPath;
    return `
      transition-colors duration-200 font-sans
      ${
        isActive
          ? "text-black dark:text-white font-semibold"
          : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
      }
    `;
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${
            scrolled
              ? "backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 bg-background/80"
              : "bg-transparent border-transparent"
          }
        `}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={60}
              priority
              className="dark:invert transition-transform duration-300 hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className={getLinkStyle(link.path)}>
                {link.name}
              </Link>
            ))}
          </div>

          {!isOpen && mounted && (
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <Menu
                size={30}
                className="text-black dark:text-white transition-colors duration-300"
              />
            </button>
          )}
        </div>
      </nav>

      <div> {/* Spacer to prevent content jump */}
        <div className="h-[90px] md:h-[100px]" />
      </div>
      {/* ✅ Render the menu in a portal outside the navbar */}
      {mounted &&
        isOpen &&
        createPortal(
          <MobileMenu links={navLinks} onClose={toggleMenu} />,
          document.body
        )}
    </>
  );
}
