import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const ROW1_ITEMS = ['15+ Clients', 'AI Automation', 'Frappe/ERPNext', 'Computer Vision', 'LangChain', 'Python', 'LLM Engineering'];
const ROW2_ITEMS = ['Pune & Kolkata', '50+ Projects', 'Digital Transformation', 'RAG Systems', 'OpenCV', 'Hugging Face', 'FastAPI', 'React'];

const STATS = [
  { end: 15, suffix: '+',    label: 'Clients Served' },
  { end: 4,  suffix: '',     label: 'AI Verticals'   },
  { end: 2,  suffix: '',     label: 'City Presence'  },
  { end: 5,  suffix: ' LPA', label: 'Top Salary'     },
];

/* ─── Keyframes + responsive overrides ─────────────────────────── */
const CSS = `
@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.marquee-track-left {
  display: flex;
  width: max-content;
  animation: marquee-left 28s linear infinite;
  will-change: transform;
}
.marquee-track-right {
  display: flex;
  width: max-content;
  animation: marquee-right 34s linear infinite;
  will-change: transform;
}
.marquee-track-left:hover,
.marquee-track-right:hover {
  animation-play-state: paused;
}

/* ─── Stats row ─────────────────────────────────────────────────── */
.stats-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  margin: 52px auto;
  max-width: 840px;
  padding: 0 24px;
}

/* On small screens: 2×2 grid */
@media (max-width: 540px) {
  .stats-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    margin: 40px auto;
    padding: 0 16px;
    max-width: 340px;
  }
  .stat-divider-v { display: none !important; }
  .stat-cell {
    padding: 20px 16px !important;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .stat-cell:nth-child(1),
  .stat-cell:nth-child(2) {
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .stat-cell:nth-child(3),
  .stat-cell:nth-child(4) {
    border-bottom: none;
  }
  .stat-cell:nth-child(odd) {
    border-right: 1px solid rgba(255,255,255,0.06);
  }
  .stat-value {
    font-size: 36px !important;
  }
}

/* Pill text size on small screens */
@media (max-width: 480px) {
  .pill-text-lg { font-size: 13px !important; padding: 0 14px !important; }
  .pill-sep-lg  { font-size: 10px !important; }
  .pill-text-sm { font-size: 11px !important; padding: 0 12px !important; }
}
`;

function StyleInjector() {
  if (typeof document !== 'undefined' && !document.getElementById('marquee-styles')) {
    const tag = document.createElement('style');
    tag.id = 'marquee-styles';
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }
  return null;
}

/* ─── Pill ──────────────────────────────────────────────────────── */
function Pill({ text, index, size = 'lg' }: { text: string; index: number; size?: 'lg' | 'sm' }) {
  const isAccent = index % 3 === 0;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
      <span
        className={size === 'lg' ? 'pill-text-lg' : 'pill-text-sm'}
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: isAccent ? 600 : 400,
          fontSize: size === 'lg' ? '16px' : '13px',
          color: isAccent ? 'var(--text-primary)' : 'var(--text-secondary)',
          whiteSpace: 'nowrap',
          padding: size === 'lg' ? '0 24px' : '0 18px',
          letterSpacing: size === 'sm' ? '0.04em' : '0',
          opacity: size === 'sm' ? 0.7 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        {text}
      </span>
      <span
        className={size === 'lg' ? 'pill-sep-lg' : undefined}
        style={{
          color: 'var(--accent-primary)',
          fontSize: size === 'lg' ? '14px' : '10px',
          opacity: 0.7,
          flexShrink: 0,
        }}
      >
        ✦
      </span>
    </span>
  );
}

/* ─── Marquee row ───────────────────────────────────────────────── */
function MarqueeRow({ items, direction, size = 'lg' }: {
  items: string[];
  direction: 'left' | 'right';
  size?: 'lg' | 'sm';
}) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(90deg, var(--bg-deep) 0%, transparent 8%, transparent 92%, var(--bg-deep) 100%)',
      }} />
      <div className={direction === 'left' ? 'marquee-track-left' : 'marquee-track-right'}>
        {repeated.map((item, i) => (
          <Pill key={i} text={item} index={i} size={size} />
        ))}
      </div>
    </div>
  );
}

/* ─── Stat cell ─────────────────────────────────────────────────── */
function CountUpStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp({ end, duration: 2000 });
  return (
    <div
      ref={ref}
      className="stat-cell"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '0 40px',
      }}
    >
      <span
        className="stat-value"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(34px, 4.5vw, 54px)',
          color: 'var(--accent-primary)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {count}{suffix}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(9px, 1.5vw, 10px)',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase' as const,
        opacity: 0.75,
        textAlign: 'center',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────────── */
export function StatsCarousel() {
  return (
    <section style={{
      background: 'var(--bg-deep)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: 'clamp(48px, 8vw, 72px) 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <StyleInjector />

      {/* Row 1 */}
      <MarqueeRow items={ROW1_ITEMS} direction="left" size="lg" />

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: EASE_SMOOTH }}
        className="stats-row"
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ display: 'contents' }}>
            <CountUpStat {...stat} />
            {i < STATS.length - 1 && (
              <div
                className="stat-divider-v"
                style={{
                  width: '1px',
                  height: '56px',
                  background: 'linear-gradient(to bottom, transparent, var(--border-subtle), transparent)',
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Row 2 */}
      <MarqueeRow items={ROW2_ITEMS} direction="right" size="sm" />
    </section>
  );
}