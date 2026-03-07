import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Cpu, Globe, Smartphone, BarChart3, Briefcase, Lightbulb, GraduationCap, Users, MapPin } from 'lucide-react';
import ZunekoLogo from '../../assets/Zuneko.svg';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const DROPDOWNS: Record<string, { label: string; icon: React.ReactNode }[]> = {
  Services: [
    { label: 'AI Automation',   icon: <Cpu size={14} /> },
    { label: 'ERP Solutions',   icon: <BarChart3 size={14} /> },
    { label: 'Web Development', icon: <Globe size={14} /> },
    { label: 'App Development', icon: <Smartphone size={14} /> },
  ],
  Works: [
    { label: 'Case Studies',    icon: <Briefcase size={14} /> },
    { label: 'Our Projects',    icon: <Lightbulb size={14} /> },
  ],
  Careers: [
    { label: 'Open Roles',      icon: <Users size={14} /> },
    { label: 'Internships',     icon: <GraduationCap size={14} /> },
    { label: 'Our Culture',     icon: <MapPin size={14} /> },
  ],
};

const NAV_LINKS = ['About', 'Services', 'Works', 'Careers', 'Contact'];

function getHref(label: string) {
  return label === 'Contact' ? '#faq' : `#${label.toLowerCase()}`;
}

// ── Desktop NavLink with hover underline + dropdown ──────────────────────────
function NavLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hasDropdown = label in DROPDOWNS;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => { setHovered(true); setDropdownOpen(true); }}
      onMouseLeave={() => { setHovered(false); setDropdownOpen(false); }}
    >
      <a
        href={getHref(label)}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          textDecoration: 'none',
          padding: '8px 0',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
          transition: 'color 0.25s',
        }}>
          {label}
        </span>

        {hasDropdown && (
          <motion.svg
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke={hovered ? 'var(--text-primary)' : 'var(--text-secondary)'}
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        )}

        {/* Underline */}
        <motion.span
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.25, ease: EASE_SMOOTH }}
          style={{
            position: 'absolute',
            bottom: '4px',
            left: 0,
            right: 0,
            height: '1.5px',
            background: 'var(--accent-primary)',
            transformOrigin: 'center',
            display: 'block',
          }}
        />
      </a>

      {/* Dropdown panel */}
      {hasDropdown && (
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE_SMOOTH }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: '0',
                minWidth: '200px',
                background: 'var(--bg-deep)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '8px',
                zIndex: 1001,
                boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,232,122,0.06)',
              }}
            >
              {DROPDOWNS[label].map((item, i) => (
                <DropdownItem key={item.label} item={item} delay={i * 0.04} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// ── Dropdown item ─────────────────────────────────────────────────────────────
function DropdownItem({ item, delay }: { item: { label: string; icon: React.ReactNode }; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 12px',
        borderRadius: '7px',
        textDecoration: 'none',
        background: hovered ? 'rgba(0,232,122,0.07)' : 'transparent',
        transition: 'background 0.2s',
        cursor: 'pointer',
      }}
    >
      <span style={{ color: hovered ? 'var(--accent-primary)' : 'var(--accent-secondary)', transition: 'color 0.2s', display: 'flex' }}>
        {item.icon}
      </span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: hovered ? 'var(--accent-primary)' : 'var(--text-secondary)', transition: 'color 0.2s', fontWeight: 500 }}>
        {item.label}
      </span>
      {hovered && (
        <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} style={{ marginLeft: 'auto', color: 'var(--accent-primary)', display: 'flex' }}>
          <ArrowRight size={12} />
        </motion.span>
      )}
    </motion.a>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  return (
    <>
      <motion.header
        animate={{
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
          backgroundColor: scrolled ? 'rgba(3,13,7,0.85)' : 'rgba(3,13,7,0)',
          borderBottomColor: scrolled ? 'rgba(0,232,122,0.12)' : 'transparent',
        }}
        transition={{ duration: 0.4, ease: EASE_SMOOTH }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, borderBottomWidth: '1px', borderBottomStyle: 'solid' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>ZUNEKO</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '5px', height: '5px', background: 'var(--accent-primary)', borderRadius: '1px', display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em', color: 'var(--accent-primary)', lineHeight: 1 }}>LABS</span>
              </div>
            </div>
          </motion.a>

          {/* Desktop Nav — hidden on mobile */}
          <nav className="hidden lg:flex" style={{ gap: '32px', alignItems: 'center' }}>
            {NAV_LINKS.map(link => <NavLink key={link} label={link} />)}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

            {/* Get Started — desktop only */}
            <motion.a
              href="#contact"
              whileHover={{ backgroundColor: 'var(--accent-primary)', color: 'var(--bg-void)', boxShadow: '0 0 20px rgba(0,232,122,0.3)' }}
              className="hidden lg:flex"
              style={{
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
                alignItems: 'center',
              }}
              transition={{ duration: 0.3 }}
            >
              Get Started
              <motion.span whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                <ArrowRight size={13} />
              </motion.span>
            </motion.a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex lg:hidden"
              style={{
                background: 'none',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '8px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: EASE_SMOOTH }}
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
              gap: '4px',
              overflowY: 'auto',
              padding: '80px 24px 40px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: EASE_SMOOTH }}
                style={{ width: '100%', maxWidth: '320px', textAlign: 'center' }}
              >
                <a
                  href={getHref(link)}
                  onClick={closeMobile}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '32px',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '10px 0',
                    display: 'block',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link}
                </a>
              </motion.div>
            ))}

            {/* Get Started CTA */}
            <motion.a
              href="#contact"
              onClick={closeMobile}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: NAV_LINKS.length * 0.06 + 0.05 }}
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
                textAlign: 'center',
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