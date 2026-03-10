import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Cpu, Globe, Smartphone, BarChart3, Briefcase, Lightbulb, GraduationCap, Users, MapPin } from 'lucide-react';
import ZunekoLogo from '../../assets/Zuneko.svg';

const EASE = [0.16, 1, 0.3, 1] as const;

const DROPDOWNS: Record<string, { label: string; icon: React.ReactNode; href: string }[]> = {
  Services: [
    { label: 'Artificial Intelligence',           icon: <Cpu size={14} />,        href: '/services/aiml/artificial-intelligence' },
    { label: 'Gen AI',                            icon: <BarChart3 size={14} />,   href: '/services/aiml/genai' },
    { label: 'ML Application Development',        icon: <Globe size={14} />,       href: '/services/aiml/ml' },
    { label: 'Agentic AI Development',            icon: <Smartphone size={14} />,  href: '/services/aiml/agenticai' },
    { label: 'Retrieval-Augmented Generation',    icon: <Cpu size={14} />,        href: '/services/aiml/rag' },
    { label: 'Natural Language Processing',       icon: <Globe size={14} />,       href: '/services/aiml/nlp' },
    { label: 'Data Analysis & Visualization',     icon: <BarChart3 size={14} />,   href: '/services/aiml/data-analysis' },
    { label: 'Custom Software as a Service',      icon: <Cpu size={14} />,         href: '/service/customsaaas' },
    { label: 'Core System Message',               icon: <Globe size={14} />,       href: '/service/coresystem' },
  ],
  Works: [
    { label: 'Case Studies',  icon: <Briefcase size={14} />,    href: '/works/case-studies' },
    { label: 'Our Projects',  icon: <Lightbulb size={14} />,    href: '/works/projects' },
  ],
  Careers: [
    { label: 'Open Roles',   icon: <Users size={14} />,         href: '#' },
    { label: 'Internships',  icon: <GraduationCap size={14} />, href: '#' },
    { label: 'Our Culture',  icon: <MapPin size={14} />,         href: '#' },
  ],
};

const NAV_LINKS = ['About', 'Services', 'Works', 'Careers', 'Contact'];

function getHref(label: string) {
  return label === 'Contact' ? '#faq' : `#${label.toLowerCase()}`;
}

function DropdownItem({ item, delay }: { item: { label: string; icon: React.ReactNode; href: string }; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '9px 12px', borderRadius: '7px', textDecoration: 'none',
        background: hovered ? 'rgba(0,232,122,0.07)' : 'transparent',
        transition: 'background 0.2s', cursor: 'pointer',
      }}
    >
      <span style={{ color: hovered ? 'var(--accent-primary)' : 'var(--accent-secondary)', transition: 'color 0.2s', display: 'flex' }}>
        {item.icon}
      </span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: hovered ? 'var(--accent-primary)' : 'var(--text-secondary)', transition: 'color 0.2s' }}>
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
        style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', padding: '8px 0' }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'color 0.2s' }}>
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

        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          style={{ position: 'absolute', bottom: '-3px', left: 0, right: 0, height: '1px', background: 'var(--accent-primary)', transformOrigin: 'center', opacity: 0.7, display: 'block' }}
        />
      </a>

      {hasDropdown && (
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: '0',
                minWidth: '240px', background: 'var(--bg-deep)',
                border: '1px solid var(--border-subtle)', borderRadius: '10px',
                padding: '8px', zIndex: 1001,
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

  const closeMobile = () => setMobileOpen(false);

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

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="hidden lg:flex">
            {NAV_LINKS.map(link => <NavLink key={link} label={link} />)}
          </nav>

          {/* Right side */}
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
              Get Started
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(16px)',
              zIndex: 999, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '6px', overflowY: 'auto', padding: '80px 24px 40px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: EASE }}
                style={{ width: '100%', maxWidth: '320px', textAlign: 'center' }}
              >
                <a
                  href={getHref(link)}
                  onClick={closeMobile}
                  style={{
                    fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '28px',
                    color: 'var(--text-secondary)', textDecoration: 'none',
                    padding: '10px 28px', display: 'block', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link}
                </a>

                {/* Mobile: show AI link under Services */}
                {link === 'Services' && (
                  <a
                    href="/services/aiml/artificial-intelligence"
                    onClick={closeMobile}
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
                      color: 'var(--accent-primary)', textDecoration: 'none',
                      display: 'block', marginTop: '-4px', opacity: 0.75,
                    }}
                  >
                    → Artificial Intelligence
                  </a>
                )}
              </motion.div>
            ))}

            <motion.a
              href="#contact"
              onClick={closeMobile}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: NAV_LINKS.length * 0.06 + 0.05 }}
              style={{
                marginTop: '24px', padding: '9px 22px',
                background: 'transparent', color: 'var(--text-primary)',
                borderRadius: '6px', border: '1px solid rgba(34,197,94,0.35)',
                fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px',
                textDecoration: 'none', textAlign: 'center',
                transition: 'background 0.2s, color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'var(--accent-primary)';
                el.style.color = '#000000';
                el.style.borderColor = 'var(--accent-primary)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'transparent';
                el.style.color = 'var(--text-primary)';
                el.style.borderColor = 'rgba(34,197,94,0.35)';
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