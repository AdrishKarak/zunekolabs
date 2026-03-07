import { motion } from 'framer-motion';
import { Zap, Eye, Brain, Database, Code2, TrendingUp } from 'lucide-react';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    icon: Zap,
    title: 'AI Automation',
    desc: 'End-to-end workflow automation powered by custom AI models and agent systems. Reduce manual overhead by 80%.',
    span: 2,
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    desc: 'Real-time visual intelligence: defect detection, OCR, object tracking, and video analytics at production scale.',
    span: 1,
  },
  {
    icon: Brain,
    title: 'LLM Applications',
    desc: 'Custom GPT-powered tools, RAG systems, chatbots, and document intelligence pipelines trained on your data.',
    span: 1,
  },
  {
    icon: Database,
    title: 'Frappe / ERPNext',
    desc: 'Full-cycle ERP implementation, customization, and migration for enterprise-scale operations.',
    span: 1,
  },
  {
    icon: Code2,
    title: 'Custom Software',
    desc: 'Bespoke Python/React applications engineered for complex enterprise workflows and edge cases.',
    span: 1,
  },
  {
    icon: TrendingUp,
    title: 'Digital Transformation',
    desc: 'Strategic tech consulting to modernize legacy systems and unlock operational efficiency at every layer.',
    span: 1,
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_SMOOTH }}
      whileHover={{
        borderColor: 'rgba(0,232,122,0.45)',
        backgroundColor: 'var(--bg-raised)',
        y: -4,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0,232,122,0.08)',
      }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        gridColumn: service.span === 2 ? 'span 2' : 'span 1',
        transition: 'border-color 0.35s, background 0.35s, box-shadow 0.35s',
        cursor: 'pointer',
      }}
      className="service-card"
    >
      {/* Decorative SVG top-right */}
      <motion.div
        whileHover={{ rotate: 15 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          opacity: 0.04,
        }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {index % 3 === 0 && (
            <>
              <line x1="10" y1="10" x2="90" y2="10" stroke="#00e87a" strokeWidth="2"/>
              <line x1="10" y1="30" x2="90" y2="30" stroke="#00e87a" strokeWidth="2"/>
              <line x1="10" y1="10" x2="10" y2="90" stroke="#00e87a" strokeWidth="2"/>
              <circle cx="50" cy="50" r="20" fill="none" stroke="#00e87a" strokeWidth="2"/>
            </>
          )}
          {index % 3 === 1 && (
            <>
              {[0,20,40,60,80].map((y,i) =>
                <path key={i} d={`M0 ${y} Q25 ${y-10} 50 ${y} Q75 ${y+10} 100 ${y}`} fill="none" stroke="#00e87a" strokeWidth="1.5"/>
              )}
            </>
          )}
          {index % 3 === 2 && (
            <>
              <polygon points="50,10 90,90 10,90" fill="none" stroke="#00e87a" strokeWidth="2"/>
              <polygon points="50,25 75,75 25,75" fill="none" stroke="#00e87a" strokeWidth="1.5"/>
            </>
          )}
        </svg>
      </motion.div>

      {/* Icon badge */}
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '10px',
        background: 'rgba(0,232,122,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        transition: 'background 0.3s',
      }}>
        <Icon size={24} style={{ color: 'var(--accent-primary)' }} />
      </div>

      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', color: 'var(--text-primary)', marginBottom: '12px' }}>
        {service.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
        {service.desc}
      </p>

      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', color: 'var(--accent-primary)' }}>
          Learn more →
        </span>
      </div>
    </motion.div>
  );
}

export function Works() {
  return (
    <section id="services" style={{ background: 'var(--bg-deep)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>
              WHAT WE DO
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4.5vw, 60px)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}>
              Our Core Capabilities
            </h2>
          </motion.div>

          {/* Hexagonal decoration */}
          <motion.svg
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            width="120" height="120" viewBox="0 0 120 120"
            style={{ opacity: 0.05, flexShrink: 0 }}
          >
            {[0,1,2].map(row =>
              [0,1,2].map(col => (
                <polygon key={`${row}-${col}`}
                  points={`${20+col*40},${10+row*34} ${40+col*40},${10+row*34} ${50+col*40},${27+row*34} ${40+col*40},${44+row*34} ${20+col*40},${44+row*34} ${10+col*40},${27+row*34}`}
                  fill="none" stroke="#00e87a" strokeWidth="1"
                />
              ))
            )}
          </motion.svg>
        </div>

        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }} className="services-grid">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr 1fr !important; }
          .service-card[style*="span 2"] { grid-column: span 2 !important; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .service-card[style*="span 2"] { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}