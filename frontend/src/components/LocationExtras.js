import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Building2, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ACCENT = {
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'hover:border-cyan-500/30' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'hover:border-amber-500/30' },
};

export const LocationProjects = ({ data, accent = 'cyan' }) => {
  const { isDark } = useTheme();
  const a = ACCENT[accent] || ACCENT.cyan;
  if (!data || !data.projects || !data.projects.length) return null;
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';
  return (
    <section className={`py-16 lg:py-20 ${isDark ? 'bg-white/[0.02]' : 'bg-neutral-100'}`} data-testid="location-projects-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
          <span className={`${a.text} text-xs font-bold tracking-[0.3em] uppercase mb-3 block`}>Delivered Work</span>
          <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>{data.label} Project Highlights</h2>
        </motion.div>
        <div className={`grid sm:grid-cols-2 ${data.projects.length > 2 ? 'lg:grid-cols-4' : 'lg:grid-cols-2'} gap-5`}>
          {data.projects.map((p, i) => (
            <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * 0.1 }} className={`${cardBg} border ${borderColor} rounded-2xl p-6 ${a.border} transition-colors`} data-testid={`location-project-${i}`}>
              <div className={`w-12 h-12 rounded-xl ${a.bg} flex items-center justify-center mb-4`}>
                <Building2 size={22} className={a.text} />
              </div>
              <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{p.title}</h3>
              <p className={`text-xs ${a.text} font-semibold mb-2`}>{p.venue}</p>
              <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{p.detail}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/projects" className={`inline-flex items-center gap-2 text-sm font-semibold ${a.text} hover:underline`} data-testid="location-projects-all-link">
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export const LocationAreas = ({ data, accent = 'cyan' }) => {
  const { isDark } = useTheme();
  const a = ACCENT[accent] || ACCENT.cyan;
  if (!data || !data.areas || !data.areas.length) return null;
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';
  return (
    <section className="py-16 lg:py-20" data-testid="location-areas-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
          <span className={`${a.text} text-xs font-bold tracking-[0.3em] uppercase mb-3 block`}>Coverage</span>
          <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>{data.label} Areas We Serve</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.areas.map((area, i) => (
            <motion.div key={area.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * 0.05 }} className={`${cardBg} border ${borderColor} rounded-xl p-5 ${a.border} transition-colors`} data-testid={`location-area-${i}`}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={15} className={a.text} />
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{area.name}</h3>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{area.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LocationRegulations = ({ data, accent = 'cyan' }) => {
  const { isDark } = useTheme();
  const a = ACCENT[accent] || ACCENT.cyan;
  if (!data || !data.regulations || !data.regulations.length) return null;
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';
  return (
    <section className={`py-16 lg:py-20 ${isDark ? 'bg-white/[0.02]' : 'bg-neutral-100'}`} data-testid="location-regulations-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
          <span className={`${a.text} text-xs font-bold tracking-[0.3em] uppercase mb-3 block`}>Compliance</span>
          <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>Signage Regulations &amp; Power — {data.label}</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.regulations.map((reg, i) => (
            <motion.div key={reg.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * 0.08 }} className={`${cardBg} border ${borderColor} rounded-2xl p-6`} data-testid={`location-regulation-${i}`}>
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className={`${a.text} mt-0.5 flex-shrink-0`} />
                <div>
                  <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{reg.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{reg.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LocationFAQ = ({ data, accent = 'cyan' }) => {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(0);
  const a = ACCENT[accent] || ACCENT.cyan;
  if (!data || !data.faqs || !data.faqs.length) return null;
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <section className="py-16 lg:py-20" data-testid="location-faq-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-10">
          <span className={`${a.text} text-xs font-bold tracking-[0.3em] uppercase mb-3 block`}>FAQ</span>
          <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>LED Display FAQs — {data.label}</h2>
        </motion.div>
        <div className="space-y-3">
          {data.faqs.map((f, i) => (
            <div key={i} className={`${cardBg} border ${borderColor} rounded-xl overflow-hidden`}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                data-testid={`location-faq-question-${i}`}
              >
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{f.q}</span>
                <ChevronDown size={18} className={`${a.text} flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <p className={`px-5 pb-5 text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} data-testid={`location-faq-answer-${i}`}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
