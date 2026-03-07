import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import ZunekoLogo from '../../assets/Zuneko.svg';

const NAV_LINKS = ['About', 'Services', 'Works', 'Careers', 'Contact'];

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

interface NavLinkProps {
  label: string;
  onClick?: () => void;
}

function NavLink({ label, onClick }: NavLinkProps) {
  return (
    <a
      href={`#${label.toLowerCase()}`}
      onClick={onClick}
      style={{ position: 'relative', display: 'inline-block', textDecoration: 'none' }}
      className="group"
    >
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'var(--text-secondary)',
        transition: 'color 0.25s',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
      >{label}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'var(--accent-primary)',
          transformOrigin: 'center',
        }}
        transition={{ duration: 0.25, ease: EASE_SMOOTH }}
      />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        animate={{
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
          backgroundColor: scrolled ? 'rgba(3,13,7,0.85)' : 'rgba(3,13,7,0)',
          borderBottomColor: scrolled ? 'rgba(0,232,122,0.12)' : 'transparent',
        }}
        transition={{ duration: 0.4, ease: EASE_SMOOTH }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ filter: 'drop-shadow(0 0 16px rgba(0,232,122,0.4))' }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,232,122,0.2)' }}>
              <img src={ZunekoLogo} alt="ZunekoLabs" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>ZUNEKO</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '5px', height: '5px', background: 'var(--accent-primary)', borderRadius: '1px', display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em', color: 'var(--accent-primary)', lineHeight: 1 }}>LABS</span>
              </div>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="hidden lg:flex">
            {NAV_LINKS.map(link => <NavLink key={link} label={link} />)}
          </nav>

          {/* Get Started + Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Get Started Button (Desktop) */}
            <motion.a
              href="#contact"
              whileHover={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--bg-void)',
                boxShadow: '0 0 20px rgba(0,232,122,0.3)',
              }}
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '6px',
                border: '1.5px solid var(--accent-primary)',
                background: 'transparent',
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              className="lg:!flex"
              transition={{ duration: 0.3 }}
            >
              Get Started
              <motion.span
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={13} />
              </motion.span>
            </motion.a>

            {/* Hamburger (Mobile) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '8px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(3,13,7,0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: EASE_SMOOTH }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '36px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '12px 32px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: NAV_LINKS.length * 0.07 + 0.05 }}
              style={{
                marginTop: '24px',
                padding: '14px 40px',
                background: 'var(--accent-primary)',
                color: 'var(--bg-void)',
                borderRadius: '6px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              Get Started
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}