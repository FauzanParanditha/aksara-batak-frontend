"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Timeline", href: "#timeline" },
    { name: "Problems", href: "#problems" },
    { name: "Prizes", href: "#prizes" },
    { name: "FAQ", href: "#faq" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/20 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="flex flex-row gap-2 items-center space-y-2">
                <Image
                  src="/images/logo/logo2.png"
                  alt="Hackathon Logo"
                  width={130}
                  height={170}
                  className="rounded-full transition-transform duration-300 hover:scale-110"
                />
                <Image
                  src="/images/logo/aspiluki2.png"
                  alt="Hackathon Logo"
                  width={110}
                  height={110}
                  className="rounded-full transition-transform duration-300 hover:scale-110"
                />
                <Image
                  src="/images/logo/ftii2.png"
                  alt="Hackathon Logo"
                  width={110}
                  height={110}
                  className="rounded-full transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="relative px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 opacity-0 group-hover:opacity-100"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex space-x-4">
              <Button
                onClick={() => scrollToSection("#register")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Register Now
              </Button>
              <Link href={"/auth/login"}>
                <Button className="bg-transparent border border-gray-300 text-gray-300 hover:bg-white/10 hover:text-white px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Login
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-xl border-t border-white/10">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 pb-2">
              <Button
                onClick={() => scrollToSection("#registration")}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full font-semibold"
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed nav */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;
