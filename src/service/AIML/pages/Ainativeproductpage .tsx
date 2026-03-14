import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const STYLES = `
  @keyframes ainp-pulse  { 0%,100%{opacity:.6;transform:scale(1)}  50%{opacity:.2;transform:scale(1.2)} }
  @keyframes ainp-flow   { to { stroke-dashoffset: -32; } }
  @keyframes ainp-blink  { 0%,100%{opacity:.9} 50%{opacity:.2} }
  @keyframes ainp-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  @keyframes ainp-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .ainp-float  { animation: ainp-float 5s ease-in-out infinite; }
  .ainp-blink  { animation: ainp-blink 1.8s ease-in-out infinite; }
  .ainp-flow   { animation: ainp-flow 1.1s linear infinite; }
  .ainp-pulse  { animation: ainp-pulse 2.8s ease-in-out infinite; }
  .ainp-spin   { animation: ainp-spin 18s linear infinite; transform-origin: 230px 185px; }

  .ainpe-card {
    transition: transform .28s cubic-bezier(.16,1,.3,1), border-color .28s;
    border: 1px solid rgba(10,60,35,.14); position: relative; overflow: hidden;
  }
  .ainpe-card::before {
    content:''; position:absolute; bottom:0; left:0; right:0; height:0;
    background: linear-gradient(0deg, rgba(26,110,66,0.06), transparent);
    transition: height .3s cubic-bezier(.16,1,.3,1);
  }
  .ainpe-card:hover::before { height: 100%; }
  .ainpe-card:hover { transform: translateY(-6px); border-color: rgba(26,110,66,.28); }

  .ainpe-row  { transition: padding-left .22s, background .22s; border-radius: 8px; cursor: default; }
  .ainpe-row:hover { padding-left: 8px; background: rgba(26,110,66,.04); }

  .ainpe-step { transition: transform .26s cubic-bezier(.16,1,.3,1), border-color .26s; border: 1px solid rgba(10,60,35,.14); }
  .ainpe-step:hover { transform: translateX(6px); border-color: rgba(26,110,66,.28); }

  .ainpe-pill { transition: background .2s, color .2s, border-color .2s; cursor: default; }
  .ainpe-pill:hover { background: rgba(26,110,66,.08); color: #1a6e42; border-color: rgba(26,110,66,.3); }

  .ainpe-tab { transition: background .2s, color .2s, border-color .2s; cursor: pointer; border: 1px solid rgba(10,60,35,.14); }
  .ainpe-tab.active { background: rgba(26,110,66,.1); border-color: rgba(26,110,66,.3); color: #1a6e42; }
  .ainpe-tab:not(.active):hover { border-color: rgba(26,110,66,.22); color: #0d3d22; }

  /* mobile */
  @media (max-width: 860px) {
    .hero-grid  { grid-template-columns: 1fr !important; }
    .hero-svg   { display: none !important; }
    .col2       { grid-template-columns: 1fr !important; gap: 28px !important; }
    .col4       { grid-template-columns: 1fr 1fr !important; }
    .cta-inner  { flex-direction: column !important; align-items: flex-start !important; }
    .hero-section { padding: 80px 20px 60px !important; }
    .page-section { padding-left: 20px !important; padding-right: 20px !important; }
    .how-top    { grid-template-columns: 1fr !important; gap: 20px !important; }
  }
  @media (max-width: 520px) {
    .col4 { grid-template-columns: 1fr !important; }
  }
`;

/* helpers */
function RevealClip({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return <motion.div initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true, margin: '-48px' }} transition={{ duration: 0.78, delay, ease: EASE }} style={style}>{children}</motion.div>;
}
function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-48px' }} transition={{ duration: 0.62, delay, ease: EASE }} style={style}>{children}</motion.div>;
}
function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-48px' }} transition={{ duration: 0.55, delay, ease: EASE }} style={style}>{children}</motion.div>;
}
function SectionLabel({ text }: { text: string }) {
  return (
    <RevealClip delay={0}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#1a6e42', letterSpacing: '0.22em' }}>{text}</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(26,110,66,.3),transparent)' }} />
      </div>
    </RevealClip>
  );
}
function Divider() {
  return <FadeIn><div style={{ height: 1, background: 'rgba(26,110,66,.08)', margin: '72px 0' }} /></FadeIn>;
}

/* ── HERO SVG: AI-native layered stack with orbiting data ring ── */
function HeroSVG() {
  const G = '#1a6e42';
  return (
    <div className="hero-svg" style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
      <svg className="ainp-float" viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
        {/* Background dot-grid */}
        {[0,1,2,3,4,5,6,7,8].map(c=>[0,1,2,3,4,5,6].map(r=>(
          <circle key={`${c}-${r}`} cx={c*52+10} cy={r*52+10} r="1.2" fill={G} opacity="0.06"/>
        )))}

        {/* ── Orbital ring ── */}
        <circle cx="210" cy="185" r="130" stroke={G} strokeWidth="0.8" strokeDasharray="6 8" opacity="0.12" className="ainp-spin"/>

        {/* ── Layer 4 — INFRA ── */}
        <rect x="55" y="290" width="310" height="42" rx="9" fill="rgba(26,110,66,0.04)" stroke={G} strokeWidth="1" opacity="0.45"/>
        <text x="210" y="308" textAnchor="middle" fill={G} fontSize="8" fontFamily="monospace" opacity="0.55">INFRA & MLOPS</text>
        <text x="210" y="322" textAnchor="middle" fill={G} fontSize="6.5" fontFamily="monospace" opacity="0.32">Training · Serving · Monitoring · Drift detection</text>

        {/* ── Layer 3 — DATA ── */}
        <rect x="38" y="236" width="344" height="42" rx="9" fill="rgba(26,110,66,0.05)" stroke={G} strokeWidth="1.1" opacity="0.58"/>
        <text x="210" y="255" textAnchor="middle" fill={G} fontSize="8" fontFamily="monospace" opacity="0.65">DATA LAYER</text>
        <text x="210" y="269" textAnchor="middle" fill={G} fontSize="6.5" fontFamily="monospace" opacity="0.35">Embeddings · Vectors · Feature stores · Pipelines</text>

        {/* ── Layer 2 — AI CORE ── (most prominent) */}
        <rect x="20" y="168" width="380" height="54" rx="10" fill="rgba(26,110,66,0.08)" stroke={G} strokeWidth="1.6" opacity="0.85"/>
        {/* Pulsing inner ring */}
        <rect x="28" y="174" width="364" height="42" rx="8" stroke={G} strokeWidth="0.7" strokeDasharray="4 4" opacity="0.25" className="ainp-pulse"/>
        <text x="210" y="192" textAnchor="middle" fill={G} fontSize="9.5" fontFamily="monospace" fontWeight="bold" opacity="0.9">AI CORE</text>
        <text x="210" y="207" textAnchor="middle" fill={G} fontSize="7" fontFamily="monospace" opacity="0.48">Models · Inference · Orchestration · Reasoning</text>
        {/* Neural dots */}
        {[50,100,150,200,250,300,350].map((x,i)=>(
          <circle key={i} cx={x+10} cy="187" r="2.5" fill={G} opacity={0.15+i*0.05}/>
        ))}
        {/* Connecting lines between neural dots */}
        {[0,1,2,3,4,5].map(i=>(
          <line key={i} x1={60+i*50} y1="187" x2={110+i*50} y2="187" stroke={G} strokeWidth="0.6" opacity="0.15"/>
        ))}

        {/* ── Layer 1 — PRODUCT ── */}
        <rect x="38" y="104" width="344" height="52" rx="10" fill="rgba(26,110,66,0.06)" stroke={G} strokeWidth="1.3" opacity="0.75"/>
        <text x="210" y="124" textAnchor="middle" fill={G} fontSize="9" fontFamily="monospace" opacity="0.8">PRODUCT LAYER</text>
        <text x="210" y="140" textAnchor="middle" fill={G} fontSize="6.5" fontFamily="monospace" opacity="0.38">UI · API · Business logic · User-facing features</text>
        {/* Small code brackets icon */}
        <text x="75" y="128" fill={G} fontSize="14" fontFamily="monospace" opacity="0.2">{ }</text>
        <text x="335" y="128" fill={G} fontSize="14" fontFamily="monospace" opacity="0.2">{'>_'}</text>

        {/* ── Vertical connectors between layers ── */}
        {[156, 222, 278].map((y,i)=>(
          <g key={i}>
            <line x1="210" y1={y} x2="210" y2={y+12} stroke={G} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" className="ainp-flow"/>
            <polygon points={`206,${y+10} 210,${y+16} 214,${y+10}`} fill={G} opacity="0.3"/>
          </g>
        ))}

        {/* ── Feedback loop arc on right ── */}
        <path d="M368 310 Q408 310 408 185 Q408 104 370 104" stroke={G} strokeWidth="1" strokeDasharray="4 4" opacity="0.18" fill="none" className="ainp-flow"/>
        <text x="415" y="210" fill={G} fontSize="6" fontFamily="monospace" opacity="0.22" transform="rotate(90,415,210)">learns →</text>

        {/* ── Animated data packets flowing up on left ── */}
        {[0,1,2].map(i=>(
          <circle key={i} r="3" fill={G} opacity="0.6">
            <animateMotion dur={`${2.2+i*0.6}s`} repeatCount="indefinite" begin={`${i*0.7}s`}
              path="M 30 310 L 30 104"/>
            <animate attributeName="opacity" values="0;0.7;0.7;0" dur={`${2.2+i*0.6}s`} repeatCount="indefinite" begin={`${i*0.7}s`}/>
          </circle>
        ))}

        {/* ── Side labels ── */}
        <text x="16" y="190" fill={G} fontSize="6" fontFamily="monospace" opacity="0.25" transform="rotate(-90,16,190)">Intelligence</text>

        {/* ── Bottom tag ── */}
        <text x="210" y="350" textAnchor="middle" fill={G} fontSize="6.5" fontFamily="monospace" opacity="0.25" letterSpacing="2">AI-NATIVE  ·  SELF-IMPROVING  ·  REVENUE-GENERATING</text>
      </svg>
    </div>
  );
}

/* ── HERO SECTION ── */
function HeroSection() {
  return (
    <section className="hero-section" style={{ padding: 'clamp(80px,10vh,110px) clamp(20px,4vw,32px) clamp(60px,8vh,88px)', borderBottom: '1px solid rgba(26,110,66,0.08)', background: '#fff', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} transition={{ duration:.5, delay:.1, ease:EASE }}
          style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'5px 14px', borderRadius:100, border:'1px solid rgba(26,110,66,.22)', background:'rgba(26,110,66,.04)', marginBottom:28 }}>
          <span className="ainp-blink" style={{ width:6, height:6, borderRadius:'50%', background:'#1a6e42', display:'inline-block' }}/>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.18em', color:'#1a6e42', opacity:.85 }}>PRODUCT ENGINEERING</span>
        </motion.div>

        <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 52px', alignItems:'center' }}>
          <div>
            {['AI-Native Product', 'Engineering.'].map((line,li)=>(
              <div key={li} style={{ overflow:'hidden', marginBottom: li===0?4:26 }}>
                <motion.h1 initial={{ y:'100%' }} animate={{ y:0 }} transition={{ duration:.82, delay:.22+li*.14, ease:EASE }}
                  style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(34px,5vw,70px)', color: li===0?'#0d3d22':'#1a6e42', lineHeight:1.02, margin:0, letterSpacing:'-0.02em' }}>
                  {line}
                </motion.h1>
              </div>
            ))}
            <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6, delay:.52, ease:EASE }}
              style={{ fontFamily:'var(--font-body)', fontSize:'clamp(13px,1.4vw,17px)', color:'#3d6b50', lineHeight:1.82, margin:'0 0 28px', maxWidth:460 }}>
              Building software products where AI is a core capability — not a feature bolt-on. We help businesses generate new revenue streams through technology assets that get smarter over time.
            </motion.p>
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.55, delay:.64, ease:EASE }}
              style={{ display:'flex', flexWrap:'wrap', gap:18, marginBottom:32 }}>
              {['AI as core functionality','Revenue-generating products','Self-improving systems','Shipped — not prototyped'].map((t,i)=>(
                <motion.div key={i} initial={{ opacity:0, scale:.82 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.34, delay:.68+i*.08, ease:EASE }}
                  style={{ display:'flex', alignItems:'center', gap:7 }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:'#1a6e42', opacity:.5, flexShrink:0 }}/>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:'#3d7a55', letterSpacing:'0.06em' }}>{t}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.55, delay:1.0, ease:EASE }}
              style={{ display:'flex', gap:28, paddingTop:24, borderTop:'1px solid rgba(26,110,66,.1)', flexWrap:'wrap' }}>
              {[{val:'New',label:'Revenue streams'},{val:'Durable',label:'Competitive moat'},{val:'10×',label:'Throughput per person'}].map((s,i)=>(
                <div key={i}>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:22, color:'#1a6e42', lineHeight:1, marginBottom:4 }}>{s.val}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.14em', color:'#3d7a55', opacity:.6 }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div initial={{ opacity:0, x:28 }} animate={{ opacity:1, x:0 }} transition={{ duration:.85, delay:.32, ease:EASE }}
            style={{ display:'flex', justifyContent:'center' }}>
            <HeroSVG/>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── REST OF PAGE DATA ── */
const DIFF_ROWS = [
  { aspect:'AI role',     native:"Core — the product doesn't function without it",          augmented:'Feature — bolted on to improve existing UX' },
  { aspect:'Architecture',native:'Designed around model capabilities and data flows',       augmented:'Existing architecture with AI endpoints added' },
  { aspect:'Improvement', native:'Gets smarter with usage through built-in feedback loops', augmented:'Static — same performance year one and year five' },
  { aspect:'Moat',        native:'Proprietary data + model creates durable competitive advantage', augmented:'Competitor replicates by swapping in same API' },
  { aspect:'Revenue',     native:'New revenue stream — the AI capability is the product',   augmented:'Defends existing revenue by improving product slightly' },
];

const BUILDS = [
  { num:'01', title:'Intelligent Workflow Engines',
    body:'Replacing rule-based process automation with AI that understands intent, handles exceptions, and routes work based on context — not rigid decision trees.',
    pills:['LLM orchestration','Multi-step reasoning','Conditional routing','Exception handling'],
    svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><rect x="4" y="20" width="14" height="12" rx="3" stroke="#1a6e42" strokeWidth="1.1" opacity="0.6"/><rect x="22" y="8" width="14" height="12" rx="3" stroke="#1a6e42" strokeWidth="1.2" opacity="0.75"/><rect x="22" y="32" width="14" height="12" rx="3" stroke="#1a6e42" strokeWidth="1.2" opacity="0.65"/><rect x="38" y="20" width="10" height="12" rx="3" stroke="#1a6e42" strokeWidth="1.1" opacity="0.55"/><line x1="18" y1="26" x2="22" y2="18" stroke="#1a6e42" strokeWidth="1" opacity="0.4"/><line x1="18" y1="26" x2="22" y2="38" stroke="#1a6e42" strokeWidth="1" opacity="0.35"/><line x1="36" y1="14" x2="38" y2="24" stroke="#1a6e42" strokeWidth="1" opacity="0.3"/><line x1="36" y1="38" x2="38" y2="28" stroke="#1a6e42" strokeWidth="1" opacity="0.3"/><circle cx="26" cy="26" r="3" fill="#1a6e42" opacity="0.5"/></svg>) },
  { num:'02', title:'Vertical AI Applications',
    body:"Purpose-built AI applications for specific industry problems — underwriting, diagnostics support, due diligence, inventory intelligence — where generic tools can't be fine-tuned to the domain.",
    pills:['Domain fine-tuning','RAG on proprietary data','Structured output extraction','Confidence scoring'],
    svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><path d="M26 6 L48 18 L48 34 L26 46 L4 34 L4 18 Z" stroke="#1a6e42" strokeWidth="1.3" fill="none" opacity="0.55"/><circle cx="26" cy="26" r="10" stroke="#1a6e42" strokeWidth="1.2" opacity="0.7"/><circle cx="26" cy="26" r="4" stroke="#1a6e42" strokeWidth="1" opacity="0.8"/><circle cx="26" cy="26" r="1.5" fill="#1a6e42" opacity="0.9"/><line x1="26" y1="16" x2="26" y2="18" stroke="#1a6e42" strokeWidth="1.2" opacity="0.4"/><line x1="26" y1="34" x2="26" y2="36" stroke="#1a6e42" strokeWidth="1.2" opacity="0.4"/><line x1="16" y1="26" x2="18" y2="26" stroke="#1a6e42" strokeWidth="1.2" opacity="0.4"/><line x1="34" y1="26" x2="36" y2="26" stroke="#1a6e42" strokeWidth="1.2" opacity="0.4"/></svg>) },
  { num:'03', title:'AI-Enhanced Data Products',
    body:'Products that turn raw data — documents, emails, transactions, sensor readings — into structured intelligence: summaries, classifications, anomalies, forecasts.',
    pills:['Document intelligence','Anomaly detection','Forecasting models','Classification pipelines'],
    svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><rect x="4" y="8" width="14" height="36" rx="3" stroke="#1a6e42" strokeWidth="1.1" opacity="0.4" strokeDasharray="2 2"/><path d="M22 8 L22 44" stroke="#1a6e42" strokeWidth="0.7" opacity="0.15"/><rect x="22" y="14" width="26" height="24" rx="3" stroke="#1a6e42" strokeWidth="1.3" opacity="0.7"/><path d="M28 32 L32 24 L36 28 L40 20 L44 26" stroke="#1a6e42" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.65"/><circle cx="28" cy="32" r="1.5" fill="#1a6e42" opacity="0.5"/><circle cx="44" cy="26" r="1.5" fill="#1a6e42" opacity="0.6"/><path d="M18 20 L22 26" stroke="#1a6e42" strokeWidth="1.1" opacity="0.5"/><text x="11" y="28" textAnchor="middle" fill="#1a6e42" fontSize="6" fontFamily="monospace" opacity="0.45">raw</text></svg>) },
  { num:'04', title:'Agentic Systems & Copilots',
    body:"Systems that don't just answer questions — they take actions. Multi-step AI agents that research, decide, act and report back. Copilots that live inside your existing tools.",
    pills:['Multi-agent orchestration','Tool calling & APIs','Long-horizon planning','Copilot integrations'],
    svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><circle cx="26" cy="16" r="8" stroke="#1a6e42" strokeWidth="1.3" opacity="0.8"/><text x="26" y="19" textAnchor="middle" fill="#1a6e42" fontSize="6" fontFamily="monospace" opacity="0.75">AI</text><rect x="6" y="34" width="12" height="10" rx="2" stroke="#1a6e42" strokeWidth="1" opacity="0.5"/><rect x="20" y="38" width="12" height="10" rx="2" stroke="#1a6e42" strokeWidth="1" opacity="0.5"/><rect x="34" y="34" width="12" height="10" rx="2" stroke="#1a6e42" strokeWidth="1" opacity="0.5"/><line x1="22" y1="24" x2="12" y2="34" stroke="#1a6e42" strokeWidth="0.9" opacity="0.35"/><line x1="26" y1="24" x2="26" y2="38" stroke="#1a6e42" strokeWidth="0.9" opacity="0.35"/><line x1="30" y1="24" x2="40" y2="34" stroke="#1a6e42" strokeWidth="0.9" opacity="0.35"/><text x="12" y="41" textAnchor="middle" fill="#1a6e42" fontSize="5" fontFamily="monospace" opacity="0.4">CRM</text><text x="26" y="45" textAnchor="middle" fill="#1a6e42" fontSize="5" fontFamily="monospace" opacity="0.4">Email</text><text x="40" y="41" textAnchor="middle" fill="#1a6e42" fontSize="5" fontFamily="monospace" opacity="0.4">ERP</text></svg>) },
];

const STEPS = [
  { num:'01', phase:'Opportunity scoping',    dur:'1 wk',        desc:'We identify the highest-leverage AI opportunity in your business — not the most technically exciting one.' },
  { num:'02', phase:'Data & feasibility audit',dur:'1–2 wks',   desc:"AI without data is a prototype. We assess what data you have, what quality it's at, and what's achievable with it today." },
  { num:'03', phase:'MVP architecture',        dur:'1–2 wks',   desc:'Model selection, infra design, data pipeline spec, product UX. All decided before the first model is called in production.' },
  { num:'04', phase:'Build & iterate',         dur:'Sprint cycles', desc:'Working product every sprint. We ship fast, measure outcomes, and tune — models and product decisions together.' },
  { num:'05', phase:'MLOps & productionisation',dur:'Ongoing',  desc:"Monitoring, drift detection, retraining pipelines, A/B testing. The product is not launched — it's operated." },
];

const STACK = [
  { label:'Foundation Models', items:['GPT-4o','Claude 3.5','Gemini 1.5','Llama 3','Mistral','Cohere'] },
  { label:'Orchestration',     items:['LangChain','LlamaIndex','DSPy','CrewAI','custom pipelines'] },
  { label:'Vector & Search',   items:['Pinecone','Weaviate','pgvector','Elasticsearch','Qdrant'] },
  { label:'MLOps',             items:['MLflow','Weights & Biases','Arize','BentoML','Seldon'] },
  { label:'Data',              items:['dbt','Airflow','Spark','Kafka','Snowflake','ClickHouse'] },
  { label:'Infra',             items:['AWS SageMaker','GCP Vertex','Azure AI','Modal','Replicate'] },
];

const OUTCOMES = [
  { val:'New',    label:'Revenue streams', sub:"Products that generate income independently of headcount" },
  { val:'Durable',label:'Competitive moat',sub:"Proprietary data + fine-tuned models competitors can't replicate" },
  { val:'10×',   label:'Throughput per person', sub:'AI handles volume; humans handle judgement' },
  { val:'Always', label:'Getting smarter',  sub:'Usage data improves models continuously' },
];

/* ── REST OF SECTIONS ── */
function DifferenceSection() {
  return (
    <section className="page-section" style={{ padding: 'clamp(56px,8vw,100px) clamp(20px,4vw,32px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="AI-NATIVE VS AI-AUGMENTED"/>
        <div style={{ overflow:'hidden', marginBottom:16 }}><RevealClip delay={0.06}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3.2vw,44px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>"AI-powered" is not the same as AI-native.</h2>
        </RevealClip></div>
        <FadeUp delay={0.16} style={{ marginBottom:40 }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:14.5, color:'#3d6b50', lineHeight:1.82, margin:'12px 0 0', maxWidth:560 }}>
            Most software with "AI" in the marketing is AI-augmented. AI-native is a fundamentally different architecture.
          </p>
        </FadeUp>
        <FadeIn delay={0.1}>
          <div style={{ display:'grid', gridTemplateColumns:'140px 1fr 1fr', gap:'0 20px', padding:'10px 0', borderBottom:'1px solid rgba(26,110,66,.1)', marginBottom:4 }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:9.5, color:'#3d7a55', opacity:.5, letterSpacing:'0.12em' }}>ASPECT</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:9.5, color:'#1a6e42', opacity:.75, letterSpacing:'0.12em' }}>AI-NATIVE</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:9.5, color:'#3d7a55', opacity:.45, letterSpacing:'0.12em' }}>AI-AUGMENTED</span>
          </div>
        </FadeIn>
        {DIFF_ROWS.map((r,i)=>(
          <FadeUp key={i} delay={0.06+i*.08}>
            <div style={{ display:'grid', gridTemplateColumns:'140px 1fr 1fr', gap:'0 20px', padding:'16px 0', borderBottom:'1px solid rgba(26,110,66,.06)', alignItems:'start' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:9.5, color:'#3d7a55', opacity:.55, letterSpacing:'0.08em', paddingTop:2 }}>{r.aspect}</span>
              <span style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'#0d3d22', lineHeight:1.6 }}>{r.native}</span>
              <span style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'#3d6b50', lineHeight:1.6, opacity:.65 }}>{r.augmented}</span>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function WhatWeBuildSection() {
  return (
    <section className="page-section" style={{ padding: '0 clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="WHAT WE BUILD"/>
        <div style={{ overflow:'hidden', marginBottom:10 }}><RevealClip delay={0.06}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3vw,42px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>Four types of AI-native products.</h2>
        </RevealClip></div>
        <FadeUp delay={0.16} style={{ marginBottom:48 }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:14.5, color:'#3d6b50', lineHeight:1.82, maxWidth:520, margin:'10px 0 0' }}>
            Each one creates a compounding asset — the longer it runs, the more data it collects, and the better it gets.
          </p>
        </FadeUp>
        <div className="col2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {BUILDS.map((b,i)=>(
            <FadeUp key={i} delay={0.08+i*.09}>
              <div className="ainpe-card" style={{ padding:'24px', borderRadius:14, background:'#fff' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                  <div>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'#1a6e42', opacity:.6, letterSpacing:'0.12em', display:'block', marginBottom:8 }}>{b.num}</span>
                    <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15.5, color:'#0d3d22', margin:0, lineHeight:1.25, maxWidth:200 }}>{b.title}</h3>
                  </div>
                  <div style={{ opacity:.65, flexShrink:0 }}>{b.svg}</div>
                </div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'#3d6b50', lineHeight:1.75, margin:'0 0 18px' }}>{b.body}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                  {b.pills.map((p,pi)=>(
                    <span key={pi} className="ainpe-pill" style={{ fontFamily:'var(--font-mono)', fontSize:9.5, padding:'3px 9px', borderRadius:100, border:'1px solid rgba(26,110,66,.18)', color:'#3d7a55' }}>{p}</span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeSection() {
  return (
    <section className="page-section" style={{ padding: '0 clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="HOW WE WORK"/>
        <div className="how-top" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'36px 72px', alignItems:'start', marginBottom:36 }}>
          <div>
            <div style={{ overflow:'hidden', marginBottom:8 }}><RevealClip delay={0.06}>
              <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3vw,40px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>Data first. Ship second. Operate always.</h2>
            </RevealClip></div>
            <FadeUp delay={0.18}><p style={{ fontFamily:'var(--font-body)', fontSize:14.5, color:'#3d6b50', lineHeight:1.82, margin:'14px 0 0', maxWidth:400 }}>Most AI projects fail between proof-of-concept and production. We design for production from the first conversation.</p></FadeUp>
          </div>
          <FadeUp delay={0.22}><p style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'#3d7a55', lineHeight:1.8, margin:0, borderLeft:'2px solid rgba(26,110,66,.22)', paddingLeft:18 }}>"The biggest risk in AI product development isn't the model — it's discovering at launch that the data you assumed existed doesn't."</p></FadeUp>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {STEPS.map((s,i)=>(
            <FadeUp key={i} delay={0.1+i*.09}>
              <div className="ainpe-step" style={{ padding:'15px 18px', borderRadius:12, background:'#fff', display:'flex', gap:14, alignItems:'flex-start' }}>
                <div style={{ width:26, height:26, borderRadius:'50%', border:'1px solid rgba(26,110,66,.28)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'#1a6e42', opacity:.8 }}>{s.num}</span>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'baseline', gap:9, marginBottom:3 }}>
                    <span style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:13.5, color:'#0d3d22' }}>{s.phase}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:9.5, color:'#3d7a55', opacity:.55 }}>{s.dur}</span>
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'#3d6b50', margin:0, lineHeight:1.65 }}>{s.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechSection() {
  return (
    <section className="page-section" style={{ padding: '0 clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="AI STACK"/>
        <div style={{ overflow:'hidden', marginBottom:44 }}><RevealClip delay={0.06}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3vw,40px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>Model-agnostic. Best-tool-for-the-outcome.</h2>
        </RevealClip></div>
        <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {STACK.map((row,ri)=>(
            <FadeUp key={ri} delay={0.06+ri*.07}>
              <div style={{ display:'grid', gridTemplateColumns:'140px 1fr', gap:'0 28px', padding:'15px 0', borderBottom:'1px solid rgba(26,110,66,.08)', alignItems:'center' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:9.5, color:'#3d7a55', opacity:.55, letterSpacing:'0.12em' }}>{row.label.toUpperCase()}</span>
                <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                  {row.items.map((item,ii)=>(
                    <span key={ii} style={{ fontFamily:'var(--font-body)', fontSize:13, color:'#3d6b50', padding:'3px 9px', borderRadius:6, background:'rgba(26,110,66,.04)', border:'1px solid rgba(26,110,66,.12)' }}>{item}</span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section className="page-section" style={{ padding: '0 clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="OUTCOMES"/>
        <div style={{ overflow:'hidden', marginBottom:44 }}><RevealClip delay={0.06}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3vw,40px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>AI as a business asset, not a cost centre.</h2>
        </RevealClip></div>
        <div className="col4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
          {OUTCOMES.map((o,i)=>(
            <motion.div key={i} initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-40px' }} transition={{ duration:.58, delay:i*.1, ease:EASE }}
              style={{ padding:'22px 18px', borderRadius:14, background:'#fff', border:'1px solid rgba(26,110,66,.14)' }}>
              <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:32, color:'#1a6e42', margin:'0 0 5px', lineHeight:1 }}>{o.val}</p>
              <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:13.5, color:'#0d3d22', margin:'0 0 7px' }}>{o.label}</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:12, color:'#3d7a55', margin:0, lineHeight:1.6, opacity:.75 }}>{o.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="page-section" style={{ padding: '0 clamp(20px,4vw,32px) clamp(72px,10vw,120px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <FadeUp>
          <div style={{ padding:'clamp(28px,4vw,52px) clamp(22px,4vw,56px)', borderRadius:18, background:'#f6fbf8', border:'1px solid rgba(26,110,66,.18)' }}>
            <div className="cta-inner" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:32, flexWrap:'wrap' }}>
              <div>
                <div style={{ overflow:'hidden', marginBottom:8 }}><RevealClip delay={0.06}>
                  <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(20px,2.5vw,32px)', color:'#0d3d22', margin:0, lineHeight:1.15 }}>Ready to build a product that gets smarter?</h2>
                </RevealClip></div>
                <FadeUp delay={0.16}><p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'#3d6b50', margin:0, lineHeight:1.7, maxWidth:440 }}>Tell us your domain, your data, and the outcome you're trying to create. We'll come back with an honest assessment of what's achievable.</p></FadeUp>
              </div>
              <FadeUp delay={0.22}>
                <a href="#contact" style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'#fff', background:'#1a6e42', border:'1px solid #1a6e42', padding:'13px 28px', borderRadius:8, textDecoration:'none', display:'inline-block', flexShrink:0, transition:'background .22s,color .22s' }}
                  onMouseEnter={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='#1a6e42';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='#1a6e42';e.currentTarget.style.color='#fff';}}>
                  Scope your AI product →
                </a>
              </FadeUp>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export function AINativeProductPage() {
  return (
    <div style={{ background:'#fff', minHeight:'100vh' }}>
      <style>{STYLES}</style>
      <HeroSection/>
      <DifferenceSection/>
      <Divider/>
      <WhatWeBuildSection/>
      <Divider/>
      <HowWeSection/>
      <Divider/>
      <TechSection/>
      <Divider/>
      <OutcomesSection/>
      <CTASection/>
    </div>
  );
}