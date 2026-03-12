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
        ctx.fillStyle = `rgba(10,66,37,${p.opacity * 0.15})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(10,66,37,${0.03 * (1 - d / 130)})`;
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
            style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontWeight: 500, color: '#ffffff' }}
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
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Base Brand Layer */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--accent-primary)', zIndex: 0 }} />

      {/* Video Background with readability filters */}
      <video 
        autoPlay muted loop playsInline 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          zIndex: 1,
          opacity: 0.45,
          filter: 'brightness(0.6) contrast(1.1) grayscale(0.15)'
        }} 
        src={heroVideo} 
      />

      {/* Protective Overlay - Darker sides, lighter center for video visibility */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 2, 
        background: 'linear-gradient(90deg, rgba(10,66,37,0.88) 0%, rgba(10,66,37,0.35) 35%, rgba(10,66,37,0.35) 65%, rgba(10,66,37,0.88) 100%)' 
      }} />

      {/* Particles */}
      <ParticleCanvas />

      {/* Two-Column Content Layout */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '60px 40px', gap: '60px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Left Column - Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(52px, 6vw, 76px)', color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: '28px' }}
          >
            Intelligence that Works
          </motion.h1>

          {/* Rotating subtitle - ultra-clean */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 2vw, 22px)', color: '#00ff88', marginBottom: '48px', fontWeight: 500, letterSpacing: '-0.01em' }}
          >
            <RotatingWord />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '44px' }}
          >
            {/* Primary */}
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '6px',
                background: '#ffffff',
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Get Started
            </a>
            
            {/* Secondary */}
            <a
              href="#works"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '6px',
                border: '1.5px solid rgba(255,255,255,0.35)',
                background: 'transparent',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
            >
              View Work
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.15)' }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '11px', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.02em' }}>
              15+ Clients · 2024
            </span>
          </motion.div>
        </div>

        {/* Right Column - Visual Stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center' }}
        >
          {/* Stat Cards */}
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '24px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#00ff88', marginBottom: '6px' }}>15+</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>Enterprise Clients</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '24px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#00ff88', marginBottom: '6px' }}>2024</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>Founded in Pune</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '24px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#00ff88', marginBottom: '6px' }}>2</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>Offices</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 3 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 400, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>SCROLL</span>
        <ChevronDown size={16} style={{ color: 'rgba(255,255,255,0.45)', animation: 'bounce 2s infinite' }} />
      </div>
    </section>
  );
}
