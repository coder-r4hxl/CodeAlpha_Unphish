import { UrlAnalysisResult, UrlAnalysisIndicator } from '../types';

// Known popular URL shortener hostnames
const KNOWN_SHORTENERS = new Set([
  'bit.ly',
  'tinyurl.com',
  't.co',
  'goo.gl',
  'is.gd',
  'buff.ly',
  'ow.ly',
  'cutt.ly',
  'rebrand.ly',
  'v.gd',
  'qr.ae',
  'tiny.cc',
  'clck.ru',
]);

// High-risk or frequently abused TLDs in mass phishing campaigns
const SUSPICIOUS_TLDS = new Set([
  'zip',
  'mov',
  'top',
  'xyz',
  'click',
  'buzz',
  'work',
  'country',
  'kim',
  'link',
  'fit',
  'rest',
  'tk',
  'ml',
  'ga',
  'cf',
  'gq',
]);

// Well-known brands frequently targeted for display/impersonation in phishing domains
const TARGETED_BRANDS = [
  'paypal',
  'apple',
  'google',
  'microsoft',
  'netflix',
  'amazon',
  'facebook',
  'instagram',
  'whatsapp',
  'bankofamerica',
  'chase',
  'wells-fargo',
  'wellsfargo',
  'citibank',
  'usps',
  'fedex',
  'dhl',
  'ups',
  'irs',
  'coinbase',
  'binance',
  'metamask',
  'steam',
  'roblox',
];

// Deceptive urgency / action keywords often chained in phishing subdomains or paths
const SUSPICIOUS_KEYWORDS = [
  'login',
  'signin',
  'verify',
  'verification',
  'security-update',
  'account-support',
  'billing-update',
  'confirm-identity',
  'suspend',
  'unusual-activity',
  'wallet-recovery',
  'secure-portal',
  'auth-token',
  'otp-verify',
];

/**
 * Checks if a hostname is an IPv4 or IPv6 address or hexadecimal representation
 */
function isIpAddress(hostname: string): boolean {
  // IPv4 simple regex: 4 octets
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(hostname)) return true;

  // IPv6 check
  if (hostname.startsWith('[') && hostname.endsWith(']')) return true;
  if (hostname.includes(':')) return true;

  // Decimal / Hex encoded IP (e.g. 0x7f000001 or 2130706433)
  if (/^0x[0-9a-fA-F]+$/.test(hostname) || /^\d{8,11}$/.test(hostname)) return true;

  return false;
}

/**
 * Normalizes user input safely without network activity
 */
export function normalizeInputUrl(input: string): string {
  let cleaned = input.trim();
  // Strip control characters & null bytes
  cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, '');

  // If user pasted without protocol, prepend https:// for uniform parsing
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = 'https://' + cleaned;
  }
  return cleaned;
}

/**
 * Analyzes a URL strictly locally in-browser using static analysis heuristics
 */
export function analyzeUrlLocally(input: string): UrlAnalysisResult {
  const maxLength = 2048;
  if (!input || input.trim().length === 0) {
    return {
      rawUrl: input,
      normalizedUrl: '',
      isValid: false,
      errorMessage: 'Please enter a URL or web address to analyze.',
      components: {
        protocol: '',
        hostname: '',
        domain: '',
        subdomain: '',
        port: '',
        pathname: '',
        search: '',
        hash: '',
      },
      indicators: [],
      riskLevel: 'no_obvious_indicators',
      riskScore: 0,
      summary: 'No input provided.',
      recommendations: [],
    };
  }

  if (input.length > maxLength) {
    return {
      rawUrl: input.substring(0, 80) + '...',
      normalizedUrl: '',
      isValid: false,
      errorMessage: `URL length (${input.length} characters) exceeds safe inspection limit of ${maxLength} characters.`,
      components: {
        protocol: '',
        hostname: '',
        domain: '',
        subdomain: '',
        port: '',
        pathname: '',
        search: '',
        hash: '',
      },
      indicators: [],
      riskLevel: 'elevated_caution',
      riskScore: 40,
      summary: 'Input exceeds safe static parser length limits.',
      recommendations: ['Do not open unusually large obfuscated URLs.'],
    };
  }

  const normalized = normalizeInputUrl(input);
  let parsed: URL;

  try {
    parsed = new URL(normalized);
  } catch (err: any) {
    return {
      rawUrl: input,
      normalizedUrl: normalized,
      isValid: false,
      errorMessage: 'The provided string is not a syntactically valid URL. Verify characters and structure.',
      components: {
        protocol: '',
        hostname: '',
        domain: '',
        subdomain: '',
        port: '',
        pathname: '',
        search: '',
        hash: '',
      },
      indicators: [
        {
          id: 'invalid_syntax',
          title: 'Malformed URL Syntax',
          severity: 'warning',
          explanation: 'The address could not be parsed by standard browser URL parsers.',
          whyAttackersUseIt: 'Malformed URLs can exploit parser discrepancies between email clients, security filters, and browsers.',
        },
      ],
      riskLevel: 'elevated_caution',
      riskScore: 45,
      summary: 'Malformed URL syntax detected.',
      recommendations: ['Double-check characters and avoid interacting with broken or malformed addresses.'],
    };
  }

  const indicators: UrlAnalysisIndicator[] = [];
  let riskScore = 0;

  const hostname = parsed.hostname.toLowerCase();
  const protocol = parsed.protocol.toLowerCase();
  const port = parsed.port;
  const pathname = parsed.pathname;
  const search = parsed.search;
  const rawInput = input;

  // Break hostname into domain and subdomains
  const hostParts = hostname.split('.');
  let domain = hostname;
  let subdomain = '';

  if (hostParts.length >= 2) {
    // Basic extraction of root domain + TLD
    domain = hostParts.slice(-2).join('.');
    subdomain = hostParts.slice(0, -2).join('.');
  }

  const tld = hostParts.length > 1 ? hostParts[hostParts.length - 1] : '';

  // 1. Protocol Inspection
  if (protocol === 'http:') {
    indicators.push({
      id: 'unencrypted_http',
      title: 'Unencrypted Protocol (HTTP)',
      severity: 'warning',
      explanation: 'Traffic is transmitted in plain text without TLS/SSL encryption.',
      whyAttackersUseIt: 'Attackers frequently set up disposable HTTP servers without registering digital certificates.',
    });
    riskScore += 25;
  } else if (protocol !== 'https:') {
    indicators.push({
      id: 'unusual_protocol',
      title: `Unusual Protocol Scheme (${protocol})`,
      severity: 'critical',
      explanation: `The address uses "${protocol}" rather than standard web protocols (https://).`,
      whyAttackersUseIt: 'Custom schemes can trigger external application handlers, data URIs, or local protocol exploits.',
    });
    riskScore += 40;
  }

  // 2. IP Address as Hostname
  if (isIpAddress(hostname)) {
    indicators.push({
      id: 'ip_hostname',
      title: 'Direct IP Address Hostname',
      severity: 'critical',
      explanation: `The hostname "${hostname}" is a raw IP address instead of a registered domain name.`,
      whyAttackersUseIt: 'Legitimate consumer services virtually never present raw IP links in public emails. Attackers use raw IPs to bypass domain name registration reputation filters and DNS blacklists.',
    });
    riskScore += 50;
  }

  // 3. Known URL Shorteners
  if (KNOWN_SHORTENERS.has(hostname) || KNOWN_SHORTENERS.has(domain)) {
    indicators.push({
      id: 'url_shortener',
      title: 'URL Shortening Service Detected',
      severity: 'warning',
      explanation: `"${hostname}" is a link shortening service that masks the real destination.`,
      whyAttackersUseIt: 'Shorteners hide malicious domains and redirect chains from casual inspection and standard preview filters.',
    });
    riskScore += 30;
  }

  // 4. Internationalized Domain / Punycode (Homoglyphs)
  if (hostname.includes('xn--')) {
    indicators.push({
      id: 'punycode_homoglyph',
      title: 'Punycode / Internationalized Domain (IDN)',
      severity: 'critical',
      explanation: 'The hostname contains Punycode ("xn--"), indicating Cyrillic, Greek, or non-Latin script characters.',
      whyAttackersUseIt: 'Attackers use look-alike characters (homoglyphs) such as Cyrillic "а" instead of Latin "a" (e.g. gооgle.com vs google.com) to visually impersonate trusted sites.',
    });
    riskScore += 45;
  }

  // 5. Excessive Subdomains (Deep Subdomain Cloaking)
  if (hostParts.length > 4) {
    indicators.push({
      id: 'excessive_subdomains',
      title: 'Excessive Subdomain Levels',
      severity: 'warning',
      explanation: `Hostname has ${hostParts.length} levels ("${hostname}").`,
      whyAttackersUseIt: 'Attackers create long subdomains (e.g., "paypal.com.account-verify.sec-cloud.top") so on mobile screens only the trusted first word is visible in truncated address bars.',
    });
    riskScore += 35;
  }

  // 6. Suspicious TLD
  if (SUSPICIOUS_TLDS.has(tld)) {
    indicators.push({
      id: 'suspicious_tld',
      title: `High-Risk Top-Level Domain (.${tld})`,
      severity: 'warning',
      explanation: `The TLD ".${tld}" has a high frequency of abuse in spam, malware distribution, and automated phishing kits.`,
      whyAttackersUseIt: 'Cheap or free automated domain registries allow bulk registration with minimal identity verification.',
    });
    riskScore += 25;
  }

  // 7. Brand Impersonation in Domain / Subdomain
  for (const brand of TARGETED_BRANDS) {
    const hasBrandInSubdomain = subdomain.toLowerCase().includes(brand);
    const hasBrandInDomain = domain.toLowerCase().includes(brand);
    // If brand is in subdomain or part of a hyphenated combo domain, but not the actual brand's official root domain
    const isOfficialBrandDomain =
      domain === `${brand}.com` ||
      domain === `${brand}.net` ||
      domain === `${brand}.org` ||
      domain === `${brand}.co.uk`;

    if ((hasBrandInSubdomain || hasBrandInDomain) && !isOfficialBrandDomain) {
      indicators.push({
        id: `brand_impersonation_${brand}`,
        title: `Possible Brand Impersonation ("${brand}")`,
        severity: 'critical',
        explanation: `The name "${brand}" appears in the URL, but the registered root domain is "${domain}", NOT the official ${brand} domain.`,
        whyAttackersUseIt: 'Exploits brand familiarity. Users glance at the familiar brand name and fail to notice who actually owns the underlying root domain.',
      });
      riskScore += 45;
      break;
    }
  }

  // 8. Chained Deceptive Action Keywords
  const foundKeywords = SUSPICIOUS_KEYWORDS.filter((kw) =>
    (hostname + pathname).toLowerCase().includes(kw)
  );
  if (foundKeywords.length >= 2) {
    indicators.push({
      id: 'suspicious_keywords_combo',
      title: 'Multiple Credential Harvest Keywords',
      severity: 'warning',
      explanation: `Contains multiple action keywords: ${foundKeywords.slice(0, 3).join(', ')}.`,
      whyAttackersUseIt: 'Simulates official banking, authentication, or password recovery paths to trick victims into entering credentials.',
    });
    riskScore += 20;
  }

  // 9. Non-standard Web Port
  if (port && port !== '80' && port !== '443') {
    indicators.push({
      id: 'non_standard_port',
      title: `Non-Standard Web Port (Port ${port})`,
      severity: 'warning',
      explanation: `The address connects via non-standard port ${port} instead of standard web ports (80 or 443).`,
      whyAttackersUseIt: 'Phishing kits are often hosted on compromised residential servers or arbitrary backdoors running on odd ports.',
    });
    riskScore += 25;
  }

  // 10. Embedded Credentials / "@" symbol trick
  if (rawInput.includes('@') || parsed.username || parsed.password) {
    indicators.push({
      id: 'userinfo_at_trick',
      title: 'Embedded "@" Character (Credential Deception)',
      severity: 'critical',
      explanation: 'The URL contains an "@" symbol. In URL standards, everything before the "@" is treated as username/password, while the actual server is whatever follows the "@".',
      whyAttackersUseIt: 'A classic phishing trick: "https://google.com@evil-site.com" leads directly to "evil-site.com", not Google!',
    });
    riskScore += 50;
  }

  // 11. Double File Extensions in Path
  const doubleExtRegex = /\.(pdf|doc|docx|xls|xlsx|jpg|png)\.(exe|scr|bat|cmd|vbs|js|msi|zip)$/i;
  if (doubleExtRegex.test(pathname)) {
    indicators.push({
      id: 'double_extension',
      title: 'Dangerous Double File Extension',
      severity: 'critical',
      explanation: `Path ends with a deceptive executable extension disguised as a document: "${pathname}".`,
      whyAttackersUseIt: 'Tricks users into downloading and executing malware thinking it is a benign document or invoice.',
    });
    riskScore += 50;
  }

  // 12. Open Redirect Clues
  if (
    search.toLowerCase().includes('redirect=') ||
    search.toLowerCase().includes('url=http') ||
    search.toLowerCase().includes('next=http') ||
    search.toLowerCase().includes('return_to=http')
  ) {
    indicators.push({
      id: 'open_redirect_param',
      title: 'Potential Open Redirect Parameter',
      severity: 'warning',
      explanation: 'URL contains query parameters that appear to forward the browser to another website.',
      whyAttackersUseIt: 'Attackers abuse legitimate domains that suffer from open redirect vulnerabilities to bounce victims onto malicious credential-harvesting landing pages.',
    });
    riskScore += 25;
  }

  // Normalize final risk score
  const finalScore = Math.min(100, Math.max(0, riskScore));

  let riskLevel: 'no_obvious_indicators' | 'elevated_caution' | 'high_risk' = 'no_obvious_indicators';
  let summary = 'No obvious static phishing indicators detected based on local rules.';

  if (finalScore >= 60 || indicators.some((i) => i.severity === 'critical')) {
    riskLevel = 'high_risk';
    summary = 'Multiple high-risk structural anomalies detected. Strong caution is advised.';
  } else if (finalScore >= 25 || indicators.length > 0) {
    riskLevel = 'elevated_caution';
    summary = 'Suspicious or non-standard indicators detected. Review all warnings carefully.';
  }

  const recommendations: string[] = [
    'Never enter passwords, two-factor codes, or credit card details on unverified web addresses.',
    'Inspect the registered root domain (SLD + TLD) rather than looking only at subdomains.',
    'Navigate directly to trusted services via your bookmarks or official apps instead of clicking links in unexpected messages.',
  ];

  if (riskLevel === 'high_risk') {
    recommendations.unshift('DO NOT open this link or proceed to this destination.');
  }

  return {
    rawUrl: input,
    normalizedUrl: normalized,
    isValid: true,
    components: {
      protocol,
      hostname,
      domain,
      subdomain: subdomain || '(none)',
      port: port || (protocol === 'https:' ? '443 (default)' : '80 (default)'),
      pathname: pathname || '/',
      search: search || '(none)',
      hash: parsed.hash || '(none)',
    },
    indicators,
    riskLevel,
    riskScore: finalScore,
    summary,
    recommendations,
  };
}
