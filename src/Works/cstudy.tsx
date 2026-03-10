import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const GLOBAL_STYLES = `
  .cs-card { transition: box-shadow 0.35s, border-color 0.35s; }
  .cs-tag { transition: background 0.2s, color 0.2s, border-color 0.2s; cursor: pointer; }
  .cs-tag:hover { background: rgba(0,232,122,0.1); color: var(--accent-primary); border-color: rgba(0,232,122,0.35); }
  .cs-expand-btn { transition: background 0.22s, box-shadow 0.22s; outline: none; }
  .cs-expand-btn:hover { background: var(--accent-primary) !important; box-shadow: 0 0 22px rgba(0,232,122,0.4); }
  .cs-expand-btn:hover .cs-plus { color: #000 !important; }
  @keyframes cs-bar-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .cs-bar-active {
    background: linear-gradient(90deg, transparent, rgba(0,232,122,0.6), var(--accent-primary), rgba(0,232,122,0.6), transparent);
    background-size: 300% 100%;
    animation: cs-bar-shimmer 2.4s linear infinite;
  }
`;

/* ─── Reveal helpers ─────────────────────────────────────────── */
function RevealClip({
  children, delay = 0, style = {},
}: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function FadeUp({
  children, delay = 0, style = {},
}: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */
const CASES = [
  {
    id: 'bhandari', num: '01',
    client: 'Bhandari Automobile',
    sector: 'Automobile Reseller / Dealership',
    color: '#00e87a',
    tags: ['OCR', 'AI Finance', 'Reconciliation'],
    headline: 'Turning 31-bank chaos into automated clarity',
    impact: ['31 banks unified', 'Zero manual reconciliation', 'Margin accuracy restored'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={60} height={60}>
        <rect x="6" y="28" width="68" height="32" rx="6" stroke="#00e87a" strokeWidth="1.3" opacity="0.5"/>
        <rect x="12" y="22" width="16" height="10" rx="3" stroke="#00e87a" strokeWidth="1.2" opacity="0.7"/>
        <rect x="52" y="22" width="16" height="10" rx="3" stroke="#00e87a" strokeWidth="1.2" opacity="0.7"/>
        <circle cx="22" cy="60" r="8" stroke="#00e87a" strokeWidth="1.4" opacity="0.8"/>
        <circle cx="22" cy="60" r="4" stroke="#00e87a" strokeWidth="1" opacity="0.5"/>
        <circle cx="58" cy="60" r="8" stroke="#00e87a" strokeWidth="1.4" opacity="0.8"/>
        <circle cx="58" cy="60" r="4" stroke="#00e87a" strokeWidth="1" opacity="0.5"/>
        <line x1="18" y1="36" x2="62" y2="36" stroke="#00e87a" strokeWidth="1" opacity="0.3" strokeDasharray="3 3"/>
        <line x1="18" y1="44" x2="50" y2="44" stroke="#00e87a" strokeWidth="1" opacity="0.25" strokeDasharray="3 3"/>
        <path d="M32 16 L40 8 L48 16" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" fill="none"/>
      </svg>
    ),
    problems: [
      'Debt financing through 31 banks — error-prone cost-of-capital accounting & reconciliations',
      'Manual accounting of incentives due to volume and variety of ad-hoc/planned schemes',
      'Miscalculation of unit margin due to accounting complexities within credit cycles',
    ],
    solutions: [
      'AI-enabled interest calculator with OCR extraction on bank documents & automated reconciliations',
      'AI-enabled incentive calculator with data ingestion and automated incentive calculations & roll-outs',
      'AI-enabled, cost-of-capital & credit cycle aware smart margin calculator for accurate per-unit margin',
    ],
  },
  {
    id: 'amit', num: '02',
    client: 'Amit Metaliks',
    sector: 'Steel Manufacturer',
    color: '#00c96a',
    tags: ['Computer Vision', 'ANPR', 'ERP', 'Fireflies.ai'],
    headline: 'Gate-to-boardroom intelligence for a steel giant',
    impact: ['Automated gate compliance', 'CCTV ANPR deployed', 'C-suite meeting intelligence'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={60} height={60}>
        <rect x="8" y="40" width="64" height="28" rx="3" stroke="#00c96a" strokeWidth="1.2" opacity="0.4"/>
        <rect x="16" y="30" width="48" height="14" rx="2" stroke="#00c96a" strokeWidth="1.3" opacity="0.6"/>
        <rect x="24" y="20" width="32" height="14" rx="2" stroke="#00c96a" strokeWidth="1.4" opacity="0.8"/>
        <line x1="40" y1="8" x2="40" y2="20" stroke="#00c96a" strokeWidth="1.2" opacity="0.4"/>
        <circle cx="40" cy="6" r="3" fill="#00c96a" opacity="0.6"/>
        <line x1="20" y1="48" x2="20" y2="40" stroke="#00c96a" strokeWidth="0.9" opacity="0.3"/>
        <line x1="40" y1="48" x2="40" y2="40" stroke="#00c96a" strokeWidth="0.9" opacity="0.3"/>
        <line x1="60" y1="48" x2="60" y2="40" stroke="#00c96a" strokeWidth="0.9" opacity="0.3"/>
        <rect x="28" y="56" width="24" height="8" rx="2" stroke="#00c96a" strokeWidth="1" opacity="0.5"/>
        <text x="40" y="62" textAnchor="middle" fill="#00c96a" fontSize="5" fontFamily="monospace" opacity="0.7">ANPR</text>
      </svg>
    ),
    problems: [
      'Manual inbound carriage entry causing errors & bottlenecks across 50+ related inputs (e-way bill, vendor data, compliance, permits)',
      'C-suite: slow post-meeting retrieval and slow velocity of task-allocations and logs',
    ],
    solutions: [
      'OCR app: vendors upload invoices, security approves → automated compliance, inventory logging & notifications. V2: CCTV ANPR + automated gates',
      'Mobile meeting app on fireflies.ai — records, transcribes, summarises and auto-assigns tasks via Frappe ERP',
    ],
  },
  {
    id: 'carbon', num: '03',
    client: 'Carbon Resources',
    sector: 'Carbon Trading & Manufacturing',
    color: '#00e87a',
    tags: ['OCR', 'SAP Integration', 'Expense Automation'],
    headline: 'Eliminating multi-invoice chaos across SAP & third-party platforms',
    impact: ['SAP integrated', 'Multi-invoice reconciled', 'Zero manual entry'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={60} height={60}>
        <circle cx="40" cy="40" r="24" stroke="#00e87a" strokeWidth="1.2" opacity="0.3"/>
        <circle cx="40" cy="40" r="16" stroke="#00e87a" strokeWidth="1.3" opacity="0.5"/>
        <circle cx="40" cy="40" r="8" stroke="#00e87a" strokeWidth="1.5" opacity="0.8"/>
        <circle cx="40" cy="40" r="3" fill="#00e87a" opacity="0.9"/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>{const r=(a*Math.PI)/180;return <line key={i} x1={40+8*Math.cos(r)} y1={40+8*Math.sin(r)} x2={40+24*Math.cos(r)} y2={40+24*Math.sin(r)} stroke="#00e87a" strokeWidth="0.7" opacity="0.2"/>})}
        <path d="M28 20 L40 10 L52 20" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/>
        <path d="M16 32 L10 44 L18 52" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
        <path d="M64 32 L70 44 L62 52" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      </svg>
    ),
    problems: [
      'Manual & error-prone reconciliation of multiple invoices for a single employee credit-card expense across 3rd-party platforms',
    ],
    solutions: [
      'AI & OCR-enabled software integrated with SAP that manages expenses and reconciles multiple invoices of the same purchase automatically',
    ],
  },
  {
    id: 'farinni', num: '04',
    client: 'Farinni Leather',
    sector: 'Leather Goods Manufacturer',
    color: '#00c96a',
    tags: ['OCR', 'Tally Automation', 'GST Intelligence'],
    headline: 'From 1,500 manual bills a month to zero-touch Tally automation',
    impact: ['1,500+ bills/month automated', 'Instant GST reconciliation', 'Tally intelligence unlocked'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={60} height={60}>
        <rect x="12" y="10" width="36" height="48" rx="3" stroke="#00c96a" strokeWidth="1.3" opacity="0.5"/>
        <rect x="20" y="10" width="36" height="48" rx="3" stroke="#00c96a" strokeWidth="1.3" opacity="0.65"/>
        <rect x="28" y="10" width="36" height="48" rx="3" stroke="#00c96a" strokeWidth="1.4" opacity="0.8"/>
        <line x1="34" y1="22" x2="58" y2="22" stroke="#00c96a" strokeWidth="1" opacity="0.5"/>
        <line x1="34" y1="29" x2="58" y2="29" stroke="#00c96a" strokeWidth="1" opacity="0.4"/>
        <line x1="34" y1="36" x2="50" y2="36" stroke="#00c96a" strokeWidth="1" opacity="0.35"/>
        <line x1="34" y1="43" x2="58" y2="43" stroke="#00c96a" strokeWidth="1" opacity="0.3"/>
        <path d="M14 70 L40 70" stroke="#00c96a" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M44 70 L66 70" stroke="#00c96a" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <circle cx="42" cy="70" r="2.5" fill="#00c96a" opacity="0.7"/>
      </svg>
    ),
    problems: [
      'Laborious manual tally entry of 1.5k+ bills/month, error-prone GST reconciliation, and no intelligence surfaced from Tally data',
    ],
    solutions: [
      'OCR software that automates tally entries from invoice photos + automated GST reconciliation, with a business intelligence layer built on top of Tally data',
    ],
  },
  {
    id: 'dholakia', num: '05',
    client: 'Dholakia Ventures',
    sector: 'Family Office – Venture Capital',
    color: '#00e87a',
    tags: ['Agentic AI', 'Notion CRM', 'Multi-channel', 'OCR'],
    headline: 'An AI agent that never misses a great deal',
    impact: ['1,500 decks/month triaged', '5 channels unified', 'Custom VC CRM in progress'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={60} height={60}>
        <circle cx="40" cy="20" r="8" stroke="#00e87a" strokeWidth="1.4" opacity="0.8"/>
        <text x="40" y="23" textAnchor="middle" fill="#00e87a" fontSize="7" fontFamily="monospace" opacity="0.9">AI</text>
        <circle cx="16" cy="57" r="6" stroke="#00e87a" strokeWidth="1.2" opacity="0.6"/>
        <circle cx="32" cy="65" r="6" stroke="#00e87a" strokeWidth="1.2" opacity="0.55"/>
        <circle cx="48" cy="65" r="6" stroke="#00e87a" strokeWidth="1.2" opacity="0.55"/>
        <circle cx="64" cy="57" r="6" stroke="#00e87a" strokeWidth="1.2" opacity="0.6"/>
        <path d="M34 26 L20 51" stroke="#00e87a" strokeWidth="1.1" opacity="0.4"/>
        <path d="M38 28 L34 59" stroke="#00e87a" strokeWidth="1.1" opacity="0.4"/>
        <path d="M42 28 L46 59" stroke="#00e87a" strokeWidth="1.1" opacity="0.4"/>
        <path d="M46 26 L60 51" stroke="#00e87a" strokeWidth="1.1" opacity="0.4"/>
        <text x="5" y="77" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.5">✓</text>
        <text x="68" y="77" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.5">✗</text>
      </svg>
    ),
    problems: [
      '1.5k inbound pitch decks/month (90% noise) across 5 channels — hours of triage + manual CRM entry',
      'Rejected decks lost forever; great deals overlooked due to cognitive fatigue from volume',
    ],
    solutions: [
      'Agentic pipeline that ingests all decks across all channels, OCR-extracts key info and auto-populates Notion CRM fields',
      'Validates against pre-set metrics → auto-reject (personalised mail + file) or accept (AI memo). Building a full custom VC CRM suite.',
    ],
  },
];

/* ─── Problem/Solution grid ──────────────────────────────────── */
function PSBlock({ problems, solutions, color }: { problems: string[]; solutions: string[]; color: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
      {/* Problems */}
      <div>
        <FadeUp delay={0.04}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.2" opacity="0.7"/>
              <line x1="8" y1="4" x2="8" y2="9" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="8" cy="12" r="1" fill="#ef4444" opacity="0.7"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', color: '#ef4444', opacity: 0.85 }}>
              PROBLEM{problems.length > 1 ? 'S' : ''}
            </span>
          </div>
        </FadeUp>
        {problems.map((p, i) => (
          <FadeUp key={i} delay={0.1 + i * 0.08}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444', flexShrink: 0, marginTop: 8, opacity: 0.55 }}/>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.72, margin: 0 }}>{p}</p>
            </div>
          </FadeUp>
        ))}
      </div>
      {/* Solutions */}
      <div>
        <FadeUp delay={0.08}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.2" opacity="0.7"/>
              <path d="M5 8 L7 10 L11 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', color, opacity: 0.85 }}>
              SOLUTION{solutions.length > 1 ? 'S' : ''}
            </span>
          </div>
        </FadeUp>
        {solutions.map((s, i) => (
          <FadeUp key={i} delay={0.14 + i * 0.08}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 8, opacity: 0.65 }}/>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.72, margin: 0 }}>{s}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

/* ─── Single case card ───────────────────────────────────────── */
function CaseCard({ c, index }: { c: typeof CASES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });

  return (
    <motion.div
      ref={ref}
      className="cs-card"
      initial={{ opacity: 0, y: 48, scale: 0.985 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.72, delay: index * 0.08, ease: EASE }}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        background: 'var(--bg-surface)',
        border: `1px solid ${expanded ? c.color + '30' : 'rgba(255,255,255,0.05)'}`,
        boxShadow: expanded
          ? `0 32px 72px rgba(0,0,0,0.55), 0 0 0 1px ${c.color}16`
          : '0 4px 24px rgba(0,0,0,0.22)',
      }}
    >
      {/* Top accent bar */}
      <div
        className={expanded ? 'cs-bar-active' : ''}
        style={{
          height: 2,
          background: expanded ? undefined : `linear-gradient(90deg, ${c.color}, transparent)`,
          opacity: expanded ? 1 : 0.32,
        }}
      />

      {/* ── Header (always visible, clickable) ── */}
      <div
        style={{ padding: '28px', cursor: 'pointer', position: 'relative', userSelect: 'none' }}
        onClick={() => setExpanded(e => !e)}
      >
        {/* ghost number */}
        <div style={{
          position: 'absolute', right: 20, top: 10,
          fontFamily: 'var(--font-mono)', fontSize: 80, fontWeight: 700,
          color: c.color, opacity: 0.04, userSelect: 'none', lineHeight: 1, pointerEvents: 'none',
        }}>{c.num}</div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          {/* Left: icon + text */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flex: 1 }}>
            {/* SVG — scale-in on inView */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: expanded ? 1 : 0.6, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: index * 0.08 + 0.18, ease: EASE }}
              style={{ flexShrink: 0 }}
            >
              {c.svg}
            </motion.div>

            <div style={{ flex: 1 }}>
              {/* Badge row — clip-path wipe */}
              <RevealClip delay={index * 0.08 + 0.08} style={{ marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: c.color, border: `1px solid ${c.color}35`, padding: '2px 9px', borderRadius: 100, letterSpacing: '0.12em' }}>
                    CASE {c.num}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.07em' }}>
                    {c.sector}
                  </span>
                </div>
              </RevealClip>

              {/* Client name — clip-path wipe */}
              <div style={{ overflow: 'hidden', marginBottom: 6 }}>
                <RevealClip delay={index * 0.08 + 0.16}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(18px,2.2vw,28px)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>
                    {c.client}
                  </h2>
                </RevealClip>
              </div>

              {/* Headline — fade up */}
              <FadeUp delay={index * 0.08 + 0.24} style={{ marginBottom: 14 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.58, fontStyle: 'italic', opacity: 0.8 }}>
                  {c.headline}
                </p>
              </FadeUp>

              {/* Tags — staggered fade */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {c.tags.map((t, ti) => (
                  <motion.span
                    key={t}
                    className="cs-tag"
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.42, delay: index * 0.08 + 0.3 + ti * 0.06, ease: EASE }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(0,232,122,0.14)', color: 'var(--text-tertiary)', display: 'block' }}
                  >{t}</motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: impact pills + expand btn */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
              {c.impact.map((imp, ii) => (
                <motion.span
                  key={ii}
                  initial={{ opacity: 0, x: 18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.48, delay: index * 0.08 + 0.22 + ii * 0.07, ease: EASE }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: c.color, background: `${c.color}0d`, border: `1px solid ${c.color}1e`, padding: '3px 10px', borderRadius: 100, whiteSpace: 'nowrap' }}
                >{imp}</motion.span>
              ))}
            </div>

            <motion.button
              className="cs-expand-btn"
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.32, ease: EASE }}
              style={{ width: 36, height: 36, borderRadius: '50%', border: `1.5px solid ${c.color}40`, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <span className="cs-plus" style={{ color: c.color, fontSize: 20, lineHeight: 1, fontWeight: 300 }}>+</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Expandable body ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.5, ease: EASE }, opacity: { duration: 0.32 } }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', margin: '0 28px' }}/>
            <div style={{ padding: '26px 28px 30px' }}>
              <PSBlock problems={c.problems} solutions={c.solutions} color={c.color}/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page export ────────────────────────────────────────────── */
export function CaseStudiesPage() {
  return (
    <section id="case-studies" style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden', minHeight: '100vh' }}>
      <style>{GLOBAL_STYLES}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <RevealClip delay={0} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-primary)', letterSpacing: '0.22em' }}>CASE STUDIES</span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(0,232,122,0.35),transparent)' }}/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', opacity: 0.45 }}>{CASES.length} cases</span>
            </div>
          </RevealClip>

          <div style={{ overflow: 'hidden', marginBottom: 4 }}>
            <RevealClip delay={0.08}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(38px,5vw,70px)', color: 'var(--text-primary)', lineHeight: 1.04, margin: 0 }}>
                Problems solved.
              </h1>
            </RevealClip>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 22 }}>
            <RevealClip delay={0.17}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(38px,5vw,70px)', color: 'var(--accent-primary)', lineHeight: 1.04, margin: 0 }}>
                Results delivered.
              </h1>
            </RevealClip>
          </div>

          <FadeUp delay={0.27}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.78, maxWidth: 560, margin: 0 }}>
              Real enterprise challenges across manufacturing, finance, and trading — solved with AI, OCR, and agentic pipelines built by Zuneko Labs.
            </p>
          </FadeUp>
        </div>

        {/* Card stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {CASES.map((c, i) => <CaseCard key={c.id} c={c} index={i}/>)}
        </div>

        {/* CTA */}
        <FadeUp delay={0.15} style={{ textAlign: 'center', marginTop: 72 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', marginBottom: 20 }}>
            Have a complex problem that needs solving?
          </p>
          <a
            href="#contact"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: 'var(--accent-primary)', border: '1px solid rgba(0,232,122,0.35)', padding: '12px 32px', borderRadius: 6, textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s,color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
          >Let's talk →</a>
        </FadeUp>
      </div>

      <style>{`@media(max-width:660px){.cs-ps-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}