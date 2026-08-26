"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" as any });

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-[#FBF9F4]">
      <div className="container-xl relative z-10">
        
        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-[1200px] mx-auto flex flex-col items-center text-center"
        >
          {/* Image Replacement */}
          <motion.div
            {...fadeUp(0.2)}
            className="w-full max-w-[1000px] mb-12"
          >
            <img 
              src="/images/landing-page-footer.png" 
              alt="Transform Your ESG Management" 
              className="w-full h-auto object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </motion.div>

          {/* Buttons */}
          <motion.div 
            {...fadeUp(0.5)}
            className="flex flex-col sm:flex-row items-center gap-5"
          >
            <Link href="/assessment">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8893F] rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(184,137,63,0.4)] border border-[#FBF9F4]/20">
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <div className="relative flex items-center gap-3">
                  <span className="font-semibold text-[#143C32] text-base">Start Free Assessment</span>
                  <ArrowRight className="w-4 h-4 text-[#143C32] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 bg-[#16332A] rounded-full transition-all duration-300 hover:bg-[#1C2321] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(22,51,42,0.2)]">
                <span className="font-semibold text-white text-base">Book Demo</span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
