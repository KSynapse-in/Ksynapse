"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Shield, Globe, Target, Zap, Activity, BookOpen, Scale, Network } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────
const categories = {
  India: { color: "#143C32", label: "India" },
  Global: { color: "#A9793B", label: "Global Reporting" },
  Climate: { color: "#5C7A66", label: "Climate" },
  Regulation: { color: "#8A5A3B", label: "Regulation" },
  Impact: { color: "#8C9490", label: "Impact" }
};

const frameworks = [
  // Left Side
  { id: "brsr", abbr: "BRSR", name: "Business Responsibility & Sustainability", cat: categories.India, region: "SEBI Mandatory", purpose: "Indian Enterprise Compliance", icon: Shield, side: "left", tooltipOffset: "top-0" },
  { id: "tcfd", abbr: "TCFD", name: "Task Force on Climate-related Disclosures", cat: categories.Climate, region: "FSB / G20", purpose: "Climate Risk Financials", icon: Zap, side: "left", tooltipOffset: "-top-16" },
  { id: "cdp", abbr: "CDP", name: "Carbon Disclosure Project", cat: categories.Climate, region: "Investor-Driven", purpose: "Carbon & Supply Chain", icon: Leaf, side: "left", tooltipOffset: "top-8" },
  { id: "ghg", abbr: "GHG", name: "GHG Protocol", cat: categories.Climate, region: "Global Standard", purpose: "Emissions Accounting", icon: Activity, side: "left", tooltipOffset: "top-16" },
  // Right Side
  { id: "gri", abbr: "GRI", name: "Global Reporting Initiative", cat: categories.Global, region: "Global Standard", purpose: "Universal Sustainability", icon: Globe, side: "right", tooltipOffset: "top-0" },
  { id: "issb", abbr: "ISSB", name: "Intl. Sustainability Standards Board", cat: categories.Global, region: "IFRS Foundation", purpose: "Financial Materiality", icon: BookOpen, side: "right", tooltipOffset: "-top-16" },
  { id: "sasb", abbr: "SASB", name: "Sustainability Accounting Standards", cat: categories.Global, region: "Industry-Specific", purpose: "Sector Metrics", icon: Target, side: "right", tooltipOffset: "top-20" },
  { id: "csrd", abbr: "CSRD", name: "Corporate Sustainability Reporting", cat: categories.Regulation, region: "European Union", purpose: "Double Materiality", icon: Scale, side: "right", tooltipOffset: "top-12" },
  { id: "unsdg", abbr: "SDGs", name: "UN Sustainable Development Goals", cat: categories.Impact, region: "United Nations", purpose: "Global Impact Alignment", icon: Network, side: "right", tooltipOffset: "bottom-0" },
];

export default function ComplianceHubPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" as any });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Split frameworks
  const leftFws = frameworks.filter(f => f.side === "left");
  const rightFws = frameworks.filter(f => f.side === "right");

  return (
    <section ref={containerRef} className="py-24 lg:py-32 relative overflow-hidden bg-[#FBF9F4]">
      {/* ─── AMBIENT BACKGROUND ─── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(80,180,140,0.06)_0%,transparent_70%)] blur-[100px]" />
        
        {/* Geometric Mesh */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(20,60,50,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(20,60,50,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-none mx-auto px-4 lg:px-12 xl:px-24">
        
        {/* ─── SECTION HEADER ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display text-[#143C32] mb-6 tracking-tight leading-[1.1]">
            Framework Intelligence <span className="text-[#B8893F]">Ecosystem</span>
          </h2>
          <p className="text-lg text-stone font-medium max-w-2xl mx-auto">
            KSynapse unifies every major ESG framework into one intelligent platform. 
            No more manual cross-referencing or siloed spreadsheets.
          </p>
        </motion.div>

        {/* ─── INTELLIGENCE ECOSYSTEM LAYOUT ─── */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 min-h-[600px] mb-20">
          
          {/* SVG Connection Lines (Desktop only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="line-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(20,60,50,0.1)" />
                  <stop offset="100%" stopColor="rgba(80,180,140,0.6)" />
                </linearGradient>
                <linearGradient id="line-grad-right" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(20,60,50,0.1)" />
                  <stop offset="100%" stopColor="rgba(80,180,140,0.6)" />
                </linearGradient>
                
                {/* Glowing particle effect filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Left Connections */}
              {[15, 38, 62, 85].map((y, i) => (
                <g key={`left-line-${i}`}>
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1.5, ease: "easeInOut" }}
                    d={`M 250,${y}% C 400,${y}% 450,50% 50%,50%`} 
                    fill="none" 
                    stroke="url(#line-grad-left)" 
                    strokeWidth="1.5" 
                    strokeDasharray={hoveredId === leftFws[i].id ? "none" : "4,4"}
                    className="transition-all duration-300"
                    style={{ opacity: hoveredId === leftFws[i].id ? 1 : 0.4 }}
                  />
                  {/* Flowing Particle */}
                  {hoveredId === leftFws[i].id && (
                    <motion.circle 
                      r="3" 
                      fill="#50B48C" 
                      filter="url(#glow)"
                      animate={{
                        offsetDistance: ["0%", "100%"],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      style={{ offsetPath: `path('M 250,${y}% C 400,${y}% 450,50% 50%,50%')` }}
                    />
                  )}
                </g>
              ))}

              {/* Right Connections */}
              {[10, 30, 50, 70, 90].map((y, i) => (
                <g key={`right-line-${i}`}>
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.7 + i * 0.1, duration: 1.5, ease: "easeInOut" }}
                    d={`M 100%,${y}% C 600,${y}% 550,50% 50%,50%`} 
                    fill="none" 
                    stroke="url(#line-grad-right)" 
                    strokeWidth="1.5" 
                    strokeDasharray={hoveredId === rightFws[i].id ? "none" : "4,4"}
                    className="transition-all duration-300"
                    style={{ opacity: hoveredId === rightFws[i].id ? 1 : 0.4, transformOrigin: "100% 50%" }}
                  />
                  {hoveredId === rightFws[i].id && (
                    <motion.circle 
                      r="3" 
                      fill="#50B48C" 
                      filter="url(#glow)"
                      animate={{
                        offsetDistance: ["0%", "100%"],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      style={{ offsetPath: `path('M 100%,${y}% C 600,${y}% 550,50% 50%,50%')` }}
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* ── LEFT COLUMN ── */}
          <div className="w-full lg:w-[460px] flex flex-col gap-6 z-10">
            {leftFws.map((fw, i) => (
              <FrameworkCapsule 
                key={fw.id} 
                fw={fw} 
                delay={0.2 + i * 0.1}
                isInView={isInView}
                isHovered={hoveredId === fw.id}
                onHover={() => setHoveredId(fw.id)}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </div>

          {/* ── CENTER AI HUB ── */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-64 h-64 lg:w-96 lg:h-96 flex-shrink-0 flex items-center justify-center my-10 lg:my-0"
          >
            {/* Glowing rings */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute inset-0 rounded-full border border-[#50B48C]/40 bg-[#50B48C]/5 blur-sm transition-all duration-500 ${hoveredId ? 'scale-110 opacity-80' : ''}`}
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -inset-4 rounded-full border border-[#50B48C]/20 bg-[#50B48C]/5"
            />
            
            {/* Core frosted glass hub */}
            <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_12px_32px_rgba(20,60,50,0.1)] flex flex-col items-center justify-center">
              <img src="/assets/logo.png" alt="KSynapse" className="w-16 h-16 lg:w-24 lg:h-24 object-contain mix-blend-multiply opacity-90" />
              <span className="mt-3 font-display text-lg lg:text-xl font-semibold text-[#143C32] tracking-tight text-center">
                Unified ESG<br/>Intelligence
              </span>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <div className="w-full lg:w-[460px] flex flex-col gap-6 z-10">
            {rightFws.map((fw, i) => (
              <FrameworkCapsule 
                key={fw.id} 
                fw={fw} 
                delay={0.4 + i * 0.1}
                isInView={isInView}
                isHovered={hoveredId === fw.id}
                onHover={() => setHoveredId(fw.id)}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HELPER COMPONENTS ──────────────────────────────────────────────────

function FrameworkCapsule({ fw, delay, isInView, isHovered, onHover, onLeave }: any) {
  const Icon = fw.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: fw.side === "left" ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative p-6 rounded-2xl bg-white/60 backdrop-blur-md border transition-all duration-300 cursor-default flex items-center gap-5
        ${isHovered 
          ? 'border-[#50B48C]/50 shadow-[0_12px_24px_rgba(80,180,140,0.15)] -translate-y-1' 
          : 'border-[#D9D2C3]/60 shadow-[0_4px_12px_rgba(20,60,50,0.03)] hover:shadow-[0_8px_16px_rgba(20,60,50,0.06)]'
        }`}
    >
      {/* Icon block */}
      <div 
        className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
        style={{ backgroundColor: `${fw.cat.color}15` }}
      >
        <Icon className="w-7 h-7" style={{ color: fw.cat.color }} />
      </div>
      
      {/* Basic Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <span className="font-display font-semibold text-xl text-[#143C32]">{fw.abbr}</span>
          <span 
            className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: `${fw.cat.color}10`, color: fw.cat.color }}
          >
            {fw.cat.label}
          </span>
        </div>
        <p className="text-base text-stone font-medium truncate">{fw.name}</p>
      </div>

      {/* Premium Tooltip (Revealed on Hover) */}
      <div 
        className={`absolute ${fw.tooltipOffset || 'top-0'} w-[320px] p-6 bg-[#143C32] rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 pointer-events-none z-50
          ${fw.side === "left" ? 'left-full ml-5 text-left' : 'right-full mr-5 text-right'}
          ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}
        `}
      >
        <span className="block text-xs font-mono text-[#B8893F] uppercase tracking-wider mb-3">Framework Intelligence</span>
        <div className="space-y-4">
          <div>
            <span className="block text-xs text-white/50 mb-1">Coverage</span>
            <span className="block text-base font-semibold text-white">{fw.purpose}</span>
          </div>
          <div>
            <span className="block text-xs text-white/50 mb-1">Region / Authority</span>
            <span className="block text-base font-semibold text-white">{fw.region}</span>
          </div>
        </div>
        <div className={`mt-5 pt-5 border-t border-white/10 flex items-center gap-2 ${fw.side === "right" ? 'justify-end' : ''}`}>
          <div className="w-2.5 h-2.5 rounded-full bg-[#50B48C] animate-pulse" />
          <span className="text-xs font-mono text-[#50B48C] uppercase tracking-widest">Fully Integrated</span>
        </div>
      </div>
    </motion.div>
  );
}
