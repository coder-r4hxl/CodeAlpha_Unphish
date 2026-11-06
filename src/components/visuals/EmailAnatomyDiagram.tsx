import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Info, ExternalLink, HelpCircle } from 'lucide-react';

export const EmailAnatomyDiagram: React.FC = () => {
  const [highlightedClue, setHighlightedClue] = useState<string | null>('sender');

  const clues = [
    {
      id: 'sender',
      label: '1. Display Name vs Envelope Address',
      color: 'critical',
      desc: 'The display name claims "PayPal Security", but the actual sending address after the "@" is "alert442@secure-domain-update.top". This is display-name spoofing.',
    },
    {
      id: 'subject',
      label: '2. Artificial Urgency Subject',
      color: 'warning',
      desc: 'Threatening "Account suspended within 2 hours" is designed to trigger emotional panic and bypass deliberative skepticism.',
    },
    {
      id: 'greeting',
      label: '3. Generic Impersonal Salutation',
      color: 'warning',
      desc: '"Dear Customer" instead of your actual registered first and last name. Mass phishing sprays cannot customize for every stolen list.',
    },
    {
      id: 'link',
      label: '4. Deceptive Hyperlink Target',
      color: 'critical',
      desc: 'The anchor text reads "https://www.paypal.com/signin", but hovering reveals the actual browser destination is "https://paypal.com.verify-billing.xyz/auth".',
    },
  ];

  return (
    <div className="my-8 rounded-2xl bg-[#101923] border border-[#1E2D3D] p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#1E2D3D] pb-3 mb-6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#42D6C5]">
            Obsidian Signal Diagram
          </span>
          <h3 className="text-lg font-bold text-[#F1F5F9]">Anatomy of a Phishing Email Lure</h3>
        </div>
        <span className="text-xs text-[#9AAABD] font-mono hidden sm:inline">
          Click highlighted clues to inspect
        </span>
      </div>

      {/* Simulated Email Client UI */}
      <div className="rounded-xl bg-[#0B1017] border border-[#1E2D3D] overflow-hidden font-sans shadow-inner">
        {/* Email Header */}
        <div className="bg-[#101923] border-b border-[#1E2D3D] p-4 space-y-2 text-sm">
          {/* Sender Row */}
          <div
            onClick={() => setHighlightedClue('sender')}
            className={`cursor-pointer p-2.5 rounded-xl transition-all border ${
              highlightedClue === 'sender'
                ? 'bg-[#E85D65]/10 border-[#E85D65] ring-1 ring-[#E85D65]'
                : 'hover:bg-[#151F2B] border-transparent'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#6F8094] text-xs font-mono w-14">From:</span>
              <span className="font-bold text-[#F1F5F9]">PayPal Security</span>
              <span className="text-xs font-mono text-[#E85D65] bg-[#E85D65]/10 px-2 py-0.5 rounded border border-[#E85D65]/30">
                &lt;alert442@secure-domain-update.top&gt;
              </span>
              <span className="ml-auto text-[11px] font-mono text-[#E85D65] font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Clue #1: Fake Envelope
              </span>
            </div>
          </div>

          {/* Subject Row */}
          <div
            onClick={() => setHighlightedClue('subject')}
            className={`cursor-pointer p-2.5 rounded-xl transition-all border ${
              highlightedClue === 'subject'
                ? 'bg-[#E9B65B]/10 border-[#E9B65B] ring-1 ring-[#E9B65B]'
                : 'hover:bg-[#151F2B] border-transparent'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#6F8094] text-xs font-mono w-14">Subject:</span>
              <span className="font-medium text-[#F1F5F9]">
                [CRITICAL] Your account access will be terminated within 2 hours due to unauthorized activity
              </span>
              <span className="ml-auto text-[11px] font-mono text-[#E9B65B] font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Clue #2: Panic Trigger
              </span>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="p-6 space-y-4 text-[#9AAABD] text-sm leading-relaxed">
          {/* Greeting */}
          <div
            onClick={() => setHighlightedClue('greeting')}
            className={`cursor-pointer p-2 rounded-lg transition-colors border ${
              highlightedClue === 'greeting'
                ? 'bg-[#E9B65B]/10 border-[#E9B65B]/60'
                : 'hover:bg-[#101923] border-transparent'
            }`}
          >
            <p className="font-semibold text-[#F1F5F9]">Dear Customer,</p>
            <span className="text-[11px] text-[#E9B65B] font-mono mt-0.5 block">Clue #3: Generic Impersonal Salutation</span>
          </div>

          <p>
            Our automated security system detected multiple failed login attempts on your account from an unrecognized IP address in Bucharest, Romania.
          </p>
          <p>
            To restore unrestricted account status and safeguard your linked cards, you are required to confirm your identity immediately.
          </p>

          {/* Deceptive CTA Button with Hover Preview */}
          <div
            onClick={() => setHighlightedClue('link')}
            className={`cursor-pointer my-6 p-4 rounded-xl transition-all border ${
              highlightedClue === 'link'
                ? 'bg-[#E85D65]/10 border-[#E85D65] ring-1 ring-[#E85D65]'
                : 'bg-[#101923] border-[#1E2D3D] hover:border-[#2A3E54]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="inline-block px-5 py-2.5 rounded-xl bg-[#42D6C5] text-[#0B1017] font-bold text-xs shadow-md">
                  Verify PayPal Identity Now
                </span>
                <p className="text-xs text-[#6F8094] mt-2 font-mono">
                  Visible text: <span className="underline">https://www.paypal.com/signin</span>
                </p>
              </div>

              {/* Status bar inspection box */}
              <div className="rounded-xl bg-[#0B1017] p-3 border border-[#E85D65]/40 text-left font-mono text-xs">
                <span className="text-[#6F8094] block text-[10px] uppercase tracking-wider mb-1">
                  Actual destination URL preview:
                </span>
                <span className="text-[#E85D65] font-semibold break-all">
                  https://paypal.com.verify-billing.xyz/auth?id=9928
                </span>
                <span className="text-[#F1F5F9] text-[11px] block mt-1 font-sans">
                  ⚠️ Registered domain is <strong>verify-billing.xyz</strong>!
                </span>
              </div>
            </div>
            <span className="text-xs text-[#E85D65] font-mono mt-2 block font-semibold">
              Clue #4: Deceptive Hyperlink Target
            </span>
          </div>

          <p className="text-xs text-[#6F8094] pt-2 border-t border-[#1E2D3D]">
            PayPal Trust & Safety Operations © 2026. This notification was sent automatically.
          </p>
        </div>
      </div>

      {/* Explanatory Drawer for Active Clue */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {clues.map((c) => (
          <button
            key={c.id}
            onClick={() => setHighlightedClue(c.id)}
            className={`text-left p-3.5 rounded-xl border transition-all ${
              highlightedClue === c.id
                ? 'bg-[#151F2B] border-[#42D6C5] text-[#F1F5F9] shadow-md ring-1 ring-[#42D6C5]/40'
                : 'bg-[#0B1017] border-[#1E2D3D] text-[#9AAABD] hover:text-[#F1F5F9] hover:border-[#2A3E54]'
            }`}
          >
            <span className="text-xs font-bold block mb-1 text-[#F1F5F9]">{c.label}</span>
            <p className="text-xs text-[#6F8094] leading-relaxed line-clamp-3">{c.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
