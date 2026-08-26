"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Compass,
  ExternalLink,
  Layers3,
  MessageSquare,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import Button from "@/components/ui/Button";

const frameworks = [
  {
    abbr: "BRSR", name: "Business Responsibility & Sustainability Reporting",
    mandated: "SEBI", scope: "Top 1000 listed companies by market cap (expanding)",
    description: "India's primary ESG reporting framework mandated by SEBI. Covers nine principles of responsible business conduct with essential and leadership indicators.",
    status: "Mandatory",
    keyRequirements: ["Environmental metrics", "Social responsibility", "Governance disclosures", "Value chain assessment"],
    index: "01",
  },
  {
    abbr: "GRI", name: "Global Reporting Initiative",
    mandated: "Global Standard", scope: "Voluntary — globally recognised",
    description: "The world's most widely used sustainability reporting standard. Provides a comprehensive framework for organisations to communicate their ESG impacts.",
    status: "Voluntary",
    keyRequirements: ["Materiality assessment", "Stakeholder engagement", "Impact reporting", "Universal disclosures"],
    index: "02",
  },
  {
    abbr: "ISSB", name: "International Sustainability Standards Board",
    mandated: "IFRS Foundation", scope: "Global adoption in progress",
    description: "The new global baseline for sustainability disclosure, building on TCFD and SASB. Focuses on enterprise value and investor-relevant information.",
    status: "Emerging",
    keyRequirements: ["Climate-related disclosures", "Industry-based metrics", "Risk & opportunity", "Financial materiality"],
    index: "03",
  },
  {
    abbr: "SASB", name: "Sustainability Accounting Standards Board",
    mandated: "Industry-Specific", scope: "77 industry-specific standards",
    description: "Industry-specific disclosure standards focused on financial materiality. Now integrated into the ISSB framework.",
    status: "Integrated",
    keyRequirements: ["Industry-specific metrics", "Financial materiality", "Quantitative KPIs", "Sector comparability"],
    index: "04",
  },
  {
    abbr: "TCFD", name: "Task Force on Climate-related Financial Disclosures",
    mandated: "FSB / G20", scope: "Recommended for all; mandated in some jurisdictions",
    description: "Focuses specifically on climate-related risks and opportunities. Structured around four pillars: governance, strategy, risk management, and metrics & targets.",
    status: "Recommended",
    keyRequirements: ["Climate governance", "Scenario analysis", "Risk management", "Metrics & targets"],
    index: "05",
  },
  {
    abbr: "CDP", name: "Carbon Disclosure Project",
    mandated: "Investor-Driven", scope: "18,700+ companies globally",
    description: "The global disclosure system for environmental impact. Investors and purchasers use CDP data to make informed decisions about capital allocation.",
    status: "Investor-Driven",
    keyRequirements: ["Climate change", "Water security", "Forests & biodiversity", "Supply chain assessment"],
    index: "06",
  },
];

const selectorQuestions = [
  {
    question: "Is your company listed on an Indian stock exchange?",
    options: ["Yes — Top 1000 by market cap", "Yes — but not Top 1000", "No — private company", "No — not based in India"],
  },
  {
    question: "Do you export goods to the EU?",
    options: ["Yes — significantly", "Yes — some", "No", "Planning to"],
  },
  {
    question: "Do your investors request ESG disclosures?",
    options: ["Yes — regularly", "Sometimes", "No", "Not sure"],
  },
];

const mappedFrameworks = ["BRSR", "GRI", "CDP"];

export default function ComplianceHubPage() {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [selectorStep, setSelectorStep] = useState(0);
  const [selectorAnswers, setSelectorAnswers] = useState<string[]>([]);

  const activeFramework = useMemo(
    () => frameworks.find((framework) => framework.abbr === selectedFramework),
    [selectedFramework]
  );

  const selectAnswer = (option: string) => {
    setSelectorAnswers((current) => [...current, option]);
    setSelectorStep((current) => current + 1);
  };

  const resetSelector = () => {
    setSelectorStep(0);
    setSelectorAnswers([]);
  };

  return (
    <main className="min-h-screen bg-[#F8F5EE] text-[#202722] overflow-hidden">
      {/* HERO — regulatory desk */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 border-b border-[#D9D1C2]/60">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.5]" 
            style={{ backgroundImage: "url('/images/esgassessment.png')" }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8F5EE] opacity-80" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,45,39,0.035)_1px,transparent_1px),linear-gradient(rgba(35,45,39,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute -top-56 right-[-10%] h-[760px] w-[760px] rounded-full border border-[#B58A4A]/15" />
          <div className="absolute -top-24 right-[2%] h-[500px] w-[500px] rounded-full border border-[#B58A4A]/10" />
          <div className="absolute left-[8%] top-[32%] h-28 w-28 rounded-full border border-[#B58A4A]/20" />
          <svg className="absolute right-[12%] top-[18%] h-36 w-36 opacity-30" viewBox="0 0 144 144" fill="none">
            <path d="M72 8v128M8 72h128M27 27l90 90M117 27L27 117" stroke="#B58A4A" strokeWidth="0.7" />
            <circle cx="72" cy="72" r="44" stroke="#B58A4A" strokeWidth="0.7" />
            <circle cx="72" cy="72" r="4" fill="#B58A4A" />
          </svg>
        </div>

        <div className="container-xl relative z-10">
          <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-14 lg:gap-20 items-center">
            <SectionReveal>
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#B58A4A]/30 bg-[#FFFDF8] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-[#87642D]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B58A4A]" />
                    Compliance intelligence
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#817C71]">India-first · global-ready</span>
                </div>

                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#817C71]">Regulatory knowledge desk / 01</p>
                <h1 className="font-display text-[3.35rem] sm:text-[4.35rem] lg:text-[5.25rem] leading-[0.98] tracking-[-0.045em] text-[#202722]">
                  Navigate the rules.
                  <br />
                  <span className="text-[#456856]">Understand the standard.</span>
                </h1>
                <p className="mt-7 max-w-xl text-[1.06rem] leading-[1.8] text-[#68665D]">
                  Navigate global ESG regulations, reporting frameworks, and sustainability standards from one centralized knowledge hub.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
                    Explore Frameworks
                  </Button>
                  <Link href="/contact">
                    <Button variant="secondary" size="lg" iconRight={<MessageSquare className="w-4 h-4" />}>
                      Talk to an ESG Expert
                    </Button>
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#D9D1C2] pt-5">
                  <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.12em] text-[#77736A]"><ShieldCheck className="w-3.5 h-3.5 text-[#A9793B]" /> SEBI-aware</span>
                  <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.12em] text-[#77736A]"><Layers3 className="w-3.5 h-3.5 text-[#A9793B]" /> Multi-framework</span>
                  <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.12em] text-[#77736A]"><ScanLine className="w-3.5 h-3.5 text-[#A9793B]" /> Decision-ready</span>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="relative min-h-[430px] lg:min-h-[520px]">
                <div className="absolute right-0 top-0 w-full max-w-[540px] rounded-[28px] border border-[#CFC6B5] bg-[#FDFBF6]/90 p-3 shadow-[0_30px_90px_rgba(33,39,35,0.10)]">
                  <div className="rounded-[22px] border border-[#E1DACD] bg-[#F7F3EA] overflow-hidden">
                    <div className="flex items-center justify-between border-b border-[#DDD5C7] px-5 py-4">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8A8377]">Regulatory map</p>
                        <p className="mt-1 font-display text-xl text-[#27312B]">Six frameworks. One view.</p>
                      </div>
                      <span className="rounded-full border border-[#B58A4A]/25 bg-[#FBF3E2] px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-[#8A672F]">Live index</span>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-[68px_1fr_auto] items-center gap-x-4 gap-y-0">
                        {frameworks.map((fw, index) => (
                          <motion.button
                            key={fw.abbr}
                            onClick={() => setSelectedFramework(selectedFramework === fw.abbr ? null : fw.abbr)}
                            className="contents text-left cursor-pointer"
                            whileHover={{ y: -1 }}
                          >
                            <span className="py-4 font-mono text-xs font-semibold text-[#345441]">{fw.abbr}</span>
                            <span className="relative h-px bg-[#D5CCBC] overflow-hidden">
                              <motion.span
                                className="absolute inset-y-0 left-0 bg-[#A9793B]"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${54 + index * 7}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, delay: index * 0.08 }}
                              />
                            </span>
                            <span className="py-4 text-right font-mono text-[9px] uppercase tracking-wider text-[#928B80]">{fw.status}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 border-t border-[#DDD5C7] bg-[#F1ECE2]">
                      <div className="p-4 border-r border-[#DDD5C7]"><span className="font-mono text-lg text-[#27312B]">09</span><p className="mt-1 text-[9px] uppercase tracking-wider text-[#8B857A]">BRSR principles</p></div>
                      <div className="p-4 border-r border-[#DDD5C7]"><span className="font-mono text-lg text-[#27312B]">06</span><p className="mt-1 text-[9px] uppercase tracking-wider text-[#8B857A]">Core frameworks</p></div>
                      <div className="p-4"><span className="font-mono text-lg text-[#27312B]">01</span><p className="mt-1 text-[9px] uppercase tracking-wider text-[#8B857A]">Knowledge desk</p></div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 hidden sm:block w-[220px] rounded-2xl border border-[#D6CDBD] bg-[#FFFDF8] p-5 shadow-[0_20px_55px_rgba(33,39,35,0.09)]">
                  <div className="flex items-center justify-between mb-5"><span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B857A]">Signal</span><Compass className="w-4 h-4 text-[#A9793B]" /></div>
                  <p className="font-display text-2xl text-[#26302A]">India → Global</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#777269]">Start with the reporting context that matters to your organisation.</p>
                  <div className="mt-5 flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-[#557360]"><span className="h-1.5 w-1.5 rounded-full bg-[#A9793B]" /> Context-aware</div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* FRAMEWORK ATLAS — regulatory intelligence index */}
      <section className="relative overflow-hidden bg-[#F8F5EE] py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.32] bg-[linear-gradient(90deg,rgba(43,52,46,0.045)_1px,transparent_1px),linear-gradient(rgba(43,52,46,0.045)_1px,transparent_1px)] bg-[size:80px_80px]" />
          <div className="absolute -left-64 top-20 h-[620px] w-[620px] rounded-full border border-[#B58A4A]/10" />
          <div className="absolute -left-40 top-44 h-[380px] w-[380px] rounded-full border border-[#547260]/10" />
          <div className="absolute right-[-220px] bottom-[-240px] h-[620px] w-[620px] rounded-full border border-[#B58A4A]/10" />
        </div>

        <div className="container-xl relative z-10">
          <SectionReveal>
            <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-20 items-end mb-16">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A9793B]">02 / Framework Atlas</span>
                  <span className="h-px w-10 bg-[#B58A4A]/45" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#989084]">Regulatory index</span>
                </div>
                <h2 className="max-w-3xl font-display text-[3rem] sm:text-[3.8rem] lg:text-[4.5rem] leading-[0.98] tracking-[-0.045em] text-[#202722]">
                  The standards landscape,
                  <br />
                  <span className="text-[#547260]">made legible.</span>
                </h2>
              </div>

              <div className="lg:pb-1">
                <p className="max-w-xl text-[15px] leading-[1.85] text-[#6D695F]">
                  Explore the frameworks that shape reporting, disclosure, materiality and investor expectations across India and global markets.
                </p>
                <div className="mt-7 grid grid-cols-3 max-w-xl border-y border-[#D8D0C1]">
                  <div className="py-4 pr-5 border-r border-[#D8D0C1]">
                    <div className="font-display text-2xl text-[#25312A]">06</div>
                    <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-[#8C867B]">Frameworks indexed</div>
                  </div>
                  <div className="py-4 px-5 border-r border-[#D8D0C1]">
                    <div className="font-display text-2xl text-[#25312A]">77</div>
                    <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-[#8C867B]">SASB sectors</div>
                  </div>
                  <div className="py-4 pl-5">
                    <div className="font-display text-2xl text-[#25312A]">18.7K+</div>
                    <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-[#8C867B]">CDP companies</div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          <div className="relative border-t border-[#CFC6B7]">
            <div className="hidden lg:grid grid-cols-[64px_108px_1fr_210px_92px] gap-6 px-6 py-4 border-b border-[#D8D0C1] font-mono text-[8px] uppercase tracking-[0.18em] text-[#9A9285]">
              <span>No.</span>
              <span>Standard</span>
              <span>Framework / issuing body</span>
              <span>Reach / scope</span>
              <span className="text-right">Signal</span>
            </div>

            <div>
              {frameworks.map((fw, i) => {
                const active = selectedFramework === fw.abbr;
                const signalTone = i === 0 ? '#A9793B' : i === 1 ? '#547260' : i === 2 ? '#7189A1' : i === 3 ? '#8C6D52' : i === 4 ? '#B56E4F' : '#647C72';
                const signalLabel = i === 0 ? 'INDIA' : i === 1 ? 'GLOBAL' : i === 2 ? 'BASELINE' : i === 3 ? 'SECTOR' : i === 4 ? 'CLIMATE' : 'DISCLOSURE';
                return (
                  <motion.div
                    key={fw.abbr}
                    layout
                    className={`group border-b border-[#D8D0C1] transition-colors duration-300 ${active ? 'bg-[#F0ECE3]' : 'bg-transparent hover:bg-[#FBF9F4]'}`}
                  >
                    <button
                      onClick={() => setSelectedFramework(active ? null : fw.abbr)}
                      className="w-full grid grid-cols-[38px_68px_1fr_auto] lg:grid-cols-[64px_108px_1fr_210px_92px] gap-4 lg:gap-6 items-center px-3 lg:px-6 py-6 lg:py-7 text-left cursor-pointer"
                      aria-expanded={active}
                    >
                      <span className="font-mono text-[9px] text-[#A29A8C]">{fw.index}</span>

                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: signalTone }} />
                        <span className="font-mono text-[12px] font-semibold tracking-[0.06em] text-[#294C3A]">{fw.abbr}</span>
                      </span>

                      <span className="min-w-0">
                        <span className="block font-display text-[1.3rem] lg:text-[1.65rem] leading-[1.12] text-[#263029] group-hover:text-[#4D6E5A] transition-colors">{fw.name}</span>
                        <span className="mt-1.5 block text-[11px] text-[#8A8378]">{fw.mandated}</span>
                      </span>

                      <span className="hidden lg:block text-[11px] leading-[1.55] text-[#756F65]">{fw.scope}</span>

                      <span className="flex items-center justify-end gap-2">
                        <span className="hidden xl:block font-mono text-[8px] uppercase tracking-[0.14em]" style={{ color: signalTone }}>{signalLabel}</span>
                        <ChevronDown className={`h-4 w-4 text-[#A9793B] transition-transform duration-300 ${active ? 'rotate-180' : ''}`} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 px-3 lg:pl-[11rem] lg:pr-6 pb-9">
                            <div className="relative pl-5 border-l-2" style={{ borderColor: `${signalTone}55` }}>
                              <p className="font-mono text-[8px] uppercase tracking-[0.18em] mb-3" style={{ color: signalTone }}>Framework brief</p>
                              <p className="max-w-2xl text-[13px] leading-[1.85] text-[#666158]">{fw.description}</p>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#9A9285]">Key requirements</p>
                                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#A9793B]">{fw.status}</span>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                                {fw.keyRequirements.map((req, reqIndex) => (
                                  <span key={req} className="flex items-start gap-2 text-[11px] leading-relaxed text-[#5F5B53]">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: signalTone }} />
                                    <span><span className="mr-1 font-mono text-[8px] text-[#AAA294]">0{reqIndex + 1}</span>{req}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 px-3 lg:px-6">
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#A09A8F]">Select a framework to inspect its reporting logic</span>
              <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-[#8E887D]"><span className="h-1.5 w-1.5 rounded-full bg-[#A9793B]" /> Interactive index</span>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTOR — interactive dossier */}
      <section className="relative py-24 lg:py-32 bg-[#EFEAE0] border-y border-[#D8D0C1] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute left-[-180px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-[#B58A4A]/15" />
          <div className="absolute right-[-120px] bottom-[-240px] h-[600px] w-[600px] rounded-full border border-[#B58A4A]/10" />
        </div>
        <div className="container-lg relative z-10">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A9793B] mb-4">03 / Applicability check</p>
              <h2 className="font-display text-4xl lg:text-[3.35rem] text-[#252C27] tracking-[-0.035em]">Which framework applies <span className="text-[#547260]">to you?</span></h2>
              <p className="mt-4 text-sm text-[#777269]">Answer three quick questions to find out.</p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="mx-auto max-w-3xl rounded-[26px] border border-[#D3C9B9] bg-[#FBF9F4] shadow-[0_28px_80px_rgba(39,43,38,0.08)] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#DDD5C7] px-6 lg:px-8 py-5">
                <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9E3D8] text-[#A9793B]"><Compass className="w-4 h-4" /></span><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#7D776D]">Applicability dossier</span></div>
                <span className="font-mono text-[10px] text-[#A29A8C]">{Math.min(selectorStep + 1, selectorQuestions.length)} / {selectorQuestions.length}</span>
              </div>

              <div className="px-6 lg:px-10 py-9">
                <div className="mb-8 h-1 bg-[#E5DED1] rounded-full overflow-hidden"><motion.div className="h-full bg-[#A9793B]" animate={{ width: `${(selectorStep / selectorQuestions.length) * 100}%` }} transition={{ duration: 0.4 }} /></div>
                {selectorStep < selectorQuestions.length ? (
                  <motion.div key={selectorStep} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#A29A8C] mb-3">Question {selectorStep + 1}</p>
                    <h3 className="font-display text-2xl lg:text-3xl text-[#27302A] max-w-2xl leading-[1.2] mb-7">{selectorQuestions[selectorStep].question}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectorQuestions[selectorStep].options.map((option, index) => (
                        <motion.button key={option} onClick={() => selectAnswer(option)} whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} className="group flex min-h-[66px] items-center justify-between rounded-xl border border-[#D9D1C2] bg-[#FFFDF9] px-5 py-4 text-left text-sm text-[#4D4A43] transition-all hover:border-[#A9793B]/55 hover:shadow-[0_12px_25px_rgba(38,42,38,0.06)] cursor-pointer">
                          <span className="flex items-center gap-3"><span className="font-mono text-[9px] text-[#AAA294]">0{index + 1}</span>{option}</span><ArrowRight className="w-3.5 h-3.5 text-[#B5AD9F] group-hover:text-[#A9793B] transition-colors" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-5">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#A9793B]/30 bg-[#F7EEDB] text-[#A9793B]"><CheckCircle2 className="w-6 h-6" /></div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#A9793B] mb-3">Assessment signal</p>
                    <h3 className="font-display text-3xl text-[#27302A] mb-3">Your applicable frameworks</h3>
                    <p className="mx-auto max-w-lg text-sm leading-relaxed text-[#777269] mb-7">Based on your answers, these frameworks are most relevant to your organisation:</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">{mappedFrameworks.map((fw) => <span key={fw} className="rounded-full border border-[#B58A4A]/30 bg-[#F7EEDB] px-4 py-2 font-mono text-xs text-[#765827]">{fw}</span>)}</div>
                    <Button variant="secondary" size="md" onClick={resetSelector}>Retake</Button>
                  </motion.div>
                )}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ADVANTAGE — premium mapping studio */}
      <section className="relative overflow-hidden bg-[#0A2A22] py-24 lg:py-32 text-[#F7F1E6]">
        {/* Atmospheric colour field */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-44 h-[620px] w-[620px] rounded-full bg-[#C89A4B]/[0.08] blur-3xl" />
          <div className="absolute right-[-12%] top-[18%] h-[520px] w-[520px] rounded-full bg-[#4D7B68]/[0.16] blur-3xl" />
          <div className="absolute bottom-[-28%] left-[35%] h-[620px] w-[620px] rounded-full bg-[#B96E4B]/[0.08] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.055] bg-[linear-gradient(90deg,rgba(247,241,230,0.7)_1px,transparent_1px),linear-gradient(rgba(247,241,230,0.7)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute -left-44 top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full border border-[#D9B76A]/20" />
          <div className="absolute -left-24 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full border border-[#D9B76A]/10" />
        </div>

        <div className="container-xl relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <SectionReveal>
              <div className="max-w-xl">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9B76A]/40 bg-[#D9B76A]/[0.08] text-[#E7C778]">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E7C778]">04 / KSynapse Advantage</span>
                </div>

                <h2 className="font-display text-[2.9rem] leading-[1.02] tracking-[-0.045em] text-[#FFF8EC] sm:text-[3.7rem] lg:text-[4.35rem]">
                  <span className="text-white">Enter once.</span>
                  <br />
                  <span className="text-[#E5BD65]">Map everywhere.</span>
                </h2>

                <p className="mt-7 max-w-lg text-[15px] leading-[1.85] text-[#D9E0D9]">
                  Enter your ESG data once. KSynapse translates it across the standards landscape automatically — reducing duplication while keeping the underlying reporting logic clear.
                </p>

                <div className="mt-9 grid max-w-lg grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
                  {[
                    { value: '01', label: 'One source', accent: '#E5BD65' },
                    { value: '05', label: 'Frameworks', accent: '#86B9A1' },
                    { value: '01', label: 'Clear map', accent: '#D38A6B' },
                  ].map((item) => (
                    <div key={item.label} className="border-r border-white/10 px-4 py-4 last:border-r-0 sm:px-5">
                      <div className="font-display text-2xl" style={{ color: item.accent }}>{item.value}</div>
                      <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-[#AAB8AF]">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.16em] text-[#D6DED7]">
                  <span className="h-px w-8 bg-[#D9B76A]/60" />
                  <span>Single source of ESG truth</span>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[34px] border border-[#D9B76A]/10 bg-[#D9B76A]/[0.025]" />
                <div className="relative overflow-hidden rounded-[28px] border border-[#D9B76A]/30 bg-[#10392E]/90 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.28)] backdrop-blur-sm lg:p-7">
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#D9B76A]/[0.07] blur-2xl" />
                  <div className="relative">
                    <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#AFC0B6]">Mapping engine</p>
                        <p className="mt-1 text-xs text-[#DCE3DD]">Standards translation layer</p>
                      </div>
                      <span className="flex items-center gap-2 rounded-full border border-[#D9B76A]/25 bg-[#D9B76A]/[0.06] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-[#E7C778]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E7C778] shadow-[0_0_10px_rgba(231,199,120,0.65)]" />
                        Auto-mapped
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                      {[
                        { name: 'BRSR', tone: '#E5BD65', width: '72%' },
                        { name: 'GRI', tone: '#91BDA7', width: '81%' },
                        { name: 'SASB', tone: '#D6A37E', width: '76%' },
                        { name: 'TCFD', tone: '#91A9C2', width: '88%' },
                        { name: 'CDP', tone: '#D9C27D', width: '94%' },
                      ].map((fw, index) => (
                        <motion.div key={fw.name} whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                          <div className="absolute inset-x-0 top-0 h-px opacity-70" style={{ background: fw.tone }} />
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-sm font-semibold text-[#FFF8EC]">{fw.name}</span>
                            <span className="h-2 w-2 rounded-full opacity-80" style={{ background: fw.tone }} />
                          </div>
                          <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <motion.div className="h-full rounded-full" style={{ background: fw.tone }} initial={{ width: 0 }} whileInView={{ width: fw.width }} viewport={{ once: true }} transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }} />
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span className="text-[8px] uppercase tracking-[0.12em] text-[#A9B8AF]">Mapped</span>
                            <span className="font-mono text-[8px]" style={{ color: fw.tone }}>{fw.width}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div className="rounded-xl border border-white/10 bg-[#09271F]/70 px-4 py-3">
                        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#E5BD65]">One entry → five outputs</p>
                        <p className="mt-1 text-xs text-[#C9D3CC]">Less duplication. More visibility across standards.</p>
                      </div>
                      <span className="inline-flex w-fit items-center rounded-full border border-[#D9B76A]/30 bg-[#D9B76A]/[0.07] px-4 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#E7C778]">80% less effort</span>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="relative py-24 lg:py-28 bg-[#F8F5EE]">
        <div className="container-md text-center">
          <SectionReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A9793B] mb-4">05 / Your next move</p>
            <h2 className="font-display text-4xl lg:text-5xl tracking-[-0.035em] text-[#252C27]">Compliance becomes clearer when the landscape does.</h2>
            <p className="mt-5 max-w-xl mx-auto text-sm leading-[1.85] text-[#777269]">Explore the frameworks, identify what applies to your organisation, and move forward with a clearer ESG reporting path.</p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap"><Button variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>Explore Frameworks</Button><Link href="/contact"><Button variant="secondary" size="lg">Talk to an ESG Expert</Button></Link></div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
