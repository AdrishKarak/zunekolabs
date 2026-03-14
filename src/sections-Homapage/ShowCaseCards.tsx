import { useState, useEffect, useCallback, useRef, type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const PROJECTS = [
  {
    tag: 'Computer Vision',
    title: 'Retail Inventory AI',
    desc: 'Real-time shelf monitoring using edge-deployed CV models. Reduced inventory shrinkage by 94% for a national retail chain with 200+ SKUs.',
    stat: '94% error reduction',
    color: '#0a4225',
    visual: 'retail',
  },
  {
    tag: 'Frappe / ERPNext',
    title: 'Enterprise ERP Migration',
    desc: '10,000+ user migration from legacy SAP to Frappe ERPNext across 6 plant locations with zero downtime and custom workflow automation.',
    stat: '10,000+ users onboarded',
    color: '#0a4225',
    visual: 'erp',
  },
  {
    tag: 'LLM Engineering',
    title: 'Document Intelligence Platform',
    desc: 'Multi-format document parsing, classification, and automated data extraction using GPT-4o + custom RAG pipelines. Replaces 12 FTE hours daily.',
    stat: '12 FTE hours/day saved',
    color: '#0a6e30',
    visual: 'llm',
  },
  {
    tag: 'Computer Vision',
    title: 'Manufacturing QC Vision',
    desc: 'Sub-millimeter defect detection on high-speed production lines achieving 99.2% accuracy — deployed across 4 manufacturing plants in Pune.',
    stat: '99.2% defect accuracy',
    color: '#0a4225',
    visual: 'qc',
  },
  {
    tag: 'AI Automation',
    title: 'HR Automation Suite',
    desc: 'End-to-end recruitment, onboarding, and payroll workflow orchestration with AI screening. Reduced time-to-hire by 68% for a 2,000-person org.',
    stat: '68% faster hiring',
    color: '#0a4225',
    visual: 'hr',
  },
  {
    tag: 'Data AI',
    title: 'Supply Chain Analytics',
    desc: 'Predictive demand forecasting and logistics optimization for a 200+ SKU portfolio. Cut stockout events by 71% in the first quarter post-deployment.',
    stat: '71% fewer stockouts',
    color: '#0a6e30',
    visual: 'supply',
  },
];

/* ─── SVGs ─── */
function CardVisual({ type, color }: { type: string; color: string }) {
  const c     = color;
  const BG    = '#f4faf7';
  const STROKE= 'rgba(10,60,35,0.18)';
  const FLO   = 'rgba(10,60,35,0.06)';
  const FMD   = 'rgba(10,60,35,0.13)';
  const FHI   = 'rgba(10,60,35,0.22)';
  const GOLD  = '#b8860b';

  const visuals: Record<string, JSX.Element> = {
    retail: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
        <rect width="480" height="200" fill={BG}/>
        {[40,120,200,280,360,440].map((x,i) => (
          <rect key={i} x={x} y="30" width="60" height="140" rx="4" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        ))}
        {[40,120,200,280,360].map((x,i) => (
          <g key={i}>
            <rect x={x+8}  y="50" width="14" height="30" rx="2" fill={`rgba(10,60,35,${0.18+i*0.05})`}/>
            <rect x={x+26} y="45" width="14" height="35" rx="2" fill={`rgba(10,60,35,${0.13+i*0.04})`}/>
            <rect x={x+44} y="55" width="10" height="25" rx="2" fill={`rgba(10,60,35,${0.09+i*0.03})`}/>
            {i===2 && <rect x={x+44} y="55" width="10" height="25" rx="2" fill="rgba(184,134,11,0.35)" stroke="rgba(184,134,11,0.7)" strokeWidth="1"/>}
          </g>
        ))}
        <line x1="0" y1="88"  x2="480" y2="88"  stroke={c} strokeWidth="1" strokeDasharray="4 8" opacity="0.25"/>
        <line x1="0" y1="130" x2="480" y2="130" stroke={c} strokeWidth="1" strokeDasharray="4 8" opacity="0.15"/>
        <rect x="234" y="38" width="82" height="82" rx="3" fill="none" stroke={c} strokeWidth="1.5" opacity="0.6" strokeDasharray="6 3"/>
        <text x="248" y="55" fill={c} fontSize="8" fontFamily="monospace" opacity="0.9">TRACKING</text>
        <text x="248" y="68" fill={c} fontSize="7" fontFamily="monospace" opacity="0.55">SKU-2847</text>
        {([[234,38],[312,38],[234,116],[312,116]] as [number,number][]).map(([bx,by],qi) => (
          <g key={qi}>
            <line x1={bx} y1={by} x2={bx+(qi%2===0?8:-8)} y2={by} stroke={c} strokeWidth="2"/>
            <line x1={bx} y1={by} x2={bx} y2={by+(qi<2?8:-8)} stroke={c} strokeWidth="2"/>
          </g>
        ))}
        <rect x="14"  y="155" width="80" height="22" rx="4" fill={FMD} stroke={STROKE} strokeWidth="1"/>
        <text x="22"  y="170" fill={c} fontSize="8" fontFamily="monospace">STOCK: 94.2%</text>
        <rect x="380" y="155" width="88" height="22" rx="4" fill="rgba(184,134,11,0.12)" stroke="rgba(184,134,11,0.3)" strokeWidth="1"/>
        <text x="387" y="170" fill={GOLD} fontSize="8" fontFamily="monospace">LOW: SKU-2847</text>
      </svg>
    ),
    erp: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
        <rect width="480" height="200" fill={BG}/>
        {([[240,100,'HQ'],[100,50,'Plant A'],[380,50,'Plant B'],[80,150,'Finance'],[400,150,'HR'],[240,180,'Supply']] as [number,number,string][]).map(([x,y,label],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i===0?22:14} fill={i===0?FHI:FLO} stroke={c} strokeWidth={i===0?1.8:1.2} opacity="0.9"/>
            <text x={x} y={y+4} textAnchor="middle" fill={c} fontSize={i===0?8:7} fontFamily="monospace" fontWeight={i===0?'bold':'normal'} opacity="0.9">{label}</text>
          </g>
        ))}
        {([[240,100,100,50],[240,100,380,50],[240,100,80,150],[240,100,400,150],[240,100,240,180]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="1" opacity="0.18" strokeDasharray="4 6"/>
        ))}
        <rect x="14" y="10" width="140" height="28" rx="4" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        <text x="22" y="22" fill={c} fontSize="7" fontFamily="monospace" opacity="0.8">MIGRATION PROGRESS</text>
        <rect x="22" y="26" width="110" height="5" rx="2" fill="rgba(10,60,35,0.07)"/>
        <rect x="22" y="26" width="96"  height="5" rx="2" fill={c} opacity="0.6"/>
        <rect x="326" y="10" width="140" height="28" rx="4" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        <text x="335" y="22" fill={c} fontSize="7" fontFamily="monospace" opacity="0.8">LIVE USERS</text>
        <text x="335" y="33" fill={c} fontSize="11" fontFamily="monospace" fontWeight="bold" opacity="0.9">8,742 / 10,000</text>
      </svg>
    ),
    llm: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
        <rect width="480" height="200" fill={BG}/>
        {[0,1,2].map(i => (
          <g key={i} transform={`translate(${30+i*60},30)`}>
            <rect width="50" height="65" rx="3" fill={FLO} stroke={STROKE} strokeWidth="1"/>
            <rect x="6" y="10" width="38" height="3" rx="1" fill={FHI}/>
            <rect x="6" y="17" width="28" height="2" rx="1" fill={FMD}/>
            <rect x="6" y="23" width="32" height="2" rx="1" fill={FMD}/>
          </g>
        ))}
        <path d="M 215 80 L 245 80" stroke={c} strokeWidth="2" markerEnd="url(#arrL)"/>
        <defs>
          <marker id="arrL" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c} opacity="0.7"/>
          </marker>
        </defs>
        <rect x="245" y="50" width="90" height="60" rx="6" fill={FMD} stroke={c} strokeWidth="1.5" opacity="0.85"/>
        <text x="290" y="76" textAnchor="middle" fill={c} fontSize="9" fontFamily="monospace" opacity="0.95">GPT-4o</text>
        <text x="290" y="90" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.6">+ RAG Pipeline</text>
        <path d="M 335 80 L 365 80" stroke={c} strokeWidth="2" markerEnd="url(#arrL)"/>
        <rect x="365" y="30" width="105" height="100" rx="4" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        <text x="373" y="48" fill={c} fontSize="7" fontFamily="monospace" opacity="0.8">EXTRACTED DATA</text>
        {['Invoice No: 8291','Vendor: TataCorp','Amount: ₹2.4L','Due: 30 Mar 2026','Status: Verified ✓'].map((line,i) => (
          <text key={i} x="373" y={62+i*14} fill="#2d6b45" fontSize="7" fontFamily="monospace">{line}</text>
        ))}
        <rect x="14"  y="155" width="120" height="22" rx="4" fill="rgba(184,134,11,0.1)" stroke="rgba(184,134,11,0.3)" strokeWidth="1"/>
        <text x="22"  y="170" fill={GOLD} fontSize="8" fontFamily="monospace">ACCURACY: 98.7%</text>
        <rect x="346" y="155" width="120" height="22" rx="4" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        <text x="354" y="170" fill={c} fontSize="8" fontFamily="monospace">12 FTE hrs saved/day</text>
      </svg>
    ),
    qc: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
        <rect width="480" height="200" fill={BG}/>
        <rect x="0" y="120" width="480" height="20" rx="2" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        {[30,90,150,210,270,330,390,450].map((x,i) => (
          <circle key={i} cx={x} cy="130" r="6" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        ))}
        {[60,180,300,420].map((x,i) => (
          <g key={i}>
            <rect x={x-20} y="98" width="40" height="24" rx="2"
              fill={i===2?'rgba(200,40,40,0.08)':FLO}
              stroke={i===2?'rgba(200,40,40,0.35)':STROKE} strokeWidth="1"/>
            {i===2 && <text x={x} y="113" textAnchor="middle" fill="#c02828" fontSize="6" fontFamily="monospace">DEFECT</text>}
          </g>
        ))}
        <rect x="175" y="20" width="130" height="70" rx="6" fill={FLO} stroke={c} strokeWidth="1.5" opacity="0.8"/>
        <circle cx="240" cy="50" r="18" fill={FLO} stroke={c} strokeWidth="1" opacity="0.7"/>
        <circle cx="240" cy="50" r="8"  fill={FMD} stroke={c} strokeWidth="1"/>
        <text x="240" y="82" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.8">CV CAMERA</text>
        <path d="M240 90 L210 122 L270 122 Z" fill={FLO} stroke={STROKE} strokeWidth="1" strokeDasharray="3 4"/>
        <rect x="278" y="94" width="44" height="32" rx="2" fill="none" stroke="#c02828" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8"/>
        <text x="300" y="91" textAnchor="middle" fill="#c02828" fontSize="7" fontFamily="monospace" opacity="0.9">⚠ REJECT</text>
        <rect x="14"  y="155" width="110" height="22" rx="4" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        <text x="22"  y="170" fill={c} fontSize="8" fontFamily="monospace">PASS: 99.2% ✓</text>
        <rect x="356" y="155" width="110" height="22" rx="4" fill="rgba(200,40,40,0.06)" stroke="rgba(200,40,40,0.22)" strokeWidth="1"/>
        <text x="363" y="170" fill="#c02828" fontSize="8" fontFamily="monospace">REJECT: 0.8%</text>
      </svg>
    ),
    hr: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
        <rect width="480" height="200" fill={BG}/>
        {(['Apply','Screen','Interview','Offer','Onboard'] as string[]).map((stage,i) => (
          <g key={i}>
            <rect x={20+i*90} y="60" width="75" height="50" rx="6"
              fill={`rgba(10,60,35,${0.06+i*0.03})`} stroke={`rgba(10,60,35,${0.14+i*0.06})`} strokeWidth="1"/>
            <text x={57+i*90} y="82" textAnchor="middle" fill={c} fontSize="8" fontFamily="monospace" opacity="0.85">{stage}</text>
            <rect x={45+i*90} y="92" width="24" height="12" rx="3" fill={`rgba(10,60,35,${0.14+i*0.05})`}/>
            <text x={57+i*90} y="102" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace">{[482,91,24,11,8][i]}</text>
            {i<4 && <path d={`M ${96+i*90} 85 L ${108+i*90} 85`} stroke={c} strokeWidth="1.5" opacity="0.4" markerEnd="url(#arrH)"/>}
          </g>
        ))}
        <defs>
          <marker id="arrH" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill={c} opacity="0.5"/>
          </marker>
        </defs>
        <rect x="190" y="28" width="100" height="20" rx="10" fill={FMD} stroke={c} strokeWidth="1" opacity="0.8"/>
        <text x="240" y="42" textAnchor="middle" fill={c} fontSize="8" fontFamily="monospace">⚡ AI SCREENED</text>
        <rect x="14"  y="155" width="130" height="22" rx="4" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        <text x="22"  y="170" fill={c} fontSize="8" fontFamily="monospace">TIME-TO-HIRE: -68%</text>
        <rect x="336" y="155" width="130" height="22" rx="4" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        <text x="344" y="170" fill={c} fontSize="8" fontFamily="monospace">2,000 EMPLOYEES</text>
      </svg>
    ),
    supply: (
      <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
        <rect width="480" height="200" fill={BG}/>
        <polyline points="30,150 80,130 130,140 180,100 230,120 280,80 330,95 380,60 430,75"
          fill="none" stroke="rgba(10,60,35,0.18)" strokeWidth="2" strokeDasharray="6 4"/>
        <polyline points="30,150 80,125 130,120 180,90 230,100 280,65 330,80 380,50 430,60"
          fill="none" stroke={c} strokeWidth="2.5" opacity="0.8"/>
        {([[80,125],[180,90],[280,65],[380,50]] as [number,number][]).map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="4" fill={c} opacity="0.9"/>
        ))}
        <line x1="20" y1="30"  x2="20"  y2="165" stroke={STROKE} strokeWidth="1"/>
        <line x1="20" y1="165" x2="460" y2="165" stroke={STROKE} strokeWidth="1"/>
        <rect x="350" y="35" width="115" height="40" rx="5" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        <text x="358" y="50" fill={c} fontSize="7" fontFamily="monospace" opacity="0.8">NEXT QTR FORECAST</text>
        <text x="358" y="64" fill={c} fontSize="11" fontFamily="monospace" fontWeight="bold" opacity="0.9">+23.4% demand</text>
        <rect x="14" y="12" width="120" height="22" rx="4" fill={FLO} stroke={STROKE} strokeWidth="1"/>
        <text x="22" y="27" fill={c} fontSize="8" fontFamily="monospace">STOCKOUTS: -71%</text>
      </svg>
    ),
  };
  return visuals[type] || visuals.retail;
}

/* ─── CSS ─── */
const CSS = `
.showcase-desktop { display: flex; }
.showcase-mobile  { display: none; }

@media (max-width: 768px) {
  .showcase-desktop { display: none !important; }
  .showcase-mobile  { display: block !important; }
}

/* mobile card full-width */
.sc-card {
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(10,60,35,0.22);
  background: #fff;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(10,60,35,0.10);
}
.sc-visual {
  height: 200px;
  background: #f4faf7;
  border-bottom: 1px solid rgba(10,60,35,0.08);
  position: relative;
  overflow: hidden;
}
.sc-body { padding: 22px 20px 24px; }
.sc-nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
}
.sc-nav-btn {
  width: 42px; height: 42px; border-radius: 50%;
  background: #fff;
  border: 1px solid rgba(10,60,35,0.18);
  color: #0a4225;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(10,60,35,0.08);
  flex-shrink: 0;
}
.sc-dots {
  display: flex; gap: 8px; align-items: center;
}
`;

function StyleInjector() {
  if (typeof document !== 'undefined' && !document.getElementById('sc-styles')) {
    const s = document.createElement('style');
    s.id = 'sc-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  return null;
}

/* ─── Desktop 3D carousel card slot ─── */
function CardSlot({ project, position, onClick }: {
  project: typeof PROJECTS[0];
  position: number;
  onClick: () => void;
}) {
  const isActive = position === 0;
  const isSide   = Math.abs(position) === 1;
  const isGhost  = Math.abs(position) === 2;

  return (
    <motion.div
      animate={{
        x:      position * 310,
        scale:  isActive ? 1 : isSide ? 0.78 : 0.6,
        opacity:isActive ? 1 : isSide ? 0.55 : 0.2,
        filter: `blur(${isGhost ? 2 : 0}px)`,
      }}
      transition={{ duration: 0.6, ease: EASE_SMOOTH }}
      onClick={!isActive ? onClick : undefined}
      style={{
        position: 'absolute', width: '430px',
        cursor: isActive ? 'default' : 'pointer',
        zIndex: isActive ? 20 : isSide ? 10 : 2,
        pointerEvents: isGhost ? 'none' : 'auto',
      }}
    >
      <div style={{
        borderRadius: '16px',
        border: `1px solid ${isActive ? 'rgba(10,60,35,0.35)' : 'rgba(10,60,35,0.14)'}`,
        background: '#ffffff', overflow: 'hidden',
        boxShadow: isActive
          ? '0 16px 48px rgba(10,60,35,0.14), 0 4px 16px rgba(10,60,35,0.08)'
          : '0 4px 16px rgba(10,60,35,0.07)',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}>
        <div style={{ height: '220px', overflow: 'hidden', borderBottom: '1px solid rgba(10,60,35,0.1)', position: 'relative', background: '#f4faf7' }}>
          <CardVisual type={project.visual} color={project.color} />
          <div style={{ position:'absolute', top:14, left:14, fontFamily:'var(--font-mono)', fontSize:'10px', color:project.color, border:`1px solid ${project.color}55`, background:`${project.color}12`, padding:'4px 12px', borderRadius:'100px', letterSpacing:'0.08em' }}>
            {project.tag}
          </div>
          <div style={{ position:'absolute', top:14, right:14, fontFamily:'var(--font-mono)', fontSize:'9px', color:'#2d6b45', border:'1px solid rgba(10,60,35,0.2)', background:'rgba(255,255,255,0.85)', padding:'4px 10px', borderRadius:'100px' }}>
            {project.stat}
          </div>
        </div>
        <div style={{ padding: '26px 28px 28px', background: '#ffffff' }}>
          <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'22px', color:'#0d3d22', marginBottom:'12px', lineHeight:1.25 }}>
            {project.title}
          </h3>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#3d6b50', lineHeight:1.7, marginBottom:'20px' }}>
            {project.desc}
          </p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'16px', borderTop:'1px solid rgba(10,60,35,0.1)' }}>
            <span style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'13px', color:project.color, display:'flex', alignItems:'center', gap:'6px' }}>
              View Case Study
              <motion.span animate={isActive ? { x:[0,4,0] } : {}} transition={{ repeat:Infinity, duration:1.6, ease:'easeInOut' }}>→</motion.span>
            </span>
            <div style={{ width:8, height:8, borderRadius:'50%', background:project.color }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Mobile single-card swipe ─── */
function MobileCard({ project, direction }: { project: typeof PROJECTS[0]; direction: number }) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={project.title}
        custom={direction}
        initial={{ x: direction * 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction * -60, opacity: 0 }}
        transition={{ duration: 0.38, ease: EASE_SMOOTH }}
        className="sc-card"
      >
        <div className="sc-visual">
          <CardVisual type={project.visual} color={project.color} />
          <div style={{ position:'absolute', top:12, left:12, fontFamily:'monospace', fontSize:'10px', color:project.color, border:`1px solid ${project.color}55`, background:`${project.color}12`, padding:'3px 10px', borderRadius:'100px', letterSpacing:'0.07em' }}>
            {project.tag}
          </div>
          <div style={{ position:'absolute', top:12, right:12, fontFamily:'monospace', fontSize:'9px', color:'#2d6b45', border:'1px solid rgba(10,60,35,0.2)', background:'rgba(255,255,255,0.9)', padding:'3px 9px', borderRadius:'100px' }}>
            {project.stat}
          </div>
        </div>
        <div className="sc-body">
          <h3 style={{ fontFamily:'var(--font-heading,serif)', fontWeight:700, fontSize:'19px', color:'#0d3d22', margin:'0 0 8px', lineHeight:1.25 }}>
            {project.title}
          </h3>
          <p style={{ fontFamily:'var(--font-body,sans-serif)', fontSize:'13.5px', color:'#3d6b50', lineHeight:1.7, margin:0 }}>
            {project.desc}
          </p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'14px', marginTop:'14px', borderTop:'1px solid rgba(10,60,35,0.1)' }}>
            <span style={{ fontFamily:'var(--font-body,sans-serif)', fontWeight:600, fontSize:'12.5px', color:project.color }}>
              View Case Study →
            </span>
            <div style={{ width:7, height:7, borderRadius:'50%', background:project.color }} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main ─── */
export function ShowCaseCards() {
  const [active, setActive]   = useState(0);
  const [dir, setDir]         = useState(1);
  const total = PROJECTS.length;
  const touchStart = useRef<number | null>(null);

  const navigate = useCallback((d: 1 | -1) => {
    setDir(d);
    setActive(i => (i + d + total) % total);
  }, [total]);

  useEffect(() => {
    const t = setInterval(() => navigate(1), 4500);
    return () => clearInterval(t);
  }, [navigate]);

  const getIdx = (o: number) => (active + o + total) % total;

  const navBtnStyle: React.CSSProperties = {
    width:48, height:48, borderRadius:'50%',
    background:'#ffffff', border:'1px solid rgba(10,60,35,0.2)',
    color:'#0a4225', display:'flex', alignItems:'center', justifyContent:'center',
    cursor:'pointer', boxShadow:'0 2px 10px rgba(10,60,35,0.1)',
    transition:'background 0.22s, border-color 0.22s, transform 0.18s',
  };

  const hoverIn  = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background    = '#f0f9f4';
    e.currentTarget.style.borderColor   = 'rgba(10,60,35,0.4)';
    e.currentTarget.style.transform     = 'scale(1.08)';
  };
  const hoverOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background    = '#ffffff';
    e.currentTarget.style.borderColor   = 'rgba(10,60,35,0.2)';
    e.currentTarget.style.transform     = 'scale(1)';
  };

  const dots = (
    <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:32 }}>
      {PROJECTS.map((_,i) => (
        <button key={i} onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
          style={{
            width: i===active ? 28 : 8, height:8, borderRadius:100,
            background: i===active ? '#1a6e42' : 'rgba(10,60,35,0.18)',
            border:'none', cursor:'pointer', padding:0,
            transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}/>
      ))}
    </div>
  );

  return (
    <section id="works" style={{ background:'#ffffff', padding:'clamp(64px,10vw,120px) 0', overflow:'hidden' }}>
      <StyleInjector />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(16px,4vw,32px)' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:0.7, ease:EASE_SMOOTH }}
          style={{ textAlign:'center', marginBottom:'clamp(40px,6vw,72px)' }}
        >
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'#1a6e42', letterSpacing:'0.2em', display:'block', marginBottom:14, opacity:0.7 }}>
            OUR WORK
          </span>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(32px,5vw,72px)', color:'#0d3d22', lineHeight:1.05, marginBottom:12 }}>
            What We've Built
          </h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(14px,1.5vw,18px)', color:'#3d6b50', opacity:0.75 }}>
            Real solutions, real results, real enterprises.
          </p>
        </motion.div>

        {/* ── Desktop 3D carousel ── */}
        <div className="showcase-desktop" style={{ position:'relative', alignItems:'center', justifyContent:'center', height:520 }}>
          {([-2,-1,0,1,2] as const).map(o => (
            <CardSlot key={getIdx(o)} project={PROJECTS[getIdx(o)]} position={o}
              onClick={() => navigate(o < 0 ? -1 : 1)} />
          ))}
          <button style={{ ...navBtnStyle, position:'absolute', left:0, zIndex:50 }}
            onClick={() => navigate(-1)} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            <ChevronLeft size={20}/>
          </button>
          <button style={{ ...navBtnStyle, position:'absolute', right:0, zIndex:50 }}
            onClick={() => navigate(1)} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            <ChevronRight size={20}/>
          </button>
        </div>
        <div className="showcase-desktop">{dots}</div>

        {/* ── Mobile single-card ── */}
        <div className="showcase-mobile"
          onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            if (touchStart.current === null) return;
            const diff = touchStart.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) navigate(diff > 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          <MobileCard project={PROJECTS[active]} direction={dir} />
          <div className="sc-nav-row">
            <button className="sc-nav-btn" onClick={() => navigate(-1)}><ChevronLeft size={18}/></button>
            <div className="sc-dots">
              {PROJECTS.map((_,i) => (
                <button key={i} onClick={() => { setDir(i>active?1:-1); setActive(i); }}
                  style={{
                    width: i===active?24:7, height:7, borderRadius:100,
                    background: i===active?'#1a6e42':'rgba(10,60,35,0.18)',
                    border:'none', cursor:'pointer', padding:0,
                    transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                  }}/>
              ))}
            </div>
            <button className="sc-nav-btn" onClick={() => navigate(1)}><ChevronRight size={18}/></button>
          </div>
        </div>

      </div>
    </section>
  );
}