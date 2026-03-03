import React, { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, X, Eye } from 'lucide-react';
import { getProducts } from '../api';

const CATEGORIES = [
  { value: '', label: 'All Products' },
  { value: 'micro-led', label: 'Micro LED' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'rental', label: 'Rental' },
  { value: 'transparent', label: 'Transparent' },
  { value: 'creative', label: 'Creative' },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory) params.category = activeCategory;
        if (searchQuery) params.search = searchQuery;
        const res = await getProducts(params);
        setProducts(res.data.products);
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
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-display mb-2" data-testid="products-page-title">Products</h1>
          <p className="text-sm text-[var(--blx-text-2)]">Explore our complete range of LED display solutions.</p>
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
                className={`px-4 py-2 text-xs font-medium rounded-full border transition-colors duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-[var(--blx-gold-3)] text-[#0A0A0A] border-[var(--blx-gold-3)]'
                    : 'bg-transparent text-[var(--blx-text-2)] border-[var(--blx-border)] hover:border-[var(--blx-border-2)]'
                }`}
                data-testid="products-filter-select"
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
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-sm text-[var(--blx-text-2)]">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
                data-testid="products-product-card"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="category-badge">{product.product_code}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="flex items-center gap-2 text-white text-sm font-medium">
                      <Eye size={16} /> Quick View
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-xs text-[var(--blx-muted)] mb-3 line-clamp-2">{product.tagline}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-[var(--blx-text-2)]">
                    <span className="bg-[var(--blx-panel-2)] px-2 py-0.5 rounded">{product.pixel_pitch}</span>
                    <span className="bg-[var(--blx-panel-2)] px-2 py-0.5 rounded">{product.brightness}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
          data-testid="product-quick-view-modal"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
              data-testid="product-quick-view-close"
            >
              <X size={16} />
            </button>

            <img
              src={selectedProduct.image_url}
              alt={selectedProduct.name}
              className="w-full h-56 object-cover rounded-t-2xl"
            />

            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="category-badge">{selectedProduct.product_code}</span>
                <span className="text-xs text-[var(--blx-muted)] uppercase tracking-wider">{selectedProduct.category}</span>
              </div>
              <h2 className="text-2xl font-display mb-2">{selectedProduct.name}</h2>
              <p className="text-sm text-[var(--blx-text-2)] mb-6 leading-relaxed">{selectedProduct.description}</p>

              {/* Specs Table */}
              {selectedProduct.key_specs && selectedProduct.key_specs.length > 0 && (
                <div className="mb-6" data-testid="product-specs-table">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--blx-muted)] mb-3">Specifications</h3>
                  <table className="spec-table">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.key_specs.map((spec, i) => (
                        <tr key={i}>
                          <td className="font-medium text-[var(--blx-text)]">{spec.label}</td>
                          <td>{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex gap-3">
                <a href="/contact" className="btn-gold px-6 py-3 text-sm flex-1 text-center" data-testid="product-quick-view-button">
                  Request Quote
                </a>
                <a
                  href={`https://wa.me/971559910711?text=${encodeURIComponent(`Hi, I'm interested in ${selectedProduct.product_code} - ${selectedProduct.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass px-6 py-3 text-sm"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
