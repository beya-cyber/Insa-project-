import React, { useState } from 'react'
import { ShieldAlert, X, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'
import { dispatchFreezeOrder } from '../../lib/api'

export default function FreezeRequestModal({ isOpen, onClose, targetNode }) {
  const [reason, setReason] = useState('CRITICAL_VELOCITY_LEAKAGE')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen || !targetNode) return null

  const handleExecute = async () => {
    setSubmitting(true)
    try {
      await dispatchFreezeOrder({
        nodeId: targetNode.id,
        account: targetNode.sub || targetNode.targetAccount,
        reason: reason,
        timestamp: new Date().toISOString(),
      })
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setSubmitting(false)
        onClose()
      }, 1800)
    } catch (err) {
      console.error(err)
      setSubmitting(false)
      alert('Directive Dispatch Failed. Defaulting to local override mode.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="bg-[#0b0f19] border border-red-600/60 rounded-xl max-w-md w-full p-6 shadow-2xl relative space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-red-500 font-bold text-sm tracking-wider">
            <ShieldAlert className="h-5 w-5 animate-pulse" />
            <span>ETH-SWITCH HOLD DIRECTIVE</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white">DIRECTIVE DISPATCHED</h3>
            <p className="text-xs text-slate-400">
              Account <span className="text-cyan-400">{targetNode.sub || targetNode.targetAccount}</span> locked across EthSwitch Network.
            </p>
          </div>
        ) : (
          <>
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-xs text-red-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span>WARNING: IMMEDIATE ASSET FREEZE</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Executing this action halts all pending and outgoing settlements for this target account instantly.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Target Label</span>
                <span className="text-white font-bold">{targetNode.label || targetNode.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Account Ref</span>
                <span className="text-cyan-400 font-bold">{targetNode.sub || targetNode.targetAccount}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 text-[11px]">AUTHORIZATION REASON</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded p-2 focus:outline-none focus:border-cyan-500 text-xs"
              >
                <option value="CRITICAL_VELOCITY_LEAKAGE">Critical Velocity Multi-Hop Leakage</option>
                <option value="KNOWN_MULE_HUB">Confirmed Mule Hub Identity Match</option>
                <option value="INSA_JUDICIAL_WARRANT">INSA Emergency Intercept Order #9021</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded text-xs font-bold transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleExecute}
                disabled={submitting}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/50"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <ShieldAlert className="h-4 w-4" />
                    <span>CONFIRM HOLD</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
