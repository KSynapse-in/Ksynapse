"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import Link from "next/link";
import {
  BarChart3, Leaf, ShieldCheck, LineChart, Settings2, ArrowRight,
} from "lucide-react";

const capabilities = [
  {
    title: "ESG Performance Management",
    image: "/images/esg.png",
  },
  {
    title: "Environmental Intelligence",
    image: "/images/environmental.png",
  },
  {
    title: "Compliance & Reporting",
    image: "/images/compliance.png",
  },
  {
    title: "Analytics & Insights",
    image: "/images/analytics.png",
  },
  {
    title: "Enterprise Tools",
    image: "/images/enterprise.png",
  },
];

export default function PlatformCapabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" as any });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="container-xl">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest text-forest bg-sage-pale rounded-full mb-5">
              Platform
            </span>
            <h2 className="mb-5">
              Everything You Need,{" "}
              <span className="gradient-text">Nothing You Don&apos;t</span>
            </h2>
            <p className="text-lg text-stone">
              Five integrated capability groups that cover the full ESG lifecycle — from data collection to board-ready reporting.
            </p>
          </div>
        </SectionReveal>

        {/* Bento-grid image layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => {
            const isLarge = i === 0 || i === 2;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl shadow-lg border border-divider/40 ${
                  isLarge && i === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <img 
                  src={cap.image} 
                  alt={cap.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </motion.div>
            );
          })}
        </div>

        <SectionReveal delay={0.5}>
          <div className="text-center mt-12">
            <Link href="/services">
              <motion.span
                className="inline-flex items-center gap-2 text-forest font-medium text-sm hover:text-gold transition-colors cursor-pointer group"
                whileHover={{ x: 4 }}
              >
                Explore all platform capabilities
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.span>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
