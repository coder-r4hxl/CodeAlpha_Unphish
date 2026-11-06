export interface OfflineAssistantResponse {
  answer: string;
  matchedTopic: string;
  suggestedAction?: {
    label: string;
    path: string;
  };
  relatedModules?: number[];
}

interface KnowledgeTopic {
  id: string;
  title: string;
  keywords: string[];
  intents: string[];
  response: string;
  suggestedAction?: {
    label: string;
    path: string;
  };
  relatedModules: number[];
}

export const KNOWLEDGE_BASE: KnowledgeTopic[] = [
  {
    id: 'creator_attribution',
    title: 'Project Creator & Academic Attribution',
    keywords: ['creator', 'who made', 'who created', 'author', 'developer', 'rahul', 'mishra', 'rahul mishra', 'who built unphish'],
    intents: ['creator_info'],
    response: `### 👨‍💻 UnPhish Project Attribution
**UnPhish** is an independent cybersecurity awareness and phishing education platform.

- **Created by:** **Rahul Mishra**
- **Credential:** **B.Tech CSE — Cyber Security Student**
- **Tagline:** *"Think before you click."*
- **Purpose:** To provide beginners, students, and everyday internet users with practical, defensive cybersecurity reflexes, interactive tools, and transparent threat awareness.`,
    suggestedAction: {
      label: 'Read Full About Page',
      path: '/about',
    },
    relatedModules: [1],
  },
  {
    id: 'ai_engine_openai',
    title: 'Assistant Architecture & AI Model Integration',
    keywords: ['openai', 'chatgpt', 'gpt', 'api key', 'llm', 'which model', 'what ai', 'gemini'],
    intents: ['ai_architecture'],
    response: `### 🤖 UnPhish Guide Assistant Architecture
UnPhish Guide features a dual-mode defensive architecture:

1. **Gemini AI Mode (Preferred when configured):**
   Powered natively by **Google Gemini 3.8 Flash** via a protected server-side proxy. The API key is securely managed on the backend and **never exposed to client browser bundles**.
2. **Offline Learning Assistant (Independent Fallback):**
   When internet access, external services, or API credentials are unavailable, UnPhish Guide switches seamlessly to this deterministic local educational knowledge engine grounded in all 12 modules.

*No third-party OpenAI keys or paid API subscriptions are required to run UnPhish!*`,
    suggestedAction: {
      label: 'Inspect Credits & Tech Stack',
      path: '/credits',
    },
    relatedModules: [1],
  },
  {
    id: 'clicked_link_triage',
    title: 'Emergency Triage: Clicked a Suspicious Link',
    keywords: ['clicked', 'click', 'clicked link', 'opened link', 'tapped', 'pressed link', 'visited link', 'accidentally clicked'],
    intents: ['report_incident', 'urgent_help', 'clicked_link'],
    response: `### 🚨 Immediate Response Steps (Stay Calm)
If you just clicked a suspicious or unexpected link:

1. **Do NOT Enter Any Credentials:**
   If the link took you to a login page, password reset form, or personal info request, **immediately close the browser tab**. Entering credentials is when account takeover occurs.

2. **Do NOT Download or Run Any Files:**
   If a download started automatically (like a \`.zip\`, \`.exe\`, \`.iso\`, or \`.apk\`), cancel it immediately and delete the downloaded file without opening or extracting it.

3. **Disconnect If Unsure:**
   If you suspect an active download executed, temporarily disconnect your device from Wi-Fi or mobile data while reviewing your device.

4. **Run an Antivirus / Malware Scan:**
   Run a full scan using your operating system's built-in security (e.g., Windows Security, macOS XProtect) or a reputable antivirus.

5. **Clear Browser Cache and Active Sessions:**
   Clear recent cookies and active sessions for sensitive services in your browser settings.`,
    suggestedAction: {
      label: 'Read Module 10: Reporting & Incident Response',
      path: '/learn/module-10',
    },
    relatedModules: [10, 7],
  },
  {
    id: 'entered_password_triage',
    title: 'Emergency Triage: Entered Password on Fake Site',
    keywords: ['entered password', 'gave password', 'submitted credentials', 'typed password', 'put my password', 'stolen password', 'compromised', 'hacked'],
    intents: ['entered_credentials', 'compromised_account'],
    response: `### ⚠️ Critical Account Recovery Protocol
If you entered your password or credentials into an unverified or phishing website:

1. **Change the Password Immediately (from a Safe Device or Tab):**
   Open the **real, official website** directly (type the official URL manually into a fresh tab) and change your password right away.

2. **Revoke All Active Sessions:**
   In your real account security settings, click **"Sign out of all sessions"** or **"Log out of all devices"** to invalidate stolen session tokens.

3. **Check Password Reuse Everywhere:**
   If you used that same password on any other service (email, banking, cloud storage), change those immediately. **Never reuse passwords.**

4. **Verify Two-Factor Authentication (2FA/MFA):**
   Ensure MFA is enabled. If you also typed your 2FA OTP code into the fake site, contact the service provider's support team immediately because the attacker may be trying to log in concurrently.

5. **Review Account Recovery Options:**
   Inspect your account's recovery email and backup phone number to verify that the attacker hasn't added an unauthorized recovery address.`,
    suggestedAction: {
      label: 'Open Incident Response Guide (Module 10)',
      path: '/learn/module-10',
    },
    relatedModules: [10, 9, 7],
  },
  {
    id: 'display_name_spoofing',
    title: 'Display-Name Spoofing Explained',
    keywords: ['display name', 'sender name', 'spoof', 'spoofing', 'display-name', 'fake sender'],
    intents: ['explain_spoofing'],
    response: `### What is Display-Name Spoofing?
Display-name spoofing occurs when an attacker changes the **visible name** on their email account to mimic a trusted person or institution (e.g., *"PayPal Security"*, *"IT Helpdesk"*, or *"CEO Name"*), while the actual sending address behind it is an unrelated mailbox (e.g., \`support-update994@cheap-mail.ru\`).

#### Key Detection Rule:
- Email apps prominently show the Display Name, but you must tap or hover over the name to reveal the **true sender email envelope**.
- Look past the display name! Check the domain that comes **after the \`@\` symbol**. If the display name says "Google Support" but the address ends in \`@gmail-portal-team.com\`, it is fraudulent.`,
    suggestedAction: {
      label: 'Explore Phishing Email Analysis (Module 04)',
      path: '/learn/module-04',
    },
    relatedModules: [4, 2],
  },
  {
    id: 'spf_dkim_dmarc',
    title: 'SPF, DKIM, and DMARC in Plain English',
    keywords: ['spf', 'dkim', 'dmarc', 'email headers', 'email authentication', 'mail validation'],
    intents: ['explain_email_auth'],
    response: `### Email Authentication Protocols Explained Simply

1. **SPF (Sender Policy Framework):**
   A DNS record published by domain owners listing exactly which server IP addresses are permitted to send emails from their domain.
2. **DKIM (DomainKeys Identified Mail):**
   A cryptographic digital signature attached to every outgoing email header. The recipient's mail server verifies that the email was not tampered with during transit.
3. **DMARC (Domain-based Message Authentication, Reporting, and Conformance):**
   A policy record that tells receiving mail servers what to do if an incoming email fails SPF or DKIM (e.g., "p=reject" blocks forged emails entirely).

*Note: While DMARC blocks forged domains, it cannot prevent attackers from registering separate lookalike domains or changing their display names!*`,
    suggestedAction: {
      label: 'Learn Email Analysis in Module 04',
      path: '/learn/module-04',
    },
    relatedModules: [4],
  },
  {
    id: 'typosquatting_homoglyphs',
    title: 'Typosquatting and Homoglyphs (Look-Alike Domains)',
    keywords: ['typosquatting', 'homoglyph', 'punycode', 'look-alike', 'lookalike', 'misspelled domain', 'fake domain'],
    intents: ['explain_domains'],
    response: `### Understanding Typosquatting and Homoglyphs

1. **Typosquatting (URL Hijacking):**
   Attackers register common misspellings or visual variants of popular sites.
   - Example: \`goolge.com\` instead of \`google.com\`
   - Example: \`paypa1.com\` (replacing the letter 'l' with the number '1')
   - Example: \`micros0ft.com\` (replacing 'o' with '0')
   - Example: \`rn\` substituted for \`m\` (\`arnazon.com\` looks identical to \`amazon.com\` in some sans-serif fonts).

2. **Homoglyph Attacks (Internationalized Domain Names):**
   Attackers use lookalike letters from Cyrillic or Greek alphabets (such as the Cyrillic small letter "а" U+0430) that appear identical to Latin "a" on modern screens.
   - When registered, these produce Punycode prefixes starting with **\`xn--\`**.

#### Best Defense:
Bookmark your critical services or use the UnPhish URL Inspector to test suspicious domain names before clicking!`,
    suggestedAction: {
      label: 'Inspect a Suspicious Address in URL Inspector',
      path: '/inspector',
    },
    relatedModules: [5, 4],
  },
  {
    id: 'right_to_left_rule',
    title: 'The Right-to-Left URL Reading Rule',
    keywords: ['right to left', 'read url', 'how to read url', 'subdomain trick', 'subdomain cloaking', 'url rule'],
    intents: ['explain_url_reading'],
    response: `### The Golden Right-to-Left URL Rule
In an address like: \`https://paypal.com.verify-billing.xyz/login\`

1. **Find the first single slash (\`/\`)** after the scheme: \`https://[hostname]/\`
2. **Read immediately to the left:** The registered root domain is formed by the **last two tokens separated by a dot** before that slash: **\`verify-billing.xyz\`**!
3. **The string \`paypal.com\` is merely a subdomain:** Anyone who registers \`verify-billing.xyz\` can create whatever subdomains they want for free. They prepend "paypal.com" solely to trick your eyes.`,
    suggestedAction: {
      label: 'View Visual URL Anatomy (Module 05)',
      path: '/learn/module-05',
    },
    relatedModules: [5],
  },
  {
    id: 'mfa_fatigue_attacks',
    title: 'MFA Fatigue & Push Bombing',
    keywords: ['mfa fatigue', 'push bombing', 'authenticator spam', 'mfa spam', 'mfa', '2fa', 'two-factor'],
    intents: ['explain_mfa'],
    response: `### What is MFA Fatigue (Push Bombing)?
MFA Fatigue occurs when an attacker already obtained your username and password, but is blocked by your Multi-Factor Authentication push notification.

The attacker repeatedly triggers dozens of push notifications to your phone in the middle of the night or during work hours. They hope you get annoyed, overwhelmed, or accidentally tap **"Approve"** just to make the notifications stop.

#### What To Do:
- **Never click "Approve"** unless you actively initiated that exact login.
- If you receive unexpected MFA pushes, assume your password has been leaked!
- Open the service on your own device and **change your master password immediately**.
- Where available, switch from simple tap-to-approve push notifications to **FIDO2 / WebAuthn security keys** (passkeys or hardware tokens) or **number matching** (where you must type the 2 digits shown on the actual screen).`,
    suggestedAction: {
      label: 'Read Malware & Credential Theft (Module 07)',
      path: '/learn/module-07',
    },
    relatedModules: [7, 9],
  },
  {
    id: 'passkeys_fido2',
    title: 'Why Passkeys (FIDO2) Stop Phishing',
    keywords: ['passkey', 'passkeys', 'fido2', 'webauthn', 'yubikey', 'hardware key', 'phish-resistant'],
    intents: ['explain_passkeys'],
    response: `### Why FIDO2 Passkeys are Phish-Resistant
Traditional SMS codes and 6-digit authenticator codes are phishable: an Adversary-in-the-Middle (AiTM) reverse proxy can trick you into typing the 6 digits onto a replica login site.

**FIDO2 Passkeys solve this at the browser level:**
- The browser cryptographically validates the exact website origin domain before communicating with your hardware key or phone biometric sensor.
- If you are on \`paypal.com.verify-billing.xyz\`, the browser refuses to release credentials for \`paypal.com\`.
- Because the cryptographic signature cannot be harvested, human error is removed from the equation!`,
    suggestedAction: {
      label: 'Explore Prevention & Cyber Hygiene (Module 09)',
      path: '/learn/module-09',
    },
    relatedModules: [9, 7],
  },
  {
    id: 'bec_whaling',
    title: 'Business Email Compromise (BEC) & Whaling',
    keywords: ['bec', 'business email compromise', 'whaling', 'wire transfer', 'executive impersonation', 'ceo scam'],
    intents: ['explain_bec'],
    response: `### What is Business Email Compromise (BEC)?
BEC attacks target finance, HR, or executive staff to reroute legitimate company funds or sensitive tax records:
- **Zero Malware/Zero Links:** Attackers often use plain text emails with executive display-name spoofing (or compromised mailboxes via session cookies).
- **The Urgency Hook:** *"I am in confidential M&A negotiations and need an emergency wire of $45,000 sent before 3 PM."*
- **Mandatory Procedure:** Never approve wire route or banking changes via email alone. Enforce a strict **out-of-band phone call** to a pre-verified number.`,
    suggestedAction: {
      label: 'Try the BEC Wire Scenario in Practice Lab',
      path: '/practice',
    },
    relatedModules: [2, 8, 11],
  },
  {
    id: 'case_studies_mgm_twilio',
    title: 'Real-World Case Studies (MGM Resorts & Twilio 0ktapus)',
    keywords: ['mgm', 'twilio', 'oktapus', 'case study', 'case studies', 'sony', 'rsa breach', 'breach history'],
    intents: ['explain_cases'],
    response: `### Documented Cybersecurity Case Studies

1. **MGM Resorts (2023):**
   Threat actors called the internal IT helpdesk, impersonated an employee found on LinkedIn, and requested a password/MFA reset. The technician granted it without out-of-band verification, causing over $100M in damages.
2. **0ktapus Campaign (2022):**
   SMS smishing attacked 130+ companies. Twilio suffered compromised customer consoles via intercepted SMS OTPs, whereas **Cloudflare defeated the attack completely** because they enforced hardware FIDO2 security keys that fake sites could not capture.`,
    suggestedAction: {
      label: 'Read All Case Studies in Module 08',
      path: '/learn/module-08',
    },
    relatedModules: [8],
  },
  {
    id: 'quishing_qr_phishing',
    title: 'QR Code Phishing (Quishing)',
    keywords: ['qr code', 'quishing', 'qr scam', 'scan qr', 'qr code email', 'qr phishing'],
    intents: ['explain_quishing'],
    response: `### What is Quishing (QR Phishing)?
Quishing is phishing delivered via QR codes embedded in emails, stickers on parking meters, or physical mail.

#### Why Attackers Use QR Codes:
- **Bypasses Email Gateway Scanners:** Many legacy security filters analyze text links, but do not scan or render images containing QR codes.
- **Forces You Onto Mobile:** Scanning a QR code moves the interaction from a secured corporate laptop with endpoint protection onto a personal smartphone where URLs are harder to inspect.

#### Defense Rules:
- Before opening a scanned QR code, review the decoded web URL displayed by your phone's camera app.
- Never scan QR codes in emails claiming you need to "authenticate your Microsoft/Google session" or "resolve an MFA glitch".`,
    suggestedAction: {
      label: 'Review Mobile & Digital Phishing (Module 06)',
      path: '/learn/module-06',
    },
    relatedModules: [6, 2],
  },
  {
    id: 'smishing_sms_scams',
    title: 'SMS Phishing (Smishing)',
    keywords: ['smishing', 'sms', 'text message', 'postal text', 'delivery text', 'package held', 'bank alert text'],
    intents: ['explain_smishing'],
    response: `### How Smishing Works
Smishing is phishing carried out via SMS text messages.

#### Most Common Themes:
- **Fake Package Delivery:** *"USPS/FedEx/DHL: Your package has a missing house number. Update your details within 12 hours at [fake-link]."*
- **Fake Bank Fraud Warning:** *"Alert: Your debit card was charged $849.99. If this was not you, call or click [fake-link] immediately."*
- **Toll Road / Tax Fee Notices:** *"Overdue toll fee of $4.10 will incur legal penalties if unpaid today."*

#### Defense Principles:
- Delivery carriers and banks do not ask for card verification via random shortened links.
- Treat unsolicited SMS links as hostile by default. Access your order or banking app directly.`,
    suggestedAction: {
      label: 'Practice SMS Analysis in Practice Lab',
      path: '/practice',
    },
    relatedModules: [6, 11],
  },
  {
    id: 'fake_job_internship',
    title: 'Fake Job and Internship Scams',
    keywords: ['job scam', 'internship', 'interview', 'telegram job', 'remote job', 'check deposit', 'equipment check', 'freelance scam'],
    intents: ['explain_job_scam'],
    response: `### Recognizing Fake Job & Student Internship Scams
Students and job seekers are frequent targets for predatory employment scams:

#### Common Red Flags:
1. **Unsolicited Telegram / WhatsApp Interviews:** Legitimate companies do not conduct entire formal hiring interviews exclusively via anonymous chat messengers.
2. **Fake Check for "Home Office Equipment":** The scammer sends you a digital check, asks you to deposit it and immediately wire funds to their "approved equipment vendor". Days later, the fake check bounces and you are legally on the hook for the wired money.
3. **Free Mail Accounts for Corporate HR:** Real recruiters communicate from official domain addresses (e.g., \`@microsoft.com\`), not \`recruiter.microsoft@gmail.com\`.
4. **Immediate Job Offers Without Portfolio/Technical Evaluation:** If an offer seems too easy with unrealistic compensation, it is designed to exploit urgency.`,
    suggestedAction: {
      label: 'Try the Job Scam Scenario in Practice Lab',
      path: '/practice',
    },
    relatedModules: [2, 6, 11],
  },
  {
    id: 'cia_triad_cyber_basics',
    title: 'Cybersecurity Foundations & CIA Triad',
    keywords: ['cia triad', 'confidentiality', 'integrity', 'availability', 'foundations', 'what is cybersecurity'],
    intents: ['explain_foundations'],
    response: `### The CIA Triad: Core Pillars of Information Security
The CIA triad is the foundational benchmark for security engineering:

1. **Confidentiality:**
   Ensuring sensitive data is only accessible to authorized individuals. Phishing violates confidentiality when attackers steal passwords or personal records.
2. **Integrity:**
   Ensuring data is accurate, trustworthy, and untampered with. Attackers violate integrity when they alter banking details or redirect payroll.
3. **Availability:**
   Ensuring systems and networks are operational when needed. Ransomware violates availability by encrypting critical databases.`,
    suggestedAction: {
      label: 'Start Module 01: Cybersecurity Foundations',
      path: '/learn/module-01',
    },
    relatedModules: [1],
  },
  {
    id: 'psychology_social_engineering',
    title: 'Psychology of Social Engineering',
    keywords: ['psychology', 'social engineering', 'urgency', 'fear', 'authority', 'emotions', 'manipulation'],
    intents: ['explain_psychology'],
    response: `### The 6 Cognitive Triggers Attackers Exploit
Social engineers attack human psychology rather than software vulnerabilities:

1. **Urgency:** *"Your account will be terminated in 24 hours!"* (Bypasses rational contemplation).
2. **Authority:** Impersonating a CEO, police officer, or compliance regulator.
3. **Fear / Penalty:** *"Legal warrant issued against your tax ID."*
4. **Greed / Scarcity:** *"Congratulations, you won a $500 gift card!"*
5. **Helpfulness / Curiosity:** *"Please review this invoice for project specs."*
6. **Social Proof / Trust:** *"Everyone on your team has already completed this mandatory form."*

#### The Golden Rule:
Whenever an email, message, or caller makes you feel panicked, rushed, or overly excited, **that emotional reaction is the alarm bell**. Pause for 60 seconds.`,
    suggestedAction: {
      label: 'View Psychology of Social Engineering (Module 03)',
      path: '/learn/module-03',
    },
    relatedModules: [3, 2],
  },
  {
    id: 'url_inspection_basics',
    title: 'How to Inspect a URL Safely',
    keywords: ['how to inspect url', 'url inspection', 'analyze url', 'is this link safe', 'check link', 'read url'],
    intents: ['inspect_url_howto'],
    response: `### The Anatomy of a Safe URL Inspection
When reading any link before clicking:

1. **Read Right-to-Left from the first single slash (\`/\`):**
   In \`https://paypal.com.verify-billing.xyz/login\`, the domain is NOT \`paypal.com\`. The root domain is whatever sits immediately before the first slash: **\`verify-billing.xyz\`**!
2. **Look for Non-Standard TLDs:**
   Does the organization use \`.com\` or \`.org\`, while the link uses \`.top\`, \`.xyz\`, or \`.buzz\`?
3. **Check for Embedded \`@\` Signs:**
   \`https://google.com@attacker-site.com\` goes to \`attacker-site.com\`.
4. **Never Rely Solely on the Padlock (HTTPS):**
   HTTPS only means the connection is encrypted. Attackers routinely get free SSL certificates for their phishing landing pages.

Try pasting the address into UnPhish URL Inspector to examine its parsed components safely!`,
    suggestedAction: {
      label: 'Open URL Inspector Tool',
      path: '/inspector',
    },
    relatedModules: [5],
  },
];

/**
 * Independent offline retrieval engine
 */
export function queryOfflineAssistant(rawQuery: string): OfflineAssistantResponse {
  const query = rawQuery.toLowerCase().trim();

  if (!query) {
    return {
      matchedTopic: 'Welcome',
      answer: `Hello! I am **UnPhish Guide — Offline Learning Assistant**.\n\nI can answer questions regarding phishing types, social engineering psychology, URL anatomy, email analysis, incident response, and cybersecurity fundamentals. Ask me anything or select one of the suggested topics!`,
      relatedModules: [1, 2, 4, 5, 10],
    };
  }

  // Check emergency keywords first (immediate triage)
  if (
    (query.includes('enter') || query.includes('typed') || query.includes('gave')) &&
    (query.includes('password') || query.includes('credential') || query.includes('code') || query.includes('login'))
  ) {
    const topic = KNOWLEDGE_BASE.find((k) => k.id === 'entered_password_triage')!;
    return {
      answer: topic.response,
      matchedTopic: topic.title,
      suggestedAction: topic.suggestedAction,
      relatedModules: topic.relatedModules,
    };
  }

  if (query.includes('click') || query.includes('opened') || query.includes('tapped')) {
    const topic = KNOWLEDGE_BASE.find((k) => k.id === 'clicked_link_triage')!;
    return {
      answer: topic.response,
      matchedTopic: topic.title,
      suggestedAction: topic.suggestedAction,
      relatedModules: topic.relatedModules,
    };
  }

  // Score match against knowledge base
  let bestTopic: KnowledgeTopic | null = null;
  let highestScore = 0;

  for (const topic of KNOWLEDGE_BASE) {
    let score = 0;

    for (const kw of topic.keywords) {
      if (query.includes(kw)) {
        score += kw.length * 2; // longer matching phrases carry higher weight
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestTopic = topic;
    }
  }

  if (bestTopic && highestScore >= 6) {
    return {
      answer: bestTopic.response,
      matchedTopic: bestTopic.title,
      suggestedAction: bestTopic.suggestedAction,
      relatedModules: bestTopic.relatedModules,
    };
  }

  // Honest fallback when question is outside curriculum scope
  return {
    matchedTopic: 'Out of Curriculum Scope',
    answer: `### UnPhish Offline Assistant
I could not find a verified match for your question in the UnPhish offline curriculum knowledge base.

As an **Offline Educational Assistant**, I strictly answer questions grounded in UnPhish's verified cybersecurity curriculum (modules 1 through 12).

#### Recommended Topics to Explore:
- **Email Analysis:** How to spot display-name spoofing and fake invoices.
- **URL Inspection:** How to decode look-alike domains and typosquatting.
- **Incident Response:** What to do if you clicked a link or entered a password.
- **Scam Recognition:** How to identify smishing, quishing, and fake internship offers.
- **Account Protection:** Multi-factor authentication and password manager hygiene.

You can also browse our 12 complete learning modules or practice realistic scenarios in the Practice Lab!`,
    suggestedAction: {
      label: 'Explore All 12 Modules in Learn',
      path: '/learn',
    },
    relatedModules: [1, 2, 4, 5, 10],
  };
}
