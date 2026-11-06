import { CURRICULUM_MODULES } from '../data/curriculum';
import { PRACTICE_SCENARIOS } from '../data/practice-scenarios';

export interface SearchResultItem {
  id: string;
  type: 'module' | 'lesson-section' | 'practice' | 'tool' | 'concept';
  title: string;
  subtitle: string;
  excerpt: string;
  url: string;
  badge: string;
  tags: string[];
}

// Built-in platform tools and special concepts index
const STATIC_INDEX_ITEMS: SearchResultItem[] = [
  {
    id: 'tool-url-inspector',
    type: 'tool',
    title: 'URL Inspector',
    subtitle: 'Browser-Based Static Analysis Engine',
    excerpt: 'Deconstruct web addresses into RFC 3986 components. Inspect subdomains, IP hostnames, Punycode homoglyphs, and high-risk TLDs locally without network requests.',
    url: '/inspector',
    badge: 'Security Tool',
    tags: ['url', 'inspector', 'link', 'subdomain', 'punycode', 'tld', 'typosquatting', 'analyze'],
  },
  {
    id: 'tool-practice-lab',
    type: 'tool',
    title: 'Practice Lab',
    subtitle: 'Interactive Scenario Sandbox',
    excerpt: 'Analyze realistic fictional emails, SMS smishing alerts, college tuition refund lures, fake internship checks, and MFA fatigue push bombing attacks.',
    url: '/practice',
    badge: 'Interactive Sandbox',
    tags: ['practice', 'lab', 'scenarios', 'email', 'sms', 'smishing', 'bec', 'job scam', 'simulation'],
  },
  {
    id: 'tool-assessment',
    type: 'tool',
    title: 'Final Assessment',
    subtitle: 'Comprehensive Knowledge Evaluation',
    excerpt: 'Test your understanding across all 12 modules. Real score calculations, verified performance evaluation, and question-by-question explanations.',
    url: '/assessment',
    badge: 'Evaluation',
    tags: ['assessment', 'test', 'exam', 'quiz', 'evaluation', 'score', 'certificate'],
  },
  {
    id: 'tool-my-progress',
    type: 'tool',
    title: 'My Progress Dashboard',
    subtitle: 'Learning Records & Telemetry',
    excerpt: 'View genuine completed modules, assessment attempt history, and local learning metrics. Export your data or reset with zero tracking telemetry.',
    url: '/progress',
    badge: 'Dashboard',
    tags: ['progress', 'history', 'stats', 'attempts', 'completed', 'export'],
  },
  {
    id: 'concept-cia-triad',
    type: 'concept',
    title: 'The CIA Triad',
    subtitle: 'Confidentiality, Integrity, Availability',
    excerpt: 'The fundamental benchmark of information security. Learn how credential phishing violates confidentiality, wire rerouting violates integrity, and ransomware violates availability.',
    url: '/learn/module-01',
    badge: 'Core Concept',
    tags: ['cia', 'triad', 'confidentiality', 'integrity', 'availability', 'foundations'],
  },
  {
    id: 'concept-right-to-left',
    type: 'concept',
    title: 'The Right-to-Left URL Reading Rule',
    subtitle: 'Finding the Real Registered Root Domain',
    excerpt: 'Find the single slash (/) after https:// and read left. The two tokens immediately before the slash determine who truly owns the server.',
    url: '/learn/module-05',
    badge: 'URL Defense',
    tags: ['right-to-left', 'domain', 'sld', 'tld', 'subdomain', 'reading url', 'hierarchy'],
  },
  {
    id: 'concept-display-name-spoofing',
    type: 'concept',
    title: 'Display-Name Spoofing',
    subtitle: 'Visible Name vs Envelope Sender Address',
    excerpt: 'How attackers change their visible profile name to mimic trusted brands while the actual sending address after the @ symbol is fraudulent.',
    url: '/learn/module-04',
    badge: 'Email Analysis',
    tags: ['display name', 'spoofing', 'envelope', 'sender', 'headers', 'email analysis'],
  },
  {
    id: 'concept-mfa-fatigue',
    type: 'concept',
    title: 'MFA Fatigue & Push Bombing',
    subtitle: 'Social Engineering Authentication Bypasses',
    excerpt: 'Attackers who obtain your password trigger repeated push notifications at odd hours hoping user annoyance leads to accidental authorization.',
    url: '/learn/module-07',
    badge: 'Account Security',
    tags: ['mfa fatigue', 'push bombing', 'authenticator', '2fa', 'two-factor', 'otp'],
  },
  {
    id: 'concept-fido2-passkeys',
    type: 'concept',
    title: 'FIDO2 Passkeys (Phish-Resistant Authentication)',
    subtitle: 'Origin-Bound Cryptographic Credentials',
    excerpt: 'Why hardware security keys and WebAuthn passkeys cannot be phished by replica login pages: the browser cryptographically verifies the origin domain.',
    url: '/learn/module-09',
    badge: 'Authentication',
    tags: ['passkeys', 'fido2', 'webauthn', 'yubikey', 'hardware key', 'phish-resistant'],
  },
  {
    id: 'concept-incident-response',
    type: 'concept',
    title: '4-Phase Incident Response Protocol',
    subtitle: 'The First 60 Minutes After a Phishing Click',
    excerpt: 'Minutes 0–5: Isolate and close tab; Minutes 5–15: Out-of-band password reset & revoke active sessions; Minutes 15–30: Malware audit; Minutes 30–60: Reporting.',
    url: '/learn/module-10',
    badge: 'Incident Response',
    tags: ['incident response', 'clicked link', 'entered password', 'compromised', 'recovery', 'containment'],
  },
  {
    id: 'concept-quishing',
    type: 'concept',
    title: 'Quishing (QR Code Phishing)',
    subtitle: 'Mobile Device Redirection Exploits',
    excerpt: 'Attackers embed deceptive links inside QR codes to bypass text-based email filters and move victims onto mobile devices with smaller URL viewports.',
    url: '/learn/module-06',
    badge: 'Mobile Security',
    tags: ['quishing', 'qr code', 'mobile phishing', 'scan qr', 'mobile browser'],
  },
  {
    id: 'concept-mgm-breach',
    type: 'concept',
    title: 'MGM Resorts 2023 Breach Case Study',
    subtitle: '10-Minute Helpdesk Vishing Intrusion',
    excerpt: 'How Scattered Spider used LinkedIn research and telephone vishing against the corporate IT helpdesk to bypass MFA and cause over $100M in damages.',
    url: '/learn/module-08',
    badge: 'Case Study',
    tags: ['mgm', 'mgm resorts', 'vishing', 'helpdesk', 'case study', 'scattered spider'],
  },
  {
    id: 'concept-0ktapus',
    type: 'concept',
    title: '0ktapus Campaign (Twilio & Cloudflare 2022)',
    subtitle: 'SMS Phishing vs FIDO2 Hardware Keys',
    excerpt: 'How 130+ organizations were smished via Okta lookalike domains. Twilio suffered customer console exposure while Cloudflare defeated the attack with FIDO2.',
    url: '/learn/module-08',
    badge: 'Case Study',
    tags: ['oktapus', 'twilio', 'cloudflare', 'case study', 'smishing', 'fido2 key'],
  },
];

/**
 * Builds the complete searchable catalog from curriculum data, practice scenarios, and platform tools
 */
export function buildSearchIndex(): SearchResultItem[] {
  const items: SearchResultItem[] = [...STATIC_INDEX_ITEMS];

  // Index all 12 modules
  CURRICULUM_MODULES.forEach((mod) => {
    items.push({
      id: `module-${mod.id}`,
      type: 'module',
      title: `Module ${mod.number < 10 ? `0${mod.number}` : mod.number}: ${mod.title}`,
      subtitle: `${mod.difficulty.toUpperCase()} • ${mod.estimatedMinutes} mins • ${mod.category}`,
      excerpt: mod.shortDescription,
      url: `/learn/${mod.id}`,
      badge: `Module 0${mod.number}`,
      tags: [
        'module',
        mod.title.toLowerCase(),
        mod.category.toLowerCase(),
        mod.difficulty.toLowerCase(),
        ...mod.learningObjectives.map((o) => o.toLowerCase()),
      ],
    });

    // Index individual lesson sections within each module
    mod.sections.forEach((sec, sIdx) => {
      items.push({
        id: `section-${mod.id}-${sec.id}`,
        type: 'lesson-section',
        title: sec.title,
        subtitle: `Module 0${mod.number}: ${mod.title}`,
        excerpt: sec.content[0] || mod.shortDescription,
        url: `/learn/${mod.id}`,
        badge: `Section ${sIdx + 1}`,
        tags: [
          'lesson',
          'section',
          sec.title.toLowerCase(),
          mod.title.toLowerCase(),
          ...(sec.warningSigns || []).map((w) => w.toLowerCase()),
        ],
      });
    });
  });

  // Index practice scenarios
  PRACTICE_SCENARIOS.forEach((sc, idx) => {
    items.push({
      id: `practice-${sc.id}`,
      type: 'practice',
      title: sc.title,
      subtitle: `Practice Lab • ${sc.categoryLabel} (${sc.difficulty.toUpperCase()})`,
      excerpt: sc.contextDescription,
      url: `/practice`,
      badge: sc.categoryLabel,
      tags: [
        'practice',
        'scenario',
        sc.title.toLowerCase(),
        sc.category.toLowerCase(),
        sc.difficulty.toLowerCase(),
        ...sc.identifiedRedFlags.map((r) => r.toLowerCase()),
      ],
    });
  });

  return items;
}

// Pre-computed index
export const SEARCH_INDEX = buildSearchIndex();

/**
 * High-performance search function with multi-token keyword scoring
 */
export function searchPlatform(query: string, limit: number = 8): SearchResultItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const tokens = clean.split(/\s+/).filter(Boolean);

  const scored: { item: SearchResultItem; score: number }[] = [];

  for (const item of SEARCH_INDEX) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const subLower = item.subtitle.toLowerCase();
    const excerptLower = item.excerpt.toLowerCase();
    const tagsCombined = item.tags.join(' ');

    for (const token of tokens) {
      if (titleLower.includes(token)) {
        score += titleLower.startsWith(token) ? 30 : 20;
      }
      if (subLower.includes(token)) {
        score += 12;
      }
      if (tagsCombined.includes(token)) {
        score += 8;
      }
      if (excerptLower.includes(token)) {
        score += 5;
      }
    }

    // Exact full query match bonuses
    if (titleLower.includes(clean)) score += 25;
    if (tagsCombined.includes(clean)) score += 15;

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}
