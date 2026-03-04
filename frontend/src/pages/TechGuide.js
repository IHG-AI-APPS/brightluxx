import React from 'react';
import { Cpu, Layers, Zap, Eye, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const techData = [
  {
    id: 'cob',
    title: 'COB (Chip-on-Board)',
    icon: Cpu,
    tagline: 'The future of LED. Now.',
    description: 'LED chips mounted directly onto PCB substrate. Eliminates individual packaging for superior density, reliability, and contrast.',
    stats: [
      { label: 'Contrast', value: '20,000:1' },
      { label: 'Min Pitch', value: '0.4mm' },
      { label: 'Power Save', value: '40%' },
      { label: 'CAGR', value: '66%' },
    ],
    pros: ['Superior contrast and black levels', 'Moisture and dust resistant', '100,000+ hour lifespan', '40% lower power vs SMD', 'Ideal for sub-1mm pitch'],
    best_for: 'Command Centres, Broadcast Studios, Home Cinema, Corporate',
    products: ['BL-COB060', 'BL-COB093', 'BL-COB125'],
  },
  {
    id: 'mip',
    title: 'MiP (Mini-in-Package)',
    icon: Layers,
    tagline: 'Best of both worlds.',
    description: 'Mini LED chips in individual packages combining COB contrast with SMD serviceability. The fastest-growing LED technology in 2025.',
    stats: [
      { label: 'Contrast', value: '10,000:1' },
      { label: 'Min Pitch', value: '0.4mm' },
      { label: 'Power Save', value: '35%' },
      { label: 'Growth', value: '2x YoY' },
    ],
    pros: ['COB-level contrast', 'SMD-level serviceability', 'Active-matrix compatible', '35% energy savings', 'Mass production ready'],
    best_for: 'Retail, Broadcast, Medical, Defence',
    products: ['BL-MIP150', 'BL-MIP040'],
  },
  {
    id: 'transparent',
    title: 'Transparent LED',
    icon: Eye,
    tagline: 'See through. Stand out.',
    description: 'From 2mm holographic film to 0.6mm MicroLED panels. Up to 90% transparency transforms any glass surface into a digital canvas.',
    stats: [
      { label: 'Transparency', value: 'Up to 90%' },
      { label: 'Min Pitch', value: '0.6mm' },
      { label: 'Brightness', value: '5,500 nits' },
      { label: 'Thickness', value: '2mm' },
    ],
    pros: ['Preserves natural light', 'Near-invisible when off', 'Silent operation', 'Self-adhesive film options', 'Architectural integration'],
    best_for: 'Retail Storefronts, Glass Facades, Museums, Airports',
    products: ['BL-TRX060', 'BL-TRX380', 'BL-HOL020'],
  },
  {
    id: 'interactive',
    title: 'Interactive Floor LED',
    icon: Zap,
    tagline: 'Walk on it. Play on it.',
    description: 'Pressure-sensitive and touch-responsive LED floor displays. 2.5T/sqm load rating with IP65 protection and anti-slip surfaces.',
    stats: [
      { label: 'Load Rating', value: '2.5T/sqm' },
      { label: 'IP Rating', value: 'IP65' },
      { label: 'Response', value: 'Multi-touch' },
      { label: 'Brightness', value: '1,200 nits' },
    ],
    pros: ['Pressure-sensitive interaction', '2.5-tonne load capacity', 'Anti-slip tempered glass', 'Front-access service', 'Gamification capable'],
    best_for: 'Retail, Theme Parks, Events, Museums, Exhibitions',
    products: ['BL-IFL290', 'BL-IFL390'],
  },
];

const TechGuide = () => {
  return (
    <div className="py-20" data-testid="tech-guide-page">
      <SEO title="LED Technology Guide" description="Learn about LED display technologies — COB, SMD, DIP, MiP. Understand pixel pitch, brightness, viewing distance, and refresh rates." path="/tech-guide" />      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 data-testid="tech-guide-title">Technology Guide</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-2 tracking-wider max-w-2xl">
            Understanding the technologies behind next-generation LED displays.
          </p>
        </div>

        <div className="space-y-10">
          {techData.map((tech) => (
            <div key={tech.id} className="glass-panel overflow-hidden" data-testid={`tech-card-${tech.id}`}>
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 glass-panel flex items-center justify-center flex-shrink-0">
                    <tech.icon size={22} className="text-[var(--blx-gold-3)]" />
                  </div>
                  <div>
                    <h2 className="text-lg">{tech.title}</h2>
                    <p className="text-[0.6875rem] text-[var(--blx-gold-3)] font-bold tracking-widest mt-1">{tech.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-[var(--blx-text-2)] mb-6 leading-relaxed tracking-wider max-w-3xl">
                  {tech.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {tech.stats.map((stat) => (
                    <div key={stat.label} className="p-3 bg-[var(--blx-bg)] rounded-lg border border-[var(--blx-border)] text-center">
                      <div className="text-lg font-bold text-[var(--blx-gold-3)]">{stat.value}</div>
                      <div className="text-[0.625rem] text-[var(--blx-muted)] tracking-[0.15em] mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Advantages */}
                  <div>
                    <h4 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-3">Key Advantages</h4>
                    <ul className="space-y-2">
                      {tech.pros.map((pro) => (
                        <li key={pro} className="flex items-center gap-2 text-sm text-[var(--blx-text-2)] tracking-wider">
                          <CheckCircle size={14} className="text-[var(--blx-gold-3)] flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For + Products */}
                  <div>
                    <h4 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-3">Best For</h4>
                    <p className="text-sm text-[var(--blx-text-2)] mb-4 tracking-wider">{tech.best_for}</p>

                    <h4 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-3">Our Products</h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.products.map((code) => (
                        <span key={code} className="category-badge">{code}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-lg mb-3">Not sure which technology is right?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator" className="btn-glass px-8 py-3.5 inline-flex items-center gap-2">
              Screen Calculator <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-gold px-8 py-3.5 inline-flex items-center gap-2">
              Ask an Expert <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechGuide;
