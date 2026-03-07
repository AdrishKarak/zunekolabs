import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const ROW1_ITEMS = ['15+ Clients', 'AI Automation', 'Frappe/ERPNext', 'Computer Vision', 'LangChain', 'Python', 'LLM Engineering'];
const ROW2_ITEMS = ['Pune & Kolkata', '50+ Projects', 'Digital Transformation', 'RAG Systems', 'OpenCV', 'Hugging Face', 'FastAPI', 'React'];

const STATS = [
  { end: 15, suffix: '+', label: 'Clients Served' },
  { end: 4, suffix: '', label: 'AI Verticals' },
  { end: 2, suffix: '', label: 'City Presence' },
  { end: 5, suffix: ' LPA', label: 'Top Salary' },
];

function CountUpStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp({ end, duration: 2000 });

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '0 32px',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(40px, 5vw, 56px)',
        color: 'var(--text-primary)',
        lineHeight: 1,
      }}>
        {count}{suffix}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--text-secondary)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  );
}

export function StatsCarousel() {
  const row1 = [...ROW1_ITEMS, ...ROW1_ITEMS];
  const row2 = [...ROW2_ITEMS, ...ROW2_ITEMS];

  return (
    <section style={{
      background: 'var(--bg-deep)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '80px 0',
      overflow: 'hidden',
    }}>
      {/* Row 1 marquee */}
      <div style={{ overflow: 'hidden', marginBottom: '0px' }}>
        <div className="marquee-left" style={{ display: 'flex', gap: '0px', width: 'max-content' }}>
          {row1.map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '28px',
                color: i % 2 === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                padding: '0 16px',
              }}>{item}</span>
              <span style={{ color: 'var(--accent-primary)', fontSize: '16px' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '48px auto',
          maxWidth: '800px',
          padding: '0 24px',
        }}
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center' }}>
            <CountUpStat {...stat} />
            {i < STATS.length - 1 && (
              <div style={{ width: '1px', height: '60px', background: 'var(--border-subtle)' }} />
            )}
          </div>
        ))}
      </motion.div>

      {/* Row 2 marquee (reversed) */}
      <div style={{ overflow: 'hidden' }}>
        <div className="marquee-right" style={{ display: 'flex', gap: '0px', width: 'max-content' }}>
          {row2.map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
                padding: '0 16px',
                textTransform: 'uppercase',
              }}>{item}</span>
              <span style={{ color: 'var(--accent-primary)', fontSize: '12px' }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}