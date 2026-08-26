"use client";

import { motion } from "framer-motion";
import ESGScoreDial from "@/components/ui/ESGScoreDial";
import { ShieldCheck, FileText, Bell, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

const frameworks = [
  { name: "BRSR", completion: 72, totalClauses: 48, completedClauses: 35, status: "In Progress", color: "#16332A" },
  { name: "GRI", completion: 58, totalClauses: 36, completedClauses: 21, status: "In Progress", color: "#5C7A66" },
  { name: "SASB", completion: 45, totalClauses: 28, completedClauses: 13, status: "Started", color: "#A9793B" },
  { name: "TCFD", completion: 35, totalClauses: 20, completedClauses: 7, status: "Started", color: "#8C9490" },
  { name: "CDP", completion: 62, totalClauses: 32, completedClauses: 20, status: "In Progress", color: "#8A5A3B" },
];

const reminders = [
  { text: "BRSR Section C — Principal 6 disclosures due", date: "Aug 15, 2026", urgent: true },
  { text: "CDP Climate Change questionnaire responses", date: "Oct 1, 2026", urgent: true },
  { text: "GRI 302 Energy disclosure data upload", date: "Sep 30, 2026", urgent: false },
  { text: "Annual governance review documentation", date: "Nov 15, 2026", urgent: false },
];

export default function ComplianceTrackingPage() {
  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display">Compliance Tracking</h1>
          <p className="text-sm text-stone mt-1">Monitor framework compliance with per-clause completion tracking.</p>
        </div>
        <Button variant="primary" size="sm" icon={<FileText className="w-3.5 h-3.5" />}>
          Document Vault
        </Button>
      </div>

      {/* Framework completion dials */}
      <div className="grid sm:grid-cols-5 gap-4">
        {frameworks.map((fw, i) => (
          <motion.div
            key={fw.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl border border-divider/30 p-5 text-center hover:shadow-subtle transition-shadow cursor-pointer"
          >
            <ESGScoreDial score={fw.completion} maxScore={100} size={100} strokeWidth={7} showTier={false} />
            <h4 className="font-mono text-sm font-semibold mt-3" style={{ color: fw.color }}>{fw.name}</h4>
            <p className="text-[10px] text-stone mt-1">{fw.completedClauses}/{fw.totalClauses} clauses</p>
            <span className={`inline-block mt-2 px-2 py-0.5 text-[9px] font-mono uppercase rounded-full ${
              fw.completion > 60 ? "text-sage bg-sage/10" : "text-gold bg-gold/10"
            }`}>
              {fw.status}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Detailed breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-divider/30 overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-divider/20">
          <h3 className="font-display text-base">Clause-Level Progress</h3>
        </div>
        <div className="divide-y divide-divider/10">
          {frameworks.map((fw) => (
            <div key={fw.name} className="px-5 py-4 flex items-center gap-4 hover:bg-parchment/20 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${fw.color}10` }}>
                <span className="font-mono text-xs font-semibold" style={{ color: fw.color }}>{fw.name}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-charcoal">{fw.name} Compliance</span>
                  <span className="text-xs font-mono" style={{ color: fw.color }}>{fw.completion}%</span>
                </div>
                <div className="h-2 bg-divider/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: fw.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${fw.completion}%` }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone flex-shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Automated reminders */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl border border-divider/30 p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-gold" />
          <h3 className="font-display text-base">Upcoming Compliance Actions</h3>
        </div>
        <div className="space-y-3">
          {reminders.map((r) => (
            <div key={r.text} className="flex items-center justify-between p-3 rounded-lg bg-parchment/30 border border-divider/15">
              <div className="flex items-center gap-3">
                {r.urgent && <div className="w-2 h-2 rounded-full bg-brick flex-shrink-0" />}
                <span className="text-sm text-charcoal">{r.text}</span>
              </div>
              <span className="text-xs font-mono text-stone flex-shrink-0 ml-3">{r.date}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
