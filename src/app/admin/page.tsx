"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Building2, Mail, Calculator, FileText,
  Users, Bell, LayoutDashboard, Activity, BookOpen, Clock, Key
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Data States
  const [contacts, setContacts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [impacts, setImpacts] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [launchSubs, setLaunchSubs] = useState<any[]>([]);
  const [caseStudyReqs, setCaseStudyReqs] = useState<any[]>([]);
  const [passwordResets, setPasswordResets] = useState<any[]>([]);

  useEffect(() => {
    const subscribe = (colName: string, setter: any, timeField: string = "createdAt") => {
      const q = query(collection(db, colName), orderBy(timeField, "desc"), limit(100));
      return onSnapshot(q, (snapshot) => {
        setter(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    };

    const unsubContacts = subscribe("contacts", setContacts);
    const unsubUsers = subscribe("users", setUsers, "lastLoginAt");
    const unsubAssessments = subscribe("assessments", setAssessments, "completedAt");
    const unsubImpacts = subscribe("impact_calculations", setImpacts);
    const unsubNewsletters = subscribe("newsletter_subscribers", setNewsletters, "subscribedAt");
    const unsubLaunch = subscribe("launch_notifications", setLaunchSubs, "subscribedAt");
    const unsubCaseStudies = subscribe("case_studies_access", setCaseStudyReqs, "requestedAt");
    const unsubPasswordResets = subscribe("password_resets", setPasswordResets);

    return () => {
      unsubContacts(); unsubUsers(); unsubAssessments();
      unsubImpacts(); unsubNewsletters(); unsubLaunch(); unsubCaseStudies(); unsubPasswordResets();
    };
  }, []);

  const totalSubscriptions = newsletters.length + launchSubs.length + caseStudyReqs.length;

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "contacts", label: "Enquiries", icon: FileText, count: contacts.length },
    { id: "users", label: "Platform Users", icon: Users, count: users.length },
    { id: "assessments", label: "ESG Assessments", icon: Building2, count: assessments.length },
    { id: "impact", label: "Impact Profiles", icon: Calculator, count: impacts.length },
    { id: "subscriptions", label: "Subscriptions & Waitlists", icon: Bell, count: totalSubscriptions },
    { id: "password-resets", label: "Password Resets", icon: Key, count: passwordResets.length },
  ];

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    if (timestamp.toDate) return timestamp.toDate().toLocaleString();
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#173F32]/10 sticky top-24">
          <div className="mb-6 px-4 pt-2">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#8A928C]">KSynapse</h2>
          </div>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${activeTab === tab.id
                    ? "bg-[#173F32] text-white shadow-md"
                    : "text-[#5D7067] hover:bg-[#F7F4EA] hover:text-[#173F32]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={18} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-black/5 text-[#173F32]"
                    }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#173F32]/10 min-h-[600px]"
          >

            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-3xl text-[#173F32]">System Overview</h2>
                  <p className="text-[#687770] mt-1">Real-time pulse of your platform operations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-[#173F32] to-[#0f2e24] p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Users size={80} /></div>
                    <div className="text-[#B4C8BD] text-xs font-mono uppercase tracking-widest mb-2">Total Users</div>
                    <div className="text-4xl font-serif">{users.length}</div>
                    <div className="mt-4 text-xs bg-white/10 inline-block px-3 py-1 rounded-full">Authenticated Accounts</div>
                  </div>

                  <div className="bg-gradient-to-br from-[#FBF8F0] to-white border border-[#C9A35C]/30 p-6 rounded-2xl shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-[#C9A35C]"><Building2 size={80} /></div>
                    <div className="text-[#8A7A57] text-xs font-mono uppercase tracking-widest mb-2">Assessments Complete</div>
                    <div className="text-4xl font-serif text-[#173F32]">{assessments.length}</div>
                    <div className="mt-4 text-xs bg-[#C9A35C]/10 text-[#8A7A57] inline-block px-3 py-1 rounded-full">Detailed ESG Reports</div>
                  </div>

                  <div className="bg-[#F7F4EA] border border-[#173F32]/10 p-6 rounded-2xl shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-[#173F32]"><Calculator size={80} /></div>
                    <div className="text-[#687770] text-xs font-mono uppercase tracking-widest mb-2">Impact Profiles</div>
                    <div className="text-4xl font-serif text-[#173F32]">{impacts.length}</div>
                    <div className="mt-4 text-xs bg-black/5 text-[#687770] inline-block px-3 py-1 rounded-full">Calculations run</div>
                  </div>

                  <div className="bg-white border border-[#173F32]/10 p-6 rounded-2xl shadow-sm col-span-1 md:col-span-2 lg:col-span-3 flex justify-between items-center">
                    <div>
                      <div className="text-[#687770] text-xs font-mono uppercase tracking-widest mb-1">Total Audience Reach</div>
                      <div className="text-2xl font-serif text-[#173F32]">
                        {totalSubscriptions + contacts.length} Total Engagements
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center px-4 border-r border-[#173F32]/10">
                        <div className="text-xl font-medium text-[#173F32]">{contacts.length}</div>
                        <div className="text-[10px] uppercase text-[#687770]">Enquiries</div>
                      </div>
                      <div className="text-center px-4 border-r border-[#173F32]/10">
                        <div className="text-xl font-medium text-[#173F32]">{newsletters.length}</div>
                        <div className="text-[10px] uppercase text-[#687770]">Newsletter</div>
                      </div>
                      <div className="text-center px-4">
                        <div className="text-xl font-medium text-[#173F32]">{launchSubs.length + caseStudyReqs.length}</div>
                        <div className="text-[10px] uppercase text-[#687770]">Waitlists</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CONTACTS TAB */}
            {activeTab === "contacts" && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-[#173F32] border-b border-[#173F32]/10 pb-4">Direct Enquiries</h2>
                <div className="grid gap-4">
                  {contacts.length === 0 ? <p className="text-sm text-gray-400">No data found.</p> : contacts.map(c => (
                    <div key={c.id} className="p-5 rounded-2xl border border-divider/40 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-[#173F32] text-lg flex items-center gap-2">
                            {c.name} <span className="bg-[#E8EFE9] text-[#173F32] px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">{c.enquiryType || 'General'}</span>
                          </h3>
                          <p className="text-sm text-[#8c7958] font-mono mt-1">{c.organisation} • {c.email}</p>
                          {c.phone && <p className="text-xs text-[#687770] mt-1 flex items-center gap-1">📞 {c.phone}</p>}
                        </div>
                        <span className="text-xs text-[#687770] bg-[#F7F4EA] px-3 py-1 rounded-full flex items-center gap-1">
                          <Clock size={12} /> {formatDate(c.createdAt)}
                        </span>
                      </div>
                      <div className="bg-[#FBF9F2] p-4 rounded-xl border border-[#173F32]/5 text-sm text-[#5D7067] leading-relaxed">
                        {c.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* USERS TAB */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-[#173F32] border-b border-[#173F32]/10 pb-4">Registered Users</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-[#173F32]/10 text-xs font-mono uppercase tracking-wider text-[#687770]">
                        <th className="pb-3 px-4 font-normal">User</th>
                        <th className="pb-3 px-4 font-normal">Organisation</th>
                        <th className="pb-3 px-4 font-normal">Email</th>
                        <th className="pb-3 px-4 font-normal text-right">Last Login</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? <tr><td colSpan={4} className="p-4 text-center">No data found.</td></tr> : users.map(u => (
                        <tr key={u.id} className="border-b border-[#173F32]/5 hover:bg-[#F7F4EA]/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-[#173F32] flex items-center gap-3">
                            {u.photoURL ? <img src={u.photoURL} alt="" className="w-8 h-8 rounded-full" /> : <div className="w-8 h-8 rounded-full bg-[#173F32] text-white flex items-center justify-center text-xs">{u.displayName?.charAt(0) || 'U'}</div>}
                            {u.displayName || 'Unknown'}
                          </td>
                          <td className="py-4 px-4 text-[#5D7067]">{u.organisation || 'N/A'}</td>
                          <td className="py-4 px-4 font-mono text-xs text-[#8A7A57]">{u.email}</td>
                          <td className="py-4 px-4 text-right text-xs text-[#687770]">{formatDate(u.lastLoginAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ASSESSMENTS TAB */}
            {activeTab === "assessments" && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-[#173F32] border-b border-[#173F32]/10 pb-4">Completed ESG Assessments</h2>
                <div className="grid gap-6">
                  {assessments.length === 0 ? <p className="text-sm text-gray-400">No data found.</p> : assessments.map(a => (
                    <div key={a.id} className="p-6 rounded-2xl border border-divider/40 bg-white shadow-sm flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-[#173F32] text-xl">{a.companyInfo?.companyName}</h3>
                          <span className="text-[10px] font-mono uppercase bg-[#173F32] text-white px-2 py-0.5 rounded">Total: {a.scores?.total}/300</span>
                        </div>
                        <p className="text-sm text-[#8c7958] font-mono mb-4">{a.companyInfo?.industry} • {a.companyInfo?.companySize} • {a.companyInfo?.email}</p>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-[#E8EFE9] rounded-xl p-3 border border-[#7A967F]/30 relative overflow-hidden">
                            <div className="text-[10px] uppercase tracking-widest text-[#5D7067] mb-1">Environmental</div>
                            <div className="text-2xl font-serif text-[#173F32]">{a.scores?.environmental}</div>
                            <div className="absolute right-0 bottom-0 text-[40px] opacity-10 text-[#173F32] translate-x-2 translate-y-2">E</div>
                          </div>
                          <div className="bg-[#FBF9F2] rounded-xl p-3 border border-[#C9A35C]/30 relative overflow-hidden">
                            <div className="text-[10px] uppercase tracking-widest text-[#8A7A57] mb-1">Social</div>
                            <div className="text-2xl font-serif text-[#8A7A57]">{a.scores?.social}</div>
                            <div className="absolute right-0 bottom-0 text-[40px] opacity-10 text-[#8A7A57] translate-x-2 translate-y-2">S</div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 relative overflow-hidden">
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Governance</div>
                            <div className="text-2xl font-serif text-gray-800">{a.scores?.governance}</div>
                            <div className="absolute right-0 bottom-0 text-[40px] opacity-10 text-gray-800 translate-x-2 translate-y-2">G</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-[#687770] whitespace-nowrap bg-[#F7F4EA] px-3 py-1 rounded-full">
                        {formatDate(a.completedAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IMPACT CALCULATOR TAB */}
            {activeTab === "impact" && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-[#173F32] border-b border-[#173F32]/10 pb-4">Impact Calculations</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {impacts.length === 0 ? <p className="text-sm text-gray-400">No data found.</p> : impacts.map(i => (
                    <div key={i.id} className="p-6 rounded-2xl border border-divider/40 bg-[#FBF9F2] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A35C]/10 to-transparent rounded-bl-[100px] pointer-events-none" />

                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="font-semibold text-[#173F32] text-lg">{i.formData?.industry || 'Unknown Industry'}</h3>
                          <p className="text-xs font-mono text-[#8c7958] mt-1">{i.formData?.employees} Employees • ₹{i.formData?.revenue}Cr Revenue</p>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] uppercase tracking-widest text-[#687770]">Risk Score</div>
                          <div className="text-xl font-serif text-[#A2634B]">{i.riskScore}/100</div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-5 border border-divider/30 shadow-sm">
                        <div className="flex justify-between items-end mb-4 border-b border-[#173F32]/5 pb-4">
                          <div>
                            <span className="text-[10px] text-[#687770] font-mono uppercase tracking-widest block mb-1">Total Footprint</span>
                            <div className="text-3xl font-serif text-[#173F32] leading-none">{i.footprint?.total?.toLocaleString()} <span className="text-sm font-sans text-[#687770]">tCO₂e</span></div>
                          </div>
                          <Activity size={24} className="text-[#173F32]/20" />
                        </div>

                        <div className="flex justify-between text-xs font-mono">
                          <div className="text-center">
                            <span className="block text-[#A2634B] mb-1">Scope 1</span>
                            <span className="font-medium text-[#173F32]">{i.footprint?.scope1?.toLocaleString()}t</span>
                          </div>
                          <div className="text-center">
                            <span className="block text-[#8A7A57] mb-1">Scope 2</span>
                            <span className="font-medium text-[#173F32]">{i.footprint?.scope2?.toLocaleString()}t</span>
                          </div>
                          <div className="text-center">
                            <span className="block text-[#5D7067] mb-1">Scope 3</span>
                            <span className="font-medium text-[#173F32]">{i.footprint?.scope3?.toLocaleString()}t</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] text-[#687770] mt-4 uppercase tracking-wider text-right">
                        Calculated on: {formatDate(i.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUBSCRIPTIONS & WAITLISTS TAB */}
            {activeTab === "subscriptions" && (
              <div className="space-y-10">
                <div>
                  <h2 className="font-serif text-2xl text-[#173F32] border-b border-[#173F32]/10 pb-4 mb-4 flex items-center gap-2"><Mail className="text-[#C9A35C]" /> Newsletter Subscribers</h2>
                  <div className="bg-white border border-[#173F32]/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#F7F4EA]">
                        <tr className="text-xs font-mono uppercase tracking-wider text-[#687770]">
                          <th className="py-3 px-6 font-normal">Email Address</th>
                          <th className="py-3 px-6 font-normal text-right">Date Subscribed</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#173F32]/5">
                        {newsletters.length === 0 ? <tr><td colSpan={2} className="p-4 text-center">No data found.</td></tr> : newsletters.map(s => (
                          <tr key={s.id} className="hover:bg-gray-50">
                            <td className="py-3 px-6 font-medium text-[#173F32]">{s.email}</td>
                            <td className="py-3 px-6 text-right text-xs text-[#687770]">{formatDate(s.subscribedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-[#173F32] border-b border-[#173F32]/10 pb-4 mb-4 flex items-center gap-2"><Activity className="text-[#C9A35C]" /> Launch Notification List</h2>
                  <div className="bg-white border border-[#173F32]/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#F7F4EA]">
                        <tr className="text-xs font-mono uppercase tracking-wider text-[#687770]">
                          <th className="py-3 px-6 font-normal">Email Address</th>
                          <th className="py-3 px-6 font-normal text-right">Date Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#173F32]/5">
                        {launchSubs.length === 0 ? <tr><td colSpan={2} className="p-4 text-center">No data found.</td></tr> : launchSubs.map(s => (
                          <tr key={s.id} className="hover:bg-gray-50">
                            <td className="py-3 px-6 font-medium text-[#173F32]">{s.email}</td>
                            <td className="py-3 px-6 text-right text-xs text-[#687770]">{formatDate(s.subscribedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-[#173F32] border-b border-[#173F32]/10 pb-4 mb-4 flex items-center gap-2"><BookOpen className="text-[#C9A35C]" /> Case Studies Access Requests</h2>
                  <div className="bg-white border border-[#173F32]/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#F7F4EA]">
                        <tr className="text-xs font-mono uppercase tracking-wider text-[#687770]">
                          <th className="py-3 px-6 font-normal">Email Address</th>
                          <th className="py-3 px-6 font-normal text-right">Date Requested</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#173F32]/5">
                        {caseStudyReqs.length === 0 ? <tr><td colSpan={2} className="p-4 text-center">No data found.</td></tr> : caseStudyReqs.map(s => (
                          <tr key={s.id} className="hover:bg-gray-50">
                            <td className="py-3 px-6 font-medium text-[#173F32]">{s.email}</td>
                            <td className="py-3 px-6 text-right text-xs text-[#687770]">{formatDate(s.requestedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}


            {/* PASSWORD RESETS TAB */}
            {activeTab === "password-resets" && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-[#173F32] border-b border-[#173F32]/10 pb-4">Password Reset Requests</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-[#173F32]/10 text-xs font-mono uppercase tracking-wider text-[#687770]">
                        <th className="pb-3 px-4 font-medium">Email</th>
                        <th className="pb-3 px-4 font-medium">Status</th>
                        <th className="pb-3 px-4 font-medium">Requested At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#173F32]/5">
                      {passwordResets.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-6 px-4 text-center text-gray-400">No reset requests found.</td>
                        </tr>
                      ) : passwordResets.map(r => (
                        <tr key={r.id} className="hover:bg-[#F7F4EA]/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-[#173F32]">{r.email}</td>
                          <td className="py-4 px-4">
                            <span className="bg-[#E8EFE9] text-[#173F32] px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">
                              {r.status || 'pending'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-[#687770]">{formatDate(r.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
