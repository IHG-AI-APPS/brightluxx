import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone, Calculator, DollarSign, ChevronRight, ChevronDown, ChevronUp, CheckCircle2, HelpCircle, FileText, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { TECHNOLOGIES } from '../data/technologies';
import QuickInquiry from '../components/QuickInquiry';

const useInView = (ref, threshold = 0.15) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
};

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-lg
    ${hover ? 'hover:bg-white/[0.06] hover:border-cyan-500/30' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

// Technology images mapping
const TECH_IMAGES = {
  'microled': 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/14266577a06785e2e61816956b557c54624568f67781c286825a4d5742fc1490.png',
  'cob-led': 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/a48724d68c8ed785b21369e75039e8455f3130ca26f98897d266b3f3102316f3.png',
  'mip-led': 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ba71e99ddcebaaca612753230d9b464fd2a69d845b463a99354a5b80eaa797f8.png',
  'fine-pitch-led': 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/803a560d8b43b496d0a7958dd588ab3f71a9d5a8a9e9bb74bfdff658be5d5f49.png',
  'all-in-one-dvled': 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/bf902d17f53638bbd7fe1983fa50d0eefa5a621c86c67173c00826f504ca209b.png',
  'transparent-led': 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/9099db6081f3b9341a4a55c41f029d40d53834f5394236befe989fad76cd361b.png',
  '3d-anamorphic-led': 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/b14b05e09ba2807606d82f72f193c586976ed21d4ff695b26ecfc96152e987c8.png',
  'creative-led': 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/4dd8e0cbcbb71aec02c3a1c31e8ec0a95ab296a33235f2fe7ecfcfb539adefe9.png',
  'media-facade': 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/b256719e5b706e30693a2aa20f783eee47fb3de97a7e5c455c310224a1bb8d01.png',
};

// Spec Table Component
function SpecTable({ specs, title }) {
  return (
    <GlassCard className="overflow-hidden" hover={false} data-testid="tech-spec-table">
      <div className="px-6 py-4 border-b border-white/5">
        <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase">
          {title || 'Technical Specifications'}
        </span>
      </div>
      <table className="w-full">
        <tbody>
          {specs.map(([label, value], i) => (
            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
              <td className="py-4 px-6 text-xs font-bold tracking-[0.12em] text-gray-500 uppercase w-[40%]">{label}</td>
              <td className="py-4 px-6 text-sm text-gray-300">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}

// Comparison Table Component
function ComparisonTable({ headers, rows, caption }) {
  return (
    <GlassCard className="overflow-hidden" hover={false}>
      {caption && (
        <div className="px-6 py-4 border-b border-white/5">
          <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase">{caption}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {headers.map((h, i) => (
                <th key={i} className={`py-4 px-4 text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase text-left ${i === 0 ? 'pl-6' : ''}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                {row.map((cell, j) => (
                  <td key={j} className={`py-3 px-4 text-xs ${j === 0 ? 'pl-6 font-medium text-gray-300' : 'text-gray-400'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

// FAQ Section Component
function FAQSection({ faqs, title }) {
  const [openItems, setOpenItems] = useState({});
  
  const toggle = (index) => {
    setOpenItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3">
        <span className="w-8 h-px bg-cyan-500" />
        {title || 'Frequently Asked Questions'}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openItems[i];
          return (
            <GlassCard key={i} className="overflow-hidden" hover={false}>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start justify-between p-5 text-left group"
              >
                <span className="text-sm font-bold tracking-wide pr-6 flex items-start gap-3 group-hover:text-cyan-400 transition-colors">
                  <HelpCircle size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="normal-case">{faq.q}</span>
                </span>
                <div className={`w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-cyan-500/20' : ''}`}>
                  {isOpen ? <ChevronUp size={18} className="text-cyan-400" /> : <ChevronDown size={18} className="text-gray-500" />}
                </div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 pl-14">
                      <p className="text-sm text-gray-400 leading-relaxed tracking-wide normal-case">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

export default function TechnologyPage() {
  const { techId } = useParams();
  const tech = TECHNOLOGIES.find(t => t.id === techId);

  if (!tech) return <Navigate to="/technology" replace />;

  const techImage = TECH_IMAGES[tech.id];
  const relatedTechs = tech.relatedTech.map(id => TECHNOLOGIES.find(t => t.id === id)).filter(Boolean);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tech.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${tech.title} — Specification Guide for UAE/GCC`,
    "description": tech.heroDesc,
    "author": { "@type": "Organization", "name": "Brightluxx" },
    "publisher": { "@type": "Organization", "name": "Brightluxx", "url": "https://brightluxx.com" },
    "datePublished": "2026-03-04",
    "about": { "@type": "Thing", "name": tech.title },
  };

  return (
    <div className="bg-[#050508]" data-testid={`tech-page-${tech.id}`}>
      <SEO
        title={`${tech.title} LED Technology | Specifications & Guide UAE`}
        description={`${tech.heroDesc} Expert guide from Dubai's trusted LED supplier. Technical specs, applications & benefits.`}
        path={`/technology/${tech.id}`}
        image={techImage}
        keywords={`${tech.title}, ${tech.shortTitle}, LED technology UAE, LED display Dubai, ${tech.id} display`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Technology', path: '/technology' },
          { name: tech.shortTitle, path: null }
        ]}
        faqs={tech.faqs?.map(f => ({ question: f.q, answer: f.a }))}
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[450px]" data-testid="tech-hero">
        <img src={techImage} alt={tech.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-12">
          <FadeInSection>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-500 tracking-wider mb-6">
              <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/technology" className="hover:text-cyan-400 transition-colors">Technology</Link>
              <ChevronRight size={12} />
              <span className="text-cyan-400">{tech.shortTitle}</span>
            </div>
            
            <span className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase block mb-3">{tech.heroTagline}</span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight mb-5">
              {tech.title}
            </h1>
            <p className="text-gray-400 text-base max-w-2xl leading-relaxed tracking-wide mb-8">
              {tech.heroDesc}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-6 py-3 text-xs transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                data-testid="tech-hero-quote-cta"
              >
                Get Quote <ArrowRight size={14} />
              </Link>
              <a 
                href={`https://wa.me/971559954274?text=${encodeURIComponent(`Hi, I'm interested in ${tech.title} for my project. Can you provide specifications and pricing?`)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-6 py-3 text-xs transition-all inline-flex items-center gap-2"
                data-testid="tech-hero-whatsapp-cta"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            {/* Main Column */}
            <div>
              {/* Specifier Quick Reference */}
              <FadeInSection>
                <GlassCard className="p-6 lg:p-8 mb-10 border-cyan-500/20" hover={false}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-cyan-400" />
                    </div>
                    <h2 className="text-base font-bold uppercase tracking-wide">{tech.shortTitle} — Specifier Quick Reference</h2>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {tech.specifierBox.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        </div>
                        <span className="text-sm text-gray-400 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-lg">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase block mb-2">Best For</span>
                    <p className="text-sm text-gray-300">{tech.specifierRec}</p>
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* Specs Table */}
              <FadeInSection delay={1}>
                <div className="mb-10">
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-cyan-500" />
                    Technical Specifications
                  </h2>
                  <SpecTable specs={tech.specs} />
                </div>
              </FadeInSection>

              {/* Comparison Table */}
              <FadeInSection delay={2}>
                <div className="mb-10">
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-cyan-500" />
                    Technology Comparison
                  </h2>
                  <ComparisonTable
                    caption={`${tech.shortTitle.toUpperCase()} COMPARISON`}
                    headers={tech.comparison.headers}
                    rows={tech.comparison.rows}
                  />
                </div>
              </FadeInSection>

              {/* Use Cases */}
              <FadeInSection delay={3}>
                <div className="mb-10">
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-cyan-500" />
                    Where to Specify {tech.shortTitle}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {tech.useCases.map((uc, i) => (
                      <GlassCard key={i} className="p-5" hover={false} data-testid={`tech-usecase-${i}`}>
                        <h3 className="text-sm font-bold tracking-wide mb-2 text-white">{uc.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{uc.desc}</p>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </FadeInSection>

              {/* FAQ */}
              <FadeInSection delay={4}>
                <div className="mb-10">
                  <FAQSection faqs={tech.faqs} title={`${tech.shortTitle} FAQ`} />
                </div>
              </FadeInSection>

              {/* Bottom CTA */}
              <FadeInSection delay={5}>
                <GlassCard className="p-10 text-center border-cyan-500/20" hover={false}>
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                    Specifying {tech.shortTitle}?
                  </span>
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-4">
                    Talk to Our
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-2">
                      Technical Team
                    </span>
                  </h2>
                  <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 tracking-wide">
                    Free specification support, budgetary pricing, and sample arrangements for {tech.shortTitle.toLowerCase()} projects.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link 
                      to="/contact" 
                      className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-6 py-3 text-xs transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                    >
                      Request Budget Estimate <ArrowRight size={14} />
                    </Link>
                    <a 
                      href="https://wa.me/971559954274" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white/5 border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-6 py-3 text-xs transition-all inline-flex items-center gap-2"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                    <a 
                      href="tel:+971559954274" 
                      className="bg-white/5 border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-6 py-3 text-xs transition-all inline-flex items-center gap-2"
                    >
                      <Phone size={14} /> Call
                    </a>
                  </div>
                </GlassCard>
              </FadeInSection>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Spec Pack Download */}
              <FadeInSection>
                <GlassCard className="p-6 border-cyan-500/20" hover={false}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <FileText size={18} className="text-cyan-400" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wide">{tech.shortTitle} Spec Pack</h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                    Download the {tech.shortTitle} specification guide. Includes comparison tables, specification checklists, and UAE/GCC climate guidance.
                  </p>
                  <Link 
                    to="/resources" 
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-4 py-3 text-xs transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] inline-flex items-center justify-center gap-2"
                  >
                    Download PDF <ArrowRight size={12} />
                  </Link>
                </GlassCard>
              </FadeInSection>

              {/* Specifier Tools */}
              <FadeInSection delay={1}>
                <GlassCard className="p-6" hover={false}>
                  <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase block mb-4">Specifier Tools</span>
                  <div className="space-y-1">
                    <Link to="/calculator" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                      <Calculator size={14} className="text-cyan-400" /> Screen Calculator
                    </Link>
                    <Link to="/budget-estimator" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                      <DollarSign size={14} className="text-cyan-400" /> Budget Estimator
                    </Link>
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* Related Technologies */}
              {relatedTechs.length > 0 && (
                <FadeInSection delay={2}>
                  <GlassCard className="p-6" hover={false}>
                    <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase block mb-4">Related Technologies</span>
                    <div className="space-y-1">
                      {relatedTechs.map(rt => (
                        <Link 
                          key={rt.id} 
                          to={`/technology/${rt.id}`} 
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                        >
                          <ArrowRight size={12} className="text-cyan-400" /> {rt.title}
                        </Link>
                      ))}
                    </div>
                  </GlassCard>
                </FadeInSection>
              )}

              {/* All Technologies */}
              <FadeInSection delay={3}>
                <GlassCard className="p-6" hover={false}>
                  <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase block mb-4">All Technologies</span>
                  <div className="space-y-1">
                    {TECHNOLOGIES.filter(t => t.id !== tech.id).map(t => (
                      <Link 
                        key={t.id} 
                        to={`/technology/${t.id}`} 
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-gray-500 hover:bg-white/5 hover:text-white transition-all"
                      >
                        <ArrowRight size={10} className="text-gray-600" /> {t.shortTitle}
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* Back Link */}
              <FadeInSection delay={4}>
                <Link 
                  to="/technology" 
                  className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  <ArrowLeft size={14} /> Back to All Technologies
                </Link>
              </FadeInSection>
            </aside>
          </div>
        </div>
      </section>

      <QuickInquiry context={`${tech.title} technology`} />
    </div>
  );
}
