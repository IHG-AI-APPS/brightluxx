import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Ruler, Zap, Package, Download, Calculator } from 'lucide-react';
import { createLead } from '../api';

// Static configuration options (outside component to avoid recreating on each render)
const displayTypes = [
  {
    id: 'microled',
    name: 'MicroLED Pro',
    description: 'Ultra-fine pitch for premium indoor applications',
    basePrice: 15000,
    image: '/generated/microled_display.png'
  },
  {
    id: 'outdoor',
    name: 'Outdoor DOOH',
    description: 'High-brightness for outdoor visibility',
    basePrice: 8000,
    image: '/generated/outdoor_dooh_dubai.png'
  },
  {
    id: 'transparent',
    name: 'Transparent LED',
    description: 'See-through displays for architectural glass',
    basePrice: 18000,
    image: '/generated/transparent_led_retail.png'
  },
  {
    id: '3d',
    name: '3D Holographic',
    description: 'Glasses-free 3D for immersive experiences',
    basePrice: 25000,
    image: '/generated/3d_holographic_mall.png'
  }
];

const pixelPitchOptions = [
  { value: '0.9', label: '0.9mm (Ultra HD)', multiplier: 1.8 },
  { value: '1.2', label: '1.2mm (Premium)', multiplier: 1.4 },
  { value: '1.5', label: '1.5mm (Standard)', multiplier: 1.2 },
  { value: '2.5', label: '2.5mm (Large Format)', multiplier: 1.0 },
  { value: '3.9', label: '3.9mm (Outdoor)', multiplier: 0.8 }
];

const brightnessOptions = [
  { value: '600', label: '600 nits (Indoor)', multiplier: 1.0 },
  { value: '1500', label: '1500 nits (Bright Indoor)', multiplier: 1.2 },
  { value: '5000', label: '5000 nits (Outdoor)', multiplier: 1.5 },
  { value: '8000', label: '8000 nits (Extreme)', multiplier: 1.8 }
];

const ProductConfigurator = () => {
  // Configuration state
  const [config, setConfig] = useState({
    displayType: 'microled',
    width: 5.0,
    height: 3.0,
    pixelPitch: '1.2',
    brightness: '600',
    installation: 'fixed',
    environment: 'indoor'
  });

  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  // Calculate price
  useEffect(() => {
    const selectedType = displayTypes.find(t => t.id === config.displayType);
    const pitchMultiplier = pixelPitchOptions.find(p => p.value === config.pixelPitch)?.multiplier || 1;
    const brightnessMultiplier = brightnessOptions.find(b => b.value === config.brightness)?.multiplier || 1;
    const area = config.width * config.height;
    const installMultiplier = config.installation === 'rental' ? 0.6 : 1.0;

    const price = selectedType.basePrice * area * pitchMultiplier * brightnessMultiplier * installMultiplier;
    setEstimatedPrice(Math.round(price / 1000) * 1000);
  }, [config]);

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    
    try {
      const specs = `${displayTypes.find(t => t.id === config.displayType)?.name} - ${config.width}m x ${config.height}m, ${config.pixelPitch}mm pitch, ${config.brightness} nits, ${config.installation}`;
      
      await createLead({
        ...formData,
        application: 'Product Configurator',
        message: `Configured Display: ${specs}\nEstimated Price: $${estimatedPrice.toLocaleString()}`,
        source: 'product_configurator'
      });

      alert('Quote request sent! We\'ll contact you within 2 hours.');
      setShowQuoteForm(false);
    } catch (error) {
      alert('Failed to submit. Please try again or contact us directly.');
    }
  };

  const selectedType = displayTypes.find(t => t.id === config.displayType);

  return (
    <div className="py-20" data-testid="configurator-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-xs uppercase tracking-[0.24em] text-[var(--blx-gold-3)] mb-4 font-medium">
            Interactive Configurator
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4">
            Design Your <span className="text-gradient">Perfect Display</span>
          </h1>
          <p className="text-lg text-[var(--blx-text-2)] max-w-2xl mx-auto">
            Configure your LED display with real-time pricing. Get a detailed quote in minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Configuration Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Display Type Selection */}
            <div className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[var(--blx-bg)] rounded-lg flex items-center justify-center">
                  <Package className="text-[var(--blx-gold-3)]" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Display Type</h3>
                  <p className="text-sm text-[var(--blx-text-2)]">Choose your technology</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {displayTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => handleConfigChange('displayType', type.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      config.displayType === type.id
                        ? 'border-[var(--blx-gold-3)] bg-[var(--blx-bg)]'
                        : 'border-[var(--blx-border)] hover:border-[var(--blx-gold-2)]'
                    }`}
                  >
                    <img src={type.image} alt={type.name} className="w-full h-24 object-cover rounded-lg mb-3" />
                    <div className="font-semibold mb-1">{type.name}</div>
                    <div className="text-xs text-[var(--blx-text-2)]">{type.description}</div>
                    <div className="text-xs text-[var(--blx-gold-3)] mt-2">From ${type.basePrice.toLocaleString()}/sqm</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[var(--blx-bg)] rounded-lg flex items-center justify-center">
                  <Ruler className="text-[var(--blx-gold-3)]" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Dimensions</h3>
                  <p className="text-sm text-[var(--blx-text-2)]">Set your display size</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Width (meters)</label>
                  <input
                    type="number"
                    value={config.width}
                    onChange={(e) => handleConfigChange('width', parseFloat(e.target.value))}
                    min="1"
                    max="50"
                    step="0.5"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Height (meters)</label>
                  <input
                    type="number"
                    value={config.height}
                    onChange={(e) => handleConfigChange('height', parseFloat(e.target.value))}
                    min="1"
                    max="30"
                    step="0.5"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="mt-4 p-3 bg-[var(--blx-bg)] rounded-lg">
                <div className="text-sm text-[var(--blx-text-2)]">Total Area:</div>
                <div className="text-2xl font-bold text-[var(--blx-gold-3)]">
                  {(config.width * config.height).toFixed(1)} m²
                </div>
              </div>
            </div>

            {/* Pixel Pitch */}
            <div className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[var(--blx-bg)] rounded-lg flex items-center justify-center">
                  <Zap className="text-[var(--blx-gold-3)]" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Specifications</h3>
                  <p className="text-sm text-[var(--blx-text-2)]">Fine-tune performance</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pixel Pitch</label>
                  <select
                    value={config.pixelPitch}
                    onChange={(e) => handleConfigChange('pixelPitch', e.target.value)}
                    className="w-full"
                  >
                    {pixelPitchOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Brightness</label>
                  <select
                    value={config.brightness}
                    onChange={(e) => handleConfigChange('brightness', e.target.value)}
                    className="w-full"
                  >
                    {brightnessOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Installation Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['fixed', 'rental'].map(type => (
                      <button
                        key={type}
                        onClick={() => handleConfigChange('installation', type)}
                        className={`px-4 py-3 rounded-xl border transition-all capitalize ${
                          config.installation === type
                            ? 'border-[var(--blx-gold-3)] bg-[var(--blx-bg)] text-[var(--blx-gold-3)]'
                            : 'border-[var(--blx-border)] hover:border-[var(--blx-gold-2)]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Preview & Pricing */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Visual Preview */}
              <div className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                <div className="relative bg-[var(--blx-bg)] rounded-lg p-8 aspect-video flex items-center justify-center border border-[var(--blx-border)]">
                  <img
                    src={selectedType.image}
                    alt={selectedType.name}
                    className="w-full h-full object-cover rounded-lg opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[var(--blx-gold-3)] mb-2">
                        {config.width}m × {config.height}m
                      </div>
                      <div className="text-sm text-[var(--blx-text-2)]">{selectedType.name}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--blx-text-2)]">Pixel Pitch:</span>
                    <span>{config.pixelPitch}mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--blx-text-2)]">Brightness:</span>
                    <span>{config.brightness} nits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--blx-text-2)]">Installation:</span>
                    <span className="capitalize">{config.installation}</span>
                  </div>
                </div>
              </div>

              {/* Price Estimate */}
              <div className="bg-[var(--blx-panel)] border-2 border-[var(--blx-gold-2)] rounded-xl p-6 relative blx-noise">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="text-[var(--blx-gold-3)]" size={24} />
                  <h3 className="text-lg font-semibold">Estimated Price</h3>
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-[var(--blx-gold-3)] mb-2">
                    ${estimatedPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-[var(--blx-text-2)]">
                    USD (Approximate)
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="btn-gold w-full flex items-center justify-center gap-2"
                  >
                    Get Detailed Quote
                    <ArrowRight size={18} />
                  </button>

                  <a
                    href={`https://wa.me/971559954274?text=${encodeURIComponent(`Hi, I configured a ${selectedType.name} display (${config.width}m x ${config.height}m). Estimated: $${estimatedPrice.toLocaleString()}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass w-full text-center"
                  >
                    WhatsApp Quote
                  </a>
                </div>

                <div className="mt-4 text-xs text-[var(--blx-muted)] text-center">
                  Final price includes installation, calibration, and 2-year warranty
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Form Modal */}
        {showQuoteForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold mb-4">Request Detailed Quote</h3>
              <p className="text-sm text-[var(--blx-text-2)] mb-6">
                Get a comprehensive quote with installation details and timeline.
              </p>

              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full"
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full"
                />

                <div className="flex gap-3">
                  <button type="submit" className="btn-gold flex-1">
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(false)}
                    className="btn-glass flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductConfigurator;
