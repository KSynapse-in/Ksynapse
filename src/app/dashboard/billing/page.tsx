"use client";

import { CreditCard, Check, ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import Button from "@/components/ui/Button";

const currentPlan = {
  tier: "Silver", price: "₹50,000", period: "/month", color: "#8C9490",
  features: ["Multi-Framework Reporting", "Carbon Monitoring", "Advisory Access", "Up to 5 Users", "Priority Support"],
  usage: { users: 4, maxUsers: 5, reports: 12, dataEntries: 847 },
};

const invoices = [
  { id: "INV-2026-07", date: "Jul 1, 2026", amount: "₹50,000", status: "Paid", gst: "₹9,000" },
  { id: "INV-2026-06", date: "Jun 1, 2026", amount: "₹50,000", status: "Paid", gst: "₹9,000" },
  { id: "INV-2026-05", date: "May 1, 2026", amount: "₹50,000", status: "Paid", gst: "₹9,000" },
];

export default function BillingPage() {
  return (
    <div className="space-y-6 max-w-[1200px]">
      <div>
        <h1 className="text-2xl font-display">Billing & Subscription</h1>
        <p className="text-sm text-stone mt-1">Manage your plan, usage, and invoices.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Current plan */}
        <div className="bg-white rounded-xl border border-divider/30 p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentPlan.color }} />
              <h3 className="font-display text-lg">{currentPlan.tier} Plan</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-2xl font-semibold" style={{ color: currentPlan.color }}>{currentPlan.price}</span>
              <span className="text-xs text-stone">{currentPlan.period}</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {currentPlan.features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-sage" />
                <span className="text-sm text-charcoal">{f}</span>
              </div>
            ))}
          </div>

          {/* Usage */}
          <div className="p-4 rounded-xl bg-parchment/50 border border-divider/20 mb-5">
            <h4 className="text-xs font-mono text-stone uppercase tracking-wider mb-3">Current Usage</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="font-mono text-lg font-semibold text-charcoal">{currentPlan.usage.users}/{currentPlan.usage.maxUsers}</span>
                <p className="text-[10px] text-stone">Team Members</p>
              </div>
              <div>
                <span className="font-mono text-lg font-semibold text-charcoal">{currentPlan.usage.reports}</span>
                <p className="text-[10px] text-stone">Reports Generated</p>
              </div>
              <div>
                <span className="font-mono text-lg font-semibold text-charcoal">{currentPlan.usage.dataEntries}</span>
                <p className="text-[10px] text-stone">Data Entries</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="gold" size="md" iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}>
              Upgrade to Gold
            </Button>
            <Button variant="ghost" size="md">Manage Plan</Button>
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white rounded-xl border border-divider/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base">GST Invoices</h3>
            <CreditCard className="w-4 h-4 text-stone" />
          </div>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg bg-parchment/30 border border-divider/15">
                <div>
                  <p className="text-sm font-medium text-charcoal">{inv.amount}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-stone">{inv.id}</span>
                    <span className="text-[10px] text-stone">{inv.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-sage bg-sage/10 px-2 py-0.5 rounded-full">{inv.status}</span>
                  <button className="w-7 h-7 rounded hover:bg-parchment flex items-center justify-center text-stone">
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-center text-xs text-forest hover:text-gold transition-colors py-2">
            View All Invoices →
          </button>
        </div>
      </div>
    </div>
  );
}
