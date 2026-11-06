# UnPhish — Think before you click.

> **An interactive cybersecurity awareness and phishing education platform designed for students, beginners, and everyday internet users.**

[![Project License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/Framework-React_19-cyan.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-teal.svg)](https://tailwindcss.com/)

---

## 👨‍💻 Project Creator & Attribution

**Created by Rahul Mishra**  
*B.Tech CSE — Cyber Security Student*

*UnPhish: An independent cybersecurity awareness and learning project.*  
*Target GitHub Repository:* `https://github.com/coder-r4hxl/CodeAlpha_UnPhish`

---

## 🛡️ Executive Summary

Modern cyber threats overwhelmingly target the human element rather than attempting to brute-force mathematical cryptography. **UnPhish** is a production-minded educational platform that deconstructs the psychology of social engineering, unpacks email envelope headers, teaches the **Right-to-Left URL rule**, and equips users with emergency incident response reflexes.

### Core Architectural Principles
- **Education Before Decoration:** Focus on deep educational explanations rather than superficial cosmetic cards.
- **Privacy by Design:** Zero account registrations, zero advertising trackers, and zero external database dependencies. All progress and history reside strictly in local browser storage (`localStorage`).
- **Real Static URL Inspector:** In-browser JavaScript parsing engine analyzing RFC 3986 components against 12 heuristics without dispatching external network requests or DNS lookups.
- **Dual-Mode Intelligent Assistant (UnPhish Guide):**
  - **Gemini Assistant:** Preferred server-side proxy powered by `@google/genai` and `gemini-3.8-flash` with strict defensive security guardrails.
  - **Offline Learning Assistant:** Independent deterministic fallback engine indexed across UnPhish’s 12-module curriculum, scam categories, and triage procedures. Operates seamlessly without internet access or API credentials.

---

## 📚 Complete 12-Module Curriculum

1. **Module 01: Cybersecurity Foundations** — CIA Triad (Confidentiality, Integrity, Availability), why humans are targeted, technical exploits vs. cognitive manipulation.
2. **Module 02: Types of Phishing Attacks** — Mass phishing, Spear phishing, Whaling, Smishing, Vishing, Business Email Compromise (BEC), Quishing (QR codes), and search engine ad spoofing.
3. **Module 03: Psychology of Social Engineering** — Amygdala hijack, cognitive levers (urgency, authority, fear, greed, social proof), and the 60-second cognitive circuit breaker. Includes original **Psychological Manipulation Flow Diagram**.
4. **Module 04: Phishing Email Analysis** — Display-name spoofing vs. envelope addresses, SPF/DKIM/DMARC fundamentals, anchor text vs. hyperlink destinations. Includes interactive **Annotated Phishing Email Diagram**.
5. **Module 05: Fake Websites and URL Analysis** — Scheme, subdomains, Second-Level Domains (SLD), Top-Level Domains (TLD), typosquatting, homoglyphs (Punycode `xn--`), and why the HTTPS padlock is not proof of honesty. Includes **Visual URL Anatomy Diagram**.
6. **Module 06: Mobile and Digital Phishing** — Screen real-estate handicaps, package delivery SMS (postal smishing), WhatsApp/Telegram verification code hijacking, mobile browser safety.
7. **Module 07: Malware and Credential Theft** — Weaponized attachments (.iso, .docm macros, .lnk), Adversary-in-the-Middle (AiTM) reverse proxies (Evilginx), password managers, and phish-resistant FIDO2/WebAuthn passkeys.
8. **Module 08: Real-World Case Studies** — Documented historical post-mortems: RSA SecurID breach (2011), Sony Pictures (2014), DNC email leaks (2016), Twitter VIP Bitcoin takeover (2020), 0ktapus Twilio/Cloudflare campaign (2022), and MGM Resorts helpdesk vishing (2023).
9. **Module 09: Prevention and Cyber Hygiene** — The 4 pillars of defense-in-depth: password manager domain binding, passkeys/hardware tokens, prompt software patching, and mandatory out-of-band verification.
10. **Module 10: Reporting and Incident Response** — The 4-Phase Containment Protocol: minutes 0–5 (isolate & close), minutes 5–15 (out-of-band password reset & revoke active sessions), minutes 15–30 (malware scan), minutes 30–60 (reporting & hardening).
11. **Module 11: Practical Phishing Recognition** — The 5-Point Message Inspection Framework (Origin, Context, Hyperlink, Tone, Requested Action).
12. **Module 12: Final Assessment & Readiness Guide** — Core principles review, capstone synthesis, and test preparation.

---

## 🧪 Interactive Practice Lab

The Practice Lab puts theory into action across 6 distinct categories with Beginner, Intermediate, and Advanced scenarios:
- **Phishing Emails:** Deceptive bank security alerts with spoofed subdomains.
- **SMS Smishing:** Postal courier address update requests demanding credit card redelivery fees.
- **Student & College Lures:** Unclaimed tuition grant disbursement phishing campus SSO credentials.
- **Job & Internship Scams:** Fake check and overpayment advance fee schemes targeting remote applicants.
- **Account Security & MFA:** Responding to repeated 2 AM MFA fatigue push bombing.
- **Social Engineering / BEC:** Typosquatted vendor invoice rerouting wire transfers ($42,800).

---

## 🔍 Local Browser-Based URL Inspector

A 100% client-side security tool that inspects entered web addresses against 12 static indicators:
- **Protocol validation:** Plaintext HTTP vs. HTTPS vs. custom application schemes.
- **Raw IP hostname:** Flags hostnames using direct IPv4, IPv6, or hex notation.
- **URL shorteners:** Detects masking services (bit.ly, tinyurl, t.co, is.gd, etc.).
- **Punycode / Homoglyphs:** Identifies internationalized domain names (`xn--`) using Cyrillic/Greek lookalikes.
- **Excessive subdomains:** Warns on deep subdomain nesting used to disguise root domains on mobile screens.
- **High-risk TLDs:** Flags extensions frequently exploited in mass phishing (.zip, .mov, .top, .xyz, .buzz, etc.).
- **Brand impersonation:** Inspects subdomain and SLD keyword patterns targeting major consumer brands.
- **Credential tricks:** Identifies deceptive `@` symbols in the URL authority section.
- **Double extensions:** Catches executable files disguised as documents (e.g., `.pdf.exe`).
- **Open redirect parameters:** Detects query parameters forwarding traffic externally.

---

## 🚀 Getting Started & Local Development

### Prerequisites
- Node.js (version 20 or higher recommended)
- npm (version 9 or higher)

### Installation
```bash
# Clone or navigate to the project directory
cd CodeAlpha_UnPhish

# Install dependencies
npm install
```

### Running the Development Server
```bash
# Starts the full-stack server (Express + Vite middlewares on port 3000)
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Building for Production
```bash
# Compiles TypeScript and runs Vite production bundle build
npm run build

# Runs linter and type-checking
npm run lint

# Starts the production server
npm start
```

### Environment Variables (.env)
Create a `.env` file in the root directory (based on `.env.example`):
```env
# Optional: Required only if using the server-side Gemini 3.8 Flash Assistant
GEMINI_API_KEY="your-gemini-api-key-here"

# Application URL
APP_URL="http://localhost:3000"
```
*Note: If `GEMINI_API_KEY` is omitted, UnPhish automatically and transparently operates in **Offline Learning Assistant** mode with full curriculum question-answering capabilities.*

---

## 📦 Connecting to GitHub (Manual Steps)

If you need to push this project to the official target GitHub repository (`https://github.com/coder-r4hxl/CodeAlpha_UnPhish`):

```bash
# 1. Initialize Git in the project root (if not already initialized)
git init

# 2. Add the remote repository
git remote add origin https://github.com/coder-r4hxl/CodeAlpha_UnPhish.git

# 3. Verify the remote URL
git remote -v

# 4. Stage all project files
git add .

# 5. Commit with a structured message
git commit -m "feat: complete UnPhish cybersecurity awareness platform implementation"

# 6. Set default branch to main and push
git branch -M main
git push -u origin main
```

*If the remote repository already contains an initial commit or README, synchronize without force-pushing:*
```bash
git pull origin main --rebase
git push origin main
```

---

## 📄 License & Attribution

- **Project Creator:** Rahul Mishra (B.Tech CSE — Cyber Security Student)
- **License:** Apache License 2.0
- **Standards Grounding:** NIST SP 800-63B, MITRE ATT&CK®, CISA, APWG, IETF RFC 5322 & RFC 7489.
