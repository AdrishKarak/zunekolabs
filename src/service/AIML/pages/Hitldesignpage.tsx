
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const STYLES = `
  .hitl-card {
    transition: transform 0.28s cubic-bezier(0.16,1,0.3,1), border-color 0.28s;
    border: 1px solid rgba(255,255,255,0.05);
    position: relative;
  }
  .hitl-card::after {
    content: '';
    position: absolute;
    right: 0; top: 0; bottom: 0;
    width: 2px;
    background: var(--accent-primary);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
    opacity: 0.55;
  }
  .hitl-card:hover::after { transform: scaleY(1); }
  .hitl-card:hover { transform: translateX(-4px); border-color: rgba(0,232,122,0.16); }

  .hitl-row {
    transition: padding-left 0.22s, background 0.22s;
    border-radius: 8px; cursor: default;
  }
  .hitl-row:hover { padding-left: 8px; background: rgba(0,232,122,0.04); }

  .hitl-step {
    transition: transform 0.26s cubic-bezier(0.16,1,0.3,1), border-color 0.26s;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .hitl-step:hover { transform: translateY(-5px); border-color: rgba(0,232,122,0.2); }

  .hitl-pill {
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    cursor: default;
  }
  .hitl-pill:hover { background: rgba(0,232,122,0.09); color: var(--accent-primary); border-color: rgba(0,232,122,0.28); }
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
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent-primary)', opacity: 0.85 }}>AI GOVERNANCE & UX ENGINEERING</span>
          </div>
        </RevealClip>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 60px', alignItems: 'center' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 6 }}>
              <RevealClip delay={0.08}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px,5vw,70px)', color: 'var(--text-primary)', lineHeight: 1.02, margin: 0 }}>Human-in-the-Loop</h1>
              </RevealClip>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 28 }}>
              <RevealClip delay={0.16}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px,5vw,70px)', color: 'var(--accent-primary)', lineHeight: 1.02, margin: 0 }}>(HITL) Design.</h1>
              </RevealClip>
            </div>
            <FadeUp delay={0.26}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0 0 32px' }}>
                UI/UX engineering that puts the right human in control of the right AI output — at the right moment. Validation interfaces, audit trails and access controls for enterprises that can't afford to get it wrong.
              </p>
            </FadeUp>
            <FadeUp delay={0.36}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                {['Validation interfaces', 'Audit trails', 'Access control', 'Compliance by design'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.55 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Hero SVG — human + AI loop */}
          <FadeIn delay={0.32}>
            <svg viewBox="0 0 300 260" fill="none" style={{ width: '100%', maxWidth: 340 }}>
              {/* AI block */}
              <rect x="100" y="20" width="100" height="60" rx="8" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/>
              <text x="150" y="50" textAnchor="middle" fill="#00e87a" fontSize="8" fontFamily="monospace" opacity="0.6">AI MODEL</text>
              <text x="150" y="62" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.4">Output generated</text>

              {/* Arrow down to validation */}
              <path d="M150 80 L150 110" stroke="#00e87a" strokeWidth="1" opacity="0.4" strokeDasharray="3 3"/>
              <path d="M146 107 L150 113 L154 107" stroke="#00e87a" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4"/>

              {/* Validation / HITL interface */}
              <rect x="70" y="115" width="160" height="70" rx="8" stroke="#00e87a" strokeWidth="1.4" opacity="0.8"/>
              <text x="150" y="138" textAnchor="middle" fill="#00e87a" fontSize="7" fontFamily="monospace" opacity="0.7">VALIDATION INTERFACE</text>
              <line x1="82" y1="148" x2="218" y2="148" stroke="#00e87a" strokeWidth="0.6" opacity="0.2"/>
              <rect x="82" y="153" width="50" height="18" rx="3" stroke="#00e87a" strokeWidth="1" opacity="0.5"/>
              <text x="107" y="165" textAnchor="middle" fill="#00e87a" fontSize="5.5" fontFamily="monospace" opacity="0.6">✓ APPROVE</text>
              <rect x="142" y="153" width="38" height="18" rx="3" stroke="#00e87a" strokeWidth="1" opacity="0.4"/>
              <text x="161" y="165" textAnchor="middle" fill="#00e87a" fontSize="5.5" fontFamily="monospace" opacity="0.5">EDIT</text>
              <rect x="190" y="153" width="28" height="18" rx="3" stroke="#00e87a" strokeWidth="1" opacity="0.4"/>
              <text x="204" y="165" textAnchor="middle" fill="#00e87a" fontSize="5.5" fontFamily="monospace" opacity="0.5">✗</text>

              {/* Human figure */}
              <circle cx="40" cy="150" r="14" stroke="#00e87a" strokeWidth="1.1" opacity="0.5"/>
              <circle cx="40" cy="143" r="5" stroke="#00e87a" strokeWidth="1" opacity="0.6"/>
              <path d="M30 162 C30 156 50 156 50 162" stroke="#00e87a" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
              <line x1="54" y1="150" x2="70" y2="150" stroke="#00e87a" strokeWidth="0.8" opacity="0.35" strokeDasharray="2 2"/>

              {/* Arrow down — approved output */}
              <path d="M150 185 L150 210" stroke="#00e87a" strokeWidth="1" opacity="0.4" strokeDasharray="3 3"/>
              <path d="M146 207 L150 213 L154 207" stroke="#00e87a" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4"/>

              {/* System action */}
              <rect x="100" y="215" width="100" height="34" rx="6" stroke="#00e87a" strokeWidth="1.1" opacity="0.55"/>
              <text x="150" y="235" textAnchor="middle" fill="#00e87a" fontSize="7" fontFamily="monospace" opacity="0.55">SYSTEM ACTION</text>

              {/* Feedback loop */}
              <path d="M230 150 Q270 150 270 50 Q270 20 200 20" stroke="#00e87a" strokeWidth="0.8" opacity="0.2" strokeDasharray="3 3" fill="none"/>
              <text x="275" y="100" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.3" transform="rotate(90,275,100)">feedback loop</text>

              {/* Audit log */}
              <rect x="10" y="200" width="50" height="42" rx="4" stroke="#00e87a" strokeWidth="0.9" opacity="0.35"/>
              <text x="35" y="215" textAnchor="middle" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.4">AUDIT</text>
              <line x1="16" y1="222" x2="54" y2="222" stroke="#00e87a" strokeWidth="0.5" opacity="0.25"/>
              <line x1="16" y1="228" x2="48" y2="228" stroke="#00e87a" strokeWidth="0.5" opacity="0.2"/>
              <line x1="16" y1="234" x2="50" y2="234" stroke="#00e87a" strokeWidth="0.5" opacity="0.18"/>
            </svg>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══ WHY HITL MATTERS ════════════════════════════════════════ */
const WHYS = [
  { icon: '⚖', head: 'AI is not infallible', body: 'LLMs hallucinate. Classifiers drift. Without a human checkpoint, errors reach downstream systems, customers or regulators before anyone notices.' },
  { icon: '🏛', head: 'Compliance demands it', body: 'GDPR, EU AI Act, HIPAA and financial regulations increasingly require documented human oversight for automated decisions affecting individuals.' },
  { icon: '🎯', head: 'Edge cases need judgement', body: 'The long tail of cases that fall outside training data can\'t be handled by confidence scores alone. Someone needs to make the call.' },
  { icon: '📈', head: 'Human feedback improves the model', body: 'Every correction is a training signal. HITL interfaces that capture structured feedback create a flywheel that makes your AI progressively better.' },
  { icon: '🔐', head: 'Access control is non-negotiable', body: 'Who can approve what — and on whose behalf — needs to be enforced at the interface level, not assumed.' },
];

function WhySection() {
  return (
    <section style={{ padding: '100px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="WHY IT MATTERS" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 80px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3.2vw,44px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
                  Autonomous AI without oversight is a liability.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.18}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '18px 0 0' }}>
                The goal isn't to keep humans in the loop forever — it's to keep them in the loop <em>intelligently</em>, where their judgement changes the outcome and their feedback improves the system.
              </p>
            </FadeUp>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {WHYS.map((w, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.07}>
                <div className="hitl-row" style={{ display: 'flex', gap: 14, padding: '12px 10px' }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{w.icon}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', margin: '0 0 2px' }}>{w.head}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65, opacity: 0.82 }}>{w.body}</p>
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

/* ═══ WHAT WE BUILD ══════════════════════════════════════════ */
const BUILDS = [
  {
    num: '01', title: 'Validation & Review Interfaces',
    body: 'Purpose-built UIs where reviewers see the AI output, the supporting context, and a structured set of actions: approve, edit, reject, escalate — with every decision logged.',
    pills: ['Contextual AI output display', 'Inline editing', 'Structured decision capture', 'Keyboard-first UX'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <rect x="4" y="6" width="44" height="40" rx="5" stroke="#00e87a" strokeWidth="1.2" opacity="0.55"/>
        <line x1="4" y1="16" x2="48" y2="16" stroke="#00e87a" strokeWidth="0.7" opacity="0.2"/>
        <rect x="10" y="22" width="32" height="7" rx="2" stroke="#00e87a" strokeWidth="1" opacity="0.4"/>
        <rect x="10" y="33" width="10" height="7" rx="2" fill="#00e87a" opacity="0.35"/>
        <rect x="23" y="33" width="8" height="7" rx="2" stroke="#00e87a" strokeWidth="1" opacity="0.3"/>
        <rect x="34" y="33" width="8" height="7" rx="2" stroke="#00e87a" strokeWidth="1" opacity="0.25"/>
        <circle cx="10" cy="11" r="2" fill="#00e87a" opacity="0.5"/>
        <circle cx="16" cy="11" r="2" fill="#00e87a" opacity="0.35"/>
      </svg>
    ),
  },
  {
    num: '02', title: 'Role-Based Access & Approval Chains',
    body: 'Not everyone should approve everything. We build tiered permission systems: junior reviewers flag, senior reviewers decide, compliance teams audit — enforced at every step.',
    pills: ['RBAC enforcement', 'Multi-level approval', 'Delegation rules', 'Out-of-office routing'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <circle cx="26" cy="14" r="7" stroke="#00e87a" strokeWidth="1.2" opacity="0.7"/>
        <circle cx="12" cy="36" r="6" stroke="#00e87a" strokeWidth="1.1" opacity="0.5"/>
        <circle cx="40" cy="36" r="6" stroke="#00e87a" strokeWidth="1.1" opacity="0.5"/>
        <line x1="26" y1="21" x2="26" y2="28" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/>
        <line x1="26" y1="28" x2="12" y2="31" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/>
        <line x1="26" y1="28" x2="40" y2="31" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/>
        <path d="M22 14 L26 17 L30 14" stroke="#00e87a" strokeWidth="1" fill="none" opacity="0.4"/>
      </svg>
    ),
  },
  {
    num: '03', title: 'Audit Trail & Compliance Logging',
    body: 'An immutable, queryable record of every AI output, every human decision, every override and every escalation. Exportable for regulators, filterable for ops teams.',
    pills: ['Immutable event log', 'Decision attribution', 'Exportable reports', 'Retention policies'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <rect x="8" y="6" width="36" height="40" rx="4" stroke="#00e87a" strokeWidth="1.2" opacity="0.5"/>
        <line x1="14" y1="16" x2="38" y2="16" stroke="#00e87a" strokeWidth="0.8" opacity="0.4"/>
        <line x1="14" y1="22" x2="38" y2="22" stroke="#00e87a" strokeWidth="0.8" opacity="0.35"/>
        <line x1="14" y1="28" x2="30" y2="28" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/>
        <line x1="14" y1="34" x2="38" y2="34" stroke="#00e87a" strokeWidth="0.8" opacity="0.25"/>
        <line x1="14" y1="40" x2="26" y2="40" stroke="#00e87a" strokeWidth="0.8" opacity="0.2"/>
        <circle cx="12" cy="16" r="1.5" fill="#00e87a" opacity="0.6"/>
        <circle cx="12" cy="22" r="1.5" fill="#00e87a" opacity="0.5"/>
        <circle cx="12" cy="28" r="1.5" fill="#00e87a" opacity="0.4"/>
        <circle cx="12" cy="34" r="1.5" fill="#00e87a" opacity="0.35"/>
        <circle cx="12" cy="40" r="1.5" fill="#00e87a" opacity="0.25"/>
      </svg>
    ),
  },
  {
    num: '04', title: 'Feedback Capture for Model Improvement',
    body: 'Corrections and rejections should feed back into the AI — but only when structured correctly. We build feedback loops that turn human oversight into continuous model improvement.',
    pills: ['Structured correction forms', 'Confidence calibration', 'RLHF data pipeline', 'Fine-tune dataset export'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <path d="M26 8 C36 8 44 16 44 26 C44 36 36 44 26 44 C16 44 8 36 8 26 C8 20 11 14 16 10" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6"/>
        <path d="M13 6 L16 10 L12 13" stroke="#00e87a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/>
        <circle cx="26" cy="26" r="7" stroke="#00e87a" strokeWidth="1.1" opacity="0.5"/>
        <path d="M22 26 L25 29 L30 23" stroke="#00e87a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
      </svg>
    ),
  },
];

function WhatWeSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="WHAT WE BUILD" />
        <div style={{ overflow: 'hidden', marginBottom: 10 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Interfaces that make human oversight fast, not painful.
            </h2>
          </RevealClip>
        </div>
        <FadeUp delay={0.16} style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, maxWidth: 560, margin: '12px 0 0' }}>
            The bottleneck in most AI workflows is the human step — not because humans are slow, but because the interfaces are badly designed. We fix that.
          </p>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {BUILDS.map((b, i) => (
            <FadeUp key={i} delay={0.08 + i * 0.09}>
              <div className="hitl-card" style={{ padding: '28px', borderRadius: 16, background: 'var(--bg-surface)' }}>
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
                    <span key={pi} className="hitl-pill" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 10px', borderRadius: 100, border: '1px solid rgba(0,232,122,0.15)', color: 'var(--text-tertiary)' }}>{p}</span>
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

/* ═══ USE CASES ══════════════════════════════════════════════ */
const USE_CASES = [
  { domain: 'Legal & Contracts', example: 'AI drafts clause summaries → lawyer reviews & approves before client delivery', risk: 'High' },
  { domain: 'Finance & Credit', example: 'Model scores loan application → underwriter reviews anomalies before decision', risk: 'High' },
  { domain: 'Healthcare', example: 'AI flags imaging anomaly → radiologist validates before report is issued', risk: 'Critical' },
  { domain: 'HR & Hiring', example: 'AI shortlists candidates → recruiter reviews before rejections are sent', risk: 'Medium' },
  { domain: 'Content Moderation', example: 'Classifier flags content → human moderator reviews borderline cases', risk: 'Medium' },
  { domain: 'Supply Chain', example: 'AI recommends reorder quantities → procurement approves unusual spikes', risk: 'Medium' },
];

function UseCasesSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="WHERE IT'S NEEDED" />
        <div style={{ overflow: 'hidden', marginBottom: 48 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              High-stakes AI decisions across domains.
            </h2>
          </RevealClip>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {USE_CASES.map((u, i) => (
            <FadeUp key={i} delay={0.06 + i * 0.08}>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 80px', gap: '0 32px', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-primary)', opacity: 0.7 }}>{u.domain}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{u.example}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: u.risk === 'Critical' ? '#ef4444' : u.risk === 'High' ? '#f59e0b' : 'var(--text-tertiary)', opacity: 0.75, textAlign: 'right' }}>{u.risk}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ DESIGN PRINCIPLES ══════════════════════════════════════ */
const PRINCIPLES = [
  { title: 'Context first', desc: 'Reviewers see everything they need to decide — not just the output. Model confidence, source data, similar past cases.' },
  { title: 'Friction by design', desc: 'High-stakes actions require deliberate confirmation. Low-stakes actions should be one click. Friction is calibrated to consequence.' },
  { title: 'Decision, not data entry', desc: 'Reviewers make judgements. They don\'t fill in forms. The interface captures structured data from natural decisions.' },
  { title: 'Speed matters', desc: 'HITL fails when it\'s slower than doing it manually. Keyboard shortcuts, batch review, and smart pre-fills are non-negotiable.' },
];

function PrinciplesSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="DESIGN PRINCIPLES" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 80px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
                  The interface is part of the AI system.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.18}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '16px 0 0', maxWidth: 400 }}>
                Most teams design AI systems and bolt on a review UI as an afterthought. We treat the human interface as a first-class engineering concern.
              </p>
            </FadeUp>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PRINCIPLES.map((p, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.09}>
                <div className="hitl-step" style={{ padding: '20px 22px', borderRadius: 14, background: 'var(--bg-surface)' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', margin: '0 0 8px' }}>{p.title}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7, opacity: 0.88 }}>{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
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
                    Deploying AI where the stakes are high?
                  </h2>
                </RevealClip>
              </div>
              <FadeUp delay={0.16}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7, maxWidth: 440 }}>
                  Tell us your use case and your compliance requirements. We'll design a HITL architecture that keeps your team in control without slowing them down.
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.22}>
              <a href="#contact" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#000', background: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '13px 32px', borderRadius: 8, textDecoration: 'none', display: 'inline-block', flexShrink: 0, transition: 'background 0.22s,color 0.22s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#000'; }}
              >Design your oversight system →</a>
            </FadeUp>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export function HITLDesignPage() {
  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <style>{STYLES}</style>
      <HeroSection />
      <WhySection />
      <Divider />
      <WhatWeSection />
      <Divider />
      <UseCasesSection />
      <Divider />
      <PrinciplesSection />
      <CTASection />
    </div>
  );
}