import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useToast } from '../components/common/ToastContext';
import { Mail, Copy, Check, Info, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [category, setCategory] = useState<string>('General feedback');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showPreparedNotice, setShowPreparedNotice] = useState<boolean>(false);
  const { success } = useToast();

  const categories = [
    'General feedback',
    'Content correction',
    'Accessibility feedback',
    'Technical issue',
    'Educational collaboration',
  ];

  const preparedText = `[UnPhish Inbound Feedback]
Category: ${category}
Subject: ${subject || '(No subject provided)'}
Name: ${name || '(Anonymous)'}
Contact Email: ${email || '(None provided)'}

Message:
${message}`;

  const handleCopyMessage = () => {
    if (!message.trim()) return;
    navigator.clipboard.writeText(preparedText);
    setCopied(true);
    setShowPreparedNotice(true);
    success('Prepared feedback copied to clipboard!', 'Feedback Form');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Contact & Feedback' }]} />

      {/* Header */}
      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
          Communication & Feedback
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans">
          Contact & Project Feedback
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
          Have suggestions for improving UnPhish curriculum, spotted a technical typo, or want to share accessibility feedback? Prepare your message below.
        </p>
      </div>

      {/* Honest Backend Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-1.5 shadow-sm">
        <div className="flex items-center gap-2 text-[var(--accent-primary)] font-bold font-mono uppercase text-[11px]">
          <Info className="w-4 h-4" />
          <span>Transparent Delivery Notice</span>
        </div>
        <p className="leading-relaxed font-sans">
          UnPhish is a privacy-first frontend application with no remote database or external email server. We do not pretend to send emails through fake success dialogs. Instead, write your feedback below and use the <strong>"Copy Prepared Message"</strong> button to send it directly to the project author via your preferred email or GitHub issue tracker.
        </p>
      </div>

      {/* Feedback Preparation Form */}
      <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="space-y-4">
          {/* Category */}
          <div className="space-y-1">
            <label htmlFor="category" className="block text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">
              Feedback Category *
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div className="space-y-1">
            <label htmlFor="subject" className="block text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">
              Subject *
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={120}
              placeholder="Brief summary of your feedback or question"
              className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] font-sans"
            />
          </div>

          {/* Name & Email (Optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">
                Your Name (Optional)
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                placeholder="e.g. Alex Smith"
                className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] font-sans"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">
                Your Email (Optional)
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={80}
                placeholder="For replies if desired"
                className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] font-sans"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="message" className="block text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">
                Your Message *
              </label>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                {message.length} / 1500 chars
              </span>
            </div>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1500}
              placeholder="Write your feedback, question, or suggested curriculum improvement here..."
              className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl p-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] font-sans"
            />
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={!message.trim()}
              onClick={handleCopyMessage}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-40 text-[var(--bg-main)] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-[var(--accent-primary)]/15"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[var(--bg-main)]" />
                  <span>Message Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Prepared Message</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Display Prepared Text Box after copy */}
        {showPreparedNotice && (
          <div className="mt-4 p-4 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] space-y-2 animate-in fade-in duration-150">
            <span className="text-[10px] font-mono uppercase text-[var(--success)] font-semibold block">
              ✓ Ready for Sending
            </span>
            <p className="text-xs text-[var(--text-secondary)] font-sans">
              The formatted text below has been copied to your clipboard. You can now paste it into an email or issue report to contact the project maintainer:
            </p>
            <pre className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-primary)] whitespace-pre-wrap overflow-x-auto">
              {preparedText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
