import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Eye, ArrowRight, Lock, Key, Terminal } from 'lucide-react';

export const HeroIllustration: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="relative w-full rounded-2xl bg-[#101923] border border-[#1E2D3D] p-6 shadow-2xl overflow-hidden font-sans">
      {/* Background Subtle Precision Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E2D3D_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />

      {/* Header bar simulating tactical security console */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#1E2D3D] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E85D65]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E9B65B]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#42D6C5]" />
          </div>
          <span className="ml-2 font-mono text-xs text-[#9AAABD]">
            obsidian.signal // threat-analysis-gateway
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#42D6C5]/10 text-[#42D6C5] border border-[#42D6C5]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#42D6C5] animate-pulse" />
            Static Verification Engine
          </span>
        </div>
      </div>

      {/* Main Interactive Inspection Pipeline */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1: Inbound Phishing Lure */}
        <div
          onClick={() => setActiveStep(1)}
          className={`cursor-pointer rounded-xl p-4 transition-all border ${
            activeStep === 1
              ? 'bg-[#151F2B] border-[#E85D65] shadow-lg ring-1 ring-[#E85D65]/40'
              : 'bg-[#0B1017] border-[#1E2D3D] hover:border-[#2A3E54]'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#E85D65]/15 text-[#E85D65] font-bold">
              01 • Inbound Lure
            </span>
            <AlertTriangle className="w-4 h-4 text-[#E85D65]" />
          </div>
          <div className="space-y-1.5 text-left">
            <p className="text-xs font-mono text-[#9AAABD] truncate">From: security@paypal-verify.xyz</p>
            <p className="text-sm font-bold text-[#F1F5F9]">"Account restricted. Act in 2h."</p>
            <p className="text-xs text-[#6F8094]">Weapon: Urgency + Subdomain masking</p>
          </div>
        </div>

        {/* Step 2: UnPhish Human Cognitive Filter */}
        <div
          onClick={() => setActiveStep(2)}
          className={`cursor-pointer rounded-xl p-4 transition-all border ${
            activeStep === 2
              ? 'bg-[#151F2B] border-[#E9B65B] shadow-lg ring-1 ring-[#E9B65B]/40'
              : 'bg-[#0B1017] border-[#1E2D3D] hover:border-[#2A3E54]'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#E9B65B]/15 text-[#E9B65B] font-bold">
              02 • Critical Pause
            </span>
            <Eye className="w-4 h-4 text-[#E9B65B]" />
          </div>
          <div className="space-y-1.5 text-left">
            <p className="text-xs font-mono text-[#9AAABD]">Check: Right-to-Left rule</p>
            <p className="text-sm font-bold text-[#F1F5F9]">"paypal-verify.xyz ≠ paypal.com"</p>
            <p className="text-xs text-[#6F8094]">Action: 60s pause, out-of-band check</p>
          </div>
        </div>

        {/* Step 3: Resilient Defense */}
        <div
          onClick={() => setActiveStep(3)}
          className={`cursor-pointer rounded-xl p-4 transition-all border ${
            activeStep === 3
              ? 'bg-[#151F2B] border-[#42D6C5] shadow-lg ring-1 ring-[#42D6C5]/40'
              : 'bg-[#0B1017] border-[#1E2D3D] hover:border-[#2A3E54]'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#42D6C5]/15 text-[#42D6C5] font-bold">
              03 • Intercepted
            </span>
            <ShieldCheck className="w-4 h-4 text-[#42D6C5]" />
          </div>
          <div className="space-y-1.5 text-left">
            <p className="text-xs font-mono text-[#9AAABD]">Outcome: 0 credentials leaked</p>
            <p className="text-sm font-bold text-[#F1F5F9]">Reported & Contained</p>
            <p className="text-xs text-[#6F8094]">Defense: FIDO2 Key / Clean app access</p>
          </div>
        </div>
      </div>

      {/* Expanded detail section based on selected step */}
      <div className="relative z-10 mt-6 pt-5 border-t border-[#1E2D3D] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0B1017] p-4 rounded-xl border border-[#1E2D3D]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#151F2B] border border-[#1E2D3D] shrink-0">
            {activeStep === 1 && <AlertTriangle className="w-5 h-5 text-[#E85D65]" />}
            {activeStep === 2 && <Eye className="w-5 h-5 text-[#E9B65B]" />}
            {activeStep === 3 && <ShieldCheck className="w-5 h-5 text-[#42D6C5]" />}
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#F1F5F9]">
              {activeStep === 1 && 'Step 1: The Weaponization of Urgency'}
              {activeStep === 2 && 'Step 2: The 60-Second Cognitive Circuit Breaker'}
              {activeStep === 3 && 'Step 3: Cryptographic Origin Immunity'}
            </h4>
            <p className="text-xs text-[#9AAABD] mt-0.5 leading-relaxed">
              {activeStep === 1 && 'Threat actors exploit display-name spoofing and high-consequence deadlines to trigger emotional compliance.'}
              {activeStep === 2 && 'By reading the registered root domain immediately before the single slash (/), 95% of phishing attempts are unmasked.'}
              {activeStep === 3 && 'Combining human skepticism with password managers and origin-bound FIDO2 passkeys prevents compromise.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto shrink-0 font-mono text-[11px] text-[#6F8094]">
          <span>Click any stage to examine</span>
        </div>
      </div>
    </div>
  );
};
