"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    traditional: "Manual, framework-by-framework filing",
    ksynapse: "Single entry, mapped to five frameworks automatically",
  },
  {
    traditional: "Consultant-dependent, project-based cycles",
    ksynapse: "Always-on dashboard with an assigned advisor",
  },
  {
    traditional: "Data scattered across spreadsheets and email",
    ksynapse: "Centralised data lake with real-time visibility",
  },
  {
    traditional: "Compliance gaps discovered during audits",
    ksynapse: "Predictive alerts 30+ days before deadlines",
  },
  {
    traditional: "Generic reporting templates",
    ksynapse: "AI-generated, framework-specific reports",
  },
  {
    traditional: "No industry benchmarking",
    ksynapse: "Real-time peer comparison across sectors",
  },
];

export default function WhyChooseKSynapse() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" as any });

  return (
    <section className="section-padding relative overflow-hidden bg-parchment/30" ref={ref}>
      <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest text-forest bg-sage-pale rounded-full mb-5">
              The Difference
            </span>
            <h2 className="mb-5">
              Why Organisations{" "}
              <span className="gradient-text">Choose KSynapse</span>
            </h2>
          </div>
        </SectionReveal>

        {/* Table Image Replacement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full flex justify-center"
        >
          <img 
            src="/images/table.png" 
            alt="Why Choose KSynapse Comparison" 
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
