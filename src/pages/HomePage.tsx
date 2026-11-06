import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroIllustration } from '../components/visuals/HeroIllustration';
import { CURRICULUM_MODULES } from '../data/curriculum';
import {
  ShieldAlert,
  ArrowRight,
  Search,
  BookOpen,
  Award,
  CheckCircle,
  AlertTriangle,
  Layers,
  Sparkles,
  PlayCircle,
  Clock,
  Compass,
} from 'lucide-react';
import { getStoredProgress } from '../lib/storage';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [quickUrl, setQuickUrl] = useState('');
  const progress = getStoredProgress();

  const handleQuickInspect = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickUrl.trim()) {
      navigate(`/inspector?url=${encodeURIComponent(quickUrl.trim())}`);
    } else {
      navigate('/inspector');
    }
  };

  // Determine genuine Continue Learning recommendation
  const completedCount = progress.completedModuleIds.length;
  const progressPercent = Math.round((completedCount / CURRICULUM_MODULES.length) * 100);

  // Find next module to study
  let recommendedModule = CURRICULUM_MODULES[0];
  if (progress.lastVisitedModuleId) {
    const foundLast = CURRICULUM_MODULES.find((m) => m.id === progress.lastVisitedModuleId);
    if (foundLast) recommendedModule = foundLast;
  } else {
    const nextUncompleted = CURRICULUM_MODULES.find(
      (m) => !progress.completedModuleIds.includes(m.id)
    );
    if (nextUncompleted) recommendedModule = nextUncompleted;
  }

  const isRecommendedCompleted = progress.completedModuleIds.includes(recommendedModule.id);

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[var(--surface-elevated)] text-[var(--accent-primary)] border border-[var(--border-subtle)] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span>Cybersecurity Awareness & Learning Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] font-sans">
              Think before you <span className="text-[var(--accent-primary)]">click.</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto font-sans">
              Master the psychological and technical anatomy of phishing attacks. Analyze real-world social engineering vectors, inspect suspicious URLs locally, and build resilient cyber defense instincts.
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/learn"
                className="px-6 py-3.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--bg-main)] font-bold text-sm transition-all shadow-lg shadow-[var(--accent-primary)]/20 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Start Learning (12 Modules)</span>
              </Link>

              <Link
                to="/practice"
                className="px-6 py-3.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] font-semibold text-sm border border-[var(--border-subtle)] transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              >
                <ShieldAlert className="w-4 h-4 text-[var(--warning)]" />
                <span>Explore Practice Lab</span>
              </Link>

              <Link
                to="/inspector"
                className="px-6 py-3.5 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium text-sm border border-[var(--border-subtle)] transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              >
                <Search className="w-4 h-4 text-[var(--accent-secondary)]" />
                <span>Inspect a URL</span>
              </Link>
            </div>

            {/* Zero Registration Notice */}
            <p className="text-xs text-[var(--text-muted)] font-mono">
              ✓ No account required • 100% Private local browser storage • Real educational tools
            </p>
          </div>

          {/* Interactive Hero Illustration */}
          <div className="mt-12 max-w-4xl mx-auto">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Continue Learning Section (Based strictly on genuine local progress) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 sm:p-8 shadow-xl transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] border border-[var(--accent-primary-border)] font-bold">
                  {completedCount > 0 ? 'Continue Your Learning' : 'Start Your Journey'}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {completedCount} of 12 Modules Completed ({progressPercent}%)
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-[var(--text-primary)]">
                  Module 0{recommendedModule.number}: {recommendedModule.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                  {recommendedModule.shortDescription}
                </p>
              </div>

              {/* Genuine Progress Track Bar */}
              <div className="w-full max-w-md space-y-1">
                <div className="w-full h-2 rounded-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] overflow-hidden">
                  <div
                    className="h-full bg-[var(--accent-primary)] transition-all duration-500 rounded-full"
                    style={{ width: `${Math.max(progressPercent, 4)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
                  <span>Foundations</span>
                  <span>Incident Response</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
              <Link
                to={`/learn/${recommendedModule.id}`}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--bg-main)] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-[var(--accent-primary)]/15"
              >
                <PlayCircle className="w-4 h-4" />
                <span>{isRecommendedCompleted ? 'Review Module' : 'Resume Lesson'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/progress"
                className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1"
              >
                <span>View Full Progress & Audit</span>
                <Compass className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Interactive URL Inspector Teaser */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[var(--accent-primary)]" />
                <h2 className="text-xl font-bold text-[var(--text-primary)] font-sans">
                  Live Static URL Inspector
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl font-sans">
                Enter any web address to test it against our 12 local structural heuristics. Analyzed entirely inside your browser—never sent to external servers.
              </p>
            </div>

            <form onSubmit={handleQuickInspect} className="flex-1 max-w-md w-full flex items-center gap-2">
              <input
                type="text"
                value={quickUrl}
                onChange={(e) => setQuickUrl(e.target.value)}
                placeholder="e.g. paypal.com.verify-notice.top/login"
                className="flex-1 bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--bg-main)] font-bold text-xs sm:text-sm transition-all shrink-0 shadow-sm"
              >
                Inspect
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Threat Landscape Reality */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
            Threat Landscape Reality
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-sans">
            Why Technology Alone Cannot Stop Phishing
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-sans">
            Attackers do not break passwords; they ask you to type them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--critical-subtle)] border border-[var(--critical-border)] text-[var(--critical)] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">
              80%+ of Breaches Involve Human Factor
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
              According to documented industry incident reports, the overwhelming majority of cybersecurity intrusions begin not with technical zero-days, but with social engineering and credential harvesting.
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--warning-subtle)] border border-[var(--warning-border)] text-[var(--warning)] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">
              The Modern AiTM Reverse Proxy Threat
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
              Modern phishing toolkits act as transparent reverse proxies (AiTM), intercepting one-time 2FA codes and authenticated session tokens in real time. Static password protection is no longer sufficient.
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--success-subtle)] border border-[var(--success-border)] text-[var(--success)] flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">
              Situational Awareness as a Superpower
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
              Learning how to read domain anatomy, recognize cognitive triggers (urgency, authority), and enforce out-of-band verification neutralizes over 95% of social engineering vectors.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Pathway Preview (12 Modules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
              Structured Educational Pathway
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-sans">
              The 12-Module UnPhish Curriculum
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1 font-sans">
              Beginner-friendly, structured lessons grounded in documented cybersecurity standards.
            </p>
          </div>

          <Link
            to="/learn"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:underline font-mono"
          >
            <span>View Full Curriculum & Status</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRICULUM_MODULES.slice(0, 6).map((mod) => {
            const isCompleted = progress.completedModuleIds.includes(mod.id);
            return (
              <Link
                key={mod.id}
                to={`/learn/${mod.id}`}
                className="group rounded-2xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary-border)] p-5 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--surface-sunken)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                      Module 0{mod.number}
                    </span>
                    {isCompleted ? (
                      <span className="text-[11px] font-mono text-[var(--success)] flex items-center gap-1 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {mod.estimatedMinutes} mins
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors font-sans">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5 line-clamp-2 leading-relaxed font-sans">
                    {mod.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
                  <span className="capitalize">{mod.difficulty}</span>
                  <span className="text-[var(--accent-primary)] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    Start <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-subtle)] transition-all shadow-sm"
          >
            <span>Explore all 12 modules (including Case Studies & Incident Response)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          </Link>
        </div>
      </section>

      {/* Creator & Academic Attribution Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left shadow-lg">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary-border)] text-[var(--accent-primary)] flex items-center justify-center shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-1 flex-1">
            <span className="text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider font-semibold">
              Independent Cybersecurity Learning Project
            </span>
            <h3 className="text-lg font-bold text-[var(--text-primary)] font-sans">
              Created by Rahul Mishra
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              B.Tech CSE — Cyber Security Student
            </p>
            <p className="text-xs text-[var(--text-secondary)] pt-1 leading-relaxed font-sans">
              Designed as an educational contribution to empower non-technical users, students, and beginners with practical defense skills.
            </p>
          </div>
          <Link
            to="/about"
            className="px-4 py-2 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] text-xs font-medium border border-[var(--border-subtle)] transition-all shrink-0"
          >
            About Project
          </Link>
        </div>
      </section>
    </div>
  );
};
