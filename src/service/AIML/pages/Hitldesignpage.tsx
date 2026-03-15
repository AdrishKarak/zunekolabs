import { motion } from 'framer-motion';
import Magnetic from '../../../components/ui/Magnetic';
const EASE = [0.16, 1, 0.3, 1] as const;
const G = '#1a6e42';

const STYLES = `
  @keyframes hitl-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  @keyframes hitl-blink  { 0%,100%{opacity:.9} 50%{opacity:.2} }
  @keyframes hitl-flow   { to { stroke-dashoffset: -24; } }
  @keyframes hitl-pulse  { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.15;transform:scale(1.25)} }
  .hitl-float  { animation: hitl-float 5s ease-in-out infinite; }
  .hitl-blink  { animation: hitl-blink 1.8s ease-in-out infinite; }
  .hitl-flow   { animation: hitl-flow 1s linear infinite; }
  .hitl-pulse  { animation: hitl-pulse 2.5s ease-in-out infinite; }

  .hitl-card { transition: transform .28s cubic-bezier(.16,1,.3,1), border-color .28s; border: 1px solid rgba(10,60,35,.14); position: relative; }
  .hitl-card::after { content:''; position:absolute; right:0; top:0; bottom:0; width:2px; background: #1a6e42; transform:scaleY(0); transform-origin:top; transition: transform .3s cubic-bezier(.16,1,.3,1); opacity:.55; }
  .hitl-card:hover::after { transform: scaleY(1); }
  .hitl-card:hover { transform: translateX(-4px); border-color: rgba(26,110,66,.28); }

  .hitl-row  { transition: padding-left .22s, background .22s; border-radius:8px; cursor:default; }
  .hitl-row:hover { padding-left:8px; background:rgba(26,110,66,.04); }

  .hitl-step { transition: transform .26s cubic-bezier(.16,1,.3,1), border-color .26s; border:1px solid rgba(10,60,35,.14); }
  .hitl-step:hover { transform: translateY(-5px); border-color:rgba(26,110,66,.28); }

  .hitl-pill { transition: background .2s, color .2s, border-color .2s; cursor:default; }
  .hitl-pill:hover { background:rgba(26,110,66,.08); color:#1a6e42; border-color:rgba(26,110,66,.3); }

  @media (max-width: 860px) {
    .hero-grid   { grid-template-columns: 1fr !important; text-align: center; }
    .hero-svg    { display: none !important; }
    .col2        { grid-template-columns: 1fr !important; gap: 28px !important; }
    .col4        { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
    .cta-inner   { flex-direction: column !important; align-items: center !important; text-align: center; }
    .hero-section{ padding: 80px 20px 60px !important; }
    .page-section{ padding-left: 20px !important; padding-right: 20px !important; }
    .how-top     { grid-template-columns: 1fr !important; gap: 20px !important; }
    .use-cases-table { grid-template-columns: 1fr !important; gap: 8px !important; border-bottom: none !important; padding: 20px 0 !important; }
    .use-cases-table span:last-child { text-align: left !important; margin-top: 4px; }
    .hero-meta   { justify-content: center !important; }
    .hero-stats  { justify-content: center !important; }
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

/* ── HERO SVG: human-in-the-loop review flow with animated approval states ── */
function HeroSVG() {
  return (
    <div className="hero-svg" style={{ position:'relative', width:'100%', maxWidth:420 }}>
      <svg className="hitl-float" viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'auto' }}>
        {/* bg grid */}
        {[0,1,2,3,4,5,6].map(c=>[0,1,2,3,4,5,6].map(r=>(
          <circle key={`${c}-${r}`} cx={c*60+20} cy={r*56+20} r="1.2" fill={G} opacity="0.05"/>
        )))}

        {/* ── AI MODEL block ── */}
        <rect x="130" y="22" width="160" height="52" rx="10" fill="rgba(26,110,66,.06)" stroke={G} strokeWidth="1.5" opacity="0.8"/>
        {/* Neural dots inside */}
        {[150,175,200,225,250,275].map((x,i)=>(
          <circle key={i} cx={x} cy="46" r="2.5" fill={G} opacity={0.15+i*.05}/>
        ))}
        {[0,1,2,3,4].map(i=>(
          <line key={i} x1={152+i*25} y1="46" x2={177+i*25} y2="46" stroke={G} strokeWidth="0.6" opacity="0.12"/>
        ))}
        <text x="210" y="66" textAnchor="middle" fill={G} fontSize="7.5" fontFamily="monospace" opacity="0.7">AI MODEL</text>
        <text x="210" y="43" textAnchor="middle" fill={G} fontSize="7" fontFamily="monospace" opacity="0.55">Output generated</text>

        {/* Arrow down */}
        <line x1="210" y1="74" x2="210" y2="102" stroke={G} strokeWidth="1" strokeDasharray="3 3" opacity="0.35" className="hitl-flow"/>
        <polygon points="206,100 210,108 214,100" fill={G} opacity="0.4"/>

        {/* ── VALIDATION INTERFACE ── (main focal box) */}
        <rect x="60" y="112" width="300" height="118" rx="12" fill="rgba(26,110,66,.06)" stroke={G} strokeWidth="1.7" opacity="0.9"/>
        {/* Pulse ring */}
        <rect x="56" y="108" width="308" height="126" rx="14" stroke={G} strokeWidth="0.7" strokeDasharray="5 5" opacity="0.15" className="hitl-pulse"/>

        <text x="210" y="133" textAnchor="middle" fill={G} fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0.85">VALIDATION INTERFACE</text>
        <line x1="72" y1="140" x2="348" y2="140" stroke={G} strokeWidth="0.6" opacity="0.2"/>

        {/* Output preview area */}
        <rect x="72" y="146" width="256" height="26" rx="5" fill="rgba(26,110,66,.05)" stroke={G} strokeWidth="0.8" opacity="0.4"/>
        <line x1="80" y1="155" x2="200" y2="155" stroke={G} strokeWidth="0.8" opacity="0.3"/>
        <line x1="80" y1="163" x2="160" y2="163" stroke={G} strokeWidth="0.8" opacity="0.22"/>
        <text x="290" y="163" fill={G} fontSize="6.5" fontFamily="monospace" opacity="0.45">confidence: 94%</text>

        {/* Action buttons */}
        <rect x="72"  y="180" width="70" height="36" rx="7" fill="rgba(26,110,66,.15)" stroke={G} strokeWidth="1.3" opacity="0.9"/>
        <text x="107" y="202" textAnchor="middle" fill={G} fontSize="7.5" fontFamily="monospace" fontWeight="bold" opacity="0.85">✓ APPROVE</text>

        <rect x="152" y="180" width="58" height="36" rx="7" fill="rgba(26,110,66,.05)" stroke={G} strokeWidth="1" opacity="0.6"/>
        <text x="181" y="202" textAnchor="middle" fill={G} fontSize="7.5" fontFamily="monospace" opacity="0.6">EDIT</text>

        <rect x="220" y="180" width="58" height="36" rx="7" fill="rgba(26,110,66,.05)" stroke={G} strokeWidth="1" opacity="0.5"/>
        <text x="249" y="202" textAnchor="middle" fill={G} fontSize="7.5" fontFamily="monospace" opacity="0.5">ESCALATE</text>

        <rect x="288" y="180" width="48" height="36" rx="7" fill="rgba(200,40,40,.06)" stroke="rgba(200,40,40,.35)" strokeWidth="1" opacity="0.7"/>
        <text x="312" y="202" textAnchor="middle" fill="#c03030" fontSize="7.5" fontFamily="monospace" opacity="0.7">✗ REJECT</text>

        {/* Human figure — left of interface */}
        <circle cx="32" cy="170" r="16" stroke={G} strokeWidth="1.1" opacity="0.45"/>
        <circle cx="32" cy="162" r="6"  stroke={G} strokeWidth="1"   opacity="0.6"/>
        <path d="M20 184 C20 177 44 177 44 184" stroke={G} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55"/>
        <line x1="48" y1="170" x2="60" y2="170" stroke={G} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3"/>

        {/* ── Approval path (green) ── */}
        <line x1="107" y1="216" x2="107" y2="254" stroke={G} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" className="hitl-flow"/>
        <polygon points="103,252 107,260 111,252" fill={G} opacity="0.4"/>
        <rect x="60" y="262" width="100" height="32" rx="7" fill="rgba(26,110,66,.08)" stroke={G} strokeWidth="1.2" opacity="0.7"/>
        <text x="110" y="282" textAnchor="middle" fill={G} fontSize="7" fontFamily="monospace" opacity="0.75">✓ Approved</text>

        {/* ── Reject path (red) ── */}
        <line x1="312" y1="216" x2="312" y2="254" stroke="rgba(200,40,40,.4)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" className="hitl-flow" style={{ animationDelay:'0.5s' }}/>
        <polygon points="308,252 312,260 316,252" fill="rgba(200,40,40,.45)" opacity="0.6"/>
        <rect x="260" y="262" width="104" height="32" rx="7" fill="rgba(200,40,40,.06)" stroke="rgba(200,40,40,.3)" strokeWidth="1.2" opacity="0.7"/>
        <text x="312" y="282" textAnchor="middle" fill="#c03030" fontSize="7" fontFamily="monospace" opacity="0.7">✗ Returned</text>

        {/* ── Feedback loop arrow ── */}
        <path d="M 358 275 Q 395 275 395 48 Q 395 22 290 22" stroke={G} strokeWidth="0.9" strokeDasharray="4 4" opacity="0.18" fill="none" className="hitl-flow" style={{ animationDelay:'0.3s' }}/>
        <text x="400" y="160" fill={G} fontSize="6" fontFamily="monospace" opacity="0.2" transform="rotate(90,400,160)">feedback →</text>

        {/* Audit log badge */}
        <g transform="translate(12,310)">
          <rect width="100" height="52" rx="8" fill="rgba(26,110,66,.05)" stroke={G} strokeWidth="1" opacity="0.45"/>
          <text x="50" y="20" textAnchor="middle" fill={G} fontSize="7" fontFamily="monospace" opacity="0.6">AUDIT LOG</text>
          <line x1="12" y1="28" x2="88" y2="28" stroke={G} strokeWidth="0.5" opacity="0.2"/>
          {[36,43,50].map(y=>(<line key={y} x1="12" y1={y} x2={y===43?68:78} y2={y} stroke={G} strokeWidth="0.5" opacity="0.18"/>))}
        </g>

        <text x="210" y="368" textAnchor="middle" fill={G} fontSize="6.5" fontFamily="monospace" opacity="0.22" letterSpacing="1.5">
          VALIDATE  ·  AUDIT  ·  IMPROVE
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
          <span className="hitl-blink" style={{ width:6, height:6, borderRadius:'50%', background:G, display:'inline-block' }}/>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.18em', color:G, opacity:.85 }}>AI GOVERNANCE & UX ENGINEERING</span>
        </motion.div>

        <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 52px', alignItems:'center' }}>
          <div>
            {['Human-in-the-Loop', '(HITL) Design.'].map((line,li)=>(
              <div key={li} style={{ overflow:'hidden', marginBottom:li===0?4:28 }}>
                <motion.h1 initial={{ y:'100%' }} animate={{ y:0 }} transition={{ duration:.82, delay:.22+li*.14, ease:EASE }}
                  style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(36px, 6vw, 68px)', color:li===0?'#0d3d22':G, lineHeight:1.02, margin:0, letterSpacing:'-0.02em' }}>
                  {line}
                </motion.h1>
              </div>
            ))}
            <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6, delay:.52, ease:EASE }}
              style={{ fontFamily:'var(--font-body)', fontSize:'clamp(14px,1.4vw,17px)', color:'#3d6b50', lineHeight:1.82, margin:'0 auto 28px', maxWidth:460 }}>
              UI/UX engineering that puts the right human in control of the right AI output — at the right moment. Validation interfaces, audit trails and access controls for enterprises that can't afford to get it wrong.
            </motion.p>
            <motion.div className="hero-meta" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.55, delay:.64, ease:EASE }}
              style={{ display:'flex', flexWrap:'wrap', gap:18, marginBottom:32 }}>
              {['Validation interfaces','Audit trails','Access control','Compliance by design'].map((t,i)=>(
                <motion.div key={i} initial={{ opacity:0, scale:.82 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.34, delay:.68+i*.08, ease:EASE }}
                  style={{ display:'flex', alignItems:'center', gap:7 }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:G, opacity:.5, flexShrink:0 }}/>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:'#3d7a55', letterSpacing:'0.06em' }}>{t}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="hero-stats" initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.55, delay:1.0, ease:EASE }}
              style={{ display:'flex', gap:28, paddingTop:24, borderTop:'1px solid rgba(26,110,66,.1)', flexWrap:'wrap' }}>
              {[{val:'Zero',label:'Unreviewed errors'},{val:'Full',label:'Audit trail'},{val:'100%',label:'Compliance-ready'}].map((s,i)=>(
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

/* rest of page */
const WHYS = [
  { icon:'⚖', head:'AI is not infallible',          body:'LLMs hallucinate. Classifiers drift. Without a human checkpoint, errors reach downstream systems, customers or regulators before anyone notices.' },
  { icon:'🏛', head:'Compliance demands it',          body:'GDPR, EU AI Act, HIPAA and financial regulations increasingly require documented human oversight for automated decisions affecting individuals.' },
  { icon:'🎯', head:'Edge cases need judgement',      body:"The long tail of cases that fall outside training data can't be handled by confidence scores alone. Someone needs to make the call." },
  { icon:'📈', head:'Human feedback improves the model', body:'Every correction is a training signal. HITL interfaces that capture structured feedback create a flywheel that makes your AI progressively better.' },
  { icon:'🔐', head:'Access control is non-negotiable', body:'Who can approve what — and on whose behalf — needs to be enforced at the interface level, not assumed.' },
];
const BUILDS = [
  { num:'01', title:'Validation & Review Interfaces', body:'Purpose-built UIs where reviewers see the AI output, the supporting context, and a structured set of actions: approve, edit, reject, escalate — with every decision logged.', pills:['Contextual AI output display','Inline editing','Structured decision capture','Keyboard-first UX'], svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><rect x="4" y="6" width="44" height="40" rx="5" stroke="#1a6e42" strokeWidth="1.2" opacity="0.55"/><line x1="4" y1="16" x2="48" y2="16" stroke="#1a6e42" strokeWidth="0.7" opacity="0.2"/><rect x="10" y="22" width="32" height="7" rx="2" stroke="#1a6e42" strokeWidth="1" opacity="0.4"/><rect x="10" y="33" width="10" height="7" rx="2" fill="#1a6e42" opacity="0.35"/><rect x="23" y="33" width="8" height="7" rx="2" stroke="#1a6e42" strokeWidth="1" opacity="0.3"/><rect x="34" y="33" width="8" height="7" rx="2" stroke="#1a6e42" strokeWidth="1" opacity="0.25"/><circle cx="10" cy="11" r="2" fill="#1a6e42" opacity="0.5"/><circle cx="16" cy="11" r="2" fill="#1a6e42" opacity="0.35"/></svg>) },
  { num:'02', title:'Role-Based Access & Approval Chains', body:"Not everyone should approve everything. We build tiered permission systems: junior reviewers flag, senior reviewers decide, compliance teams audit — enforced at every step.", pills:['RBAC enforcement','Multi-level approval','Delegation rules','Out-of-office routing'], svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><circle cx="26" cy="14" r="7" stroke="#1a6e42" strokeWidth="1.2" opacity="0.7"/><circle cx="12" cy="36" r="6" stroke="#1a6e42" strokeWidth="1.1" opacity="0.5"/><circle cx="40" cy="36" r="6" stroke="#1a6e42" strokeWidth="1.1" opacity="0.5"/><line x1="26" y1="21" x2="26" y2="28" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3"/><line x1="26" y1="28" x2="12" y2="31" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3"/><line x1="26" y1="28" x2="40" y2="31" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3"/><path d="M22 14 L26 17 L30 14" stroke="#1a6e42" strokeWidth="1" fill="none" opacity="0.4"/></svg>) },
  { num:'03', title:'Audit Trail & Compliance Logging', body:'An immutable, queryable record of every AI output, every human decision, every override and every escalation. Exportable for regulators, filterable for ops teams.', pills:['Immutable event log','Decision attribution','Exportable reports','Retention policies'], svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><rect x="8" y="6" width="36" height="40" rx="4" stroke="#1a6e42" strokeWidth="1.2" opacity="0.5"/><line x1="14" y1="16" x2="38" y2="16" stroke="#1a6e42" strokeWidth="0.8" opacity="0.4"/><line x1="14" y1="22" x2="38" y2="22" stroke="#1a6e42" strokeWidth="0.8" opacity="0.35"/><line x1="14" y1="28" x2="30" y2="28" stroke="#1a6e42" strokeWidth="0.8" opacity="0.3"/><line x1="14" y1="34" x2="38" y2="34" stroke="#1a6e42" strokeWidth="0.8" opacity="0.25"/><line x1="14" y1="40" x2="26" y2="40" stroke="#1a6e42" strokeWidth="0.8" opacity="0.2"/><circle cx="12" cy="16" r="1.5" fill="#1a6e42" opacity="0.6"/><circle cx="12" cy="22" r="1.5" fill="#1a6e42" opacity="0.5"/><circle cx="12" cy="28" r="1.5" fill="#1a6e42" opacity="0.4"/><circle cx="12" cy="34" r="1.5" fill="#1a6e42" opacity="0.35"/><circle cx="12" cy="40" r="1.5" fill="#1a6e42" opacity="0.25"/></svg>) },
  { num:'04', title:'Feedback Capture for Model Improvement', body:'Corrections and rejections should feed back into the AI — but only when structured correctly. We build feedback loops that turn human oversight into continuous model improvement.', pills:['Structured correction forms','Confidence calibration','RLHF data pipeline','Fine-tune dataset export'], svg:(<svg viewBox="0 0 52 52" fill="none" width={44} height={44}><path d="M26 8 C36 8 44 16 44 26 C44 36 36 44 26 44 C16 44 8 36 8 26 C8 20 11 14 16 10" stroke="#1a6e42" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6"/><path d="M13 6 L16 10 L12 13" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/><circle cx="26" cy="26" r="7" stroke="#1a6e42" strokeWidth="1.1" opacity="0.5"/><path d="M22 26 L25 29 L30 23" stroke="#1a6e42" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/></svg>) },
];
const USE_CASES = [
  { domain:'Legal & Contracts', example:'AI drafts clause summaries → lawyer reviews & approves before client delivery',           risk:'High' },
  { domain:'Finance & Credit',  example:'Model scores loan application → underwriter reviews anomalies before decision',          risk:'High' },
  { domain:'Healthcare',        example:'AI flags imaging anomaly → radiologist validates before report is issued',               risk:'Critical' },
  { domain:'HR & Hiring',       example:'AI shortlists candidates → recruiter reviews before rejections are sent',                risk:'Medium' },
  { domain:'Content Moderation',example:'Classifier flags content → human moderator reviews borderline cases',                   risk:'Medium' },
  { domain:'Supply Chain',      example:'AI recommends reorder quantities → procurement approves unusual spikes',                 risk:'Medium' },
];
const PRINCIPLES = [
  { title:'Context first',         desc:'Reviewers see everything they need to decide — not just the output. Model confidence, source data, similar past cases.' },
  { title:'Friction by design',    desc:'High-stakes actions require deliberate confirmation. Low-stakes actions should be one click. Friction is calibrated to consequence.' },
  { title:'Decision, not data entry', desc:"Reviewers make judgements. They don't fill in forms. The interface captures structured data from natural decisions." },
  { title:'Speed matters',         desc:'HITL fails when it\'s slower than doing it manually. Keyboard shortcuts, batch review, and smart pre-fills are non-negotiable.' },
];

function WhySection() {
  return (
    <section className="page-section" style={{ padding:'clamp(56px,8vw,100px) clamp(20px,4vw,32px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="WHY IT MATTERS"/>
        <div className="col2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px 72px', alignItems:'start' }}>
          <div>
            <div style={{ overflow:'hidden', marginBottom:8 }}><RevealClip delay={0.06}><h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3.2vw,44px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>Autonomous AI without oversight is a liability.</h2></RevealClip></div>
            <FadeUp delay={0.18}><p style={{ fontFamily:'var(--font-body)', fontSize:14.5, color:'#3d6b50', lineHeight:1.82, margin:'16px 0 0' }}>The goal isn't to keep humans in the loop forever — it's to keep them in the loop <em>intelligently</em>, where their judgement changes the outcome and their feedback improves the system.</p></FadeUp>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {WHYS.map((w,i)=>(
              <FadeUp key={i} delay={0.1+i*.07}>
                <div className="hitl-row" style={{ display:'flex', gap:13, padding:'11px 10px' }}>
                  <span style={{ fontSize:17, flexShrink:0, marginTop:1 }}>{w.icon}</span>
                  <div>
                    <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:13.5, color:'#0d3d22', margin:'0 0 2px' }}>{w.head}</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:12.5, color:'#3d6b50', margin:0, lineHeight:1.65 }}>{w.body}</p>
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
function WhatWeSection() {
  return (
    <section className="page-section" style={{ padding:'0 clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="WHAT WE BUILD"/>
        <div style={{ overflow:'hidden', marginBottom:10 }}><RevealClip delay={0.06}><h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3vw,42px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>Interfaces that make human oversight fast, not painful.</h2></RevealClip></div>
        <FadeUp delay={0.16} style={{ marginBottom:48 }}><p style={{ fontFamily:'var(--font-body)', fontSize:14.5, color:'#3d6b50', lineHeight:1.82, maxWidth:520, margin:'10px 0 0' }}>The bottleneck in most AI workflows is the human step — not because humans are slow, but because the interfaces are badly designed. We fix that.</p></FadeUp>
        <div className="col2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {BUILDS.map((b,i)=>(
            <FadeUp key={i} delay={0.08+i*.09}>
              <div className="hitl-card" style={{ padding:'24px', borderRadius:14, background:'#fff' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                  <div>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:G, opacity:.6, letterSpacing:'0.12em', display:'block', marginBottom:8 }}>{b.num}</span>
                    <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15.5, color:'#0d3d22', margin:0, lineHeight:1.25, maxWidth:200 }}>{b.title}</h3>
                  </div>
                  <div style={{ opacity:.65, flexShrink:0 }}>{b.svg}</div>
                </div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'#3d6b50', lineHeight:1.75, margin:'0 0 18px' }}>{b.body}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                  {b.pills.map((p,pi)=><span key={pi} className="hitl-pill" style={{ fontFamily:'var(--font-mono)', fontSize:9.5, padding:'3px 9px', borderRadius:100, border:'1px solid rgba(26,110,66,.18)', color:'#3d7a55' }}>{p}</span>)}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
function UseCasesSection() {
  return (
    <section className="page-section" style={{ padding:'0 clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="WHERE IT'S NEEDED"/>
        <div style={{ overflow:'hidden', marginBottom:40 }}><RevealClip delay={0.06}><h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3vw,40px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>High-stakes AI decisions across domains.</h2></RevealClip></div>
        {/* header row hidden on mobile */}
        <FadeIn delay={0.08}>
          <div className="use-cases-table" style={{ display:'grid', gridTemplateColumns:'140px 1fr 80px', gap:'0 24px', padding:'10px 0', borderBottom:'1px solid rgba(26,110,66,.1)', marginBottom:4 }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'#3d7a55', opacity:.45, letterSpacing:'0.12em' }}>DOMAIN</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'#3d7a55', opacity:.45, letterSpacing:'0.12em' }}>WORKFLOW</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'#3d7a55', opacity:.45, letterSpacing:'0.12em', textAlign:'right' }}>RISK</span>
          </div>
        </FadeIn>
        {USE_CASES.map((u,i)=>(
          <FadeUp key={i} delay={0.06+i*.08}>
            <div className="use-cases-table" style={{ display:'grid', gridTemplateColumns:'140px 1fr 80px', gap:'0 24px', padding:'15px 0', borderBottom:'1px solid rgba(26,110,66,.06)', alignItems:'center' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:G, opacity:.75 }}>{u.domain}</span>
              <span style={{ fontFamily:'var(--font-body)', fontSize:13.5, color:'#3d6b50', lineHeight:1.6 }}>{u.example}</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:9.5, color: u.risk==='Critical'?'#c03030':u.risk==='High'?'#b45309':'#3d7a55', opacity:.75, textAlign:'right' }}>{u.risk}</span>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
function PrinciplesSection() {
  return (
    <section className="page-section" style={{ padding:'0 clamp(20px,4vw,32px) clamp(56px,8vw,100px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionLabel text="DESIGN PRINCIPLES"/>
        <div className="col2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'36px 72px', alignItems:'start' }}>
          <div>
            <div style={{ overflow:'hidden', marginBottom:8 }}><RevealClip delay={0.06}><h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(24px,3vw,40px)', color:'#0d3d22', lineHeight:1.1, margin:0 }}>The interface is part of the AI system.</h2></RevealClip></div>
            <FadeUp delay={0.18}><p style={{ fontFamily:'var(--font-body)', fontSize:14.5, color:'#3d6b50', lineHeight:1.82, margin:'14px 0 0', maxWidth:380 }}>Most teams design AI systems and bolt on a review UI as an afterthought. We treat the human interface as a first-class engineering concern.</p></FadeUp>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {PRINCIPLES.map((p,i)=>(
              <FadeUp key={i} delay={0.1+i*.09}>
                <div className="hitl-step" style={{ padding:'18px 20px', borderRadius:12, background:'#fff' }}>
                  <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:14.5, color:'#0d3d22', margin:'0 0 7px' }}>{p.title}</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'#3d6b50', margin:0, lineHeight:1.7 }}>{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
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
                <div style={{ overflow:'hidden', marginBottom:8 }}><RevealClip delay={0.06}><h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(20px,2.5vw,32px)', color:'#0d3d22', margin:0, lineHeight:1.15 }}>Deploying AI where the stakes are high?</h2></RevealClip></div>
                <FadeUp delay={0.16}><p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'#3d6b50', margin:0, lineHeight:1.7, maxWidth:440 }}>Tell us your use case and your compliance requirements. We'll design a HITL architecture that keeps your team in control without slowing them down.</p></FadeUp>
              </div>
              <FadeUp delay={0.22}>
                <Magnetic>
                  <a href="#contact" style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'#fff', background:G, border:`1px solid ${G}`, padding:'13px 28px', borderRadius:8, textDecoration:'none', display:'inline-block', flexShrink:0, transition:'background .22s,color .22s' }}
                    onMouseEnter={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=G;}}
                    onMouseLeave={e=>{e.currentTarget.style.background=G;e.currentTarget.style.color='#fff';}}>
                    Design your oversight system →
                  </a>
                </Magnetic>
              </FadeUp>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export function HITLDesignPage() {
  return (
    <div style={{ background:'#fff', minHeight:'100vh' }}>
      <style>{STYLES}</style>
      <HeroSection/>
      <WhySection/>
      <Divider/>
      <WhatWeSection/>
      <Divider/>
      <UseCasesSection/>
      <Divider/>
      <PrinciplesSection/>
      <CTASection/>
    </div>
  );
}