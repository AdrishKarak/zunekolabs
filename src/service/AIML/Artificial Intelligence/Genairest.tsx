import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const GLOBAL_STYLES = `
  .gen-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .gen-card:hover { transform: translateY(-5px); box-shadow: 0 18px 44px rgba(0,0,0,0.38) !important; }
  .gen-stat-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .gen-stat-card:hover { transform: translateY(-6px) scale(1.02); }
  .gen-industry-card { transition: border-color 0.25s, background 0.25s, transform 0.25s; cursor: pointer; }
  .gen-industry-card:hover { transform: translateY(-4px); }
  .gen-arch-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .gen-arch-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.4) !important; }
  @media(max-width:900px){ .gen-grid-3{ grid-template-columns: 1fr 1fr !important; } }
  @media(max-width:600px){ .gen-grid-3{ grid-template-columns: 1fr !important; } }
  @media(max-width:768px){ .gen-tl-line{ display:none; } .gen-step-wrap{ justify-content:center !important; } .gen-step-card{ width:90% !important; } }
`;

/* ═══════════════════════════════════════════════
   SECTION 1 — Boost Business Growth with GenAI
═══════════════════════════════════════════════ */
const GROWTH_SERVICES = [
  { id: '01', color: '#00e87a', title: 'Content & Copy at Scale', body: 'Generate on-brand marketing copy, product descriptions, reports, and emails — at 100x the speed with consistent tone.', metric: '100x', metricLabel: 'faster content output',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="6" y="8" width="32" height="40" rx="3" stroke="#00e87a" strokeWidth="1.4" opacity="0.6"/><line x1="12" y1="16" x2="32" y2="16" stroke="#00e87a" strokeWidth="1.1" opacity="0.5"/><line x1="12" y1="22" x2="32" y2="22" stroke="#00e87a" strokeWidth="1.1" opacity="0.4"/><line x1="12" y1="28" x2="26" y2="28" stroke="#00e87a" strokeWidth="1.1" opacity="0.4"/><line x1="12" y1="34" x2="30" y2="34" stroke="#00e87a" strokeWidth="1.1" opacity="0.3"/><path d="M42 10 L44 16 L50 18 L44 20 L42 26 L40 20 L34 18 L40 16 Z" stroke="#00e87a" strokeWidth="1.3" fill="none" opacity="0.9"/></svg>),
  },
  { id: '02', color: '#c9a84c', title: 'Intelligent Data Analysis', body: 'Ask questions about your data in plain English. GenAI surfaces insights, anomalies, and recommendations instantly.', metric: '< 3 sec', metricLabel: 'insight generation',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><polyline points="6,44 14,32 22,36 30,22 38,26 48,10" stroke="#c9a84c" strokeWidth="1.7" strokeLinecap="round"/>{([[14,32],[22,36],[30,22],[38,26]] as [number,number][]).map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" fill="#c9a84c" opacity={0.5+i*0.1}/>)}<rect x="36" y="6" width="16" height="10" rx="2" fill="rgba(201,168,76,0.12)" stroke="#c9a84c" strokeWidth="1"/><text x="44" y="13" textAnchor="middle" fill="#c9a84c" fontSize="5.5" fontFamily="monospace" fontWeight="bold">AI</text><line x1="6" y1="48" x2="50" y2="48" stroke="#c9a84c" strokeWidth="0.7" opacity="0.2"/></svg>),
  },
  { id: '03', color: '#00b85e', title: 'Customer Experience Automation', body: 'Deploy GenAI agents that handle support, onboarding, and upsell conversations — personalised, 24/7, at zero marginal cost.', metric: '24/7', metricLabel: 'autonomous support',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="4" y="12" width="30" height="22" rx="4" stroke="#00b85e" strokeWidth="1.4" opacity="0.7"/><circle cx="12" cy="23" r="2.5" fill="#00b85e" opacity="0.5"/><circle cx="19" cy="23" r="2.5" fill="#00b85e" opacity="0.7"/><circle cx="26" cy="23" r="2.5" fill="#00b85e" opacity="0.5"/><path d="M4 30 L10 36 L4 36 Z" fill="#00b85e" opacity="0.4"/><rect x="36" y="14" width="16" height="14" rx="3" stroke="#00b85e" strokeWidth="1.3" opacity="0.85"/><circle cx="41" cy="21" r="2" fill="#00b85e" opacity="0.7"/><circle cx="47" cy="21" r="2" fill="#00b85e" opacity="0.7"/><line x1="44" y1="10" x2="44" y2="14" stroke="#00b85e" strokeWidth="1.3" opacity="0.5"/><circle cx="44" cy="9" r="1.5" stroke="#00b85e" strokeWidth="1" fill="none" opacity="0.5"/><path d="M40 26 Q44 30 48 26" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg>),
  },
  { id: '04', color: '#00e87a', title: 'Code & Dev Acceleration', body: 'Integrate GenAI into your dev workflow — code generation, test writing, documentation, and PR review automation.', metric: '55%', metricLabel: 'less dev time',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="4" y="8" width="48" height="36" rx="3" stroke="#00e87a" strokeWidth="1.3" opacity="0.5"/><line x1="4" y1="16" x2="52" y2="16" stroke="#00e87a" strokeWidth="0.8" opacity="0.2"/><circle cx="11" cy="12" r="2" fill="#00e87a" opacity="0.4"/><circle cx="17" cy="12" r="2" fill="#c9a84c" opacity="0.4"/><circle cx="23" cy="12" r="2" fill="#00b85e" opacity="0.4"/><text x="10" y="28" fill="#00e87a" fontSize="7" fontFamily="monospace" opacity="0.7">{'<AI'}</text><text x="10" y="36" fill="#00e87a" fontSize="7" fontFamily="monospace" opacity="0.5">{'  />'}</text><path d="M36 22 L44 30 L36 38" stroke="#00e87a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/><path d="M34 22 L26 30 L34 38" stroke="#00e87a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/></svg>),
  },
  { id: '05', color: '#c9a84c', title: 'Process & Workflow Intelligence', body: 'Map your internal processes into AI-driven flows. GenAI handles routing, approvals, summarisation, and escalation automatically.', metric: '70%', metricLabel: 'process automation',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="4" y="10" width="14" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><rect x="21" y="24" width="14" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.6" opacity="0.9"/><rect x="38" y="10" width="14" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><rect x="21" y="38" width="14" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.5"/><line x1="18" y1="15" x2="21" y2="15" stroke="#c9a84c" strokeWidth="1.1" opacity="0.4"/><line x1="35" y1="15" x2="38" y2="15" stroke="#c9a84c" strokeWidth="1.1" opacity="0.4"/><line x1="28" y1="34" x2="28" y2="38" stroke="#c9a84c" strokeWidth="1.1" opacity="0.4"/><line x1="28" y1="20" x2="28" y2="24" stroke="#c9a84c" strokeWidth="1.1" opacity="0.5"/><text x="28" y="31" textAnchor="middle" fill="#c9a84c" fontSize="5" fontFamily="monospace">FLOW</text></svg>),
  },
  { id: '06', color: '#00b85e', title: 'Knowledge Management & RAG', body: 'Turn your internal docs, wikis, and SOPs into a living AI knowledge base. Employees get instant, accurate answers grounded in your data.', metric: '98%', metricLabel: 'answer accuracy',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><ellipse cx="16" cy="14" rx="10" ry="4" stroke="#00b85e" strokeWidth="1.3"/><line x1="6" y1="14" x2="6" y2="26" stroke="#00b85e" strokeWidth="1.3"/><line x1="26" y1="14" x2="26" y2="26" stroke="#00b85e" strokeWidth="1.3"/><ellipse cx="16" cy="26" rx="10" ry="4" stroke="#00b85e" strokeWidth="1.3"/><path d="M26 20 L36 20" stroke="#00b85e" strokeWidth="1.1" strokeDasharray="2 2" opacity="0.6"/><rect x="36" y="14" width="14" height="14" rx="3" stroke="#00b85e" strokeWidth="1.3"/><path d="M43 19 L43 24 M40 21.5 L46 21.5" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" opacity="0.8"/><polyline points="38,36 41,40 48,32" stroke="#00b85e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/></svg>),
  },
];

function GrowthCard({ s, index, inView }: { s: typeof GROWTH_SERVICES[0]; index: number; inView: boolean }) {
  return (
    <motion.div className="gen-card" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', background: 'var(--bg-surface)', border: `1px solid ${s.color}1a`, boxShadow: '0 4px 18px rgba(0,0,0,0.18)' }}>
      <div style={{ height: '2px', background: `linear-gradient(90deg,${s.color},transparent)`, opacity: 0.45 }} />
      <div style={{ padding: '24px', position: 'relative' }}>
        <div style={{ position: 'absolute', right: '14px', top: '10px', fontFamily: 'var(--font-mono)', fontSize: '46px', fontWeight: 700, color: s.color, opacity: 0.04, userSelect: 'none', pointerEvents: 'none' }}>{s.id}</div>
        <div style={{ marginBottom: '14px' }}>{s.svg}</div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>{s.title}</h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>{s.body}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', borderTop: `1px solid ${s.color}18`, paddingTop: '12px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '22px', color: s.color }}>{s.metric}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>{s.metricLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function GenAIGrowth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <style>{GLOBAL_STYLES}</style>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>WHAT WE UNLOCK</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '700px' }}>
            Boost Your Business Growth<br/><span style={{ color: 'var(--accent-primary)' }}>and Efficiency with Gen AI.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '14px', maxWidth: '520px' }}>Six high-impact applications we deploy for enterprise clients — each one measurable, each one compounding.</p>
        </motion.div>
        <div className="gen-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {GROWTH_SERVICES.map((s, i) => <GrowthCard key={s.id} s={s} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 — Architectures & Models
═══════════════════════════════════════════════ */
const ARCHITECTURES = [
  { name: 'Large Language Models', abbr: 'LLM', color: '#00e87a', models: ['GPT-4o', 'Claude 3.5', 'Llama 3.1', 'Mistral'], desc: 'Foundation models for text generation, reasoning, summarisation, and conversation at enterprise scale.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="10" width="44" height="32" rx="4" stroke="#00e87a" strokeWidth="1.4" opacity="0.6"/><line x1="4" y1="18" x2="48" y2="18" stroke="#00e87a" strokeWidth="0.7" opacity="0.18"/>{[0,1,2].map(row=>[0,1,2,3,4].map(col=>(<rect key={`${row}-${col}`} x={8+col*8} y={22+row*6} width="5" height="3.5" rx="1" fill="#00e87a" opacity={0.12+row*0.1+col*0.03}/>)))}<rect x="8" y="22" width="13" height="3.5" rx="1" fill="#00e87a" opacity="0.5"/></svg>) },
  { name: 'Retrieval Augmented Generation', abbr: 'RAG', color: '#c9a84c', models: ['LangChain', 'LlamaIndex', 'Pinecone', 'Weaviate'], desc: 'Ground LLM outputs in your proprietary data. Accurate, hallucination-resistant, always up to date.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><ellipse cx="14" cy="14" rx="9" ry="3.5" stroke="#c9a84c" strokeWidth="1.3"/><line x1="5" y1="14" x2="5" y2="24" stroke="#c9a84c" strokeWidth="1.3"/><line x1="23" y1="14" x2="23" y2="24" stroke="#c9a84c" strokeWidth="1.3"/><ellipse cx="14" cy="24" rx="9" ry="3.5" stroke="#c9a84c" strokeWidth="1.3"/><path d="M23 19 L32 19" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" opacity="0.7"/><rect x="32" y="12" width="16" height="14" rx="3" stroke="#c9a84c" strokeWidth="1.3"/><line x1="35" y1="17" x2="45" y2="17" stroke="#c9a84c" strokeWidth="0.9" opacity="0.6"/><line x1="35" y1="21" x2="41" y2="21" stroke="#c9a84c" strokeWidth="0.9" opacity="0.5"/></svg>) },
  { name: 'Fine-Tuned Foundation Models', abbr: 'FTM', color: '#00b85e', models: ['LoRA', 'QLoRA', 'RLHF', 'DPO'], desc: 'Adapt base models to your domain. Your tone, your terminology, your industry — baked into the weights.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><circle cx="26" cy="20" r="12" stroke="#00b85e" strokeWidth="1.3" opacity="0.5"/><circle cx="26" cy="20" r="7" stroke="#00b85e" strokeWidth="1.4" opacity="0.75"/><circle cx="26" cy="20" r="3" fill="#00b85e" opacity="0.85"/>{[0,60,120,180,240,300].map((a,i)=>{const r=(a*Math.PI)/180;return <line key={i} x1={26+12*Math.cos(r)} y1={20+12*Math.sin(r)} x2={26+15*Math.cos(r)} y2={20+15*Math.sin(r)} stroke="#00b85e" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>;})}</svg>) },
  { name: 'Multi-Modal AI Systems', abbr: 'MMA', color: '#00e87a', models: ['GPT-4V', 'Gemini Pro', 'DALL·E 3', 'Whisper'], desc: 'Systems that understand and generate across text, image, audio, and video — unified in a single pipeline.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="6" width="16" height="12" rx="2" stroke="#00e87a" strokeWidth="1.2" opacity="0.6"/><rect x="24" y="6" width="16" height="12" rx="2" stroke="#00e87a" strokeWidth="1.2" opacity="0.6"/><rect x="4" y="26" width="16" height="12" rx="2" stroke="#00e87a" strokeWidth="1.2" opacity="0.6"/><rect x="24" y="26" width="16" height="12" rx="2" stroke="#00e87a" strokeWidth="1.2" opacity="0.6"/><circle cx="26" cy="22" r="4" stroke="#00e87a" strokeWidth="1.3" opacity="0.9"/><circle cx="26" cy="22" r="1.5" fill="#00e87a" opacity="0.8"/></svg>) },
  { name: 'Agentic AI Frameworks', abbr: 'AAF', color: '#c9a84c', models: ['LangGraph', 'AutoGen', 'CrewAI', 'Semantic Kernel'], desc: 'Autonomous agents that plan, execute multi-step tasks, use tools, and self-correct — without human input.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><circle cx="26" cy="10" r="5" stroke="#c9a84c" strokeWidth="1.3"/><circle cx="10" cy="36" r="5" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/><circle cx="42" cy="36" r="5" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/><line x1="26" y1="15" x2="14" y2="32" stroke="#c9a84c" strokeWidth="1.1" opacity="0.45"/><line x1="26" y1="15" x2="38" y2="32" stroke="#c9a84c" strokeWidth="1.1" opacity="0.45"/><text x="26" y="13" textAnchor="middle" fill="#c9a84c" fontSize="5" fontFamily="monospace">AI</text></svg>) },
  { name: 'Diffusion & Generative Models', abbr: 'DGM', color: '#00b85e', models: ['Stable Diffusion', 'SDXL', 'ControlNet', 'ComfyUI'], desc: 'Generate images, product visuals, design variants, and synthetic training data at production quality.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><circle cx="26" cy="26" r="20" stroke="#00b85e" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 4"/><circle cx="26" cy="26" r="13" stroke="#00b85e" strokeWidth="1" opacity="0.3"/><circle cx="26" cy="26" r="7" stroke="#00b85e" strokeWidth="1.3" opacity="0.6"/><circle cx="26" cy="26" r="3" fill="#00b85e" opacity="0.8"/></svg>) },
];

export function GenAIArchitectures() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>UNDER THE HOOD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Generative AI Architectures<br/><span style={{ color: 'var(--accent-primary)' }}>and Models We Work With.</span>
          </h2>
        </motion.div>
        <div className="gen-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {ARCHITECTURES.map((a, i) => (
            <motion.div key={a.abbr} className="gen-arch-card" initial={{ opacity: 0, y: 38 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              style={{ borderRadius: '16px', overflow: 'hidden', background: 'var(--bg-surface)', border: `1px solid ${a.color}1a`, boxShadow: '0 4px 18px rgba(0,0,0,0.18)' }}>
              <div style={{ height: '2px', background: `linear-gradient(90deg,${a.color},transparent)`, opacity: 0.45 }}/>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                  {a.svg}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: a.color, border: `1px solid ${a.color}33`, padding: '2px 8px', borderRadius: '100px', letterSpacing: '0.1em', flexShrink: 0, marginTop: '4px' }}>{a.abbr}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>{a.name}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>{a.desc}</p>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {a.models.map(m => <span key={m} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '2px 8px', borderRadius: '100px', border: `1px solid ${a.color}24`, color: 'var(--text-tertiary)' }}>{m}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3 — Roadmap
═══════════════════════════════════════════════ */
const ROADMAP_STEPS = [
  { phase: 'DISCOVER', duration: '1 wk', color: '#00e87a', title: 'Use Case Definition', body: 'We audit your workflows and identify the highest-ROI GenAI opportunities — ranked by effort vs. impact.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><circle cx="20" cy="20" r="13" stroke="#00e87a" strokeWidth="1.4" opacity="0.7"/><line x1="29" y1="29" x2="40" y2="40" stroke="#00e87a" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="20" x2="24" y2="20" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="20" y1="16" x2="20" y2="24" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/></svg>) },
  { phase: 'DATA', duration: '1–2 wks', color: '#c9a84c', title: 'Data Preparation & Curation', body: 'Clean, label, and structure your proprietary data. Build the embedding pipeline and vector storage layer.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><ellipse cx="24" cy="14" rx="14" ry="5" stroke="#c9a84c" strokeWidth="1.3"/><line x1="10" y1="14" x2="10" y2="24" stroke="#c9a84c" strokeWidth="1.3"/><line x1="38" y1="14" x2="38" y2="24" stroke="#c9a84c" strokeWidth="1.3"/><ellipse cx="24" cy="24" rx="14" ry="5" stroke="#c9a84c" strokeWidth="1.3"/><line x1="10" y1="24" x2="10" y2="34" stroke="#c9a84c" strokeWidth="1.3" opacity="0.5"/><line x1="38" y1="24" x2="38" y2="34" stroke="#c9a84c" strokeWidth="1.3" opacity="0.5"/><ellipse cx="24" cy="34" rx="14" ry="5" stroke="#c9a84c" strokeWidth="1.3" opacity="0.5"/></svg>) },
  { phase: 'BUILD', duration: '3–5 wks', color: '#00b85e', title: 'Model Training & Fine-Tuning', body: 'Fine-tune base models on your domain data using LoRA/QLoRA. Evaluate with custom benchmarks until accuracy targets are met.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><path d="M8 36 L14 24 L20 28 L26 16 L32 20 L40 8" stroke="#00b85e" strokeWidth="1.7" strokeLinecap="round"/>{([[14,24],[20,28],[26,16],[32,20]] as [number,number][]).map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" fill="#00b85e" opacity={0.5+i*0.1}/>)}<line x1="8" y1="40" x2="42" y2="40" stroke="#00b85e" strokeWidth="0.7" opacity="0.2"/></svg>) },
  { phase: 'INTEGRATE', duration: '1–2 wks', color: '#00e87a', title: 'API Integration & Deployment', body: 'Wrap models into REST/GraphQL APIs. Integrate into your existing stack — CRM, ERP, web app, or internal tools.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><rect x="4" y="16" width="14" height="16" rx="2" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/><rect x="30" y="16" width="14" height="16" rx="2" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/><path d="M18 24 L30 24" stroke="#00e87a" strokeWidth="1.4" strokeDasharray="3 2"/><path d="M26 21 L30 24 L26 27" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/><text x="11" y="26" textAnchor="middle" fill="#00e87a" fontSize="5" fontFamily="monospace" opacity="0.7">API</text></svg>) },
  { phase: 'EVOLVE', duration: 'Ongoing', color: '#c9a84c', title: 'Evaluation, Monitoring & Iteration', body: 'Live dashboards track model accuracy, latency, and drift. Automated retraining triggers keep performance sharp as your data evolves.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><circle cx="24" cy="24" r="18" stroke="#c9a84c" strokeWidth="1.2" opacity="0.25"/><path d="M24 6 A18 18 0 0 1 42 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round"/><path d="M42 24 A18 18 0 0 1 24 42" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/><path d="M24 42 A18 18 0 0 1 6 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.3"/><path d="M6 24 A18 18 0 0 1 24 6" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.15"/><circle cx="24" cy="24" r="5" stroke="#c9a84c" strokeWidth="1.3"/><circle cx="24" cy="24" r="2" fill="#c9a84c" opacity="0.8"/></svg>) },
];

export function GenAIRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>HOW WE BUILD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Our Proven Custom Gen AI<br/><span style={{ color: 'var(--accent-primary)' }}>Development Roadmap.</span>
          </h2>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative' }}>
          <div className="gen-tl-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,232,122,0.07)', transform: 'translateX(-50%)' }}/>
          {ROADMAP_STEPS.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={s.phase} initial={{ opacity: 0, x: isLeft ? -48 : 48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, ease: EASE }}
                className="gen-step-wrap" style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '11px', height: '11px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}88`, zIndex: 4 }}/>
                <div className="gen-step-card" style={{ width: '44%', borderRadius: '14px', background: 'var(--bg-surface)', border: `1px solid ${s.color}1e`, padding: '22px', boxShadow: '0 4px 18px rgba(0,0,0,0.18)', transition: 'transform 0.25s, box-shadow 0.25s' }}>
                  <div style={{ height: '2px', background: `linear-gradient(90deg,${s.color},transparent)`, marginBottom: '14px', opacity: 0.5 }}/>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    {s.svg}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: s.color, border: `1px solid ${s.color}40`, padding: '2px 7px', borderRadius: '100px', letterSpacing: '0.1em' }}>{s.phase}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-tertiary)' }}>{s.duration}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '5px' }}>{s.title}</h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{s.body}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 — Industries
═══════════════════════════════════════════════ */
const INDUSTRIES = [
  { name: 'Healthcare', color: '#00e87a', useCases: ['Clinical documentation AI', 'Diagnostic report summarisation', 'Patient triage agents', 'Drug interaction checks'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="3" width="30" height="30" rx="5" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="18" y1="9" x2="18" y2="27" stroke="#00e87a" strokeWidth="2.2" strokeLinecap="round"/><line x1="9" y1="18" x2="27" y2="18" stroke="#00e87a" strokeWidth="2.2" strokeLinecap="round"/></svg>) },
  { name: 'Legal & Compliance', color: '#c9a84c', useCases: ['Contract review & redlining', 'Regulatory change monitoring', 'Due diligence automation', 'Legal brief drafting'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 4 L22 14 L33 14 L24 21 L27 32 L18 26 L9 32 L12 21 L3 14 L14 14 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.8"/></svg>) },
  { name: 'Manufacturing', color: '#00b85e', useCases: ['Predictive maintenance alerts', 'Quality defect narration', 'Supply chain risk agents', 'SOP generation & updates'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><circle cx="18" cy="18" r="8" stroke="#00b85e" strokeWidth="1.3" opacity="0.7"/><circle cx="18" cy="18" r="3" fill="#00b85e" opacity="0.8"/>{[0,60,120,180,240,300].map((a,i)=>{const r=(a*Math.PI)/180;return <line key={i} x1={18+8*Math.cos(r)} y1={18+8*Math.sin(r)} x2={18+12*Math.cos(r)} y2={18+12*Math.sin(r)} stroke="#00b85e" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>;})}</svg>) },
  { name: 'Finance & Banking', color: '#00e87a', useCases: ['Earnings report analysis', 'Fraud narrative generation', 'Credit memo automation', 'Regulatory filing drafts'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="8" width="30" height="22" rx="3" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="3" y1="14" x2="33" y2="14" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/><circle cx="10" cy="22" r="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.6"/></svg>) },
  { name: 'Retail & E-Commerce', color: '#c9a84c', useCases: ['Personalized product copy', 'Review sentiment agents', 'Dynamic pricing narratives', 'Customer service bots'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M4 8 L8 8 L12 22 L26 22 L30 12 L10 12" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/><circle cx="14" cy="27" r="2.5" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><circle cx="24" cy="27" r="2.5" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/></svg>) },
  { name: 'Human Resources', color: '#00b85e', useCases: ['JD & offer letter generation', 'Resume screening agents', 'Onboarding content AI', 'Performance review drafts'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><circle cx="18" cy="12" r="6" stroke="#00b85e" strokeWidth="1.3" opacity="0.8"/><path d="M6 30 C6 23 30 23 30 30" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.7"/></svg>) },
  { name: 'Education & EdTech', color: '#00e87a', useCases: ['Personalised tutoring agents', 'Curriculum generation', 'Assessment auto-grading', 'Student feedback AI'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 6 L33 14 L18 22 L3 14 Z" stroke="#00e87a" strokeWidth="1.3" fill="none" opacity="0.8"/><path d="M9 18 L9 26 Q18 30 27 26 L27 18" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6"/></svg>) },
  { name: 'Logistics & Supply Chain', color: '#c9a84c', useCases: ['Route optimisation reports', 'Delay prediction summaries', 'Vendor communication AI', 'Inventory reorder agents'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="2" y="14" width="22" height="14" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/><path d="M24 20 L30 20 L34 26 L34 28 L24 28 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.8"/><circle cx="8" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><circle cx="20" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><circle cx="30" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/></svg>) },
  { name: 'Real Estate', color: '#00b85e', useCases: ['Property listing generation', 'Market analysis reports', 'Lease contract drafts', 'Client matching agents'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 4 L32 16 L32 32 L4 32 L4 16 Z" stroke="#00b85e" strokeWidth="1.3" fill="none" opacity="0.7"/><rect x="13" y="22" width="10" height="10" rx="1" stroke="#00b85e" strokeWidth="1.2" opacity="0.6"/></svg>) },
];

function useCounter(target: number, decimals: number, active: boolean, delay: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      const dur = 1800, start = performance.now();
      const tick = (now: number) => { const p = Math.min((now-start)/dur,1); setVal(parseFloat(((1-Math.pow(1-p,3))*target).toFixed(decimals))); if(p<1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, decimals, delay]);
  return val;
}

const INDUSTRY_STATS = [
  { value: 9, suffix: '', label: 'Industries Served', color: '#00e87a' },
  { value: 40, suffix: '+', label: 'GenAI Use Cases', color: '#c9a84c' },
  { value: 73, suffix: '%', label: 'Avg. Task Automation', color: '#00b85e' },
  { value: 4.8, suffix: 'x', label: 'Avg. Productivity Gain', color: '#00e87a' },
];

function StatCard({ stat, index, inView }: { stat: typeof INDUSTRY_STATS[0]; index: number; inView: boolean }) {
  const dec = stat.value % 1 !== 0 ? 1 : 0;
  const val = useCounter(stat.value, dec, inView, index * 120);
  
  return (
    <motion.div className="gen-stat-card" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      style={{ borderRadius: '12px', background: 'var(--bg-surface)', border: `1px solid ${stat.color}18`, padding: '20px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.16)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${stat.color}0c, transparent 60%)`, pointerEvents: 'none' }}/>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(26px, 3vw, 40px)', color: stat.color, lineHeight: 1, marginBottom: '4px' }}>{val.toFixed(dec)}{stat.suffix}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-secondary)' }}>{stat.label}</div>
      <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: EASE }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg,transparent,${stat.color},transparent)`, transformOrigin: 'center', opacity: 0.45 }}/>
    </motion.div>
  );
}

function IndustryCard({ ind, index, inView }: { ind: typeof INDUSTRIES[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="gen-industry-card" initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      onClick={() => setOpen(o => !o)}
      style={{ borderRadius: '14px', overflow: 'hidden', background: open ? `${ind.color}08` : 'var(--bg-surface)', border: `1px solid ${open ? ind.color+'44' : ind.color+'1a'}`, boxShadow: '0 4px 16px rgba(0,0,0,0.16)' }}>
      <div style={{ height: '2px', background: `linear-gradient(90deg,${ind.color},transparent)`, opacity: open ? 0.7 : 0.35 }}/>
      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: open ? '14px' : 0 }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0, background: `${ind.color}10`, border: `1px solid ${ind.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ind.svg}</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{ind.name}</h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ind.color, opacity: 0.65, letterSpacing: '0.08em' }}>{ind.useCases.length} use cases</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: ind.color, opacity: 0.5, flexShrink: 0 }}>{open ? '↑' : '↓'}</span>
        </div>
        {open && (
          <div style={{ borderTop: `1px solid ${ind.color}18`, paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {ind.useCases.map((uc, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: ind.color, flexShrink: 0, opacity: 0.7 }}/>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{uc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function GenAIIndustries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>GEN AI BY VERTICAL</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '720px' }}>
            Specialized Gen AI Solutions<br/><span style={{ color: 'var(--accent-primary)' }}>for Various Industries.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', marginTop: '14px', maxWidth: '500px', lineHeight: 1.75 }}>Click any industry to see the specific use cases we deploy.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '48px' }} className="gen-stats-strip">
          {INDUSTRY_STATS.map((s, i) => <StatCard key={i} stat={s} index={i} inView={inView} />)}
        </div>
        <div className="gen-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {INDUSTRIES.map((ind, i) => <IndustryCard key={ind.name} ind={ind} index={i} inView={inView} />)}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .gen-stats-strip{ grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}