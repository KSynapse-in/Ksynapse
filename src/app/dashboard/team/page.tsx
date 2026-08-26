"use client";

import { motion } from "framer-motion";
import { Users, Plus, Shield, Edit3, Eye, MoreHorizontal } from "lucide-react";
import Button from "@/components/ui/Button";

const teamMembers = [
  { name: "Arun Kumar", email: "arun@precisioncast.co", role: "Org Admin", lastActive: "2 min ago", avatar: "AK" },
  { name: "Priya Sharma", email: "priya@precisioncast.co", role: "Editor", lastActive: "1 hour ago", avatar: "PS" },
  { name: "Rahul Mehta", email: "rahul@precisioncast.co", role: "Editor", lastActive: "3 hours ago", avatar: "RM" },
  { name: "Sneha Patil", email: "sneha@precisioncast.co", role: "Viewer", lastActive: "1 day ago", avatar: "SP" },
];

const roleDescriptions: Record<string, { label: string; color: string; bg: string }> = {
  "Org Admin": { label: "Full access", color: "text-forest", bg: "bg-forest/10" },
  "Editor": { label: "Edit access", color: "text-gold", bg: "bg-gold/10" },
  "Viewer": { label: "View only", color: "text-stone", bg: "bg-stone/10" },
};

export default function TeamPage() {
  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display">Team & Roles</h1>
          <p className="text-sm text-stone mt-1">Manage team members, assign roles, and control access.</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
          Invite Member
        </Button>
      </div>

      {/* Role summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        {Object.entries(roleDescriptions).map(([role, config]) => (
          <div key={role} className={`p-4 rounded-xl ${config.bg} border border-transparent`}>
            <div className="flex items-center gap-2 mb-1">
              <Shield className={`w-4 h-4 ${config.color}`} />
              <span className={`text-sm font-medium ${config.color}`}>{role}</span>
            </div>
            <p className="text-xs text-stone">{config.label}</p>
          </div>
        ))}
      </div>

      {/* Team list */}
      <div className="bg-white rounded-xl border border-divider/30 overflow-hidden">
        <div className="divide-y divide-divider/10">
          {teamMembers.map((member, i) => {
            const roleConfig = roleDescriptions[member.role];
            return (
              <motion.div
                key={member.email}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-5 py-4 flex items-center justify-between hover:bg-parchment/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center text-xs font-semibold text-sage">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">{member.name}</p>
                    <p className="text-xs text-stone">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-stone hidden sm:block">{member.lastActive}</span>
                  <span className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded-full ${roleConfig.bg} ${roleConfig.color}`}>
                    {member.role}
                  </span>
                  <button className="w-8 h-8 rounded-lg hover:bg-parchment flex items-center justify-center text-stone">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
