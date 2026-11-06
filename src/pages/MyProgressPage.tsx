import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CURRICULUM_MODULES } from '../data/curriculum';
import {
  getStoredProgress,
  resetStoredProgress,
  exportProgressJson,
  importProgressJson,
  getStorageAuditInfo,
} from '../lib/storage';
import { UserProgressState } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useToast } from '../components/common/ToastContext';
import {
  BarChart2,
  CheckCircle2,
  Clock,
  RotateCcw,
  BookOpen,
  Award,
  Search,
  ShieldAlert,
  ArrowRight,
  AlertTriangle,
  Download,
  Upload,
  Lock,
  HardDrive,
  HelpCircle,
  FileCheck,
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

interface MyProgressPageProps {
  onOpenOnboarding?: () => void;
}

export const MyProgressPage: React.FC<MyProgressPageProps> = ({ onOpenOnboarding }) => {
  const [progressState, setProgressState] = useState<UserProgressState>(getStoredProgress());
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { success, warning, critical, info } = useToast();

  const auditInfo = getStorageAuditInfo();

  const totalModules = CURRICULUM_MODULES.length;
  const completedCount = progressState.completedModuleIds.length;
  const remainingCount = totalModules - completedCount;
  const completionPercentage = Math.round((completedCount / totalModules) * 100);

  const practiceCount = progressState.completedPracticeIds.length;
  const inspectionCount = progressState.urlInspectionsCount || 0;
  const attempts = progressState.assessmentAttempts || [];
  const latestAttempt = attempts.length > 0 ? attempts[0] : null;

  const handleReset = () => {
    const pristine = resetStoredProgress();
    setProgressState(pristine);
    setShowResetModal(false);
    warning('All local progress data has been reset to defaults.', 'Data Reset');
  };

  const handleExportData = () => {
    const jsonStr = exportProgressJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', url);
    downloadAnchor.setAttribute('download', `unphish-progress-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
    success('Progress backup downloaded successfully.', 'Export Complete');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importProgressJson(content);
      if (res.success) {
        setProgressState(getStoredProgress());
        success('Your progress was restored successfully!', 'Import Success');
      } else {
        critical(res.message, 'Import Failed');
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'My Progress' }]} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[var(--accent-primary)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
              Learning Records & Telemetry
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans">
            My Learning Progress
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl font-sans">
            Real analytics calculated strictly from your local browser data. No fake streaks, no artificial XP, and zero server-side telemetry tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenOnboarding && (
            <button
              onClick={onOpenOnboarding}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-subtle)] transition-colors shadow-sm"
              title="Replay introductory walkthrough"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
              <span>Replay Tour</span>
            </button>
          )}

          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-subtle)] transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Export JSON</span>
          </button>

          {/* Hidden File Input for Import */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json,application/json"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-subtle)] transition-colors shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>Import JSON</span>
          </button>

          <button
            onClick={() => setShowResetModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--critical-subtle)] hover:bg-[var(--critical-subtle)]/80 text-[var(--critical)] text-xs font-semibold border border-[var(--critical-border)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Curriculum % */}
        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2 shadow-sm">
          <span className="text-xs font-mono text-[var(--text-muted)] uppercase">Curriculum Completion</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-[var(--accent-primary)] font-mono">
              {completionPercentage}%
            </span>
            <span className="text-xs text-[var(--text-secondary)] font-mono">
              {completedCount} / {totalModules} modules
            </span>
          </div>
          <div className="w-full bg-[var(--surface-sunken)] h-2 rounded-full overflow-hidden border border-[var(--border-subtle)]">
            <div
              className="bg-[var(--accent-primary)] h-full rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Practice Scenarios */}
        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2 shadow-sm">
          <span className="text-xs font-mono text-[var(--text-muted)] uppercase">Practice Scenarios Solved</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-[var(--text-primary)] font-mono">
              {practiceCount}
            </span>
            <span className="text-xs text-[var(--text-secondary)] font-mono">Completed</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] font-sans">
            Interactive phishing email & SMS analyses
          </p>
        </div>

        {/* Metric 3: Latest Assessment Score */}
        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2 shadow-sm">
          <span className="text-xs font-mono text-[var(--text-muted)] uppercase">Latest Assessment Score</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono text-[var(--text-primary)]">
              {latestAttempt ? `${latestAttempt.scorePercentage}%` : '—'}
            </span>
            <span className="text-xs text-[var(--text-secondary)] font-mono">
              {attempts.length} Attempt{attempts.length === 1 ? '' : 's'}
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] font-sans">
            {latestAttempt ? `Recorded ${latestAttempt.date}` : 'No assessment taken yet'}
          </p>
        </div>

        {/* Metric 4: URL Inspections */}
        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2 shadow-sm">
          <span className="text-xs font-mono text-[var(--text-muted)] uppercase">URL Inspections Performed</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono text-[var(--text-primary)]">
              {inspectionCount}
            </span>
            <span className="text-xs text-[var(--text-secondary)] font-mono">Local Scans</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] font-sans">
            Private client-side structural tests
          </p>
        </div>
      </div>

      {/* Transparent Privacy Controls & Storage Audit Box */}
      <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
          <HardDrive className="w-5 h-5 text-[var(--accent-primary)]" />
          <h2 className="text-base font-bold text-[var(--text-primary)] font-sans">
            Transparent Local Storage Audit
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">Storage Key</span>
            <span className="text-[var(--text-primary)] font-bold">{auditInfo.key}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">Local Data Footprint</span>
            <span className="text-[var(--accent-primary)] font-bold">{auditInfo.bytesUsed} bytes</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">Last State Update</span>
            <span className="text-[var(--text-secondary)] truncate block">{auditInfo.lastUpdated}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] flex items-start gap-3">
          <Lock className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
            <strong>Privacy Pledge:</strong> All quiz answers, completed module identifiers, practice scores, and theme preferences reside 100% inside your browser's local sandbox. UnPhish transmits zero progress telemetry to remote servers. You can back up or erase this data at any time above.
          </p>
        </div>
      </div>

      {/* Curriculum Module Checklist Breakdown */}
      <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2 font-sans">
            <BookOpen className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Curriculum Progress by Module</span>
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {remainingCount} module{remainingCount === 1 ? '' : 's'} remaining
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {CURRICULUM_MODULES.map((mod) => {
            const isCompleted = progressState.completedModuleIds.includes(mod.id);
            return (
              <Link
                key={mod.id}
                to={`/learn/${mod.id}`}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors shadow-sm ${
                  isCompleted
                    ? 'bg-[var(--surface-elevated)] border-[var(--success-border)]'
                    : 'bg-[var(--surface-sunken)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div className="space-y-0.5 truncate pr-2">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] block">
                    Module 0{mod.number}
                  </span>
                  <span className="font-semibold text-[var(--text-primary)] block truncate font-sans">
                    {mod.title}
                  </span>
                </div>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                ) : (
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase shrink-0">
                    Pending
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Assessment History Table */}
      <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2 font-sans">
            <Award className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Final Assessment Attempt History</span>
          </h2>
          <Link
            to="/assessment"
            className="text-xs font-mono font-semibold text-[var(--accent-primary)] hover:underline flex items-center gap-1"
          >
            <span>Take Test</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {attempts.length === 0 ? (
          <div className="p-8 text-center text-xs text-[var(--text-muted)] space-y-2">
            <p>No assessment attempts recorded yet.</p>
            <Link
              to="/assessment"
              className="inline-block mt-2 px-4 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--bg-main)] font-bold text-xs shadow-sm"
            >
              Take Your First Assessment
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono uppercase">
                  <th className="py-2.5 px-3">Date & Time</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Correct Answers</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono">
                {attempts.map((att) => (
                  <tr key={att.id} className="hover:bg-[var(--surface-hover)]">
                    <td className="py-3 px-3 text-[var(--text-primary)] font-sans">{att.date}</td>
                    <td className="py-3 px-3 font-bold text-[var(--accent-primary)]">{att.scorePercentage}%</td>
                    <td className="py-3 px-3 text-[var(--text-secondary)]">
                      {att.correctAnswers} / {att.totalQuestions}
                    </td>
                    <td className="py-3 px-3 text-[var(--text-muted)]">{att.timeSpentSeconds}s</td>
                    <td className="py-3 px-3">
                      {att.scorePercentage >= 75 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--success-subtle)] text-[var(--success)] border border-[var(--success-border)] font-bold">
                          PASSED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--warning-subtle)] text-[var(--warning)] border border-[var(--warning-border)] font-bold">
                          REVIEW
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Resetting Progress */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset All Local Progress?"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--critical-subtle)] border border-[var(--critical-border)] text-[var(--critical)]">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="leading-relaxed">
              This will permanently delete all completed modules, practice scenario flags, and assessment score history saved in this browser.
            </p>
          </div>
          <p className="text-[var(--text-muted)]">
            Because UnPhish operates without a remote database, this action cannot be undone once confirmed unless you have an exported JSON backup.
          </p>
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              onClick={() => setShowResetModal(false)}
              className="px-4 py-2 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-subtle)]"
            >
              Cancel
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-[var(--critical)] hover:opacity-90 text-[var(--bg-main)] text-xs font-bold shadow-md"
            >
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
