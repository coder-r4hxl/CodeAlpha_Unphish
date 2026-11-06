import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Trash2,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  X,
  User,
  Info,
  Maximize2,
  Minimize2,
  Lock,
  Award,
} from 'lucide-react';
import { AssistantMessage } from '../../types';
import { queryOfflineAssistant } from '../../lib/assistant-offline';
import { useNavigate } from 'react-router-dom';

interface UnPhishGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  assistantMode: 'gemini' | 'offline';
  onToggleMode?: (mode: 'gemini' | 'offline') => void;
}

const INITIAL_MESSAGES: AssistantMessage[] = [
  {
    id: 'msg-welcome',
    role: 'assistant',
    content: `👋 **Welcome to UnPhish Guide!**

I am your cybersecurity learning mentor. I can help you:
- **Triage an incident:** What to do immediately if you clicked a suspicious link or entered a password
- **Dissect deceptive emails:** Display-name spoofing, SPF/DKIM/DMARC, fake attachments
- **Analyze URLs:** The Right-to-Left rule, subdomains, lookalike homoglyphs, and HTTPS myths
- **Understand social engineering:** How attackers exploit urgency, authority, and fear
- **Explore UnPhish curriculum:** Explanations and guidance across all 12 modules

Ask me any cybersecurity question or pick a suggested topic below!`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    sourceMode: 'offline',
  },
];

const SUGGESTED_PROMPTS = [
  '🚨 I clicked a suspicious link. What should I do right now?',
  '⚠️ I typed my password into an unverified page. How do I recover?',
  'How do I spot display-name spoofing in an email?',
  'Explain the Right-to-Left URL reading rule',
  'Why doesn\'t the HTTPS padlock mean a website is safe?',
  'Why do FIDO2 Passkeys stop credential phishing?',
  'How did attackers breach MGM Resorts in 2023?',
  'Who created UnPhish?',
];

export const UnPhishGuideModal: React.FC<UnPhishGuideModalProps> = ({
  isOpen,
  onClose,
  assistantMode,
  onToggleMode,
}) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<AssistantMessage[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<'gemini' | 'offline'>(assistantMode);
  const [serverErrorNote, setServerErrorNote] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showModeInfo, setShowModeInfo] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setActiveMode(assistantMode);
  }, [assistantMode]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages(INITIAL_MESSAGES);
    setServerErrorNote(null);
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMsg: AssistantMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);
    setServerErrorNote(null);

    // If activeMode is gemini, attempt calling server /api/chat
    if (activeMode === 'gemini') {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.available && data.text) {
            const botMsg: AssistantMessage = {
              id: `bot-${Date.now()}`,
              role: 'assistant',
              content: data.text,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              sourceMode: 'gemini',
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsLoading(false);
            return;
          } else {
            setServerErrorNote('Gemini API is unavailable or returned an empty response. Falling back to offline knowledge engine.');
          }
        } else {
          setServerErrorNote('Backend returned an error. Falling back to local curriculum knowledge base.');
        }
      } catch (err) {
        setServerErrorNote('Server connection unreachable. Switched seamlessly to Offline Learning Assistant.');
      }
    }

    // Offline Fallback Retrieval Engine
    const offlineResult = queryOfflineAssistant(textToSend);
    const botMsg: AssistantMessage = {
      id: `bot-${Date.now()}`,
      role: 'assistant',
      content: offlineResult.answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceMode: 'offline',
      suggestedAction: offlineResult.suggestedAction,
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[var(--bg-main)]/80 backdrop-blur-sm transition-opacity"
      />

      {/* Main Drawer / Modal */}
      <div
        className={`relative w-full ${
          isFullScreen ? 'max-w-none h-full' : 'max-w-4xl h-[90vh] max-h-[850px]'
        } flex flex-col rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-2xl z-10 overflow-hidden transition-all duration-200`}
      >
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary-border)] text-[var(--accent-primary)] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 id="guide-title" className="text-base font-bold text-[var(--text-primary)] font-sans">
                  UnPhish Guide
                </h3>

                {/* Operating Mode Badge */}
                <button
                  onClick={() => setShowModeInfo(!showModeInfo)}
                  className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold transition-all ${
                    activeMode === 'gemini'
                      ? 'bg-[var(--accent-secondary-subtle)] text-[var(--accent-secondary)] border-[var(--accent-secondary)]/30 hover:bg-[var(--accent-secondary-subtle)]/80'
                      : 'bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] border-[var(--accent-primary-border)] hover:bg-[var(--accent-primary-subtle)]/80'
                  }`}
                  title="Click to view mode details"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeMode === 'gemini' ? 'bg-[var(--accent-secondary)] animate-pulse' : 'bg-[var(--accent-primary)]'
                    }`}
                  />
                  <span>{activeMode === 'gemini' ? 'Gemini AI Mode' : 'Offline Learning Assistant'}</span>
                  <Info className="w-3 h-3 opacity-70" />
                </button>
              </div>

              {/* Creator Attribution line in assistant header */}
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] font-mono mt-0.5">
                <Award className="w-3 h-3 text-[var(--warning)] shrink-0" />
                <span>Created by Rahul Mishra • B.Tech CSE — Cyber Security Student</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            {/* Mode Switcher Toggle */}
            {onToggleMode && (
              <button
                onClick={() => {
                  const next = activeMode === 'gemini' ? 'offline' : 'gemini';
                  setActiveMode(next);
                  onToggleMode(next);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-subtle)] transition-colors"
                title="Toggle between Gemini and local offline mode"
              >
                <RefreshCw className="w-3 h-3 text-[var(--warning)]" />
                <span className="hidden md:inline">Mode:</span> {activeMode === 'gemini' ? 'Gemini' : 'Offline'}
              </button>
            )}

            {/* Clear History Button */}
            <button
              onClick={handleClearHistory}
              title="Clear conversation"
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--critical)] hover:bg-[var(--surface-hover)] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors hidden sm:inline-block"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              title="Close Guide"
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Information Accordion Banner */}
        {showModeInfo && (
          <div className="bg-[var(--surface-sunken)] p-4 border-b border-[var(--border-subtle)] text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[var(--warning)] uppercase font-bold text-[10px]">
                Active Operating Mode Architecture
              </span>
              <button
                onClick={() => setShowModeInfo(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs"
              >
                Close
              </button>
            </div>
            {activeMode === 'gemini' ? (
              <p className="text-[var(--text-secondary)] leading-relaxed">
                <strong>Gemini AI Mode:</strong> Uses Google's <code>gemini-3.8-flash</code> via a secure server-side Express proxy. All prompts adhere to defensive cybersecurity education rules. <em>API keys remain protected on the backend and are never bundled into client code.</em>
              </p>
            ) : (
              <p className="text-[var(--text-secondary)] leading-relaxed">
                <strong>Offline Learning Assistant Mode:</strong> Runs entirely in your browser using deterministic keyword intent mapping and structured curriculum retrieval from UnPhish’s 12 modules. <em>Requires no API keys, no internet connection, and no third-party accounts.</em>
              </p>
            )}
          </div>
        )}

        {/* Server Notification / Fallback Banner */}
        {serverErrorNote && (
          <div className="bg-[var(--warning-subtle)] border-b border-[var(--warning-border)] px-4 py-2 text-xs text-[var(--warning)] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{serverErrorNote}</span>
            </div>
            <button
              onClick={() => setServerErrorNote(null)}
              className="hover:opacity-80 font-bold text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Defensive Safety Protocol Notice Banner */}
        <div className="bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)] px-4 py-1.5 text-[11px] text-[var(--text-muted)] flex items-center gap-2 font-mono">
          <Lock className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
          <span>Defensive Security Guardrail: Never requests passwords, OTPs, or private keys. Never writes malware.</span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-sm bg-[var(--bg-main)]/50">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary-border)] text-[var(--accent-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`relative max-w-[85%] rounded-2xl px-4 py-3.5 leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] font-medium rounded-tr-none'
                      : 'bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-tl-none'
                  }`}
                >
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap font-sans text-xs sm:text-sm">
                    {msg.content}
                  </div>

                  {/* Contextual Action Shortcut */}
                  {!isUser && msg.suggestedAction && (
                    <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      <button
                        onClick={() => {
                          onClose();
                          navigate(msg.suggestedAction!.path);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:underline"
                      >
                        <span>{msg.suggestedAction.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Metadata and Copy Footer */}
                  <div className="mt-2.5 flex items-center justify-between gap-4 text-[10px] text-[var(--text-muted)]">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <>
                          <span>•</span>
                          <span className="uppercase text-[9px]">
                            {msg.sourceMode === 'gemini' ? 'Gemini 3.8 Flash' : 'Offline Knowledge Engine'}
                          </span>
                        </>
                      )}
                    </div>

                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-0.5"
                        title="Copy answer to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-[var(--success)]" />
                            <span className="text-[var(--success)] font-mono">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="font-mono">Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary-border)] text-[var(--accent-primary)] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="rounded-2xl rounded-tl-none bg-[var(--surface-elevated)] border border-[var(--border-subtle)] px-4 py-3 text-[var(--text-secondary)] text-xs flex items-center gap-2 font-mono">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                Consulting defensive cybersecurity knowledge base...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pills */}
        <div className="px-4 py-2.5 bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)] overflow-x-auto whitespace-nowrap flex items-center gap-2 text-xs">
          <span className="text-[var(--text-muted)] font-mono text-[10px] uppercase shrink-0">Topics:</span>
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-full bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-subtle)] transition-colors shrink-0 text-xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about phishing clues, URL analysis, incident response, or curriculum..."
              className="flex-1 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all font-sans"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="px-5 py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-40 text-[var(--bg-main)] font-bold transition-all flex items-center justify-center shrink-0 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Attribution in Assistant */}
          <div className="mt-2.5 flex flex-wrap items-center justify-between text-[10px] text-[var(--text-muted)] gap-2">
            <span>UnPhish Guide • Created by Rahul Mishra (B.Tech CSE — Cyber Security Student)</span>
            <span className="font-mono">
              Mode: {activeMode === 'gemini' ? 'Gemini 3.8 Flash' : 'Offline Knowledge Engine'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
