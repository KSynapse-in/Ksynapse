"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "ESG Maturity Assessment", href: "/assessment" },
  { label: "Services", href: "/services" },
  { label: "ESG Compliance Hub", href: "/compliance-hub" },
  { label: "Impact Calculator", href: "/impact-calculator" },
  { label: "Case Studies", href: "/case-studies" },

  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-ivory/90 backdrop-blur-xl shadow-subtle border-b border-divider/50"
            : "bg-transparent"
        }`}
      >
        <nav className="container-xl flex items-center justify-between min-h-[72px] lg:h-[84px] py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 group">
            <img
              src="/assets/logo.png"
              alt="KSynapse"
              className="h-11 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ mixBlendMode: "multiply" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-[13px] xl:text-[14px] font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "text-forest"
                      : "text-charcoal/70 hover:text-forest hover:bg-parchment/60"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold rounded-full"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden xl:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/contact#demo">
              <Button
                variant="primary"
                size="sm"
                iconRight={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Book Demo
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="xl:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-parchment transition-colors"
            aria-label="Toggle navigation"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <div
              className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-[min(85vw,380px)] bg-ivory border-l border-divider/50 shadow-elevated overflow-y-auto"
            >
              <div className="p-6 pt-20">
                <div className="space-y-1">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                            isActive
                              ? "bg-forest/5 text-forest border-l-2 border-gold"
                              : "text-charcoal/70 hover:text-forest hover:bg-parchment"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-divider space-y-3">
                  <Link href="/login" className="block">
                    <Button variant="outline" size="lg" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/contact#demo" className="block">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      iconRight={<ArrowRight className="w-4 h-4" />}
                    >
                      Book Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
