import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme, ThemePreference } from './ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const options: { value: ThemePreference; label: string; icon: React.FC<{ className?: string }> }[] = [
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'system', label: 'System', icon: Laptop },
  ];

  const currentOption = options.find((opt) => opt.value === theme) || options[0];
  const CurrentIcon = currentOption.icon;

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Theme selector. Current: ${theme} mode (resolved to ${resolvedTheme}). Click to choose Dark, Light, or System.`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] text-xs font-mono"
      >
        <CurrentIcon
          className={`w-4 h-4 shrink-0 ${
            theme === 'dark'
              ? 'text-[var(--accent-secondary)]'
              : theme === 'light'
              ? 'text-[var(--warning)]'
              : 'text-[var(--accent-primary)]'
          }`}
        />
        <span className="hidden sm:inline capitalize text-[11px] font-medium">
          {theme}
        </span>
      </button>

      {/* Accessible Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select color theme"
          className="absolute right-0 mt-1.5 w-36 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = theme === option.value;
            return (
              <button
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-sans transition-colors text-left ${
                  isSelected
                    ? 'bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{option.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[var(--accent-primary)]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
