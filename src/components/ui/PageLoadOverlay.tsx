import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ZunekoLogo from '../../assets/Zuneko.svg';

interface PageLoadOverlayProps {
  onComplete?: () => void;
}

export default function PageLoadOverlay({ onComplete }: PageLoadOverlayProps) {
  const [phase, setPhase] = useState<'logo' | 'exit' | 'done'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 900);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="overlay"
          initial={{ y: 0 }}
          animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#030d07',
            zIndex: 99998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={phase === 'exit'
              ? { opacity: 0, scale: 1.05 }
              : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(0,232,122,0.3)',
              border: '1px solid rgba(0,232,122,0.3)',
            }}>
              <img src={ZunekoLogo} alt="ZunekoLabs" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '22px',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}>ZUNEKO</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: 'var(--accent-primary)',
              }}>LABS</span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '120px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)',
                transformOrigin: 'center',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
