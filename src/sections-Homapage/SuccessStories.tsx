import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const TESTIMONIALS = [
  {
    quote: "Zuneko Labs transformed our warehouse operations. Inventory errors dropped by 94%.",
    name: 'Rajesh Mehta',
    role: 'VP Operations',
    company: 'RetailForce India',
    color: '#0a4225',
  },
  {
    quote: "Frappe ERP migration was flawless. 10,000 users onboarded, zero downtime.",
    name: 'Priya Sharma',
    role: 'CTO',
    company: 'Nexgen Manufacturing',
    color: '#0a4225',
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
      padding: '60px 0',
      position: 'relative',
      minHeight: '320px',
      overflow: 'hidden',
    }}>
          {/* Parallax background */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(10,66,37,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
            initial={{ y: 0 }}
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH }}
              style={{ textAlign: 'center', marginBottom: '32px' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '10px' }}>
                SUCCESS STORIES
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                What Clients Say
              </h2>
            </motion.div>

            {/* Testimonial card */}
            <div
              style={{ position: 'relative', overflow: 'visible', minHeight: '180px' }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={idx}
                  custom={direction}
                  initial={{ opacity: 0, scale: 0.92, y: direction === 'right' ? 40 : -40 }}
                  animate={{ opacity: 1, scale: 1, y: 0, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13), 0 1.5px 8px 0 rgba(0,0,0,0.10)' }}
                  exit={{ opacity: 0, scale: 0.92, y: direction === 'right' ? -40 : 40 }}
                  transition={{ duration: 0.55, ease: EASE_SMOOTH }}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '28px 24px',
                    position: 'relative',
                    overflow: 'visible',
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13), 0 1.5px 8px 0 rgba(0,0,0,0.10)',
                    minHeight: '140px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {/* Large quote mark */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '18px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '48px',
                      color: 'var(--accent-primary)',
                      opacity: 0.22,
                      lineHeight: 1,
                      pointerEvents: 'none',
                      zIndex: 0,
                    }}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.22 }}
                    transition={{ duration: 0.7, ease: EASE_SMOOTH }}
                  >
                    "
                  </motion.div>

                  {/* Stars */}
                  <motion.div
                    style={{ display: 'flex', gap: '4px', marginBottom: '10px', marginTop: '10px', zIndex: 1 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="var(--accent-primary)" style={{ color: 'var(--accent-primary)' }} />
                    ))}
                  </motion.div>

                  {/* Quote */}
                  <motion.p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(15px, 2vw, 18px)',
                      color: 'var(--text-primary)',
                      lineHeight: 1.5,
                      marginBottom: '10px',
                      textAlign: 'center',
                      zIndex: 1,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: EASE_SMOOTH }}
                  >
                    {t.quote}
                  </motion.p>

                  {/* Author */}
                  <motion.div
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: EASE_SMOOTH }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${t.color}, var(--bg-surface))`,
                      border: '1px solid var(--border-subtle)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '14px',
                      color: 'var(--bg-void)',
                    }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>{t.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-secondary)' }}>{t.role} · {t.company}</div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '18px' }}>
              <button
                onClick={goPrev}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'border-color 0.25s', }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>

              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > idx ? 'right' : 'left'); setIdx(i); }}
                  style={{
                    width: i === idx ? '18px' : '7px',
                    height: '7px',
                    borderRadius: '100px',
                    background: i === idx ? 'var(--accent-primary)' : 'var(--border-subtle)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    padding: 0,
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
              <button
                onClick={goNext}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'border-color 0.25s', }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
    </section>
  );
}