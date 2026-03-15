import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const GLOBAL_STYLES = `
  .nlp-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .nlp-card:hover { transform: translateY(-5px); box-shadow: 0 18px 44px rgba(0,0,0,0.38) !important; }
  .nlp-stat-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .nlp-stat-card:hover { transform: translateY(-6px) scale(1.02); }
  .nlp-industry-card { transition: border-color 0.25s, background 0.25s, transform 0.25s; cursor: pointer; }
  .nlp-industry-card:hover { transform: translateY(-4px); }
  .nlp-arch-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .nlp-arch-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.4) !important; }
  @media(max-width:900px){ .nlp-grid-3{ grid-template-columns: 1fr 1fr !important; } }
  @media(max-width:600px){ .nlp-grid-3{ grid-template-columns: 1fr !important; } }
  @media(max-width:768px){ 
    .nlp-tl-line{ display:none; } 
    .nlp-step-wrap{ justify-content:center !important; } 
    .nlp-step-card{ width:90% !important; }
    .nlp-sec-header { text-align: center !important; }
    .nlp-sec-header p { margin-left: auto !important; margin-right: auto !important; }
  }
`;

/* ═══════════════════════════════════════════════
   SECTION 1 — Boost Business with NLP
═══════════════════════════════════════════════ */
const GROWTH_SERVICES = [
  { id: '01', color: '#00e87a', title: 'Sentiment & Opinion Analysis', body: 'Mine customer reviews, support tickets, and social feeds for granular sentiment — by product, feature, and demographic segment.', metric: '92%', metricLabel: 'sentiment accuracy',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><circle cx="28" cy="26" r="16" stroke="#00e87a" strokeWidth="1.3" opacity="0.5"/><path d="M20 30 Q28 36 36 30" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.9"/><circle cx="22" cy="23" r="2.5" fill="#00e87a" opacity="0.7"/><circle cx="34" cy="23" r="2.5" fill="#00e87a" opacity="0.7"/><path d="M14 14 L6 8" stroke="#00e87a" strokeWidth="1.2" opacity="0.3"/><path d="M42 14 L50 8" stroke="#00e87a" strokeWidth="1.2" opacity="0.3"/></svg>),
  },
  { id: '02', color: '#c9a84c', title: 'Named Entity Recognition', body: 'Extract people, organisations, locations, dates, and custom domain entities from unstructured text at scale — with fine-tuned precision.', metric: '97%', metricLabel: 'entity F1 score',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="4" y="10" width="48" height="36" rx="3" stroke="#c9a84c" strokeWidth="1.2" opacity="0.4"/><rect x="8" y="18" width="12" height="6" rx="1.5" fill="#c9a84c" opacity="0.5"/><rect x="22" y="18" width="18" height="6" rx="1.5" fill="#00e87a" opacity="0.4"/><rect x="42" y="18" width="8" height="6" rx="1.5" fill="#c9a84c" opacity="0.35"/><rect x="8" y="28" width="20" height="6" rx="1.5" fill="#00b85e" opacity="0.4"/><rect x="30" y="28" width="14" height="6" rx="1.5" fill="#c9a84c" opacity="0.5"/><text x="14" y="23" textAnchor="middle" fill="#c9a84c" fontSize="4" fontFamily="monospace">PER</text><text x="31" y="23" textAnchor="middle" fill="#00e87a" fontSize="4" fontFamily="monospace">ORG</text><text x="46" y="23" textAnchor="middle" fill="#c9a84c" fontSize="4" fontFamily="monospace">LOC</text></svg>),
  },
  { id: '03', color: '#00b85e', title: 'Text Classification & Routing', body: 'Auto-tag, categorise, and route inbound documents, emails, and tickets to the right team or workflow — with custom taxonomy models.', metric: '99%', metricLabel: 'routing precision',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="4" y="20" width="16" height="12" rx="2" stroke="#00b85e" strokeWidth="1.4" opacity="0.7"/><path d="M20 26 L28 20 M20 26 L28 30 M20 26 L28 38" stroke="#00b85e" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/><rect x="28" y="14" width="16" height="10" rx="2" stroke="#00b85e" strokeWidth="1.2" opacity="0.6"/><rect x="28" y="24" width="16" height="10" rx="2" stroke="#00b85e" strokeWidth="1.4" opacity="0.9"/><rect x="28" y="34" width="16" height="10" rx="2" stroke="#00b85e" strokeWidth="1.2" opacity="0.6"/><text x="12" y="28" textAnchor="middle" fill="#00b85e" fontSize="4.5" fontFamily="monospace">TEXT</text></svg>),
  },
  { id: '04', color: '#00e87a', title: 'Summarisation & Abstractive Extraction', body: 'Generate concise summaries of long documents, meeting transcripts, and reports — abstractive or extractive, in your brand voice.', metric: '85%', metricLabel: 'ROUGE-L score',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="4" y="8" width="28" height="36" rx="3" stroke="#00e87a" strokeWidth="1.2" opacity="0.5"/><line x1="10" y1="16" x2="26" y2="16" stroke="#00e87a" strokeWidth="1" opacity="0.4"/><line x1="10" y1="21" x2="26" y2="21" stroke="#00e87a" strokeWidth="1" opacity="0.35"/><line x1="10" y1="26" x2="26" y2="26" stroke="#00e87a" strokeWidth="1" opacity="0.3"/><line x1="10" y1="31" x2="20" y2="31" stroke="#00e87a" strokeWidth="1" opacity="0.25"/><path d="M36 18 L52 18" stroke="#00e87a" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/><path d="M36 26 L52 26" stroke="#00e87a" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/><path d="M36 34 L46 34" stroke="#00e87a" strokeWidth="1.4" strokeLinecap="round" opacity="0.4"/><path d="M32 18 L36 26 L32 34" stroke="#00e87a" strokeWidth="1.2" fill="none" opacity="0.5"/></svg>),
  },
  { id: '05', color: '#c9a84c', title: 'Machine Translation & Localisation', body: 'Deploy custom neural MT models fine-tuned on your domain terminology — so translations sound like a human expert, not a dictionary.', metric: '40+', metricLabel: 'languages supported',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><circle cx="28" cy="28" r="18" stroke="#c9a84c" strokeWidth="1.2" opacity="0.4"/><ellipse cx="28" cy="28" rx="9" ry="18" stroke="#c9a84c" strokeWidth="1.2" opacity="0.5"/><line x1="10" y1="28" x2="46" y2="28" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/><line x1="10" y1="20" x2="46" y2="20" stroke="#c9a84c" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3"/><line x1="10" y1="36" x2="46" y2="36" stroke="#c9a84c" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3"/><path d="M22 40 L34 40" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/><path d="M30 37 L34 40 L30 43" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/></svg>),
  },
  { id: '06', color: '#00b85e', title: 'Conversational & Dialogue Systems', body: 'Build context-aware dialogue systems that handle multi-turn conversations, clarification, entity tracking, and graceful fallbacks.', metric: '3.2x', metricLabel: 'longer session engagement',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="4" y="8" width="32" height="20" rx="4" stroke="#00b85e" strokeWidth="1.3" opacity="0.65"/><circle cx="12" cy="18" r="2.5" fill="#00b85e" opacity="0.5"/><circle cx="20" cy="18" r="2.5" fill="#00b85e" opacity="0.8"/><circle cx="28" cy="18" r="2.5" fill="#00b85e" opacity="0.5"/><path d="M4 24 L10 30 L4 30 Z" fill="#00b85e" opacity="0.4"/><rect x="22" y="28" width="30" height="18" rx="4" stroke="#00b85e" strokeWidth="1.3" opacity="0.85"/><line x1="28" y1="35" x2="46" y2="35" stroke="#00b85e" strokeWidth="1" opacity="0.5"/><line x1="28" y1="39" x2="40" y2="39" stroke="#00b85e" strokeWidth="1" opacity="0.4"/><path d="M52 42 L46 46 L52 46 Z" fill="#00b85e" opacity="0.4"/></svg>),
  },
];

function GrowthCard({ s, index, inView }: { s: typeof GROWTH_SERVICES[0]; index: number; inView: boolean }) {
  return (
    <motion.div className="nlp-card" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
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

export function NLPGrowth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <style>{GLOBAL_STYLES}</style>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} className="nlp-sec-header" style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>WHAT WE UNLOCK</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '700px' }}>
            Boost Your Business Growth<br /><span style={{ color: 'var(--accent-primary)' }}>with Advanced NLP.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '14px', maxWidth: '520px' }}>Six production NLP capabilities we ship — turning unstructured language into structured business value.</p>
        </motion.div>
        <div className="nlp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {GROWTH_SERVICES.map((s, i) => <GrowthCard key={s.id} s={s} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 — NLP Models & Architectures
═══════════════════════════════════════════════ */
const ARCHITECTURES = [
  { name: 'Transformer-Based Models', abbr: 'TBM', color: '#00e87a', models: ['BERT', 'RoBERTa', 'DeBERTa', 'XLNet'], desc: 'Fine-tuned encoder models for classification, NER, and relation extraction — state-of-the-art on structured NLP benchmarks.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}>{[6,14,22,30,38,46].map((x,i)=><rect key={i} x={x-3} y="8" width="6" height="8" rx="1.5" fill="#00e87a" opacity={0.3+i*0.08}/>)}{[6,14,22,30,38,46].map((x,i)=><rect key={i} x={x-3} y="36" width="6" height="8" rx="1.5" fill="#00e87a" opacity={0.25+i*0.06}/>)}<rect x="10" y="22" width="32" height="8" rx="2" stroke="#00e87a" strokeWidth="1.4" opacity="0.9"/><text x="26" y="28" textAnchor="middle" fill="#00e87a" fontSize="5" fontFamily="monospace">ATTN</text>{[6,14,22,30,38,46].map((x,i)=><line key={i} x1={x} y1="16" x2={x} y2="22" stroke="#00e87a" strokeWidth="0.7" opacity="0.3"/>)}{[6,14,22,30,38,46].map((x,i)=><line key={i} x1={x} y1="30" x2={x} y2="36" stroke="#00e87a" strokeWidth="0.7" opacity="0.3"/>)}</svg>) },
  { name: 'Large Language Models', abbr: 'LLM', color: '#c9a84c', models: ['GPT-4o', 'Claude 3.5', 'Llama 3.1', 'Mistral'], desc: 'Instruction-tuned decoder models for generation, summarisation, translation, and zero-shot NLP tasks with prompt engineering.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="10" width="44" height="32" rx="4" stroke="#c9a84c" strokeWidth="1.4" opacity="0.6"/><line x1="4" y1="18" x2="48" y2="18" stroke="#c9a84c" strokeWidth="0.7" opacity="0.18"/>{[0,1,2].map(row=>[0,1,2,3,4].map(col=>(<rect key={`${row}-${col}`} x={8+col*8} y={22+row*6} width="5" height="3.5" rx="1" fill="#c9a84c" opacity={0.12+row*0.1+col*0.03}/>)))}<rect x="8" y="22" width="13" height="3.5" rx="1" fill="#c9a84c" opacity="0.5"/></svg>) },
  { name: 'Sequence-to-Sequence Models', abbr: 'S2S', color: '#00b85e', models: ['T5', 'BART', 'mBART', 'MarianMT'], desc: 'Encoder-decoder architectures for translation, summarisation, question generation, and controlled text transformation.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="16" width="16" height="20" rx="3" stroke="#00b85e" strokeWidth="1.3" opacity="0.7"/><text x="12" y="28" textAnchor="middle" fill="#00b85e" fontSize="5" fontFamily="monospace">ENC</text><rect x="32" y="16" width="16" height="20" rx="3" stroke="#00b85e" strokeWidth="1.3" opacity="0.7"/><text x="40" y="28" textAnchor="middle" fill="#00b85e" fontSize="5" fontFamily="monospace">DEC</text><path d="M20 26 L32 26" stroke="#00b85e" strokeWidth="1.4" strokeDasharray="2 2" opacity="0.6"/><path d="M28 23 L32 26 L28 29" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/></svg>) },
  { name: 'Embedding & Semantic Models', abbr: 'ESM', color: '#00e87a', models: ['sentence-transformers', 'E5', 'BGE', 'Cohere Embed'], desc: 'Dense vector representations of text for semantic search, clustering, deduplication, and similarity scoring.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="6" width="16" height="6" rx="1.5" stroke="#00e87a" strokeWidth="1.2" opacity="0.6"/><rect x="4" y="16" width="16" height="6" rx="1.5" stroke="#00e87a" strokeWidth="1.2" opacity="0.6"/><rect x="4" y="26" width="16" height="6" rx="1.5" stroke="#00e87a" strokeWidth="1.2" opacity="0.6"/><path d="M20 9 L30 26" stroke="#00e87a" strokeWidth="1" opacity="0.35"/><path d="M20 19 L30 26" stroke="#00e87a" strokeWidth="1" opacity="0.45"/><path d="M20 29 L30 26" stroke="#00e87a" strokeWidth="1" opacity="0.35"/><circle cx="30" cy="26" r="8" stroke="#00e87a" strokeWidth="1.4" opacity="0.8"/><circle cx="30" cy="26" r="3" fill="#00e87a" opacity="0.5"/></svg>) },
  { name: 'Speech & Audio NLP', abbr: 'SANL', color: '#c9a84c', models: ['Whisper', 'wav2vec 2.0', 'SpeechBrain', 'DeepSpeech'], desc: 'Transcription, speaker diarisation, language identification, and voice-to-intent pipelines for audio-first workflows.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="20" y="6" width="12" height="20" rx="6" stroke="#c9a84c" strokeWidth="1.3" opacity="0.7"/><path d="M12 24 C12 34 40 34 40 24" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.7"/><line x1="26" y1="34" x2="26" y2="42" stroke="#c9a84c" strokeWidth="1.3" opacity="0.5"/><line x1="20" y1="42" x2="32" y2="42" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>{[6,10,14,18,22].map((x,i)=><line key={i} x1={x} y1={26-(i%2===0?4:7)} x2={x} y2={26+(i%2===0?4:7)} stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>)}</svg>) },
  { name: 'Information Extraction', abbr: 'IE', color: '#00b85e', models: ['spaCy', 'Stanza', 'Flair', 'Haystack'], desc: 'Structured extraction of relationships, events, coreference chains, and ontology mappings from raw unstructured text.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="8" width="44" height="36" rx="3" stroke="#00b85e" strokeWidth="1.2" opacity="0.4"/><line x1="8" y1="16" x2="44" y2="16" stroke="#00b85e" strokeWidth="0.8" opacity="0.2"/><rect x="8" y="20" width="14" height="5" rx="1.5" fill="#00b85e" opacity="0.45"/><rect x="24" y="20" width="10" height="5" rx="1.5" fill="#c9a84c" opacity="0.4"/><rect x="36" y="20" width="10" height="5" rx="1.5" fill="#00e87a" opacity="0.35"/><line x1="8" y1="30" x2="44" y2="30" stroke="#00b85e" strokeWidth="0.7" opacity="0.2"/><rect x="8" y="34" width="18" height="5" rx="1.5" fill="#00b85e" opacity="0.35"/><rect x="28" y="34" width="14" height="5" rx="1.5" fill="#c9a84c" opacity="0.3"/><text x="15" y="24" textAnchor="middle" fill="#00b85e" fontSize="3.5" fontFamily="monospace">PER</text><text x="29" y="24" textAnchor="middle" fill="#c9a84c" fontSize="3.5" fontFamily="monospace">ORG</text><text x="41" y="24" textAnchor="middle" fill="#00e87a" fontSize="3.5" fontFamily="monospace">LOC</text></svg>) },
];

export function NLPArchitectures() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} className="nlp-sec-header" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>UNDER THE HOOD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            NLP Architectures and<br /><span style={{ color: 'var(--accent-primary)' }}>Models We Work With.</span>
          </h2>
        </motion.div>
        <div className="nlp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {ARCHITECTURES.map((a, i) => (
            <motion.div key={a.abbr} className="nlp-arch-card" initial={{ opacity: 0, y: 38 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
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
   SECTION 3 — NLP Development Roadmap
═══════════════════════════════════════════════ */
const ROADMAP_STEPS = [
  { phase: 'DISCOVER', duration: '1 wk', color: '#00e87a', title: 'Task Framing & Corpus Audit', body: 'We define the NLP task type, audit your text corpus for quality and volume, and identify annotation requirements before any model work begins.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><circle cx="20" cy="20" r="13" stroke="#00e87a" strokeWidth="1.4" opacity="0.7"/><line x1="29" y1="29" x2="40" y2="40" stroke="#00e87a" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="20" x2="24" y2="20" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="20" y1="16" x2="20" y2="24" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/></svg>) },
  { phase: 'ANNOTATE', duration: '1–3 wks', color: '#c9a84c', title: 'Data Labelling & Annotation', body: 'Set up annotation pipelines with Label Studio or Prodigy. Define schemas, run inter-annotator agreement checks, and build clean training sets.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><rect x="6" y="8" width="36" height="30" rx="3" stroke="#c9a84c" strokeWidth="1.3" opacity="0.5"/><rect x="10" y="14" width="14" height="6" rx="1.5" fill="#c9a84c" opacity="0.5"/><rect x="26" y="14" width="12" height="6" rx="1.5" fill="#00b85e" opacity="0.4"/><rect x="10" y="24" width="18" height="6" rx="1.5" fill="#00e87a" opacity="0.4"/><rect x="30" y="24" width="8" height="6" rx="1.5" fill="#c9a84c" opacity="0.4"/><line x1="14" y1="38" x2="14" y2="42" stroke="#c9a84c" strokeWidth="1.2" opacity="0.5"/><line x1="34" y1="38" x2="34" y2="42" stroke="#c9a84c" strokeWidth="1.2" opacity="0.5"/><line x1="10" y1="42" x2="38" y2="42" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" opacity="0.4"/></svg>) },
  { phase: 'TRAIN', duration: '2–4 wks', color: '#00b85e', title: 'Model Training & Fine-Tuning', body: 'Fine-tune pre-trained transformers on your labelled data. Apply LoRA or adapter tuning where compute is constrained. Benchmark against baselines.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><path d="M8 36 L14 24 L20 28 L26 16 L32 20 L40 8" stroke="#00b85e" strokeWidth="1.7" strokeLinecap="round"/>{([[14,24],[20,28],[26,16],[32,20]] as [number,number][]).map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" fill="#00b85e" opacity={0.5+i*0.1}/>)}<line x1="8" y1="40" x2="42" y2="40" stroke="#00b85e" strokeWidth="0.7" opacity="0.2"/></svg>) },
  { phase: 'EVALUATE', duration: '1 wk', color: '#00e87a', title: 'Evaluation & Error Analysis', body: 'Score with task-appropriate metrics — F1, BLEU, ROUGE, BERTScore. Conduct error analysis and edge case profiling before deployment.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><path d="M24 6 L40 13 L40 26 C40 34 33 40 24 42 C15 40 8 34 8 26 L8 13 Z" stroke="#00e87a" strokeWidth="1.3" fill="none" opacity="0.6"/><path d="M17 24 L22 29 L32 19" stroke="#00e87a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/></svg>) },
  { phase: 'DEPLOY', duration: 'Ongoing', color: '#c9a84c', title: 'Deployment, Monitoring & Retraining', body: 'Serve models via low-latency APIs. Monitor prediction confidence, label drift, and data distribution shifts. Trigger retraining on schedule or on degradation.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><circle cx="24" cy="24" r="18" stroke="#c9a84c" strokeWidth="1.2" opacity="0.25"/><path d="M24 6 A18 18 0 0 1 42 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round"/><path d="M42 24 A18 18 0 0 1 24 42" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/><path d="M24 42 A18 18 0 0 1 6 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.3"/><path d="M6 24 A18 18 0 0 1 24 6" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.15"/><circle cx="24" cy="24" r="5" stroke="#c9a84c" strokeWidth="1.3"/><circle cx="24" cy="24" r="2" fill="#c9a84c" opacity="0.8"/></svg>) },
];

export function NLPRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} className="nlp-sec-header" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>HOW WE BUILD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Our Proven Advanced NLP<br /><span style={{ color: 'var(--accent-primary)' }}>Development Roadmap.</span>
          </h2>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative' }}>
          <div className="nlp-tl-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,232,122,0.07)', transform: 'translateX(-50%)' }} />
          {ROADMAP_STEPS.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={s.phase} initial={{ opacity: 0, x: isLeft ? -48 : 48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, ease: EASE }}
                className="nlp-step-wrap" style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '11px', height: '11px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}88`, zIndex: 4 }} />
                <div className="nlp-step-card" style={{ width: '44%', borderRadius: '14px', background: 'var(--bg-surface)', border: `1px solid ${s.color}1e`, padding: '22px', boxShadow: '0 4px 18px rgba(0,0,0,0.18)', transition: 'transform 0.25s, box-shadow 0.25s' }}>
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
   SECTION 4 — NLP for Industries
═══════════════════════════════════════════════ */
const INDUSTRIES = [
  { name: 'Healthcare', color: '#00e87a', useCases: ['Clinical note summarisation', 'ICD code extraction', 'Patient feedback analysis', 'Drug mention detection'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="3" width="30" height="30" rx="5" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="18" y1="9" x2="18" y2="27" stroke="#00e87a" strokeWidth="2.2" strokeLinecap="round"/><line x1="9" y1="18" x2="27" y2="18" stroke="#00e87a" strokeWidth="2.2" strokeLinecap="round"/></svg>) },
  { name: 'Legal & Compliance', color: '#c9a84c', useCases: ['Contract clause extraction', 'Obligation & risk tagging', 'Case law summarisation', 'Regulatory change detection'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 4 L22 14 L33 14 L24 21 L27 32 L18 26 L9 32 L12 21 L3 14 L14 14 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.8"/></svg>) },
  { name: 'Finance & Banking', color: '#00b85e', useCases: ['Earnings sentiment analysis', 'News event classification', 'Fraud narrative detection', 'Analyst report summarisation'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="8" width="30" height="22" rx="3" stroke="#00b85e" strokeWidth="1.3" opacity="0.6"/><line x1="3" y1="14" x2="33" y2="14" stroke="#00b85e" strokeWidth="0.8" opacity="0.3"/><circle cx="10" cy="22" r="3" stroke="#00b85e" strokeWidth="1.1" opacity="0.6"/></svg>) },
  { name: 'Retail & E-Commerce', color: '#00e87a', useCases: ['Review sentiment mining', 'Product attribute extraction', 'Intent classification', 'Query understanding for search'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M4 8 L8 8 L12 22 L26 22 L30 12 L10 12" stroke="#00e87a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/><circle cx="14" cy="27" r="2.5" stroke="#00e87a" strokeWidth="1.2" opacity="0.7"/><circle cx="24" cy="27" r="2.5" stroke="#00e87a" strokeWidth="1.2" opacity="0.7"/></svg>) },
  { name: 'Media & Publishing', color: '#c9a84c', useCases: ['Article topic classification', 'Named entity tagging', 'Automated headlines', 'Bias & tone detection'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="5" width="30" height="26" rx="3" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><line x1="8" y1="12" x2="28" y2="12" stroke="#c9a84c" strokeWidth="1.1" opacity="0.5"/><line x1="8" y1="17" x2="28" y2="17" stroke="#c9a84c" strokeWidth="1.1" opacity="0.4"/><line x1="8" y1="22" x2="20" y2="22" stroke="#c9a84c" strokeWidth="1.1" opacity="0.35"/></svg>) },
  { name: 'Human Resources', color: '#00b85e', useCases: ['Resume parsing & ranking', 'Job description analysis', 'Employee feedback NLP', 'Interview transcript mining'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><circle cx="18" cy="12" r="6" stroke="#00b85e" strokeWidth="1.3" opacity="0.8"/><path d="M6 30 C6 23 30 23 30 30" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.7"/></svg>) },
  { name: 'Customer Support', color: '#00e87a', useCases: ['Ticket intent classification', 'Urgency scoring models', 'Agent reply suggestion', 'CSAT prediction from text'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="8" width="26" height="18" rx="4" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/><circle cx="10" cy="17" r="2" fill="#00e87a" opacity="0.6"/><circle cx="16" cy="17" r="2" fill="#00e87a" opacity="0.8"/><circle cx="22" cy="17" r="2" fill="#00e87a" opacity="0.6"/><path d="M3 22 L8 27 L3 27 Z" fill="#00e87a" opacity="0.4"/><circle cx="30" cy="10" r="5" stroke="#00e87a" strokeWidth="1.2" opacity="0.6"/><path d="M28 10 L30 12 L33 8" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/></svg>) },
  { name: 'Government & Public Sector', color: '#c9a84c', useCases: ['Policy document classification', 'Citizen query understanding', 'Public sentiment tracking', 'Legislative NLP tagging'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 4 L32 12 L32 14 L4 14 L4 12 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.8"/><rect x="6" y="14" width="4" height="16" stroke="#c9a84c" strokeWidth="1.1" opacity="0.6"/><rect x="14" y="14" width="4" height="16" stroke="#c9a84c" strokeWidth="1.1" opacity="0.6"/><rect x="22" y="14" width="4" height="16" stroke="#c9a84c" strokeWidth="1.1" opacity="0.6"/><line x1="3" y1="30" x2="33" y2="30" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/></svg>) },
  { name: 'Education & EdTech', color: '#00b85e', useCases: ['Essay scoring & feedback', 'Question generation NLP', 'Reading level classification', 'Student query understanding'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 6 L33 14 L18 22 L3 14 Z" stroke="#00b85e" strokeWidth="1.3" fill="none" opacity="0.8"/><path d="M9 18 L9 26 Q18 30 27 26 L27 18" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6"/></svg>) },
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

function NLPStatCard({ s, index, inView }: { s: typeof STATS[0]; index: number; inView: boolean }) {
  const dec = s.value % 1 !== 0 ? 1 : 0;
  const val = useCounter(s.value, dec, inView, index * 120);
  return (
    <motion.div className="nlp-stat-card" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
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
  { value: 9,   suffix: '',  label: 'Industries Served',         color: '#00e87a' },
  { value: 97,  suffix: '%', label: 'Avg. Entity F1 Score',      color: '#c9a84c' },
  { value: 40,  suffix: '+', label: 'Languages Supported',       color: '#00b85e' },
  { value: 3.2, suffix: 'x', label: 'Faster Text Processing',    color: '#00e87a' },
];

function IndustryCard({ ind, index, inView }: { ind: typeof INDUSTRIES[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="nlp-industry-card" initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      onClick={() => setOpen(o => !o)}
      style={{ borderRadius: '14px', overflow: 'hidden', background: open ? `${ind.color}08` : 'var(--bg-surface)', border: `1px solid ${open ? ind.color + '44' : ind.color + '1a'}`, boxShadow: '0 4px 16px rgba(0,0,0,0.16)' }}>
      <div style={{ height: '2px', background: `linear-gradient(90deg,${ind.color},transparent)`, opacity: open ? 0.7 : 0.35 }} />
      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: open ? '14px' : 0 }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0, background: `${ind.color}10`, border: `1px solid ${ind.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ind.svg}</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{ind.name}</h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ind.color, opacity: 0.65, letterSpacing: '0.08em' }}>{ind.useCases.length} NLP applications</span>
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

export function NLPIndustries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} className="nlp-sec-header" style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>NLP BY VERTICAL</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '720px' }}>
            Specialized NLP Solutions<br /><span style={{ color: 'var(--accent-primary)' }}>for Various Industries.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', marginTop: '14px', maxWidth: '500px', lineHeight: 1.75 }}>Click any industry to see the NLP applications we deploy.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '48px' }} className="nlp-stats-strip">
          {STATS.map((s, i) => <NLPStatCard key={i} s={s} index={i} inView={inView} />)}
        </div>
        <div className="nlp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {INDUSTRIES.map((ind, i) => <IndustryCard key={ind.name} ind={ind} index={i} inView={inView} />)}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .nlp-stats-strip{ grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}