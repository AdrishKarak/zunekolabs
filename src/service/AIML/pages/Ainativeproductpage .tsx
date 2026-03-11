
import { motion} from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const STYLES = `
  .ainpe-card {
    transition: transform 0.28s cubic-bezier(0.16,1,0.3,1), border-color 0.28s;
    border: 1px solid rgba(255,255,255,0.05);
    position: relative; overflow: hidden;
  }
  .ainpe-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 0;
    background: linear-gradient(0deg, rgba(0,232,122,0.06), transparent);
    transition: height 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .ainpe-card:hover::before { height: 100%; }
  .ainpe-card:hover { transform: translateY(-6px); border-color: rgba(0,232,122,0.18); }

  .ainpe-row {
    transition: padding-left 0.22s, background 0.22s; border-radius: 8px; cursor: default;
  }
  .ainpe-row:hover { padding-left: 8px; background: rgba(0,232,122,0.04); }

  .ainpe-step {
    transition: transform 0.26s cubic-bezier(0.16,1,0.3,1), border-color 0.26s;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .ainpe-step:hover { transform: translateX(6px); border-color: rgba(0,232,122,0.2); }

  .ainpe-pill {
    transition: background 0.2s, color 0.2s, border-color 0.2s; cursor: default;
  }
  .ainpe-pill:hover { background: rgba(0,232,122,0.09); color: var(--accent-primary); border-color: rgba(0,232,122,0.28); }

  .ainpe-tab {
    transition: background 0.2s, color 0.2s, border-color 0.2s; cursor: pointer;
    border: 1px solid rgba(255,255,255,0.06);
  }
  .ainpe-tab.active { background: rgba(0,232,122,0.1); border-color: rgba(0,232,122,0.3); color: var(--accent-primary); }
  .ainpe-tab:not(.active):hover { border-color: rgba(255,255,255,0.12); color: var(--text-primary); }
`;

function RevealClip({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true, margin: '-48px' }} transition={{ duration: 0.78, delay, ease: EASE }} style={style}>{children}</motion.div>
  );
}
function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-48px' }} transition={{ duration: 0.62, delay, ease: EASE }} style={style}>{children}</motion.div>
  );
}
function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-48px' }} transition={{ duration: 0.55, delay, ease: EASE }} style={style}>{children}</motion.div>
  );
}
function SectionLabel({ text }: { text: string }) {
  return (
    <RevealClip delay={0}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-primary)', letterSpacing: '0.22em' }}>{text}</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(0,232,122,0.3),transparent)' }} />
      </div>
    </RevealClip>
  );
}
function Divider() {
  return <FadeIn><div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '80px 0' }} /></FadeIn>;
}

/* ═══ HERO ═══════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section style={{ padding: '100px 32px 80px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <RevealClip delay={0} style={{ marginBottom: 20 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '5px 14px', borderRadius: 100, border: '1px solid rgba(0,232,122,0.2)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.8 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent-primary)', opacity: 0.85 }}>PRODUCT ENGINEERING</span>
          </div>
        </RevealClip>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 60px', alignItems: 'center' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 6 }}>
              <RevealClip delay={0.08}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px,5vw,70px)', color: 'var(--text-primary)', lineHeight: 1.02, margin: 0 }}>AI-Native Product</h1>
              </RevealClip>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 28 }}>
              <RevealClip delay={0.16}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px,5vw,70px)', color: 'var(--accent-primary)', lineHeight: 1.02, margin: 0 }}>Engineering.</h1>
              </RevealClip>
            </div>
            <FadeUp delay={0.26}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0 0 32px' }}>
                Building software products where AI is a core capability — not a feature bolt-on. We help businesses generate new revenue streams through technology assets that get smarter over time.
              </p>
            </FadeUp>
            <FadeUp delay={0.36}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                {['AI as core functionality', 'Revenue-generating products', 'Self-improving systems', 'Shipped — not prototyped'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.55 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Hero SVG — AI product layers */}
          <FadeIn delay={0.32}>
            <svg viewBox="0 0 300 240" fill="none" style={{ width: '100%', maxWidth: 340 }}>
              {/* Product layer */}
              <rect x="40" y="12" width="220" height="40" rx="7" stroke="#00e87a" strokeWidth="1.4" opacity="0.8"/>
              <text x="150" y="35" textAnchor="middle" fill="#00e87a" fontSize="8" fontFamily="monospace" opacity="0.7">PRODUCT LAYER</text>
              <text x="150" y="47" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.4">UI · API · Business logic</text>

              <line x1="150" y1="52" x2="150" y2="66" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/>

              {/* AI core */}
              <rect x="60" y="68" width="180" height="44" rx="7" stroke="#00e87a" strokeWidth="1.5" opacity="0.9"/>
              <text x="150" y="90" textAnchor="middle" fill="#00e87a" fontSize="9" fontFamily="monospace" opacity="0.8">AI CORE</text>
              <text x="150" y="104" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.45">Models · Inference · Orchestration</text>
              <circle cx="78" cy="88" r="4" stroke="#00e87a" strokeWidth="1" opacity="0.55"/>
              <circle cx="222" cy="88" r="4" stroke="#00e87a" strokeWidth="1" opacity="0.55"/>

              <line x1="150" y1="112" x2="150" y2="126" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/>

              {/* Data layer */}
              <rect x="50" y="128" width="200" height="38" rx="7" stroke="#00e87a" strokeWidth="1.2" opacity="0.65"/>
              <text x="150" y="149" textAnchor="middle" fill="#00e87a" fontSize="7.5" fontFamily="monospace" opacity="0.6">DATA LAYER</text>
              <text x="150" y="161" textAnchor="middle" fill="#00e87a" fontSize="5.5" fontFamily="monospace" opacity="0.35">Embeddings · Vectors · Feature stores</text>

              <line x1="150" y1="166" x2="150" y2="180" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/>

              {/* Infrastructure */}
              <rect x="70" y="182" width="160" height="34" rx="7" stroke="#00e87a" strokeWidth="1.1" opacity="0.5"/>
              <text x="150" y="200" textAnchor="middle" fill="#00e87a" fontSize="7" fontFamily="monospace" opacity="0.5">INFRA & MLOPS</text>
              <text x="150" y="212" textAnchor="middle" fill="#00e87a" fontSize="5.5" fontFamily="monospace" opacity="0.3">Training · Serving · Monitoring</text>

              {/* Side labels */}
              <text x="14" y="35" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.3" textAnchor="middle">Revenue</text>
              <text x="286" y="35" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.3" textAnchor="middle">UX</text>
              <text x="16" y="92" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.3">Smart</text>
              <text x="280" y="92" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.3">Fast</text>

              {/* Feedback arrow */}
              <path d="M40 199 Q12 199 12 90 Q12 32 38 32" stroke="#00e87a" strokeWidth="0.8" opacity="0.2" fill="none" strokeDasharray="3 3"/>
              <text x="4" y="135" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.25" transform="rotate(-90,4,135)">learns</text>
            </svg>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══ AI-NATIVE VS AI-AUGMENTED ══════════════════════════════ */
const DIFF_ROWS = [
  { aspect: 'AI role', native: 'Core — the product doesn\'t function without it', augmented: 'Feature — bolted on to improve existing UX' },
  { aspect: 'Architecture', native: 'Designed around model capabilities and data flows', augmented: 'Existing architecture with AI endpoints added' },
  { aspect: 'Improvement', native: 'Gets smarter with usage through built-in feedback loops', augmented: 'Static — same performance year one and year five' },
  { aspect: 'Moat', native: 'Proprietary data + model creates durable competitive advantage', augmented: 'Competitor replicates by swapping in same API' },
  { aspect: 'Revenue', native: 'New revenue stream — the AI capability is the product', augmented: 'Defends existing revenue by improving product slightly' },
];

function DifferenceSection() {
  return (
    <section style={{ padding: '100px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="AI-NATIVE VS AI-AUGMENTED" />
        <div style={{ overflow: 'hidden', marginBottom: 16 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3.2vw,44px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              "AI-powered" is not the same as AI-native.
            </h2>
          </RevealClip>
        </div>
        <FadeUp delay={0.16} style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '14px 0 0', maxWidth: 560 }}>
            Most software with "AI" in the marketing is AI-augmented — the underlying product was designed without AI, then API calls were added. AI-native is a fundamentally different architecture.
          </p>
        </FadeUp>

        {/* Table header */}
        <FadeIn delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: '0 24px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 4 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', opacity: 0.5, letterSpacing: '0.12em' }}>ASPECT</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-primary)', opacity: 0.7, letterSpacing: '0.12em' }}>AI-NATIVE</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', opacity: 0.5, letterSpacing: '0.12em' }}>AI-AUGMENTED</span>
          </div>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {DIFF_ROWS.map((r, i) => (
            <FadeUp key={i} delay={0.06 + i * 0.08}>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: '0 24px', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', opacity: 0.55, letterSpacing: '0.08em', paddingTop: 2 }}>{r.aspect}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>{r.native}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.6, opacity: 0.6 }}>{r.augmented}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ WHAT WE BUILD ══════════════════════════════════════════ */
const BUILDS = [
  {
    num: '01', title: 'Intelligent Workflow Engines',
    body: 'Replacing rule-based process automation with AI that understands intent, handles exceptions, and routes work based on context — not rigid decision trees.',
    pills: ['LLM orchestration', 'Multi-step reasoning', 'Conditional routing', 'Exception handling'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <rect x="4" y="20" width="14" height="12" rx="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.6"/>
        <rect x="22" y="8" width="14" height="12" rx="3" stroke="#00e87a" strokeWidth="1.2" opacity="0.75"/>
        <rect x="22" y="32" width="14" height="12" rx="3" stroke="#00e87a" strokeWidth="1.2" opacity="0.65"/>
        <rect x="38" y="20" width="10" height="12" rx="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.55"/>
        <line x1="18" y1="26" x2="22" y2="18" stroke="#00e87a" strokeWidth="1" opacity="0.4"/>
        <line x1="18" y1="26" x2="22" y2="38" stroke="#00e87a" strokeWidth="1" opacity="0.35"/>
        <line x1="36" y1="14" x2="38" y2="24" stroke="#00e87a" strokeWidth="1" opacity="0.3"/>
        <line x1="36" y1="38" x2="38" y2="28" stroke="#00e87a" strokeWidth="1" opacity="0.3"/>
        <circle cx="26" cy="26" r="3" fill="#00e87a" opacity="0.5"/>
      </svg>
    ),
  },
  {
    num: '02', title: 'Vertical AI Applications',
    body: 'Purpose-built AI applications for specific industry problems — underwriting, diagnostics support, due diligence, inventory intelligence — where generic tools can\'t be fine-tuned to the domain.',
    pills: ['Domain fine-tuning', 'RAG on proprietary data', 'Structured output extraction', 'Confidence scoring'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <path d="M26 6 L48 18 L48 34 L26 46 L4 34 L4 18 Z" stroke="#00e87a" strokeWidth="1.3" fill="none" opacity="0.55"/>
        <circle cx="26" cy="26" r="10" stroke="#00e87a" strokeWidth="1.2" opacity="0.7"/>
        <circle cx="26" cy="26" r="4" stroke="#00e87a" strokeWidth="1" opacity="0.8"/>
        <circle cx="26" cy="26" r="1.5" fill="#00e87a" opacity="0.9"/>
        <line x1="26" y1="16" x2="26" y2="18" stroke="#00e87a" strokeWidth="1.2" opacity="0.4"/>
        <line x1="26" y1="34" x2="26" y2="36" stroke="#00e87a" strokeWidth="1.2" opacity="0.4"/>
        <line x1="16" y1="26" x2="18" y2="26" stroke="#00e87a" strokeWidth="1.2" opacity="0.4"/>
        <line x1="34" y1="26" x2="36" y2="26" stroke="#00e87a" strokeWidth="1.2" opacity="0.4"/>
      </svg>
    ),
  },
  {
    num: '03', title: 'AI-Enhanced Data Products',
    body: 'Products that turn raw data — documents, emails, transactions, sensor readings — into structured intelligence: summaries, classifications, anomalies, forecasts.',
    pills: ['Document intelligence', 'Anomaly detection', 'Forecasting models', 'Classification pipelines'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <rect x="4" y="8" width="14" height="36" rx="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.4" strokeDasharray="2 2"/>
        <path d="M22 8 L22 44" stroke="#00e87a" strokeWidth="0.7" opacity="0.15"/>
        <rect x="22" y="14" width="26" height="24" rx="3" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/>
        <path d="M28 32 L32 24 L36 28 L40 20 L44 26" stroke="#00e87a" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.65"/>
        <circle cx="28" cy="32" r="1.5" fill="#00e87a" opacity="0.5"/>
        <circle cx="44" cy="26" r="1.5" fill="#00e87a" opacity="0.6"/>
        <path d="M18 20 L22 26" stroke="#00e87a" strokeWidth="1.1" opacity="0.5"/>
        <text x="11" y="28" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.45">raw</text>
      </svg>
    ),
  },
  {
    num: '04', title: 'Agentic Systems & Copilots',
    body: 'Systems that don\'t just answer questions — they take actions. Multi-step AI agents that research, decide, act and report back. Copilots that live inside your existing tools.',
    pills: ['Multi-agent orchestration', 'Tool calling & APIs', 'Long-horizon planning', 'Copilot integrations'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <circle cx="26" cy="16" r="8" stroke="#00e87a" strokeWidth="1.3" opacity="0.8"/>
        <text x="26" y="19" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.75">AI</text>
        <rect x="6" y="34" width="12" height="10" rx="2" stroke="#00e87a" strokeWidth="1" opacity="0.5"/>
        <rect x="20" y="38" width="12" height="10" rx="2" stroke="#00e87a" strokeWidth="1" opacity="0.5"/>
        <rect x="34" y="34" width="12" height="10" rx="2" stroke="#00e87a" strokeWidth="1" opacity="0.5"/>
        <line x1="22" y1="24" x2="12" y2="34" stroke="#00e87a" strokeWidth="0.9" opacity="0.35"/>
        <line x1="26" y1="24" x2="26" y2="38" stroke="#00e87a" strokeWidth="0.9" opacity="0.35"/>
        <line x1="30" y1="24" x2="40" y2="34" stroke="#00e87a" strokeWidth="0.9" opacity="0.35"/>
        <text x="12" y="41" textAnchor="middle" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.4">CRM</text>
        <text x="26" y="45" textAnchor="middle" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.4">Email</text>
        <text x="40" y="41" textAnchor="middle" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.4">ERP</text>
      </svg>
    ),
  },
];

function WhatWeBuildSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="WHAT WE BUILD" />
        <div style={{ overflow: 'hidden', marginBottom: 10 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Four types of AI-native products.
            </h2>
          </RevealClip>
        </div>
        <FadeUp delay={0.16} style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, maxWidth: 560, margin: '12px 0 0' }}>
            Each one creates a compounding asset — the longer it runs, the more data it collects, and the better it gets.
          </p>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {BUILDS.map((b, i) => (
            <FadeUp key={i} delay={0.08 + i * 0.09}>
              <div className="ainpe-card" style={{ padding: '28px', borderRadius: 16, background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-primary)', opacity: 0.6, letterSpacing: '0.12em', display: 'block', marginBottom: 10 }}>{b.num}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', margin: 0, lineHeight: 1.25, maxWidth: 200 }}>{b.title}</h3>
                  </div>
                  <div style={{ opacity: 0.6, flexShrink: 0 }}>{b.svg}</div>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.75, margin: '0 0 20px' }}>{b.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {b.pills.map((p, pi) => (
                    <span key={pi} className="ainpe-pill" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 10px', borderRadius: 100, border: '1px solid rgba(0,232,122,0.15)', color: 'var(--text-tertiary)' }}>{p}</span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ HOW WE WORK ════════════════════════════════════════════ */
const STEPS = [
  { num: '01', phase: 'Opportunity scoping', dur: '1 wk', desc: 'We identify the highest-leverage AI opportunity in your business — not the most technically exciting one.' },
  { num: '02', phase: 'Data & feasibility audit', dur: '1–2 wks', desc: 'AI without data is a prototype. We assess what data you have, what quality it\'s at, and what\'s achievable with it today.' },
  { num: '03', phase: 'MVP architecture', dur: '1–2 wks', desc: 'Model selection, infra design, data pipeline spec, product UX. All decided before the first model is called in production.' },
  { num: '04', phase: 'Build & iterate', dur: 'Sprint cycles', desc: 'Working product every sprint. We ship fast, measure outcomes, and tune — models and product decisions together.' },
  { num: '05', phase: 'MLOps & productionisation', dur: 'Ongoing', desc: 'Monitoring, drift detection, retraining pipelines, A/B testing. The product is not launched — it\'s operated.' },
];

function HowWeSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="HOW WE WORK" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 80px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
                  Data first. Ship second. Operate always.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.18}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '16px 0 0', maxWidth: 400 }}>
                Most AI projects fail between proof-of-concept and production. We design for production from the first conversation.
              </p>
            </FadeUp>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {STEPS.map((s, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.09}>
                <div className="ainpe-step" style={{ padding: '18px 20px', borderRadius: 12, background: 'var(--bg-surface)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(0,232,122,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--accent-primary)', opacity: 0.8 }}>{s.num}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{s.phase}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', opacity: 0.55 }}>{s.dur}</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65, opacity: 0.85 }}>{s.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ TECH ═══════════════════════════════════════════════════ */
const STACK = [
  { label: 'Foundation Models', items: ['GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'Llama 3', 'Mistral', 'Cohere'] },
  { label: 'Orchestration', items: ['LangChain', 'LlamaIndex', 'DSPy', 'CrewAI', 'custom pipelines'] },
  { label: 'Vector & Search', items: ['Pinecone', 'Weaviate', 'pgvector', 'Elasticsearch', 'Qdrant'] },
  { label: 'MLOps', items: ['MLflow', 'Weights & Biases', 'Arize', 'BentoML', 'Seldon'] },
  { label: 'Data', items: ['dbt', 'Airflow', 'Spark', 'Kafka', 'Snowflake', 'ClickHouse'] },
  { label: 'Infra', items: ['AWS SageMaker', 'GCP Vertex', 'Azure AI', 'Modal', 'Replicate'] },
];

function TechSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="AI STACK" />
        <div style={{ overflow: 'hidden', marginBottom: 52 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Model-agnostic. Best-tool-for-the-outcome.
            </h2>
          </RevealClip>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {STACK.map((row, ri) => (
            <FadeUp key={ri} delay={0.06 + ri * 0.07}>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '0 32px', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', opacity: 0.55, letterSpacing: '0.12em' }}>{row.label.toUpperCase()}</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {row.items.map((item, ii) => (
                    <span key={ii} style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-secondary)', padding: '3px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>{item}</span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ OUTCOMES ═══════════════════════════════════════════════ */
const OUTCOMES = [
  { val: 'New', label: 'Revenue streams', sub: 'Products that generate income independently of headcount' },
  { val: 'Durable', label: 'Competitive moat', sub: 'Proprietary data + fine-tuned models competitors can\'t replicate' },
  { val: '10×', label: 'Throughput per person', sub: 'AI handles volume; humans handle judgement' },
  { val: 'Always', label: 'Getting smarter', sub: 'Usage data improves models continuously' },
];

function OutcomesSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="OUTCOMES" />
        <div style={{ overflow: 'hidden', marginBottom: 52 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              AI as a business asset, not a cost centre.
            </h2>
          </RevealClip>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {OUTCOMES.map((o, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }} style={{ padding: '28px 22px', borderRadius: 16, background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 34, color: 'var(--accent-primary)', margin: '0 0 6px', lineHeight: 1 }}>{o.val}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', margin: '0 0 8px' }}>{o.label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-tertiary)', margin: 0, lineHeight: 1.6, opacity: 0.75 }}>{o.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA ════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section style={{ padding: '0 32px 120px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeUp>
          <div style={{ padding: '52px 56px', borderRadius: 20, background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <div style={{ overflow: 'hidden', marginBottom: 10 }}>
                <RevealClip delay={0.06}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px,2.5vw,32px)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
                    Ready to build a product that gets smarter?
                  </h2>
                </RevealClip>
              </div>
              <FadeUp delay={0.16}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7, maxWidth: 440 }}>
                  Tell us your domain, your data, and the outcome you're trying to create. We'll come back with an honest assessment of what's achievable and a product direction that generates ROI.
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.22}>
              <a href="#contact" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#000', background: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '13px 32px', borderRadius: 8, textDecoration: 'none', display: 'inline-block', flexShrink: 0, transition: 'background 0.22s,color 0.22s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#000'; }}
              >Scope your AI product →</a>
            </FadeUp>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export function AINativeProductPage() {
  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <style>{STYLES}</style>
      <HeroSection />
      <DifferenceSection />
      <Divider />
      <WhatWeBuildSection />
      <Divider />
      <HowWeSection />
      <Divider />
      <TechSection />
      <Divider />
      <OutcomesSection />
      <CTASection />
    </div>
  );
}