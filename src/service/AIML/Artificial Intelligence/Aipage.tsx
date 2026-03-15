import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const GLOBAL_STYLES = `
  .ai-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .ai-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.35) !important; }
  .ai-step-card { transition: transform 0.25s, box-shadow 0.25s; }
  .ai-step-card:hover { transform: translateY(-4px) scale(1.01); }
  .ai-stat-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .ai-stat-card:hover { transform: translateY(-7px) scale(1.02); box-shadow: 0 20px 50px rgba(0,0,0,0.4) !important; }
  
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  
  @media(max-width:1024px){ .grid-3{ grid-template-columns: 1fr 1fr !important; } }
  @media(max-width:640px){ .grid-3{ grid-template-columns: 1fr !important; } .feat-span{ grid-column: span 1 !important; } }
  @media(max-width:768px){ 
    .tl-line{ display:none; } 
    .step-wrap{ justify-content: center !important; } 
    .step-card{ width: 100% !important; }
    .sec-header { text-align: center !important; }
    .sec-header p { margin-left: auto !important; margin-right: auto !important; }
  }
`;

/* ═══════════════════════════════════════════════
   SECTION 1 — Enterprise Challenges We Solve
═══════════════════════════════════════════════ */

const CHALLENGES = [
  {
    id: '01', color: '#00e87a',
    title: 'Data Trapped in Silos',
    body: 'Critical business data lives across 12 disconnected tools. Decisions take days because no single source of truth exists.',
    solution: 'Unified AI data layer that ingests, normalises, and surfaces insights from every system in real-time.',
    svg: (
      <svg viewBox="0 0 72 72" fill="none" style={{ width: 52, height: 52 }}>
        {([[10,8],[32,18],[54,6]] as [number,number][]).map(([x,y],i) => (
          <g key={i}>
            <ellipse cx={x+8} cy={y+4} rx="8" ry="3" stroke="#00e87a" strokeWidth="1.4" opacity={0.4+i*0.2}/>
            <line x1={x} y1={y+4} x2={x} y2={y+18} stroke="#00e87a" strokeWidth="1.4" opacity={0.4+i*0.2}/>
            <line x1={x+16} y1={y+4} x2={x+16} y2={y+18} stroke="#00e87a" strokeWidth="1.4" opacity={0.4+i*0.2}/>
            <ellipse cx={x+8} cy={y+18} rx="8" ry="3" stroke="#00e87a" strokeWidth="1.4" opacity={0.4+i*0.2}/>
          </g>
        ))}
        <path d="M26 22 L30 22" stroke="#ff5555" strokeWidth="1.5" strokeDasharray="2 2"/>
        <path d="M42 28 L46 28" stroke="#ff5555" strokeWidth="1.5" strokeDasharray="2 2"/>
        <circle cx="36" cy="50" r="4" fill="#00e87a" opacity="0.1"/>
        <circle cx="36" cy="50" r="2" fill="#00e87a" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: '02', color: '#c9a84c',
    title: 'Manual Repetitive Work',
    body: 'Skilled engineers spend 60% of their time on data entry, report generation, and rule-based tasks a system could do instantly.',
    solution: 'AI agents that execute repetitive workflows autonomously — 24/7, without errors, without fatigue.',
    svg: (
      <svg viewBox="0 0 72 72" fill="none" style={{ width: 52, height: 52 }}>
        <circle cx="24" cy="16" r="8" stroke="#c9a84c" strokeWidth="1.4" opacity="0.8"/>
        <path d="M16 32 C16 26 32 26 32 32 L32 44 L16 44 Z" stroke="#c9a84c" strokeWidth="1.4" opacity="0.7"/>
        <path d="M42 20 C50 20 56 26 56 34 C56 42 50 48 42 48" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M42 20 L38 16 M42 20 L38 24" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="49" cy="34" r="1.5" fill="#c9a84c" opacity="0.5"/>
        <line x1="49" y1="34" x2="49" y2="29" stroke="#c9a84c" strokeWidth="1.2"/>
        <line x1="49" y1="34" x2="52" y2="34" stroke="#c9a84c" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: '03', color: '#00b85e',
    title: 'Slow Document Processing',
    body: 'Invoices, contracts, and reports pile up. Manual review creates bottlenecks — one missed clause costs six figures.',
    solution: 'LLM-powered document intelligence that reads, extracts, flags anomalies, and routes in milliseconds.',
    svg: (
      <svg viewBox="0 0 72 72" fill="none" style={{ width: 52, height: 52 }}>
        {([[6,8],[10,4],[14,0]] as [number,number][]).map(([dx,dy],i) => (
          <g key={i}>
            <rect x={8+dx} y={12+dy} width="28" height="36" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity={0.28+i*0.3}/>
            {i===2 && <>
              <line x1={14} y1={24} x2={30} y2={24} stroke="#00b85e" strokeWidth="1" opacity="0.5"/>
              <line x1={14} y1={30} x2={30} y2={30} stroke="#00b85e" strokeWidth="1" opacity="0.4"/>
              <line x1={14} y1={36} x2={24} y2={36} stroke="#00b85e" strokeWidth="1" opacity="0.3"/>
            </>}
          </g>
        ))}
        <line x1="49" y1="10" x2="49" y2="54" stroke="#00b85e" strokeWidth="1.5" opacity="0.4"/>
        <polyline points="48,38 52,44 62,28" stroke="#00b85e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85"/>
      </svg>
    ),
  },
  {
    id: '04', color: '#00e87a',
    title: 'No Predictive Intelligence',
    body: "Leaders make decisions on last month's data. Demand spikes go undetected, stockouts blindside operations.",
    solution: 'Forecasting models that predict demand, churn, and anomalies 30–90 days out with explainable confidence scores.',
    svg: (
      <svg viewBox="0 0 72 72" fill="none" style={{ width: 52, height: 52 }}>
        <polyline points="8,52 18,44 28,46 38,34 48,38 58,24" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" strokeDasharray="4 3"/>
        <polyline points="38,34 48,24 58,14" stroke="#00e87a" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
        <path d="M38 34 L48 22 L58 10 L58 18 L48 28 L38 38 Z" fill="#00e87a" opacity="0.05"/>
        {([[18,44],[28,46],[38,34]] as [number,number][]).map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#00e87a" opacity="0.5"/>
        ))}
        <circle cx="48" cy="24" r="3.5" fill="#00e87a" opacity="0.85"/>
        <line x1="8" y1="8" x2="8" y2="56" stroke="#00e87a" strokeWidth="0.8" opacity="0.15"/>
        <line x1="8" y1="56" x2="62" y2="56" stroke="#00e87a" strokeWidth="0.8" opacity="0.15"/>
      </svg>
    ),
  },
  {
    id: '05', color: '#c9a84c',
    title: 'Quality Defects at Scale',
    body: 'Visual QC on production lines misses sub-millimetre defects. Defective products reach customers, triggering returns.',
    solution: 'Sub-millimetre computer vision running at line speed — 99.2% accuracy, real-time reject flagging.',
    svg: (
      <svg viewBox="0 0 72 72" fill="none" style={{ width: 52, height: 52 }}>
        <circle cx="36" cy="30" r="18" stroke="#c9a84c" strokeWidth="1.5" opacity="0.3"/>
        <circle cx="36" cy="30" r="12" stroke="#c9a84c" strokeWidth="1.5" opacity="0.55"/>
        <circle cx="36" cy="30" r="6" stroke="#c9a84c" strokeWidth="1.5" opacity="0.8"/>
        <circle cx="36" cy="30" r="2.5" fill="#c9a84c"/>
        <line x1="36" y1="8" x2="36" y2="18" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/>
        <line x1="36" y1="42" x2="36" y2="52" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/>
        <line x1="14" y1="30" x2="24" y2="30" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/>
        <line x1="48" y1="30" x2="58" y2="30" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/>
        <rect x="42" y="22" width="12" height="10" rx="1" stroke="#ff5555" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.75"/>
        <text x="48" y="29" textAnchor="middle" fill="#ff5555" fontSize="5" fontFamily="monospace">!</text>
      </svg>
    ),
  },
  {
    id: '06', color: '#00b85e',
    title: 'High Cost of Human Review',
    body: 'Compliance, HR screening, and customer support burn headcount on tasks that follow deterministic rules.',
    solution: 'AI decision layers that handle 80% of routine cases autonomously, escalating only true edge cases.',
    svg: (
      <svg viewBox="0 0 72 72" fill="none" style={{ width: 52, height: 52 }}>
        <path d="M8 12 L64 12 L44 34 L44 58 L28 58 L28 34 Z" stroke="#00b85e" strokeWidth="1.5" strokeLinejoin="round" opacity="0.65"/>
        {([[16,20],[32,20],[48,20]] as [number,number][]).map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#00b85e" opacity={0.28+i*0.15}/>
        ))}
        <rect x="30" y="36" width="20" height="12" rx="2" fill="rgba(0,184,94,0.1)" stroke="#00b85e" strokeWidth="0.8"/>
        <text x="40" y="45" textAnchor="middle" fill="#00b85e" fontSize="7" fontFamily="monospace" fontWeight="bold">80%</text>
      </svg>
    ),
  },
];

function ChallengeCard({ c, index, inView }: { c: typeof CHALLENGES[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="ai-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      onClick={() => setOpen(o => !o)}
      style={{
        borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
        background: 'var(--bg-surface)',
        border: `1px solid ${c.color}1a`,
        boxShadow: '0 4px 18px rgba(0,0,0,0.2)',
        position: 'relative',
      }}
    >
      <div style={{ height: '2px', background: `linear-gradient(90deg,${c.color},transparent)`, opacity: 0.45 }}/>
      <div style={{ padding: '24px', position: 'relative' }}>
        <div style={{
          position: 'absolute', right: '12px', top: '8px',
          fontFamily: 'var(--font-mono)', fontSize: '46px', fontWeight: 700,
          color: c.color, opacity: 0.04, lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>{c.id}</div>

        <div style={{ marginBottom: '12px' }}>{c.svg}</div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '7px', lineHeight: 1.3 }}>
          {c.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '12px' }}>
          {c.body}
        </p>

        {open && (
          <div style={{ borderTop: `1px solid ${c.color}22`, paddingTop: '10px', display: 'flex', gap: '8px' }}>
            <span style={{ color: c.color, fontSize: '13px', flexShrink: 0 }}>→</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: c.color, lineHeight: 1.65, margin: 0, opacity: 0.88 }}>
              {c.solution}
            </p>
          </div>
        )}

        <div style={{ marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: c.color, opacity: 0.55, letterSpacing: '0.1em' }}>
          {open ? 'COLLAPSE ↑' : 'SEE SOLUTION ↓'}
        </div>
      </div>
    </motion.div>
  );
}

export function EnterpriseChallenges() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: 'var(--bg-void)', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 32px)', overflow: 'hidden' }}>
      <style>{GLOBAL_STYLES}</style>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }} className="sec-header" style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>
            THE PROBLEM SPACE
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Enterprise Challenges<br/>
            <span style={{ color: 'var(--accent-primary)' }}>We Solve.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '14px', maxWidth: '500px' }}>
            Click any challenge to see exactly how our AI eliminates it.
          </p>
        </motion.div>
        <div className="grid-3">
          {CHALLENGES.map((c, i) => <ChallengeCard key={c.id} c={c} index={i} inView={inView}/>)}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════
   SECTION 2 — How We Transform Your Workflows
═══════════════════════════════════════════════ */

const STEPS = [
  {
    phase: 'DISCOVER', duration: '1–2 wks', color: '#00e87a',
    title: 'Map Your Workflows',
    body: 'We embed with your ops team for 1–2 weeks. Every manual step, bottleneck, and data handoff gets documented.',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" style={{ width: 40, height: 40 }}>
        <rect x="6" y="12" width="44" height="32" rx="3" stroke="#00e87a" strokeWidth="1.4" opacity="0.5"/>
        <path d="M6 24 Q18 18 28 24 Q38 30 50 24" stroke="#00e87a" strokeWidth="1" opacity="0.28"/>
        <circle cx="34" cy="22" r="5" stroke="#00e87a" strokeWidth="1.4" opacity="0.85"/>
        <circle cx="34" cy="22" r="2" fill="#00e87a"/>
        <line x1="34" y1="27" x2="34" y2="34" stroke="#00e87a" strokeWidth="1.4" opacity="0.55"/>
        <path d="M16 34 Q20 22 34 22" stroke="#00e87a" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
      </svg>
    ),
  },
  {
    phase: 'ARCHITECT', duration: '1 wk', color: '#c9a84c',
    title: 'Design the AI System',
    body: 'We spec the model architecture, data pipelines, APIs, and integration points. Full system diagrams shared.',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" style={{ width: 40, height: 40 }}>
        {[0,1,2,3].map(i => <line key={`v${i}`} x1={10+i*12} y1="8" x2={10+i*12} y2="48" stroke="#c9a84c" strokeWidth="0.5" opacity="0.16"/>)}
        {[0,1,2,3].map(i => <line key={`h${i}`} x1="6" y1={12+i*10} x2="50" y2={12+i*10} stroke="#c9a84c" strokeWidth="0.5" opacity="0.16"/>)}
        <rect x="6" y="9" width="13" height="9" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/>
        <rect x="37" y="9" width="13" height="9" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/>
        <rect x="19" y="30" width="18" height="9" rx="2" stroke="#c9a84c" strokeWidth="1.7" opacity="0.95"/>
        <line x1="19" y1="18" x2="26" y2="30" stroke="#c9a84c" strokeWidth="1.1" opacity="0.5"/>
        <line x1="37" y1="18" x2="32" y2="30" stroke="#c9a84c" strokeWidth="1.1" opacity="0.5"/>
        <text x="28" y="36" textAnchor="middle" fill="#c9a84c" fontSize="5" fontFamily="monospace">AI CORE</text>
      </svg>
    ),
  },
  {
    phase: 'BUILD', duration: '3–6 wks', color: '#00b85e',
    title: 'Train & Integrate',
    body: 'Models trained on your proprietary data. APIs integrated into your existing stack. CI/CD for continuous retraining.',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" style={{ width: 40, height: 40 }}>
        <circle cx="22" cy="28" r="11" stroke="#00b85e" strokeWidth="1.3" opacity="0.45"/>
        <circle cx="22" cy="28" r="6" stroke="#00b85e" strokeWidth="1.4" opacity="0.7"/>
        {[0,45,90,135,180,225,270,315].map((a,i) => {
          const r=(a*Math.PI)/180;
          return <line key={i} x1={22+11*Math.cos(r)} y1={28+11*Math.sin(r)} x2={22+14*Math.cos(r)} y2={28+14*Math.sin(r)} stroke="#00b85e" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>;
        })}
        <rect x="38" y="16" width="12" height="22" rx="2" stroke="#00b85e" strokeWidth="1" opacity="0.38"/>
        <line x1="40" y1="21" x2="48" y2="21" stroke="#00b85e" strokeWidth="0.9" opacity="0.45"/>
        <line x1="40" y1="25" x2="46" y2="25" stroke="#00b85e" strokeWidth="0.9" opacity="0.38"/>
        <line x1="40" y1="29" x2="48" y2="29" stroke="#00b85e" strokeWidth="0.9" opacity="0.4"/>
      </svg>
    ),
  },
  {
    phase: 'DEPLOY', duration: '1 wk', color: '#00e87a',
    title: 'Go Live & Monitor',
    body: 'Zero-downtime deployment. Live dashboards show model accuracy, throughput, and business impact from day one.',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" style={{ width: 40, height: 40 }}>
        <path d="M28 6 C28 6 20 16 18 28 L28 32 L38 28 C36 16 28 6 28 6 Z" stroke="#00e87a" strokeWidth="1.4" opacity="0.78"/>
        <ellipse cx="23" cy="30" rx="3" ry="4.5" stroke="#00e87a" strokeWidth="1.1" opacity="0.45"/>
        <ellipse cx="33" cy="30" rx="3" ry="4.5" stroke="#00e87a" strokeWidth="1.1" opacity="0.45"/>
        <path d="M24 35 Q26 41 28 38 Q30 41 32 35" stroke="#00e87a" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45"/>
        <circle cx="28" cy="20" r="4.5" stroke="#00e87a" strokeWidth="1" opacity="0.28"/>
        <circle cx="28" cy="20" r="2.5" fill="#00e87a" opacity="0.65"/>
        {([[8,10],[48,14],[10,40],[50,38]] as [number,number][]).map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#00e87a" opacity={0.22+i*0.07}/>
        ))}
      </svg>
    ),
  },
  {
    phase: 'EVOLVE', duration: 'Ongoing', color: '#c9a84c',
    title: 'Retrain & Scale',
    body: 'Models improve as new data flows in. We expand coverage, add automation layers, and compound ROI every quarter.',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" style={{ width: 40, height: 40 }}>
        <path d="M10 28 C10 22 16 16 22 20 C27 23 24 30 29 33 C35 38 46 33 43 27 C40 21 30 18 22 20" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.78"/>
        <path d="M43 27 C43 33 37 38 31 34 C26 30 29 23 22 20 C16 16 6 21 10 28 C13 34 24 37 31 34" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3"/>
        <path d="M22 20 L18 16 M22 20 L19 24" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round"/>
        {[0,1,2,3].map(i => (
          <rect key={i} x={6+i*8} y={50-(3+i*4)} width="5" height={3+i*4} rx="1" fill="#c9a84c" opacity={0.16+i*0.12}/>
        ))}
      </svg>
    ),
  },
];

export function WorkflowTransformation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section style={{ background: 'var(--bg-deep)', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 32px)', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }} className="sec-header" style={{ textAlign: 'center', marginBottom: '68px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>
            THE PROCESS
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            How We Transform<br/>
            <span style={{ color: 'var(--accent-primary)' }}>Your Workflows.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
          <div className="tl-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,232,122,0.07)', transform: 'translateX(-50%)' }}/>

          {STEPS.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={s.phase}
                initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="step-wrap"
                style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative' }}
              >
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: '11px', height: '11px', borderRadius: '50%',
                  background: s.color, boxShadow: `0 0 8px ${s.color}88`, zIndex: 4,
                }}/>
                <div className="ai-step-card step-card" style={{
                  width: '44%', borderRadius: '14px', background: 'var(--bg-surface)',
                  border: `1px solid ${s.color}1e`, padding: '22px',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
                }}>
                  <div style={{ height: '2px', background: `linear-gradient(90deg,${s.color},transparent)`, marginBottom: '14px', opacity: 0.5 }}/>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    {s.svg}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: s.color, border: `1px solid ${s.color}40`, padding: '2px 7px', borderRadius: '100px', letterSpacing: '0.1em' }}>
                          {s.phase}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-tertiary)' }}>{s.duration}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '5px' }}>
                        {s.title}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                        {s.body}
                      </p>
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
   SECTION 3 — Enterprise-Ready Capabilities
═══════════════════════════════════════════════ */

const CAPABILITIES = [
  {
    title: 'Custom LLM Fine-Tuning', color: '#00e87a', featured: true,
    desc: 'GPT-4o, Llama 3, Mistral — fine-tuned on your proprietary data. Your IP stays yours, models run on your infra.',
    tags: ['Fine-tuning','RAG','LoRA','On-prem'],
    svg: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36 }}>
        <path d="M24 8 C18 8 12 12 12 18 C10 18 8 20 8 22 C8 26 10 28 13 28 C13 34 18 38 24 38 C30 38 35 34 35 28 C38 28 40 26 40 22 C40 20 38 18 36 18 C36 12 30 8 24 8 Z" stroke="#00e87a" strokeWidth="1.3" opacity="0.72"/>
        <line x1="24" y1="8" x2="24" y2="38" stroke="#00e87a" strokeWidth="0.7" opacity="0.16"/>
        <path d="M13 20 Q17 16 24 18 Q31 20 35 16" stroke="#00e87a" strokeWidth="1" opacity="0.32"/>
        <path d="M12 24 Q16 28 20 26 Q24 24 28 28 Q32 32 36 28" stroke="#00e87a" strokeWidth="1" opacity="0.22"/>
      </svg>
    ),
  },
  {
    title: 'RAG Knowledge Pipelines', color: '#c9a84c', featured: false,
    desc: 'Connect your documents, wikis, and databases to an LLM. Ask anything, get answers grounded in your actual data.',
    tags: ['Vector DB','Embeddings','Chunking','Reranking'],
    svg: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36 }}>
        <ellipse cx="15" cy="12" rx="7" ry="3" stroke="#c9a84c" strokeWidth="1.3"/>
        <line x1="8" y1="12" x2="8" y2="22" stroke="#c9a84c" strokeWidth="1.3"/>
        <line x1="22" y1="12" x2="22" y2="22" stroke="#c9a84c" strokeWidth="1.3"/>
        <ellipse cx="15" cy="22" rx="7" ry="3" stroke="#c9a84c" strokeWidth="1.3"/>
        <path d="M22 17 L30 17" stroke="#c9a84c" strokeWidth="1.1" strokeDasharray="2 2"/>
        <rect x="30" y="12" width="10" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.2"/>
        <line x1="32" y1="15" x2="38" y2="15" stroke="#c9a84c" strokeWidth="0.9" opacity="0.55"/>
        <line x1="32" y1="18" x2="36" y2="18" stroke="#c9a84c" strokeWidth="0.9" opacity="0.45"/>
      </svg>
    ),
  },
  {
    title: 'AI Agent Orchestration', color: '#00b85e', featured: false,
    desc: 'Multi-step autonomous agents that browse, write, call APIs, and complete tasks end-to-end without human input.',
    tags: ['LangGraph','AutoGen','Tool use','Memory'],
    svg: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36 }}>
        <circle cx="24" cy="9" r="5" stroke="#00b85e" strokeWidth="1.3"/>
        <circle cx="10" cy="30" r="5" stroke="#00b85e" strokeWidth="1.3" opacity="0.65"/>
        <circle cx="38" cy="30" r="5" stroke="#00b85e" strokeWidth="1.3" opacity="0.65"/>
        <line x1="24" y1="14" x2="14" y2="26" stroke="#00b85e" strokeWidth="1.1" opacity="0.45"/>
        <line x1="24" y1="14" x2="34" y2="26" stroke="#00b85e" strokeWidth="1.1" opacity="0.45"/>
        <line x1="15" y1="32" x2="33" y2="32" stroke="#00b85e" strokeWidth="1.1" opacity="0.28" strokeDasharray="3 2"/>
        <text x="24" y="12" textAnchor="middle" fill="#00b85e" fontSize="5" fontFamily="monospace">AI</text>
      </svg>
    ),
  },
  {
    title: 'Computer Vision Systems', color: '#00e87a', featured: false,
    desc: 'Object detection, defect recognition, OCR, and video analytics — edge-deployed or cloud, sub-100ms latency.',
    tags: ['YOLO','OpenCV','Edge','Real-time'],
    svg: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36 }}>
        <rect x="4" y="10" width="40" height="28" rx="3" stroke="#00e87a" strokeWidth="1.3" opacity="0.45"/>
        <circle cx="24" cy="24" r="8" stroke="#00e87a" strokeWidth="1.3"/>
        <circle cx="24" cy="24" r="3" fill="#00e87a" opacity="0.7"/>
        {([[8,14],[36,14],[8,30],[36,30]] as [number,number][]).map(([x,y],i) => (
          <polyline key={i} points={i===0?`${x},${y+4} ${x},${y} ${x+4},${y}`:i===1?`${x-4},${y} ${x},${y} ${x},${y+4}`:i===2?`${x},${y-4} ${x},${y} ${x+4},${y}`:`${x-4},${y} ${x},${y} ${x},${y-4}`}
            stroke="#00e87a" strokeWidth="1.3" fill="none" opacity="0.6"/>
        ))}
      </svg>
    ),
  },
  {
    title: 'Predictive Analytics', color: '#c9a84c', featured: false,
    desc: 'Time-series forecasting, demand prediction, anomaly detection — models trained on your historical patterns.',
    tags: ['Prophet','LSTM','XGBoost','Explainable AI'],
    svg: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36 }}>
        <polyline points="4,38 10,30 18,32 26,20 34,24 44,10" stroke="#c9a84c" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M26 20 L34 12 L44 6" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="3 2" opacity="0.45"/>
        {([[10,30],[18,32],[26,20],[34,24]] as [number,number][]).map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#c9a84c" opacity={0.45+i*0.1}/>
        ))}
        <line x1="4" y1="6" x2="4" y2="42" stroke="#c9a84c" strokeWidth="0.7" opacity="0.16"/>
        <line x1="4" y1="42" x2="46" y2="42" stroke="#c9a84c" strokeWidth="0.7" opacity="0.16"/>
      </svg>
    ),
  },
  {
    title: 'Document Intelligence', color: '#00b85e', featured: false,
    desc: 'Extract structured data from invoices, contracts, and reports. Multi-format, multi-language, 98.7% accuracy.',
    tags: ['OCR','NER','GPT-4o','Multi-lang'],
    svg: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36 }}>
        <rect x="6" y="4" width="24" height="32" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.65"/>
        <line x1="10" y1="12" x2="26" y2="12" stroke="#00b85e" strokeWidth="1" opacity="0.45"/>
        <line x1="10" y1="17" x2="22" y2="17" stroke="#00b85e" strokeWidth="1" opacity="0.38"/>
        <line x1="10" y1="22" x2="24" y2="22" stroke="#00b85e" strokeWidth="1" opacity="0.38"/>
        <path d="M30 16 L38 16 L38 26 L30 26" stroke="#00b85e" strokeWidth="1.1" fill="none" opacity="0.55"/>
        <line x1="34" y1="19" x2="42" y2="19" stroke="#00b85e" strokeWidth="0.9" opacity="0.45"/>
        <line x1="34" y1="23" x2="40" y2="23" stroke="#00b85e" strokeWidth="0.9" opacity="0.38"/>
        <polyline points="32,34 35,38 42,28" stroke="#00b85e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.82"/>
      </svg>
    ),
  },
];

export function EnterpriseCapabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: 'var(--bg-void)', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 32px)', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }} className="sec-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>
            WHAT WE DELIVER
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Enterprise-Ready<br/>
            <span style={{ color: 'var(--accent-primary)' }}>Capabilities.</span>
          </h2>
        </motion.div>

        <div className="grid-3">
          {CAPABILITIES.map((cap, i) => (
            <motion.div key={cap.title}
              className={`ai-card ${cap.featured ? 'feat-span' : ''}`}
              initial={{ opacity: 0, y: 38 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              style={{
                borderRadius: '14px', overflow: 'hidden',
                background: cap.featured ? 'var(--bg-raised)' : 'var(--bg-surface)',
                border: `1px solid ${cap.featured ? cap.color+'2a' : cap.color+'1a'}`,
                boxShadow: cap.featured ? '0 8px 28px rgba(0,0,0,0.22)' : '0 4px 16px rgba(0,0,0,0.16)',
                gridColumn: cap.featured ? undefined : 'span 1',
              }}
            >
              <div style={{ height: '2px', background: `linear-gradient(90deg,${cap.color},transparent)`, opacity: cap.featured ? 0.65 : 0.38 }}/>
              <div style={{ padding: cap.featured ? '26px 30px' : '22px', display: cap.featured ? 'flex' : 'block', gap: '22px', alignItems: 'flex-start' }}>
                <div style={{ marginBottom: cap.featured ? 0 : '12px', flexShrink: 0 }}>{cap.svg}</div>
                <div>
                  {cap.featured && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: cap.color, border: `1px solid ${cap.color}44`, padding: '2px 8px', borderRadius: '100px', display: 'inline-block', marginBottom: '8px', letterSpacing: '0.1em' }}>
                      FLAGSHIP
                    </span>
                  )}
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: cap.featured ? '19px' : '15px', color: 'var(--text-primary)', marginBottom: '7px', lineHeight: 1.3 }}>
                    {cap.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '12px' }}>
                    {cap.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {cap.tags.map(tag => (
                      <span key={tag} className="ai-tag" style={{
                        fontFamily: 'var(--font-mono)', fontSize: '10px',
                        padding: '2px 9px', borderRadius: '100px',
                        border: `1px solid ${cap.color}26`, color: 'var(--text-tertiary)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
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
   SECTION 4 — Statistical Countdown
═══════════════════════════════════════════════ */

const AI_STATS = [
  { value: 80,   suffix: '%', label: 'Reduction in manual work',     sub: 'Average across deployments',   color: '#00e87a' },
  { value: 98.7, suffix: '%', label: 'Document extraction accuracy', sub: 'GPT-4o + custom validation',   color: '#00e87a' },
  { value: 68,   suffix: '%', label: 'Faster time-to-hire',          sub: 'HR automation clients',        color: '#c9a84c' },
  { value: 71,   suffix: '%', label: 'Fewer supply chain stockouts', sub: 'Post-deployment Q1 average',   color: '#00b85e' },
  { value: 6,    suffix: 'x', label: 'ROI within first year',        sub: 'Median client return',         color: '#00e87a' },
  { value: 99.2, suffix: '%', label: 'QC defect detection accuracy', sub: '4 manufacturing plants, Pune', color: '#c9a84c' },
];

function useCounter(target: number, decimals: number, active: boolean, delay: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      const dur = 1800, start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        setVal(parseFloat(((1 - Math.pow(1 - p, 3)) * target).toFixed(decimals)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, decimals, delay]);
  return val;
}

function StatCard({ stat, index, active }: { stat: typeof AI_STATS[0]; index: number; active: boolean }) {
  const dec = stat.value % 1 !== 0 ? 1 : 0;
  const val = useCounter(stat.value, dec, active, index * 120);

  return (
    <motion.div
      className="ai-stat-card"
      initial={{ opacity: 0, y: 36 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      style={{
        position: 'relative', borderRadius: '16px', overflow: 'hidden',
        background: 'var(--bg-surface)',
        border: `1px solid ${stat.color}1a`,
        boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
        padding: '30px 22px', textAlign: 'center',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 0%, ${stat.color}0e, transparent 55%)`,
        pointerEvents: 'none',
      }}/>
      <div style={{
        fontFamily: 'var(--font-mono)', fontWeight: 700,
        fontSize: 'clamp(32px, 4vw, 50px)',
        color: stat.color, lineHeight: 1, marginBottom: '6px',
        letterSpacing: '-0.03em', position: 'relative',
      }}>
        {val.toFixed(dec)}{stat.suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.3 }}>
        {stat.label}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
        {stat.sub}
      </div>
      <motion.div
        initial={{ scaleX: 0 }} animate={active ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.35 + index * 0.08, ease: EASE }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
          transformOrigin: 'center', opacity: 0.45,
        }}
      />
    </motion.div>
  );
}

export function AIStatCountdown() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: 'var(--bg-deep)', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 32px)', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.022,
        backgroundImage: 'linear-gradient(rgba(0,232,122,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,232,122,1) 1px,transparent 1px)',
        backgroundSize: '100px 100px',
      }}/>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>
            PROVEN RESULTS
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Numbers don't lie.<br/>
            <span style={{ color: 'var(--accent-primary)' }}>Ours don't need to.</span>
          </h2>
        </motion.div>
        <div className="grid-3">
          {AI_STATS.map((s, i) => <StatCard key={i} stat={s} index={i} active={inView}/>)}
        </div>
      </div>
    </section>
  );
}