import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Tag, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const BLOG_POSTS = [
  {
    slug: 'microled-vs-oled-2025',
    title: 'MicroLED vs OLED: Which Technology Wins in 2025?',
    excerpt: 'A deep comparison of MicroLED and OLED for commercial applications. Brightness, lifespan, burn-in resistance, and total cost of ownership.',
    category: 'Technology',
    date: 'Feb 2026',
    readTime: '8 min',
  },
  {
    slug: 'choosing-pixel-pitch-guide',
    title: 'The Complete Guide to Choosing the Right Pixel Pitch',
    excerpt: 'How to select the optimal pixel pitch for your LED display based on viewing distance, content type, budget, and application environment.',
    category: 'Guides',
    date: 'Jan 2026',
    readTime: '6 min',
  },
  {
    slug: 'led-displays-dubai-retail',
    title: 'How LED Displays Are Transforming Dubai Retail',
    excerpt: 'Case studies of LED display installations in Dubai malls — from interactive storefronts to immersive brand experiences.',
    category: 'Industry',
    date: 'Jan 2026',
    readTime: '5 min',
  },
  {
    slug: 'outdoor-led-uae-heat-guide',
    title: 'Outdoor LED Displays in UAE Heat: What You Need to Know',
    excerpt: 'Engineering LED displays for 60C+ temperatures. IP ratings, cooling systems, brightness requirements, and Gulf-grade specifications.',
    category: 'Technical',
    date: 'Dec 2025',
    readTime: '7 min',
  },
  {
    slug: 'cob-led-technology-explained',
    title: 'COB LED Technology Explained: Why It Matters',
    excerpt: 'Chip-on-Board LED delivers superior durability, anti-glare performance, and close-viewing quality. Understanding the advantages.',
    category: 'Technology',
    date: 'Dec 2025',
    readTime: '5 min',
  },
  {
    slug: 'led-display-maintenance-tips',
    title: '10 Essential LED Display Maintenance Tips',
    excerpt: 'Keep your LED display performing at its best. From cleaning schedules to calibration intervals — practical tips for facility managers.',
    category: 'Guides',
    date: 'Nov 2025',
    readTime: '4 min',
  },
  {
    slug: 'transparent-led-architecture',
    title: 'Transparent LED: The Future of Architectural Facades',
    excerpt: 'How transparent LED screens are revolutionizing building facades across the GCC. Design considerations and case studies.',
    category: 'Industry',
    date: 'Nov 2025',
    readTime: '6 min',
  },
  {
    slug: 'led-power-consumption-guide',
    title: 'LED Display Power Consumption: A Complete Guide for MEP Engineers',
    excerpt: 'Calculate electrical load, HVAC impact, breaker sizing, and running costs. Essential reading for MEP consultants.',
    category: 'Technical',
    date: 'Oct 2025',
    readTime: '9 min',
  },
];

const CATEGORIES = ['All', 'Technology', 'Guides', 'Industry', 'Technical'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = BLOG_POSTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
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
              {CATEGORIES.map(cat => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <article key={post.slug} className="glass-panel overflow-hidden group" data-testid={`blog-post-${post.slug}`}>
                <div className="h-48 bg-gradient-to-br from-[rgba(229,197,116,0.08)] to-[rgba(229,197,116,0.02)] flex items-center justify-center">
                  <Tag size={32} className="text-[var(--blx-gold-3)] opacity-30" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="category-badge">{post.category}</span>
                    <span className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider flex items-center gap-1">
                      <Clock size={10} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold mb-2 tracking-wider leading-snug">{post.title}</h3>
                  <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed tracking-wider mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">{post.date}</span>
                    <span className="flex items-center gap-1 text-[var(--blx-gold-3)] text-[0.625rem] font-bold tracking-wider group-hover:gap-2 transition-[gap]">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-[var(--blx-muted)] text-sm tracking-wider">No articles found.</div>
          )}
        </div>
      </section>
    </div>
  );
}
