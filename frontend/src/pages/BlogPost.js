import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, User, Calendar, Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL || '';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
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
          if (res.status === 404) {
            setError('Blog post not found');
          } else {
            setError('Failed to load blog post');
          }
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

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--blx-gold-3)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" data-testid="blog-error">
        <h1 className="text-2xl font-bold mb-4">{error}</h1>
        <p className="text-[var(--blx-muted)] mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/blog" 
          className="px-6 py-3 rounded-lg text-sm font-bold tracking-wider flex items-center gap-2"
          style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div data-testid="blog-post-page">
      <SEO 
        title={`${blog.title} — Brightluxx Blog`} 
        description={blog.excerpt} 
        path={`/blog/${slug}`}
        image={blog.image_url}
      />

      {/* Hero */}
      <section className="relative">
        {blog.image_url ? (
          <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
            <img 
              src={blog.image_url} 
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-br from-[rgba(229,197,116,0.1)] to-transparent" />
        )}
        
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ marginTop: blog.image_url ? '-120px' : '0' }}>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[var(--blx-gold-3)] hover:text-[var(--blx-gold-2)] mb-4"
            data-testid="back-to-blog"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="category-badge">{blog.category}</span>
            <span className="text-[0.625rem] text-[var(--blx-muted)] tracking-wider flex items-center gap-1">
              <Clock size={12} /> {blog.read_time}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider leading-tight mb-6" data-testid="blog-title">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--blx-muted)]">
            <span className="flex items-center gap-2">
              <User size={14} /> {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} /> {formatDate(blog.published_at)}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Main Content */}
            <article className="flex-1 min-w-0">
              {/* Excerpt */}
              <p className="text-lg text-[var(--blx-text-2)] leading-relaxed mb-8 border-l-2 border-[var(--blx-gold-3)] pl-4" data-testid="blog-excerpt">
                {blog.excerpt}
              </p>
              
              {/* HTML Content */}
              <div 
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-bold prose-headings:tracking-wider prose-headings:text-[var(--blx-text)]
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-[var(--blx-text-2)] prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-[var(--blx-gold-3)] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[var(--blx-text)] prose-strong:font-bold
                  prose-ul:my-4 prose-ul:space-y-2
                  prose-li:text-[var(--blx-text-2)]
                  prose-blockquote:border-l-[var(--blx-gold-3)] prose-blockquote:text-[var(--blx-text-2)] prose-blockquote:italic
                "
                dangerouslySetInnerHTML={{ __html: blog.content }}
                data-testid="blog-content"
              />

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[var(--blx-border)]">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={14} className="text-[var(--blx-gold-3)]" />
                    <span className="text-xs font-bold tracking-wider text-[var(--blx-muted)]">TAGS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 text-xs tracking-wider rounded-full bg-[rgba(255,255,255,0.05)] text-[var(--blx-text-2)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-[var(--blx-border)]">
                <div className="flex items-center gap-2 mb-4">
                  <Share2 size={14} className="text-[var(--blx-gold-3)]" />
                  <span className="text-xs font-bold tracking-wider text-[var(--blx-muted)]">SHARE THIS ARTICLE</span>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg glass-panel hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                    title="Share on Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                  <a 
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg glass-panel hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                    title="Share on Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                  <a 
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg glass-panel hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                    title="Share on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="p-3 rounded-lg glass-panel hover:bg-[rgba(255,255,255,0.06)] transition-colors flex items-center gap-2"
                    title="Copy link"
                  >
                    {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                    {copied && <span className="text-xs text-emerald-400">Copied!</span>}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-[var(--blx-border)]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-wider mb-4">Need Expert Advice?</h2>
          <p className="text-sm text-[var(--blx-text-2)] mb-6 max-w-lg mx-auto">
            Our LED display specialists are ready to help with your project requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact"
              className="px-6 py-3 rounded-lg text-sm font-bold tracking-wider"
              style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
            >
              Contact Us
            </Link>
            <Link 
              to="/blog"
              className="px-6 py-3 rounded-lg text-sm font-bold tracking-wider glass-panel hover:bg-[rgba(255,255,255,0.06)]"
            >
              More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
