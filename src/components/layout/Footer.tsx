import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, MapPin, Mail, ArrowRight } from 'lucide-react';
import ZunekoLogo from '../../assets/Zuneko.svg';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const FOOTER_LINKS = {
  Services: ['AI Automation', 'Computer Vision', 'LLM Applications', 'Frappe ERPNext', 'Custom Software', 'Digital Strategy'],
  Company: ['About Us', 'Our Work', 'Careers', 'Blog', 'Press'],
  Resources: ['Case Studies', 'Documentation', 'API Reference', 'Community', 'Support'],
};

const OFFICES = [
  {
    name: 'Pune Office',
    address: 'Emdee Digitronics, Baner Road, Pune – 411045, Maharashtra',
    mapSrc: 'https://maps.google.com/?q=Baner,Pune,Maharashtra,India&output=embed',
  },
  {
    name: 'Kolkata Office',
    address: 'Emdee Digitronics, Salt Lake Sector V, Kolkata – 700091, West Bengal',
    mapSrc: 'https://maps.google.com/?q=Salt+Lake+Sector+V,Kolkata,West+Bengal,India&output=embed',
  },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-void)', paddingTop: '80px' }}>

      {/* CTA Band */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 32px', marginBottom: '80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH }}
          style={{
            background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-raised))',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '60px 48px',
            textAlign: 'center',
          }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}>
            Ready to Transform Your Enterprise?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '36px' }}>
            Let's build something extraordinary together.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <motion.a
              href="#contact"
              whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,232,122,0.3)' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                background: 'var(--accent-primary)',
                color: 'var(--bg-void)',
                borderRadius: '6px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
            >
              Start a Project <ArrowRight size={16} />
            </motion.a>
            <a
              href="mailto:sales@zuneko.ai"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              sales@zuneko.ai
            </a>
          </div>
        </motion.div>
      </div>

      {/* Main footer body */}
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 32px 64px' }}>
        {/* Top row: logo + links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          paddingBottom: '48px',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '48px',
        }} className="footer-grid">
          {/* Logo + about */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,232,122,0.2)' }}>
                <img src={ZunekoLogo} alt="ZunekoLabs" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1 }}>ZUNEKO</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--accent-primary)' }}>LABS</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '20px', maxWidth: '280px' }}>
              Enterprise AI automation, computer vision, and digital transformation. A vertical of Emdee Digitronics.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Mail size={13} style={{ color: 'var(--text-tertiary)' }} />
              <a href="mailto:info@zuneko.ai" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)', textDecoration: 'none' }}>info@zuneko.ai</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} style={{ color: 'var(--text-tertiary)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>Pune & Kolkata, India</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.15em', marginBottom: '20px', textTransform: 'uppercase' }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Office cards */}
        <div style={{ marginBottom: '48px' }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px' }}>
            OUR OFFICES
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="offices-grid">
            {OFFICES.map(office => (
              <div
                key={office.name}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ height: '140px', background: 'var(--bg-raised)', position: 'relative', overflow: 'hidden' }}>
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(office.address)}&output=embed&zoom=14`}
                    width="100%"
                    height="140"
                    style={{ border: 'none', opacity: 0.7, pointerEvents: 'none' }}
                    title={office.name}
                    loading="lazy"
                  />
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: 'var(--accent-primary)', marginBottom: '6px' }}>
                    {office.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {office.address}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-subtle)',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
            © 2026 ZunekoLabs. All rights reserved. A vertical of Emdee Digitronics.
          </span>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {[
              { Icon: Linkedin, label: 'LinkedIn' },
              { Icon: Twitter, label: 'X / Twitter' },
              { Icon: Instagram, label: 'Instagram' },
            ].map(({ Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                whileHover={{ scale: 1.1, color: 'var(--accent-primary)' }}
                style={{ color: 'var(--text-tertiary)', display: 'flex', transition: 'color 0.25s' }}
                aria-label={label}
                transition={{ duration: 0.2 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > div:first-child { grid-column: span 2; }
          .offices-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-grid > div:first-child { grid-column: span 1; }
        }
      `}</style>
    </footer>
  );
}