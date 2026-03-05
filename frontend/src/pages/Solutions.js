import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ShoppingBag, MonitorPlay, Tv, Layers, TrafficCone, Theater, Globe } from 'lucide-react';
import CdnImage from '../components/CdnImage';
import SEO from '../components/SEO';

const SOLUTIONS = [
  { id: 'retail', icon: ShoppingBag, title: 'Retail & Hospitality', image: '/api/cdn/sol_indoor_shop.webp', tags: ['Shopfronts', 'Video Walls', 'Menu Boards'] },
  { id: 'corporate', icon: Building2, title: 'Corporate & Conference', image: '/api/cdn/sol_meeting.webp', tags: ['Boardrooms', 'Lobbies', 'Command Centres'] },
  { id: 'outdoor', icon: MonitorPlay, title: 'Outdoor & DOOH', image: '/api/cdn/sol_outdoor_shop.webp', tags: ['Billboards', 'Facades', 'Signage'] },
  { id: 'events', icon: Theater, title: 'Events & Exhibitions', image: '/api/cdn/sol_exhibition.webp', tags: ['Concerts', 'Trade Shows', 'Stages'] },
  { id: 'creative', icon: Layers, title: 'Creative & Curved', image: '/api/cdn/flexible_1.webp', tags: ['Cylinders', 'Waves', 'Art Installations'] },
  { id: 'traffic', icon: TrafficCone, title: 'Road & Traffic', image: '/api/cdn/sol_road.webp', tags: ['VMS Signs', 'Highway', 'Toll Plaza'] },
  { id: 'immersive', icon: Tv, title: 'Immersive & VP', image: '/api/cdn/vp_1.webp', tags: ['XR Studios', 'Virtual Production', 'Simulation'] },
  { id: 'transparent', icon: Globe, title: 'Transparent & Glass', image: '/api/cdn/transparent_1.webp', tags: ['Glass Facades', 'Retail Windows', 'Museums'] },
];

export default function Solutions() {
  return (
    <div className="py-20" data-testid="solutions-page">
      <SEO
        title="LED Display Solutions"
        description="LED display solutions for every industry — retail, corporate, outdoor advertising, events, creative installations, traffic signage, virtual production, and transparent displays."
        path="/solutions"
        image="/api/cdn/sol_indoor_shop.webp"
      />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">INDUSTRY SOLUTIONS</div>
          <h1 data-testid="solutions-page-title">Solutions</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-2 tracking-wider max-w-xl">
            Premium LED display solutions tailored for every environment and industry.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="solutions-grid">
          {SOLUTIONS.map((sol) => {
            const Icon = sol.icon;
            return (
              <Link
                key={sol.id}
                to={`/solutions/${sol.id}`}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] block"
                data-testid={`solution-card-${sol.id}`}
              >
                {/* Image */}
                <CdnImage
                  src={sol.image}
                  alt={sol.title}
                  className="absolute inset-0 w-full h-full"
                  imgClassName="group-hover:scale-110 transition-transform duration-700 ease-out"
                  w={400}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md" style={{ background: 'rgba(229,197,116,0.15)', border: '1px solid rgba(229,197,116,0.25)' }}>
                      <Icon size={14} className="text-[var(--blx-gold-3)]" />
                    </div>
                    <h2 className="text-sm font-bold tracking-wider">{sol.title}</h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {sol.tags.map((tag) => (
                      <span key={tag} className="text-[0.55rem] px-2 py-0.5 rounded-full tracking-wider font-medium" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--blx-text-2)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.6rem] font-bold tracking-wider text-[var(--blx-gold-3)] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Explore <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-bold mb-2">Not sure which solution fits?</h3>
          <p className="text-xs text-[var(--blx-text-2)] tracking-wider mb-6">Our experts will analyse your space and recommend the perfect LED setup.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="btn-gold px-8 py-3.5 inline-flex items-center gap-2 text-xs" data-testid="solutions-cta-contact">
              Talk to an Expert <ArrowRight size={14} />
            </Link>
            <Link to="/products" className="btn-glass px-8 py-3.5 inline-flex items-center gap-2 text-xs" data-testid="solutions-browse-products">
              Browse Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
