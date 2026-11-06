import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AlertTriangle, ShieldCheck, Scale, FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 text-[var(--text-secondary)] text-sm leading-relaxed font-sans">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />

      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
          Legal Agreement & Terms of Service
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans">
          Terms of Use
        </h1>
        <p className="text-xs font-mono text-[var(--text-muted)]">
          Last Revised: November 2026 • Document Version 2.0.0
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-start gap-3 shadow-sm">
        <Scale className="w-5 h-5 text-[var(--warning)] shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--text-secondary)] font-sans">
          By accessing and using UnPhish, you agree to these Terms of Use. If you do not agree with these provisions, you should refrain from utilizing this platform.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">1. Exclusively Educational Purpose</h2>
        <p>
          UnPhish is developed solely for defensive cybersecurity education, academic study, and public security awareness. It is intended to equip individuals with knowledge to avoid becoming victims of fraud and digital exploitation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">2. Prohibition on Unauthorized Offensive Testing</h2>
        <p>
          Users must NOT utilize information, code snippets, or conceptual analyses obtained from UnPhish to conduct unauthorized penetration testing, vulnerability scanning, social engineering campaigns, credential harvesting, or cyberattacks against any individual, corporation, infrastructure, or institution.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">3. Nature of Simulated Practice Scenarios</h2>
        <p>
          All scenarios, emails, message texts, company names, and domains displayed in the Practice Lab and lessons are fictional creations. Any resemblance to real commercial entities or living individuals is purely pedagogical. UnPhish does not connect to live malicious command-and-control servers or distribute malicious payloads.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">4. Limitations of the Local URL Inspector</h2>
        <p>
          The UnPhish URL Inspector utilizes static grammatical and structural heuristics. <strong>You explicitly acknowledge that:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
          <li>The tool cannot and does not guarantee that any analyzed website is safe, benign, or free of malware.</li>
          <li>The absence of detected indicators does not constitute a warranty of safety.</li>
          <li>The tool must not be used as an enterprise-grade automated malware sandbox or sole decision-making filter for sensitive transactions.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">5. Disclaimer of Professional Security Warranty</h2>
        <p>
          UnPhish and its creator (Rahul Mishra) provide this platform on an "AS-IS" and "AS-AVAILABLE" basis without warranties of any kind. Completion of modules or assessments does not confer accredited professional industry certification or legal liability coverage.
        </p>
      </section>
    </div>
  );
};
