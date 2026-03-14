import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Dark green palette ──────────────────────────────────────── */
const G1 = '#1a6e42';   // primary dark green
const G2 = '#0d5233';   // deeper green
const ACCENT = G1;

const GLOBAL_STYLES = `
  .cs-card { transition: box-shadow 0.35s, border-color 0.35s; }
  .cs-tag  { transition: background 0.2s, color 0.2s, border-color 0.2s; cursor: pointer; }
  .cs-tag:hover { background: rgba(26,110,66,0.1); color: #1a6e42; border-color: rgba(26,110,66,0.35); }
  .cs-expand-btn { transition: background 0.22s, border-color 0.22s; outline: none; }
  .cs-expand-btn:hover { background: #1a6e42 !important; border-color: #1a6e42 !important; }
  .cs-expand-btn:hover .cs-plus { color: #fff !important; }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .cs-header-row   { flex-direction: column !important; gap: 16px !important; }
    .cs-header-left  { flex-direction: column !important; gap: 14px !important; align-items: flex-start !important; }
    .cs-header-right { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; width: 100% !important; }
    .cs-impact-pills { flex-direction: row !important; flex-wrap: wrap !important; }
    .cs-ps-grid      { grid-template-columns: 1fr !important; gap: 20px !important; }
    .cs-card-pad     { padding: 20px !important; }
    .cs-body-pad     { padding: 18px 20px 22px !important; }
    .cs-headline     { font-size: 16px !important; }
    .cs-client-name  { font-size: clamp(18px,5vw,24px) !important; }
    .cs-section      { padding: 72px 16px !important; }
    .cs-header-block { margin-bottom: 48px !important; }
    .cs-h1           { font-size: clamp(30px,7vw,48px) !important; }
  }
`;

/* ─── Reveal helpers ────────────────────────────────────────────── */
function RevealClip({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
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

function FadeUp({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.58, delay, ease: EASE }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─────────────────────────────────────────────────────── */
const CASES = [
  {
    id: 'bhandari', num: '01',
    client: 'Bhandari Automobile',
    sector: 'Automobile Reseller / Dealership',
    color: G1,
    tags: ['OCR', 'AI Finance', 'Reconciliation'],
    headline: 'Turning 31-bank chaos into automated clarity',
    impact: ['31 banks unified', 'Zero manual reconciliation', 'Margin accuracy restored'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={52} height={52}>
        <rect x="6" y="28" width="68" height="32" rx="6" stroke={G1} strokeWidth="1.3" opacity="0.5"/>
        <rect x="12" y="22" width="16" height="10" rx="3" stroke={G1} strokeWidth="1.2" opacity="0.7"/>
        <rect x="52" y="22" width="16" height="10" rx="3" stroke={G1} strokeWidth="1.2" opacity="0.7"/>
        <circle cx="22" cy="60" r="8" stroke={G1} strokeWidth="1.4" opacity="0.8"/>
        <circle cx="22" cy="60" r="4" stroke={G1} strokeWidth="1" opacity="0.5"/>
        <circle cx="58" cy="60" r="8" stroke={G1} strokeWidth="1.4" opacity="0.8"/>
        <circle cx="58" cy="60" r="4" stroke={G1} strokeWidth="1" opacity="0.5"/>
        <line x1="18" y1="36" x2="62" y2="36" stroke={G1} strokeWidth="1" opacity="0.3" strokeDasharray="3 3"/>
        <line x1="18" y1="44" x2="50" y2="44" stroke={G1} strokeWidth="1" opacity="0.25" strokeDasharray="3 3"/>
        <path d="M32 16 L40 8 L48 16" stroke={G1} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" fill="none"/>
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
    color: G2,
    tags: ['Computer Vision', 'ANPR', 'ERP', 'Fireflies.ai'],
    headline: 'Gate-to-boardroom intelligence for a steel giant',
    impact: ['Automated gate compliance', 'CCTV ANPR deployed', 'C-suite meeting intelligence'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={52} height={52}>
        <rect x="8" y="40" width="64" height="28" rx="3" stroke={G2} strokeWidth="1.2" opacity="0.4"/>
        <rect x="16" y="30" width="48" height="14" rx="2" stroke={G2} strokeWidth="1.3" opacity="0.6"/>
        <rect x="24" y="20" width="32" height="14" rx="2" stroke={G2} strokeWidth="1.4" opacity="0.85"/>
        <line x1="40" y1="8" x2="40" y2="20" stroke={G2} strokeWidth="1.2" opacity="0.4"/>
        <circle cx="40" cy="6" r="3" fill={G2} opacity="0.7"/>
        <line x1="20" y1="48" x2="20" y2="40" stroke={G2} strokeWidth="0.9" opacity="0.3"/>
        <line x1="40" y1="48" x2="40" y2="40" stroke={G2} strokeWidth="0.9" opacity="0.3"/>
        <line x1="60" y1="48" x2="60" y2="40" stroke={G2} strokeWidth="0.9" opacity="0.3"/>
        <rect x="28" y="56" width="24" height="8" rx="2" stroke={G2} strokeWidth="1" opacity="0.5"/>
        <text x="40" y="62" textAnchor="middle" fill={G2} fontSize="5" fontFamily="monospace" opacity="0.8">ANPR</text>
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
    color: G1,
    tags: ['OCR', 'SAP Integration', 'Expense Automation'],
    headline: 'Eliminating multi-invoice chaos across SAP & third-party platforms',
    impact: ['SAP integrated', 'Multi-invoice reconciled', 'Zero manual entry'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={52} height={52}>
        <circle cx="40" cy="40" r="24" stroke={G1} strokeWidth="1.2" opacity="0.3"/>
        <circle cx="40" cy="40" r="16" stroke={G1} strokeWidth="1.3" opacity="0.5"/>
        <circle cx="40" cy="40" r="8"  stroke={G1} strokeWidth="1.5" opacity="0.85"/>
        <circle cx="40" cy="40" r="3"  fill={G1} opacity="0.9"/>
        {[0,45,90,135,180,225,270,315].map((a,i) => {
          const r = (a*Math.PI)/180;
          return <line key={i} x1={40+8*Math.cos(r)} y1={40+8*Math.sin(r)} x2={40+24*Math.cos(r)} y2={40+24*Math.sin(r)} stroke={G1} strokeWidth="0.7" opacity="0.2"/>;
        })}
        <path d="M28 20 L40 10 L52 20" stroke={G1} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/>
        <path d="M16 32 L10 44 L18 52" stroke={G1} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
        <path d="M64 32 L70 44 L62 52" stroke={G1} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
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
    color: G2,
    tags: ['OCR', 'Tally Automation', 'GST Intelligence'],
    headline: 'From 1,500 manual bills a month to zero-touch Tally automation',
    impact: ['1,500+ bills/month automated', 'Instant GST reconciliation', 'Tally intelligence unlocked'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={52} height={52}>
        <rect x="12" y="10" width="36" height="48" rx="3" stroke={G2} strokeWidth="1.3" opacity="0.45"/>
        <rect x="20" y="10" width="36" height="48" rx="3" stroke={G2} strokeWidth="1.3" opacity="0.6"/>
        <rect x="28" y="10" width="36" height="48" rx="3" stroke={G2} strokeWidth="1.4" opacity="0.8"/>
        <line x1="34" y1="22" x2="58" y2="22" stroke={G2} strokeWidth="1" opacity="0.5"/>
        <line x1="34" y1="29" x2="58" y2="29" stroke={G2} strokeWidth="1" opacity="0.4"/>
        <line x1="34" y1="36" x2="50" y2="36" stroke={G2} strokeWidth="1" opacity="0.35"/>
        <line x1="34" y1="43" x2="58" y2="43" stroke={G2} strokeWidth="1" opacity="0.3"/>
        <path d="M14 70 L40 70" stroke={G2} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M44 70 L66 70" stroke={G2} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <circle cx="42" cy="70" r="2.5" fill={G2} opacity="0.7"/>
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
    color: G1,
    tags: ['Agentic AI', 'Notion CRM', 'Multi-channel', 'OCR'],
    headline: 'An AI agent that never misses a great deal',
    impact: ['1,500 decks/month triaged', '5 channels unified', 'Custom VC CRM in progress'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={52} height={52}>
        <circle cx="40" cy="20" r="8" stroke={G1} strokeWidth="1.4" opacity="0.85"/>
        <text x="40" y="23" textAnchor="middle" fill={G1} fontSize="7" fontFamily="monospace" opacity="0.9">AI</text>
        <circle cx="16" cy="57" r="6" stroke={G1} strokeWidth="1.2" opacity="0.6"/>
        <circle cx="32" cy="65" r="6" stroke={G1} strokeWidth="1.2" opacity="0.55"/>
        <circle cx="48" cy="65" r="6" stroke={G1} strokeWidth="1.2" opacity="0.55"/>
        <circle cx="64" cy="57" r="6" stroke={G1} strokeWidth="1.2" opacity="0.6"/>
        <path d="M34 26 L20 51" stroke={G1} strokeWidth="1.1" opacity="0.4"/>
        <path d="M38 28 L34 59" stroke={G1} strokeWidth="1.1" opacity="0.4"/>
        <path d="M42 28 L46 59" stroke={G1} strokeWidth="1.1" opacity="0.4"/>
        <path d="M46 26 L60 51" stroke={G1} strokeWidth="1.1" opacity="0.4"/>
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

/* ─── Problem / Solution grid ───────────────────────────────────── */
function PSBlock({ problems, solutions, color }: {
  problems: string[]; solutions: string[]; color: string;
}) {
  return (
    <div className="cs-ps-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
      {/* Problems */}
      <div>
        <FadeUp delay={0.04}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#c03030" strokeWidth="1.2" opacity="0.7"/>
              <line x1="8" y1="4" x2="8" y2="9" stroke="#c03030" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="8" cy="12" r="1" fill="#c03030" opacity="0.7"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: '#c03030', opacity: 0.85 }}>
              PROBLEM{problems.length > 1 ? 'S' : ''}
            </span>
          </div>
        </FadeUp>
        {problems.map((p, i) => (
          <FadeUp key={i} delay={0.1 + i * 0.08}>
            <div style={{ display: 'flex', gap: 9, marginBottom: 10 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#c03030', flexShrink: 0, marginTop: 8, opacity: 0.5 }}/>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3d6b50', lineHeight: 1.72, margin: 0 }}>{p}</p>
            </div>
          </FadeUp>
        ))}
      </div>
      {/* Solutions */}
      <div>
        <FadeUp delay={0.08}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.2" opacity="0.7"/>
              <path d="M5 8 L7 10 L11 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color, opacity: 0.85 }}>
              SOLUTION{solutions.length > 1 ? 'S' : ''}
            </span>
          </div>
        </FadeUp>
        {solutions.map((s, i) => (
          <FadeUp key={i} delay={0.14 + i * 0.08}>
            <div style={{ display: 'flex', gap: 9, marginBottom: 10 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 8, opacity: 0.65 }}/>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3d6b50', lineHeight: 1.72, margin: 0 }}>{s}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

/* ─── Single case card ──────────────────────────────────────────── */
function CaseCard({ c, index }: { c: typeof CASES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });

  return (
    <motion.div
      ref={ref}
      className="cs-card"
      initial={{ opacity: 0, y: 40, scale: 0.988 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.68, delay: index * 0.08, ease: EASE }}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        background: '#ffffff',
        border: `1px solid ${expanded ? c.color + '40' : 'rgba(26,110,66,0.12)'}`,
        boxShadow: expanded
          ? `0 20px 56px rgba(26,110,66,0.14), 0 0 0 1px ${c.color}18`
          : '0 2px 16px rgba(26,110,66,0.06)',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, ${c.color}, transparent)`,
        opacity: expanded ? 0.9 : 0.45,
        transition: 'opacity 0.3s',
      }} />

      {/* ── Header ── */}
      <div
        className="cs-card-pad"
        style={{ padding: 28, cursor: 'pointer', position: 'relative', userSelect: 'none' }}
        onClick={() => setExpanded(e => !e)}
      >
        {/* Ghost number */}
        <div style={{
          position: 'absolute', right: 16, top: 8,
          fontFamily: 'var(--font-mono)', fontSize: 72, fontWeight: 700,
          color: c.color, opacity: 0.04, userSelect: 'none', lineHeight: 1, pointerEvents: 'none',
        }}>{c.num}</div>

        {/* Header row — column on mobile */}
        <div className="cs-header-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>

          {/* Left: icon + text */}
          <div className="cs-header-left" style={{ display: 'flex', gap: 18, alignItems: 'flex-start', flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: expanded ? 1 : 0.65, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 + 0.16, ease: EASE }}
              style={{ flexShrink: 0 }}
            >
              {c.svg}
            </motion.div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Badge row */}
              <RevealClip delay={index * 0.08 + 0.08} style={{ marginBottom: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: c.color, border: `1px solid ${c.color}35`, padding: '2px 9px', borderRadius: 100, letterSpacing: '0.12em' }}>
                    CASE {c.num}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: '#3d7a55', opacity: 0.65, letterSpacing: '0.07em' }}>
                    {c.sector}
                  </span>
                </div>
              </RevealClip>

              {/* Client name */}
              <div style={{ overflow: 'hidden', marginBottom: 5 }}>
                <RevealClip delay={index * 0.08 + 0.16}>
                  <h2 className="cs-client-name" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(18px,2.2vw,26px)', color: '#0d3d22', margin: 0, lineHeight: 1.1 }}>
                    {c.client}
                  </h2>
                </RevealClip>
              </div>

              {/* Headline */}
              <FadeUp delay={index * 0.08 + 0.22} style={{ marginBottom: 12 }}>
                <p className="cs-headline" style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#3d6b50', margin: 0, lineHeight: 1.58, fontStyle: 'italic' }}>
                  {c.headline}
                </p>
              </FadeUp>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {c.tags.map((t, ti) => (
                  <motion.span
                    key={t}
                    className="cs-tag"
                    initial={{ opacity: 0, y: 7 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.38, delay: index * 0.08 + 0.28 + ti * 0.06, ease: EASE }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, padding: '3px 9px', borderRadius: 100, border: '1px solid rgba(26,110,66,0.18)', color: '#3d7a55', display: 'block', background: 'rgba(26,110,66,0.03)' }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: impact pills + expand */}
          <div className="cs-header-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
            <div className="cs-impact-pills" style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
              {c.impact.map((imp, ii) => (
                <motion.span
                  key={ii}
                  initial={{ opacity: 0, x: 14 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.42, delay: index * 0.08 + 0.2 + ii * 0.07, ease: EASE }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: c.color, background: `${c.color}0d`, border: `1px solid ${c.color}25`, padding: '3px 10px', borderRadius: 100, whiteSpace: 'nowrap' }}
                >
                  {imp}
                </motion.span>
              ))}
            </div>

            <motion.button
              className="cs-expand-btn"
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              style={{ width: 34, height: 34, borderRadius: '50%', border: `1.5px solid ${c.color}45`, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
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
            transition={{ height: { duration: 0.45, ease: EASE }, opacity: { duration: 0.28 } }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ borderTop: '1px solid rgba(26,110,66,0.1)', margin: '0 20px' }}/>
            <div className="cs-body-pad" style={{ padding: '22px 28px 28px' }}>
              <PSBlock problems={c.problems} solutions={c.solutions} color={c.color} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export function CaseStudiesPage() {
  return (
    <section
      id="case-studies"
      className="cs-section"
      style={{ background: '#ffffff', padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)', overflow: 'hidden', minHeight: '100vh' }}
    >
      <style>{GLOBAL_STYLES}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div className="cs-header-block" style={{ marginBottom: 64 }}>
          <RevealClip delay={0} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: ACCENT, letterSpacing: '0.22em', opacity: 0.8 }}>CASE STUDIES</span>
              <div style={{ flex: 1, minWidth: 40, height: 1, background: `linear-gradient(90deg,rgba(26,110,66,0.3),transparent)` }}/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#3d7a55', opacity: 0.5 }}>{CASES.length} cases</span>
            </div>
          </RevealClip>

          <div style={{ overflow: 'hidden', marginBottom: 4 }}>
            <RevealClip delay={0.08}>
              <h1 className="cs-h1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(32px,5vw,68px)', color: '#0d3d22', lineHeight: 1.04, margin: 0 }}>
                Problems solved.
              </h1>
            </RevealClip>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 20 }}>
            <RevealClip delay={0.17}>
              <h1 className="cs-h1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(32px,5vw,68px)', color: ACCENT, lineHeight: 1.04, margin: 0 }}>
                Results delivered.
              </h1>
            </RevealClip>
          </div>

          <FadeUp delay={0.26}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px,1.4vw,15px)', color: '#3d6b50', lineHeight: 1.78, maxWidth: 520, margin: 0 }}>
              Real enterprise challenges across manufacturing, finance, and trading — solved with AI, OCR, and agentic pipelines built by Zuneko Labs.
            </p>
          </FadeUp>
        </div>

        {/* Card stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CASES.map((c, i) => <CaseCard key={c.id} c={c} index={i} />)}
        </div>

        {/* CTA */}
        <FadeUp delay={0.1} style={{ textAlign: 'center', marginTop: 64 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3d6b50', marginBottom: 18 }}>
            Have a complex problem that needs solving?
          </p>
          <a
            href="#contact"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: ACCENT, border: `1px solid rgba(26,110,66,0.35)`, padding: '11px 30px', borderRadius: 6, textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ACCENT; }}
          >
            Let's talk →
          </a>
        </FadeUp>
      </div>
    </section>
  );
}