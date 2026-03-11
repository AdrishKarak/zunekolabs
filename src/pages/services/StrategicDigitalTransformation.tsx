import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Workflow, Users, Laptop, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    title: 'Data Engineering for AI Readiness',
    icon: Database,
    desc: 'Digitizing enterprise records and ensuring clean, secure, high-fidelity data by architecting data pipelines/lakes before automation to ensure AI-readiness and insight accuracy.',
    points: ['ETL Pipeline Development', 'Data Governance & Security', 'Legacy Data Migration', 'Cloud Data Architecture'],
    color: 'var(--accent-primary)',
  },
  {
    title: 'Operational Re-architecture',
    icon: Workflow,
    desc: 'Strategic auditing and redesigning fragmented, manual workflows into optimised & structured digital systems before automation or digital implementations to eliminate tech debt.',
    points: ['Business Process Modeling', 'Manual task elimination', 'System Integration', 'Tech Debt Audit'],
    color: '#0e6336',
  },
  {
    title: 'Embedded Technology Teams',
    icon: Users,
    desc: 'Provision of managed, high-performance technical teams integrated into clients\' organisation to augment internal product development, maintenance and scaling.',
    points: ['Senior Engineering Talent', 'Cross-functional Squads', 'Agile Delivery Management', 'Knowledge Transfer'],
    color: 'var(--accent-primary)',
  },
  {
    title: 'Executive Technology Enablement',
    icon: BarChart3,
    desc: 'AI copilots, strategic real-time dashboards and automated reporting systems for founders, promoters, directors and C-suite leaders to enhance visualisation, control and decision velocity at the highest level of the organisation.',
    points: ['Executive Dashboards', 'AI Copilot Setup', 'Real-time Reporting', 'Decision Intelligence'],
    color: '#0e6336',
  },
  {
    title: 'Custom Frappe-framework Dev',
    icon: Laptop,
    desc: 'Tailored ERP, AI and business systems, custom built on open source framework Frappe (no licensing cost & intuitive UI/UX - unlike SAP) to solve niche challenges and align with unique business models, within secure, auto-scaling cloud foundations and DevOps pipelines compliant with global standards.',
    points: ['Custom ERPNext Modules', 'Headless Frappe Apps', 'Scalable Cloud Hosting', 'DevOps & CI/CD'],
    color: 'var(--accent-primary)',
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[number], index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '24px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100%',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--accent-primary)';
        el.style.transform = 'translateY(-8px)';
        el.style.boxShadow = '0 20px 40px rgba(10, 66, 37, 0.05)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--border-subtle)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '16px',
        background: 'var(--accent-dim)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-primary)',
      }}>
        <Icon size={28} />
      </div>
      
      <div>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '12px',
        }}>{service.title}</h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '24px',
        }}>{service.desc}</p>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {service.points.map(point => (
            <div key={point} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              <CheckCircle2 size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
              {point}
            </div>
          ))}
        </div>
        
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: 'var(--accent-primary)',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: '15px',
          cursor: 'pointer',
          padding: 0,
        }}>
          Consult with our experts <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default function StrategicDigitalTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div ref={containerRef} style={{ background: 'var(--bg-void)', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg-deep)' }}>
        <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--accent-primary) 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
        </motion.div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, zIndex: 1, textAlign: 'center', maxWidth: '1000px', padding: '0 32px' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px', display: 'block' }}
          >
            Digital Architecture & Strategy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '32px' }}
          >
            Strategic Digital <br />
            <span style={{ color: 'var(--accent-primary)', fontStyle: 'italic' }}>Transformation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}
          >
            We don't just add technology; we re-engineer your core operations for an AI-native future. Eliminating tech debt, optimizing workflows, and preparing your data for world-class automation.
          </motion.p>
        </motion.div>
        
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, color: 'var(--text-secondary)' }}>Explore Capabilities</span>
          <div style={{ width: '1px', height: '40px', background: 'var(--accent-primary)' }} />
        </div>
      </section>

      {/* Grid Section */}
      <section style={{ padding: '120px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '32px' }}>
            {SERVICES.map((service, i) => (
              <div key={service.title} style={i === 4 ? { gridColumn: '1 / -1', maxWidth: '800px', margin: '0 auto', width: '100%' } : {}}>
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 0 160px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px' }}>Ready to modernize your tech stack?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', fontSize: '18px' }}>Schedule a strategic audit with our engineering team to identify automation opportunities and workflow bottlenecks.</p>
          <button style={{
            background: 'var(--accent-primary)',
            color: '#fff',
            border: 'none',
            padding: '18px 48px',
            borderRadius: '12px',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(10, 66, 37, 0.15)',
          }}>
            Get Started with Zuneko
          </button>
        </div>
      </section>
    </div>
  );
}
