import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  Menu, X, ArrowRight, ChevronDown,
  Cpu, BarChart3, Briefcase, Lightbulb,
  GraduationCap, Users, MapPin, Eye, Brain, Globe, Smartphone,
} from 'lucide-react';

import ZunekoLogo from '../../assets/Zuneko.svg';
import { ServicesMegaDropdown } from './dropdown';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Nav data ──────────────────────────────────────────────────── */
const DROPDOWNS: Record<string, { label: string; icon: React.ReactNode; href: string }[]> = {
  Services: [
    { label: 'Strategic Digital Transformation', icon: <BarChart3 size={14} />, href: '/services/strategic-digital-transformation' },
    { label: 'Computer Vision Technology',       icon: <Eye size={14} />,       href: '/services/computer-vision-technology' },
    { label: 'Applied Artificial Intelligence',  icon: <Brain size={14} />,     href: '/services/applied-ai' },
    { label: 'Next-gen Enterprise Tech',         icon: <Cpu size={14} />,       href: '/services/enterprise-technology' },
    { label: 'Artificial Intelligence',          icon: <Cpu size={14} />,       href: '/services/aiml/artificial-intelligence' },
    { label: 'Gen AI',                           icon: <BarChart3 size={14} />, href: '/services/aiml/genai' },
    { label: 'ML Application Development',       icon: <Globe size={14} />,     href: '/services/aiml/ml' },
    { label: 'Agentic AI Development',           icon: <Smartphone size={14} />,href: '/services/aiml/agenticai' },
    { label: 'Retrieval-Augmented Generation',   icon: <Cpu size={14} />,       href: '/services/aiml/rag' },
    { label: 'Natural Language Processing',      icon: <Globe size={14} />,     href: '/services/aiml/nlp' },
    { label: 'Data Analysis & Visualization',    icon: <BarChart3 size={14} />, href: '/services/aiml/data-analysis' },
    { label: 'Custom SaaS',                      icon: <Cpu size={14} />,       href: '/service/customsaaas' },
    { label: 'Core Systems',                     icon: <Globe size={14} />,     href: '/service/coresystem' },
    { label: 'API Integration',                  icon: <Smartphone size={14} />,href: '/service/apiintegration' },
    { label: 'HITL Design',                      icon: <Smartphone size={14} />,href: '/service/hitldesign' },
    { label: 'AI-Native Product Dev',            icon: <Smartphone size={14} />,href: '/service/ainativeproduct' },
  ],
  Works: [
    { label: 'Case Studies', icon: <Briefcase size={14} />, href: '/works/case-studies' },
    { label: 'Our Projects', icon: <Lightbulb size={14} />, href: '/works/projects' },
  ],
  Careers: [
    { label: 'Open Roles',  icon: <Users size={14} />,        href: '#' },
    { label: 'Internships', icon: <GraduationCap size={14} />,href: '#' },
    { label: 'Our Culture', icon: <MapPin size={14} />,        href: '#' },
  ],
};

const NAV_LINKS = ['About', 'Services', 'Works', 'Careers', 'Contact'];

function getHref(label: string) {
  return label === 'Contact' ? '#faq' : `/#${label.toLowerCase()}`;
}

/* ─── CSS injected once — hides desktop nav on mobile ───────────── */
const CSS = `
.nb-desktop-nav { display: flex; }
.nb-cta-btn     { display: inline-block; }
.nb-hamburger   { display: none; }

@media (max-width: 1024px) {
  .nb-desktop-nav { display: none !important; }
  .nb-cta-btn     { display: none !important; }
  .nb-hamburger   { display: flex !important; }
}
`;
function CSSInjector() {
  if (typeof document !== 'undefined' && !document.getElementById('nb-styles')) {
    const el = document.createElement('style');
    el.id = 'nb-styles';
    el.textContent = CSS;
    document.head.appendChild(el);
  }
  return null;
}

/* ─── Desktop dropdown item ─────────────────────────────────────── */
function DropdownItem({ item, delay }: {
  item: { label: string; icon: React.ReactNode; href: string };
  delay: number;
}) {
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
        background: hovered ? 'var(--accent-glow)' : 'transparent',
        transition: 'background 0.2s',
      }}
    >
      <span style={{ color: hovered ? 'var(--accent-primary)' : 'var(--text-secondary)', transition: 'color 0.2s', display: 'flex' }}>
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

/* ─── Desktop nav link ──────────────────────────────────────────── */
function NavLink({ label, scrolled, isHome }: { label: string; scrolled: boolean; isHome: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hasDropdown = label in DROPDOWNS;

  const isWhite     = isHome && !scrolled;
  const baseColor   = isWhite ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary)';
  const activeColor = isWhite ? '#ffffff' : 'var(--text-primary)';

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => { setHovered(true); setDropdownOpen(true); }}
      onMouseLeave={() => { setHovered(false); setDropdownOpen(false); }}
    >
      <a
        href={getHref(label)}
        style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', padding: '8px 0' }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: hovered ? activeColor : baseColor, transition: 'color 0.2s' }}>
          {label}
        </span>
        {hasDropdown && (
          <motion.svg
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke={hovered ? activeColor : baseColor}
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        )}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          style={{ position: 'absolute', bottom: '-3px', left: 0, right: 0, height: '1px', background: isWhite ? '#ffffff' : 'var(--accent-primary)', transformOrigin: 'center', opacity: 0.7, display: 'block' }}
        />
      </a>

      {/* Flat dropdown for Works & Careers */}
      {hasDropdown && label !== 'Services' && (
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: '0',
                minWidth: '240px', background: 'var(--bg-void)',
                border: '1px solid var(--border-subtle)', borderRadius: '10px',
                padding: '8px', zIndex: 1001,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
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

/* ─── Mobile menu ───────────────────────────────────────────────── */
function MobileMenu({ onClose }: { onClose: () => void }) {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [worksExpanded,    setWorksExpanded]    = useState(false);
  const [careersExpanded,  setCareersExpanded]  = useState(false);

  const expandMap: Record<string, [boolean, () => void]> = {
    Services: [servicesExpanded, () => setServicesExpanded(v => !v)],
    Works:    [worksExpanded,    () => setWorksExpanded(v => !v)],
    Careers:  [careersExpanded,  () => setCareersExpanded(v => !v)],
  };

  return (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.32, ease: EASE }}
      style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(320px, 100vw)',
        background: '#ffffff',
        zIndex: 1100,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 40px rgba(0,0,0,0.12)',
        overflowY: 'auto',
      }}
    >
      {/* Header row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 24px',
        borderBottom: '1px solid rgba(26,110,66,0.1)',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '15px', color: '#0d3d22' }}>
          Menu
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: '1px solid rgba(26,110,66,0.18)',
            borderRadius: '6px', padding: '7px', color: '#1a6e42',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Links */}
      <div style={{ flex: 1, padding: '12px 16px' }}>
        {NAV_LINKS.map((link, i) => {
          const hasSub = link in expandMap;
          const [isExpanded, toggle] = hasSub ? expandMap[link] : [false, () => {}];

          return (
            <motion.div
              key={link}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: i * 0.05, ease: EASE }}
            >
              {/* Main link row */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderRadius: '10px',
                overflow: 'hidden',
              }}>
                <a
                  href={hasSub ? undefined : getHref(link)}
                  onClick={hasSub ? (e) => { e.preventDefault(); toggle(); } : onClose}
                  style={{
                    flex: 1,
                    padding: '13px 14px',
                    fontFamily: 'var(--font-body)', fontWeight: 600,
                    fontSize: '16px', color: '#0d3d22',
                    textDecoration: 'none', display: 'block',
                    cursor: 'pointer',
                  }}
                >
                  {link}
                </a>
                {hasSub && (
                  <button
                    onClick={toggle}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '13px 14px', color: '#1a6e42', display: 'flex',
                    }}
                  >
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.22 }}>
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>
                )}
              </div>

              {/* Sub-links */}
              {hasSub && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      style={{ overflow: 'hidden', marginLeft: '8px' }}
                    >
                      <div style={{
                        borderLeft: '2px solid rgba(26,110,66,0.18)',
                        paddingLeft: '12px',
                        paddingBottom: '8px',
                        marginLeft: '6px',
                      }}>
                        {DROPDOWNS[link].map((item, si) => (
                          <motion.a
                            key={item.label}
                            href={item.href}
                            onClick={onClose}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.18, delay: si * 0.03 }}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '9px',
                              padding: '9px 10px', borderRadius: '7px',
                              textDecoration: 'none',
                              color: '#2d6b50',
                              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(26,110,66,0.05)'; e.currentTarget.style.color = '#1a6e42'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2d6b50'; }}
                          >
                            <span style={{ color: '#1a6e42', opacity: 0.7, display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                            {item.label}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Divider */}
              {i < NAV_LINKS.length - 1 && (
                <div style={{ height: '1px', background: 'rgba(26,110,66,0.07)', margin: '2px 8px' }} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* CTA at bottom */}
      <div style={{ padding: '16px 20px 32px', flexShrink: 0 }}>
        <a
          href="#contact"
          onClick={onClose}
          style={{
            display: 'block', textAlign: 'center',
            padding: '13px', borderRadius: '8px',
            background: '#1a6e42', color: '#ffffff',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          Get Started
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Main navbar ───────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,      setScrolled]     = useState(false);
  const [mobileOpen,    setMobileOpen]   = useState(false);
  const [servicesOpen,  setServicesOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const location = useLocation();
  const isHome = location.pathname === '/';

  const openServices  = () => { clearTimeout(megaTimeout.current); setServicesOpen(true); };
  const closeServices = () => { megaTimeout.current = setTimeout(() => setServicesOpen(false), 130); };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const isLight = scrolled || !isHome;

  return (
    <>
      <CSSInjector />

      <motion.header
        animate={{
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          borderBottomColor: scrolled ? 'var(--border-subtle)' : 'transparent',
        }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, borderBottomWidth: '1px', borderBottomStyle: 'solid' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px,4vw,32px)', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: 34, height: 34, borderRadius: '8px', overflow: 'hidden',
              border: isLight ? '1px solid var(--border-subtle)' : '1px solid rgba(255,255,255,0.4)',
              flexShrink: 0, transition: 'border-color 0.3s',
            }}>
              <img src={ZunekoLogo} alt="Zuneko Labs" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isLight ? 'none' : 'brightness(0) invert(1)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', letterSpacing: '-0.01em', color: isLight ? 'var(--text-primary)' : '#ffffff', lineHeight: 1.1, transition: 'color 0.3s' }}>
                Zuneko Labs
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '10px', color: isLight ? 'var(--text-tertiary)' : 'rgba(255,255,255,0.7)', letterSpacing: '0.02em', lineHeight: 1, transition: 'color 0.3s' }}>
                by Emdee Digitronics
              </span>
            </div>
          </a>

          {/* Desktop nav — hidden on mobile via .nb-desktop-nav CSS class */}
          <nav className="nb-desktop-nav" style={{ gap: '36px', alignItems: 'center' }}>
            {NAV_LINKS.map(link =>
              link === 'Services' ? (
                <div key={link} onMouseEnter={openServices} onMouseLeave={closeServices}>
                  <NavLink label={link} scrolled={scrolled} isHome={isHome} />
                </div>
              ) : (
                <NavLink key={link} label={link} scrolled={scrolled} isHome={isHome} />
              )
            )}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Desktop CTA — hidden on mobile */}
            <a
              href="#contact"
              className="nb-cta-btn"
              style={{
                padding: '9px 22px', borderRadius: '6px',
                border: isLight ? '1px solid var(--accent-primary)' : '1px solid #ffffff',
                background: 'transparent',
                color: isLight ? 'var(--accent-primary)' : '#ffffff',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px',
                textDecoration: 'none', transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isLight ? 'var(--accent-primary)' : '#ffffff';
                e.currentTarget.style.color      = isLight ? '#ffffff' : 'var(--accent-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color      = isLight ? 'var(--accent-primary)' : '#ffffff';
              }}
            >
              Get Started
            </a>

            {/* Hamburger — only on mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="nb-hamburger"
              style={{
                background: 'none',
                border: isLight ? '1px solid var(--border-subtle)' : '1px solid rgba(255,255,255,0.3)',
                borderRadius: '6px', padding: '8px',
                color: isLight ? 'var(--text-primary)' : '#ffffff',
                cursor: 'pointer', alignItems: 'center',
                transition: 'all 0.3s',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Desktop mega dropdown */}
        <div
          onMouseEnter={openServices}
          onMouseLeave={closeServices}
          style={{
            position: 'absolute', top: '68px', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1001,
            pointerEvents: servicesOpen ? 'auto' : 'none',
          }}
        >
          <ServicesMegaDropdown visible={servicesOpen} />
        </div>
      </motion.header>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeMobile}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(2px)',
              zIndex: 1099,
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu key="mobile-menu" onClose={closeMobile} />}
      </AnimatePresence>
    </>
  );
}