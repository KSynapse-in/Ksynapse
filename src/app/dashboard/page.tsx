"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ESGScoreDial from "@/components/ui/ESGScoreDial";
import Button from "@/components/ui/Button";
import OnboardingWizard from "@/components/dashboard/OnboardingWizard";
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock,
  ArrowRight, Leaf, Users, ShieldCheck, Zap, Calendar, FileText, Sparkles
} from "lucide-react";

const kpiCards = [
  { label: "Carbon Emissions", value: "1,247", unit: "tCO₂e", change: -8.3, icon: Leaf, color: "#5C7A66" },
  { label: "Energy Consumed", value: "4.2", unit: "GWh", change: -3.1, icon: Zap, color: "#A9793B" },
  { label: "Employee Training", value: "89", unit: "%", change: 12, icon: Users, color: "#16332A" },
  { label: "Compliance Score", value: "74", unit: "/100", change: 5.2, icon: ShieldCheck, color: "#8C9490" },
];

const recentActivity = [
  { action: "BRSR Report draft generated", time: "2 hours ago", type: "report" },
  { action: "Scope 2 data updated for Q2", time: "5 hours ago", type: "data" },
  { action: "New compliance alert: SEBI update", time: "1 day ago", type: "alert" },
  { action: "Team member Priya added as Editor", time: "2 days ago", type: "team" },
  { action: "Monthly carbon report exported", time: "3 days ago", type: "report" },
];

const upcomingDeadlines = [
  { framework: "BRSR", deadline: "Dec 31, 2026", daysLeft: 147, urgency: "medium" },
  { framework: "CDP", deadline: "Oct 15, 2026", daysLeft: 70, urgency: "high" },
  { framework: "GRI", deadline: "Mar 31, 2027", daysLeft: 237, urgency: "low" },
];

const quickWins = [
  { task: "Upload utility bills for Scope 2 tracking", impact: "High", done: false },
  { task: "Complete D&I policy documentation", impact: "Medium", done: false },
  { task: "Set carbon reduction targets for FY27", impact: "High", done: true },
  { task: "Schedule board ESG review meeting", impact: "Medium", done: false },
];

export default function DashboardOverview() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="space-y-6 max-w-[1200px] relative">
      {/* Onboarding Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingWizard
            onComplete={() => setShowOnboarding(false)}
            onClose={() => setShowOnboarding(false)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display">Dashboard Overview</h1>
          <p className="text-sm text-stone mt-1">Welcome back. Here&apos;s your ESG performance summary.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOnboarding(true)}
            icon={<Sparkles className="w-3.5 h-3.5 text-gold" />}
            className="!border !border-gold/30 hover:!bg-gold/10"
          >
            Setup Guide
          </Button>
          <span className="px-3 py-1.5 text-xs font-mono text-stone bg-white rounded-lg border border-divider/30">
            Last updated: 2 hrs ago
          </span>
        </div>
      </div>

      {/* Score + KPI Row */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Central ESG Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-divider/30 p-6 flex flex-col items-center justify-center"
        >
          <ESGScoreDial score={72} maxScore={100} size={200} strokeWidth={10} />
          <p className="text-xs text-stone mt-4 font-mono">Overall ESG Maturity</p>
        </motion.div>

        {/* KPI Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {kpiCards.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.2 }}
              className="bg-white rounded-xl border border-divider/30 p-5 hover:shadow-subtle transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}10` }}>
                  <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-mono ${
                  kpi.change > 0 ? "text-sage" : "text-brick"
                }`}>
                  {kpi.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(kpi.change)}%
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-2xl font-semibold text-charcoal">{kpi.value}</span>
                <span className="text-xs text-stone">{kpi.unit}</span>
              </div>
              <p className="text-xs text-stone mt-1">{kpi.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Three-column row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Wins */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-divider/30 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base">Quick Wins</h3>
            <Zap className="w-4 h-4 text-gold" />
          </div>
          <div className="space-y-3">
            {quickWins.map((win) => (
              <div key={win.task} className="flex items-start gap-3">
                <button className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
                  win.done ? "bg-sage border-sage" : "border-divider hover:border-sage"
                }`}>
                  {win.done && <CheckCircle className="w-3 h-3 text-white" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-snug ${win.done ? "text-stone line-through" : "text-charcoal"}`}>
                    {win.task}
                  </p>
                  <span className={`text-[10px] font-mono mt-0.5 block ${
                    win.impact === "High" ? "text-gold" : "text-stone"
                  }`}>
                    {win.impact} Impact
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-divider/30 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base">Compliance Deadlines</h3>
            <Calendar className="w-4 h-4 text-brick" />
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((dl) => (
              <div key={dl.framework} className="flex items-center justify-between p-3 rounded-lg bg-parchment/50 border border-divider/20">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-forest w-12">{dl.framework}</span>
                  <div>
                    <p className="text-sm text-charcoal">{dl.deadline}</p>
                    <p className={`text-[10px] font-mono ${
                      dl.urgency === "high" ? "text-brick" : dl.urgency === "medium" ? "text-gold" : "text-sage"
                    }`}>
                      {dl.daysLeft} days left
                    </p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  dl.urgency === "high" ? "bg-brick" : dl.urgency === "medium" ? "bg-gold" : "bg-sage"
                }`} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border border-divider/30 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base">Recent Activity</h3>
            <Clock className="w-4 h-4 text-stone" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  activity.type === "alert" ? "bg-brick" : activity.type === "report" ? "bg-gold" : "bg-sage"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-charcoal leading-snug">{activity.action}</p>
                  <span className="text-[10px] text-stone font-mono">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pillar Scores */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl border border-divider/30 p-6"
      >
        <h3 className="font-display text-base mb-5">Pillar-wise Performance</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { label: "Environmental", score: 31, max: 40, color: "#5C7A66", items: ["Emissions: 6/8", "Energy: 5/6", "Water: 4/5", "Waste: 4/5", "Targets: 4/6", "Renewables: 3/4", "Risk: 2/3", "KPIs: 3/3"] },
            { label: "Social", score: 22, max: 30, color: "#A9793B", items: ["D&I: 4/5", "Training: 3/4", "H&S: 4/6", "Satisfaction: 3/4", "CSR: 2/3", "Anti-harassment: 3/4", "Turnover: 3/4"] },
            { label: "Governance", score: 19, max: 30, color: "#16332A", items: ["Ethics: 4/5", "Board ESG: 2/5", "Audits: 3/4", "Anti-corruption: 4/5", "Cyber: 3/4", "Whistleblower: 1/3", "Risk: 1/2", "Reporting: 1/2"] },
          ].map((pillar) => (
            <div key={pillar.label} className="text-center">
              <ESGScoreDial score={pillar.score} maxScore={pillar.max} size={120} strokeWidth={8} showTier={false} />
              <h4 className="font-display text-sm mt-3" style={{ color: pillar.color }}>{pillar.label}</h4>
              <p className="text-xs text-stone font-mono mt-0.5">{pillar.score}/{pillar.max} points</p>
              <div className="mt-3 space-y-1">
                {pillar.items.slice(0, 4).map((item) => (
                  <div key={item} className="text-[10px] text-stone flex items-center justify-between px-2">
                    <span>{item.split(":")[0]}</span>
                    <span className="font-mono">{item.split(":")[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
