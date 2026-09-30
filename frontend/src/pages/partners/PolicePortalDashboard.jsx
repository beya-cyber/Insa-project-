import React, { useState } from 'react'
import { ShieldCheck, FileText, CheckCircle2, RefreshCw, Scale, ShieldAlert, Search, Lock, UserCheck, Gavel, BarChart3, PieChart } from 'lucide-react'

export default function PolicePortalDashboard() {
  const [warrants, setWarrants] = useState([
    { id: 1, warrant_ref: 'POL-WNT-2026-801', suspect_name: 'Dawit Mekonnen (Mule Ring Leader)', target_account: 'CBE-10002938491', offense: 'Telebirr P2P Cyber Syndicate', magistrate: 'Magistrate Abebe K.', status: 'ACTIVE WARRANT ISSUED', date: '2026-09-29' },
    { id: 2, warrant_ref: 'POL-WNT-2026-802', suspect_name: 'Hermela Tadesse', target_account: 'BOA-88392019', offense: 'Phishing & Cross-Border Layering', magistrate: 'Magistrate Tigist M.', status: 'SERVED & FROZEN', date: '2026-09-29' },
    { id: 3, warrant_ref: 'POL-WNT-2026-803', suspect_name: 'Unknown Syndicate Entity #4', target_account: 'TELEBIRR-0911829391', offense: 'Automated SIM-Swap Fraud', magistrate: 'Magistrate Dawit T.', status: 'PENDING MAGISTRATE REVIEW', date: '2026-09-29' }
  ])

  const [loading, setLoading] = useState(false)
  const [issuingModal, setIssuingModal] = useState(false)
  const [newSuspect, setNewSuspect] = useState({ name: '', account: '', offense: '', magistrate: 'Magistrate Abebe K.' })
  const [searchQuery, setSearchQuery] = useState('')
  const [successBanner, setSuccessBanner] = useState(null)

  const handleIssueWarrant = (e) => {
    e.preventDefault()
    if (!newSuspect.name || !newSuspect.account) return

    const created = {
      id: Date.now(),
      warrant_ref: `POL-WNT-2026-${Math.floor(100 + Math.random() * 900)}`,
      suspect_name: newSuspect.name,
      target_account: newSuspect.account,
      offense: newSuspect.offense || 'General Financial Cybercrime',
      magistrate: newSuspect.magistrate,
      status: 'ACTIVE WARRANT ISSUED',
      date: new Date().toISOString().split('T')[0]
    }

    setWarrants([created, ...warrants])
    setIssuingModal(false)
    setNewSuspect({ name: '', account: '', offense: '', magistrate: 'Magistrate Abebe K.' })
    setSuccessBanner(`Judicial digital warrant successfully signed and broadcast to NDSIR and banking clearing nodes.`)
    setTimeout(() => setSuccessBanner(null), 5000)
  }

  const filteredWarrants = warrants.filter(w => 
    w.warrant_ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.suspect_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.target_account.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeCount = warrants.filter(w => w.status === 'ACTIVE WARRANT ISSUED').length
  const servedCount = warrants.filter(w => w.status === 'SERVED & FROZEN').length

  return (
    <div className="min-h-screen bg-[#010409] text-slate-100 font-mono p-6 selection:bg-rose-500 selection:text-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* Success Notification */}
      {successBanner && (
        <div className="relative z-20 mb-6 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 p-4 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.3)] flex items-center justify-between animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 animate-bounce" />
            <span className="text-xs font-bold">{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-emerald-400 hover:text-white text-xs cursor-pointer">✕</button>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center bg-[#070d1d]/90 border border-rose-500/30 rounded-2xl p-6 mb-8 shadow-[0_0_30px_rgba(244,63,94,0.15)] backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
            <Scale className="h-8 w-8 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-rose-400 text-xs tracking-widest uppercase">
              <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping"></span>
              <span>Federal Police Cybercrimes Investigation & Judicial Magistrates</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              LAW ENFORCEMENT & WARRANT PORTAL
              <span className="text-xs bg-rose-950 text-rose-400 border border-rose-800 px-3 py-1 rounded-full">JUDICIAL CLEARANCE</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button 
            onClick={() => setIssuingModal(true)}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)] cursor-pointer"
          >
            <Gavel className="h-4 w-4" />
            ISSUE NEW DIGITAL WARRANT
          </button>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <p className="text-[11px] text-slate-400 uppercase">Active Warrants Issued</p>
          <h3 className="text-3xl font-black text-rose-500 mt-1">{activeCount}</h3>
        </div>
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <p className="text-[11px] text-slate-400 uppercase">Served & Assets Frozen</p>
          <h3 className="text-3xl font-black text-emerald-400 mt-1">{servedCount}</h3>
        </div>
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <p className="text-[11px] text-slate-400 uppercase">Active Subpoenas</p>
          <h3 className="text-3xl font-black text-cyan-400 mt-1">14</h3>
        </div>
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <p className="text-[11px] text-slate-400 uppercase">Chain Integrity</p>
          <h3 className="text-3xl font-black text-emerald-400 mt-1">VERIFIED</h3>
        </div>
      </div>

      {/* Graphical Analytics Section */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#070d1d]/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-rose-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Syndicate Offense Breakdown</h3>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">Judicial Record</span>
          </div>

          <div className="space-y-4 my-auto">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Telebirr P2P Fraud Rings</span>
                <span className="text-rose-400 font-bold">50%</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] transition-all duration-500" style={{ width: '50%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Phishing & Credential Theft</span>
                <span className="text-amber-400 font-bold">30%</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-500" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Automated SIM-Swap Attack</span>
                <span className="text-cyan-400 font-bold">20%</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-500" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#070d1d]/90 border border-slate-800 rounded-2xl p-6 shadow-xl lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-rose-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Weekly Magistrate Warrant Issuance Volume</h3>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-md">Admissible in Court</span>
          </div>

          <div className="h-40 flex items-end gap-3 pt-6 px-2 border-b border-slate-800 pb-2">
            {[15, 25, 40, 60, 85, 95, 70, 45, 55, 75, 90, 85, 60, 45, 50, 70, 80, 92, 85, 60, 40, 30, 45, 55].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div 
                  className={`w-full rounded-t transition-all duration-300 ${val > 80 ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-slate-700 hover:bg-rose-400'}`} 
                  style={{ height: `${val}%` }}
                ></div>
                <span className="text-[9px] text-slate-500 group-hover:text-rose-400">{idx}h</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center text-xs text-slate-400">
            <span>Status: Secure Judicial Chain</span>
            <span className="text-rose-400 font-bold">Federal Cybercrime Division</span>
          </div>
        </div>
      </div>

      {/* Warrants Table */}
      <div className="relative z-10 bg-[#070d1d]/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#050914]">
          <div className="flex items-center gap-3">
            <Scale className="h-5 w-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Subpoenas & Digital Warrants Ledger</h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reference, suspect..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#020617] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-[#040710] text-[11px] text-slate-400 uppercase tracking-widest">
                <th className="p-4">Warrant Ref</th>
                <th className="p-4">Suspect / Entity</th>
                <th className="p-4">Target Account</th>
                <th className="p-4">Offense Vector</th>
                <th className="p-4">Issuing Magistrate</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Court Admissibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredWarrants.map(w => (
                <tr key={w.id} className="hover:bg-rose-950/20 transition-colors">
                  <td className="p-4 font-bold text-rose-400">{w.warrant_ref}</td>
                  <td className="p-4 text-white font-bold">{w.suspect_name}</td>
                  <td className="p-4 text-slate-300">{w.target_account}</td>
                  <td className="p-4 text-slate-200 text-xs">{w.offense}</td>
                  <td className="p-4 text-slate-400 text-xs">{w.magistrate}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      w.status === 'SERVED & FROZEN' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                    }`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-xs text-emerald-400 font-bold inline-flex items-center gap-1 bg-emerald-950/50 px-3 py-1 rounded-lg border border-emerald-800">
                      <CheckCircle2 className="h-4 w-4" /> VERIFIED HASH
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Warrant Modal */}
      {issuingModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-[#070d1d] border border-rose-500/50 rounded-3xl p-6 max-w-lg w-full shadow-[0_0_60px_rgba(244,63,94,0.3)] space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-rose-400" />
                <h3 className="text-lg font-bold text-white">Issue Judicial Freezing Warrant</h3>
              </div>
              <button onClick={() => setIssuingModal(false)} className="text-slate-400 hover:text-white text-sm cursor-pointer">✕ ESC</button>
            </div>
            <form onSubmit={handleIssueWarrant} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Suspect / Syndicate Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Bekele"
                  value={newSuspect.name}
                  onChange={(e) => setNewSuspect({...newSuspect, name: e.target.value})}
                  className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Target Account / Wallet Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CBE-1000928103"
                  value={newSuspect.account}
                  onChange={(e) => setNewSuspect({...newSuspect, account: e.target.value})}
                  className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Offense Classification</label>
                <input
                  type="text"
                  placeholder="e.g. Telebirr P2P Fraud Ring"
                  value={newSuspect.offense}
                  onChange={(e) => setNewSuspect({...newSuspect, offense: e.target.value})}
                  className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Authorizing Magistrate</label>
                <select
                  value={newSuspect.magistrate}
                  onChange={(e) => setNewSuspect({...newSuspect, magistrate: e.target.value})}
                  className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Magistrate Abebe K.">Magistrate Abebe K.</option>
                  <option value="Magistrate Tigist M.">Magistrate Tigist M.</option>
                  <option value="Magistrate Dawit T.">Magistrate Dawit T.</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIssuingModal(false)} className="px-4 py-2.5 bg-slate-900 text-slate-300 rounded-xl cursor-pointer">CANCEL</button>
                <button type="submit" className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.4)]">SIGN & BROADCAST</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
