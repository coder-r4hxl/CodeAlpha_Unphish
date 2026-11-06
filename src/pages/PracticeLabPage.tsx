import React, { useState } from 'react';
import { PRACTICE_SCENARIOS } from '../data/practice-scenarios';
import { getStoredProgress, markPracticeCompleted } from '../lib/storage';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useToast } from '../components/common/ToastContext';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Check,
  RotateCcw,
  Mail,
  MessageSquare,
  Globe,
  Briefcase,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PracticeLabPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activeScenarioId, setActiveScenarioId] = useState<string>(PRACTICE_SCENARIOS[0].id);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [progressState, setProgressState] = useState(getStoredProgress());
  const { success, warning } = useToast();

  const categories = [
    { id: 'all', label: 'All Scenarios' },
    { id: 'email', label: 'Phishing Emails' },
    { id: 'sms', label: 'SMS Smishing' },
    { id: 'job-internship', label: 'Job Scams' },
    { id: 'account-security', label: 'Account Security' },
    { id: 'social-engineering', label: 'Social Engineering' },
  ];

  const filteredScenarios = PRACTICE_SCENARIOS.filter((sc) => {
    if (selectedCategory !== 'all' && sc.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && sc.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const currentScenario =
    PRACTICE_SCENARIOS.find((sc) => sc.id === activeScenarioId) || PRACTICE_SCENARIOS[0];

  const handleSelectScenario = (id: string) => {
    setActiveScenarioId(id);
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);

    const chosenOption = currentScenario.options.find((o) => o.id === selectedOptionId);
    if (chosenOption?.isCorrect) {
      const updated = markPracticeCompleted(currentScenario.id);
      setProgressState(updated);
      success('Correct defense decision recorded!', 'Scenario Solved');
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // Fallback
      }
    } else {
      warning('Incorrect decision. Review the breakdown to learn why.', 'Analysis');
    }
  };

  const handleResetScenario = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  const selectedOption = currentScenario.options.find((o) => o.id === selectedOptionId);
  const isScenarioCompleted = progressState.completedPracticeIds.includes(currentScenario.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Practice Lab' }]} />

      {/* Page Header */}
      <div className="space-y-2 border-b border-[var(--border-subtle)] pb-8">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[var(--warning)]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--warning)] font-semibold">
            Interactive Threat Simulation
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans">
          UnPhish Practice Lab
        </h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed font-sans">
          Examine realistic fictional emails, text messages, job offers, and authentication prompts. Practice identifying subtle red flags in an isolated sandbox environment.
        </p>
      </div>

      {/* Main Workspace Layout: Sidebar Scenario Selector + Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filters and Scenario List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-3 shadow-sm">
            <span className="text-xs font-mono uppercase text-[var(--text-muted)] font-semibold block">
              Scenario Categories
            </span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] font-bold shadow-sm'
                      : 'bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredScenarios.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-center text-xs text-[var(--text-muted)]">
                No scenarios match the selected category.
              </div>
            ) : (
              filteredScenarios.map((sc) => {
                const isCurrent = sc.id === activeScenarioId;
                const isDone = progressState.completedPracticeIds.includes(sc.id);

                return (
                  <button
                    key={sc.id}
                    onClick={() => handleSelectScenario(sc.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${
                      isCurrent
                        ? 'bg-[var(--accent-primary-subtle)] border-[var(--accent-primary)] ring-1 ring-[var(--accent-primary)] shadow-md'
                        : 'bg-[var(--surface-elevated)] border-[var(--border-subtle)] hover:bg-[var(--surface-hover)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--surface-sunken)] text-[var(--accent-primary)] border border-[var(--border-subtle)] font-medium">
                        {sc.categoryLabel}
                      </span>
                      {isDone && (
                        <span className="text-[11px] font-mono text-[var(--success)] flex items-center gap-1 font-semibold">
                          <Check className="w-3.5 h-3.5" /> Solved
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mt-1 line-clamp-1 font-sans">{sc.title}</h4>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-[var(--text-muted)] font-mono">
                      <span className="capitalize">{sc.difficulty}</span>
                      <span>•</span>
                      <span className="truncate">{sc.fictionalArtifact.type.toUpperCase()} artifact</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Scenario Artifact & Analysis Form (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Scenario Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
              <div>
                <span className="text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider font-semibold">
                  {currentScenario.categoryLabel} • {currentScenario.difficulty.toUpperCase()}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-0.5 font-sans">
                  {currentScenario.title}
                </h2>
              </div>

              {isScenarioCompleted && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[var(--success-subtle)] text-[var(--success)] border border-[var(--success-border)] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Scenario Solved
                </span>
              )}
            </div>

            {/* Context Narrative */}
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--surface-sunken)] p-4 rounded-2xl border border-[var(--border-subtle)] font-sans">
              <strong className="text-[var(--text-primary)] font-semibold block mb-1">Scenario Background:</strong>
              {currentScenario.contextDescription}
            </p>

            {/* Realistic Fictional Artifact Viewer */}
            <div className="rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] overflow-hidden shadow-inner">
              {/* Artifact Toolbar Header */}
              <div className="bg-[var(--surface-elevated)] border-b border-[var(--border-subtle)] px-4 py-2.5 flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                  </div>
                  <span className="ml-2 uppercase tracking-wider">
                    Fictional {currentScenario.fictionalArtifact.type} Simulation
                  </span>
                </div>
                <span className="text-[10px] text-[var(--warning)] bg-[var(--warning-subtle)] px-2 py-0.5 rounded border border-[var(--warning-border)] font-bold">
                  Safe Sandbox
                </span>
              </div>

              {/* Artifact Content Area */}
              <div className="p-5 space-y-3 font-sans text-xs sm:text-sm">
                {/* Email Artifact Headers */}
                {currentScenario.fictionalArtifact.type === 'email' && (
                  <div className="space-y-1.5 border-b border-[var(--border-subtle)] pb-3 font-mono text-xs text-[var(--text-secondary)]">
                    <div>
                      <span className="text-[var(--text-muted)] w-16 inline-block">From:</span>
                      <span className="text-[var(--text-primary)] font-semibold">
                        {currentScenario.fictionalArtifact.senderName}
                      </span>{' '}
                      <span className="text-[var(--critical)] bg-[var(--critical-subtle)] px-1.5 py-0.5 rounded border border-[var(--critical-border)]">
                        &lt;{currentScenario.fictionalArtifact.senderAddress}&gt;
                      </span>
                    </div>
                    {currentScenario.fictionalArtifact.recipient && (
                      <div>
                        <span className="text-[var(--text-muted)] w-16 inline-block">To:</span>
                        <span className="text-[var(--text-secondary)]">
                          {currentScenario.fictionalArtifact.recipient}
                        </span>
                      </div>
                    )}
                    {currentScenario.fictionalArtifact.subject && (
                      <div>
                        <span className="text-[var(--text-muted)] w-16 inline-block">Subject:</span>
                        <span className="text-[var(--text-primary)] font-semibold">
                          {currentScenario.fictionalArtifact.subject}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* SMS Artifact Sender */}
                {currentScenario.fictionalArtifact.type === 'sms' && (
                  <div className="text-center pb-2 border-b border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)]">
                    <span>Originating Sender: </span>
                    <strong className="text-[var(--text-primary)]">
                      {currentScenario.fictionalArtifact.phoneSender}
                    </strong>
                  </div>
                )}

                {/* Browser URL bar */}
                {currentScenario.fictionalArtifact.type === 'browser' && (
                  <div className="bg-[var(--surface-elevated)] p-2.5 rounded-xl border border-[var(--border-subtle)] text-xs font-mono text-[var(--warning)] flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                    <span className="truncate">{currentScenario.fictionalArtifact.browserUrl}</span>
                  </div>
                )}

                {/* Message Body */}
                <div className="text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed pt-2 font-sans">
                  {currentScenario.fictionalArtifact.content}
                </div>

                {/* Call to action button simulator */}
                {currentScenario.fictionalArtifact.callToAction && (
                  <div className="pt-3">
                    <div className="inline-block px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-[var(--bg-main)] font-bold text-xs shadow-sm">
                      {currentScenario.fictionalArtifact.callToAction.label}
                    </div>
                    {currentScenario.fictionalArtifact.callToAction.destinationUrl && (
                      <p className="mt-1.5 text-[11px] font-mono text-[var(--text-muted)]">
                        Destination: <span className="text-[var(--critical)] underline">{currentScenario.fictionalArtifact.callToAction.destinationUrl}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Assessment Question & Choices */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-sans">
                {currentScenario.question}
              </h3>

              <div className="space-y-2.5">
                {currentScenario.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let optStyle =
                    'p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all w-full leading-relaxed font-sans ';

                  if (!isSubmitted) {
                    optStyle += isSelected
                      ? 'bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] border-[var(--accent-primary-border)] ring-1 ring-[var(--accent-primary)] font-medium shadow-sm'
                      : 'bg-[var(--surface-sunken)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]';
                  } else {
                    if (opt.isCorrect) {
                      optStyle += 'bg-[var(--success-subtle)] text-[var(--success)] border-[var(--success-border)] ring-1 ring-[var(--success)] font-semibold';
                    } else if (isSelected && !opt.isCorrect) {
                      optStyle += 'bg-[var(--critical-subtle)] text-[var(--critical)] border-[var(--critical-border)] ring-1 ring-[var(--critical)] font-medium';
                    } else {
                      optStyle += 'bg-[var(--surface-sunken)] text-[var(--text-muted)] border-[var(--border-subtle)] opacity-50';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isSubmitted}
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={optStyle}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs uppercase px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] shrink-0 font-bold">
                          Option
                        </span>
                        <span>{opt.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Actions row: Submit / Reset */}
              <div className="flex items-center gap-3 pt-2">
                {!isSubmitted ? (
                  <button
                    disabled={!selectedOptionId}
                    onClick={handleSubmit}
                    className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-40 text-[var(--bg-main)] font-bold text-xs transition-all shadow-md shadow-[var(--accent-primary)]/15"
                  >
                    Evaluate Decision
                  </button>
                ) : (
                  <button
                    onClick={handleResetScenario}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-subtle)] transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again / Change Answer</span>
                  </button>
                )}
              </div>
            </div>

            {/* Post-Submission Deep Dive Breakdown */}
            {isSubmitted && selectedOption && (
              <div className="rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] p-5 space-y-4 animate-in fade-in duration-150">
                {/* Feedback Banner */}
                <div
                  className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs sm:text-sm font-semibold ${
                    selectedOption.isCorrect
                      ? 'bg-[var(--success-subtle)] text-[var(--success)] border-[var(--success-border)]'
                      : 'bg-[var(--critical-subtle)] text-[var(--critical)] border-[var(--critical-border)]'
                  }`}
                >
                  {selectedOption.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[var(--success)] shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-[var(--critical)] shrink-0" />
                  )}
                  <span>{selectedOption.feedback}</span>
                </div>

                {/* Detailed Explanation */}
                <div className="space-y-1">
                  <h4 className="text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">
                    Technical & Psychological Analysis:
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                    {currentScenario.detailedExplanation}
                  </p>
                </div>

                {/* Identified Red Flags */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-xs font-mono uppercase text-[var(--critical)] font-semibold">
                    Identified Warning Flags in this Scenario:
                  </h4>
                  <ul className="space-y-1 text-xs text-[var(--text-secondary)] font-sans">
                    {currentScenario.identifiedRedFlags.map((rf, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[var(--critical)] font-bold">•</span>
                        <span>{rf}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Safe Action */}
                <div className="p-3.5 rounded-xl bg-[var(--success-subtle)] border border-[var(--success-border)] text-[var(--text-primary)] text-xs sm:text-sm space-y-1">
                  <span className="font-bold font-mono text-[var(--success)] text-xs block">
                    🛡️ Recommended Safe Defense:
                  </span>
                  <p className="leading-relaxed font-sans">{currentScenario.recommendedSafeAction}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
