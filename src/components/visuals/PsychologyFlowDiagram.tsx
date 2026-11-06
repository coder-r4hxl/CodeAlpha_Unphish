import React, { useState } from 'react';
import { ArrowRight, Brain, AlertOctagon, Zap, ShieldAlert, HeartCrack } from 'lucide-react';

export const PsychologyFlowDiagram: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);

  const stages = [
    {
      id: 1,
      title: '1. External Stimulus / Lure',
      subtitle: 'Attacker creates high-stakes event',
      icon: Zap,
      description: 'The threat actor delivers an urgent notification: "Account Terminated in 2 Hours", "Tax Fraud Warrant", or "Urgent CEO Wire Request".',
      brainState: 'Cognitive baseline alert',
      weakness: 'Our natural inclination to resolve problems quickly',
    },
    {
      id: 2,
      title: '2. The Amygdala Hijack',
      subtitle: 'Emotional panic activates System 1',
      icon: HeartCrack,
      description: 'Acute urgency and fear flood the bloodstream with adrenaline. The logical prefrontal cortex (System 2) is suppressed in favor of instinctual fight-or-flight reactions.',
      brainState: 'Rational skepticism silenced',
      weakness: 'Fear of negative professional or financial penalties',
    },
    {
      id: 3,
      title: '3. Cognitive Overload & Tunnel Vision',
      subtitle: 'Critical clues overlooked',
      icon: Brain,
      description: 'Under time pressure, the human brain suffers tunnel vision. Subtle red flags (misspelled sender domains, missing HTTPS badges, strange tone) become invisible.',
      brainState: 'Focus narrowed solely on ending the panic',
      weakness: 'Ignoring procedural safeguards and approval chains',
    },
    {
      id: 4,
      title: '4. Compliance Action',
      subtitle: 'Victim yields credentials or funds',
      icon: AlertOctagon,
      description: 'The victim willingly submits credentials, approves an MFA push, or routes funds, believing they are saving their account or aiding their company.',
      brainState: 'False sense of relief',
      weakness: 'Action completed without out-of-band verification',
    },
    {
      id: 5,
      title: '5. The UnPhish Circuit Breaker',
      subtitle: 'How to neutralize this loop',
      icon: ShieldAlert,
      description: 'PAUSE FOR 60 SECONDS. When an email triggers intense emotion, treat the emotion itself as the threat detection alert. Verify out-of-band before taking any action.',
      brainState: 'System 2 deliberate reasoning restored',
      weakness: 'Attack defeated completely',
    },
  ];

  const current = stages.find((s) => s.id === activeStage) || stages[0];
  const IconComponent = current.icon;

  return (
    <div className="my-8 rounded-2xl bg-[#101923] border border-[#1E2D3D] p-6 shadow-xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E2D3D] pb-3 mb-6 gap-2">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#42D6C5]">
            Obsidian Signal Psychological Model
          </span>
          <h3 className="text-lg font-bold text-[#F1F5F9]">Social Engineering Psychological Manipulation Flow</h3>
        </div>
        <span className="text-xs text-[#9AAABD] font-mono">Click stages to inspect cognitive impact</span>
      </div>

      {/* Pipeline Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-6">
        {stages.map((stage) => {
          const isSelected = stage.id === activeStage;
          const isDefense = stage.id === 5;
          const StepIcon = stage.icon;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? isDefense
                    ? 'bg-[#151F2B] border-[#42D6C5] ring-1 ring-[#42D6C5]'
                    : 'bg-[#151F2B] border-[#E85D65] ring-1 ring-[#E85D65]'
                  : 'bg-[#0B1017] border-[#1E2D3D] hover:border-[#2A3E54]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <StepIcon
                  className={`w-4 h-4 ${
                    isDefense ? 'text-[#42D6C5]' : isSelected ? 'text-[#E85D65]' : 'text-[#6F8094]'
                  }`}
                />
                <span className="text-[10px] font-mono text-[#6F8094]">0{stage.id}</span>
              </div>
              <p className="text-xs font-bold text-[#F1F5F9] truncate">{stage.title.split('. ')[1]}</p>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Card */}
      <div
        className={`p-5 rounded-xl border ${
          current.id === 5
            ? 'bg-[#0B1017] border-[#42D6C5]/40'
            : 'bg-[#0B1017] border-[#1E2D3D]'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-xl border shrink-0 ${
              current.id === 5
                ? 'bg-[#42D6C5]/10 border-[#42D6C5]/40 text-[#42D6C5]'
                : 'bg-[#E85D65]/10 border-[#E85D65]/40 text-[#E85D65]'
            }`}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div>
              <h4 className="text-base font-bold text-[#F1F5F9]">{current.title}</h4>
              <p className="text-xs text-[#42D6C5] font-mono">{current.subtitle}</p>
            </div>
            <p className="text-sm text-[#9AAABD] leading-relaxed">{current.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-[#101923] p-2.5 rounded-lg border border-[#1E2D3D]">
                <span className="text-[#6F8094] block font-mono text-[10px] uppercase">Cognitive State</span>
                <span className="text-[#F1F5F9] font-bold">{current.brainState}</span>
              </div>
              <div className="bg-[#101923] p-2.5 rounded-lg border border-[#1E2D3D]">
                <span className="text-[#6F8094] block font-mono text-[10px] uppercase">Vulnerability / Takeaway</span>
                <span className="text-[#F1F5F9] font-bold">{current.weakness}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
