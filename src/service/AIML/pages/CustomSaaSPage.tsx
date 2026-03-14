import { useState} from 'react';
import { motion, AnimatePresence} from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Global CSS ─────────────────────────────────────────────── */
const STYLES = `
  @keyframes saas-orbit {
    from { transform: rotate(0deg) translateX(62px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(62px) rotate(-360deg); }
  }
  @keyframes saas-orbit-rev {
    from { transform: rotate(0deg) translateX(42px) rotate(0deg); }
    to   { transform: rotate(-360deg) translateX(42px) rotate(360deg); }
  }
  @keyframes saas-float {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-10px); }
  }
  @keyframes saas-pulse-ring {
    0%   { transform: scale(0.9); opacity: 0.6; }
    70%  { transform: scale(1.25); opacity: 0; }
    100% { transform: scale(0.9); opacity: 0; }
  }
  @keyframes saas-dash {
    to { stroke-dashoffset: -48; }
  }
  @keyframes saas-blink {
    0%,100% { opacity:0.9; } 50% { opacity:0.25; }
  }
  .saas-orbit-dot { animation: saas-orbit 7s linear infinite; }
  .saas-orbit-dot-rev { animation: saas-orbit-rev 5s linear infinite; }
  .saas-float-svg { animation: saas-float 4.5s ease-in-out infinite; }
  .saas-pulse-ring { animation: saas-pulse-ring 2.2s ease-out infinite; }
  .saas-dash { animation: saas-dash 1.4s linear infinite; }
  .saas-blink { animation: saas-blink 1.6s ease-in-out infinite; }

  /* Card hover */
  .saas-card {
    transition: transform 0.28s cubic-bezier(0.16,1,0.3,1), border-color 0.28s, background 0.28s, box-shadow 0.28s;
    border: 1px solid rgba(10,60,35,0.18);
    position: relative;
  }
  .saas-card::before, .saas-card::after {
    content: ''; position: absolute; width: 0; height: 2px;
    background: #1a6e42; transition: width 0.28s cubic-bezier(0.16,1,0.3,1); opacity: 0.45;
  }
  .saas-card::before { top: -1px; left: 0; }
  .saas-card::after  { bottom: -1px; right: 0; }
  .saas-card:hover::before, .saas-card:hover::after { width: 100%; }
  .saas-card:hover {
    transform: translateY(-5px); border-color: rgba(10,60,35,0.35);
    background: rgba(10,60,35,0.04) !important;
    box-shadow: 0 8px 24px rgba(10,60,35,0.10), 0 2px 8px rgba(10,60,35,0.07), inset 0 1px 0 rgba(255,255,255,0.6);
  }
  .saas-tab {
    transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    cursor: pointer; border: 1px solid rgba(10,60,35,0.18);
  }
  .saas-tab.active {
    background: rgba(26,110,66,0.1); border-color: rgba(10,60,35,0.4);
    color: #1a6e42;
    box-shadow: 0 2px 8px rgba(10,60,35,0.08), inset 0 1px 0 rgba(255,255,255,0.5);
  }
  .saas-tab:not(.active):hover {
    border-color: rgba(10,60,35,0.28); color: #0d3d22; background: rgba(10,60,35,0.03);
  }
  .saas-check-row {
    transition: padding-left 0.22s, background 0.22s, border-color 0.22s;
    padding-left: 0; border-radius: 8px; border-bottom: 1px solid rgba(10,60,35,0.12) !important;
  }
  .saas-check-row:hover { padding-left: 8px; background: rgba(10,60,35,0.02); border-bottom-color: rgba(10,60,35,0.25) !important; }
  .saas-pillar {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, background 0.25s, box-shadow 0.25s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .saas-pillar:hover {
    transform: translateY(-8px); border-color: rgba(10,60,35,0.35); background: rgba(10,60,35,0.04) !important;
    box-shadow: 0 10px 28px rgba(10,60,35,0.12), 0 3px 8px rgba(10,60,35,0.07), inset 0 1px 0 rgba(255,255,255,0.6);
  }
  .saas-deliverable {
    transition: transform 0.22s cubic-bezier(0.16,1,0.3,1), border-color 0.22s, background 0.22s, box-shadow 0.22s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .saas-deliverable:hover {
    transform: translateY(-3px); border-color: rgba(10,60,35,0.35); background: rgba(10,60,35,0.04) !important;
    box-shadow: 0 6px 16px rgba(10,60,35,0.09), 0 1px 4px rgba(10,60,35,0.06), inset 0 1px 0 rgba(255,255,255,0.5);
  }
  .saas-cta-btn { transition: background 0.22s, color 0.22s, transform 0.22s, box-shadow 0.22s; }
  .saas-cta-btn:hover { transform: translateX(4px); box-shadow: 0 4px 12px rgba(10,60,35,0.09); }
  .saas-pill {
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    border: 1px solid rgba(10,60,35,0.22); cursor: default;
  }
  .saas-pill:hover { background: rgba(26,110,66,0.08); border-color: rgba(10,60,35,0.45); color: #1a6e42; }
  .saas-phase {
    transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
    border: 1px solid rgba(10,60,35,0.18);
  }
  .saas-phase:hover {
    border-color: rgba(10,60,35,0.3);
    box-shadow: 0 4px 14px rgba(10,60,35,0.09), 0 1px 4px rgba(10,60,35,0.05), inset 0 1px 0 rgba(255,255,255,0.5);
  }
  .saas-cta-block {
    transition: border-color 0.28s, box-shadow 0.28s; border: 1px solid rgba(10,60,35,0.18);
  }
  .saas-cta-block:hover {
    border-color: rgba(10,60,35,0.3);
    box-shadow: 0 8px 24px rgba(10,60,35,0.1), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5);
  }
  .saas-stack-row {
    transition: background 0.18s, padding-left 0.2s;
    border-bottom: 1px solid rgba(10,60,35,0.12); border-radius: 6px; padding-left: 0;
  }
  .saas-stack-row:hover { background: rgba(10,60,35,0.03); padding-left: 6px; }
  .saas-stack-badge {
    transition: background 0.18s, border-color 0.18s, color 0.18s;
    border: 1px solid rgba(10,60,35,0.18); background: rgba(10,60,35,0.03);
  }
  .saas-stack-badge:hover { background: rgba(10,60,35,0.06); border-color: rgba(10,60,35,0.28); color: #0d3d22; }

  /* ── Mobile responsive ── */
  @media (max-width: 860px) {
    .saas-hero-grid    { grid-template-columns: 1fr !important; }
    .saas-flavour-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
    .saas-how-top      { grid-template-columns: 1fr !important; gap: 20px !important; }
    .saas-how-grid     { grid-template-columns: 1fr !important; }
    .saas-pillars-grid { grid-template-columns: 1fr 1fr !important; }
    .saas-deliv-grid   { grid-template-columns: 1fr !important; gap: 20px !important; }
    .saas-deliv-cards  { grid-template-columns: 1fr 1fr !important; }
    .saas-cta-inner    { flex-direction: column !important; align-items: flex-start !important; }
    .saas-stack-row    { grid-template-columns: 1fr !important; gap: 10px !important; }
    .saas-hero-svg     { display: none !important; }
    .saas-section      { padding-left: 20px !important; padding-right: 20px !important; }
    .saas-hero-section { padding: 80px 20px 60px !important; }
  }
  @media (max-width: 520px) {
    .saas-pillars-grid { grid-template-columns: 1fr !important; }
    .saas-deliv-cards  { grid-template-columns: 1fr !important; }
    .saas-hero-badges  { flex-direction: column !important; gap: 10px !important; align-items: flex-start !important; }
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
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.62, delay, ease: EASE }}
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
      <div style={{ height: 1, background: 'rgba(10,60,35,0.1)', margin: '72px 0' }} />
    </FadeIn>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO SVG — animated multi-tenant architecture diagram
══════════════════════════════════════════════════════════════ */
function HeroSVG() {
  return (
    <div className="saas-hero-svg" style={{ position: 'relative', width: '100%', maxWidth: 440 }}>

      {/* Outer pulse rings — absolute positioned, centered on SVG */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div className="saas-pulse-ring" style={{ width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(26,110,66,0.18)', position: 'absolute' }} />
        <div className="saas-pulse-ring" style={{ width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(26,110,66,0.18)', position: 'absolute', animationDelay: '1.1s' }} />
      </div>

      {/* Floating SVG */}
      <svg
        className="saas-float-svg"
        viewBox="0 0 440 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto' }}
      >
        {/* ── Background grid ── */}
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <line key={`h${i}`} x1="0" y1={i*45} x2="440" y2={i*45} stroke="rgba(26,110,66,0.05)" strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <line key={`v${i}`} x1={i*49} y1="0" x2={i*49} y2="360" stroke="rgba(26,110,66,0.05)" strokeWidth="1"/>
        ))}

        {/* ── Central platform hub ── */}
        {/* Outer ring */}
        <circle cx="220" cy="175" r="58" stroke="rgba(26,110,66,0.12)" strokeWidth="1" strokeDasharray="6 4"/>
        {/* Inner ring */}
        <circle cx="220" cy="175" r="42" stroke="rgba(26,110,66,0.22)" strokeWidth="1.2"/>
        {/* Hub box */}
        <rect x="192" y="150" width="56" height="50" rx="8" fill="rgba(26,110,66,0.08)" stroke="#1a6e42" strokeWidth="1.5"/>
        {/* Platform label lines */}
        <line x1="202" y1="164" x2="238" y2="164" stroke="#1a6e42" strokeWidth="0.9" opacity="0.5"/>
        <line x1="202" y1="171" x2="230" y2="171" stroke="#1a6e42" strokeWidth="0.9" opacity="0.35"/>
        <line x1="202" y1="178" x2="235" y2="178" stroke="#1a6e42" strokeWidth="0.9" opacity="0.25"/>
        <text x="220" y="196" textAnchor="middle" fill="#1a6e42" fontSize="7.5" fontFamily="monospace" opacity="0.8">PLATFORM</text>

        {/* ── Orbiting dot 1 — outer ── */}
        <g style={{ transformOrigin: '220px 175px', animation: 'saas-orbit 7s linear infinite' }}>
          <circle cx="220" cy="175" r="5" fill="#1a6e42" opacity="0.6"/>
          <circle cx="220" cy="175" r="8" stroke="#1a6e42" strokeWidth="0.8" opacity="0.2"/>
        </g>

        {/* ── Orbiting dot 2 — inner, reverse ── */}
        <g style={{ transformOrigin: '220px 175px', animation: 'saas-orbit-rev 5s linear infinite' }}>
          <circle cx="220" cy="175" r="3.5" fill="#3d9e65" opacity="0.5"/>
        </g>

        {/* ── Tenant nodes ── */}
        {/* Tenant A — top left */}
        <rect x="28" y="22" width="92" height="68" rx="10" fill="rgba(26,110,66,0.05)" stroke="rgba(26,110,66,0.22)" strokeWidth="1.2"/>
        <rect x="40" y="36" width="68" height="7" rx="2" fill="rgba(26,110,66,0.2)"/>
        <rect x="40" y="48" width="50" height="5" rx="1.5" fill="rgba(26,110,66,0.12)"/>
        <rect x="40" y="58" width="58" height="5" rx="1.5" fill="rgba(26,110,66,0.08)"/>
        <text x="74" y="82" textAnchor="middle" fill="#1a6e42" fontSize="7" fontFamily="monospace" opacity="0.6">Tenant A</text>

        {/* Dashed connector A → hub */}
        <path d="M 120 60 C 155 60 170 120 192 155" stroke="#1a6e42" strokeWidth="1" strokeDasharray="5 4" opacity="0.3">
          <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="1.8s" repeatCount="indefinite"/>
        </path>
        {/* Moving packet A */}
        <circle r="3" fill="#1a6e42" opacity="0.65">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M 120 60 C 155 60 170 120 192 155"/>
        </circle>

        {/* Tenant B — top right */}
        <rect x="320" y="22" width="92" height="68" rx="10" fill="rgba(26,110,66,0.05)" stroke="rgba(26,110,66,0.22)" strokeWidth="1.2"/>
        <rect x="332" y="36" width="68" height="7" rx="2" fill="rgba(26,110,66,0.18)"/>
        <rect x="332" y="48" width="44" height="5" rx="1.5" fill="rgba(26,110,66,0.12)"/>
        <rect x="332" y="58" width="60" height="5" rx="1.5" fill="rgba(26,110,66,0.08)"/>
        <text x="366" y="82" textAnchor="middle" fill="#1a6e42" fontSize="7" fontFamily="monospace" opacity="0.6">Tenant B</text>

        <path d="M 320 56 C 290 60 265 115 248 155" stroke="#1a6e42" strokeWidth="1" strokeDasharray="5 4" opacity="0.3">
          <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="2.1s" repeatCount="indefinite"/>
        </path>
        <circle r="3" fill="#1a6e42" opacity="0.65">
          <animateMotion dur="2.1s" repeatCount="indefinite" path="M 320 56 C 290 60 265 115 248 155"/>
        </circle>

        {/* Tenant C — bottom left */}
        <rect x="28" y="270" width="92" height="68" rx="10" fill="rgba(26,110,66,0.05)" stroke="rgba(26,110,66,0.22)" strokeWidth="1.2"/>
        <rect x="40" y="284" width="68" height="7" rx="2" fill="rgba(26,110,66,0.18)"/>
        <rect x="40" y="296" width="55" height="5" rx="1.5" fill="rgba(26,110,66,0.12)"/>
        <rect x="40" y="306" width="42" height="5" rx="1.5" fill="rgba(26,110,66,0.08)"/>
        <text x="74" y="328" textAnchor="middle" fill="#1a6e42" fontSize="7" fontFamily="monospace" opacity="0.6">Tenant C</text>

        <path d="M 120 295 C 155 285 178 250 192 200" stroke="#1a6e42" strokeWidth="1" strokeDasharray="5 4" opacity="0.3">
          <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="2.4s" repeatCount="indefinite"/>
        </path>
        <circle r="3" fill="#1a6e42" opacity="0.65">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 120 295 C 155 285 178 250 192 200"/>
        </circle>

        {/* Tenant D — bottom right */}
        <rect x="320" y="270" width="92" height="68" rx="10" fill="rgba(26,110,66,0.05)" stroke="rgba(26,110,66,0.22)" strokeWidth="1.2"/>
        <rect x="332" y="284" width="68" height="7" rx="2" fill="rgba(26,110,66,0.16)"/>
        <rect x="332" y="296" width="48" height="5" rx="1.5" fill="rgba(26,110,66,0.12)"/>
        <rect x="332" y="306" width="62" height="5" rx="1.5" fill="rgba(26,110,66,0.08)"/>
        <text x="366" y="328" textAnchor="middle" fill="#1a6e42" fontSize="7" fontFamily="monospace" opacity="0.6">Tenant D</text>

        <path d="M 320 295 C 285 280 258 250 248 200" stroke="#1a6e42" strokeWidth="1" strokeDasharray="5 4" opacity="0.3">
          <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="1.6s" repeatCount="indefinite"/>
        </path>
        <circle r="3" fill="#1a6e42" opacity="0.65">
          <animateMotion dur="1.6s" repeatCount="indefinite" path="M 320 295 C 285 280 258 250 248 200"/>
        </circle>

        {/* ── Status chips floating around hub ── */}
        {/* Isolated chip */}
        <g transform="translate(75,165)">
          <rect width="58" height="20" rx="10" fill="rgba(26,110,66,0.08)" stroke="rgba(26,110,66,0.25)" strokeWidth="1"/>
          <circle cx="12" cy="10" r="3" fill="#1a6e42" opacity="0.6"/>
          <text x="20" y="14" fill="#1a6e42" fontSize="7" fontFamily="monospace" opacity="0.75">Isolated</text>
        </g>
        {/* Scalable chip */}
        <g transform="translate(305,165)">
          <rect width="62" height="20" rx="10" fill="rgba(26,110,66,0.08)" stroke="rgba(26,110,66,0.25)" strokeWidth="1"/>
          <circle cx="12" cy="10" r="3" fill="#3d9e65" opacity="0.6"/>
          <text x="20" y="14" fill="#1a6e42" fontSize="7" fontFamily="monospace" opacity="0.75">Scalable</text>
        </g>

        {/* ── Bottom label ── */}
        <text x="220" y="352" textAnchor="middle" fill="#1a6e42" fontSize="7" fontFamily="monospace" opacity="0.3" letterSpacing="2">
          MULTI-TENANT  ·  SECURE  ·  CONFIGURABLE
        </text>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO SECTION — redesigned
══════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      className="saas-hero-section"
      style={{ padding: 'clamp(80px,10vh,110px) clamp(20px,4vw,32px) clamp(60px,8vh,90px)', borderBottom: '1px solid rgba(26,110,66,0.1)', background: '#ffffff', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '5px 14px', borderRadius: 100, border: '1px solid rgba(26,110,66,0.25)', background: 'rgba(26,110,66,0.04)', marginBottom: 28 }}
        >
          <span className="saas-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a6e42', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: '#1a6e42', opacity: 0.85 }}>PRODUCT ENGINEERING</span>
        </motion.div>

        {/* Two-column grid */}
        <div
          className="saas-hero-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 56px', alignItems: 'center' }}
        >
          {/* Left: headline + body + badges */}
          <div>
            {/* Headline — staggered clip wipe */}
            {['Custom SaaS', 'Development.'].map((line, li) => (
              <div key={li} style={{ overflow: 'hidden', marginBottom: li === 0 ? 4 : 28 }}>
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.82, delay: 0.22 + li * 0.14, ease: EASE }}
                  style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 'clamp(38px,5.5vw,74px)',
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
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.54, ease: EASE }}
              style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,1.4vw,17px)', color: '#3d6b50', lineHeight: 1.82, margin: '0 0 32px', maxWidth: 460 }}
            >
              Multi-tenant platforms designed for your exact domain — secure, compliant, and built to scale from launch to enterprise.
            </motion.p>

            {/* Feature badges */}
            <motion.div
              className="saas-hero-badges"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.68, ease: EASE }}
              style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}
            >
              {[
                { icon: '⬡', text: 'Multi-tenant' },
                { icon: '⚿', text: 'SOC 2 Ready' },
                { icon: '⇌', text: 'API-first' },
                { icon: '↑', text: '0 → Enterprise' },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.38, delay: 0.72 + i * 0.08, ease: EASE }}
                  style={{ display: 'flex', alignItems: 'center', gap: 7 }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1a6e42', opacity: 0.55, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#3d7a55', letterSpacing: '0.06em' }}>{b.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stat row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.0, ease: EASE }}
              style={{ display: 'flex', gap: 28, marginTop: 36, paddingTop: 28, borderTop: '1px solid rgba(26,110,66,0.1)', flexWrap: 'wrap' }}
            >
              {[
                { val: '4+', label: 'SaaS Platforms Shipped' },
                { val: '100%', label: 'Client IP Ownership' },
                { val: '2 wk', label: 'To First Demo' },
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
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
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
   SECTION 2 — FLAVOURS
══════════════════════════════════════════════════════════════ */
const FLAVOURS = {
  client: {
    label: 'Client-facing SaaS',
    tagline: 'Your product. Delivered to every customer at scale.',
    desc: 'Revenue-generating platforms where every customer is a tenant with their own data, workflows, and configuration — but sharing the same secure infrastructure.',
    points: [
      'Custom onboarding & tenant provisioning flows',
      'Per-tenant configuration, branding and feature flags',
      'Usage-based billing integration (Stripe, Chargebee)',
      'Customer-facing analytics & reporting dashboards',
      'Role-based access control across tenant hierarchies',
      'API-first — expose your platform to third-party integrations',
    ],
    examples: ['CRM platforms', 'Vertical SaaS for regulated industries', 'B2B workflow tools', 'Marketplace infrastructure'],
  },
  internal: {
    label: 'Internal SaaS',
    tagline: 'Operations-grade software your teams actually use.',
    desc: 'Internal platforms that codify your proprietary process — replacing spreadsheets, manual workflows, and stitched-together point solutions with purpose-built software.',
    points: [
      'Multi-department / multi-entity access control',
      'Workflow automation replacing manual handoffs',
      'Deep ERP / CRM / data warehouse integrations',
      'Audit trails, compliance logging, approval chains',
      'Real-time ops dashboards and alerting',
      'Mobile-first field-worker interfaces where needed',
    ],
    examples: ['Internal ops platforms', 'Finance & treasury tools', 'Supply chain dashboards', 'Custom ERP modules'],
  },
};

function FlavoursSection() {
  const [active, setActive] = useState<'client' | 'internal'>('client');
  const f = FLAVOURS[active];
  return (
    <section className="saas-section" style={{ padding: 'clamp(56px,8vw,100px) clamp(20px,4vw,32px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="TWO FLAVOURS" />
        <div style={{ overflow: 'hidden', marginBottom: 36 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,42px)', color: '#0d3d22', lineHeight: 1.1, margin: 0 }}>
              Same rigour. Different audiences.
            </h2>
          </RevealClip>
        </div>
        <FadeUp delay={0.14} style={{ marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', gap: 6, padding: 5, borderRadius: 12, background: 'rgba(26,110,66,0.04)', border: '1px solid rgba(26,110,66,0.12)' }}>
            {(['client', 'internal'] as const).map(key => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`saas-tab${active === key ? ' active' : ''}`}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '9px 20px', borderRadius: 8, background: 'transparent', cursor: 'pointer', letterSpacing: '0.08em', color: active === key ? '#1a6e42' : '#3d7a55', outline: 'none' }}
              >
                {key === 'client' ? 'Client-facing' : 'Internal'}
              </button>
            ))}
          </div>
        </FadeUp>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.38, ease: EASE }}>
            <div className="saas-flavour-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 72px', alignItems: 'start' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 18, color: '#0d3d22', margin: '0 0 12px', lineHeight: 1.35 }}>{f.tagline}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#3d6b50', lineHeight: 1.82, margin: '0 0 28px' }}>{f.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3d7a55', opacity: 0.55, letterSpacing: '0.14em', width: '100%', margin: '0 0 6px' }}>TYPICAL BUILDS</p>
                  {f.examples.map((e, i) => (
                    <span key={i} className="saas-pill" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 11px', borderRadius: 100, color: '#3d7a55' }}>{e}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {f.points.map((p, i) => (
                  <div key={i} className="saas-check-row" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#1a6e42', opacity: 0.7, flexShrink: 0, marginTop: 1 }}>→</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#3d6b50', lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 3 — ARCHITECTURE PILLARS
══════════════════════════════════════════════════════════════ */
const PILLARS = [
  { icon: (<svg viewBox="0 0 44 44" fill="none" width={34} height={34}><rect x="4" y="4" width="36" height="36" rx="5" stroke="#1a6e42" strokeWidth="1.2" opacity="0.5"/><rect x="10" y="10" width="10" height="10" rx="2" stroke="#1a6e42" strokeWidth="1" opacity="0.7"/><rect x="24" y="10" width="10" height="10" rx="2" stroke="#1a6e42" strokeWidth="1" opacity="0.5"/><rect x="10" y="24" width="10" height="10" rx="2" stroke="#1a6e42" strokeWidth="1" opacity="0.5"/><rect x="24" y="24" width="10" height="10" rx="2" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="20" y1="15" x2="24" y2="15" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3"/><line x1="15" y1="20" x2="15" y2="24" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3"/></svg>), title: 'Multi-tenancy', desc: 'Row-level, schema-level or database-per-tenant isolation chosen by your data sensitivity and cost model.' },
  { icon: (<svg viewBox="0 0 44 44" fill="none" width={34} height={34}><circle cx="22" cy="22" r="14" stroke="#1a6e42" strokeWidth="1.2" opacity="0.45"/><circle cx="22" cy="22" r="8" stroke="#1a6e42" strokeWidth="1.3" opacity="0.65"/><circle cx="22" cy="22" r="3" fill="#1a6e42" opacity="0.8"/><path d="M22 8 L22 14" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><path d="M34 22 L28 22" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><path d="M22 36 L22 30" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><path d="M10 22 L16 22" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/></svg>), title: 'Security & Compliance', desc: 'RBAC, zero-trust networking, encrypted data at rest and in transit, full audit logging. SOC 2 / GDPR / HIPAA ready by design.' },
  { icon: (<svg viewBox="0 0 44 44" fill="none" width={34} height={34}><rect x="6" y="18" width="14" height="20" rx="2" stroke="#1a6e42" strokeWidth="1.1" opacity="0.4"/><rect x="24" y="12" width="14" height="26" rx="2" stroke="#1a6e42" strokeWidth="1.2" opacity="0.65"/><path d="M8 28 L16 28" stroke="#1a6e42" strokeWidth="0.7" opacity="0.3"/><path d="M26 20 L34 20" stroke="#1a6e42" strokeWidth="0.7" opacity="0.4"/><path d="M26 25 L34 25" stroke="#1a6e42" strokeWidth="0.7" opacity="0.35"/><path d="M4 38 L40 38" stroke="#1a6e42" strokeWidth="1.1" strokeLinecap="round" opacity="0.3"/></svg>), title: 'Scalable Infrastructure', desc: 'Stateless services, autoscaling compute, managed databases, CDN-first assets. Designed to handle 10× traffic without 10× cost.' },
  { icon: (<svg viewBox="0 0 44 44" fill="none" width={34} height={34}><path d="M10 22 L17 22 L20 14 L24 30 L27 22 L34 22" stroke="#1a6e42" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.75"/><circle cx="10" cy="22" r="2" fill="#1a6e42" opacity="0.5"/><circle cx="34" cy="22" r="2" fill="#1a6e42" opacity="0.5"/><line x1="6" y1="8" x2="6" y2="36" stroke="#1a6e42" strokeWidth="0.7" opacity="0.2"/><line x1="6" y1="36" x2="38" y2="36" stroke="#1a6e42" strokeWidth="0.7" opacity="0.2"/></svg>), title: 'Observability', desc: 'Structured logging, distributed tracing, SLO dashboards and alerting. You always know exactly what your platform is doing.' },
  { icon: (<svg viewBox="0 0 44 44" fill="none" width={34} height={34}><path d="M14 22 C14 16 20 12 26 14" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5"/><path d="M30 22 C30 28 24 32 18 30" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5"/><circle cx="14" cy="22" r="3" stroke="#1a6e42" strokeWidth="1.1" opacity="0.7"/><circle cx="30" cy="22" r="3" stroke="#1a6e42" strokeWidth="1.1" opacity="0.7"/></svg>), title: 'API-first Design', desc: 'Every feature is an endpoint. OpenAPI-documented, versioned, and ready to power mobile apps, partner integrations or your next product.' },
  { icon: (<svg viewBox="0 0 44 44" fill="none" width={34} height={34}><rect x="8" y="8" width="12" height="12" rx="2" stroke="#1a6e42" strokeWidth="1.1" opacity="0.5"/><rect x="24" y="8" width="12" height="12" rx="2" stroke="#1a6e42" strokeWidth="1.1" opacity="0.65"/><rect x="8" y="24" width="12" height="12" rx="2" stroke="#1a6e42" strokeWidth="1.1" opacity="0.65"/><rect x="24" y="24" width="12" height="12" rx="2" stroke="#1a6e42" strokeWidth="1.1" opacity="0.45"/><path d="M20 14 L24 14" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><path d="M14 20 L14 24" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><circle cx="22" cy="22" r="2.5" fill="#1a6e42" opacity="0.4"/></svg>), title: 'Modular Architecture', desc: 'Feature flags, pluggable billing plans, and per-tenant configuration let you ship one platform that adapts to every customer\'s needs.' },
];

function ArchitectureSection() {
  return (
    <section className="saas-section" style={{ padding: 'clamp(0px,0vw,0px) clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="ARCHITECTURE" />
        <div style={{ overflow: 'hidden', marginBottom: 10 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,42px)', color: '#0d3d22', lineHeight: 1.1, margin: 0 }}>
              Six pillars every platform we build on.
            </h2>
          </RevealClip>
        </div>
        <FadeUp delay={0.16} style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#3d6b50', lineHeight: 1.82, maxWidth: 540, margin: '12px 0 0' }}>
            Not bolt-ons. These are design decisions made at the start — before a line of product code is written.
          </p>
        </FadeUp>
        <div className="saas-pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {PILLARS.map((p, i) => (
            <motion.div key={i} className="saas-pillar" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.58, delay: i * 0.08, ease: EASE }} style={{ padding: '24px 20px', borderRadius: 14, background: '#ffffff' }}>
              <div style={{ marginBottom: 14, opacity: 0.7 }}>{p.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#0d3d22', margin: '0 0 9px', lineHeight: 1.25 }}>{p.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3d6b50', lineHeight: 1.72, margin: 0 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 4 — HOW WE BUILD
══════════════════════════════════════════════════════════════ */
const PHASES = [
  { num: '01', phase: 'Product Definition',    duration: '1–2 wks',     what: 'We run structured discovery to nail the core workflow, user types, tenancy model and business rules before any UI or API is designed.',                         outputs: ['User journey maps', 'Tenancy & data model', 'Feature priority matrix', 'Build vs. buy decisions'] },
  { num: '02', phase: 'Architecture & Design', duration: '1–2 wks',     what: 'System design, API contracts, database schemas, auth model, infrastructure plan. All reviewed before the first PR is opened.',                                     outputs: ['System design doc', 'ERD & API spec', 'Auth architecture', 'IaC scaffolding'] },
  { num: '03', phase: 'Iterative Build',       duration: 'Sprint cycles', what: 'Two-week sprints. Working software every cycle. You see real progress — not Figma files — from week three.',                                                    outputs: ['Feature increments', 'Integration tests', 'Preview environments', 'Sprint demos'] },
  { num: '04', phase: 'Launch & Scale',        duration: 'Go-live +',   what: 'Production launch, monitoring, on-call support, and a roadmap for scaling from your first 10 tenants to 10,000.',                                                   outputs: ['Production deployment', 'Runbooks & docs', 'Observability dashboards', 'Scaling playbook'] },
];

function PhaseCard({ p, index }: { p: typeof PHASES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? -28 : 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.62, delay: index * 0.1, ease: EASE }}>
      <div className="saas-card saas-phase" onClick={() => setOpen(o => !o)} style={{ padding: '22px 24px', borderRadius: 14, background: '#ffffff', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#1a6e42', opacity: 0.65, letterSpacing: '0.12em' }}>{p.num}</span>
              <span style={{ width: 1, height: 11, background: 'rgba(26,110,66,0.18)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3d7a55', opacity: 0.55 }}>{p.duration}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#0d3d22', margin: '0 0 7px', lineHeight: 1.2 }}>{p.phase}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#3d6b50', margin: 0, lineHeight: 1.7 }}>{p.what}</p>
          </div>
          <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.28, ease: EASE }} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(26,110,66,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, color: '#1a6e42', fontSize: 18, fontWeight: 300 }}>
            +
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.38, ease: EASE }, opacity: { duration: 0.26 } }} style={{ overflow: 'hidden' }}>
              <div style={{ borderTop: '1px solid rgba(26,110,66,0.1)', marginTop: 16, paddingTop: 16 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#1a6e42', opacity: 0.65, letterSpacing: '0.14em', margin: '0 0 10px' }}>DELIVERABLES</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.outputs.map((o, oi) => <span key={oi} className="saas-pill" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 11px', borderRadius: 100, color: '#3d7a55' }}>{o}</span>)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function HowWeSection() {
  return (
    <section className="saas-section" style={{ padding: 'clamp(0px,0vw,0px) clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="HOW WE BUILD" />
        <div className="saas-how-top" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px 72px', alignItems: 'start', marginBottom: 40 }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,42px)', color: '#0d3d22', lineHeight: 1.1, margin: 0 }}>Discovery first. Code second.</h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.17}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#3d6b50', lineHeight: 1.82, margin: '14px 0 0', maxWidth: 400 }}>
                Most SaaS projects fail in the design phase — not the build. We invest heavily upfront so the build phase is fast and predictable.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.22}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#3d7a55', lineHeight: 1.8, margin: 0, borderLeft: '2px solid rgba(26,110,66,0.25)', paddingLeft: 18 }}>
              "We've taken over SaaS projects from other agencies and spent months fixing architecture decisions that should have been made in week one. That's why we don't shortcut discovery."
            </p>
          </FadeUp>
        </div>
        <div className="saas-how-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {PHASES.map((p, i) => <PhaseCard key={i} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 5 — TECH STACK
══════════════════════════════════════════════════════════════ */
const STACK_ROWS = [
  { label: 'Frontend',        items: ['Next.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'tRPC'] },
  { label: 'Backend',         items: ['Node.js', 'FastAPI', 'Go', 'GraphQL', 'REST / OpenAPI'] },
  { label: 'Auth & Identity', items: ['Clerk', 'Auth0', 'AWS Cognito', 'custom OIDC'] },
  { label: 'Database',        items: ['PostgreSQL', 'Redis', 'Neon', 'PlanetScale', 'ClickHouse'] },
  { label: 'Infra & DevOps',  items: ['AWS / GCP', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Datadog'] },
  { label: 'Billing',         items: ['Stripe', 'Chargebee', 'custom metered usage'] },
];

function TechSection() {
  return (
    <section className="saas-section" style={{ padding: 'clamp(0px,0vw,0px) clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="TECH STACK" />
        <div style={{ overflow: 'hidden', marginBottom: 44 }}>
          <RevealClip delay={0.06}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,42px)', color: '#0d3d22', lineHeight: 1.1, margin: 0 }}>
              Modern. Proven. Boring in the right ways.
            </h2>
          </RevealClip>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {STACK_ROWS.map((row, ri) => (
            <FadeUp key={ri} delay={0.06 + ri * 0.07}>
              <div className="saas-stack-row" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '0 28px', padding: '16px 8px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#1a6e42', opacity: 0.6, letterSpacing: '0.12em' }}>{row.label.toUpperCase()}</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {row.items.map((item, ii) => <span key={ii} className="saas-stack-badge" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3d6b50', padding: '3px 10px', borderRadius: 6 }}>{item}</span>)}
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
   SECTION 6 — DELIVERABLES
══════════════════════════════════════════════════════════════ */
const DELIVERABLES = [
  { label: 'Production-ready codebase', sub: 'Yours to own — clean git history, tests, docs' },
  { label: 'Infra-as-code',             sub: 'Every environment reproducible in minutes' },
  { label: 'CI/CD pipeline',            sub: 'From PR to production, automated and safe' },
  { label: 'Admin dashboard',           sub: 'Tenant management, feature flags, billing ops' },
  { label: 'API documentation',         sub: 'OpenAPI spec, SDKs if required' },
  { label: 'Runbooks & handover',       sub: 'So your team can operate and extend independently' },
];

function DeliverablesSection() {
  return (
    <section className="saas-section" style={{ padding: 'clamp(0px,0vw,0px) clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel text="DELIVERABLES" />
        <div className="saas-deliv-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px 72px', alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <RevealClip delay={0.06}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,42px)', color: '#0d3d22', lineHeight: 1.1, margin: 0 }}>
                  Everything you need to launch and own it.
                </h2>
              </RevealClip>
            </div>
            <FadeUp delay={0.18}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#3d6b50', lineHeight: 1.82, margin: '14px 0 0', maxWidth: 380 }}>
                We don't hand you a black box. You get full IP, documented code, and an ops-capable team who can take it from there.
              </p>
            </FadeUp>
          </div>
          <div className="saas-deliv-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            {DELIVERABLES.map((d, i) => (
              <motion.div key={i} className="saas-deliverable" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.46, delay: i * 0.08, ease: EASE }} style={{ padding: '16px 14px', borderRadius: 12, background: '#ffffff' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: '#0d3d22', margin: '0 0 4px', lineHeight: 1.35 }}>{d.label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: '#3d7a55', margin: 0, lineHeight: 1.6, opacity: 0.7 }}>{d.sub}</p>
              </motion.div>
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
    <section className="saas-section" style={{ padding: 'clamp(0px,0vw,0px) clamp(20px,4vw,32px) clamp(72px,10vw,120px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeUp delay={0}>
          <div className="saas-cta-block saas-cta-inner" style={{ padding: 'clamp(28px,4vw,52px) clamp(24px,4vw,56px)', borderRadius: 18, background: '#f6fbf8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div style={{ overflow: 'hidden', marginBottom: 8 }}>
                <RevealClip delay={0.06}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px,2.5vw,32px)', color: '#0d3d22', margin: 0, lineHeight: 1.15 }}>
                    Have a platform in mind?
                  </h2>
                </RevealClip>
              </div>
              <FadeUp delay={0.16}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#3d6b50', margin: 0, lineHeight: 1.7, maxWidth: 440 }}>
                  Share your idea, constraints, and timeline. We'll come back with a realistic scope, architecture direction, and honest assessment — no pitch deck required.
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.22}>
              <a
                href="#contact"
                className="saas-cta-btn"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: '#ffffff', background: '#1a6e42', border: '1px solid #1a6e42', padding: '13px 30px', borderRadius: 8, textDecoration: 'none', display: 'inline-block', flexShrink: 0 }}
                onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a6e42'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1a6e42'; e.currentTarget.style.color = '#ffffff'; }}
              >
                Start the conversation →
              </a>
            </FadeUp>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export function CustomSaaSPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <style>{STYLES}</style>
      <HeroSection />
      <FlavoursSection />
      <Divider />
      <ArchitectureSection />
      <Divider />
      <HowWeSection />
      <Divider />
      <TechSection />
      <Divider />
      <DeliverablesSection />
      <CTASection />
    </div>
  );
}