import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Check, Eye, Shield, Zap, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: delay * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const APPLICATIONS = [
  { name: 'Reception Desk', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/0df70d52700f6cd82cae5a3e328f51241faaa9646904e18572a99184b3c02a1e.png' },
  { name: 'Club & Nightlife', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/b21d3104790b5b688b54f330701edb577f1df0c15a9332d97eb4ee63d402c71e.png' },
  { name: 'Gallery Wall', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/6afcc7649717065852dd86a565bc1b10d16ad80324537065bd03c4962adfe4ab.png' },
  { name: 'Restaurant', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/662f0cfbba0d0fef72dbd8539069bd465c284a186594b446d81329daabf68f04.png' },
  { name: 'Coffee Shop', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c99cf5742431bcf7d80a80ff9d6e020fe517373abd755db97c4abcd17c9e9aa7.png' },
];

const ADVANTAGES = [
  { icon: Eye, title: 'Versatile Splicing', desc: 'Seamless tile patterns with module-based customization for any wall size.' },
  { icon: Shield, title: 'Eye-Protective', desc: 'Low blue light emission and flicker-free technology for comfortable viewing.' },
  { icon: Zap, title: 'Superior Protection', desc: '3H scratch-resistant coating with dust-proof surface and low 0.5% reflectivity.' },
  { icon: Leaf, title: 'Energy-Saving', desc: 'COB technology reduces power consumption while maintaining high brightness.' },
];

const FAQS = [
  { q: 'What is nano-optical technology?', a: 'Our nano-optical layer is natively compounded onto the COB/MIP surface. It guarantees high luminance with minimal light attenuation and low reflectivity, presenting vivid off-screen textures and crystal-clear on-screen visuals.' },
  { q: 'What textures are available?', a: 'NaturaTex offers a wide range of textures including wood grain, marble, stone, fabric, and custom patterns. Each texture can be seamlessly mapped across multiple panels.' },
  { q: 'How does NaturaTex integrate with building materials?', a: 'NaturaTex is designed to integrate the art of display into building materials, breaking through constraints of traditional black displays. When off, it blends with the environment. When on, it displays fine, beautiful pictures.' },
  { q: 'What pixel pitch options are available?', a: 'NaturaTex is available in P0.7, P0.9, P1.2, P1.5, and P1.8 pixel pitches using COB LED technology, suitable for various viewing distances from 1-10 meters.' },
];

export default function NaturaTexPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="naturatex-page">
      <SEO
        title="NaturaTex — Texture Screen Technology | Brightluxx UAE"
        description="Turn off the display, turn on the art. NaturaTex integrates nano-optical technology with COB LED for displays that blend seamlessly with architectural design when off, and display stunning visuals when on."
        path="/naturatex"
      />

      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ea77d4dd0e99bf17d39a28af7bcce5ed3db13b59241d32385de3a59cf9952a29.png" 
            alt="NaturaTex Texture Screen" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/40 to-neutral-950" />
        </div>

        <div className="relative flex flex-col min-h-screen">
          <div className="pt-8 px-6 md:px-12">
            <Link to="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors">
              <ArrowLeft size={16} /> Back to Brightluxx
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center text-center px-6 py-20">
            <div>
              <FadeIn>
                <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase mb-4">Texture Screen</p>
              </FadeIn>
              <FadeIn delay={1}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-4">NaturaTex</h1>
              </FadeIn>
              <FadeIn delay={2}>
                <p className="text-xl md:text-2xl text-neutral-300 font-light mb-8">
                  Turn off the Display, Turn on the Art.
                </p>
              </FadeIn>
              <FadeIn delay={3}>
                <p className="text-neutral-500 max-w-xl mx-auto mb-10">
                  Integrating the art of display into building materials. Breaking through constraints of traditional black displays 
                  to achieve harmony with decorative design.
                </p>
              </FadeIn>
              <FadeIn delay={4}>
                <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors inline-block">
                  Request Demo
                </Link>
              </FadeIn>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={24} className="text-white/50" />
          </div>
        </div>
      </section>

      {/* The Concept */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Nano-Optical Technology</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white leading-tight mb-6">
                Vivid off-screen textures. Crystal-clear on-screen visuals.
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                NaturaTex leverages nano-optical technology natively compounded onto COB/MIP surfaces. 
                This guarantees high luminance with minimal light attenuation and exceptionally low reflectivity. 
                The result is a display that looks like premium architectural material when off, 
                and delivers stunning visuals when powered on.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-light text-white">3H</div>
                  <div className="text-neutral-600 text-xs tracking-wider uppercase">Scratch-Resistant</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-white">110°</div>
                  <div className="text-neutral-600 text-xs tracking-wider uppercase">Dust-Proof</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-white">0.5%</div>
                  <div className="text-neutral-600 text-xs tracking-wider uppercase">Reflectivity</div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={1}>
              <img 
                src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/cade2d7819479f9ab07c5c3d99f2360368f6225627a82d1c5e78e96463e19695.png" 
                alt="NaturaTex Technology Layers" 
                className="rounded-sm w-full"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Quick Specs */}
      <section className="py-16 px-6 border-y border-neutral-800 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { value: 'P0.7-P1.8', label: 'Pixel Pitch' },
              { value: '600-800', label: 'Brightness (cd/m²)' },
              { value: '170°/160°', label: 'Viewing Angle' },
              { value: 'COB', label: 'LED Type' },
              { value: '4.3 kg', label: 'Weight/Panel' },
            ].map((spec, i) => (
              <FadeIn key={i} delay={i}>
                <div className="text-2xl font-light text-white">{spec.value}</div>
                <div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Application Scenarios</p>
              <h2 className="text-4xl font-extralight text-white">Transform Any Space</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {APPLICATIONS.map((app, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="group relative overflow-hidden rounded-sm aspect-[3/4]">
                  <img src={app.image} alt={app.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-sm font-medium">{app.name}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Our Advantages</p>
              <h2 className="text-4xl font-extralight text-white">Why NaturaTex</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADVANTAGES.map((adv, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <adv.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-white font-medium mb-2">{adv.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <img 
                src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/6afcc7649717065852dd86a565bc1b10d16ad80324537065bd03c4962adfe4ab.png" 
                alt="Custom Pattern Textures" 
                className="rounded-sm w-full"
              />
            </FadeIn>
            <FadeIn delay={1}>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Customization</p>
              <h2 className="text-3xl font-extralight text-white mb-6">Customize Your Pattern Texture</h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Customizable tile patterns are available with the module as the unit. Whether you want 
                wood grain that flows seamlessly across a wall, or marble patterns that create a 
                dramatic focal point, NaturaTex can be tailored to your exact vision.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Seamless Mapping', desc: 'Patterns flow naturally across multiple panels without visible seams.' },
                  { title: 'Custom Patterns', desc: 'Upload your own designs or choose from our extensive texture library.' },
                  { title: 'Module-Based Units', desc: 'Flexible sizing based on module dimensions for precise installations.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-white mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-medium">{item.title}</h3>
                      <p className="text-neutral-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technical Data</p>
              <h2 className="text-4xl font-extralight text-white">Specifications</h2>
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <div className="border border-neutral-800 rounded-sm overflow-hidden">
              <div className="p-6 bg-neutral-900/50 border-b border-neutral-800">
                <h3 className="text-white font-medium">NaturaTex W Series (COB)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      <th className="text-left p-4 text-neutral-500 font-medium">Specification</th>
                      <th className="text-center p-4 text-neutral-400 font-medium">P0.7</th>
                      <th className="text-center p-4 text-neutral-400 font-medium">P0.9</th>
                      <th className="text-center p-4 text-neutral-400 font-medium">P1.2</th>
                      <th className="text-center p-4 text-neutral-400 font-medium">P1.5</th>
                      <th className="text-center p-4 text-neutral-400 font-medium">P1.8</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Pixel Pitch (mm)', '0.7', '0.9', '1.2', '1.5', '1.8'],
                      ['Pixels Per Panel', '768x432', '640x360', '480x270', '384x216', '320x180'],
                      ['Brightness (cd/m²)', '600-800', '600-800', '600-800', '600-800', '600-800'],
                      ['Viewing Angle (°)', '170/160', '170/160', '170/160', '170/160', '170/160'],
                      ['LED Type', 'COB', 'COB', 'COB', 'COB', 'COB'],
                      ['Material', 'Die-cast Aluminum', 'Die-cast Aluminum', 'Die-cast Aluminum', 'Die-cast Aluminum', 'Die-cast Aluminum'],
                      ['Weight/Panel (kg)', '4.3±0.3', '4.3±0.3', '4.3±0.3', '4.3±0.3', '4.3±0.3'],
                    ].map(([label, ...values], i) => (
                      <tr key={i} className="border-b border-neutral-800/50 last:border-0">
                        <td className="p-4 text-neutral-500">{label}</td>
                        {values.map((val, j) => (
                          <td key={j} className="p-4 text-center text-white">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-neutral-900/30 border-t border-neutral-800 text-center">
                <p className="text-neutral-500 text-xs">
                  Contrast ratio and power consumption vary by texture. Evaluated per specific project.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Support</p>
              <h2 className="text-3xl font-extralight text-white">Frequently Asked Questions</h2>
            </div>
          </FadeIn>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm overflow-hidden">
                  <button
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-neutral-900/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-neutral-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800 pt-4">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* See Also */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Explore More</p>
              <h2 className="text-3xl font-extralight text-white">Other Product Lines</h2>
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <Link to="/lumimorph" className="group block relative overflow-hidden rounded-sm aspect-[21/9]">
              <img src="/artmorph-assets/grande-hero.jpg" alt="LumiMorph" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center px-10 md:px-16">
                <div>
                  <p className="text-neutral-400 text-xs tracking-wider uppercase mb-2">Textured Luminous Panels</p>
                  <h3 className="text-white text-3xl font-light mb-2">LumiMorph</h3>
                  <p className="text-neutral-400 text-sm max-w-md">Beautiful when off. Stunning when on. Explore our full range of textured LED panels.</p>
                </div>
              </div>
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <ArrowRight size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready to Transform Your Space?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Request a demo to experience NaturaTex texture screens. Our specialists will help you choose the perfect texture and configuration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
              Request Demo
            </Link>
            <Link to="/case-studies" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">
              View Projects
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
