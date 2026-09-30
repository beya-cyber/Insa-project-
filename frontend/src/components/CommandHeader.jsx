import React, { useState, useEffect } from 'react'
import { Shield, Activity, Lock, Radio } from 'lucide-react'

export default function CommandHeader({ portalTitle, badgeId = "SOC-OPERATOR-8840" }) {
  const [time, setTime] = useState(new Date().toISOString())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toISOString()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="w-full bg-[#030816]/90 border-b border-slate-800/80 backdrop-blur-md px-6 py-3 flex flex-wrap justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-cyan-950/80 border border-cyan-500/40 rounded-xl text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Shield className="h-6 w-6 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">NDSIR SOC Command</span>
            <span className="px-2 py-0.5 text-[9px] font-mono bg-[#0f172a] border border-cyan-800/50 text-cyan-300 rounded font-semibold">RESTRICTED ACCESS</span>
          </div>
          <h1 className="text-base font-black text-white tracking-tight font-sans">{portalTitle}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="hidden lg:flex items-center gap-2 bg-[#020617] border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300">
          <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
          <span className="text-slate-400">TELEMETRY:</span>
          <span className="text-emerald-400 font-bold">GRID SYNCED</span>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-[#020617] border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300">
          <Activity className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-slate-400">UTC:</span>
          <span className="text-cyan-300 font-bold">{time.substring(11, 19)}</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3.5 py-1.5 rounded-xl text-slate-200">
          <Lock className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-slate-400 text-[11px]">BADGE:</span>
          <span className="text-white font-bold tracking-wider">{badgeId}</span>
        </div>
      </div>
    </header>
  )
}
