"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";

export default function SingleEntryAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" as any });

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-[#FBF9F4]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(20,60,50,0.4) 0%, transparent 50%),
                            radial-gradient(circle at 70% 70%, rgba(184,137,63,0.3) 0%, transparent 50%)`,
        }} />
      </div>

      <div className="container-xl relative z-10">
        <SectionReveal>
          <div className="text-center mb-12">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display text-charcoal mb-4 tracking-tight leading-tight">
              One Data Entry. <span className="text-forest">Many Frameworks.</span>
            </h2>
          </div>
        </SectionReveal>

        {/* Video Showcase - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Ambient glow */}
          <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-forest/[0.05] via-transparent to-gold/[0.05] blur-2xl pointer-events-none" />

          {/* Premium video container */}
          <div
            className="relative rounded-3xl overflow-hidden bg-white w-full"
            style={{
              border: "1px solid rgba(216, 208, 190, 0.6)",
              boxShadow: `
                0 4px 6px -1px rgba(22, 51, 42, 0.04),
                0 12px 24px -4px rgba(22, 51, 42, 0.06),
                0 24px 48px -8px rgba(22, 51, 42, 0.04)
              `,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-auto block"
              style={{ display: "block" }}
            >
              <source src="/video/fw.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
