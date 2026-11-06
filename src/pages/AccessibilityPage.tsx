import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Eye, Keyboard, Palette, Sparkles, CheckCircle2 } from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 text-[var(--text-secondary)] text-sm leading-relaxed font-sans">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Accessibility Statement' }]} />

      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
          Universal Inclusion Standards
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans">
          Accessibility Statement
        </h1>
        <p className="text-xs font-mono text-[var(--text-muted)]">
          Target Compliance: WCAG 2.1 Level AA • Platform Standard
        </p>
      </div>

      <p>
        Cybersecurity awareness is a universal right. UnPhish is committed to ensuring that our educational curriculum, interactive practice labs, and URL inspection tools are accessible to all learners, including individuals with visual, motor, auditory, or cognitive disabilities.
      </p>

      {/* Pillars of Accessibility */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--accent-primary)]">
            <Palette className="w-5 h-5" />
            <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">High Contrast & Visual Hierarchy</h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
            All text and UI controls maintain a minimum contrast ratio of 4.5:1 against their backgrounds in both dark and light modes, meeting WCAG AA requirements for body copy and headings.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--accent-secondary)]">
            <Keyboard className="w-5 h-5" />
            <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">Full Keyboard Operability</h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
            All interactive components—including navigation links, quiz choices, modal dialogs, and URL analyzer forms—can be navigated sequentially using standard keyboard keys (<code>Tab</code>, <code>Enter</code>, <code>Space</code>, and <code>Escape</code>) with visible focus rings.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--success)]">
            <Eye className="w-5 h-5" />
            <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">Semantic Markup & Screen Readers</h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
            We use semantic HTML5 elements (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code>) along with ARIA attributes to ensure clear hierarchy for assistive screen-reading technologies.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--warning)]">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">Zero Flashing & Reduced Motion</h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
            We avoid rapid flashing effects, disruptive autoplay animations, or aggressive layout shifts. Transitions respect user preferences for reduced motion via <code>@media (prefers-reduced-motion: reduce)</code>.
          </p>
        </div>
      </div>

      <section className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">Continuous Improvement & Feedback</h2>
        <p>
          We welcome feedback from users with disabilities. If you encounter any accessibility barrier or have recommendations for improving accessibility in UnPhish, please prepare a notice on our Contact page under the "Accessibility feedback" category.
        </p>
      </section>
    </div>
  );
};
