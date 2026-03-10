import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ZunekoLogo from '../../assets/Zuneko.svg';

const NAV_LINKS = ['About', 'Services', 'Work', 'Careers', 'Contact'];
const EASE = [0.16, 1, 0.3, 1] as const;

function NavLink({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <a
      href={`#${label.toLowerCase()}`}
      onClick={onClick}
      style={{ position: 'relative', display: 'inline-block', textDecoration: 'none' }}
    >
      <span
        style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
      >{label}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ position: 'absolute', bottom: '-3px', left: 0, right: 0, height: '1px', background: 'var(--accent-primary)', transformOrigin: 'center', opacity: 0.7 }}
        transition={{ duration: 0.2, ease: EASE }}
      />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        animate={{
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          backgroundColor: scrolled ? 'rgba(0,0,0,0.90)' : 'rgba(0,0,0,0)',
          borderBottomColor: scrolled ? 'rgba(34,197,94,0.08)' : 'transparent',
        }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, borderBottomWidth: '1px', borderBottomStyle: 'solid' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(34,197,94,0.15)', flexShrink: 0 }}>
              <img src={ZunekoLogo} alt="Zuneko Labs" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', letterSpacing: '-0.01em', color: 'var(--text-primary)', lineHeight: 1.1 }}>Zuneko Labs</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '10px', color: 'var(--text-tertiary)', letterSpacing: '0.02em', lineHeight: 1 }}>by Emdee Digitronics</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="hidden lg:flex">
            {NAV_LINKS.map(l => <NavLink key={l} label={l} />)}
          </nav>

          {/* CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="#contact"
              className="lg:!inline-block"
              style={{
                display: 'none',
                padding: '9px 22px',
                borderRadius: '6px',
                border: '1px solid rgba(34,197,94,0.35)',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent-primary)';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.borderColor = 'rgba(34,197,94,0.35)';
              }}
            >
              Get in touch
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden"
              style={{ background: 'none', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '6px', padding: '8px', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(16px)', zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: EASE }}
                style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '28px', color: 'var(--text-secondary)', textDecoration: 'none', padding: '10px 28px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}