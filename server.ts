import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory sliding window rate limiter
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 35; // 35 requests/min per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestCounts.get(ip);

  if (!entry || now > entry.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Clean up stale rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequestCounts.entries()) {
    if (now > data.resetTime) {
      ipRequestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '200kb' }));

  // 1. Health & Capability Check Route
  app.get('/api/health', (req, res) => {
    const key = process.env.GEMINI_API_KEY;
    const isValidKey = Boolean(key && key !== 'MY_GEMINI_API_KEY' && key.trim().length > 10);
    res.json({
      status: 'ok',
      hasGeminiKey: isValidKey,
      model: 'gemini-3.8-flash',
      app: 'UnPhish',
      version: '2.0.0',
    });
  });

  // 2. Intelligent Learning Assistant API (Gemini 3.8 Flash proxy with defensive security guardrails)
  app.post('/api/chat', async (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

    // Rate limiting check
    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        available: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Rate limit reached. Please wait a minute before sending another request.',
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim().length < 10) {
      return res.status(200).json({
        available: false,
        reason: 'NO_API_KEY',
        message: 'GEMINI_API_KEY is not configured on the server. Falling back to UnPhish Offline Guide.',
      });
    }

    try {
      const { messages } = req.body;

      // Request validation
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({
          available: false,
          error: 'INVALID_REQUEST',
          message: 'A non-empty messages array is required.',
        });
      }

      const latestMessage = messages[messages.length - 1];
      if (!latestMessage || typeof latestMessage.content !== 'string') {
        return res.status(400).json({
          available: false,
          error: 'INVALID_CONTENT',
          message: 'Message content must be a valid string.',
        });
      }

      const userLatest = latestMessage.content.trim();
      if (userLatest.length === 0) {
        return res.status(400).json({
          available: false,
          error: 'EMPTY_MESSAGE',
          message: 'Message cannot be empty.',
        });
      }

      // Input length limit (cap at 4,000 characters)
      if (userLatest.length > 4000) {
        return res.status(400).json({
          available: false,
          error: 'MESSAGE_TOO_LONG',
          message: 'Message exceeds maximum allowed length of 4,000 characters.',
        });
      }

      // Sanitize history to last 10 messages max
      const sanitizedHistory = messages
        .slice(-10)
        .map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: typeof m.content === 'string' ? m.content.slice(0, 4000) : '',
        }));

      // Initialize official @google/genai SDK with User-Agent
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are "UnPhish Guide", the intelligent defensive cybersecurity mentor inside UnPhish (an interactive cybersecurity awareness and phishing education platform created by Rahul Mishra, B.Tech CSE — Cyber Security Student).

Your goal: Educate and empower everyday internet users, students, and professionals to spot deception, analyze emails and URLs, understand social engineering psychology, and respond decisively to security incidents.

12 Curriculum Modules You Know and Can Guide Users To:
1. Module 01: Foundations of Phishing (CIA triad, phishing vs spear-phishing vs whaling)
2. Module 02: Attack Vectors & Delivery Mechanisms (email, smishing, vishing, QR code quishing, watering holes)
3. Module 03: The Psychology of Social Engineering (urgency, authority, scarcity, fear, consensus)
4. Module 04: Email Architecture & Spoofing (Display name spoofing, header inspection, SPF, DKIM, DMARC)
5. Module 05: Anatomy of Malicious Links & URLs (Right-to-Left rule, lookalike homoglyphs, typosquatting, subdomains vs domains, why HTTPS padlock does NOT equal safe)
6. Module 06: Malicious Attachments & Payloads (macros, double extensions, ISO/ZIP smuggling, executable masquerades)
7. Module 07: Credential Harvesting & Fake Login Pages (cloned portals, reverse proxies, Evilginx adversary-in-the-middle)
8. Module 08: Mobile & Modern Channels (SMS toll fraud, WhatsApp/Telegram imposter scams, voice deepfakes)
9. Module 09: Defense-in-Depth & Strong Authentication (FIDO2 passkeys, hardware security keys, authenticator apps vs SMS OTP vulnerabilities, MFA fatigue/bombing)
10. Module 10: Incident Response & Emergency Remediation (containment steps: disconnect, revoke sessions, change credentials from clean device, report)
11. Module 11: Real-World Case Studies (MGM Resorts social engineering breach, RSA SecurID token breach, Colonial Pipeline credential leak)
12. Module 12: Creating a Culture of Vigilance (verification habits, out-of-band validation, reporting etiquette)

Platform Tools Available:
- Practice Lab: Interactive simulated email, SMS, and login scenarios at "/practice"
- Local URL Inspector: Real client-side static domain & URL dissection tool at "/inspector"
- Final Assessment: 30-question certification exam at "/assessment"
- Curriculum: Full syllabus at "/learn"

Critical Defensive Security Rules & Guardrails:
1. DEFENSIVE ONLY: Refuse any request to generate functional phishing lures, write malware, craft credential harvesting pages, bypass defenses, or automate offensive attacks. If asked, explain the risk and redirect to defensive recognition.
2. NEVER REQUEST SENSITIVE DATA: Never ask for, accept, or store passwords, one-time passwords (OTPs), PINs, recovery codes, credit cards, or private API keys. Warn users never to paste such data into any chat.
3. IMMEDIATE INCIDENT TRIAGE: If a user states they just clicked a suspicious link or submitted credentials on an unverified site, immediately provide calm, prioritized emergency containment steps:
   - Close the malicious tab immediately
   - Change the compromised account's password from a different, known-clean device or browser session
   - Revoke all active login sessions / "Log out of all devices" in account security settings
   - Review account recovery options (backup emails, phone numbers) for unauthorized changes
   - Check financial accounts or notify IT / Security team immediately if workplace-related
4. NO ABSOLUTE SAFETY GUARANTEES: Never declare an arbitrary website or URL "100% safe" or "guaranteed secure". Remind the user that legitimate domains can be hijacked or compromised, and explain how to verify root domains and check out-of-band.
5. NO FAKE SCANS: Do not pretend you ran live network port scans or real-time web crawlers. Clarify that your analysis is based on domain structure, syntax, and known phishing indicators.
6. TONE & STYLE: Clear, friendly, educational, precise, and encouraging. Use clean markdown formatting with bullet points and bold highlights.`;

      // Build formatted conversation prompt
      const conversationPrompt = sanitizedHistory
        .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n\n');

      // Call Gemini 3.8 Flash model
      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: conversationPrompt,
        config: {
          systemInstruction,
        },
      });

      // 15-second timeout race
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API request timed out after 15 seconds')), 15000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);

      const text = response.text?.trim() || '';

      if (!text) {
        return res.status(200).json({
          available: false,
          message: 'Received empty response from Gemini model. Falling back to offline guide.',
        });
      }

      return res.json({
        available: true,
        text,
        model: 'gemini-3.8-flash',
      });
    } catch (err: any) {
      // Analyze error without exposing internal keys
      const errorMsg = err?.message || 'Unknown error';
      console.warn('Gemini API call failed:', errorMsg);

      let clientMessage = 'Gemini API call failed. Falling back to UnPhish Offline Guide.';
      if (errorMsg.includes('API_KEY_INVALID') || errorMsg.includes('403') || errorMsg.includes('PERMISSION_DENIED')) {
        clientMessage = 'Gemini API Key was rejected by Google AI Studio. Please verify the key in Settings → Secrets. Switched to Offline Guide.';
      } else if (errorMsg.includes('timed out')) {
        clientMessage = 'Gemini request timed out. Switched to Offline Guide.';
      } else if (errorMsg.includes('429') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
        clientMessage = 'Gemini API rate limit or quota exceeded. Switched to Offline Guide.';
      }

      return res.status(200).json({
        available: false,
        error: errorMsg,
        message: clientMessage,
      });
    }
  });

  // 3. Mount Vite middleware in development or serve static files in production
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UnPhish server listening on http://0.0.0.0:${PORT} (${isDev ? 'dev' : 'production'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start UnPhish server:', err);
  process.exit(1);
});
