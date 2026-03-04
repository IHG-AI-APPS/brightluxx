import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ShoppingBag, Briefcase, Landmark, MapPin, Monitor, Layers, Eye, Smartphone, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import SEO from '../components/SEO';

const APPLICATIONS = [
  {
    id: 'media-facades',
    icon: Building2,
    title: 'Media Facades',
    tagline: 'Buildings as canvases',
    desc: 'Entire building surfaces become dynamic digital canvases. Media facades transform architecture into storytelling platforms — from entertainment districts to cultural landmarks. The building itself becomes the experience.',
    specs: [
      ['Technology', 'Transparent LED mesh or stick LED'],
      ['Transparency', '60% — 90%'],
      ['Pixel Pitch', 'P3.9 — P25 (viewing distance dependent)'],
      ['Brightness', '5,000 — 8,000 nits'],
      ['Key Consideration', 'Structural integration, wind load, maintenance access'],
    ],
    projects: ['Malls', 'Stadiums', 'Entertainment districts', 'Cultural venues', 'Corporate HQs'],
    techLink: '/technology/media-facade',
  },
  {
    id: 'immersive-rooms',
    icon: Layers,
    title: 'Immersive LED Rooms',
    tagline: 'Spaces surrounded by content',
    desc: 'Multi-wall LED environments that transport visitors into fully immersive digital worlds. Used in museums, brand experience centers, and corporate showrooms to create emotional connections through 360-degree visual storytelling.',
    specs: [
      ['Technology', 'Fine Pitch LED or MicroLED'],
      ['Configuration', '3-wall, 4-wall, or floor-to-ceiling'],
      ['Pixel Pitch', 'P0.9 — P2.5'],
      ['Brightness', '600 — 1,200 nits'],
      ['Key Consideration', 'Seamless corners, ambient light control, content production'],
    ],
    projects: ['Museums', 'Brand experience centers', 'Corporate showrooms', 'Exhibitions', 'Virtual production'],
    techLink: '/technology/creative-led',
  },
  {
    id: 'retail-experiential',
    icon: ShoppingBag,
    title: 'Retail Experiential Screens',
    tagline: 'Commerce meets spectacle',
    desc: 'Luxury retail is evolving beyond static displays. Curved LED walls, transparent storefronts, and 3D anamorphic corners transform flagship stores into destinations. The display is the architecture.',
    specs: [
      ['Technology', 'COB LED, Transparent LED, 3D Anamorphic'],
      ['Pixel Pitch', 'P0.9 — P3.9'],
      ['Brightness', '800 — 6,000 nits (application dependent)'],
      ['Surface', 'Anti-glare nano-coating for high ambient light'],
      ['Key Consideration', 'Brand colour accuracy (sRGB 120%+), CMS integration'],
    ],
    projects: ['Flagship stores', 'Shopping malls', 'Pop-up experiences', 'Digital window displays', 'In-store media walls'],
    techLink: '/technology/cob-led',
  },
  {
    id: 'corporate-experience',
    icon: Briefcase,
    title: 'Corporate Experience Centers',
    tagline: 'Brand storytelling at scale',
    desc: 'Companies are building immersive spaces to tell their story to clients, investors, and employees. LED experience centers combine data visualization, brand content, and interactive elements into architectural statements.',
    specs: [
      ['Technology', 'Fine Pitch LED or All-in-One dvLED'],
      ['Pixel Pitch', 'P0.7 — P1.5'],
      ['Configuration', 'Feature wall, curved, or multi-surface'],
      ['Brightness', '400 — 800 nits'],
      ['Key Consideration', 'Integration with presentation systems, touch/gesture interaction'],
    ],
    projects: ['Corporate lobbies', 'Boardrooms', 'Innovation labs', 'Visitor centers', 'Command centers'],
    techLink: '/technology/fine-pitch-led',
  },
  {
    id: 'digital-wayfinding',
    icon: MapPin,
    title: 'Digital Wayfinding Ecosystems',
    tagline: 'Intelligent navigation networks',
    desc: 'Large developments deploy networked LED signage ecosystems that combine wayfinding, information display, and revenue-generating advertising. These systems are designed as architectural elements, not afterthoughts.',
    specs: [
      ['Technology', 'All-in-One dvLED or Fine Pitch LED'],
      ['Pixel Pitch', 'P1.2 — P2.5'],
      ['Sizes', '55" — 165" per unit, networked'],
      ['CMS', 'Centralized with emergency override'],
      ['Key Consideration', 'HIS/BMS integration, IP rating for semi-outdoor, antimicrobial'],
    ],
    projects: ['Hospitals', 'Airports', 'Malls', 'Universities', 'Mixed-use developments'],
    techLink: '/technology/all-in-one-dvled',
  },
  {
    id: '3d-anamorphic',
    icon: Eye,
    title: '3D Anamorphic & Interactive',
    tagline: 'Glasses-free 3D experiences',
    desc: 'L-shaped corner LED displays create stunning glasses-free 3D illusions that stop foot traffic and generate social media virality. Interactive LED walls respond to touch, gesture, or motion, blurring the line between physical and digital space.',
    specs: [
      ['Technology', '3D Anamorphic LED, Interactive LED'],
      ['Pixel Pitch', 'P2.5 — P4.0'],
      ['Brightness', '5,000 — 7,000 nits'],
      ['Refresh Rate', '3,840 Hz+ (camera-friendly)'],
      ['Key Consideration', 'Content production (3D rendering), structural L-frame, viewing cone'],
    ],
    projects: ['Landmark buildings', 'Retail districts', 'Entertainment venues', 'Corporate campuses', 'Public spaces'],
    techLink: '/technology/3d-anamorphic-led',
  },
];

export default function DigitalExperienceArchitecture() {
  return (
    <div className="pb-20" data-testid="dea-page">
      <SEO
        title="Digital Experience Architecture — LED in Building Design | Brightluxx"
        description="The next wave of architecture integrates LED displays into building design. Explore media facades, immersive rooms, retail experiential screens, and digital wayfinding ecosystems for UAE/GCC projects."
        path="/digital-experience-architecture"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Digital Experience Architecture — LED Displays in Building Design",
          "description": "How buildings are becoming media platforms with integrated LED displays across UAE and GCC.",
          "author": { "@type": "Organization", "name": "Brightluxx" },
          "publisher": { "@type": "Organization", "name": "Brightluxx" },
          "datePublished": "2026-03-04"
        }}
      />

      {/* Hero */}
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">THE NEXT WAVE</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">
            Digital Experience<br />Architecture
          </h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed mb-4" style={{ textTransform: 'none' }}>
            Buildings are becoming media platforms. Across UAE, Saudi Arabia, and the GCC, the most ambitious projects integrate LED displays not as afterthoughts, but as fundamental design elements — media facades, immersive environments, and interactive installations that define the architecture itself.
          </p>
          <p className="text-xs text-[var(--blx-muted)] max-w-2xl leading-relaxed mb-8" style={{ textTransform: 'none' }}>
            This is where malls, museums, hotels, and airports design entire experiences around LED — and the companies that position early win the defining projects of the decade.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/design-assist" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="dea-hero-da-cta">
              Request Design Assist <ArrowRight size={14} />
            </Link>
            <Link to="/case-studies" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
              View Case Studies <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Applications */}
        <div className="space-y-10 mb-16">
          {APPLICATIONS.map((app, i) => (
            <div key={app.id} id={app.id} className="glass-panel p-6 sm:p-8 scroll-mt-24" data-testid={`dea-app-${app.id}`}>
              <div className="grid lg:grid-cols-[1fr_320px] gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.08)' }}>
                      <app.icon size={18} className="text-[var(--blx-gold-3)]" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold tracking-wider">{app.title}</h2>
                      <div className="text-[0.5625rem] text-[var(--blx-gold-3)] tracking-wider">{app.tagline}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-6" style={{ textTransform: 'none' }}>{app.desc}</p>

                  {/* Spec Table */}
                  <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid var(--blx-hairline)' }}>
                    <table className="w-full">
                      <tbody>
                        {app.specs.map(([label, value], si) => (
                          <tr key={si} className="border-b border-[var(--blx-hairline)] last:border-0">
                            <td className="py-2.5 px-4 text-[0.5625rem] font-bold tracking-[0.12em] text-[var(--blx-muted)] w-[35%]">{label}</td>
                            <td className="py-2.5 px-4 text-[0.6875rem]" style={{ textTransform: 'none' }}>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Link to={app.techLink} className="inline-flex items-center gap-1.5 text-[0.5625rem] font-bold tracking-wider text-[var(--blx-gold-3)] hover:gap-2.5 transition-all">
                    View Technology Guide <ArrowRight size={10} />
                  </Link>
                </div>

                {/* Projects sidebar */}
                <div>
                  <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">TYPICAL PROJECTS</div>
                  <div className="space-y-2 mb-6">
                    {app.projects.map((p, pi) => (
                      <div key={pi} className="flex items-center gap-2 text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>
                        <CheckCircle2 size={10} className="text-[var(--blx-gold-3)] flex-shrink-0" /> {p}
                      </div>
                    ))}
                  </div>
                  <Link to="/design-assist" className="btn-glass w-full px-4 py-2.5 text-[0.5625rem] font-bold tracking-[0.15em] flex items-center justify-center gap-2">
                    Request Design Assist <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Positioning Statement */}
        <div className="p-8 sm:p-12 rounded-2xl text-center mb-16" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">OUR POSITIONING</div>
          <h2 className="text-lg sm:text-xl font-bold tracking-wider mb-3">GCC Digital Display Design Partner</h2>
          <p className="text-sm text-[var(--blx-text-2)] max-w-xl mx-auto mb-8" style={{ textTransform: 'none' }}>
            We don't just supply LED screens. We collaborate with architects, consultants, and contractors from concept through commissioning to create digital experiences that define buildings.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/design-assist" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="dea-bottom-da-cta">
              Start a Design Conversation <ArrowRight size={14} />
            </Link>
            <a href="https://wa.me/971559910711" target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a href="tel:+971559910711" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
              <Phone size={14} /> Call
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-base font-bold tracking-wider mb-6">Explore Further</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Technology Hub', desc: '9 LED technologies explained', path: '/technology' },
              { title: 'Case Studies', desc: '8 GCC project examples', path: '/case-studies' },
              { title: 'For Architects', desc: 'Spec packs, BIM, cheat sheets', path: '/for-architects' },
              { title: 'CPD Programme', desc: 'Free Lunch & Learn sessions', path: '/cpd-programme' },
            ].map(link => (
              <Link key={link.path} to={link.path} className="glass-panel p-5 group hover:border-[rgba(229,197,116,0.2)] transition-all">
                <h3 className="text-xs font-bold tracking-wider mb-1 group-hover:text-[var(--blx-gold-3)] transition-colors">{link.title}</h3>
                <p className="text-[0.6875rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>{link.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-[0.5rem] font-bold tracking-wider text-[var(--blx-gold-3)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight size={10} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
