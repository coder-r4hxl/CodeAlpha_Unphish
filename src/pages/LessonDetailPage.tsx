import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { getStoredProgress, toggleModuleCompleted, setLastVisitedModule } from '../lib/storage';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useToast } from '../components/common/ToastContext';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Check,
} from 'lucide-react';
import { EmailAnatomyDiagram } from '../components/visuals/EmailAnatomyDiagram';
import { UrlAnatomyDiagram } from '../components/visuals/UrlAnatomyDiagram';
import { PsychologyFlowDiagram } from '../components/visuals/PsychologyFlowDiagram';
import { AttackLifecycleDiagram } from '../components/visuals/AttackLifecycleDiagram';
import { PreventionWorkflowDiagram } from '../components/visuals/PreventionWorkflowDiagram';
import { IncidentResponseDiagram } from '../components/visuals/IncidentResponseDiagram';
import confetti from 'canvas-confetti';

export const LessonDetailPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { success, info } = useToast();

  const moduleIndex = CURRICULUM_MODULES.findIndex((m) => m.id === moduleId);
  const currentModule = CURRICULUM_MODULES[moduleIndex] || CURRICULUM_MODULES[0];

  const prevModule = moduleIndex > 0 ? CURRICULUM_MODULES[moduleIndex - 1] : null;
  const nextModule = moduleIndex < CURRICULUM_MODULES.length - 1 ? CURRICULUM_MODULES[moduleIndex + 1] : null;

  const [progressState, setProgressState] = useState(getStoredProgress());
  const isCompleted = progressState.completedModuleIds.includes(currentModule.id);

  // Track last visited module for Continue Learning feature
  useEffect(() => {
    setLastVisitedModule(currentModule.id);
  }, [currentModule.id]);

  // Knowledge check state: { [questionId]: { selected: number, submitted: boolean } }
  const [kcAnswers, setKcAnswers] = useState<{
    [qId: string]: { selected: number | null; submitted: boolean };
  }>({});

  const handleSelectOption = (qId: string, optionIdx: number) => {
    setKcAnswers((prev) => ({
      ...prev,
      [qId]: {
        selected: optionIdx,
        submitted: false,
      },
    }));
  };

  const handleSubmitAnswer = (qId: string) => {
    setKcAnswers((prev) => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        submitted: true,
      },
    }));
  };

  const handleToggleCompleted = () => {
    const updated = toggleModuleCompleted(currentModule.id);
    setProgressState(updated);
    if (!isCompleted) {
      success(`Marked Module ${currentModule.number} as completed!`, 'Curriculum Progress');
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch (e) {
        // Safe fallback
      }
    } else {
      info(`Unmarked Module ${currentModule.number}.`, 'Progress Updated');
    }
  };

  // Render diagram based on section diagramType
  const renderDiagram = (type?: string) => {
    switch (type) {
      case 'psychology':
        return <PsychologyFlowDiagram />;
      case 'email-anatomy':
        return <EmailAnatomyDiagram />;
      case 'url-anatomy':
        return <UrlAnatomyDiagram />;
      case 'attack-lifecycle':
        return <AttackLifecycleDiagram />;
      case 'prevention':
        return <PreventionWorkflowDiagram />;
      case 'incident-response':
        return <IncidentResponseDiagram />;
      default:
        return null;
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <Breadcrumbs
          items={[
            { label: 'Curriculum', path: '/learn' },
            { label: `Module 0${currentModule.number}: ${currentModule.title}` },
          ]}
        />

        <span className="text-xs font-mono text-[var(--text-muted)]">
          Module {currentModule.number} of {CURRICULUM_MODULES.length}
        </span>
      </div>

      {/* Lesson Hero Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] text-[var(--accent-primary)] border border-[var(--border-subtle)]">
            Module {currentModule.number < 10 ? `0${currentModule.number}` : currentModule.number}
          </span>
          <span className="text-xs font-mono text-[var(--text-secondary)] capitalize px-2 py-0.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
            {currentModule.difficulty}
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5 ml-auto">
            <Clock className="w-3.5 h-3.5" />
            Estimated: {currentModule.estimatedMinutes} mins
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans tracking-tight">
          {currentModule.title}
        </h1>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed font-sans">
          {currentModule.shortDescription}
        </p>

        {/* Learning Objectives Box */}
        <div className="mt-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--accent-primary)] text-xs font-mono font-semibold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Learning Objectives</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
            {currentModule.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[var(--accent-primary)] font-bold mt-0.5">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Detailed Lesson Sections */}
      <div className="space-y-12">
        {currentModule.sections.map((section) => (
          <section key={section.id} className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2 font-sans">
              {section.title}
            </h2>

            <div className="space-y-4 text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed font-sans">
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Embedded Visual Diagram if configured */}
            {section.diagramType && renderDiagram(section.diagramType)}

            {/* Warning Signs Checklist if present */}
            {section.warningSigns && section.warningSigns.length > 0 && (
              <div className="rounded-2xl bg-[var(--critical-subtle)] border border-[var(--critical-border)] p-5 space-y-3">
                <div className="flex items-center gap-2 text-[var(--critical)] text-xs font-mono font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Key Warning Signs & Red Flags</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-primary)] font-sans">
                  {section.warningSigns.map((ws, wIdx) => (
                    <li key={wIdx} className="flex items-start gap-2.5">
                      <span className="text-[var(--critical)] font-bold mt-0.5">⚠️</span>
                      <span>{ws}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practical Example Box if present */}
            {section.practicalExample && (
              <div className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-5 space-y-3 shadow-sm">
                <span className="text-xs font-mono text-[var(--warning)] uppercase font-semibold block">
                  Practical Scenario Breakdown: {section.practicalExample.title}
                </span>
                <p className="text-xs sm:text-sm text-[var(--text-primary)] bg-[var(--surface-sunken)] p-3.5 rounded-xl border border-[var(--border-subtle)] italic font-mono">
                  "{section.practicalExample.scenario}"
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                  <strong>Analysis:</strong> {section.practicalExample.analysis}
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] block mb-1">
                    Identified Red Flags:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {section.practicalExample.redFlags.map((rf, rIdx) => (
                      <span
                        key={rIdx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--critical-subtle)] text-[var(--critical)] border border-[var(--critical-border)] font-mono"
                      >
                        {rf}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Key Takeaways Card */}
      <section className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-[var(--success)] text-xs font-mono font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>Core Takeaways for Daily Defense</span>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
          {currentModule.keyTakeaways.map((takeaway, tIdx) => (
            <li key={tIdx} className="flex items-start gap-2.5">
              <span className="text-[var(--success)] font-bold mt-0.5">✓</span>
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Interactive Evaluated Knowledge Check */}
      <section className="space-y-6 pt-6 border-t border-[var(--border-subtle)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[var(--accent-primary)] text-xs font-mono font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Knowledge Check</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-sans">
            Verify Your Understanding
          </h2>
          <p className="text-xs text-[var(--text-secondary)] font-sans">
            Select your answer to evaluate your comprehension before advancing.
          </p>
        </div>

        <div className="space-y-6">
          {currentModule.knowledgeCheck.map((kc, kIdx) => {
            const qState = kcAnswers[kc.id] || { selected: null, submitted: false };
            const isSubmitted = qState.submitted;
            const isCorrect = qState.selected === kc.correctIndex;

            return (
              <div
                key={kc.id}
                className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--surface-sunken)] text-[var(--accent-primary)] font-bold shrink-0 border border-[var(--border-subtle)]">
                    Q{kIdx + 1}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-[var(--text-primary)] font-sans">
                    {kc.question}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  {kc.options.map((opt, optIdx) => {
                    const isSelected = qState.selected === optIdx;
                    let optionClasses =
                      'p-3 rounded-xl border text-left text-xs sm:text-sm transition-all w-full flex items-start gap-3 ';

                    if (!isSubmitted) {
                      optionClasses += isSelected
                        ? 'bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] border-[var(--accent-primary-border)] ring-1 ring-[var(--accent-primary)] font-medium'
                        : 'bg-[var(--surface-sunken)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]';
                    } else {
                      if (optIdx === kc.correctIndex) {
                        optionClasses += 'bg-[var(--success-subtle)] text-[var(--success)] border-[var(--success-border)] ring-1 ring-[var(--success)] font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optionClasses += 'bg-[var(--critical-subtle)] text-[var(--critical)] border-[var(--critical-border)] ring-1 ring-[var(--critical)] font-medium';
                      } else {
                        optionClasses += 'bg-[var(--surface-sunken)] text-[var(--text-muted)] border-[var(--border-subtle)] opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(kc.id, optIdx)}
                        className={optionClasses}
                      >
                        <span className="font-mono text-xs uppercase px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] shrink-0 font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Submit button */}
                {!isSubmitted && (
                  <button
                    disabled={qState.selected === null}
                    onClick={() => handleSubmitAnswer(kc.id)}
                    className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-40 text-[var(--bg-main)] font-bold text-xs transition-all shadow-sm"
                  >
                    Submit Answer
                  </button>
                )}

                {/* Evaluated Explanation Feedback */}
                {isSubmitted && (
                  <div
                    className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                      isCorrect
                        ? 'bg-[var(--success-subtle)] border-[var(--success-border)] text-[var(--text-primary)]'
                        : 'bg-[var(--critical-subtle)] border-[var(--critical-border)] text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5 mb-1.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                          <span className="text-[var(--success)]">Correct! Excellent analysis.</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-[var(--critical)]" />
                          <span className="text-[var(--critical)]">Incorrect. Review the explanation below:</span>
                        </>
                      )}
                    </div>
                    <p className="text-[var(--text-secondary)] font-sans">{kc.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Completion & Next/Prev Controls */}
      <div className="pt-8 border-t border-[var(--border-subtle)] space-y-6">
        {/* Toggle Module Completed Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)] font-sans">Module Completion Status</h3>
            <p className="text-xs text-[var(--text-secondary)] font-sans">
              {isCompleted
                ? 'This module is marked completed in your local progress state.'
                : 'Finished reading and understanding the material? Mark it complete.'}
            </p>
          </div>

          <button
            onClick={handleToggleCompleted}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
              isCompleted
                ? 'bg-[var(--success-subtle)] text-[var(--success)] border border-[var(--success-border)] hover:bg-[var(--success)]/20'
                : 'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--bg-main)] shadow-md shadow-[var(--accent-primary)]/15'
            }`}
          >
            {isCompleted ? (
              <>
                <Check className="w-4 h-4 text-[var(--success)]" />
                <span>Completed (Click to Unmark)</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Module as Completed</span>
              </>
            )}
          </button>
        </div>

        {/* Previous and Next Navigation */}
        <div className="flex items-center justify-between gap-4">
          {prevModule ? (
            <Link
              to={`/learn/${prevModule.id}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Prev: Module 0{prevModule.number}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextModule ? (
            <Link
              to={`/learn/${nextModule.id}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--bg-main)] font-bold text-xs transition-all shadow-md shadow-[var(--accent-primary)]/15"
            >
              <span>Next: Module 0{nextModule.number}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--success)] hover:opacity-90 text-[var(--bg-main)] font-bold text-xs transition-all shadow-md"
            >
              <span>Take Final Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
