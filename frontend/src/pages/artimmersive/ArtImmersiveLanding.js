import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Palette, Sparkles, Film, Box, Globe, Layers, 
  ArrowRight, Play, Monitor, Zap, Eye, Theater,
  Building2, Users, Award, CheckCircle2
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ArtImmersiveLanding = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products?category=art-immersive`);
      if (res.ok) {
        const data = await res.json();
        // API returns {products: [...]} so extract the array
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
    : products.filter(p => p.subcategory === activeTab);

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
      image: 'https://images.unsplash.com/photo-1768655317930-23e7cd2d336e?w=800&fit=crop',
      features: ['Multi-sensory integration', 'Visitor tracking', 'Dynamic content'],
    },
    {
      title: 'NFT Galleries',
      description: 'Museum-grade displays for showcasing high-value digital art with authentication',
      image: 'https://images.unsplash.com/photo-1768141721979-25c398ebefd5?w=800&fit=crop',
      features: ['16-bit color depth', 'Anti-glare coating', 'NFT authentication'],
    },
    {
      title: 'Virtual Production Studios',
      description: 'Cinema-grade XR stages for film, TV, and commercial production',
      image: 'https://images.unsplash.com/photo-1594122107730-a03f3ccaf301?w=800&fit=crop',
      features: ['7680Hz refresh', 'Unreal Engine ready', 'Camera genlock'],
    },
    {
      title: 'Public Art Landmarks',
      description: 'Iconic outdoor installations that transform urban spaces into digital canvases',
      image: 'https://images.unsplash.com/photo-1644610152866-4411bbc7bae2?w=800&fit=crop',
      features: ['IP65 weatherproof', '6000 nits brightness', 'Remote management'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-[#050508]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">Art & Immersive Technology</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Where Technology</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400">
                Meets Art
              </span>
            </h1>

            <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-12">
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
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                <Play className="w-5 h-5" />
                Watch Showreel
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5">
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
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-violet-400" />
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl font-bold text-white mb-4">Transforming Spaces Worldwide</h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
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
                className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-all duration-500"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-neutral-400 mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.features.map((feature) => (
                      <span key={feature} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs">
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
      <section className="py-24 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Art & Immersive Products</h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
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
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
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
                    className="group block bg-white/[0.02] rounded-2xl border border-white/5 hover:border-violet-500/30 overflow-hidden transition-all duration-300"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-neutral-900">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Monitor className="w-16 h-16 text-neutral-700" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-violet-600/80 text-white text-xs font-medium">
                        {product.pixel_pitch}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-violet-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-neutral-400 line-clamp-2 mb-3">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.features?.slice(0, 3).map((feature) => (
                          <span key={feature} className="px-2 py-1 rounded-md bg-white/5 text-neutral-400 text-xs">
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
              <p className="text-neutral-400">No products found in this category.</p>
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
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/50 to-pink-900/50 border border-violet-500/20 p-12 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.3),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Create Something Extraordinary?
              </h2>
              <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
                Our team of specialists in art and immersive technology is ready to bring your vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-900 font-semibold rounded-full hover:bg-neutral-100 transition-colors"
                >
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors"
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
