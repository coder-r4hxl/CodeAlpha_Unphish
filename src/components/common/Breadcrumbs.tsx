import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs font-mono py-2 ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5 text-[var(--text-muted)]">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:underline"
            title="Return to Home"
          >
            <Home className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li aria-hidden="true">
                <ChevronRight className="w-3 h-3 text-[var(--border-strong)] shrink-0" />
              </li>
              <li>
                {isLast || !item.path ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="font-medium text-[var(--text-primary)] truncate max-w-[200px] sm:max-w-[320px] inline-block align-bottom"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="hover:text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
