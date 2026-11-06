import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 42 : 32;

  return (
    <Link
      to="/"
      className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] rounded-xl p-1 transition-all"
    >
      <div className="relative flex items-center justify-center shrink-0">
        {/* Obsidian Signal Radar-Shield Emblem */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Subtle Outer Deflecting Hull */}
          <path
            d="M24 3L43 11V23C43 34.5 34.8 43.8 24 46C13.2 43.8 5 34.5 5 23V11L24 3Z"
            fill="var(--bg-secondary)"
            stroke="var(--border-strong)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Precision Tactical Grid Lines */}
          <path
            d="M24 7V42"
            stroke="var(--border-subtle)"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />
          <path
            d="M9 24H39"
            stroke="var(--border-subtle)"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />

          {/* Signal Concentric Arc (Observation Field) */}
          <path
            d="M15 24C15 19.0294 19.0294 15 24 15C28.9706 15 33 19.0294 33 24"
            stroke="var(--accent-secondary)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            strokeOpacity="0.8"
          />

          {/* Tactical Un-Hooking Strike Curve (Teal Signal) */}
          <path
            d="M17 18C17 14.134 20.134 11 24 11C27.866 11 31 14.134 31 18C31 22.8 22.5 24.2 22.5 29.5V32"
            stroke="var(--accent-primary)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Active Interception Pivot Dot */}
          <circle cx="22.5" cy="37" r="2.2" fill="var(--accent-primary)" />

          {/* Shielded Signal Node (Verified Green/Teal) */}
          <circle cx="35" cy="33" r="3.2" fill="var(--bg-secondary)" stroke="var(--accent-primary)" strokeWidth="1.5" />
          <path
            d="M33.5 33L34.5 34L36.5 32"
            stroke="var(--accent-primary)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-tight text-[var(--text-primary)] font-sans text-xl leading-none">
            Un<span className="text-[var(--accent-primary)]">Phish</span>
          </span>
          <span className="text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--accent-primary)] border border-[var(--border-subtle)] font-semibold">
            SIGNAL
          </span>
        </div>
        {showTagline && (
          <span className="text-xs text-[var(--text-muted)] font-mono mt-0.5 tracking-wide">
            Think before you click.
          </span>
        )}
      </div>
    </Link>
  );
};
