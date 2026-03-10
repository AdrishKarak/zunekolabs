import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const GLOBAL_STYLES = `
  .rag-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .rag-card:hover { transform: translateY(-5px); box-shadow: 0 18px 44px rgba(0,0,0,0.38) !important; }
  .rag-stat-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .rag-stat-card:hover { transform: translateY(-6px) scale(1.02); }
  .rag-industry-card { transition: border-color 0.25s, background 0.25s, transform 0.25s; cursor: pointer; }
  .rag-industry-card:hover { transform: translateY(-4px); }
  .rag-arch-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
  .rag-arch-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.4) !important; }
  @media(max-width:900px){ .rag-grid-3{ grid-template-columns: 1fr 1fr !important; } }
  @media(max-width:600px){ .rag-grid-3{ grid-template-columns: 1fr !important; } }
  @media(max-width:768px){ .rag-tl-line{ display:none; } .rag-step-wrap{ justify-content:center !important; } .rag-step-card{ width:90% !important; } }
`;

/* ═══════════════════════════════════════════════
   SECTION 1 — Boost Business with RAG
═══════════════════════════════════════════════ */
const GROWTH_SERVICES = [
  { id: '01', color: '#00e87a', title: 'Enterprise Knowledge Search', body: 'Replace keyword search with semantic RAG pipelines that retrieve the most relevant passages from millions of internal documents instantly.', metric: '10x', metricLabel: 'faster knowledge retrieval',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><circle cx="22" cy="22" r="14" stroke="#00e87a" strokeWidth="1.4" opacity="0.6"/><line x1="32" y1="32" x2="46" y2="46" stroke="#00e87a" strokeWidth="2.2" strokeLinecap="round"/><line x1="16" y1="22" x2="28" y2="22" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="22" y1="16" x2="22" y2="28" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><circle cx="22" cy="22" r="7" stroke="#00e87a" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3"/></svg>),
  },
  { id: '02', color: '#c9a84c', title: 'Grounded Q&A Systems', body: 'LLM-powered Q&A that cites sources, quotes passages, and refuses to answer when context is absent — zero hallucinations in production.', metric: '98%', metricLabel: 'answer grounding accuracy',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="6" y="10" width="34" height="28" rx="3" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><line x1="12" y1="18" x2="34" y2="18" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/><line x1="12" y1="23" x2="34" y2="23" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/><line x1="12" y1="28" x2="26" y2="28" stroke="#c9a84c" strokeWidth="1" opacity="0.35"/><path d="M6 34 L12 40 L6 40 Z" fill="#c9a84c" opacity="0.4"/><rect x="34" y="22" width="16" height="14" rx="3" stroke="#c9a84c" strokeWidth="1.3" opacity="0.9"/><path d="M37 27 L43 27 M37 31 L40 31" stroke="#c9a84c" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"/><polyline points="46,36 42,40 48,40" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/></svg>),
  },
  { id: '03', color: '#00b85e', title: 'Document Intelligence Pipelines', body: 'Ingest PDFs, contracts, emails, and slides. Chunk, embed, and index them automatically so your LLMs always have the right context.', metric: '500+', metricLabel: 'doc formats supported',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="6" y="8" width="20" height="26" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.55"/><rect x="14" y="14" width="20" height="26" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.7"/><rect x="22" y="20" width="20" height="26" rx="2" stroke="#00b85e" strokeWidth="1.4" opacity="0.9"/><line x1="28" y1="26" x2="36" y2="26" stroke="#00b85e" strokeWidth="1" opacity="0.6"/><line x1="28" y1="30" x2="36" y2="30" stroke="#00b85e" strokeWidth="1" opacity="0.5"/><line x1="28" y1="34" x2="33" y2="34" stroke="#00b85e" strokeWidth="1" opacity="0.4"/><path d="M38 20 L42 20 L46 24 L46 40 L38 40 Z" stroke="#00b85e" strokeWidth="1" fill="none" opacity="0.4"/></svg>),
  },
  { id: '04', color: '#00e87a', title: 'Conversational AI with Memory', body: 'Build multi-turn chatbots that retrieve from your data on every turn — session memory, user context, and domain knowledge unified.', metric: '40%', metricLabel: 'higher CSAT vs base LLM',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><rect x="4" y="10" width="32" height="22" rx="4" stroke="#00e87a" strokeWidth="1.4" opacity="0.7"/><circle cx="12" cy="21" r="2.5" fill="#00e87a" opacity="0.5"/><circle cx="20" cy="21" r="2.5" fill="#00e87a" opacity="0.8"/><circle cx="28" cy="21" r="2.5" fill="#00e87a" opacity="0.5"/><path d="M4 28 L10 34 L4 34 Z" fill="#00e87a" opacity="0.4"/><rect x="24" y="26" width="28" height="18" rx="4" stroke="#00e87a" strokeWidth="1.3" opacity="0.8"/><line x1="28" y1="32" x2="46" y2="32" stroke="#00e87a" strokeWidth="1" opacity="0.5"/><line x1="28" y1="37" x2="40" y2="37" stroke="#00e87a" strokeWidth="1" opacity="0.4"/><path d="M52 40 L46 44 L52 44 Z" fill="#00e87a" opacity="0.4"/></svg>),
  },
  { id: '05', color: '#c9a84c', title: 'Compliance & Audit RAG', body: 'Deploy RAG over regulatory handbooks, SOPs, and audit trails. Every generated answer is traceable to a source — audit-ready by design.', metric: '100%', metricLabel: 'source-cited outputs',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><path d="M28 6 L46 13 L46 28 C46 38 38 44 28 46 C18 44 10 38 10 28 L10 13 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.6"/><path d="M20 27 L26 33 L38 21" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/><line x1="18" y1="18" x2="38" y2="18" stroke="#c9a84c" strokeWidth="0.8" opacity="0.3"/></svg>),
  },
  { id: '06', color: '#00b85e', title: 'Real-Time Data RAG', body: 'Connect RAG pipelines to live databases, APIs, and feeds. Your LLM answers questions about data that changes by the minute.', metric: '< 200ms', metricLabel: 'end-to-end latency',
    svg: (<svg viewBox="0 0 56 56" fill="none" style={{width:44,height:44}}><ellipse cx="18" cy="16" rx="12" ry="5" stroke="#00b85e" strokeWidth="1.3"/><line x1="6" y1="16" x2="6" y2="30" stroke="#00b85e" strokeWidth="1.3"/><line x1="30" y1="16" x2="30" y2="30" stroke="#00b85e" strokeWidth="1.3"/><ellipse cx="18" cy="30" rx="12" ry="5" stroke="#00b85e" strokeWidth="1.3"/><path d="M30 23 L38 23" stroke="#00b85e" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6"/><circle cx="44" cy="23" r="6" stroke="#00b85e" strokeWidth="1.3"/><path d="M42 23 L46 23 M44 21 L44 25" stroke="#00b85e" strokeWidth="1.3" strokeLinecap="round"/><circle cx="44" cy="23" r="2" fill="#00b85e" opacity="0.5"/></svg>),
  },
];

function GrowthCard({ s, index, inView }: { s: typeof GROWTH_SERVICES[0]; index: number; inView: boolean }) {
  return (
    <motion.div className="rag-card" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
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

export function RAGGrowth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <style>{GLOBAL_STYLES}</style>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>WHAT WE UNLOCK</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '700px' }}>
            Boost Your Business Growth<br /><span style={{ color: 'var(--accent-primary)' }}>with Retrieval Augmented Generation.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '14px', maxWidth: '520px' }}>Six enterprise RAG capabilities we deploy — so your LLMs always answer from truth, not guesswork.</p>
        </motion.div>
        <div className="rag-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {GROWTH_SERVICES.map((s, i) => <GrowthCard key={s.id} s={s} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 — RAG Stack & Architectures
═══════════════════════════════════════════════ */
const ARCHITECTURES = [
  { name: 'Naive RAG', abbr: 'NRAG', color: '#00e87a', models: ['LangChain', 'LlamaIndex', 'OpenAI', 'FAISS'], desc: 'Standard retrieve-then-read pipeline: chunk documents, embed them, retrieve top-k, pass to LLM. Best for straightforward Q&A use cases.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="8" width="12" height="10" rx="2" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><path d="M16 13 L24 13" stroke="#00e87a" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6"/><rect x="24" y="8" width="12" height="10" rx="2" stroke="#00e87a" strokeWidth="1.4" opacity="0.9"/><path d="M36 13 L44 13" stroke="#00e87a" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6"/><rect x="36" y="8" width="12" height="10" rx="2" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><rect x="20" y="30" width="16" height="12" rx="2" stroke="#00e87a" strokeWidth="1.3"/><path d="M28 23 L28 30" stroke="#00e87a" strokeWidth="1.2" opacity="0.5"/><text x="28" y="38" textAnchor="middle" fill="#00e87a" fontSize="5" fontFamily="monospace">LLM</text></svg>) },
  { name: 'Advanced RAG', abbr: 'ARAG', color: '#c9a84c', models: ['HyDE', 'Re-ranking', 'Query Expansion', 'Cohere'], desc: 'Query rewriting, hypothetical document embedding, cross-encoder re-ranking, and contextual compression — for high-precision results.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="6" width="10" height="8" rx="2" stroke="#c9a84c" strokeWidth="1.2" opacity="0.6"/><path d="M14 10 L20 10" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/><rect x="20" y="6" width="10" height="8" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.8"/><path d="M30 10 L36 7 L36 13" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.5"/><rect x="36" y="4" width="12" height="8" rx="2" stroke="#c9a84c" strokeWidth="1.2" opacity="0.7"/><path d="M42 12 L42 20" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/><rect x="20" y="22" width="14" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3"/><path d="M27 32 L27 40" stroke="#c9a84c" strokeWidth="1.1" opacity="0.5"/><rect x="18" y="40" width="18" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.4" opacity="0.9"/><text x="27" y="47" textAnchor="middle" fill="#c9a84c" fontSize="5" fontFamily="monospace">LLM</text></svg>) },
  { name: 'Modular RAG', abbr: 'MRAG', color: '#00b85e', models: ['LlamaIndex', 'Haystack', 'DSPy', 'Weaviate'], desc: 'Swappable retriever, reranker, reader, and memory modules. Each component is independently optimised and replaced without rebuilding.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><rect x="4" y="4" width="10" height="10" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.7"/><rect x="20" y="4" width="10" height="10" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.7"/><rect x="36" y="4" width="10" height="10" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.7"/><rect x="4" y="22" width="10" height="10" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.6"/><rect x="20" y="22" width="10" height="10" rx="2" stroke="#00b85e" strokeWidth="1.6" opacity="0.95"/><rect x="36" y="22" width="10" height="10" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.6"/><rect x="12" y="40" width="26" height="10" rx="2" stroke="#00b85e" strokeWidth="1.3"/><line x1="9" y1="14" x2="25" y2="22" stroke="#00b85e" strokeWidth="0.8" opacity="0.3"/><line x1="25" y1="14" x2="25" y2="22" stroke="#00b85e" strokeWidth="0.8" opacity="0.3"/><line x1="41" y1="14" x2="25" y2="22" stroke="#00b85e" strokeWidth="0.8" opacity="0.3"/></svg>) },
  { name: 'Graph RAG', abbr: 'GRAG', color: '#00e87a', models: ['Neo4j', 'LlamaIndex', 'Microsoft GraphRAG', 'NetworkX'], desc: 'Knowledge graph-powered retrieval — traverse entity relationships to surface multi-hop answers no vector search can find.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><circle cx="26" cy="10" r="5" stroke="#00e87a" strokeWidth="1.3"/><circle cx="10" cy="36" r="5" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/><circle cx="42" cy="36" r="5" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/><circle cx="26" cy="30" r="4" stroke="#00e87a" strokeWidth="1.4" opacity="0.9"/><line x1="26" y1="15" x2="26" y2="26" stroke="#00e87a" strokeWidth="1.1" opacity="0.5"/><line x1="26" y1="34" x2="13" y2="33" stroke="#00e87a" strokeWidth="1.1" opacity="0.45"/><line x1="26" y1="34" x2="39" y2="33" stroke="#00e87a" strokeWidth="1.1" opacity="0.45"/><line x1="26" y1="15" x2="12" y2="32" stroke="#00e87a" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.25"/><line x1="26" y1="15" x2="40" y2="32" stroke="#00e87a" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.25"/></svg>) },
  { name: 'Agentic RAG', abbr: 'ARAG2', color: '#c9a84c', models: ['LangGraph', 'AutoGen', 'Tavily', 'OpenAI'], desc: 'RAG as a tool for autonomous agents — agents decide when and what to retrieve, chain retrievals, and self-correct when context is insufficient.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><circle cx="26" cy="12" r="6" stroke="#c9a84c" strokeWidth="1.3"/><text x="26" y="15" textAnchor="middle" fill="#c9a84c" fontSize="6" fontFamily="monospace">AI</text><path d="M26 18 L26 26" stroke="#c9a84c" strokeWidth="1.2" opacity="0.5"/><rect x="16" y="26" width="20" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.8"/><path d="M36 31 L44 25 M36 31 L44 37" stroke="#c9a84c" strokeWidth="1.1" strokeLinecap="round" opacity="0.5"/><rect x="44" y="20" width="6" height="8" rx="1" stroke="#c9a84c" strokeWidth="1" opacity="0.6"/><rect x="44" y="32" width="6" height="8" rx="1" stroke="#c9a84c" strokeWidth="1" opacity="0.6"/><path d="M20 36 L20 44 L32 44 L32 36" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.4"/></svg>) },
  { name: 'Hybrid Search RAG', abbr: 'HSRAG', color: '#00b85e', models: ['Qdrant', 'Pinecone', 'Elasticsearch', 'BM25'], desc: 'Combine dense vector similarity and sparse keyword search (BM25) with reciprocal rank fusion — best of both retrieval paradigms.', svg: (<svg viewBox="0 0 52 52" fill="none" style={{width:38,height:38}}><circle cx="16" cy="20" r="10" stroke="#00b85e" strokeWidth="1.3" opacity="0.6"/><circle cx="36" cy="20" r="10" stroke="#00b85e" strokeWidth="1.3" opacity="0.6"/><path d="M22 14 Q26 20 22 26" stroke="#00b85e" strokeWidth="1.5" fill="none" opacity="0.85"/><path d="M30 14 Q26 20 30 26" stroke="#00b85e" strokeWidth="1.5" fill="none" opacity="0.85"/><line x1="10" y1="36" x2="42" y2="36" stroke="#00b85e" strokeWidth="1.2" opacity="0.3"/><rect x="18" y="38" width="16" height="8" rx="2" stroke="#00b85e" strokeWidth="1.3" opacity="0.8"/><text x="26" y="44" textAnchor="middle" fill="#00b85e" fontSize="4.5" fontFamily="monospace">FUSED</text></svg>) },
];

export function RAGArchitectures() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>UNDER THE HOOD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            RAG Architectures and<br /><span style={{ color: 'var(--accent-primary)' }}>Retrieval Stacks We Build With.</span>
          </h2>
        </motion.div>
        <div className="rag-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {ARCHITECTURES.map((a, i) => (
            <motion.div key={a.abbr} className="rag-arch-card" initial={{ opacity: 0, y: 38 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
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
   SECTION 3 — RAG Development Roadmap
═══════════════════════════════════════════════ */
const ROADMAP_STEPS = [
  { phase: 'DISCOVER', duration: '1 wk', color: '#00e87a', title: 'Data Audit & Use Case Definition', body: 'We inventory your document sources, assess data quality, and define the retrieval use cases — ranking by ROI and technical feasibility.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><circle cx="20" cy="20" r="13" stroke="#00e87a" strokeWidth="1.4" opacity="0.7"/><line x1="29" y1="29" x2="40" y2="40" stroke="#00e87a" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="20" x2="24" y2="20" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/><line x1="20" y1="16" x2="20" y2="24" stroke="#00e87a" strokeWidth="1.3" opacity="0.6"/></svg>) },
  { phase: 'INGEST', duration: '1–2 wks', color: '#c9a84c', title: 'Document Ingestion & Chunking', body: 'Build automated ingestion pipelines for all your file types. Design chunking strategies — fixed, semantic, and hierarchical — tuned to your content.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><rect x="4" y="6" width="14" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><rect x="4" y="20" width="14" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><rect x="4" y="34" width="14" height="10" rx="2" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><path d="M18 11 L28 20" stroke="#c9a84c" strokeWidth="1.1" opacity="0.4"/><path d="M18 25 L28 25" stroke="#c9a84c" strokeWidth="1.1" opacity="0.5"/><path d="M18 39 L28 30" stroke="#c9a84c" strokeWidth="1.1" opacity="0.4"/><rect x="28" y="18" width="16" height="16" rx="2" stroke="#c9a84c" strokeWidth="1.4" opacity="0.9"/><text x="36" y="28" textAnchor="middle" fill="#c9a84c" fontSize="5.5" fontFamily="monospace">EMB</text></svg>) },
  { phase: 'INDEX', duration: '1 wk', color: '#00b85e', title: 'Vector Store Setup & Embedding', body: 'Embed chunks with best-fit models (OpenAI, Cohere, BGE). Configure hybrid indices in Pinecone, Qdrant, or Weaviate with metadata filtering.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><ellipse cx="24" cy="14" rx="16" ry="5" stroke="#00b85e" strokeWidth="1.3"/><line x1="8" y1="14" x2="8" y2="28" stroke="#00b85e" strokeWidth="1.3"/><line x1="40" y1="14" x2="40" y2="28" stroke="#00b85e" strokeWidth="1.3"/><ellipse cx="24" cy="28" rx="16" ry="5" stroke="#00b85e" strokeWidth="1.3"/><line x1="8" y1="28" x2="8" y2="38" stroke="#00b85e" strokeWidth="1.3" opacity="0.5"/><line x1="40" y1="28" x2="40" y2="38" stroke="#00b85e" strokeWidth="1.3" opacity="0.5"/><ellipse cx="24" cy="38" rx="16" ry="5" stroke="#00b85e" strokeWidth="1.3" opacity="0.5"/></svg>) },
  { phase: 'BUILD', duration: '2–3 wks', color: '#00e87a', title: 'Retrieval Pipeline & LLM Integration', body: 'Wire retrievers to your chosen LLM. Implement query rewriting, re-ranking, context compression, and citation injection. Evaluate with RAGAS.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><rect x="4" y="16" width="14" height="16" rx="2" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/><rect x="30" y="16" width="14" height="16" rx="2" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/><path d="M18 24 L30 24" stroke="#00e87a" strokeWidth="1.4" strokeDasharray="3 2"/><path d="M26 21 L30 24 L26 27" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/><text x="11" y="26" textAnchor="middle" fill="#00e87a" fontSize="4.5" fontFamily="monospace">VDB</text><text x="37" y="26" textAnchor="middle" fill="#00e87a" fontSize="4.5" fontFamily="monospace">LLM</text></svg>) },
  { phase: 'EVOLVE', duration: 'Ongoing', color: '#c9a84c', title: 'Evaluation, Monitoring & Optimisation', body: 'Track faithfulness, answer relevancy, and context recall with RAGAS. Detect retrieval drift and trigger re-indexing when corpus or embeddings degrade.', svg: (<svg viewBox="0 0 48 48" fill="none" style={{width:38,height:38}}><circle cx="24" cy="24" r="18" stroke="#c9a84c" strokeWidth="1.2" opacity="0.25"/><path d="M24 6 A18 18 0 0 1 42 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round"/><path d="M42 24 A18 18 0 0 1 24 42" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/><path d="M24 42 A18 18 0 0 1 6 24" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.3"/><path d="M6 24 A18 18 0 0 1 24 6" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.15"/><circle cx="24" cy="24" r="5" stroke="#c9a84c" strokeWidth="1.3"/><circle cx="24" cy="24" r="2" fill="#c9a84c" opacity="0.8"/></svg>) },
];

export function RAGRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section style={{ background: 'var(--bg-void)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>HOW WE BUILD</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0 }}>
            Our Proven RAG System<br /><span style={{ color: 'var(--accent-primary)' }}>Development Roadmap.</span>
          </h2>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative' }}>
          <div className="rag-tl-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,232,122,0.07)', transform: 'translateX(-50%)' }} />
          {ROADMAP_STEPS.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={s.phase} initial={{ opacity: 0, x: isLeft ? -48 : 48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, ease: EASE }}
                className="rag-step-wrap" style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '11px', height: '11px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}88`, zIndex: 4 }} />
                <div className="rag-step-card" style={{ width: '44%', borderRadius: '14px', background: 'var(--bg-surface)', border: `1px solid ${s.color}1e`, padding: '22px', boxShadow: '0 4px 18px rgba(0,0,0,0.18)', transition: 'transform 0.25s, box-shadow 0.25s' }}>
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
   SECTION 4 — RAG for Industries
═══════════════════════════════════════════════ */
const INDUSTRIES = [
  { name: 'Legal & Compliance', color: '#00e87a', useCases: ['Contract clause retrieval', 'Case law Q&A systems', 'Regulatory document search', 'Policy compliance checking'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 4 L22 14 L33 14 L24 21 L27 32 L18 26 L9 32 L12 21 L3 14 L14 14 Z" stroke="#00e87a" strokeWidth="1.3" fill="none" opacity="0.8"/></svg>) },
  { name: 'Healthcare', color: '#c9a84c', useCases: ['Clinical guideline retrieval', 'Drug interaction lookup', 'Patient record Q&A', 'Medical literature search'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="3" width="30" height="30" rx="5" stroke="#c9a84c" strokeWidth="1.3" opacity="0.6"/><line x1="18" y1="9" x2="18" y2="27" stroke="#c9a84c" strokeWidth="2.2" strokeLinecap="round"/><line x1="9" y1="18" x2="27" y2="18" stroke="#c9a84c" strokeWidth="2.2" strokeLinecap="round"/></svg>) },
  { name: 'Financial Services', color: '#00b85e', useCases: ['Earnings call Q&A', 'Risk document search', 'Prospectus analysis bots', 'Audit trail retrieval'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="3" y="8" width="30" height="22" rx="3" stroke="#00b85e" strokeWidth="1.3" opacity="0.6"/><line x1="3" y1="14" x2="33" y2="14" stroke="#00b85e" strokeWidth="0.8" opacity="0.3"/><circle cx="10" cy="22" r="3" stroke="#00b85e" strokeWidth="1.1" opacity="0.6"/><line x1="16" y1="21" x2="28" y2="21" stroke="#00b85e" strokeWidth="1" opacity="0.4"/></svg>) },
  { name: 'Enterprise IT', color: '#00e87a', useCases: ['Internal wiki search', 'IT runbook Q&A', 'Incident log retrieval', 'Code documentation search'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><rect x="2" y="6" width="32" height="20" rx="3" stroke="#00e87a" strokeWidth="1.3" opacity="0.7"/><line x1="2" y1="30" x2="34" y2="30" stroke="#00e87a" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/><line x1="12" y1="26" x2="12" y2="30" stroke="#00e87a" strokeWidth="1.2" opacity="0.4"/><line x1="24" y1="26" x2="24" y2="30" stroke="#00e87a" strokeWidth="1.2" opacity="0.4"/><text x="18" y="19" textAnchor="middle" fill="#00e87a" fontSize="6" fontFamily="monospace" opacity="0.6">{'</>'}</text></svg>) },
  { name: 'Education & Research', color: '#c9a84c', useCases: ['Research paper Q&A', 'Curriculum document search', 'Student knowledge bases', 'Academic citation retrieval'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 6 L33 14 L18 22 L3 14 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.8"/><path d="M9 18 L9 26 Q18 30 27 26 L27 18" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6"/></svg>) },
  { name: 'Manufacturing', color: '#00b85e', useCases: ['SOP retrieval systems', 'Parts manual Q&A', 'Safety document search', 'Maintenance log lookup'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><circle cx="18" cy="18" r="8" stroke="#00b85e" strokeWidth="1.3" opacity="0.7"/><circle cx="18" cy="18" r="3" fill="#00b85e" opacity="0.8"/>{[0,60,120,180,240,300].map((a,i)=>{const r=(a*Math.PI)/180;return <line key={i} x1={18+8*Math.cos(r)} y1={18+8*Math.sin(r)} x2={18+12*Math.cos(r)} y2={18+12*Math.sin(r)} stroke="#00b85e" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>;})}</svg>) },
  { name: 'Retail & E-Commerce', color: '#00e87a', useCases: ['Product spec Q&A bots', 'Return policy retrieval', 'Catalogue semantic search', 'Supplier doc lookup'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M4 8 L8 8 L12 22 L26 22 L30 12 L10 12" stroke="#00e87a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/><circle cx="14" cy="27" r="2.5" stroke="#00e87a" strokeWidth="1.2" opacity="0.7"/><circle cx="24" cy="27" r="2.5" stroke="#00e87a" strokeWidth="1.2" opacity="0.7"/></svg>) },
  { name: 'Government & Public Sector', color: '#c9a84c', useCases: ['Policy document retrieval', 'Citizen services Q&A', 'Legislative record search', 'Grant eligibility lookup'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 4 L32 12 L32 14 L4 14 L4 12 Z" stroke="#c9a84c" strokeWidth="1.3" fill="none" opacity="0.8"/><rect x="6" y="14" width="4" height="16" stroke="#c9a84c" strokeWidth="1.1" opacity="0.6"/><rect x="14" y="14" width="4" height="16" stroke="#c9a84c" strokeWidth="1.1" opacity="0.6"/><rect x="22" y="14" width="4" height="16" stroke="#c9a84c" strokeWidth="1.1" opacity="0.6"/><line x1="3" y1="30" x2="33" y2="30" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/></svg>) },
  { name: 'Insurance', color: '#00b85e', useCases: ['Policy terms Q&A', 'Claims document retrieval', 'Underwriting guide search', 'Fraud case lookup'], svg: (<svg viewBox="0 0 36 36" fill="none" style={{width:28,height:28}}><path d="M18 4 L30 10 L30 22 C30 28 25 32 18 34 C11 32 6 28 6 22 L6 10 Z" stroke="#00b85e" strokeWidth="1.3" fill="none" opacity="0.7"/><path d="M13 18 L16 22 L23 15" stroke="#00b85e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/></svg>) },
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

function RAGStatCard({ s, index, inView }: { s: typeof STATS[0]; index: number; inView: boolean }) {
  const dec = s.value % 1 !== 0 ? 1 : 0;
  const val = useCounter(s.value, dec, inView, index * 120);
  return (
    <motion.div className="rag-stat-card" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
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
  { value: 9, suffix: '', label: 'Industries Served', color: '#00e87a' },
  { value: 98, suffix: '%', label: 'Answer Grounding Rate', color: '#c9a84c' },
  { value: 200, suffix: 'ms', label: 'Avg. Retrieval Latency', color: '#00b85e' },
  { value: 4.2, suffix: 'x', label: 'Search Accuracy vs Keyword', color: '#00e87a' },
];

function IndustryCard({ ind, index, inView }: { ind: typeof INDUSTRIES[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="rag-industry-card" initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      onClick={() => setOpen(o => !o)}
      style={{ borderRadius: '14px', overflow: 'hidden', background: open ? `${ind.color}08` : 'var(--bg-surface)', border: `1px solid ${open ? ind.color + '44' : ind.color + '1a'}`, boxShadow: '0 4px 16px rgba(0,0,0,0.16)' }}>
      <div style={{ height: '2px', background: `linear-gradient(90deg,${ind.color},transparent)`, opacity: open ? 0.7 : 0.35 }} />
      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: open ? '14px' : 0 }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0, background: `${ind.color}10`, border: `1px solid ${ind.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ind.svg}</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{ind.name}</h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ind.color, opacity: 0.65, letterSpacing: '0.08em' }}>{ind.useCases.length} RAG applications</span>
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

export function RAGIndustries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{ background: 'var(--bg-deep)', padding: '120px 32px', overflow: 'hidden' }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>RAG BY VERTICAL</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, margin: 0, maxWidth: '720px' }}>
            Specialized RAG Solutions<br /><span style={{ color: 'var(--accent-primary)' }}>for Various Industries.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', marginTop: '14px', maxWidth: '500px', lineHeight: 1.75 }}>Click any industry to see the RAG applications we deploy.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '48px' }} className="rag-stats-strip">
          {STATS.map((s, i) => <RAGStatCard key={i} s={s} index={i} inView={inView} />)}
        </div>
        <div className="rag-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {INDUSTRIES.map((ind, i) => <IndustryCard key={ind.name} ind={ind} index={i} inView={inView} />)}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .rag-stats-strip{ grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}