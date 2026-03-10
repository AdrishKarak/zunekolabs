import { motion } from 'framer-motion';
import { Search, Layers, Code2, GitMerge, Rocket } from 'lucide-react';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { icon: Search, title: 'Discovery & Scoping', desc: 'We go deep on your operations, data flows, and goals to define what AI can actually solve.', duration: '1–2 weeks', side: 'left' },
  { icon: Layers, title: 'Architecture & AI Design', desc: 'Our engineers blueprint the entire system—model selection, infra, data pipelines, and integrations.', duration: '2–3 weeks', side: 'right' },
  { icon: Code2, title: 'Engineering & Development', desc: 'Full-stack development with iterative builds, sprint demos, and constant stakeholder alignment.', duration: '4–12 weeks', side: 'left' },
  { icon: GitMerge, title: 'Integration & Testing', desc: 'Rigorous QA, stress testing, model evaluation, and seamless integration into your existing stack.', duration: '2–4 weeks', side: 'right' },
  { icon: Rocket, title: 'Deployment & Growth', desc: 'Go-live support, monitoring dashboards, and ongoing optimization to compound your ROI over time.', duration: 'Ongoing', side: 'left' },
];

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const isLeft = step.side === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: EASE_SMOOTH }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isLeft ? 'flex-end' : 'flex-start',
        width: '100%',
        paddingBottom: '48px',
      }}
    >
      {/* Flex row: card ← node → card */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 48px 1fr',
        width: '100%',
        alignItems: 'center',
        gap: '0',
      }}>
        {/* Left slot */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '32px' }}>
          {isLeft && (
            <StepContentCard step={step} />
          )}
        </div>

        {/* Center node */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.15 + 0.3, type: 'spring', stiffness: 400 }}
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              boxShadow: '0 0 20px rgba(34,197,94,0.6)',
              flexShrink: 0,
            }}
          />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '80px',
            color: 'rgba(240,250,244,0.03)',
            lineHeight: 1,
            position: 'absolute',
            pointerEvents: 'none',
            userSelect: 'none',
          }}>0{index + 1}</span>
        </div>

        {/* Right slot */}
        <div style={{ paddingLeft: '32px' }}>
          {!isLeft && (
            <StepContentCard step={step} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function StepContentCard({ step }: { step: typeof STEPS[0] }) {
  const Icon = step.icon;
  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '10px',
      padding: '28px',
      maxWidth: '400px',
      width: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <Icon size={28} style={{ color: 'var(--accent-primary)' }} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--accent-secondary)',
          border: '1px solid rgba(34,197,94,0.25)',
          padding: '3px 10px',
          borderRadius: '100px',
        }}>{step.duration}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: 'var(--text-primary)', marginBottom: '8px' }}>
        {step.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
        {step.desc}
      </p>
    </div>
  );
}

export function ClaritySteps() {
  return (
    <section id="process" style={{ background: 'var(--bg-void)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }}>
            HOW WE WORK
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(40px, 5vw, 68px)',
            color: 'var(--text-primary)',
            lineHeight: 1.05,
          }}>
            From Brief to Breakthrough
          </h2>
        </motion.div>

        {/* Steps with center timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical timeline line */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--accent-primary), rgba(34,197,94,0.05))',
            zIndex: 0,
          }} />

          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          section#process .step-grid { grid-template-columns: 48px 1fr !important; }
        }
      `}</style>
    </section>
  );
}