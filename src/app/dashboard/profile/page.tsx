"use client";

import { User, Mail, Lock, Shield } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-[800px]">
      <div>
        <h1 className="text-2xl font-display">Profile</h1>
        <p className="text-sm text-stone mt-1">Manage your personal account details and security.</p>
      </div>

      {/* Personal Details */}
      <div className="bg-white rounded-xl border border-divider/30 p-6">
        <div className="flex items-center gap-2 mb-5">
          <User className="w-4 h-4 text-forest" />
          <h3 className="font-display text-base">Personal Details</h3>
        </div>
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center text-xl font-semibold text-sage">
            AK
          </div>
          <div>
            <p className="text-base font-medium text-charcoal">Arun Kumar</p>
            <p className="text-sm text-stone">Org Admin · PrecisionCast Industries</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-stone mb-1">Full Name</label>
            <input type="text" defaultValue="Arun Kumar" className="w-full px-4 py-2.5 rounded-xl border border-divider/40 bg-ivory text-sm focus:outline-none focus:border-forest transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-stone mb-1">Email</label>
            <input type="email" defaultValue="arun@precisioncast.co" className="w-full px-4 py-2.5 rounded-xl border border-divider/40 bg-ivory text-sm focus:outline-none focus:border-forest transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-stone mb-1">Phone</label>
            <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2.5 rounded-xl border border-divider/40 bg-ivory text-sm focus:outline-none focus:border-forest transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-stone mb-1">Designation</label>
            <input type="text" defaultValue="Head of Operations" className="w-full px-4 py-2.5 rounded-xl border border-divider/40 bg-ivory text-sm focus:outline-none focus:border-forest transition-colors" />
          </div>
        </div>
        <Button variant="primary" size="sm" className="mt-5">Save Changes</Button>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-divider/30 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Lock className="w-4 h-4 text-gold" />
          <h3 className="font-display text-base">Password & Security</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-stone mb-1">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-divider/40 bg-ivory text-sm focus:outline-none focus:border-forest transition-colors" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-stone mb-1">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-divider/40 bg-ivory text-sm focus:outline-none focus:border-forest transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-stone mb-1">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-divider/40 bg-ivory text-sm focus:outline-none focus:border-forest transition-colors" />
            </div>
          </div>
        </div>
        <Button variant="secondary" size="sm" className="mt-5">Update Password</Button>

        <div className="mt-6 pt-5 border-t border-divider/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sage" />
              <div>
                <p className="text-sm font-medium text-charcoal">Two-Factor Authentication</p>
                <p className="text-xs text-stone">Add extra security to your account</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Enable MFA</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
