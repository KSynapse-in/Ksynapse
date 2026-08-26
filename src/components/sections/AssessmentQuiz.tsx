"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, ArrowLeft, Building2, Leaf, Users, ShieldCheck, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// ═══════════════════════════════════════════════════════════
// Full Question Bank per Appendix A
// ═══════════════════════════════════════════════════════════

const industries = [
  "Manufacturing", "Energy & Utilities", "Transportation & Logistics",
  "Construction & Infrastructure", "Banking & Financial Services (BFSI)",
  "Information Technology", "Retail & Consumer", "Healthcare & Life Sciences",
  "Agriculture & Food", "Mining & Metals", "Telecom & Media", "Education",
  "Hospitality & Tourism", "Consumer Products", "Government & Public Sector",
  "Waste & Circular Economy", "Packaging", "Water & Environment",
  "Corporate Services", "Consumer Services", "NGOs & Non-Profits", "Emerging Industries",
];

const companySizes = [
  "Micro Enterprise (1–10 Employees)",
  "Small Enterprise (11–50 Employees)",
  "Medium Enterprise (51–250 Employees)",
  "Large Enterprise (251–1,000 Employees)",
  "Enterprise (1,001–5,000 Employees)",
  "Large Enterprise+ (5,001–10,000 Employees)",
  "Global Enterprise (10,000+ Employees)",
];

const revenueRanges = [
  "Less than ₹5 Crore",
  "₹5–₹25 Crore",
  "₹25–₹100 Crore",
  "₹100–₹500 Crore",
  "₹500–₹1,000 Crore",
  "₹1,000–₹5,000 Crore",
  "More than ₹5,000 Crore",
];

interface ScoredOption {
  label: string;
  score: number;
}

interface ScoredQuestion {
  id: string;
  question: string;
  maxScore: number;
  options: ScoredOption[];
}

const environmentalQuestions: ScoredQuestion[] = [
  {
    id: "e1", question: "Does your organization measure its greenhouse gas emissions?", maxScore: 8,
    options: [
      { label: "We do not measure emissions", score: 0 },
      { label: "We measure only Scope 1 emissions", score: 2 },
      { label: "We measure Scope 1 & Scope 2 emissions", score: 5 },
      { label: "We measure Scope 1, 2 & 3 with regular reporting", score: 8 },
    ],
  },
  {
    id: "e2", question: "How do you monitor energy consumption?", maxScore: 6,
    options: [
      { label: "We don't monitor energy consumption", score: 0 },
      { label: "We review utility bills occasionally", score: 2 },
      { label: "We track monthly energy usage", score: 4 },
      { label: "We have automated or real-time energy monitoring", score: 6 },
    ],
  },
  {
    id: "e3", question: "Do you monitor water consumption?", maxScore: 5,
    options: [
      { label: "We don't monitor water usage", score: 0 },
      { label: "We monitor annually", score: 2 },
      { label: "We monitor monthly", score: 4 },
      { label: "We monitor continuously and have reduction targets", score: 5 },
    ],
  },
  {
    id: "e4", question: "How does your organization manage waste?", maxScore: 5,
    options: [
      { label: "No formal waste management process", score: 0 },
      { label: "Basic waste segregation", score: 2 },
      { label: "Waste is measured and recycled where possible", score: 4 },
      { label: "Comprehensive waste reduction & circular economy initiatives", score: 5 },
    ],
  },
  {
    id: "e5", question: "Does your organization have carbon reduction targets?", maxScore: 6,
    options: [
      { label: "No targets", score: 0 },
      { label: "Planning to establish targets", score: 2 },
      { label: "Short-term reduction targets defined", score: 4 },
      { label: "Science-based or long-term reduction targets with tracking", score: 6 },
    ],
  },
  {
    id: "e6", question: "Do you use renewable energy?", maxScore: 4,
    options: [
      { label: "None", score: 0 },
      { label: "Less than 25%", score: 1 },
      { label: "25%–50%", score: 2 },
      { label: "More than 50%", score: 4 },
    ],
  },
  {
    id: "e7", question: "How does your organization assess environmental risks?", maxScore: 3,
    options: [
      { label: "No assessment", score: 0 },
      { label: "Informal reviews", score: 1 },
      { label: "Periodic documented assessments", score: 2 },
      { label: "Integrated into enterprise risk management", score: 3 },
    ],
  },
  {
    id: "e8", question: "Does your organization track environmental KPIs?", maxScore: 3,
    options: [
      { label: "No KPIs", score: 0 },
      { label: "A few KPIs", score: 1 },
      { label: "Department-level KPIs", score: 2 },
      { label: "Company-wide ESG KPI dashboard", score: 3 },
    ],
  },
];

const socialQuestions: ScoredQuestion[] = [
  {
    id: "s1", question: "Does your organization have a Diversity & Inclusion policy?", maxScore: 5,
    options: [
      { label: "No D&I policy", score: 0 },
      { label: "Policy exists", score: 2 },
      { label: "Policy with initiatives", score: 4 },
      { label: "Policy, KPIs & public reporting", score: 5 },
    ],
  },
  {
    id: "s2", question: "Do employees receive regular training?", maxScore: 4,
    options: [
      { label: "No structured training", score: 0 },
      { label: "Occasional training", score: 2 },
      { label: "Regular training programs", score: 3 },
      { label: "Continuous learning platform with tracking", score: 4 },
    ],
  },
  {
    id: "s3", question: "Do you monitor employee health & safety?", maxScore: 6,
    options: [
      { label: "No formal program", score: 0 },
      { label: "Basic compliance", score: 2 },
      { label: "Regular monitoring", score: 4 },
      { label: "Certified health & safety management system", score: 6 },
    ],
  },
  {
    id: "s4", question: "Do you conduct employee satisfaction surveys?", maxScore: 4,
    options: [
      { label: "Never", score: 0 },
      { label: "Occasionally", score: 2 },
      { label: "Annual surveys", score: 3 },
      { label: "Continuous engagement & action plans", score: 4 },
    ],
  },
  {
    id: "s5", question: "Does your company engage in CSR/community initiatives?", maxScore: 3,
    options: [
      { label: "No CSR initiatives", score: 0 },
      { label: "Occasional CSR", score: 1 },
      { label: "Annual CSR programs", score: 2 },
      { label: "Strategic community impact programs", score: 3 },
    ],
  },
  {
    id: "s6", question: "Do you have policies against discrimination and harassment?", maxScore: 4,
    options: [
      { label: "No policy", score: 0 },
      { label: "Policy exists", score: 2 },
      { label: "Policy + awareness training", score: 3 },
      { label: "Policy, training & grievance monitoring", score: 4 },
    ],
  },
  {
    id: "s7", question: "Do you monitor employee turnover?", maxScore: 4,
    options: [
      { label: "No tracking", score: 0 },
      { label: "Basic HR records", score: 2 },
      { label: "Annual retention analysis", score: 3 },
      { label: "Predictive workforce analytics", score: 4 },
    ],
  },
];

const governanceQuestions: ScoredQuestion[] = [
  {
    id: "g1", question: "Does your organization have a Code of Ethics?", maxScore: 5,
    options: [
      { label: "None", score: 0 },
      { label: "Documented only", score: 2 },
      { label: "Implemented & communicated", score: 4 },
      { label: "Regular training & monitoring", score: 5 },
    ],
  },
  {
    id: "g2", question: "Is ESG discussed at board or senior leadership level?", maxScore: 5,
    options: [
      { label: "ESG not discussed", score: 0 },
      { label: "Discussed occasionally", score: 2 },
      { label: "ESG committee exists", score: 4 },
      { label: "Board-level ESG oversight", score: 5 },
    ],
  },
  {
    id: "g3", question: "Do you conduct internal audits?", maxScore: 4,
    options: [
      { label: "No audits", score: 0 },
      { label: "Occasional audits", score: 2 },
      { label: "Annual audits", score: 3 },
      { label: "Continuous internal audit framework", score: 4 },
    ],
  },
  {
    id: "g4", question: "Do you have an anti-corruption policy?", maxScore: 5,
    options: [
      { label: "None", score: 0 },
      { label: "Policy exists", score: 2 },
      { label: "Policy + employee training", score: 4 },
      { label: "Regular monitoring & reporting", score: 5 },
    ],
  },
  {
    id: "g5", question: "Do you maintain cybersecurity and data privacy policies?", maxScore: 4,
    options: [
      { label: "No formal controls", score: 0 },
      { label: "Basic security measures", score: 2 },
      { label: "Security framework implemented", score: 3 },
      { label: "Certified security program with regular audits", score: 4 },
    ],
  },
  {
    id: "g6", question: "Is there a whistleblower mechanism?", maxScore: 3,
    options: [
      { label: "None", score: 0 },
      { label: "Informal reporting", score: 1 },
      { label: "Formal reporting channel", score: 2 },
      { label: "Independent whistleblower system with protection", score: 3 },
    ],
  },
  {
    id: "g7", question: "Do you identify ESG-related business risks?", maxScore: 2,
    options: [
      { label: "No ESG risk assessment", score: 0 },
      { label: "Ad hoc reviews", score: 1 },
      { label: "Integrated ESG risk framework", score: 2 },
    ],
  },
  {
    id: "g8", question: "Do you publish ESG or sustainability reports?", maxScore: 2,
    options: [
      { label: "No reporting", score: 0 },
      { label: "Internal reporting only", score: 1 },
      { label: "Public ESG/Sustainability reporting", score: 2 },
    ],
  },
];

// ═══════════════════════════════════════════════════════════

const steps = [
  { id: "company", label: "Company Info", icon: Building2, color: "#16332A" },
  { id: "environmental", label: "Environmental", icon: Leaf, color: "#5C7A66" },
  { id: "social", label: "Social", icon: Users, color: "#A9793B" },
  { id: "governance", label: "Governance", icon: ShieldCheck, color: "#16332A" },
];

interface AssessmentQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (results: {
    total: number;
    environmental: number;
    social: number;
    governance: number;
    answers: Record<string, string>;
  }) => void;
}

export default function AssessmentQuiz({ isOpen, onClose, onComplete }: AssessmentQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    country: "India",
    annualRevenue: "",
    email: "",
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const contentRef = useRef<HTMLDivElement>(null);

  const totalQuestions = 7 + 8 + 7 + 8; // company + env + social + gov fields
  const answeredCount = Object.keys(companyInfo).filter((k) => (companyInfo as any)[k]).length + Object.keys(answers).length;
  const progress = (answeredCount / (6 + 23)) * 100; // 6 company fields + 23 scored questions

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  // Always start each assessment stage at the top. This prevents the
  // scroll position from carrying over when moving into later stages.
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [currentStep]);

  const getStepQuestions = (step: number): ScoredQuestion[] => {
    switch (step) {
      case 1: return environmentalQuestions;
      case 2: return socialQuestions;
      case 3: return governanceQuestions;
      default: return [];
    }
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return companyInfo.companyName && companyInfo.industry && companyInfo.companySize && companyInfo.email;
    }
    const questions = getStepQuestions(currentStep);
    return questions.every((q) => answers[q.id] !== undefined);
  };

  const handleComplete = async () => {
    const envScore = environmentalQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const socialScore = socialQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const govScore = governanceQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const total = envScore + socialScore + govScore;

    try {
      await addDoc(collection(db, "assessments"), {
        companyInfo,
        answers,
        scores: {
          total,
          environmental: envScore,
          social: socialScore,
          governance: govScore,
        },
        completedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to save assessment:", err);
    }

    onComplete({
      total,
      environmental: envScore,
      social: socialScore,
      governance: govScore,
      answers: Object.fromEntries(
        Object.entries(answers).map(([k, v]) => [k, String(v)])
      ),
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[min(95vw,720px)] max-h-[90vh] bg-ivory rounded-2xl shadow-elevated overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-divider/40 bg-parchment/30 flex-shrink-0">
            <div>
              <h3 className="font-display text-lg">ESG Maturity Assessment</h3>
              <p className="text-xs text-stone mt-0.5">
                Step {currentStep + 1} of {steps.length} · {steps[currentStep].label}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-parchment flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-stone" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-divider/30 flex-shrink-0">
            <motion.div
              className="h-full bg-gradient-to-r from-forest via-sage to-gold"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Step indicators */}
          <div className="px-8 py-4 flex items-center gap-2 border-b border-divider/20 flex-shrink-0">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300 ${i === currentStep
                      ? "bg-forest text-white"
                      : i < currentStep
                        ? "bg-sage/20 text-sage"
                        : "bg-divider/30 text-stone/50"
                    }`}
                >
                  {i < currentStep ? "✓" : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === currentStep ? "text-forest font-medium" : "text-stone/50"}`}>
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px ${i < currentStep ? "bg-sage/30" : "bg-divider/30"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex-1 min-h-0 overflow-y-auto px-8 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 ? (
                  /* Company Info Step */
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">Company Name *</label>
                      <input
                        type="text"
                        value={companyInfo.companyName}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-divider/60 bg-white text-charcoal text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
                        placeholder="Enter your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">Industry *</label>
                      <select
                        value={companyInfo.industry}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, industry: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-divider/60 bg-white text-charcoal text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
                      >
                        <option value="">Select your industry</option>
                        {industries.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">Company Size *</label>
                        <select
                          value={companyInfo.companySize}
                          onChange={(e) => setCompanyInfo({ ...companyInfo, companySize: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-divider/60 bg-white text-charcoal text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
                        >
                          <option value="">Select company size</option>
                          {companySizes.map((size) => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">Annual Revenue</label>
                        <select
                          value={companyInfo.annualRevenue}
                          onChange={(e) => setCompanyInfo({ ...companyInfo, annualRevenue: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-divider/60 bg-white text-charcoal text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
                        >
                          <option value="">Select revenue range</option>
                          {revenueRanges.map((rev) => (
                            <option key={rev} value={rev}>{rev}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-divider/60 bg-white text-charcoal text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                ) : (
                  /* Scored Questions Step */
                  <div className="space-y-8">
                    {getStepQuestions(currentStep).map((q, qi) => (
                      <div key={q.id}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className="font-mono text-xs text-stone mt-0.5 flex-shrink-0 w-6">
                            {qi + 1}.
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-charcoal mb-3">
                              {q.question}
                            </p>
                            <div className="space-y-2">
                              {q.options.map((opt) => {
                                const isSelected = answers[q.id] === opt.score;
                                return (
                                  <button
                                    key={opt.label}
                                    onClick={() => handleAnswer(q.id, opt.score)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 border cursor-pointer ${isSelected
                                        ? "bg-forest text-white border-forest"
                                        : "bg-white text-charcoal border-divider/40 hover:border-sage hover:bg-sage-pale/30"
                                      }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{opt.label}</span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        {qi < getStepQuestions(currentStep).length - 1 && (
                          <div className="ml-9 h-px bg-divider/20 mt-6" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-divider/40 bg-parchment/20 flex items-center justify-between flex-shrink-0">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 text-sm text-stone hover:text-forest disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="text-xs text-stone font-mono">
              {Math.round(progress)}% complete
            </div>

            {currentStep < steps.length - 1 ? (
              <Button
                variant="primary"
                size="md"
                iconRight={<ArrowRight className="w-4 h-4" />}
                disabled={!canProceed()}
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="gold"
                size="md"
                iconRight={<ArrowRight className="w-4 h-4" />}
                disabled={!canProceed()}
                onClick={handleComplete}
              >
                See My Score
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}