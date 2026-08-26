"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import ESGScoreDial from "@/components/ui/ESGScoreDial";
import Button from "@/components/ui/Button";
import { ArrowRight, Share2, Lock, Calculator, Save } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const industries = [
  { label: "Manufacturing", factor: 1.8 },
  { label: "IT & Technology", factor: 0.4 },
  { label: "Transportation & Logistics", factor: 2.2 },
  { label: "Construction", factor: 1.6 },
  { label: "Banking & Finance", factor: 0.3 },
  { label: "Healthcare", factor: 0.7 },
  { label: "Retail & Consumer", factor: 0.9 },
  { label: "Energy & Utilities", factor: 3.0 },
];

export default function ImpactCalculatorPage() {
  const [formData, setFormData] = useState({
    industry: "",
    employees: "",
    revenue: "",
    energySpend: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const selectedIndustry = industries.find((i) => i.label === formData.industry);

  const footprint = useMemo(() => {
    if (!formData.industry || !formData.energySpend) {
      return { total: 0, scope1: 0, scope2: 0, scope3: 0 };
    }
    const spend = parseFloat(formData.energySpend) || 0;
    const factor = selectedIndustry?.factor || 1;
    const employees = parseFloat(formData.employees) || 50;
    const revenue = parseFloat(formData.revenue) || 0;

    // Scope 1: Direct emissions (facilities, fleet)
    // Assumes base employee footprint scaled by industry emission intensity
    const scope1 = employees * factor * 1.5;

    // Scope 2: Indirect emissions from purchased energy
    // 1 Lakh INR ~ 12,500 kWh. Average grid emission factor ~0.71 tCO2/MWh
    // Adjusted by industry energy intensity multiplier
    const energyIntensity = factor > 1 ? factor * 0.8 : factor;
    const scope2 = spend * 8.875 * energyIntensity;

    // Scope 3: Value chain emissions
    // Heavily dependent on revenue and industry supply chain complexity
    const scope3 = revenue * factor * 14.5;

    const total = scope1 + scope2 + scope3;

    return {
      total: Math.round(total),
      scope1: Math.round(scope1),
      scope2: Math.round(scope2),
      scope3: Math.round(scope3),
    };
  }, [formData, selectedIndustry]);

  const riskScore = useMemo(() => {
    if (!formData.industry) return 0;
    const factor = selectedIndustry?.factor || 1;
    const revenue = parseFloat(formData.revenue) || 0;
    
    // Base risk from industry sector
    const baseRisk = factor * 25; 
    
    // Size and scale risk (revenue)
    const scaleRisk = revenue > 500 ? 40 : revenue > 100 ? 25 : revenue > 25 ? 15 : 5;
    
    // Total exposure estimate
    const totalRisk = baseRisk + scaleRisk;
    
    return Math.min(100, Math.round(totalRisk));
  }, [formData, selectedIndustry]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await addDoc(collection(db, "impact_calculations"), {
        formData,
        footprint,
        riskScore,
        createdAt: serverTimestamp()
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving footprint:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.5]" 
            style={{ backgroundImage: "url('/images/esgassessment.png')" }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FBF8F0] opacity-80" />
        </div>
        
        <div className="absolute inset-0 bg-radial-subtle pointer-events-none" />
        <div className="container-lg relative z-10 text-center">
          <SectionReveal>
            <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest text-gold bg-gold-pale/50 rounded-full mb-6">
              Impact Calculator
            </span>
            <h1 className="text-4xl lg:text-5xl font-display mb-6 max-w-3xl mx-auto">
              Estimate Your Carbon Footprint{" "}
              <span className="gradient-text">& Compliance Risk</span>
            </h1>
            <p className="text-lg text-stone max-w-2xl mx-auto">
              Enter basic business data and get an instant estimate of your annual carbon
              emissions and regulatory exposure — no account required.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding-sm">
        <div className="container-lg">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            {/* Input Form */}
            <SectionReveal>
              <div className="p-8 rounded-2xl bg-white border border-divider/40 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-forest" />
                  </div>
                  <h3 className="font-display text-xl">Business Data</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">Industry Type</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-divider/60 bg-white text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
                    >
                      <option value="">Select industry</option>
                      {industries.map((i) => (
                        <option key={i.label} value={i.label}>{i.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">Employee Count</label>
                    <input
                      type="number"
                      value={formData.employees}
                      onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-divider/60 bg-white text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
                      placeholder="e.g. 150"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">Annual Revenue (₹ Crore)</label>
                    <input
                      type="number"
                      value={formData.revenue}
                      onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-divider/60 bg-white text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
                      placeholder="e.g. 50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Annual Energy / Logistics Spend (₹ Lakhs)
                    </label>
                    <input
                      type="number"
                      value={formData.energySpend}
                      onChange={(e) => {
                        setFormData({ ...formData, energySpend: e.target.value });
                        if (e.target.value) setShowResults(true);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-divider/60 bg-white text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
                      placeholder="e.g. 75"
                    />
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Results */}
            <div className="space-y-6">
              <SectionReveal delay={0.2}>
                <div className="p-8 rounded-2xl bg-white border border-divider/40 shadow-card text-center">
                  <h4 className="font-display text-lg mb-2">Estimated Annual Footprint</h4>
                  <div className="my-6">
                    <motion.span
                      key={footprint.total}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-mono text-5xl font-semibold text-forest"
                    >
                      {footprint.total > 0 ? footprint.total.toLocaleString() : "—"}
                    </motion.span>
                    <span className="block text-stone text-sm mt-2">tCO₂e per year</span>
                  </div>

                  {footprint.total > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-6 mb-4 pt-4 border-t border-divider/40 text-left">
                      <div className="bg-forest/5 p-3 rounded-xl flex flex-col justify-center">
                        <span className="block text-xs text-stone mb-1 font-medium">Scope 1</span>
                        <span className="font-semibold text-charcoal">{footprint.scope1.toLocaleString()} t</span>
                      </div>
                      <div className="bg-forest/5 p-3 rounded-xl flex flex-col justify-center">
                        <span className="block text-xs text-stone mb-1 font-medium">Scope 2</span>
                        <span className="font-semibold text-charcoal">{footprint.scope2.toLocaleString()} t</span>
                      </div>
                      <div className="bg-forest/5 p-3 rounded-xl flex flex-col justify-center">
                        <span className="block text-xs text-stone mb-1 font-medium">Scope 3</span>
                        <span className="font-semibold text-charcoal">{footprint.scope3.toLocaleString()} t</span>
                      </div>
                    </div>
                  )}

                  {footprint.total > 0 && (
                    <p className="text-xs text-stone">
                      Based on multi-factor estimation for {formData.industry}
                    </p>
                  )}
                </div>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <div className="p-8 rounded-2xl bg-white border border-divider/40 shadow-card text-center">
                  <h4 className="font-display text-lg mb-4">Regulatory Risk Meter</h4>
                  <ESGScoreDial
                    score={riskScore}
                    maxScore={100}
                    size={180}
                    strokeWidth={10}
                    showTier={false}
                    label="SEBI / CBAM Exposure"
                  />
                </div>
              </SectionReveal>

              {footprint.total > 0 && (
                <SectionReveal delay={0.4}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="secondary" size="md" className="flex-1" icon={<Share2 className="w-4 h-4" />}>
                      Share on LinkedIn
                    </Button>
                    <Button 
                      variant="primary" 
                      size="md" 
                      className="flex-1" 
                      onClick={handleSaveProfile}
                      disabled={isSaving || saveSuccess}
                      icon={<Save className="w-4 h-4" />}
                    >
                      {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Profile"}
                    </Button>
                  </div>
                </SectionReveal>
              )}

              {/* Paywall */}
              <SectionReveal delay={0.5}>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gold/[0.04] to-transparent border border-gold/20 text-center">
                  <Lock className="w-6 h-6 text-gold mx-auto mb-3" />
                  <h4 className="font-display text-lg mb-2">Unlock Audit-Ready Report</h4>
                  <p className="text-sm text-stone mb-5">
                    Get a detailed, methodology-sourced carbon footprint report with Scope 1/2/3 breakdown.
                  </p>
                  <Button variant="gold" size="md" iconRight={<ArrowRight className="w-4 h-4" />}>
                    Get Full Report
                  </Button>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
