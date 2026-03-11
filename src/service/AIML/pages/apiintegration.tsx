
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const STYLES = `
  .api-card {
    transition: transform 0.28s cubic-bezier(0.16,1,0.3,1), border-color 0.28s, background 0.28s;
    border: 1px solid rgba(255,255,255,0.05);
    position: relative;
    overflow: hidden;
  }
  .api-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 0;
    background: linear-gradient(180deg, rgba(0,232,122,0.07), transparent);
    transition: width 0.32s cubic-bezier(0.16,1,0.3,1);
  }
  .api-card:hover::before { width: 100%; }
  .api-card:hover {
    transform: translateY(-5px);
    border-color: rgba(0,232,122,0.16);
  }

  .api-row {
    transition: padding-left 0.22s, background 0.22s;
    border-radius: 8px;
    cursor: default;
  }
  .api-row:hover { padding-left: 8px; background: rgba(0,232,122,0.04); }

  .api-pillar {
    transition: transform 0.26s cubic-bezier(0.16,1,0.3,1), border-color 0.26s;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .api-pillar:hover { transform: translateX(6px); border-color: rgba(0,232,122,0.2); }

  .api-tech-chip {
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .api-tech-chip:hover {
    background: rgba(0,232,122,0.1);
    color: var(--accent-primary);
    border-color: rgba(0,232,122,0.3);
  }
`;

/* ─── Helpers ─────────────────────────────────────────────────── */
function RevealClip({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
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

function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
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

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
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
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(0,232,122,0.3),transparent)' }} />
      </div>
    </RevealClip>
  );
}

function Divider() {
  return <FadeIn><div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '80px 0' }} /></FadeIn>;
}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
function HeroSection() {
  return (
    <section style={{ padding: '100px 32px 80px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <RevealClip delay={0} style={{ marginBottom: 20 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '5px 14px', borderRadius: 100, border: '1px solid rgba(0,232,122,0.2)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.8 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent-primary)', opacity: 0.85 }}>ENTERPRISE INTEGRATION</span>
          </div>
        </RevealClip>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 60px', alignItems: 'center' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 6 }}>
              <RevealClip delay={0.08}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px,5vw,70px)', color: 'var(--text-primary)', lineHeight: 1.02, margin: 0 }}>
                  API-led Integration
                </h1>
              </RevealClip>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 28 }}>
              <RevealClip delay={0.16}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px,5vw,70px)', color: 'var(--accent-primary)', lineHeight: 1.02, margin: 0 }}>
                  Ecosystems.
                </h1>
              </RevealClip>
            </div>
            <FadeUp delay={0.26}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0 0 32px' }}>
                Secure, unified data layers and interoperability across ERP, CRM, finance and third-party systems — eliminating silos and enabling real-time enterprise visibility.
              </p>
            </FadeUp>
            <FadeUp delay={0.36}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                {['REST & GraphQL', 'ERP / CRM connectors', 'Real-time data fabric', 'Event-driven pipelines'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.55 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Hero SVG — integration topology */}
          <FadeIn delay={0.32}>
            <svg viewBox="0 0 320 240" fill="none" style={{ width: '100%', maxWidth: 360 }}>
              {/* Central hub */}
              <circle cx="160" cy="120" r="28" stroke="#00e87a" strokeWidth="1.5" opacity="0.8"/>
              <circle cx="160" cy="120" r="18" stroke="#00e87a" strokeWidth="1" opacity="0.4"/>
              <circle cx="160" cy="120" r="5" fill="#00e87a" opacity="0.8"/>
              <text x="160" y="124" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.6">API</text>

              {/* Nodes */}
              {[
                { cx: 60,  cy: 50,  label: 'ERP' },
                { cx: 260, cy: 50,  label: 'CRM' },
                { cx: 40,  cy: 140, label: 'Finance' },
                { cx: 280, cy: 140, label: 'Data\nWH' },
                { cx: 60,  cy: 210, label: '3rd\nParty' },
                { cx: 260, cy: 210, label: 'Mobile' },
              ].map((n, i) => (
                <g key={i}>
                  <rect x={n.cx - 26} y={n.cy - 16} width={52} height={32} rx={5} stroke="#00e87a" strokeWidth={1.1} opacity={0.45}/>
                  <text x={n.cx} y={n.cy + (n.label.includes('\n') ? -2 : 5)} textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.55">
                    {n.label.split('\n').map((l, li) => (
                      <tspan key={li} x={n.cx} dy={li === 0 ? 0 : 9}>{l}</tspan>
                    ))}
                  </text>
                  <line
                    x1={n.cx} y1={n.cy + (n.cy < 120 ? 16 : -16)}
                    x2={160} y2={n.cy < 120 ? 93 : 147}
                    stroke="#00e87a" strokeWidth="0.8" opacity="0.22" strokeDasharray="3 3"
                  />
                  <circle cx={n.cx} cy={n.cy} r="3" fill="#00e87a" opacity="0.3"/>
                </g>
              ))}

              {/* Flow dots on lines */}
              {[55, 75, 95].map(cx => (
                <circle key={cx} cx={cx} cy={Math.round(50 + (120 - 50) * ((cx - 60) / 100))} r={2} fill="#00e87a" opacity={0.5}/>
              ))}
              <text x="160" y="225" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.3">Unified integration layer</text>
            </svg>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   THE PROBLEM
═══════════════════════════════════════ */
const PAINS = [
  { icon: '🗃', head: 'Data locked in silos', body: 'ERP, CRM, finance and ops run on separate systems with no shared truth. Decisions are made on stale exports.' },
  { icon: '🔌', head: 'Point-to-point spaghetti', body: 'Custom integrations built one at a time. Every new system adds 3 new scripts that break when either side updates.' },
  { icon: '⏱', head: 'Lag kills decisions', body: 'Batch overnight syncs mean leadership is always working with yesterday\'s data. Real-time is not optional anymore.' },
  { icon: '🧩', head: 'Vendor lock-in', body: 'Proprietary middleware that can\'t be extended, audited, or moved. You\'re at the vendor\'s roadmap mercy.' },
  { icon: '🚫', head: 'No single source of truth', body: 'The same entity — a customer, an order, an invoice — exists with different values across four systems.' },
  { icon: '📋', head: 'Compliance blind spots', body: 'When data flows are undocumented and uncontrolled, audits become nightmares and breaches go undetected.' },
];

function ProblemSection() {
  return (
    <section style={{ padding: '100px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="THE PROBLEM" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 80px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3.2vw,44px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
                  Your systems don't talk to each other — and it's costing you.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.18}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '18px 0 0' }}>
                Most enterprises run 20–40 software systems. Only a fraction are properly connected. The rest generate a silent tax: duplicated effort, bad decisions, and missed opportunity.
              </p>
            </FadeUp>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {PAINS.map((p, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.07}>
                <div className="api-row" style={{ display: 'flex', gap: 14, padding: '12px 10px' }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', margin: '0 0 2px' }}>{p.head}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65, opacity: 0.82 }}>{p.body}</p>
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
   WHAT WE BUILD
═══════════════════════════════════════ */
const SERVICES = [
  {
    num: '01', title: 'API Layer Design & Engineering',
    body: 'We design and build the unified API layer that sits between your systems and your consumers — RESTful, GraphQL, or event-driven, documented and versioned from day one.',
    tags: ['REST / GraphQL', 'OpenAPI spec', 'API versioning', 'Rate limiting & quotas'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <rect x="4" y="16" width="44" height="20" rx="5" stroke="#00e87a" strokeWidth="1.2" opacity="0.55"/>
        <line x1="14" y1="26" x2="38" y2="26" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
        <path d="M24 21 L28 26 L24 31" stroke="#00e87a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/>
        <line x1="4" y1="10" x2="14" y2="16" stroke="#00e87a" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2"/>
        <line x1="48" y1="10" x2="38" y2="16" stroke="#00e87a" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2"/>
        <line x1="4" y1="42" x2="14" y2="36" stroke="#00e87a" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2"/>
        <line x1="48" y1="42" x2="38" y2="36" stroke="#00e87a" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    num: '02', title: 'ERP & CRM Integration',
    body: 'Deep, bidirectional integrations with SAP, Oracle, Salesforce, HubSpot, Frappe and others. We handle data mapping, conflict resolution, and schema evolution so you don\'t have to.',
    tags: ['SAP', 'Salesforce', 'HubSpot', 'Frappe / ERPNext', 'Oracle'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <rect x="4" y="8" width="18" height="14" rx="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.6"/>
        <rect x="30" y="8" width="18" height="14" rx="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.6"/>
        <rect x="4" y="30" width="18" height="14" rx="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.5"/>
        <rect x="30" y="30" width="18" height="14" rx="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.5"/>
        <circle cx="26" cy="26" r="7" stroke="#00e87a" strokeWidth="1.3" opacity="0.75"/>
        <circle cx="26" cy="26" r="3" fill="#00e87a" opacity="0.6"/>
        <line x1="22" y1="22" x2="19" y2="19" stroke="#00e87a" strokeWidth="0.8" opacity="0.35"/>
        <line x1="30" y1="22" x2="33" y2="19" stroke="#00e87a" strokeWidth="0.8" opacity="0.35"/>
        <line x1="22" y1="30" x2="19" y2="33" stroke="#00e87a" strokeWidth="0.8" opacity="0.35"/>
        <line x1="30" y1="30" x2="33" y2="33" stroke="#00e87a" strokeWidth="0.8" opacity="0.35"/>
      </svg>
    ),
  },
  {
    num: '03', title: 'Real-time Event Streaming',
    body: 'Move from batch syncs to event-driven architectures. Kafka, Kinesis or Pub/Sub pipelines that propagate changes across systems in milliseconds — not overnight.',
    tags: ['Apache Kafka', 'AWS Kinesis', 'Webhooks', 'Change data capture', 'Pub/Sub'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <path d="M6 26 L14 26 L18 14 L22 38 L26 22 L30 30 L34 26 L46 26" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" fill="none"/>
        <circle cx="6" cy="26" r="2.5" fill="#00e87a" opacity="0.5"/>
        <circle cx="46" cy="26" r="2.5" fill="#00e87a" opacity="0.5"/>
        <line x1="6" y1="44" x2="46" y2="44" stroke="#00e87a" strokeWidth="0.7" opacity="0.2"/>
        <line x1="6" y1="8" x2="6" y2="44" stroke="#00e87a" strokeWidth="0.7" opacity="0.2"/>
      </svg>
    ),
  },
  {
    num: '04', title: 'Data Gateway & Governance',
    body: 'A controlled entry point for all data movement: authentication, authorisation, rate limiting, schema validation, transformation and logging — before any payload reaches its destination.',
    tags: ['API gateway', 'Data validation', 'Transformation layer', 'Audit logging', 'PII masking'],
    svg: (
      <svg viewBox="0 0 52 52" fill="none" width={44} height={44}>
        <rect x="18" y="8" width="16" height="36" rx="4" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/>
        <path d="M10 20 L18 20" stroke="#00e87a" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/>
        <path d="M10 26 L18 26" stroke="#00e87a" strokeWidth="1.1" strokeLinecap="round" opacity="0.35"/>
        <path d="M10 32 L18 32" stroke="#00e87a" strokeWidth="1.1" strokeLinecap="round" opacity="0.3"/>
        <path d="M34 20 L42 20" stroke="#00e87a" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/>
        <path d="M34 26 L42 26" stroke="#00e87a" strokeWidth="1.1" strokeLinecap="round" opacity="0.35"/>
        <path d="M34 32 L42 32" stroke="#00e87a" strokeWidth="1.1" strokeLinecap="round" opacity="0.3"/>
        <circle cx="26" cy="26" r="5" stroke="#00e87a" strokeWidth="1.2" opacity="0.6"/>
        <circle cx="26" cy="26" r="2" fill="#00e87a" opacity="0.8"/>
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
              Four disciplines. One coherent data fabric.
            </h2>
          </RevealClip>
        </div>
        <FadeUp delay={0.16} style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, maxWidth: 560, margin: '12px 0 0' }}>
            We don't bolt connectors together and call it done. We engineer a coherent integration architecture that can grow without becoming unmaintainable.
          </p>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {SERVICES.map((s, i) => (
            <FadeUp key={i} delay={0.08 + i * 0.09}>
              <div className="api-card" style={{ padding: '28px', borderRadius: 16, background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-primary)', opacity: 0.6, letterSpacing: '0.12em', display: 'block', marginBottom: 10 }}>{s.num}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', margin: 0, lineHeight: 1.25, maxWidth: 200 }}>{s.title}</h3>
                  </div>
                  <div style={{ opacity: 0.6, flexShrink: 0 }}>{s.svg}</div>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.75, margin: '0 0 20px' }}>{s.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.tags.map((t, ti) => (
                    <span key={ti} className="api-tech-chip" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 10px', borderRadius: 100, border: '1px solid rgba(0,232,122,0.15)', color: 'var(--text-tertiary)', cursor: 'default' }}>{t}</span>
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
   INTEGRATION PATTERNS
═══════════════════════════════════════ */
const PATTERNS = [
  { label: 'Request/Response', desc: 'Synchronous REST or GraphQL for query-heavy workflows needing immediate responses.' },
  { label: 'Event-Driven', desc: 'Async publish-subscribe for decoupled, high-throughput systems that scale independently.' },
  { label: 'Batch Pipelines', desc: 'Scheduled ETL for large-volume data migrations, reports and warehouse loads.' },
  { label: 'Change Data Capture', desc: 'Stream database-level changes in real time without polling — zero lag, low overhead.' },
  { label: 'Webhook Mesh', desc: 'Outbound event notifications to third-party consumers with retry logic and delivery guarantees.' },
];

function PatternsSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="INTEGRATION PATTERNS" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 80px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
                  Right pattern for the right flow.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.17}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '16px 0 0', maxWidth: 400 }}>
                We choose integration patterns based on your latency, volume and reliability requirements — not what's easiest for us to build.
              </p>
            </FadeUp>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {PATTERNS.map((p, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.08}>
                <div className="api-pillar" style={{ padding: '16px 20px', borderRadius: 12, background: 'var(--bg-surface)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(0,232,122,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--accent-primary)', opacity: 0.8 }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', margin: '0 0 4px' }}>{p.label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65, opacity: 0.85 }}>{p.desc}</p>
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
   OUTCOMES
═══════════════════════════════════════ */
const OUTCOMES = [
  { val: 'Single', label: 'Source of truth', sub: 'One authoritative record across all connected systems' },
  { val: 'Real-time', label: 'Data propagation', sub: 'Milliseconds, not overnight batch windows' },
  { val: 'Zero', label: 'Manual syncs', sub: 'Eliminating spreadsheet exports and copy-paste ops' },
  { val: 'Full', label: 'Audit trail', sub: 'Every data movement logged, traceable and compliant' },
];

function OutcomesSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="OUTCOMES" />
        <div style={{ overflow: 'hidden', marginBottom: 52 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              What a connected enterprise looks like.
            </h2>
          </RevealClip>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {OUTCOMES.map((o, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }} style={{ padding: '28px 22px', borderRadius: 16, background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color: 'var(--accent-primary)', margin: '0 0 6px', lineHeight: 1 }}>{o.val}</p>
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
   CTA
═══════════════════════════════════════ */
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
                    Map your integration landscape with us.
                  </h2>
                </RevealClip>
              </div>
              <FadeUp delay={0.16}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7, maxWidth: 440 }}>
                  Tell us your systems, your pain points, and what decisions you're trying to make faster. We'll return with an integration architecture proposal.
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.22}>
              <a href="#contact" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#000', background: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '13px 32px', borderRadius: 8, textDecoration: 'none', display: 'inline-block', flexShrink: 0, transition: 'background 0.22s,color 0.22s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#000'; }}
              >Start the integration audit →</a>
            </FadeUp>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export function APIIntegrationPage() {
  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <style>{STYLES}</style>
      <HeroSection />
      <ProblemSection />
      <Divider />
      <WhatWeBuildSection />
      <Divider />
      <PatternsSection />
      <Divider />
      <OutcomesSection />
      <CTASection />
    </div>
  );
}