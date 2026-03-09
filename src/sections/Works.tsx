import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Zap, Eye, Brain, Database, Code2, TrendingUp, ArrowUpRight } from 'lucide-react';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    icon: Zap,
    title: 'AI Automation',
    desc: 'End-to-end workflow automation powered by custom AI models and agent systems. Reduce manual overhead by 80%.',
    stat: '80% overhead reduction',
    tag: 'Core Service',
    color: '#00e87a',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    desc: 'Real-time visual intelligence: defect detection, OCR, object tracking, and video analytics at production scale.',
    stat: '99.2% accuracy',
    tag: 'Vision AI',
    color: '#00e87a',
  },
  {
    icon: Brain,
    title: 'LLM Applications',
    desc: 'Custom GPT-powered tools, RAG systems, chatbots, and document intelligence pipelines trained on your data.',
    stat: '12 FTE hrs/day saved',
    tag: 'Language AI',
    color: '#c9a84c',
  },
  {
    icon: Database,
    title: 'Frappe / ERPNext',
    desc: 'Full-cycle ERP implementation, customization, and migration for enterprise-scale operations.',
    stat: '10,000+ users onboarded',
    tag: 'Enterprise',
    color: '#00b85e',
  },
  {
    icon: Code2,
    title: 'Custom Software',
    desc: 'Bespoke Python/React applications engineered for complex enterprise workflows and edge cases.',
    stat: 'Built to scale',
    tag: 'Development',
    color: '#00e87a',
  },
  {
    icon: TrendingUp,
    title: 'Digital Transformation',
    desc: 'Strategic tech consulting to modernize legacy systems and unlock operational efficiency at every layer.',
    stat: '3x faster delivery',
    tag: 'Consulting',
    color: '#c9a84c',
  },
] as const;

type Service = typeof SERVICES[number];

/* ─── SVG patterns ─── */
function CardPattern({ index, color }: { index: number; color: string }) {
  const patterns = [
    <svg key="c" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <line x1="10" y1="10" x2="90" y2="10" stroke={color} strokeWidth="1.5"/>
      <line x1="10" y1="10" x2="10" y2="90" stroke={color} strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="3" fill={color}/>
      <circle cx="90" cy="10" r="3" fill={color}/>
      <circle cx="50" cy="50" r="15" fill="none" stroke={color} strokeWidth="1.5"/>
      <circle cx="50" cy="50" r="5" fill={color} opacity="0.5"/>
    </svg>,
    <svg key="w" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {[0, 20, 40, 60, 80].map((y, i) => (
        <path key={i} d={`M0 ${y} Q25 ${y - 10} 50 ${y} Q75 ${y + 10} 100 ${y}`} fill="none" stroke={color} strokeWidth="1.2"/>
      ))}
    </svg>,
    <svg key="t" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <polygon points="50,10 90,90 10,90" fill="none" stroke={color} strokeWidth="1.5"/>
      <polygon points="50,25 75,75 25,75" fill="none" stroke={color} strokeWidth="1.2"/>
      <circle cx="50" cy="50" r="8" fill="none" stroke={color} strokeWidth="1"/>
    </svg>,
  ];
  return patterns[index % 3];
}

/* ─── Single stacking card ─── */
function StackCard({
  service,
  index,
  total,
  scrollYProgress,
}: {
  service: Service;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  // Card i enters when scroll reaches i/total → (i/total + 0.1)
  const enterAt  = index / total;
  const enterEnd = enterAt + 0.1;

  // Cards already on stack get pushed up by 10px each and scaled down 2% each
  const stackedOffset = -(total - 1 - index) * 10;

  const y       = useTransform(scrollYProgress, [enterAt, enterEnd], ['120px', `${stackedOffset}px`]);
  const opacity = useTransform(scrollYProgress, [enterAt, Math.min(enterAt + 0.06, 1)], [0, 1]);
  const scale   = useTransform(scrollYProgress, [enterAt, 1], [0.96, 1 - (total - 1 - index) * 0.02]);

  return (
    <motion.div
      style={{
        y, opacity, scale,
        position: 'absolute',
        top: 0, left: 0, right: 0,
        zIndex: index + 1,
        originX: '50%',
        originY: '0%',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'var(--bg-surface)',
        border: `1px solid ${hovered ? service.color + '55' : 'rgba(0,232,122,0.1)'}`,
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${service.color}18`
          : '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'border-color 0.35s, box-shadow 0.35s',
        cursor: 'pointer',
        position: 'relative',
      }}>

        {/* Shimmer */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ x: '-100%', opacity: 0.6 }}
              animate={{ x: '200%', opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                position: 'absolute', top: 0, bottom: 0, width: '60%',
                background: `linear-gradient(90deg, transparent, ${service.color}18, transparent)`,
                pointerEvents: 'none', zIndex: 5, transform: 'skewX(-15deg)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Pattern */}
        <motion.div
          animate={{ opacity: hovered ? 0.08 : 0.03, rotate: hovered ? 10 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute', top: '-20px', right: '-20px',
            width: '130px', height: '130px', pointerEvents: 'none',
          }}
        >
          <CardPattern index={index} color={service.color} />
        </motion.div>

        {/* Glow dot */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: '18px', right: '18px',
            width: '8px', height: '8px', borderRadius: '50%',
            background: service.color, boxShadow: `0 0 14px ${service.color}`, zIndex: 6,
          }}
        />

        {/* Content row */}
        <div style={{
          padding: '28px 32px', position: 'relative', zIndex: 2,
          display: 'flex', gap: '28px', alignItems: 'flex-start',
        }}>
          {/* Icon + number */}
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <motion.div
              animate={{
                background: hovered ? `${service.color}22` : 'rgba(0,232,122,0.08)',
                boxShadow: hovered ? `0 0 20px ${service.color}33` : 'none',
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '54px', height: '54px', borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <motion.div
                animate={{ color: hovered ? service.color : 'var(--accent-primary)' }}
                transition={{ duration: 0.3 }}
              >
                <Icon size={26} />
              </motion.div>
            </motion.div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: 'var(--text-tertiary)', letterSpacing: '0.12em',
            }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)', fontWeight: 700,
                fontSize: '20px', color: 'var(--text-primary)', margin: 0,
              }}>
                {service.title}
              </h3>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: service.color, letterSpacing: '0.1em',
                border: `1px solid ${service.color}33`,
                background: `${service.color}0d`,
                padding: '3px 10px', borderRadius: '100px',
              }}>
                {service.tag}
              </div>
            </div>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '14px',
              color: 'var(--text-secondary)', lineHeight: 1.75,
              marginBottom: '16px', maxWidth: '560px',
            }}>
              {service.desc}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <motion.div
                animate={{ opacity: hovered ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontFamily: 'var(--font-mono)', fontSize: '11px', color: service.color,
                }}
              >
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: service.color, boxShadow: `0 0 6px ${service.color}`, flexShrink: 0,
                }} />
                {service.stat}
              </motion.div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <motion.span
                  animate={{ color: hovered ? service.color : 'var(--text-tertiary)' }}
                  transition={{ duration: 0.25 }}
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px' }}
                >
                  Learn more
                </motion.span>
                <motion.div
                  animate={{
                    x: hovered ? 3 : 0, y: hovered ? -3 : 0,
                    color: hovered ? service.color : 'var(--text-tertiary)',
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <ArrowUpRight size={16} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Export ─── */
export function Works() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const total = SERVICES.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Card height (row layout ~160px) + stacking offsets
  const CARD_H = 160;

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: 'var(--bg-deep)',
        // Enough scroll room: header viewport + one viewport per card
        height: `${(total + 1.5) * 100}vh`,
        position: 'relative',
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* ── Header (fixed at top of sticky panel) ── */}
        <div style={{
          maxWidth: '900px', margin: '0 auto', padding: '80px 32px 40px', width: '100%',
        }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '24px',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                color: 'var(--accent-primary)', letterSpacing: '0.2em',
                display: 'block', marginBottom: '10px',
              }}>
                WHAT WE DO
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 52px)',
                color: 'var(--text-primary)', lineHeight: 1.1, margin: 0,
              }}>
                Our Core Capabilities
              </h2>
            </motion.div>

            {/* Hex SVG — kept */}
            <motion.svg
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              width="110" height="110" viewBox="0 0 120 120"
              style={{ opacity: 0.06, flexShrink: 0 }}
            >
              {[0, 1, 2].map(row =>
                [0, 1, 2].map(col => (
                  <polygon
                    key={`${row}-${col}`}
                    points={`${20+col*40},${10+row*34} ${40+col*40},${10+row*34} ${50+col*40},${27+row*34} ${40+col*40},${44+row*34} ${20+col*40},${44+row*34} ${10+col*40},${27+row*34}`}
                    fill="none" stroke="#00e87a" strokeWidth="1"
                  />
                ))
              )}
            </motion.svg>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: 'var(--text-tertiary)', letterSpacing: '0.1em',
            }}>
              {total} SERVICES
            </span>
            <div style={{
              flex: 1, maxWidth: '200px', height: '2px',
              background: 'rgba(0,232,122,0.1)', borderRadius: '2px', overflow: 'hidden',
            }}>
              <motion.div style={{
                height: '100%',
                background: 'var(--accent-primary)',
                scaleX: scrollYProgress,
                transformOrigin: 'left',
                boxShadow: '0 0 8px var(--accent-primary)',
              }} />
            </div>
          </div>
        </div>

        {/* ── Card stack area — sits below header, vertically centered in remaining space ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '40px',
        }}>
          <div style={{
            width: '100%',
            maxWidth: '860px',
            padding: '0 32px',
            position: 'relative',
            height: `${CARD_H}px`,
          }}>
            {SERVICES.map((service, i) => (
              <StackCard
                key={service.title}
                service={service}
                index={i}
                total={total}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}