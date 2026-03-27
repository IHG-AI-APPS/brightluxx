import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Type, Monitor, Layers, Box, Building2, ArrowRight, 
  Sparkles, Eye, Tv, MapPin, Menu, ShoppingBag,
  CheckCircle2, Zap, Globe, Star, Send, Loader2
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const SignageSolutionsLanding = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { isDark } = useTheme();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    signage_type: '',
    quantity: '',
    letter_height: '',
    illumination: '',
    material: '',
    display_size: '',
    location: '',
    installation_address: '',
    timeline: '',
    budget_range: '',
    project_brief: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');
    
    try {
      const res = await fetch(`${API_URL}/api/signage-inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setFormSubmitted(true);
        setFormData({
          name: '', company: '', email: '', phone: '',
          signage_type: '', quantity: '', letter_height: '',
          illumination: '', material: '', display_size: '',
          location: '', installation_address: '', timeline: '',
          budget_range: '', project_brief: ''
        });
      } else {
        setFormError('Failed to submit. Please try again.');
      }
    } catch (err) {
      setFormError('Network error. Please try again.');
    } finally {
      setFormSubmitting(false);
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
      image: '/downloaded-images/ext_242cba1e45fb.jpg',
      color: 'amber',
      features: ['Custom Sizes 10"-60"', '16M+ RGB Colors', 'UL Certified'],
      link: '/signage-solutions#products',
      filter: 'channel-letters',
    },
    {
      title: 'Digital Menu Boards',
      subtitle: 'Smart Restaurant Displays',
      desc: 'High-brightness menu displays for QSR, drive-thrus, and food courts. Cloud-managed content with real-time updates.',
      image: '/downloaded-images/pexels_50456b1568ac.jpg',
      color: 'cyan',
      features: ['2,500+ nits', 'Cloud CMS', '24/7 Operation'],
      link: '/signage-solutions#products',
      filter: 'menu-boards',
    },
    {
      title: 'Wayfinding & Directory',
      subtitle: 'Interactive Navigation',
      desc: 'Touchscreen kiosks and FIDS displays for malls, airports, and hospitals. Multi-language support with 3D maps.',
      image: '/downloaded-images/pexels_3658bf9b0243.jpg',
      color: 'violet',
      features: ['Touch Interactive', 'Multi-language', 'BMS Integration'],
      link: '/signage-solutions#products',
      filter: 'wayfinding',
    },
    {
      title: 'Transparent Window LED',
      subtitle: 'See-Through Advertising',
      desc: 'Ultra-thin LED film that turns any window into a dynamic display. 85% transparency maintains natural light.',
      image: '/downloaded-images/pexels_7823ce388eed.jpg',
      color: 'emerald',
      features: ['85% Transparent', '4500+ nits', 'Self-Adhesive'],
      link: '/signage-solutions#products',
      filter: 'transparent-signage',
    },
    {
      title: 'Specialty Signage',
      subtitle: 'Industry-Specific Solutions',
      desc: 'Fuel price signs, parking guidance, and custom applications. Remote management for multi-site deployments.',
      image: '/downloaded-images/ext_98d515dcfb2a.jpg',
      color: 'rose',
      features: ['Remote Update', 'Fleet Management', 'Weather-Sealed'],
      link: '/signage-solutions#products',
      filter: 'specialty-signage',
    },
    {
      title: 'Pylon & Monument Signs',
      subtitle: 'Landmark Presence',
      desc: 'Tall outdoor wayfinding pylons combining static branding with dynamic LED content. Engineered for 120mph wind loads.',
      image: '/downloaded-images/ext_bafcbcea17c0.jpg',
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
            src="https://files.ihgbrands.com/brightluxx/downloaded-images/ext_d0b67b9dced9.jpg"
            alt="EMAAR Dubai Mall Signage"
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

      {/* Custom Signage Inquiry Form */}
      <section id="quote" className={`py-24 ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-50'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Request Custom Signage Quote
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Tell us about your project and we'll provide a detailed quote within 24 hours
            </p>
          </motion.div>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl p-12 text-center ${isDark ? 'bg-emerald-950/30 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}
            >
              <CheckCircle2 className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Quote Request Received!
              </h3>
              <p className={`mb-6 ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                Our signage specialists will review your requirements and contact you within 24 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'}`}
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              onSubmit={handleFormSubmit}
              className={`rounded-2xl p-8 md:p-10 ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white border border-neutral-200 shadow-lg'}`}
            >
              {/* Contact Information */}
              <div className="mb-8">
                <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${isDark ? 'text-white border-white/10' : 'text-neutral-900 border-neutral-200'}`}>
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>
              </div>

              {/* Signage Details */}
              <div className="mb-8">
                <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${isDark ? 'text-white border-white/10' : 'text-neutral-900 border-neutral-200'}`}>
                  Signage Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Signage Type *
                    </label>
                    <select
                      name="signage_type"
                      value={formData.signage_type}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                    >
                      <option value="">Select type...</option>
                      <option value="channel-letters">Channel Letters (Storefront)</option>
                      <option value="menu-boards">Digital Menu Boards</option>
                      <option value="wayfinding">Wayfinding / Directory</option>
                      <option value="transparent">Transparent Window LED</option>
                      <option value="pylon">Pylon / Monument Sign</option>
                      <option value="fuel-price">Gas Station Price Sign</option>
                      <option value="custom">Custom / Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                      placeholder="e.g., 1 set, 10 letters, 3 displays"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Location Type
                    </label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                    >
                      <option value="">Select location...</option>
                      <option value="indoor">Indoor Only</option>
                      <option value="outdoor">Outdoor Only</option>
                      <option value="both">Both Indoor & Outdoor</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                    >
                      <option value="">Select timeline...</option>
                      <option value="urgent">Urgent (ASAP)</option>
                      <option value="1-2-weeks">1-2 Weeks</option>
                      <option value="1-month">Within 1 Month</option>
                      <option value="2-3-months">2-3 Months</option>
                      <option value="flexible">Flexible / Planning Stage</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Channel Letters Specific (Conditional) */}
              {(formData.signage_type === 'channel-letters' || formData.signage_type === 'pylon') && (
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${isDark ? 'text-amber-400 border-white/10' : 'text-amber-600 border-neutral-200'}`}>
                    Letter Specifications
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                        Letter Height
                      </label>
                      <select
                        name="letter_height"
                        value={formData.letter_height}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                      >
                        <option value="">Select height...</option>
                        <option value="10-24">10" - 24" (Small)</option>
                        <option value="24-48">24" - 48" (Medium)</option>
                        <option value="48-72">48" - 72" (Large)</option>
                        <option value="72+">72"+ (Extra Large)</option>
                        <option value="custom">Custom Size</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                        Illumination
                      </label>
                      <select
                        name="illumination"
                        value={formData.illumination}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                      >
                        <option value="">Select illumination...</option>
                        <option value="front-lit">Front-Lit (Face Glow)</option>
                        <option value="halo-lit">Halo/Back-Lit (Silhouette)</option>
                        <option value="dual-lit">Dual-Lit (Front + Halo)</option>
                        <option value="neon-style">Neon-Style LED</option>
                        <option value="non-illuminated">Non-Illuminated</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                        Material
                      </label>
                      <select
                        name="material"
                        value={formData.material}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                      >
                        <option value="">Select material...</option>
                        <option value="aluminum-acrylic">Aluminum + Acrylic</option>
                        <option value="stainless-steel">Stainless Steel</option>
                        <option value="bronze">Bronze / Brass</option>
                        <option value="painted-metal">Painted Metal</option>
                        <option value="flexible-neon">Flexible LED Neon</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Menu/Digital Signage Specific (Conditional) */}
              {(formData.signage_type === 'menu-boards' || formData.signage_type === 'wayfinding') && (
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${isDark ? 'text-cyan-400 border-white/10' : 'text-cyan-600 border-neutral-200'}`}>
                    Display Specifications
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                        Display Size
                      </label>
                      <select
                        name="display_size"
                        value={formData.display_size}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                      >
                        <option value="">Select size...</option>
                        <option value="32">32" Display</option>
                        <option value="43">43" Display</option>
                        <option value="55">55" Display</option>
                        <option value="65">65" Display</option>
                        <option value="75">75" Display</option>
                        <option value="86+">86"+ Large Format</option>
                        <option value="video-wall">Video Wall Configuration</option>
                        <option value="custom-led">Custom LED Size</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Project Details */}
              <div className="mb-8">
                <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${isDark ? 'text-white border-white/10' : 'text-neutral-900 border-neutral-200'}`}>
                  Project Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Installation Address / City
                    </label>
                    <input
                      type="text"
                      name="installation_address"
                      value={formData.installation_address}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                      placeholder="e.g., Dubai Mall, Sheikh Zayed Road"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Budget Range
                    </label>
                    <select
                      name="budget_range"
                      value={formData.budget_range}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                    >
                      <option value="">Select budget...</option>
                      <option value="under-5k">Under AED 20,000</option>
                      <option value="20k-50k">AED 20,000 - 50,000</option>
                      <option value="50k-100k">AED 50,000 - 100,000</option>
                      <option value="100k-250k">AED 100,000 - 250,000</option>
                      <option value="250k+">AED 250,000+</option>
                      <option value="not-sure">Not Sure / Need Guidance</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Project Brief / Additional Details
                  </label>
                  <textarea
                    name="project_brief"
                    value={formData.project_brief}
                    onChange={handleFormChange}
                    rows={4}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-colors resize-none ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-cyan-500' : 'bg-white border-neutral-300 text-neutral-900 focus:border-cyan-500'} focus:outline-none focus:ring-1 focus:ring-cyan-500`}
                    placeholder="Tell us more about your project - brand colors, specific text/logo, mounting requirements, any reference images..."
                  />
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={formSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all ${formSubmitting ? 'opacity-50 cursor-not-allowed' : ''} ${isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400' : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500'}`}
              >
                {formSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Request Custom Quote
                  </>
                )}
              </button>

              <p className={`mt-4 text-center text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                Our team typically responds within 24 hours. For urgent inquiries, call +971 55 995 4274
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
};

export default SignageSolutionsLanding;
