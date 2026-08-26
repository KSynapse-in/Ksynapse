"use client";

import { motion } from "framer-motion";
import { FileText, Download, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const reports = [
  { id: 1, name: "BRSR Annual Report FY2026", framework: "BRSR", status: "Generated", date: "Jul 28, 2026", size: "2.4 MB" },
  { id: 2, name: "GRI Sustainability Report", framework: "GRI", status: "Draft", date: "Jul 15, 2026", size: "1.8 MB" },
  { id: 3, name: "Carbon Footprint Report Q2", framework: "CDP", status: "Generated", date: "Jul 5, 2026", size: "890 KB" },
  { id: 4, name: "ESG Executive Summary", framework: "All", status: "Generated", date: "Jun 30, 2026", size: "1.2 MB" },
  { id: 5, name: "SASB Industry Report", framework: "SASB", status: "Pending", date: "—", size: "—" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display">Reports & Exports</h1>
          <p className="text-sm text-stone mt-1">Generate framework-aligned reports and export data in PDF/Excel format.</p>
        </div>
        <Button variant="primary" size="sm" icon={<FileText className="w-3.5 h-3.5" />}>
          Generate BRSR Draft
        </Button>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "One-Click BRSR", description: "Generate a complete BRSR-aligned report", icon: FileText, color: "#16332A" },
          { label: "PDF Export", description: "Export any report as a formatted PDF", icon: Download, color: "#A9793B" },
          { label: "Excel Export", description: "Download raw data in spreadsheet format", icon: Download, color: "#5C7A66" },
        ].map((action) => (
          <motion.button
            key={action.label}
            whileHover={{ y: -2 }}
            className="p-5 rounded-xl bg-white border border-divider/30 text-left hover:shadow-subtle transition-all cursor-pointer"
          >
            <action.icon className="w-5 h-5 mb-3" style={{ color: action.color }} />
            <h4 className="font-display text-sm mb-1">{action.label}</h4>
            <p className="text-xs text-stone">{action.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Reports list */}
      <div className="bg-white rounded-xl border border-divider/30 overflow-hidden">
        <div className="px-5 py-4 border-b border-divider/20 flex items-center justify-between">
          <h3 className="font-display text-base">Generated Reports</h3>
          <span className="text-xs font-mono text-stone">Audit Trail Active</span>
        </div>
        <div className="divide-y divide-divider/10">
          {reports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="px-5 py-4 flex items-center justify-between hover:bg-parchment/20 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <FileText className="w-4 h-4 text-stone flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-charcoal truncate">{report.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-forest bg-forest/5 px-1.5 py-0.5 rounded">{report.framework}</span>
                    <span className="text-[10px] text-stone">{report.date}</span>
                    <span className="text-[10px] text-stone">{report.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                  report.status === "Generated" ? "text-sage bg-sage/10" :
                  report.status === "Draft" ? "text-gold bg-gold/10" : "text-stone bg-stone/10"
                }`}>{report.status}</span>
                {report.status !== "Pending" && (
                  <button className="w-8 h-8 rounded-lg hover:bg-parchment flex items-center justify-center text-stone hover:text-forest transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
