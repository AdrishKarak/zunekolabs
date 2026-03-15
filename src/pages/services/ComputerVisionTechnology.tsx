import { motion } from 'framer-motion';
import { Eye, Shield, Package, FileText, Share2, CheckCircle2, ArrowRight } from 'lucide-react';
import Magnetic from '../../components/ui/Magnetic';

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    title: 'Automated Industrial Inspection',
    icon: Eye,
    desc: 'Deploying high-speed, computer vision systems that monitor production lines with 24/7 accuracy and utilise deep learning for real-time defect detection and quality monitoring in manufacturing environments - reducing waste, risks and overhead costs.',
    points: ['Real-time Defect Detection', 'Quality Control Automation', 'Precision Measurement', 'Line Speed Optimization'],
    color: 'var(--accent-primary)',
  },
  {
    title: 'Surveillance Intelligence',
    icon: Shield,
    desc: 'Video analytics for anomaly detection, (PPE) compliance monitoring floor-space utilization and facility oversight / workplace safety, turning passive CCTV into active operational intelligence to reduce risks and address bottlenecks rapidly.',
    points: ['Anomaly Detection', 'Safety Compliance', 'Crowd Analytics', 'Threat Identification'],
    color: '#0e6336',
  },
  {
    title: 'Asset Tracking & Logistics Vision',
    icon: Package,
    desc: 'Real-time object detection & localisation, vehicle/goods tracking and automated inventory logging across warehouses and facilities to better manage & optimise supply chain.',
    points: ['Warehouse Automation', 'Inventory Management', 'Tracking Systems', 'Fleet Intelligence'],
    color: 'var(--accent-primary)',
  },
  {
    title: 'Advanced OCR Systems',
    icon: FileText,
    desc: 'Custom-trained OCR models for complex, handwritten, regional language or degraded documents as well as digital assets.',
    points: ['Handwriting Recognition', 'Multilingual Support', 'Document Digitization', 'Automated Data Entry'],
    color: '#0e6336',
  },
  {
    title: 'Edge Vision Deployment',
    icon: Share2,
    desc: 'Optimization of vision models for low-latency execution on local hardware and IoT devices, processing data instantly & securely.',
    points: ['Low Latency Inference', 'On-device Processing', 'IoT Integration', 'Offline Capabilities'],
    color: 'var(--accent-primary)',
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[number], index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '24px',
        padding: 'clamp(24px, 5vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100%',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--accent-primary)';
        el.style.transform = 'scale(1.02)';
        el.style.background = 'var(--bg-raised)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--border-subtle)';
        el.style.transform = 'scale(1)';
        el.style.background = 'var(--bg-surface)';
      }}
    >
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '16px',
        background: 'var(--accent-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
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
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '24px',
        }}>{service.desc}</p>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {service.points.map(point => (
            <li key={point} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
              {point}
            </li>
          ))}
        </ul>
        
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
          Learn more <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default function ComputerVisionTechnology() {
  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ 
        padding: 'clamp(80px, 15vh, 160px) 0 clamp(60px, 10vh, 100px)', 
        background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-void) 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '14px', 
              fontWeight: 600, 
              color: 'var(--accent-primary)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.3em', 
              marginBottom: '24px', 
              display: 'block' 
            }}>Visual Intelligence</span>
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(38px, 8vw, 90px)', 
              fontWeight: 700, 
              color: 'var(--text-primary)', 
              lineHeight: 1.1, 
              marginBottom: '32px' 
            }}>
              Computer Vision <br />
              <span style={{ color: 'var(--accent-primary)' }}>Technology</span>
            </h1>
            <p style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'clamp(17px, 2vw, 20px)', 
              color: 'var(--text-secondary)', 
              maxWidth: '800px', 
              margin: '0 auto', 
              lineHeight: 1.6 
            }}>
              Turning visual data into actionable business intelligence. We build custom vision models that see, understand, and optimize your production environments.
            </p>
          </motion.div>
        </div>
        
        {/* Animated Background Element */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '600px', 
          height: '600px', 
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          zIndex: 0,
          opacity: 0.5
        }} />
      </section>

      {/* Services Grid */}
      <section style={{ padding: '40px 0 120px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '24px' }}>
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Visual Tech Highlight */}
      <section style={{ padding: 'clamp(60px, 12vw, 120px) 0', background: 'var(--accent-primary)', color: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 32px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(20px, 8vw, 60px)', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, marginBottom: '24px', lineHeight: 1.2 }}>Real-time Edge Analysis</h2>
              <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', opacity: 0.9, lineHeight: 1.7, marginBottom: '32px' }}>
                We specialize in deploying complex vision architectures directly onto edge hardware, ensuring zero-latency decision making without the need for cloud dependency.
              </p>
              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700 }}>&lt; 50ms</div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>Inference Latency</div>
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700 }}>99.8%</div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>Model Accuracy</div>
                </div>
              </div>
            </div>
            <div style={{ 
              aspectRatio: '16/9', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ position: 'absolute', width: '80%', height: '80%', border: '2px solid #fff', borderRadius: '50%' }} 
              />
              <Eye size={64} />
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Entry */}
      <section style={{ padding: 'clamp(80px, 15vw, 120px) 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 32px)' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '32px' }}>Seeing is believing.</h2>
          <Magnetic>
            <button style={{
              background: 'var(--bg-void)',
              color: 'var(--accent-primary)',
              border: '2px solid var(--accent-primary)',
              padding: '16px 40px',
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
            >
              Review Our Case Studies
            </button>
          </Magnetic>
        </div>
      </section>
    </div>
  );
}
