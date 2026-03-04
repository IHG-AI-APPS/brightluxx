import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, ArrowRight, GitCompareArrows, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getProducts, compareProducts } from '../api';

const Compare = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(true);

  // Close dropdown on outside click
  const handleClickOutside = useCallback((e) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(e.target) &&
      inputRef.current && !inputRef.current.contains(e.target)
    ) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Fetch all products for selection
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getProducts({});
        setAllProducts(res.data.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setFetchingProducts(false);
      }
    };
    fetchAll();
  }, []);

  const filteredProducts = allProducts.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.product_code.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  });

  const toggleProduct = (code) => {
    if (selectedCodes.includes(code)) {
      setSelectedCodes(selectedCodes.filter((c) => c !== code));
      setComparisonData(null);
    } else if (selectedCodes.length < 4) {
      setSelectedCodes([...selectedCodes, code]);
      setComparisonData(null);
    }
  };

  const handleCompare = async () => {
    if (selectedCodes.length < 2) return;
    setLoading(true);
    try {
      const res = await compareProducts(selectedCodes);
      setComparisonData(res.data.products || []);
    } catch (err) {
      console.error('Compare error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Collect all unique spec labels from compared products
  const getSpecLabels = () => {
    if (!comparisonData) return [];
    const labels = new Set();
    comparisonData.forEach((p) => {
      if (p.key_specs) {
        p.key_specs.forEach((s) => labels.add(s.label));
      }
    });
    return Array.from(labels);
  };

  const getSpecValue = (product, label) => {
    if (!product.key_specs) return '—';
    const spec = product.key_specs.find((s) => s.label === label);
    return spec ? spec.value : '—';
  };

  return (
    <div className="py-20" data-testid="compare-page">
      <SEO title="Compare LED Products" description="Compare LED display specifications side-by-side. Find the perfect screen for your project with our comparison tool." path="/compare" />      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 data-testid="compare-page-title">Compare Products</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-2 tracking-wider">
            Select 2 to 4 products to compare specifications side by side.
          </p>
        </div>

        {/* Product Selection */}
        <div className="glass-panel p-6 sm:p-8 mb-8">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <GitCompareArrows size={18} className="text-[var(--blx-gold-3)]" />
            Select Products ({selectedCodes.length}/4)
          </h3>

          {/* Selected Chips */}
          {selectedCodes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCodes.map((code) => {
                const product = allProducts.find((p) => p.product_code === code);
                return (
                  <div
                    key={code}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[var(--blx-gold-3)] text-[#0B0B0B] rounded-full text-[0.6875rem] font-bold tracking-wider"
                    data-testid={`compare-chip-${code}`}
                  >
                    <span>{code}</span>
                    {product && <span className="opacity-70">- {product.name}</span>}
                    <button
                      onClick={() => toggleProduct(code)}
                      className="ml-1 hover:opacity-70 transition-opacity duration-200"
                      data-testid={`compare-remove-${code}`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Search and Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div className="relative" ref={inputRef}>
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
              <input
                type="text"
                placeholder="Search products by name or code..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="input-luxury w-full pl-10"
                data-testid="compare-search-input"
              />
            </div>

            {showDropdown && (
              <div className="absolute z-50 w-full mt-2 max-h-64 overflow-y-auto shadow-2xl" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', background: 'rgba(11,11,11,0.94)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--blx-radius-lg)' }} data-testid="compare-product-dropdown">
                {fetchingProducts ? (
                  <div className="p-4 text-center text-sm text-[var(--blx-muted)] tracking-wider">Loading products...</div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-4 text-center text-sm text-[var(--blx-muted)] tracking-wider">No products found</div>
                ) : (
                  filteredProducts.map((p) => {
                    const isSelected = selectedCodes.includes(p.product_code);
                    const isDisabled = !isSelected && selectedCodes.length >= 4;
                    return (
                      <button
                        key={p.product_code}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isDisabled) toggleProduct(p.product_code);
                        }}
                        disabled={isDisabled}
                        className={`w-full flex items-center gap-4 p-3 text-left transition-colors duration-200 border-b border-[var(--blx-border)] last:border-0 ${
                          isSelected
                            ? 'bg-[rgba(229,197,116,0.08)]'
                            : isDisabled
                            ? 'opacity-40 cursor-not-allowed'
                            : 'hover:bg-[rgba(255,255,255,0.04)]'
                        }`}
                        data-testid={`compare-option-${p.product_code}`}
                      >
                        <img src={p.image_url} alt={p.name} className="w-12 h-9 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold truncate">{p.name}</div>
                          <div className="text-[0.6875rem] text-[var(--blx-muted)] tracking-wider">
                            {p.product_code} &middot; {p.pixel_pitch}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {isSelected ? (
                            <div className="w-6 h-6 rounded-full bg-[var(--blx-gold-3)] flex items-center justify-center">
                              <Check size={12} className="text-[#0B0B0B]" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border border-[var(--blx-border)] flex items-center justify-center">
                              <Plus size={12} className="text-[var(--blx-muted)]" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Compare Button */}
          <div className="mt-6 flex gap-3" style={{ position: 'relative', zIndex: 10 }}>
            <button
              onClick={() => {
                setShowDropdown(false);
                handleCompare();
              }}
              disabled={selectedCodes.length < 2 || loading}
              className={`btn-gold px-8 py-3.5 ${
                selectedCodes.length < 2 || loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              data-testid="compare-submit-button"
            >
              {loading ? 'Comparing...' : `Compare ${selectedCodes.length} Products`}
            </button>
            {selectedCodes.length > 0 && (
              <button
                onClick={() => {
                  setSelectedCodes([]);
                  setComparisonData(null);
                }}
                className="btn-glass px-6 py-3.5"
                data-testid="compare-clear-button"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Comparison Results */}
        {comparisonData && comparisonData.length > 0 && (
          <div className="animate-fade-up" data-testid="compare-results">
            {/* Scroll hint on mobile */}
            <div className="sm:hidden mb-3 flex items-center gap-2 text-[0.625rem] text-[var(--blx-muted)] tracking-[0.15em]">
              <ArrowRight size={12} /> Scroll horizontally to see all specs
            </div>

            {/* Scrollable comparison table */}
            <div className="glass-panel overflow-x-auto -mx-4 sm:mx-0 px-0 sm:px-0" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div style={{ minWidth: `${120 + comparisonData.length * 180}px` }}>
                {/* Product Headers */}
                <div className="grid" style={{ gridTemplateColumns: `120px repeat(${comparisonData.length}, minmax(160px, 1fr))` }}>
                  {/* Corner cell */}
                  <div className="p-3 sm:p-4 bg-[var(--blx-bg-raised)] border-b border-r border-[var(--blx-border)] sticky left-0 z-10" style={{ background: '#141414' }}>
                    <span className="text-[0.5625rem] sm:text-[0.625rem] font-bold text-[var(--blx-muted)] tracking-[0.2em]">Spec</span>
                  </div>
                  {/* Product name headers */}
                  {comparisonData.map((p) => (
                    <div key={p.product_code} className="p-3 sm:p-4 bg-[var(--blx-bg-raised)] border-b border-r border-[var(--blx-border)] last:border-r-0 text-center">
                      <img src={p.image_url} alt={p.name} className="w-full h-20 sm:h-28 object-cover rounded-lg mb-2 sm:mb-3" />
                      <div className="text-xs sm:text-sm font-bold mb-1 leading-tight">{p.name}</div>
                      <span className="category-badge text-[0.5rem] sm:text-[0.625rem]">{p.product_code}</span>
                    </div>
                  ))}
                </div>

                {/* Basic Info Rows */}
                {[
                  { label: 'Category', key: 'category' },
                  { label: 'Pixel Pitch', key: 'pixel_pitch' },
                  { label: 'Brightness', key: 'brightness' },
                  { label: 'Resolution', key: 'resolution' },
                  { label: 'Application', key: 'application' },
                ].map((row) => (
                  <div key={row.label} className="grid hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200" style={{ gridTemplateColumns: `120px repeat(${comparisonData.length}, minmax(160px, 1fr))` }}>
                    <div className="p-3 sm:p-4 border-b border-r border-[var(--blx-border)] text-[0.5625rem] sm:text-[0.6875rem] font-bold text-[var(--blx-muted)] tracking-[0.1em] sticky left-0 z-10" style={{ background: 'var(--blx-bg)' }}>
                      {row.label}
                    </div>
                    {comparisonData.map((p) => (
                      <div key={p.product_code} className="p-3 sm:p-4 border-b border-r border-[var(--blx-border)] last:border-r-0 text-xs sm:text-sm text-[var(--blx-text-2)] tracking-wider" style={{ fontVariantNumeric: 'tabular-nums', }}>
                        {p[row.key] || '—'}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Spec Rows */}
                {getSpecLabels().map((label) => (
                  <div key={label} className="grid hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200" style={{ gridTemplateColumns: `120px repeat(${comparisonData.length}, minmax(160px, 1fr))` }}>
                    <div className="p-3 sm:p-4 border-b border-r border-[var(--blx-border)] text-[0.5625rem] sm:text-[0.6875rem] font-bold text-[var(--blx-muted)] tracking-[0.1em] sticky left-0 z-10" style={{ background: 'var(--blx-bg)' }}>
                      {label}
                    </div>
                    {comparisonData.map((p) => (
                      <div key={p.product_code} className="p-3 sm:p-4 border-b border-r border-[var(--blx-border)] last:border-r-0 text-xs sm:text-sm text-[var(--blx-text-2)] tracking-wider" style={{ fontVariantNumeric: 'tabular-nums', }}>
                        {getSpecValue(p, label)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 text-center">
              <h3 className="text-lg mb-3">Need help choosing?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/calculator" className="btn-glass px-8 py-3.5 inline-flex items-center gap-2">
                  Screen Calculator <ArrowRight size={14} />
                </Link>
                <Link to="/contact" className="btn-gold px-8 py-3.5 inline-flex items-center gap-2">
                  Request Quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!comparisonData && selectedCodes.length === 0 && (
          <div className="glass-panel p-12 text-center">
            <GitCompareArrows size={48} className="mx-auto text-[var(--blx-muted)] mb-4" />
            <h3 className="text-base font-bold mb-2">Select Products to Compare</h3>
            <p className="text-sm text-[var(--blx-text-2)] tracking-wider mb-6">
              Choose 2 to 4 products from the search above to see a detailed side-by-side comparison of specifications.
            </p>
            <Link to="/products" className="btn-glass px-6 py-3 inline-flex items-center gap-2">
              Browse Products <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
