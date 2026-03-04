import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Cpu, Monitor, LayoutPanelLeft } from 'lucide-react';
import SEO from '../components/SEO';
import CdnImage from '../components/CdnImage';
import { LATEST_TECH } from '../data/latestTech';

const ICONS = {
  'glasses-free-3d': Zap,
  'microled-premium': Cpu,
  'mip-technology': Monitor,
  'stretch-displays': LayoutPanelLeft,
};

export default function LatestTechIndex() {
  return (
    <div className="py-20" data-testid="latest-tech-index">
      <SEO
        title="Latest LED Display Technology 2026 — ISE Trends & Innovations"
        description="Explore the latest LED display technologies from ISE 2026: glasses-free 3D signage, MicroLED ultra premium, MiP advancements, and stretch displays. Specification guidance for UAE projects."
        path="/latest-tech"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-[var(--blx-gold-3)]" />
            <span className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)]">ISE 2026 & BEYOND</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">
            Latest LED<br />Technology
          </h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed" style={{ textTransform: 'none' }}>
            The most exciting LED display innovations from ISE 2026 and the cutting edge of commercial signage technology. Each page includes specification guidance, UAE application context, and what to ask vendors.
          </p>
        </div>

        {/* Featured Tech Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {LATEST_TECH.map(tech => {
            const Icon = ICONS[tech.id] || Sparkles;
            return (
              <Link
                key={tech.id}
                to={`/latest-tech/${tech.id}`}
                className="glass-panel group overflow-hidden hover:border-[rgba(229,197,116,0.2)] transition-all duration-300"
                data-testid={`tech-card-${tech.id}`}
              >
                <div className="relative h-40 overflow-hidden">
                  <CdnImage src={tech.heroImage} alt={tech.shortTitle} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(11,11,11,0.95) 100%)' }} />
                  <div className="absolute top-4 left-4">
                    {tech.badge && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[0.5rem] font-bold tracking-[0.15em]" style={{ background: 'rgba(229,197,116,0.15)', color: 'var(--blx-gold-3)' }}>
                        <Sparkles size={8} /> {tech.badge}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.12)' }}>
                        <Icon size={16} className="text-[var(--blx-gold-3)]" />
                      </div>
                      <h3 className="text-sm font-bold tracking-wider group-hover:text-[var(--blx-gold-3)] transition-colors">{tech.shortTitle}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[0.625rem] text-[var(--blx-gold-3)] tracking-wider mb-2">{tech.heroTagline}</p>
                  <p className="text-xs text-[var(--blx-text-2)] leading-relaxed line-clamp-3 mb-4" style={{ textTransform: 'none' }}>
                    {tech.heroDescription}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[var(--blx-gold-3)] font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Technology <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
          <Sparkles size={24} className="text-[var(--blx-gold-3)] mx-auto mb-4" />
          <h2 className="text-lg sm:text-xl font-bold tracking-wider mb-3">Interested in the Latest Technology?</h2>
          <p className="text-sm text-[var(--blx-text-2)] max-w-lg mx-auto mb-6" style={{ textTransform: 'none' }}>
            Our technical team stays at the forefront of LED innovation. Book a consultation to explore how cutting-edge technology can elevate your next project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
              Discuss Latest Tech <ArrowRight size={14} />
            </Link>
            <Link to="/showroom" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
              Visit Our Showroom <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
