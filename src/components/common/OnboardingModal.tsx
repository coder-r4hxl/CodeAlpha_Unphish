import React, { useState } from 'react';
import {
  ShieldCheck,
  BookOpen,
  Search,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { setOnboardingSeen } from '../../lib/storage';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      stepNumber: 1,
      badge: 'Welcome to UnPhish',
      title: 'Think Before You Click',
      tagline: 'Practical Cybersecurity Defense Against Social Engineering',
      description:
        'UnPhish is an interactive, privacy-first cybersecurity education platform designed to train internet users how to recognize, dissect, and counter social engineering attacks, deceptive emails, and credential harvesting.',
      highlights: [
        'Zero tracking or server-side telemetry — 100% stored in your browser',
        'Built with technical rigor, real-world examples, and actionable habits',
        'Created by Rahul Mishra (B.Tech CSE — Cyber Security Student)',
      ],
      icon: ShieldCheck,
      iconColor: 'text-[var(--accent-primary)]',
      bgGlow: 'bg-[var(--accent-primary-subtle)]',
    },
    {
      stepNumber: 2,
      badge: 'Pedagogy & Curriculum',
      title: '12 Deep-Dive Learning Modules',
      tagline: 'From Foundational Deception to Incident Triage',
      description:
        'Master the mechanics of phishing through our structured 12-module syllabus. Each lesson includes deep breakdowns of attack vectors, the Right-to-Left URL rule, passkey authentication, and emergency containment steps.',
      highlights: [
        'Detailed architectural diagrams and visual breakdown callouts',
        'Real-world red flag checklists and interactive knowledge checks',
        'Self-paced progress saved directly to your device',
      ],
      icon: BookOpen,
      iconColor: 'text-[var(--accent-secondary)]',
      bgGlow: 'bg-[var(--accent-secondary-subtle)]',
    },
    {
      stepNumber: 3,
      badge: 'Hands-on Labs',
      title: 'Practice Lab & Local URL Inspector',
      tagline: 'Safe, Risk-Free Sandboxes to Hone Your Defense',
      description:
        'Test your instincts against simulated email, SMS, and fake login attacks in the Practice Lab. Use the client-side URL Inspector to dissect domains, punycode spoofing, and IP-based URLs safely without executing malicious payloads.',
      highlights: [
        'Static heuristic analysis of domain structures and protocols',
        'Immediate educational feedback on every practice decision',
        'Zero external requests made during URL analysis for complete privacy',
      ],
      icon: Terminal,
      iconColor: 'text-[var(--warning)]',
      bgGlow: 'bg-[var(--warning-subtle)]',
    },
    {
      stepNumber: 4,
      badge: 'Fast Navigation & Assistance',
      title: 'Instant Search (⌘K) & UnPhish Guide',
      tagline: 'Search Anywhere, Ask Any Cybersecurity Question',
      description:
        'Press ⌘K (or Ctrl+K) anywhere to instantly query topics, modules, or tools. When you have questions about tricky attack vectors, consult UnPhish Guide — available both with Gemini AI and an integrated offline fallback engine.',
      highlights: [
        'Global command palette with keyboard arrow navigation',
        'Integrated UnPhish Guide tutor built for fast concept clarification',
        'Seamless Dark, Light, and System theme switching',
      ],
      icon: Search,
      iconColor: 'text-[var(--accent-primary)]',
      bgGlow: 'bg-[var(--accent-primary-subtle)]',
    },
  ];

  const step = steps[currentStep];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setOnboardingSeen(true);
    onComplete();
  };

  const handleSkip = () => {
    setOnboardingSeen(true);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--bg-main)]/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
        {/* Subtle Decorative Accent Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-50 bg-[var(--accent-primary)]/15"
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--accent-primary)] border border-[var(--border-subtle)] font-bold">
              {step.badge}
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] px-2 py-1 rounded-lg hover:bg-[var(--surface-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
          >
            <span>Skip Tour</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step Body */}
        <div className="py-6 space-y-4 relative z-10">
          <div className="flex items-start gap-4">
            <div
              className={`p-3.5 rounded-2xl border border-[var(--border-subtle)] ${step.bgGlow} shrink-0`}
            >
              <StepIcon className={`w-8 h-8 ${step.iconColor}`} />
            </div>

            <div className="space-y-1">
              <h2
                id="onboarding-modal-title"
                className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-[var(--text-primary)]"
              >
                {step.title}
              </h2>
              <p className="text-xs font-mono text-[var(--accent-primary)]">{step.tagline}</p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
            {step.description}
          </p>

          <div className="p-4 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
              Key Capabilities:
            </span>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              {step.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step Navigation Footer */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4 relative z-10">
          {/* Step indicator dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === currentStep
                    ? 'w-6 bg-[var(--accent-primary)]'
                    : 'w-2 bg-[var(--border-strong)] hover:bg-[var(--text-muted)]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-3.5 py-2 rounded-xl text-xs font-mono border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl text-xs font-bold font-sans bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--bg-main)] transition-all flex items-center gap-1.5 shadow-lg shadow-[var(--accent-primary)]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            >
              <span>{currentStep === steps.length - 1 ? 'Start Learning' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
