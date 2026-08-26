import re

with open('src/app/admin/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Key icon import
if 'Key' not in content:
    content = content.replace('Clock\n', 'Clock, Key\n')

# Add state
state_block = '  const [caseStudyReqs, setCaseStudyReqs] = useState<any[]>([]);'
new_state = state_block + '\n  const [passwordResets, setPasswordResets] = useState<any[]>([]);'
content = content.replace(state_block, new_state)

# Add subscribe
subscribe_block = 'const unsubCaseStudies = subscribe("case_studies_access", setCaseStudyReqs, "requestedAt");'
new_subscribe = subscribe_block + '\n    const unsubPasswordResets = subscribe("password_resets", setPasswordResets);'
content = content.replace(subscribe_block, new_subscribe)

# Add unsub
unsub_block = 'unsubImpacts(); unsubNewsletters(); unsubLaunch(); unsubCaseStudies();'
new_unsub = 'unsubImpacts(); unsubNewsletters(); unsubLaunch(); unsubCaseStudies(); unsubPasswordResets();'
content = content.replace(unsub_block, new_unsub)

# Add tab
tabs_block = '{ id: "subscriptions", label: "Subscriptions & Waitlists", icon: Bell, count: totalSubscriptions },'
new_tabs = tabs_block + '\n    { id: "password-resets", label: "Password Resets", icon: Key, count: passwordResets.length },'
content = content.replace(tabs_block, new_tabs)

# Add UI section
ui_section = '''
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
'''

# Insert before '          </motion.div>' which is at the end of the sections.
last_section_end = content.find('          </motion.div>\n        </AnimatePresence>')
content = content[:last_section_end] + ui_section + content[last_section_end:]

with open('src/app/admin/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
