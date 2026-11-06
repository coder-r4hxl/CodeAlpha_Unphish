import React, { useState } from 'react';
import { ShieldAlert, KeyRound, WifiOff, Flag } from 'lucide-react';

export const IncidentResponseDiagram: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number>(1);

  const steps = [
    {
      id: 1,
      title: 'Phase 1: Immediate Containment (Minutes 0-5)',
      icon: WifiOff,
      action: 'Close browser tab immediately. Do NOT run downloaded files. If an executable or macro ran, disconnect Wi-Fi and unplug network cables.',
      priority: 'CRITICAL',
    },
    {
      id: 2,
      title: 'Phase 2: Credential & Session Invalidation (Minutes 5-15)',
      icon: KeyRound,
      action: 'From a clean device, navigate directly to the legitimate service. Change password to a strong phrase. Click "Revoke all active sessions" to invalidate stolen tokens.',
      priority: 'HIGH',
    },
    {
      id: 3,
      title: 'Phase 3: Antivirus & Device Audit (Minutes 15-30)',
      icon: ShieldAlert,
      action: 'Execute a full system malware scan using native operating system tools (Windows Security / macOS XProtect). Verify browser extensions for unauthorized additions.',
      priority: 'MEDIUM',
    },
    {
      id: 4,
      title: 'Phase 4: Reporting & Hardening (Minutes 30-60)',
      icon: Flag,
      action: 'Report the phishing email to internal IT/SOC or external repositories (CISA, APWG, Google Safe Browsing). Enable passkeys or authenticator app 2FA.',
      priority: 'ESSENTIAL',
    },
  ];

  const current = steps.find((s) => s.id === activePhase) || steps[0];

  return (
    <div className="my-8 rounded-2xl bg-[#101923] border border-[#1E2D3D] p-6 shadow-xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E2D3D] pb-3 mb-6 gap-2">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#E85D65]">
            Obsidian Signal Emergency Protocol
          </span>
          <h3 className="text-lg font-bold text-[#F1F5F9]">4-Phase Incident Response: The First 60 Minutes</h3>
        </div>
        <span className="text-xs text-[#9AAABD] font-mono">Prioritized Triage Protocol</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        {steps.map((st) => {
          const isSelected = st.id === activePhase;
          const StepIcon = st.icon;
          return (
            <button
              key={st.id}
              onClick={() => setActivePhase(st.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#151F2B] border-[#E85D65] ring-1 ring-[#E85D65]'
                  : 'bg-[#0B1017] border-[#1E2D3D] hover:border-[#2A3E54]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <StepIcon className={`w-5 h-5 ${isSelected ? 'text-[#E85D65]' : 'text-[#6F8094]'}`} />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E85D65]/15 text-[#E85D65] font-bold">
                  {st.priority}
                </span>
              </div>
              <p className="text-xs font-bold text-[#F1F5F9]">{st.title.split(': ')[1]}</p>
            </button>
          );
        })}
      </div>

      <div className="p-5 rounded-xl bg-[#0B1017] border border-[#1E2D3D]">
        <h4 className="text-base font-bold text-[#F1F5F9] mb-2">{current.title}</h4>
        <p className="text-sm text-[#9AAABD] leading-relaxed">{current.action}</p>
      </div>
    </div>
  );
};
