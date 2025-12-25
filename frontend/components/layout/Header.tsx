"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { text: "Browse Events", href: "/events" },
  { text: "About Us", href: "/about" },
  { text: "Activities", href: "/activities" },
  { text: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 mx-auto transition-all duration-500 ${
        isScrolled ? "pt-2" : "pt-0"
      }`}
    >
      <header
        className={`bg-white text-secondary py-3 md:py-4 px-4 md:px-6 shadow-md transition-all duration-1000 ${
          isScrolled
            ? "max-w-[1300px] mx-auto rounded-full"
            : "max-w-full rounded-none"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between lg:relative">
          {/* Logo - Left on Mobile, Center on Desktop */}
          <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
            <Link
              href="/"
              className="text-lg md:text-xl xl:text-2xl font-bold tracking-wider text-accent"
            >
              EVENTIFY
            </Link>
          </div>

          {/* Left Navigation - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-accent font-medium">
            {navLinks.slice(0, 4).map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-xs xl:text-sm hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {/* Right Navigation - Desktop Only */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <Link
              href="/login"
              className="bg-primary rounded-full text-white px-4 xl:px-6 py-2 text-xs xl:text-sm hover:opacity-80 transition-opacity"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-accent text-white px-4 xl:px-6 py-2 rounded-full text-xs xl:text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button - Right Side */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-6 h-6 justify-center ml-auto text-accent font-medium"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-full bg-accent transition-all ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-accent transition-all ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-accent transition-all ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <nav className="lg:hidden absolute top-full left-4 right-4 mt-3 bg-white text-accent rounded-3xl shadow-lg py-4 px-6 flex flex-col gap-3 z-50">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm hover:opacity-80 transition-opacity py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.text}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-gray-200">
            <Link
              href="/login"
              className="bg-primary text-white px-4 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-accent text-white px-4 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
