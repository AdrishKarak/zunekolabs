import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import heroBg from '../assets/Ai.jpeg';
import herovd from '../assets/Zuneko.mp4';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

/* ─── Malachite green palette ─────────────────────────────────
   G_HI  #0bda51  — vivid malachite, headlines + CTA bg
   G_LO  #5de88a  — softer malachite for labels / secondary text
──────────────────────────────────────────────────────────────── */
const G_HI  = '#0bda51';
const G_LO  = '#5de88a';
const G_BDR = 'rgba(11,218,81,0.22)';

const ROTATING_WORDS = [
  'AI Automation Systems',
  'Computer Vision Solutions',
  'LLM-Powered Products',
  'Frappe ERP Platforms',
  'Digital Transformation',
];

/* ─── Particle canvas ─────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const pts = Array.from({ length: 38 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 0.9 + Math.random() * 1.0,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o: 0.12 + Math.random() * 0.18,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(11,218,81,${p.o})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) rafRef.current = requestAnimationFrame(draw);
      else cancelAnimationFrame(rafRef.current);
    }, { threshold: 0 });
    obs.observe(canvas);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      obs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 2,
      }}
    />
  );
}

/* ─── Rotating word ───────────────────────────────────────────── */
function RotatingWord() {
  const [idx, setIdx] = useState(0);
  const [vis, setVis]  = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % ROTATING_WORDS.length);
        setVis(true);
      }, 320);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="wait">
        {vis && (
          <motion.span
            key={ROTATING_WORDS[idx]}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0,      opacity: 1 }}
            exit={{ y: '-100%',   opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE_SMOOTH }}
            style={{
              display: 'inline-block',
              color: G_HI,
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
            }}
          >
            {ROTATING_WORDS[idx]}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ─── Main hero ───────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'var(--bg-void)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background video — loops infinitely, image as poster fallback */}
      <video
        src={herovd}
        poster={heroBg}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0, opacity: 0.45,
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(2,10,5,0.91) 0%, rgba(2,12,6,0.68) 50%, rgba(2,10,5,0.86) 100%)',
      }} />

      {/* Malachite tint */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 52% 65% at 10% 55%, rgba(11,218,81,0.04) 0%, transparent 70%)',
      }} />

      <ParticleCanvas />

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 3,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        maxWidth: 1280, width: '100%', margin: '0 auto',
        padding: 'clamp(80px,10vh,120px) 48px 80px',
      }}>

        {/* ═══ LEFT COLUMN ════════════════════════════════════════ */}
        <div style={{
          flex: '0 0 46%',
          paddingRight: 'clamp(60px, 9vw, 140px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE_SMOOTH }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 30 }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: G_HI, opacity: 0.85, flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10.5,
              letterSpacing: '0.22em', color: G_LO, opacity: 0.75,
            }}>
              AI-POWERED ENTERPRISE TECHNOLOGY
            </span>
          </motion.div>

          {/* Headline */}
          {['Intelligence', 'that Works', 'for You.'].map((line, li) => (
            <div key={li} style={{ overflow: 'hidden', lineHeight: 1 }}>
              <motion.h1
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                transition={{ duration: 0.88, delay: 0.36 + li * 0.13, ease: EASE_SMOOTH }}
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(46px, 6.2vw, 92px)',
                  lineHeight: 0.97, margin: '0 0 6px',
                  color: li === 1 ? G_HI : '#edfff6',
                  fontStyle: li === 1 ? 'italic' : 'normal',
                }}
              >
                {line}
              </motion.h1>
            </div>
          ))}

          {/* Squiggle underline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{ margin: '18px 0 36px' }}
          >
            <svg viewBox="0 0 280 10" style={{ width: 'min(280px,62%)' }} preserveAspectRatio="none">
              <motion.path
                d="M 0 6 Q 70 1 140 6 Q 210 11 280 6"
                fill="none" stroke={G_HI} strokeWidth="1.6"
                strokeLinecap="round" opacity="0.45"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 1.1, ease: EASE_SMOOTH }}
              />
            </svg>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 1.0, ease: EASE_SMOOTH }}
          >
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', borderRadius: 8,
                background: G_HI, color: '#021a09',
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14,
                textDecoration: 'none', letterSpacing: '0.025em',
                transition: 'background 0.22s, transform 0.22s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#2ef066';
                el.style.transform  = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = G_HI;
                el.style.transform  = '';
              }}
            >
              Start Your Transformation <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
          </motion.div>
        </div>

        {/* ─── Vertical divider ──────────────────────────────────── */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.65, ease: EASE_SMOOTH }}
          style={{
            width: 1, alignSelf: 'stretch', flexShrink: 0,
            background: `linear-gradient(to bottom, transparent, ${G_BDR} 20%, ${G_BDR} 80%, transparent)`,
            transformOrigin: 'top',
          }}
        />

        {/* ═══ RIGHT COLUMN — trimmed ═════════════════════════════ */}
        <div style={{
          flex: 1,
          paddingLeft: 'clamp(60px, 9vw, 140px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>

          {/* WE ENGINEER + rotating word */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.68, delay: 0.55, ease: EASE_SMOOTH }}
            style={{ marginBottom: 32 }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.2em', color: G_LO, opacity: 0.5,
              margin: '0 0 12px',
            }}>
              WE ENGINEER
            </p>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(17px, 1.9vw, 23px)',
              color: 'rgba(210,255,230,0.9)',
              lineHeight: 1.3,
            }}>
              <RotatingWord />
            </div>
          </motion.div>

          {/* Rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.82, ease: EASE_SMOOTH }}
            style={{
              height: 1,
              background: `linear-gradient(90deg, ${G_BDR}, transparent)`,
              marginBottom: 32,
              transformOrigin: 'left',
            }}
          />

          {/* Short description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.92, ease: EASE_SMOOTH }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(13px, 1.15vw, 15px)',
              color: 'rgba(175,238,205,0.5)',
              lineHeight: 1.8, margin: '0 0 38px',
              maxWidth: 300,
            }}
          >
            Enterprise AI, ERP platforms, and intelligent automation — built to scale.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 1.02, ease: EASE_SMOOTH }}
            style={{ display: 'flex', gap: 40, marginBottom: 40 }}
          >
            {[
              { val: '15+',  label: 'Clients' },
              { val: '2024', label: 'Founded' },
              { val: '2',    label: 'Offices' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 22, color: G_HI, lineHeight: 1, marginBottom: 5,
                }}>
                  {s.val}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  letterSpacing: '0.16em', color: G_LO, opacity: 0.42,
                }}>
                  {s.label.toUpperCase()}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 1.1, ease: EASE_SMOOTH }}
          >
            <a
              href="#works"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', borderRadius: 8,
                border: `1.5px solid ${G_BDR}`,
                background: 'rgba(11,218,81,0.04)',
                color: G_LO,
                fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13.5,
                textDecoration: 'none',
                transition: 'border-color 0.22s, background 0.22s, color 0.22s, transform 0.22s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(11,218,81,0.44)';
                el.style.background  = 'rgba(11,218,81,0.08)';
                el.style.color       = '#cffde0';
                el.style.transform   = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = G_BDR;
                el.style.background  = 'rgba(11,218,81,0.04)';
                el.style.color       = G_LO;
                el.style.transform   = '';
              }}
            >
              Explore Our Work
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 1.28 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 28 }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: G_HI, opacity: 0.42 }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.1em', color: G_LO, opacity: 0.33,
            }}>
              Pune &amp; Kolkata · Est. 2024
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, zIndex: 3,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 9,
          color: G_LO, letterSpacing: '0.26em', opacity: 0.3,
        }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={15} style={{ color: G_LO, opacity: 0.26 }} />
        </motion.div>
      </div>
    </section>
  );
}