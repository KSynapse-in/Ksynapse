"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionReveal from "@/components/ui/SectionReveal";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const footerSections = [
  {
    title: "Platform",
    links: [
      { label: "ESG Dashboard", href: "/services" },
      { label: "Carbon Monitoring", href: "/services" },
      { label: "Compliance Tracking", href: "/services" },
      { label: "KPI Management", href: "/services" },
      { label: "Reports & Exports", href: "/services" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "ESG Strategy", href: "/services" },
      { label: "BRSR Reporting", href: "/services" },
      { label: "Maturity Assessment", href: "/assessment" },
      { label: "Gap Analysis", href: "/services" },
      { label: "Training Programs", href: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Compliance Hub", href: "/compliance-hub" },
      { label: "Impact Calculator", href: "/impact-calculator" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About KSynapse", href: "/" },
      { label: "Contact Us", href: "/contact" },
      { label: "Book a Demo", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const frameworks = ["BRSR", "GRI", "SASB", "ISSB", "TCFD", "CDP"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email,
        subscribedAt: serverTimestamp(),
      });
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("error");
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Regulatory Signal Desk */}
      <div className="relative overflow-hidden bg-[#092219]">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-[#D7B46B]/10" />
          <div className="absolute -left-10 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full border border-[#D7B46B]/10" />
          <div className="absolute right-[8%] -top-24 h-80 w-80 rounded-full bg-[#D7B46B]/[0.06] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:54px_54px]" />
        </div>

        <div className="container-xl relative z-10 py-10 sm:py-12 lg:py-14">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-7 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(215,180,107,0.09),transparent_28%),linear-gradient(110deg,rgba(255,255,255,0.025),transparent_48%,rgba(215,180,107,0.025))]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D7B46B]/20 bg-[#D7B46B]/[0.07] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#E8D6A8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D7B46B] shadow-[0_0_0_4px_rgba(215,180,107,0.08)]" />
                  Regulatory signal desk
                </div>
                <h3 className="max-w-xl text-[2rem] font-normal leading-[1.05] tracking-[-0.035em] !text-[#F5F0E5] sm:text-[2.65rem]">
                  Stay ahead of ESG regulations — before they become deadlines.
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 !text-[#D9D2C4]/75 sm:text-[15px]">
                  Get regulatory alerts, compliance updates, and sustainability insights delivered to your inbox — curated for Indian organisations and the frameworks that matter.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['BRSR', 'GRI', 'ISSB', 'SASB'].map((fw) => (
                    <span key={fw} className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[8px] tracking-[0.14em] !text-[#D7CDBA]/60">{fw}</span>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-xl lg:w-[460px]">
                <div className="rounded-[22px] border border-white/10 bg-[#071A14]/70 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubscribe}>
                    <label className="sr-only" htmlFor="footer-work-email">Work email</label>
                    <input
                      id="footer-work-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your work email"
                      required
                      className="h-12 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.055] px-4 text-sm !text-[#F7F2E8] placeholder:!text-[#BFB6A5]/45 outline-none transition-all focus:border-[#D7B46B]/45 focus:bg-white/[0.08]"
                    />
                    <Button type="submit" disabled={status === "loading"} variant="gold" size="lg" iconRight={<ArrowRight className="w-4 h-4" />} className="h-12 rounded-xl px-6">
                      {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Get the signal"}
                    </Button>
                  </form>
                  <div className="mt-3 flex items-center justify-between gap-3 px-1">
                    <span className="flex items-center gap-2 text-[9px] !text-[#CFC7B7]/50"><Mail className="h-3 w-3 !text-[#D7B46B]" /> No noise. Only relevant updates.</span>
                    <span className="hidden font-mono text-[8px] uppercase tracking-[0.14em] !text-[#CFC7B7]/35 sm:inline">Free intelligence brief</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-forest-deep">
        <div className="container-xl py-16">
          {/* Top row: Logo + frameworks */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-14">
            <div className="max-w-sm">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M12 8L7 11V17L12 20L17 17V11L12 8Z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1" strokeLinejoin="round" />
                    <circle cx="12" cy="14" r="2" fill="white" />
                  </svg>
                </div>
                <span className="font-display text-lg text-white tracking-tight">KSynapse</span>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                AI-powered ESG intelligence helping Indian MSMEs navigate multi-framework sustainability compliance with confidence and clarity.
              </p>
              {/* Framework badges */}
              <div className="flex flex-wrap gap-2">
                {frameworks.map((fw) => (
                  <span
                    key={fw}
                    className="px-3 py-1 text-xs font-mono text-white/60 border border-white/10 rounded-full"
                  >
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-white/90 font-body font-semibold text-sm mb-4 uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-white/45 hover:text-gold text-sm transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-white/30 text-xs">
                © {new Date().getFullYear()} KSynapse Technologies Pvt. Ltd. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-white/30 hover:text-white/50 text-xs transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/30 hover:text-white/50 text-xs transition-colors">
                Terms
              </Link>
              <Link href="/refund" className="text-white/30 hover:text-white/50 text-xs transition-colors">
                Refund Policy
              </Link>
              <div className="w-px h-4 bg-white/10" />
              <a href="#" className="text-white/30 hover:text-gold transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="#" className="text-white/30 hover:text-gold transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}