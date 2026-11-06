import React, { useState, useEffect } from 'react';
import { WifiOff, CheckCircle2 } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      setShowReconnected(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3500);
      return () => clearTimeout(timer);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (isOffline) {
    return (
      <div
        role="alert"
        className="w-full bg-[var(--surface-sunken)] border-b border-[var(--warning-border)] text-[var(--warning)] px-4 py-2 text-xs flex items-center justify-center gap-2 font-mono transition-all z-50 sticky top-0"
      >
        <WifiOff className="w-4 h-4 shrink-0 text-[var(--warning)]" />
        <span>
          <strong>Offline Mode Active:</strong> You are currently disconnected. All 12 modules, Practice Lab scenarios, and URL analysis remain fully operational offline.
        </span>
      </div>
    );
  }

  if (showReconnected) {
    return (
      <div
        role="status"
        className="w-full bg-[var(--surface-sunken)] border-b border-[var(--success-border)] text-[var(--success)] px-4 py-2 text-xs flex items-center justify-center gap-2 font-mono transition-all z-50 sticky top-0"
      >
        <CheckCircle2 className="w-4 h-4 shrink-0 text-[var(--success)]" />
        <span>Network connection restored. UnPhish is fully synchronized.</span>
      </div>
    );
  }

  return null;
};
