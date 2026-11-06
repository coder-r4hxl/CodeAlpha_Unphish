import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS } from '../data/assessment-questions';
import { recordAssessmentAttempt, getStoredProgress } from '../lib/storage';
import { AssessmentAttempt } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useToast } from '../components/common/ToastContext';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Clock,
  ShieldCheck,
  Check,
  X,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';

export const FinalAssessmentPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [attemptRecord, setAttemptRecord] = useState<AssessmentAttempt | null>(null);
  const [startTime] = useState<number>(Date.now());
  const { success, warning } = useToast();

  const questions = ASSESSMENT_QUESTIONS;
  const currentQ = questions[currentQuestionIndex];
  const totalQ = questions.length;

  const handleSelectOption = (qId: string, optIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQ - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishAssessment();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const finishAssessment = () => {
    let correctCount = 0;
    const answerDetails = questions.map((q) => {
      const selected = selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount += 1;
      return {
        questionId: q.id,
        selectedIndex: selected,
        isCorrect,
      };
    });

    const scorePct = Math.round((correctCount / totalQ) * 100);
    const durationSec = Math.round((Date.now() - startTime) / 1000);

    const attempt: AssessmentAttempt = {
      id: `att-${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      totalQuestions: totalQ,
      correctAnswers: correctCount,
      scorePercentage: scorePct,
      timeSpentSeconds: durationSec,
      answers: answerDetails,
    };

    recordAssessmentAttempt(attempt);
    setAttemptRecord(attempt);
    setIsFinished(true);

    if (scorePct >= 75) {
      success(`Assessment passed with ${scorePct}%!`, 'Congratulations');
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Fallback
      }
    } else {
      warning(`Completed with ${scorePct}%. Review the answer key below to improve.`, 'Assessment Finished');
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    setAttemptRecord(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Assessment' }]} />

      {/* Page Header */}
      <div className="space-y-2 border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[var(--accent-primary)]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
            Comprehensive Knowledge Evaluation
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans">
          UnPhish Final Assessment
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
          Evaluate your understanding across all 12 modules. Real score calculations and answer reviews. No fabricated credentials or fake certificates—genuine learning evaluation only.
        </p>
      </div>

      {!isFinished ? (
        /* In-Progress Assessment Question View */
        <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Progress bar and counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <span>
                Question {currentQuestionIndex + 1} of {totalQ}
              </span>
              <span>Module 0{currentQ.moduleNumber}</span>
            </div>
            <div className="w-full bg-[var(--surface-sunken)] h-2 rounded-full overflow-hidden border border-[var(--border-subtle)]">
              <div
                className="bg-[var(--accent-primary)] h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQ) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-[var(--accent-primary)] font-semibold">
              Category Question:
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-relaxed font-sans">
              {currentQ.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 leading-relaxed font-sans ${
                    isSelected
                      ? 'bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] border-[var(--accent-primary-border)] ring-1 ring-[var(--accent-primary)] shadow-sm font-medium'
                      : 'bg-[var(--surface-sunken)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="w-6 h-6 rounded-md bg-[var(--surface-elevated)] text-[var(--text-primary)] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border border-[var(--border-subtle)]">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Question Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[var(--border-subtle)]">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2.5 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--surface-hover)] disabled:opacity-30 text-[var(--text-primary)] text-xs font-semibold transition-colors border border-[var(--border-subtle)]"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="px-6 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-30 text-[var(--bg-main)] font-bold text-xs transition-all shadow-md shadow-[var(--accent-primary)]/15 flex items-center gap-1.5"
            >
              <span>{currentQuestionIndex === totalQ - 1 ? 'Submit Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in duration-150">
          {attemptRecord && (
            <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 sm:p-8 space-y-6 shadow-xl text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
                    Assessment Report
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1 font-sans">
                    {attemptRecord.scorePercentage >= 75
                      ? 'Assessment Passed — Solid Awareness!'
                      : 'Assessment Completed — Review Recommended'}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">
                    Recorded on {attemptRecord.date} • Duration: {attemptRecord.timeSpentSeconds} seconds
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-center shrink-0 min-w-[140px]">
                  <span className="text-4xl font-extrabold text-[var(--accent-primary)] font-mono">
                    {attemptRecord.scorePercentage}%
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)] block mt-1">
                    {attemptRecord.correctAnswers} / {attemptRecord.totalQuestions} Correct
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <button
                  onClick={handleRetake}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--bg-main)] font-bold text-xs transition-all shadow-md shadow-[var(--accent-primary)]/15"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Assessment</span>
                </button>
                <Link
                  to="/progress"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-subtle)] transition-colors"
                >
                  <span>View in My Progress</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Detailed Question-by-Question Review */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3 font-sans">
              Full Answer Breakdown & Educational Explanations
            </h3>

            {questions.map((q, qIdx) => {
              const selectedIdx = selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1;
              const isCorrect = selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border space-y-3 shadow-sm ${
                    isCorrect
                      ? 'bg-[var(--surface-elevated)] border-[var(--success-border)]'
                      : 'bg-[var(--surface-elevated)] border-[var(--critical-border)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--surface-sunken)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                        Q{qIdx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] font-sans">{q.question}</h4>
                    </div>
                    {isCorrect ? (
                      <span className="text-xs font-mono text-[var(--success)] font-semibold flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-[var(--critical)] font-semibold flex items-center gap-1 shrink-0">
                        <AlertTriangle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>

                  {/* Options display with correct vs chosen indicators */}
                  <div className="space-y-1.5 text-xs font-sans">
                    {q.options.map((opt, oIdx) => {
                      const wasChosen = selectedIdx === oIdx;
                      const isTargetCorrect = q.correctIndex === oIdx;

                      let style = 'p-2.5 rounded-xl border text-left flex items-start gap-2 ';
                      if (isTargetCorrect) {
                        style += 'bg-[var(--success-subtle)] text-[var(--success)] border-[var(--success-border)] font-semibold';
                      } else if (wasChosen && !isCorrect) {
                        style += 'bg-[var(--critical-subtle)] text-[var(--critical)] border-[var(--critical-border)] line-through';
                      } else {
                        style += 'bg-[var(--surface-sunken)] text-[var(--text-muted)] border-[var(--border-subtle)] opacity-60';
                      }

                      return (
                        <div key={oIdx} className={style}>
                          <span className="font-mono text-[10px] uppercase font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                          <span>{opt}</span>
                          {isTargetCorrect && <span className="ml-auto text-[var(--success)] font-mono text-[10px]">✓ Correct Answer</span>}
                          {wasChosen && !isCorrect && <span className="ml-auto text-[var(--critical)] font-mono text-[10px]">Your Answer</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-3.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] font-sans">
                    <strong className="text-[var(--accent-primary)] font-mono text-[11px] block mb-0.5">Why this is the answer:</strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
