import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-main)] text-[var(--text-secondary)] text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Brand & Creator Attribution (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" showTagline={true} />
            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              UnPhish is a privacy-first cybersecurity awareness and phishing education platform. Built with deliberate pedagogy to teach users how to dissect deception, inspect URLs safely, and respond to security incidents.
            </p>

            {/* Exact Creator Attribution Badge */}
            <div className="p-3.5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] inline-block text-xs space-y-1">
              <span className="text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-wider block font-bold">
                Project Creator & Architecture
              </span>
              <p className="text-[var(--text-primary)] font-bold">Created by Rahul Mishra</p>
              <p className="text-[var(--text-muted)] font-mono text-[11px]">B.Tech CSE — Cyber Security Student</p>
              <p className="text-[var(--text-secondary)] text-[10px] pt-1">
                UnPhish: An independent cybersecurity awareness and learning project.
              </p>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)] font-bold">
              Explore Platform
            </h4>
            <ul className="space-y-2 font-sans">
              <li>
                <Link to="/" className="hover:text-[var(--accent-primary)] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-[var(--accent-primary)] transition-colors">12-Module Curriculum</Link>
              </li>
              <li>
                <Link to="/practice" className="hover:text-[var(--accent-primary)] transition-colors">Practice Lab</Link>
              </li>
              <li>
                <Link to="/inspector" className="hover:text-[var(--accent-primary)] transition-colors">Local URL Inspector</Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-[var(--accent-primary)] transition-colors">Final Assessment</Link>
              </li>
              <li>
                <Link to="/progress" className="hover:text-[var(--accent-primary)] transition-colors">My Progress</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information & Compliance */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)] font-bold">
              Information & Legal
            </h4>
            <ul className="space-y-2 font-sans">
              <li>
                <Link to="/about" className="hover:text-[var(--accent-primary)] transition-colors">About UnPhish</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--accent-primary)] transition-colors">Contact & Feedback</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[var(--accent-primary)] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[var(--accent-primary)] transition-colors">Terms of Use</Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-[var(--accent-primary)] transition-colors">Accessibility Statement</Link>
              </li>
              <li>
                <Link to="/credits" className="hover:text-[var(--accent-primary)] transition-colors">Credits & Attributions</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Curricular Tenets */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)] font-bold">
              Core Principles
            </h4>
            <ul className="space-y-2 font-sans">
              <li>
                <Link to="/learn/module-01" className="hover:text-[var(--accent-primary)] transition-colors">The CIA Triad</Link>
              </li>
              <li>
                <Link to="/learn/module-03" className="hover:text-[var(--accent-primary)] transition-colors">Social Engineering Psychology</Link>
              </li>
              <li>
                <Link to="/learn/module-04" className="hover:text-[var(--accent-primary)] transition-colors">Email Display Spoofing</Link>
              </li>
              <li>
                <Link to="/learn/module-05" className="hover:text-[var(--accent-primary)] transition-colors">The Right-to-Left URL Rule</Link>
              </li>
              <li>
                <Link to="/learn/module-09" className="hover:text-[var(--accent-primary)] transition-colors">Passkeys vs. SMS OTP</Link>
              </li>
              <li>
                <Link to="/learn/module-10" className="hover:text-[var(--accent-primary)] transition-colors">Emergency Incident Response</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span>© 2026 UnPhish. Think before you click.</span>
            <span className="text-[var(--border-strong)]">•</span>
            <span className="font-mono text-[11px] text-[var(--text-secondary)]">Obsidian Signal v2.0</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Local Browser Privacy</span>
            <span className="text-[var(--border-strong)]">•</span>
            <span>Zero Remote Telemetry</span>
            <span className="text-[var(--border-strong)]">•</span>
            <Link to="/credits" className="hover:text-[var(--accent-primary)] transition-colors">
              Standards & Licenses
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
