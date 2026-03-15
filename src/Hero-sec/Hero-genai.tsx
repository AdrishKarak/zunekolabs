import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Magnetic from '../components/ui/Magnetic';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const ROTATING_WORDS = [
  'AI Automation Systems',
  'Computer Vision Solutions',
  'LLM-Powered Products',
  'Frappe ERP Platforms',
  'Digital Transformation',
];

/* ─── Particle canvas — green dots on white ───────────────────── */
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

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      opacity: 0.12 + Math.random() * 0.16,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
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
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) rafRef.current = requestAnimationFrame(draw);
      else cancelAnimationFrame(rafRef.current);
    }, { threshold: 0 });
    observer.observe(canvas);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
    />
  );
}

/* ─── Rotating word ───────────────────────────────────────────── */
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
    <span className="rotating-word-container" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', minWidth: 'clamp(180px, 20vw, 260px)' }}>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key={ROTATING_WORDS[idx]}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_SMOOTH }}
            style={{ display: 'inline-block', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--accent-primary)' }}
          >
            {ROTATING_WORDS[idx]}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ─── SVG: Animated circuit grid — bottom-right ───────────────── */
function CircuitSVG() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 0.5 }}
      viewBox="0 0 420 420"
      style={{ position: 'absolute', bottom: -40, right: -40, width: 480, height: 480, zIndex: 1, pointerEvents: 'none' }}
      fill="none"
    >
      {[0,60,120,180,240,300,360,420].map(v => (
        <g key={v}>
          <line x1={v} y1={0} x2={v} y2={420} stroke="rgba(0,232,122,0.1)" strokeWidth="1" />
          <line x1={0} y1={v} x2={420} y2={v} stroke="rgba(0,232,122,0.1)" strokeWidth="1" />
        </g>
      ))}
      <motion.path
        d="M 60 60 H 180 V 120 H 300 V 60 H 360"
        stroke="rgba(0,180,96,0.35)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, delay: 0.8, ease: 'easeInOut' }}
      />
      <motion.path
        d="M 0 180 H 120 V 240 H 60 V 300 H 180 V 360 H 300"
        stroke="rgba(0,180,96,0.28)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1.2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M 240 120 V 240 H 360 V 300 H 420"
        stroke="rgba(0,180,96,0.22)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 1.6, ease: 'easeInOut' }}
      />
      <motion.path
        d="M 120 300 H 240 V 420"
        stroke="rgba(0,180,96,0.18)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 2.0, ease: 'easeInOut' }}
      />
      {([[60,60],[180,60],[300,60],[360,60],[120,180],[300,180],[240,240],[360,300],[180,300],[300,360]] as [number,number][]).map(([cx, cy], i) => (
        <motion.circle
          key={i} cx={cx} cy={cy} r={3.5}
          fill="rgba(0,200,106,0.65)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.0 + i * 0.08 }}
        />
      ))}
      {([[180,60],[240,240]] as [number,number][]).map(([cx, cy], i) => (
        <motion.circle
          key={`ring-${i}`} cx={cx} cy={cy} r={3.5}
          fill="none" stroke="rgba(0,200,106,0.7)" strokeWidth="1"
          animate={{ r: [3.5, 14], opacity: [0.7, 0] }}
          transition={{ duration: 2, delay: i * 0.9, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </motion.svg>
  );
}

/* ─── SVG: Rotating geometric shapes — top-left ───────────────── */
function GeometricSVG() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      viewBox="0 0 340 340"
      style={{ position: 'absolute', top: -20, left: -20, width: 380, height: 380, zIndex: 1, pointerEvents: 'none' }}
      fill="none"
    >
      <motion.polygon
        points="170,20 310,95 310,245 170,320 30,245 30,95"
        stroke="rgba(0,180,96,0.15)" strokeWidth="1"
        style={{ transformOrigin: '170px 170px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />
      <motion.polygon
        points="170,60 280,120 280,220 170,280 60,220 60,120"
        stroke="rgba(0,180,96,0.12)" strokeWidth="1"
        style={{ transformOrigin: '170px 170px' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      />
      <motion.polygon
        points="170,100 240,200 100,200"
        stroke="rgba(0,180,96,0.18)" strokeWidth="1.2"
        style={{ transformOrigin: '170px 167px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      />
      {([[30,95],[310,95],[310,245],[30,245]] as [number,number][]).map(([x,y], i) => (
        <motion.circle
          key={i} cx={x} cy={y} r={2.5}
          fill="rgba(0,200,106,0.55)"
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 2.2, delay: i * 0.5, repeat: Infinity }}
        />
      ))}
    </motion.svg>
  );
}

/* ─── SVG: Breathing concentric rings — centred ───────────────── */
function GlowRingSVG() {
  return (
    <svg
      viewBox="0 0 800 800"
      style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw', maxWidth: 900, height: 'auto',
        zIndex: 0, pointerEvents: 'none', opacity: 0.5,
      }}
      fill="none"
    >
      <defs>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00e87a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00e87a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00e87a" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#00e87a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="400" cy="400" r="380" fill="url(#glow2)" />
      <circle cx="400" cy="400" r="220" fill="url(#glow1)" />
      <motion.circle cx="400" cy="400" r="340"
        stroke="rgba(0,180,96,0.12)" strokeWidth="1"
        animate={{ r: [340, 356, 340] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle cx="400" cy="400" r="240"
        stroke="rgba(0,180,96,0.14)" strokeWidth="1"
        animate={{ r: [240, 252, 240] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.circle cx="400" cy="400" r="140"
        stroke="rgba(0,180,96,0.16)" strokeWidth="1"
        animate={{ r: [140, 150, 140] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.circle cx="400" cy="400" r="60"
        stroke="rgba(0,180,96,0.2)" strokeWidth="1"
        animate={{ r: [60, 67, 60] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
    </svg>
  );
}

/* ─── SVG: Floating AI network nodes — right side ─────────────── */
function DataNodesSVG() {
  const nodes = [
    { x: 40,  y: 60,  label: 'ML Model' },
    { x: 160, y: 20,  label: 'Vision API' },
    { x: 260, y: 80,  label: 'ERP Core' },
    { x: 120, y: 140, label: 'LLM Engine' },
    { x: 220, y: 160, label: 'Automation' },
  ];
  const edges = [[0,1],[1,2],[0,3],[3,4],[2,4],[1,3]];

  return (
    <motion.svg
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.9 }}
      viewBox="0 0 300 200"
      style={{
        position: 'absolute', right: 52, top: '50%',
        transform: 'translateY(-50%)',
        width: 320, height: 220, zIndex: 2, pointerEvents: 'none',
      }}
      fill="none"
    >
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(0,180,96,0.28)" strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 + i * 0.12 }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.x} cy={n.y} r={20}
            fill="rgba(0,232,122,0.08)"
            stroke="rgba(0,180,96,0.35)" strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 + i * 0.1, type: 'spring' }}
          />
          <motion.circle
            cx={n.x} cy={n.y} r={20}
            fill="none" stroke="rgba(0,200,106,0.5)" strokeWidth="0.8"
            animate={{ r: [20, 32], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, delay: 1.8 + i * 0.4, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.text
            x={n.x} y={n.y + 1}
            textAnchor="middle" dominantBaseline="middle"
            fill="rgba(0,140,70,0.85)" fontSize="5.8" fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 + i * 0.1 }}
          >
            {n.label}
          </motion.text>
        </g>
      ))}
    </motion.svg>
  );
}

/* ─── Main hero ───────────────────────────────────────────────── */
export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle warm-white gradient wash */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 35%, rgba(0,232,122,0.06) 0%, transparent 70%)',
      }} />
      {/* Very soft green tint left edge */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 45% 55% at 8% 52%, rgba(0,232,122,0.07) 0%, transparent 65%)',
      }} />

      <motion.div style={{ y: y1 }}><GeometricSVG /></motion.div>
      <motion.div style={{ y: y2 }}><CircuitSVG /></motion.div>
      <GlowRingSVG />
      <ParticleCanvas />

      {/* Main content */}
      <motion.div style={{ 
        position: 'relative', zIndex: 3,
        maxWidth: '1152px', margin: '0 auto', padding: '0 32px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', paddingTop: '15vh', paddingBottom: '80px', width: '100%',
        opacity
      }}>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_SMOOTH }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: '1px solid var(--border-bright)',
            background: 'rgba(0,232,122,0.08)',
            padding: '6px 16px', borderRadius: '100px', marginBottom: '32px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>
            ⬡ AI-Powered Enterprise Technology
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ marginBottom: '28px', lineHeight: 0.95 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_SMOOTH }}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(42px, 8vw, 110px)',
              color: 'var(--text-primary)', lineHeight: 0.95,
            }}
          >
            Intelligence that
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: EASE_SMOOTH }}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(42px, 8vw, 110px)',
              color: 'var(--accent-primary)', fontStyle: 'italic',
              lineHeight: 0.95, position: 'relative', display: 'inline-block',
            }}
          >
            Works for You.
            <svg
              style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '12px' }}
              viewBox="0 0 400 12" preserveAspectRatio="none"
            >
              <motion.path
                d="M 0 8 Q 100 2 200 8 Q 300 14 400 8"
                fill="none" stroke="#00e87a" strokeWidth="2.5" strokeLinecap="round"
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
            fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-secondary)', marginBottom: '36px',
            display: 'flex', alignItems: 'center', gap: '8px',
            flexWrap: 'wrap', justifyContent: 'center',
          }}
        >
          We engineer —&nbsp;<RotatingWord />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: EASE_SMOOTH }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}
        >
          <Magnetic>
            <a
              href="#contact"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '14px 32px', borderRadius: '6px',
                background: 'var(--accent-primary)', color: 'var(--bg-void)',
                fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px',
                textDecoration: 'none',
                transition: 'background 0.25s, box-shadow 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,232,122,0.32)';
                (e.currentTarget as HTMLElement).style.background = '#1affa0';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
                (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)';
              }}
            >
              Start Your Transformation →
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#works"
              style={{
                padding: '14px 32px', borderRadius: '6px',
                border: '1.5px solid rgba(0,180,96,0.35)',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '15px',
                textDecoration: 'none',
                transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,180,96,0.65)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,232,122,0.06)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,180,96,0.35)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.transform = '';
              }}
            >
              Explore Our Work
            </a>
          </Magnetic>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.25, ease: EASE_SMOOTH }}
          style={{ display: 'flex', gap: '52px', justifyContent: 'center', marginBottom: '36px', flexWrap: 'wrap' }}
        >
          {[
            { val: '15+',  label: 'Clients Served' },
            { val: '2024', label: 'Year Founded' },
            { val: '2',    label: 'Offices' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--accent-primary)', lineHeight: 1, marginBottom: 5 }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em', color: 'var(--text-secondary)' }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.4, ease: EASE_SMOOTH }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block' }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>
            Trusted by 15+ businesses · Pune &amp; Kolkata · Est. 2024
          </span>
        </motion.div>
      </motion.div>

      {/* Floating AI network — right side */}
      <DataNodesSVG />

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 3,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.2em' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} style={{ color: 'var(--text-secondary)' }} />
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .rotating-word-container {
            min-width: 100% !important;
            display: block !important;
            margin-top: 4px !important;
          }
          #hero {
            padding-top: 60px !important;
            min-height: auto !important;
            height: auto !important;
            padding-bottom: 100px !important;
          }
        }
      `}</style>
    </section>
  );
}