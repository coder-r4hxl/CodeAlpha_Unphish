import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { PracticeLabPage } from './pages/PracticeLabPage';
import { UrlInspectorPage } from './pages/UrlInspectorPage';
import { FinalAssessmentPage } from './pages/FinalAssessmentPage';
import { MyProgressPage } from './pages/MyProgressPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { CreditsPage } from './pages/CreditsPage';
import { UnPhishGuideModal } from './components/assistant/UnPhishGuideModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { OnboardingModal } from './components/common/OnboardingModal';
import { OfflineBanner } from './components/common/OfflineBanner';
import { ThemeProvider } from './components/common/ThemeContext';
import { ToastProvider } from './components/common/ToastContext';
import { getStoredProgress } from './lib/storage';
import { Sparkles } from 'lucide-react';

// ScrollToTop helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function triggerOpenGuide(prompt?: string) {
  window.dispatchEvent(new CustomEvent('open-unphish-guide', { detail: { prompt } }));
}

function MainAppContent() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [assistantMode, setAssistantMode] = useState<'gemini' | 'offline'>('offline');

  // Check if first-time visitor needs onboarding
  useEffect(() => {
    const progress = getStoredProgress();
    if (!progress.hasSeenOnboarding) {
      // Small delay for smooth entry
      const timer = setTimeout(() => setIsOnboardingOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for global guide open events
  useEffect(() => {
    const handleCustomOpen = () => {
      setIsGuideOpen(true);
    };
    window.addEventListener('open-unphish-guide', handleCustomOpen);
    return () => window.removeEventListener('open-unphish-guide', handleCustomOpen);
  }, []);

  // Listen for global Cmd+K / Ctrl+K keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check on mount if backend Gemini server is active and configured
  useEffect(() => {
    async function checkBackend() {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          if (data.hasGeminiKey) {
            setAssistantMode('gemini');
          } else {
            setAssistantMode('offline');
          }
        } else {
          setAssistantMode('offline');
        }
      } catch (e) {
        // In static environment or if server route is not mounted yet, default gracefully to offline
        setAssistantMode('offline');
      }
    }
    checkBackend();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] font-sans selection:bg-[var(--accent-primary-subtle)] selection:text-[var(--accent-primary)] transition-colors duration-150">
      {/* Offline Alert Banner */}
      <OfflineBanner />

      {/* Header */}
      <Header
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        assistantMode={assistantMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full" id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:moduleId" element={<LessonDetailPage />} />
          <Route path="/practice" element={<PracticeLabPage />} />
          <Route path="/inspector" element={<UrlInspectorPage />} />
          <Route path="/assessment" element={<FinalAssessmentPage />} />
          <Route path="/progress" element={<MyProgressPage onOpenOnboarding={() => setIsOnboardingOpen(true)} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/credits" element={<CreditsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick UnPhish Guide Trigger Button */}
      <button
        onClick={() => setIsGuideOpen(true)}
        aria-label="Open UnPhish Guide Assistant"
        className="fixed bottom-5 right-5 z-40 p-3.5 rounded-2xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--bg-main)] font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 focus:outline-none focus:ring-4 focus:ring-[var(--accent-primary)]/40"
      >
        <Sparkles className="w-5 h-5 text-[var(--bg-main)]" />
        <span className="text-xs font-bold tracking-tight hidden sm:inline">
          UnPhish Guide
        </span>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-main)]/20 text-[var(--bg-main)] font-bold">
          {assistantMode === 'gemini' ? 'GEMINI' : 'OFFLINE'}
        </span>
      </button>

      {/* Global Assistant Modal */}
      <UnPhishGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        assistantMode={assistantMode}
        onToggleMode={(mode) => setAssistantMode(mode)}
      />

      {/* Global Command Palette / Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* First-time Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={() => setIsOnboardingOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <MainAppContent />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
