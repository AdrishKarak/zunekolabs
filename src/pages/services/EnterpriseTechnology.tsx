import { motion } from 'framer-motion';
import { Network, Server, ShieldCheck, Cpu, Zap, ArrowRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    title: 'Modern Scalability Architectures',
    icon: Network,
    desc: 'Designing and implementing microservices-based, containerized architectures that scale horizontally to meet the most demanding enterprise workloads.',
    points: ['Kubernetes Orchestration', 'Auto-scaling Clusters', 'Load Balanced Traffic', 'Microservices Mesh'],
    color: 'var(--accent-primary)',
  },
  {
    title: 'High-Performance Computing',
    icon: Cpu,
    desc: 'Setting up dedicated GPU clusters and high-performance computing environments optimized specifically for training and deploying frontier AI models.',
    points: ['GPU Cluster Provisioning', 'Optimized Model Serving', 'Distributed Training', 'Latency Minimization'],
    color: '#0e6336',
  },
  {
    title: 'Enterprise Security & Trust',
    icon: ShieldCheck,
    desc: 'Implementing rigorous, military-grade security protocols, encryption, and compliance frameworks to protect sensitive corporate assets in a digital-first world.',
    points: ['Zero-trust Networking', 'End-to-end Encryption', 'Compliance Auditing', 'IAM & Access Control'],
    color: 'var(--accent-primary)',
  },
  {
    title: 'Cloud-Native Strategy',
    icon: Server,
    desc: 'Migrating legacy on-prem systems to robust, serverless cloud foundations that reduce maintenance overhead and accelerate deployment cycles.',
    points: ['Multi-cloud Strategy', 'Serverless Computing', 'Infrastructure as Code', 'Cost Optimization'],
    color: '#0e6336',
  },
  {
    title: 'Digital Ecosystem Integration',
    icon: Zap,
    desc: 'Unifying fragmented enterprise tools into a seamless, high-velocity digital ecosystem through advanced API orchestration and automated workflows.',
    points: ['API Gateway Management', 'Event-driven Architecture', 'Third-party Unification', 'Real-time Syncing'],
    color: 'var(--accent-primary)',
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[number], index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '32px',
        padding: 'clamp(32px, 6vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          marginBottom: '32px',
        }}>
          <Icon size={32} />
        </div>
        
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '20px',
          letterSpacing: '-0.01em',
        }}>{service.title}</h3>
        
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: '32px',
        }}>{service.desc}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {service.points.map(point => (
            <div key={point} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: 0 }} />
              {point}
            </div>
          ))}
        </div>
        
        <motion.button 
          whileHover={{ x: 10 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'none',
            border: 'none',
            color: 'var(--accent-primary)',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '16px',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Explore infrastructure <ArrowRight size={18} />
        </motion.button>
      </div>

      <div style={{ 
        position: 'absolute', 
        bottom: '-20px', 
        right: '-20px', 
        opacity: 0.03, 
        transform: 'rotate(-15deg)' 
      }}>
        <Icon size={200} />
      </div>
    </motion.div>
  );
}

export default function EnterpriseTechnology() {
  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      {/* Brutalist / Industrial Header */}
      <section style={{ 
        padding: 'clamp(120px, 20vh, 200px) 0 clamp(80px, 12vh, 140px)', 
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-deep)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 32px)', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '12px', 
              fontWeight: 700, 
              color: 'var(--accent-primary)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.4em', 
              marginBottom: '32px' 
            }}>Enterprise Infrastructure</div>
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(56px, 10vw, 120px)', 
              fontWeight: 800, 
              color: 'var(--text-primary)', 
              lineHeight: 0.9, 
              letterSpacing: '-0.04em',
              marginBottom: '48px'
            }}>
              Next-gen <br />
              Enterprise <br />
              <span style={{ color: 'var(--accent-primary)' }}>Technology</span>
            </h1>
            <div style={{ display: 'flex', gap: 'clamp(32px, 6vw, 60px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <p style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: '22px', 
                color: 'var(--text-secondary)', 
                maxWidth: '600px', 
                lineHeight: 1.5,
                fontWeight: 400
              }}>
                Building the backbone of the world's most innovative firms. Our infrastructure is built for scale, resilience, and maximum data velocity.
              </p>
              <div style={{ borderLeft: '2px solid var(--accent-primary)', paddingLeft: '32px' }}>
                <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>99.9%</div>
                <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Uptime Guarantee</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Background Grid Accent */}
        <div style={{ 
          position: 'absolute', 
          right: '5%', 
          top: '20%', 
          width: '30%', 
          height: '60%', 
          border: '1px solid var(--accent-glow)',
          opacity: 0.1,
          zIndex: 0
        }} />
      </section>

      {/* Modern Grid */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 32px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '40px' }}>
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Integration Highlight */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0 clamp(80px, 12vw, 180px)', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 32px)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '32px' }}>Global Standards Compliant</h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: 'var(--text-secondary)', marginBottom: '64px', maxWidth: '700px', margin: '0 auto 64px' }}>
            Every architected system exceeds industry standards for security, data privacy, and reliability. SOC2, HIPAA, and GDPR readiness baked into the foundation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(32px, 10vw, 80px)', flexWrap: 'wrap' }}>
            <ShieldCheck size={48} color="var(--accent-primary)" opacity={0.5} />
            <Server size={48} color="var(--accent-primary)" opacity={0.5} />
            <Network size={48} color="var(--accent-primary)" opacity={0.5} />
            <Zap size={48} color="var(--accent-primary)" opacity={0.5} />
          </div>
        </div>
      </section>
    </div>
  );
}
