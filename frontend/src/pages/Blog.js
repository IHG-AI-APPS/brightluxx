import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, Image, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { generateBreadcrumbSchema, generateItemListSchema } from '../utils/seoSchemas';

const API = process.env.REACT_APP_BACKEND_URL || '';

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
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', hover = true, isDark = true }) => (
  <div className={`
    backdrop-blur-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white/80'} border ${isDark ? 'border-white/[0.08]' : 'border-neutral-200'} rounded-lg overflow-hidden
    ${hover ? `hover:${isDark ? 'bg-white/[0.06]' : 'bg-white'} hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]` : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

export default function Blog() {
  const { isDark } = useTheme();
  
  // Theme-aware classes
  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const inputBg = isDark ? 'bg-white/5' : 'bg-white';
  const inputBorder = isDark ? 'border-white/10' : 'border-neutral-300';
  const inputText = isDark ? 'text-white' : 'text-neutral-900';
  const gradientOverlay = isDark ? 'from-[#050508]' : 'from-neutral-50';
  
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/blogs`);
        const data = await res.json();
        setBlogs(data.blogs || []);
        setCategories(data.categories || ['All']);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filtered = blogs.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Generate SEO schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' }
  ]);
  
  const itemListSchema = blogs.length > 0 
    ? generateItemListSchema(blogs, 'Brightluxx Blog Articles', '/blog')
    : null;

  return (
    <div className={`${pageBg} transition-colors duration-500`}>
      <SEO 
        title="Blog — LED Display Insights & Industry News | Brightluxx" 
        description="LED display industry insights, technology guides, and project case studies from Brightluxx." 
        path="/blog"
        jsonLd={[breadcrumbSchema, itemListSchema].filter(Boolean)}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden" data-testid="blog-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className={`absolute top-1/4 left-0 w-[400px] h-[400px] ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'} rounded-full blur-[120px]`} />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Blog & News</span>
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6 leading-[0.95] ${textPrimary}`}>
              Insights &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">
                Knowledge
              </span>
            </h1>
            <p className={`${textSecondary} text-base md:text-lg max-w-xl tracking-wide leading-relaxed`}>
              Industry trends, technology deep-dives, and practical guides for LED display specifiers and project managers.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2" data-testid="blog-categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                    activeCategory === cat
                      ? 'bg-cyan-500 text-black'
                      : `${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-neutral-200'} ${textSecondary} hover:border-cyan-500/30 hover:${textPrimary}`
                  }`}
                  data-testid={`blog-cat-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${textMuted}`} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-64 py-3 pr-4 pl-11 text-sm ${inputBg} border ${inputBorder} focus:border-cyan-500/50 ${inputText} placeholder:${textMuted} outline-none transition-colors rounded-lg`}
                data-testid="blog-search"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-24" data-testid="blog-grid">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, idx) => (
                <FadeInSection key={post.slug || post.id} delay={idx % 6}>
                  <Link to={`/blog/${post.slug}`}>
                    <GlassCard className="h-full group" isDark={isDark} data-testid={`blog-post-${post.slug}`}>
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        {post.image_url ? (
                          <img 
                            src={post.image_url} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className={`w-full h-full ${isDark ? 'bg-gradient-to-br from-cyan-500/10 to-transparent' : 'bg-gradient-to-br from-cyan-500/20 to-transparent'} flex items-center justify-center`}>
                            <Image size={40} className="text-cyan-400/30" />
                          </div>
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-t ${gradientOverlay} via-transparent to-transparent`} />
                        
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-cyan-500/10 backdrop-blur-sm text-cyan-400 border border-cyan-500/20 px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className={`flex items-center gap-3 mb-3 text-[10px] ${textMuted} tracking-wider`}>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {post.read_time}
                          </span>
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                        
                        <h3 className={`text-base font-bold tracking-wide mb-3 leading-snug group-hover:text-cyan-400 transition-colors normal-case ${textPrimary}`}>
                          {post.title}
                        </h3>
                        
                        <p className={`text-xs ${textMuted} leading-relaxed tracking-wide mb-4 line-clamp-2 normal-case`}>
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-wider uppercase group-hover:gap-3 transition-all">
                          Read Article <ArrowRight size={14} />
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          )}
          
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <BookOpen size={48} className={`mx-auto ${textMuted} mb-4`} />
              <p className={`${textMuted} tracking-wide`}>No articles found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
