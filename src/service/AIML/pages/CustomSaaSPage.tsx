import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── CSS ─────────────────────────────────────────────────────── */
const STYLES = `
  /* Bracket-slide hover on cards */
  .saas-card {
    transition: transform 0.28s cubic-bezier(0.16,1,0.3,1),
                border-color 0.28s,
                background 0.28s;
    border: 1px solid rgba(255,255,255,0.05);
    position: relative;
  }
  .saas-card::before, .saas-card::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background: var(--accent-primary);
    transition: width 0.28s cubic-bezier(0.16,1,0.3,1);
    opacity: 0.55;
  }
  .saas-card::before { top: -1px; left: 0; }
  .saas-card::after  { bottom: -1px; right: 0; }
  .saas-card:hover::before,
  .saas-card:hover::after { width: 100%; }
  .saas-card:hover {
    transform: translateY(-5px);
    border-color: rgba(0,232,122,0.14);
  }

  /* Cross-fade + scale for toggle tabs */
  .saas-tab {
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.06);
  }
  .saas-tab.active {
    background: rgba(0,232,122,0.1);
    border-color: rgba(0,232,122,0.3);
    color: var(--accent-primary);
  }
  .saas-tab:not(.active):hover {
    border-color: rgba(255,255,255,0.12);
    color: var(--text-primary);
  }

  /* Checklist row */
  .saas-check-row {
    transition: padding-left 0.22s, background 0.22s;
    padding-left: 0;
    border-radius: 8px;
  }
  .saas-check-row:hover {
    padding-left: 8px;
    background: rgba(0,232,122,0.04);
  }

  /* Arch pillar hover */
  .saas-pillar {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, background 0.25s;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .saas-pillar:hover {
    transform: translateY(-8px);
    border-color: rgba(0,232,122,0.22);
    background: rgba(255,255,255,0.02) !important;
  }

  /* CTA button */
  .saas-cta-btn {
    transition: background 0.22s, color 0.22s, transform 0.22s;
  }
  .saas-cta-btn:hover {
    transform: translateX(4px);
  }
`;

/* ─── Helpers ─────────────────────────────────────────────────── */
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
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(0,232,122,0.3),transparent)' }} />
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '5px 14px', borderRadius: 100, border: '1px solid rgba(0,232,122,0.2)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.8 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent-primary)', opacity: 0.85 }}>PRODUCT ENGINEERING</span>
          </div>
        </RevealClip>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 64px', alignItems: 'end' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 6 }}>
              <RevealClip delay={0.08}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px,5.5vw,76px)', color: 'var(--text-primary)', lineHeight: 1.02, margin: 0 }}>
                  Custom SaaS
                </h1>
              </RevealClip>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 28 }}>
              <RevealClip delay={0.16}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px,5.5vw,76px)', color: 'var(--accent-primary)', lineHeight: 1.02, margin: 0 }}>
                  Development.
                </h1>
              </RevealClip>
            </div>
            <FadeUp delay={0.26}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
                Multi-tenant platforms designed for your exact domain — secure, compliant, and built to scale from launch to enterprise.
              </p>
            </FadeUp>
          </div>

          {/* Hero SVG — multi-tenant visual */}
          <FadeIn delay={0.32}>
            <svg viewBox="0 0 340 220" fill="none" style={{ width: '100%', maxWidth: 360 }}>
              {/* Central platform */}
              <rect x="120" y="80" width="100" height="60" rx="8" stroke="#00e87a" strokeWidth="1.4" opacity="0.7"/>
              <line x1="130" y1="96" x2="210" y2="96" stroke="#00e87a" strokeWidth="0.8" opacity="0.35"/>
              <line x1="130" y1="106" x2="195" y2="106" stroke="#00e87a" strokeWidth="0.8" opacity="0.25"/>
              <line x1="130" y1="116" x2="200" y2="116" stroke="#00e87a" strokeWidth="0.8" opacity="0.2"/>
              <text x="170" y="92" textAnchor="middle" fill="#00e87a" fontSize="7" fontFamily="monospace" opacity="0.65">PLATFORM</text>

              {/* Tenant A */}
              <rect x="16" y="28" width="72" height="44" rx="6" stroke="#00e87a" strokeWidth="1.1" opacity="0.45"/>
              <text x="52" y="48" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.5">Tenant A</text>
              <line x1="52" y1="52" x2="52" y2="60" stroke="#00e87a" strokeWidth="0.6" opacity="0.3"/>
              <line x1="52" y1="60" x2="120" y2="98" stroke="#00e87a" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3"/>

              {/* Tenant B */}
              <rect x="252" y="28" width="72" height="44" rx="6" stroke="#00e87a" strokeWidth="1.1" opacity="0.45"/>
              <text x="288" y="48" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.5">Tenant B</text>
              <line x1="288" y1="52" x2="288" y2="60" stroke="#00e87a" strokeWidth="0.6" opacity="0.3"/>
              <line x1="288" y1="60" x2="220" y2="98" stroke="#00e87a" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3"/>

              {/* Tenant C */}
              <rect x="16" y="148" width="72" height="44" rx="6" stroke="#00e87a" strokeWidth="1.1" opacity="0.45"/>
              <text x="52" y="168" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.5">Tenant C</text>
              <line x1="52" y1="148" x2="52" y2="140" stroke="#00e87a" strokeWidth="0.6" opacity="0.3"/>
              <line x1="52" y1="140" x2="120" y2="122" stroke="#00e87a" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3"/>

              {/* Tenant D */}
              <rect x="252" y="148" width="72" height="44" rx="6" stroke="#00e87a" strokeWidth="1.1" opacity="0.45"/>
              <text x="288" y="168" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.5">Tenant D</text>
              <line x1="288" y1="148" x2="288" y2="140" stroke="#00e87a" strokeWidth="0.6" opacity="0.3"/>
              <line x1="288" y1="140" x2="220" y2="122" stroke="#00e87a" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3"/>

              {/* Data isolation indicators */}
              <circle cx="52" cy="50" r="3" fill="#00e87a" opacity="0.3"/>
              <circle cx="288" cy="50" r="3" fill="#00e87a" opacity="0.3"/>
              <circle cx="52" cy="170" r="3" fill="#00e87a" opacity="0.3"/>
              <circle cx="288" cy="170" r="3" fill="#00e87a" opacity="0.3"/>
              <circle cx="170" cy="110" r="5" fill="#00e87a" opacity="0.6"/>

              {/* Annotations */}
              <text x="170" y="205" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.35">Isolated · Scalable · Configurable</text>
            </svg>
          </FadeIn>
        </div>

        <FadeUp delay={0.42} style={{ marginTop: 36 }}>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {['Multi-tenant architecture', 'Client-facing or internal', 'SOC 2 / GDPR ready', 'From 0 to enterprise'].map((t, i) => (
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
   SECTION 2 — TWO FLAVOURS (toggle)
═══════════════════════════════════════ */
const FLAVOURS = {
  client: {
    label: 'Client-facing SaaS',
    tagline: 'Your product. Delivered to every customer at scale.',
    desc: 'Revenue-generating platforms where every customer is a tenant with their own data, workflows, and configuration — but sharing the same secure infrastructure.',
    points: [
      'Custom onboarding & tenant provisioning flows',
      'Per-tenant configuration, branding and feature flags',
      'Usage-based billing integration (Stripe, Chargebee)',
      'Customer-facing analytics & reporting dashboards',
      'Role-based access control across tenant hierarchies',
      'API-first — expose your platform to third-party integrations',
    ],
    examples: ['CRM platforms', 'Vertical SaaS for regulated industries', 'B2B workflow tools', 'Marketplace infrastructure'],
  },
  internal: {
    label: 'Internal SaaS',
    tagline: 'Operations-grade software your teams actually use.',
    desc: 'Internal platforms that codify your proprietary process — replacing spreadsheets, manual workflows, and stitched-together point solutions with purpose-built software.',
    points: [
      'Multi-department / multi-entity access control',
      'Workflow automation replacing manual handoffs',
      'Deep ERP / CRM / data warehouse integrations',
      'Audit trails, compliance logging, approval chains',
      'Real-time ops dashboards and alerting',
      'Mobile-first field-worker interfaces where needed',
    ],
    examples: ['Internal ops platforms', 'Finance & treasury tools', 'Supply chain dashboards', 'Custom ERP modules'],
  },
};

function FlavoursSection() {
  const [active, setActive] = useState<'client' | 'internal'>('client');
  const f = FLAVOURS[active];

  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="TWO FLAVOURS" />

        <div style={{ overflow: 'hidden', marginBottom: 36 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Same rigour. Different audiences.
            </h2>
          </RevealClip>
        </div>

        {/* Toggle */}
        <FadeUp delay={0.14} style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', gap: 6, padding: 5, borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)' }}>
            {(['client', 'internal'] as const).map(key => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`saas-tab${active === key ? ' active' : ''}`}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '9px 20px', borderRadius: 8, background: 'transparent', cursor: 'pointer', letterSpacing: '0.08em', color: active === key ? 'var(--accent-primary)' : 'var(--text-tertiary)', outline: 'none' }}
              >
                {key === 'client' ? 'Client-facing' : 'Internal'}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 72px', alignItems: 'start' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 18, color: 'var(--text-primary)', margin: '0 0 12px', lineHeight: 1.35 }}>{f.tagline}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0 0 28px' }}>{f.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', opacity: 0.55, letterSpacing: '0.14em', width: '100%', margin: '0 0 6px' }}>TYPICAL BUILDS</p>
                  {f.examples.map((e, i) => (
                    <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 11px', borderRadius: 100, border: '1px solid rgba(0,232,122,0.18)', color: 'var(--text-tertiary)' }}>{e}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {f.points.map((p, i) => (
                  <div
                    key={i}
                    className="saas-check-row"
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 8px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-primary)', opacity: 0.7, flexShrink: 0, marginTop: 1 }}>→</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 3 — ARCHITECTURE PILLARS
═══════════════════════════════════════ */
const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" width={36} height={36}>
        <rect x="4" y="4" width="36" height="36" rx="5" stroke="#00e87a" strokeWidth="1.2" opacity="0.5"/>
        <rect x="10" y="10" width="10" height="10" rx="2" stroke="#00e87a" strokeWidth="1" opacity="0.7"/>
        <rect x="24" y="10" width="10" height="10" rx="2" stroke="#00e87a" strokeWidth="1" opacity="0.5"/>
        <rect x="10" y="24" width="10" height="10" rx="2" stroke="#00e87a" strokeWidth="1" opacity="0.5"/>
        <rect x="24" y="24" width="10" height="10" rx="2" stroke="#00e87a" strokeWidth="1" opacity="0.35"/>
        <line x1="20" y1="15" x2="24" y2="15" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/>
        <line x1="15" y1="20" x2="15" y2="24" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/>
      </svg>
    ),
    title: 'Multi-tenancy',
    desc: 'Row-level, schema-level or database-per-tenant isolation chosen by your data sensitivity and cost model.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" width={36} height={36}>
        <circle cx="22" cy="22" r="14" stroke="#00e87a" strokeWidth="1.2" opacity="0.45"/>
        <circle cx="22" cy="22" r="8" stroke="#00e87a" strokeWidth="1.3" opacity="0.65"/>
        <circle cx="22" cy="22" r="3" fill="#00e87a" opacity="0.8"/>
        <path d="M22 8 L22 14" stroke="#00e87a" strokeWidth="1" opacity="0.35"/>
        <path d="M34 22 L28 22" stroke="#00e87a" strokeWidth="1" opacity="0.35"/>
        <path d="M22 36 L22 30" stroke="#00e87a" strokeWidth="1" opacity="0.35"/>
        <path d="M10 22 L16 22" stroke="#00e87a" strokeWidth="1" opacity="0.35"/>
      </svg>
    ),
    title: 'Security & Compliance',
    desc: 'RBAC, zero-trust networking, encrypted data at rest and in transit, full audit logging. SOC 2 / GDPR / HIPAA ready by design.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" width={36} height={36}>
        <rect x="6" y="18" width="14" height="20" rx="2" stroke="#00e87a" strokeWidth="1.1" opacity="0.4"/>
        <rect x="24" y="12" width="14" height="26" rx="2" stroke="#00e87a" strokeWidth="1.2" opacity="0.65"/>
        <path d="M8 28 L16 28" stroke="#00e87a" strokeWidth="0.7" opacity="0.3"/>
        <path d="M8 32" stroke="#00e87a" strokeWidth="0.7"/>
        <path d="M26 20 L34 20" stroke="#00e87a" strokeWidth="0.7" opacity="0.4"/>
        <path d="M26 25 L34 25" stroke="#00e87a" strokeWidth="0.7" opacity="0.35"/>
        <path d="M26 30 L30 30" stroke="#00e87a" strokeWidth="0.7" opacity="0.3"/>
        <path d="M4 38 L40 38" stroke="#00e87a" strokeWidth="1.1" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
    title: 'Scalable Infrastructure',
    desc: 'Stateless services, autoscaling compute, managed databases, CDN-first assets. Designed to handle 10× traffic without 10× cost.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" width={36} height={36}>
        <path d="M10 22 L17 22 L20 14 L24 30 L27 22 L34 22" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.75"/>
        <circle cx="10" cy="22" r="2" fill="#00e87a" opacity="0.5"/>
        <circle cx="34" cy="22" r="2" fill="#00e87a" opacity="0.5"/>
        <line x1="6" y1="8" x2="6" y2="36" stroke="#00e87a" strokeWidth="0.7" opacity="0.2"/>
        <line x1="6" y1="36" x2="38" y2="36" stroke="#00e87a" strokeWidth="0.7" opacity="0.2"/>
      </svg>
    ),
    title: 'Observability',
    desc: 'Structured logging, distributed tracing, SLO dashboards and alerting. You always know exactly what your platform is doing.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" width={36} height={36}>
        <path d="M14 22 C14 16 20 12 26 14" stroke="#00e87a" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5"/>
        <path d="M30 22 C30 28 24 32 18 30" stroke="#00e87a" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5"/>
        <circle cx="14" cy="22" r="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.7"/>
        <circle cx="30" cy="22" r="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.7"/>
        <path d="M10 14 L18 14 L18 22" stroke="#00e87a" strokeWidth="0.8" opacity="0.25" strokeDasharray="2 2"/>
        <path d="M34 30 L26 30 L26 22" stroke="#00e87a" strokeWidth="0.8" opacity="0.25" strokeDasharray="2 2"/>
      </svg>
    ),
    title: 'API-first Design',
    desc: 'Every feature is an endpoint. OpenAPI-documented, versioned, and ready to power mobile apps, partner integrations or your next product.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" width={36} height={36}>
        <rect x="8" y="8" width="12" height="12" rx="2" stroke="#00e87a" strokeWidth="1.1" opacity="0.5"/>
        <rect x="24" y="8" width="12" height="12" rx="2" stroke="#00e87a" strokeWidth="1.1" opacity="0.65"/>
        <rect x="8" y="24" width="12" height="12" rx="2" stroke="#00e87a" strokeWidth="1.1" opacity="0.65"/>
        <rect x="24" y="24" width="12" height="12" rx="2" stroke="#00e87a" strokeWidth="1.1" opacity="0.45"/>
        <path d="M20 14 L24 14" stroke="#00e87a" strokeWidth="1" opacity="0.35"/>
        <path d="M14 20 L14 24" stroke="#00e87a" strokeWidth="1" opacity="0.35"/>
        <path d="M20 30 L24 30" stroke="#00e87a" strokeWidth="1" opacity="0.25"/>
        <path d="M30 20 L30 24" stroke="#00e87a" strokeWidth="1" opacity="0.25"/>
        <circle cx="22" cy="22" r="2.5" fill="#00e87a" opacity="0.4"/>
      </svg>
    ),
    title: 'Modular Architecture',
    desc: 'Feature flags, pluggable billing plans, and per-tenant configuration let you ship one platform that adapts to every customer\'s needs.',
  },
];

function ArchitectureSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="ARCHITECTURE" />

        <div style={{ overflow: 'hidden', marginBottom: 10 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Six pillars every platform we build on.
            </h2>
          </RevealClip>
        </div>
        <FadeUp delay={0.16} style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, maxWidth: 540, margin: '12px 0 0' }}>
            Not bolt-ons. These are design decisions made at the start — before a line of product code is written.
          </p>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={i}
              className="saas-pillar"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              style={{ padding: '28px 24px', borderRadius: 16, background: 'var(--bg-surface)' }}
            >
              <div style={{ marginBottom: 16, opacity: 0.65 }}>{p.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', margin: '0 0 10px', lineHeight: 1.25 }}>{p.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.72, margin: 0 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 4 — HOW WE BUILD
═══════════════════════════════════════ */
const PHASES = [
  {
    num: '01', phase: 'Product Definition',
    duration: '1–2 wks',
    what: 'We run structured discovery to nail the core workflow, user types, tenancy model and business rules before any UI or API is designed.',
    outputs: ['User journey maps', 'Tenancy & data model', 'Feature priority matrix', 'Build vs. buy decisions'],
  },
  {
    num: '02', phase: 'Architecture & Design',
    duration: '1–2 wks',
    what: 'System design, API contracts, database schemas, auth model, infrastructure plan. All reviewed before the first PR is opened.',
    outputs: ['System design doc', 'ERD & API spec', 'Auth architecture', 'IaC scaffolding'],
  },
  {
    num: '03', phase: 'Iterative Build',
    duration: 'Sprint cycles',
    what: 'Two-week sprints. Working software every cycle. You see real progress — not Figma files — from week three.',
    outputs: ['Feature increments', 'Integration tests', 'Preview environments', 'Sprint demos'],
  },
  {
    num: '04', phase: 'Launch & Scale',
    duration: 'Go-live +',
    what: 'Production launch, monitoring, on-call support, and a roadmap for scaling from your first 10 tenants to 10,000.',
    outputs: ['Production deployment', 'Runbooks & docs', 'Observability dashboards', 'Scaling playbook'],
  },
];

function PhaseCard({ p, index }: { p: typeof PHASES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
    >
      <div
        className="saas-card"
        onClick={() => setOpen(o => !o)}
        style={{ padding: '24px 26px', borderRadius: 16, background: 'var(--bg-surface)', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-primary)', opacity: 0.6, letterSpacing: '0.12em' }}>{p.num}</span>
              <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', opacity: 0.55 }}>{p.duration}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1.2 }}>{p.phase}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7 }}>{p.what}</p>
          </div>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(0,232,122,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}
          >
            <span style={{ color: 'var(--accent-primary)', fontSize: 18, lineHeight: 1, fontWeight: 300 }}>+</span>
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.4, ease: EASE }, opacity: { duration: 0.28 } }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 18, paddingTop: 18 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-primary)', opacity: 0.6, letterSpacing: '0.14em', margin: '0 0 10px' }}>DELIVERABLES</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.outputs.map((o, oi) => (
                    <span key={oi} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 11px', borderRadius: 100, border: '1px solid rgba(0,232,122,0.16)', color: 'var(--text-tertiary)' }}>{o}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function HowWeSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="HOW WE BUILD" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 80px', alignItems: 'start', marginBottom: 48 }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
                  Discovery first. Code second.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.17}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '16px 0 0', maxWidth: 400 }}>
                Most SaaS projects fail in the design phase — not the build. We invest heavily upfront so the build phase is fast and predictable.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.22}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.8, margin: 0, borderLeft: '2px solid rgba(0,232,122,0.25)', paddingLeft: 20 }}>
              "We've taken over SaaS projects from other agencies and spent months fixing architecture decisions that should have been made in week one. That's why we don't shortcut discovery."
            </p>
          </FadeUp>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {PHASES.map((p, i) => <PhaseCard key={i} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 5 — TECH
═══════════════════════════════════════ */
const STACK_ROWS = [
  { label: 'Frontend', items: ['Next.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'tRPC'] },
  { label: 'Backend', items: ['Node.js', 'FastAPI', 'Go', 'GraphQL', 'REST / OpenAPI'] },
  { label: 'Auth & Identity', items: ['Clerk', 'Auth0', 'AWS Cognito', 'custom OIDC'] },
  { label: 'Database', items: ['PostgreSQL', 'Redis', 'Neon', 'PlanetScale', 'ClickHouse'] },
  { label: 'Infra & DevOps', items: ['AWS / GCP', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Datadog'] },
  { label: 'Billing', items: ['Stripe', 'Chargebee', 'custom metered usage'] },
];

function TechSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="TECH STACK" />

        <div style={{ overflow: 'hidden', marginBottom: 52 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
              Modern. Proven. Boring in the right ways.
            </h2>
          </RevealClip>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {STACK_ROWS.map((row, ri) => (
            <FadeUp key={ri} delay={0.06 + ri * 0.07}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '0 32px', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
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

/* ═══════════════════════════════════════
   SECTION 6 — WHAT YOU GET
═══════════════════════════════════════ */
const DELIVERABLES = [
  { label: 'Production-ready codebase', sub: 'Yours to own — clean git history, tests, docs' },
  { label: 'Infra-as-code', sub: 'Every environment reproducible in minutes' },
  { label: 'CI/CD pipeline', sub: 'From PR to production, automated and safe' },
  { label: 'Admin dashboard', sub: 'Tenant management, feature flags, billing ops' },
  { label: 'API documentation', sub: 'OpenAPI spec, SDKs if required' },
  { label: 'Runbooks & handover', sub: 'So your team can operate and extend independently' },
];

function DeliverablesSection() {
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="DELIVERABLES" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 80px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3vw,42px)', color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
                  Everything you need to launch and own it.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.18}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.82, margin: '16px 0 0', maxWidth: 380 }}>
                We don't hand you a black box. You get full IP, documented code, and an ops-capable team who can take it from there.
              </p>
            </FadeUp>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {DELIVERABLES.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.48, delay: i * 0.08, ease: EASE }}
                style={{ padding: '18px 16px', borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', margin: '0 0 5px', lineHeight: 1.35 }}>{d.label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-tertiary)', margin: 0, lineHeight: 1.6, opacity: 0.7 }}>{d.sub}</p>
              </motion.div>
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
          <div style={{ padding: '52px 56px', borderRadius: 20, background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <div style={{ overflow: 'hidden', marginBottom: 8 }}>
                <RevealClip delay={0.06}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px,2.5vw,34px)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
                    Have a platform in mind?
                  </h2>
                </RevealClip>
              </div>
              <FadeUp delay={0.16}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7, maxWidth: 440 }}>
                  Share your idea, constraints, and timeline. We'll come back with a realistic scope, architecture direction, and honest assessment — no pitch deck required.
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.22}>
              <a
                href="#contact"
                className="saas-cta-btn"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: '#000', background: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '13px 32px', borderRadius: 8, textDecoration: 'none', display: 'inline-block', flexShrink: 0 }}
                onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#000'; }}
              >Start the conversation →</a>
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
export function CustomSaaSPage() {
  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <style>{STYLES}</style>
      <HeroSection />
      <FlavoursSection />
      <Divider />
      <ArchitectureSection />
      <Divider />
      <HowWeSection />
      <Divider />
      <TechSection />
      <Divider />
      <DeliverablesSection />
      <CTASection />
    </div>
  );
}