import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Award, Code, BookOpen, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const CreditsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12 text-[var(--text-secondary)] text-sm leading-relaxed font-sans">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Credits & Attributions' }]} />

      {/* Page Header */}
      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
          Attribution & Acknowledgments
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans">
          Credits & Attributions
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
          Transparent recognition of the creator, open-source software libraries, and public cybersecurity standards that made UnPhish possible.
        </p>
      </div>

      {/* Primary Project Creator Attribution (Exact Prompt Requirements) */}
      <section className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase font-semibold">
          <Award className="w-4 h-4" />
          <span>Project Creator Attribution</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)] font-sans">
            Created by Rahul Mishra
          </h2>
          <p className="text-sm font-mono text-[var(--accent-primary)] font-semibold">
            B.Tech CSE — Cyber Security Student
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-relaxed space-y-2 font-sans">
          <p className="font-semibold text-[var(--text-primary)]">
            UnPhish — An independent cybersecurity awareness and learning project.
          </p>
          <p className="text-[var(--text-muted)]">
            Developed independently as a practical contribution to public cybersecurity awareness and education. This application does not represent an institutional partnership, official endorsement, or commercial corporate product.
          </p>
        </div>
      </section>

      {/* Open-Source Libraries & Frameworks */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-lg font-sans">
          <Code className="w-5 h-5 text-[var(--accent-primary)]" />
          <h2>Open-Source Software & Dependencies</h2>
        </div>
        <p className="text-xs text-[var(--text-muted)] font-sans">
          UnPhish is built with gratitude upon exceptional open-source libraries under permissive MIT, Apache-2.0, and ISC licenses:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1 shadow-sm">
            <span className="font-mono font-bold text-[var(--text-primary)]">React & React DOM</span>
            <p className="text-[var(--text-muted)] text-[11px]">MIT License • Meta Open Source & Community</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1 shadow-sm">
            <span className="font-mono font-bold text-[var(--text-primary)]">Vite</span>
            <p className="text-[var(--text-muted)] text-[11px]">MIT License • Evan You & Vite Contributors</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1 shadow-sm">
            <span className="font-mono font-bold text-[var(--text-primary)]">TypeScript</span>
            <p className="text-[var(--text-muted)] text-[11px]">Apache-2.0 License • Microsoft Corporation</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1 shadow-sm">
            <span className="font-mono font-bold text-[var(--text-primary)]">Tailwind CSS</span>
            <p className="text-[var(--text-muted)] text-[11px]">MIT License • Tailwind Labs, Inc.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1 shadow-sm">
            <span className="font-mono font-bold text-[var(--text-primary)]">Lucide Icons</span>
            <p className="text-[var(--text-muted)] text-[11px]">ISC License • Lucide Project Contributors</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1 shadow-sm">
            <span className="font-mono font-bold text-[var(--text-primary)]">Canvas Confetti</span>
            <p className="text-[var(--text-muted)] text-[11px]">ISC License • Kiril Vatev</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1 shadow-sm">
            <span className="font-mono font-bold text-[var(--text-primary)]">@google/genai</span>
            <p className="text-[var(--text-muted)] text-[11px]">Apache-2.0 License • Google LLC</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1 shadow-sm">
            <span className="font-mono font-bold text-[var(--text-primary)]">Express</span>
            <p className="text-[var(--text-muted)] text-[11px]">MIT License • OpenJS Foundation</p>
          </div>
        </div>
      </section>

      {/* Public Standards & Educational Frameworks */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-lg font-sans">
          <BookOpen className="w-5 h-5 text-[var(--accent-secondary)]" />
          <h2>Cybersecurity Standards & Industry References</h2>
        </div>
        <p className="text-xs text-[var(--text-muted)] font-sans">
          The educational frameworks and technical taxonomy in UnPhish are grounded in open documentation published by industry standards bodies:
        </p>

        <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] font-sans">
          <li className="p-3 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-sm">
            <strong className="text-[var(--text-primary)]">NIST SP 800-63B:</strong> Digital Identity Guidelines (Authentication and Lifecycle Management, FIDO2/Passkey phish-resistance criteria).
          </li>
          <li className="p-3 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-sm">
            <strong className="text-[var(--text-primary)]">MITRE ATT&CK® Enterprise Framework:</strong> Technique T1566 (Phishing: Spearphishing Attachment, Spearphishing Link, Spearphishing via Service).
          </li>
          <li className="p-3 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-sm">
            <strong className="text-[var(--text-primary)]">CISA (Cybersecurity & Infrastructure Security Agency):</strong> Phishing Guidance and Cross-Sector Cybersecurity Performance Goals (CPGs).
          </li>
          <li className="p-3 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-sm">
            <strong className="text-[var(--text-primary)]">APWG (Anti-Phishing Working Group):</strong> Global Phishing Activity Trend Reports and domain abuse metrics.
          </li>
          <li className="p-3 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-sm">
            <strong className="text-[var(--text-primary)]">IETF RFC 5322 & RFC 7489:</strong> Internet Message Format, Sender Policy Framework (SPF), and Domain-based Message Authentication (DMARC).
          </li>
        </ul>
      </section>

      {/* Notice on Intellectual Property */}
      <section className="p-4 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] leading-relaxed font-sans">
        <strong className="text-[var(--text-primary)]">Notice on Third-Party Intellectual Property:</strong> All trademarks, product names, logos, and brands mentioned in educational case studies or fictional scenarios (such as PayPal, Google, Apple, Microsoft, Chase, Okta, and Twilio) are property of their respective owners. Mention does not imply endorsement or affiliation. Original UnPhish curriculum text and diagrams are authored for UnPhish.
      </section>
    </div>
  );
};
