import { useState, useEffect, useCallback, type JSX } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const PROJECTS = [
  {
    tag: 'Computer Vision',
    title: 'Retail Inventory AI',
    desc: 'Real-time shelf monitoring using edge-deployed CV models. Reduced inventory shrinkage by 94% for a national retail chain with 200+ SKUs.',
    stat: '94% error reduction',
    color: '#4ade80',
    visual: 'retail',
  },
  {
    tag: 'Frappe / ERPNext',
    title: 'Enterprise ERP Migration',
    desc: '10,000+ user migration from legacy SAP to Frappe ERPNext across 6 plant locations with zero downtime and custom workflow automation.',
    stat: '10,000+ users onboarded',
    color: '#22c55e',
    visual: 'erp',
  },
  {
    tag: 'LLM Engineering',
    title: 'Document Intelligence Platform',
    desc: 'Multi-format document parsing, classification, and automated data extraction using GPT-4o + custom RAG pipelines. Replaces 12 FTE hours daily.',
    stat: '12 FTE hours/day saved',
    color: '#c9a84c',
    visual: 'llm',
  },
  {
    tag: 'Computer Vision',
    title: 'Manufacturing QC Vision',
    desc: 'Sub-millimeter defect detection on high-speed production lines achieving 99.2% accuracy — deployed across 4 manufacturing plants in Pune.',
    stat: '99.2% defect accuracy',
    color: '#4ade80',
    visual: 'qc',
  },
  {
    tag: 'AI Automation',
    title: 'HR Automation Suite',
    desc: 'End-to-end recruitment, onboarding, and payroll workflow orchestration with AI screening. Reduced time-to-hire by 68% for a 2,000-person org.',
    stat: '68% faster hiring',
    color: '#22c55e',
    visual: 'hr',
  },
  {
    tag: 'Data AI',
    title: 'Supply Chain Analytics',
    desc: 'Predictive demand forecasting and logistics optimization for a 200+ SKU portfolio. Cut stockout events by 71% in the first quarter post-deployment.',
    stat: '71% fewer stockouts',
    color: '#c9a84c',
    visual: 'supply',
  },
];

/* ─── Visual card art SVGs ─── */
function CardVisual({ type, color }: { type: string; color: string }) {
  const c = color;

  const visuals: Record<string, JSX.Element> = {
    retail: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="480" height="200" fill="#080808"/>
        {[40,120,200,280,360,440].map((x, i) => (
          <rect key={i} x={x} y="30" width="60" height="140" rx="4" fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.12)" strokeWidth="1"/>
        ))}
        {[40,120,200,280,360].map((x, i) => (
          <g key={i}>
            <rect x={x+8} y="50" width="14" height="30" rx="2" fill={`rgba(34,197,94,${0.15 + i*0.05})`}/>
            <rect x={x+26} y="45" width="14" height="35" rx="2" fill={`rgba(34,197,94,${0.1 + i*0.04})`}/>
            <rect x={x+44} y="55" width="10" height="25" rx="2" fill={`rgba(34,197,94,${0.08 + i*0.03})`}/>
            {i === 2 && <rect x={x+44} y="55" width="10" height="25" rx="2" fill="rgba(201,168,76,0.5)" stroke="rgba(201,168,76,0.8)" strokeWidth="1"/>}
          </g>
        ))}
        <line x1="0" y1="88" x2="480" y2="88" stroke={c} strokeWidth="1" strokeDasharray="4 8" opacity="0.3"/>
        <line x1="0" y1="130" x2="480" y2="130" stroke={c} strokeWidth="1" strokeDasharray="4 8" opacity="0.2"/>
        <rect x="234" y="38" width="82" height="82" rx="3" fill="none" stroke={c} strokeWidth="1.5" opacity="0.7" strokeDasharray="6 3"/>
        <text x="248" y="55" fill={c} fontSize="8" fontFamily="monospace" opacity="0.9">TRACKING</text>
        <text x="248" y="68" fill={c} fontSize="7" fontFamily="monospace" opacity="0.6">SKU-2847</text>
        {([[234,38],[312,38],[234,116],[312,116]] as [number,number][]).map(([bx,by], qi) => (
          <g key={qi}>
            <line x1={bx} y1={by} x2={bx + (qi%2===0?8:-8)} y2={by} stroke={c} strokeWidth="2"/>
            <line x1={bx} y1={by} x2={bx} y2={by + (qi<2?8:-8)} stroke={c} strokeWidth="2"/>
          </g>
        ))}
        <rect x="14" y="155" width="80" height="22" rx="4" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
        <text x="22" y="170" fill={c} fontSize="8" fontFamily="monospace">STOCK: 94.2%</text>
        <rect x="380" y="155" width="88" height="22" rx="4" fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.2)" strokeWidth="1"/>
        <text x="387" y="170" fill="#c9a84c" fontSize="8" fontFamily="monospace">LOW: SKU-2847</text>
      </svg>
    ),
    erp: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="480" height="200" fill="#080808"/>
        {([[240,100,'HQ'],[100,50,'Plant A'],[380,50,'Plant B'],[80,150,'Finance'],[400,150,'HR'],[240,180,'Supply']] as [number,number,string][]).map(([x, y, label], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i===0?22:14} fill={`rgba(34,197,94,${i===0?0.2:0.08})`} stroke={c} strokeWidth={i===0?1.5:1} opacity="0.9"/>
            <text x={x} y={y+4} textAnchor="middle" fill={c} fontSize={i===0?8:7} fontFamily="monospace" opacity="0.9">{label}</text>
          </g>
        ))}
        {([[240,100,100,50],[240,100,380,50],[240,100,80,150],[240,100,400,150],[240,100,240,180]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="1" opacity="0.2" strokeDasharray="4 6"/>
        ))}
        {[0,1,2].map(i => (
          <circle key={i} cx={240 - 70*Math.cos(i*2.1)} cy={100 - 50*Math.sin(i*2.1)} r="3" fill={c} opacity="0.7"/>
        ))}
        <rect x="14" y="10" width="140" height="28" rx="4" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.15)" strokeWidth="1"/>
        <text x="22" y="22" fill={c} fontSize="7" fontFamily="monospace" opacity="0.8">MIGRATION PROGRESS</text>
        <rect x="22" y="26" width="110" height="5" rx="2" fill="rgba(34,197,94,0.1)"/>
        <rect x="22" y="26" width="96" height="5" rx="2" fill={c} opacity="0.7"/>
        <text x="136" y="31" fill={c} fontSize="6" fontFamily="monospace" opacity="0.8">87%</text>
        <rect x="326" y="10" width="140" height="28" rx="4" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.15)" strokeWidth="1"/>
        <text x="335" y="22" fill={c} fontSize="7" fontFamily="monospace" opacity="0.8">LIVE USERS</text>
        <text x="335" y="33" fill={c} fontSize="11" fontFamily="monospace" fontWeight="bold" opacity="0.95">8,742 / 10,000</text>
      </svg>
    ),
    llm: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="480" height="200" fill="#080808"/>
        {[0,1,2].map(i => (
          <g key={i} transform={`translate(${30 + i*60}, 30)`}>
            <rect width="50" height="65" rx="3" fill={`rgba(34,197,94,${0.06+i*0.02})`} stroke="rgba(34,197,94,0.12)" strokeWidth="1"/>
            <rect x="6" y="10" width="38" height="3" rx="1" fill="rgba(34,197,94,0.2)"/>
            <rect x="6" y="17" width="28" height="2" rx="1" fill="rgba(34,197,94,0.12)"/>
            <rect x="6" y="23" width="32" height="2" rx="1" fill="rgba(34,197,94,0.12)"/>
            <rect x="6" y="29" width="20" height="2" rx="1" fill="rgba(34,197,94,0.12)"/>
          </g>
        ))}
        <path d="M 215 80 L 245 80" stroke={c} strokeWidth="2" markerEnd="url(#arr)"/>
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c} opacity="0.7"/>
          </marker>
        </defs>
        <rect x="245" y="50" width="90" height="60" rx="6" fill="rgba(34,197,94,0.12)" stroke={c} strokeWidth="1.5" opacity="0.85"/>
        <text x="290" y="76" textAnchor="middle" fill={c} fontSize="9" fontFamily="monospace" opacity="0.95">GPT-4o</text>
        <text x="290" y="90" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.6">+ RAG Pipeline</text>
        <path d="M 335 80 L 365 80" stroke={c} strokeWidth="2" markerEnd="url(#arr)"/>
        <rect x="365" y="30" width="105" height="100" rx="4" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.18)" strokeWidth="1"/>
        <text x="373" y="48" fill={c} fontSize="7" fontFamily="monospace" opacity="0.8">EXTRACTED DATA</text>
        {['Invoice No: 8291','Vendor: TataCorp','Amount: ₹2.4L','Due: 30 Mar 2026','Status: Verified ✓'].map((line, i) => (
          <text key={i} x="373" y={62+i*14} fill="#8ab59a" fontSize="7" fontFamily="monospace">{line}</text>
        ))}
        <rect x="14" y="155" width="120" height="22" rx="4" fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.25)" strokeWidth="1"/>
        <text x="22" y="170" fill="#c9a84c" fontSize="8" fontFamily="monospace">ACCURACY: 98.7%</text>
        <rect x="346" y="155" width="120" height="22" rx="4" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
        <text x="354" y="170" fill={c} fontSize="8" fontFamily="monospace">12 FTE hrs saved/day</text>
      </svg>
    ),
    qc: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="480" height="200" fill="#080808"/>
        <rect x="0" y="120" width="480" height="20" rx="2" fill="rgba(34,197,94,0.05)" stroke="rgba(34,197,94,0.1)" strokeWidth="1"/>
        {[30,90,150,210,270,330,390,450].map((x,i) => (
          <circle key={i} cx={x} cy="130" r="6" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
        ))}
        {[60,180,300,420].map((x,i) => (
          <g key={i}>
            <rect x={x-20} y="98" width="40" height="24" rx="2" fill={i===2?'rgba(255,60,60,0.12)':'rgba(34,197,94,0.08)'} stroke={i===2?'rgba(255,80,80,0.4)':'rgba(34,197,94,0.2)'} strokeWidth="1"/>
            {i===2 && <text x={x} y="113" textAnchor="middle" fill="#ff5050" fontSize="6" fontFamily="monospace">DEFECT</text>}
          </g>
        ))}
        <rect x="175" y="20" width="130" height="70" rx="6" fill="rgba(34,197,94,0.08)" stroke={c} strokeWidth="1.5" opacity="0.8"/>
        <circle cx="240" cy="50" r="18" fill="rgba(34,197,94,0.1)" stroke={c} strokeWidth="1" opacity="0.7"/>
        <circle cx="240" cy="50" r="8" fill="rgba(34,197,94,0.2)" stroke={c} strokeWidth="1"/>
        <text x="240" y="82" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.8">CV CAMERA</text>
        <path d="M240 90 L210 122 L270 122 Z" fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.15)" strokeWidth="1" strokeDasharray="3 4"/>
        <rect x="278" y="94" width="44" height="32" rx="2" fill="none" stroke="#ff5050" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8"/>
        <text x="300" y="91" textAnchor="middle" fill="#ff5050" fontSize="7" fontFamily="monospace" opacity="0.9">⚠ REJECT</text>
        <rect x="14" y="155" width="110" height="22" rx="4" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
        <text x="22" y="170" fill={c} fontSize="8" fontFamily="monospace">PASS: 99.2% ✓</text>
        <rect x="356" y="155" width="110" height="22" rx="4" fill="rgba(255,80,80,0.06)" stroke="rgba(255,80,80,0.2)" strokeWidth="1"/>
        <text x="363" y="170" fill="#ff7070" fontSize="8" fontFamily="monospace">REJECT: 0.8%</text>
      </svg>
    ),
    hr: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="480" height="200" fill="#080808"/>
        {(['Apply','Screen','Interview','Offer','Onboard'] as string[]).map((stage, i) => (
          <g key={i}>
            <rect x={20+i*90} y="60" width="75" height="50" rx="6" fill={`rgba(34,197,94,${0.06+i*0.025})`} stroke={`rgba(34,197,94,${0.1+i*0.06})`} strokeWidth="1"/>
            <text x={57+i*90} y="82" textAnchor="middle" fill={c} fontSize="8" fontFamily="monospace" opacity="0.85">{stage}</text>
            <rect x={45+i*90} y="92" width="24" height="12" rx="3" fill={`rgba(34,197,94,${0.12+i*0.04})`}/>
            <text x={57+i*90} y="102" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace">{[482,91,24,11,8][i]}</text>
            {i < 4 && <path d={`M ${96+i*90} 85 L ${108+i*90} 85`} stroke={c} strokeWidth="1.5" opacity="0.4" markerEnd="url(#arr2)"/>}
          </g>
        ))}
        <defs>
          <marker id="arr2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill={c} opacity="0.5"/>
          </marker>
        </defs>
        <rect x="190" y="28" width="100" height="20" rx="10" fill="rgba(34,197,94,0.1)" stroke={c} strokeWidth="1" opacity="0.7"/>
        <text x="240" y="42" textAnchor="middle" fill={c} fontSize="8" fontFamily="monospace">⚡ AI SCREENED</text>
        <rect x="14" y="155" width="130" height="22" rx="4" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
        <text x="22" y="170" fill={c} fontSize="8" fontFamily="monospace">TIME-TO-HIRE: -68%</text>
        <rect x="336" y="155" width="130" height="22" rx="4" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.15)" strokeWidth="1"/>
        <text x="344" y="170" fill={c} fontSize="8" fontFamily="monospace">2,000 EMPLOYEES</text>
      </svg>
    ),
    supply: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="480" height="200" fill="#080808"/>
        <polyline points="30,150 80,130 130,140 180,100 230,120 280,80 330,95 380,60 430,75" fill="none" stroke="rgba(34,197,94,0.15)" strokeWidth="2" strokeDasharray="6 4"/>
        <polyline points="30,150 80,125 130,120 180,90 230,100 280,65 330,80 380,50 430,60" fill="none" stroke={c} strokeWidth="2.5" opacity="0.8"/>
        {([[80,125],[180,90],[280,65],[380,50]] as [number,number][]).map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="4" fill={c} opacity="0.9"/>
        ))}
        <line x1="20" y1="30" x2="20" y2="165" stroke="rgba(34,197,94,0.15)" strokeWidth="1"/>
        <line x1="20" y1="165" x2="460" y2="165" stroke="rgba(34,197,94,0.15)" strokeWidth="1"/>
        <rect x="280" y="15" width="10" height="3" fill="rgba(34,197,94,0.15)"/>
        <text x="295" y="20" fill="#4d7a5e" fontSize="7" fontFamily="monospace">ACTUAL</text>
        <rect x="350" y="15" width="10" height="3" fill={c} opacity="0.8"/>
        <text x="365" y="20" fill={c} fontSize="7" fontFamily="monospace">PREDICTED</text>
        <rect x="350" y="35" width="115" height="40" rx="5" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
        <text x="358" y="50" fill={c} fontSize="7" fontFamily="monospace" opacity="0.8">NEXT QTR FORECAST</text>
        <text x="358" y="64" fill={c} fontSize="11" fontFamily="monospace" fontWeight="bold" opacity="0.95">+23.4% demand</text>
        <rect x="14" y="12" width="120" height="22" rx="4" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.15)" strokeWidth="1"/>
        <text x="22" y="27" fill={c} fontSize="8" fontFamily="monospace">STOCKOUTS: -71%</text>
      </svg>
    ),
  };

  return visuals[type] || visuals.retail;
}

/* ─── Individual card slot ─── */
function CardSlot({
  project,
  position,
  onClick,
}: {
  project: typeof PROJECTS[0];
  position: number;
  onClick: () => void;
}) {
  const isActive = position === 0;
  const isSide = Math.abs(position) === 1;
  const isGhost = Math.abs(position) === 2;

  const translateX = position * 310;
  const scale = isActive ? 1 : isSide ? 0.78 : 0.6;
  const opacity = isActive ? 1 : isSide ? 0.55 : 0.2;
  const zIndex = isActive ? 20 : isSide ? 10 : 2;
  const blur = isActive ? 0 : isSide ? 0 : 2;

  return (
    <motion.div
      animate={{
        x: translateX,
        scale,
        opacity,
        filter: `blur(${blur}px)`,
      }}
      transition={{ duration: 0.6, ease: EASE_SMOOTH }}
      onClick={!isActive ? onClick : undefined}
      style={{
        position: 'absolute',
        width: '430px',
        cursor: isActive ? 'default' : 'pointer',
        zIndex,
        pointerEvents: isGhost ? 'none' : 'auto',
      }}
    >
      <div style={{
        borderRadius: '16px',
        border: `1px solid ${isActive ? 'rgba(34,197,94,0.45)' : 'rgba(34,197,94,0.12)'}`,
        background: 'var(--bg-surface)',
        overflow: 'hidden',
        boxShadow: isActive
          ? '0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(34,197,94,0.12)'
          : '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}>
        {/* Visual area */}
        <div style={{
          height: '220px',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(34,197,94,0.08)',
          position: 'relative',
          background: 'var(--bg-deep)',
        }}>
          <CardVisual type={project.visual} color={project.color} />

          <div style={{
            position: 'absolute', top: '14px', left: '14px',
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: project.color, border: `1px solid ${project.color}44`,
            background: `${project.color}12`, padding: '4px 12px',
            borderRadius: '100px', letterSpacing: '0.08em', backdropFilter: 'blur(4px)',
          }}>
            {project.tag}
          </div>

          <div style={{
            position: 'absolute', top: '14px', right: '14px',
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'var(--text-secondary)', border: '1px solid rgba(34,197,94,0.12)',
            background: 'rgba(0,0,0,0.7)', padding: '4px 10px',
            borderRadius: '100px', backdropFilter: 'blur(4px)',
          }}>
            {project.stat}
          </div>
        </div>

        {/* Text content */}
        <div style={{ padding: '26px 28px 28px' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700,
            fontSize: '22px', color: 'var(--text-primary)',
            marginBottom: '12px', lineHeight: 1.25,
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '14px',
            color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px',
          }}>
            {project.desc}
          </p>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '16px', borderTop: '1px solid rgba(34,197,94,0.08)',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px',
              color: project.color, display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              View Case Study
              <motion.span
                animate={isActive ? { x: [0, 4, 0] } : {}}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              >→</motion.span>
            </span>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: project.color, boxShadow: `0 0 8px ${project.color}88`,
            }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export function ShowCaseCards() {
  const [active, setActive] = useState(0);
  const total = PROJECTS.length;

  const navigate = useCallback((dir: 1 | -1) => {
    setActive(i => (i + dir + total) % total);
  }, [total]);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => navigate(1), 4500);
    return () => clearInterval(t);
  }, [navigate]);

  const getIdx = (offset: number) => (active + offset + total) % total;

  return (
    <section id="works" style={{ background: 'var(--bg-void)', padding: '120px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: 'var(--accent-primary)', letterSpacing: '0.2em',
            display: 'block', marginBottom: '16px',
          }}>
            OUR WORK
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(40px, 5vw, 72px)', color: 'var(--text-primary)',
            lineHeight: 1.05, marginBottom: '16px',
          }}>
            What We've Built
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--text-secondary)' }}>
            Real solutions, real results, real enterprises.
          </p>
        </motion.div>

        {/* Carousel */}
        <div style={{
          position: 'relative', display: 'flex', alignItems: 'center',
          justifyContent: 'center', height: '520px', perspective: '1200px',
        }}>
          <CardSlot project={PROJECTS[getIdx(-2)]} position={-2} onClick={() => navigate(-1)} />
          <CardSlot project={PROJECTS[getIdx(-1)]} position={-1} onClick={() => navigate(-1)} />
          <CardSlot project={PROJECTS[getIdx(0)]}  position={0}  onClick={() => {}} />
          <CardSlot project={PROJECTS[getIdx(1)]}  position={1}  onClick={() => navigate(1)} />
          <CardSlot project={PROJECTS[getIdx(2)]}  position={2}  onClick={() => navigate(1)} />

          {/* Prev button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              position: 'absolute', left: '0px', zIndex: 50,
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.9)', border: '1px solid var(--border-bright)',
              color: 'var(--accent-primary)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)',
              transition: 'background 0.25s, transform 0.2s',
              boxShadow: '0 0 20px rgba(34,197,94,0.15)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.15)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.9)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next button */}
          <button
            onClick={() => navigate(1)}
            style={{
              position: 'absolute', right: '0px', zIndex: 50,
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.9)', border: '1px solid var(--border-bright)',
              color: 'var(--accent-primary)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)',
              transition: 'background 0.25s, transform 0.2s',
              boxShadow: '0 0 20px rgba(34,197,94,0.15)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.15)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.9)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? '28px' : '8px',
                height: '8px', borderRadius: '100px',
                background: i === active ? 'var(--accent-primary)' : 'rgba(34,197,94,0.2)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.4s var(--ease-smooth)',
                boxShadow: i === active ? '0 0 12px rgba(34,197,94,0.4)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}