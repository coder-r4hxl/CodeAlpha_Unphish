import React, { useState } from 'react';
import { KeyRound, ShieldCheck, RefreshCw, PhoneCall } from 'lucide-react';

export const PreventionWorkflowDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const pillars = [
    {
      id: 1,
      title: 'Pillar 1: Password Manager Discipline',
      icon: KeyRound,
      rule: 'Never memorize or reuse passwords across multiple sites.',
      details: 'Password managers generate unique 20+ character passwords for every account. Furthermore, their strict origin-domain matching automatically prevents autofill on look-alike phishing domains.',
    },
    {
      id: 2,
      title: 'Pillar 2: Phish-Resistant MFA (Passkeys)',
      icon: ShieldCheck,
      rule: 'Upgrade from SMS OTPs to FIDO2 WebAuthn Passkeys or Hardware Keys.',
      details: 'Passkeys bind credentials mathematically to the browser domain origin. Even if an attacker perfectly duplicates a login page, the browser will refuse to supply credentials to the fraudulent domain.',
    },
    {
      id: 3,
      title: 'Pillar 3: Software & Patch Hygiene',
      icon: RefreshCw,
      rule: 'Keep web browsers, operating systems, and extensions updated.',
      details: 'Attackers frequently pair phishing links with known browser zero-day exploit kits. Automated patching closes security holes before threat actors can weaponize them.',
    },
    {
      id: 4,
      title: 'Pillar 4: Mandatory Out-of-Band Verification',
      icon: PhoneCall,
      rule: 'Verify all anomalous financial or security requests via a separate channel.',
      details: 'If an email asks for an urgent wire transfer, payroll change, or sensitive credential reset, call the sender on their pre-established verified phone number, never using contact numbers in the email.',
    },
  ];

  const current = pillars.find((p) => p.id === activeStep) || pillars[0];

  return (
    <div className="my-8 rounded-2xl bg-[#101923] border border-[#1E2D3D] p-6 shadow-xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E2D3D] pb-3 mb-6 gap-2">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#42D6C5]">
            Obsidian Signal Defense Framework
          </span>
          <h3 className="text-lg font-bold text-[#F1F5F9]">The 4 Pillars of Prevention & Cyber Hygiene</h3>
        </div>
        <span className="text-xs text-[#9AAABD] font-mono">Defense-in-Depth Architecture</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        {pillars.map((pil) => {
          const isSelected = pil.id === activeStep;
          const PilIcon = pil.icon;
          return (
            <button
              key={pil.id}
              onClick={() => setActiveStep(pil.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#151F2B] border-[#42D6C5] ring-1 ring-[#42D6C5]'
                  : 'bg-[#0B1017] border-[#1E2D3D] hover:border-[#2A3E54]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <PilIcon className={`w-5 h-5 ${isSelected ? 'text-[#42D6C5]' : 'text-[#6F8094]'}`} />
                <span className="text-[10px] font-mono text-[#6F8094]">0{pil.id}</span>
              </div>
              <p className="text-xs font-bold text-[#F1F5F9]">{pil.title.split(': ')[1]}</p>
            </button>
          );
        })}
      </div>

      <div className="p-5 rounded-xl bg-[#0B1017] border border-[#1E2D3D]">
        <h4 className="text-base font-bold text-[#F1F5F9] mb-1">{current.title}</h4>
        <p className="text-xs font-mono text-[#42D6C5] mb-3">{current.rule}</p>
        <p className="text-sm text-[#9AAABD] leading-relaxed">{current.details}</p>
      </div>
    </div>
  );
};
