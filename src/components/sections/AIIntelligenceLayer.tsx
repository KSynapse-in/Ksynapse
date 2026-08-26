"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { Brain, Zap, MessageSquare, Target } from "lucide-react";

const capabilities = [
  {
    icon: Brain,
    title: "Auto-Framework Mapping",
    description:
      "Every single disclosure you enter is automatically mapped against the relevant clauses of BRSR, GRI, SASB/ISSB, TCFD, and CDP — no manual cross-referencing.",
    stat: "5×",
    statLabel: "less duplicate work",
  },
  {
    icon: Target,
    title: "Quick Wins Engine",
    description:
      "Our AI identifies the highest-impact, lowest-effort actions your organisation can take right now to improve its ESG score — prioritised by your specific gap profile.",
    stat: "3–5",
    statLabel: "actions per cycle",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Querying",
    description:
      "Ask questions about your own compliance data in plain English. \"What's our Scope 2 trend this quarter?\" — and get instant, sourced answers from your own ESG dataset.",
    stat: "<2s",
    statLabel: "response time",
  },
  {
    icon: Zap,
    title: "Predictive Compliance Alerts",
    description:
      "The platform monitors upcoming regulatory deadlines and framework updates, alerting you before gaps become violations — not after.",
    stat: "30+",
    statLabel: "days advance notice",
  },
];

export default function AIIntelligenceLayer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" as any });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 bg-radial-subtle pointer-events-none" />
      
      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 items-start">
          {/* Left: Editorial copy */}
          <SectionReveal>
            <div className="lg:sticky lg:top-32">
              <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest text-forest bg-sage-pale rounded-full mb-5">
                AI Intelligence
              </span>
              <h2 className="mb-5">
                Not Just{" "}
                <span className="line-through decoration-stone/30">&ldquo;AI-Powered&rdquo;</span>
                <br />
                <span className="gradient-gold-text">Genuinely Intelligent</span>
              </h2>
              <p className="text-lg text-stone leading-relaxed mb-6">
                Every AI claim on this platform maps to a specific, measurable capability.
                No buzzwords — here&apos;s exactly what the intelligence layer does for your organisation.
              </p>
              <div className="p-5 rounded-xl bg-parchment border border-divider/40">
                <p className="text-sm text-stone italic font-display">
                  &ldquo;We built KSynapse because we were tired of ESG platforms that said &lsquo;AI-powered&rsquo; 
                  on the marketing page and used a spreadsheet export behind the login.&rdquo;
                </p>
                <span className="text-xs text-stone/60 mt-2 block font-mono">— KSynapse Founding Team</span>
              </div>
            </div>
          </SectionReveal>

          {/* Right: Capability cards — each distinct */}
          <div className="space-y-5">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-7 rounded-2xl bg-white border border-divider/40 hover:shadow-card hover:border-divider transition-all duration-500"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center group-hover:bg-forest/10 transition-colors">
                    <cap.icon className="w-5 h-5 text-forest" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h4 className="font-display text-lg">{cap.title}</h4>
                      <div className="flex-shrink-0 text-right">
                        <span className="font-mono text-xl font-semibold text-gold block leading-none">
                          {cap.stat}
                        </span>
                        <span className="text-[10px] text-stone uppercase tracking-wider">
                          {cap.statLabel}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-stone leading-relaxed">{cap.description}</p>
                  </div>
                </div>
                {/* Hover accent */}
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gold/0 group-hover:bg-gold/60 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
