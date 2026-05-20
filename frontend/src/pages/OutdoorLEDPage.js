import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Building2, Car, Trophy, Store, ChevronDown, Shield, Droplets, Thermometer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../contexts/ThemeContext';

/* Outdoor LED Product Series Data */
const OUTDOOR_SERIES = [
  {
    id: 'outdoor-hd',
    name: 'OutdoorHD Series',
    tagline: 'High Definition Outdoor',
    description: 'Fine-pitch outdoor displays for close-viewing storefronts and premium retail environments.',
    brightness: '6,000-7,000 nits',
    protection: 'IP65 Front / IP54 Rear',
    applications: ['Storefronts', 'Shopping Centers', 'Transit Stations', 'Urban Media'],
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/30',
    products: [
      { pitch: 'P2.5', name: 'OutdoorHD P2.5', resolution: '160,000 pixels/m²', viewDistance: '2.5m+', brightness: '6,000 nits' },
      { pitch: 'P3.0', name: 'OutdoorHD P3.0', resolution: '111,111 pixels/m²', viewDistance: '3m+', brightness: '6,500 nits' },
    ]
  },
  {
    id: 'outdoor-pro',
    name: 'OutdoorPro Series',
    tagline: 'Professional Grade',
    description: 'Workhorse outdoor displays balancing resolution, brightness, and value for most applications.',
    brightness: '7,000-8,000 nits',
    protection: 'IP65 Full Enclosure',
    applications: ['Advertising', 'Sports Venues', 'Outdoor Events', 'Building Signage'],
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/30',
    products: [
      { pitch: 'P4.0', name: 'OutdoorPro P4.0', resolution: '62,500 pixels/m²', viewDistance: '4m+', brightness: '7,000 nits' },
      { pitch: 'P5.0', name: 'OutdoorPro P5.0', resolution: '40,000 pixels/m²', viewDistance: '5m+', brightness: '7,500 nits' },
    ]
  },
  {
    id: 'billboard',
    name: 'Billboard Series',
    tagline: 'Large Format Advertising',
    description: 'High-brightness displays designed for highway billboards and long-distance viewing.',
    brightness: '8,000-10,000 nits',
    protection: 'IP65 + UV Resistant',
    applications: ['Highway Billboards', 'Rooftop Signs', 'Stadium Perimeter', 'Large Facades'],
    color: 'from-orange-500 to-amber-600',
    borderColor: 'border-orange-500/30',
    products: [
      { pitch: 'P6.0', name: 'Billboard P6.0', resolution: '27,778 pixels/m²', viewDistance: '6m+', brightness: '8,000 nits' },
      { pitch: 'P6.67', name: 'Billboard P6.67', resolution: '22,500 pixels/m²', viewDistance: '7m+', brightness: '8,500 nits' },
      { pitch: 'P8.0', name: 'Billboard P8.0', resolution: '15,625 pixels/m²', viewDistance: '8m+', brightness: '10,000 nits' },
    ]
  },
];

const WEATHER_FEATURES = [
  { icon: Shield, title: 'IP65 Rated', desc: 'Full dust & water protection' },
  { icon: Sun, title: '10,000 nits', desc: 'Sunlight readable' },
  { icon: Thermometer, title: '-20°C to +50°C', desc: 'Extreme temperature range' },
  { icon: Droplets, title: 'Anti-Corrosion', desc: 'UAE coastal climate ready' },
];

const APPLICATIONS = [
  { name: 'Billboards', icon: Building2, desc: 'Highway & urban advertising', image: '/recovered/site-images_opt_ext_74b87f9d42bb.webp' },
  { name: 'Sports Venues', icon: Trophy, desc: 'Stadium & arena displays', image: '/recovered/site-images_opt_ext_bdaacc608e9c.webp' },
  { name: 'Retail', icon: Store, desc: 'Storefront & mall signage', image: '/recovered/site-images_opt_ext_be925cac011c.webp' },
  { name: 'Transportation', icon: Car, desc: 'Roadside & transit', image: '/recovered/site-images_opt_ext_a75f39fb46f2.webp' },
];

/* Series Card Component */
const SeriesCard = ({ series, index, isDark }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`rounded-2xl overflow-hidden ${isDark ? 'bg-white/[0.03]' : 'bg-white'} border ${series.borderColor} ${isDark ? '' : 'shadow-lg'}`}
    >
      {/* Header */}
      <div className={`p-6 bg-gradient-to-r ${series.color} bg-opacity-10`}>
        <div className="flex items-start justify-between">
          <div>
            <p className={`text-xs font-semibold tracking-wider uppercase mb-1 bg-gradient-to-r ${series.color} bg-clip-text text-transparent`}>
              {series.tagline}
            </p>
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              {series.name}
            </h3>
            <p className={`text-sm mt-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {series.description}
            </p>
          </div>
        </div>

        {/* Specs Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-gradient-to-r ${series.color} text-white`}>
            {series.brightness}
          </span>
          <span className={`px-2 py-1 rounded-full text-[10px] ${isDark ? 'bg-white/10 text-white/70' : 'bg-neutral-100 text-neutral-600'}`}>
            {series.protection}
          </span>
        </div>

        {/* Applications */}
        <div className="flex flex-wrap gap-2 mt-3">
          {series.applications.map((app) => (
            <span key={app} className={`px-2 py-1 rounded-full text-[10px] ${isDark ? 'bg-white/5 text-white/60' : 'bg-neutral-50 text-neutral-500'}`}>
              {app}
            </span>
          ))}
        </div>
      </div>

      {/* Products Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full px-6 py-4 flex items-center justify-between ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-neutral-50'} transition-colors`}
      >
        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          {series.products.length} Pixel Pitch Options
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''} ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`} />
      </button>

      {/* Products List */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`px-6 pb-6 space-y-3 border-t ${isDark ? 'border-white/5' : 'border-neutral-100'}`}>
              {series.products.map((product) => (
                <Link
                  key={product.pitch}
                  to={`/outdoor-led/${product.pitch.toLowerCase().replace('.', '-')}`}
                  className={`block p-4 rounded-xl ${isDark ? 'bg-white/[0.03] hover:bg-white/[0.06]' : 'bg-neutral-50 hover:bg-neutral-100'} transition-colors group`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className={`text-lg font-bold bg-gradient-to-r ${series.color} bg-clip-text text-transparent`}>
                          {product.pitch}
                        </span>
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                          {product.name}
                        </span>
                      </div>
                      <div className={`text-xs mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                        {product.resolution} • {product.brightness} • View: {product.viewDistance}
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isDark ? 'text-neutral-600' : 'text-neutral-400'} group-hover:translate-x-1 transition-transform`} />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function OutdoorLEDPage() {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <div className={`min-h-screen ${bgColor}`} data-testid="outdoor-led-page">
      <SEO
        title="Outdoor LED Displays — Weatherproof P2.5 to P8 | Brightluxx UAE"
        description="Professional outdoor LED display solutions from P2.5 to P8. IP65 rated, high brightness up to 10,000 nits. Billboards, storefronts, sports venues, and building signage."
        path="/outdoor-led"
      />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-orange-900/20 via-transparent to-transparent' : 'bg-gradient-to-b from-orange-100/50 via-transparent to-transparent'}`} />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Outdoor LED', path: null }]} className="mb-8" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Fixed Installation • Weatherproof
            </p>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 ${textPrimary}`}>
              Outdoor LED{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                Display Series
              </span>
            </h1>
            <p className={`text-lg ${textSecondary} max-w-2xl`}>
              Built for UAE's extreme climate. IP65 rated, high brightness displays from P2.5 for 
              close-viewing storefronts to P8 for highway billboards.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { value: '7', label: 'Pitch Options' },
              { value: 'P2.5-P8', label: 'Range' },
              { value: '10K nits', label: 'Max Brightness' },
              { value: 'IP65', label: 'Protection' },
            ].map((stat) => (
              <div key={stat.label} className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white'} text-center`}>
                <div className="text-2xl font-bold text-orange-400">{stat.value}</div>
                <div className={`text-xs ${textSecondary} uppercase tracking-wider mt-1`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weather Features */}
      <section className={`py-12 border-y ${isDark ? 'border-white/5 bg-white/[0.01]' : 'border-neutral-200 bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {WEATHER_FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-orange-500/10' : 'bg-orange-50'}`}>
                  <feature.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${textPrimary}`}>{feature.title}</p>
                  <p className={`text-xs ${textSecondary}`}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Series Cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-3 gap-6">
            {OUTDOOR_SERIES.map((series, index) => (
              <SeriesCard key={series.id} series={series} index={index} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className={`py-16 lg:py-24 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${textPrimary}`}>Applications</h2>
            <p className={`${textSecondary} mt-2`}>Built to perform in any outdoor environment</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {APPLICATIONS.map((app, index) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden ${isDark ? 'bg-white/[0.03]' : 'bg-neutral-50'}`}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={app.image} alt={app.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <app.icon className="absolute bottom-4 left-4 w-6 h-6 text-white" />
                </div>
                <div className="p-4">
                  <h3 className={`font-semibold ${textPrimary}`}>{app.name}</h3>
                  <p className={`text-sm ${textSecondary} mt-1`}>{app.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary} mb-4`}>
            Planning an outdoor installation?
          </h2>
          <p className={`${textSecondary} mb-8 max-w-xl mx-auto`}>
            Our team provides free site surveys, structural engineering support, and climate-specific recommendations for UAE projects.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2"
            >
              Request Site Survey <ArrowRight size={16} />
            </Link>
            <Link
              to="/indoor-led"
              className={`${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-neutral-100 hover:bg-neutral-200'} ${textPrimary} font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2`}
            >
              View Indoor Series
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
