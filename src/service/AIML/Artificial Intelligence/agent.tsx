import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const GLOBAL_STYLES = `
  .ag-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .ag-card:hover { transform: translateY(-5px); box-shadow: 0 18px 44px rgba(0,0,0,0.38) !important; }
  .ag-stat-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .ag-stat-card:hover { transform: translateY(-6px) scale(1.02); }
  .ag-industry-card { transition: border-color 0.25s, background 0.25s, transform 0.25s; cursor: pointer; }
  .ag-industry-card:hover { transform: translateY(-4px); }
  .ag-arch-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .ag-arch-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.4) !important; }
  @media(max-width:900px){ .ag-grid-3{ grid-template-columns: 1fr 1fr !important; } }
  @media(max-width:600px){ .ag-grid-3{ grid-template-columns: 1fr !important; } }
  @media(max-width:768px){ .ag-grid-2{ grid-template-columns: 1fr !important; } .ag-tl-line{ display:none; } .ag-step-wrap{ justify-content:center !important; } .ag-step-card{ width:90% !important; } }
`;


/* ═══════════════════════════════════════════════
   SECTION 1 — Boost Business with Agentic AI
═══════════════════════════════════════════════ */

const GROWTH_SERVICES = [
  {
    id: '01', color: '#00e87a',
    title: 'Autonomous Task Execution',
    body: 'Agents that receive a goal and execute multi-step plans independently — browsing, coding, filing, and reporting without human handoffs.',
    metric: '90%', metricLabel: 'less human input',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" style={{ width: 44, height: 44 }}>
        <circle cx="28" cy="20" r="10" stroke="#00e87a" strokeWidth="1.4" opacity="0.6"/>
        <circle cx="28" cy="20" r="4" fill="#00e87a" opacity="0.7"/>
        {[0,72,144,216,288].map((a,i) => { const r=(a*Math.PI)/180; return <line key={i} x1={28+10*Math.cos(r)} y1={20+10*Math.sin(r)} x2={28+14*Math.cos(r)} y2={20+14*Math.sin(r)} stroke="#00e87a" strokeWidth="2.2" strokeLinecap="round" opacity="0.5"/>; })}
        <path d="M18 36 L28 44 L38 36" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/>
        <line x1="28" y1="30" x2="28" y2="44" stroke="#00e87a" strokeWidth="1.3" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: '02', color: '#c9a84c',
    title: 'Tool-Using Agent Pipelines',
    body: 'Agents equipped with APIs, databases, browsers, and code interpreters — chaining tools together to complete complex real-world tasks.',
    metric: '12+', metricLabel: 'tools per agent',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" style={{ width: 44, height: 44 }}>
        <rect x="6" y="10" width="12" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/>
        <rect x="22" y="10" width="12" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.85"/>
        <rect x="38" y="10" width="12" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/>
        <line x1="18" y1="15" x2="22" y2="15" stroke="#c9a84c" strokeWidth="1.2" opacity="0.5"/>
        <line x1="34" y1="15" x2="38" y2="15" stroke="#c9a84c" strokeWidth="1.2" opacity="0.5"/>
        <rect x="20" y="30" width="16" height="12" rx="2" stroke="#c9a84c" strokeWidth="1.4" opacity="0.9"/>
        <line x1="12" y1="20" x2="22" y2="30" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/>
        <line x1="28" y1="20" x2="28" y2="30" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
        <line x1="44" y1="20" x2="36" y2="30" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/>
        <text x="28" y="38" textAnchor="middle" fill="#c9a84c" fontSize="5" fontFamily="monospace">AGENT</text>
      </svg>
    ),
  },
  {
    id: '03', color: '#00b85e',
    title: 'Multi-Agent Collaboration',
    body: 'Orchestrate teams of specialised agents — a planner, executor, critic, and researcher — working in parallel toward a shared objective.',
    metric: '5x', metricLabel: 'throughput vs single',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" style={{ width: 44, height: 44 }}>
        <circle cx="28" cy="12" r="6" stroke="#00b85e" strokeWidth="1.3" opacity="0.9"/>
        <circle cx="10" cy="38" r="5" stroke="#00b85e" strokeWidth="1.2" opacity="0.7"/>
        <circle cx="28" cy="44" r="5" stroke="#00b85e" strokeWidth="1.2" opacity="0.7"/>
        <circle cx="46" cy="38" r="5" stroke="#00b85e" strokeWidth="1.2" opacity="0.7"/>
        <line x1="28" y1="18" x2="13" y2="34" stroke="#00b85e" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/>
        <line x1="28" y1="18" x2="28" y2="39" stroke="#00b85e" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
        <line x1="28" y1="18" x2="43" y2="34" stroke="#00b85e" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/>
        <text x="28" y="15" textAnchor="middle" fill="#00b85e" fontSize="5" fontFamily="monospace">ORCH</text>
      </svg>
    ),
  },
  {
    id: '04', color: '#00e87a',
    title: 'Self-Healing Workflows',
    body: 'Agents that detect errors, re-plan, and retry — reducing pipeline failures and eliminating the need for constant human monitoring.',
    metric: '99.2%', metricLabel: 'pipeline uptime',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" style={{ width: 44, height: 44 }}>
        <path d="M28 8 A20 20 0 0 1 48 28" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M48 28 A20 20 0 0 1 28 48" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
        <path d="M28 48 A20 20 0 0 1 8 28" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round" opacity="0.35"/>
        <path d="M8 28 A20 20 0 0 1 28 8" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round" opacity="0.15"/>
        <circle cx="28" cy="28" r="6" stroke="#00e87a" strokeWidth="1.3"/>
        <path d="M24 28 L27 31 L33 25" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44 22 L48 28 L44 34" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: '05', color: '#c9a84c',
    title: 'Long-Horizon Planning',
    body: 'Agents that manage goals spanning hours or days — breaking objectives into subtasks, tracking progress, and adapting as conditions change.',
    metric: '72hr', metricLabel: 'max autonomous run',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" style={{ width: 44, height: 44 }}>
        <rect x="6" y="8" width="44" height="36" rx="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.4"/>
        <line x1="6" y1="18" x2="50" y2="18" stroke="#c9a84c" strokeWidth="0.7" opacity="0.15"/>
        {[12,22,32,42].map((x,i) => (
          <rect key={i} x={x} y={22} width="6" height={8+i*3} rx="1" fill="#c9a84c" opacity={0.2+i*0.12}/>
        ))}
        <polyline points="12,22 22,18 32,24 42,14" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
        {([[12,22],[22,18],[32,24],[42,14]] as [number,number][]).map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#c9a84c" opacity={0.5+i*0.1}/>
        ))}
      </svg>
    ),
  },
  {
    id: '06', color: '#00b85e',
    title: 'Human-in-the-Loop Escalation',
    body: 'Agents that know their limits — automatically escalating to human review when confidence is low, then resuming after approval.',
    metric: '< 2%', metricLabel: 'escalation rate',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" style={{ width: 44, height: 44 }}>
        <rect x="4" y="20" width="22" height="16" rx="3" stroke="#00b85e" strokeWidth="1.3" opacity="0.6"/>
        <circle cx="10" cy="28" r="2" fill="#00b85e" opacity="0.5"/>
        <circle cx="15" cy="28" r="2" fill="#00b85e" opacity="0.7"/>
        <circle cx="20" cy="28" r="2" fill="#00b85e" opacity="0.5"/>
        <circle cx="40" cy="18" r="7" stroke="#00b85e" strokeWidth="1.3" opacity="0.8"/>
        <line x1="40" y1="14" x2="40" y2="22" stroke="#00b85e" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <circle cx="40" cy="23" r="1" fill="#00b85e" opacity="0.8"/>
        <line x1="26" y1="28" x2="33" y2="28" stroke="#00b85e" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.4"/>
        <path d="M30 25 L33 28 L30 31" stroke="#00b85e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
        <path d="M30 34 Q40 40 40 26" stroke="#00b85e" strokeWidth="1" strokeDasharray="2 2" opacity="0.3"/>
      </svg>
    ),
  },
];

function GrowthCard({ s, index, inView }: { s: typeof GROWTH_SERVICES[0]; index: number; inView: boolean }) {
  return (
    <motion.div className="ag-card"
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
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

export function AgenticAIGrowth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <style>{GLOBAL_STYLES}</style>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>WHAT WE UNLOCK</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '700px' }}>
            Boost Your Business Growth<br/>
            <span style={{ color: 'var(--accent-primary)' }}>and Efficiency with Agentic AI.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '14px', maxWidth: '520px' }}>
            Six high-impact agentic capabilities we deploy for enterprise clients — each autonomous, each measurable.
          </p>
        </motion.div>
        <div className="ag-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {GROWTH_SERVICES.map((s, i) => <GrowthCard key={s.id} s={s} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════
   SECTION 2 — Agentic Frameworks & Models
═══════════════════════════════════════════════ */

const ARCHITECTURES = [
  {
    name: 'Orchestration Frameworks', abbr: 'ORC', color: '#00e87a',
    models: ['LangGraph', 'AutoGen', 'CrewAI', 'Semantic Kernel'],
    desc: 'Multi-agent coordination layers that manage task routing, memory sharing, and inter-agent communication.',
    svg: (
      <svg viewBox="0 0 52 52" fill="none" style={{ width: 38, height: 38 }}>
        <circle cx="26" cy="10" r="6" stroke="#00e87a" strokeWidth="1.3" opacity="0.9"/>
        <circle cx="10" cy="36" r="5" stroke="#00e87a" strokeWidth="1.2" opacity="0.65"/>
        <circle cx="42" cy="36" r="5" stroke="#00e87a" strokeWidth="1.2" opacity="0.65"/>
        <circle cx="26" cy="44" r="5" stroke="#00e87a" strokeWidth="1.2" opacity="0.65"/>
        <line x1="26" y1="16" x2="14" y2="32" stroke="#00e87a" strokeWidth="1" opacity="0.4" strokeDasharray="2 2"/>
        <line x1="26" y1="16" x2="38" y2="32" stroke="#00e87a" strokeWidth="1" opacity="0.4" strokeDasharray="2 2"/>
        <line x1="26" y1="16" x2="26" y2="39" stroke="#00e87a" strokeWidth="1" opacity="0.4" strokeDasharray="2 2"/>
        <text x="26" y="13" textAnchor="middle" fill="#00e87a" fontSize="5" fontFamily="monospace">AI</text>
      </svg>
    ),
  },
  {
    name: 'Reasoning & Planning Engines', abbr: 'RPE', color: '#c9a84c',
    models: ['ReAct', 'ToT', 'o1/o3', 'Chain-of-Thought'],
    desc: 'Structured reasoning patterns that enable agents to plan, reflect, and course-correct on complex multi-step goals.',
    svg: (
      <svg viewBox="0 0 52 52" fill="none" style={{ width: 38, height: 38 }}>
        <path d="M10 38 L18 26 L26 30 L34 18 L42 22" stroke="#c9a84c" strokeWidth="1.6" strokeLinecap="round"/>
        {([[18,26],[26,30],[34,18]] as [number,number][]).map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#c9a84c" opacity={0.5+i*0.15}/>
        ))}
        <rect x="36" y="8" width="14" height="10" rx="2" fill="rgba(201,168,76,0.1)" stroke="#c9a84c" strokeWidth="1"/>
        <text x="43" y="15" textAnchor="middle" fill="#c9a84c" fontSize="5" fontFamily="monospace">PLAN</text>
        <line x1="10" y1="42" x2="44" y2="42" stroke="#c9a84c" strokeWidth="0.6" opacity="0.18"/>
      </svg>
    ),
  },
  {
    name: 'Memory & State Management', abbr: 'MSM', color: '#00b85e',
    models: ['Zep', 'MemGPT', 'Redis', 'Pinecone'],
    desc: 'Short-term and long-term memory systems that let agents recall context, learn from past runs, and maintain user-specific state.',
    svg: (
      <svg viewBox="0 0 52 52" fill="none" style={{ width: 38, height: 38 }}>
        <ellipse cx="26" cy="12" rx="14" ry="5" stroke="#00b85e" strokeWidth="1.3"/>
        <line x1="12" y1="12" x2="12" y2="22" stroke="#00b85e" strokeWidth="1.3"/>
        <line x1="40" y1="12" x2="40" y2="22" stroke="#00b85e" strokeWidth="1.3"/>
        <ellipse cx="26" cy="22" rx="14" ry="5" stroke="#00b85e" strokeWidth="1.3"/>
        <line x1="12" y1="22" x2="12" y2="32" stroke="#00b85e" strokeWidth="1.3" opacity="0.5"/>
        <line x1="40" y1="22" x2="40" y2="32" stroke="#00b85e" strokeWidth="1.3" opacity="0.5"/>
        <ellipse cx="26" cy="32" rx="14" ry="5" stroke="#00b85e" strokeWidth="1.3" opacity="0.5"/>
        <path d="M40 22 L46 22" stroke="#00b85e" strokeWidth="1.1" strokeDasharray="2 2" opacity="0.5"/>
        <circle cx="48" cy="22" r="2" fill="#00b85e" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: 'Tool & API Integration Layer', abbr: 'TAI', color: '#00e87a',
    models: ['OpenAPI', 'MCP', 'Zapier', 'Custom SDKs'],
    desc: 'Standardised tool-calling interfaces that let agents interact with browsers, APIs, file systems, and databases securely.',
    svg: (
      <svg viewBox="0 0 52 52" fill="none" style={{ width: 38, height: 38 }}>
        <rect x="4" y="16" width="14" height="14" rx="2" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/>
        <rect x="34" y="16" width="14" height="14" rx="2" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/>
        <circle cx="26" cy="23" r="6" stroke="#00e87a" strokeWidth="1.4" opacity="0.9"/>
        <text x="26" y="26" textAnchor="middle" fill="#00e87a" fontSize="5.5" fontFamily="monospace">MCP</text>
        <path d="M18 23 L20 23" stroke="#00e87a" strokeWidth="1.2" opacity="0.5"/>
        <path d="M32 23 L34 23" stroke="#00e87a" strokeWidth="1.2" opacity="0.5"/>
        <line x1="4" y1="36" x2="48" y2="36" stroke="#00e87a" strokeWidth="0.6" opacity="0.12"/>
        <text x="11" y="26" textAnchor="middle" fill="#00e87a" fontSize="4.5" fontFamily="monospace">API</text>
        <text x="41" y="26" textAnchor="middle" fill="#00e87a" fontSize="4.5" fontFamily="monospace">DB</text>
      </svg>
    ),
  },
  {
    name: 'Evaluation & Safety Rails', abbr: 'ESR', color: '#c9a84c',
    models: ['Guardrails AI', 'LangSmith', 'Arize', 'Braintrust'],
    desc: 'Continuous evaluation pipelines, prompt injection defense, and output validation to keep agents safe and on-policy in production.',
    svg: (
      <svg viewBox="0 0 52 52" fill="none" style={{ width: 38, height: 38 }}>
        <path d="M26 6 L44 14 L44 28 C44 37 36 44 26 46 C16 44 8 37 8 28 L8 14 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.6"/>
        <path d="M19 24 L24 29 L34 19" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
        <circle cx="26" cy="26" r="11" stroke="#c9a84c" strokeWidth="0.7" opacity="0.2"/>
      </svg>
    ),
  },
  {
    name: 'Agent Deployment Infrastructure', abbr: 'ADI', color: '#00b85e',
    models: ['Docker', 'K8s', 'Modal', 'AWS Bedrock'],
    desc: 'Scalable, containerised deployment of agent fleets with auto-scaling, observability, and zero-downtime updates.',
    svg: (
      <svg viewBox="0 0 52 52" fill="none" style={{ width: 38, height: 38 }}>
        <rect x="4" y="8" width="44" height="28" rx="3" stroke="#00b85e" strokeWidth="1.2" opacity="0.45"/>
        {[[8,14],[20,14],[32,14],[8,24],[20,24],[32,24]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="10" height="7" rx="1.5" stroke="#00b85e" strokeWidth="1.1" opacity={0.4+i*0.05}/>
        ))}
        <line x1="14" y1="36" x2="14" y2="42" stroke="#00b85e" strokeWidth="1.2" opacity="0.4"/>
        <line x1="38" y1="36" x2="38" y2="42" stroke="#00b85e" strokeWidth="1.2" opacity="0.4"/>
        <line x1="10" y1="42" x2="42" y2="42" stroke="#00b85e" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
      </svg>
    ),
  },
];

export function AgenticAIArchitectures() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>UNDER THE HOOD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Agentic AI Architectures<br/>
            <span style={{ color: 'var(--accent-primary)' }}>and Frameworks We Work With.</span>
          </h2>
        </motion.div>

        <div className="ag-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {ARCHITECTURES.map((a, i) => (
            <motion.div key={a.abbr} className="ag-arch-card"
              initial={{ opacity: 0, y: 38 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
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
                  {a.models.map(m => (
                    <span key={m} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '2px 8px', borderRadius: '100px', border: `1px solid ${a.color}24`, color: 'var(--text-tertiary)' }}>{m}</span>
                  ))}
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
   SECTION 3 — Agentic AI Development Roadmap
═══════════════════════════════════════════════ */

const ROADMAP_STEPS = [
  {
    phase: 'DISCOVER', duration: '1 wk', color: '#00e87a',
    title: 'Agent Scope & Goal Definition',
    body: 'We map your highest-value workflows and define clear agent goals, success criteria, and escalation thresholds.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38 }}>
        <circle cx="20" cy="20" r="13" stroke="#00e87a" strokeWidth="1.4" opacity="0.7"/>
        <line x1="29" y1="29" x2="40" y2="40" stroke="#00e87a" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="20" x2="24" y2="20" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/>
        <line x1="20" y1="16" x2="20" y2="24" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/>
      </svg>
    ),
  },
  {
    phase: 'ARCHITECT', duration: '1 wk', color: '#c9a84c',
    title: 'Agent Architecture Design',
    body: 'Design the agent graph — number of agents, roles, memory type, tool access, and orchestration pattern (sequential, parallel, hierarchical).',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38 }}>
        <rect x="6" y="6" width="14" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/>
        <rect x="28" y="6" width="14" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/>
        <rect x="17" y="26" width="14" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.4" opacity="0.9"/>
        <line x1="13" y1="16" x2="20" y2="26" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" opacity="0.45"/>
        <line x1="35" y1="16" x2="28" y2="26" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" opacity="0.45"/>
        <text x="24" y="33" textAnchor="middle" fill="#c9a84c" fontSize="5" fontFamily="monospace">ORCH</text>
      </svg>
    ),
  },
  {
    phase: 'BUILD', duration: '3–6 wks', color: '#00b85e',
    title: 'Agent Development & Tool Wiring',
    body: 'Build each agent with its LLM backbone, system prompt, tool integrations, and memory bindings. Unit test every tool call and decision branch.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38 }}>
        <rect x="4" y="8" width="40" height="28" rx="3" stroke="#00b85e" strokeWidth="1.2" opacity="0.45"/>
        <line x1="4" y1="16" x2="44" y2="16" stroke="#00b85e" strokeWidth="0.7" opacity="0.15"/>
        <text x="10" y="27" fill="#00b85e" fontSize="7" fontFamily="monospace" opacity="0.7">{'agent'}</text>
        <text x="10" y="34" fill="#00b85e" fontSize="7" fontFamily="monospace" opacity="0.5">{'.run()'}</text>
        <path d="M34 20 L40 26 L34 32" stroke="#00b85e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    phase: 'EVALUATE', duration: '1 wk', color: '#00e87a',
    title: 'Red-Teaming & Safety Testing',
    body: 'Stress-test agents with adversarial inputs, edge cases, and prompt injections. Validate guardrails before any production exposure.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38 }}>
        <path d="M24 6 L40 13 L40 26 C40 34 33 40 24 42 C15 40 8 34 8 26 L8 13 Z" stroke="#00e87a" strokeWidth="1.3" fill="none" opacity="0.6"/>
        <path d="M17 24 L22 29 L32 19" stroke="#00e87a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
      </svg>
    ),
  },
  {
    phase: 'EVOLVE', duration: 'Ongoing', color: '#c9a84c',
    title: 'Monitoring, Retraining & Expansion',
    body: 'Live dashboards track agent decisions, tool usage, and error rates. Automated retraining triggers and continuous expansion into new workflows.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38 }}>
        <circle cx="24" cy="24" r="18" stroke="#c9a84c" strokeWidth="1.2" opacity="0.2"/>
        <path d="M24 6 A18 18 0 0 1 42 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M42 24 A18 18 0 0 1 24 42" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
        <path d="M24 42 A18 18 0 0 1 6 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.3"/>
        <path d="M6 24 A18 18 0 0 1 24 6" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.15"/>
        <circle cx="24" cy="24" r="5" stroke="#c9a84c" strokeWidth="1.3"/>
        <circle cx="24" cy="24" r="2" fill="#c9a84c" opacity="0.8"/>
        <path d="M20 21 L24 24" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export function AgenticAIRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>HOW WE BUILD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Our Proven Custom Agentic AI<br/>
            <span style={{ color: 'var(--accent-primary)' }}>Development Roadmap.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative' }}>
          <div className="ag-tl-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,232,122,0.07)', transform: 'translateX(-50%)' }}/>
          {ROADMAP_STEPS.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={s.phase}
                initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="ag-step-wrap"
                style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '11px', height: '11px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}88`, zIndex: 4 }}/>
                <div className="ag-step-card" style={{ width: '44%', borderRadius: '14px', background: 'var(--bg-surface)', border: `1px solid ${s.color}1e`, padding: '22px', boxShadow: '0 4px 18px rgba(0,0,0,0.18)', transition: 'transform 0.25s, box-shadow 0.25s' }}>
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
   SECTION 4 — Agentic AI for Industries
═══════════════════════════════════════════════ */

const INDUSTRIES = [
  {
    name: 'Healthcare', color: '#00e87a',
    useCases: ['Clinical triage agents', 'Prior auth automation', 'Patient follow-up workflows', 'Medical record extraction'],
    svg: (<svg viewBox="0 0 36 36" fill="none" style={{ width: 28, height: 28 }}><rect x="3" y="3" width="30" height="30" rx="5" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="18" y1="9" x2="18" y2="27" stroke="#00e87a" strokeWidth="2.2" strokeLinecap="round"/><line x1="9" y1="18" x2="27" y2="18" stroke="#00e87a" strokeWidth="2.2" strokeLinecap="round"/></svg>),
  },
  {
    name: 'Legal & Compliance', color: '#c9a84c',
    useCases: ['Contract negotiation agents', 'Compliance monitoring bots', 'Regulatory change alerts', 'eDiscovery automation'],
    svg: (<svg viewBox="0 0 36 36" fill="none" style={{ width: 28, height: 28 }}><path d="M18 4 L22 14 L33 14 L24 21 L27 32 L18 26 L9 32 L12 21 L3 14 L14 14 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.8"/></svg>),
  },
  {
    name: 'Manufacturing', color: '#00b85e',
    useCases: ['Predictive maintenance agents', 'Quality control automation', 'Supply chain orchestration', 'Safety incident reporting'],
    svg: (<svg viewBox="0 0 36 36" fill="none" style={{ width: 28, height: 28 }}><circle cx="18" cy="18" r="8" stroke="#00b85e" strokeWidth="1.3" opacity="0.7"/><circle cx="18" cy="18" r="3" fill="#00b85e" opacity="0.8"/>{[0,60,120,180,240,300].map((a,i) => { const r=(a*Math.PI)/180; return <line key={i} x1={18+8*Math.cos(r)} y1={18+8*Math.sin(r)} x2={18+12*Math.cos(r)} y2={18+12*Math.sin(r)} stroke="#00b85e" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>; })}</svg>),
  },
  {
    name: 'Finance & Banking', color: '#00e87a',
    useCases: ['Fraud detection agents', 'Trade reconciliation bots', 'KYC/AML automation', 'Portfolio rebalancing agents'],
    svg: (<svg viewBox="0 0 36 36" fill="none" style={{ width: 28, height: 28 }}><rect x="3" y="8" width="30" height="22" rx="3" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="3" y1="14" x2="33" y2="14" stroke="#00e87a" strokeWidth="0.8" opacity="0.3"/><circle cx="10" cy="22" r="3" stroke="#00e87a" strokeWidth="1.1" opacity="0.6"/><line x1="16" y1="21" x2="28" y2="21" stroke="#00e87a" strokeWidth="1" opacity="0.4"/><line x1="16" y1="24" x2="24" y2="24" stroke="#00e87a" strokeWidth="1" opacity="0.3"/></svg>),
  },
  {
    name: 'Retail & E-Commerce', color: '#c9a84c',
    useCases: ['Order management agents', 'Returns processing bots', 'Inventory reorder agents', 'Personalised shopper AI'],
    svg: (<svg viewBox="0 0 36 36" fill="none" style={{ width: 28, height: 28 }}><path d="M4 8 L8 8 L12 22 L26 22 L30 12 L10 12" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/><circle cx="14" cy="27" r="2.5" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><circle cx="24" cy="27" r="2.5" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/></svg>),
  },
  {
    name: 'Human Resources', color: '#00b85e',
    useCases: ['Recruiting pipeline agents', 'Onboarding workflow bots', 'Performance review agents', 'Leave management AI'],
    svg: (<svg viewBox="0 0 36 36" fill="none" style={{ width: 28, height: 28 }}><circle cx="18" cy="12" r="6" stroke="#00b85e" strokeWidth="1.3" opacity="0.8"/><path d="M6 30 C6 23 30 23 30 30" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.7"/></svg>),
  },
  {
    name: 'Education & EdTech', color: '#00e87a',
    useCases: ['Adaptive tutoring agents', 'Assignment grading bots', 'Student progress trackers', 'Curriculum planning AI'],
    svg: (<svg viewBox="0 0 36 36" fill="none" style={{ width: 28, height: 28 }}><path d="M18 6 L33 14 L18 22 L3 14 Z" stroke="#00e87a" strokeWidth="1.3" fill="none" opacity="0.8"/><path d="M9 18 L9 26 Q18 30 27 26 L27 18" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6"/></svg>),
  },
  {
    name: 'Logistics & Supply Chain', color: '#c9a84c',
    useCases: ['Shipment tracking agents', 'Delay escalation bots', 'Vendor negotiation AI', 'Customs documentation agents'],
    svg: (<svg viewBox="0 0 36 36" fill="none" style={{ width: 28, height: 28 }}><rect x="2" y="14" width="22" height="14" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/><path d="M24 20 L30 20 L34 26 L34 28 L24 28 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.8"/><circle cx="8" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><circle cx="20" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><circle cx="30" cy="30" r="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/></svg>),
  },
  {
    name: 'Real Estate', color: '#00b85e',
    useCases: ['Property search agents', 'Lease renewal automation', 'Maintenance request bots', 'Market analysis agents'],
    svg: (<svg viewBox="0 0 36 36" fill="none" style={{ width: 28, height: 28 }}><path d="M18 4 L32 16 L32 32 L4 32 L4 16 Z" stroke="#00b85e" strokeWidth="1.3" fill="none" opacity="0.7"/><rect x="13" y="22" width="10" height="10" rx="1" stroke="#00b85e" strokeWidth="1.2" opacity="0.6"/><path d="M4 16 L18 4 L32 16" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/></svg>),
  },
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

const INDUSTRY_STATS = [
  { value: 9,   suffix: '',  label: 'Industries Served',      color: '#00e87a' },
  { value: 45,  suffix: '+', label: 'Agentic Workflows Built', color: '#c9a84c' },
  { value: 82,  suffix: '%', label: 'Task Automation Rate',    color: '#00b85e' },
  { value: 6.2, suffix: 'x', label: 'Avg. Productivity Gain', color: '#00e87a' },
];

function StatCard({ s, index, inView }: { s: typeof INDUSTRY_STATS[0]; index: number; inView: boolean }) {
  const dec = s.value % 1 !== 0 ? 1 : 0;
  const val = useCounter(s.value, dec, inView, index * 120);
  return (
    <motion.div key={index} className="ag-stat-card"
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      style={{ borderRadius: '12px', background: 'var(--bg-surface)', border: `1px solid ${s.color}18`, padding: '20px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.16)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${s.color}0c, transparent 60%)`, pointerEvents: 'none' }}/>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(26px, 3vw, 40px)', color: s.color, lineHeight: 1, marginBottom: '4px' }}>
        {val.toFixed(dec)}{s.suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-secondary)' }}>{s.label}</div>
      <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: EASE }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg,transparent,${s.color},transparent)`, transformOrigin: 'center', opacity: 0.45 }}/>
    </motion.div>
  );
}

function IndustryCard({ ind, index, inView }: { ind: typeof INDUSTRIES[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="ag-industry-card"
      initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      onClick={() => setOpen(o => !o)}
      style={{ borderRadius: '14px', overflow: 'hidden', background: open ? `${ind.color}08` : 'var(--bg-surface)', border: `1px solid ${open ? ind.color + '44' : ind.color + '1a'}`, boxShadow: '0 4px 16px rgba(0,0,0,0.16)' }}>
      <div style={{ height: '2px', background: `linear-gradient(90deg,${ind.color},transparent)`, opacity: open ? 0.7 : 0.35 }}/>
      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: open ? '14px' : 0 }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0, background: `${ind.color}10`, border: `1px solid ${ind.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {ind.svg}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{ind.name}</h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ind.color, opacity: 0.65, letterSpacing: '0.08em' }}>{ind.useCases.length} agentic workflows</span>
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

export function AgenticAIIndustries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>AGENTIC AI BY VERTICAL</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '720px' }}>
            Specialized Agentic AI Solutions<br/>
            <span style={{ color: 'var(--accent-primary)' }}>for Various Industries.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', marginTop: '14px', maxWidth: '500px', lineHeight: 1.75 }}>
            Click any industry to see the specific agentic workflows we deploy.
          </p>
        </motion.div>

        {/* Stats strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '48px' }} className="ag-stats-strip">
          {INDUSTRY_STATS.map((s, i) => <StatCard key={i} s={s} index={i} inView={inView} />)}
        </div>

        <div className="ag-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {INDUSTRIES.map((ind, i) => <IndustryCard key={ind.name} ind={ind} index={i} inView={inView} />)}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .ag-stats-strip{ grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:500px){ .ag-stats-strip{ grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}