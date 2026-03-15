import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import heroBg from '../assets/Ai.jpeg';
import herovd from '../assets/Zuneko.mp4';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

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

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', height: '1.2em', position: 'relative', width: '100%' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[idx]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0,      opacity: 1 }}
          exit={{ y: '-100%',   opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'block',
            color: G_HI,
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {ROTATING_WORDS[idx]}
        </motion.span>
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
      {/* Background video */}
      <video
        src={herovd}
        poster={heroBg}
        autoPlay loop muted playsInline aria-hidden
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0, opacity: 0.65,
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(2,10,5,0.91) 0%, rgba(2,12,6,0.68) 50%, rgba(2,10,5,0.86) 100%)',
      }} />

      {/* Malachite tint — left only */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 40% 60% at 0% 60%, rgba(11,218,81,0.05) 0%, transparent 70%)',
      }} />

      <ParticleCanvas />

      {/* ── CONTENT ── */}
      <div style={{
        position: 'relative', zIndex: 3,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        maxWidth: 1280, width: '100%', margin: '0 auto',
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px) 80px',
      }}>

        <div className="hero-headline" style={{
          flex: 1,
          maxWidth: 640,
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE_SMOOTH }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 26 }}
          >
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: G_HI, opacity: 0.75, flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9.5,
              letterSpacing: '0.22em', color: G_LO, opacity: 0.6,
            }}>
              AI-POWERED ENTERPRISE TECHNOLOGY
            </span>
          </motion.div>

          {/* Headline */}
          {['Intelligence', 'that Works', 'for You.'].map((line, li) => (
            <div key={li} style={{ overflow: 'hidden', lineHeight: 1, width: '100%' }}>
              <motion.h1
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0,   opacity: 1 }}
                transition={{ duration: 0.88, delay: 0.36 + li * 0.13, ease: EASE_SMOOTH }}
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(36px, 4.8vw, 72px)',
                  lineHeight: 0.97, margin: '0 0 6px',
                  color: li === 1 ? G_HI : '#edfff6',
                  fontStyle: li === 1 ? 'italic' : 'normal',
                  letterSpacing: '-0.01em',
                }}
              >
                {line}
              </motion.h1>
            </div>
          ))}

          {/* Squiggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{ margin: '16px 0 28px' }}
          >
            <svg viewBox="0 0 260 10" style={{ width: 240 }} preserveAspectRatio="none">
              <motion.path
                d="M 0 6 Q 65 1 130 6 Q 195 11 260 6"
                fill="none" stroke={G_HI} strokeWidth="1.5"
                strokeLinecap="round" opacity="0.42"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 1.0, ease: EASE_SMOOTH }}
              />
            </svg>
          </motion.div>

          {/* WE ENGINEER + rotating word */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.72, ease: EASE_SMOOTH }}
            style={{ marginBottom: 28, width: '100%' }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(8px, 2vw, 9px)',
              letterSpacing: '0.2em', color: G_LO, opacity: 0.45,
              margin: '0 0 8px',
            }}>
              WE ENGINEER
            </p>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.6vw, 19px)',
              color: 'rgba(210,255,230,0.85)',
              lineHeight: 1.3,
            }}>
              <RotatingWord />
            </div>
          </motion.div>

          {/* Rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.86, ease: EASE_SMOOTH }}
            style={{
              width: '100%', height: 1,
              background: `linear-gradient(90deg, ${G_BDR}, transparent)`,
              marginBottom: 28,
              transformOrigin: 'left',
            }}
          />


          {/* CTA row — both buttons side by side */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 1.02, ease: EASE_SMOOTH }}
            className="hero-ctas"
            style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}
          >
            {/* Primary */}
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 26px', borderRadius: 8,
                background: G_HI, color: '#021a09',
                fontFamily: 'var(--font-heading)', fontWeight: 700,
                fontSize: 13.5, letterSpacing: '0.025em',
                textDecoration: 'none',
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

            {/* Secondary */}
            <a
              href="#works"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 22px', borderRadius: 8,
                border: `1.5px solid ${G_BDR}`,
                background: 'rgba(11,218,81,0.04)',
                color: G_LO,
                fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13,
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
            transition={{ duration: 0.55, delay: 1.22 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}
          >
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: G_HI, opacity: 0.35 }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              letterSpacing: '0.1em', color: G_LO, opacity: 0.28,
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