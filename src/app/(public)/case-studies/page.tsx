"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import Button from "@/components/ui/Button";

// Easing curve used across the site
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function CaseStudiesPage() {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, "case_studies_access"), {
          email,
          requestedAt: serverTimestamp(),
        });
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail("");
        }, 4000);
      } catch (error) {
        console.error("Error saving request:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-116px)] flex flex-col items-center justify-center py-20 px-4 overflow-hidden bg-ivory">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.5]" 
          style={{ backgroundImage: "url('/images/esgassessment.png')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F7F4EA] opacity-80" />
      </div>
      
      {/* Background ambient lighting for the page */}
      <div className="absolute inset-0 bg-radial-subtle pointer-events-none opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full max-h-[800px] bg-gradient-to-tr from-gold/5 via-forest/5 to-sage/5 blur-[120px] pointer-events-none -z-10" />

      <SectionReveal>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative w-full max-w-[640px] mx-auto"
        >
          {/* Glass-morphism Card */}
          <div className="relative bg-white/70 backdrop-blur-xl border border-gold/40 rounded-[32px] p-8 sm:p-12 shadow-elevated overflow-hidden group">
            
            {/* Ambient inner card background detail (slow rotating gradient effect) */}
            <div className="absolute -inset-1/2 opacity-30 pointer-events-none">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                className="w-full h-full bg-[conic-gradient(from_0deg,transparent,rgba(169,121,59,0.1)_25%,transparent_50%,rgba(22,51,42,0.08)_75%,transparent)]"
              />
            </div>
            
            {/* Particle drift effect */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
               <motion.div
                 animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
                 transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                 className="absolute top-[20%] left-[20%] w-32 h-32 bg-gold/15 rounded-full blur-3xl"
               />
               <motion.div
                 animate={{ y: [0, 30, 0], opacity: [0.1, 0.5, 0.1] }}
                 transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                 className="absolute bottom-[20%] right-[20%] w-40 h-40 bg-forest/10 rounded-full blur-3xl"
               />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* SVG Path Animation Icon (Document Motif) */}
              <div className="mb-8 relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse blur-xl" />
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10 drop-shadow-sm"
                >
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease }}
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease, delay: 0.5 }}
                    d="M14 2v6h6"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease, delay: 1 }}
                    d="M16 13H8"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease, delay: 1.2 }}
                    d="M16 17H8"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease, delay: 1.4 }}
                    d="M10 9H8"
                  />
                </svg>
              </div>

              {/* Typography */}
              <h1 className="font-display text-[2rem] sm:text-[2.5rem] leading-[1.1] text-charcoal mb-4">
                Case Studies <span className="text-gold italic font-medium">Are Coming</span>
              </h1>
              <p className="text-stone text-[1rem] sm:text-[1.05rem] max-w-[420px] mx-auto leading-relaxed mb-10">
                Detailed breakdowns of our most impactful ESG transformations are currently in progress. Great stories take time to craft.
              </p>

              {/* Micro-form & Actions */}
              <div className="w-full max-w-[340px] mx-auto space-y-8">
                <form onSubmit={handleSubmit} className="relative group">
                  <div className="relative">
                    <input
                      type="email"
                      id="notifyEmail"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className="block w-full px-4 pt-6 pb-2 text-[1rem] text-charcoal bg-white/40 border-0 border-b border-divider/60 rounded-t-xl focus:ring-0 focus:outline-none transition-colors peer placeholder-transparent backdrop-blur-sm"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="notifyEmail"
                      className={`absolute left-4 transition-all duration-400 ease-out pointer-events-none text-stone ${
                        isFocused || email ? "top-2 text-[0.7rem] text-gold font-semibold uppercase tracking-wider" : "top-4 text-[0.95rem]"
                      }`}
                    >
                      Notify me when live
                    </label>
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-gold"
                      initial={{ width: "0%" }}
                      animate={{ width: isFocused ? "100%" : "0%" }}
                      transition={{ duration: 0.4, ease }}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-stone/70 hover:text-gold transition-colors focus:outline-none"
                    >
                      <Send className="w-[1.1rem] h-[1.1rem]" />
                    </button>
                  </div>
                  
                  <div className="h-6 mt-1 relative w-full">
                    <AnimatePresence>
                      {isSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="absolute inset-0 flex items-center justify-center text-[0.8rem] text-forest font-medium"
                        >
                          You're on the list. We'll be in touch!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>

                <div className="pt-2">
                  <Link href="/resources" className="inline-block group/link">
                    <Button variant="outline" size="sm" className="bg-transparent border-divider/50 hover:border-gold/50 hover:bg-gold-pale/10 text-stone group-hover/link:text-charcoal transition-all">
                      <ArrowLeft className="w-3.5 h-3.5 mr-2" />
                      Explore Resources
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionReveal>
    </div>
  );
}
