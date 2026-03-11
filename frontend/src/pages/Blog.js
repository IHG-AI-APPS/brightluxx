import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Tag, ArrowRight, Image } from 'lucide-react';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL || '';

export default function Blog() {
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
      year: 'numeric',
    });
  };

  const filtered = blogs.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <SEO title="Blog — Brightluxx" description="LED display industry insights, technology guides, and project case studies from Brightluxx." path="/blog" />

      {/* Hero */}
      <section className="py-16 sm:py-24" data-testid="blog-hero">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-[0.625rem] tracking-[0.3em] text-[var(--blx-gold-3)] mb-3 font-bold">BLOG & NEWS</div>
            <h1 className="mb-4">Insights & Knowledge</h1>
            <p className="text-sm text-[var(--blx-text-2)] tracking-wider leading-relaxed max-w-lg">
              Industry trends, technology deep-dives, and practical guides for LED display specifiers and project managers.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2" data-testid="blog-categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[0.625rem] font-bold tracking-widest transition-all ${
                    activeCategory === cat
                      ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B]'
                      : 'glass-panel hover:bg-[rgba(255,255,255,0.06)]'
                  }`}
                  data-testid={`blog-cat-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input-luxury pl-9 pr-4 py-2 text-xs w-64"
                data-testid="blog-search"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-16" data-testid="blog-grid">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-2 border-[var(--blx-gold-3)] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <Link to={`/blog/${post.slug}`} key={post.slug || post.id}>
                  <article className="glass-panel overflow-hidden group h-full" data-testid={`blog-post-${post.slug}`}>
                    <div className="h-48 bg-gradient-to-br from-[rgba(229,197,116,0.08)] to-[rgba(229,197,116,0.02)] flex items-center justify-center overflow-hidden">
                      {post.image_url ? (
                        <img 
                          src={post.image_url} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Image size={32} className="text-[var(--blx-gold-3)] opacity-30" />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="category-badge">{post.category}</span>
                        <span className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider flex items-center gap-1">
                          <Clock size={10} /> {post.read_time}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold mb-2 tracking-wider leading-snug">{post.title}</h3>
                      <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed tracking-wider mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">{formatDate(post.published_at)}</span>
                        <span className="flex items-center gap-1 text-[var(--blx-gold-3)] text-[0.625rem] font-bold tracking-wider group-hover:gap-2 transition-[gap]">
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-16 text-[var(--blx-muted)] text-sm tracking-wider">No articles found.</div>
          )}
        </div>
      </section>
    </div>
  );
}
