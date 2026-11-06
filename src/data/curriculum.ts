import { CurriculumModule } from '../types';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'module-01',
    number: 1,
    title: 'Cybersecurity Foundations',
    shortDescription: 'Core terminology, the CIA triad, and why social engineering continues to exploit human psychology.',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    category: 'foundations',
    learningObjectives: [
      'Define cybersecurity and understand how human factors drive digital breaches',
      'Explain the CIA Triad (Confidentiality, Integrity, Availability) in practical terms',
      'Differentiate between technical software exploits and psychological social engineering',
      'Understand the fundamental anatomy of a phishing attack',
    ],
    sections: [
      {
        id: 'sec-1-1',
        title: 'What is Cybersecurity?',
        content: [
          'Cybersecurity is the discipline and practice of protecting internet-connected systems—including hardware, software, networks, and confidential data—from digital attacks, unauthorized access, and malicious tampering.',
          'While organizations spend billions on firewalls, intrusion detection systems, and encrypted databases, attackers consistently choose the path of least technical resistance: the human user. It is vastly easier to trick an employee into willingly typing their password into a spoofed webpage than it is to break 256-bit AES encryption mathematically.',
        ],
      },
      {
        id: 'sec-1-2',
        title: 'The CIA Triad in Real-World Context',
        content: [
          'Every security decision revolves around balancing three foundational pillars:',
          '• **Confidentiality:** Preserving authorized restrictions on access and disclosure. Phishing violates confidentiality when sensitive credentials, medical histories, or proprietary intellectual property are harvested by unauthorized adversaries.',
          '• **Integrity:** Guarding against improper information modification or destruction. If an attacker tricks finance into altering the direct deposit routing number for payroll, data integrity is shattered.',
          '• **Availability:** Ensuring timely and reliable access to information. When a phishing lure delivers ransomware that encrypts a hospital\'s patient health records, availability is completely neutralized.',
        ],
      },
      {
        id: 'sec-1-3',
        title: 'Social Engineering Fundamentals',
        content: [
          'Social engineering is the art of manipulating people so they give up confidential information or perform security-compromising actions. Unlike software vulnerabilities that are patched with updates, the human mind cannot be "patched" with software code.',
          'Attackers exploit cognitive biases: our natural respect for authority figures, our instinctive desire to help colleagues, our fear of negative consequences, and our conditioned impulse to respond quickly to urgent notifications.',
        ],
        warningSigns: [
          'Unprompted requests for passwords, pin numbers, or verification codes',
          'Communications that mandate bypassing established organizational procedures',
          'Artificial deadlines threatening account termination within hours',
          'Offers that appear wildly disproportionate to standard market expectations',
        ],
      },
    ],
    keyTakeaways: [
      'Humans are targeted because exploiting psychological trust is easier than breaking cryptographic algorithms.',
      'The CIA Triad (Confidentiality, Integrity, Availability) guides defensive decisions.',
      'Social engineering relies on cognitive manipulation rather than code flaws.',
    ],
    knowledgeCheck: [
      {
        id: 'kc-1-1',
        question: 'Why do cybercriminals disproportionately target humans with phishing rather than attempting to crack encryption algorithms?',
        options: [
          'Because encryption algorithms are outdated and no longer used',
          'Because exploiting human trust and cognitive biases requires far fewer resources than breaking modern cryptography',
          'Because phishing allows attackers to gain physical access to server rooms',
          'Because firewalls automatically shut down whenever an email is sent',
        ],
        correctIndex: 1,
        explanation: 'Modern encryption (like AES-256) is mathematically infeasible to brute-force with current computers. Manipulating human emotion (urgency, trust, fear) is vastly cheaper, faster, and more reliable for attackers.',
      },
      {
        id: 'kc-1-2',
        question: 'An attacker uses stolen credentials to silently alter the bank routing number in an HR payroll system. Which pillar of the CIA Triad is directly violated?',
        options: [
          'Availability',
          'Integrity',
          'Non-repudiation',
          'Perimeter security',
        ],
        correctIndex: 1,
        explanation: 'Integrity guarantees that data has not been modified or corrupted by unauthorized parties. Altering banking records corrupts the accuracy and truthfulness of the stored information.',
      },
    ],
  },
  {
    id: 'module-02',
    number: 2,
    title: 'Types of Phishing Attacks',
    shortDescription: 'From mass spray-and-pray emails to targeted spear phishing, whaling, smishing, and BEC.',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    category: 'email-security',
    learningObjectives: [
      'Distinguish between bulk email phishing, spear phishing, and whaling',
      'Understand mobile vectors: SMS phishing (Smishing) and Voice phishing (Vishing)',
      'Recognize Business Email Compromise (BEC) and its financial impact',
      'Identify emergent vectors including Quishing (QR code phishing) and search ad spoofing',
    ],
    sections: [
      {
        id: 'sec-2-1',
        title: 'Mass Phishing vs. Spear Phishing vs. Whaling',
        content: [
          'Phishing attacks range dramatically in sophistication and targeting precision:',
          '• **Mass / Bulk Phishing:** Automated messages blasted to millions of email addresses at once. These rely on generic templates mimicking major consumer services (Amazon, Netflix, PayPal, USPS) hoping a small percentage of recipients happen to use the service and panic.',
          '• **Spear Phishing:** Highly customized attacks aimed at a specific individual, organization, or department. The attacker researches the target using LinkedIn, public company directories, and conference agendas, referencing real internal projects, colleagues, or vendors to build immediate credibility.',
          '• **Whaling:** A specialized tier of spear phishing directed squarely at high-profile executives, board members, or CFOs. Attackers tailor communications to legal subpoenas, confidential M&A negotiations, or executive compensation audits.',
        ],
      },
      {
        id: 'sec-2-2',
        title: 'Business Email Compromise (BEC)',
        content: [
          'Business Email Compromise (BEC) accounts for billions of dollars in annual losses worldwide according to the FBI Internet Crime Complaint Center (IC3).',
          'In a BEC campaign, attackers either spoof the CEO/CFO or compromise their legitimate email account via stolen session cookies. The attacker then issues an urgent request to finance personnel or external clients to redirect an upcoming wire transfer or vendor invoice payment to an offshore or fraudulent bank account.',
          'Crucially, BEC emails frequently contain **no links and no malicious attachments**. They rely purely on social engineering and deceptive text, rendering traditional virus scanners completely ineffective.',
        ],
      },
      {
        id: 'sec-2-3',
        title: 'Modern Mobile & Physical Vectors: Smishing, Vishing & Quishing',
        content: [
          '• **Smishing (SMS Phishing):** Text messages claiming package delivery issues, bank fraud alerts, or toll road penalties. Mobile users often read texts within 3 minutes and have less screen real estate to inspect URLs.',
          '• **Vishing (Voice Phishing):** Phone calls from attackers posing as bank fraud investigators, government tax agents, or IT support personnel asking for verification codes.',
          '• **Quishing (QR Code Phishing):** Embedding malicious links inside QR codes. Because security filters cannot easily parse arbitrary pixels in raster images, and scanning moves the victim from a protected desktop to an unmanaged smartphone, quishing has surged in popularity.',
        ],
      },
    ],
    keyTakeaways: [
      'Spear phishing uses open-source intelligence (OSINT) to craft persuasive individual lures.',
      'BEC attacks often feature zero malware or links; they rely on executive impersonation to alter financial transactions.',
      'Smishing, vishing, and quishing exploit mobile interfaces where sender validation is obscured.',
    ],
    knowledgeCheck: [
      {
        id: 'kc-2-1',
        question: 'An email arrives in the accounting inbox appearing to come from the CEO, requesting an urgent wire transfer for a confidential acquisition without any links or attachments. What type of attack is this?',
        options: [
          'Drive-by download',
          'Business Email Compromise (BEC)',
          'Smishing',
          'Distributed Denial of Service (DDoS)',
        ],
        correctIndex: 1,
        explanation: 'Business Email Compromise (BEC) relies on executive authority and urgent narrative to trick finance personnel into routing legitimate funds to attacker-controlled accounts, often without any malicious files or links.',
      },
    ],
  },
  {
    id: 'module-03',
    number: 3,
    title: 'Psychology of Social Engineering',
    shortDescription: 'How attackers hijack rational decision-making using urgency, authority, fear, and cognitive biases.',
    difficulty: 'intermediate',
    estimatedMinutes: 9,
    category: 'psychology',
    learningObjectives: [
      'Understand the biological fight-or-flight response exploited by social engineering',
      'Analyze the 6 primary cognitive levers used by deceptive threat actors',
      'Examine the Psychological Manipulation Flowchart',
      'Develop the "Emotional Circuit Breaker" habit to neutralize manipulative stimuli',
    ],
    sections: [
      {
        id: 'sec-3-1',
        title: 'The Amygdala Hijack in Cyberspace',
        content: [
          'Human beings possess dual cognitive processing systems: System 1 (fast, instinctive, emotional) and System 2 (slow, deliberative, logical).',
          'Social engineers intentionally design their communications to trigger System 1. By introducing acute panic—such as threatened account suspension, criminal prosecution, or immediate loss of money—the attacker stimulates the amygdala. This chemical reaction impairs the prefrontal cortex, suppressing critical analytical skepticism and compelling immediate compliance.',
        ],
        diagramType: 'psychology',
      },
      {
        id: 'sec-3-2',
        title: 'The Six Core Psychological Levers',
        content: [
          '1. **Urgency:** Imposing arbitrary countdowns (e.g., "Action required within 4 hours or your access is permanently revoked").',
          '2. **Authority:** Weaponizing perceived hierarchy (CEO, law enforcement, tax authorities, IT security compliance team).',
          '3. **Fear & Penalty:** Creating dread of severe negative personal or disciplinary consequences.',
          '4. **Greed & Scarcity:** Promising unearned financial windfalls, lottery grants, or exclusive employment contracts.',
          '5. **Social Proof & Conformance:** Suggesting that "all other department members have already verified their credentials".',
          '6. **Helpfulness & Reciprocity:** Posing as a stressed colleague seeking assistance with a project deliverable.',
        ],
        practicalExample: {
          title: 'The "Emergency IT Audit" Call',
          scenario: 'A caller rings the reception desk claiming to be from corporate IT: "Hi, our secondary server cluster is corrupted and we are 5 minutes away from losing everyone\'s weekly files. I need you to read me the 6-digit MFA code on your phone right now so I can preserve your mailbox backups."',
          analysis: 'The attacker combines acute urgency (5 minutes), authority (IT system administration), and helpfulness (saving your personal files). The victim complies not because they are foolish, but because their natural desire to cooperate is being weaponized.',
          redFlags: [
            'Refusal to follow standard IT ticket workflows',
            'Requesting a one-time passkey/OTP directly over the phone',
            'Artificial high-stakes time pressure',
          ],
        },
      },
      {
        id: 'sec-3-3',
        title: 'Building an Emotional Circuit Breaker',
        content: [
          'The single most potent defensive weapon against social engineering is not technical software; it is **pausing**.',
          'Whenever a digital message produces a visceral emotional response—whether that response is panic, excitement, embarrassment, or fear—treat that specific emotion as an active telemetry signal. Step away from your keyboard for 60 seconds. Verify the situation through a separate, established communication channel.',
        ],
      },
    ],
    keyTakeaways: [
      'Social engineering induces System 1 emotional thinking to bypass System 2 logical analysis.',
      'Authority, urgency, and fear are the primary tools used to dismantle user skepticism.',
      'Emotional reactions are security alarms: always pause and verify out-of-band.',
    ],
    knowledgeCheck: [
      {
        id: 'kc-3-1',
        question: 'An email arrives stating: "MANDATORY: Your payroll deposit was suspended due to tax discrepancy. Verify your details within 30 minutes or funds will be forfeited." Which two psychological levers are primary here?',
        options: [
          'Curiosity and Reciprocity',
          'Fear/Penalty and Urgency',
          'Social Proof and Scarcity',
          'Whaling and Vishing',
        ],
        correctIndex: 1,
        explanation: 'The threat of losing payroll funds evokes deep financial fear/penalty, while the 30-minute deadline creates acute artificial urgency designed to rush the recipient into bypassing rational scrutiny.',
      },
    ],
  },
  {
    id: 'module-04',
    number: 4,
    title: 'Phishing Email Analysis',
    shortDescription: 'Technical breakdown of sender addresses, display-name spoofing, headers, and email authentication.',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    category: 'email-security',
    learningObjectives: [
      'Deconstruct email envelope headers versus visible display names',
      'Understand SPF, DKIM, and DMARC verification mechanisms at a beginner level',
      'Analyze deceptive hyperlinks without clicking on them',
      'Examine the Annotated Phishing Email diagram',
    ],
    sections: [
      {
        id: 'sec-4-1',
        title: 'Display Name vs. Sender Envelope Address',
        content: [
          'Email standards (RFC 5322) cleanly separate the friendly **Display Name** from the actual **Mailbox Address**.',
          'For example: `"Netflix Customer Support" <billing-alert9841@cheapdomain-hosting.ru>`. In modern mobile email clients, the interface displays only the bold string **"Netflix Customer Support"**, truncating or hiding the actual Russian hosting address. Attackers routinely register random free webmail accounts and rename their profile display name to simulate trusted global brands.',
        ],
        diagramType: 'email-anatomy',
      },
      {
        id: 'sec-4-2',
        title: 'Email Authentication in Plain English: SPF, DKIM & DMARC',
        content: [
          'How do mail servers verify that an email claiming to come from `@paypal.com` was genuinely dispatched by PayPal\'s official mail infrastructure?',
          '• **SPF (Sender Policy Framework):** A public DNS record published by the domain owner specifying which server IP addresses are authorized to dispatch emails on their behalf.',
          '• **DKIM (DomainKeys Identified Mail):** A cryptographic digital signature attached to email headers that confirms the email body was not tampered with in transit.',
          '• **DMARC (Domain-based Message Authentication, Reporting, and Conformance):** A policy rule that instructs recipient mail servers what to do if an incoming email fails SPF or DKIM (e.g., monitor, quarantine into spam, or completely reject).',
          'When organizations lack strict DMARC enforcement (a policy of `p=reject`), attackers can forge the actual envelope domain itself.',
        ],
      },
      {
        id: 'sec-4-3',
        title: 'Hyperlink Deception: Anchor Text vs. True Destination',
        content: [
          'HTML emails allow any arbitrary anchor text to link to any destination URL. An attacker can write:',
          '`<a href="https://evil-phish-portal.top/steal">https://www.paypal.com/signin</a>`',
          'A user looking at the screen sees the text `https://www.paypal.com/signin`, but clicking it executes a navigation request to `evil-phish-portal.top`.',
          '**Defense rule:** Always hover your mouse pointer over hyperlinks on desktop to inspect the true target URL in your browser\'s status bar, or press-and-hold on touch devices to preview the real destination domain.',
        ],
        warningSigns: [
          'Generic greetings ("Dear Customer" or "Valued Client") from companies that should know your name',
          'Mismatched domain between the sending address and the brand logo in the email body',
          'Inconsistencies between hyperlink display text and the actual destination URL',
          'High-risk attachments (.iso, .exe, .zip, macro-enabled .docm, .vbs, .hta)',
        ],
      },
    ],
    keyTakeaways: [
      'Never trust the visible Display Name; verify the domain after the "@" symbol.',
      'Anchor text can display a completely different URL than the underlying destination link.',
      'SPF, DKIM, and DMARC authenticate mail server authority, but cannot prevent display name spoofing or brand-impersonation lookalike domains.',
    ],
    knowledgeCheck: [
      {
        id: 'kc-4-1',
        question: 'An email displays the sender as "Apple Support <service@apple-support-ticket-update.com>". Is this an authentic Apple notification?',
        options: [
          'Yes, because the display name and address both contain the word "apple"',
          'Yes, because Apple uses ticket-update subdomains for customer inquiries',
          'No, because the registered domain is "apple-support-ticket-update.com", not the official "apple.com"',
          'Yes, because email servers would block any unauthorized name',
        ],
        correctIndex: 2,
        explanation: 'Anyone can register custom domain names containing the word "apple" combined with hyphens. Legitimate Apple communications originate strictly from the official root domain (e.g., @apple.com or @insideapple.apple.com).',
      },
    ],
  },
  {
    id: 'module-05',
    number: 5,
    title: 'Fake Websites and URL Analysis',
    shortDescription: 'Master the anatomy of URLs: domain names, subdomains, typosquatting, homoglyphs, and HTTPS myths.',
    difficulty: 'intermediate',
    estimatedMinutes: 11,
    category: 'web-mobile',
    learningObjectives: [
      'Deconstruct the structural anatomy of a Universal Resource Locator (URL)',
      'Identify the real registered domain using the Right-to-Left rule',
      'Debunk the myth that the HTTPS padlock icon guarantees website legitimacy',
      'Recognize typosquatting, homoglyphs, and open redirect tactics',
    ],
    sections: [
      {
        id: 'sec-5-1',
        title: 'URL Anatomy: How Domain Hierarchies Work',
        content: [
          'A standard URL consists of several distinct structural components:',
          '`https://` (Protocol) + `accounts.google.com` (Hostname) + `:443` (Port) + `/signin/v2` (Path) + `?hl=en` (Query String).',
          'The hostname is read in a hierarchy from **right to left**:',
          '1. **Top-Level Domain (TLD):** `.com`, `.org`, `.edu`, `.gov`, `.xyz`, `.top`',
          '2. **Second-Level Domain (SLD):** The actual brand or name registered with ICANN (e.g., `google` in `google.com`).',
          '3. **Subdomains:** Prefixes controlled by the domain owner (e.g., `mail`, `drive`, `accounts`).',
        ],
        diagramType: 'url-anatomy',
      },
      {
        id: 'sec-5-2',
        title: 'Subdomain Cloaking Tricks',
        content: [
          'Because anyone who owns a domain can create unlimited subdomains for free, attackers create deceptive subdomains to mimic reputable brands:',
          'Consider this address: `https://paypal.com.account-update.xyz/login`',
          'A careless user glances at the beginning and sees `paypal.com`. But looking at the domain hierarchy immediately before the single slash (`/`), the true registered domain is **`account-update.xyz`**! The string `paypal.com` is merely an arbitrary subdomain created by the attacker to deceive your eye.',
        ],
      },
      {
        id: 'sec-5-3',
        title: 'The Great HTTPS Padlock Myth',
        content: [
          'For decades, users were instructed: *"Look for the green padlock; HTTPS means a website is safe."*',
          'Today, this advice is **dangerously obsolete**. HTTPS (Transport Layer Security) guarantees only that the connection between your computer and the host server is encrypted against eavesdropping. It says **absolutely nothing** about the honesty, integrity, or malicious intent of the server owner.',
          'Over 85% of active phishing sites now use valid HTTPS certificates via automated free certificate authorities like Let\'s Encrypt. The padlock proves your password will be encrypted as it travels to the attacker\'s database.',
        ],
      },
    ],
    keyTakeaways: [
      'Identify the true domain by locating the single slash (/) after the hostname and reading the two tokens to its left.',
      'The HTTPS padlock denotes transit encryption, NOT business legitimacy.',
      'Subdomains are arbitrarily assigned by whoever controls the root domain.',
    ],
    knowledgeCheck: [
      {
        id: 'kc-5-1',
        question: 'In the web address "https://chase.com.security-alert.net/login", who actually controls the web server receiving your traffic?',
        options: [
          'Chase Bank (chase.com)',
          'The owner of security-alert.net',
          'The Internet Corporation for Assigned Names and Numbers (ICANN)',
          'The web browser company',
        ],
        correctIndex: 1,
        explanation: 'The true root domain is "security-alert.net". The string "chase.com" is merely a nested subdomain configured by whoever registered security-alert.net.',
      },
    ],
  },
  {
    id: 'module-06',
    number: 6,
    title: 'Mobile and Digital Phishing',
    shortDescription: 'Emergent attack vectors: SMS fraud, WhatsApp/Telegram impersonation, fake QR codes, and delivery scams.',
    difficulty: 'beginner',
    estimatedMinutes: 9,
    category: 'web-mobile',
    learningObjectives: [
      'Understand why mobile interfaces make phishing significantly harder to detect',
      'Analyze deceptive package delivery and postal SMS campaigns',
      'Recognize social media brand impersonation and WhatsApp verification hijacking',
      'Implement safe mobile browsing hygiene',
    ],
    sections: [
      {
        id: 'sec-6-1',
        title: 'The Mobile Vulnerability Gap',
        content: [
          'Smartphones are now the primary device for email and messaging, yet mobile operating systems introduce distinct security handicaps:',
          '• **Screen Real Estate:** Mobile browsers aggressively collapse and truncate address bars to maximize viewport space, obscuring the full domain name.',
          '• **No Mouse Hover:** Users cannot "hover" over a link to preview destination URLs prior to interaction.',
          '• **Distraction Context:** Mobile users frequently check notifications on the go, walking, or multitasking, when cognitive attention and scrutiny are minimal.',
        ],
      },
      {
        id: 'sec-6-2',
        title: 'SMS Package Delivery Scams (Postal Smishing)',
        content: [
          'Almost every smartphone user has received a message like:',
          '*"USPS: Your parcel has arrived at our sorting facility but cannot be dispatched due to an incomplete street number. Update your address within 24 hours at [usps-postal-track.top] to avoid return."*',
          'Because millions of people regularly expect online shopping deliveries, attackers rely on pure statistical probability. Clicking the link takes victims to a replica tracking page demanding a small $0.35 redelivery fee, which harvests their credit card number and CVV.',
        ],
      },
      {
        id: 'sec-6-3',
        title: 'WhatsApp & Telegram Verification Hijacking',
        content: [
          'In this attack, an attacker attempts to log into your WhatsApp account using your phone number. WhatsApp sends a legitimate 6-digit SMS verification code to your phone.',
          'Seconds later, a message arrives from a compromised account of one of your real contacts: *"Hey! I accidentally sent my verification code to your number by mistake, could you quickly paste the 6 digits back to me?"*',
          'If you send the code, the attacker instantly registers your WhatsApp session on their phone and locks you out using a two-step PIN.',
        ],
      },
    ],
    keyTakeaways: [
      'Mobile screen truncation hides critical domain clues.',
      'Never forward SMS verification codes or two-factor numbers to anyone, even family or contacts.',
      'Real postal services never ask for credit card fees via SMS to resolve missing address fields.',
    ],
    knowledgeCheck: [
      {
        id: 'kc-6-1',
        question: 'A friend on Instagram sends a message asking you to send them a screenshot of an SMS link you just received so they can recover their account. What is actually happening?',
        options: [
          'Your friend genuinely needs help resetting their password',
          'The attacker is attempting to reset your own account password or steal your session via that recovery link',
          'Instagram requires peer validation for password recovery',
          'It is a benign marketing promotion',
        ],
        correctIndex: 1,
        explanation: 'Attackers trigger a password reset for YOUR account, then trick you into sending them the recovery link or code under the guise of "helping a friend". Never forward verification links or codes.',
      },
    ],
  },
  {
    id: 'module-07',
    number: 7,
    title: 'Malware and Credential Theft',
    shortDescription: 'Infection vectors, weaponized attachments, credential harvesters, password reuse, and MFA fatigue.',
    difficulty: 'intermediate',
    estimatedMinutes: 11,
    category: 'defense-response',
    learningObjectives: [
      'Understand how malicious attachments execute code (macros, scripts, ISO containers)',
      'Analyze credential harvesting workflows and session token hijacking',
      'Evaluate the mechanics of MFA push fatigue and adversary-in-the-middle (AiTM) proxies',
      'Implement password managers and phish-resistant authentication standards',
    ],
    sections: [
      {
        id: 'sec-7-1',
        title: 'Weaponized Attachments: Beyond .exe Files',
        content: [
          'While users are trained not to click `.exe` files, threat actors use versatile encapsulation formats:',
          '• **Office Macros (.docm, .xlsm):** Embedded VBA scripts that download second-stage malware when the user clicks "Enable Editing / Enable Content".',
          '• **Disc Images (.iso, .img) & Archives (.zip, .rar):** Attackers wrap malicious payloads inside ISO virtual disk containers to bypass automated email gateway inspection.',
          '• **OneNote Notebooks (.one) & LNK Shortcuts:** Disguised shortcut files that invoke Windows PowerShell or command line utilities behind the scenes.',
        ],
      },
      {
        id: 'sec-7-2',
        title: 'Adversary-in-the-Middle (AiTM) Phishing Kits',
        content: [
          'Modern phishing tools (like Evilginx) do not merely copy static HTML forms. They function as transparent reverse proxies between the victim and the legitimate service (e.g., Microsoft 365 or Google).',
          '1. The victim enters their username, password, and real-time SMS/Authenticator OTP into the proxy.',
          '2. The proxy forwards these credentials to the real server, completing authentication.',
          '3. The real server issues an authenticated **Session Cookie** back to the proxy.',
          '4. The attacker steals the session cookie and imports it into their browser, bypassing standard username/password/OTP entirely!',
        ],
      },
      {
        id: 'sec-7-3',
        title: 'The Solution: Phish-Resistant Authentication (FIDO2 / Passkeys)',
        content: [
          'Traditional OTPs (SMS codes or 6-digit authenticator apps) are phishable because humans can be tricked into entering them on fake sites.',
          '**FIDO2 / WebAuthn Passkeys** and hardware security keys (like YubiKeys) are cryptographically bound to the browser\'s URL domain. If you are on `evil-phish.top`, the browser will refuse to produce cryptographic credentials for `google.com`. The authentication protocol itself prevents credential theft, making human inspection error impossible.',
        ],
      },
    ],
    keyTakeaways: [
      'Never enable macros or scripts in downloaded documents.',
      'AiTM proxies can intercept one-time codes and session cookies in real time.',
      'FIDO2 passkeys provide cryptographic immunity to credential phishing by binding credentials to the browser domain.',
    ],
    knowledgeCheck: [
      {
        id: 'kc-7-1',
        question: 'Why are FIDO2/WebAuthn passkeys considered "phish-resistant" compared to 6-digit SMS or Authenticator app codes?',
        options: [
          'Because passkeys require 16-character passwords',
          'Because the browser cryptographically verifies the origin domain before responding, refusing to release credentials to fake look-alike sites',
          'Because passkeys can only be used on government computers',
          'Because passkeys disable JavaScript on login pages',
        ],
        correctIndex: 1,
        explanation: 'FIDO2 relies on public-key cryptography where the browser itself validates the domain origin. Even if a user is completely tricked by a replica phishing site, the browser will not release the private key signature because the domain does not match.',
      },
    ],
  },
  {
    id: 'module-08',
    number: 8,
    title: 'Real-World Case Studies',
    shortDescription: 'Documented historical cybersecurity breaches: RSA, Sony Pictures, DNC, Twitter VIP, Twilio, and MGM.',
    difficulty: 'intermediate',
    estimatedMinutes: 14,
    category: 'synthesis',
    learningObjectives: [
      'Analyze the technical and psychological vectors in documented global breaches',
      'Understand how single spear-phishing emails penetrated multi-billion dollar enterprises',
      'Examine helpdesk vishing and SMS phishing in modern cloud environments',
      'Extract actionable defensive takeaways from historical post-mortems',
    ],
    sections: [
      {
        id: 'sec-8-1',
        title: 'RSA SecurID Breach (2011) — The Excel Recruitment Lure',
        content: [
          '**The Incident:** RSA, the company responsible for SecurID two-factor authentication tokens used by global militaries and banks, suffered a devastating breach.',
          '**The Attack Method:** Attackers sent two separate spear-phishing emails to small groups of low-level employees. The subject read *"2011 Recruitment Plan"*, with an attached spreadsheet named `2011 Recruitment plan.xls`.',
          '**What Happened:** The spreadsheet contained a zero-day exploit in Adobe Flash embedded within Excel. Opening the attachment dropped the Poison Ivy remote access trojan (RAT), giving adversaries internal lateral movement that eventually compromised SecurID master token seeds.',
          '**Key Lesson:** Attackers often target junior personnel or administrative staff who are not guarded by executive-level security monitoring to pivot inward.',
        ],
      },
      {
        id: 'sec-8-2',
        title: 'Twilio & Cloudflare "0ktapus" Campaign (2022) — Mass SMS Phishing',
        content: [
          '**The Incident:** In August 2022, over 130 organizations were targeted by a threat group known as 0ktapus using smishing.',
          '**The Attack Method:** Employees received SMS messages claiming: *"Your Okta session has expired. Please log in at [twilio-okta.com] to maintain access."*',
          '**The Difference in Outcomes:** At Twilio, several employees entered their credentials and OTPs into the AiTM proxy, allowing attackers to access internal customer consoles. At Cloudflare, employees were also tricked into entering credentials on lookalike domains—**but the attack failed completely** because Cloudflare enforced hardware FIDO2 security keys company-wide. The fake site could not capture the hardware key signature.',
        ],
      },
      {
        id: 'sec-8-3',
        title: 'MGM Resorts (2023) — 10-Minute Helpdesk Vishing',
        content: [
          '**The Incident:** In September 2023, MGM Resorts suffered massive operational paralysis across Las Vegas casinos, with slot machines, hotel keycards, and reservation systems crippled for days, costing over $100 million.',
          '**The Attack Method:** Threat group Scattered Spider (ALPHV/BlackCat affiliate) researched an MGM IT employee on LinkedIn. They then telephoned the company\'s internal IT helpdesk, impersonated the employee, and requested a password and multi-factor authentication reset.',
          '**What Happened:** The helpdesk agent granted the reset over the phone without requiring strict in-person or out-of-band identity validation, handing full administrator access directly to the attackers.',
        ],
      },
    ],
    keyTakeaways: [
      'Sophisticated attackers frequently begin with low-level employees or helpdesk technicians.',
      'FIDO2 security keys stopped the 0ktapus campaign in its tracks where standard OTP failed.',
      'Documented facts prove that social engineering succeeds even against premier tech enterprises.',
    ],
    knowledgeCheck: [
      {
        id: 'kc-8-1',
        question: 'In the 2022 0ktapus attack, why did Cloudflare successfully repel the attack while other organizations suffered breaches?',
        options: [
          'Cloudflare blocked all SMS text messages on company mobile phones',
          'Cloudflare enforced hardware FIDO2 security keys that cannot be phished by replica domains',
          'Cloudflare employees recognized every typosquatted domain name',
          'Cloudflare disconnected all remote employees from the corporate network',
        ],
        correctIndex: 1,
        explanation: 'Cloudflare mandated physical FIDO2 security keys (YubiKeys) for all corporate authentication. Even when employees entered usernames and passwords on fake lookalike sites, the hardware key refused to authenticate because the origin domain was fraudulent.',
      },
    ],
  },
  {
    id: 'module-09',
    number: 9,
    title: 'Prevention and Cyber Hygiene',
    shortDescription: 'Actionable defense: password managers, MFA architectures, safe browsing habits, and device security.',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    category: 'defense-response',
    learningObjectives: [
      'Implement the core tenets of personal and organizational cyber hygiene',
      'Understand how password managers protect against phishing automatically',
      'Configure robust multi-factor authentication hierarchies',
      'Follow the Prevention Workflow visual guide',
    ],
    sections: [
      {
        id: 'sec-9-1',
        title: 'Password Managers as Anti-Phishing Tools',
        content: [
          'Most people think password managers exist solely to remember complex 20-character strings. However, their greatest superpower is **automatic anti-phishing defense**.',
          'A browser password manager (e.g., Bitwarden, 1Password, or native browser vaults) autofills credentials **only when the current active URL domain precisely matches the stored entry**.',
          'If you land on `https://paypal.com.verify-login.xyz`, the password manager will refuse to autofill your `paypal.com` credentials. When your password manager suddenly leaves the login fields blank on a page you thought was legitimate, that is an immediate warning that you are on a fraudulent domain!',
        ],
        diagramType: 'prevention',
      },
      {
        id: 'sec-9-2',
        title: 'The Hierarchy of Multi-Factor Authentication (MFA)',
        content: [
          'Not all MFA methods offer equal security protection:',
          '• **Tier 1 (Weakest): SMS / Voice Calls:** Vulnerable to SIM swapping, SS7 telecommunication eavesdropping, and AiTM proxy harvesting.',
          '• **Tier 2 (Better): Authenticator Apps (TOTP):** 6-digit codes refreshed every 30 seconds. Stronger than SMS, but still vulnerable if the user manually types the 6 digits into a real-time phishing proxy.',
          '• **Tier 3 (Phish-Resistant): FIDO2 / Passkeys / Hardware Security Keys:** Cryptographically locked to the registered origin domain. The gold standard for modern cybersecurity defense.',
        ],
      },
      {
        id: 'sec-9-3',
        title: 'Core Cyber Hygiene Checklist',
        content: [
          '1. **Patch Promptly:** Keep your operating system, web browsers, and extensions automatically updated to close known zero-day vulnerabilities.',
          '2. **Separate Identities:** Maintain distinct email addresses for financial accounts, professional correspondence, and disposable online shopping/newsletter signups.',
          '3. **Verify Out-of-Band:** If your bank or colleague asks for sensitive action via email or text, call their known verified phone number or open the official mobile app independently.',
        ],
      },
    ],
    keyTakeaways: [
      'Password managers will not autofill on phishing domains, providing instant passive warning.',
      'Migrate from SMS-based 2FA to authenticator apps or FIDO2 passkeys whenever supported.',
      'Always verify anomalous requests via a second, out-of-band communication channel.',
    ],
    knowledgeCheck: [
      {
        id: 'kc-9-1',
        question: 'You click a link from an email claiming to be Netflix, but your password manager refuses to autofill your credentials on the login screen. What does this usually indicate?',
        options: [
          'The password manager software has a corrupted database and should be uninstalled',
          'The current website domain does not match the official Netflix domain saved in your vault',
          'Netflix servers are temporarily undergoing maintenance',
          'Your web browser is infected with ransomware',
        ],
        correctIndex: 1,
        explanation: 'Password managers match credentials strictly to the exact registered domain name in the address bar. If autofill does not activate, the page is almost certainly hosted on an unverified or phishing domain.',
      },
    ],
  },
  {
    id: 'module-10',
    number: 10,
    title: 'Reporting and Incident Response',
    shortDescription: 'Step-by-step containment protocol: what to do immediately after clicking, typing credentials, or downloading payloads.',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    category: 'defense-response',
    learningObjectives: [
      'Execute the immediate 4-step containment protocol after clicking a phishing link',
      'Safely remediate compromised credentials and invalidate active session tokens',
      'Preserve digital evidence without executing or forwarding malicious payloads',
      'Follow the Incident Response Workflow visual guide',
    ],
    sections: [
      {
        id: 'sec-10-1',
        title: 'The Golden Hour: Immediate Containment',
        content: [
          'Mistakes happen even to cybersecurity professionals. What separates a minor close-call from a catastrophic enterprise breach is how fast and calmly you respond during the first 15 minutes.',
          '**Step 1: Terminate Browser & Invalidate:** Close the phishing tab immediately. If an unexpected file downloaded, do not open or double-click it. Move it directly to your trash/recycle bin and empty it.',
          '**Step 2: Isolate the Network (if malware executed):** If you ran an executable or enabled macros, immediately disconnect your device from Wi-Fi or unplug the Ethernet cable to halt command-and-control (C2) beaconing and lateral network spread.',
        ],
        diagramType: 'incident-response',
      },
      {
        id: 'sec-10-2',
        title: 'Credential Remediation: Out-of-Band Password Reset',
        content: [
          'If you submitted your password on a deceptive webpage:',
          '1. Open a **known safe device** (such as your personal smartphone or a clean laptop) or a fresh browser window.',
          '2. Navigate directly to the real service by typing the verified URL manually.',
          '3. **Change the password immediately** to a unique, randomly generated phrase.',
          '4. Select **"Log out of all devices / Revoke all active sessions"** in the account settings. This is crucial: changing the password alone does not always invalidate stolen session tokens already held by an attacker.',
          '5. If you reuse that same password across any other accounts, change them right away.',
        ],
      },
      {
        id: 'sec-10-3',
        title: 'Evidence Preservation & Responsible Reporting',
        content: [
          '• **Corporate Environments:** Report the incident immediately to your IT Security / SOC team. Many employees hesitate out of fear of punishment, allowing attackers hours of unhindered access. Security teams value rapid reporting far more than perfection.',
          '• **Consumer Reporting:** Report phishing URLs to Google Safe Browsing (`safebrowsing.google.com`) and Microsoft Defender SmartScreen, and forward malicious emails to the Anti-Phishing Working Group (APWG) at `reportphishing@apwg.org` or CISA.',
        ],
      },
    ],
    keyTakeaways: [
      'Act rapidly: isolate the network if a payload executed, and revoke active sessions immediately.',
      'Changing your password must be paired with invalidating active session cookies.',
      'Never hide a mistake; immediate reporting drastically minimizes financial and operational impact.',
    ],
    knowledgeCheck: [
      {
        id: 'kc-10-1',
        question: 'After entering your password on a fake corporate login portal, you change your password on the official website. What critical additional step must you take?',
        options: [
          'Shut down your home router for 48 hours',
          'Click "Sign out of all sessions/devices" to invalidate any session cookies the attacker captured',
          'Send an email to everyone in your address book warning them',
          'Reinstall the operating system immediately',
        ],
        correctIndex: 1,
        explanation: 'Modern AiTM phishing kits capture active session tokens. If you change your password without revoking active sessions, the attacker may retain authorized access until that session cookie expires.',
      },
    ],
  },
  {
    id: 'module-11',
    number: 11,
    title: 'Practical Phishing Recognition',
    shortDescription: 'Methodology for spotting subtle indicators across realistic fake emails, SMS alerts, and cloud notices.',
    difficulty: 'advanced',
    estimatedMinutes: 12,
    category: 'synthesis',
    learningObjectives: [
      'Apply a systematic 5-point inspection framework to any incoming message',
      'Analyze deceptive clues across real-world scenario archetypes',
      'Transition from memorizing specific scams to recognizing underlying behavioral patterns',
      'Prepare for interactive scenario testing in the Practice Lab',
    ],
    sections: [
      {
        id: 'sec-11-1',
        title: 'The 5-Point Message Inspection Framework',
        content: [
          'Whenever you review an unfamiliar or high-stakes digital communication, evaluate these five layers in sequence:',
          '1. **Origin Verification:** Is the email sender envelope address or SMS originator verified and consistent with the company\'s known root domain?',
          '2. **Context & Solicitation:** Did you initiate this interaction? Were you expecting an invoice, delivery alert, or password reset at this exact moment?',
          '3. **Hyperlink Inspection:** Where does the link actually route? Is it pointing to the authentic registered domain or a lookalike/shortened address?',
          '4. **Urgency & Tone:** Is there psychological coercion forcing you to act before thinking?',
          '5. **Requested Action:** Does the message ask for credentials, credit card details, gift card codes, or software execution?',
        ],
      },
      {
        id: 'sec-11-2',
        title: 'Dissecting Common Archetypes',
        content: [
          '• **The Fake Cloud Storage Notification:** *"Your file share access has expired. Click here to view document."* Leads to a generic multi-brand login selector designed to capture Microsoft, Google, or Yahoo accounts.',
          '• **The Fake Vendor Invoice (.zip):** *"Please find attached revised PO #89104 for yesterday\'s order."* Designed to capitalize on accounting workflows where staff open attachments habitually.',
          '• **The University / College Tuition Refund:** Popular on campus networks, prompting students to enter student portal logins to claim unexpected grant funds.',
        ],
      },
    ],
    keyTakeaways: [
      'Apply the 5-point inspection framework: Origin, Context, Hyperlink, Tone, and Requested Action.',
      'Unsolicited attachments with invoices you never ordered are almost always malware lures.',
      'Practice evaluating scenarios critically in the UnPhish Practice Lab.',
    ],
    knowledgeCheck: [
      {
        id: 'kc-11-1',
        question: 'You receive an unexpected email from "Geek Squad Invoicing" containing a PDF confirming an automatic charge of $499.00 with a phone number to call if you did not authorize it. What scam model is this?',
        options: [
          'Ransomware extortion',
          'Refund / Callback Phishing scam (Vishing bait)',
          'Man-in-the-Middle Wi-Fi attack',
          'Legitimate billing dispute notice',
        ],
        correctIndex: 1,
        explanation: 'This is a classic callback phishing scam. The fake invoice induces panic over an imaginary $499 charge, leading the victim to call the phone number where social engineers trick them into granting remote desktop access to "process a refund".',
      },
    ],
  },
  {
    id: 'module-12',
    number: 12,
    title: 'Final Assessment & Readiness Guide',
    shortDescription: 'Synthesize your cybersecurity knowledge, review key principles, and prepare for the comprehensive Final Assessment.',
    difficulty: 'advanced',
    estimatedMinutes: 8,
    category: 'synthesis',
    learningObjectives: [
      'Review core principles across all 11 prior learning modules',
      'Understand the scoring methodology and question structure of the Final Assessment',
      'Develop long-term security awareness reflexes for daily digital life',
      'Take the Final Assessment to measure your verified readiness',
    ],
    sections: [
      {
        id: 'sec-12-1',
        title: 'The UnPhish Defense Philosophy: Think Before You Click',
        content: [
          'Congratulations on reaching the capstone module of UnPhish! Throughout this curriculum, you have journeyed from basic terminology to deep technical URL inspection and incident containment protocols.',
          'True cybersecurity readiness is not about paranoia; it is about **situational awareness**. By treating unexpected communications with calm scrutiny, verifying root domains, adopting password managers, and using phish-resistant authentication, you reduce your attack surface by over 95%.',
        ],
      },
      {
        id: 'sec-12-2',
        title: 'Core Rules Summary Reference',
        content: [
          '1. **Display Names Lie:** Always inspect the actual sender email domain after the `@` symbol.',
          '2. **Read URLs Right-to-Left:** Find the single slash `/` and inspect the two tokens to its immediate left.',
          '3. **The Padlock (HTTPS) Means Encryption, Not Honesty:** Phishing sites also have HTTPS.',
          '4. **Emotions Are Warnings:** Panic, fear, and rushed urgency are the deliberate tools of social engineers.',
          '5. **Out-of-Band Verification:** When in doubt, contact the entity directly through a known, trusted phone number or app.',
        ],
      },
    ],
    keyTakeaways: [
      'Cybersecurity is an ongoing habit of situational awareness.',
      'You are now equipped with the technical knowledge to evaluate messages, links, and scams independently.',
      'Head to the Final Assessment to evaluate your full mastery!',
    ],
    knowledgeCheck: [
      {
        id: 'kc-12-1',
        question: 'Which of the following represents the most resilient overall defense posture against modern social engineering?',
        options: [
          'Relying entirely on spam filters and never inspecting email headers',
          'Combining situational awareness, password managers, and phish-resistant MFA with out-of-band verification habits',
          'Avoiding the internet entirely for financial transactions',
          'Changing all passwords daily to 6-digit pin numbers',
        ],
        correctIndex: 1,
        explanation: 'Defense-in-depth: combining human skepticism with technological safeguards (password managers, hardware MFA) and procedural verification creates a robust, resilient shield against attacks.',
      },
    ],
  },
];
