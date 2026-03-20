import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Type, Monitor, Layers, Box, Building2, ArrowRight, 
  Sparkles, Eye, Tv, MapPin, Menu, ShoppingBag,
  CheckCircle2, Zap, Globe, Star
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const SignageSolutionsLanding = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { isDark } = useTheme();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products?category=signage-solutions`);
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
    { id: 'all', name: 'All Products', icon: Layers },
    { id: 'channel-letters', name: 'Channel Letters', icon: Type },
    { id: 'menu-boards', name: 'Menu Boards', icon: Menu },
    { id: 'wayfinding', name: 'Wayfinding', icon: MapPin },
    { id: 'transparent-signage', name: 'Transparent', icon: Eye },
    { id: 'specialty-signage', name: 'Specialty', icon: Star },
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.sub_category === activeTab);

  const signageCategories = [
    {
      title: 'LED Channel Letters',
      subtitle: 'Illuminated Storefront Identity',
      desc: 'Front-lit, back-lit (halo), and RGB dynamic letters. 70% energy savings vs neon with 50,000+ hour lifespan.',
      image: '/generated-images/4c07870a12b546f8a1cd9241a89b0fde_frontlit-channel-letters-rgb.png',
      color: 'amber',
      features: ['Custom Sizes 10"-60"', '16M+ RGB Colors', 'UL Certified'],
      link: '/signage-solutions#products',
      filter: 'channel-letters',
    },
    {
      title: 'Digital Menu Boards',
      subtitle: 'Smart Restaurant Displays',
      desc: 'High-brightness menu displays for QSR, drive-thrus, and food courts. Cloud-managed content with real-time updates.',
      image: '/generated-images/412036bc9a394ec0980254f89cf956fa_qsr-digital-menu-board-55.png',
      color: 'cyan',
      features: ['2,500+ nits', 'Cloud CMS', '24/7 Operation'],
      link: '/signage-solutions#products',
      filter: 'menu-boards',
    },
    {
      title: 'Wayfinding & Directory',
      subtitle: 'Interactive Navigation',
      desc: 'Touchscreen kiosks and FIDS displays for malls, airports, and hospitals. Multi-language support with 3D maps.',
      image: '/generated-images/078a54af00b74db4b8a8ca93a6c67d1f_interactive-directory-kiosk.png',
      color: 'violet',
      features: ['Touch Interactive', 'Multi-language', 'BMS Integration'],
      link: '/signage-solutions#products',
      filter: 'wayfinding',
    },
    {
      title: 'Transparent Window LED',
      subtitle: 'See-Through Advertising',
      desc: 'Ultra-thin LED film that turns any window into a dynamic display. 85% transparency maintains natural light.',
      image: '/generated-images/c0a2475cd9d3482491cb404be008acc9_window-led-signage-film.png',
      color: 'emerald',
      features: ['85% Transparent', '4500+ nits', 'Self-Adhesive'],
      link: '/signage-solutions#products',
      filter: 'transparent-signage',
    },
    {
      title: 'Specialty Signage',
      subtitle: 'Industry-Specific Solutions',
      desc: 'Fuel price signs, parking guidance, and custom applications. Remote management for multi-site deployments.',
      image: '/generated-images/8729ab93c262490699e127833612a415_gas-station-price-led-sign.png',
      color: 'rose',
      features: ['Remote Update', 'Fleet Management', 'Weather-Sealed'],
      link: '/signage-solutions#products',
      filter: 'specialty-signage',
    },
    {
      title: 'Pylon & Monument Signs',
      subtitle: 'Landmark Presence',
      desc: 'Tall outdoor wayfinding pylons combining static branding with dynamic LED content. Engineered for 120mph wind loads.',
      image: '/generated-images/5d6d96a16b804a168f50ba1f17d8f8c6_pylon-led-wayfinding-sign.png',
      color: 'orange',
      features: ['10-30ft Heights', '7000 nits', 'Engineered Structure'],
      link: '/signage-solutions#products',
      filter: 'wayfinding',
    },
  ];

  const stats = [
    { value: '31%', label: 'Higher foot traffic' },
    { value: '27%', label: 'Better conversions' },
    { value: '70%', label: 'Energy savings' },
    { value: '50K+', label: 'Hour lifespan' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0f]' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="/generated-images/4c07870a12b546f8a1cd9241a89b0fde_frontlit-channel-letters-rgb.png"
            alt="LED Signage"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-white/70'}`} />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent' : 'bg-gradient-to-r from-white via-white/80 to-transparent'}`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-rose-500/20 border-rose-500/30' : 'bg-rose-100 border-rose-200'} border mb-6`}>
              <ShoppingBag className="w-4 h-4 text-rose-500" />
              <span className={`text-sm font-medium ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>Complete Signage Solutions</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className={isDark ? 'text-white' : 'text-neutral-900'}>Signage That</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500">
                Demands Attention
              </span>
            </h1>

            <p className={`text-xl mb-8 ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
              From illuminated channel letters to viral 3D billboards. Complete LED signage solutions 
              for retail, commercial, and architectural applications.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="#products"
                className={`inline-flex items-center gap-2 px-8 py-4 ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'} font-semibold rounded-full transition-colors`}
              >
                Browse Products
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>{stat.value}</div>
                  <div className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signage Categories Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Complete Signage Ecosystem
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Everything from storefront letters to building-scale media facades. One supplier for all your LED signage needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signageCategories.map((cat, index) => {
              const colorClasses = {
                amber: { bg: isDark ? 'bg-amber-500/10' : 'bg-amber-50', text: isDark ? 'text-amber-400' : 'text-amber-600', border: isDark ? 'border-amber-500/20 hover:border-amber-500/40' : 'border-amber-200 hover:border-amber-400' },
                cyan: { bg: isDark ? 'bg-cyan-500/10' : 'bg-cyan-50', text: isDark ? 'text-cyan-400' : 'text-cyan-600', border: isDark ? 'border-cyan-500/20 hover:border-cyan-500/40' : 'border-cyan-200 hover:border-cyan-400' },
                violet: { bg: isDark ? 'bg-violet-500/10' : 'bg-violet-50', text: isDark ? 'text-violet-400' : 'text-violet-600', border: isDark ? 'border-violet-500/20 hover:border-violet-500/40' : 'border-violet-200 hover:border-violet-400' },
                emerald: { bg: isDark ? 'bg-emerald-500/10' : 'bg-emerald-50', text: isDark ? 'text-emerald-400' : 'text-emerald-600', border: isDark ? 'border-emerald-500/20 hover:border-emerald-500/40' : 'border-emerald-200 hover:border-emerald-400' },
                rose: { bg: isDark ? 'bg-rose-500/10' : 'bg-rose-50', text: isDark ? 'text-rose-400' : 'text-rose-600', border: isDark ? 'border-rose-500/20 hover:border-rose-500/40' : 'border-rose-200 hover:border-rose-400' },
                orange: { bg: isDark ? 'bg-orange-500/10' : 'bg-orange-50', text: isDark ? 'text-orange-400' : 'text-orange-600', border: isDark ? 'border-orange-500/20 hover:border-orange-500/40' : 'border-orange-200 hover:border-orange-400' },
              };
              const colors = colorClasses[cat.color];

              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => {
                      setActiveTab(cat.filter);
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`group block h-full w-full text-left rounded-2xl border ${colors.border} ${isDark ? 'bg-white/[0.02]' : 'bg-white'} overflow-hidden transition-all duration-300 hover:shadow-xl`}
                  >
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img 
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent' : 'bg-gradient-to-t from-white via-transparent to-transparent'}`} />
                    </div>
                    <div className="p-6">
                      <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${colors.bg} ${colors.text}`}>
                        {cat.subtitle}
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{cat.title}</h3>
                      <p className={`text-sm mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{cat.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {cat.features.map((feature) => (
                          <span key={feature} className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${isDark ? 'bg-white/5 text-neutral-400' : 'bg-neutral-100 text-neutral-600'}`}>
                            <CheckCircle2 className="w-3 h-3" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section id="products" className={`py-24 ${isDark ? 'bg-gradient-to-b from-transparent via-rose-950/5 to-transparent' : 'bg-gradient-to-b from-transparent via-rose-50/50 to-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>All Signage Products</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Browse our complete range of LED signage solutions
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
                    ? 'bg-rose-500 text-white'
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
              <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
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
                    className={`group block rounded-2xl border overflow-hidden transition-all duration-300 ${isDark ? 'bg-white/[0.02] border-white/5 hover:border-rose-500/30' : 'bg-white border-neutral-200 hover:border-rose-300 shadow-sm hover:shadow-md'}`}
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
                          <Type className={`w-16 h-16 ${isDark ? 'text-neutral-700' : 'text-neutral-300'}`} />
                        </div>
                      )}
                      {product.pixel_pitch && product.pixel_pitch !== 'N/A (LED modules)' && (
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-rose-500/90 text-white text-xs font-medium">
                          {product.pixel_pitch}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className={`text-lg font-semibold mb-1 group-hover:text-rose-500 transition-colors ${isDark ? 'text-white' : 'text-neutral-900'}`}>
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

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-3xl border p-12 text-center ${isDark ? 'bg-gradient-to-br from-rose-950/50 to-orange-950/50 border-rose-500/20' : 'bg-gradient-to-br from-rose-100 to-orange-100 border-rose-200'}`}
          >
            <div className="relative">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Ready to Transform Your Storefront?
              </h2>
              <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                From design consultation to installation, our team delivers complete signage solutions
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-colors ${isDark ? 'bg-white text-rose-900 hover:bg-neutral-100' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
                >
                  Get Free Quote
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

export default SignageSolutionsLanding;
