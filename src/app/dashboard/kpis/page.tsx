"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Plus, Filter, Target, BarChart3 } from "lucide-react";
import Button from "@/components/ui/Button";

const kpis = [
  { id: 1, name: "GHG Emissions (Scope 1)", category: "Environmental", value: "842", unit: "tCO₂e", target: "750", trend: -5.2, status: "warning" },
  { id: 2, name: "GHG Emissions (Scope 2)", category: "Environmental", value: "405", unit: "tCO₂e", target: "380", trend: -8.1, status: "on-track" },
  { id: 3, name: "Energy Intensity", category: "Environmental", value: "0.42", unit: "GJ/₹L", target: "0.38", trend: -3.4, status: "warning" },
  { id: 4, name: "Water Consumption", category: "Environmental", value: "12,400", unit: "kL", target: "11,000", trend: -2.1, status: "at-risk" },
  { id: 5, name: "Waste Diverted", category: "Environmental", value: "78", unit: "%", target: "85", trend: 6.0, status: "on-track" },
  { id: 6, name: "Employee Training Hours", category: "Social", value: "24.5", unit: "hrs/emp", target: "30", trend: 12.0, status: "on-track" },
  { id: 7, name: "Gender Diversity", category: "Social", value: "32", unit: "%", target: "40", trend: 3.5, status: "warning" },
  { id: 8, name: "Safety Incidents", category: "Social", value: "3", unit: "incidents", target: "0", trend: -25.0, status: "on-track" },
  { id: 9, name: "Board ESG Meetings", category: "Governance", value: "2", unit: "/year", target: "4", trend: 0, status: "at-risk" },
  { id: 10, name: "Policy Compliance", category: "Governance", value: "87", unit: "%", target: "95", trend: 4.2, status: "warning" },
];

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  "on-track": { bg: "bg-sage/10", text: "text-sage", label: "On Track" },
  "warning": { bg: "bg-gold/10", text: "text-gold", label: "Warning" },
  "at-risk": { bg: "bg-brick/10", text: "text-brick", label: "At Risk" },
};

export default function KPITrackingPage() {
  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display">KPI Tracking</h1>
          <p className="text-sm text-stone mt-1">Monitor, set targets, and track progress on ESG key performance indicators.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>Filter</Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add KPI</Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "On Track", count: 5, color: "text-sage", bg: "bg-sage/5", border: "border-sage/20" },
          { label: "Warning", count: 3, color: "text-gold", bg: "bg-gold/5", border: "border-gold/20" },
          { label: "At Risk", count: 2, color: "text-brick", bg: "bg-brick/5", border: "border-brick/20" },
        ].map((s) => (
          <div key={s.label} className={`p-4 rounded-xl ${s.bg} border ${s.border}`}>
            <span className={`font-mono text-2xl font-semibold ${s.color}`}>{s.count}</span>
            <p className={`text-xs mt-1 ${s.color}`}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* KPI Table */}
      <div className="bg-white rounded-xl border border-divider/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-divider/20 bg-parchment/30">
                <th className="text-left px-5 py-3 text-xs font-mono text-stone uppercase tracking-wider">KPI</th>
                <th className="text-left px-5 py-3 text-xs font-mono text-stone uppercase tracking-wider">Category</th>
                <th className="text-right px-5 py-3 text-xs font-mono text-stone uppercase tracking-wider">Current</th>
                <th className="text-right px-5 py-3 text-xs font-mono text-stone uppercase tracking-wider">Target</th>
                <th className="text-right px-5 py-3 text-xs font-mono text-stone uppercase tracking-wider">Trend</th>
                <th className="text-center px-5 py-3 text-xs font-mono text-stone uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi, i) => {
                const status = statusColors[kpi.status];
                return (
                  <motion.tr
                    key={kpi.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-divider/10 hover:bg-parchment/20 transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3.5 font-medium text-charcoal">{kpi.name}</td>
                    <td className="px-5 py-3.5 text-stone">{kpi.category}</td>
                    <td className="px-5 py-3.5 text-right font-mono font-medium">{kpi.value} <span className="text-stone text-xs">{kpi.unit}</span></td>
                    <td className="px-5 py-3.5 text-right font-mono text-stone">{kpi.target}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={`inline-flex items-center gap-1 font-mono text-xs ${kpi.trend > 0 ? "text-sage" : kpi.trend < 0 ? "text-brick" : "text-stone"}`}>
                        {kpi.trend > 0 ? <TrendingUp className="w-3 h-3" /> : kpi.trend < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                        {kpi.trend !== 0 ? `${Math.abs(kpi.trend)}%` : "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
