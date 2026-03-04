import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Layers, Box, Monitor, Eye, Sparkles, Building2, Cuboid, MonitorPlay } from 'lucide-react';
import SEO from '../components/SEO';

const TECH_CARDS = [
  { id: 'microled', title: 'MicroLED', tagline: 'Ultra-Premium', desc: 'Self-emissive, perfect blacks, 1M:1 contrast. The highest image quality.', icon: Sparkles, pitch: 'P0.4 — P0.9' },
  { id: 'cob-led', title: 'COB LED', tagline: 'Premium Standard', desc: 'Chip-on-board encapsulation. Highest contrast in mainstream LED.', icon: Cpu, pitch: 'P0.4 — P1.9' },
  { id: 'mip-led', title: 'MiP LED', tagline: 'Smart Specification', desc: '85-90% of COB quality at 30-40% lower cost. Fastest growing in 2026.', icon: Layers, pitch: 'P0.7 — P2.5' },
  { id: 'fine-pitch-led', title: 'Fine Pitch LED', tagline: 'Commercial Workhorse', desc: 'The most specified category for indoor commercial installations.', icon: Monitor, pitch: 'P0.9 — P2.5' },
  { id: 'all-in-one-dvled', title: 'All-in-One dvLED', tagline: 'LCD Replacement', desc: 'Pre-assembled 4K displays. Plug-and-play, zero bezels, 110"-216".', icon: MonitorPlay, pitch: 'P0.9 — P1.8' },
  { id: 'transparent-led', title: 'Transparent LED', tagline: 'See Through', desc: 'Glass facades become digital canvases. 85-95% transparency.', icon: Eye, pitch: 'P3.9 — P10' },
  { id: '3d-anamorphic-led', title: '3D Anamorphic LED', tagline: 'Glasses-Free 3D', desc: 'Corner-mounted displays with jaw-dropping 3D illusions.', icon: Cuboid, pitch: 'P2.5 — P6' },
  { id: 'creative-led', title: 'Creative LED', tagline: 'Beyond Rectangles', desc: 'Curved, cylindrical, ceiling, floor, and custom shapes.', icon: Box, pitch: 'P1.5 — P4' },
  { id: 'media-facade', title: 'Media Facade', tagline: 'Building Scale', desc: 'LED mesh and panels that transform entire building exteriors.', icon: Building2, pitch: 'P15 — P50' },
];

export default function TechnologyIndex() {
  return (
    <div className="pb-20" data-testid="technology-index-page">
      <SEO
        title="LED Display Technologies — MicroLED, COB, MiP, Transparent, 3D | Brightluxx"
        description="Explore 9 LED display technologies: MicroLED, COB, MiP, Fine Pitch, All-in-One dvLED, Transparent LED, 3D Anamorphic, Creative LED, and Media Facade. Specification guides for architects and consultants in UAE/GCC."
        path="/technology"
      />

      {/* Hero */}
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">LED DISPLAY TECHNOLOGIES</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">Technology Hub</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-xl leading-relaxed" style={{ textTransform: 'none' }}>
            9 LED display technologies explained for specifiers. Each guide includes specification tables, comparison charts, use cases, and FAQ — optimized for architects, AV consultants, and contractors in UAE/GCC.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_CARDS.map((tech) => (
            <Link
              key={tech.id}
              to={`/technology/${tech.id}`}
              className="glass-panel p-6 group hover:border-[rgba(229,197,116,0.2)] transition-all duration-200"
              data-testid={`tech-card-${tech.id}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <tech.icon size={20} className="text-[var(--blx-gold-3)]" />
                </div>
                <span className="text-[0.45rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] px-2 py-1 rounded" style={{ background: 'rgba(229,197,116,0.08)' }}>{tech.pitch}</span>
              </div>
              <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-1">{tech.tagline.toUpperCase()}</div>
              <h2 className="text-sm font-bold tracking-wider mb-2 group-hover:text-[var(--blx-gold-3)] transition-colors">{tech.title}</h2>
              <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>{tech.desc}</p>
              <div className="flex items-center gap-1.5 text-[0.5625rem] font-bold tracking-wider text-[var(--blx-gold-3)] group-hover:gap-2.5 transition-all">
                Specification Guide <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
          <h2 className="text-lg font-bold tracking-wider mb-3">Not Sure Which Technology?</h2>
          <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6" style={{ textTransform: 'none' }}>
            Use our Screen Calculator to get a technology recommendation based on your application, viewing distance, and budget. Or contact our team for free specification support.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/calculator" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="tech-index-calculator-cta">
              Screen Calculator <ArrowRight size={14} />
            </Link>
            <Link to="/for-architects" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="tech-index-architects-cta">
              For Architects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
