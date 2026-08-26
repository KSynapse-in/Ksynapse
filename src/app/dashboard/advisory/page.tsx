"use client";

import { MessageSquare, Calendar, User, Send } from "lucide-react";
import Button from "@/components/ui/Button";

const messages = [
  { from: "advisor", name: "Meera Krishnan", text: "I've reviewed your BRSR draft. The Section C disclosures look strong, but we need to strengthen Principal 6 (environment). I've added specific recommendations to your Quick Wins.", time: "Today, 2:15 PM" },
  { from: "user", name: "You", text: "Thanks Meera. We've started tracking Scope 3 emissions this quarter — should we include preliminary data in the report?", time: "Today, 10:30 AM" },
  { from: "advisor", name: "Meera Krishnan", text: "Yes, include it with a methodology note. Even preliminary Scope 3 data shows maturity to assessors. I'll send a template for the methodology disclosure.", time: "Yesterday, 4:45 PM" },
];

export default function AdvisoryPage() {
  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display">Advisory</h1>
          <p className="text-sm text-stone mt-1">Connect with your assigned ESG advisor for expert guidance.</p>
        </div>
        <Button variant="primary" size="sm" icon={<Calendar className="w-3.5 h-3.5" />}>
          Book Consultation
        </Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Message thread */}
        <div className="bg-white rounded-xl border border-divider/30 flex flex-col" style={{ minHeight: 500 }}>
          {/* Advisor header */}
          <div className="px-5 py-4 border-b border-divider/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sm font-semibold text-sage">
              MK
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">Meera Krishnan</p>
              <p className="text-xs text-stone">Senior ESG Advisor · Manufacturing Specialist</p>
            </div>
            <span className="ml-auto px-2 py-0.5 text-[10px] font-mono text-sage bg-sage/10 rounded-full">Online</span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                  msg.from === "user"
                    ? "bg-forest text-white rounded-br-md"
                    : "bg-parchment text-charcoal rounded-bl-md"
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                  <span className={`text-[10px] mt-1.5 block ${msg.from === "user" ? "text-white/50" : "text-stone"}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-divider/20">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-divider/40 bg-ivory text-sm focus:outline-none focus:border-forest transition-colors"
              />
              <Button variant="primary" size="sm" icon={<Send className="w-3.5 h-3.5" />}>
                Send
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-divider/30 p-5">
            <h4 className="font-display text-sm mb-3">Your Advisor</h4>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-base font-semibold text-sage">
                MK
              </div>
              <div>
                <p className="text-sm font-medium">Meera Krishnan</p>
                <p className="text-xs text-stone">12 years ESG experience</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-stone">
              <p><strong className="text-charcoal">Specialisation:</strong> Manufacturing, Export Compliance</p>
              <p><strong className="text-charcoal">Frameworks:</strong> BRSR, GRI, CBAM</p>
              <p><strong className="text-charcoal">Availability:</strong> Silver & Gold tiers</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-divider/30 p-5">
            <h4 className="font-display text-sm mb-3">Upcoming Sessions</h4>
            <div className="p-3 rounded-lg bg-gold/5 border border-gold/15">
              <p className="text-sm font-medium text-charcoal">Quarterly ESG Review</p>
              <p className="text-xs text-stone mt-1">Aug 15, 2026 · 3:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
