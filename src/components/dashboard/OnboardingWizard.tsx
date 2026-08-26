"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { Check, ArrowRight, ArrowLeft, Sparkles, Building, Layers, FileUp } from "lucide-react";

interface OnboardingWizardProps {
  onComplete: () => void;
  onClose?: () => void;
}

const steps = [
  { id: 1, title: "Organisation Profile", description: "Set up industry and enterprise class" },
  { id: 2, title: "Framework Selection", description: "Select applicable regulatory standards" },
  { id: 3, title: "Baseline Data Integration", description: "Connect energy bills or manual records" },
];

export default function OnboardingWizard({ onComplete, onClose }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState("Manufacturing");
  const [companySize, setCompanySize] = useState("Medium (51-250 Employees)");
  const [frameworks, setFrameworks] = useState<string[]>(["BRSR", "GRI"]);
  const [dataSource, setDataSource] = useState("Manual / Spreadsheets");

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const toggleFramework = (fw: string) => {
    if (frameworks.includes(fw)) {
      setFrameworks(frameworks.filter((f) => f !== fw));
    } else {
      setFrameworks([...frameworks, fw]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl border border-divider/40 shadow-xl max-w-2xl w-full overflow-hidden flex flex-col"
      >
        {/* Header Bar */}
        <div className="bg-forest px-6 py-5 text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 w-48 h-48 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <span className="text-xs font-mono text-gold uppercase tracking-wider block mb-1">
              Welcome to KSynapse
            </span>
            <h2 className="text-xl font-display text-white">
              ESG Setup & Compliance Onboarding
            </h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-sm font-mono transition-colors px-2 py-1 rounded"
            >
              Skip Setup
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="bg-parchment/50 border-b border-divider/30 px-6 py-4 flex items-center justify-between gap-2">
          {steps.map((s) => {
            const isDone = s.id < currentStep;
            const isCurrent = s.id === currentStep;
            return (
              <div key={s.id} className="flex items-center gap-2 flex-1 min-w-0">
                <div
                  className={`w-7 h-7 rounded-full text-xs font-mono flex-shrink-0 flex items-center justify-center transition-colors ${
                    isDone
                      ? "bg-sage text-white"
                      : isCurrent
                      ? "bg-gold text-white font-semibold"
                      : "bg-divider text-stone"
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : s.id}
                </div>
                <div className="min-w-0 hidden sm:block">
                  <p className={`text-xs font-medium truncate ${isCurrent ? "text-charcoal font-semibold" : "text-stone"}`}>
                    {s.title}
                  </p>
                </div>
                {s.id < steps.length && (
                  <div className={`h-0.5 flex-1 mx-2 rounded ${isDone ? "bg-sage" : "bg-divider"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content Area */}
        <div className="p-6 sm:p-8 min-h-[320px] flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-charcoal">Organisation Parameters</h3>
                    <p className="text-xs text-stone">We tune materiality matrices based on your industry structure.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone mb-2 uppercase">Industry Sector</label>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-divider/60 bg-ivory text-sm font-medium text-charcoal focus:outline-none focus:border-forest"
                    >
                      <option value="Manufacturing">Manufacturing & Engineering</option>
                      <option value="Information Technology">IT & Tech Services</option>
                      <option value="Textiles">Textiles & Apparel</option>
                      <option value="Pharmaceuticals">Pharmaceuticals & Chemicals</option>
                      <option value="Logistics">Logistics & Supply Chain</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone mb-2 uppercase">Enterprise Class</label>
                    <select
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-divider/60 bg-ivory text-sm font-medium text-charcoal focus:outline-none focus:border-forest"
                    >
                      <option value="Small (<50 Employees)">Small (&lt;50 Employees)</option>
                      <option value="Medium (51-250 Employees)">Medium (51–250 Employees)</option>
                      <option value="Large (>250 Employees)">Large (&gt;250 Employees)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gold/10 border border-gold/20 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-charcoal">AI Recommendation Active</h4>
                    <p className="text-[11px] text-stone mt-1 leading-relaxed">
                      For Manufacturing enterprises in India, SEBI BRSR Section C disclosures and EU CBAM export calculations are automatically prioritized.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-charcoal">Select Reporting Frameworks</h3>
                    <p className="text-xs text-stone">Choose standards to track. Single entry syncs data across all selected.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: "BRSR", title: "SEBI BRSR", desc: "Mandatory/Voluntary Indian Standard", tag: "Essential" },
                    { id: "GRI", title: "GRI Standards", desc: "Global Sustainability Reporting", tag: "Popular" },
                    { id: "CDP", title: "CDP Climate", desc: "Carbon & Supply Chain Focus", tag: "Export" },
                    { id: "SASB", title: "SASB / ISSB", desc: "Investor-Grade Financial Materiality", tag: "Finance" },
                  ].map((fw) => {
                    const active = frameworks.includes(fw.id);
                    return (
                      <button
                        key={fw.id}
                        type="button"
                        onClick={() => toggleFramework(fw.id)}
                        className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          active
                            ? "bg-forest/5 border-forest ring-1 ring-forest/20"
                            : "bg-white border-divider/50 hover:bg-parchment/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-sm font-semibold text-charcoal">{fw.title}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            active ? "bg-forest text-white" : "bg-divider text-stone"
                          }`}>
                            {fw.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone">{fw.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center">
                    <FileUp className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-charcoal">Baseline Data Ingestion</h3>
                    <p className="text-xs text-stone">How would you like to load your baseline ESG metrics?</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "Manual / Spreadsheets", label: "Guided Spreadsheet Template Upload", sub: "Download our mapped Excel template and re-upload when ready." },
                    { id: "Utility OCR Ingestion", label: "AI Utility Bill OCR Scanning", sub: "Upload electricity, fuel, and water bills for automatic Scope 1 & 2 parsing." },
                    { id: "ERP Connector", label: "Direct ERP Integration (Tally / SAP / Zoho)", sub: "Connect financial ledgers for continuous emission calculation." },
                  ].map((ds) => (
                    <label
                      key={ds.id}
                      onClick={() => setDataSource(ds.id)}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        dataSource === ds.id ? "bg-sage/5 border-sage" : "bg-white border-divider/40 hover:bg-parchment/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="datasource"
                        checked={dataSource === ds.id}
                        onChange={() => setDataSource(ds.id)}
                        className="mt-1 text-forest focus:ring-forest"
                      />
                      <div>
                        <p className="text-sm font-medium text-charcoal">{ds.label}</p>
                        <p className="text-xs text-stone mt-0.5">{ds.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="bg-parchment/40 border-t border-divider/30 px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back
          </Button>
          
          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            iconRight={currentStep === steps.length ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          >
            {currentStep === steps.length ? "Complete Onboarding" : "Next Step"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
