import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const GLOBAL_STYLES = `
  .da-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .da-card:hover { transform: translateY(-5px); box-shadow: 0 18px 44px rgba(0,0,0,0.38) !important; }
  .da-stat-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .da-stat-card:hover { transform: translateY(-6px) scale(1.02); }
  .da-industry-card { transition: border-color 0.25s, background 0.25s, transform 0.25s; cursor: pointer; }
  .da-industry-card:hover { transform: translateY(-4px); }
  .da-arch-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .da-arch-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.4) !important; }
  @media(max-width:900px){ .da-grid-3{ grid-template-columns: 1fr 1fr !important; } }
  @media(max-width:600px){ .da-grid-3{ grid-template-columns: 1fr !important; } }
  @media(max-width:768px){ 
    .da-tl-line{ display:none; } 
    .da-step-wrap{ justify-content:center !important; } 
    .da-step-card{ width:100% !important; }
    .da-sec-header { text-align: center !important; }
    .da-sec-header p { margin-left: auto !important; margin-right: auto !important; }
  }
`;

/* ═══════════════════════════════════════════════
   SECTION 1 — What We Unlock with Data Analysis
═══════════════════════════════════════════════ */
const GROWTH_SERVICES = [
  { id: '01', color: '#00e87a', title: 'Business Intelligence Dashboards', body: 'Real-time BI dashboards that surface KPIs, trends, and anomalies — so every stakeholder sees the truth about their business, instantly.', metric: '< 2s', metricLabel: 'dashboard load time',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="4" y="8" width="48" height="38" rx="3" stroke="#00e87a" strokeWidth="1.3" opacity="0.5"/><rect x="8" y="22" width="8" height="20" rx="1.5" fill="#00e87a" opacity="0.35"/><rect x="18" y="16" width="8" height="26" rx="1.5" fill="#00e87a" opacity="0.55"/><rect x="28" y="26" width="8" height="16" rx="1.5" fill="#00e87a" opacity="0.4"/><rect x="38" y="12" width="8" height="30" rx="1.5" fill="#00e87a" opacity="0.65"/><line x1="4" y1="44" x2="52" y2="44" stroke="#00e87a" strokeWidth="0.8" opacity="0.2"/></svg>),
  },
  { id: '02', color: '#c9a84c', title: 'Predictive & Prescriptive Analytics', body: 'Move beyond descriptive reporting. We build models that predict what will happen and prescribe optimal actions — automatically.', metric: '91%', metricLabel: 'forecast accuracy',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><polyline points="6,44 14,34 22,36 30,20 38,24 50,8" stroke="#c9a84c" strokeWidth="1.7" strokeLinecap="round"/>{([[14,34],[22,36],[30,20],[38,24]] as [number,number][]).map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" fill="#c9a84c" opacity={0.5+i*0.1}/>)}<path d="M38 24 Q44 16 50 8" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 2" opacity="0.5"/><path d="M50 8 L50 20 M50 8 L42 10" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/><line x1="6" y1="48" x2="52" y2="48" stroke="#c9a84c" strokeWidth="0.7" opacity="0.18"/></svg>),
  },
  { id: '03', color: '#00b85e', title: 'Data Pipeline Engineering', body: 'Design and build robust ETL/ELT pipelines that move data from every source to your warehouse — clean, tested, and always on time.', metric: '99.9%', metricLabel: 'pipeline uptime',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="4" y="18" width="12" height="10" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.6"/><rect x="4" y="32" width="12" height="10" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.6"/><path d="M16 23 L24 26" stroke="#00b85e" strokeWidth="1.2" opacity="0.5"/><path d="M16 37 L24 26" stroke="#00b85e" strokeWidth="1.2" opacity="0.5"/><rect x="24" y="20" width="12" height="12" rx="2" stroke="#00b85e" strokeWidth="1.5" opacity="0.9"/><path d="M36 26 L44 26" stroke="#00b85e" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6"/><ellipse cx="48" cy="26" rx="4" ry="8" stroke="#00b85e" strokeWidth="1.3"/><text x="30" y="28" textAnchor="middle" fill="#00b85e" fontSize="4" fontFamily="monospace">ETL</text></svg>),
  },
  { id: '04', color: '#00e87a', title: 'Statistical & Causal Analysis', body: 'Hypothesis testing, A/B experiment analysis, regression, and causal inference — rigorous statistical work that separates signal from noise.', metric: 'p < 0.05', metricLabel: 'significance threshold',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><path d="M8 28 Q20 10 28 28 Q36 46 48 28" stroke="#00e87a" strokeWidth="1.7" strokeLinecap="round" fill="none"/><line x1="8" y1="28" x2="48" y2="28" stroke="#00e87a" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.35"/><line x1="28" y1="10" x2="28" y2="46" stroke="#00e87a" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.35"/><circle cx="28" cy="28" r="3" fill="#00e87a" opacity="0.8"/><path d="M28 10 L32 14 L28 18" stroke="#00e87a" strokeWidth="1.2" fill="none" opacity="0.5"/></svg>),
  },
  { id: '05', color: '#c9a84c', title: 'Customer & Cohort Analytics', body: 'Segment customers by behaviour, value, and lifecycle stage. Track cohort retention, LTV, and churn signals across every product touchpoint.', metric: '360°', metricLabel: 'customer view',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><circle cx="28" cy="28" r="18" stroke="#c9a84c" strokeWidth="0.8" opacity="0.25"/>{[0,72,144,216,288].map((a,i)=>{const r=(a*Math.PI)/180;return <circle key={i} cx={28+18*Math.cos(r)} cy={28+18*Math.sin(r)} r="4" stroke="#c9a84c" strokeWidth="1.2" fill="none" opacity={0.5+i*0.08}/>;})}<circle cx="28" cy="28" r="6" stroke="#c9a84c" strokeWidth="1.4" opacity="0.9"/><circle cx="28" cy="28" r="2.5" fill="#c9a84c" opacity="0.8"/>{[0,72,144,216,288].map((a,i)=>{const r=(a*Math.PI)/180;return <line key={i} x1={28+6*Math.cos(r)} y1={28+6*Math.sin(r)} x2={28+14*Math.cos(r)} y2={28+14*Math.sin(r)} stroke="#c9a84c" strokeWidth="0.8" opacity="0.35"/>;})}</svg>),
  },
  { id: '06', color: '#00b85e', title: 'Data Quality & Observability', body: 'Monitor data freshness, completeness, and accuracy with automated DQ checks, alerting, and lineage tracking across your entire stack.', metric: '100%', metricLabel: 'lineage coverage',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><circle cx="28" cy="28" r="18" stroke="#00b85e" strokeWidth="1" opacity="0.18"/><path d="M28 10 A18 18 0 0 1 46 28" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round"/><path d="M46 28 A18 18 0 0 1 28 46" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/><path d="M28 46 A18 18 0 0 1 10 28" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round" opacity="0.3"/><path d="M10 28 A18 18 0 0 1 28 10" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round" opacity="0.15"/><path d="M22 28 L26 32 L34 24" stroke="#00b85e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/></svg>),
  },
];

function GrowthCard({ s, index, inView }: { s: typeof GROWTH_SERVICES[0]; index: number; inView: boolean }) {
  return (
    <motion.div className="da-card" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', background: 'var(--bg-surface)', border: `1px solid ${s.color}1a`, boxShadow: '0 4px 18px rgba(0,0,0,0.18)' }}>
      <div style={{ height: '2px', background: `linear-gradient(90deg,${s.color},transparent)`, opacity: 0.45 }} />
      <div style={{ padding: '24px', position: 'relative' }}>
        <div style={{ position: 'absolute', right: '14px', top: '10px', fontFamily: 'var(--font-mono)', fontSize: '46px', fontWeight: 700, color: s.color, opacity: 0.04, userSelect: 'none' }}>{s.id}</div>
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

export function DAGrowth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <style>{GLOBAL_STYLES}</style>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} className="da-sec-header" style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>WHAT WE UNLOCK</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '700px' }}>
            Boost Your Business Growth<br /><span style={{ color: 'var(--accent-primary)' }}>with Data Analysis.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '14px', maxWidth: '520px' }}>Six data capabilities we build for enterprise clients — turning raw numbers into decisions that compound.</p>
        </motion.div>
        <div className="da-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {GROWTH_SERVICES.map((s, i) => <GrowthCard key={s.id} s={s} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 — Data Stack & Tools
═══════════════════════════════════════════════ */
const ARCHITECTURES = [
  { name: 'Modern Data Warehouse', abbr: 'MDW', color: '#00e87a', models: ['Snowflake', 'BigQuery', 'Redshift', 'Databricks'], desc: 'Cloud-native warehouses that scale with your data volume — columnar storage, query optimisation, and zero-ETL integrations.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><ellipse cx="26" cy="14" rx="18" ry="6" stroke="#00e87a" strokeWidth="1.3"/><line x1="8" y1="14" x2="8" y2="28" stroke="#00e87a" strokeWidth="1.3"/><line x1="44" y1="14" x2="44" y2="28" stroke="#00e87a" strokeWidth="1.3"/><ellipse cx="26" cy="28" rx="18" ry="6" stroke="#00e87a" strokeWidth="1.3"/><line x1="8" y1="28" x2="8" y2="38" stroke="#00e87a" strokeWidth="1.3" opacity="0.5"/><line x1="44" y1="28" x2="44" y2="38" stroke="#00e87a" strokeWidth="1.3" opacity="0.5"/><ellipse cx="26" cy="38" rx="18" ry="6" stroke="#00e87a" strokeWidth="1.3" opacity="0.5"/></svg>) },
  { name: 'Data Lakehouse Architecture', abbr: 'DLA', color: '#c9a84c', models: ['Delta Lake', 'Apache Iceberg', 'Apache Hudi', 'dbt'], desc: 'Combine the flexibility of data lakes with warehouse-grade reliability — ACID transactions, schema enforcement, and unified governance.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><path d="M26 6 L46 18 L46 36 L26 48 L6 36 L6 18 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.5"/><path d="M26 6 L26 48" stroke="#c9a84c" strokeWidth="0.8" opacity="0.25"/><path d="M6 18 L46 36" stroke="#c9a84c" strokeWidth="0.8" opacity="0.2"/><path d="M46 18 L6 36" stroke="#c9a84c" strokeWidth="0.8" opacity="0.2"/><circle cx="26" cy="27" r="7" stroke="#c9a84c" strokeWidth="1.4" opacity="0.9"/><circle cx="26" cy="27" r="2.5" fill="#c9a84c" opacity="0.7"/></svg>) },
  { name: 'Streaming & Real-Time Analytics', abbr: 'SRA', color: '#00b85e', models: ['Apache Kafka', 'Flink', 'Spark Streaming', 'Kinesis'], desc: 'Process millions of events per second with sub-second latency — for fraud detection, live dashboards, and operational alerting.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}>{[0,1,2,3,4].map(i=><path key={i} d={`M${8+i*8} 10 L${8+i*8} 42`} stroke="#00b85e" strokeWidth="0.7" opacity="0.15"/>)}<polyline points="6,32 12,22 18,28 24,14 30,20 36,12 42,24 48,18" stroke="#00b85e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>{([[12,22],[18,28],[24,14],[30,20],[36,12],[42,24]] as [number,number][]).map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2" fill="#00b85e" opacity={0.6+i*0.05}/>)}<circle cx="48" cy="18" r="3.5" stroke="#00b85e" strokeWidth="1.4" opacity="0.9"/><circle cx="48" cy="18" r="1.5" fill="#00b85e" opacity="0.8"/></svg>) },
  { name: 'BI & Visualisation Tools', abbr: 'BIV', color: '#00e87a', models: ['Tableau', 'Power BI', 'Looker', 'Apache Superset'], desc: 'Self-serve dashboards, pixel-perfect reports, and embedded analytics — connected to your warehouse and updated in real time.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="6" width="44" height="34" rx="3" stroke="#00e87a" strokeWidth="1.2" opacity="0.5"/><rect x="8" y="24" width="6" height="12" rx="1.5" fill="#00e87a" opacity="0.4"/><rect x="16" y="18" width="6" height="18" rx="1.5" fill="#00e87a" opacity="0.6"/><rect x="24" y="22" width="6" height="14" rx="1.5" fill="#00e87a" opacity="0.45"/><rect x="32" y="14" width="6" height="22" rx="1.5" fill="#00e87a" opacity="0.7"/><rect x="40" y="20" width="6" height="16" rx="1.5" fill="#00e87a" opacity="0.5"/><line x1="4" y1="42" x2="48" y2="42" stroke="#00e87a" strokeWidth="1.2" opacity="0.3"/><line x1="18" y1="44" x2="18" y2="48" stroke="#00e87a" strokeWidth="1" opacity="0.35"/><line x1="34" y1="44" x2="34" y2="48" stroke="#00e87a" strokeWidth="1" opacity="0.35"/></svg>) },
  { name: 'ML Feature Stores & Metadata', abbr: 'MFSM', color: '#c9a84c', models: ['Feast', 'Tecton', 'Hopsworks', 'DataHub'], desc: 'Centralised feature stores and metadata catalogs — so ML teams reuse features, data teams track lineage, and nothing gets lost.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="4" width="20" height="14" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><rect x="4" y="22" width="20" height="14" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><rect x="28" y="13" width="20" height="14" rx="2" stroke="#c9a84c" strokeWidth="1.5" opacity="0.9"/><line x1="24" y1="11" x2="28" y2="17" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/><line x1="24" y1="29" x2="28" y2="23" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/><text x="38" y="22" textAnchor="middle" fill="#c9a84c" fontSize="5" fontFamily="monospace">META</text></svg>) },
  { name: 'Data Governance & Security', abbr: 'DGS', color: '#00b85e', models: ['Apache Atlas', 'Collibra', 'Alation', 'Great Expectations'], desc: 'Role-based access, data masking, PII detection, and quality contracts — so your data is compliant, documented, and trustworthy.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><path d="M26 4 L44 11 L44 26 C44 36 36 42 26 44 C16 42 8 36 8 26 L8 11 Z" stroke="#00b85e" strokeWidth="1.3" fill="none" opacity="0.6"/><path d="M19 26 L23 30 L33 20" stroke="#00b85e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/><circle cx="26" cy="24" r="8" stroke="#00b85e" strokeWidth="0.8" opacity="0.2"/></svg>) },
];

export function DAArchitectures() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} className="da-sec-header" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>UNDER THE HOOD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Data Stacks and<br /><span style={{ color: 'var(--accent-primary)' }}>Technologies We Work With.</span>
          </h2>
        </motion.div>
        <div className="da-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {ARCHITECTURES.map((a, i) => (
            <motion.div key={a.abbr} className="da-arch-card" initial={{ opacity: 0, y: 38 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              style={{ borderRadius: '16px', overflow: 'hidden', background: 'var(--bg-surface)', border: `1px solid ${a.color}1a`, boxShadow: '0 4px 18px rgba(0,0,0,0.18)' }}>
              <div style={{ height: '2px', background: `linear-gradient(90deg,${a.color},transparent)`, opacity: 0.45 }} />
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
   SECTION 3 — Data Analysis Roadmap
═══════════════════════════════════════════════ */
const ROADMAP_STEPS = [
  { phase: 'DISCOVER', duration: '1 wk', color: '#00e87a', title: 'Data Landscape Audit', body: 'We map every data source, assess data maturity, and identify the highest-value analytics opportunities — ranked by business impact and feasibility.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><circle cx="20" cy="20" r="13" stroke="#00e87a" strokeWidth="1.4" opacity="0.7"/><line x1="29" y1="29" x2="40" y2="40" stroke="#00e87a" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="20" x2="24" y2="20" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="20" y1="16" x2="20" y2="24" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/></svg>) },
  { phase: 'COLLECT', duration: '1–2 wks', color: '#c9a84c', title: 'Data Collection & Integration', body: 'Connect all your data sources — databases, SaaS apps, flat files, APIs, and streams — into a unified, governed data layer.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><rect x="4" y="4" width="10" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.2" opacity="0.65"/><rect x="4" y="20" width="10" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.2" opacity="0.65"/><rect x="4" y="36" width="10" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.2" opacity="0.65"/><path d="M14 9 L26 24 M14 25 L26 24 M14 41 L26 24" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/><circle cx="26" cy="24" r="8" stroke="#c9a84c" strokeWidth="1.4" opacity="0.9"/><text x="26" y="27" textAnchor="middle" fill="#c9a84c" fontSize="5" fontFamily="monospace">HUB</text><path d="M34 24 L44 24" stroke="#c9a84c" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.5"/></svg>) },
  { phase: 'TRANSFORM', duration: '1–2 wks', color: '#00b85e', title: 'Cleaning, Modelling & Transformation', body: 'Clean raw data, build dimensional models (star/snowflake schemas), and create semantic layers that business users can query without SQL expertise.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><rect x="4" y="8" width="12" height="10" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.5"/><path d="M16 13 L20 13" stroke="#00b85e" strokeWidth="1.1" opacity="0.45"/><rect x="20" y="8" width="12" height="10" rx="2" stroke="#00b85e" strokeWidth="1.4" opacity="0.85"/><path d="M32 13 L36 13" stroke="#00b85e" strokeWidth="1.1" opacity="0.45"/><rect x="36" y="8" width="10" height="10" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.65"/><line x1="16" y1="28" x2="32" y2="28" stroke="#00b85e" strokeWidth="1.2" opacity="0.35"/><rect x="16" y="32" width="16" height="10" rx="2" stroke="#00b85e" strokeWidth="1.4" opacity="0.9"/><text x="24" y="39" textAnchor="middle" fill="#00b85e" fontSize="5" fontFamily="monospace">DW</text></svg>) },
  { phase: 'ANALYSE', duration: '2–4 wks', color: '#00e87a', title: 'Analysis, Modelling & Dashboards', body: 'Perform exploratory and statistical analysis, build predictive models, and ship BI dashboards that stakeholders can use without your team.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><rect x="4" y="6" width="40" height="28" rx="3" stroke="#00e87a" strokeWidth="1.2" opacity="0.5"/><rect x="8" y="20" width="5" height="10" rx="1" fill="#00e87a" opacity="0.4"/><rect x="15" y="15" width="5" height="15" rx="1" fill="#00e87a" opacity="0.6"/><rect x="22" y="18" width="5" height="12" rx="1" fill="#00e87a" opacity="0.45"/><rect x="29" y="12" width="5" height="18" rx="1" fill="#00e87a" opacity="0.7"/><rect x="36" y="16" width="5" height="14" rx="1" fill="#00e87a" opacity="0.5"/><line x1="12" y1="36" x2="12" y2="42" stroke="#00e87a" strokeWidth="1" opacity="0.4"/><line x1="36" y1="36" x2="36" y2="42" stroke="#00e87a" strokeWidth="1" opacity="0.4"/><line x1="8" y1="42" x2="40" y2="42" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" opacity="0.35"/></svg>) },
  { phase: 'MONITOR', duration: 'Ongoing', color: '#c9a84c', title: 'Data Observability & Continuous Improvement', body: 'Automated data quality checks, pipeline health monitoring, and usage analytics — so your data platform improves with every passing week.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><circle cx="24" cy="24" r="18" stroke="#c9a84c" strokeWidth="1.2" opacity="0.25"/><path d="M24 6 A18 18 0 0 1 42 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round"/><path d="M42 24 A18 18 0 0 1 24 42" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/><path d="M24 42 A18 18 0 0 1 6 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.3"/><path d="M6 24 A18 18 0 0 1 24 6" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.15"/><circle cx="24" cy="24" r="5" stroke="#c9a84c" strokeWidth="1.3"/><circle cx="24" cy="24" r="2" fill="#c9a84c" opacity="0.8"/></svg>) },
];

export function DARoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} className="da-sec-header" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>HOW WE BUILD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Our Proven Data Analysis<br /><span style={{ color: 'var(--accent-primary)' }}>Engagement Roadmap.</span>
          </h2>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative' }}>
          <div className="da-tl-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,232,122,0.07)', transform: 'translateX(-50%)' }} />
          {ROADMAP_STEPS.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={s.phase} initial={{ opacity: 0, x: isLeft ? -48 : 48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, ease: EASE }}
                className="da-step-wrap" style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '11px', height: '11px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}88`, zIndex: 4 }} />
                <div className="da-step-card" style={{ width: '44%', borderRadius: '14px', background: 'var(--bg-surface)', border: `1px solid ${s.color}1e`, padding: '22px', boxShadow: '0 4px 18px rgba(0,0,0,0.18)', transition: 'transform 0.25s, box-shadow 0.25s' }}>
                  <div style={{ height: '2px', background: `linear-gradient(90deg,${s.color},transparent)`, marginBottom: '14px', opacity: 0.5 }} />
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
   SECTION 4 — Data Analysis for Industries
═══════════════════════════════════════════════ */
const INDUSTRIES = [
  { name: 'Finance & Banking', color: '#00e87a', useCases: ['Revenue attribution analysis', 'Risk exposure modelling', 'Trading pattern analytics', 'Customer LTV segmentation'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="8" width="30" height="22" rx="3" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="3" y1="14" x2="33" y2="14" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/><circle cx="10" cy="22" r="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.6"/><line x1="16" y1="21" x2="28" y2="21" stroke="#00e87a" strokeWidth="1" opacity="0.4"/></svg>) },
  { name: 'Healthcare', color: '#c9a84c', useCases: ['Clinical outcome analysis', 'Hospital capacity forecasting', 'Drug efficacy studies', 'Patient pathway analytics'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="3" width="30" height="30" rx="5" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><line x1="18" y1="9" x2="18" y2="27" stroke="#c9a84c" strokeWidth="2.2" strokeLinecap="round"/><line x1="9" y1="18" x2="27" y2="18" stroke="#c9a84c" strokeWidth="2.2" strokeLinecap="round"/></svg>) },
  { name: 'Retail & E-Commerce', color: '#00b85e', useCases: ['Basket analysis & affinity', 'Inventory optimisation', 'Markdown & pricing analytics', 'Funnel drop-off analysis'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M4 8 L8 8 L12 22 L26 22 L30 12 L10 12" stroke="#00b85e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/><circle cx="14" cy="27" r="2.5" stroke="#00b85e" strokeWidth="1.2" opacity="0.7"/><circle cx="24" cy="27" r="2.5" stroke="#00b85e" strokeWidth="1.2" opacity="0.7"/></svg>) },
  { name: 'Manufacturing', color: '#00e87a', useCases: ['OEE & throughput analysis', 'Defect root cause analysis', 'Supply chain optimisation', 'Energy consumption analytics'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><circle cx="18" cy="18" r="8" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/><circle cx="18" cy="18" r="3" fill="#00e87a" opacity="0.8"/>{[0,60,120,180,240,300].map((a,i)=>{const r=(a*Math.PI)/180;return <line key={i} x1={18+8*Math.cos(r)} y1={18+8*Math.sin(r)} x2={18+12*Math.cos(r)} y2={18+12*Math.sin(r)} stroke="#00e87a" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>;})}</svg>) },
  { name: 'Logistics & Supply Chain', color: '#c9a84c', useCases: ['Delivery performance analytics', 'Network optimisation', 'Carrier benchmarking', 'Demand variability analysis'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="2" y="14" width="22" height="14" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/><path d="M24 20 L30 20 L34 26 L34 28 L24 28 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.8"/><circle cx="8" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><circle cx="20" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><circle cx="30" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/></svg>) },
  { name: 'SaaS & Technology', color: '#00b85e', useCases: ['Product usage analytics', 'Churn & expansion signals', 'Feature adoption tracking', 'A/B experiment analysis'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="2" y="6" width="32" height="20" rx="3" stroke="#00b85e" strokeWidth="1.3" opacity="0.7"/><text x="18" y="19" textAnchor="middle" fill="#00b85e" fontSize="6" fontFamily="monospace" opacity="0.6">{'</>'}</text><line x1="2" y1="30" x2="34" y2="30" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>) },
  { name: 'Marketing & Growth', color: '#00e87a', useCases: ['Attribution modelling', 'Campaign ROI analytics', 'Audience segmentation', 'CLV & payback period'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><polyline points="4,28 10,20 16,22 22,12 28,16 33,6" stroke="#00e87a" strokeWidth="1.5" strokeLinecap="round"/>{([[10,20],[16,22],[22,12],[28,16]] as [number,number][]).map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2" fill="#00e87a" opacity={0.5+i*0.1}/>)}<line x1="4" y1="32" x2="34" y2="32" stroke="#00e87a" strokeWidth="0.7" opacity="0.2"/></svg>) },
  { name: 'Energy & Utilities', color: '#c9a84c', useCases: ['Consumption pattern analysis', 'Grid load forecasting', 'Asset performance analytics', 'Renewable yield modelling'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M20 4 L8 20 L16 20 L14 32 L28 16 L20 16 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.8" strokeLinejoin="round"/></svg>) },
  { name: 'Human Resources', color: '#00b85e', useCases: ['Workforce analytics', 'Attrition risk modelling', 'Compensation benchmarking', 'Hiring funnel analysis'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><circle cx="18" cy="12" r="6" stroke="#00b85e" strokeWidth="1.3" opacity="0.8"/><path d="M6 30 C6 23 30 23 30 30" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.7"/></svg>) },
];

function useCounter(target: number, decimals: number, active: boolean, delay: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      const dur = 1800, start = performance.now();
      const tick = (now: number) => { const p = Math.min((now - start) / dur, 1); setVal(parseFloat(((1 - Math.pow(1 - p, 3)) * target).toFixed(decimals))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, decimals, delay]);
  return val;
}

function DAStatCard({ s, index, inView }: { s: typeof STATS[0]; index: number; inView: boolean }) {
  const dec = s.value % 1 !== 0 ? 1 : 0;
  const val = useCounter(s.value, dec, inView, index * 120);
  return (
    <motion.div className="da-stat-card" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      style={{ borderRadius: '12px', background: 'var(--bg-surface)', border: `1px solid ${s.color}18`, padding: '20px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.16)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${s.color}0c, transparent 60%)`, pointerEvents: 'none' }} />
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(26px, 3vw, 40px)', color: s.color, lineHeight: 1, marginBottom: '4px' }}>{val.toFixed(dec)}{s.suffix}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-secondary)' }}>{s.label}</div>
      <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: EASE }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg,transparent,${s.color},transparent)`, transformOrigin: 'center', opacity: 0.45 }} />
    </motion.div>
  );
}

const STATS = [
  { value: 9,   suffix: '',  label: 'Industries Served',           color: '#00e87a' },
  { value: 99.9,suffix: '%', label: 'Pipeline Uptime SLA',         color: '#c9a84c' },
  { value: 2,   suffix: 's', label: 'Avg. Dashboard Load Time',    color: '#00b85e' },
  { value: 5.1, suffix: 'x', label: 'Avg. Analytics ROI',          color: '#00e87a' },
];

function IndustryCard({ ind, index, inView }: { ind: typeof INDUSTRIES[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="da-industry-card" initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      onClick={() => setOpen(o => !o)}
      style={{ borderRadius: '14px', overflow: 'hidden', background: open ? `${ind.color}08` : 'var(--bg-surface)', border: `1px solid ${open ? ind.color + '44' : ind.color + '1a'}`, boxShadow: '0 4px 16px rgba(0,0,0,0.16)' }}>
      <div style={{ height: '2px', background: `linear-gradient(90deg,${ind.color},transparent)`, opacity: open ? 0.7 : 0.35 }} />
      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: open ? '14px' : 0 }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0, background: `${ind.color}10`, border: `1px solid ${ind.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ind.svg}</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{ind.name}</h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ind.color, opacity: 0.65, letterSpacing: '0.08em' }}>{ind.useCases.length} analytics applications</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: ind.color, opacity: 0.5, flexShrink: 0 }}>{open ? '↑' : '↓'}</span>
        </div>
        {open && (
          <div style={{ borderTop: `1px solid ${ind.color}18`, paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {ind.useCases.map((uc, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: ind.color, flexShrink: 0, opacity: 0.7 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{uc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function DAIndustries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} className="da-sec-header" style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>DATA ANALYTICS BY VERTICAL</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '720px' }}>
            Specialized Data Analysis<br /><span style={{ color: 'var(--accent-primary)' }}>for Various Industries.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', marginTop: '14px', maxWidth: '500px', lineHeight: 1.75 }}>Click any industry to see the analytics solutions we deploy.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '48px' }} className="da-stats-strip">
          {STATS.map((s, i) => <DAStatCard key={i} s={s} index={i} inView={inView} />)}
        </div>
        <div className="da-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {INDUSTRIES.map((ind, i) => <IndustryCard key={ind.name} ind={ind} index={i} inView={inView} />)}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .da-stats-strip{ grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}