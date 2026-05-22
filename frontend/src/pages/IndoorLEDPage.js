import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Cpu, Layers, Building2, Presentation, Store, Radio, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../contexts/ThemeContext';

const API = process.env.REACT_APP_BACKEND_URL || '';

/* Indoor LED Product Series Data */
const INDOOR_SERIES = [
  {
    id: 'ultrafine',
    name: 'UltraFine Series',
    tagline: 'Premium 4K/8K Resolution',
    description: 'MicroLED and COB technology for mission-critical environments demanding the highest image quality.',
    technology: 'MicroLED / COB',
    applications: ['Control Rooms', 'Broadcast Studios', 'Command Centers', 'Luxury Retail'],
    color: 'from-purple-500 to-violet-600',
    borderColor: 'border-purple-500/30',
    products: [
      { pitch: 'P0.5', name: 'UltraFine P0.5', resolution: '4,000,000 pixels/m²', viewDistance: '0.5m+', price: '$$$$$' },
      { pitch: 'P0.7', name: 'UltraFine P0.7', resolution: '2,040,816 pixels/m²', viewDistance: '0.7m+', price: '$$$$' },
      { pitch: 'P0.9', name: 'UltraFine P0.9', resolution: '1,234,568 pixels/m²', viewDistance: '0.9m+', price: '$$$$' },
    ]
  },
  {
    id: 'profine',
    name: 'ProFine Series',
    tagline: 'Corporate & Commercial Grade',
    description: 'COB and MiP technology balancing exceptional quality with practical budgets for professional environments.',
    technology: 'COB / MiP',
    applications: ['Boardrooms', 'Corporate Lobbies', 'Museums', 'Conference Centers'],
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/30',
    products: [
      { pitch: 'P1.2', name: 'ProFine P1.2', resolution: '694,444 pixels/m²', viewDistance: '1.2m+', price: '$$$' },
      { pitch: 'P1.5', name: 'ProFine P1.5', resolution: '444,444 pixels/m²', viewDistance: '1.5m+', price: '$$$' },
      { pitch: 'P1.8', name: 'ProFine P1.8', resolution: '308,642 pixels/m²', viewDistance: '1.8m+', price: '$$' },
    ]
  },
  {
    id: 'commercial',
    name: 'Commercial Series',
    tagline: 'Retail & Public Spaces',
    description: 'SMD and MiP technology optimized for high-traffic commercial environments with excellent value.',
    technology: 'SMD / MiP',
    applications: ['Retail Stores', 'Shopping Malls', 'Hotel Lobbies', 'Showrooms'],
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/30',
    products: [
      { pitch: 'P2.0', name: 'Commercial P2.0', resolution: '250,000 pixels/m²', viewDistance: '2m+', price: '$$' },
      { pitch: 'P2.5', name: 'Commercial P2.5', resolution: '160,000 pixels/m²', viewDistance: '2.5m+', price: '$$' },
      { pitch: 'P3.0', name: 'Commercial P3.0', resolution: '111,111 pixels/m²', viewDistance: '3m+', price: '$' },
    ]
  },
  {
    id: 'standard',
    name: 'Standard Series',
    tagline: 'Large Indoor Venues',
    description: 'Cost-effective SMD solutions for larger viewing distances in auditoriums and event spaces.',
    technology: 'SMD',
    applications: ['Auditoriums', 'Houses of Worship', 'Sports Arenas', 'Event Halls'],
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/30',
    products: [
      { pitch: 'P3.9', name: 'Standard P3.9', resolution: '65,746 pixels/m²', viewDistance: '4m+', price: '$' },
      { pitch: 'P4.0', name: 'Standard P4.0', resolution: '62,500 pixels/m²', viewDistance: '4m+', price: '$' },
    ]
  },
];

const SPECS_COMMON = {
  refresh: '3840Hz',
  brightness: '600-1200 cd/m²',
  contrast: '5000:1 - 20000:1',
  lifespan: '100,000 hours',
  warranty: '3 Years',
};

const APPLICATIONS = [
  { name: 'Control Rooms', icon: Monitor, desc: 'Mission-critical 24/7 operations', image: 'https://files.ihgbrands.com/site-images_opt_ext_48e2d933cdb4.webp' },
  { name: 'Corporate', icon: Building2, desc: 'Boardrooms & lobbies', image: 'https://files.ihgbrands.com/site-images_opt_ext_ad35b4b4bbcd.webp' },
  { name: 'Retail', icon: Store, desc: 'Engaging customer displays', image: 'https://files.ihgbrands.com/site-images_opt_ext_2ee0b83d54d6.webp' },
  { name: 'Broadcast', icon: Radio, desc: 'Studio-grade visuals', image: 'https://files.ihgbrands.com/site-images_opt_ext_4a88312621e4.webp' },
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
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-gradient-to-r ${series.color} text-white`}>
            {series.technology}
          </span>
        </div>

        {/* Applications */}
        <div className="flex flex-wrap gap-2 mt-4">
          {series.applications.map((app) => (
            <span key={app} className={`px-2 py-1 rounded-full text-[10px] ${isDark ? 'bg-white/10 text-white/70' : 'bg-neutral-100 text-neutral-600'}`}>
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
              {series.products.map((product, i) => (
                <Link
                  key={product.pitch}
                  to={`/indoor-led/${product.pitch.toLowerCase().replace('.', '-')}`}
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
                        {product.resolution} • View: {product.viewDistance}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        {product.price}
                      </span>
                      <ArrowRight className={`w-4 h-4 ${isDark ? 'text-neutral-600' : 'text-neutral-400'} group-hover:translate-x-1 transition-transform`} />
                    </div>
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

export default function IndoorLEDPage() {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');

  const bgColor = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <div className={`min-h-screen ${bgColor}`} data-testid="indoor-led-page">
      <SEO
        title="Indoor LED Displays — Fine Pitch P0.5 to P4 | Brightluxx UAE"
        description="Premium indoor LED display solutions from P0.5 MicroLED to P4 SMD. Control rooms, corporate, retail, and broadcast applications. COB, MiP, and SMD technologies."
        path="/indoor-led"
      />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-purple-900/20 via-transparent to-transparent' : 'bg-gradient-to-b from-purple-100/50 via-transparent to-transparent'}`} />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Indoor LED', path: null }]} className="mb-8" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-purple-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Fixed Installation • Fine Pitch
            </p>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 ${textPrimary}`}>
              Indoor LED{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Display Series
              </span>
            </h1>
            <p className={`text-lg ${textSecondary} max-w-2xl`}>
              From ultra-premium MicroLED for control rooms to cost-effective SMD for large venues. 
              Pixel pitches from P0.5 to P4 covering every indoor application.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { value: '11', label: 'Pitch Options' },
              { value: 'P0.5-P4', label: 'Range' },
              { value: '4', label: 'Series' },
              { value: '3 Year', label: 'Warranty' },
            ].map((stat) => (
              <div key={stat.label} className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white'} text-center`}>
                <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
                <div className={`text-xs ${textSecondary} uppercase tracking-wider mt-1`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pixel Pitch Guide */}
      <section className={`py-12 border-y ${isDark ? 'border-white/5 bg-white/[0.01]' : 'border-neutral-200 bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center">
            <div>
              <p className={`text-xs ${textSecondary} uppercase tracking-wider mb-2`}>Viewing Distance Rule</p>
              <p className={`text-sm ${textPrimary}`}>
                <span className="text-purple-400 font-mono font-bold">Pitch (mm)</span> × 1.5 = Minimum viewing distance (m)
              </p>
            </div>
            <div className={`w-px h-8 ${isDark ? 'bg-white/10' : 'bg-neutral-200'} hidden md:block`} />
            <div>
              <p className={`text-xs ${textSecondary} uppercase tracking-wider mb-2`}>Example</p>
              <p className={`text-sm ${textPrimary}`}>
                P1.5 × 1.5 = <span className="text-cyan-400 font-bold">2.25m</span> minimum viewing distance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Series Cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 gap-6">
            {INDOOR_SERIES.map((series, index) => (
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
            <p className={`${textSecondary} mt-2`}>Where indoor LED displays make the biggest impact</p>
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
            Need help selecting the right pixel pitch?
          </h2>
          <p className={`${textSecondary} mb-8 max-w-xl mx-auto`}>
            Our technical team provides free specification support based on your viewing distance, content type, and budget.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2"
            >
              Get Expert Advice <ArrowRight size={16} />
            </Link>
            <Link
              to="/outdoor-led"
              className={`${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-neutral-100 hover:bg-neutral-200'} ${textPrimary} font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2`}
            >
              View Outdoor Series
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
