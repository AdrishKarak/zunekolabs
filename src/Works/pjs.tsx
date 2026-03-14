import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Dark green palette ─────────────────────────────────────── */
const G1 = '#1a6e42';
const G2 = '#0d5233';

const GLOBAL_STYLES = `
  @keyframes op-scanline {
    0%   { transform: translateY(-100%); opacity: 0; }
    8%   { opacity: 0.6; }
    92%  { opacity: 0.6; }
    100% { transform: translateY(3000%); opacity: 0; }
  }
  .op-scanline-el { animation: op-scanline 3.2s ease-in-out infinite; }

  @keyframes op-pulse {
    0%,100% { transform: scale(1);    opacity: 0.4; }
    50%      { transform: scale(1.18); opacity: 0.12; }
  }
  .op-pulse-ring { animation: op-pulse 2.6s ease-in-out infinite; }

  @keyframes op-dot-blink {
    0%,100% { opacity:0.9; } 50% { opacity:0.3; }
  }
  .op-dot { animation: op-dot-blink 1.8s ease-in-out infinite; }

  .op-card-hover { transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; }
  .op-card-hover:hover { transform: translateY(-4px); }

  /* ── Responsive ── */
  @media (max-width: 860px) {
    .op-featured-grid  { grid-template-columns: 1fr !important; }
    .op-medium-grid    { grid-template-columns: 1fr !important; }
    .op-pranic-deliv   { grid-template-columns: 1fr 1fr !important; }
    .op-featured-pad   { padding: 22px !important; }
    .op-medium-pad     { padding: 20px !important; }
    .op-pranic-pad     { padding: 22px 20px !important; }
  }
  @media (max-width: 520px) {
    .op-pranic-deliv   { grid-template-columns: 1fr !important; }
    .op-featured-grid  { gap: 24px !important; }
    .op-section        { padding: 72px 16px !important; }
    .op-h1             { font-size: clamp(28px,7vw,44px) !important; }
    .op-header-mb      { margin-bottom: 48px !important; }
    .op-stats-row      { gap: 6px !important; }
    .op-footer-row     { flex-direction: column !important; align-items: flex-start !important; }
  }
`;

/* ─── Reveal helpers ─────────────────────────────────────────── */
function RevealClip({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      style={style}
    >{children}</motion.div>
  );
}
function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={style}
    >{children}</motion.div>
  );
}
function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={style}
    >{children}</motion.div>
  );
}

/* ─── Stat pill ──────────────────────────────────────────────── */
function StatPill({ val, label, color, delay }: { val: string; label: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.42, delay, ease: EASE }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '9px 14px', borderRadius: 10, background: `${color}08`, border: `1px solid ${color}22`, minWidth: 60, textAlign: 'center' }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, color, lineHeight: 1, marginBottom: 3 }}>{val}</span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: '#3d7a55', lineHeight: 1.3 }}>{label}</span>
    </motion.div>
  );
}

/* ─── Tag chip ───────────────────────────────────────────────── */
function Tag({ label, color, delay }: { label: string; color: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.36, delay, ease: EASE }}
      style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, padding: '3px 9px', borderRadius: 100, border: `1px solid ${color}28`, color: '#3d7a55', background: `${color}06`, display: 'inline-block' }}
    >{label}</motion.span>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'banglar',
    category: 'SOFTWARE',
    scope: 'State-wide · WB',
    title: 'Banglar Shiksha SMS',
    subtitle: 'School Management Software — Govt. of West Bengal',
    size: 'featured',
    color: G1,
    stats: [
      { val: '1.9Cr', label: 'Students' },
      { val: '97K',   label: 'Schools' },
      { val: '4.7L',  label: 'Faculty' },
      { val: '500+',  label: 'Smart Classes' },
    ],
    desc: 'We built the software the entire public primary education system of West Bengal runs on. Banglar Shiksha digitalises academic & administrative workflows — e-books, exams, attendance, MIS reporting — serving as the state-wide digital backbone of primary education.',
    tags: ['EdTech', 'E-Governance', 'SaaS', 'State-Wide'],
    svg: (
      <svg viewBox="0 0 100 72" fill="none" style={{ width: '100%', height: '100%' }}>
        <rect x="8" y="8" width="84" height="56" rx="4" stroke={G1} strokeWidth="1.2" opacity="0.35"/>
        <line x1="8" y1="20" x2="92" y2="20" stroke={G1} strokeWidth="0.7" opacity="0.15"/>
        {[0,1,2,3,4].map(col=>[0,1,2,3].map(row=>(
          <rect key={`${col}-${row}`} x={14+col*16} y={26+row*10} width="10" height="6" rx="1.5" fill={G1} opacity={0.05+row*0.05+col*0.02}/>
        )))}
        <rect x="14" y="26" width="28" height="6" rx="1.5" fill={G1} opacity="0.38"/>
        <rect x="14" y="36" width="20" height="6" rx="1.5" fill={G1} opacity="0.25"/>
        <circle cx="78" cy="14" r="3" fill={G1} opacity="0.55"/>
        <circle cx="86" cy="14" r="3" fill={G1} opacity="0.3"/>
        <path d="M60 52 L68 44 L76 50 L84 42" stroke={G1} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.5"/>
        {[60,68,76,84].map((x,i)=><circle key={i} cx={x} cy={[52,44,50,42][i]} r="2" fill={G1} opacity={0.35+i*0.1}/>)}
      </svg>
    ),
  },
  {
    id: 'aadhaar',
    category: 'DATA SERVICES',
    scope: '4 states · UIDAI / ECI',
    title: 'Aadhaar & Digital Identity',
    subtitle: 'ECI, UIDAI & large-scale digitisation',
    size: 'medium',
    color: G2,
    stats: [
      { val: '200M+', label: 'Records digitised' },
      { val: '20M+',  label: 'Aadhaar enrolments' },
      { val: '3,500+',label: 'BSK centres' },
    ],
    desc: "Ran India's 11th largest Aadhaar enrolment drive across 4 states & 1,200+ centres. Digitised 200M+ unique records — land deeds, high court docs, electoral rolls, ration cards, census. Manages the complete UIDAI ecosystem in West Bengal.",
    tags: ['UIDAI', 'Digitisation', 'Identity', 'Scale'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={52} height={52}>
        <circle cx="40" cy="32" r="14" stroke={G2} strokeWidth="1.3" opacity="0.6"/>
        <circle cx="40" cy="32" r="8"  stroke={G2} strokeWidth="1"   opacity="0.4"/>
        <circle cx="40" cy="32" r="3"  fill={G2}   opacity="0.85"/>
        <path d="M20 56 C20 44 60 44 60 56" stroke={G2} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6"/>
        <line x1="8" y1="20" x2="18" y2="20" stroke={G2} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
        <line x1="8" y1="32" x2="14" y2="32" stroke={G2} strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
        <line x1="8" y1="44" x2="18" y2="44" stroke={G2} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
        <line x1="62" y1="20" x2="72" y2="20" stroke={G2} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
        <line x1="66" y1="32" x2="72" y2="32" stroke={G2} strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
        <line x1="62" y1="44" x2="72" y2="44" stroke={G2} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 'surveillance',
    category: 'SECURITY & COMPUTER VISION',
    scope: 'WB State-wide · EDPL',
    title: 'Surveillance & Video Analytics',
    subtitle: 'CCTV, ANPR & facial recognition at scale',
    size: 'medium',
    color: G1,
    stats: [
      { val: '250+', label: 'Police stations' },
      { val: '750+', label: 'Schools' },
      { val: '4K+',  label: 'Cameras' },
      { val: '25',   label: 'RTOs with ANPR' },
    ],
    desc: 'Deploys and manages surveillance across 250+ WBP police stations, 750+ schools, public spaces and govt. offices. ANPR at 25 RTOs, facial recognition at 100+ schools, CCTV video analytics at AIIMS Patna. Full city & traffic surveillance stack.',
    tags: ['CCTV', 'ANPR', 'Facial Recognition', 'Video Analytics'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={52} height={52}>
        <path d="M10 30 L24 24 L36 30 L36 54 L10 54 Z" stroke={G1} strokeWidth="1.3" fill="none" opacity="0.6"/>
        <circle cx="48" cy="38" r="18" stroke={G1} strokeWidth="1"   opacity="0.18"/>
        <circle cx="48" cy="38" r="11" stroke={G1} strokeWidth="1.2" opacity="0.38"/>
        <circle cx="48" cy="38" r="5"  stroke={G1} strokeWidth="1.4" opacity="0.7"/>
        <circle cx="48" cy="38" r="2"  fill={G1}   opacity="0.9"/>
        <line x1="36" y1="30" x2="40" y2="34" stroke={G1} strokeWidth="1.2" opacity="0.45"/>
        <line x1="14" y1="34" x2="32" y2="34" stroke={G1} strokeWidth="0.8" opacity="0.28"/>
        <line x1="14" y1="40" x2="32" y2="40" stroke={G1} strokeWidth="0.8" opacity="0.22"/>
        <line x1="14" y1="46" x2="32" y2="46" stroke={G1} strokeWidth="0.8" opacity="0.18"/>
      </svg>
    ),
  },
  {
    id: 'pranishakti',
    category: 'DIGITAL TRANSFORMATION',
    scope: 'Govt. of West Bengal',
    title: 'Pranishakti / ARD',
    subtitle: 'Animal Resources Dept. — Full IT & ERP deployment',
    size: 'pranishakti',
    color: G2,
    stats: [
      { val: 'Full Stack', label: 'IT Infrastructure' },
      { val: 'Custom',     label: 'E-Gov ERP' },
      { val: 'On-site',    label: 'IT Manpower' },
    ],
    desc: 'End-to-end digital transformation of the Animal Resources Department, Govt. of West Bengal. Covers complete IT infrastructure provisioning, a custom-built e-governance ERP system (inventory management, vaccination records, cattle insurance, project tracking), and permanent on-site IT manpower placement.',
    tags: ['Infrastructure', 'ERP', 'IT Manpower', 'E-Governance', 'WB Govt'],
    svg: (
      <svg viewBox="0 0 80 80" fill="none" width={64} height={64}>
        <rect x="10" y="36" width="60" height="30" rx="2" stroke={G2} strokeWidth="1.3" opacity="0.5"/>
        <path d="M10 36 L40 14 L70 36" stroke={G2} strokeWidth="1.4" fill="none" strokeLinejoin="round" opacity="0.65"/>
        <circle cx="40" cy="18" r="3.5" fill={G2} opacity="0.55"/>
        <rect x="17" y="42" width="6" height="20" rx="1" stroke={G2} strokeWidth="1" opacity="0.4"/>
        <rect x="29" y="42" width="6" height="20" rx="1" stroke={G2} strokeWidth="1" opacity="0.4"/>
        <rect x="45" y="42" width="6" height="20" rx="1" stroke={G2} strokeWidth="1" opacity="0.4"/>
        <rect x="57" y="42" width="6" height="20" rx="1" stroke={G2} strokeWidth="1" opacity="0.4"/>
        <rect x="33" y="52" width="14" height="14" rx="1.5" stroke={G2} strokeWidth="1.3" opacity="0.65"/>
        <circle cx="40" cy="60" r="1.5" fill={G2} opacity="0.5"/>
        <circle cx="20" cy="8" r="5" stroke={G2} strokeWidth="1.1" opacity="0.5"/>
        <circle cx="40" cy="5" r="5" stroke={G2} strokeWidth="1.2" opacity="0.65"/>
        <circle cx="60" cy="8" r="5" stroke={G2} strokeWidth="1.1" opacity="0.5"/>
        <line x1="25" y1="8" x2="35" y2="6" stroke={G2} strokeWidth="0.8" opacity="0.3"/>
        <line x1="45" y1="6" x2="55" y2="8" stroke={G2} strokeWidth="0.8" opacity="0.3"/>
        <text x="40" y="7" textAnchor="middle" fill={G2} fontSize="4.5" fontFamily="monospace" opacity="0.7">ERP</text>
      </svg>
    ),
  },
  {
    id: 'tatapower',
    category: 'OCR + BILLING AUTOMATION',
    scope: 'WB · JK · Odisha · Bihar',
    title: 'Tata Power — Spot Billing',
    subtitle: 'OCR-enabled door-to-door billing for 5 DISCOMs',
    size: 'featured',
    color: G1,
    stats: [
      { val: '4Cr+',   label: 'Consumers billed' },
      { val: '5',      label: 'DISCOMs' },
      { val: '4 States',label: 'Coverage' },
    ],
    desc: 'Full-stack spot-billing system for 4 crore+ consumers across 5 DISCOMs. OCR/image-based meter capture, GPS+time-stamped validation, instant Bluetooth bill printing, route-file provisioning, anomaly detection (zero-use/tamper flags), door-to-door billing, payment collection, daily MIS uploads, and DISCOM server reconciliation.',
    tags: ['OCR', 'Utility Billing', 'GPS', 'Anomaly Detection', 'DISCOMs'],
    svg: (
      <svg viewBox="0 0 100 72" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M50 8 L60 28 L50 28 L60 52 L38 30 L50 30 L38 8 Z" stroke={G1} strokeWidth="1.4" fill="none" strokeLinejoin="round" opacity="0.8"/>
        {[0,1,2].map(i=><circle key={i} cx={20+i*30} cy={62} r={3} stroke={G1} strokeWidth="1.1" opacity={0.35+i*0.1}/>)}
        <line x1="23" y1="62" x2="47" y2="62" stroke={G1} strokeWidth="0.8" opacity="0.2" strokeDasharray="2 2"/>
        <line x1="53" y1="62" x2="77" y2="62" stroke={G1} strokeWidth="0.8" opacity="0.2" strokeDasharray="2 2"/>
        <rect x="8"  y="16" width="18" height="24" rx="2" stroke={G1} strokeWidth="1.1" opacity="0.32"/>
        <rect x="74" y="16" width="18" height="24" rx="2" stroke={G1} strokeWidth="1.1" opacity="0.32"/>
        <line x1="10" y1="22" x2="24" y2="22" stroke={G1} strokeWidth="0.8" opacity="0.28"/>
        <line x1="10" y1="27" x2="24" y2="27" stroke={G1} strokeWidth="0.8" opacity="0.22"/>
        <line x1="10" y1="32" x2="20" y2="32" stroke={G1} strokeWidth="0.8" opacity="0.18"/>
        <line x1="76" y1="22" x2="90" y2="22" stroke={G1} strokeWidth="0.8" opacity="0.28"/>
        <line x1="76" y1="27" x2="90" y2="27" stroke={G1} strokeWidth="0.8" opacity="0.22"/>
        <line x1="76" y1="32" x2="86" y2="32" stroke={G1} strokeWidth="0.8" opacity="0.18"/>
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════════
   CARD COMPONENTS
═══════════════════════════════════════════════════════════════ */

/* ── Featured (full-width) ── */
function FeaturedCard({ p }: { p: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="op-card-hover"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        background: '#ffffff',
        border: `1px solid ${hovered ? p.color + '35' : 'rgba(26,110,66,0.12)'}`,
        boxShadow: hovered
          ? `0 20px 56px rgba(26,110,66,0.14), 0 0 0 1px ${p.color}18`
          : '0 2px 16px rgba(26,110,66,0.07)',
        position: 'relative',
      }}
    >
      {hovered && (
        <div className="op-scanline-el" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${p.color}50,transparent)`, zIndex: 4, pointerEvents: 'none' }}/>
      )}
      <div style={{ height: 2, background: `linear-gradient(90deg,${p.color},transparent)`, opacity: hovered ? 0.85 : 0.4, transition: 'opacity 0.3s' }}/>

      {/* Two-column on desktop, single-column on mobile */}
      <div
        className="op-featured-grid op-featured-pad"
        style={{ padding: 32, display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 36, alignItems: 'center' }}
      >
        {/* Left */}
        <div>
          <RevealClip delay={0.06} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.18em', color: p.color, border: `1px solid ${p.color}30`, padding: '2px 10px', borderRadius: 100 }}>{p.category}</span>
              <span className="op-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: p.color, display: 'inline-block' }}/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: '#3d7a55', opacity: 0.65 }}>{p.scope}</span>
            </div>
          </RevealClip>

          <div style={{ overflow: 'hidden', marginBottom: 5 }}>
            <RevealClip delay={0.13}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px,2.4vw,30px)', color: '#0d3d22', margin: 0, lineHeight: 1.1 }}>{p.title}</h2>
            </RevealClip>
          </div>

          <FadeUp delay={0.18} style={{ marginBottom: 16 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#3d7a55', margin: 0, letterSpacing: '0.04em', opacity: 0.75 }}>{p.subtitle}</p>
          </FadeUp>

          <FadeUp delay={0.23} style={{ marginBottom: 20 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#3d6b50', lineHeight: 1.78, margin: 0 }}>{p.desc}</p>
          </FadeUp>

          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {p.tags.map((t, i) => <Tag key={t} label={t} color={p.color} delay={0.27 + i * 0.05}/>)}
          </div>
        </div>

        {/* Right: SVG + stats */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.5, scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.32 }}
            style={{ width: '100%', maxWidth: 200, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {p.svg}
          </motion.div>
          <div className="op-stats-row" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {p.stats.map((s, i) => <StatPill key={i} val={s.val} label={s.label} color={p.color} delay={0.2 + i * 0.07}/>)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Medium card ── */
function MediumCard({ p, index }: { p: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="op-card-hover"
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        background: '#ffffff',
        border: `1px solid ${hovered ? p.color + '35' : 'rgba(26,110,66,0.12)'}`,
        boxShadow: hovered ? `0 16px 48px rgba(26,110,66,0.13)` : '0 2px 14px rgba(26,110,66,0.06)',
        position: 'relative',
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="op-pulse-ring"
            style={{ position: 'absolute', top: 18, right: 18, width: 40, height: 40, borderRadius: '50%', border: `1.5px solid ${p.color}`, pointerEvents: 'none', zIndex: 2 }}
          />
        )}
      </AnimatePresence>

      <div style={{ height: 2, background: `linear-gradient(90deg,${p.color},transparent)`, opacity: hovered ? 0.75 : 0.3, transition: 'opacity 0.3s' }}/>

      <div className="op-medium-pad" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, gap: 12 }}>
          <div style={{ flex: 1 }}>
            <RevealClip delay={index * 0.1 + 0.06} style={{ marginBottom: 7 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.16em', color: p.color, border: `1px solid ${p.color}28`, padding: '2px 9px', borderRadius: 100, display: 'inline-block' }}>{p.category}</span>
            </RevealClip>
            <div style={{ overflow: 'hidden', marginBottom: 4 }}>
              <RevealClip delay={index * 0.1 + 0.13}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#0d3d22', margin: 0, lineHeight: 1.2 }}>{p.title}</h3>
              </RevealClip>
            </div>
            <FadeUp delay={index * 0.1 + 0.18}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3d7a55', margin: 0, letterSpacing: '0.04em', opacity: 0.7 }}>{p.subtitle}</p>
            </FadeUp>
          </div>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.5, rotate: hovered ? 3 : 0 }}
            transition={{ duration: 0.28 }}
            style={{ flexShrink: 0 }}
          >
            {p.svg}
          </motion.div>
        </div>

        <FadeUp delay={index * 0.1 + 0.21} style={{ marginBottom: 16 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3d6b50', lineHeight: 1.72, margin: 0 }}>{p.desc}</p>
        </FadeUp>

        <div className="op-stats-row" style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 14 }}>
          {p.stats.map((s, i) => <StatPill key={i} val={s.val} label={s.label} color={p.color} delay={index * 0.1 + 0.25 + i * 0.07}/>)}
        </div>

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {p.tags.map((t, i) => <Tag key={t} label={t} color={p.color} delay={index * 0.1 + 0.29 + i * 0.05}/>)}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Pranishakti ── */
function PranishaktiCard({ p }: { p: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const deliverables = [
    { icon: '🖥', label: 'Full IT Infrastructure', sub: 'Hardware, network & support' },
    { icon: '⚙️', label: 'Custom ERP',            sub: 'Inventory, vaccines, insurance, PM' },
    { icon: '👥', label: 'IT Manpower',           sub: 'On-site team placement' },
    { icon: '🏛', label: 'E-Governance',          sub: 'Digital workflows, state-wide' },
  ];

  return (
    <motion.div
      ref={ref}
      className="op-card-hover"
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        background: '#ffffff',
        border: `1px solid ${hovered ? p.color + '35' : 'rgba(26,110,66,0.12)'}`,
        boxShadow: hovered ? `0 18px 52px rgba(26,110,66,0.13)` : '0 2px 16px rgba(26,110,66,0.07)',
        position: 'relative',
      }}
    >
      <div style={{ height: 2, background: `linear-gradient(90deg,${p.color},transparent)`, opacity: hovered ? 0.8 : 0.35, transition: 'opacity 0.3s' }}/>

      <div className="op-pranic-pad" style={{ padding: '28px 32px' }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <RevealClip delay={0.06} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.18em', color: p.color, border: `1px solid ${p.color}30`, padding: '2px 10px', borderRadius: 100 }}>{p.category}</span>
                <span className="op-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: p.color, display: 'inline-block' }}/>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: '#3d7a55', opacity: 0.65 }}>Govt. of West Bengal</span>
              </div>
            </RevealClip>
            <div style={{ overflow: 'hidden', marginBottom: 4 }}>
              <RevealClip delay={0.13}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(18px,2.2vw,26px)', color: '#0d3d22', margin: 0, lineHeight: 1.1 }}>Pranishakti / ARD</h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.18}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#3d7a55', margin: 0, letterSpacing: '0.04em', opacity: 0.7 }}>Animal Resources Department — End-to-end digital transformation</p>
            </FadeUp>
          </div>
          <motion.div animate={{ opacity: hovered ? 1 : 0.5, scale: hovered ? 1.04 : 1 }} transition={{ duration: 0.3 }}>
            {p.svg}
          </motion.div>
        </div>

        <FadeUp delay={0.22} style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#3d6b50', lineHeight: 1.78, margin: 0, maxWidth: 760 }}>{p.desc}</p>
        </FadeUp>

        {/* Deliverables — 4 tiles, 2-col on mobile */}
        <div
          className="op-pranic-deliv"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 22 }}
        >
          {deliverables.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.44, delay: 0.24 + i * 0.08, ease: EASE }}
              style={{ padding: '14px 12px', borderRadius: 10, background: `${p.color}07`, border: `1px solid ${p.color}18`, display: 'flex', flexDirection: 'column', gap: 5 }}
            >
              <span style={{ fontSize: 18 }}>{d.icon}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12.5, color: '#0d3d22', lineHeight: 1.3 }}>{d.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: '#3d7a55', opacity: 0.7 }}>{d.sub}</span>
            </motion.div>
          ))}
        </div>

        {/* Stats + tags */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div className="op-stats-row" style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {p.stats.map((s, i) => <StatPill key={i} val={s.val} label={s.label} color={p.color} delay={0.36 + i * 0.07}/>)}
          </div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {p.tags.map((t, i) => <Tag key={t} label={t} color={p.color} delay={0.4 + i * 0.05}/>)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export function OurProjectsPage() {
  const featured = PROJECTS.filter(p => p.size === 'featured');
  const medium   = PROJECTS.filter(p => p.size === 'medium');
  const pranic   = PROJECTS.find(p => p.size === 'pranishakti')!;

  return (
    <section
      id="projects"
      className="op-section"
      style={{ background: '#ffffff', padding: 'clamp(72px,10vw,120px) clamp(16px,4vw,32px)', overflow: 'hidden', minHeight: '100vh' }}
    >
      <style>{GLOBAL_STYLES}</style>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>

        {/* Header */}
        <div className="op-header-mb" style={{ marginBottom: 72 }}>
          <RevealClip delay={0} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: G1, letterSpacing: '0.22em', opacity: 0.8 }}>OUR PROJECTS</span>
              <div style={{ flex: 1, minWidth: 40, height: 1, background: `linear-gradient(90deg,rgba(26,110,66,0.3),transparent)` }}/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#3d7a55', opacity: 0.5 }}>Emdee × Zuneko</span>
            </div>
          </RevealClip>

          <div style={{ overflow: 'hidden', marginBottom: 4 }}>
            <RevealClip delay={0.08}>
              <h1 className="op-h1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(32px,5vw,68px)', color: '#0d3d22', lineHeight: 1.04, margin: 0 }}>Enterprise scale.</h1>
            </RevealClip>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 20 }}>
            <RevealClip delay={0.17}>
              <h1 className="op-h1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(32px,5vw,68px)', color: G1, lineHeight: 1.04, margin: 0 }}>Government trust.</h1>
            </RevealClip>
          </div>

          <FadeUp delay={0.26}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px,1.4vw,15px)', color: '#3d6b50', lineHeight: 1.78, maxWidth: 560, margin: 0 }}>
              From state-wide education infrastructure to utility billing for crores of consumers — the work Emdee Digitronics and Zuneko Labs have delivered across India.
            </p>
          </FadeUp>
        </div>

        {/* Row 1: Banglar Shiksha */}
        <div style={{ marginBottom: 14 }}><FeaturedCard p={featured[0]}/></div>

        {/* Row 2: Two medium cards */}
        <div className="op-medium-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          {medium.map((p, i) => <MediumCard key={p.id} p={p} index={i}/>)}
        </div>

        {/* Row 3: Pranishakti */}
        <div style={{ marginBottom: 14 }}><PranishaktiCard p={pranic}/></div>

        {/* Row 4: Tata Power */}
        <div><FeaturedCard p={featured[1]}/></div>

        {/* Footer */}
        <FadeIn delay={0.2} style={{ marginTop: 56, paddingTop: 28, borderTop: '1px solid rgba(26,110,66,0.1)' }}>
          <div className="op-footer-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#3d6b50', margin: 0 }}>
              Projects delivered by <span style={{ color: G1, fontWeight: 600 }}>Emdee Digitronics</span> and its AI division <span style={{ color: G1, fontWeight: 600 }}>Zuneko Labs</span>.
            </p>
            <a
              href="#case-studies"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: G1, border: `1px solid rgba(26,110,66,0.3)`, padding: '8px 20px', borderRadius: 6, textDecoration: 'none', transition: 'background 0.2s,color 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.background = G1; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = G1; }}
            >View AI Case Studies →</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}