"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease },
});

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full overflow-hidden pt-[114px] pb-[46px] sm:pt-[126px] sm:pb-[54px] lg:pt-[136px] lg:pb-[62px] xl:pt-[152px] xl:pb-[74px] 2xl:pt-[172px] 2xl:pb-[92px] px-6 lg:px-12 xl:px-16">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-[12%] -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[650px] h-[80vw] max-h-[650px] rounded-full bg-gradient-to-br from-gold/15 via-forest/5 to-transparent blur-[130px]" />
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[80vw] max-w-[600px] h-[80vw] max-h-[600px] rounded-full bg-gradient-to-tl from-forest/15 via-sage/8 to-transparent blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-divider) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Perfectly balanced 2-column layout with center alignment */}
      <div className="w-full max-w-[1680px] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 xl:gap-16">
        {/* Left Column: Refined, high-impact typography & tighter spacing hierarchy */}
        <div className="w-full lg:w-[46%] xl:w-[45%] max-w-[660px] flex-shrink-0 flex flex-col justify-center text-left z-10">
          <motion.h1
            {...fade(0.35)}
            className="font-display text-[2.5rem] sm:text-[3.25rem] md:text-[3.5rem] lg:text-[3.4rem] xl:text-[3.85rem] 2xl:text-[4.2rem] leading-[1.06] tracking-[-0.03em] text-charcoal"
          >
            One Platform.
            <br />
            Every Framework.
            <br />
            <span className="gradient-text font-semibold">Zero Complexity.</span>
          </motion.h1>

          <motion.p
            {...fade(0.5)}
            className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-stone leading-[1.62] max-w-[560px]"
          >
            AI-driven carbon accounting, compliance management, and sustainability reporting — from one intelligent enterprise platform.
          </motion.p>

          <motion.div {...fade(0.65)} className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <Link href="/assessment">
              <Button
                variant="primary"
                size="lg"
                className="text-base py-3.5 px-7 sm:py-4 sm:px-8 shadow-elevated hover:shadow-xl transition-all duration-300"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Start Free Assessment
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="text-base py-3.5 px-7 sm:py-4 sm:px-8 hover:bg-forest hover:text-white transition-all duration-300"
              >
                Book Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            {...fade(0.8)}
            className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-divider/70 grid grid-cols-3 gap-3 sm:gap-4 max-w-[540px]"
          >
            {[
              { value: "1,000+", label: "Organizations" },
              { value: "6", label: "Frameworks" },
              { value: "AI", label: "Powered" },
            ].map((stat, idx) => (
              <div key={stat.label} className={`${idx > 0 ? "border-l border-divider/60 pl-4 sm:pl-6" : ""}`}>
                <div className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-forest tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs lg:text-sm text-stone mt-1 sm:mt-1.5 uppercase tracking-wider font-mono font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Vertically aligned framed video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease }}
          className="w-full lg:w-[54%] xl:w-[55%] max-w-[920px] flex items-center justify-center relative"
        >
          {/* Subtle architectural back-glow */}
          <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-gold/20 via-forest/15 to-transparent opacity-85 blur-2xl pointer-events-none -z-10" />

          <div
            className="w-full aspect-[16/10] sm:aspect-[16/9] max-h-[520px] xl:max-h-[580px] 2xl:max-h-[620px] relative rounded-[22px] xl:rounded-[28px] overflow-hidden transition-all duration-500 hover:shadow-2xl bg-charcoal/5 group"
            style={{
              border: "1px solid rgba(216, 208, 190, 0.9)",
              boxShadow: `
                0 10px 30px rgba(22, 51, 42, 0.08),
                0 24px 64px -12px rgba(22, 51, 42, 0.18)
              `,
            }}
          >
            <div className="absolute inset-0 z-10 pointer-events-none rounded-[22px] xl:rounded-[28px] border border-white/20" />
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover block transform scale-[1.01] transition-transform duration-700 group-hover:scale-100"
            >
              <source src="/video/hero%20video.mp4" type="video/mp4" />
              <source src="/video/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
