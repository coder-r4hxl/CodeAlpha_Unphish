import React, { useState } from 'react';
import { ArrowDown, HelpCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

export const UrlAnatomyDiagram: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string>('sld');

  const parts = [
    {
      id: 'scheme',
      label: 'Protocol Scheme',
      token: 'https://',
      color: 'blue',
      role: 'Transit Encryption',
      explanation: 'Specifies the communication rule. HTTPS ensures data is encrypted between client and server, but DOES NOT guarantee the recipient is trustworthy.',
    },
    {
      id: 'subdomain',
      label: 'Subdomain (Deceptive Cloak)',
      token: 'paypal.com',
      color: 'critical',
      role: 'Attacker Controlled Prefix',
      explanation: 'Anyone who owns a domain can create arbitrary subdomains for free. Attackers prepend "paypal.com" to mislead your eyes into thinking you are on PayPal.',
    },
    {
      id: 'sld',
      label: 'Registered Root Domain (SLD)',
      token: 'account-security-update',
      color: 'critical',
      role: 'The True Owner (CRITICAL)',
      explanation: 'THIS is the real identity of the website owner. Whoever registered "account-security-update" owns this server. It is NOT PayPal!',
    },
    {
      id: 'tld',
      label: 'Top-Level Domain (TLD)',
      token: '.xyz',
      color: 'warning',
      role: 'Domain Registry',
      explanation: 'The registry suffix (.xyz, .top, .com, .org). Cheap TLDs like .xyz and .top are heavily leveraged by mass-scale phishing campaigns.',
    },
    {
      id: 'port',
      label: 'Network Port',
      token: ':443',
      color: 'slate',
      role: 'Network Port',
      explanation: 'Default encrypted web traffic port. Non-standard ports (e.g., 8080 or 8443) are an immediate anomaly in consumer websites.',
    },
    {
      id: 'path',
      label: 'Resource Path',
      token: '/signin/v2',
      color: 'slate',
      role: 'Page Resource',
      explanation: 'The specific folder or endpoint on the attacker’s web server serving the replica credential-stealing form.',
    },
    {
      id: 'query',
      label: 'Query Parameters',
      token: '?victim_id=982',
      color: 'slate',
      role: 'Campaign Identifier',
      explanation: 'Allows the attacker to identify which victim email or campaign dispatch brought you to the phishing page.',
    },
  ];

  const current = parts.find((p) => p.id === selectedPart) || parts[2];

  return (
    <div className="my-8 rounded-2xl bg-[#101923] border border-[#1E2D3D] p-6 shadow-xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E2D3D] pb-3 mb-6 gap-2">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#42D6C5]">
            Obsidian Signal Breakdown
          </span>
          <h3 className="text-lg font-bold text-[#F1F5F9]">Visual URL Anatomy & The Right-to-Left Rule</h3>
        </div>
        <span className="text-xs font-mono text-[#9AAABD] bg-[#151F2B] px-3 py-1 rounded-full border border-[#1E2D3D]">
          Find the single slash (/) & read left
        </span>
      </div>

      {/* Interactive Segmented URL Bar */}
      <div className="bg-[#0B1017] p-4 rounded-xl border border-[#1E2D3D] overflow-x-auto shadow-inner">
        <p className="text-xs font-mono text-[#6F8094] mb-2">Click any segmented token to examine its security role:</p>
        <div className="flex items-center gap-1.5 font-mono text-base md:text-lg whitespace-nowrap py-2">
          {parts.map((p) => {
            const isSelected = selectedPart === p.id;
            const isCritical = p.color === 'critical';
            const isWarning = p.color === 'warning';
            const isBlue = p.color === 'blue';

            return (
              <button
                key={p.id}
                onClick={() => setSelectedPart(p.id)}
                className={`relative px-3 py-2 rounded-xl border transition-all focus:outline-none ${
                  isSelected
                    ? isCritical
                      ? 'bg-[#E85D65]/15 text-[#E85D65] border-[#E85D65] shadow-md ring-2 ring-[#E85D65]/30'
                      : isWarning
                      ? 'bg-[#E9B65B]/15 text-[#E9B65B] border-[#E9B65B] shadow-md ring-2 ring-[#E9B65B]/30'
                      : 'bg-[#74B8FF]/15 text-[#74B8FF] border-[#74B8FF] shadow-md ring-2 ring-[#74B8FF]/30'
                    : 'bg-[#101923] text-[#9AAABD] border-[#1E2D3D] hover:text-[#F1F5F9] hover:border-[#2A3E54]'
                }`}
              >
                {p.token}
                <span className="block text-[9px] font-sans font-bold uppercase tracking-wider text-[#6F8094] mt-0.5">
                  {p.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep-dive Explanation Card */}
      <div className="mt-6 rounded-xl bg-[#0B1017] border border-[#1E2D3D] p-5 flex flex-col md:flex-row items-start gap-4">
        <div className="p-3 rounded-xl bg-[#151F2B] border border-[#1E2D3D] shrink-0">
          {current.color === 'critical' ? (
            <AlertTriangle className="w-6 h-6 text-[#E85D65]" />
          ) : current.color === 'warning' ? (
            <AlertTriangle className="w-6 h-6 text-[#E9B65B]" />
          ) : (
            <CheckCircle2 className="w-6 h-6 text-[#74B8FF]" />
          )}
        </div>

        <div className="space-y-1 text-left flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-[#F1F5F9]">{current.label}</h4>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#151F2B] text-[#9AAABD] border border-[#1E2D3D]">
              {current.role}
            </span>
          </div>
          <p className="text-xs font-mono text-[#42D6C5] py-0.5">Token: "{current.token}"</p>
          <p className="text-sm text-[#9AAABD] leading-relaxed">{current.explanation}</p>
        </div>
      </div>

      {/* The Golden Right-to-Left Rule Callout */}
      <div className="mt-4 p-4 rounded-xl bg-[#42D6C5]/10 border border-[#42D6C5]/30 text-[#42D6C5] text-xs leading-relaxed flex items-center gap-3">
        <div className="font-bold text-sm font-mono shrink-0">💡 THE RIGHT-TO-LEFT RULE:</div>
        <div className="text-[#F1F5F9]">
          To identify who truly owns any web address, locate the <strong>first single slash (/)</strong> after https://. Look immediately to the left: the <strong>two words separated by a dot</strong> (e.g. <code>account-security-update.xyz</code>) are the ONLY true domain identity. Everything to the left is an arbitrary subdomain configured by the registrant!
        </div>
      </div>
    </div>
  );
};
