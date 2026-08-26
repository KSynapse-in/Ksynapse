"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BarChart3, Leaf, ShieldCheck, FileText,
  MessageSquare, Users, CreditCard, Settings, User,
  Bell, ChevronDown, Search, Menu, X, LogOut,
} from "lucide-react";

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "KPI Tracking", href: "/dashboard/kpis", icon: BarChart3 },
  { label: "Carbon Monitoring", href: "/dashboard/carbon", icon: Leaf },
  { label: "Compliance Tracking", href: "/dashboard/compliance", icon: ShieldCheck },
  { label: "Reports & Exports", href: "/dashboard/reports", icon: FileText },
  { label: "Advisory", href: "/dashboard/advisory", icon: MessageSquare },
  { label: "Team & Roles", href: "/dashboard/team", icon: Users },
  { label: "Billing & Subscription", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F5F3EE]">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-forest-deep flex flex-col transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        {/* Logo */}
        <div className="p-5 flex items-center gap-2 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="12" cy="14" r="2" fill="white" />
            </svg>
          </div>
          <span className="font-display text-white text-lg tracking-tight">KSynapse</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="space-y-0.5 px-3">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 w-[3px] h-6 bg-gold rounded-r-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Tier badge */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gold/10">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-xs text-gold font-mono">Silver Tier</span>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-charcoal/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-divider/30 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-parchment"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Org switcher */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-parchment transition-colors text-sm">
              <div className="w-6 h-6 rounded bg-forest/10 flex items-center justify-center text-[10px] font-mono text-forest font-semibold">
                PC
              </div>
              <span className="font-medium text-charcoal hidden sm:block">PrecisionCast Industries</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-parchment text-stone">
              <Search className="w-4 h-4" />
            </button>

            {/* Notifications */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-parchment text-stone">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brick rounded-full" />
            </button>

            {/* Profile */}
            <button className="flex items-center gap-2 ml-1 px-2 py-1 rounded-lg hover:bg-parchment transition-colors">
              <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center text-xs font-semibold text-sage">
                AK
              </div>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
