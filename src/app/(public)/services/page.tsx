"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  BookOpen,
  Check,
  ChevronDown,
  Cloud,
  Database,
  FileCheck2,
  FileText,
  Gauge,
  Leaf,
  LineChart,
  LockKeyhole,
  Network,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Waves,
  Wind,
  Zap,
} from "lucide-react";

/**
 * KSynapse Services — premium institutional redesign
 *
 * Designed around the supplied screenshot + the approved Services specification.
 * No new product claims or unsupported statistics are introduced.
 *
 * Expected stack: Next.js App Router + Tailwind + framer-motion + lucide-react.
 */

const capabilities = {
  platform: [
    {
      id: "performance",
      number: "01",
      label: "MEASURE",
      title: "ESG Performance Management",
      description:
        "Unify your ESG dashboard with overall, environmental, social and governance scores, KPI tracking and goals.",
      icon: Gauge,
      accent: "#B28A4A",
      signal: "Performance layer",
      items: [
        "ESG Dashboard",
        "Overall ESG Score",
        "Environmental Score",
        "Social Score",
        "Governance Score",
        "KPI Tracking",
        "Goal Tracking",
      ],
    },
    {
      id: "environment",
      number: "02",
      label: "MONITOR",
      title: "Environmental Intelligence",
      description:
        "Track carbon, energy, water, waste and net-zero progress through a connected environmental intelligence layer.",
      icon: Leaf,
      accent: "#6D8B78",
      signal: "Environmental layer",
      items: [
        "Carbon Footprint Tracking",
        "Scope 1, 2 & 3 Monitoring",
        "Energy Monitoring",
        "Water Consumption Tracking",
        "Waste Tracking",
        "Net Zero Progress",
      ],
    },
    {
      id: "compliance",
      number: "03",
      label: "REPORT",
      title: "Compliance & Reporting",
      description:
        "Move from scattered reporting work to a structured compliance layer with framework-aligned reporting workflows.",
      icon: FileCheck2,
      accent: "#A9793B",
      signal: "Compliance layer",
      items: [
        "Compliance Tracker",
        "BRSR Reporting",
        "GRI Reporting",
        "ISSB Reporting",
        "SASB Reporting",
        "Automated Report Generation",
      ],
    },
    {
      id: "analytics",
      number: "04",
      label: "ANALYZE",
      title: "Analytics & Insights",
      description:
        "Turn ESG history and performance data into trends, benchmarks and executive-level insight.",
      icon: LineChart,
      accent: "#7A6C54",
      signal: "Intelligence layer",
      items: [
        "Benchmarking",
        "ESG Trends",
        "Historical Analysis",
        "Executive Dashboard",
        "AI Insights (Coming Soon)",
      ],
    },
    {
      id: "enterprise",
      number: "05",
      label: "OPERATE",
      title: "Enterprise Tools",
      description:
        "Keep the operational layer secure and organized with documents, alerts, multi-user access and custom dashboards.",
      icon: Database,
      accent: "#49675A",
      signal: "Enterprise layer",
      items: [
        "Document Repository",
        "Alerts & Notifications",
        "Multi-user Access",
        "Secure Cloud Platform",
        "Custom Dashboards",
      ],
    },
  ],
  advisory: [
    {
      id: "strategy",
      number: "01",
      label: "DIRECTION",
      title: "ESG Strategy & Roadmaps",
      description:
        "Build a practical ESG direction around strategy, sustainability, net-zero ambition, transformation and KPIs.",
      icon: Target,
      accent: "#B28A4A",
      signal: "Strategy layer",
      items: [
        "ESG Strategy Development",
        "Sustainability Roadmap",
        "Net-Zero Roadmap",
        "ESG Transformation Roadmap",
        "ESG KPI Framework",
      ],
    },
    {
      id: "reporting",
      number: "02",
      label: "DISCLOSE",
      title: "ESG Reporting",
      description:
        "Prepare structured sustainability reporting across the reporting frameworks relevant to your organization.",
      icon: FileText,
      accent: "#6D8B78",
      signal: "Reporting layer",
      items: [
        "BRSR Report Preparation",
        "GRI Sustainability Report",
        "ISSB-Aligned Report",
        "SASB Report",
        "ESG Annual Report",
        "Carbon Footprint Report",
      ],
    },
    {
      id: "assessment",
      number: "03",
      label: "ASSESS",
      title: "Assessments",
      description:
        "Understand maturity, materiality, footprint, gaps, climate risk and supplier ESG exposure through focused assessments.",
      icon: Scale,
      accent: "#A9793B",
      signal: "Assessment layer",
      items: [
        "ESG Maturity Assessment",
        "Materiality Assessment",
        "Carbon Footprint Assessment",
        "ESG Gap Analysis",
        "Climate Risk Assessment",
        "Supplier ESG Assessment",
      ],
    },
    {
      id: "review",
      number: "04",
      label: "VERIFY",
      title: "Compliance Services",
      description:
        "Strengthen compliance readiness with review, gap analysis, framework mapping, audit readiness and policy development.",
      icon: ShieldCheck,
      accent: "#7A6C54",
      signal: "Assurance layer",
      items: [
        "ESG Compliance Review",
        "Regulatory Gap Analysis",
        "Framework Mapping",
        "Audit Readiness",
        "Policy Development",
      ],
    },
    {
      id: "capacity",
      number: "05",
      label: "ENABLE",
      title: "Implementation & Capacity Building",
      description:
        "Translate strategy into operating capability through data frameworks, implementation, training and leadership engagement.",
      icon: Users,
      accent: "#49675A",
      signal: "Enablement layer",
      items: [
        "ESG Data Collection Framework",
        "Dashboard Implementation",
        "ESG Training Programs",
        "Board & Leadership Workshops",
        "Employee Awareness Programs",
      ],
    },
  ],
};

const plans = [
  {
    name: "Bronze",
    eyebrow: "STARTER",
    price: "₹25,000",
    cadence: "/month",
    description: "For MSMEs beginning their ESG journey",
    features: [
      "ESG Dashboard",
      "Basic KPI Tracking",
      "Single Framework Reporting",
      "Email Support",
      "1 User",
    ],
    cta: "Start with Bronze",
  },
  {
    name: "Silver",
    eyebrow: "MOST POPULAR",
    price: "₹50,000",
    cadence: "/month",
    description: "For growing organizations with multi-framework needs",
    features: [
      "Everything in Bronze",
      "Multi-Framework Reporting",
      "Carbon Monitoring",
      "Advisory Access",
      "Up to 5 Users",
      "Priority Support",
    ],
    cta: "Upgrade to Silver",
    featured: true,
  },
  {
    name: "Gold",
    eyebrow: "ENTERPRISE",
    price: "₹1,00,000",
    cadence: "/month",
    description: "For enterprises requiring comprehensive ESG intelligence",
    features: [
      "Everything in Silver",
      "AI-Powered Insights",
      "Custom Dashboards",
      "Dedicated Advisor",
      "Unlimited Users",
      "SLA Support",
      "Audit-Ready Reports",
    ],
    cta: "Go Gold",
  },
];


function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[14px] font-semibold uppercase tracking-[0.22em] text-[#8C6A38]">
      <span className="h-px w-8 bg-[#B28A4A]" />
      {children}
    </div>
  );
}

function IntelligenceMap() {
  const [active, setActive] = useState(2);
  const nodes = [
    ["01", "Measure", "Establish the ESG baseline"],
    ["02", "Monitor", "Follow the signals that matter"],
    ["03", "Analyze", "Turn history into insight"],
    ["04", "Report", "Structure disclosure with confidence"],
    ["05", "Improve", "Move from insight to action"],
  ];

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#294A3E] bg-[#0E332A] shadow-[0_30px_90px_rgba(16,59,48,.16)] ks-dark-green-card">
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full border border-[#C8A66B]/10" />
      <div className="absolute -right-28 -bottom-28 h-96 w-96 rounded-full border border-[#C8A66B]/10" />

      <div className="relative grid lg:grid-cols-[.72fr_1.28fr]">
        <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r lg:p-10 ks-dark-green-type">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[19px] uppercase tracking-[.22em] text-[#CBB68E]">KSYNAPSE METHOD / 01</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#CBB68E]/20 px-2.5 py-1 font-mono text-[14px] uppercase tracking-[.18em] text-[#CBB68E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CBB68E]" />
              Live system
            </span>
          </div>
          <h3 className="mt-10 max-w-md font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[.98] text-[#F7F4EA]">
            <span className="text-[#D8B56A]">One intelligence loop.</span>
            <span className="block text-[#F0D49A]">Five decisions.</span>
          </h3>
          <p className="mt-6 max-w-md text-lg leading-7 !text-[#FFFFFF]">
            Measure → Monitor → Analyze → Report → Improve. The platform turns disconnected ESG activity into one continuous management rhythm.
          </p>
          <div className="mt-10 grid grid-cols-3 border-t border-white/10 pt-6">
            <div>
              <div className="font-serif text-2xl text-[#F7F4EA]">3</div>
              <div className="mt-1 font-mono text-[14px] uppercase tracking-[.16em] text-[#8EA49A]">ESG pillars</div>
            </div>
            <div>
              <div className="font-serif text-2xl text-[#F7F4EA]">5</div>
              <div className="mt-1 font-mono text-[14px] uppercase tracking-[.16em] text-[#8EA49A]">capability domains</div>
            </div>
            <div>
              <div className="font-serif text-2xl text-[#F7F4EA]">1</div>
              <div className="mt-1 font-mono text-[14px] uppercase tracking-[.16em] text-[#8EA49A]">connected system</div>
            </div>
          </div>
        </div>

        <div className="relative p-7 lg:p-10">
          <div className="absolute left-[12%] right-[8%] top-[31%] hidden h-px bg-gradient-to-r from-transparent via-[#C8A66B]/40 to-transparent lg:block" />
          <div className="grid gap-3 lg:grid-cols-5">
            {nodes.map(([num, title, copy], i) => (
              <button
                key={num}
                onClick={() => setActive(i)}
                className={`group relative text-left transition-all duration-500 ${i === active ? "lg:-translate-y-3" : "lg:translate-y-0"}`}
              >
                <div className={`relative flex min-h-[210px] flex-col justify-between rounded-[20px] border p-5 transition-all duration-500 ${i === active ? "border-[#C8A66B]/50 bg-[#D7EADF] shadow-[0_18px_50px_rgba(0,0,0,.18)]" : "border-white/10 bg-white/[.025] hover:border-white/20"}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[19px] text-[#C8A66B]">{num}</span>
                    <span className={`h-2 w-2 rounded-full transition-all ${i === active ? "bg-[#C8A66B] shadow-[0_0_0_5px_rgba(200,166,107,.08)]" : "bg-[#61766E]"}`} />
                  </div>
                  <div>
                    <div className={`font-serif text-[22px] ${i === active ? "text-[#18251F]" : "text-[#F7F4EA]"}`}>{title}</div>
                    <div className={`mt-3 text-[19px] leading-5 ${i === active ? "text-[#34443C]" : "text-[#D4DED7]"}`}>{copy}</div>
                  </div>
                  <div className={`font-mono text-[14px] uppercase tracking-[.16em] ${i === active ? "text-[#5E6B64]" : "text-[#AFC4B8]"}`}>signal {num}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#C8A66B]/15 bg-[#C8A66B]/[.045] px-5 py-4 ks-dark-green-type">
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-[#D2B277]" />
              <div>
                <div className="font-mono text-[14px] uppercase tracking-[.18em] text-[#C8B88E]">Current signal</div>
                <div className="mt-1 text-lg !text-[#DCE9DF]">{nodes[active][1]} — {nodes[active][2]}</div>
              </div>
            </div>
            <div className="hidden font-mono text-[14px] uppercase tracking-[.16em] text-[#7F988C] sm:block">proprietary workflow</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilitySystem({ mode }: { mode: "platform" | "advisory" }) {
  const data = capabilities[mode];
  const [activeId, setActiveId] = useState(data[0].id);
  const active = data.find((item) => item.id === activeId) ?? data[0];
  const ActiveIcon = active.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-[.62fr_1.38fr]">
      <div className="relative overflow-hidden rounded-[26px] border border-[#C9DED2] bg-[#E7F2EB] p-6 lg:p-7">
        <div className="absolute right-[-60px] top-[-70px] h-52 w-52 rounded-full border border-[#16332A]/[.05]" />
        <div className="relative">
          <div className="mb-7 flex items-center justify-between">
            <span className="font-mono text-[19px] uppercase tracking-[.2em] text-[#8C6A38]">Capability index</span>
            <span className="font-mono text-[19px] text-[#7D827C]">05 / 05</span>
          </div>
          <div className="space-y-1">
            {data.map((item) => {
              const Icon = item.icon;
              const selected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                  onClick={() => setActiveId(item.id)}
                  className={`group relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${selected ? "border-[#C5B79D] bg-[#EAF4EE] shadow-[0_10px_35px_rgba(22,51,42,.07)]" : "border-transparent hover:border-[#DDD6CA] hover:bg-[#EAF4EE]"}`}
                >
                  <span className="font-mono text-[19px] text-[#8D8D86]">{item.number}</span>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${selected ? "border-[#C7A86C]/30 bg-[#C7A86C]/10" : "border-[#DED9CF] bg-[#DCEBE4]"}`}>
                    <Icon className="h-4 w-4" style={{ color: selected ? item.accent : "#617068" }} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-serif text-[22px] leading-tight ${selected ? "text-[#18251F]" : "text-[#34443C]"}`}>{item.title}</span>
                    <span className="mt-1 block font-mono text-[14px] uppercase tracking-[.16em] text-[#8A8F89]">{item.label}</span>
                  </span>
                  <ArrowRight className={`h-4 w-4 transition-all ${selected ? "translate-x-0 opacity-100 text-[#A9793B]" : "-translate-x-1 opacity-0"}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-[26px] bg-[#103B30] p-7 text-white lg:p-10 [color-scheme:dark] ks-dark-green-card" style={{ color: "#F7F3E8" }}
        >
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/[.06]" />
          <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/10 to-transparent" />
          <div className="relative ks-dark-green-type">
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="flex items-center gap-3 font-mono text-[19px] uppercase tracking-[.2em] text-[#CDB889]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CDB889]" />
                  {active.signal}
                </div>
                <h3 className="mt-5 max-w-2xl font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02] !text-[#F7F4EA]">{active.title}</h3>
                <p className="mt-5 max-w-2xl text-lg leading-7 text-[#D4DED7]">{active.description}</p>
              </div>
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#CDB889]/20 bg-[#CDB889]/[.06] sm:flex">
                <ActiveIcon className="h-6 w-6 text-[#D1B77F]" />
              </div>
            </div>

            <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {active.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.035 }}
                  className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[.035] px-4 py-3 text-[19px] text-[#DCE9DF]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#CDB889]/20 text-[#D1B77F]">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <span className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[14px] uppercase tracking-[.16em] text-[#AFC4B8]">Connected to ESG intelligence</span>
              <span className="rounded-full border border-[#CDB889]/20 px-3 py-1.5 font-mono text-[14px] uppercase tracking-[.16em] text-[#D1B77F]">{active.label}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HeroSystem() {
  return (
    <div className="relative mx-auto mt-16 max-w-7xl overflow-hidden rounded-[30px] border border-[#284D40] bg-[#0D332A] shadow-[0_35px_100px_rgba(16,59,48,.18)] ks-dark-green-card" style={{ color: "#F7F3E8" }}>
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:54px_54px]" />
      <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 1200 420" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="heroLine" x1="0" x2="1">
            <stop offset="0" stopColor="#CBB178" stopOpacity="0" />
            <stop offset=".25" stopColor="#CBB178" stopOpacity=".5" />
            <stop offset=".7" stopColor="#CBB178" stopOpacity=".15" />
            <stop offset="1" stopColor="#CBB178" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-30 285 C140 170 220 330 390 220 S690 80 840 185 S1050 290 1230 120" fill="none" stroke="url(#heroLine)" strokeWidth="1.2" />
        <path d="M-30 315 C160 220 260 365 430 260 S720 125 900 220 S1080 300 1230 175" fill="none" stroke="#88A294" strokeOpacity=".22" strokeWidth="1" />
        <path d="M120 70 C300 190 430 70 590 155 S860 270 1110 100" fill="none" stroke="#D0B77E" strokeOpacity=".16" strokeWidth="1" />
        {[180, 380, 590, 810, 1010].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={i % 2 ? 220 : 180} r="3" fill="#D4B978" fillOpacity=".9" />
            <circle cx={x} cy={i % 2 ? 220 : 180} r="10" fill="none" stroke="#D4B978" strokeOpacity=".13" />
          </g>
        ))}
      </svg>

      <div className="relative grid min-h-[420px] lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col justify-between p-8 lg:p-12 ks-dark-green-type">
          <div className="flex items-center gap-3 font-mono text-[19px] uppercase tracking-[.22em] text-[#CDB889]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#CDB889]" />
            ESG intelligence / 01
          </div>
          <div className="py-10 lg:py-0">
            <h2 className="max-w-xl font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-[-.025em] text-[#F7F4EA]">
              <span className="text-[#D8B56A]">One platform.</span>
              <span className="block text-[#F0D49A]">Every ESG signal.</span>
            </h2>
            <p className="mt-7 max-w-xl text-[19px] leading-7 !text-[#FFFFFF]">
              Everything your organization needs to measure, monitor, report, and improve ESG performance through one intelligent dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["ENVIRONMENTAL", "SOCIAL", "GOVERNANCE", "COMPLIANCE READY"].map((x) => (
              <span key={x} className="rounded-full border border-white/10 bg-white/[.025] px-3 py-2 font-mono text-[14px] uppercase tracking-[.16em] text-[#AFC0B7]">{x}</span>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center p-7 lg:p-12">
          <div className="relative w-full max-w-[570px] rounded-[24px] border border-white/10 bg-[#DCEBE4] p-5 backdrop-blur-[2px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="font-mono text-[14px] uppercase tracking-[.18em] text-[#5E6B64]">Intelligence console</div>
              <div className="flex items-center gap-2 font-mono text-[14px] uppercase tracking-[.15em] text-[#CDB889]"><span className="h-1.5 w-1.5 rounded-full bg-[#CDB889]" /> monitored</div>
            </div>
            <div className="grid grid-cols-3 gap-3 py-5">
              {[
                ["E", "Environmental", "Active"],
                ["S", "Social", "Tracked"],
                ["G", "Governance", "Ready"],
              ].map(([letter, title, status], i) => (
                <div key={letter} className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#CDB889]/20 bg-[#CDB889]/[.05] font-serif text-lg text-[#D1B77F]">{letter}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#789888]" />
                  </div>
                  <div className="mt-8 text-[14px] !text-[#18251F]">{title}</div>
                  <div className="mt-1 font-mono text-[19px] uppercase tracking-[.16em] text-[#5E6B64]">{status}</div>
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} animate={{ width: `${58 + i * 14}%` }} transition={{ duration: 1.2, delay: .3 + i * .15 }} className="h-full bg-[#CDB889]" /></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-t border-white/10 pt-4">
              <div>
                <div className="font-mono text-[19px] uppercase tracking-[.18em] text-[#7F968C]">Connected intelligence</div>
                <div className="mt-1 text-[14px] text-[#34443C]">Measure → Monitor → Analyze → Report → Improve</div>
              </div>
              <Sparkles className="h-5 w-5 text-[#D1B77F]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [mode, setMode] = useState<"platform" | "advisory">("platform");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const theme = useMemo(
    () =>
      mode === "platform"
        ? {
          kicker: "ESG INTELLIGENCE PLATFORM",
          title: "AI-Powered ESG Intelligence Platform",
          body: "Everything your organization needs to measure, monitor, report, and improve ESG performance through one intelligent dashboard.",
        }
        : {
          kicker: "ESG ADVISORY",
          title: "Expert ESG Advisory & Sustainability Consulting",
          body: "Strategic ESG consulting to help organizations comply with regulations, build sustainability strategies, and accelerate long-term value creation.",
        },
    [mode]
  );

  const reduce = useReducedMotion();

  return (


    <main className="min-h-screen overflow-x-hidden bg-[#F7F4ED] text-[#18251F] selection:bg-[#C7A86C]/25">

      <style jsx global>{`
        /* KSynapse premium dark-green typography guard: never allow black text on dark-green surfaces. */
        .ks-dark-green-card { color: #F7F4EA !important; }
        .ks-dark-green-card > .ks-dark-green-type,
        .ks-dark-green-card > .ks-dark-green-type * { color: #F7F4EA !important; }
        .ks-dark-green-section { color: #F7F4EA !important; }
        .ks-dark-green-section > .ks-dark-green-type,
        .ks-dark-green-section > .ks-dark-green-type * { color: #F7F4EA !important; }
        .ks-dark-green-section .ks-dark-green-type { color: #F7F4EA !important; }
        .ks-dark-green-card .ks-featured-body { color: #E5F0EA !important; }
        .ks-dark-green-card .ks-featured-body p, .ks-dark-green-card .ks-featured-body li { color: #E5F0EA !important; }
        .ks-dark-green-card .ks-featured-body button { color: #FFFDF5 !important; }
      `}</style>



      {/* Hero */}
      <section id="top" className="relative px-5 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.5]" 
            style={{ backgroundImage: "url('/images/esgassessment.png')" }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F7F4ED] opacity-80" />
        </div>
        
        <div className="absolute inset-x-0 top-0 z-0 h-[600px] overflow-hidden pointer-events-none">
          <div className="absolute left-[5%] top-[8%] h-[460px] w-full max-w-[460px] rounded-full border border-[#16332A]/[.035]" />
          <div className="absolute right-[-10%] top-[4%] h-[520px] w-full max-w-[520px] rounded-full border border-[#B28A4A]/[.08]" />
          <div className="absolute inset-0 opacity-[.035] [background-image:linear-gradient(#16332A_1px,transparent_1px),linear-gradient(90deg,#16332A_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <FadeIn>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#CFC8BA] bg-[#EAF4EE] px-4 py-2 font-mono text-[14px] uppercase tracking-[.22em] text-[#806338]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B28A4A]" />
              Services / ESG intelligence
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mx-auto mt-8 max-w-4xl font-serif text-[clamp(3rem,6vw,6.3rem)] leading-[.94] tracking-[-.035em] text-[#18251F]">
              Intelligence for the
              <span className="block text-[#6D8376]">decisions ESG demands.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-7 max-w-2xl text-[19px] leading-7 text-[#5C6862]">
              Measure performance, understand environmental signals, navigate compliance, and turn ESG data into decisions — through one connected system.
            </p>
          </FadeIn>
        </div>

        <HeroSystem />
        {/* HERO CTA INTENTIONALLY OMITTED — visual/information hero only. */}
      </section>

      {/* Intelligence Map */}
      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="grid items-end gap-8 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <SectionKicker>Signature methodology</SectionKicker>
                <h2 className="max-w-xl font-serif text-[clamp(2.4rem,4.5vw,4.6rem)] leading-[.98] tracking-[-.025em] text-[#18251F]">
                  ESG is not a report.
                  <span className="block text-[#7A8E83]">It is a management loop.</span>
                </h2>
              </div>
              <p className="max-w-xl justify-self-end text-lg leading-7 text-[#66716B]">
                KSynapse brings measurement, monitoring, analysis, reporting and improvement into one continuous operating rhythm — so every ESG activity contributes to the next decision.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-10">
            <IntelligenceMap />
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-[#DED7CA] bg-[#F2EFE7] px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <SectionKicker>What we offer</SectionKicker>
                <h2 className="max-w-3xl font-serif text-[clamp(2.5rem,4.5vw,4.8rem)] leading-[.98] tracking-[-.025em] text-[#18251F]">
                  One ecosystem.
                  <span className="block text-[#7A8E83]">Two ways to move forward.</span>
                </h2>
              </div>
              <div className="w-full max-w-[370px] rounded-full border border-[#CEC6B8] bg-[#EAF4EE] p-1.5 shadow-sm">
                <div className="relative grid grid-cols-2">
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-y-0 w-1/2 rounded-full bg-[#103B30] shadow-sm"
                    style={{ left: mode === "platform" ? 0 : "50%" }}
                  />
                  <button onClick={() => setMode("platform")} className={`relative z-10 rounded-full px-4 py-3 text-[19px] font-semibold transition-colors ${mode === "platform" ? "text-[#F7F4EA]" : "text-[#59655F]"}`}>ESG Intelligence Platform</button>
                  <button onClick={() => setMode("advisory")} className={`relative z-10 rounded-full px-4 py-3 text-[19px] font-semibold transition-colors ${mode === "advisory" ? "text-[#F7F4EA]" : "text-[#59655F]"}`}>ESG Advisory</button>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="mt-8">
            <div className="grid items-start gap-8 border-b border-[#D5CEC0] pb-10 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="font-mono text-[19px] uppercase tracking-[.22em] text-[#8A6A3D]">{theme.kicker}</div>
                <h3 className="mt-3 font-serif text-[clamp(2rem,3.5vw,3.2rem)] leading-tight text-[#1F5242]">{theme.title}</h3>
                <p className="mt-4 max-w-2xl text-lg leading-7 text-[#68726D]">{theme.body}</p>
              </div>
              <div className="hidden items-center gap-3 font-mono text-[14px] uppercase tracking-[.18em] text-[#7E857F] lg:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B28A4A]" />
                {mode === "platform" ? "Product system / 05 domains" : "Human expertise / 05 service groups"}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="mt-8">
            <CapabilitySystem mode={mode} />
          </FadeIn>
        </div>
      </section>

      {/* Evidence / data */}
      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
              <div>
                <SectionKicker>Evidence layer</SectionKicker>
                <h2 className="max-w-xl font-serif text-[clamp(2.5rem,4vw,4.3rem)] leading-[.98] text-[#18251F]">
                  Information should feel like evidence,
                  <span className="block text-[#7A8E83]">not decoration.</span>
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-7 text-[#66716B]">
                  The platform is structured around the dimensions already defined for KSynapse: ESG performance, environmental intelligence, compliance, analytics and enterprise operations.
                </p>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-[#C9DED2] bg-[#EAF4EE]">
                <div className="grid grid-cols-2 border-b border-[#C9DED2] sm:grid-cols-4">
                  {[
                    ["03", "ESG pillars"],
                    ["05", "platform domains"],
                    ["04", "named reporting frameworks"],
                    ["02", "service lines"],
                  ].map(([value, label]) => (
                    <div key={label} className="border-r border-[#C9DED2] p-5 last:border-r-0 sm:p-6">
                      <div className="font-serif text-3xl text-[#18251F]">{value}</div>
                      <div className="mt-2 font-mono text-[14px] uppercase leading-4 tracking-[.13em] text-[#80867F]">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[19px] uppercase tracking-[.18em] text-[#8A6A3D]">Framework coverage</span>
                    <span className="font-mono text-[14px] uppercase tracking-[.16em] text-[#8B918B]">Named in platform scope</span>
                  </div>
                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {["BRSR", "GRI", "ISSB", "SASB"].map((framework, i) => (
                      <div key={framework} className="group flex items-center gap-4 rounded-2xl border border-[#CFE1D6] bg-[#EAF4EE] px-4 py-4 transition-colors hover:border-[#CBB788]">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DCEBE4] font-mono text-[14px] text-[#355248]">0{i + 1}</span>
                        <div className="flex-1">
                          <div className="font-serif text-[19px] text-[#18251F]">{framework}</div>
                          <div className="mt-1 font-mono text-[19px] uppercase tracking-[.16em] text-[#8B918B]">Reporting layer</div>
                        </div>
                        <div className="h-1 w-12 overflow-hidden rounded-full bg-[#E4E0D7]"><div className="h-full rounded-full bg-[#B28A4A]" style={{ width: `${58 + i * 10}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Environmental intelligence */}
      <section id="intelligence" className="bg-[#103B30] px-5 py-20 text-white lg:px-8 lg:py-28 ks-dark-green-section" style={{ color: "#F7F3E8" }}>
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-[.78fr_1.22fr]">
              <div className="ks-dark-green-type">
                <div className="mb-5 flex items-center gap-3 text-[14px] font-semibold uppercase tracking-[0.22em] !text-[#E3D2A9]"><span className="h-px w-8 bg-[#CDB889]" />Environmental intelligence</div>
                <h2 className="max-w-xl font-serif text-[clamp(2.5rem,4.5vw,4.7rem)] leading-[.98] tracking-[-.025em] text-[#F7F4EA]">
                  <span className="text-[#D8B56A]">From carbon to net zero,</span>
                  <span className="block text-[#F0D49A]">follow the signal.</span>
                </h2>

                <div className="mt-8 flex flex-wrap gap-2">
                  {["Carbon", "Energy", "Water", "Waste", "Net Zero"].map((x) => <span key={x} className="rounded-full border border-white/10 px-3 py-2 font-mono text-[14px] uppercase tracking-[.16em] text-[#B6C8BE]">{x}</span>)}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#DDEDE4] p-7 lg:p-10">
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:48px_48px]" />
                <div className="relative">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <span className="font-mono text-[14px] uppercase tracking-[.2em] text-[#5E6B64]">Environmental pathway</span>
                    <Wind className="h-4 w-4 text-[#CDB889]" />
                  </div>
                  <div className="relative mt-10">
                    <div className="absolute left-6 right-6 top-6 h-px bg-gradient-to-r from-[#CDB889]/10 via-[#CDB889]/50 to-[#CDB889]/10" />
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        ["01", "Carbon", Leaf],
                        ["02", "Energy", Zap],
                        ["03", "Water", Waves],
                        ["04", "Waste", Database],
                        ["05", "Net Zero", Target],
                      ].map(([num, label, Icon], i) => {
                        const I = Icon as typeof Leaf;
                        return (
                          <motion.div key={label as string} initial={reduce ? false : { opacity: 0, y: 10 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CDB889]/25 bg-[#D5E8DD] shadow-[0_0_0_8px_rgba(203,184,137,.025)]">
                              <I className="h-4 w-4 text-[#D1B77F]" />
                            </div>
                            <div className="mt-4 font-serif text-lg !text-[#18251F]">{label as string}</div>
                            <div className="mt-1 font-mono text-[19px] text-[#5E6B64]">{num as string}</div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-12 grid gap-3 sm:grid-cols-3">
                    {["Scope 1", "Scope 2", "Scope 3"].map((scope, i) => (
                      <div key={scope} className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                        <div className="font-mono text-[14px] uppercase tracking-[.15em] text-[#34443C]">{scope}</div>
                        <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} whileInView={{ width: `${50 + i * 15}%` }} viewport={{ once: true }} transition={{ duration: .9, delay: .25 + i * .1 }} className="h-full bg-[#CDB889]" /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Compliance */}
      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="rounded-[30px] border border-[#C9DED2] bg-[#EAF4EE] p-7 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
                <div>
                  <SectionKicker>Compliance intelligence</SectionKicker>
                  <h2 className="font-serif text-[clamp(2.5rem,4vw,4.4rem)] leading-[.98] text-[#18251F]">
                    Reporting should read like a system,
                    <span className="block text-[#7A8E83]">not a scramble.</span>
                  </h2>
                  <p className="mt-6 max-w-lg text-lg leading-7 text-[#66716B]">
                    A structured compliance layer for tracking, reporting and automated report generation across the frameworks included in the platform scope.
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-[24px] border border-[#C9DED2] bg-[#EAF4EE] p-6 lg:p-8">
                  <div className="flex items-center justify-between border-b border-[#E3DED5] pb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCEBE4]"><FileCheck2 className="h-4 w-4 text-[#315448]" /></div>
                      <div>
                        <div className="font-serif text-2xl text-[#18251F]">Compliance register</div>
                        <div className="font-mono text-[19px] uppercase tracking-[.16em] text-[#89908A]">Institutional reporting layer</div>
                      </div>
                    </div>
                    <span className="rounded-full border border-[#D7D1C6] px-3 py-1.5 font-mono text-[19px] uppercase tracking-[.16em] text-[#6D786F]">structured</span>
                  </div>
                  <div className="mt-5 space-y-2">
                    {[
                      ["BRSR", "Business Responsibility & Sustainability Reporting", "India"],
                      ["GRI", "Global Reporting Initiative", "Global"],
                      ["ISSB", "International Sustainability Standards", "Global"],
                      ["SASB", "Sustainability Accounting Standards", "Industry"],
                    ].map(([code, title, scope], i) => (
                      <div key={code} className="group grid grid-cols-[58px_1fr_auto] items-center gap-4 rounded-xl border border-[#E8E3DB] px-4 py-4 transition-colors hover:border-[#CDB889]">
                        <span className="font-mono text-[19px] font-semibold text-[#315448]">{code}</span>
                        <div><div className="font-serif text-lg text-[#34443C]">{title}</div><div className="mt-1 font-mono text-[19px] uppercase tracking-[.14em] text-[#90958F]">{scope}</div></div>
                        <div className="flex items-center gap-2"><span className="hidden font-mono text-[19px] uppercase tracking-[.12em] text-[#90958F] sm:block">mapped</span><span className="h-2 w-2 rounded-full bg-[#76917F]" /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Analytics */}
      <section className="border-y border-[#DCD5C8] bg-[#F1EEE6] px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr]">
              <div>
                <SectionKicker>Analytics & insights</SectionKicker>
                <h2 className="font-serif text-[clamp(2.5rem,4vw,4.4rem)] leading-[.98] text-[#18251F]">See what is changing before it becomes a problem.</h2>
                <p className="mt-6 max-w-lg text-lg leading-7 text-[#66716B]">Benchmarking, ESG trends, historical analysis and executive dashboards give decision-makers a clearer view of performance over time.</p>
              </div>
              <div className="rounded-[28px] border border-[#C9DED2] bg-[#EAF4EE] p-6 lg:p-8">
                <div className="flex items-center justify-between">
                  <div><div className="font-mono text-[14px] uppercase tracking-[.18em] text-[#8A6A3D]">Illustrative intelligence view</div><div className="mt-2 font-serif text-2xl text-[#18251F]">ESG performance trend</div></div>
                  <TrendingUp className="h-5 w-5 text-[#A9793B]" />
                </div>
                <div className="relative mt-8 h-[250px] overflow-hidden rounded-2xl border border-[#CFE1D6] bg-[#EAF4EE]">
                  <div className="absolute inset-0 [background-image:linear-gradient(#EAE6DE_1px,transparent_1px),linear-gradient(90deg,#EAE6DE_1px,transparent_1px)] [background-size:52px_52px]" />
                  <div className="absolute left-6 right-6 top-7 flex justify-between font-mono text-[19px] uppercase tracking-[.12em] text-[#9A9D97]"><span>historical</span><span>current</span></div>
                  <svg className="absolute inset-x-5 bottom-5 h-[175px] w-[calc(100%-40px)]" viewBox="0 0 600 180" preserveAspectRatio="none" aria-hidden="true">
                    <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6D8B78" stopOpacity=".18" /><stop offset="1" stopColor="#6D8B78" stopOpacity="0" /></linearGradient></defs>
                    <path d="M0 142 C45 130 62 150 110 118 S178 126 220 90 S278 115 330 82 S388 92 430 52 S492 78 540 36 S570 50 600 20 L600 180 L0 180 Z" fill="url(#area)" />
                    <path d="M0 142 C45 130 62 150 110 118 S178 126 220 90 S278 115 330 82 S388 92 430 52 S492 78 540 36 S570 50 600 20" fill="none" stroke="#315C4C" strokeWidth="3" />
                    {[110, 220, 330, 430, 540].map((x, i) => <circle key={x} cx={x} cy={[118, 90, 82, 52, 36][i]} r="5" fill="#B28A4A" stroke="#FAF8F3" strokeWidth="3" />)}
                  </svg>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[["Benchmarking", "peer context"], ["ESG Trends", "direction"], ["Historical Analysis", "change"]].map(([a, b]) => <div key={a} className="rounded-xl border border-[#CFE1D6] bg-[#EAF4EE] px-3 py-3"><div className="font-mono text-[19px] uppercase tracking-[.12em] text-[#7F867F]">{a}</div><div className="mt-1 text-[14px] text-[#334A41]">{b}</div></div>)}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center">
              <SectionKicker>Transparent access</SectionKicker>
              <h2 className="font-serif text-[clamp(2.5rem,4vw,4.4rem)] leading-[.98] text-[#18251F]">Simple, transparent <span className="text-[#A9793B]">pricing.</span></h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-[#68726D]">Choose the plan that fits your ESG maturity stage.</p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * .08} className="h-full">
                <article className={`relative flex h-full flex-col overflow-hidden rounded-[24px] border p-7 transition-all duration-300 ${plan.featured ? "border-[#B28A4A]/50 bg-[#103B30] text-white shadow-[0_28px_70px_rgba(16,59,48,.16)] lg:-translate-y-3 ks-dark-green-card" : "border-[#C9DED2] bg-[#EAF4EE]"}`}>
                  {plan.featured && <div className="absolute right-5 top-5 rounded-full bg-[#B28A4A] px-3 py-1.5 font-mono text-[19px] font-semibold uppercase tracking-[.16em] !text-[#FFFDF5]">{plan.eyebrow}</div>}
                  <div className={`font-mono text-[14px] uppercase tracking-[.2em] ${plan.featured ? "text-[#CDB889]" : "text-[#8A6A3D]"}`}>{plan.featured ? "RECOMMENDED" : plan.eyebrow}</div>
                  <div className={`mt-4 font-serif text-2xl ${plan.featured ? "text-[#F7F4EA]" : "text-[#1F5242]"}`}>{plan.name}</div>
                  <div className="mt-7 flex items-end gap-1"><span className={`font-serif text-[2.5rem] leading-none ${plan.featured ? "text-[#D1B77F]" : "text-[#1F5242]"}`}>{plan.price}</span><span className={`pb-1 text-[14px] ${plan.featured ? "text-[#AFC1B7]" : "text-[#78807A]"}`}>{plan.cadence}</span></div>
                  <p className={`mt-4 min-h-[42px] text-lg leading-5 ${plan.featured ? "!text-[#DCE9DF]" : "text-[#6B746F]"} ks-featured-body`}>{plan.description}</p>
                  <div className={`my-7 h-px ${plan.featured ? "bg-white/10" : "bg-[#E0DAD0]"}`} />
                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature) => <li key={feature} className={`flex items-start gap-3 text-[19px] leading-5 ${plan.featured ? "!text-[#E5F0EA]" : "text-[#34443C]"} ks-featured-body`}><Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${plan.featured ? "text-[#D1B77F]" : "text-[#9A7742]"}`} />{feature}</li>)}
                  </ul>
                  <button className={`group mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-[19px] font-semibold transition-all ${plan.featured ? "bg-[#B28A4A] !text-[#FFFDF5] hover:bg-[#C19655]" : "border border-[#C9DED2] bg-[#EAF4EE] text-[#18251F] hover:border-[#B28A4A]"} ks-featured-body`}>{plan.cta}<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></button>
                </article>
              </FadeIn>
            ))}
          </div>
          <p className="mt-7 text-center font-mono text-[14px] uppercase tracking-[.14em] text-[#8D928D]">Pricing shown publicly • no contact-for-pricing gate</p>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-[#DCD5C8] bg-[#F1EEE6] px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <SectionKicker>Built for serious decisions</SectionKicker>
                <h2 className="max-w-2xl font-serif text-[clamp(2.5rem,4vw,4.4rem)] leading-[.98] text-[#18251F]">Trust the system before you trust the story.</h2>
                <p className="mt-6 max-w-xl text-lg leading-7 text-[#66716B]">A disciplined information architecture makes the platform easier to understand, easier to operate and easier to take seriously.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [ShieldCheck, "Structured", "Clear information hierarchy and compliance-oriented presentation."],
                  [LockKeyhole, "Secure", "Secure cloud platform and controlled multi-user access."],
                  [FileText, "Report-ready", "BRSR, GRI, ISSB and SASB reporting workflows in scope."],
                  [Network, "Connected", "Five capability domains working as one intelligence ecosystem."],
                ].map(([Icon, title, copy]) => { const I = Icon as typeof ShieldCheck; return <div key={title as string} className="rounded-2xl border border-[#C9DED2] bg-[#EAF4EE] p-5"><I className="h-5 w-5 text-[#A9793B]" /><div className="mt-5 font-serif text-2xl text-[#18251F]">{title as string}</div><p className="mt-2 text-lg leading-5 text-[#6E7771]">{copy as string}</p></div>; })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ / clarification */}
      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="text-center"><SectionKicker>Explore the system</SectionKicker><h2 className="font-serif text-[clamp(2.4rem,4vw,4rem)] text-[#18251F]">Designed to answer the next question.</h2></div>
          </FadeIn>
          <div className="mt-10 divide-y divide-[#DCD5C8] border-y border-[#DCD5C8]">
            {[
              ["What is included in the ESG Intelligence Platform?", "The platform covers ESG Performance Management, Environmental Intelligence, Compliance & Reporting, Analytics & Insights, and Enterprise Tools."],
              ["What does ESG Advisory cover?", "Advisory covers ESG Strategy & Roadmaps, ESG Reporting, Assessments, Compliance Services, and Implementation & Capacity Building."],
              ["Which reporting frameworks are named in the platform scope?", "BRSR, GRI, ISSB and SASB are explicitly included in the platform specification."],
              ["Can the service line change?", "Yes. The Services experience lets visitors switch between the ESG Intelligence Platform and ESG Advisory, with the content and final CTA changing accordingly."],
            ].map(([q, a], i) => (
              <div key={q}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                  <span className="font-serif text-2xl text-[#18251F]">{q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-[#A9793B] transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="max-w-3xl pb-6 pr-10 text-lg leading-7 text-[#69736D]">{a}</p></motion.div>}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="faq" className="px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#103B30] px-7 py-14 text-center text-white shadow-[0_35px_90px_rgba(16,59,48,.16)] lg:px-12 lg:py-20 ks-dark-green-card" style={{ color: "#F7F3E8" }}>
          <div className="mx-auto max-w-3xl ks-dark-green-type">
            <div className="font-mono text-[14px] uppercase tracking-[.24em] text-[#CDB889]">Next decision / {mode === "platform" ? "platform" : "advisory"}</div>
            <h2 className="mt-5 font-serif text-[clamp(2.8rem,5vw,5.3rem)] leading-[.95] text-[#F7F4EA]">{mode === "platform" ? "Ready to transform your ESG management?" : "Need expert guidance for your ESG journey?"}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-[#D4DED7]">{mode === "platform" ? "See the platform in action with a personalised demo tailored to your industry." : "Talk with an ESG specialist about strategy, reporting, compliance and implementation."}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button className="group inline-flex items-center gap-3 rounded-full bg-[#B28A4A] px-6 py-3.5 text-[19px] font-semibold text-[#18251F] transition-all hover:-translate-y-0.5 hover:bg-[#C19655]">{mode === "platform" ? "Book a Platform Demo" : "Schedule a Consultation"}<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></button>
              <button className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[.03] px-6 py-3.5 text-[19px] font-semibold text-[#F7F4EA] transition-colors hover:bg-white/[.07]">Explore capabilities</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
