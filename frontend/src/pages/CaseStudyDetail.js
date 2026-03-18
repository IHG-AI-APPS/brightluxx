import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Building2, Users, HardHat, Cpu, CheckCircle2, MessageCircle, Phone, ArrowLeft, ChevronRight, Info, Sparkles, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

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
    backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl
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
        <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !cs) return <Navigate to="/case-studies" replace />;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(cs.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="bg-[#050508]" data-testid={`case-study-${cs.id}`}>
      <SEO
        title={`${cs.title} | LED Project ${cs.location}`}
        description={`${cs.challenge.slice(0, 120)} ${cs.technology} LED display project in ${cs.location}. View full case study.`}
        path={`/case-studies/${cs.slug || cs.id}`}
        image={cs.hero_image}
        keywords={`${cs.title}, LED project ${cs.location}, ${cs.technology} display, ${cs.category} LED, case study Dubai`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/case-studies' },
          { name: cs.title, path: null }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": cs.title,
          "description": cs.challenge.slice(0, 160),
          "author": { "@type": "Organization", "name": "Brightluxx" },
          "publisher": { "@type": "Organization", "name": "Brightluxx" },
          "datePublished": `${cs.year}-01-01`,
          "about": { "@type": "Thing", "name": cs.technology },
          "locationCreated": {
            "@type": "Place",
            "name": cs.location
          }
        }}
        ampUrl={`${process.env.REACT_APP_BACKEND_URL}/api/amp-case-study/${cs.slug || cs.id}`}
      />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[450px]" data-testid="case-study-hero">
        <img 
          src={cs.hero_image} 
          alt={`${cs.title} LED display project ${cs.location} ${cs.technology}`}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-[#050508]/30" />
        
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-12">
          <FadeInSection>
            {/* Breadcrumb */}
            <Breadcrumbs 
              items={[
                { name: 'Home', path: '/' },
                { name: 'Case Studies', path: '/case-studies' },
                { name: cs.title, path: null }
              ]}
              className="mb-6"
            />
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-cyan-500/10 backdrop-blur-sm text-cyan-400 border border-cyan-500/20 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-lg">
                {cs.category}
              </span>
              {cs.is_hypothetical && (
                <span className="bg-amber-500/10 backdrop-blur-sm text-amber-400 border border-amber-500/20 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-lg flex items-center gap-1.5">
                  <Sparkles size={12} /> Conceptual Project
                </span>
              )}
              <span className="bg-white/10 backdrop-blur-sm text-white border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-lg">
                {cs.technology} {cs.pixel_pitch}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide leading-tight mb-6">
              {cs.title}
            </h1>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
              <span className="flex items-center gap-2"><MapPin size={14} className="text-cyan-400" /> {cs.location}</span>
              <span className="flex items-center gap-2"><Calendar size={14} className="text-cyan-400" /> {cs.year}</span>
              <span className="flex items-center gap-2"><Cpu size={14} className="text-cyan-400" /> {cs.display_size}</span>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Hypothetical Disclaimer */}
      {cs.is_hypothetical && (
        <section className="py-6">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
              <Info size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-amber-200 font-bold uppercase tracking-wider mb-1">Conceptual Case Study</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  This is a conceptual demonstration created for inspirational purposes to showcase potential LED display applications. While the technical specifications reflect real-world capabilities of our products, the specific project details are hypothetical.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
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
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-5 flex items-center gap-3">
                    <span className="w-10 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
                    The Challenge
                  </h2>
                  <p className="text-gray-400 leading-relaxed tracking-wide normal-case text-base">{cs.challenge}</p>
                </div>
              </FadeInSection>

              {/* Solution */}
              <FadeInSection delay={2}>
                <div className="mb-12">
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-5 flex items-center gap-3">
                    <span className="w-10 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
                    Our Solution
                  </h2>
                  <p className="text-gray-400 leading-relaxed tracking-wide normal-case text-base">{cs.solution}</p>
                </div>
              </FadeInSection>

              {/* Results */}
              <FadeInSection delay={3}>
                <div className="mb-12">
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3">
                    <span className="w-10 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
                    Results & Impact
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {cs.results.map((r, i) => (
                      <GlassCard key={i} className="p-5 flex items-start gap-4" hover={false} data-testid={`case-result-${i}`}>
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={18} className="text-cyan-400" />
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
                    <span className="w-10 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
                    Technical Specifications
                  </h2>
                  <GlassCard className="overflow-hidden" hover={false} data-testid="case-spec-table">
                    <table className="w-full">
                      <tbody>
                        {cs.specs.map(([label, value], i) => (
                          <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-6 text-xs font-bold tracking-[0.12em] text-gray-500 uppercase w-[40%]">{label}</td>
                            <td className="py-4 px-6 text-sm text-gray-300">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </GlassCard>
                </div>
              </FadeInSection>

              {/* Share */}
              <FadeInSection delay={5}>
                <div className="mb-12 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Share2 size={14} className="text-cyan-400" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Share This Case Study</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {[
                      { href: shareLinks.facebook, icon: Facebook, label: 'Facebook' },
                      { href: shareLinks.twitter, icon: Twitter, label: 'Twitter' },
                      { href: shareLinks.linkedin, icon: Linkedin, label: 'LinkedIn' },
                    ].map(({ href, icon: Icon, label }) => (
                      <a 
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-500/30 hover:bg-white/10 transition-all"
                        title={`Share on ${label}`}
                      >
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </FadeInSection>

              {/* Bottom CTA */}
              <FadeInSection delay={6}>
                <GlassCard className="p-10 text-center border-cyan-500/20" hover={false}>
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-4">Planning a Similar Project?</h2>
                  <p className="text-sm text-gray-400 max-w-md mx-auto mb-8 tracking-wide">
                    Get free specification support and budgetary pricing for your {cs.category} LED display project.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link 
                      to="/contact" 
                      className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-6 py-3 text-xs transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 rounded-lg"
                    >
                      Get a Quote <ArrowRight size={14} />
                    </Link>
                    <a 
                      href="https://wa.me/971559954274" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white/5 border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-6 py-3 text-xs transition-all inline-flex items-center gap-2 rounded-lg"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                    <a 
                      href="tel:+971559954274" 
                      className="bg-white/5 border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-6 py-3 text-xs transition-all inline-flex items-center gap-2 rounded-lg"
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
                    <div className="text-xs text-gray-500 mb-1">Pixel Pitch: <span className="text-gray-300">{cs.pixel_pitch}</span></div>
                    <div className="text-xs text-gray-500 mb-4">Display: <span className="text-gray-300">{cs.display_size}</span></div>
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
                  <div className="space-y-1">
                    {[
                      { to: '/calculator', label: 'Screen Calculator' },
                      { to: '/budget-estimator', label: 'Budget Estimator' },
                      { to: '/resources', label: 'Resource Library' },
                    ].map(({ to, label }) => (
                      <Link 
                        key={to}
                        to={to} 
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs text-gray-400 hover:bg-white/5 hover:text-white transition-all"
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
                              <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                {r.is_hypothetical && <Sparkles size={10} className="text-amber-400" />}
                                {r.technology} {r.pixel_pitch}
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
