import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Global CSS ─────────────────────────────────────────────── */
const STYLES = `
  @keyframes mod-migrate {
    0%   { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -60; }
  }
  @keyframes mod-packet {
    0%   { opacity: 0; }
    10%  { opacity: 0.9; }
    90%  { opacity: 0.9; }
    100% { opacity: 0; }
  }
  @keyframes mod-shrink {
    0%,100% { opacity: 0.55; }
    50%     { opacity: 0.25; }
  }
  @keyframes mod-grow {
    0%,100% { opacity: 0.9; }
    50%     { opacity: 0.5; }
  }
  @keyframes mod-float {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-8px); }
  }
  @keyframes mod-blink {
    0%,100% { opacity: 0.9; } 50% { opacity: 0.2; }
  }
  @keyframes mod-dash-flow {
    to { stroke-dashoffset: -20; }
  }
  .mod-float-svg { animation: mod-float 5s ease-in-out infinite; }
  .mod-blink     { animation: mod-blink 1.8s ease-in-out infinite; }
  .mod-shrink    { animation: mod-shrink 3s ease-in-out infinite; }
  .mod-grow      { animation: mod-grow 3s ease-in-out infinite; }
  .mod-dash-flow { animation: mod-dash-flow 1.2s linear infinite; }

  /* ── Card / row hover system ── */
  .mod-card {
    transition: transform 0.28s cubic-bezier(0.16,1,0.3,1), border-color 0.28s, background 0.28s, box-shadow 0.28s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .mod-card:hover {
    transform: translateY(-6px); border-color: rgba(10,60,35,0.35); background: rgba(10,60,35,0.04) !important;
    box-shadow: 0 10px 28px rgba(10,60,35,0.12), 0 3px 8px rgba(10,60,35,0.07), inset 0 1px 0 rgba(255,255,255,0.6);
  }
  .mod-row { transition: background 0.22s, padding-left 0.22s, border-radius 0.22s; padding-left: 0; cursor: default; border-radius: 8px; }
  .mod-row:hover { background: rgba(10,60,35,0.03); padding-left: 6px; }
  .mod-step {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, box-shadow 0.25s, background 0.25s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .mod-step:hover { transform: translateX(6px); border-color: rgba(10,60,35,0.35); background: rgba(10,60,35,0.03) !important; box-shadow: 0 4px 12px rgba(10,60,35,0.09), inset 0 1px 0 rgba(255,255,255,0.5); }
  .mod-outcome {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, box-shadow 0.25s, background 0.25s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .mod-outcome:hover { transform: translateY(-5px); border-color: rgba(10,60,35,0.35); background: rgba(10,60,35,0.04) !important; box-shadow: 0 8px 20px rgba(10,60,35,0.1), 0 2px 6px rgba(10,60,35,0.06), inset 0 1px 0 rgba(255,255,255,0.6); }
  .mod-pill { transition: background 0.2s, border-color 0.2s, color 0.2s; border: 1px solid rgba(26,110,66,0.2); cursor: default; }
  .mod-pill:hover { background: rgba(26,110,66,0.08); border-color: rgba(26,110,66,0.35); color: #1a6e42; }
  .mod-tech-card {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, box-shadow 0.25s, background 0.25s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .mod-tech-card:hover { transform: translateY(-4px); border-color: rgba(10,60,35,0.3); background: rgba(10,60,35,0.04) !important; box-shadow: 0 6px 16px rgba(10,60,35,0.09), inset 0 1px 0 rgba(255,255,255,0.5); }
  .mod-fit-row { transition: background 0.18s, padding-left 0.2s; padding-left: 0; border-radius: 6px; border-bottom: 1px solid rgba(10,60,35,0.1); }
  .mod-fit-row:hover { background: rgba(10,60,35,0.03); padding-left: 6px; }
  .mod-cta-block { transition: border-color 0.28s, box-shadow 0.28s; border: 1px solid rgba(10,60,35,0.18); }
  .mod-cta-block:hover { border-color: rgba(10,60,35,0.3); box-shadow: 0 8px 24px rgba(10,60,35,0.1), inset 0 1px 0 rgba(255,255,255,0.5); }
  .mod-cta-btn { transition: background 0.22s, color 0.22s, transform 0.22s; }
  .mod-cta-btn:hover { transform: translateX(4px); }

  /* ── Mobile responsive ── */
  @media (max-width: 860px) {
    .mod-hero-grid    { grid-template-columns: 1fr !important; }
    .mod-2col         { grid-template-columns: 1fr !important; gap: 28px !important; }
    .mod-4col         { grid-template-columns: 1fr 1fr !important; }
    .mod-approach-top { grid-template-columns: 1fr !important; gap: 20px !important; }
    .mod-fit-grid     { grid-template-columns: 1fr !important; gap: 20px !important; }
    .mod-cta-inner    { flex-direction: column !important; align-items: flex-start !important; }
    .mod-hero-svg     { display: none !important; }
    .mod-section      { padding-left: 20px !important; padding-right: 20px !important; }
    .mod-hero-section { padding: 80px 20px 60px !important; }
  }
  @media (max-width: 520px) {
    .mod-4col         { grid-template-columns: 1fr !important; }
    .mod-hero-badges  { flex-direction: column !important; gap: 8px !important; align-items: flex-start !important; }
  }
`;

/* ─── Helpers ─────────────────────────────────────────────────── */
function RevealClip({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
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
function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
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
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#1a6e42', letterSpacing: '0.22em' }}>{text}</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(26,110,66,0.3),transparent)' }} />
      </div>
    </RevealClip>
  );
}
function Divider({ delay = 0 }: { delay?: number }) {
  return (
    <FadeIn delay={delay}>
      <div style={{ height: 1, background: 'rgba(26,110,66,0.08)', margin: '72px 0' }} />
    </FadeIn>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO SVG — strangler fig migration diagram
   Left box = legacy monolith (fading/shrinking pulse)
   Right box = new platform (brightening)
   Animated packets flow left→right through a façade layer
══════════════════════════════════════════════════════════════ */
function HeroSVG() {
  return (
    <div className="mod-hero-svg" style={{ position: 'relative', width: '100%', maxWidth: 460 }}>
      <svg
        className="mod-float-svg"
        viewBox="0 0 460 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Background grid */}
        {[0,1,2,3,4,5,6].map(i => (
          <line key={`h${i}`} x1="0" y1={i*56} x2="460" y2={i*56} stroke="rgba(26,110,66,0.045)" strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <line key={`v${i}`} x1={i*58} y1="0" x2={i*58} y2="340" stroke="rgba(26,110,66,0.045)" strokeWidth="1"/>
        ))}

        {/* ── LEGACY MONOLITH — left block ── */}
        {/* Outer shadow/halo — fading */}
        <rect x="16" y="80" width="148" height="180" rx="12" fill="rgba(26,110,66,0.04)" stroke="rgba(200,40,40,0.12)" strokeWidth="1" className="mod-shrink"/>
        {/* Main box */}
        <rect x="20" y="84" width="140" height="172" rx="10" fill="rgba(26,110,66,0.04)" stroke="rgba(26,110,66,0.2)" strokeWidth="1.3" className="mod-shrink"/>
        {/* Header bar */}
        <rect x="20" y="84" width="140" height="28" rx="10" fill="rgba(26,110,66,0.06)"/>
        <rect x="20" y="98" width="140" height="14" fill="rgba(26,110,66,0.06)"/>
        <circle cx="34"  cy="98" r="5" fill="rgba(200,40,40,0.3)" className="mod-shrink"/>
        <circle cx="50"  cy="98" r="5" fill="rgba(255,200,0,0.2)"/>
        <circle cx="66"  cy="98" r="5" fill="rgba(26,110,66,0.2)"/>
        <text x="90" y="103" textAnchor="middle" fill="rgba(26,110,66,0.5)" fontSize="7.5" fontFamily="monospace">MONOLITH</text>
        {/* Tangled lines inside — representing tightly-coupled code */}
        {[
          "M30 130 C60 125 80 140 110 128 C130 120 145 135 150 130",
          "M30 148 C50 155 75 145 100 152 C120 158 140 148 150 155",
          "M30 166 C55 160 70 170 95 164 C115 158 140 168 150 162",
          "M30 184 C58 192 80 178 105 186 C128 192 142 180 150 188",
          "M30 202 C52 196 78 206 102 198 C125 190 144 200 150 205",
          "M30 220 C60 215 82 228 108 220 C130 214 146 224 150 218",
          "M30 238 C55 244 80 234 106 240 C126 246 144 236 150 242",
        ].map((d, i) => (
          <path key={i} d={d} stroke={`rgba(26,110,66,${0.08 + i*0.015})`} strokeWidth="1" fill="none" className="mod-shrink"/>
        ))}
        {/* Crossing/tangled lines */}
        <path d="M40 130 L120 242" stroke="rgba(200,40,40,0.06)" strokeWidth="0.8" className="mod-shrink"/>
        <path d="M120 130 L40 242" stroke="rgba(200,40,40,0.06)" strokeWidth="0.8" className="mod-shrink"/>
        {/* Label below */}
        <text x="90" y="272" textAnchor="middle" fill="rgba(26,110,66,0.35)" fontSize="7" fontFamily="monospace">Legacy System</text>
        <text x="90" y="283" textAnchor="middle" fill="rgba(200,40,40,0.35)" fontSize="7" fontFamily="monospace">⚠ Tightly coupled</text>

        {/* ── STRANGLER FAÇADE — centre vertical ── */}
        {/* Vertical façade bar */}
        <rect x="208" y="70" width="44" height="200" rx="8" fill="rgba(26,110,66,0.06)" stroke="rgba(26,110,66,0.25)" strokeWidth="1.3"/>
        <text x="230" y="92" textAnchor="middle" fill="#1a6e42" fontSize="7" fontFamily="monospace" opacity="0.75">FAÇADE</text>
        <text x="230" y="103" textAnchor="middle" fill="#1a6e42" fontSize="7" fontFamily="monospace" opacity="0.55">LAYER</text>

        {/* Routing arrows through façade */}
        {[115, 150, 185, 220].map((y, i) => (
          <g key={i}>
            {/* Left incoming */}
            <path
              d={`M160 ${y} L208 ${y}`}
              stroke="rgba(26,110,66,0.22)"
              strokeWidth="1"
              strokeDasharray="4 3"
              className="mod-dash-flow"
              style={{ animationDelay: `${i*0.3}s` }}
            />
            {/* Right outgoing */}
            <path
              d={`M252 ${y} L296 ${y}`}
              stroke="rgba(26,110,66,0.4)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              className="mod-dash-flow"
              style={{ animationDelay: `${i*0.3 + 0.15}s` }}
            />
          </g>
        ))}

        {/* Animated traffic packets */}
        {[115, 150, 185, 220].map((y, i) => (
          <circle key={i} r="3.5" fill="#1a6e42" opacity="0.7">
            <animateMotion
              dur={`${1.4 + i*0.25}s`}
              repeatCount="indefinite"
              begin={`${i*0.4}s`}
              path={`M160 ${y} L296 ${y}`}
            />
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur={`${1.4+i*0.25}s`} repeatCount="indefinite" begin={`${i*0.4}s`}/>
          </circle>
        ))}

        {/* Façade label at bottom */}
        <text x="230" y="282" textAnchor="middle" fill="rgba(26,110,66,0.4)" fontSize="6.5" fontFamily="monospace">Route &</text>
        <text x="230" y="292" textAnchor="middle" fill="rgba(26,110,66,0.4)" fontSize="6.5" fontFamily="monospace">Redirect</text>

        {/* ── NEW PLATFORM — right block ── */}
        {/* Halo glow */}
        <rect x="296" y="75" width="152" height="190" rx="14" fill="rgba(26,110,66,0.04)" stroke="rgba(26,110,66,0.15)" strokeWidth="1" className="mod-grow"/>
        {/* Main box */}
        <rect x="300" y="80" width="144" height="180" rx="12" fill="rgba(26,110,66,0.05)" stroke="rgba(26,110,66,0.3)" strokeWidth="1.5" className="mod-grow"/>
        {/* Header */}
        <rect x="300" y="80" width="144" height="30" rx="12" fill="rgba(26,110,66,0.07)"/>
        <rect x="300" y="96" width="144" height="14" fill="rgba(26,110,66,0.07)"/>
        <text x="372" y="100" textAnchor="middle" fill="#1a6e42" fontSize="7.5" fontFamily="monospace" opacity="0.8">NEW PLATFORM</text>

        {/* Clean modular service boxes inside */}
        {[
          { y: 122, w: 56, label: 'Auth', op: 0.7 },
          { y: 122, w: 52, label: 'API GW', op: 0.65, offset: 70 },
          { y: 156, w: 52, label: 'Orders', op: 0.7 },
          { y: 156, w: 56, label: 'Billing', op: 0.6, offset: 66 },
          { y: 190, w: 56, label: 'Notify', op: 0.65 },
          { y: 190, w: 52, label: 'Search', op: 0.6, offset: 70 },
          { y: 224, w: 110, label: 'Shared DB Layer', op: 0.55, wide: true },
        ].map((s, i) => (
          <g key={i}>
            <rect
              x={300 + 8 + (s.offset || 0)}
              y={s.y}
              width={s.wide ? s.w : s.w}
              height={s.wide ? 18 : 26}
              rx="5"
              fill={`rgba(26,110,66,${0.08 + i*0.015})`}
              stroke={`rgba(26,110,66,${0.2 + i*0.02})`}
              strokeWidth="1"
              className="mod-grow"
            />
            <text
              x={300 + 8 + (s.offset || 0) + s.w/2}
              y={s.y + (s.wide ? 12 : 16)}
              textAnchor="middle"
              fill="#1a6e42"
              fontSize="6.5"
              fontFamily="monospace"
              opacity={s.op}
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* Thin connecting lines between services */}
        <line x1="370" y1="148" x2="370" y2="156" stroke="rgba(26,110,66,0.2)" strokeWidth="0.8"/>
        <line x1="356" y1="148" x2="372" y2="156" stroke="rgba(26,110,66,0.15)" strokeWidth="0.8"/>

        {/* Label below */}
        <text x="372" y="272" textAnchor="middle" fill="rgba(26,110,66,0.5)" fontSize="7" fontFamily="monospace">Modern Services</text>
        <text x="372" y="283" textAnchor="middle" fill="rgba(26,110,66,0.4)" fontSize="7" fontFamily="monospace">✓ Decoupled</text>

        {/* ── Progress bar at top ── */}
        <rect x="20" y="40" width="420" height="14" rx="7" fill="rgba(26,110,66,0.06)" stroke="rgba(26,110,66,0.12)" strokeWidth="1"/>
        {/* Animated fill */}
        <rect x="22" y="42" width="0" height="10" rx="5" fill="rgba(26,110,66,0.35)">
          <animate attributeName="width" from="0" to="280" dur="3s" begin="0.5s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
        </rect>
        <text x="22" y="35" fill="rgba(26,110,66,0.45)" fontSize="7" fontFamily="monospace">MIGRATION PROGRESS</text>
        <text x="300" y="35" fill="#1a6e42" fontSize="7" fontFamily="monospace" opacity="0.7">67%</text>

        {/* ── Bottom caption ── */}
        <text x="230" y="320" textAnchor="middle" fill="rgba(26,110,66,0.28)" fontSize="6.5" fontFamily="monospace" letterSpacing="1.5">
          STRANGLER FIG  ·  LIVE SYSTEM  ·  ZERO DOWNTIME
        </text>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO SECTION — redesigned with animation
══════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      className="mod-hero-section"
      style={{ padding: 'clamp(80px,10vh,110px) clamp(20px,4vw,32px) clamp(60px,8vh,88px)', borderBottom: '1px solid rgba(26,110,66,0.09)', background: '#ffffff', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.52, delay: 0.1, ease: EASE }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '5px 14px', borderRadius: 100, border: '1px solid rgba(26,110,66,0.25)', background: 'rgba(26,110,66,0.04)', marginBottom: 28 }}
        >
          <span className="mod-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a6e42', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: '#1a6e42', opacity: 0.85 }}>SOFTWARE ENGINEERING</span>
        </motion.div>

        {/* Two-column grid */}
        <div
          className="mod-hero-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 52px', alignItems: 'center' }}
        >
          {/* Left */}
          <div>
            {/* Headline */}
            {['Core Systems', 'Modernisation.'].map((line, li) => (
              <div key={li} style={{ overflow: 'hidden', marginBottom: li === 0 ? 4 : 26 }}>
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.82, delay: 0.22 + li * 0.14, ease: EASE }}
                  style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 'clamp(36px,5.5vw,72px)',
                    color: li === 0 ? '#0d3d22' : '#1a6e42',
                    lineHeight: 1.02, margin: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52, ease: EASE }}
              style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,1.4vw,17px)', color: '#3d6b50', lineHeight: 1.82, margin: '0 0 30px', maxWidth: 460 }}
            >
              Refactoring monolithic, legacy applications into modern enterprise-grade software — without stopping the business or gambling on big-bang rewrites.
            </motion.p>

            {/* Feature badges */}
            <motion.div
              className="mod-hero-badges"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.65, ease: EASE }}
              style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}
            >
              {['Strangler fig migrations', 'Microservices decomposition', 'Cloud-native re-platforming', 'Zero-downtime'].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.36, delay: 0.7 + i * 0.08, ease: EASE }}
                  style={{ display: 'flex', alignItems: 'center', gap: 7 }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1a6e42', opacity: 0.5, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#3d7a55', letterSpacing: '0.06em' }}>{t}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stat row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.0, ease: EASE }}
              style={{ display: 'flex', gap: 28, marginTop: 34, paddingTop: 26, borderTop: '1px solid rgba(26,110,66,0.1)', flexWrap: 'wrap' }}
            >
              {[
                { val: '0',     label: 'Big-bang rewrites' },
                { val: '100%',  label: 'Live throughout' },
                { val: '3–10×', label: 'Release velocity gain' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: '#1a6e42', lineHeight: 1, marginBottom: 5 }}>{s.val}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', color: '#3d7a55', opacity: 0.6 }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: SVG */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.32, ease: EASE }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <HeroSVG />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 1 — THE PROBLEM
══════════════════════════════════════════════════════════════ */
const PAINS = [
  { icon: '⚡', head: 'Velocity collapse',   body: 'Feature delivery grinds to weeks. Every change requires touching a dozen fragile modules.' },
  { icon: '⚠',  head: 'Runaway ops cost',    body: 'Legacy infra demands costly specialists, manual deployments, and bloated hosting bills.' },
  { icon: '🔗', head: 'Integration debt',    body: 'APIs bolted onto 15-year-old schemas. Third-party connections break constantly.' },
  { icon: '🔒', head: 'Compliance risk',     body: 'Monoliths resist audit trails, RBAC, and modern data-residency rules.' },
  { icon: '📉', head: 'Recruitment drag',    body: 'Nobody wants to work on COBOL or unmaintained PHP. Talent moves on.' },
  { icon: '🪨', head: 'Scaling ceiling',     body: "Traffic spikes crash the whole system. You can't scale one bottleneck without scaling everything." },
];

function ProblemSection() {
  return (
    <section className="mod-section" style={{ padding: 'clamp(56px,8vw,100px) clamp(20px,4vw,32px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="THE PROBLEM" />
        <div className="mod-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '44px 72px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3.2vw,44px)', color: '#0d3d22', lineHeight: 1.1, margin: 0 }}>
                  Your legacy system is quietly strangling the business.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.18}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#3d6b50', lineHeight: 1.82, margin: '16px 0 0' }}>
                Most engineering teams don't fail because of bad engineers. They fail because the foundation was never designed for where the business is today.
              </p>
            </FadeUp>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {PAINS.map((p, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.07}>
                <div className="mod-row" style={{ display: 'flex', gap: 13, padding: '11px 10px' }}>
                  <span style={{ fontSize: 17, flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, color: '#0d3d22', margin: '0 0 2px' }}>{p.head}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: '#3d6b50', margin: 0, lineHeight: 1.65, opacity: 0.85 }}>{p.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 2 — WHAT WE DO
══════════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    num: '01', title: 'Legacy Assessment & Roadmapping',
    body: 'We start with a deep audit of your codebase, architecture, data flows and dependencies. No assumptions — just a clear map of what you have, what it costs, and the ranked path forward.',
    deliverables: ['Architecture audit', 'Dependency graph', 'Risk register', 'Modernisation roadmap'],
    svg: (<svg viewBox="0 0 56 56" fill="none" width={44} height={44}><rect x="4" y="8" width="48" height="36" rx="4" stroke="#1a6e42" strokeWidth="1.2" opacity="0.4"/><line x1="4" y1="18" x2="52" y2="18" stroke="#1a6e42" strokeWidth="0.7" opacity="0.2"/><line x1="18" y1="8" x2="18" y2="44" stroke="#1a6e42" strokeWidth="0.7" opacity="0.2"/><circle cx="11" cy="13" r="2.5" fill="#1a6e42" opacity="0.6"/><circle cx="20" cy="13" r="2.5" fill="#1a6e42" opacity="0.3"/><rect x="22" y="22" width="22" height="6" rx="2" fill="#1a6e42" opacity="0.35"/><rect x="22" y="31" width="14" height="6" rx="2" fill="#1a6e42" opacity="0.22"/><path d="M8 26 L8 38 L16 38" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" fill="none"/><path d="M8 30 L14 36" stroke="#1a6e42" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/></svg>),
  },
  {
    num: '02', title: 'Strangler Fig & Incremental Migration',
    body: "We don't do risky big-bang rewrites. Using the strangler fig pattern, we extract and replace modules incrementally — so your system stays live and revenue-generating throughout.",
    deliverables: ['Module extraction plan', 'API façade layer', 'Parallel-run strategy', 'Rollback guardrails'],
    svg: (<svg viewBox="0 0 56 56" fill="none" width={44} height={44}><rect x="6" y="14" width="20" height="28" rx="3" stroke="#1a6e42" strokeWidth="1.2" opacity="0.4"/><rect x="30" y="14" width="20" height="28" rx="3" stroke="#1a6e42" strokeWidth="1.3" opacity="0.7"/><path d="M26 28 L30 28" stroke="#1a6e42" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/><path d="M27 24 L30 28 L27 32" stroke="#1a6e42" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/><line x1="34" y1="22" x2="46" y2="22" stroke="#1a6e42" strokeWidth="0.8" opacity="0.5"/><line x1="34" y1="27" x2="46" y2="27" stroke="#1a6e42" strokeWidth="0.8" opacity="0.4"/><line x1="34" y1="32" x2="42" y2="32" stroke="#1a6e42" strokeWidth="0.8" opacity="0.35"/><line x1="10" y1="22" x2="22" y2="22" stroke="#1a6e42" strokeWidth="0.8" opacity="0.25" strokeDasharray="2 2"/><line x1="10" y1="27" x2="22" y2="27" stroke="#1a6e42" strokeWidth="0.8" opacity="0.2" strokeDasharray="2 2"/></svg>),
  },
  {
    num: '03', title: 'Microservices & Domain Decomposition',
    body: 'We break your monolith along domain boundaries — not arbitrary technical lines. Each bounded context becomes an independently deployable, testable service with clean contracts.',
    deliverables: ['Domain event mapping', 'Service mesh design', 'API contract specs', 'Data ownership model'],
    svg: (<svg viewBox="0 0 56 56" fill="none" width={44} height={44}><circle cx="28" cy="28" r="6" stroke="#1a6e42" strokeWidth="1.3" opacity="0.8"/><circle cx="28" cy="10" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><circle cx="44" cy="20" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><circle cx="44" cy="38" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><circle cx="28" cy="46" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><circle cx="12" cy="38" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><circle cx="12" cy="20" r="5" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><line x1="28" y1="15" x2="28" y2="22" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="39" y1="22" x2="34" y2="25" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="39" y1="36" x2="34" y2="31" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="28" y1="41" x2="28" y2="34" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="17" y1="36" x2="22" y2="31" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="17" y1="22" x2="22" y2="25" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/></svg>),
  },
  {
    num: '04', title: 'Cloud-Native Re-platforming',
    body: 'Lift-and-shift gives you cloud bills, not cloud benefits. We re-platform applications to take full advantage of managed services, autoscaling, observability and zero-downtime deploys.',
    deliverables: ['Cloud architecture design', 'IaC (Terraform/CDK)', 'CI/CD pipelines', 'Observability stack'],
    svg: (<svg viewBox="0 0 56 56" fill="none" width={44} height={44}><path d="M12 34 C12 26 20 20 28 22 C28 16 36 12 42 18 C48 18 52 24 50 30 L12 30 Z" stroke="#1a6e42" strokeWidth="1.3" fill="none" opacity="0.55"/><line x1="28" y1="34" x2="28" y2="46" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/><line x1="22" y1="40" x2="28" y2="46" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/><line x1="34" y1="40" x2="28" y2="46" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/><circle cx="20" cy="34" r="3" stroke="#1a6e42" strokeWidth="1" opacity="0.5"/><circle cx="36" cy="34" r="3" stroke="#1a6e42" strokeWidth="1" opacity="0.5"/></svg>),
  },
];

function WhatWeDoSection() {
  return (
    <section className="mod-section" style={{ padding: 'clamp(0px,0vw,0px) clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="WHAT WE DO" />
        <div style={{ overflow: 'hidden', marginBottom: 10 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3.2vw,44px)', color: '#0d3d22', lineHeight: 1.1, margin: 0 }}>
              Modernisation that ships — not slides.
            </h2>
          </RevealClip>
        </div>
        <FadeUp delay={0.16} style={{ marginBottom: 52 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#3d6b50', lineHeight: 1.82, maxWidth: 560, margin: 0 }}>
            Four disciplines. Each can stand alone, or combine into a full transformation programme.
          </p>
        </FadeUp>
        <div className="mod-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {SERVICES.map((s, i) => (
            <FadeUp key={i} delay={0.08 + i * 0.09}>
              <div className="mod-card" style={{ padding: '26px', borderRadius: 14, background: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#1a6e42', letterSpacing: '0.14em', opacity: 0.65 }}>{s.num}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#0d3d22', margin: 0, lineHeight: 1.25, maxWidth: 220 }}>{s.title}</h3>
                  </div>
                  <div style={{ opacity: 0.65, flexShrink: 0 }}>{s.svg}</div>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3d6b50', lineHeight: 1.75, margin: '0 0 20px' }}>{s.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {s.deliverables.map((d, di) => <span key={di} className="mod-pill" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 9px', borderRadius: 100, color: '#3d7a55' }}>{d}</span>)}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 3 — APPROACH
══════════════════════════════════════════════════════════════ */
const STEPS = [
  { phase: 'Discover',     duration: '1–2 wks',   desc: 'Audit codebase, map dependencies, interview stakeholders. Produce a risk-ranked modernisation backlog.' },
  { phase: 'Design',       duration: '1–2 wks',   desc: 'Define target architecture, bounded contexts, data ownership, API contracts and migration sequence.' },
  { phase: 'Extract',      duration: 'ongoing',   desc: 'Build the strangler façade and start extracting high-value, low-risk modules first. CI/CD live from day one.' },
  { phase: 'Migrate',      duration: 'ongoing',   desc: 'Incrementally shift traffic to new services. Monitor, tune, harden. Legacy shrinks; new platform grows.' },
  { phase: 'Decommission', duration: 'milestone', desc: 'Old system retired cleanly. Docs, runbooks and knowledge transferred. Team trained on new stack.' },
];

function ApproachSection() {
  return (
    <section className="mod-section" style={{ padding: 'clamp(0px,0vw,0px) clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="OUR APPROACH" />
        <div className="mod-approach-top" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px 72px', alignItems: 'start', marginBottom: 36 }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,40px)', color: '#0d3d22', lineHeight: 1.12, margin: 0 }}>
                  Zero-downtime. Revenue-safe. Incremental.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.17}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#3d6b50', lineHeight: 1.82, margin: '14px 0 0', maxWidth: 420 }}>
                We treat your existing system as a going concern — not a problem to bulldoze. Every step keeps the lights on.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.22}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#3d7a55', lineHeight: 1.8, margin: 0, borderLeft: '2px solid rgba(26,110,66,0.22)', paddingLeft: 18 }}>
              "We've seen 'big bang rewrite' projects destroy companies. We've also seen careful incremental migration make a decade-old monolith irrelevant within 18 months."
            </p>
          </FadeUp>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {STEPS.map((s, i) => (
            <FadeUp key={i} delay={0.1 + i * 0.09}>
              <div className="mod-step" style={{ padding: '16px 18px', borderRadius: 12, background: '#ffffff', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid rgba(26,110,66,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: '#1a6e42', opacity: 0.8 }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginBottom: 3 }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, color: '#0d3d22' }}>{s.phase}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: '#3d7a55', opacity: 0.55 }}>{s.duration}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3d6b50', margin: 0, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 4 — TECHNOLOGY
══════════════════════════════════════════════════════════════ */
const TECH_GROUPS = [
  { group: 'Languages',              items: ['TypeScript', 'Python', 'Go', 'Rust', 'Java 21'] },
  { group: 'Runtimes & Frameworks',  items: ['Node.js', 'FastAPI', 'Spring Boot', 'tRPC', 'gRPC'] },
  { group: 'Data',                   items: ['PostgreSQL', 'Redis', 'Kafka', 'Elasticsearch', 'ClickHouse'] },
  { group: 'Infrastructure',         items: ['AWS / GCP / Azure', 'Kubernetes', 'Terraform', 'ArgoCD', 'Datadog'] },
];

function TechSection() {
  return (
    <section className="mod-section" style={{ padding: 'clamp(0px,0vw,0px) clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="TECHNOLOGY" />
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,40px)', color: '#0d3d22', lineHeight: 1.1, margin: 0 }}>
              Stack-agnostic. Best-tool-for-the-job.
            </h2>
          </RevealClip>
        </div>
        <FadeUp delay={0.16} style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#3d6b50', lineHeight: 1.82, margin: '12px 0 0', maxWidth: 500 }}>
            We work with what makes sense for your domain — not what we happen to prefer.
          </p>
        </FadeUp>
        <div className="mod-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {TECH_GROUPS.map((g, gi) => (
            <FadeUp key={gi} delay={0.08 + gi * 0.08}>
              <div className="mod-tech-card" style={{ padding: '22px 18px', borderRadius: 12, background: '#ffffff' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.16em', color: '#1a6e42', margin: '0 0 14px', opacity: 0.75 }}>{g.group.toUpperCase()}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {g.items.map((item, ii) => (
                    <FadeUp key={ii} delay={0.1 + gi * 0.08 + ii * 0.05}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#1a6e42', opacity: 0.4, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3d6b50' }}>{item}</span>
                      </div>
                    </FadeUp>
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

/* ══════════════════════════════════════════════════════════════
   SECTION 5 — OUTCOMES
══════════════════════════════════════════════════════════════ */
const OUTCOMES = [
  { val: '3–10×',  label: 'Release velocity',    sub: 'from quarterly to weekly or daily deploys' },
  { val: '40–70%', label: 'Infra cost reduction', sub: 'via right-sizing, managed services, autoscaling' },
  { val: '< 1min', label: 'Deployment time',      sub: 'vs. hours-long manual release windows' },
  { val: 'Zero',   label: 'Big-bang rewrites',    sub: 'incremental always — live system, live revenue' },
];

function OutcomesSection() {
  return (
    <section className="mod-section" style={{ padding: 'clamp(0px,0vw,0px) clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="OUTCOMES" />
        <div style={{ overflow: 'hidden', marginBottom: 48 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,40px)', color: '#0d3d22', lineHeight: 1.1, margin: 0 }}>
              What changes after modernisation.
            </h2>
          </RevealClip>
        </div>
        <div className="mod-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {OUTCOMES.map((o, i) => (
            <motion.div key={i} className="mod-outcome" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.58, delay: i * 0.1, ease: EASE }} style={{ padding: '24px 20px', borderRadius: 14, background: '#ffffff' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,38px)', color: '#1a6e42', margin: '0 0 5px', lineHeight: 1 }}>{o.val}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, color: '#0d3d22', margin: '0 0 7px' }}>{o.label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#3d7a55', margin: 0, lineHeight: 1.6, opacity: 0.75 }}>{o.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 6 — FIT
══════════════════════════════════════════════════════════════ */
const FIT_ITEMS = [
  { yes: true,  text: "You're running a monolith written 8+ years ago" },
  { yes: true,  text: 'Your engineers spend more time fixing than building' },
  { yes: true,  text: 'Feature requests pile up because the code is too brittle' },
  { yes: true,  text: 'Scaling means buying bigger servers, not smarter systems' },
  { yes: false, text: 'You need a full rewrite in 4 weeks with no disruption' },
  { yes: false, text: 'Your codebase was modern 18 months ago — just needs cleanup' },
];

function FitSection() {
  return (
    <section className="mod-section" style={{ padding: 'clamp(0px,0vw,0px) clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="IS THIS FOR YOU" />
        <div className="mod-fit-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '44px 72px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,40px)', color: '#0d3d22', lineHeight: 1.1, margin: 0 }}>
                  Good fit — and not.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.17}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#3d6b50', lineHeight: 1.82, margin: '14px 0 0', maxWidth: 380 }}>
                We'd rather tell you we're not the right match than take on work that won't deliver the outcomes you need.
              </p>
            </FadeUp>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {FIT_ITEMS.map((f, i) => (
              <FadeUp key={i} delay={0.08 + i * 0.08}>
                <div className="mod-fit-row" style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '11px 8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: f.yes ? '#1a6e42' : '#c03030', opacity: f.yes ? 0.85 : 0.6, flexShrink: 0, marginTop: 1 }}>
                    {f.yes ? '✓' : '✗'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: f.yes ? '#3d6b50' : '#3d7a55', lineHeight: 1.6, opacity: f.yes ? 1 : 0.6 }}>{f.text}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CTA
══════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="mod-section" style={{ padding: 'clamp(0px,0vw,0px) clamp(20px,4vw,32px) clamp(72px,10vw,120px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeUp delay={0}>
          <div className="mod-cta-block" style={{ padding: 'clamp(28px,4vw,52px) clamp(22px,4vw,56px)', borderRadius: 18, background: '#f6fbf8' }}>
            <div className="mod-cta-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <div style={{ overflow: 'hidden', marginBottom: 8 }}>
                  <RevealClip delay={0.06}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px,2.5vw,32px)', color: '#0d3d22', margin: 0, lineHeight: 1.15 }}>
                      Ready to start the conversation?
                    </h2>
                  </RevealClip>
                </div>
                <FadeUp delay={0.16}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#3d6b50', margin: 0, lineHeight: 1.7, maxWidth: 440 }}>
                    Share your stack and constraints. We'll scope a modernisation path in one working session — no commitment needed.
                  </p>
                </FadeUp>
              </div>
              <FadeUp delay={0.22}>
                <a href="#contact" className="mod-cta-btn"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: '#ffffff', background: '#1a6e42', border: '1px solid #1a6e42', padding: '13px 30px', borderRadius: 8, textDecoration: 'none', display: 'inline-block', flexShrink: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a6e42'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1a6e42'; e.currentTarget.style.color = '#ffffff'; }}
                >
                  Book a scoping call →
                </a>
              </FadeUp>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export function CoreSystemsPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <style>{STYLES}</style>
      <HeroSection />
      <ProblemSection />
      <Divider />
      <WhatWeDoSection />
      <Divider />
      <ApproachSection />
      <Divider />
      <TechSection />
      <Divider />
      <OutcomesSection />
      <Divider />
      <FitSection />
      <CTASection />
    </div>
  );
}