import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const TESTIMONIALS = [
  {
    quote: "Zuneko Labs transformed our warehouse operations with their computer vision system. We reduced inventory errors by 94% in just 3 months. The team's technical depth is extraordinary.",
    name: 'Rajesh Mehta',
    role: 'VP Operations',
    company: 'RetailForce India',
    color: '#22c55e',
  },
  {
    quote: "The Frappe ERP migration they executed for us was flawless. 10,000 users onboarded with zero downtime. I've worked with a dozen tech firms—Zuneko is on another level.",
    name: 'Priya Sharma',
    role: 'CTO',
    company: 'Nexgen Manufacturing',
    color: '#4ade80',
  },
  {
    quote: "Their LLM-powered document processing platform cut our contract review time from 3 days to 4 hours. The ROI was visible within the first billing cycle.",
    name: 'Aditya Bose',
    role: 'Head of Legal Tech',
    company: 'IndiaFinServ Group',
    color: '#c9a84c',
  },
  {
    quote: "We evaluated 5 AI firms before choosing Zuneko. Their understanding of Indian enterprise complexity—legacy systems, regulatory constraints, scale—is unmatched.",
    name: 'Sunit Desai',
    role: 'Managing Director',
    company: 'PuneCore Industries',
    color: '#22c55e',
  },
];

export function SuccessStories() {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [paused, setPaused] = useState(false);

  const goNext = () => {
    setDirection('right');
    setIdx(i => (i + 1) % TESTIMONIALS.length);
  };

  const goPrev = () => {
    setDirection('left');
    setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [paused]);

  const t = TESTIMONIALS[idx];

  return (
    <section id="stories" style={{
      background: 'var(--bg-void)',
      padding: '120px 0',
      position: 'relative',
    }}>
      {/* Radial bloom */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }}>
            SUCCESS STORIES
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px, 5vw, 68px)', color: 'var(--text-primary)', lineHeight: 1.05 }}>
            What Clients Say
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div
          style={{ position: 'relative', overflow: 'hidden' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={idx}
              custom={direction}
              initial={{ opacity: 0, x: direction === 'right' ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'right' ? -60 : 60 }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH }}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '48px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Large quote mark */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '20px',
                fontFamily: 'var(--font-display)',
                fontSize: '80px',
                color: 'var(--accent-primary)',
                opacity: 0.3,
                lineHeight: 1,
                pointerEvents: 'none',
              }}>"</div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', marginTop: '20px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--accent-primary)" style={{ color: 'var(--accent-primary)' }} />
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                color: 'var(--text-primary)',
                lineHeight: 1.6,
                marginBottom: '32px',
              }}>
                {t.quote}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.color}, var(--bg-surface))`,
                  border: '1px solid var(--border-subtle)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: 'var(--bg-void)',
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
          <button
            onClick={goPrev}
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'border-color 0.25s', }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
          >
            <ChevronLeft size={18} />
          </button>

          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > idx ? 'right' : 'left'); setIdx(i); }}
              style={{
                width: i === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '100px',
                background: i === idx ? 'var(--accent-primary)' : 'var(--border-subtle)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                padding: 0,
              }}
            />
          ))}

          <button
            onClick={goNext}
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'border-color 0.25s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}