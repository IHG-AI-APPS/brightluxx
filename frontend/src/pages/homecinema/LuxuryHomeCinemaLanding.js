import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Tv, Home, Palmtree, Ship, Sparkles, ArrowRight, 
  Play, CheckCircle2, Star, Shield, Wifi, Volume2,
  Sun, Moon, Waves, TreePine
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
    { id: 'indoor-cinema', name: 'Indoor Cinema', icon: Home },
    { id: 'outdoor-cinema', name: 'Outdoor Cinema', icon: Palmtree },
    { id: 'marine-cinema', name: 'Yacht & Marine', icon: Ship },
    { id: 'lifestyle-display', name: 'Lifestyle', icon: Sparkles },
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.subcategory === activeTab);

  const features = [
    { icon: Star, title: 'Dolby Vision & HDR10+', desc: 'Cinema-grade picture quality' },
    { icon: Shield, title: 'ISF Certified', desc: 'Professional color calibration' },
    { icon: Wifi, title: 'Smart Home Ready', desc: 'Control4, Crestron, Savant' },
    { icon: Volume2, title: 'Dolby Atmos Ready', desc: 'Immersive audio integration' },
  ];

  const lifestyleImages = [
    {
      title: 'Indoor Home Theater',
      desc: 'Dedicated cinema rooms with reference-grade displays',
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&fit=crop',
      icon: Home,
    },
    {
      title: 'Poolside Entertainment',
      desc: 'Weather-resistant outdoor screens for resort-style living',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&fit=crop',
      icon: Waves,
    },
    {
      title: 'Garden Cinema',
      desc: 'Transform your garden into an open-air theater',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop',
      icon: TreePine,
    },
    {
      title: 'Yacht Entertainment',
      desc: 'Marine-certified displays for luxury vessels',
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&fit=crop',
      icon: Ship,
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0f]' : 'bg-neutral-50'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-amber-950/30 via-[#0a0a0f] to-[#0a0a0f]' : 'bg-gradient-to-br from-amber-100/50 via-white to-white'}`} />
          <div className={`absolute top-0 right-0 w-1/2 h-full ${isDark ? 'bg-gradient-to-l from-amber-900/10 to-transparent' : 'bg-gradient-to-l from-amber-100/30 to-transparent'}`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-100 border-amber-200'} border mb-6`}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className={`text-sm font-medium ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>Luxury Home Cinema</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className={isDark ? 'text-white' : 'text-neutral-900'}>Cinema Experience,</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                At Home
              </span>
            </h1>

            <p className={`text-xl mb-8 max-w-xl ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Transform your residence into an entertainment masterpiece with our premium LED cinema solutions. 
              From intimate screening rooms to grand outdoor theaters.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
              >
                Request Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className={`inline-flex items-center gap-2 px-8 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-100'} border font-semibold rounded-full transition-colors`}>
                <Play className="w-5 h-5" />
                View Showreel
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className={`aspect-video rounded-2xl overflow-hidden ${isDark ? 'bg-neutral-900' : 'bg-neutral-200'} shadow-2xl`}>
              <img 
                src="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&fit=crop" 
                alt="Luxury Home Cinema"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black/60 via-transparent to-transparent' : 'bg-gradient-to-t from-white/40 via-transparent to-transparent'}`} />
            </div>
            {/* Floating badge */}
            <div className={`absolute -bottom-4 -left-4 px-6 py-3 rounded-xl ${isDark ? 'bg-amber-500/20 border-amber-500/30 backdrop-blur-sm' : 'bg-amber-100 border-amber-200'} border`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>8K</div>
              <div className={`text-xs ${isDark ? 'text-amber-300/70' : 'text-amber-700'}`}>Resolution Ready</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className={`py-12 border-y ${isDark ? 'border-white/5 bg-white/[0.01]' : 'border-neutral-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl ${isDark ? 'bg-amber-500/10' : 'bg-amber-100'}`}>
                  <feature.icon className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{feature.title}</div>
                  <div className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>{feature.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Every Space, A Cinema
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              From dedicated screening rooms to poolside entertainment, our solutions adapt to your lifestyle.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifestyleImages.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl ${isDark ? 'bg-white/[0.02]' : 'bg-white'} border ${isDark ? 'border-white/5 hover:border-amber-500/30' : 'border-neutral-200 hover:border-amber-300'} transition-all duration-500`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent' : 'bg-gradient-to-t from-white via-white/50 to-transparent'}`} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className={`inline-flex p-2 rounded-lg ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'} mb-3`}>
                    <item.icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{item.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
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
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>Our Home Cinema Collection</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Curated selection of premium LED displays for discerning homeowners.
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
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2 py-1 rounded-full bg-amber-500/80 text-white text-xs font-medium">
                          {product.pixel_pitch}
                        </span>
                        {product.screen_sizes && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-black/50 text-white' : 'bg-white/80 text-neutral-700'}`}>
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
              View All Home Cinema Products
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
                White Glove Installation Service
              </h2>
              <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Our expert team handles everything from consultation and design to installation and calibration. 
                Experience true luxury service.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-colors ${isDark ? 'bg-white text-amber-900 hover:bg-neutral-100' : 'bg-amber-600 text-white hover:bg-amber-700'}`}
                >
                  Schedule Home Visit
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/case-studies"
                  className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-colors ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-amber-700 hover:bg-neutral-50 border border-amber-200'}`}
                >
                  View Installations
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
