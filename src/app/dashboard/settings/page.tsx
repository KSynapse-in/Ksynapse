"use client";

import { Bell, Globe, Shield, Trash2, Download } from "lucide-react";
import Button from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-[800px]">
      <div>
        <h1 className="text-2xl font-display">Settings</h1>
        <p className="text-sm text-stone mt-1">Manage organisation profile, notifications, and data controls.</p>
      </div>

      {/* Organisation Profile */}
      <div className="bg-white rounded-xl border border-divider/30 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Globe className="w-4 h-4 text-forest" />
          <h3 className="font-display text-base">Organisation Profile</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Organisation Name", value: "PrecisionCast Industries Pvt. Ltd." },
            { label: "Industry", value: "Manufacturing" },
            { label: "Company Size", value: "Medium Enterprise (51–250 Employees)" },
            { label: "Country", value: "India" },
            { label: "Annual Revenue", value: "₹25–₹100 Crore" },
          ].map((field) => (
            <div key={field.label} className="flex items-center justify-between py-2 border-b border-divider/10 last:border-0">
              <span className="text-sm text-stone">{field.label}</span>
              <span className="text-sm text-charcoal font-medium">{field.value}</span>
            </div>
          ))}
        </div>
        <Button variant="secondary" size="sm" className="mt-4">Edit Profile</Button>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-divider/30 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-4 h-4 text-gold" />
          <h3 className="font-display text-base">Notification Preferences</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Compliance deadline reminders", enabled: true },
            { label: "Weekly ESG performance digest", enabled: true },
            { label: "Framework update alerts", enabled: true },
            { label: "Team activity notifications", enabled: false },
            { label: "Marketing & product updates", enabled: false },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between py-2">
              <span className="text-sm text-charcoal">{pref.label}</span>
              <button className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                pref.enabled ? "bg-forest" : "bg-divider"
              }`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                  pref.enabled ? "translate-x-5" : "translate-x-1"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Controls */}
      <div className="bg-white rounded-xl border border-divider/30 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-4 h-4 text-sage" />
          <h3 className="font-display text-base">Data & Privacy (DPDP Act Compliance)</h3>
        </div>
        <p className="text-sm text-stone mb-4">
          KSynapse is compliant with the Digital Personal Data Protection Act, 2023. You have full control over your data.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
            Export All Data
          </Button>
          <Button variant="ghost" size="sm" icon={<Trash2 className="w-3.5 h-3.5 text-brick" />} className="!text-brick hover:!text-brick hover:!bg-brick/5">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
