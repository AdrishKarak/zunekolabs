import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Magnetic from '../ui/Magnetic';

const EASE = [0.16, 1, 0.3, 1] as const;

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  accentColor?: string;
}

export default function CTASection({
  title = "Ready to Transform Your Business?",
  subtitle = "Our engineering team is ready to build your custom AI solution. Let's talk about your project goals.",
  buttonText = "Start Your Project →",
  onButtonClick,
  accentColor = "#00e87a"
}: CTASectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section 
      ref={ref}
      style={{ 
        background: 'var(--bg-void)', 
        padding: 'clamp(80px, 12vw, 160px) 32px', 
        overflow: 'hidden',
        position: 'relative' 
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vw',
        background: `radial-gradient(circle, ${accentColor}08 0%, transparent 70%)`,
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '12px', 
            color: accentColor, 
            letterSpacing: '0.25em', 
            display: 'block', 
            marginBottom: '20px' 
          }}>
            LFG · ZUNEKO LABS
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700, 
            fontSize: 'clamp(36px, 6vw, 76px)', 
            color: 'var(--text-primary)', 
            lineHeight: 1.05, 
            margin: '0 0 24px' 
          }}>
            {title}
          </h2>
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 'clamp(16px, 2vw, 19px)', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.7, 
            maxWidth: '640px', 
            margin: '0 auto 48px' 
          }}>
            {subtitle}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Magnetic>
              <button
                onClick={onButtonClick}
                style={{
                  padding: '18px 48px',
                  borderRadius: '8px',
                  background: accentColor,
                  color: 'var(--bg-void)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '17px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: `0 10px 40px ${accentColor}33`,
                  transition: 'transform 0.25s, box-shadow 0.25s, opacity 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.opacity = '0.9';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 15px 50px ${accentColor}44`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.opacity = '1';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 40px ${accentColor}33`;
                }}
              >
                {buttonText}
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          section { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
