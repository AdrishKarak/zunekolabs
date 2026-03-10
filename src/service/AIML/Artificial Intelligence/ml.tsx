import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const GLOBAL_STYLES = `
  .ml-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .ml-card:hover { transform: translateY(-5px); box-shadow: 0 18px 44px rgba(0,0,0,0.38) !important; }
  .ml-stat-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .ml-stat-card:hover { transform: translateY(-6px) scale(1.02); }
  .ml-industry-card { transition: border-color 0.25s, background 0.25s, transform 0.25s; cursor: pointer; }
  .ml-industry-card:hover { transform: translateY(-4px); }
  .ml-arch-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .ml-arch-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.4) !important; }
  @media(max-width:900px){ .ml-grid-3{ grid-template-columns: 1fr 1fr !important; } }
  @media(max-width:600px){ .ml-grid-3{ grid-template-columns: 1fr !important; } }
  @media(max-width:768px){ .ml-tl-line{ display:none; } .ml-step-wrap{ justify-content:center !important; } .ml-step-card{ width:90% !important; } }
`;

const GROWTH_SERVICES = [
  { id: '01', color: '#00e87a', title: 'Predictive Analytics', body: 'Forecast demand, churn, revenue, and risk with custom ML models trained on your historical data — updated in real time.', metric: '94%', metricLabel: 'forecast accuracy', svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><polyline points="6,44 14,32 22,36 30,18 38,24 50,10" stroke="#00e87a" strokeWidth="1.7" strokeLinecap="round"/>{([[14,32],[22,36],[30,18],[38,24]] as [number,number][]).map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" fill="#00e87a" opacity={0.5+i*0.1}/>)}<path d="M38 24 L50 10 L50 22" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/><line x1="6" y1="48" x2="50" y2="48" stroke="#00e87a" strokeWidth="0.7" opacity="0.18"/></svg>) },
  { id: '02', color: '#c9a84c', title: 'Recommendation Engines', body: 'Personalise product, content, and service recommendations for every user — increasing engagement and average order value.', metric: '38%', metricLabel: 'uplift in engagement', svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><circle cx="18" cy="20" r="8" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/><circle cx="38" cy="14" r="6" stroke="#c9a84c" strokeWidth="1.3" opacity="0.5"/><circle cx="40" cy="36" r="7" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><line x1="25" y1="20" x2="32" y2="14" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/><line x1="25" y1="22" x2="33" y2="34" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/></svg>) },
  { id: '03', color: '#00b85e', title: 'Computer Vision Apps', body: 'Object detection, defect identification, OCR, and visual search — deployed as APIs your existing systems can call instantly.', metric: '99.1%', metricLabel: 'detection accuracy', svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="4" y="10" width="48" height="36" rx="4" stroke="#00b85e" strokeWidth="1.3" opacity="0.5"/><circle cx="28" cy="28" r="10" stroke="#00b85e" strokeWidth="1.3" opacity="0.7"/><circle cx="28" cy="28" r="4" fill="#00b85e" opacity="0.7"/><rect x="18" y="16" width="20" height="24" rx="2" stroke="#00b85e" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.35"/></svg>) },
  { id: '04', color: '#00e87a', title: 'Anomaly & Fraud Detection', body: 'Real-time ML models that flag unusual transactions, system behaviour, and security events before they cause damage.', metric: '< 50ms', metricLabel: 'detection latency', svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><path d="M28 6 L50 46 L6 46 Z" stroke="#00e87a" strokeWidth="1.3" fill="none" opacity="0.5"/><line x1="28" y1="22" x2="28" y2="34" stroke="#00e87a" strokeWidth="2" strokeLinecap="round"/><circle cx="28" cy="39" r="2" fill="#00e87a" opacity="0.9"/></svg>) },
  { id: '05', color: '#c9a84c', title: 'Time-Series Forecasting', body: 'Predict future values across sales, energy, traffic, and sensor data — with confidence intervals and automatic seasonality detection.', metric: '6mo', metricLabel: 'reliable forecast horizon', svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><polyline points="6,38 14,30 22,32 30,24 38,26 46,14" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/><polyline points="46,14 50,18 50,10 42,10" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/><line x1="6" y1="44" x2="50" y2="44" stroke="#c9a84c" strokeWidth="0.6" opacity="0.18"/></svg>) },
  { id: '06', color: '#00b85e', title: 'MLOps & Model Lifecycle', body: 'CI/CD pipelines for ML — automated retraining, A/B testing, drift monitoring, and versioned model registries in production.', metric: '100%', metricLabel: 'automated retraining', svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><circle cx="28" cy="28" r="20" stroke="#00b85e" strokeWidth="1" opacity="0.18"/><path d="M28 8 A20 20 0 0 1 48 28" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round"/><path d="M48 28 A20 20 0 0 1 28 48" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/><path d="M28 48 A20 20 0 0 1 8 28" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round" opacity="0.3"/><path d="M8 28 A20 20 0 0 1 28 8" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round" opacity="0.15"/><circle cx="28" cy="28" r="6" stroke="#00b85e" strokeWidth="1.3"/><path d="M24 28 L27 31 L33 25" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
];

function GrowthCard({ s, index, inView }: { s: typeof GROWTH_SERVICES[0]; index: number; inView: boolean }) {
  return (
    <motion.div className="ml-card" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
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

export function MLGrowth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <style>{GLOBAL_STYLES}</style>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>WHAT WE UNLOCK</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '700px' }}>
            Boost Your Business Growth<br/><span style={{ color: 'var(--accent-primary)' }}>and Efficiency with ML.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '14px', maxWidth: '520px' }}>Six production-grade ML capabilities we ship for enterprise clients — each measurable, each compounding.</p>
        </motion.div>
        <div className="ml-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {GROWTH_SERVICES.map((s, i) => <GrowthCard key={s.id} s={s} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

const ARCHITECTURES = [
  { name: 'Supervised Learning', abbr: 'SL', color: '#00e87a', models: ['XGBoost', 'LightGBM', 'Random Forest', 'SVM'], desc: 'Classification and regression models trained on labelled data — for churn prediction, pricing, and risk scoring.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="10" width="44" height="32" rx="3" stroke="#00e87a" strokeWidth="1.3" opacity="0.5"/>{[[10,20],[20,16],[30,24],[40,12]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill="#00e87a" opacity={0.4+i*0.12}/>)}<line x1="4" y1="26" x2="48" y2="26" stroke="#00e87a" strokeWidth="1" strokeDasharray="3 3" opacity="0.3"/></svg>) },
  { name: 'Deep Learning', abbr: 'DL', color: '#c9a84c', models: ['PyTorch', 'TensorFlow', 'JAX', 'Keras'], desc: 'Neural networks for image classification, speech recognition, tabular data, and sequence modelling at any scale.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}>{[10,26,42].map((x,col)=>[12,22,32].map((y,row)=>(<circle key={`${col}-${row}`} cx={x} cy={y} r="3" stroke="#c9a84c" strokeWidth="1.2" fill="none" opacity={0.4+row*0.15}/>)))}{[[10,12],[10,22],[10,32]].map(([x,y])=>[[26,12],[26,22],[26,32]].map(([tx,ty],i)=><line key={i} x1={x+3} y1={y} x2={tx-3} y2={ty} stroke="#c9a84c" strokeWidth="0.6" opacity="0.2"/>))}{[[26,12],[26,22],[26,32]].map(([x,y])=>[[42,12],[42,22],[42,32]].map(([tx,ty],i)=><line key={i} x1={x+3} y1={y} x2={tx-3} y2={ty} stroke="#c9a84c" strokeWidth="0.6" opacity="0.2"/>))}</svg>) },
  { name: 'Unsupervised Learning', abbr: 'UL', color: '#00b85e', models: ['K-Means', 'DBSCAN', 'PCA', 'Autoencoders'], desc: 'Clustering, dimensionality reduction, and anomaly detection — find hidden structure in unlabelled data.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}>{[[14,14],[16,20],[12,18]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3.5" fill="#00b85e" opacity={0.4+i*0.1}/>)}{[[36,10],[40,16],[34,18]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3.5" fill="#c9a84c" opacity={0.35+i*0.08}/>)}{[[20,36],[26,40],[16,42]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3.5" fill="#00e87a" opacity={0.4+i*0.1}/>)}<circle cx="14" cy="17" r="8" stroke="#00b85e" strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.3"/><circle cx="37" cy="14" r="8" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.3"/><circle cx="21" cy="39" r="8" stroke="#00e87a" strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.3"/></svg>) },
  { name: 'Reinforcement Learning', abbr: 'RL', color: '#00e87a', models: ['PPO', 'SAC', 'DQN', 'RLlib'], desc: 'Train agents to optimise decisions through reward signals — for pricing, logistics routing, and game-theoretic problems.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><circle cx="26" cy="26" r="14" stroke="#00e87a" strokeWidth="1.2" opacity="0.4"/><path d="M26 12 A14 14 0 0 1 40 26" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round"/><path d="M40 26 A14 14 0 0 1 26 40" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/><path d="M26 40 A14 14 0 0 1 12 26" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round" opacity="0.3"/><path d="M12 26 A14 14 0 0 1 26 12" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round" opacity="0.15"/><rect x="22" y="22" width="8" height="8" rx="1.5" stroke="#00e87a" strokeWidth="1.3"/></svg>) },
  { name: 'Feature Engineering & Pipelines', abbr: 'FE', color: '#c9a84c', models: ['Feast', 'dbt', 'Great Expectations', 'Spark'], desc: 'End-to-end data pipelines — from raw ingestion to feature stores — ensuring clean, consistent inputs for every model.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="8" width="12" height="8" rx="2" stroke="#c9a84c" strokeWidth="1.2" opacity="0.65"/><rect x="4" y="22" width="12" height="8" rx="2" stroke="#c9a84c" strokeWidth="1.2" opacity="0.65"/><rect x="4" y="36" width="12" height="8" rx="2" stroke="#c9a84c" strokeWidth="1.2" opacity="0.65"/><rect x="22" y="18" width="12" height="16" rx="2" stroke="#c9a84c" strokeWidth="1.4" opacity="0.9"/><rect x="38" y="14" width="12" height="24" rx="2" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><line x1="16" y1="12" x2="22" y2="22" stroke="#c9a84c" strokeWidth="0.9" opacity="0.35"/><line x1="16" y1="26" x2="22" y2="26" stroke="#c9a84c" strokeWidth="0.9" opacity="0.5"/><line x1="16" y1="40" x2="22" y2="30" stroke="#c9a84c" strokeWidth="0.9" opacity="0.35"/><line x1="34" y1="26" x2="38" y2="26" stroke="#c9a84c" strokeWidth="0.9" opacity="0.45"/></svg>) },
  { name: 'Model Serving & Inference', abbr: 'MSI', color: '#00b85e', models: ['TorchServe', 'Triton', 'BentoML', 'SageMaker'], desc: 'Low-latency model serving infrastructure — REST/gRPC endpoints, batch inference, GPU autoscaling, and blue-green deployments.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="8" width="44" height="28" rx="3" stroke="#00b85e" strokeWidth="1.2" opacity="0.4"/>{[[8,14],[20,14],[32,14],[8,24],[20,24],[32,24]].map(([x,y],i)=><rect key={i} x={x} y={y} width="10" height="7" rx="1.5" stroke="#00b85e" strokeWidth="1" opacity={0.35+i*0.05}/>)}<line x1="14" y1="36" x2="14" y2="42" stroke="#00b85e" strokeWidth="1.1" opacity="0.4"/><line x1="38" y1="36" x2="38" y2="42" stroke="#00b85e" strokeWidth="1.1" opacity="0.4"/><line x1="10" y1="42" x2="42" y2="42" stroke="#00b85e" strokeWidth="1.4" strokeLinecap="round" opacity="0.3"/></svg>) },
];

export function MLArchitectures() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>UNDER THE HOOD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            ML Architectures and<br/><span style={{ color: 'var(--accent-primary)' }}>Frameworks We Work With.</span>
          </h2>
        </motion.div>
        <div className="ml-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {ARCHITECTURES.map((a, i) => (
            <motion.div key={a.abbr} className="ml-arch-card" initial={{ opacity: 0, y: 38 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
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

const ROADMAP_STEPS = [
  { phase: 'DISCOVER', duration: '1 wk', color: '#00e87a', title: 'Problem Framing & Data Audit', body: 'We map your business problem to the right ML task type, audit your available data, and define success metrics and baseline benchmarks.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><circle cx="20" cy="20" r="13" stroke="#00e87a" strokeWidth="1.4" opacity="0.7"/><line x1="29" y1="29" x2="40" y2="40" stroke="#00e87a" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="20" x2="24" y2="20" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="20" y1="16" x2="20" y2="24" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/></svg>) },
  { phase: 'PREPARE', duration: '1–2 wks', color: '#c9a84c', title: 'Data Preparation & Feature Engineering', body: 'Clean, transform, and enrich your data. Build feature pipelines, handle class imbalance, and create feature stores for reuse.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><ellipse cx="24" cy="14" rx="14" ry="5" stroke="#c9a84c" strokeWidth="1.3"/><line x1="10" y1="14" x2="10" y2="24" stroke="#c9a84c" strokeWidth="1.3"/><line x1="38" y1="14" x2="38" y2="24" stroke="#c9a84c" strokeWidth="1.3"/><ellipse cx="24" cy="24" rx="14" ry="5" stroke="#c9a84c" strokeWidth="1.3"/><line x1="10" y1="24" x2="10" y2="34" stroke="#c9a84c" strokeWidth="1.3" opacity="0.5"/><line x1="38" y1="24" x2="38" y2="34" stroke="#c9a84c" strokeWidth="1.3" opacity="0.5"/><ellipse cx="24" cy="34" rx="14" ry="5" stroke="#c9a84c" strokeWidth="1.3" opacity="0.5"/></svg>) },
  { phase: 'TRAIN', duration: '2–4 wks', color: '#00b85e', title: 'Model Training & Hyperparameter Tuning', body: 'Train candidate models, run automated hyperparameter search, and select the best performer using cross-validation and holdout sets.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><path d="M8 36 L14 24 L20 28 L26 16 L32 20 L40 8" stroke="#00b85e" strokeWidth="1.7" strokeLinecap="round"/>{([[14,24],[20,28],[26,16],[32,20]] as [number,number][]).map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" fill="#00b85e" opacity={0.5+i*0.1}/>)}<line x1="8" y1="40" x2="42" y2="40" stroke="#00b85e" strokeWidth="0.7" opacity="0.2"/></svg>) },
  { phase: 'EVALUATE', duration: '1 wk', color: '#00e87a', title: 'Evaluation, Explainability & Bias Testing', body: 'Validate models against business KPIs, generate SHAP explainability reports, and run fairness audits before any production rollout.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><path d="M24 6 L40 13 L40 26 C40 34 33 40 24 42 C15 40 8 34 8 26 L8 13 Z" stroke="#00e87a" strokeWidth="1.3" fill="none" opacity="0.6"/><path d="M17 24 L22 29 L32 19" stroke="#00e87a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/></svg>) },
  { phase: 'DEPLOY', duration: 'Ongoing', color: '#c9a84c', title: 'Deployment, Monitoring & Retraining', body: 'Serve models via low-latency APIs, monitor for data and concept drift, and trigger automated retraining when performance degrades.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><circle cx="24" cy="24" r="18" stroke="#c9a84c" strokeWidth="1.2" opacity="0.2"/><path d="M24 6 A18 18 0 0 1 42 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round"/><path d="M42 24 A18 18 0 0 1 24 42" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/><path d="M24 42 A18 18 0 0 1 6 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.3"/><path d="M6 24 A18 18 0 0 1 24 6" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.15"/><circle cx="24" cy="24" r="5" stroke="#c9a84c" strokeWidth="1.3"/><circle cx="24" cy="24" r="2" fill="#c9a84c" opacity="0.8"/></svg>) },
];

export function MLRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>HOW WE BUILD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Our Proven ML Application<br/><span style={{ color: 'var(--accent-primary)' }}>Development Roadmap.</span>
          </h2>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative' }}>
          <div className="ml-tl-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,232,122,0.07)', transform: 'translateX(-50%)' }}/>
          {ROADMAP_STEPS.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={s.phase} initial={{ opacity: 0, x: isLeft ? -48 : 48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, ease: EASE }}
                className="ml-step-wrap" style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '11px', height: '11px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}88`, zIndex: 4 }}/>
                <div className="ml-step-card" style={{ width: '44%', borderRadius: '14px', background: 'var(--bg-surface)', border: `1px solid ${s.color}1e`, padding: '22px', boxShadow: '0 4px 18px rgba(0,0,0,0.18)', transition: 'transform 0.25s, box-shadow 0.25s' }}>
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

const INDUSTRIES = [
  { name: 'Healthcare', color: '#00e87a', useCases: ['Patient readmission prediction', 'Drug discovery acceleration', 'Medical imaging classification', 'Clinical trial matching'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="3" width="30" height="30" rx="5" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="18" y1="9" x2="18" y2="27" stroke="#00e87a" strokeWidth="2.2" strokeLinecap="round"/><line x1="9" y1="18" x2="27" y2="18" stroke="#00e87a" strokeWidth="2.2" strokeLinecap="round"/></svg>) },
  { name: 'Finance & Banking', color: '#c9a84c', useCases: ['Credit risk scoring', 'Algorithmic trading signals', 'Fraud pattern detection', 'Loan default prediction'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="8" width="30" height="22" rx="3" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><line x1="3" y1="14" x2="33" y2="14" stroke="#c9a84c" strokeWidth="0.8" opacity="0.3"/><circle cx="10" cy="22" r="3" stroke="#c9a84c" strokeWidth="1.1" opacity="0.6"/></svg>) },
  { name: 'Retail & E-Commerce', color: '#00b85e', useCases: ['Demand forecasting', 'Dynamic pricing models', 'Customer segmentation', 'Cart abandonment prediction'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M4 8 L8 8 L12 22 L26 22 L30 12 L10 12" stroke="#00b85e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/><circle cx="14" cy="27" r="2.5" stroke="#00b85e" strokeWidth="1.2" opacity="0.7"/><circle cx="24" cy="27" r="2.5" stroke="#00b85e" strokeWidth="1.2" opacity="0.7"/></svg>) },
  { name: 'Manufacturing', color: '#00e87a', useCases: ['Predictive maintenance', 'Yield optimisation models', 'Defect classification', 'Energy consumption forecasting'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><circle cx="18" cy="18" r="8" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/><circle cx="18" cy="18" r="3" fill="#00e87a" opacity="0.8"/>{[0,60,120,180,240,300].map((a,i)=>{const r=(a*Math.PI)/180;return <line key={i} x1={18+8*Math.cos(r)} y1={18+8*Math.sin(r)} x2={18+12*Math.cos(r)} y2={18+12*Math.sin(r)} stroke="#00e87a" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>;})}</svg>) },
  { name: 'Logistics', color: '#c9a84c', useCases: ['Route optimisation ML', 'Delivery delay prediction', 'Warehouse demand planning', 'Fleet maintenance forecasting'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="2" y="14" width="22" height="14" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/><path d="M24 20 L30 20 L34 26 L34 28 L24 28 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.8"/><circle cx="8" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><circle cx="20" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><circle cx="30" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/></svg>) },
  { name: 'Human Resources', color: '#00b85e', useCases: ['Employee churn prediction', 'Candidate ranking models', 'Performance score forecasting', 'Salary band modelling'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><circle cx="18" cy="12" r="6" stroke="#00b85e" strokeWidth="1.3" opacity="0.8"/><path d="M6 30 C6 23 30 23 30 30" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.7"/></svg>) },
  { name: 'Energy & Utilities', color: '#00e87a', useCases: ['Energy demand forecasting', 'Grid anomaly detection', 'Renewable output prediction', 'Asset failure modelling'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M20 4 L8 20 L16 20 L14 32 L28 16 L20 16 Z" stroke="#00e87a" strokeWidth="1.3" fill="none" opacity="0.8" strokeLinejoin="round"/></svg>) },
  { name: 'Real Estate', color: '#c9a84c', useCases: ['Property price prediction', 'Rental yield modelling', 'Market trend forecasting', 'Lead scoring models'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 4 L32 16 L32 32 L4 32 L4 16 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.7"/><rect x="13" y="22" width="10" height="10" rx="1" stroke="#c9a84c" strokeWidth="1.2" opacity="0.6"/></svg>) },
  { name: 'Education', color: '#00b85e', useCases: ['Student dropout prediction', 'Learning outcome modelling', 'Adaptive difficulty scoring', 'Engagement forecasting'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 6 L33 14 L18 22 L3 14 Z" stroke="#00b85e" strokeWidth="1.3" fill="none" opacity="0.8"/><path d="M9 18 L9 26 Q18 30 27 26 L27 18" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6"/></svg>) },
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

const STATS = [
  { value: 9, suffix: '', label: 'Industries Served', color: '#00e87a' },
  { value: 50, suffix: '+', label: 'ML Models in Production', color: '#c9a84c' },
  { value: 94, suffix: '%', label: 'Avg. Model Accuracy', color: '#00b85e' },
  { value: 3.8, suffix: 'x', label: 'Avg. ROI on ML Projects', color: '#00e87a' },
];

function StatCard({ stat, index, inView }: { stat: typeof STATS[0]; index: number; inView: boolean }) {
  const dec = stat.value % 1 !== 0 ? 1 : 0;
  const val = useCounter(stat.value, dec, inView, index * 120);
  return (
    <motion.div key={index} className="ml-stat-card" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
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
    <motion.div className="ml-industry-card" initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      onClick={() => setOpen(o => !o)}
      style={{ borderRadius: '14px', overflow: 'hidden', background: open ? `${ind.color}08` : 'var(--bg-surface)', border: `1px solid ${open ? ind.color+'44' : ind.color+'1a'}`, boxShadow: '0 4px 16px rgba(0,0,0,0.16)' }}>
      <div style={{ height: '2px', background: `linear-gradient(90deg,${ind.color},transparent)`, opacity: open ? 0.7 : 0.35 }}/>
      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: open ? '14px' : 0 }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0, background: `${ind.color}10`, border: `1px solid ${ind.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ind.svg}</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{ind.name}</h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ind.color, opacity: 0.65, letterSpacing: '0.08em' }}>{ind.useCases.length} ML applications</span>
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

export function MLIndustries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>ML BY VERTICAL</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '720px' }}>
            Specialized ML Solutions<br/><span style={{ color: 'var(--accent-primary)' }}>for Various Industries.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', marginTop: '14px', maxWidth: '500px', lineHeight: 1.75 }}>Click any industry to see the ML applications we deploy.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '48px' }} className="ml-stats-strip">
          {STATS.map((s, i) => <StatCard key={i} stat={s} index={i} inView={inView} />)}
        </div>
        <div className="ml-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {INDUSTRIES.map((ind, i) => <IndustryCard key={ind.name} ind={ind} index={i} inView={inView} />)}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .ml-stats-strip{ grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}