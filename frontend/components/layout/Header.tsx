"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineUser, HiOutlineLogout, HiChevronDown } from "react-icons/hi";
import Logo from "../../public/Logo.png";

const navLinks = [
  { text: "Browse Events", href: "/events" },
  { text: "About Us", href: "/about" },
  { text: "Activities", href: "/activities" },
  { text: "Contact Us", href: "/contact" },
];

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsUserMenuOpen(false);
    router.push("/");
  };

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
          <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 ">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                alt="Eventify Logo"
                width={isScrolled ? 100 : 120}
                height={isScrolled ? 60 : 80}
                className="transition-all duration-500 p-2"
                priority
              />
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
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="bg-primary rounded-lg text-white px-4 xl:px-6 py-2 text-xs xl:text-sm hover:opacity-80 transition-opacity"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-accent text-white px-4 xl:px-6 py-2 rounded-lg text-xs xl:text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 bg-primary text-white px-4 xl:px-6 py-2.5 rounded-lg text-xs xl:text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <HiOutlineUser className="w-5 h-5" />
                  <span className="whitespace-nowrap">{user.name}</span>
                  <HiChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                    <Link
                      href={`/user/${user.name.toLowerCase().replace(/\s+/g, "")}`}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <HiOutlineUser className="w-4 h-4" />
                      My Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <HiOutlineLogout className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Right Side */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center focus:outline-none"
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
            {!user ? (
              <>
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
              </>
            ) : (
              <>
                <div className="px-2 py-2 text-sm font-semibold text-gray-700 border-b border-gray-200">
                  {user.name}
                </div>
                <Link
                  href={`/user/${user.name.toLowerCase().replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HiOutlineUser className="w-4 h-4" />
                  My Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg text-left"
                >
                  <HiOutlineLogout className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
