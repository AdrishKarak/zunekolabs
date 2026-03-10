import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroVideo from '../assets/Zuneko.mp4';

const EASE = [0.16, 1, 0.3, 1] as const;

const ROTATING_WORDS = [
  'AI Automation Systems',
  'Computer Vision Solutions',
  'LLM-Powered Products',
  'Frappe ERP Platforms',
  'Digital Transformation',
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1 + Math.random(),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      opacity: 0.2 + Math.random() * 0.25,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;  p.y += p.vy;
        if (p.x < 0) p.x = W;  if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;  if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,197,94,${p.opacity})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(34,197,94,${0.06 * (1 - d / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />
  );
}

function RotatingWord() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % ROTATING_WORDS.length); setVisible(true); }, 320);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key={ROTATING_WORDS[idx]}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontWeight: 500, color: 'var(--accent-primary)' }}
          >
            {ROTATING_WORDS[idx]}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: 'var(--bg-void)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Video */}
      <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} src={heroVideo} />

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.60) 50%, rgba(0,0,0,0.94) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 55% at 35% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)' }} />

      {/* Particles */}
      <ParticleCanvas />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '960px', margin: '0 auto', padding: '0 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '14vh', paddingBottom: '100px', width: '100%' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.05)', padding: '7px 18px', borderRadius: '4px', marginBottom: '36px' }}
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>
            Enterprise AI & Automation
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ marginBottom: '28px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(52px, 7.5vw, 104px)', color: 'var(--text-primary)', lineHeight: 0.96, letterSpacing: '-0.01em' }}
          >
            Automate. Transform.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.56, ease: EASE }}
            style={{ position: 'relative', display: 'inline-block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(52px, 7.5vw, 104px)', color: 'var(--accent-primary)', fontStyle: 'italic', lineHeight: 0.96, letterSpacing: '-0.01em' }}
          >
            Dominate.
            <svg style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '10px' }} viewBox="0 0 400 10" preserveAspectRatio="none">
              <motion.path d="M 0 7 Q 100 2 200 7 Q 300 12 400 7" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.6 }} transition={{ duration: 1.2, delay: 1.1, ease: EASE }} />
            </svg>
          </motion.div>
        </div>

        {/* Rotating subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.8vw, 19px)', color: 'var(--text-secondary)', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', fontWeight: 400 }}
        >
          We engineer&nbsp;—&nbsp;<RotatingWord />
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: EASE }}
          style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '36px' }}
        >
          {/* Primary */}
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 30px',
              borderRadius: '6px',
              background: 'var(--accent-primary)',
              color: '#000000',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
              letterSpacing: '-0.01em',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(34,197,94,0.22)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Start Your Transformation
          </a>
          {/* Secondary */}
          <a
            href="#works"
            style={{
              padding: '13px 30px',
              borderRadius: '6px',
              border: '1px solid rgba(241,245,242,0.18)',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.35)'; e.currentTarget.style.background = 'rgba(34,197,94,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(241,245,242,0.18)'; e.currentTarget.style.background = 'transparent'; }}
          >
            Explore Our Work
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.25, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-secondary)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '0.03em' }}>
            Trusted by 15+ enterprises · Pune & Kolkata · Est. 2024
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 3 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 400, color: 'var(--text-tertiary)', letterSpacing: '0.12em' }}>scroll</span>
        <ChevronDown className="bounce-y" size={16} style={{ color: 'var(--text-tertiary)' }} />
      </div>
    </section>
  );
}
