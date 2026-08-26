"use client";

import { motion } from "framer-motion";
import { Leaf, Upload, TrendingDown, AlertTriangle, Flame, Zap, Truck } from "lucide-react";
import Button from "@/components/ui/Button";

const emissionsData = [
  { month: "Jan", scope1: 72, scope2: 35, scope3: 18 },
  { month: "Feb", scope1: 68, scope2: 33, scope3: 20 },
  { month: "Mar", scope1: 75, scope2: 36, scope3: 19 },
  { month: "Apr", scope1: 65, scope2: 31, scope3: 17 },
  { month: "May", scope1: 70, scope2: 34, scope3: 22 },
  { month: "Jun", scope1: 62, scope2: 29, scope3: 16 },
];

const scopeBreakdown = [
  { scope: "Scope 1", description: "Direct emissions from owned sources", value: "842", unit: "tCO₂e", icon: Flame, color: "#8A5A3B", percentage: 67 },
  { scope: "Scope 2", description: "Indirect emissions from purchased energy", value: "405", unit: "tCO₂e", icon: Zap, color: "#A9793B", percentage: 32 },
  { scope: "Scope 3", description: "Value chain emissions", value: "128", unit: "tCO₂e", icon: Truck, color: "#5C7A66", percentage: 10 },
];

export default function CarbonMonitoringPage() {
  const totalEmissions = 1247;
  const maxBar = Math.max(...emissionsData.map((d) => d.scope1 + d.scope2 + d.scope3));

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display">Carbon Monitoring</h1>
          <p className="text-sm text-stone mt-1">Track emissions across Scope 1, 2, and 3 with utility bill uploads.</p>
        </div>
        <Button variant="primary" size="sm" icon={<Upload className="w-3.5 h-3.5" />}>
          Upload Utility Bill
        </Button>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-divider/30 p-5 sm:col-span-1">
          <Leaf className="w-5 h-5 text-sage mb-2" />
          <span className="font-mono text-3xl font-semibold text-charcoal block">{totalEmissions.toLocaleString()}</span>
          <p className="text-xs text-stone mt-1">Total tCO₂e (YTD)</p>
          <div className="flex items-center gap-1 mt-2 text-sage text-xs font-mono">
            <TrendingDown className="w-3 h-3" /> 8.3% vs last year
          </div>
        </motion.div>

        {scopeBreakdown.map((scope, i) => (
          <motion.div
            key={scope.scope}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i + 1) * 0.08 }}
            className="bg-white rounded-xl border border-divider/30 p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <scope.icon className="w-4 h-4" style={{ color: scope.color }} />
              <span className="text-xs font-mono" style={{ color: scope.color }}>{scope.scope}</span>
            </div>
            <span className="font-mono text-xl font-semibold text-charcoal block">{scope.value}</span>
            <p className="text-[10px] text-stone mt-0.5">{scope.description}</p>
            <div className="mt-2 h-1.5 bg-divider/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: scope.color }}
                initial={{ width: 0 }}
                animate={{ width: `${scope.percentage}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Monthly trend chart (simplified bar chart) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-divider/30 p-6"
      >
        <h3 className="font-display text-base mb-5">Monthly Emissions Trend</h3>
        <div className="flex items-end gap-3 h-48">
          {emissionsData.map((month, i) => {
            const total = month.scope1 + month.scope2 + month.scope3;
            const heightPct = (total / maxBar) * 100;
            return (
              <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-stone">{total}</span>
                <motion.div
                  className="w-full rounded-t-md overflow-hidden flex flex-col-reverse"
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="bg-[#8A5A3B]" style={{ height: `${(month.scope1 / total) * 100}%` }} />
                  <div className="bg-[#A9793B]" style={{ height: `${(month.scope2 / total) * 100}%` }} />
                  <div className="bg-[#5C7A66]" style={{ height: `${(month.scope3 / total) * 100}%` }} />
                </motion.div>
                <span className="text-xs text-stone">{month.month}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 justify-center">
          {[{ label: "Scope 1", color: "#8A5A3B" }, { label: "Scope 2", color: "#A9793B" }, { label: "Scope 3", color: "#5C7A66" }].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
              <span className="text-xs text-stone">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CBAM Flag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gold/5 border border-gold/20 rounded-xl p-5 flex items-start gap-3"
      >
        <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-charcoal">CBAM Export Exposure Detected</h4>
          <p className="text-xs text-stone mt-1">
            Based on your industry (Manufacturing) and emission profile, your exports may be subject to the EU Carbon Border Adjustment Mechanism.
            We recommend preparing CBAM-compliant carbon accounting documentation.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
