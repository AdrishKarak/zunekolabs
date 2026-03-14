import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Layers, Code2, GitMerge, Rocket } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    icon: Search,
    title: 'Discovery & Scoping',
    desc: 'We go deep on your operations, data flows, and goals to define what AI can actually solve.',
    duration: '1–2 weeks',
    num: '01',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 48, height: 48 }}>
        <circle cx="28" cy="28" r="16" stroke="#1a6e42" strokeWidth="1.5" opacity="0.5" />
        <circle cx="28" cy="28" r="9"  stroke="#1a6e42" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <circle cx="28" cy="28" r="3"  fill="#1a6e42" opacity="0.9" />
        <line x1="40" y1="40" x2="54" y2="54" stroke="#1a6e42" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="28" x2="34" y2="28" stroke="#1a6e42" strokeWidth="1.2" opacity="0.6" />
        <line x1="28" y1="22" x2="28" y2="34" stroke="#1a6e42" strokeWidth="1.2" opacity="0.6" />
        <circle cx="54" cy="54" r="4" stroke="#1a6e42" strokeWidth="1.2" opacity="0.4" />
      </svg>
    ),
  },
  {
    icon: Layers,
    title: 'Architecture & AI Design',
    desc: 'Our engineers blueprint the entire system — model selection, infra, data pipelines, and integrations.',
    duration: '2–3 weeks',
    num: '02',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 48, height: 48 }}>
        <rect x="8"  y="38" width="48" height="10" rx="2" stroke="#1a6e42" strokeWidth="1.4" opacity="0.4" />
        <rect x="12" y="26" width="40" height="10" rx="2" stroke="#1a6e42" strokeWidth="1.4" opacity="0.65" />
        <rect x="16" y="14" width="32" height="10" rx="2" stroke="#1a6e42" strokeWidth="1.5" opacity="0.9" />
        <line x1="32" y1="8"  x2="32" y2="14" stroke="#1a6e42" strokeWidth="1.2" opacity="0.4" />
        <circle cx="32" cy="6" r="3" fill="#1a6e42" opacity="0.7" />
      </svg>
    ),
  },
  {
    icon: Code2,
    title: 'Engineering & Development',
    desc: 'Full-stack development with iterative builds, sprint demos, and constant stakeholder alignment.',
    duration: '4–12 weeks',
    num: '03',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 48, height: 48 }}>
        <rect x="4" y="10" width="56" height="40" rx="4" stroke="#1a6e42" strokeWidth="1.3" opacity="0.35" />
        <line x1="4" y1="20" x2="60" y2="20" stroke="#1a6e42" strokeWidth="0.8" opacity="0.2" />
        <circle cx="12" cy="15" r="2" fill="#1a6e42" opacity="0.6" />
        <circle cx="19" cy="15" r="2" fill="#1a6e42" opacity="0.4" />
        <circle cx="26" cy="15" r="2" fill="#1a6e42" opacity="0.25" />
        <path d="M14 32 L22 38 L14 44" stroke="#1a6e42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        <line x1="26" y1="44" x2="42" y2="44" stroke="#1a6e42" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="26" y1="38" x2="36" y2="38" stroke="#1a6e42" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <line x1="26" y1="32" x2="50" y2="32" stroke="#1a6e42" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  },
  {
    icon: GitMerge,
    title: 'Integration & Testing',
    desc: 'Rigorous QA, stress testing, model evaluation, and integration into your existing stack.',
    duration: '2–4 weeks',
    num: '04',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 48, height: 48 }}>
        <circle cx="16" cy="14" r="5" stroke="#1a6e42" strokeWidth="1.4" opacity="0.85" />
        <circle cx="16" cy="50" r="5" stroke="#1a6e42" strokeWidth="1.4" opacity="0.55" />
        <circle cx="48" cy="32" r="5" stroke="#1a6e42" strokeWidth="1.4" opacity="0.7" />
        <path d="M16 19 C16 28 30 28 30 32 C30 36 16 36 16 45" stroke="#1a6e42" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.65" />
        <path d="M21 14 L43 30" stroke="#1a6e42" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
        <path d="M21 50 L43 34" stroke="#1a6e42" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
        <circle cx="16" cy="14" r="2.5" fill="#1a6e42" opacity="0.7" />
        <circle cx="48" cy="32" r="2.5" fill="#1a6e42" opacity="0.85" />
      </svg>
    ),
  },
  {
    icon: Rocket,
    title: 'Deployment & Growth',
    desc: 'Go-live support, monitoring dashboards, and optimization to compound your ROI over time.',
    duration: 'Ongoing',
    num: '05',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 48, height: 48 }}>
        <path d="M32 54 C32 54 18 44 18 30 C18 18 24 10 32 8 C40 10 46 18 46 30 C46 44 32 54 32 54Z"
          stroke="#1a6e42" strokeWidth="1.4" fill="none" opacity="0.6" />
        <circle cx="32" cy="28" r="5" stroke="#1a6e42" strokeWidth="1.4" opacity="0.9" />
        <circle cx="32" cy="28" r="2" fill="#1a6e42" opacity="0.85" />
        <path d="M22 46 L16 54" stroke="#1a6e42" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
        <path d="M42 46 L48 54" stroke="#1a6e42" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
      </svg>
    ),
  },
];

/* ─── Injected CSS ──────────────────────────────────────────────── */
const CSS = `
/* Desktop: horizontal */
.clarity-steps {
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-start;
  position: relative;
}
.cs-h-connector {
  position: absolute;
  top: 28px; left: 50%;
  width: 100%; height: 1px;
  background: linear-gradient(90deg, rgba(26,110,66,0.3), rgba(26,110,66,0.06));
  transform-origin: left center;
}

/* Mobile: vertical timeline */
@media (max-width: 768px) {
  .clarity-steps {
    flex-direction: column;
    gap: 20px;            /* ← space between each step row */
  }
  .cs-h-connector  { display: none !important; }
  .cs-step-col     { flex-direction: row !important; align-items: stretch !important; }
  .cs-desktop-node { display: none !important; }
  .cs-mobile-left  { display: flex !important; }
  .cs-card-wrap    { margin-bottom: 0 !important; }
}

/* Hover animation: slide right + left bar */
.cs-card {
  position: relative;
  overflow: hidden;
  transition: background 0.28s ease, transform 0.28s cubic-bezier(0.16,1,0.3,1);
}
.cs-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0; width: 3px;
  background: #1a6e42;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.cs-card:hover { background: rgba(26,110,66,0.04) !important; transform: translateX(4px); }
.cs-card:hover::before { transform: scaleY(1); }
.cs-svg { display: inline-block; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
.cs-card:hover .cs-svg { transform: scale(1.08) rotate(-3deg); }
`;

function StyleInjector() {
  if (typeof document !== 'undefined' && !document.getElementById('cs-styles')) {
    const el = document.createElement('style');
    el.id = 'cs-styles';
    el.textContent = CSS;
    document.head.appendChild(el);
  }
  return null;
}

/* ─── Single step ───────────────────────────────────────────────── */
function StepCard({ step, index, inView, total }: {
  step: typeof STEPS[0];
  index: number;
  inView: boolean;
  total: number;
}) {
  const Icon   = step.icon;
  const isLast = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.62, delay: 0.08 + index * 0.12, ease: EASE }}
      /* cs-step-col: column on desktop, row on mobile */
      className="cs-step-col"
      style={{
        flex: '1 1 0',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Desktop horizontal connector */}
      {!isLast && (
        <motion.div
          className="cs-h-connector"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.25 + index * 0.12, ease: EASE }}
        />
      )}

      {/* ── MOBILE LEFT COLUMN: num + circle + vertical line ──────── */}
      {/* Hidden on desktop via CSS, shown as flex column on mobile */}
      <div
        className="cs-mobile-left"
        style={{
          display: 'none',          /* CSS overrides to flex on ≤768px */
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          width: '52px',
          marginRight: '14px',
          paddingTop: '2px',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px',
          letterSpacing: '0.18em', color: '#3d7a55', opacity: 0.55,
          marginBottom: '6px',
        }}>
          {step.num}
        </span>

        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: '#fff',
          border: '1.5px solid rgba(26,110,66,0.28)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(26,110,66,0.09)',
          flexShrink: 0,
        }}>
          <Icon size={18} color="#1a6e42" />
        </div>

        {/* Line extending down to next step */}
        {!isLast && (
          <div style={{
            flex: 1,
            width: '1px',
            minHeight: '20px',
            marginTop: '8px',
            background: 'linear-gradient(to bottom, rgba(26,110,66,0.25), rgba(26,110,66,0.04))',
          }} />
        )}
      </div>

      {/* ── DESKTOP NODE: num badge + circle ── */}
      {/* Hidden on mobile via CSS */}
      <div className="cs-desktop-node" style={{ display: 'contents' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.2 + index * 0.12 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '9.5px',
            letterSpacing: '0.18em', color: '#3d7a55', opacity: 0.55,
            marginBottom: '10px',
          }}
        >
          {step.num}
        </motion.div>

        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: '#fff',
          border: '1.5px solid rgba(26,110,66,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(26,110,66,0.10)',
          flexShrink: 0,
          marginBottom: '20px',
          zIndex: 2, position: 'relative',
        }}>
          <Icon size={20} color="#1a6e42" />
        </div>
      </div>

      {/* ── CARD ── */}
      <div
        className="cs-card-wrap cs-card"
        style={{
          flex: 1,
          width: '100%',
          background: '#ffffff',
          border: '1px solid rgba(26,110,66,0.14)',
          borderRadius: '14px',
          boxShadow: '0 2px 12px rgba(26,110,66,0.06)',
          cursor: 'default',
        }}
      >
        {/* Accent top bar */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, rgba(26,110,66,0.55), transparent)',
          borderRadius: '14px 14px 0 0',
        }} />

        {/* Ghost number */}
        <div style={{
          position: 'absolute', right: 10, top: 6,
          fontFamily: 'var(--font-mono)', fontSize: '52px', fontWeight: 700,
          color: '#1a6e42', opacity: 0.028, userSelect: 'none',
          lineHeight: 1, pointerEvents: 'none',
        }}>
          {step.num}
        </div>

        <div style={{ padding: '18px 20px 20px' }}>
          <div className="cs-svg" style={{ marginBottom: '12px' }}>
            {step.svg}
          </div>

          <div style={{ marginBottom: '9px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '9.5px',
              letterSpacing: '0.1em', color: '#1a6e42',
              border: '1px solid rgba(26,110,66,0.22)',
              background: 'rgba(26,110,66,0.05)',
              padding: '2px 10px', borderRadius: '100px',
            }}>
              {step.duration}
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700,
            fontSize: '15px', color: '#0d3d22',
            marginBottom: '7px', lineHeight: 1.25,
          }}>
            {step.title}
          </h3>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '12.5px',
            color: '#3d6b50', lineHeight: 1.7, margin: 0,
          }}>
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export function ClaritySteps() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" style={{
      background: '#ffffff',
      padding: 'clamp(64px,10vw,120px) clamp(20px,4vw,32px)',
      overflow: 'hidden',
    }}>
      <StyleInjector />
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,80px)' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10.5px',
            color: '#1a6e42', letterSpacing: '0.2em',
            display: 'block', marginBottom: '14px', opacity: 0.7,
          }}>
            HOW WE WORK
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(30px, 4.5vw, 60px)', color: '#0d3d22',
            lineHeight: 1.05, margin: 0,
          }}>
            From Brief to Breakthrough
          </h2>
        </motion.div>

        {/* Steps */}
        <div ref={ref} className="clarity-steps">
          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} inView={inView} total={STEPS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}