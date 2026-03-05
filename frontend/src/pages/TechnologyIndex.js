import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Layers, Box, Monitor, Eye, Sparkles, Building2, Cuboid, MonitorPlay } from 'lucide-react';
import CdnImage from '../components/CdnImage';
import SEO from '../components/SEO';

const TECH_CARDS = [
  { id: 'microled', title: 'MicroLED', tagline: 'ULTRA-PREMIUM', icon: Sparkles, pitch: 'P0.4 — P0.9', image: '/api/cdn/indoor_1.webp', color: '#c084fc' },
  { id: 'cob-led', title: 'COB LED', tagline: 'PREMIUM STANDARD', icon: Cpu, pitch: 'P0.4 — P1.9', image: '/api/cdn/indoor_2.webp', color: '#60a5fa' },
  { id: 'mip-led', title: 'MiP LED', tagline: 'SMART SPEC', icon: Layers, pitch: 'P0.7 — P2.5', image: '/api/cdn/indoor_3.webp', color: '#34d399' },
  { id: 'fine-pitch-led', title: 'Fine Pitch', tagline: 'COMMERCIAL', icon: Monitor, pitch: 'P0.9 — P2.5', image: '/api/cdn/sol_meeting.webp', color: '#fbbf24' },
  { id: 'all-in-one-dvled', title: 'All-in-One dvLED', tagline: 'LCD REPLACEMENT', icon: MonitorPlay, pitch: 'P0.9 — P1.8', image: '/api/cdn/sol_indoor_shop.webp', color: '#f472b6' },
  { id: 'transparent-led', title: 'Transparent LED', tagline: 'SEE THROUGH', icon: Eye, pitch: 'P3.9 — P10', image: '/api/cdn/transparent_1.webp', color: '#67e8f9' },
  { id: '3d-anamorphic-led', title: '3D Anamorphic', tagline: 'GLASSES-FREE 3D', icon: Cuboid, pitch: 'P2.5 — P6', image: '/api/cdn/sol_outdoor_shop.webp', color: '#fb923c' },
  { id: 'creative-led', title: 'Creative LED', tagline: 'BEYOND RECTANGLES', icon: Box, pitch: 'P1.5 — P4', image: '/api/cdn/flexible_1.webp', color: '#a78bfa' },
  { id: 'media-facade', title: 'Media Facade', tagline: 'BUILDING SCALE', icon: Building2, pitch: 'P15 — P50', image: '/api/cdn/sol_road.webp', color: '#4ade80' },
];

export default function TechnologyIndex() {
  return (
    <div className="py-20" data-testid="technology-index-page">
      <SEO
        title="LED Display Technologies — MicroLED, COB, MiP, Transparent, 3D | Brightluxx"
        description="Explore 9 LED display technologies: MicroLED, COB, MiP, Fine Pitch, All-in-One dvLED, Transparent LED, 3D Anamorphic, Creative LED, and Media Facade."
        path="/technology"
      />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">LED DISPLAY TECHNOLOGIES</div>
          <h1 data-testid="technology-index-title">Technology Hub</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-2 tracking-wider max-w-xl">
            9 LED technologies explained for specifiers. Each guide covers specs, use cases, and comparisons.
          </p>
        </div>

        {/* Grid — first 2 large, rest in 3-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="technology-grid">
          {TECH_CARDS.map((tech, i) => {
            const Icon = tech.icon;
            const isLarge = i < 2;
            return (
              <Link
                key={tech.id}
                to={`/technology/${tech.id}`}
                className={`group relative rounded-xl overflow-hidden block ${isLarge ? 'lg:col-span-1 sm:col-span-1 aspect-[3/4]' : 'aspect-[3/4]'}`}
                data-testid={`tech-card-${tech.id}`}
              >
                {/* Image */}
                <CdnImage
                  src={tech.image}
                  alt={tech.title}
                  className="absolute inset-0 w-full h-full"
                  imgClassName="group-hover:scale-110 transition-transform duration-700 ease-out"
                  w={isLarge ? 600 : 400}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                {/* Pitch badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[0.5rem] font-bold tracking-[0.15em] px-2.5 py-1 rounded-full backdrop-blur-md" style={{ background: `${tech.color}20`, border: `1px solid ${tech.color}40`, color: tech.color }}>
                    {tech.pitch}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[0.5rem] font-bold tracking-[0.2em] mb-1.5" style={{ color: tech.color }}>{tech.tagline}</div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-md" style={{ background: `${tech.color}15`, border: `1px solid ${tech.color}30` }}>
                      <Icon size={16} style={{ color: tech.color }} />
                    </div>
                    <h2 className="text-base font-bold tracking-wider">{tech.title}</h2>
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.6rem] font-bold tracking-wider text-[var(--blx-gold-3)] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Specification Guide <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-bold tracking-wider mb-2">Not Sure Which Technology?</h3>
          <p className="text-xs text-[var(--blx-text-2)] max-w-md mx-auto mb-6 tracking-wider">
            Use our Technology Selector or talk to our engineers for a free recommendation.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/technology-selector" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="tech-index-selector-cta">
              Technology Selector <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="tech-index-contact-cta">
              Ask an Engineer <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
