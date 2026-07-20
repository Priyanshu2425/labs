'use client';

import { useEffect, useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Clock,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import styles from './Offer.module.scss';
import BuildLoader from './BuildLoader';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PERSONA_OPTIONS,
  BUDGET_OPTIONS,
  COMPARISON_ROWS,
  PROMPT_1,
  type PersonaKey,
  type BudgetKey,
  type Tier,
} from '../../data/offer';

type Step = 'persona' | 'budget' | 'email' | 'otp' | 'prompt' | 'result';

interface AnalyzeResult {
  tier: 'validation' | 'custom';
  verdict: string;
  bracketJustification: string;
  freelanceTrap: string;
  blueprint: string;
  headline: string;
}

interface PersistState {
  step: Step;
  persona: PersonaKey | '';
  budget: BudgetKey | '';
  email: string;
  name: string;
  phone: string;
  result: AnalyzeResult | null;
  tier: Tier | null;
  sessionId: string;
  verified: boolean;
}

const STORAGE_KEY = 'bsl-offer-v1';

// A unique id minted the moment a visitor lands and reused across every step,
// so pre-email answers can be joined to the contact HubSpot creates later.
const mintSessionId = (): string => {
  try {
    return crypto.randomUUID();
  } catch {
    return `sid-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
};

// HubSpot's anonymous visitor token, set on landing by its tracking script.
const readHubspotUtk = (): string =>
  document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1] ?? '';

// Booking hand-off target (Priyanshu's WhatsApp, digits only for wa.me).
const WHATSAPP_NUMBER = '919315776817';

// Cloudflare Turnstile site key (public). When unset, the widget + server
// verification are both skipped so local dev works without keys.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Minimal window.turnstile surface we use.
interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
}
const getTurnstile = (): TurnstileApi | undefined =>
  (window as unknown as { turnstile?: TurnstileApi }).turnstile;

const VERDICT_COLORS: Record<string, string> = {
  'Green Light': '#22c55e',
  'Yellow Light': '#eab308',
  'Red Light': '#ef4444',
};

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function Offer() {
  const [step, setStep] = useState<Step>('persona');
  const [persona, setPersona] = useState<PersonaKey | ''>('');
  const [budget, setBudget] = useState<BudgetKey | ''>('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [audit, setAudit] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);

  const [sessionId, setSessionId] = useState('');

  const hydrated = useRef(false);
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Restore progress so a user returning from ChatGPT lands where they left off.
  useEffect(() => {
    try {
      const rawSaved = localStorage.getItem(STORAGE_KEY);
      if (rawSaved) {
        const s = JSON.parse(rawSaved) as Partial<PersistState>;
        if (s.persona) setPersona(s.persona);
        if (s.budget) setBudget(s.budget);
        if (s.email) setEmail(s.email);
        if (s.name) setName(s.name);
        if (s.phone) setPhone(s.phone);
        if (s.result) setResult(s.result);
        if (s.tier) setTier(s.tier);
        if (s.verified) setVerified(true);
        if (s.sessionId) setSessionId(s.sessionId);
        if (s.step) {
          // The prompt/result steps sit behind the email-verification gate. A
          // restored session that never verified is bounced back to re-verify
          // (or to the email step if we don't even have an address yet).
          const gated = s.step === 'prompt' || s.step === 'result';
          if (gated && !s.verified) setStep(s.email ? 'otp' : 'email');
          else setStep(s.step);
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    // Ensure a stable landing id exists whether or not one was restored.
    setSessionId((prev) => prev || mintSessionId());
    hydrated.current = true;
  }, []);

  // Persist after every meaningful change (only once hydrated, to avoid clobber).
  useEffect(() => {
    if (!hydrated.current) return;
    const payload: PersistState = { step, persona, budget, email, name, phone, result, tier, sessionId, verified };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* storage full / disabled — non-fatal */
    }
  }, [step, persona, budget, email, name, phone, result, tier, sessionId, verified]);

  // Tick the resend cooldown down to zero, one second at a time.
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  // Render the Turnstile widget while the paste step is visible; tear it down
  // when we leave so returning to the step re-renders a fresh challenge.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || step !== 'prompt') return;
    let cancelled = false;

    const render = () => {
      const ts = getTurnstile();
      if (!ts || !turnstileRef.current || widgetIdRef.current) return;
      widgetIdRef.current = ts.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        callback: (token: string) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
    };

    if (getTurnstile()) {
      render();
    } else {
      const existing = document.getElementById('cf-turnstile-script') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => !cancelled && render(), { once: true });
      } else {
        const s = document.createElement('script');
        s.id = 'cf-turnstile-script';
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        s.async = true;
        s.defer = true;
        s.onload = () => !cancelled && render();
        document.head.appendChild(s);
      }
    }

    return () => {
      cancelled = true;
      const ts = getTurnstile();
      if (ts && widgetIdRef.current) {
        try {
          ts.remove(widgetIdRef.current);
        } catch {
          /* widget already gone */
        }
      }
      widgetIdRef.current = null;
      setTurnstileToken('');
    };
  }, [step]);

  const resetTurnstile = () => {
    const ts = getTurnstile();
    if (ts && widgetIdRef.current) ts.reset(widgetIdRef.current);
    setTurnstileToken('');
  };

  const personaLabel = PERSONA_OPTIONS.find((p) => p.key === persona)?.label ?? '';
  const budgetLabel = BUDGET_OPTIONS.find((b) => b.key === budget)?.label ?? '';

  // Attribution context sent with every /api/offer call: HubSpot stitches the
  // hutk to the contact; sessionId joins pre-email steps to that same lead.
  const attribution = () => ({
    sessionId,
    hutk: readHubspotUtk(),
    pageUri: window.location.href,
    pageName: document.title,
  });

  // Fire a Meta Pixel standard event if the pixel has loaded (no-op otherwise).
  const trackPixel = (event: string, params?: Record<string, unknown>) => {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') fbq('track', event, params);
  };

  const restart = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    setStep('persona');
    setPersona('');
    setBudget('');
    setEmail('');
    setName('');
    setOtp('');
    setVerified(false);
    setResendIn(0);
    setAudit('');
    setResult(null);
    setTier(null);
    setError(null);
    setPhone('');
    setBooked(false);
    setBookError(null);
  };

  // ---- Step actions -------------------------------------------------------

  const pickPersona = (key: PersonaKey) => {
    setPersona(key);
    setStep('budget');
  };

  const pickBudget = (key: BudgetKey) => {
    setBudget(key);
    setStep('email');
  };

  const submitEmail = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email so we can send your verification code.');
      return;
    }
    setBusy(true);
    // Meta Pixel: email captured — a qualified lead.
    trackPixel('Lead', { content_name: 'offer_email_gate', content_category: 'offer_funnel' });
    // Mint + email a verification code, then gate the prompt behind it. Also runs
    // the mailing-list/CRM side-effects server-side (best-effort within send-otp).
    try {
      const res = await fetch('/api/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send-otp',
          email,
          name,
          phone,
          persona: personaLabel,
          budget: budgetLabel,
          website: honeypot, // honeypot — real users leave this empty
          ...attribution(),
        }),
      });
      const data: { ok: boolean; error?: string } = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        setError(data.error ?? "We couldn't send your code. Please try again.");
        return;
      }
      setOtp('');
      setStep('otp');
      setResendIn(30);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const submitOtp = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    const code = otp.replace(/\D/g, '');
    if (code.length !== 6) {
      setError('Enter the 6-digit code we emailed you.');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify-otp',
          email,
          code,
          name,
          phone,
          persona: personaLabel,
          budget: budgetLabel,
          ...attribution(),
        }),
      });
      const data: { ok: boolean; error?: string } = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        setError(data.error ?? 'Verification failed. Please try again.');
        return;
      }
      // Email confirmed — unlock the prompt.
      setVerified(true);
      trackPixel('Lead', { content_name: 'offer_email_verified', content_category: 'offer_funnel' });
      setStep('prompt');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const resendOtp = async () => {
    if (resendIn > 0 || busy) return;
    setError(null);
    setOtp('');
    setResendIn(30); // start the cooldown immediately (server enforces it too)
    try {
      await fetch('/api/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send-otp',
          email,
          name,
          phone,
          persona: personaLabel,
          budget: budgetLabel,
          website: honeypot,
          ...attribution(),
        }),
      });
    } catch {
      /* best-effort — the user can retry after the cooldown */
    }
  };

  const copyPrompt = async () => {
    const flash = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    };
    // Preferred: async Clipboard API (needs a secure context — https or localhost).
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(PROMPT_1);
        flash();
        return;
      }
    } catch {
      /* fall through to legacy path */
    }
    // Fallback for insecure contexts (e.g. opening via a LAN IP): hidden textarea + execCommand.
    try {
      const ta = document.createElement('textarea');
      ta.value = PROMPT_1;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if (ok) flash();
      else setError('Copy failed — select the text manually.');
    } catch {
      setError('Copy failed — select the text manually.');
    }
  };

  const submitAudit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    if (audit.trim().length < 40) {
      setError('Paste the full audit your AI generated — this looks too short.');
      return;
    }
    // Soft gate: submit whether or not a token exists. If the widget rendered,
    // turnstileToken is sent and verified server-side; if a blocker ate the
    // widget, we still proceed (rate limit + honeypot + cache cover the endpoint).
    setBusy(true);
    try {
      const res = await fetch('/api/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze',
          email,
          persona: personaLabel,
          budget: budgetLabel,
          audit,
          turnstileToken,
          website: honeypot, // honeypot — real users leave this empty
          ...attribution(),
        }),
      });
      const data: { ok: boolean; error?: string; result?: AnalyzeResult; tier?: Tier } = await res
        .json()
        .catch(() => ({ ok: false }));
      if (!res.ok || !data.ok || !data.result || !data.tier) {
        setError(data.error ?? "We couldn't generate your offer. Please try again.");
        resetTurnstile(); // token is single-use — get a fresh one for retry
        return;
      }
      setResult(data.result);
      setTier(data.tier);
      setStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  // WhatsApp is the primary booking path — clicking Confirm opens the lead's
  // WhatsApp addressed to us with a pre-filled, context-rich message.
  const buildWaLink = () => {
    const msg =
      `Hi Priyanshu, I'd like to confirm my 48-hour build slot.\n\n` +
      `Offer: ${tier?.name ?? ''}${tier ? ` (${tier.priceBracket})` : ''}\n` +
      `Verdict: ${result?.verdict ?? ''}\n` +
      `Budget: ${budgetLabel || '—'}\n` +
      `My number: ${phone}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const submitBooking = (e: SyntheticEvent) => {
    e.preventDefault();
    setBookError(null);
    if (phone.replace(/\D/g, '').length < 7) {
      setBookError('Enter a phone number we can reach you on.');
      return;
    }
    // Open WhatsApp synchronously (same user-gesture tick) so it isn't popup-blocked.
    window.open(buildWaLink(), '_blank', 'noopener,noreferrer');
    setBooked(true);
    // Meta Pixel: call-slot requested.
    trackPixel('Schedule', { content_name: 'offer_book_call', content_category: 'offer_funnel' });
    // Best-effort server log / Slack-Discord-email ping — never blocks or errors the UI.
    fetch('/api/offer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'book',
        phone,
        email,
        name,
        persona: personaLabel,
        budget: budgetLabel,
        tier: tier?.name,
        verdict: result?.verdict,
        audit,
        ...attribution(),
      }),
    }).catch(() => {
      /* logging is best-effort; the WhatsApp hand-off already happened */
    });
  };

  // ---- Progress indicator -------------------------------------------------
  // The four rendered dots. The OTP step is a sub-step of the email gate, so it
  // shares the email dot rather than adding a fifth.
  const progressSteps: Step[] = ['persona', 'budget', 'email', 'prompt'];
  const progressIndex = step === 'otp' ? progressSteps.indexOf('email') : progressSteps.indexOf(step);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.glowBackground} aria-hidden="true" />

      <main className={styles.mainContent}>
        <section className={`container ${styles.offerSection}`}>
          {/* Intro / value framing */}
          <motion.div
            className={styles.intro}
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span variants={fadeIn} className={styles.eyebrow}>
              {'// get your offer'}
            </motion.span>
            <motion.h1 variants={fadeIn} className={styles.pageTitle}>
              Investor-ready software,<br />
              <span className={styles.gradientText}>shipped in 48 hours.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className={styles.pageSubtitle}>
              Traditional agencies bill human hours for 3–6 months. Our AI-native engine runs
              24×7 under elite human governance — so your core MVP ships on a fixed price, in a
              48-hour horizon. Answer two questions and get a personalized build offer.
            </motion.p>
            <motion.div variants={fadeIn} className={styles.trustRow}>
              <span className={styles.trustPill}>
                <Clock size={14} /> 48-hour core delivery
              </span>
              <span className={styles.trustPill}>
                <ShieldCheck size={14} /> Fixed price, locked upfront
              </span>
              <span className={styles.trustPill}>
                <Sparkles size={14} /> AI speed · human blueprint
              </span>
            </motion.div>
          </motion.div>

          {/* Progress bar (hidden on the final result view) */}
          {step !== 'result' && (
            <div className={styles.progress} aria-hidden="true">
              {progressSteps.map((s, i) => (
                <span
                  key={s}
                  className={`${styles.progressDot} ${i <= progressIndex ? styles.progressDotActive : ''}`}
                />
              ))}
            </div>
          )}

          <div className={styles.stage}>
            <AnimatePresence mode="wait">
              {/* STEP 1 — PERSONA */}
              {step === 'persona' && (
                <motion.div
                  key="persona"
                  className={styles.card}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className={styles.stepKicker}>Step 1 of 3</span>
                  <h2 className={styles.stepTitle}>Which of these sounds most like you right now?</h2>
                  <div className={styles.optionGrid}>
                    {PERSONA_OPTIONS.map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        className={styles.optionCard}
                        onClick={() => pickPersona(opt.key)}
                      >
                        <span>{opt.label}</span>
                        <ArrowRight size={18} className={styles.optionArrow} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — BUDGET */}
              {step === 'budget' && (
                <motion.div
                  key="budget"
                  className={styles.card}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button type="button" className={styles.backLink} onClick={() => setStep('persona')}>
                    <ArrowLeft size={15} /> Back
                  </button>
                  <span className={styles.stepKicker}>Step 2 of 3</span>
                  <h2 className={styles.stepTitle}>What is your budget to bring this to life?</h2>
                  <div className={styles.optionGrid}>
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        className={styles.optionCard}
                        onClick={() => pickBudget(opt.key)}
                      >
                        <span className={styles.optionLabel}>{opt.label}</span>
                        <span className={styles.optionSub}>{opt.sub}</span>
                        <ArrowRight size={18} className={styles.optionArrow} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — EMAIL GATE */}
              {step === 'email' && (
                <motion.div
                  key="email"
                  className={styles.card}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button type="button" className={styles.backLink} onClick={() => setStep('budget')}>
                    <ArrowLeft size={15} /> Back
                  </button>
                  <span className={styles.stepKicker}>Step 3 of 3</span>
                  <h2 className={styles.stepTitle}>Where should we send your AI market-audit prompt?</h2>
                  <p className={styles.stepSub}>
                    Drop your email and we&apos;ll reveal the exact prompt our architects use to stress-test
                    an idea — free. You&apos;ll also join the builder list (unsubscribe anytime).
                  </p>
                  <form onSubmit={submitEmail} className={styles.form}>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                    <input
                      type="tel"
                      className={styles.input}
                      placeholder="Phone (optional) — e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                    />
                    {/* Honeypot — hidden from users, catches bots */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      className={styles.honeypot}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      aria-hidden="true"
                    />
                    {error && <span className={styles.error}>{error}</span>}
                    <button type="submit" className={styles.primaryBtn} disabled={busy}>
                      {busy ? 'Revealing…' : 'Reveal my prompt'} <ArrowRight size={18} />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 3.5 — EMAIL OTP VERIFICATION GATE */}
              {step === 'otp' && (
                <motion.div
                  key="otp"
                  className={styles.card}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button type="button" className={styles.backLink} onClick={() => setStep('email')}>
                    <ArrowLeft size={15} /> Back
                  </button>
                  <span className={styles.stepKicker}>
                    <ShieldCheck size={13} /> Verify your email
                  </span>
                  <h2 className={styles.stepTitle}>Enter the 6-digit code we just emailed you.</h2>
                  <p className={styles.stepSub}>
                    We sent a code to <strong>{email}</strong>. Check your inbox (and spam) and drop it
                    below to unlock your market-audit prompt. It expires in 10 minutes.
                  </p>
                  <form onSubmit={submitOtp} className={styles.form}>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      className={styles.otpInput}
                      placeholder="••••••"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      autoFocus
                    />
                    {error && <span className={styles.error}>{error}</span>}
                    <button type="submit" className={styles.primaryBtn} disabled={busy}>
                      {busy ? 'Verifying…' : 'Verify & reveal prompt'} <ArrowRight size={18} />
                    </button>
                  </form>
                  <button
                    type="button"
                    className={styles.restartLink}
                    onClick={resendOtp}
                    disabled={resendIn > 0 || busy}
                  >
                    {resendIn > 0 ? `Resend code in ${resendIn}s` : 'Resend code'}
                  </button>
                </motion.div>
              )}

              {/* STEP 4 — PROMPT REVEAL + PASTE BOX */}
              {step === 'prompt' && (
                <motion.div
                  key="prompt"
                  className={styles.card}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {busy ? (
                    <BuildLoader />
                  ) : (
                  <>
                  <span className={styles.stepKicker}>Your market-audit prompt is ready</span>
                  <h2 className={styles.stepTitle}>Run this in ChatGPT or Gemini, then paste the result back.</h2>
                  <p className={styles.stepSub}>
                    Copy the prompt, paste your idea where marked, and run it in your own AI. It rates your
                    idea against 10 first-principles tests. Bring that report back here and we&apos;ll map it to
                    a fixed build offer.
                  </p>

                  <div className={styles.promptBox}>
                    <div className={styles.promptToolbar}>
                      <span className={styles.promptTag}>PROMPT · copy me</span>
                      <div className={styles.promptActions}>
                        <button type="button" className={styles.ghostBtn} onClick={copyPrompt}>
                          {copied ? <Check size={15} /> : <Copy size={15} />}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                        <a
                          className={styles.ghostBtn}
                          href="https://chat.openai.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={15} /> ChatGPT
                        </a>
                        <a
                          className={styles.ghostBtn}
                          href="https://gemini.google.com/app"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={15} /> Gemini
                        </a>
                      </div>
                    </div>
                    <pre className={styles.promptText}>{PROMPT_1}</pre>
                  </div>

                  <form onSubmit={submitAudit} className={styles.form}>
                    <label className={styles.pasteLabel}>Paste the full report your AI gave you:</label>
                    <textarea
                      className={styles.textarea}
                      placeholder="Paste the entire audit here…"
                      value={audit}
                      onChange={(e) => setAudit(e.target.value.slice(0, 8000))}
                      rows={8}
                    />
                    {/* Honeypot — hidden from users, catches bots */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      className={styles.honeypot}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      aria-hidden="true"
                    />
                    <div className={styles.charCount}>{audit.length} / 8000</div>
                    {TURNSTILE_SITE_KEY && <div ref={turnstileRef} className={styles.turnstile} />}
                    {error && <span className={styles.error}>{error}</span>}
                    <button type="submit" className={styles.primaryBtn} disabled={busy}>
                      Generate my build offer <ArrowRight size={18} />
                    </button>
                  </form>
                  </>
                  )}
                </motion.div>
              )}

              {/* STEP 5 — RESULT */}
              {step === 'result' && result && tier && (
                <motion.div
                  key="result"
                  className={styles.resultWrap}
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={fadeIn} className={styles.verdictBar}>
                    <span
                      className={styles.verdictDot}
                      style={{ background: VERDICT_COLORS[result.verdict] ?? '#3b82f6' }}
                    />
                    <span className={styles.verdictText}>{result.verdict}</span>
                    <span className={styles.verdictHeadline}>{result.headline}</span>
                  </motion.div>

                  {/* Matched tier */}
                  <motion.div variants={fadeIn} className={styles.tierCard}>
                    <span className={styles.tierKicker}>Your matched stack</span>
                    <h2 className={styles.tierName}>{tier.name}</h2>
                    <div className={styles.tierPrice}>{tier.priceBracket}</div>
                    <p className={styles.tierPersona}>For: {tier.persona}</p>
                    <p className={styles.tierJustify}>{result.bracketJustification}</p>
                    <ul className={styles.tierParams}>
                      {tier.parameters.map((p) => (
                        <li key={p}>
                          <Check size={15} /> {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Comparison table */}
                  <motion.div variants={fadeIn} className={styles.compareCard}>
                    <h3 className={styles.compareTitle}>Traditional freelance vs. our AI-native stack</h3>
                    <div className={styles.tableScroll}>
                      <table className={styles.compareTable}>
                        <thead>
                          <tr>
                            <th></th>
                            <th className={styles.colFreelance}>Traditional / freelance</th>
                            <th className={styles.colAi}>Buildspace AI-native</th>
                          </tr>
                        </thead>
                        <tbody>
                          {COMPARISON_ROWS.map((row) => (
                            <tr key={row.dimension}>
                              <td className={styles.dimCell}>{row.dimension}</td>
                              <td className={styles.freelanceCell}>{row.freelance}</td>
                              <td className={styles.aiCell}>{row.aiNative}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>

                  {/* Narrative sections */}
                  <motion.div variants={fadeIn} className={styles.narrativeGrid}>
                    <div className={styles.narrativeCard}>
                      <h4>The freelance trap — eliminated</h4>
                      <p>{result.freelanceTrap}</p>
                    </div>
                    <div className={styles.narrativeCard}>
                      <h4>Your 48-hour blueprint</h4>
                      <p>{result.blueprint}</p>
                    </div>
                  </motion.div>

                  {/* Final conversion gate */}
                  <motion.div variants={fadeIn} className={styles.ctaCard} id="book">
                    {booked ? (
                      <div className={styles.bookedState}>
                        <Check size={22} />
                        <h3>WhatsApp is opening…</h3>
                        <p>
                          Hit <strong>send</strong> on the pre-filled message and Priyanshu will lock your
                          48-hour build window. Didn&apos;t open?{' '}
                          <a href={buildWaLink()} target="_blank" rel="noopener noreferrer">
                            Tap here to message us.
                          </a>
                        </p>
                      </div>
                    ) : (
                      <>
                        <h3 className={styles.ctaTitle}>Confirm your dev calendar slot</h3>
                        <p className={styles.ctaSub}>
                          Lock a call with Priyanshu (Technical Director). We&apos;ll walk your offer,
                          confirm the fixed price, and reserve your 48-hour build window.
                        </p>
                        <form onSubmit={submitBooking} className={styles.ctaForm}>
                          <div className={styles.phoneRow}>
                            <Phone size={18} className={styles.phoneIcon} />
                            <input
                              type="tel"
                              className={styles.input}
                              placeholder="+91 98765 43210"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              autoComplete="tel"
                            />
                          </div>
                          {bookError && <span className={styles.error}>{bookError}</span>}
                          <button type="submit" className={styles.primaryBtn}>
                            Confirm & message us on WhatsApp <ArrowRight size={18} />
                          </button>
                        </form>
                      </>
                    )}
                  </motion.div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Persistent escape hatch — restart the funnel from any step. */}
          {step !== 'persona' && (
            <div className={styles.globalRestart}>
              <button type="button" className={styles.restartLink} onClick={restart} disabled={busy}>
                {step === 'result' ? 'Start over with a different idea' : 'Start over'}
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
