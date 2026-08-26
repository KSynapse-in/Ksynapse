"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function MeetKSynapse() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" as any });

  return (
    <section className="py-8 sm:py-12 md:py-16 w-full relative overflow-hidden border-0" ref={ref}>
      {/* Ambient background illumination */}
      <div className="absolute inset-0 bg-radial-subtle pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-gold/15 via-forest/10 to-sage/15 blur-[150px] pointer-events-none -z-10" />
      
      {/* 100% full horizontal edge-to-edge container with zero horizontal padding or constraints */}
      <div className="w-full relative z-10 p-0 m-0 border-0">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative flex items-center justify-center p-0 m-0 border-0"
          >
            <img
              src="/images/mission.png"
              alt="Our Mission - KSynapse"
              className="w-full h-auto block object-cover select-none border-0 m-0 p-0"
            />
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}
