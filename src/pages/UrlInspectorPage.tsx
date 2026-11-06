import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { analyzeUrlLocally } from '../lib/url-analyzer';
import { incrementUrlInspectionCount } from '../lib/storage';
import { UrlAnalysisResult } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useToast } from '../components/common/ToastContext';
import {
  Search,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Info,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  Loader2,
} from 'lucide-react';

const SAMPLE_URLS = [
  { label: 'Deceptive Subdomain (PayPal)', url: 'https://paypal.com.verify-account-portal.xyz/login' },
  { label: 'Raw IP Hostname', url: 'http://185.220.101.44:8080/secure/bank' },
  { label: 'Homoglyph / Punycode (Cyrillic)', url: 'https://xn--gogle-1qa.com/auth' },
  { label: 'Known Shortener', url: 'https://bit.ly/3xY8a91' },
  { label: 'Double Extension', url: 'https://invoice-billing.org/invoice_nov.pdf.exe' },
  { label: 'Benign Official Domain', url: 'https://docs.python.org/3/library/urllib.parse.html' },
];

export const UrlInspectorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('url') || '';
  const { success, info } = useToast();

  const [inputUrl, setInputUrl] = useState<string>(initialQuery);
  const [result, setResult] = useState<UrlAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleAnalyze(initialQuery);
    }
  }, [initialQuery]);

  const handleAnalyze = (target?: string) => {
    const raw = (target !== undefined ? target : inputUrl).trim();
    if (!raw) return;

    setIsAnalyzing(true);
    // Micro-delay for smooth visual feedback of local analysis
    setTimeout(() => {
      const analysis = analyzeUrlLocally(raw);
      setResult(analysis);
      incrementUrlInspectionCount();
      setIsAnalyzing(false);
      success(`Analysis complete: ${analysis.riskLevel.replace('_', ' ').toUpperCase()}`, 'Inspector');
    }, 180);
  };

  const handleClear = () => {
    setInputUrl('');
    setResult(null);
    info('URL Inspector reset.', 'Cleared');
  };

  const handleCopyReport = () => {
    if (!result) return;
    const reportText = `[UnPhish URL Inspection Report]
URL: ${result.rawUrl}
Root Domain: ${result.components.domain}
Verdict: ${result.riskLevel} (Score: ${result.riskScore}/100)
Indicators: ${result.indicators.map((i) => i.title).join(', ') || 'None'}
Summary: ${result.summary}`;
    navigator.clipboard.writeText(reportText);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
    success('Inspection summary copied to clipboard.', 'Report Copied');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'URL Inspector' }]} />

      {/* Page Header */}
      <div className="space-y-2 border-b border-[var(--border-subtle)] pb-8">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-[var(--accent-primary)]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
            Local Static Analysis Engine
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-sans">
          Browser-Based URL Inspector
        </h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed font-sans">
          Deconstruct web addresses into their structural components. Our in-browser parser checks for brand impersonation, deep subdomain cloaking, high-risk TLDs, and homoglyphs. Zero external network requests are made.
        </p>
      </div>

      {/* Input Box & Preset Samples */}
      <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-5 shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="space-y-3"
        >
          <label htmlFor="url-input" className="block text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">
            Enter URL or Domain to Inspect:
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                id="url-input"
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://example.com/path or paypal.com.verify-login.xyz"
                maxLength={2048}
                className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all"
              />
              {inputUrl && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                disabled={!inputUrl.trim() || isAnalyzing}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-40 text-[var(--bg-main)] font-bold text-sm transition-all shadow-md shadow-[var(--accent-primary)]/15 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Inspect URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Sample URLs pills for instant testing */}
        <div className="pt-2 border-t border-[var(--border-subtle)]">
          <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-2 font-semibold">
            Try a Test Sample:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_URLS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputUrl(sample.url);
                  handleAnalyze(sample.url);
                }}
                className="px-3 py-1.5 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-subtle)] text-xs font-mono transition-colors"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Results Display */}
      {result ? (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Top Verdict Banner */}
          <div
            className={`p-6 rounded-3xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              result.riskLevel === 'high_risk'
                ? 'bg-[var(--critical-subtle)] border-[var(--critical-border)] text-[var(--critical)]'
                : result.riskLevel === 'elevated_caution'
                ? 'bg-[var(--warning-subtle)] border-[var(--warning-border)] text-[var(--warning)]'
                : 'bg-[var(--success-subtle)] border-[var(--success-border)] text-[var(--success)]'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-2xl border shrink-0 ${
                  result.riskLevel === 'high_risk'
                    ? 'bg-[var(--critical-subtle)] border-[var(--critical-border)] text-[var(--critical)]'
                    : result.riskLevel === 'elevated_caution'
                    ? 'bg-[var(--warning-subtle)] border-[var(--warning-border)] text-[var(--warning)]'
                    : 'bg-[var(--success-subtle)] border-[var(--success-border)] text-[var(--success)]'
                }`}
              >
                {result.riskLevel === 'high_risk' ? (
                  <AlertOctagon className="w-7 h-7" />
                ) : result.riskLevel === 'elevated_caution' ? (
                  <AlertTriangle className="w-7 h-7" />
                ) : (
                  <ShieldCheck className="w-7 h-7" />
                )}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider font-bold">
                  {result.riskLevel === 'high_risk'
                    ? 'CRITICAL RISK INDICATORS DETECTED'
                    : result.riskLevel === 'elevated_caution'
                    ? 'ELEVATED CAUTION ADVISED'
                    : 'NO OBVIOUS STRUCTURAL INDICATORS DETECTED'}
                </span>
                <h3 className="text-xl font-bold text-[var(--text-primary)] font-sans">{result.summary}</h3>
                <p className="text-xs opacity-90 max-w-xl font-sans">
                  Risk score: {result.riskScore}/100 based on transparent client-side parsing rules.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2 sm:border-l sm:border-[var(--border-subtle)] sm:pl-6 shrink-0">
              <button
                onClick={handleCopyReport}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-mono shadow-sm hover:bg-[var(--surface-hover)] transition-colors"
              >
                {copiedRaw ? <Check className="w-3.5 h-3.5 text-[var(--success)]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRaw ? 'Copied' : 'Copy Report'}</span>
              </button>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">100% Local Heuristics</span>
            </div>
          </div>

          {/* Parsed URL Component Breakdown */}
          <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">
                URL Structural Anatomy
              </h3>
              <span className="text-xs font-mono text-[var(--text-muted)]">RFC 3986 Components</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-[var(--surface-sunken)] p-3 rounded-2xl border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] block font-mono text-[10px] uppercase">Protocol</span>
                <span className="font-mono font-bold text-[var(--text-primary)] text-sm">{result.components.protocol}</span>
              </div>
              <div className="bg-[var(--surface-sunken)] p-3 rounded-2xl border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] block font-mono text-[10px] uppercase">Registered Root Domain (SLD)</span>
                <span className="font-mono font-bold text-[var(--accent-primary)] text-sm">{result.components.domain}</span>
              </div>
              <div className="bg-[var(--surface-sunken)] p-3 rounded-2xl border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] block font-mono text-[10px] uppercase">Subdomain Prefix</span>
                <span className="font-mono font-semibold text-[var(--text-secondary)] text-sm truncate block">
                  {result.components.subdomain}
                </span>
              </div>
              <div className="bg-[var(--surface-sunken)] p-3 rounded-2xl border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] block font-mono text-[10px] uppercase">Port</span>
                <span className="font-mono font-semibold text-[var(--text-secondary)] text-sm">{result.components.port}</span>
              </div>
            </div>

            <div className="bg-[var(--surface-sunken)] p-3.5 rounded-2xl border border-[var(--border-subtle)] text-xs font-mono space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)] uppercase text-[10px]">Resource Path:</span>
                <span className="text-[var(--text-secondary)] truncate max-w-lg">{result.components.pathname}</span>
              </div>
              {result.components.search !== '(none)' && (
                <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)] uppercase text-[10px]">Query Parameters:</span>
                  <span className="text-[var(--text-secondary)] truncate max-w-lg">{result.components.search}</span>
                </div>
              )}
            </div>
          </div>

          {/* Detected Warning Signs Table */}
          <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2 font-sans">
                <span>Detected Indicators & Heuristics</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--accent-primary)] border border-[var(--border-subtle)] font-bold">
                  {result.indicators.length} Flag{result.indicators.length === 1 ? '' : 's'}
                </span>
              </h3>
              <span className="text-xs font-mono text-[var(--text-muted)]">Rule-based Evaluation</span>
            </div>

            {result.indicators.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[var(--success)] mx-auto" />
                <h4 className="text-sm font-bold text-[var(--text-primary)] font-sans">No Structural Red Flags Detected</h4>
                <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed font-sans">
                  The URL uses standard protocol and does not match our static heuristics for suspicious TLDs, IP hostnames, or obvious brand cloaking.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {result.indicators.map((ind) => (
                  <div
                    key={ind.id}
                    className="p-4 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold ${
                            ind.severity === 'critical'
                              ? 'bg-[var(--critical-subtle)] text-[var(--critical)] border border-[var(--critical-border)]'
                              : ind.severity === 'warning'
                              ? 'bg-[var(--warning-subtle)] text-[var(--warning)] border border-[var(--warning-border)]'
                              : 'bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] border border-[var(--accent-primary-border)]'
                          }`}
                        >
                          {ind.severity}
                        </span>
                        <h4 className="text-sm font-bold text-[var(--text-primary)] font-sans">{ind.title}</h4>
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] leading-relaxed font-sans">{ind.explanation}</p>
                    <div className="bg-[var(--surface-elevated)] p-2.5 rounded-xl border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-mono">
                      <strong className="text-[var(--text-primary)]">Why Attackers Exploit This: </strong>
                      {ind.whyAttackersUseIt}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Practical Safety Recommendations */}
          <div className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-6 space-y-3 shadow-sm">
            <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">Recommended Defense Actions</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
              {result.recommendations.map((rec, rIdx) => (
                <li key={rIdx} className="flex items-start gap-2.5">
                  <span className="text-[var(--accent-primary)] font-bold mt-0.5">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mandatory Tool Limitations & Security Disclaimer */}
          <div className="rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] p-4 text-xs text-[var(--text-secondary)] space-y-1">
            <div className="flex items-center gap-2 font-mono text-[var(--warning)] font-semibold uppercase text-[10px]">
              <Info className="w-3.5 h-3.5" />
              <span>Static Analysis Boundaries & Disclaimers</span>
            </div>
            <p className="leading-relaxed font-sans">
              <strong>Crucial Notice:</strong> This tool performs purely local syntax heuristics without making network calls, visiting pages, or running remote DNS lookups. Attackers constantly register novel domains. <em>The absence of detected indicators does NOT guarantee an address is benign or secure.</em> Always verify sensitive services out-of-band.
            </p>
          </div>
        </div>
      ) : (
        /* Clean Empty State */
        <div className="p-12 rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary-border)] text-[var(--accent-primary)] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] font-sans">Ready for Inspection</h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed font-sans">
            Paste any suspicious link from an email, SMS message, or social media DM above, or select one of the test samples to view immediate structural analysis.
          </p>
        </div>
      )}
    </div>
  );
};
