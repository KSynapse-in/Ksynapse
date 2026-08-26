"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import Button from "@/components/ui/Button";
import ESGScoreDial from "@/components/ui/ESGScoreDial";
import AssessmentQuiz from "@/components/sections/AssessmentQuiz";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  FileCheck2,
  Gauge,
  Globe2,
  Leaf,
  Lightbulb,
  Lock,
  Network,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const whyTakeCards = [
  {
    index: "01",
    icon: Target,
    title: "Measure ESG Readiness",
    description:
      "Establish a clear baseline across Environmental, Social, and Governance dimensions — without drowning your team in spreadsheets.",
    signal: "Baseline",
  },
  {
    index: "02",
    icon: BarChart3,
    title: "Benchmark Performance",
    description:
      "Understand where your organisation is ahead, where it is catching up, and where leadership attention is most valuable.",
    signal: "Benchmark",
  },
  {
    index: "03",
    icon: ScanSearch,
    title: "Identify Critical Gaps",
    description:
      "Surface material weaknesses early so compliance, reporting, and sustainability risks can be addressed before they escalate.",
    signal: "Gap scan",
  },
  {
    index: "04",
    icon: Lightbulb,
    title: "Get AI Recommendations",
    description:
      "Turn assessment findings into a prioritised action plan tailored to your organisation, industry, and current maturity.",
    signal: "Action plan",
  },
];

const assessmentSteps = [
  {
    step: "01",
    eyebrow: "DISCOVER",
    title: "Answer targeted questions",
    description:
      "Respond to structured questions across E, S, and G pillars. The assessment is designed to be completed in minutes.",
    icon: FileCheck2,
  },
  {
    step: "02",
    eyebrow: "MEASURE",
    title: "Generate your ESG score",
    description:
      "Your responses are converted into a transparent maturity score with a clear Gold, Silver, or Bronze tier.",
    icon: Gauge,
  },
  {
    step: "03",
    eyebrow: "UNDERSTAND",
    title: "See the full picture",
    description:
      "Explore pillar-level performance, strengths, improvement areas, and a practical compliance-readiness snapshot.",
    icon: Network,
  },
  {
    step: "04",
    eyebrow: "ACT",
    title: "Move from insight to action",
    description:
      "Use your findings as the starting point for a focused roadmap and a conversation with an ESG advisor.",
    icon: TrendingUp,
  },
];

const outcomeCards = [
  {
    icon: Award,
    label: "01",
    title: "Overall ESG Maturity Score",
    description:
      "A composite score out of 100 that gives leadership an immediate view of current ESG maturity.",
  },
  {
    icon: BarChart3,
    label: "02",
    title: "Pillar-wise Performance",
    description:
      "Separate Environmental, Social, and Governance scores with an easy-to-read performance breakdown.",
  },
  {
    icon: CircleDot,
    label: "03",
    title: "Maturity Level",
    description:
      "A plain-language stage — Beginner, Developing, Advanced, or Leader — so results are easy to communicate.",
  },
  {
    icon: Target,
    label: "04",
    title: "Strengths & Improvement Areas",
    description:
      "Know what is working today and where additional attention can create the greatest impact.",
  },
  {
    icon: ShieldCheck,
    label: "05",
    title: "Compliance Readiness Snapshot",
    description:
      "A high-level view of preparedness for BRSR, GRI, and other major reporting requirements.",
  },
  {
    icon: Zap,
    label: "06",
    title: "Next-Step Recommendations",
    description:
      "Practical actions that help translate the assessment into a focused ESG improvement programme.",
  },
];

const premiumFeatures = [
  "AI-Powered ESG Roadmap",
  "Industry Benchmarking",
  "Detailed Compliance Gap Analysis",
  "Multi-Framework Mapping — BRSR, GRI, ISSB, SASB",
  "Carbon Footprint Analytics",
  "Executive ESG Dashboard",
  "Priority-Based Action Plan",
];

const quickWins = [
  "Start measuring Scope 1 & 2 greenhouse gas emissions with a structured tracking system",
  "Implement a formal health & safety management framework with incident tracking",
  "Establish a board-level ESG committee with a quarterly review cadence",
  "Deploy an employee engagement survey with action-plan follow-through",
];

function SectionKicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`mb-5 inline-flex items-center gap-3 rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-xl ${dark
          ? "border-[#D7B46B]/25 bg-white/[0.055] text-[#E7D19D]"
          : "border-[#A9793B]/25 bg-white/70 text-[#6B583D]"
        }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full shadow-[0_0_0_4px_rgba(169,121,59,0.10)] ${dark ? "bg-[#D7B46B]" : "bg-[#A9793B]"
          }`}
      />
      {children}
    </div>
  );
}

function InstitutionalBackground({ dark = false }: { dark?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className={`absolute inset-0 ${dark
            ? "bg-[radial-gradient(circle_at_50%_0%,rgba(169,121,59,0.18),transparent_38%),linear-gradient(135deg,#081A14,#123127_52%,#081A14)]"
            : "bg-[radial-gradient(circle_at_50%_0%,rgba(169,121,59,0.09),transparent_35%),linear-gradient(135deg,#FBF9F4,#F6F2E9_50%,#EFE8D9)]"
          }`}
      />
      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(22,51,42,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(22,51,42,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute -left-48 top-20 h-[520px] w-[520px] rounded-full border border-[#A9793B]/10" />
      <div className="absolute -left-28 top-40 h-[390px] w-[390px] rounded-full border border-[#A9793B]/10" />
      <div className="absolute -right-48 bottom-0 h-[620px] w-[620px] rounded-full border border-[#A9793B]/10" />
      <div className="absolute right-0 top-0 h-64 w-64 bg-[radial-gradient(circle,rgba(169,121,59,0.13),transparent_70%)] blur-2xl" />
    </div>
  );
}

function HeroCommandCenter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.965 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
      className="relative mx-auto w-full max-w-[650px]"
    >
      <div className="absolute -inset-10 rounded-[54px] bg-[#A9793B]/10 blur-3xl" />

      <div className="absolute -right-3 -top-5 z-30 hidden rounded-2xl border border-[#D8D0BE]/70 bg-[#FFFEFB]/92 px-4 py-3 shadow-[0_20px_55px_-24px_rgba(22,51,42,0.35)] backdrop-blur-xl sm:block">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#E4EAE3] text-[#16332A]">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#8B8578]">Assessment protocol</p>
            <p className="mt-0.5 text-[11px] font-semibold text-[#16332A]">Structured & transparent</p>
          </div>
        </div>
      </div>

      <div className="relative rounded-[38px] border border-white/70 bg-[#0A2019] p-2 shadow-[0_45px_110px_-34px_rgba(10,32,25,0.58)]">
        <div className="relative min-h-[570px] overflow-hidden rounded-[31px] border border-white/10 bg-[#0D2A20]">
          <img
            src="/assets/hero_abstract.png"
            alt="Abstract ESG intelligence visual"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.30] mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(4,18,14,0.96),rgba(12,48,37,0.72)_48%,rgba(4,18,14,0.96))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_36%,rgba(215,180,107,0.25),transparent_27%)]" />
          <div className="absolute -right-24 top-16 h-72 w-72 rounded-full border border-[#D7B46B]/10" />
          <div className="absolute -right-10 top-30 h-56 w-56 rounded-full border border-[#D7B46B]/10" />
          <div className="absolute bottom-[-110px] left-[-70px] h-72 w-72 rounded-full border border-white/[0.05]" />

          <div className="relative z-10 flex min-h-[570px] flex-col p-6 sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#D7B46B]/25 bg-[#D7B46B]/10 text-[#E8CC96] shadow-[0_0_35px_rgba(215,180,107,0.08)]">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#D7C9A8]/65">KSynapse Intelligence</p>
                  <p className="mt-1 text-sm font-medium text-white/90">ESG maturity command centre</p>
                </div>
              </div>
              <span className="rounded-full border border-[#8BC7A3]/20 bg-[#8BC7A3]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#B9E0C6]">
                Ready
              </span>
            </div>

            <div className="mt-8 grid flex-1 gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
                <div className="absolute right-[-55px] top-[-55px] h-44 w-44 rounded-full border border-[#D7B46B]/10" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">Maturity index</span>
                    <span className="font-mono text-[9px] text-[#D7B46B]/70">ESG-100</span>
                  </div>

                  <div className="relative mx-auto mt-6 grid h-56 w-56 place-items-center rounded-full border border-white/[0.06] bg-[#071A14]/50 shadow-[inset_0_0_70px_rgba(215,180,107,0.035)]">
                    <motion.div
                      initial={{ rotate: -80 }}
                      animate={{ rotate: 280 }}
                      transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                      className="absolute inset-3 rounded-full border border-transparent border-t-[#D7B46B]/80 border-r-[#D7B46B]/20"
                    />
                    <div className="absolute inset-7 rounded-full border border-white/[0.07]" />
                    <div className="text-center">
                      <div className="font-mono text-6xl font-semibold tracking-[-0.08em] text-white">76</div>
                      <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">out of 100</div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                    <span className="text-[10px] text-white/40">Current maturity</span>
                    <span className="rounded-full border border-[#D7B46B]/20 bg-[#D7B46B]/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#E4D0A1]">Leader</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  ["E", "Environmental", "82%", Leaf],
                  ["S", "Social", "71%", Users],
                  ["G", "Governance", "76%", ShieldCheck],
                ].map(([letter, label, value, Icon], index) => {
                  const PillarIcon = Icon as typeof Leaf;
                  return (
                    <motion.div
                      key={letter as string}
                      initial={{ opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.42 + index * 0.12, duration: 0.55 }}
                      className="rounded-[22px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#D7B46B]/10 text-[#E4D0A1]">
                          <PillarIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <span className="truncate text-xs font-medium text-white/80">{label as string}</span>
                            <span className="font-mono text-[10px] text-[#D7B46B]/75">{value as string}</span>
                          </div>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: value as string }}
                              transition={{ duration: 1.15, delay: 0.6 + index * 0.12, ease: "easeOut" }}
                              className="h-full rounded-full bg-gradient-to-r from-[#9B6D35] to-[#E1C88E]"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                <div className="mt-auto rounded-[22px] border border-[#D7B46B]/15 bg-[#D7B46B]/[0.045] p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg bg-[#D7B46B]/10 text-[#D7B46B]"><Lightbulb className="h-4 w-4" /></div>
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D7B46B]/70">Intelligence layer</p>
                      <p className="mt-1 text-xs leading-5 text-white/60">Identify strengths, gaps and priority actions from one structured assessment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <span className="flex items-center gap-2 text-[9px] text-white/40"><ShieldCheck className="h-3.5 w-3.5 text-[#D7B46B]" /> Structured scoring</span>
                <span className="flex items-center gap-2 text-[9px] text-white/40"><Globe2 className="h-3.5 w-3.5 text-[#D7B46B]" /> Industry context</span>
                <span className="flex items-center gap-2 text-[9px] text-white/40"><Lock className="h-3.5 w-3.5 text-[#D7B46B]" /> Secure by design</span>
              </div>
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">Assessment preview</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        className="absolute -bottom-8 -left-3 z-30 hidden rounded-2xl border border-[#D8D0BE]/70 bg-[#FFFEFB]/94 px-5 py-4 shadow-[0_24px_60px_-28px_rgba(22,51,42,0.38)] backdrop-blur-xl sm:block"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#E4EAE3] text-[#16332A]"><Check className="h-4 w-4" /></div>
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#8B8578]">Leadership-ready</p>
            <p className="mt-0.5 text-xs font-semibold text-[#16332A]">Clear, actionable results</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PremiumCard({
  icon: Icon,
  index,
  title,
  description,
  signal,
}: (typeof whyTakeCards)[number]) {
  return (
    <motion.article
      whileHover={{ y: -9 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full min-h-[365px] flex-col overflow-hidden rounded-[30px] border border-[#D8D0BE]/65 bg-[#FFFEFB]/82 p-7 shadow-[0_20px_65px_-35px_rgba(22,51,42,0.30)] backdrop-blur-2xl"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A9793B]/45 to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#A9793B]/[0.045] blur-2xl transition-all duration-500 group-hover:bg-[#A9793B]/[0.10]" />
      <div className="absolute bottom-0 right-0 h-28 w-28 bg-[radial-gradient(circle,rgba(22,51,42,0.055),transparent_68%)]" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#16332A]/10 bg-[#16332A]/[0.045] text-[#16332A] transition-all duration-500 group-hover:border-[#A9793B]/30 group-hover:bg-[#A9793B]/10 group-hover:text-[#8A5A3B]">
          <Icon className="h-6 w-6" strokeWidth={1.45} />
        </div>
        <span className="font-mono text-[9px] tracking-[0.22em] text-[#A9793B]/65">{index}</span>
      </div>

      <div className="relative z-10 mt-10">
        <div className="mb-4 inline-flex rounded-full border border-[#16332A]/10 bg-[#16332A]/[0.035] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6C746F]">
          {signal}
        </div>
        <h3 className="text-[1.45rem] font-normal leading-[1.15] tracking-[-0.025em] text-[#16332A]">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-[#65706A]">{description}</p>
      </div>

      <div className="relative z-10 mt-auto flex items-center gap-2 pt-8 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A9793B]/70">
        <span className="h-px w-7 bg-[#A9793B]/35 transition-all duration-500 group-hover:w-12" />
        ESG intelligence
      </div>
    </motion.article>
  );
}

export default function AssessmentPage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizResults, setQuizResults] = useState<null | {
    total: number;
    environmental: number;
    social: number;
    governance: number;
    answers: Record<string, string>;
  }>(null);

  const getTier = (score: number): "gold" | "silver" | "bronze" => {
    if (score >= 76) return "gold";
    if (score >= 51) return "silver";
    return "bronze";
  };

  const getMaturityLevel = (score: number): string => {
    if (score >= 76) return "Leader";
    if (score >= 51) return "Advanced";
    if (score >= 26) return "Developing";
    return "Beginner";
  };

  const tier = quizResults ? getTier(quizResults.total) : "bronze";
  const maturity = quizResults ? getMaturityLevel(quizResults.total) : "Beginner";

  const resultsSummary = useMemo(() => {
    if (!quizResults) return null;
    const pillars = [
      { label: "Environmental", score: quizResults.environmental, max: 40 },
      { label: "Social", score: quizResults.social, max: 30 },
      { label: "Governance", score: quizResults.governance, max: 30 },
    ];
    return [...pillars].sort((a, b) => b.score / b.max - a.score / a.max);
  }, [quizResults]);

  return (
    <>
      <main className="overflow-hidden bg-[#FBF9F4]">
        {/* HERO — premium institutional command centre */}
        <section className="relative min-h-[calc(100vh-76px)] overflow-hidden border-b border-[#D8D0BE]/55 bg-[#FBF9F4]">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.5]" 
              style={{ backgroundImage: "url('/images/esgassessment.png')" }} 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FBF9F4] opacity-80" />
          </div>
          
          <InstitutionalBackground />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,249,244,0.99)_0%,rgba(251,249,244,0.94)_37%,rgba(251,249,244,0.62)_62%,rgba(251,249,244,0.10)_100%)]" />
          <div className="absolute left-1/2 top-[-280px] h-[650px] w-[650px] -translate-x-1/2 rounded-full border border-[#A9793B]/[0.055]" />

          <div className="container-xl relative z-10 flex min-h-[calc(100vh-76px)] items-center py-16 lg:py-20">
            <div className="grid w-full items-center gap-14 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
              <SectionReveal>
                <div className="max-w-[690px]">
                  <div className="mb-7 flex flex-wrap items-center gap-3">
                    <SectionKicker>Institutional ESG Intelligence</SectionKicker>
                    <span className="rounded-full border border-[#16332A]/10 bg-[#16332A]/[0.035] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#16332A]/60">Free assessment</span>
                  </div>

                  <div className="mb-6 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8B8578]">
                    <span className="h-px w-8 bg-[#A9793B]/50" />
                    A clearer starting point for ESG maturity
                  </div>

                  <h1 className="max-w-4xl text-[3.45rem] font-normal leading-[0.94] tracking-[-0.055em] text-[#10261F] sm:text-[4.5rem] lg:text-[5.55rem]">
                    Know where you stand.
                    <span className="mt-3 block bg-[linear-gradient(120deg,#16332A_5%,#557665_48%,#A9793B_100%)] bg-clip-text text-transparent">Know what comes next.</span>
                  </h1>

                  <p className="mt-8 max-w-[620px] text-[1.06rem] leading-[1.85] text-[#35413C]/80 sm:text-[1.16rem]">
                    Evaluate your organisation across Environmental, Social, and Governance dimensions — then turn the result into a focused, decision-ready ESG improvement path.
                  </p>

                  <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <Button
                      variant="primary"
                      size="xl"
                      className="group min-w-[255px] rounded-[13px] bg-[#16332A] px-8 py-4 shadow-[0_22px_55px_-20px_rgba(22,51,42,0.58)] hover:bg-[#0F241D]"
                      iconRight={<ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />}
                      onClick={() => setIsQuizOpen(true)}
                    >
                      Start Free Assessment
                    </Button>
                    <button
                      type="button"
                      onClick={() => document.getElementById("why-assessment")?.scrollIntoView({ behavior: "smooth" })}
                      className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#16332A]/70 transition-colors hover:text-[#16332A]"
                    >
                      Explore the framework
                      <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                    </button>
                  </div>

                  <div className="mt-10 grid max-w-[620px] grid-cols-3 border-y border-[#D8D0BE]/75 py-5">
                    {[
                      ["~5 min", "Completion time"],
                      ["23", "Structured questions"],
                      ["100", "Point maturity scale"],
                    ].map(([value, label], index) => (
                      <div key={label} className={`px-3 first:pl-0 ${index > 0 ? "border-l border-[#D8D0BE]/70" : ""}`}>
                        <p className="font-mono text-base font-semibold tracking-[-0.03em] text-[#16332A] sm:text-lg">{value}</p>
                        <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#8B8578] sm:text-[9px]">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] font-medium text-[#7A817D]">
                    <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-[#A9793B]" /> Transparent scoring</span>
                    <span className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-[#A9793B]" /> Secure by design</span>
                    <span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-[#A9793B]" /> Action-oriented output</span>
                  </div>
                </div>
              </SectionReveal>

              <HeroCommandCenter />
            </div>
          </div>

          <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[8px] font-semibold uppercase tracking-[0.28em] text-[#8B8578] lg:flex">
            <span className="h-px w-12 bg-[#D8D0BE]" />
            Assessment intelligence framework
            <span className="h-px w-12 bg-[#D8D0BE]" />
          </div>
        </section>

        {/* WHY — premium cards */}
        <section id="why-assessment" className="relative overflow-hidden py-24 lg:py-32">
          <InstitutionalBackground />
          <div className="container-xl relative z-10">
            <SectionReveal>
              <div className="mx-auto max-w-3xl text-center">
                <SectionKicker>Why this assessment matters</SectionKicker>
                <h2 className="text-[2.7rem] font-normal tracking-[-0.045em] text-[#16332A] sm:text-[3.8rem]">From uncertainty to a measurable ESG baseline.</h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#4B554F]/80 sm:text-lg">
                  Built for teams that need a clear starting point, an executive-friendly view of maturity, and practical direction for what should happen next.
                </p>
              </div>
            </SectionReveal>

            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {whyTakeCards.map((card, index) => (
                <SectionReveal key={card.title} delay={index * 0.08}>
                  <PremiumCard {...card} />
                </SectionReveal>
              ))}
            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative overflow-hidden border-y border-[#D8D0BE]/55 bg-[#F4EFE5] py-24 lg:py-32">
          <InstitutionalBackground />
          <div className="container-xl relative z-10">
            <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <SectionReveal>
                <div className="lg:sticky lg:top-28">
                  <SectionKicker>Assessment architecture</SectionKicker>
                  <h2 className="max-w-xl text-[2.8rem] font-normal tracking-[-0.045em] text-[#16332A] sm:text-[4rem]">Four deliberate steps. One clearer ESG picture.</h2>
                  <p className="mt-6 max-w-lg text-base leading-8 text-[#59635D]">Every stage is designed to reduce complexity — from answering the questions to understanding the result and deciding what to prioritise next.</p>
                  <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-[#16332A]/10 bg-white/65 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B746E] shadow-sm backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-[#A9793B]" /> Decision-ready by design
                  </div>
                </div>
              </SectionReveal>

              <div className="relative">
                <div className="absolute bottom-8 left-[27px] top-8 hidden w-px bg-gradient-to-b from-transparent via-[#A9793B]/30 to-transparent sm:block" />
                <div className="space-y-5">
                  {assessmentSteps.map((step, index) => (
                    <SectionReveal key={step.step} delay={index * 0.08}>
                      <motion.article
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.25 }}
                        className="group relative rounded-[28px] border border-[#D8D0BE]/70 bg-[#FFFEFB]/88 p-6 shadow-[0_18px_55px_-35px_rgba(22,51,42,0.28)] backdrop-blur-xl sm:ml-14 sm:p-7"
                      >
                        <div className="absolute left-[-47px] top-8 hidden h-3 w-3 rounded-full border-2 border-[#A9793B]/55 bg-[#F4EFE5] sm:block" />
                        <div className="flex items-start gap-5">
                          <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl border border-[#16332A]/10 bg-[#16332A]/[0.045] text-[#16332A] transition-all group-hover:border-[#A9793B]/25 group-hover:bg-[#A9793B]/10 group-hover:text-[#8A5A3B]">
                            <step.icon className="h-5 w-5" strokeWidth={1.5} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-[#A9793B]">{step.step} · {step.eyebrow}</span>
                              <ChevronRight className="h-4 w-4 text-[#A9793B]/40 transition-transform group-hover:translate-x-1" />
                            </div>
                            <h3 className="mt-3 text-[1.25rem] font-normal text-[#16332A] sm:text-[1.4rem]">{step.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-[#65706A]">{step.description}</p>
                          </div>
                        </div>
                      </motion.article>
                    </SectionReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <AnimatePresence mode="wait">
          {quizResults && resultsSummary && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden border-y border-[#D8D0BE]/60 bg-[#F5F0E6] py-24 lg:py-32"
            >
              <InstitutionalBackground />
              <div className="container-xl relative z-10">
                <div className="mx-auto max-w-6xl">
                  <SectionReveal>
                    <div className="mb-12 text-center">
                      <SectionKicker>Your assessment result</SectionKicker>
                      <h2 className="text-[2.8rem] font-normal tracking-[-0.045em] text-[#16332A] sm:text-[4rem]">Your ESG maturity, at a glance.</h2>
                      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5B625E]">A concise executive snapshot of where your organisation is today and where the next improvement opportunity lies.</p>
                    </div>
                  </SectionReveal>

                  <div className="relative overflow-hidden rounded-[34px] border border-[#D8D0BE]/70 bg-[#FFFEFB]/90 p-7 shadow-[0_35px_95px_-42px_rgba(22,51,42,0.36)] backdrop-blur-xl lg:p-12">
                    <div className="absolute right-[-140px] top-[-140px] h-72 w-72 rounded-full border border-[#A9793B]/10" />
                    <div className="absolute bottom-[-180px] left-[-120px] h-80 w-80 rounded-full border border-[#16332A]/[0.06]" />
                    <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                      <div className="flex justify-center lg:justify-start">
                        <ESGScoreDial score={quizResults.total} maxScore={100} size={285} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[#A9793B]/20 bg-[#F1E3CB] px-4 py-2 text-xs font-semibold text-[#8A5A3B]">{maturity} level</span>
                          <span className="rounded-full border border-[#16332A]/10 bg-[#E4EAE3] px-4 py-2 text-xs font-semibold text-[#16332A]">{tier.charAt(0).toUpperCase() + tier.slice(1)} tier</span>
                        </div>
                        <h3 className="mt-6 text-3xl font-normal tracking-[-0.03em] text-[#16332A]">A result you can explain — not just display.</h3>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5B625E]">Your overall score is supported by pillar-level performance, helping teams understand what is driving maturity and what deserves the next round of attention.</p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                          {resultsSummary.map((pillar) => {
                            const percentage = Math.round((pillar.score / pillar.max) * 100);
                            return (
                              <div key={pillar.label} className="rounded-2xl border border-[#D8D0BE]/60 bg-[#FBF9F4] p-4">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-medium text-[#35413C]">{pillar.label}</span>
                                  <span className="font-mono text-xs font-semibold text-[#A9793B]">{percentage}%</span>
                                </div>
                                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E7E0D3]">
                                  <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full rounded-full bg-gradient-to-r from-[#16332A] to-[#A9793B]" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-14">
                    <div className="mb-7 flex items-end justify-between gap-5">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9793B]">Executive output</p>
                        <h3 className="mt-2 text-2xl font-normal text-[#16332A]">What your assessment gives you</h3>
                      </div>
                      <span className="hidden text-xs text-[#8B8578] sm:block">Six decision-ready outputs</span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {outcomeCards.map((card, index) => (
                        <SectionReveal key={card.title} delay={index * 0.05}>
                          <motion.article
                            whileHover={{ y: -5 }}
                            className="group h-full rounded-[24px] border border-[#D8D0BE]/65 bg-[#FFFEFB]/82 p-6 shadow-[0_15px_45px_-34px_rgba(22,51,42,0.25)] transition-all duration-300 hover:border-[#A9793B]/25 hover:shadow-[0_25px_60px_-32px_rgba(22,51,42,0.32)]"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#16332A]/[0.05] text-[#16332A] transition-colors group-hover:bg-[#A9793B]/10 group-hover:text-[#8A5A3B]"><card.icon className="h-5 w-5" strokeWidth={1.5} /></div>
                              <span className="font-mono text-[9px] tracking-[0.18em] text-[#A9793B]/70">{card.label}</span>
                            </div>
                            <h4 className="mt-7 text-[1.18rem] font-normal leading-tight text-[#16332A]">{card.title}</h4>
                            <p className="mt-3 text-sm leading-6 text-[#65706A]">{card.description}</p>
                          </motion.article>
                        </SectionReveal>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[28px] border border-[#D8D0BE]/70 bg-[#FFFEFB]/88 p-7 shadow-[0_18px_50px_-35px_rgba(22,51,42,0.28)]">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#A9793B]/10 text-[#A9793B]"><Zap className="h-4 w-4" /></div>
                        <div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A9793B]">Immediate focus</p><h4 className="mt-1 text-xl font-normal text-[#16332A]">Quick wins to consider</h4></div>
                      </div>
                      <ul className="mt-6 space-y-4">
                        {quickWins.map((win) => (
                          <li key={win} className="flex items-start gap-3 text-sm leading-6 text-[#4B554F]">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#5C7A66]" />
                            <span>{win}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative overflow-hidden rounded-[28px] bg-[#16332A] p-7 text-white shadow-[0_28px_80px_-38px_rgba(22,51,42,0.58)]">
                      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-[#D7B46B]/15" />
                      <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full border border-[#D7B46B]/10" />
                      <div className="relative z-10">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D7B46B]">Next move</p>
                        <h4 className="mt-3 text-2xl font-normal">Turn the score into a roadmap.</h4>
                        <p className="mt-4 text-sm leading-7 text-white/60">Go beyond the free snapshot with deeper analytics, compliance mapping, benchmarking, and a prioritised ESG action plan.</p>
                        <Button variant="gold" size="lg" className="mt-7 rounded-xl" iconRight={<ArrowRight className="h-4 w-4" />}>Explore Full Assessment</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* PREMIUM INTELLIGENCE */}
        <section className="relative overflow-hidden bg-[#0B1F18] py-24 lg:py-32">
          <InstitutionalBackground dark />
          <div className="container-xl relative z-10">
            <div className="grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
              <SectionReveal>
                <SectionKicker dark>Beyond the free assessment</SectionKicker>
                <h2 className="max-w-xl text-[2.8rem] font-normal tracking-[-0.045em] !text-[#F7F3E8] sm:text-[4rem]">Turn an assessment into an ESG intelligence system.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 !text-[#D9D4C8] sm:text-lg">For organisations ready to go deeper, unlock a richer layer of analytics, benchmarking, compliance mapping, and prioritised recommendations.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-[#D7B46B]/20 bg-white/[0.045] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] !text-[#D9D4C8]">BRSR</span>
                  <span className="rounded-full border border-[#D7B46B]/20 bg-white/[0.045] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] !text-[#D9D4C8]">GRI</span>
                  <span className="rounded-full border border-[#D7B46B]/20 bg-white/[0.045] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] !text-[#D9D4C8]">ISSB</span>
                  <span className="rounded-full border border-[#D7B46B]/20 bg-white/[0.045] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] !text-[#D9D4C8]">SASB</span>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.12}>
                <div className="relative rounded-[32px] border border-white/10 bg-white/[0.035] p-2 shadow-[0_35px_100px_-45px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                  <div className="rounded-[26px] border border-white/[0.07] bg-[#0D2A20]/75 p-6 sm:p-8">
                    <div className="mb-7 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] !text-[#E8D7A9]">Intelligence layer</p>
                        <h3 className="mt-2 text-2xl font-normal !text-[#F7F3E8]">Premium capabilities</h3>
                      </div>
                      <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#D7B46B]/20 bg-[#D7B46B]/10 text-[#D7B46B]"><Sparkles className="h-5 w-5" /></div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {premiumFeatures.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.04 }}
                          className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors hover:border-[#D7B46B]/20 hover:bg-[#D7B46B]/[0.045]"
                        >
                          <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl bg-[#D7B46B]/10 text-[#D7B46B]"><Lock className="h-3.5 w-3.5" /></span>
                          <span className="text-xs leading-5 !text-[#D9D4C8] transition-colors group-hover:!text-[#FFFDF7]">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row">
                      <Button variant="gold" size="lg" className="rounded-xl" iconRight={<ArrowRight className="h-4 w-4" />}>Book a Demo</Button>
                      <Button variant="outline" size="lg" className="rounded-xl border-white/20 !text-[#F7F3E8] hover:bg-[#F7F3E8] hover:!text-[#16332A]">Request Full Assessment</Button>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-[#F1EAD9] py-24 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(169,121,59,0.14),transparent_45%)]" />
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A9793B]/[0.07]" />
          <div className="container-md relative z-10 text-center">
            <SectionReveal>
              <div className="mx-auto mb-7 grid h-16 w-16 place-items-center rounded-[20px] border border-[#A9793B]/20 bg-[#FBF9F4] text-[#A9793B] shadow-[0_15px_40px_-20px_rgba(169,121,59,0.35)]"><Globe2 className="h-7 w-7" /></div>
              <SectionKicker>Start with clarity</SectionKicker>
              <h2 className="text-[2.8rem] font-normal tracking-[-0.045em] text-[#16332A] sm:text-[4.2rem]">Your ESG baseline starts here.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5B625E]">Take the free assessment, understand your maturity, and leave with a clearer view of where your organisation should focus next.</p>
              <Button
                variant="primary"
                size="xl"
                className="mt-9 rounded-[13px] bg-[#16332A] shadow-[0_22px_55px_-20px_rgba(22,51,42,0.55)]"
                iconRight={<ChevronRight className="h-5 w-5" />}
                onClick={() => setIsQuizOpen(true)}
              >
                Start Free Assessment
              </Button>
              <p className="mt-5 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[#8B8578]">~5 minutes · 23 questions · instant maturity result</p>
            </SectionReveal>
          </div>
        </section>
      </main>

      <AssessmentQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onComplete={(results) => {
          setQuizResults(results);
          setIsQuizOpen(false);
          setTimeout(() => {
            document.getElementById("why-assessment")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 250);
        }}
      />
    </>
  );
}