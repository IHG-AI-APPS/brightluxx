import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Tv, Home, Palmtree, Ship, Sparkles, ArrowRight, 
  Play, Star, Shield, Wifi, Volume2, Cpu, Layers
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const LuxuryHomeCinemaLanding = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { isDark } = useTheme();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products?category=luxury-home-cinema`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || data || []);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const subcategories = [
    { id: 'all', name: 'All Products', icon: Tv },
    { id: 'microled-premium', name: 'MicroLED Premium', icon: Cpu },
    { id: 'indoor-cinema', name: 'Indoor Cinema', icon: Home },
    { id: 'outdoor-cinema', name: 'Outdoor Cinema', icon: Palmtree },
    { id: 'deployable', name: 'Deployable', icon: Layers },
    { id: 'marine-cinema', name: 'Yacht & Marine', icon: Ship },
    { id: 'lifestyle-display', name: 'Lifestyle', icon: Sparkles },
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.sub_category === activeTab);

  const techHighlights = [
    { value: '2000', unit: 'nits', label: 'Peak HDR Brightness' },
    { value: '48', unit: 'bit', label: 'Color Depth' },
    { value: '8K+', unit: '', label: 'Resolution Ready' },
    { value: '100K', unit: 'hrs', label: 'Lifespan' },
  ];

  const features = [
    { icon: Star, title: 'Dolby Vision IQ', desc: 'True HDR cinema' },
    { icon: Shield, title: 'ISF Certified', desc: 'Reference calibration' },
    { icon: Wifi, title: 'Smart Home', desc: 'Control4, Crestron' },
    { icon: Volume2, title: 'Atmos Ready', desc: 'Immersive audio' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0f]' : 'bg-neutral-50'}`}>
      {/* Hero Section - Full Width Video */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://files.ihgbrands.com/brightluxx/videos/home-cinema-hero.mp4" type="video/mp4" />
          </video>
          {/* Overlay */}
          <div className={`absolute inset-0 ${isDark ? 'bg-black/50' : 'bg-white/60'}`} />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-[#0a0a0f] via-transparent to-transparent' : 'bg-gradient-to-r from-white via-transparent to-transparent'}`} />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent' : 'bg-gradient-to-t from-neutral-50 via-transparent to-transparent'}`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-amber-500/20 border-amber-500/30' : 'bg-amber-100 border-amber-200'} border mb-6`}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className={`text-sm font-medium ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>MicroLED Technology</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className={isDark ? 'text-white' : 'text-neutral-900'}>The Ultimate</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                Private Cinema
              </span>
            </h1>

            <p className={`text-xl mb-10 max-w-xl ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
              Experience cinema like never before. Self-emitting MicroLED delivers infinite contrast, 
              2000 nits HDR, and true blacks that projectors cannot match.
            </p>

            {/* Tech Stats */}
            <div className="grid grid-cols-4 gap-4 mb-10">
              {techHighlights.map((stat) => (
                <div key={stat.label} className={`text-center p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white/80'}`}>
                  <div className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                    {stat.value}<span className="text-base">{stat.unit}</span>
                  </div>
                  <div className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/25"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className={`inline-flex items-center gap-2 px-8 py-4 ${isDark ? 'bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20' : 'bg-white/80 backdrop-blur border-neutral-200 text-neutral-900 hover:bg-white'} border font-semibold rounded-full transition-colors`}>
                <Play className="w-5 h-5" />
                Watch Showreel
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className={`py-8 border-y ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-neutral-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${isDark ? 'bg-amber-500/10' : 'bg-amber-100'}`}>
                  <feature.icon className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>{feature.title}</div>
                  <div className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Showcase - Better Layout */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Designed For Every Space
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              From dedicated screening rooms to poolside entertainment, our solutions transform any environment
            </p>
          </motion.div>

          {/* New Layout: 2 Featured + 2 Below */}
          <div className="space-y-6">
            {/* Top Row - 2 Large Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`group relative overflow-hidden rounded-3xl ${isDark ? 'bg-gradient-to-br from-amber-950/30 to-neutral-900' : 'bg-gradient-to-br from-amber-50 to-white'} border ${isDark ? 'border-amber-500/20' : 'border-amber-200'}`}
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src="https://files.ihgbrands.com/brightluxx/downloaded-images/ext_561c5bef4c25.jpg"
                    alt="MicroLED Home Theater"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent' : 'bg-gradient-to-t from-white via-white/60 to-transparent'}`} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
                    FLAGSHIP
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>MicroLED Home Theater</h3>
                  <p className={`mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    146" to 219"+ screens with infinite contrast, self-emitting pixels, and true cinema blacks
                  </p>
                  <Link to="/products?category=luxury-home-cinema&sub=microled-premium" className={`inline-flex items-center gap-2 font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'} group-hover:gap-3 transition-all`}>
                    Explore MicroLED <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`group relative overflow-hidden rounded-3xl ${isDark ? 'bg-gradient-to-br from-cyan-950/30 to-neutral-900' : 'bg-gradient-to-br from-cyan-50 to-white'} border ${isDark ? 'border-cyan-500/20' : 'border-cyan-200'}`}
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src="https://files.ihgbrands.com/brightluxx/downloaded-images/ext_abcbb01ad8da.jpg"
                    alt="Outdoor Pool Cinema"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent' : 'bg-gradient-to-t from-white via-white/60 to-transparent'}`} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'}`}>
                    8000 NITS
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>Outdoor & Poolside</h3>
                  <p className={`mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    IP67 weatherproof displays with 8000 nits brightness for perfect daylight viewing
                  </p>
                  <Link to="/products?category=luxury-home-cinema&sub=outdoor-cinema" className={`inline-flex items-center gap-2 font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-600'} group-hover:gap-3 transition-all`}>
                    Explore Outdoor <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Bottom Row - 2 Medium Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`group relative overflow-hidden rounded-2xl ${isDark ? 'bg-white/[0.02]' : 'bg-white'} border ${isDark ? 'border-white/5 hover:border-violet-500/30' : 'border-neutral-200 hover:border-violet-300'} transition-all`}
              >
                <div className="flex items-stretch">
                  <div className="w-2/5 aspect-square overflow-hidden">
                    <img 
                      src="https://files.ihgbrands.com/brightluxx/downloaded-images/ext_c66d286d5af0.jpg"
                      alt="Yacht Cinema"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="w-3/5 p-6 flex flex-col justify-center">
                    <div className={`inline-flex w-fit px-2 py-1 rounded-full text-xs font-medium mb-2 ${isDark ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-100 text-violet-700'}`}>
                      MARINE GRADE
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>Superyacht Entertainment</h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      Deployable MicroLED systems for 40m+ vessels with marine certifications
                    </p>
                    <Link to="/products?category=luxury-home-cinema&sub=marine-cinema" className={`inline-flex items-center gap-2 text-sm font-semibold ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`group relative overflow-hidden rounded-2xl ${isDark ? 'bg-white/[0.02]' : 'bg-white'} border ${isDark ? 'border-white/5 hover:border-emerald-500/30' : 'border-neutral-200 hover:border-emerald-300'} transition-all`}
              >
                <div className="flex items-stretch">
                  <div className="w-2/5 aspect-square overflow-hidden">
                    <img 
                      src="https://files.ihgbrands.com/brightluxx/downloaded-images/ext_064dc9d6ca09.jpg"
                      alt="Deployable Screen"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="w-3/5 p-6 flex flex-col justify-center">
                    <div className={`inline-flex w-fit px-2 py-1 rounded-full text-xs font-medium mb-2 ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                      DEPLOYABLE
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>RiseScreen Technology</h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      201" screens that rise from underground in 30 seconds with 180° rotation
                    </p>
                    <Link to="/products?category=luxury-home-cinema&sub=deployable" className={`inline-flex items-center gap-2 text-sm font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className={`py-24 ${isDark ? 'bg-gradient-to-b from-transparent via-amber-950/5 to-transparent' : 'bg-gradient-to-b from-transparent via-amber-50/50 to-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>Complete Collection</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              From entry-level to bespoke installations worth $1M+
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {subcategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === cat.id
                    ? 'bg-amber-500 text-white'
                    : isDark 
                      ? 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                      : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/products/${product.slug}`}
                    className={`group block rounded-2xl border overflow-hidden transition-all duration-300 ${isDark ? 'bg-white/[0.02] border-white/5 hover:border-amber-500/30' : 'bg-white border-neutral-200 hover:border-amber-300 shadow-sm hover:shadow-md'}`}
                  >
                    <div className={`aspect-[4/3] relative overflow-hidden ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Tv className={`w-16 h-16 ${isDark ? 'text-neutral-700' : 'text-neutral-300'}`} />
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="px-2 py-1 rounded-full bg-amber-500/90 text-white text-xs font-medium">
                          {product.pixel_pitch}
                        </span>
                        {product.screen_sizes && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-black/50 text-white' : 'bg-white/90 text-neutral-700'}`}>
                            {product.screen_sizes}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className={`text-lg font-semibold mb-1 group-hover:text-amber-500 transition-colors ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        {product.name}
                      </h3>
                      <p className={`text-sm line-clamp-2 mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.features?.slice(0, 3).map((feature) => (
                          <span key={feature} className={`px-2 py-1 rounded-md text-xs ${isDark ? 'bg-white/5 text-neutral-400' : 'bg-neutral-100 text-neutral-600'}`}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products?category=luxury-home-cinema"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-3xl border p-12 text-center ${isDark ? 'bg-gradient-to-br from-amber-950/50 to-orange-950/50 border-amber-500/20' : 'bg-gradient-to-br from-amber-100 to-orange-100 border-amber-200'}`}
          >
            <div className="relative">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                White Glove Service
              </h2>
              <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                From consultation to ISF calibration, our team delivers a complete luxury experience
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-colors ${isDark ? 'bg-white text-amber-900 hover:bg-neutral-100' : 'bg-amber-600 text-white hover:bg-amber-700'}`}
                >
                  Schedule Home Visit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LuxuryHomeCinemaLanding;
