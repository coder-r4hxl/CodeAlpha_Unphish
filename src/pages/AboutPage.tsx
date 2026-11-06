import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Shield, BookOpen, Lock, Terminal, Award, AlertTriangle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'About UnPhish' }]} />

      {/* Header */}
      <div className="space-y-4 border-b border-[var(--border-subtle)] pb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
          Platform Architecture & Mission
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans">
          About UnPhish
        </h1>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed font-sans">
          An open educational initiative dedicated to demystifying phishing, social engineering, and cyber deception for students, educators, and everyday internet users.
        </p>
      </div>

      {/* Creator & Academic Attribution Section (Mandatory Exact Attribution) */}
      <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 sm:p-8 space-y-4 shadow-xl">
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

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-1 font-sans">
          UnPhish is an independent cybersecurity awareness and learning project created by Rahul Mishra, a B.Tech Computer Science and Engineering student specializing in Cyber Security. It was architected from the ground up as a practical learning tool to bridge the gap between abstract security policies and tangible human reflexes.
        </p>

        <div className="p-3.5 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] leading-relaxed font-sans">
          <strong>Notice of Independence:</strong> This platform is an independent educational engineering project. It is not an enterprise commercial vendor, nor does it claim formal sponsorship, institutional partnership, or official endorsement by any academic institution, government body, or commercial corporation.
        </div>
      </div>

      {/* Why UnPhish Exists */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-sans">Why UnPhish Exists</h2>
        <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
          <p>
            Traditional corporate security awareness training too often treats humans as the "weakest link" through punitive surprise phishing simulations that induce shame rather than understanding.
          </p>
          <p>
            UnPhish was built on the inverse principle: <strong>informed humans are the ultimate primary line of cyber defense</strong>. By providing transparent technical explanations, visual diagrams, and hands-on static URL inspection tools, we empower users to understand <em>why</em> attacks work and <em>how</em> to recognize them independently.
          </p>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2 shadow-sm">
          <BookOpen className="w-5 h-5 text-[var(--accent-primary)]" />
          <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">12 Modular Lessons</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
            From the CIA triad and psychological manipulation to SPF/DKIM/DMARC headers, passkeys, and real-world case studies.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2 shadow-sm">
          <Terminal className="w-5 h-5 text-[var(--accent-secondary)]" />
          <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">Local URL Inspector</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
            A real client-side JavaScript engine that tests URLs against 12 heuristics without exposing your web traffic to third parties.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2 shadow-sm">
          <Lock className="w-5 h-5 text-[var(--success)]" />
          <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">Privacy by Design</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
            Zero accounts, zero trackers, and zero external database dependencies. Your progress resides strictly in your browser.
          </p>
        </div>
      </section>

      {/* Educational Disclaimer */}
      <section className="rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] p-6 space-y-2 text-xs text-[var(--text-muted)] leading-relaxed font-sans">
        <div className="flex items-center gap-2 text-[var(--warning)] font-bold uppercase tracking-wider text-[11px] font-mono">
          <AlertTriangle className="w-4 h-4" />
          <span>Educational Disclaimer</span>
        </div>
        <p>
          All scenarios, emails, phone numbers, and simulated domains featured on UnPhish are strictly fictional and intended exclusively for defensive cybersecurity education and threat awareness. UnPhish does not host malware, execute unauthorized reconnaissance, or facilitate offensive cyber operations.
        </p>
      </section>
    </div>
  );
};
