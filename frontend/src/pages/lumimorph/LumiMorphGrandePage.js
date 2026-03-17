import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Play, Pause, ChevronDown, Check } from 'lucide-react';
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

const TEXTURES = [
  { id: 'wood', name: 'Wood', desc: 'Timeless elegance and warmth of natural wood textures.', image: '/artmorph-assets/app-office.png' },
  { id: 'stone', name: 'Stone', desc: 'Enduring strength and beauty of refined stone surfaces.', image: '/artmorph-assets/app-lobby.png' },
  { id: 'textile', name: 'Textile', desc: 'Soft sophistication and comfort of luxurious textile finishes.', image: '/artmorph-assets/app-restaurant.png' },
  { id: 'metal', name: 'Metal', desc: 'Sleek modernity and shine of contemporary metal designs.', image: '/artmorph-assets/app-reception.png' },
];

const FAQS = [
  { q: 'What is the optimal viewing distance for Grande?', a: 'With P6.2 pixel pitch, Grande is optimized for viewing distances of 5-30 meters, making it ideal for large lobbies, atriums, and expansive wall installations.' },
  { q: 'How does Grande compare to Elite?', a: 'Grande uses P6.2 pixel pitch vs Elite\'s P2.6, making it more cost-effective for large-scale installations where viewers are further away. Both share the same texture covers and control system.' },
  { q: 'Can Grande panels be combined with Mini?', a: 'Yes, Grande Mini (P6.2) can be used alongside Grande for creative layouts and filling smaller spaces. They share the same frame system and surface options.' },
  { q: 'What is the maximum installation size?', a: 'There is no practical limit. Our modular system allows for wall-covering installations of any size. We have completed installations exceeding 100 square meters.' },
];

export default function LumiMorphGrande() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="lumimorph-grande-page">
      <SEO
        title="LumiMorph Grande — Large-Scale Textured LED Walls | Brightluxx"
        description="P6.2 pixel pitch, 4,500 nits brightness. For expansive walls and immersive installations, Grande delivers strong visual impact at scale with optimal cost-efficiency."
        path="/lumimorph/grande"
      />

      {/* Hero */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/artmorph-assets/grande-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/20 to-neutral-950" />
        </div>

        <div className="relative h-full flex flex-col">
          <div className="pt-8 px-6 md:px-12">
            <Link to="/lumimorph" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors">
              <ArrowLeft size={16} /> All Products
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center text-center px-6">
            <div>
              <FadeIn>
                <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase mb-4">LumiMorph</p>
              </FadeIn>
              <FadeIn delay={1}>
                <h1 className="text-5xl md:text-7xl font-extralight text-white tracking-tight mb-2">Grande</h1>
              </FadeIn>
              <FadeIn delay={2}>
                <p className="text-xl text-neutral-300 font-light mb-8">Living Walls, Immersive Stories.</p>
              </FadeIn>
              <FadeIn delay={3}>
                <p className="text-neutral-500 max-w-lg mx-auto mb-10">
                  For expansive walls and immersive installations, Grande delivers strong visual impact at scale with optimal cost-efficiency.
                </p>
              </FadeIn>
              <FadeIn delay={4}>
                <div className="flex justify-center gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
                    Request Demo
                  </Link>
                  <button onClick={toggleVideo} className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors flex items-center gap-2">
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={24} className="text-white/50" />
          </div>
        </div>
      </section>

      {/* Quick Specs */}
      <section className="py-16 px-6 border-b border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '4,500', unit: 'nits', label: 'Max Brightness' },
              { value: 'P6.2', unit: 'mm', label: 'Pixel Pitch' },
              { value: '25,600', unit: '/m²', label: 'Pixels' },
              { value: '60W', unit: 'avg', label: 'Power/Panel' },
            ].map((spec, i) => (
              <FadeIn key={i} delay={i}>
                <div className="text-3xl font-light text-white">{spec.value}<span className="text-lg text-neutral-500">{spec.unit}</span></div>
                <div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Large Scale Feature */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Scale & Impact</p>
              <h2 className="text-3xl font-extralight text-white mb-6">Built for Immersive Installations</h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Grande is designed for large-format applications where visual impact matters most. The P6.2 pixel pitch 
                provides excellent image quality from typical viewing distances of 5-30 meters, while the larger pixel pitch 
                makes it significantly more cost-effective for expansive installations.
              </p>
              <div className="space-y-3">
                {['Optimal for 5-30m viewing distance', 'Cost-effective for large installations', 'Same texture covers as Elite', '4,500 nits maximum brightness'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-neutral-300">
                    <Check size={16} className="text-white" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={1}>
              <img src="/artmorph-assets/grande-hero.jpg" alt="Large Scale" className="rounded-sm w-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Textures */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Customization</p>
              <h2 className="text-4xl font-extralight text-white mb-4">200+ Texture Options</h2>
              <p className="text-neutral-500 max-w-lg mx-auto">
                Same texture library as Elite. Effortlessly adaptable and infinitely customizable.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-4">
            {TEXTURES.map((texture, i) => (
              <FadeIn key={texture.id} delay={i + 1}>
                <div className="group relative overflow-hidden rounded-sm aspect-[3/4]">
                  <img src={texture.image} alt={texture.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-medium mb-1">{texture.name}</h3>
                    <p className="text-neutral-400 text-xs">{texture.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <img src="/artmorph-assets/grande-install-1.png" alt="Installation" className="rounded-sm w-full" />
            </FadeIn>
            <FadeIn delay={1}>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Simple Setup</p>
              <h2 className="text-3xl font-extralight text-white mb-6">Effortless Modular Installation</h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                The modular design allows quick and easy front-access maintenance. Individual modules can be replaced 
                or serviced without disturbing the entire installation, reducing downtime and maintenance costs.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Modular Frame System', desc: 'Mount the frame, attach panels with power magnets' },
                  { title: 'Front-Access Service', desc: 'Replace modules without taking down the display' },
                  { title: 'Flexible Mounting', desc: 'Wall mounting, hanging, or ceiling installation' },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-neutral-700 pl-4">
                    <h3 className="text-white font-medium mb-1">{item.title}</h3>
                    <p className="text-neutral-500 text-sm">{item.desc}</p>
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
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
                <div className="p-8">
                  <h3 className="text-white font-medium uppercase tracking-wider text-sm mb-6">Display</h3>
                  {[
                    ['Product', 'LumiMorph Grande'],
                    ['Pixel Pitch', '6.2 mm'],
                    ['Max Brightness', '4,500 nits (no surface)'],
                    ['With Surface', '800-1,200 nits'],
                    ['Pixels/Panel', '80 x 80'],
                    ['Pixels/m²', '25,600'],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-neutral-800/50 last:border-0">
                      <span className="text-neutral-500 text-sm">{label}</span>
                      <span className="text-white text-sm">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="p-8">
                  <h3 className="text-white font-medium uppercase tracking-wider text-sm mb-6">Physical</h3>
                  {[
                    ['Panel Size', '500 x 500 x 77.8 mm'],
                    ['Module Size', '250 x 250 x 24.8 mm'],
                    ['Weight/Panel', '7 kg'],
                    ['Power (Max/Avg)', '120W / 60W'],
                    ['IP Rating', 'Indoor'],
                    ['Operating Temp', '-20°C to 45°C'],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-neutral-800/50 last:border-0">
                      <span className="text-neutral-500 text-sm">{label}</span>
                      <span className="text-white text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-neutral-900/50 border-t border-neutral-800 flex flex-wrap items-center justify-center gap-4">
                <span className="text-neutral-600 text-xs tracking-wider uppercase">Certifications:</span>
                {['CE', 'FCC', 'ETL', 'CCC', 'RoHS', 'WEEE', 'CB', 'UKCA'].map(cert => (
                  <span key={cert} className="text-neutral-400 text-xs px-3 py-1 border border-neutral-700 rounded-sm">{cert}</span>
                ))}
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

      {/* Other Products */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Explore More</p>
              <h2 className="text-3xl font-extralight text-white">Other Products</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'LumiMorph Elite', tagline: 'Closer. Clearer. Bolder.', image: '/artmorph-assets/workspace-after.png', link: '/lumimorph/elite' },
              { name: 'LumiMorph Mini', tagline: 'Small Scale. Infinite Possibilities', image: '/artmorph-assets/mini-hero.jpg', link: '/lumimorph/mini' },
            ].map((product, i) => (
              <FadeIn key={i} delay={i + 1}>
                <Link to={product.link} className="group block relative overflow-hidden rounded-sm aspect-video">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-neutral-400 text-xs tracking-wider uppercase mb-1">{product.tagline}</p>
                    <h3 className="text-white text-xl font-light">{product.name}</h3>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready to Transform Your Space?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Request a demo to experience LumiMorph Grande. Perfect for large-scale immersive installations.
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
