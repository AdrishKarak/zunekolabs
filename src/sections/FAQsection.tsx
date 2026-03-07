import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    q: 'What industries do you serve?',
    a: 'We work across manufacturing, retail, finance, logistics, healthcare, and professional services. If your business runs at scale and has complex operations, we can build AI systems that make a measurable difference.',
  },
  {
    q: 'What is your typical project timeline?',
    a: 'Most projects run 8–16 weeks from scoping to deployment. Smaller automation pilots can go live in 3–4 weeks. We set realistic timelines during discovery and stick to them.',
  },
  {
    q: 'Do you offer internships with salary?',
    a: 'Yes. Zuneko Labs actively hires interns with competitive stipends up to 5 LPA. We work with engineering students from Pune, Kolkata, and across India. Check our Careers page for open roles.',
  },
  {
    q: 'What LLM technologies do you work with?',
    a: 'We work with OpenAI (GPT-4o, o1), Anthropic (Claude 3.5), Google Gemini, Mistral, and open-source models via Hugging Face and Ollama. We also build custom fine-tuned models and RAG pipelines tailored to your data.',
  },
  {
    q: 'Can you customize Frappe/ERPNext for our needs?',
    a: 'Absolutely. Frappe/ERPNext customization is one of our core competencies. From custom doctypes and workflows to full multi-subsidiary configurations and third-party integrations—we handle the full lifecycle.',
  },
  {
    q: 'Do you provide post-deployment support?',
    a: 'Yes. All projects include a post-go-live hypercare period of 4–8 weeks, plus optional ongoing managed services with SLA-backed response times.',
  },
  {
    q: 'What makes Zuneko Labs different from typical IT firms?',
    a: "We don't sell software licenses or pre-built tools. We engineer bespoke AI systems specifically matched to your business model, data, and operational reality. We're builders, not resellers.",
  },
  {
    q: 'Where are your offices located?',
    a: 'We operate from Pune (Maharashtra) and Kolkata (West Bengal), serving enterprise clients across India. Remote collaboration is fully supported for clients nationwide.',
  },
];

function FAQItem({ item, index }: { item: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE_SMOOTH }}
      style={{ borderBottom: '1px solid var(--border-subtle)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          gap: '16px',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          fontSize: '16px',
          color: open ? 'var(--accent-primary)' : 'var(--text-primary)',
          transition: 'color 0.25s',
          lineHeight: 1.4,
        }}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ flexShrink: 0 }}
        >
          <Plus size={18} style={{ color: 'var(--accent-primary)' }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_SMOOTH }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              paddingBottom: '20px',
            }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQsection() {
  return (
    <section id="faq" style={{ background: 'var(--bg-deep)', padding: '120px 0' }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: '35% 1fr',
        gap: '64px',
        alignItems: 'flex-start',
      }} className="faq-grid">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          style={{ position: 'sticky', top: '100px' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }}>
            FAQ
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 44px)', color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '16px' }}>
            Questions? We have answers.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '28px' }}>
            Can't find what you're looking for? Reach out directly.
          </p>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--accent-primary)',
              border: '1.5px solid var(--accent-primary)',
              padding: '10px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'var(--accent-primary)';
              el.style.color = 'var(--bg-void)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'transparent';
              el.style.color = 'var(--accent-primary)';
            }}
          >
            Contact Us
          </a>
        </motion.div>

        {/* Right - accordion */}
        <div>
          {FAQS.map((item, i) => (
            <FAQItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .faq-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}