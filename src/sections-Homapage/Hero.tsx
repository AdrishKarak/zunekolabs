import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroVideo from '../assets/Zuneko.mp4';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

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

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      opacity: 0.3 + Math.random() * 0.35,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,232,122,${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,232,122,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
    />
  );
}

function RotatingWord() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', minWidth: '240px' }}>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key={ROTATING_WORDS[idx]}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_SMOOTH }}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              color: 'var(--accent-primary)',
            }}
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
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'var(--bg-void)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        src={heroVideo}
      />

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(3,13,7,0.75) 0%, rgba(3,13,7,0.55) 50%, rgba(3,13,7,0.92) 100%)',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(0,232,122,0.06) 0%, transparent 70%)',
      }} />

      {/* Particles */}
      <ParticleCanvas />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '15vh',
        paddingBottom: '80px',
        width: '100%',
      }}>
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_SMOOTH }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid var(--border-bright)',
            background: 'rgba(0,232,122,0.08)',
            padding: '6px 16px',
            borderRadius: '100px',
            marginBottom: '32px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>
            ⬡ AI-Powered Enterprise Technology
          </span>
        </motion.div>

        {/* Main headline */}
        <div style={{ marginBottom: '28px', lineHeight: 0.95 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_SMOOTH }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(56px, 8vw, 110px)',
              color: 'var(--text-primary)',
              lineHeight: 0.95,
            }}
          >
            Automate. Transform.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: EASE_SMOOTH }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(56px, 8vw, 110px)',
              color: 'var(--accent-primary)',
              fontStyle: 'italic',
              lineHeight: 0.95,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            Dominate.
            <svg
              style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '12px' }}
              viewBox="0 0 400 12"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 0 8 Q 100 2 200 8 Q 300 14 400 8"
                fill="none"
                stroke="#00e87a"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: EASE_SMOOTH }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Rotating subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE_SMOOTH }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-secondary)',
            marginBottom: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          We engineer —&nbsp;
          <RotatingWord />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: EASE_SMOOTH }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}
        >
          <motion.a
            href="#contact"
            whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,232,122,0.35)', backgroundColor: '#1affa0' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '14px 32px',
              borderRadius: '6px',
              background: 'var(--accent-primary)',
              color: 'var(--bg-void)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
          >
            Start Your Transformation
            <motion.span whileHover={{ x: 4 }} style={{ display: 'inline-block' }} transition={{ duration: 0.2 }}>→</motion.span>
          </motion.a>
          <motion.a
            href="#works"
            whileHover={{ borderColor: 'var(--border-bright)', backgroundColor: 'rgba(0,232,122,0.06)' }}
            style={{
              padding: '14px 32px',
              borderRadius: '6px',
              border: '1.5px solid rgba(240,250,244,0.3)',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
          >
            Explore Our Work
          </motion.a>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3, ease: EASE_SMOOTH }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span className="pulse-dot" style={{ color: 'var(--accent-primary)', fontSize: '10px' }}>●</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>
            Trusted by 15+ businesses · Pune &amp; Kolkata · Est. 2024
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        zIndex: 3,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', letterSpacing: '0.2em' }}>scroll</span>
        <ChevronDown className="bounce-y" size={18} style={{ color: 'var(--text-tertiary)' }} />
      </div>
    </section>
  );
}