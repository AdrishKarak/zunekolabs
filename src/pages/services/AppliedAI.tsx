import { useRef } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, MessageSquare, Bot, Database, Sparkles, ArrowRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    title: 'Generative AI Systems',
    icon: Sparkles,
    desc: 'Custom generative solutions built to automate content creation, design exploration, and creative workflows within enterprise constraints.',
    points: ['Custom Prompt Engineering', 'Image & Asset Generation', 'Creative Workflow Automation', 'Brand-aligned Content AI'],
    color: 'var(--accent-primary)',
  },
  {
    title: 'Custom LLM Development',
    icon: BrainCircuit,
    desc: 'Fine-tuning and deploying large language models tailored to your specific industry domain and private datasets, ensuring data privacy and accuracy.',
    points: ['Domain-specific Fine-tuning', 'Private Model Deployment', 'Context Window Optimization', 'Hallucination Mitigation'],
    color: '#0e6336',
  },
  {
    title: 'Agentic AI Frameworks',
    icon: Bot,
    desc: 'Developing autonomous AI agents capable of reasoning, using tools, and performing multi-step tasks to solve complex operational challenges.',
    points: ['Multi-agent Orchestration', 'Tool Use & Function Calling', 'Autonomous Task Planning', 'Human-in-the-loop Systems'],
    color: 'var(--accent-primary)',
  },
  {
    title: 'RAG & Document Intelligence',
    icon: Database,
    desc: 'Advanced Retrieval-Augmented Generation systems that connect your private knowledge base to LLMs for instant, accurate information retrieval.',
    points: ['Vector Database Setup', 'Semantic Search Engines', 'Document Analysis Pipelines', 'Contextual Q&A Systems'],
    color: '#0e6336',
  },
  {
    title: 'AI Copilot Integration',
    icon: MessageSquare,
    desc: 'Embedding intelligent assistants directly into your existing software ecosystem to augment staff productivity and user experience.',
    points: ['In-app Assistant Design', 'Natural Language Interfaces', 'Context-aware Suggestions', 'Cross-platform Integration'],
    color: 'var(--accent-primary)',
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[number], index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '24px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
      }}
    >
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        background: 'var(--accent-dim)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-primary)',
      }}>
        <Icon size={24} />
      </div>
      
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '22px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '16px',
        }}>{service.title}</h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '24px',
        }}>{service.desc}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {service.points.map(point => (
            <div key={point} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
              {point}
            </div>
          ))}
        </div>
      </div>
      
      <motion.div
        whileHover={{ x: 5 }}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', marginTop: '16px' }}
      >
        Integration details <ArrowRight size={14} />
      </motion.div>
    </motion.div>
  );
}

export default function AppliedAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} style={{ background: 'var(--bg-void)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Immersive Header */}
      <section style={{ 
        padding: '180px 0 120px', 
        background: 'radial-gradient(circle at top right, var(--accent-glow) 0%, transparent 60%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ maxWidth: '800px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '8px 16px', 
                borderRadius: '100px', 
                background: 'var(--accent-dim)', 
                color: 'var(--accent-primary)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '32px'
              }}>
                <Sparkles size={14} /> Intelligence Applied
              </div>
              <h1 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(48px, 8vw, 100px)', 
                fontWeight: 700, 
                color: 'var(--text-primary)', 
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                marginBottom: '40px'
              }}>
                Applied Artificial <br />
                <span style={{ color: 'var(--accent-primary)', fontStyle: 'italic' }}>Intelligence</span>
              </h1>
              <p style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: '22px', 
                color: 'var(--text-secondary)', 
                lineHeight: 1.5,
                fontWeight: 400
              }}>
                Bridging the gap between frontier research and enterprise logic. We build resilient, AI-native systems that solve real-world operational problems at scale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section style={{ position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Framework Highlight */}
      <section style={{ marginTop: '140px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ 
            background: 'var(--bg-deep)', 
            borderRadius: '40px', 
            padding: '80px', 
            border: '1px solid var(--border-subtle)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px' }}>Infinite Context RAG</h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
                Our proprietary RAG architectures utilize dynamic re-ranking and multi-vector search to provide your AI systems with the most relevant corporate knowledge, virtually eliminating hallucination and ensuring compliance.
              </p>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '30px', fontWeight: 700, color: 'var(--accent-primary)' }}>100ms</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Search Latency</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '30px', fontWeight: 700, color: 'var(--accent-primary)' }}>99.1%</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Citation Accuracy</div>
                </div>
              </div>
            </div>
            {/* Abstract visual */}
            <div style={{ position: 'absolute', top: '50%', right: '80px', transform: 'translateY(-50%)', opacity: 0.1, pointerEvents: 'none' }}>
              <BrainCircuit size={300} strokeWidth={0.5} color="var(--accent-primary)" />
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Footer */}
      <section style={{ marginTop: '140px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', letterSpacing: '-0.01em' }}>Engineered for Precision</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '48px' }}>Ready to move beyond chatbots? Let's build your AI-native future today.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button style={{ 
              background: 'var(--accent-primary)', 
              color: '#fff', 
              padding: '16px 36px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              border: 'none', 
              cursor: 'pointer' 
            }}>Schedule a Demo</button>
            <button style={{ 
              background: 'transparent', 
              color: 'var(--text-primary)', 
              padding: '16px 36px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              border: '1px solid var(--border-subtle)', 
              cursor: 'pointer' 
            }}>Download Whitepaper</button>
          </div>
        </div>
      </section>
    </div>
  );
}
