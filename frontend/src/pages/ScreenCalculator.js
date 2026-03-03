import React, { useState } from 'react';
import { Calculator, Monitor, Sun, Moon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api';

const ScreenCalculator = () => {
  const [form, setForm] = useState({
    venue_width: 8, venue_height: 3, viewing_distance: 5,
    content_type: 'video', indoor: true,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await api.post('/api/calculator/screen-size', form);
      setResult(res.data);
    } catch (err) {
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20" data-testid="calculator-page">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 data-testid="calculator-page-title">Screen Calculator</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-2 tracking-wider">
            Calculate the optimal LED display for your venue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Form */}
          <div className="glass-panel p-6 sm:p-8">
            <h3 className="text-base font-bold mb-6 flex items-center gap-2">
              <Calculator size={18} className="text-[var(--blx-gold-3)]" />
              Venue Parameters
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">Venue Width (metres)</label>
                <input
                  type="range" min="2" max="50" step="0.5" value={form.venue_width}
                  onChange={(e) => handleChange('venue_width', parseFloat(e.target.value))}
                  className="w-full accent-[var(--blx-gold-3)]"
                />
                <div className="flex justify-between text-[0.6875rem] text-[var(--blx-muted)] mt-1">
                  <span>2m</span>
                  <span className="text-[var(--blx-gold-3)] font-bold">{form.venue_width}m</span>
                  <span>50m</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">Venue Height (metres)</label>
                <input
                  type="range" min="2" max="15" step="0.5" value={form.venue_height}
                  onChange={(e) => handleChange('venue_height', parseFloat(e.target.value))}
                  className="w-full accent-[var(--blx-gold-3)]"
                />
                <div className="flex justify-between text-[0.6875rem] text-[var(--blx-muted)] mt-1">
                  <span>2m</span>
                  <span className="text-[var(--blx-gold-3)] font-bold">{form.venue_height}m</span>
                  <span>15m</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">Viewing Distance (metres)</label>
                <input
                  type="range" min="1" max="50" step="0.5" value={form.viewing_distance}
                  onChange={(e) => handleChange('viewing_distance', parseFloat(e.target.value))}
                  className="w-full accent-[var(--blx-gold-3)]"
                />
                <div className="flex justify-between text-[0.6875rem] text-[var(--blx-muted)] mt-1">
                  <span>1m</span>
                  <span className="text-[var(--blx-gold-3)] font-bold">{form.viewing_distance}m</span>
                  <span>50m</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">Content Type</label>
                <div className="flex gap-3">
                  {['text', 'mixed', 'video'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleChange('content_type', type)}
                      className={`flex-1 py-2.5 text-[0.6875rem] font-bold tracking-widest rounded-lg border transition-colors duration-200 ${
                        form.content_type === type
                          ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B] border-[var(--blx-gold-3)]'
                          : 'bg-transparent text-[var(--blx-text-2)] border-[var(--blx-border)] hover:border-[var(--blx-border-2)]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">Environment</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleChange('indoor', true)}
                    className={`flex-1 py-2.5 text-[0.6875rem] font-bold tracking-widest rounded-lg border flex items-center justify-center gap-2 transition-colors duration-200 ${
                      form.indoor ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B] border-[var(--blx-gold-3)]' : 'bg-transparent text-[var(--blx-text-2)] border-[var(--blx-border)]'
                    }`}
                  >
                    <Moon size={14} /> Indoor
                  </button>
                  <button
                    onClick={() => handleChange('indoor', false)}
                    className={`flex-1 py-2.5 text-[0.6875rem] font-bold tracking-widest rounded-lg border flex items-center justify-center gap-2 transition-colors duration-200 ${
                      !form.indoor ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B] border-[var(--blx-gold-3)]' : 'bg-transparent text-[var(--blx-text-2)] border-[var(--blx-border)]'
                    }`}
                  >
                    <Sun size={14} /> Outdoor
                  </button>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={loading}
                className={`btn-gold w-full py-3.5 ${loading ? 'opacity-50' : ''}`}
                data-testid="calculator-submit"
              >
                {loading ? 'Calculating...' : 'Calculate Recommendation'}
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            {result ? (
              <div className="space-y-6 animate-fade-up" data-testid="calculator-results">
                <div className="glass-panel p-6">
                  <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                    <Monitor size={18} className="text-[var(--blx-gold-3)]" />
                    Recommendation
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Pixel Pitch', value: `${result.recommended_pitch}mm` },
                      { label: 'Screen Area', value: `${result.screen_area} sqm` },
                      { label: 'Dimensions', value: `${result.screen_width}m x ${result.screen_height}m` },
                      { label: 'Resolution', value: result.resolution },
                      { label: 'Brightness', value: result.brightness },
                    ].map((item) => (
                      <div key={item.label} className="p-3 bg-[var(--blx-bg)] rounded-lg border border-[var(--blx-border)]">
                        <div className="text-[0.625rem] text-[var(--blx-muted)] tracking-[0.15em] mb-1">{item.label}</div>
                        <div className="text-sm font-bold text-[var(--blx-gold-3)]">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {result.tips && result.tips.length > 0 && (
                  <div className="glass-panel p-6">
                    <h4 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-3">Expert Tips</h4>
                    <ul className="space-y-2">
                      {result.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-[var(--blx-text-2)] tracking-wider" style={{textTransform: 'none'}}>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.matching_products && result.matching_products.length > 0 && (
                  <div className="glass-panel p-6">
                    <h4 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-3">Matching Products</h4>
                    <div className="space-y-3">
                      {result.matching_products.map((p) => (
                        <div key={p._id} className="flex items-center gap-4 p-3 bg-[var(--blx-bg)] rounded-lg border border-[var(--blx-border)]">
                          <img src={p.image_url} alt={p.name} className="w-16 h-12 object-cover rounded-lg" />
                          <div className="flex-1">
                            <div className="text-sm font-bold">{p.name}</div>
                            <div className="text-[0.6875rem] text-[var(--blx-muted)] tracking-wider">{p.product_code}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link to="/contact" className="btn-gold w-full py-3.5 text-center block">
                  Get Detailed Quote <ArrowRight size={14} className="inline ml-2" />
                </Link>
              </div>
            ) : (
              <div className="glass-panel p-10 text-center">
                <Monitor size={48} className="mx-auto text-[var(--blx-muted)] mb-4" />
                <h3 className="text-base font-bold mb-2">Configure Your Venue</h3>
                <p className="text-sm text-[var(--blx-text-2)] tracking-wider">
                  Set your venue parameters and click calculate to get personalised recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenCalculator;
