import { motion } from 'framer-motion';
const EASE = [0.16, 1, 0.3, 1] as const;
const G = '#1a6e42';

const STYLES = `
  @keyframes api-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  @keyframes api-blink { 0%,100%{opacity:.9} 50%{opacity:.2} }
  @keyframes api-packet{ to { stroke-dashoffset: -28; } }
  .api-float  { animation: api-float 5s ease-in-out infinite; }
  .api-blink  { animation: api-blink 1.8s ease-in-out infinite; }
  .api-packet { animation: api-packet 1s linear infinite; }

  .api-card { transition: transform .28s cubic-bezier(.16,1,.3,1), border-color .28s, background .28s; border: 1px solid rgba(10,60,35,.14); position: relative; overflow: hidden; }
  .api-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:0; background: linear-gradient(180deg,rgba(26,110,66,.06),transparent); transition: width .32s cubic-bezier(.16,1,.3,1); }
  .api-card:hover::before { width:100%; }
  .api-card:hover { transform: translateY(-5px); border-color: rgba(26,110,66,.28); }

  .api-row    { transition: padding-left .22s, background .22s; border-radius: 8px; cursor: default; }
  .api-row:hover { padding-left: 8px; background: rgba(26,110,66,.04); }

  .api-pillar { transition: transform .26s cubic-bezier(.16,1,.3,1), border-color .26s; border: 1px solid rgba(10,60,35,.14); }
  .api-pillar:hover { transform: translateX(6px); border-color: rgba(26,110,66,.28); }

  .api-chip   { transition: background .2s, color .2s, border-color .2s; }
  .api-chip:hover { background: rgba(26,110,66,.1); color: #1a6e42; border-color: rgba(26,110,66,.3); }

  @media (max-width: 860px) {
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-svg  { display: none !important; }
    .col2      { grid-template-columns: 1fr !important; gap: 28px !important; }
    .col4      { grid-template-columns: 1fr 1fr !important; }
    .cta-inner { flex-direction: column !important; align-items: flex-start !important; }
    .hero-section { padding: 80px 20px 60px !important; }
    .page-section { padding-left: 20px !important; padding-right: 20px !important; }
    .how-top   { grid-template-columns: 1fr !important; gap: 20px !important; }
  }
  @media (max-width: 520px) { .col4 { grid-template-columns: 1fr !important; } }
`;

function RevealClip({ children, delay=0, style={} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return <motion.div initial={{ clipPath:'inset(0 100% 0 0)' }} whileInView={{ clipPath:'inset(0 0% 0 0)' }} viewport={{ once:true, margin:'-48px' }} transition={{ duration:.78, delay, ease:EASE }} style={style}>{children}</motion.div>;
}
function FadeUp({ children, delay=0, style={} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-48px' }} transition={{ duration:.6, delay, ease:EASE }} style={style}>{children}</motion.div>;
}
function FadeIn({ children, delay=0, style={} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true, margin:'-48px' }} transition={{ duration:.55, delay, ease:EASE }} style={style}>{children}</motion.div>;
}
function SectionLabel({ text }: { text: string }) {
  return (
    <RevealClip delay={0}>
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:22 }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:G, letterSpacing:'0.22em' }}>{text}</span>
        <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(26,110,66,.3),transparent)' }}/>
      </div>
    </RevealClip>
  );
}
function Divider() {
  return <FadeIn><div style={{ height:1, background:'rgba(26,110,66,.08)', margin:'72px 0' }}/></FadeIn>;
}

/* ── HERO SVG: hub-and-spoke integration topology with animated pulses ── */
function HeroSVG() {
  const nodes = [
    { cx:80,  cy:72,  label:'ERP' },
    { cx:350, cy:72,  label:'CRM' },
    { cx:52,  cy:190, label:'Finance' },
    { cx:378, cy:190, label:'Data WH' },
    { cx:80,  cy:308, label:'3rd Party' },
    { cx:350, cy:308, label:'Mobile App' },
  ];
  const hub = { cx:215, cy:190 };

  return (
    <div className="hero-svg" style={{ position:'relative', width:'100%', maxWidth:440 }}>
      <svg className="api-float" viewBox="0 0 430 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'auto' }}>
        {/* bg grid */}
        {[0,1,2,3,4,5,6,7].map(c=>[0,1,2,3,4,5,6].map(r=>(
          <circle key={`${c}-${r}`} cx={c*55+15} cy={r*55+15} r="1.2" fill={G} opacity="0.05"/>
        )))}

        {/* outer ring around hub */}
        <circle cx={hub.cx} cy={hub.cy} r="88" stroke={G} strokeWidth="0.7" strokeDasharray="5 7" opacity="0.1"/>

        {/* connector lines */}
        {nodes.map((n,i)=>(
          <line key={i}
            x1={n.cx} y1={n.cy}
            x2={hub.cx} y2={hub.cy}
            stroke={G} strokeWidth="1" strokeDasharray="5 4" opacity="0.2"
            className="api-packet"
            style={{ animationDelay:`${i*0.18}s` }}
          />
        ))}

        {/* animated packets along each spoke */}
        {nodes.map((n,i)=>(
          <circle key={i} r="3.5" fill={G} opacity="0.65">
            <animateMotion dur={`${1.6+i*0.22}s`} repeatCount="indefinite" begin={`${i*0.28}s`}
              path={`M${n.cx},${n.cy} L${hub.cx},${hub.cy}`}/>
            <animate attributeName="opacity" values="0;0.75;0.75;0" dur={`${1.6+i*0.22}s`} repeatCount="indefinite" begin={`${i*0.28}s`}/>
          </circle>
        ))}

        {/* node boxes */}
        {nodes.map((n,i)=>(
          <g key={i}>
            <rect x={n.cx-34} y={n.cy-18} width="68" height="36" rx="8" fill="rgba(26,110,66,.05)" stroke={G} strokeWidth="1.1" opacity="0.5"/>
            <text x={n.cx} y={n.cy+5} textAnchor="middle" fill={G} fontSize="8" fontFamily="monospace" opacity="0.7">{n.label}</text>
            {/* status dot */}
            <circle cx={n.cx+26} cy={n.cy-10} r="3" fill={G} opacity="0.45" className="api-blink" style={{ animationDelay:`${i*0.3}s` }}/>
          </g>
        ))}

        {/* central API hub */}
        <circle cx={hub.cx} cy={hub.cy} r="44" fill="rgba(26,110,66,.07)" stroke={G} strokeWidth="1.8" opacity="0.85"/>
        <circle cx={hub.cx} cy={hub.cy} r="30" stroke={G} strokeWidth="1" strokeDasharray="4 4" opacity="0.25"/>
        <circle cx={hub.cx} cy={hub.cy} r="8"  fill={G} opacity="0.6"/>
        <text x={hub.cx} y={hub.cy-16} textAnchor="middle" fill={G} fontSize="8.5" fontFamily="monospace" fontWeight="bold" opacity="0.85">API HUB</text>
        <text x={hub.cx} y={hub.cy+26} textAnchor="middle" fill={G} fontSize="6.5" fontFamily="monospace" opacity="0.4">Unified layer</text>

        {/* status badges */}
        <g transform="translate(12,18)">
          <rect width="88" height="22" rx="11" fill="rgba(26,110,66,.07)" stroke={G} strokeWidth="1" opacity="0.5"/>
          <circle cx="14" cy="11" r="3.5" fill={G} opacity="0.55" className="api-blink"/>
          <text x="24" y="15" fill={G} fontSize="7" fontFamily="monospace" opacity="0.7">LIVE SYNC</text>
        </g>
        <g transform="translate(310,18)">
          <rect width="98" height="22" rx="11" fill="rgba(26,110,66,.07)" stroke={G} strokeWidth="1" opacity="0.5"/>
          <circle cx="14" cy="11" r="3.5" fill={G} opacity="0.55" className="api-blink" style={{ animationDelay:'0.9s' }}/>
          <text x="24" y="15" fill={G} fontSize="7" fontFamily="monospace" opacity="0.7">6 CONNECTED</text>
        </g>

        <text x="215" y="368" textAnchor="middle" fill={G} fontSize="6.5" fontFamily="monospace" opacity="0.22" letterSpacing="1.5">
          UNIFIED  ·  REAL-TIME  ·  GOVERNED
        </text>
      </svg>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero-section" style={{ padding:'clamp(80px,10vh,110px) clamp(20px,4vw,32px) clamp(60px,8vh,88px)', borderBottom:'1px solid rgba(26,110,66,.08)', background:'#fff', overflow:'hidden' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} transition={{ duration:.5, delay:.1, ease:EASE }}
          style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'5px 14px', borderRadius:100, border:'1px solid rgba(26,110,66,.22)', background:'rgba(26,110,66,.04)', marginBottom:28 }}>
          <span className="api-blink" style={{ width:6, height:6, borderRadius:'50%', background:G, display:'inline-block' }}/>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.18em', color:G, opacity:.85 }}>ENTERPRISE INTEGRATION</span>
        </motion.div>

        <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 52px', alignItems:'center' }}>
          <div>
            {['API-led Integration', 'Ecosystems.'].map((line,li)=>(
              <div key={li} style={{ overflow:'hidden', marginBottom:li===0?4:26 }}>
                <motion.h1 initial={{ y:'100%' }} animate={{ y:0 }} transition={{ duration:.82, delay:.22+li*.14, ease:EASE }}
                  style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(34px,5vw,70px)', color:li===0?'#0d3d22':G, lineHeight:1.02, margin:0, letterSpacing:'-0.02em' }}>
                  {line}
                </motion.h1>
              </div>
            ))}
            <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6, delay:.52, ease:EASE }}
              style={{ fontFamily:'var(--font-body)', fontSize:'clamp(13px,1.4vw,17px)', color:'#3d6b50', lineHeight:1.82, margin:'0 0 28px', maxWidth:460 }}>
              Secure, unified data layers and interoperability across ERP, CRM, finance and third-party systems — eliminating silos and enabling real-time enterprise visibility.
            </motion.p>
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.55, delay:.64, ease:EASE }}
              style={{ display:'flex', flexWrap:'wrap', gap:18, marginBottom:32 }}>
              {['REST & GraphQL','ERP / CRM connectors','Real-time data fabric','Event-driven pipelines'].map((t,i)=>(
                <motion.div key={i} initial={{ opacity:0, scale:.82 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.34, delay:.68+i*.08, ease:EASE }}
                  style={{ display:'flex', alignItems:'center', gap:7 }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:G, opacity:.5, flexShrink:0 }}/>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:'#3d7a55', letterSpacing:'0.06em' }}>{t}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.55, delay:1.0, ease:EASE }}
              style={{ display:'flex', gap:28, paddingTop:24, borderTop:'1px solid rgba(26,110,66,.1)', flexWrap:'wrap' }}>
              {[{val:'Single',label:'Source of truth'},{val:'Real-time',label:'Data propagation'},{val:'Zero',label:'Manual syncs'}].map((s,i)=>(
                <div key={i}>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:20, color:G, lineHeight:1, marginBottom:4 }}>{s.val}</div>
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

/* rest of page data & sections */
const PAINS = [
  { icon:'🗃', head:'Data locked in silos',      body:'ERP, CRM, finance and ops run on separate systems with no shared truth. Decisions are made on stale exports.' },
  { icon:'🔌', head:'Point-to-point spaghetti',  body:'Custom integrations built one at a time. Every new system adds 3 new scripts that break when either side updates.' },
  { icon:'⏱', head:'Lag kills decisions',        body:"Batch overnight syncs mean leadership is always working with yesterday's data. Real-time is not optional anymore." },
  { icon:'🧩', head:'Vendor lock-in',            body:"Proprietary middleware that can't be extended, audited, or moved. You're at the vendor's roadmap mercy." },
  { icon:'🚫', head:'No single source of truth', body:'The same entity — a customer, an order, an invoice — exists with different values across four systems.' },
  { icon:'📋', head:'Compliance blind spots',    body:'When data flows are undocumented and uncontrolled, audits become nightmares and breaches go undetected.' },
];
const SERVICES = [
  { num:'01', title:'API Layer Design & Engineering', body:'We design and build the unified API layer that sits between your systems and your consumers — RESTful, GraphQL, or event-driven, documented and versioned from day one.', tags:['REST / GraphQL','OpenAPI spec','API versioning','Rate limiting & quotas'], svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><rect x="4" y="16" width="44" height="20" rx="5" stroke="#1a6e42" strokeWidth="1.2" opacity="0.55"/><line x1="14" y1="26" x2="38" y2="26" stroke="#1a6e42" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/><path d="M24 21 L28 26 L24 31" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/><line x1="4" y1="10" x2="14" y2="16" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2"/><line x1="48" y1="10" x2="38" y2="16" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2"/><line x1="4" y1="42" x2="14" y2="36" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2"/><line x1="48" y1="42" x2="38" y2="36" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2"/></svg>) },
  { num:'02', title:'ERP & CRM Integration', body:"Deep, bidirectional integrations with SAP, Oracle, Salesforce, HubSpot, Frappe and others. We handle data mapping, conflict resolution, and schema evolution so you don't have to.", tags:['SAP','Salesforce','HubSpot','Frappe / ERPNext','Oracle'], svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><rect x="4" y="8" width="18" height="14" rx="3" stroke="#1a6e42" strokeWidth="1.1" opacity="0.6"/><rect x="30" y="8" width="18" height="14" rx="3" stroke="#1a6e42" strokeWidth="1.1" opacity="0.6"/><rect x="4" y="30" width="18" height="14" rx="3" stroke="#1a6e42" strokeWidth="1.1" opacity="0.5"/><rect x="30" y="30" width="18" height="14" rx="3" stroke="#1a6e42" strokeWidth="1.1" opacity="0.5"/><circle cx="26" cy="26" r="7" stroke="#1a6e42" strokeWidth="1.3" opacity="0.75"/><circle cx="26" cy="26" r="3" fill="#1a6e42" opacity="0.6"/><line x1="22" y1="22" x2="19" y2="19" stroke="#1a6e42" strokeWidth="0.8" opacity="0.35"/><line x1="30" y1="22" x2="33" y2="19" stroke="#1a6e42" strokeWidth="0.8" opacity="0.35"/><line x1="22" y1="30" x2="19" y2="33" stroke="#1a6e42" strokeWidth="0.8" opacity="0.35"/><line x1="30" y1="30" x2="33" y2="33" stroke="#1a6e42" strokeWidth="0.8" opacity="0.35"/></svg>) },
  { num:'03', title:'Real-time Event Streaming', body:'Move from batch syncs to event-driven architectures. Kafka, Kinesis or Pub/Sub pipelines that propagate changes across systems in milliseconds — not overnight.', tags:['Apache Kafka','AWS Kinesis','Webhooks','Change data capture','Pub/Sub'], svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><path d="M6 26 L14 26 L18 14 L22 38 L26 22 L30 30 L34 26 L46 26" stroke="#1a6e42" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" fill="none"/><circle cx="6" cy="26" r="2.5" fill="#1a6e42" opacity="0.5"/><circle cx="46" cy="26" r="2.5" fill="#1a6e42" opacity="0.5"/><line x1="6" y1="44" x2="46" y2="44" stroke="#1a6e42" strokeWidth="0.7" opacity="0.2"/><line x1="6" y1="8" x2="6" y2="44" stroke="#1a6e42" strokeWidth="0.7" opacity="0.2"/></svg>) },
  { num:'04', title:'Data Gateway & Governance', body:'A controlled entry point for all data movement: authentication, authorisation, rate limiting, schema validation, transformation and logging — before any payload reaches its destination.', tags:['API gateway','Data validation','Transformation layer','Audit logging','PII masking'], svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><rect x="18" y="8" width="16" height="36" rx="4" stroke="#1a6e42" strokeWidth="1.3" opacity="0.7"/><path d="M10 20 L18 20" stroke="#1a6e42" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/><path d="M10 26 L18 26" stroke="#1a6e42" strokeWidth="1.1" strokeLinecap="round" opacity="0.35"/><path d="M10 32 L18 32" stroke="#1a6e42" strokeWidth="1.1" strokeLinecap="round" opacity="0.3"/><path d="M34 20 L42 20" stroke="#1a6e42" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/><path d="M34 26 L42 26" stroke="#1a6e42" strokeWidth="1.1" strokeLinecap="round" opacity="0.35"/><path d="M34 32 L42 32" stroke="#1a6e42" strokeWidth="1.1" strokeLinecap="round" opacity="0.3"/><circle cx="26" cy="26" r="5" stroke="#1a6e42" strokeWidth="1.2" opacity="0.6"/><circle cx="26" cy="26" r="2" fill="#1a6e42" opacity="0.8"/></svg>) },
];
const PATTERNS = [
  { label:'Request/Response',   desc:'Synchronous REST or GraphQL for query-heavy workflows needing immediate responses.' },
  { label:'Event-Driven',       desc:'Async publish-subscribe for decoupled, high-throughput systems that scale independently.' },
  { label:'Batch Pipelines',    desc:'Scheduled ETL for large-volume data migrations, reports and warehouse loads.' },
  { label:'Change Data Capture',desc:'Stream database-level changes in real time without polling — zero lag, low overhead.' },
  { label:'Webhook Mesh',       desc:'Outbound event notifications to third-party consumers with retry logic and delivery guarantees.' },
];
const OUTCOMES = [
  { val:'Single',    label:'Source of truth',     sub:'One authoritative record across all connected systems' },
  { val:'Real-time', label:'Data propagation',    sub:'Milliseconds, not overnight batch windows' },
  { val:'Zero',      label:'Manual syncs',        sub:'Eliminating spreadsheet exports and copy-paste ops' },
  { val:'Full',      label:'Audit trail',         sub:'Every data movement logged, traceable and compliant' },
];

function ProblemSection() {
  return (
    <section className="page-section" style={{ padding:'clamp(56px,8vw,100px) clamp(20px,4vw,32px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="THE PROBLEM"/>
        <div className="col2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px 72px', alignItems:'start' }}>
          <div>
            <div style={{ overflow:'hidden', marginBottom:8 }}><RevealClip delay={0.06}>
              <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3.2vw,44px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>Your systems don't talk to each other — and it's costing you.</h2>
            </RevealClip></div>
            <FadeUp delay={0.18}><p style={{ fontFamily:'var(--font-body)', fontSize:14.5, color:'#3d6b50', lineHeight:1.82, margin:'16px 0 0' }}>Most enterprises run 20–40 software systems. Only a fraction are properly connected. The rest generate a silent tax: duplicated effort, bad decisions, and missed opportunity.</p></FadeUp>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {PAINS.map((p,i)=>(
              <FadeUp key={i} delay={0.1+i*.07}>
                <div className="api-row" style={{ display:'flex', gap:13, padding:'11px 10px' }}>
                  <span style={{ fontSize:17, flexShrink:0, marginTop:1 }}>{p.icon}</span>
                  <div>
                    <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:13.5, color:'#0d3d22', margin:'0 0 2px' }}>{p.head}</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:12.5, color:'#3d6b50', margin:0, lineHeight:1.65 }}>{p.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function WhatWeBuildSection() {
  return (
    <section className="page-section" style={{ padding:'0 clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="WHAT WE BUILD"/>
        <div style={{ overflow:'hidden', marginBottom:10 }}><RevealClip delay={0.06}><h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3vw,42px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>Four disciplines. One coherent data fabric.</h2></RevealClip></div>
        <FadeUp delay={0.16} style={{ marginBottom:48 }}><p style={{ fontFamily:'var(--font-body)', fontSize:14.5, color:'#3d6b50', lineHeight:1.82, maxWidth:520, margin:'10px 0 0' }}>We engineer a coherent integration architecture that can grow without becoming unmaintainable.</p></FadeUp>
        <div className="col2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {SERVICES.map((s,i)=>(
            <FadeUp key={i} delay={0.08+i*.09}>
              <div className="api-card" style={{ padding:'24px', borderRadius:14, background:'#fff' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                  <div>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:G, opacity:.6, letterSpacing:'0.12em', display:'block', marginBottom:8 }}>{s.num}</span>
                    <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15.5, color:'#0d3d22', margin:0, lineHeight:1.25, maxWidth:200 }}>{s.title}</h3>
                  </div>
                  <div style={{ opacity:.65, flexShrink:0 }}>{s.svg}</div>
                </div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'#3d6b50', lineHeight:1.75, margin:'0 0 18px' }}>{s.body}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                  {s.tags.map((t,ti)=><span key={ti} className="api-chip" style={{ fontFamily:'var(--font-mono)', fontSize:9.5, padding:'3px 9px', borderRadius:100, border:'1px solid rgba(26,110,66,.18)', color:'#3d7a55' }}>{t}</span>)}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
function PatternsSection() {
  return (
    <section className="page-section" style={{ padding:'0 clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="INTEGRATION PATTERNS"/>
        <div className="col2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'36px 72px', alignItems:'start' }}>
          <div>
            <div style={{ overflow:'hidden', marginBottom:8 }}><RevealClip delay={0.06}><h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3vw,40px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>Right pattern for the right flow.</h2></RevealClip></div>
            <FadeUp delay={0.17}><p style={{ fontFamily:'var(--font-body)', fontSize:14.5, color:'#3d6b50', lineHeight:1.82, margin:'14px 0 0', maxWidth:380 }}>We choose integration patterns based on your latency, volume and reliability requirements — not what's easiest for us to build.</p></FadeUp>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {PATTERNS.map((p,i)=>(
              <FadeUp key={i} delay={0.1+i*.08}>
                <div className="api-pillar" style={{ padding:'15px 18px', borderRadius:12, background:'#fff', display:'flex', gap:14, alignItems:'flex-start' }}>
                  <div style={{ width:26, height:26, borderRadius:'50%', border:'1px solid rgba(26,110,66,.28)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:G, opacity:.8 }}>{String(i+1).padStart(2,'0')}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:13.5, color:'#0d3d22', margin:'0 0 3px' }}>{p.label}</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'#3d6b50', margin:0, lineHeight:1.65 }}>{p.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function OutcomesSection() {
  return (
    <section className="page-section" style={{ padding:'0 clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="OUTCOMES"/>
        <div style={{ overflow:'hidden', marginBottom:44 }}><RevealClip delay={0.06}><h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3vw,40px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>What a connected enterprise looks like.</h2></RevealClip></div>
        <div className="col4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
          {OUTCOMES.map((o,i)=>(
            <motion.div key={i} initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-40px' }} transition={{ duration:.55, delay:i*.1, ease:EASE }}
              style={{ padding:'22px 18px', borderRadius:14, background:'#fff', border:'1px solid rgba(26,110,66,.14)' }}>
              <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:28, color:G, margin:'0 0 5px', lineHeight:1 }}>{o.val}</p>
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
    <section className="page-section" style={{ padding:'0 clamp(20px,4vw,32px) clamp(72px,10vw,120px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <FadeUp>
          <div style={{ padding:'clamp(28px,4vw,52px) clamp(22px,4vw,56px)', borderRadius:18, background:'#f6fbf8', border:'1px solid rgba(26,110,66,.18)' }}>
            <div className="cta-inner" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:32, flexWrap:'wrap' }}>
              <div>
                <div style={{ overflow:'hidden', marginBottom:8 }}><RevealClip delay={0.06}><h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(20px,2.5vw,32px)', color:'#0d3d22', margin:0, lineHeight:1.15 }}>Map your integration landscape with us.</h2></RevealClip></div>
                <FadeUp delay={0.16}><p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'#3d6b50', margin:0, lineHeight:1.7, maxWidth:440 }}>Tell us your systems, your pain points, and what decisions you're trying to make faster. We'll return with an integration architecture proposal.</p></FadeUp>
              </div>
              <FadeUp delay={0.22}>
                <a href="#contact" style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'#fff', background:G, border:`1px solid ${G}`, padding:'13px 28px', borderRadius:8, textDecoration:'none', display:'inline-block', flexShrink:0, transition:'background .22s,color .22s' }}
                  onMouseEnter={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=G;}}
                  onMouseLeave={e=>{e.currentTarget.style.background=G;e.currentTarget.style.color='#fff';}}>
                  Start the integration audit →
                </a>
              </FadeUp>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export function APIIntegrationPage() {
  return (
    <div style={{ background:'#fff', minHeight:'100vh' }}>
      <style>{STYLES}</style>
      <HeroSection/>
      <ProblemSection/>
      <Divider/>
      <WhatWeBuildSection/>
      <Divider/>
      <PatternsSection/>
      <Divider/>
      <OutcomesSection/>
      <CTASection/>
    </div>
  );
}