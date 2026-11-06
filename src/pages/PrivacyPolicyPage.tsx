import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Lock, Shield, CheckCircle2, EyeOff, Database } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 text-[var(--text-secondary)] text-sm leading-relaxed font-sans">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
          Data Governance & Privacy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-[var(--text-muted)]">
          Effective Date: November 2026 • Document Version 2.0.0
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-start gap-3 shadow-sm">
        <Lock className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--text-secondary)] font-sans">
          <strong>Summary:</strong> UnPhish is built on privacy-by-design principles. We do not require account registration, do not collect personal identities, do not run marketing trackers, and do not transmit URLs you inspect to any remote database.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">1. No Mandatory User Accounts</h2>
        <p>
          UnPhish requires zero user accounts, usernames, or passwords. You can complete all 12 modules, practice scenarios, and final assessments anonymously without registration.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">2. Local Browser Storage (localStorage)</h2>
        <p>
          To enable you to resume your learning across browser sessions, UnPhish utilizes your browser’s standard HTML5 <code>localStorage</code> API.
        </p>
        <p>We store only minimal educational progress state under the key <code>UNPHISH_V1_STATE</code>:</p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)] font-mono">
          <li>List of completed module IDs</li>
          <li>List of solved practice scenario IDs</li>
          <li>Your Final Assessment historical scores, dates, and times</li>
          <li>Count of URL inspections performed locally</li>
          <li>Your active UI theme preference (Dark, Light, or System)</li>
          <li>Onboarding completion flag and last visited module ID</li>
        </ul>
        <p className="text-xs text-[var(--text-muted)]">
          This data remains strictly on your local physical device. It is never transmitted to, backed up on, or synced with any external server. You can back up or wipe this data at any time via the "Export Progress" and "Reset Progress" buttons in the My Progress dashboard or by clearing your browser cache.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">3. URL Inspector Processing Boundaries</h2>
        <p>
          When you enter a web address into the <strong>UnPhish URL Inspector</strong>, the parsing and heuristic analysis take place <strong>100% locally inside your client browser</strong> using JavaScript.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
          <li>No HTTP network fetch requests are dispatched to the entered URL.</li>
          <li>No external DNS lookups are performed.</li>
          <li>Your entered URL is never submitted, logged, or shared with third-party threat feeds or advertising networks.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">4. Intelligent Assistant Telemetry Boundaries</h2>
        <p>
          The UnPhish Guide includes an <strong>Offline Learning Assistant</strong> that operates locally using an in-memory educational index with zero network requests. If configured with a server-side Gemini integration, queries are processed securely on the backend via Express solely to produce defensive cybersecurity guidance and are not linked to personal user accounts.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">5. Contact Form Data Handling</h2>
        <p>
          The feedback form on the Contact page does not connect to an automated database or external CRM. It prepares text directly on your screen and copies it to your clipboard for your own manual dispatch. No submitted personal information is retained in application storage.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">6. Practical Limitations</h2>
        <p>
          Because all progress is stored locally in your browser's private storage, switching browsers, using incognito windows, or clearing website data will remove your saved learning records unless you have exported a JSON backup.
        </p>
      </section>
    </div>
  );
};
