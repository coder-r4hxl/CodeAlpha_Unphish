import { PracticeScenario } from '../types';

export const PRACTICE_SCENARIOS: PracticeScenario[] = [
  {
    id: 'practice-01',
    title: 'Suspicious Bank Account Freeze Alert',
    category: 'email',
    categoryLabel: 'Phishing Email',
    difficulty: 'beginner',
    contextDescription: 'You receive an urgent email in your inbox claiming to be from Chase Bank regarding an unauthorized transaction of $1,250.00.',
    fictionalArtifact: {
      type: 'email',
      senderName: 'Chase Fraud Prevention Dept',
      senderAddress: 'alert-security@chase-fraud-prevention-alert.com',
      recipient: 'customer@my-domain.net',
      subject: 'URGENT: Your Account Has Been Temporarily Frozen - Case #89214',
      date: 'Today, 09:14 AM',
      content: `Dear Chase Customer,

We detected unauthorized debit card attempts from Moscow, Russia for $1,250.00. To prevent total loss of funds, your checking account access has been restricted.

You MUST verify your identity and debit card PIN within 12 hours to restore normal service. Failure to do so will result in permanent account closure and transfer to collection.`,
      callToAction: {
        label: 'Secure Your Account Now',
        destinationUrl: 'https://chase.com.security-verify-portal.net/login?token=89214',
      },
    },
    question: 'How should you evaluate this email and what is the safest course of action?',
    options: [
      {
        id: 'opt-1-a',
        text: 'Click the button and enter your credentials because the email says your account has already been frozen.',
        isCorrect: false,
        feedback: 'Incorrect. Attackers invent fake account freezes to provoke panic and force you to act without thinking.',
      },
      {
        id: 'opt-1-b',
        text: 'Recognize the fake sender domain and spoofed subdomain URL, ignore the link, and check your official Chase mobile app directly.',
        isCorrect: true,
        feedback: 'Correct! The sender domain is "chase-fraud-prevention-alert.com" (not chase.com), and the destination URL actually leads to "security-verify-portal.net". Checking your official app independently is the safe response.',
      },
      {
        id: 'opt-1-c',
        text: 'Reply directly to the email asking the sender to cancel the Russian transaction.',
        isCorrect: false,
        feedback: 'Incorrect. Replying confirms your email address is active and monitered, exposing you to further targeted phishing.',
      },
      {
        id: 'opt-1-d',
        text: 'Forward the email to all your colleagues so they do not get charged.',
        isCorrect: false,
        feedback: 'Incorrect. This causes panic and forwards phishing lures inside your network.',
      },
    ],
    detailedExplanation: 'This scenario displays two classic red flags: display-name spoofing and subdomain cloaking. While the display name claims to be "Chase Fraud Prevention Dept", the actual sender domain is "chase-fraud-prevention-alert.com". Furthermore, the link uses "chase.com.security-verify-portal.net", which is hosted on "security-verify-portal.net", NOT Chase Bank.',
    identifiedRedFlags: [
      'Fraudulent sender domain (chase-fraud-prevention-alert.com instead of chase.com)',
      'Subdomain deception in link (root domain is security-verify-portal.net)',
      'Artificial 12-hour panic deadline threatening account closure',
      'Requesting sensitive debit card PIN via email link',
    ],
    recommendedSafeAction: 'Never click links in panic emails. Open your Chase mobile app independently or call the customer service phone number printed on the back of your physical card.',
  },
  {
    id: 'practice-02',
    title: 'Postal Courier Incomplete Address SMS',
    category: 'sms',
    categoryLabel: 'Suspicious SMS (Smishing)',
    difficulty: 'beginner',
    contextDescription: 'You receive an unexpected SMS message while waiting for several online shopping packages to arrive.',
    fictionalArtifact: {
      type: 'sms',
      phoneSender: '+1 (833) 492-0199',
      content: `[USPS Alert]: Your package #US94028392 arrived at the regional depot, but dispatch was suspended due to an incomplete delivery address. Please verify your address and pay redelivery fee ($0.30) within 24h: https://usps.post-track-update.top/reschedule`,
    },
    question: 'What is the primary indicator of deception in this SMS message?',
    options: [
      {
        id: 'opt-2-a',
        text: 'The package tracking number contains letters instead of only digits.',
        isCorrect: false,
        feedback: 'Incorrect. Real USPS international and domestic tracking codes often have letters like "US". That is not the clue.',
      },
      {
        id: 'opt-2-b',
        text: 'The link directs to the high-risk TLD domain "post-track-update.top", not the legitimate "usps.com", and asks for payment to fix an address.',
        isCorrect: true,
        feedback: 'Correct! The domain is "post-track-update.top" (using a cheap .top TLD). USPS does not charge credit card fees via SMS to update delivery addresses.',
      },
      {
        id: 'opt-2-c',
        text: 'Text messages from toll-free numbers are always illegal.',
        isCorrect: false,
        feedback: 'Incorrect. Many legitimate services use toll-free numbers, though attackers spoof them frequently.',
      },
    ],
    detailedExplanation: 'Postal package smishing is one of the highest-volume consumer attacks globally. Attackers send millions of SMS texts hoping recipients recently bought something online. The goal is not just the $0.30 fee; the fake page harvests full credit card numbers, billing addresses, and CVV codes.',
    identifiedRedFlags: [
      'Deceptive registered domain: "post-track-update.top" instead of official "usps.com"',
      'High-risk .top top-level domain frequently used in mass spam campaigns',
      'Demanding credit card entry to correct an address',
      'Arbitrary 24-hour urgency deadline',
    ],
    recommendedSafeAction: 'Delete the SMS and do not click the link. If you have an active package, track it directly through usps.com using your official order confirmation email.',
  },
  {
    id: 'practice-03',
    title: 'University Tuition Grant & Refund Notification',
    category: 'email',
    categoryLabel: 'College / Student Phishing',
    difficulty: 'intermediate',
    contextDescription: 'A university student receives an email in their campus mailbox right at the start of the semester.',
    fictionalArtifact: {
      type: 'email',
      senderName: 'Office of Financial Aid & Registrar',
      senderAddress: 'financialaid-bursar@university-portal-grants.org',
      recipient: 'student.id@campus.edu',
      subject: 'DIRECT DEPOSIT REFUND: $1,450.00 Disbursed to Your Account',
      date: 'Yesterday, 04:30 PM',
      content: `Dear Student,

You have an unclaimed educational grant refund of $1,450.00 from the 2026 Academic Support Endowment.

To deposit the funds directly into your student savings account before today's fiscal cycle closes, log in using your university student portal credentials:`,
      callToAction: {
        label: 'Claim Refund of $1,450.00',
        destinationUrl: 'https://campus.edu.bursar-direct.xyz/auth/sso',
      },
    },
    question: 'What is the attacker’s primary objective in this scenario?',
    options: [
      {
        id: 'opt-3-a',
        text: 'To harvest the student’s university Single Sign-On (SSO) credentials to compromise campus systems and internal resources.',
        isCorrect: true,
        feedback: 'Correct! Attackers harvest campus credentials to access university networks, alter payroll/financial aid routing, or send further internal phishing from trusted .edu addresses.',
      },
      {
        id: 'opt-3-b',
        text: 'To verify whether the student is enrolled in classes.',
        isCorrect: false,
        feedback: 'Incorrect. Attackers do not care about academic enrollment; they want actionable login credentials.',
      },
      {
        id: 'opt-3-c',
        text: 'To legally disburse educational grant funds.',
        isCorrect: false,
        feedback: 'Incorrect. The email is a complete fabrication.',
      },
    ],
    detailedExplanation: 'University environments are heavily targeted during tuition payment and refund cycles. Notice the sender domain is "university-portal-grants.org" (not the official .edu campus domain), and the link directs to a .xyz domain mimicking the student SSO portal.',
    identifiedRedFlags: [
      'Sending address uses an external .org domain instead of the university’s verified .edu domain',
      'Deceptive URL using campus.edu as a fake subdomain on "bursar-direct.xyz"',
      'Greed and urgency trigger: promising $1,450 before the fiscal cycle closes',
      'Generic greeting "Dear Student" rather than the student’s registered name',
    ],
    recommendedSafeAction: 'Do not click the link. Log into your university portal directly by navigating to your school’s verified .edu website and check your bursar account statements there.',
  },
  {
    id: 'practice-04',
    title: 'Remote Software Internship & Check Deposit Offer',
    category: 'job-internship',
    categoryLabel: 'Job / Internship Scam',
    difficulty: 'intermediate',
    contextDescription: 'You applied for software internships on LinkedIn. You receive an unsolicited message from a recruiter.',
    fictionalArtifact: {
      type: 'chat',
      senderName: 'Eleanor Vance (Senior Talent Lead)',
      content: `Hello! We reviewed your profile and are thrilled to offer you a 100% remote Junior Cloud Developer Internship at $48/hour. No technical interview is needed due to our rapid hiring surge.

We will courier you an advance digital check of $2,800 to your mobile bank account today. You must deposit it and wire $2,300 immediately to our approved hardware supplier via Zelle/Wire to receive your corporate Apple MacBook Pro and test server credentials. Welcome to the team!`,
    },
    question: 'What type of fraudulent scheme is this offer?',
    options: [
      {
        id: 'opt-4-a',
        text: 'A legitimate fast-track hiring process for high-demand tech positions.',
        isCorrect: false,
        feedback: 'Incorrect. No legitimate company conducts hiring without technical evaluation and asks candidates to wire back money from deposited checks.',
      },
      {
        id: 'opt-4-b',
        text: 'A classic Fake Check / Overpayment Scam targeting job seekers.',
        isCorrect: true,
        feedback: 'Correct! The scammer sends a counterfeit check. U.S. banks make funds temporarily available by law before the check clears. Once you wire the $2,300, the fake check bounces days later, and your bank holds YOU legally responsible for the lost funds.',
      },
      {
        id: 'opt-4-c',
        text: 'An authentic employee equipment stipend program.',
        isCorrect: false,
        feedback: 'Incorrect. Real employers ship pre-configured laptops directly from IT or reimburse via standard company payroll.',
      },
    ],
    detailedExplanation: 'The fake check employment scam preys on students and job seekers eager for remote roles. Legitimate companies never send advance checks asking candidates to wire money or purchase hardware from specific unverified third parties.',
    identifiedRedFlags: [
      'High salary ($48/hr) with "no interview needed"',
      'Requiring candidate to deposit a check and wire money back via non-reversible methods (Zelle/Wire)',
      'Unsolicited offer without verified application history',
      'Pressure to act before the counterfeit check bounces',
    ],
    recommendedSafeAction: 'Cease all communication immediately. Never deposit checks from unknown individuals and never wire funds for "office equipment". Report the profile on the platform.',
  },
  {
    id: 'practice-05',
    title: 'Repeated 2AM MFA Push Notifications (MFA Fatigue)',
    category: 'account-security',
    categoryLabel: 'Account Security & MFA',
    difficulty: 'advanced',
    contextDescription: 'It is 2:30 AM. Your mobile phone buzzes repeatedly with 15 push notifications from your Microsoft Authenticator app asking: "Approve sign-in for your work account from Frankfurt, Germany?"',
    fictionalArtifact: {
      type: 'browser',
      browserUrl: 'Authenticator App Push Prompt',
      content: `Microsoft Authenticator:
Sign-in request received.
Location: Frankfurt, Germany
IP: 185.220.101.44
Device: Linux / Firefox

[ Deny ]    [ Approve ]

(Notification 12 of 15 within 4 minutes)`,
    },
    question: 'What is happening and what should you do right now?',
    options: [
      {
        id: 'opt-5-a',
        text: 'Tap "Approve" so the notifications stop buzzing and you can go back to sleep.',
        isCorrect: false,
        feedback: 'Incorrect! This is exactly what the attacker wants. Tapping Approve grants them full access to your account.',
      },
      {
        id: 'opt-5-b',
        text: 'Tap "Deny", recognize that your password has already been compromised, and change your password immediately from a known safe browser.',
        isCorrect: true,
        feedback: 'Correct! Repeated MFA prompts mean the attacker already knows your correct username and password. Deny the prompt, report fraudulent activity in the app, and immediately change your password.',
      },
      {
        id: 'opt-5-c',
        text: 'Restart your phone to clear the notifications, assuming it is a routine software glitch.',
        isCorrect: false,
        feedback: 'Incorrect. The attacker will continue triggering prompts, or worse, someone might accidentally tap approve later.',
      },
    ],
    detailedExplanation: 'This is an MFA Fatigue (Push Bombing) attack. Attackers trigger continuous push notifications at odd hours hoping user irritation or sleepiness leads to an accidental approval. Crucially, the presence of these notifications proves that the attacker already holds your valid password.',
    identifiedRedFlags: [
      'Repeated, unprompted MFA push alerts during the night',
      'Foreign or unrecognized login location (Frankfurt, Germany)',
      'Persistent notification flood designed to induce compliance fatigue',
    ],
    recommendedSafeAction: 'Tap "Deny / Report Fraud". Immediately log into your account from a clean device, change your password, and revoke all active sessions.',
  },
  {
    id: 'practice-06',
    title: 'Urgent Vendor Wire Route Change (BEC)',
    category: 'social-engineering',
    categoryLabel: 'Business Email Compromise (BEC)',
    difficulty: 'advanced',
    contextDescription: 'You work in the accounts payable department of a mid-sized firm. You receive an email from your long-time building contractor.',
    fictionalArtifact: {
      type: 'email',
      senderName: 'David Miller (Apex Construction LLC)',
      senderAddress: 'david.miller@apex-constructlon.com',
      recipient: 'ap@company-real.com',
      subject: 'URGENT: Updated Banking Instructions for Invoice #4092 ($42,800.00)',
      date: 'Today, 11:20 AM',
      content: `Hello AP Team,

Please note our primary banking partner is currently undergoing an annual compliance audit.

For the pending milestone invoice #4092 ($42,800.00) scheduled for release today, please reroute the wire transfer to our new holding account at First Metro Capital (Routing: 021000021, Acct: 8932014920).

Please confirm as soon as the wire is initiated so our site crew can pour the concrete tomorrow morning without delay.`,
    },
    question: 'Before releasing the $42,800 wire transfer, what is the mandatory cybersecurity procedure?',
    options: [
      {
        id: 'opt-6-a',
        text: 'Reply to the email asking David to re-confirm the account number.',
        isCorrect: false,
        feedback: 'Incorrect. If David’s email was spoofed or compromised, the attacker will reply confirming their own fraudulent account.',
      },
      {
        id: 'opt-6-b',
        text: 'Conduct a mandatory out-of-band verification by calling David Miller at his known, pre-existing phone number from company records.',
        isCorrect: true,
        feedback: 'Correct! Crucially, look closely at the sender domain: "apex-constructlon.com" with an "l" instead of an "i" (typosquatting). Calling David via a verified internal number prevents a $42,800 fraud loss.',
      },
      {
        id: 'opt-6-c',
        text: 'Release the wire transfer immediately because delaying will stop site construction work.',
        isCorrect: false,
        feedback: 'Incorrect. Fear of delaying operations is the exact social engineering lever used by BEC fraudsters.',
      },
    ],
    detailedExplanation: 'This is a textbook Business Email Compromise (BEC) attack using typosquatting. The sender domain uses "apex-constructlon.com" (replacing the letter "i" in construction with an "l"). Wire route changes must NEVER be approved via email alone without independent out-of-band telephone verification.',
    identifiedRedFlags: [
      'Subtle typosquat domain: "apex-constructlon.com" (letter "l" replaces "i")',
      'Unsolicited change to bank routing details right before a scheduled payment',
      'Artificial business operational urgency ("concrete crew will delay without wire")',
      'Lack of formal digital signature or multi-stakeholder contract amendment',
    ],
    recommendedSafeAction: 'Halt the wire transfer. Call the vendor at their verified phone number saved in your accounting ERP system (not any number listed in the email) to confirm banking authenticity.',
  },
];
