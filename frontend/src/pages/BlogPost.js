import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Share2, Facebook, Twitter, Linkedin, Copy, Check, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils/seoSchemas';
import { AIQuickAnswer, AICompanyFactSheet } from '../components/AIOptimizedContent';

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

const GlassCard = ({ children, className = '' }) => (
  <div className={`backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-lg ${className}`}>
    {children}
  </div>
);

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API}/api/blogs/${slug}`);
        if (!res.ok) {
          setError(res.status === 404 ? 'Blog post not found' : 'Failed to load blog post');
          return;
        }
        const data = await res.json();
        setBlog(data.blog);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchBlog();
  }, [slug]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog?.title || '')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center" data-testid="blog-error">
        <h1 className="text-2xl font-bold mb-4">{error}</h1>
        <p className="text-gray-500 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/blog" 
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-6 py-3 inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  if (!blog) return null;

  // Generate SEO schemas
  const articleSchema = generateArticleSchema({
    title: blog.title,
    excerpt: blog.excerpt,
    image_url: blog.image_url,
    published_at: blog.published_at,
    updated_at: blog.updated_at,
    created_at: blog.created_at
  }, `/blog/${slug}`);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: blog.title, path: `/blog/${slug}` }
  ]);

  return (
    <div className="bg-[#050508]" data-testid="blog-post-page">
      <SEO 
        title={`${blog.title} | LED Industry Insights`} 
        description={blog.excerpt} 
        path={`/blog/${slug}`}
        image={blog.image_url}
        keywords={`${blog.category}, LED display, industry insights, Dubai`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: blog.title, path: null }
        ]}
        jsonLd={[articleSchema, breadcrumbSchema]}
        ampUrl={`${process.env.REACT_APP_BACKEND_URL}/api/amp-blog/${slug}`}
      />

      {/* Hero Section */}
      <section className="relative">
        {blog.image_url ? (
          <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
            <img 
              src={blog.image_url} 
              alt={`${blog.title} - LED industry article Brightluxx`}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-transparent" />
          </div>
        ) : (
          <div className="h-40 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        )}
        
        <div className="max-w-[900px] mx-auto px-6 md:px-12 relative" style={{ marginTop: blog.image_url ? '-160px' : '60px' }}>
          <FadeInSection>
            <Breadcrumbs 
              items={[
                { name: 'Home', path: '/' },
                { name: 'Blog', path: '/blog' },
                { name: blog.title.length > 30 ? blog.title.slice(0, 30) + '...' : blog.title, path: null }
              ]}
              className="mb-6"
            />
            
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-cyan-500/10 backdrop-blur-sm text-cyan-400 border border-cyan-500/20 px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
                {blog.category}
              </span>
              <span className="text-xs text-gray-500 tracking-wider flex items-center gap-1">
                <Clock size={14} /> {blog.read_time}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold tracking-wide leading-tight mb-6 normal-case" data-testid="blog-title">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <User size={16} className="text-cyan-400" /> {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-cyan-400" /> {formatDate(blog.published_at)}
              </span>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeInSection>
            <article>
              {/* Excerpt */}
              <p className="text-lg text-gray-300 leading-relaxed mb-10 border-l-2 border-cyan-500 pl-6 normal-case" data-testid="blog-excerpt">
                {blog.excerpt}
              </p>
              
              {/* HTML Content */}
              <div 
                className="prose prose-invert prose-lg max-w-none normal-case
                  prose-headings:font-bold prose-headings:tracking-wide prose-headings:text-white
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5
                  prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
                  prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-5
                  prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-bold
                  prose-ul:my-5 prose-ul:space-y-2
                  prose-li:text-gray-400
                  prose-blockquote:border-l-cyan-500 prose-blockquote:text-gray-400 prose-blockquote:italic
                "
                dangerouslySetInnerHTML={{ __html: blog.content }}
                data-testid="blog-content"
              />

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-14 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={16} className="text-cyan-400" />
                    <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 text-xs tracking-wider bg-white/5 text-gray-400 border border-white/10 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI-Optimized Content Section - For AI/LLM Search Visibility */}
              <div className="mt-14 pt-8 border-t border-white/10" data-testid="blog-ai-content">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Article Summary</span>
                </div>
                
                {/* Quick Answer - Direct answer format for voice search */}
                <AIQuickAnswer
                  question={`What does this article cover: "${blog.title}"?`}
                  answer={blog.excerpt || `This article by Brightluxx covers ${blog.title}. Published on ${formatDate(blog.published_at)}, it provides insights into LED display technology and solutions for the ${blog.category || 'industry'}.`}
                  source={`Brightluxx Blog - ${blog.author}`}
                  isDark={true}
                />
                
                {/* Company Fact Sheet - helps AI understand the source authority */}
                <div className="mt-6">
                  <AICompanyFactSheet isDark={true} />
                </div>
              </div>

              {/* Share */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 mb-5">
                  <Share2 size={16} className="text-cyan-400" />
                  <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Share This Article</span>
                </div>
                <div className="flex items-center gap-3">
                  {[
                    { href: shareLinks.facebook, icon: Facebook, label: 'Facebook' },
                    { href: shareLinks.twitter, icon: Twitter, label: 'Twitter' },
                    { href: shareLinks.linkedin, icon: Linkedin, label: 'LinkedIn' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a 
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-500/30 hover:bg-white/10 transition-all"
                      title={`Share on ${label}`}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                  <button
                    onClick={handleCopyLink}
                    className="h-12 px-5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 hover:border-cyan-500/30 hover:bg-white/10 transition-all text-sm"
                    title="Copy link"
                  >
                    {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                    {copied ? <span className="text-emerald-400">Copied!</span> : <span className="text-gray-400">Copy Link</span>}
                  </button>
                </div>
              </div>
            </article>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeInSection>
            <GlassCard className="p-10 lg:p-14 text-center">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                Need Expert Advice?
              </span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4">
                Let's Discuss Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-2">
                  Project
                </span>
              </h2>
              <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto tracking-wide">
                Our LED display specialists are ready to help with your project requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/contact"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                >
                  Contact Us <ArrowRight size={16} />
                </Link>
                <Link 
                  to="/blog"
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2"
                >
                  More Articles
                </Link>
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
