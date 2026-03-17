import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Building2, Users, HardHat, Cpu, CheckCircle2, MessageCircle, Phone, ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL || '';

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

export default function CaseStudyDetail() {
  const { caseId } = useParams();
  const [cs, setCs] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/case-studies/${caseId}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setCs(data.case_study);
        
        const allRes = await fetch(`${API}/api/case-studies`);
        const allData = await allRes.json();
        const allCases = allData.case_studies || [];
        const relatedCases = allCases.filter(c => 
          c.slug !== caseId && (c.category === data.case_study.category || c.tech_id === data.case_study.tech_id)
        ).slice(0, 3);
        setRelated(relatedCases);
      } catch (err) {
        console.error('Failed to fetch case study:', err);
        setNotFound(true);
      }
      setLoading(false);
    };
    
    if (caseId) fetchCaseStudy();
  }, [caseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !cs) return <Navigate to="/case-studies" replace />;

  return (
    <div className="bg-[#050508]" data-testid={`case-study-${cs.id}`}>
      <SEO
        title={`${cs.title} | LED Case Study — Brightluxx`}
        description={cs.challenge.slice(0, 160)}
        path={`/case-studies/${cs.id}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": cs.title,
          "description": cs.challenge.slice(0, 160),
          "author": { "@type": "Organization", "name": "Brightluxx" },
          "publisher": { "@type": "Organization", "name": "Brightluxx" },
          "datePublished": `${cs.year}-01-01`,
          "about": { "@type": "Thing", "name": cs.technology }
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px]">
        <img src={cs.hero_image} alt={cs.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-12">
          <FadeInSection>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-500 tracking-wider mb-6">
              <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/case-studies" className="hover:text-cyan-400 transition-colors">Case Studies</Link>
              <ChevronRight size={12} />
              <span className="text-cyan-400">{cs.category.charAt(0).toUpperCase() + cs.category.slice(1)}</span>
            </div>
            
            <span className="inline-block bg-cyan-500/10 backdrop-blur-sm text-cyan-400 border border-cyan-500/20 px-3 py-1 text-[10px] uppercase tracking-wider font-bold mb-4">
              {cs.category}
            </span>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide leading-tight mb-6">
              {cs.title}
            </h1>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
              <span className="flex items-center gap-2"><MapPin size={14} className="text-cyan-400" /> {cs.location}</span>
              <span className="flex items-center gap-2"><Calendar size={14} className="text-cyan-400" /> {cs.year}</span>
              <span className="flex items-center gap-2"><Cpu size={14} className="text-cyan-400" /> {cs.technology} {cs.pixel_pitch}</span>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            {/* Main Content */}
            <div>
              {/* Project Team */}
              <FadeInSection>
                <GlassCard className="p-6 mb-10" hover={false}>
                  <div className="grid sm:grid-cols-3 gap-6">
                    {[
                      { icon: Building2, label: 'Client', value: cs.client },
                      { icon: Users, label: 'Consultant', value: cs.consultant },
                      { icon: HardHat, label: 'Contractor', value: cs.contractor },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label}>
                        <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2 flex items-center gap-2">
                          <Icon size={12} className="text-cyan-400" /> {label}
                        </div>
                        <div className="text-sm font-bold tracking-wide">{value}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* Challenge */}
              <FadeInSection delay={1}>
                <div className="mb-12">
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-4 flex items-center gap-3">
                    <span className="w-8 h-px bg-cyan-500" />
                    The Challenge
                  </h2>
                  <p className="text-gray-400 leading-relaxed tracking-wide normal-case">{cs.challenge}</p>
                </div>
              </FadeInSection>

              {/* Solution */}
              <FadeInSection delay={2}>
                <div className="mb-12">
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-4 flex items-center gap-3">
                    <span className="w-8 h-px bg-cyan-500" />
                    Our Solution
                  </h2>
                  <p className="text-gray-400 leading-relaxed tracking-wide normal-case">{cs.solution}</p>
                </div>
              </FadeInSection>

              {/* Results */}
              <FadeInSection delay={3}>
                <div className="mb-12">
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-cyan-500" />
                    Results & Impact
                  </h2>
                  <div className="space-y-3">
                    {cs.results.map((r, i) => (
                      <GlassCard key={i} className="p-4 flex items-start gap-4" hover={false} data-testid={`case-result-${i}`}>
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={16} className="text-cyan-400" />
                        </div>
                        <span className="text-sm text-gray-400 leading-relaxed normal-case">{r}</span>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </FadeInSection>

              {/* Spec Table */}
              <FadeInSection delay={4}>
                <div className="mb-12">
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-cyan-500" />
                    Technical Specifications
                  </h2>
                  <GlassCard className="overflow-hidden" hover={false} data-testid="case-spec-table">
                    <table className="w-full">
                      <tbody>
                        {cs.specs.map(([label, value], i) => (
                          <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                            <td className="py-4 px-6 text-xs font-bold tracking-[0.15em] text-gray-500 uppercase w-[40%]">{label}</td>
                            <td className="py-4 px-6 text-sm text-gray-300">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </GlassCard>
                </div>
              </FadeInSection>

              {/* Bottom CTA */}
              <FadeInSection delay={5}>
                <GlassCard className="p-10 text-center border-cyan-500/20" hover={false}>
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-4">Planning a Similar Project?</h2>
                  <p className="text-sm text-gray-400 max-w-md mx-auto mb-8 tracking-wide">
                    Get free specification support and budgetary pricing for your {cs.category} LED display project.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link 
                      to="/contact" 
                      className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-6 py-3 text-xs transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                    >
                      Get a Quote <ArrowRight size={14} />
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
              {/* Technology Link */}
              <FadeInSection>
                <Link to={`/technology/${cs.tech_id}`} className="block group" data-testid="case-tech-link">
                  <GlassCard className="p-6">
                    <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-3">Technology Used</div>
                    <div className="text-base font-bold tracking-wide mb-2 group-hover:text-cyan-400 transition-colors">{cs.technology}</div>
                    <div className="text-xs text-gray-500 mb-1">Pixel Pitch: {cs.pixel_pitch}</div>
                    <div className="text-xs text-gray-500 mb-4">Display: {cs.display_size}</div>
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-wider uppercase group-hover:gap-3 transition-all">
                      View Technology Guide <ArrowRight size={12} />
                    </div>
                  </GlassCard>
                </Link>
              </FadeInSection>

              {/* Tags */}
              <FadeInSection delay={1}>
                <GlassCard className="p-6" hover={false}>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 text-xs tracking-wider text-gray-500 bg-white/5 border border-white/10 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* Quick Actions */}
              <FadeInSection delay={2}>
                <GlassCard className="p-6" hover={false}>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4">Specifier Tools</div>
                  <div className="space-y-2">
                    {[
                      { to: '/calculator', label: 'Screen Calculator' },
                      { to: '/budget-estimator', label: 'Budget Estimator' },
                      { to: '/resources', label: 'Resource Library' },
                    ].map(({ to, label }) => (
                      <Link 
                        key={to}
                        to={to} 
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-xs text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                      >
                        <ArrowRight size={12} className="text-cyan-400" /> {label}
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* Related Case Studies */}
              {related.length > 0 && (
                <FadeInSection delay={3}>
                  <GlassCard className="p-6" hover={false}>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4">Related Projects</div>
                    <div className="space-y-4">
                      {related.map(r => (
                        <Link key={r.id} to={`/case-studies/${r.slug || r.id}`} className="block group" data-testid={`related-case-${r.id}`}>
                          <div className="flex gap-4">
                            <img 
                              src={r.thumbnail || r.hero_image} 
                              alt={r.title} 
                              className="w-20 h-14 object-cover rounded-lg flex-shrink-0" 
                              loading="lazy" 
                            />
                            <div>
                              <div className="text-sm font-bold tracking-wide group-hover:text-cyan-400 transition-colors leading-tight mb-1">
                                {r.title.split(' — ')[0]}
                              </div>
                              <div className="text-xs text-gray-500">
                                {r.technology} {r.pixel_pitch} &middot; {r.location}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </GlassCard>
                </FadeInSection>
              )}

              {/* Back Link */}
              <FadeInSection delay={4}>
                <Link 
                  to="/case-studies" 
                  className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  <ArrowLeft size={14} /> Back to All Case Studies
                </Link>
              </FadeInSection>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
