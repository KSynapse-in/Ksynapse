"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Users, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    title: "Environmental",
    color: "#5C7A66",
    bgColor: "rgba(92,122,102,0.08)",
    borderColor: "rgba(92,122,102,0.2)",
    accentLine: "from-sage to-sage/0",
    description:
      "Climate action, carbon emissions, energy efficiency, water stewardship, waste reduction, and ecological preservation. Measuring and managing your organisation's impact on the natural world.",
    metrics: ["Carbon Emissions", "Energy Use", "Water", "Waste"],
  },
  {
    icon: Users,
    title: "Social",
    color: "#A9793B",
    bgColor: "rgba(169,121,59,0.08)",
    borderColor: "rgba(169,121,59,0.2)",
    accentLine: "from-gold to-gold/0",
    description:
      "Employee welfare, diversity and inclusion, community impact, human rights, health and safety, and equitable labour practices. Building a workplace and supply chain that values every stakeholder.",
    metrics: ["D&I Policies", "Health & Safety", "Training", "Community"],
  },
  {
    icon: ShieldCheck,
    title: "Governance",
    color: "#16332A",
    bgColor: "rgba(22,51,42,0.06)",
    borderColor: "rgba(22,51,42,0.15)",
    accentLine: "from-forest to-forest/0",
    description:
      "Board oversight, ethics and anti-corruption, regulatory compliance, data privacy, risk management, and transparent reporting. The structural integrity that makes sustainable growth possible.",
    metrics: ["Ethics", "Compliance", "Data Privacy", "Oversight"],
  },
];

export default function WhatIsESG() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" as any });

  return (
    <section className="py-12 md:py-16 lg:py-20 relative" ref={ref}>
      <div className="container-xl">
        <SectionReveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest text-sage bg-sage-pale rounded-full mb-4">
              Understanding ESG
            </span>
            <h2 className="mb-4">
              Three Pillars,{" "}
              <span className="gradient-text font-semibold">One Standard</span>
            </h2>
            <p className="text-base sm:text-lg text-stone leading-relaxed">
              ESG is the framework through which stakeholders evaluate an organisation&apos;s 
              environmental responsibility, social consciousness, and governance integrity.
            </p>
          </div>
        </SectionReveal>

        {/* Center-Stage Understanding ESG Graphic Showcase (Frameless) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1280px] mx-auto flex items-center justify-center mt-6"
        >
          {/* Subtle soft background aura to illuminate the diagram naturally */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[75%] rounded-full bg-gradient-to-r from-sage/15 via-gold/10 to-forest/15 blur-[130px] pointer-events-none -z-10" />

          <img
            src="/images/Understanding.png"
            alt="Understanding ESG - Three Pillars, One Standard"
            className="w-full h-auto block select-none drop-shadow-sm transition-transform duration-700 hover:scale-[1.005]"
          />
        </motion.div>
      </div>
    </section>
  );
}
