import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { getStoredProgress } from '../lib/storage';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  BookOpen,
  CheckCircle,
  Clock,
  ArrowRight,
  Filter,
  PlayCircle,
  Compass,
} from 'lucide-react';

export const LearnPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const progress = getStoredProgress();

  const categories = [
    { id: 'all', label: 'All Modules (12)' },
    { id: 'foundations', label: 'Foundations' },
    { id: 'email-security', label: 'Email Security' },
    { id: 'web-mobile', label: 'Web & Mobile' },
    { id: 'psychology', label: 'Psychology' },
    { id: 'defense-response', label: 'Defense & Response' },
    { id: 'synthesis', label: 'Synthesis & Scenarios' },
  ];

  const filteredModules = CURRICULUM_MODULES.filter((mod) => {
    if (selectedCategory !== 'all' && mod.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && mod.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const completedCount = progress.completedModuleIds.length;
  const progressPercent = Math.round((completedCount / CURRICULUM_MODULES.length) * 100);

  // Determine next module to suggest
  let nextUpModule = CURRICULUM_MODULES.find((m) => !progress.completedModuleIds.includes(m.id)) || CURRICULUM_MODULES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Curriculum' }]} />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border-subtle)] pb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--accent-primary)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
              Cybersecurity Curriculum
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans">
            12-Module Learning Curriculum
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
            Step through a structured educational pathway covering the entire phishing threat lifecycle—from cognitive social engineering triggers to technical URL inspection and incident containment.
          </p>
        </div>

        {/* Real Progress Card */}
        <div className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-5 min-w-[260px] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[var(--text-secondary)]">Curriculum Mastery</span>
            <span className="text-[var(--accent-primary)] font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[var(--surface-sunken)] h-2.5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
            <div
              className="bg-[var(--accent-primary)] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-[var(--text-muted)] font-mono">
            {completedCount} of {CURRICULUM_MODULES.length} modules completed
          </p>
        </div>
      </div>

      {/* Continue Learning Callout if unfinished */}
      {completedCount < CURRICULUM_MODULES.length && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-primary)] font-bold">
              Recommended Next Step
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-sans">
              Module 0{nextUpModule.number}: {nextUpModule.title}
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Estimated study time: {nextUpModule.estimatedMinutes} minutes • {nextUpModule.learningObjectives.length} key learning objectives
            </p>
          </div>
          <Link
            to={`/learn/${nextUpModule.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--bg-main)] font-bold text-xs shadow-md shrink-0 self-start sm:self-auto"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Resume Lesson</span>
          </Link>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--surface-elevated)] p-4 rounded-2xl border border-[var(--border-subtle)] shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-mono text-[var(--text-muted)] mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] font-bold shadow-sm'
                  : 'bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[var(--text-muted)]">Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-[var(--surface-sunken)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((mod) => {
          const isCompleted = progress.completedModuleIds.includes(mod.id);

          return (
            <div
              key={mod.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden shadow-sm ${
                isCompleted
                  ? 'bg-[var(--surface-elevated)] border-[var(--success-border)]'
                  : 'bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border-[var(--border-subtle)] hover:border-[var(--accent-primary-border)]'
              }`}
            >
              <div className="p-6 space-y-4">
                {/* Header row: Module number + Status */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] text-[var(--accent-primary)] border border-[var(--border-subtle)]">
                    Module {mod.number < 10 ? `0${mod.number}` : mod.number}
                  </span>
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="text-xs font-mono text-[var(--success)] flex items-center gap-1 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {mod.estimatedMinutes}m
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Short Description */}
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors font-sans">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed font-sans">
                    {mod.shortDescription}
                  </p>
                </div>

                {/* Objectives list */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] font-semibold block">
                    Learning Focus:
                  </span>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                    {mod.learningObjectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[var(--accent-primary)] mt-0.5">•</span>
                        <span className="line-clamp-1">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer action */}
              <div className="px-6 py-4 bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[var(--text-muted)]">
                  {mod.difficulty}
                </span>

                <Link
                  to={`/learn/${mod.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent-primary)] hover:underline transition-colors"
                >
                  <span>{isCompleted ? 'Review Module' : 'Open Lesson'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
