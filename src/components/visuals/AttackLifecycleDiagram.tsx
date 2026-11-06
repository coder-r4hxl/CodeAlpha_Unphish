import React, { useState } from 'react';
import { Search, Mail, KeyRound, Database, ShieldCheck } from 'lucide-react';

export const AttackLifecycleDiagram: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number>(1);

  const phases = [
    {
      id: 1,
      title: 'Phase 1: Reconnaissance (OSINT)',
      icon: Search,
      action: 'Adversary gathers intelligence from LinkedIn, social media, company blogs, and corporate hierarchy to identify high-value targets.',
      defense: 'Defense: Limit sensitive public disclosures and practice employee social media hygiene.',
    },
    {
      id: 2,
      title: 'Phase 2: Weaponization & Lure',
      icon: Mail,
      action: 'Attacker registers look-alike typosquatted domains, configures reverse-proxy phishing kits (Evilginx), and crafts urgent contextual lure emails.',
      defense: 'Defense: Automated brand monitoring, DMARC domain protection, and email gateway filters.',
    },
    {
      id: 3,
      title: 'Phase 3: Delivery & Interaction',
      icon: Mail,
      action: 'Lure dispatched via email, SMS, or QR code. Recipient receives the notification and is persuaded to open the deceptive link.',
      defense: 'Defense: Human awareness training, URL Inspector scrutiny, and the 60-second cognitive pause.',
    },
    {
      id: 4,
      title: 'Phase 4: Credential & Session Theft',
      icon: KeyRound,
      action: 'Victim enters password and MFA token into the replica portal. The proxy intercepts the password and authenticated session cookie.',
      defense: 'Defense: Password manager domain matching (refuses to autofill) and FIDO2 passkeys (cryptographically blocked).',
    },
    {
      id: 5,
      title: 'Phase 5: Lateral Exploitation',
      icon: Database,
      action: 'Attacker imports stolen session cookies into their browser, establishing persistent access to internal corporate databases or finance portals.',
      defense: 'Defense: Immediate session revocation, conditional access policies, and rapid incident reporting.',
    },
  ];

  const current = phases.find((p) => p.id === selectedPhase) || phases[0];

  return (
    <div className="my-8 rounded-2xl bg-[#101923] border border-[#1E2D3D] p-6 shadow-xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E2D3D] pb-3 mb-6 gap-2">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#42D6C5]">
            Cyber Kill Chain Model
          </span>
          <h3 className="text-lg font-bold text-[#F1F5F9]">Phishing Attack Lifecycle & Defensive Gateways</h3>
        </div>
        <span className="text-xs font-mono text-[#9AAABD]">5 Operational Phases</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-6">
        {phases.map((p) => {
          const isSelected = p.id === selectedPhase;
          const PhaseIcon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(p.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#151F2B] border-[#42D6C5] ring-1 ring-[#42D6C5]'
                  : 'bg-[#0B1017] border-[#1E2D3D] hover:border-[#2A3E54]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <PhaseIcon className={`w-4 h-4 ${isSelected ? 'text-[#42D6C5]' : 'text-[#6F8094]'}`} />
                <span className="text-[10px] font-mono text-[#6F8094]">P-0{p.id}</span>
              </div>
              <p className="text-xs font-bold text-[#F1F5F9] truncate">{p.title.split(': ')[1]}</p>
            </button>
          );
        })}
      </div>

      <div className="p-5 rounded-xl bg-[#0B1017] border border-[#1E2D3D] space-y-3">
        <h4 className="text-base font-bold text-[#F1F5F9]">{current.title}</h4>
        <div className="space-y-2 text-sm">
          <p className="text-[#9AAABD] leading-relaxed">
            <strong className="text-[#F1F5F9]">Attacker Action:</strong> {current.action}
          </p>
          <div className="p-3 rounded-xl bg-[#42D6C5]/10 border border-[#42D6C5]/30 text-[#42D6C5] text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#42D6C5]" />
            <span className="text-[#F1F5F9]">{current.defense}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
