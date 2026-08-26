"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { ClipboardCheck, Lightbulb, Cpu, ArrowDown, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Assess",
    description: "Take the free ESG Maturity Assessment. Answer targeted questions about your environmental, social, and governance practices. Get an instant maturity score with pillar-wise breakdown.",
    color: "#A9793B",
    bgColor: "rgba(169,121,59,0.06)",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Advise",
    description: "Receive AI-generated recommendations, gap analysis, and a prioritised action plan. Connect with an assigned ESG advisor for expert guidance tailored to your industry and scale.",
    color: "#5C7A66",
    bgColor: "rgba(92,122,102,0.06)",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Automate",
    description: "Onboard to the platform. Track KPIs, monitor carbon emissions, generate compliance reports, and manage multi-framework reporting — all from one intelligent dashboard.",
    color: "#16332A",
    bgColor: "rgba(22,51,42,0.06)",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" as any });

  return (
    <section className="section-padding relative overflow-hidden bg-parchment/30" ref={ref}>
      <div className="container-lg">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest text-gold bg-gold-pale/50 rounded-full mb-5">
              The Process
            </span>
            <h2 className="mb-5">
              From Assessment to{" "}
              <span className="gradient-gold-text">Automation</span>
            </h2>
            <p className="text-lg text-stone">
              Three clear steps to transform your organisation&apos;s ESG management — 
              from understanding where you stand to running a fully automated compliance engine.
            </p>
          </div>
        </SectionReveal>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-[2px]">
            <motion.div
              className="h-full bg-gradient-to-r from-gold via-sage to-forest rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-center"
              >
                {/* Step circle */}
                <div className="relative inline-flex mb-8">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center border-2 bg-white relative z-10"
                    style={{ borderColor: step.color }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: step.color }} />
                  </div>
                  <div
                    className="absolute -inset-2 rounded-full opacity-20"
                    style={{ backgroundColor: step.color }}
                  />
                  {/* Number badge */}
                  <span
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-semibold text-white z-20"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-display mb-3" style={{ color: step.color }}>
                  {step.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Mobile arrow connector */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowDown className="w-5 h-5 text-divider" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
