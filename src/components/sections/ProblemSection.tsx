"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { FileSpreadsheet, ArrowRight, Layers, AlertTriangle, BarChart3 } from "lucide-react";

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" as any });

  return (
    <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden bg-parchment/30" ref={ref}>
      <div className="container-xl relative z-10">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest text-brick bg-brick/8 rounded-full mb-4">
              The Challenge
            </span>
            <h2 className="mb-4">
              ESG Data Shouldn&apos;t Live in{" "}
              <span className="line-through decoration-brick/30 decoration-2">Spreadsheets</span>
            </h2>
            <p className="text-base sm:text-lg text-stone leading-relaxed">
              Most organisations manage ESG across disconnected tools, manual processes, 
              and consultant-dependent cycles. The result: fragmented data, duplicated effort, 
              and zero real-time visibility into compliance readiness.
            </p>
          </div>
        </SectionReveal>

        {/* Before/After visual image showcase (Pure Edge-to-Edge Images) */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* BEFORE: Challenge 1 Pure Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 group border border-divider/60 bg-white"
          >
            <img
              src="/images/challenge1.png"
              alt="Manual ESG Management Challenge"
              className="w-full h-full object-cover block transform group-hover:scale-[1.01] transition-transform duration-500"
            />
          </motion.div>

          {/* AFTER: Challenge 2 Pure Image Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-elevated hover:shadow-2xl transition-all duration-500 group border border-gold/40 bg-forest"
          >
            <img
              src="/images/challenge2.png"
              alt="KSynapse Unified ESG Platform Solution"
              className="w-full h-full object-cover block transform group-hover:scale-[1.01] transition-transform duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
