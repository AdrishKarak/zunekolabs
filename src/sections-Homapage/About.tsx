import { motion } from 'framer-motion';
import { Zap, Eye, Database, Brain } from 'lucide-react';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const FEATURE_CARDS = [
  { icon: Zap, title: 'AI-First Engineering', desc: 'We build systems where AI is the core, not an add-on. Every workflow reimagined from scratch.' },
  { icon: Eye, title: 'Computer Vision Systems', desc: 'Custom visual intelligence pipelines for manufacturing, retail, and industrial automation.' },
  { icon: Database, title: 'Frappe ERP Expertise', desc: 'Deep, certified expertise in deploying and customizing Frappe/ERPNext at enterprise scale.' },
  { icon: Brain, title: 'LLM & Automation Workflows', desc: 'RAG pipelines, agent systems, and LLM integrations that transform how teams operate.' },
];

function FeatureCard({ card, index }: { card: typeof FEATURE_CARDS[0]; index: number }) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_SMOOTH }}
      whileHover={{
        borderColor: 'rgba(34,197,94,0.45)',
        boxShadow: '0 0 30px rgba(34,197,94,0.1)',
      }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '10px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Decorative corner element */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        width: '40px',
        height: '40px',
        border: '1px solid rgba(34,197,94,0.1)',
        background: 'rgba(34,197,94,0.05)',
        transform: 'rotate(45deg)',
      }} />

      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.25 }}>
        <Icon size={32} style={{ color: 'var(--accent-primary)', marginBottom: '12px' }} />
      </motion.div>
      <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17px', color: 'var(--text-primary)', marginBottom: '8px' }}>
        {card.title}
      </h4>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
        {card.desc}
      </p>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" style={{
      background: 'var(--bg-deep)',
      padding: '120px 0',
      backgroundImage: 'repeating-linear-gradient(45deg, rgba(34,197,94,0.03) 0px, rgba(34,197,94,0.03) 1px, transparent 1px, transparent 40px)',
    }}>
      <div style={{
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }}
        className="about-grid"
      >
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH }}
          style={{ position: 'relative' }}
        >
          {/* Decorative large number */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            left: '-20px',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '220px',
            color: 'rgba(34,197,94,0.04)',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}>02</div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '20px' }}>
              ABOUT US
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 52px)',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '24px',
            }}>
              Where Indian Enterprises Meet the Future of AI
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '16px' }}>
              Zuneko Labs is an enterprise technology firm and a focused vertical of Emdee Digitronics. We specialize in AI automation, computer vision, and digital transformation—built specifically for the scale and complexity of large Indian businesses.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '28px' }}>
              Operating from Pune and Kolkata, our engineers build everything from Frappe/ERPNext platforms to custom LLM-powered applications that directly impact how enterprises run.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['📍 Pune & Kolkata', '🏢 Vertical of Emdee Digitronics'].map(fact => (
                <span key={fact} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  background: 'rgba(34,197,94,0.04)',
                }}>{fact}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column - feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {FEATURE_CARDS.map((card, i) => (
            <FeatureCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}