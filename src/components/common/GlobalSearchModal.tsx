import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchPlatform, SearchResultItem } from '../../lib/search-index';
import {
  Search,
  BookOpen,
  Shield,
  Layers,
  ArrowRight,
  CornerDownLeft,
  FileText,
  KeyRound,
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setSelectedIndex(0);
      setResults(searchPlatform('phishing', 6));
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Update results when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const found = searchPlatform(query, 8);
      setResults(found);
      setSelectedIndex(0);
    } else {
      setResults(searchPlatform('phishing', 6));
    }
  }, [query]);

  // Keyboard navigation within search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          results.length > 0 ? (prev - 1 + results.length) % results.length : 0
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (item: SearchResultItem) => {
    onClose();
    navigate(item.url);
  };

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'module':
        return <BookOpen className="w-4 h-4 text-[var(--accent-primary)]" />;
      case 'lesson-section':
        return <FileText className="w-4 h-4 text-[var(--accent-secondary)]" />;
      case 'practice':
        return <Shield className="w-4 h-4 text-[var(--warning)]" />;
      case 'tool':
        return <Layers className="w-4 h-4 text-[var(--accent-primary)]" />;
      default:
        return <KeyRound className="w-4 h-4 text-[var(--accent-secondary)]" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global search palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-hidden"
    >
      {/* Backdrop with blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[var(--bg-main)]/80 backdrop-blur-md transition-opacity"
      />

      {/* Search Palette Container */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-2xl z-10 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
          <Search className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, modules, URLs, red flags, or case studies..."
            className="flex-1 bg-transparent text-sm sm:text-base font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] px-1.5 py-0.5 rounded bg-[var(--surface-hover)]"
            >
              Clear
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div ref={resultsContainerRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            {query ? `Search Results (${results.length})` : 'Suggested Curricular Topics'}
          </div>

          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--text-secondary)] space-y-1">
              <p className="font-semibold text-[var(--text-primary)]">No matching cybersecurity topics found</p>
              <p>Try searching for "MFA", "typosquatting", "display-name", "quishing", or "CIA triad".</p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border flex items-start gap-3 ${
                    isSelected
                      ? 'bg-[var(--accent-primary-subtle)] border-[var(--accent-primary-border)] shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] shrink-0 mt-0.5">
                    {getTypeIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[var(--text-primary)] truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--accent-primary)] border border-[var(--border-subtle)] shrink-0 font-medium">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] font-mono mt-0.5 truncate">
                      {item.subtitle}
                    </p>

                    <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-1 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="self-center pl-2 shrink-0">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--accent-primary)] font-semibold">
                        <CornerDownLeft className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Jump</span>
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[var(--text-muted)] opacity-50" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">↵</kbd> to select
            </span>
          </div>
          <span className="text-[var(--accent-primary)] font-semibold">Indexed across 12 Modules</span>
        </div>
      </div>
    </div>
  );
};
