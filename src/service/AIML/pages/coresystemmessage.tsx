import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── CSS ─────────────────────────────────────────────────────── */
const STYLES = `
  /* Underline-slide hover */
  .mod-nav-link {
    position: relative;
    transition: color 0.22s;
    text-decoration: none;
  }
  .mod-nav-link::after {
    content: '';
    position: absolute;
    left: 0; bottom: -2px;
    width: 0; height: 1px;
    background: var(--accent-primary);
    transition: width 0.28s cubic-bezier(0.16,1,0.3,1);
  }
  .mod-nav-link:hover::after { width: 100%; }
  .mod-nav-link:hover { color: var(--accent-primary); }

  /* Card lift hover */
  .mod-card {
    transition: transform 0.28s cubic-bezier(0.16,1,0.3,1),
                border-color 0.28s,
                background 0.28s,
                box-shadow 0.28s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .mod-card:hover {
    transform: translateY(-6px);
    border-color: rgba(10,60,35,0.35);
    background: rgba(10,60,35,0.04) !important;
    box-shadow:
      0 10px 28px rgba(10,60,35,0.12),
      0 3px 8px rgba(10,60,35,0.07),
      inset 0 1px 0 rgba(255,255,255,0.6);
  }

  /* Problem/solution row hover */
  .mod-row {
    transition: background 0.22s, padding-left 0.22s, border-radius 0.22s;
    padding-left: 0;
    cursor: default;
    border-radius: 8px;
  }
  .mod-row:hover {
    background: rgba(255,255,255,0.025);
    padding-left: 6px;
  }

  /* Approach step hover */
  .mod-step {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1),
                border-color 0.25s,
                box-shadow 0.25s,
                background 0.25s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .mod-step:hover {
    transform: translateX(6px);
    border-color: rgba(10,60,35,0.35);
    background: rgba(255,255,255,0.02) !important;
    box-shadow:
      0 4px 12px rgba(10,60,35,0.09),
      0 1px 4px rgba(10,60,35,0.05),
      inset 0 1px 0 rgba(255,255,255,0.5);
  }

  /* Outcome card hover */
  .mod-outcome {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1),
                border-color 0.25s,
                box-shadow 0.25s,
                background 0.25s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .mod-outcome:hover {
    transform: translateY(-5px);
    border-color: rgba(10,60,35,0.35);
    background: rgba(10,60,35,0.04) !important;
    box-shadow:
      0 8px 20px rgba(10,60,35,0.1),
      0 2px 6px rgba(10,60,35,0.06),
      inset 0 1px 0 rgba(255,255,255,0.6);
  }

  /* Outcome pill hover */
  .mod-pill {
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    border: 1px solid rgba(0,232,122,0.16);
    cursor: default;
  }
  .mod-pill:hover {
    background: rgba(77,232,168,0.08);
    border-color: rgba(77,232,168,0.3);
    color: #c8f0dc;
  }

  /* Tech group card hover */
  .mod-tech-card {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1),
                border-color 0.25s,
                box-shadow 0.25s,
                background 0.25s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .mod-tech-card:hover {
    transform: translateY(-4px);
    border-color: rgba(10,60,35,0.3);
    background: rgba(10,60,35,0.04) !important;
    box-shadow:
      0 6px 16px rgba(10,60,35,0.09),
      0 1px 5px rgba(10,60,35,0.06),
      inset 0 1px 0 rgba(255,255,255,0.5);
  }

  /* Fit check row */
  .mod-fit-row {
    transition: background 0.18s, padding-left 0.2s;
    padding-left: 0;
    border-radius: 6px;
    border-bottom: 1px solid rgba(10,60,35,0.12);
  }
  .mod-fit-row:hover {
    background: rgba(10,60,35,0.03);
    padding-left: 6px;
  }

  /* CTA block hover */
  .mod-cta-block {
    transition: border-color 0.28s, box-shadow 0.28s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .mod-cta-block:hover {
    border-color: rgba(10,60,35,0.3);
    box-shadow:
      0 8px 24px rgba(10,60,35,0.1),
      0 2px 8px rgba(0,0,0,0.12),
      inset 0 1px 0 rgba(255,255,255,0.5);
  }

  /* CTA button */
  .mod-cta-btn {
    transition: background 0.22s, color 0.22s, transform 0.22s, box-shadow 0.22s;
  }
  .mod-cta-btn:hover {
    box-shadow: 0 4px 12px rgba(10,60,35,0.09), 0 1px 4px rgba(10,60,35,0.06);
  }
`;

/* ─── Reveal helpers ──────────────────────────────────────────── */
function RevealClip({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.78, delay, ease: EASE }}
      style={style}
    >{children}</motion.div>
  );
}

function FadeUp({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.62, delay, ease: EASE }}
      style={style}
    >{children}</motion.div>
  );
}

function FadeIn({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={style}
    >{children}</motion.div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <RevealClip delay={0}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-primary)', letterSpacing: '0.22em' }}>{text}</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(0,232,122,0.3), transparent)' }} />
      </div>
    </RevealClip>
  );
}

function Divider({ delay = 0 }: { delay?: number }) {
  return (
    <FadeIn delay={delay}>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '80px 0' }} />
    </FadeIn>
  );
}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
function HeroSection() {
  return (
    <section style={{ padding: '100px 32px 80px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <RevealClip delay={0} style={{ marginBottom: 20 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '5px 14px', borderRadius: 100, border: '1px solid rgba(0,232,122,0.2)', marginBottom: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.8 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent-primary)', opacity: 0.85 }}>SOFTWARE ENGINEERING</span>
          </div>
        </RevealClip>
        <div style={{ overflow: 'hidden', marginBottom: 6 }}>
          <RevealClip delay={0.08}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px,5.5vw,76px)', color: 'var(--text-primary)', lineHeight: 1.02, margin: 0 }}>Core Systems</h1>
          </RevealClip>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 28 }}>
          <RevealClip delay={0.16}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px,5.5vw,76px)', color: 'var(--accent-primary)', lineHeight: 1.02, margin: 0 }}>Modernisation.</h1>
          </RevealClip>
        </div>
        <FadeUp delay={0.28}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 580, margin: '0 0 36px' }}>
            Refactoring monolithic, legacy applications into modern enterprise-grade software — without stopping the business or gambling on big-bang rewrites.
          </p>
        </FadeUp>
        <FadeUp delay={0.38}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
            {['Strangler fig migrations', 'Microservices decomposition', 'Cloud-native re-platforming', 'Zero-downtime'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.55 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>{t}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 1 — THE PROBLEM
═══════════════════════════════════════ */
const PAINS = [
  { icon: '⚡', head: 'Velocity collapse', body: 'Feature delivery grinds to weeks. Every change requires touching a dozen fragile modules.' },
  { icon: '⚠', head: 'Runaway ops cost', body: 'Legacy infra demands costly specialists, manual deployments, and bloated hosting bills.' },
  { icon: '🔗', head: 'Integration debt', body: 'APIs bolted onto 15-year-old schemas. Third-party connections break constantly.' },
  { icon: '🔒', head: 'Compliance risk', body: 'Monoliths resist audit trails, RBAC, and modern data-residency rules.' },
  { icon: '📉', head: 'Recruitment drag', body: 'Nobody wants to work on COBOL or unmaintained PHP. Talent moves on.' },
  { icon: '🪨', head: 'Scaling ceiling', body: 'Traffic spikes crash the whole system. You can\'t scale one bottleneck without scaling everything.' },
];

function ProblemSection() {
  return (
    <section style={{ padding: '100px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="THE PROBLEM" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px 80px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px,3.5vw,46px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
                  Your legacy system is quietly strangling the business.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.18}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '18px 0 0' }}>
                Most engineering teams don't fail because of bad engineers. They fail because the foundation was never designed for where the business is today — or where it needs to go tomorrow.
              </p>
            </FadeUp>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {PAINS.map((p, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.07}>
                <div className="mod-row" style={{ display: 'flex', gap: 14, padding: '12px 10px' }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', margin: '0 0 2px' }}>{p.head}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65, opacity: 0.8 }}>{p.body}</p>
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

/* ═══════════════════════════════════════
   SECTION 2 — WHAT WE DO
═══════════════════════════════════════ */
const SERVICES = [
  {
    num: '01', title: 'Legacy Assessment & Roadmapping',
    body: 'We start with a deep audit of your codebase, architecture, data flows and dependencies. No assumptions — just a clear map of what you have, what it costs, and the ranked path forward.',
    deliverables: ['Architecture audit', 'Dependency graph', 'Risk register', 'Modernisation roadmap'],
    svg: (<svg viewBox="0 0 56 56" fill="none" width={48} height={48}><rect x="4" y="8" width="48" height="36" rx="4" stroke="#1a6e42" strokeWidth="1.2" opacity="0.4"/><line x1="4" y1="18" x2="52" y2="18" stroke="#1a6e42" strokeWidth="0.7" opacity="0.2"/><line x1="18" y1="8" x2="18" y2="44" stroke="#1a6e42" strokeWidth="0.7" opacity="0.2"/><circle cx="11" cy="13" r="2.5" fill="#1a6e42" opacity="0.6"/><circle cx="20" cy="13" r="2.5" fill="#1a6e42" opacity="0.3"/><rect x="22" y="22" width="22" height="6" rx="2" fill="#1a6e42" opacity="0.35"/><rect x="22" y="31" width="14" height="6" rx="2" fill="#1a6e42" opacity="0.22"/><path d="M8 26 L8 38 L16 38" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" fill="none"/><path d="M8 30 L14 36" stroke="#1a6e42" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/><line x1="22" y1="48" x2="34" y2="48" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/></svg>),
  },
  {
    num: '02', title: 'Strangler Fig & Incremental Migration',
    body: 'We don\'t do risky big-bang rewrites. Using the strangler fig pattern, we extract and replace modules incrementally — so your system stays live and revenue-generating throughout.',
    deliverables: ['Module extraction plan', 'API façade layer', 'Parallel-run strategy', 'Rollback guardrails'],
    svg: (<svg viewBox="0 0 56 56" fill="none" width={48} height={48}><rect x="6" y="14" width="20" height="28" rx="3" stroke="#1a6e42" strokeWidth="1.2" opacity="0.4"/><rect x="30" y="14" width="20" height="28" rx="3" stroke="#1a6e42" strokeWidth="1.3" opacity="0.7"/><path d="M26 28 L30 28" stroke="#1a6e42" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/><path d="M27 24 L30 28 L27 32" stroke="#1a6e42" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/><line x1="34" y1="22" x2="46" y2="22" stroke="#1a6e42" strokeWidth="0.8" opacity="0.5"/><line x1="34" y1="27" x2="46" y2="27" stroke="#1a6e42" strokeWidth="0.8" opacity="0.4"/><line x1="34" y1="32" x2="42" y2="32" stroke="#1a6e42" strokeWidth="0.8" opacity="0.35"/><line x1="34" y1="37" x2="46" y2="37" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3"/><line x1="10" y1="22" x2="22" y2="22" stroke="#1a6e42" strokeWidth="0.8" opacity="0.25" strokeDasharray="2 2"/><line x1="10" y1="27" x2="22" y2="27" stroke="#1a6e42" strokeWidth="0.8" opacity="0.2" strokeDasharray="2 2"/><line x1="10" y1="32" x2="22" y2="32" stroke="#1a6e42" strokeWidth="0.8" opacity="0.2" strokeDasharray="2 2"/></svg>),
  },
  {
    num: '03', title: 'Microservices & Domain Decomposition',
    body: 'We break your monolith along domain boundaries — not arbitrary technical lines. Each bounded context becomes an independently deployable, testable service with clean contracts.',
    deliverables: ['Domain event mapping', 'Service mesh design', 'API contract specs', 'Data ownership model'],
    svg: (<svg viewBox="0 0 56 56" fill="none" width={48} height={48}><circle cx="28" cy="28" r="6" stroke="#1a6e42" strokeWidth="1.3" opacity="0.8"/><circle cx="28" cy="10" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><circle cx="44" cy="20" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><circle cx="44" cy="38" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><circle cx="28" cy="46" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><circle cx="12" cy="38" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><circle cx="12" cy="20" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><line x1="28" y1="15" x2="28" y2="22" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="39" y1="22" x2="34" y2="25" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="39" y1="36" x2="34" y2="31" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="28" y1="41" x2="28" y2="34" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="17" y1="36" x2="22" y2="31" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="17" y1="22" x2="22" y2="25" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/></svg>),
  },
  {
    num: '04', title: 'Cloud-Native Re-platforming',
    body: 'Lift-and-shift gives you cloud bills, not cloud benefits. We re-platform applications to take full advantage of managed services, autoscaling, observability and zero-downtime deploys.',
    deliverables: ['Cloud architecture design', 'IaC (Terraform/CDK)', 'CI/CD pipelines', 'Observability stack'],
    svg: (<svg viewBox="0 0 56 56" fill="none" width={48} height={48}><path d="M12 34 C12 26 20 20 28 22 C28 16 36 12 42 18 C48 18 52 24 50 30 L12 30 Z" stroke="#1a6e42" strokeWidth="1.3" fill="none" opacity="0.55"/><line x1="28" y1="34" x2="28" y2="46" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/><line x1="22" y1="40" x2="28" y2="46" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/><line x1="34" y1="40" x2="28" y2="46" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/><circle cx="20" cy="34" r="3" stroke="#1a6e42" strokeWidth="1" opacity="0.5"/><circle cx="36" cy="34" r="3" stroke="#1a6e42" strokeWidth="1" opacity="0.5"/><path d="M24 36 L32 36" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2"/></svg>),
  },
];

function WhatWeDoSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="WHAT WE DO" />
        <div style={{ overflow: 'hidden', marginBottom: 10 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px,3.5vw,46px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Modernisation that ships — not slides.
            </h2>
          </RevealClip>
        </div>
        <FadeUp delay={0.16} style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, maxWidth: 580, margin: 0 }}>
            Four disciplines. Each can stand alone, or combine into a full transformation programme.
          </p>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {SERVICES.map((s, i) => (
            <FadeUp key={i} delay={0.08 + i * 0.09}>
              <div className="mod-card" style={{ padding: '30px', borderRadius: 16, background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-primary)', letterSpacing: '0.14em', opacity: 0.65 }}>{s.num}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text-primary)', margin: 0, lineHeight: 1.25, maxWidth: 220 }}>{s.title}</h3>
                  </div>
                  <div style={{ opacity: 0.6, flexShrink: 0 }}>{s.svg}</div>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.75, margin: '0 0 22px' }}>{s.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.deliverables.map((d, di) => (
                    <span key={di} className="mod-pill" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 10px', borderRadius: 100, color: 'var(--text-tertiary)' }}>{d}</span>
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

/* ═══════════════════════════════════════
   SECTION 3 — OUR APPROACH
═══════════════════════════════════════ */
const STEPS = [
  { phase: 'Discover', duration: '1–2 wks', desc: 'Audit codebase, map dependencies, interview stakeholders. Produce a risk-ranked modernisation backlog.' },
  { phase: 'Design', duration: '1–2 wks', desc: 'Define target architecture, bounded contexts, data ownership, API contracts and migration sequence.' },
  { phase: 'Extract', duration: 'ongoing', desc: 'Build the strangler façade and start extracting high-value, low-risk modules first. CI/CD live from day one.' },
  { phase: 'Migrate', duration: 'ongoing', desc: 'Incrementally shift traffic to new services. Monitor, tune, harden. Legacy shrinks; new platform grows.' },
  { phase: 'Decommission', duration: 'milestone', desc: 'Old system retired cleanly. Docs, runbooks and knowledge transferred. Team trained on new stack.' },
];

function ApproachSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="OUR APPROACH" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 80px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.12, margin: 0 }}>
                  Zero-downtime. Revenue-safe. Incremental.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.17}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '16px 0 0', maxWidth: 440 }}>
                We treat your existing system as a going concern — not a problem to bulldoze. Every step keeps the lights on.
              </p>
            </FadeUp>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {STEPS.map((s, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.09}>
                <div className="mod-step" style={{ padding: '18px 20px', borderRadius: 12, background: 'var(--bg-surface)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(0,232,122,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, boxShadow: '0 1px 4px rgba(10,60,35,0.06)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-primary)', opacity: 0.8 }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{s.phase}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', opacity: 0.6 }}>{s.duration}</span>
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

/* ═══════════════════════════════════════
   SECTION 4 — TECHNOLOGY
═══════════════════════════════════════ */
const TECH_GROUPS = [
  { group: 'Languages', items: ['TypeScript', 'Python', 'Go', 'Rust', 'Java 21'] },
  { group: 'Runtimes & Frameworks', items: ['Node.js', 'FastAPI', 'Spring Boot', 'tRPC', 'gRPC'] },
  { group: 'Data', items: ['PostgreSQL', 'Redis', 'Kafka', 'Elasticsearch', 'ClickHouse'] },
  { group: 'Infrastructure', items: ['AWS / GCP / Azure', 'Kubernetes', 'Terraform', 'ArgoCD', 'Datadog'] },
];

function TechSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="TECHNOLOGY" />
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Stack-agnostic. Best-tool-for-the-job.
            </h2>
          </RevealClip>
        </div>
        <FadeUp delay={0.16} style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '14px 0 0', maxWidth: 520 }}>
            We work with what makes sense for your domain — not what we happen to prefer.
          </p>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {TECH_GROUPS.map((g, gi) => (
            <FadeUp key={gi} delay={0.08 + gi * 0.08}>
              <div className="mod-tech-card" style={{ padding: '24px 20px', borderRadius: 14, background: 'var(--bg-surface)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--accent-primary)', margin: '0 0 16px', opacity: 0.7 }}>{g.group.toUpperCase()}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {g.items.map((item, ii) => (
                    <FadeUp key={ii} delay={0.1 + gi * 0.08 + ii * 0.05}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.4, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-secondary)' }}>{item}</span>
                      </div>
                    </FadeUp>
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

/* ═══════════════════════════════════════
   SECTION 5 — OUTCOMES
═══════════════════════════════════════ */
const OUTCOMES = [
  { val: '3–10×', label: 'Release velocity', sub: 'from quarterly to weekly or daily deploys' },
  { val: '40–70%', label: 'Infra cost reduction', sub: 'via right-sizing, managed services, autoscaling' },
  { val: '< 1min', label: 'Deployment time', sub: 'vs. hours-long manual release windows' },
  { val: 'Zero', label: 'Big-bang rewrites', sub: 'incremental always — live system, live revenue' },
];

function OutcomesSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="OUTCOMES" />
        <div style={{ overflow: 'hidden', marginBottom: 56 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              What changes after modernisation.
            </h2>
          </RevealClip>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {OUTCOMES.map((o, i) => (
            <motion.div
              key={i}
              className="mod-outcome"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              style={{ padding: '28px 24px', borderRadius: 16, background: 'var(--bg-surface)' }}
            >
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px,3vw,40px)', color: 'var(--accent-primary)', margin: '0 0 6px', lineHeight: 1 }}>{o.val}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', margin: '0 0 8px' }}>{o.label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-tertiary)', margin: 0, lineHeight: 1.6, opacity: 0.75 }}>{o.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 6 — WHO THIS IS FOR
═══════════════════════════════════════ */
const FIT_ITEMS = [
  { yes: true,  text: 'You\'re running a monolith written 8+ years ago' },
  { yes: true,  text: 'Your engineers spend more time fixing than building' },
  { yes: true,  text: 'Feature requests pile up because the code is too brittle' },
  { yes: true,  text: 'Scaling means buying bigger servers, not smarter systems' },
  { yes: false, text: 'You need a full rewrite in 4 weeks with no disruption' },
  { yes: false, text: 'Your codebase was modern 18 months ago — just needs cleanup' },
];

function FitSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="IS THIS FOR YOU" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px 80px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>Good fit — and not.</h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.17}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '16px 0 0', maxWidth: 400 }}>
                We'd rather tell you we're not the right match than take on work that won't deliver the outcomes you need.
              </p>
            </FadeUp>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {FIT_ITEMS.map((f, i) => (
              <FadeUp key={i} delay={0.08 + i * 0.08}>
                <div className="mod-fit-row" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: f.yes ? 'var(--accent-primary)' : '#ef4444', opacity: f.yes ? 0.85 : 0.65, flexShrink: 0, marginTop: 1 }}>
                    {f.yes ? '✓' : '✗'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: f.yes ? 'var(--text-secondary)' : 'var(--text-tertiary)', lineHeight: 1.6, opacity: f.yes ? 1 : 0.6 }}>{f.text}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CTA
═══════════════════════════════════════ */
function CTASection() {
  return (
    <section style={{ padding: '0 32px 120px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeUp delay={0}>
          <div className="mod-cta-block" style={{ padding: '52px 56px', borderRadius: 20, background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <div style={{ overflow: 'hidden', marginBottom: 8 }}>
                <RevealClip delay={0.06}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px,2.5vw,34px)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
                    Ready to start the conversation?
                  </h2>
                </RevealClip>
              </div>
              <FadeUp delay={0.16}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7, maxWidth: 440 }}>
                  Share your stack and constraints. We'll scope a modernisation path in one working session — no commitment needed.
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.22}>
              <a
                href="#contact"
                className="mod-cta-btn"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: '#000', background: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '13px 32px', borderRadius: 8, textDecoration: 'none', display: 'inline-block', flexShrink: 0, transition: 'background 0.22s, color 0.22s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#000'; }}
              >Book a scoping call →</a>
            </FadeUp>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   EXPORT
═══════════════════════════════════════ */
export function CoreSystemsPage() {
  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <style>{STYLES}</style>
      <HeroSection />
      <ProblemSection />
      <Divider />
      <WhatWeDoSection />
      <Divider />
      <ApproachSection />
      <Divider />
      <TechSection />
      <Divider />
      <OutcomesSection />
      <Divider />
      <FitSection />
      <CTASection />

      <style>{`
        @media(max-width:760px){
          .mod-2col{grid-template-columns:1fr!important}
          .mod-4col{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:480px){
          .mod-4col{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
}