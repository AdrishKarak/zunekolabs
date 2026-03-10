import { useRef, useState } from 'react';
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
    color: '#00e87a',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 52, height: 52 }}>
        <circle cx="28" cy="28" r="16" stroke="#00e87a" strokeWidth="1.5" opacity="0.5" />
        <circle cx="28" cy="28" r="9" stroke="#00e87a" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
        <circle cx="28" cy="28" r="3" fill="#00e87a" opacity="0.8" />
        <line x1="40" y1="40" x2="54" y2="54" stroke="#00e87a" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="28" x2="34" y2="28" stroke="#00e87a" strokeWidth="1.2" opacity="0.6" />
        <line x1="28" y1="22" x2="28" y2="34" stroke="#00e87a" strokeWidth="1.2" opacity="0.6" />
        <circle cx="54" cy="54" r="4" stroke="#00e87a" strokeWidth="1.2" opacity="0.4" />
      </svg>
    ),
  },
  {
    icon: Layers,
    title: 'Architecture & AI Design',
    desc: 'Our engineers blueprint the entire system—model selection, infra, data pipelines, and integrations.',
    duration: '2–3 weeks',
    num: '02',
    color: '#00c96a',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 52, height: 52 }}>
        <rect x="8" y="38" width="48" height="10" rx="2" stroke="#00e87a" strokeWidth="1.4" opacity="0.5" />
        <rect x="12" y="26" width="40" height="10" rx="2" stroke="#00e87a" strokeWidth="1.4" opacity="0.7" />
        <rect x="16" y="14" width="32" height="10" rx="2" stroke="#00e87a" strokeWidth="1.5" opacity="0.9" />
        <line x1="32" y1="8" x2="32" y2="14" stroke="#00e87a" strokeWidth="1.2" opacity="0.4" />
        <circle cx="32" cy="6" r="3" fill="#00e87a" opacity="0.6" />
        <line x1="20" y1="36" x2="20" y2="38" stroke="#00e87a" strokeWidth="1" opacity="0.3" />
        <line x1="44" y1="36" x2="44" y2="38" stroke="#00e87a" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
  {
    icon: Code2,
    title: 'Engineering & Development',
    desc: 'Full-stack development with iterative builds, sprint demos, and constant stakeholder alignment.',
    duration: '4–12 weeks',
    num: '03',
    color: '#00e87a',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 52, height: 52 }}>
        <rect x="4" y="10" width="56" height="40" rx="4" stroke="#00e87a" strokeWidth="1.3" opacity="0.4" />
        <line x1="4" y1="20" x2="60" y2="20" stroke="#00e87a" strokeWidth="0.8" opacity="0.2" />
        <circle cx="12" cy="15" r="2" fill="#00e87a" opacity="0.5" />
        <circle cx="19" cy="15" r="2" fill="#00e87a" opacity="0.35" />
        <circle cx="26" cy="15" r="2" fill="#00e87a" opacity="0.25" />
        <path d="M14 32 L22 38 L14 44" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        <line x1="26" y1="44" x2="42" y2="44" stroke="#00e87a" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="26" y1="38" x2="36" y2="38" stroke="#00e87a" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <line x1="26" y1="32" x2="50" y2="32" stroke="#00e87a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  },
  {
    icon: GitMerge,
    title: 'Integration & Testing',
    desc: 'Rigorous QA, stress testing, model evaluation, and integration into your existing stack.',
    duration: '2–4 weeks',
    num: '04',
    color: '#00c96a',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 52, height: 52 }}>
        <circle cx="16" cy="14" r="5" stroke="#00e87a" strokeWidth="1.4" opacity="0.8" />
        <circle cx="16" cy="50" r="5" stroke="#00e87a" strokeWidth="1.4" opacity="0.55" />
        <circle cx="48" cy="32" r="5" stroke="#00e87a" strokeWidth="1.4" opacity="0.7" />
        <path d="M16 19 C16 28 30 28 30 32 C30 36 16 36 16 45" stroke="#00e87a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M21 14 L43 30" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
        <path d="M21 50 L43 34" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
        <circle cx="16" cy="14" r="2.5" fill="#00e87a" opacity="0.6" />
        <circle cx="48" cy="32" r="2.5" fill="#00e87a" opacity="0.8" />
      </svg>
    ),
  },
  {
    icon: Rocket,
    title: 'Deployment & Growth',
    desc: 'Go-live support, monitoring dashboards, and optimization to compound your ROI over time.',
    duration: 'Ongoing',
    num: '05',
    color: '#00e87a',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 52, height: 52 }}>
        <path d="M32 54 C32 54 18 44 18 30 C18 18 24 10 32 8 C40 10 46 18 46 30 C46 44 32 54 32 54Z" stroke="#00e87a" strokeWidth="1.4" fill="none" opacity="0.6" />
        <circle cx="32" cy="28" r="5" stroke="#00e87a" strokeWidth="1.4" opacity="0.9" />
        <circle cx="32" cy="28" r="2" fill="#00e87a" opacity="0.8" />
        <path d="M22 46 L16 54" stroke="#00e87a" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
        <path d="M42 46 L48 54" stroke="#00e87a" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
        <path d="M24 12 C20 8 14 8 10 10" stroke="#00e87a" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
        <path d="M40 12 C44 8 50 8 54 10" stroke="#00e87a" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
        <circle cx="32" cy="54" r="3" fill="#00e87a" opacity="0.25" />
      </svg>
    ),
  },
];

function StepCard({ step, index, inView }: { step: typeof STEPS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.14, ease: EASE }}
      style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
    >
      {/* Connector line (except last) */}
      {index < STEPS.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.14, ease: EASE }}
          style={{
            position: 'absolute',
            top: '28px',
            left: '50%',
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(0,232,122,0.5), rgba(0,232,122,0.1))',
            transformOrigin: 'left center',
            zIndex: 0,
          }}
        />
      )}

      {/* Node */}
      <motion.div
        animate={hovered ? { scale: 1.15, boxShadow: '0 0 28px rgba(0,232,122,0.55)' } : { scale: 1, boxShadow: '0 0 14px rgba(0,232,122,0.25)' }}
        transition={{ duration: 0.25 }}
        style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'var(--bg-surface)',
          border: '1.5px solid rgba(0,232,122,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2, position: 'relative', cursor: 'pointer', flexShrink: 0,
          marginBottom: '28px',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered(h => !h)}
      >
        <Icon size={22} style={{ color: 'var(--accent-primary)' }} />
      </motion.div>

      {/* Step number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.25 + index * 0.14 }}
        style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em',
          color: 'var(--accent-primary)', opacity: 0.55, marginBottom: '10px',
        }}
      >
        {step.num}
      </motion.div>

      {/* Card */}
      <motion.div
        animate={hovered
          ? { y: -6, borderColor: 'rgba(0,232,122,0.35)', boxShadow: '0 18px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,232,122,0.12)' }
          : { y: 0, borderColor: 'rgba(0,232,122,0.08)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }
        }
        transition={{ duration: 0.3, ease: EASE }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          background: 'var(--bg-surface)',
          border: '1px solid rgba(0,232,122,0.08)',
          borderRadius: '14px',
          overflow: 'hidden',
          cursor: 'default',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <motion.div
          animate={{ opacity: hovered ? 0.7 : 0.25 }}
          transition={{ duration: 0.25 }}
          style={{ height: '2px', background: `linear-gradient(90deg, ${step.color}, transparent)` }}
        />

        {/* Ghost number */}
        <div style={{
          position: 'absolute', right: '10px', top: '6px',
          fontFamily: 'var(--font-mono)', fontSize: '52px', fontWeight: 700,
          color: 'var(--accent-primary)', opacity: 0.035, userSelect: 'none', lineHeight: 1,
        }}>{step.num}</div>

        <div style={{ padding: '20px 20px 22px' }}>
          {/* SVG illustration */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.6, scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: '14px' }}
          >
            {step.svg}
          </motion.div>

          {/* Duration badge */}
          <div style={{ marginBottom: '10px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em',
              color: 'var(--accent-primary)', border: '1px solid rgba(0,232,122,0.22)',
              padding: '2px 9px', borderRadius: '100px',
            }}>{step.duration}</span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px',
            color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.25,
          }}>{step.title}</h3>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '12.5px',
            color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0,
          }}>{step.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ClaritySteps() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)',
            letterSpacing: '0.2em', display: 'block', marginBottom: '16px',
          }}>
            HOW WE WORK
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1.05, margin: 0,
          }}>
            From Brief to Breakthrough
          </h2>
        </motion.div>

        {/* Steps row */}
        <div
          ref={ref}
          style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', position: 'relative' }}
        >
          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #process-steps { flex-wrap: wrap !important; }
          #process-steps > div { flex: 1 1 calc(50% - 8px) !important; }
        }
        @media (max-width: 560px) {
          #process-steps > div { flex: 1 1 100% !important; }
        }
      `}</style>
    </section>
  );
}