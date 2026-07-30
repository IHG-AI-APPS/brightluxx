import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Check, Eye, Shield, Zap, Volume2, Smartphone, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: delay * 0.15, ease: [0.25, 0.1, 0.25, 1] }} className={className}>{children}</motion.div>
  );
};

const FEATURES = [
  { icon: Eye, title: 'Instant Privacy', desc: 'Switch from transparent to opaque in milliseconds. PDLC technology scatters light when off, becoming translucent.' },
  { icon: Shield, title: '99% UV Protection', desc: 'Block harmful UV rays while controlling light. Protect interiors, artwork, and merchandise from sun damage.' },
  { icon: Volume2, title: '20% Noise Reduction', desc: 'The laminated structure provides acoustic insulation, reducing ambient noise for quieter spaces.' },
  { icon: Zap, title: 'Ultra-Low Power', desc: 'Only 5W/m² when transparent. Zero power consumption in opaque state. Energy-efficient operation.' },
  { icon: Smartphone, title: 'Smart Control', desc: 'Control via switch, remote, smartphone app, voice assistant, or integrate with building automation systems.' },
  { icon: Palette, title: 'Projection Ready', desc: 'The frosted opaque state doubles as a high-quality rear projection screen for presentations and displays.' },
];

const VARIANTS = [
  { name: 'Standard', transparency: '85-87%', haze: '5%', desc: 'Most popular. Excellent balance of clarity and privacy.', ideal: 'Office partitions, conference rooms' },
  { name: 'Premium 091', transparency: '90-91%', haze: '3%', desc: 'Higher clarity for demanding applications.', ideal: 'Luxury retail, high-end residential' },
  { name: 'Ultra Clear 092', transparency: '92%', haze: '3%', desc: 'Maximum transparency for glass-like clarity.', ideal: 'Museums, galleries, showrooms' },
  { name: 'Colorful', transparency: '85%', haze: '5%', desc: 'Available in custom tints and gradients.', ideal: 'Brand experiences, creative spaces' },
  { name: 'Reverse (PNLC)', transparency: '85%', haze: '5%', desc: 'Opaque when powered, clear when off. Fail-safe privacy.', ideal: 'Healthcare, secure facilities' },
];

const APPLICATIONS = [
  { name: 'Conference Rooms', image: 'https://files.ihgbrands.com/emergent-images/994ba21f13302f59aacc4a84641b1e64db76fbc083a69c2a8604109ab0b2d3d5.png' },
  { name: 'Hotel Bathrooms', image: 'https://files.ihgbrands.com/emergent-images/0a8f0c2cdad29691e223fd0f292d83947baade0536484eaea6512b6f07c90df0.png' },
  { name: 'Retail Displays', image: 'https://files.ihgbrands.com/emergent-images/b434e53819d5e958f3c797fe0db6500a38558aa325c4c09ba3550d8aad374b33.png' },
  { name: 'Healthcare', image: 'https://files.ihgbrands.com/emergent-images/64444ed7ca157e07ab9eeea06f1bb969e8744dbda982442ba235f506fd348b48.png' },
];

const FAQS = [
  { q: 'Can Smart Film be applied to existing glass?', a: 'Yes! Smart Film is self-adhesive and can be retrofitted to any smooth glass surface. No glass replacement needed. Our certified installers ensure bubble-free, seamless application with nearly invisible edges.' },
  { q: 'What happens during a power outage?', a: 'Standard PDLC Smart Film becomes opaque (frosted) when power is off - this is actually a safety feature as privacy is maintained. For applications requiring clear-when-off, we offer PNLC "Reverse" film.' },
  { q: 'How long does Smart Film last?', a: 'Our Smart Film is rated for 50,000+ switching cycles and 10+ years of continuous use. The PDLC technology is stable and does not degrade with UV exposure thanks to built-in UV blockers.' },
  { q: 'Can I use it as a projection screen?', a: 'Absolutely! In the opaque state, Smart Film creates an excellent rear projection surface. Many clients use it for presentations and digital signage - switch to transparent when not in use.' },
  { q: 'What sizes are available?', a: 'Standard roll width is 1.2m or 1.5m, with lengths up to 30m. Maximum single-piece width is 1.8m. For larger areas, we use nearly invisible seaming techniques.' },
];

export default function SmartFilmPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="smart-film-page">
      <SEO title="Smart Film — Switchable Privacy Glass Film | GlassMorph" description="PDLC switchable smart film transforms any glass from transparent to opaque instantly. 90-92% transparency, 99% UV block, retrofit existing windows. Self-adhesive installation." path="/glassmorph/smart-film" />

      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://files.ihgbrands.com/emergent-images/994ba21f13302f59aacc4a84641b1e64db76fbc083a69c2a8604109ab0b2d3d5.png" alt="Smart Film" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
        </div>
        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12">
            <Link to="/glassmorph" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors"><ArrowLeft size={16} /> All GlassMorph Products</Link>
          </div>
          <div className="flex-1 flex items-center px-6 md:px-12 lg:px-24 py-16">
            <div className="max-w-xl">
              <FadeIn><p className="text-violet-400 text-xs tracking-[0.3em] uppercase mb-4">GlassMorph</p></FadeIn>
              <FadeIn delay={1}><h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">Smart Film</h1></FadeIn>
              <FadeIn delay={2}><p className="text-xl text-neutral-300 font-light mb-6">Instant Privacy, Effortless Control</p></FadeIn>
              <FadeIn delay={3}><p className="text-neutral-500 mb-8">Self-adhesive PDLC film that transforms any glass from transparent to opaque in milliseconds. Retrofit existing windows without replacement. 90-92% transparency when clear, complete privacy when frosted.</p></FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Sample</Link>
                  <a href="#variants" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">View Variants</a>
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"><ChevronDown size={24} className="text-white/50" /></div>
        </div>
      </section>

      {/* Quick Specs */}
      <section className="py-12 px-6 border-b border-neutral-800 bg-violet-500/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ value: '90-92%', unit: '', label: 'Transparency' }, { value: '3%', unit: '', label: 'Min Haze' }, { value: '99%', unit: '', label: 'UV Block' }, { value: '5W', unit: '/m²', label: 'Power' }].map((spec, i) => (
              <FadeIn key={i} delay={i}>
                <div className="text-3xl font-light text-white">{spec.value}<span className="text-lg text-violet-400">{spec.unit}</span></div>
                <div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">PDLC Technology</p>
              <h2 className="text-3xl font-extralight text-white mb-6">How Smart Film Works</h2>
              <p className="text-neutral-400 leading-relaxed mb-6">Smart Film uses Polymer Dispersed Liquid Crystal (PDLC) technology. Microscopic liquid crystal droplets are suspended in a polymer matrix between two conductive layers.</p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border border-neutral-800 rounded-sm">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
                  <div><h3 className="text-white font-medium">Power OFF (Opaque)</h3><p className="text-neutral-500 text-sm">Liquid crystals are randomly oriented, scattering light and creating a frosted appearance.</p></div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-violet-500/30 rounded-sm bg-violet-500/5">
                  <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
                  <div><h3 className="text-white font-medium">Power ON (Transparent)</h3><p className="text-neutral-500 text-sm">Electric field aligns crystals, allowing light to pass through clearly. Instant switching.</p></div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={1}>
              <div className="relative aspect-video rounded-sm overflow-hidden border border-neutral-800">
                <img src="https://files.ihgbrands.com/emergent-images/64444ed7ca157e07ab9eeea06f1bb969e8744dbda982442ba235f506fd348b48.png" alt="PDLC Technology" className="w-full h-full object-cover" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Benefits</p><h2 className="text-3xl font-extralight text-white">Why Choose Smart Film</h2></div></FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0"><feature.icon size={20} className="text-violet-400" /></div>
                  <div><h3 className="text-white font-medium mb-1">{feature.title}</h3><p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Variants */}
      <section id="variants" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Product Range</p><h2 className="text-3xl font-extralight text-white">Smart Film Variants</h2></div></FadeIn>
          <FadeIn delay={1}>
            <div className="border border-neutral-800 rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-neutral-800 bg-neutral-900/50">
                    <th className="text-left p-4 text-neutral-400 font-medium">Variant</th>
                    <th className="text-center p-4 text-neutral-400 font-medium">Transparency</th>
                    <th className="text-center p-4 text-neutral-400 font-medium">Haze</th>
                    <th className="text-left p-4 text-neutral-400 font-medium">Ideal For</th>
                  </tr></thead>
                  <tbody>
                    {VARIANTS.map((v, i) => (
                      <tr key={i} className="border-b border-neutral-800/50 last:border-0 hover:bg-neutral-900/30 transition-colors">
                        <td className="p-4"><div className="text-white font-medium">{v.name}</div><div className="text-neutral-500 text-xs">{v.desc}</div></td>
                        <td className="p-4 text-center text-violet-400">{v.transparency}</td>
                        <td className="p-4 text-center text-neutral-300">{v.haze}</td>
                        <td className="p-4 text-neutral-500">{v.ideal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Applications</p><h2 className="text-3xl font-extralight text-white">Where Smart Film Shines</h2></div></FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {APPLICATIONS.map((app, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-sm">
                  <img src={app.image} alt={app.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4"><h3 className="text-white text-sm font-medium">{app.name}</h3></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technical Data</p><h2 className="text-3xl font-extralight text-white">Specifications</h2></div></FadeIn>
          <FadeIn delay={1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Optical Properties</h3>
                <div className="space-y-3">
                  {[['Transparency (ON)', '85-92%'], ['Haze (ON)', '3-5%'], ['Opacity (OFF)', '>99%'], ['UV Blocking', '>99%'], ['Switching Speed', '<100ms']].map(([label, value]) => (
                    <div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>
                  ))}
                </div>
              </div>
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Physical & Electrical</h3>
                <div className="space-y-3">
                  {[['Film Thickness', '0.4mm'], ['Max Width', '1.8m'], ['Operating Voltage', '48-65V AC'], ['Power (ON)', '5W/m²'], ['Operating Temp', '-20°C to 60°C'], ['Lifespan', '50,000+ cycles']].map(([label, value]) => (
                    <div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-3xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Support</p><h2 className="text-3xl font-extralight text-white">Frequently Asked Questions</h2></div></FadeIn>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm overflow-hidden">
                  <button className="w-full p-5 text-left flex items-center justify-between hover:bg-neutral-900/50 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-neutral-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>{openFaq === i && (<motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden"><div className="px-5 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800 pt-4">{faq.a}</div></motion.div>)}</AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Other Products */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">GlassMorph Family</p><h2 className="text-3xl font-extralight text-white">Explore More Solutions</h2></div></FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={1}>
              <Link to="/glassmorph/led-film" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://files.ihgbrands.com/emergent-images/b434e53819d5e958f3c797fe0db6500a38558aa325c4c09ba3550d8aad374b33.png" alt="LED Film" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6"><p className="text-violet-400 text-xs tracking-wider uppercase mb-1">Transparent LED</p><h3 className="text-white text-xl font-light">LED Film</h3></div>
              </Link>
            </FadeIn>
            <FadeIn delay={2}>
              <Link to="/glassmorph/switchable-glass" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://files.ihgbrands.com/emergent-images/0a8f0c2cdad29691e223fd0f292d83947baade0536484eaea6512b6f07c90df0.png" alt="Switchable Glass" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6"><p className="text-violet-400 text-xs tracking-wider uppercase mb-1">Pre-Laminated</p><h3 className="text-white text-xl font-light">Switchable Glass</h3></div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-violet-500/5 border-t border-violet-500/10">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready for Instant Privacy?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">Request a free sample and consultation. Our team will help you choose the right Smart Film variant for your project.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Sample</Link>
            <Link to="/glassmorph" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">All Products</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
