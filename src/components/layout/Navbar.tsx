import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLocation } from 'react-router-dom';


import { Menu, X, ArrowRight, Cpu, BarChart3, Briefcase, Lightbulb, GraduationCap, Users, MapPin, Eye, Brain, Globe, Smartphone } from 'lucide-react';

import ZunekoLogo from '../../assets/Zuneko.svg';

const EASE = [0.16, 1, 0.3, 1] as const;

const DROPDOWNS: Record<string, { label: string; icon: React.ReactNode; href: string }[]> = {
  Services: [
    { label: 'Strategic Digital Transformation', icon: <BarChart3 size={14} />,   href: '/services/strategic-digital-transformation' },
    { label: 'Computer Vision Technology',        icon: <Eye size={14} />,        href: '/services/computer-vision-technology' },
    { label: 'Applied Artificial Intelligence',   icon: <Brain size={14} />,     href: '/services/applied-ai' },
    { label: 'Next-gen Enterprise Tech',          icon: <Cpu size={14} />,        href: '/services/enterprise-technology' },
     { label: 'Artificial Intelligence',           icon: <Cpu size={14} />,        href: '/services/aiml/artificial-intelligence' },
    { label: 'Gen AI',                            icon: <BarChart3 size={14} />,   href: '/services/aiml/genai' },
    { label: 'ML Application Development',        icon: <Globe size={14} />,       href: '/services/aiml/ml' },
    { label: 'Agentic AI Development',            icon: <Smartphone size={14} />,  href: '/services/aiml/agenticai' },
    { label: 'Retrieval-Augmented Generation',    icon: <Cpu size={14} />,        href: '/services/aiml/rag' },
    { label: 'Natural Language Processing',       icon: <Globe size={14} />,       href: '/services/aiml/nlp' },
    { label: 'Data Analysis & Visualization',     icon: <BarChart3 size={14} />,   href: '/services/aiml/data-analysis' },
    { label: 'Custom Software as a Service',      icon: <Cpu size={14} />,         href: '/service/customsaaas' },
    { label: 'Core System Message',               icon: <Globe size={14} />,       href: '/service/coresystem' },
    { label: 'API Integration',             icon: <Smartphone size={14} />,  href: '/service/apiintegration' },
    { label: 'HITL Design',             icon: <Smartphone size={14} />,  href: '/service/hitldesign' },
    { label: 'AI-Native Product Development',             icon: <Smartphone size={14} />,  href: '/service/ainativeproduct' },
    // ... existing sub-services or categorized ones can follow if needed 
    // but for now let's focus on these 4 as major ones
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
  return label === 'Contact' ? '#faq' : `/#${label.toLowerCase()}`;
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
        background: hovered ? 'var(--accent-glow)' : 'transparent',
        transition: 'background 0.2s', cursor: 'pointer',
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

function NavLink({ label, scrolled, isHome }: { label: string; scrolled: boolean; isHome: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hasDropdown = label in DROPDOWNS;
  const ref = useRef<HTMLDivElement>(null);

  const isWhite = isHome && !scrolled;
  const baseColor = isWhite ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary)';
  const activeColor = isWhite ? '#ffffff' : 'var(--text-primary)';

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
        <span style={{ 
          fontFamily: 'var(--font-body)', 
          fontSize: '14px', 
          fontWeight: 500, 
          color: hovered ? activeColor : baseColor, 
          transition: 'color 0.2s' 
        }}>
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
          style={{ 
            position: 'absolute', 
            bottom: '-3px', 
            left: 0, 
            right: 0, 
            height: '1px', 
            background: isWhite ? '#ffffff' : 'var(--accent-primary)', 
            transformOrigin: 'center', 
            opacity: 0.7, 
            display: 'block' 
          }}
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
                minWidth: '240px', background: 'var(--bg-void)',
                border: '1px solid var(--border-subtle)', borderRadius: '10px',
                padding: '8px', zIndex: 1001,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(10,66,37,0.03)',
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
  const location = useLocation();
  const isHome = location.pathname === '/';

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
          backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          borderBottomColor: scrolled ? 'var(--border-subtle)' : 'transparent',
        }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, borderBottomWidth: '1px', borderBottomStyle: 'solid' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ 
              width: '34px', 
              height: '34px', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              border: (scrolled || !isHome) ? '1px solid var(--border-subtle)' : '1px solid rgba(255,255,255,0.4)', 
              flexShrink: 0,
              transition: 'border-color 0.3s'
            }}>
              <img src={ZunekoLogo} alt="Zuneko Labs" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: (scrolled || !isHome) ? 'none' : 'brightness(0) invert(1)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span style={{ 
                fontFamily: 'var(--font-body)', 
                fontWeight: 600, 
                fontSize: '15px', 
                letterSpacing: '-0.01em', 
                color: (scrolled || !isHome) ? 'var(--text-primary)' : '#ffffff', 
                lineHeight: 1.1,
                transition: 'color 0.3s'
              }}>Zuneko Labs</span>
              <span style={{ 
                fontFamily: 'var(--font-body)', 
                fontWeight: 400, 
                fontSize: '10px', 
                color: (scrolled || !isHome) ? 'var(--text-tertiary)' : 'rgba(255,255,255,0.8)', 
                letterSpacing: '0.02em', 
                lineHeight: 1,
                transition: 'color 0.3s'
              }}>by Emdee Digitronics</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="hidden lg:flex">
            {NAV_LINKS.map(link => <NavLink key={link} label={link} scrolled={scrolled} isHome={isHome} />)}
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
                border: (scrolled || !isHome) ? '1px solid var(--accent-primary)' : '1px solid #ffffff',
                background: 'transparent',
                color: (scrolled || !isHome) ? 'var(--accent-primary)' : '#ffffff',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = (scrolled || !isHome) ? 'var(--accent-primary)' : '#ffffff';
                e.currentTarget.style.color = (scrolled || !isHome) ? '#ffffff' : 'var(--accent-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = (scrolled || !isHome) ? 'var(--accent-primary)' : '#ffffff';
              }}
            >
              Get Started
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden"
              style={{ 
                background: 'none', 
                border: (scrolled || !isHome) ? '1px solid var(--border-subtle)' : '1px solid rgba(255,255,255,0.3)', 
                borderRadius: '6px', 
                padding: '8px', 
                color: (scrolled || !isHome) ? 'var(--text-primary)' : '#ffffff', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center',
                transition: 'all 0.3s'
              }}
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
              background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)',
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
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '28px',
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
                      fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
                      color: 'var(--accent-primary)', textDecoration: 'none',
                      display: 'block', marginTop: '-4px', opacity: 0.85,
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
                marginTop: '24px', padding: '12px 32px',
                background: 'var(--accent-primary)', color: '#ffffff',
                borderRadius: '6px', 
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px',
                textDecoration: 'none', textAlign: 'center',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1';
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