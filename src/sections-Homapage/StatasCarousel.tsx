import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const ROW1_ITEMS = ['15+ Clients', 'AI Automation', 'Frappe/ERPNext', 'Computer Vision', 'LangChain', 'Python', 'LLM Engineering'];
const ROW2_ITEMS = ['Pune & Kolkata', '50+ Projects', 'Digital Transformation', 'RAG Systems', 'OpenCV', 'Hugging Face', 'FastAPI', 'React'];

const STATS = [
  { end: 15, suffix: '+', label: 'Clients Served' },
  { end: 4,  suffix: '',  label: 'AI Verticals'   },
  { end: 2,  suffix: '',  label: 'City Presence'   },
  { end: 5,  suffix: ' LPA', label: 'Top Salary'  },
];

/* ─── Keyframes injected once ────────────────────────────────────── */
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

/* ─── Single marquee pill ────────────────────────────────────────── */
function Pill({ text, index, size = 'lg' }: { text: string; index: number; size?: 'lg' | 'sm' }) {
  const isAccent = index % 3 === 0;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '16px',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontWeight: isAccent ? 600 : 400,
        fontSize: size === 'lg' ? '16px' : '13px',
        color: isAccent ? 'var(--text-primary)' : 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        padding: size === 'lg' ? '0 24px' : '0 18px',
        letterSpacing: size === 'sm' ? '0.04em' : '0',
        opacity: size === 'sm' ? 0.7 : 1,
        transition: 'opacity 0.2s',
      }}>
        {text}
      </span>
      {/* Separator diamond */}
      <span style={{
        color: 'var(--accent-primary)',
        fontSize: size === 'lg' ? '14px' : '10px',
        opacity: 0.7,
        flexShrink: 0,
      }}>
        ✦
      </span>
    </span>
  );
}

/* ─── Marquee row — renders 4 copies so loop is seamless ─────────── */
function MarqueeRow({ items, direction, size = 'lg' }: {
  items: string[];
  direction: 'left' | 'right';
  size?: 'lg' | 'sm';
}) {
  // 4 copies guarantees the -50% translate always has a full set visible
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      {/* Edge fades */}
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

/* ─── Count-up stat ──────────────────────────────────────────────── */
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
        padding: '0 40px',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(38px, 4.5vw, 54px)',
        color: 'var(--accent-primary)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {count}{suffix}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase' as const,
        opacity: 0.75,
      }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────── */
export function StatsCarousel() {
  return (
    <section style={{
      background: 'var(--bg-deep)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '72px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <StyleInjector />

      {/* Row 1 — scrolls left */}
      <MarqueeRow items={ROW1_ITEMS} direction="left" size="lg" />

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: EASE_SMOOTH }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '52px auto',
          maxWidth: '840px',
          padding: '0 24px',
        }}
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center' }}>
            <CountUpStat {...stat} />
            {i < STATS.length - 1 && (
              <div style={{
                width: '1px',
                height: '56px',
                background: 'linear-gradient(to bottom, transparent, var(--border-subtle), transparent)',
              }} />
            )}
          </div>
        ))}
      </motion.div>

      {/* Row 2 — scrolls right, smaller text */}
      <MarqueeRow items={ROW2_ITEMS} direction="right" size="sm" />
    </section>
  );
}