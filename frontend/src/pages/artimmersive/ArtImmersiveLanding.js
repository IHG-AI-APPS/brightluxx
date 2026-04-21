import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { 
  Palette, Sparkles, Film, Box, Globe, Layers, 
  ArrowRight, Play, Monitor, Zap, Theater,
  Building2, Award, CheckCircle2
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ArtImmersiveLanding = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { isDark } = useTheme();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products?category=art-immersive`);
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
    { id: 'nft-gallery', name: 'NFT & Digital Art', icon: Palette },
    { id: 'immersive-experience', name: 'Immersive Museums', icon: Theater },
    { id: 'virtual-production', name: 'Virtual Production', icon: Film },
    { id: 'metaverse', name: 'Metaverse', icon: Globe },
    { id: 'sculptural', name: 'Sculptural LED', icon: Box },
    { id: 'public-art', name: 'Public Art', icon: Building2 },
    { id: 'interactive', name: 'Interactive', icon: Zap },
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.sub_category === activeTab);

  const stats = [
    { label: 'NFT Galleries Served', value: '50+', icon: Palette },
    { label: 'XR Stages Deployed', value: '25+', icon: Film },
    { label: 'Countries', value: '12', icon: Globe },
    { label: 'Award-Winning Installations', value: '15', icon: Award },
  ];

  const useCases = [
    {
      title: 'teamLab-Style Museums',
      description: 'Floor-to-ceiling immersive experiences with motion sensors and real-time content generation',
      image: 'https://files.ihgbrands.com/brightluxx/site-images/opt_ext_bc8c12ee1348.webp',
      features: ['Multi-sensory integration', 'Visitor tracking', 'Dynamic content'],
    },
    {
      title: 'NFT Galleries',
      description: 'Museum-grade displays for showcasing high-value digital art with authentication',
      image: 'https://files.ihgbrands.com/brightluxx/site-images/opt_ext_65be281cb148.webp',
      features: ['16-bit color depth', 'Anti-glare coating', 'NFT authentication'],
    },
    {
      title: 'Virtual Production Studios',
      description: 'Cinema-grade XR stages for film, TV, and commercial production',
      image: 'https://files.ihgbrands.com/brightluxx/site-images/opt_ext_00eecd7267f8.webp',
      features: ['7680Hz refresh', 'Unreal Engine ready', 'Camera genlock'],
    },
    {
      title: 'Public Art Landmarks',
      description: 'Iconic outdoor installations that transform urban spaces into digital canvases',
      image: 'https://files.ihgbrands.com/brightluxx/site-images/opt_ext_7e32a28621f2.webp',
      features: ['IP65 weatherproof', '6000 nits brightness', 'Remote management'],
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050508]' : 'bg-white'}`}>
      <SEO title="Art & Immersive LED Displays" description="Transform spaces with immersive LED displays for NFT galleries, museums, virtual production, and experiential installations." path="/art-immersive" />
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://files.ihgbrands.com/brightluxx/videos/art-hero-abstract.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for readability */}
          <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-white/50'}`} />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#050508] via-transparent to-violet-900/10' : 'bg-gradient-to-t from-white via-transparent to-violet-100/20'}`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-violet-500/10 border-violet-500/20' : 'bg-violet-100 border-violet-200'} border mb-8`}>
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span className={`text-sm font-medium ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>Art & Immersive Technology</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className={isDark ? 'text-white' : 'text-neutral-900'}>Where Technology</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500">
                Meets Art
              </span>
            </h1>

            <p className={`text-xl max-w-3xl mx-auto mb-12 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Premium LED solutions for NFT galleries, immersive museums, virtual production studios, 
              and public art installations. Transform spaces into unforgettable digital experiences.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className={`inline-flex items-center gap-2 px-8 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-neutral-100 border-neutral-200 text-neutral-900 hover:bg-neutral-200'} border font-semibold rounded-full transition-colors`}>
                <Play className="w-5 h-5" />
                Watch Showreel
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 border-y ${isDark ? 'border-white/5' : 'border-neutral-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-violet-500" />
                <div className={`text-4xl font-bold mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{stat.value}</div>
                <div className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Video Showcase */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-video object-cover"
            >
              <source src="https://files.ihgbrands.com/brightluxx/videos/art-immersive-hero.mp4" type="video/mp4" />
            </video>
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent' : 'bg-gradient-to-t from-white/80 via-transparent to-transparent'}`} />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Experience Immersive Art
              </h3>
              <p className={`text-lg max-w-2xl ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Step into a world where LED technology transforms spaces into breathtaking digital art experiences
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>Transforming Spaces Worldwide</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              From intimate NFT galleries to massive public installations, our technology powers the world's most innovative digital experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl ${isDark ? 'bg-white/[0.02] border-white/5 hover:border-violet-500/30' : 'bg-neutral-50 border-neutral-200 hover:border-violet-300'} border transition-all duration-500`}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#050508] via-transparent to-transparent' : 'bg-gradient-to-t from-white via-transparent to-transparent'}`} />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{useCase.title}</h3>
                  <p className={`mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.features.map((feature) => (
                      <span key={feature} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${isDark ? 'bg-violet-500/10 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>
                        <CheckCircle2 className="w-3 h-3" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className={`py-24 ${isDark ? 'bg-gradient-to-b from-transparent via-violet-950/10 to-transparent' : 'bg-gradient-to-b from-transparent via-violet-50/50 to-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>Our Art & Immersive Products</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Specialized LED solutions designed for the unique demands of digital art and immersive experiences.
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
                    ? 'bg-violet-600 text-white'
                    : isDark 
                      ? 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                      : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
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
              <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
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
                    className={`group block rounded-2xl border overflow-hidden transition-all duration-300 ${isDark ? 'bg-white/[0.02] border-white/5 hover:border-violet-500/30' : 'bg-white border-neutral-200 hover:border-violet-300 shadow-sm hover:shadow-md'}`}
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
                          <Monitor className={`w-16 h-16 ${isDark ? 'text-neutral-700' : 'text-neutral-300'}`} />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-violet-600/80 text-white text-xs font-medium">
                        {product.pixel_pitch}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className={`text-lg font-semibold mb-1 group-hover:text-violet-500 transition-colors ${isDark ? 'text-white' : 'text-neutral-900'}`}>
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

          <div className="text-center mt-12">
            <Link
              to="/products?category=art-immersive"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-full hover:bg-violet-700 transition-colors"
            >
              View All Art & Immersive Products
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
            className={`relative overflow-hidden rounded-3xl border p-12 text-center ${isDark ? 'bg-gradient-to-br from-violet-900/50 to-pink-900/50 border-violet-500/20' : 'bg-gradient-to-br from-violet-100 to-pink-100 border-violet-200'}`}
          >
            <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.3),transparent_70%)]' : 'bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_70%)]'}`} />
            <div className="relative">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Ready to Create Something Extraordinary?
              </h2>
              <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Our team of specialists in art and immersive technology is ready to bring your vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-colors ${isDark ? 'bg-white text-violet-900 hover:bg-neutral-100' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                >
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/case-studies"
                  className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-colors ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-violet-700 hover:bg-neutral-50 border border-violet-200'}`}
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ArtImmersiveLanding;
