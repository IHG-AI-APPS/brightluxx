import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ShoppingBag, HeartPulse, GraduationCap, Briefcase, Megaphone, ShoppingCart, Home } from 'lucide-react';
import SEO from '../components/SEO';
import { APPLICATIONS } from '../data/applications';
import CdnImage from '../components/CdnImage';

const ICONS = {
  hospitality: Building2,
  retail: ShoppingBag,
  healthcare: HeartPulse,
  education: GraduationCap,
  corporate: Briefcase,
  'outdoor-dooh': Megaphone,
  supermarket: ShoppingCart,
  residential: Home,
};

export default function ApplicationsIndex() {
  return (
    <div className="py-20" data-testid="applications-index">
      <SEO
        title="LED Display Applications — Solutions by Industry"
        description="LED display solutions for hospitality, retail, healthcare, education, corporate, outdoor advertising, supermarkets, and luxury residential. Specification guides and spec packs for UAE and GCC."
        path="/applications"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">LED DISPLAY SOLUTIONS</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">
            Solutions by<br />Application
          </h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed" style={{ textTransform: 'none' }}>
            Every space has unique display requirements. Explore application-specific LED solutions with recommended specifications, project examples, and downloadable spec packs tailored for UAE and GCC environments.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {APPLICATIONS.map(app => {
            const Icon = ICONS[app.id] || Building2;
            return (
              <Link
                key={app.id}
                to={`/applications/${app.id}`}
                className="glass-panel group overflow-hidden hover:border-[rgba(229,197,116,0.2)] transition-all duration-300"
                data-testid={`app-card-${app.id}`}
              >
                <div className="relative h-32 overflow-hidden">
                  <CdnImage src={app.heroImage} alt={app.shortTitle} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(11,11,11,0.9) 100%)' }} />
                  <div className="absolute bottom-3 left-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.12)' }}>
                        <Icon size={14} className="text-[var(--blx-gold-3)]" />
                      </div>
                      <h3 className="text-xs font-bold tracking-wider">{app.shortTitle}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[0.625rem] text-[var(--blx-gold-3)] tracking-wider mb-2">{app.heroTagline}</p>
                  <p className="text-[0.625rem] text-[var(--blx-text-2)] leading-relaxed line-clamp-2" style={{ textTransform: 'none' }}>
                    {app.heroDescription.slice(0, 120)}...
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-[0.625rem] text-[var(--blx-gold-3)] font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    View Solutions <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">DON'T SEE YOUR APPLICATION?</div>
          <h2 className="text-lg sm:text-xl font-bold tracking-wider mb-3">Custom LED Solutions</h2>
          <p className="text-sm text-[var(--blx-text-2)] max-w-lg mx-auto mb-6" style={{ textTransform: 'none' }}>
            We design bespoke LED display solutions for any environment. Tell us about your project and our technical team will recommend the right specification.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
              Discuss Your Project <ArrowRight size={14} />
            </Link>
            <Link to="/knowledge" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
              View Knowledge Base <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
