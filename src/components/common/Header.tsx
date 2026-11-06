import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';
import {
  Menu,
  X,
  Search,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
  onOpenSearch: () => void;
  onOpenOnboarding?: () => void;
  assistantMode?: 'gemini' | 'offline';
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGuide,
  onOpenSearch,
  onOpenOnboarding,
  assistantMode = 'offline',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/learn', label: 'Curriculum' },
    { to: '/practice', label: 'Practice Lab' },
    { to: '/inspector', label: 'URL Inspector' },
    { to: '/assessment', label: 'Assessment' },
    { to: '/progress', label: 'Progress' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-main)]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <BrandLogo size="md" showTagline={false} />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-xl text-xs font-medium font-sans transition-all ${
                  isActive
                    ? 'bg-[var(--surface-elevated)] text-[var(--accent-primary)] font-semibold border border-[var(--border-subtle)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Global Action Tools: Search, Tour, Guide, Theme, Mobile toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Global Search Command Trigger Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            title="Search curriculum & tools (Cmd+K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="hidden sm:inline">Search</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
              ⌘K
            </span>
          </button>

          {/* Quick Tour Button */}
          {onOpenOnboarding && (
            <button
              onClick={onOpenOnboarding}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              title="Replay platform tour"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
              <span className="hidden md:inline">Tour</span>
            </button>
          )}

          {/* UnPhish Guide Assistant Trigger Button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--accent-primary-subtle)] hover:bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary-border)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            title="Open UnPhish Guide Learning Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="hidden sm:inline">Guide</span>
            <span
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                assistantMode === 'gemini'
                  ? 'bg-[var(--accent-secondary-subtle)] text-[var(--accent-secondary)]'
                  : 'bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)]'
              }`}
            >
              {assistantMode === 'gemini' ? 'AI' : 'OFFLINE'}
            </span>
          </button>

          {/* Theme Toggle (Dark / Light / System) */}
          <ThemeToggle />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-main)] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {/* Quick Search in Mobile */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] mb-2"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Search topics, lessons, URLs...</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-sunken)]">⌘K</span>
          </button>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2 rounded-xl text-xs font-medium ${
                  isActive
                    ? 'bg-[var(--surface-elevated)] text-[var(--accent-primary)] font-semibold border border-[var(--border-subtle)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {onOpenOnboarding && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOnboarding();
              }}
              className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] text-left"
            >
              <HelpCircle className="w-4 h-4 text-[var(--accent-secondary)]" />
              <span>Replay Onboarding Tour</span>
            </button>
          )}

          <div className="pt-3 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGuide();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-[var(--accent-primary)] text-[var(--bg-main)] shadow-lg shadow-[var(--accent-primary)]/10"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch UnPhish Guide ({assistantMode === 'gemini' ? 'Gemini AI' : 'Offline Mode'})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
