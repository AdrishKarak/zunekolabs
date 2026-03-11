// src/components/layout/Dropdown.tsx
// Drop this file next to Navbar.tsx and import ServicesMegaDropdown from it.
// Usage in Navbar: see bottom of this file for integration notes.

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Inline SVG icons (no extra deps) ───────────────────────────── */
const I = {
  Brain: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3"/>
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0v0a2.5 2.5 0 0 1 2.5 2.5v.5"/>
      <path d="M17 5a2.5 2.5 0 0 1 0 5"/><path d="M7 5a2.5 2.5 0 0 0 0 5"/>
      <path d="M12 11v10M8 16l4 5 4-5"/>
    </svg>
  ),
  Sparkle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.8 5.4H19l-4.6 3.4 1.7 5.3L12 14l-4.1 3.1 1.7-5.3L5 8.4h5.2z"/>
    </svg>
  ),
  Bot: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <circle cx="12" cy="5" r="2"/><path d="M12 7v4"/>
      <path d="M8 16h.01M16 16h.01"/>
    </svg>
  ),
  Network: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
      <path d="M12 7v4l-5.5 6M12 11l5.5 6"/>
    </svg>
  ),
  Database: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
    </svg>
  ),
  Chat: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Eye: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Camera: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Scan: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>
      <rect x="7" y="7" width="10" height="10" rx="1"/>
    </svg>
  ),
  Cpu: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  Layers: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Package: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4L7.5 4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Globe: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Plug: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M15 3l6 6-3 3-6-6zM9 21l-6-6 3-3 6 6z"/>
    </svg>
  ),
  Users: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Code: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  BarChart: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  Shield: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Briefcase: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  ),
};

/* ─── Data ───────────────────────────────────────────────────────── */
const SERVICE_SECTIONS = [
  {
    id: 'aiml',
    label: 'AI & ML',
    icon: <I.Brain />,
    desc: 'Intelligent systems that learn and scale',
    items: [
      { label: 'Artificial Intelligence',        icon: <I.Brain />,    href: '/services/aiml/artificial-intelligence', desc: 'End-to-end AI for enterprise' },
      { label: 'Gen AI',                         icon: <I.Sparkle />,  href: '/services/aiml/genai',                   desc: 'Generative AI for creative workflows' },
      { label: 'Agentic AI Development',         icon: <I.Bot />,      href: '/services/aiml/agenticai',               desc: 'Autonomous agents that act & decide' },
      { label: 'ML Application Development',     icon: <I.Network />,  href: '/services/aiml/ml',                      desc: 'Production-grade ML pipelines' },
      { label: 'Retrieval-Augmented Generation', icon: <I.Database />, href: '/services/aiml/rag',                     desc: 'LLMs grounded in your private data' },
      { label: 'Natural Language Processing',    icon: <I.Chat />,     href: '/services/aiml/nlp',                     desc: 'Advanced NLP for enterprise text' },
    ],
  },
  {
    id: 'vision',
    label: 'Computer Vision',
    icon: <I.Eye />,
    desc: 'See and understand the world with AI',
    items: [
      { label: 'Computer Vision Technology', icon: <I.Eye />,    href: '/services/computer-vision-technology', desc: 'Object detection, classification & more' },
      { label: 'Image & Video Analysis',     icon: <I.Camera />, href: '/services/computer-vision-technology', desc: 'Real-time visual intelligence pipelines' },
      { label: 'Document Intelligence',      icon: <I.Scan />,   href: '/services/computer-vision-technology', desc: 'OCR, extraction & form understanding' },
    ],
  },
  {
    id: 'enterprise',
    label: 'Enterprise Tech',
    icon: <I.Cpu />,
    desc: 'Backbone systems built to scale',
    items: [
      { label: 'Strategic Digital Transformation', icon: <I.Layers />,  href: '/services/strategic-digital-transformation', desc: 'End-to-end modernisation strategy' },
      { label: 'Next-gen Enterprise Tech',         icon: <I.Cpu />,     href: '/services/enterprise-technology',            desc: 'Platforms built for the long game' },
      { label: 'Frappe / ERPNext Solutions',       icon: <I.Package />, href: '/services/enterprise-technology',            desc: 'Open-source ERP for your ops' },
      { label: 'Custom SaaS Development',          icon: <I.Globe />,   href: '/service/customsaaas',                       desc: 'Scalable multi-tenant SaaS products' },
      { label: 'Core System Messaging',            icon: <I.Zap />,     href: '/service/coresystem',                        desc: 'Reliable event-driven architecture' },
    ],
  },
  {
    id: 'integration',
    label: 'Integration & APIs',
    icon: <I.Plug />,
    desc: 'Connect every system seamlessly',
    items: [
      { label: 'API Integration',        icon: <I.Plug />,  href: '/service/apiintegration',  desc: 'REST, GraphQL & webhook orchestration' },
      { label: 'HITL Design',            icon: <I.Users />, href: '/service/hitldesign',       desc: 'Human-in-the-loop workflow design' },
      { label: 'AI-Native Product Dev',  icon: <I.Code />,  href: '/service/ainativeproduct',  desc: 'Products built with AI at the core' },
    ],
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    icon: <I.BarChart />,
    desc: 'Turn raw data into decisions',
    items: [
      { label: 'Data Analysis & Visualisation', icon: <I.BarChart />, href: '/services/aiml/data-analysis', desc: 'Dashboards, BI tools & insight layers' },
    ],
  },
];

const ENGAGEMENT_MODELS = [
  { label: 'Staff Augmentation',     desc: 'On-demand talent: Dedicated, Hourly, or Flexible.', icon: <I.Users /> },
  { label: 'Project-Based Delivery', desc: 'End-to-end ownership with full-cycle delivery.',     icon: <I.Briefcase /> },
  { label: 'Retainer & Advisory',    desc: 'Ongoing strategic guidance and tech leadership.',    icon: <I.Shield /> },
];

/* ─── Single service card ────────────────────────────────────────── */
function ServiceCard({ item }: { item: { label: string; icon: React.ReactNode; href: string; desc: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '10px',
        padding: '10px 12px', borderRadius: '8px', textDecoration: 'none',
        background: hovered ? 'rgba(10,60,35,0.05)' : 'transparent',
        border: `1px solid ${hovered ? 'rgba(10,60,35,0.13)' : 'rgba(10,60,35,0.06)'}`,
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      <span style={{
        color: hovered ? '#1a6e42' : '#5a9070',
        transition: 'color 0.15s', flexShrink: 0, marginTop: '1px', display: 'flex',
      }}>
        {item.icon}
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
          color: hovered ? '#0d3d22' : '#2a5438',
          transition: 'color 0.15s',
        }}>
          {item.label}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '11px',
          color: '#7aaa8a', marginTop: '2px', lineHeight: 1.4,
        }}>
          {item.desc}
        </div>
      </div>
    </a>
  );
}

/* ─── Main export ────────────────────────────────────────────────── */
export function ServicesMegaDropdown({ visible }: { visible: boolean }) {
  const [activeId, setActiveId] = useState(SERVICE_SECTIONS[0].id);
  const active = SERVICE_SECTIONS.find(s => s.id === activeId)!;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: EASE }}
          style={{
            /* positioned by the wrapper div in Navbar — no position/top/left here */
            width: '1040px',
            background: '#ffffff',
            border: '1px solid rgba(10,60,35,0.1)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.11), 0 4px 16px rgba(0,0,0,0.06)',
            display: 'flex',
          }}
        >

          {/* ── LEFT SIDEBAR ── */}
          <div style={{
            width: '200px', flexShrink: 0,
            background: '#f4faf7',
            padding: '20px 10px',
            borderRight: '1px solid rgba(10,60,35,0.07)',
            display: 'flex', flexDirection: 'column', gap: '2px',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em',
              color: '#3d7a55', opacity: 0.55, marginBottom: '10px', paddingLeft: '10px',
            }}>
              OUR SERVICES
            </p>

            {SERVICE_SECTIONS.map(s => {
              const active = activeId === s.id;
              return (
                <button
                  key={s.id}
                  onMouseEnter={() => setActiveId(s.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '9px 10px', borderRadius: '7px',
                    border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                    background: active ? 'rgba(10,60,35,0.07)' : 'transparent',
                    borderLeft: active ? '2px solid #1a6e42' : '2px solid transparent',
                    transition: 'background 0.15s',
                  }}
                >
                  <span style={{ color: active ? '#1a6e42' : '#7aaa8a', display: 'flex', flexShrink: 0, transition: 'color 0.15s' }}>
                    {s.icon}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                      color: active ? '#0d3d22' : '#3d6b50',
                      transition: 'color 0.15s', whiteSpace: 'nowrap',
                    }}>
                      {s.label}
                    </div>
                    {active && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          fontFamily: 'var(--font-body)', fontSize: '10px',
                          color: '#7aaa8a', marginTop: '1px',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}
                      >
                        {s.desc}
                      </motion.div>
                    )}
                  </div>
                  {active && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                      style={{ marginLeft: 'auto', color: '#1a6e42', display: 'flex', flexShrink: 0 }}
                    >
                      <ArrowRight size={11} />
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── MIDDLE GRID — fixed width, zero scroll, cells shrink to fit ── */}
          <div style={{ width: '620px', flexShrink: 0, padding: '20px 18px', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.16, ease: EASE }}
              >
                {/* Section header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span style={{ color: '#1a6e42', display: 'flex' }}>{active.icon}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.18em', color: '#1a6e42',
                  }}>
                    {active.label.toUpperCase()}
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(10,80,45,0.12), transparent)' }} />
                </div>

                {/* 3-column grid — minmax(0,1fr) forces cells to shrink, never overflow */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '6px',
                }}>
                  {active.items.map(item => (
                    <ServiceCard key={item.label} item={item} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Engagement models ── */}
          <div style={{
            width: '220px', flexShrink: 0,
            background: '#f4faf7',
            padding: '20px 14px',
            borderLeft: '1px solid rgba(10,60,35,0.07)',
            display: 'flex', flexDirection: 'column',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em',
              color: '#3d7a55', opacity: 0.55, marginBottom: '6px',
            }}>
              ENGAGEMENT MODELS
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '11px',
              color: '#6a9a7a', lineHeight: 1.5, marginBottom: '14px',
            }}>
              Flexible partnerships. Predictable outcomes.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ENGAGEMENT_MODELS.map(m => (
                <div
                  key={m.label}
                  style={{
                    display: 'flex', gap: '10px', alignItems: 'flex-start',
                    padding: '10px 11px', borderRadius: '8px',
                    background: '#ffffff', border: '1px solid rgba(10,60,35,0.09)',
                  }}
                >
                  <span style={{ color: '#1a6e42', flexShrink: 0, marginTop: '1px', display: 'flex' }}>{m.icon}</span>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
                      color: '#0d3d22', marginBottom: '3px',
                    }}>
                      {m.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: '11px',
                      color: '#6a9a7a', lineHeight: 1.45,
                    }}>
                      {m.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              style={{
                marginTop: 'auto', paddingTop: '16px',
                display: 'flex', alignItems: 'center', gap: '5px',
                fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700,
                color: '#1a6e42', textDecoration: 'none', transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Start a conversation <ArrowRight size={12} />
            </a>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

/*
 * ─── HOW TO INTEGRATE INTO Navbar.tsx ─────────────────────────────
 *
 * 1. Add import at top of Navbar.tsx:
 *      import { ServicesMegaDropdown } from './Dropdown';
 *
 * 2. Add state + ref inside Navbar():
 *      const [servicesOpen, setServicesOpen] = useState(false);
 *      const megaTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
 *
 * 3. Add helpers inside Navbar():
 *      const openServices  = () => { clearTimeout(megaTimeout.current); setServicesOpen(true); };
 *      const closeServices = () => { megaTimeout.current = setTimeout(() => setServicesOpen(false), 130); };
 *
 * 4. On the "Services" NavLink wrapper, add:
 *      onMouseEnter={openServices} onMouseLeave={closeServices}
 *    (wrap just that NavLink in a div with those handlers)
 *
 * 5. Inside <motion.header>, after the inner content div, add:
 *
 *      <div
 *        onMouseEnter={openServices}
 *        onMouseLeave={closeServices}
 *        style={{
 *          position: 'absolute',
 *          top: '68px',           // height of navbar
 *          left: '50%',
 *          transform: 'translateX(-50%)',
 *          zIndex: 1001,
 *          pointerEvents: servicesOpen ? 'auto' : 'none',
 *        }}
 *      >
 *        <ServicesMegaDropdown visible={servicesOpen} />
 *      </div>
 *
 * That's it. The Navbar UI is 100% unchanged.
 * ──────────────────────────────────────────────────────────────────
 */