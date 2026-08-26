"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";

const stats = [
  {
    number: "₹12L Cr",
    caption: "Market cap under SEBI's BRSR mandate by 2027",
    source: "SEBI Circular, 2023",
  },
  {
    number: "€750B",
    caption: "Annual EU imports exposed to CBAM carbon tariffs",
    source: "EU Commission, 2024",
  },
  {
    number: "73%",
    caption: "Of Indian lenders now factor ESG into credit decisions",
    source: "RBI Financial Stability Report",
  },
  {
    number: "4.2×",
    caption: "Revenue premium for ESG-compliant MSMEs over 3 years",
    source: "CRISIL Research, 2024",
  },
];

export default function ESGChangingBusiness() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" as any });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-radial-forest pointer-events-none" />
      
      <div className="container-xl relative z-10">
        <SectionReveal>
          <div className="max-w-2xl mb-16">
            <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest text-gold bg-gold-pale/50 rounded-full mb-5">
              The ESG Imperative
            </span>
            <h2 className="mb-5">
              ESG Is Reshaping{" "}
              <span className="gradient-gold-text">Indian Business</span>
            </h2>
            <p className="text-lg text-stone leading-relaxed">
              Regulatory pressure is accelerating, supply chains are demanding transparency, 
              and capital is flowing toward verifiable sustainability. The question is no longer 
              whether to act — it&apos;s how quickly you can build a credible ESG foundation.
            </p>
          </div>
        </SectionReveal>

        {/* Image Card Replacement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.3,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full flex justify-center"
        >
          <img 
            src="/images/card.png" 
            alt="The ESG Imperative" 
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
