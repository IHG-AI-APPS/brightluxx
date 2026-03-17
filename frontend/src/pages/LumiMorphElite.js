import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Zap, Shield, Eye, Ruler, Sun, Palette, Settings, Wrench, ChevronDown, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

const useInView = (ref, threshold = 0.15) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
};

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden
    ${hover ? 'hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

// Texture Collections Data
const TEXTURE_COLLECTIONS = [
  { id: 'wood', name: 'Wood', description: 'Experience the timeless elegance and warmth of natural wood textures.', image: '/artmorph-assets/app-office.png' },
  { id: 'stone', name: 'Stone', description: 'Discover the enduring strength and beauty of refined stone surfaces.', image: '/artmorph-assets/app-lobby.png' },
  { id: 'textile', name: 'Textile', description: 'Embrace the soft sophistication and comfort of luxurious textile finishes.', image: '/artmorph-assets/app-restaurant.png' },
  { id: 'metal', name: 'Metal', description: 'Admire the sleek modernity and shine of contemporary metal designs.', image: '/artmorph-assets/app-reception.png' },
];

// Applications Data
const APPLICATIONS = [
  { name: 'Hotel Lobbies', image: '/artmorph-assets/app-lobby.png' },
  { name: 'Corporate Reception', image: '/artmorph-assets/app-reception.png' },
  { name: 'Restaurants & Bars', image: '/artmorph-assets/app-restaurant.png' },
  { name: 'Retail Stores', image: '/artmorph-assets/app-retail.png' },
  { name: 'Executive Offices', image: '/artmorph-assets/app-office.png' },
];

// FAQ Data
const FAQS = [
  {
    q: 'What makes LumiMorph Elite different from traditional LED displays?',
    a: 'LumiMorph Elite combines high-definition LED technology with customizable textured covers, creating displays that enhance spaces whether powered on or off. The textured surface diffuses light beautifully while maintaining visual clarity.'
  },
  {
    q: 'Can the texture covers be changed after installation?',
    a: 'Yes! The magnetic cover system allows for quick and easy replacement. This is ideal for hotels and retail environments where you may want to update aesthetics to match seasonal themes or rebranding.'
  },
  {
    q: 'What is the viewing distance for LumiMorph Elite?',
    a: 'With P2.6 pixel pitch and over 140,000 pixels per square meter, LumiMorph Elite is optimized for close-range viewing from 2-10 meters, making it perfect for lobbies, reception areas, and intimate spaces.'
  },
  {
    q: 'How is content controlled and managed?',
    a: 'LumiMorph Elite includes an intuitive control system with pre-set dynamic content, lighting effects, and the ability to synchronize multiple panels remotely. It supports dual HDMI inputs and MP4 video content.'
  },
  {
    q: 'What warranty is provided?',
    a: 'All LumiMorph Elite installations come with a comprehensive 5-year manufacturer warranty covering both the LED modules and the control system.'
  },
];

export default function LumiMorphElite() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTexture, setActiveTexture] = useState('wood');
  const [openFaq, setOpenFaq] = useState(null);
  const videoRef = useRef(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-[#050508] min-h-screen" data-testid="lumimorph-elite-page">
      <SEO
        title="LumiMorph Elite — Textured LED Display Panels | Brightluxx UAE"
        description="Transform spaces with LumiMorph Elite - premium textured LED panels that combine high-definition displays with customizable natural textures. Perfect for hotels, corporate spaces, and luxury retail."
        path="/lumimorph-elite"
      />

      {/* Hero Section with Video */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/artmorph-assets/hero-video-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/30" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl"
            >
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Introducing</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white mb-4">
                LumiMorph
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">Elite</span>
              </h1>
              <p className="text-xl text-cyan-400 font-medium mb-4">Closer. Clearer. Bolder.</p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                A textured luminous panel that integrates natural textures with high-definition animated LED displays, offering refined clarity ideal for close-range viewing.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/contact" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 text-sm"
                >
                  Request Demo <ArrowRight size={18} />
                </Link>
                <button 
                  onClick={toggleVideo}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-cyan-500/50 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2 text-sm"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  {isPlaying ? 'Pause Video' : 'Play Video'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white/50" />
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Transform Your Space</span>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                Beautiful When Off. <span className="text-cyan-400">Stunning When On.</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Lighting should enhance a space whether on or off. That's why we created LumiMorph - displays that look like premium architectural finishes when inactive, and transform into vivid visual experiences when powered on.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden group">
                <img src="/artmorph-assets/workspace-before.png" alt="Before - Display Off" className="w-full h-80 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-white font-bold uppercase tracking-wider">Display Off</span>
                  <p className="text-gray-300 text-sm">Natural wood texture blends seamlessly with interior design</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group">
                <img src="/artmorph-assets/workspace-after.png" alt="After - Display On" className="w-full h-80 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider">Display On</span>
                  <p className="text-gray-300 text-sm">High-definition visuals shine through the textured surface</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Premium Performance</span>
                <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-6">
                  High-Resolution Clarity
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8">
                  With a pixel pitch of P2.6 and over 140,000 pixels per square meter, LumiMorph Elite delivers exceptional resolution, richer color saturation, and stronger contrast. Designed for premium spaces, it makes every text, line, and visual stand out with precision.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <GlassCard className="p-5" hover={false}>
                    <Sun size={24} className="text-cyan-400 mb-3" />
                    <div className="text-2xl font-bold text-white">3,800 nits</div>
                    <div className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Max Brightness</div>
                  </GlassCard>
                  <GlassCard className="p-5" hover={false}>
                    <Ruler size={24} className="text-cyan-400 mb-3" />
                    <div className="text-2xl font-bold text-white">P2.6mm</div>
                    <div className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Pixel Pitch</div>
                  </GlassCard>
                  <GlassCard className="p-5" hover={false}>
                    <Eye size={24} className="text-cyan-400 mb-3" />
                    <div className="text-2xl font-bold text-white">147,456</div>
                    <div className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Pixels/m²</div>
                  </GlassCard>
                  <GlassCard className="p-5" hover={false}>
                    <Zap size={24} className="text-cyan-400 mb-3" />
                    <div className="text-2xl font-bold text-white">60W</div>
                    <div className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Avg Power/Panel</div>
                  </GlassCard>
                </div>
              </div>
              
              <div className="relative">
                <img src="/artmorph-assets/high-clarity.jpg" alt="High Resolution Clarity" className="rounded-2xl w-full" />
                <div className="absolute -bottom-6 -right-6 bg-cyan-500 text-black p-6 rounded-xl">
                  <div className="text-3xl font-bold">5-Year</div>
                  <div className="text-sm font-bold uppercase tracking-wider">Warranty</div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Texture Collections */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Customizable Covers</span>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                Endless <span className="text-cyan-400">Possibilities</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Featuring over 200 exquisite texture collections. Effortlessly adaptable and infinitely customizable, our textured luminous panels blend seamlessly into any environment.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={1}>
            <div className="grid md:grid-cols-4 gap-4">
              {TEXTURE_COLLECTIONS.map((texture) => (
                <div 
                  key={texture.id}
                  className={`group cursor-pointer relative rounded-xl overflow-hidden h-72 transition-all duration-500 ${
                    activeTexture === texture.id ? 'ring-2 ring-cyan-500' : ''
                  }`}
                  onClick={() => setActiveTexture(texture.id)}
                >
                  <img src={texture.image} alt={texture.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-bold text-white mb-1">{texture.name}</h3>
                    <p className="text-xs text-gray-400">{texture.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay={2}>
            <div className="mt-8 text-center">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider hover:text-cyan-300 transition-colors"
              >
                Request Custom Texture Samples <ArrowRight size={16} />
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Easy Installation */}
      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <img src="/artmorph-assets/installation.png" alt="Modular Installation" className="rounded-2xl w-full" />
            </FadeInSection>
            
            <FadeInSection delay={1}>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Simple Setup</span>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-6">
                Effortless Modular Installation
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                With its modular design, simply mount the frame onto the wall, attach the panels with built-in power magnets, and you're all set. Front-access maintenance allows quick servicing without disturbing the entire installation.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Settings, title: 'Magnetic Mounting', desc: 'Built-in power magnets for quick panel attachment' },
                  { icon: Wrench, title: 'Front-Access Repair', desc: 'Individual modules can be replaced without taking down the display' },
                  { icon: Palette, title: 'Easy Cover Swap', desc: 'Change textures in minutes to match new décor or branding' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Applications Gallery */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Get Inspired</span>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                Perfect For Any <span className="text-cyan-400">Environment</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                From luxury hotels to corporate headquarters, LumiMorph Elite transforms any space into an immersive visual experience.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={1}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {APPLICATIONS.map((app, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden h-64">
                  <img src={app.image} alt={app.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-sm">{app.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Technical Data</span>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
                Product Specifications
              </h2>
            </div>
          </FadeInSection>

          <FadeInSection delay={1}>
            <GlassCard className="overflow-hidden" hover={false}>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                <div className="p-8 space-y-4">
                  <h3 className="text-cyan-400 font-bold uppercase tracking-wider mb-6">Display</h3>
                  {[
                    ['Product', 'LumiMorph Elite'],
                    ['Pixel Pitch', '2.6 mm'],
                    ['Brightness (Max)', '3,800 nits (no surface)'],
                    ['Brightness (with Surface)', '800-1,200 nits'],
                    ['Pixels/Panel', '192 x 192'],
                    ['Pixels/m²', '147,456'],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400 text-sm">{label}</span>
                      <span className="text-white font-medium text-sm">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-cyan-400 font-bold uppercase tracking-wider mb-6">Physical</h3>
                  {[
                    ['Panel Size', '500 x 500 x 72.2 mm'],
                    ['Module Size', '250 x 250 x 19.2 mm'],
                    ['Weight/Panel', '5.6 kg'],
                    ['Power (Max/Avg/Standby)', '120W / 60W / 2.5W'],
                    ['IP Rating', 'Indoor'],
                    ['Operating Temp', '-20°C to 45°C'],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400 text-sm">{label}</span>
                      <span className="text-white font-medium text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-white/[0.02] border-t border-white/10 flex flex-wrap items-center justify-center gap-6">
                <span className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Certifications:</span>
                {['CE', 'FCC', 'ETL', 'RoHS', 'CB', 'UKCA'].map((cert, i) => (
                  <span key={i} className="text-xs text-gray-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">{cert}</span>
                ))}
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Common Questions</span>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeInSection>

          <FadeInSection delay={1}>
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQS.map((faq, i) => (
                <GlassCard key={i} className="overflow-hidden" hover={false}>
                  <button
                    className="w-full p-6 text-left flex items-center justify-between"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-white font-bold pr-4">{faq.q}</span>
                    <ChevronDown 
                      size={20} 
                      className={`text-cyan-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="relative rounded-3xl overflow-hidden">
              <img src="/artmorph-assets/room-setting.jpg" alt="LumiMorph Elite Room Setting" className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/80 to-transparent" />
              
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-xl px-10 lg:px-16">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Transform Your Space</span>
                  <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                    Ready to Experience LumiMorph Elite?
                  </h2>
                  <p className="text-gray-300 mb-8">
                    Request a demo to see how textured LED panels can transform your project. Our specialists will help you choose the perfect texture and configuration.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      to="/contact" 
                      className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 text-sm"
                    >
                      Request Demo <ArrowRight size={18} />
                    </Link>
                    <Link 
                      to="/case-studies" 
                      className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-cyan-500/50 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2 text-sm"
                    >
                      View Projects <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
