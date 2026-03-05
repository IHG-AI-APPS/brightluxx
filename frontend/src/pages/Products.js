import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Monitor } from 'lucide-react';
import { getProducts } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { resolveImage, BASE_URL } from '../components/SEO';

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

const GlowCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className={`blx-scroll-glow ${inView ? 'in-view' : ''} ${className}`}>
      {children}
    </div>
  );
};

const CATEGORIES = [
  { value: '', label: 'All Products' },
  { value: 'cob-microled', label: 'COB MicroLED' },
  { value: 'mip', label: 'MiP' },
  { value: 'indoor', label: 'Fine Pitch Indoor' },
  { value: 'all-in-one', label: 'All-in-One' },
  { value: 'cinema-led', label: 'Cinema LED' },
  { value: 'dvled', label: 'DVLED Cinema' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'rental', label: 'Rental' },
  { value: 'transparent', label: 'Transparent' },
  { value: 'flexible', label: 'Flexible / Creative' },
  { value: 'custom-shapes', label: 'Custom Shapes' },
  { value: 'sphere', label: 'LED Sphere' },
  { value: 'naked-eye-3d', label: 'Naked-Eye 3D' },
  { value: 'ceiling-led', label: 'Ceiling / Sky Screen' },
  { value: 'digital-signage', label: 'Digital Signage' },
  { value: 'smart-tv', label: 'Smart TVs' },
  { value: 'ready-made', label: 'Ready-Made' },
  { value: 'interactive', label: 'Interactive Floor' },
  { value: 'virtual-production', label: 'Virtual Production' },
  { value: 'poster-totem', label: 'LED Poster / Totem' },
  { value: 'shelf-edge', label: 'Shelf Edge' },
  { value: 'road-signal', label: 'Road Signals' },
  { value: 'accessories', label: 'Accessories' },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const [searchQuery, setSearchQuery] = useState('');

  const setActiveCategory = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory) params.category = activeCategory;
        if (searchQuery) params.search = searchQuery;
        const res = await getProducts(params);
        const data = res?.data || res;
        setProducts(Array.isArray(data) ? data : data?.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-20" data-testid="products-page">
      <SEO
        title="LED Display Products"
        description="Browse our complete range of LED display solutions — COB MicroLED, transparent, outdoor, rental, flexible, interactive floor, and more. Full specs and instant quotes."
        path="/products"
        image="/api/cdn/cob_microled_1.webp"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Brightluxx LED Display Products",
          "description": "Complete catalog of LED display solutions",
          "url": `${BASE_URL}/products`,
          "numberOfItems": products.length,
          "itemListElement": products.slice(0, 20).map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": p.name,
            "url": `${BASE_URL}/products/${p.slug}`,
            "image": resolveImage(p.image_url),
          }))
        }}
      />      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 data-testid="products-page-title">Products</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-2 tracking-wider">Explore our complete range of LED display solutions.</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
            <input
              type="text"
              placeholder="Search products or BL codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-luxury w-full pl-10"
              data-testid="products-search-input"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-[0.6875rem] font-bold rounded-full border tracking-widest transition-colors duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B] border-[var(--blx-gold-3)]'
                    : 'bg-transparent text-[var(--blx-text-2)] border-[var(--blx-border)] hover:border-[var(--blx-border-2)]'
                }`}
                data-testid={`products-filter-${cat.value || 'all'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <SlidersHorizontal size={48} className="mx-auto text-[var(--blx-muted)] mb-4" />
            <h3 className="text-base font-bold mb-2">No products found</h3>
            <p className="text-sm text-[var(--blx-text-2)] tracking-wider">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <GlowCard key={product._id}>
                <Link
                  to={`/products/${product.slug}`}
                  className="product-card group block"
                  data-testid="products-product-card"
                >
                  <div className="relative overflow-hidden h-48">
                    {product.image_url ? (
                      <CdnImage src={product.image_url} alt={product.name} className="w-full h-48" imgClassName="group-hover:scale-105 transition-transform duration-500" w={400} />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08), rgba(229,197,116,0.02))' }}>
                        <Monitor size={36} className="text-[var(--blx-muted)]" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="category-badge">{product.product_code}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold mb-1">{product.name}</h3>
                    <p className="text-[0.6875rem] text-[var(--blx-muted)] mb-3 line-clamp-2 tracking-wider">{product.tagline}</p>
                    <div className="flex flex-wrap gap-2 text-[0.6875rem] text-[var(--blx-text-2)]">
                      <span className="glass-panel px-2.5 py-0.5">{product.pixel_pitch}</span>
                      <span className="glass-panel px-2.5 py-0.5">{product.brightness}</span>
                    </div>
                  </div>
                </Link>
              </GlowCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
