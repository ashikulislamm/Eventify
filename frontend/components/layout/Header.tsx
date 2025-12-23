'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="mx-auto relative">
      <header className="bg-lightBG text-secondary py-3 md:py-4 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between lg:relative">
          {/* Logo - Left on Mobile, Center on Desktop */}
          <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
            <Link href="/" className="text-lg md:text-xl xl:text-2xl font-bold tracking-wider text-accent">
              EVENTIFY
            </Link>
          </div>

          {/* Left Navigation - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-accent font-medium">
            <Link href="/retailers" className="text-xs xl:text-sm hover:opacity-80 transition-opacity whitespace-nowrap">
              FOR RETAILERS
            </Link>
            <Link href="/drivers" className="text-xs xl:text-sm hover:opacity-80 transition-opacity whitespace-nowrap">
              FOR DRIVERS
            </Link>
            <Link href="/cities" className="text-xs xl:text-sm hover:opacity-80 transition-opacity">
              CITIES
            </Link>
          </nav>

          {/* Right Navigation - Desktop Only */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link href="/careers" className="text-xs xl:text-sm hover:opacity-80 transition-opacity text-accent">
              CAREERS
            </Link>
            <Link 
              href="/become-organizer" 
              className="bg-accent text-white px-4 xl:px-6 py-2 rounded-full text-xs xl:text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              BECOME AN ORGANIZER
            </Link>
          </div>

          {/* Mobile Menu Button - Right Side */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-6 h-6 justify-center ml-auto text-accent font-medium"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-full bg-accent transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-accent transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-accent transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <nav className="lg:hidden absolute top-full left-4 right-4 mt-3 bg-lightBG text-accent rounded-3xl shadow-lg py-4 px-6 flex flex-col gap-3 z-50">
          <Link 
            href="/retailers" 
            className="text-sm hover:opacity-80 transition-opacity py-1"
            onClick={() => setIsMenuOpen(false)}
          >
            FOR RETAILERS
          </Link>
          <Link 
            href="/drivers" 
            className="text-sm hover:opacity-80 transition-opacity py-1"
            onClick={() => setIsMenuOpen(false)}
          >
            FOR DRIVERS
          </Link>
          <Link 
            href="/cities" 
            className="text-sm hover:opacity-80 transition-opacity py-1"
            onClick={() => setIsMenuOpen(false)}
          >
            CITIES
          </Link>
          <Link 
            href="/careers" 
            className="text-sm hover:opacity-80 transition-opacity py-1"
            onClick={() => setIsMenuOpen(false)}
          >
            CAREERS
          </Link>
          <Link 
            href="/become-organizer" 
            className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity text-center mt-2"
            onClick={() => setIsMenuOpen(false)}
          >
            JOIN US
          </Link>
        </nav>
      )}
    </div>
  );
}
