import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Monitor, Cpu, Layers, Sun, Shield, Zap, Ruler, Eye, Download, ChevronDown, Sparkles, Grid3X3, RefreshCw, Gauge, Thermometer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../contexts/ThemeContext';

/* ============================================
   COMPLETE INDOOR LED PRODUCT DATA
   Organized by Series with unique images per pitch
   ============================================ */
const INDOOR_PRODUCTS = {
  'p0-5': {
    pitch: 'P0.5',
    name: 'UltraFine P0.5',
    series: 'UltraFine Series',
    seriesId: 'ultrafine',
    seriesLink: '/indoor-led',
    tagline: 'Ultimate 8K Resolution',
    technology: 'MicroLED',
    description: 'The pinnacle of LED display technology. P0.5 MicroLED delivers unprecedented pixel density for mission-critical applications where every detail matters. Self-emissive pixels create perfect blacks and infinite contrast ratios, ideal for broadcast studios, command centers, and premium corporate environments.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/a4d1778c64dc28d7723c7e853145ccbef9afc14cb958eb0a946fd94e699ad7b9.png',
    specs: {
      pixelPitch: '0.5mm',
      resolution: '4,000,000 pixels/m²',
      brightness: '600-1000 cd/m²',
      refreshRate: '3840Hz',
      contrast: '20,000:1',
      viewingAngle: '170°/170°',
      grayScale: '16bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '280W/m² avg',
      weight: '28kg/m²',
      cabinetSize: '600×337.5mm',
      ipRating: 'IP30 (Indoor)',
      operatingTemp: '0°C to 45°C',
    },
    applications: ['8K Control Rooms', 'Broadcast Studios', 'Command Centers', 'Medical Imaging', 'Luxury Retail', 'Security Operations'],
    features: [
      { icon: Cpu, title: 'MicroLED Technology', desc: 'Self-emissive pixels with perfect blacks and infinite contrast' },
      { icon: Eye, title: '8K Ready', desc: 'Supports native 8K content at close viewing distances' },
      { icon: Zap, title: 'HDR Support', desc: 'Wide color gamut covering 100% DCI-P3' },
      { icon: Shield, title: '100,000 Hour Lifespan', desc: '24/7 operation capability with minimal maintenance' },
    ],
    viewingDistance: { min: '0.5m', optimal: '1.5m+', max: '10m' },
    priceRange: '$$$$$',
    color: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/20',
  },
  'p0-7': {
    pitch: 'P0.7',
    name: 'UltraFine P0.7',
    series: 'UltraFine Series',
    seriesId: 'ultrafine',
    seriesLink: '/indoor-led',
    tagline: 'Premium 4K/8K Display',
    technology: 'MicroLED / COB',
    description: 'Exceptional resolution for control rooms and broadcast environments. P0.7 balances ultra-fine pitch with proven reliability, delivering stunning visuals for demanding professional applications where image quality cannot be compromised.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/2aa098b461e86086f8d20d263a7055ae2f9679c64a23bba567df53ceeb2fed2a.png',
    specs: {
      pixelPitch: '0.7mm',
      resolution: '2,040,816 pixels/m²',
      brightness: '600-1000 cd/m²',
      refreshRate: '3840Hz',
      contrast: '15,000:1',
      viewingAngle: '170°/170°',
      grayScale: '16bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '250W/m² avg',
      weight: '26kg/m²',
      cabinetSize: '600×337.5mm',
      ipRating: 'IP30 (Indoor)',
      operatingTemp: '0°C to 45°C',
    },
    applications: ['Control Rooms', 'Broadcast Studios', 'Corporate Boardrooms', 'Museums', 'Design Studios', 'Financial Trading'],
    features: [
      { icon: Cpu, title: 'COB Technology', desc: 'Chip-on-Board for superior protection and contrast' },
      { icon: Eye, title: '4K Native', desc: 'Perfect for 4K content at close viewing' },
      { icon: Zap, title: 'Wide Color Gamut', desc: '95% DCI-P3 coverage' },
      { icon: Shield, title: 'Dust Sealed', desc: 'Fully sealed surface prevents debris damage' },
    ],
    viewingDistance: { min: '0.7m', optimal: '2m+', max: '12m' },
    priceRange: '$$$$',
    color: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/20',
  },
  'p0-9': {
    pitch: 'P0.9',
    name: 'UltraFine P0.9',
    series: 'UltraFine Series',
    seriesId: 'ultrafine',
    seriesLink: '/indoor-led',
    tagline: 'High-End Commercial',
    technology: 'COB',
    description: 'The sweet spot for premium installations. P0.9 COB delivers outstanding image quality for boardrooms, lobbies, and high-end retail environments. Industry-leading contrast and color accuracy make it the choice of discerning specifiers.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/e19ad54a047ea80a202edf4e5aa5831fcfdd38239441cabea25c73bacd00787b.png',
    specs: {
      pixelPitch: '0.9mm',
      resolution: '1,234,568 pixels/m²',
      brightness: '600-1200 cd/m²',
      refreshRate: '3840Hz',
      contrast: '10,000:1',
      viewingAngle: '170°/170°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '220W/m² avg',
      weight: '24kg/m²',
      cabinetSize: '600×337.5mm',
      ipRating: 'IP30 (Indoor)',
      operatingTemp: '0°C to 45°C',
    },
    applications: ['Corporate Headquarters', 'Luxury Retail', 'Museums', 'Broadcast', 'Design Agencies', 'Premium Lobbies'],
    features: [
      { icon: Cpu, title: 'COB Technology', desc: 'Best-in-class contrast and protection' },
      { icon: Eye, title: 'Text Clarity', desc: 'Sharp text rendering for data-heavy content' },
      { icon: Zap, title: 'Energy Efficient', desc: 'Lower power consumption than older technologies' },
      { icon: Shield, title: 'Easy Maintenance', desc: 'Front-serviceable design' },
    ],
    viewingDistance: { min: '0.9m', optimal: '2.5m+', max: '15m' },
    priceRange: '$$$$',
    color: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/20',
  },
  'p1-2': {
    pitch: 'P1.2',
    name: 'ProFine P1.2',
    series: 'ProFine Series',
    seriesId: 'profine',
    seriesLink: '/indoor-led',
    tagline: 'Premium Corporate Grade',
    technology: 'COB / MiP',
    description: 'Ideal for boardrooms and corporate environments where image quality meets practical budgets. P1.2 delivers excellent resolution without premium pricing, making it the go-to choice for professional meeting spaces.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/b0a6c8e7ab06e97d66fa367375a27a48222e5e821bc9358358bb7006fa0d1ef2.png',
    specs: {
      pixelPitch: '1.2mm',
      resolution: '694,444 pixels/m²',
      brightness: '600-1200 cd/m²',
      refreshRate: '3840Hz',
      contrast: '8,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '200W/m² avg',
      weight: '22kg/m²',
      cabinetSize: '600×337.5mm',
      ipRating: 'IP30 (Indoor)',
      operatingTemp: '0°C to 45°C',
    },
    applications: ['Boardrooms', 'Conference Centers', 'Corporate Lobbies', 'Museums', 'Education', 'Government'],
    features: [
      { icon: Cpu, title: 'MiP Technology', desc: '85-90% COB quality at better value' },
      { icon: Eye, title: 'Sharp Visuals', desc: 'Excellent for presentations and video' },
      { icon: Zap, title: 'Value Leader', desc: 'Best price-performance in fine pitch' },
      { icon: Shield, title: 'Reliable', desc: 'Proven technology with long track record' },
    ],
    viewingDistance: { min: '1.2m', optimal: '3m+', max: '18m' },
    priceRange: '$$$',
    color: 'from-cyan-500 to-blue-600',
    bgGlow: 'bg-cyan-500/20',
  },
  'p1-5': {
    pitch: 'P1.5',
    name: 'ProFine P1.5',
    series: 'ProFine Series',
    seriesId: 'profine',
    seriesLink: '/indoor-led',
    tagline: 'Mainstream Premium',
    technology: 'COB / MiP',
    description: 'The most popular fine-pitch option. P1.5 balances resolution, reliability, and cost for a wide range of professional applications. Perfect for replacing aging LCD video walls with seamless, vibrant LED technology.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/caace68646cb302fb03d31612f995bb6e828f8a26d332c68d0a5a7b7a39fd147.png',
    specs: {
      pixelPitch: '1.5mm',
      resolution: '444,444 pixels/m²',
      brightness: '600-1200 cd/m²',
      refreshRate: '3840Hz',
      contrast: '6,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '180W/m² avg',
      weight: '20kg/m²',
      cabinetSize: '600×337.5mm',
      ipRating: 'IP30 (Indoor)',
      operatingTemp: '0°C to 45°C',
    },
    applications: ['Meeting Rooms', 'Lobbies', 'Retail', 'Education', 'Houses of Worship', 'Healthcare'],
    features: [
      { icon: Cpu, title: 'Versatile', desc: 'Works for video, presentations, and signage' },
      { icon: Eye, title: 'Great Value', desc: 'Most cost-effective fine pitch' },
      { icon: Zap, title: 'Easy Upgrade', desc: 'Replace aging LCD video walls' },
      { icon: Shield, title: '24/7 Ready', desc: 'Designed for continuous operation' },
    ],
    viewingDistance: { min: '1.5m', optimal: '4m+', max: '22m' },
    priceRange: '$$$',
    color: 'from-cyan-500 to-blue-600',
    bgGlow: 'bg-cyan-500/20',
  },
  'p1-8': {
    pitch: 'P1.8',
    name: 'ProFine P1.8',
    series: 'ProFine Series',
    seriesId: 'profine',
    seriesLink: '/indoor-led',
    tagline: 'Corporate Workhorse',
    technology: 'MiP / SMD',
    description: 'Excellent choice for larger meeting rooms and mid-sized venues. P1.8 offers outstanding value for most corporate applications while maintaining professional-grade image quality.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/7ceea0de8f06b9320af2d5562390c594e33592eac85f0e367a450cdc7df16b06.png',
    specs: {
      pixelPitch: '1.8mm',
      resolution: '308,642 pixels/m²',
      brightness: '600-1200 cd/m²',
      refreshRate: '3840Hz',
      contrast: '5,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '160W/m² avg',
      weight: '18kg/m²',
      cabinetSize: '600×337.5mm',
      ipRating: 'IP30 (Indoor)',
      operatingTemp: '0°C to 45°C',
    },
    applications: ['Large Meeting Rooms', 'Training Centers', 'Retail', 'Hospitality', 'Lecture Halls', 'Corporate Events'],
    features: [
      { icon: Cpu, title: 'Budget Friendly', desc: 'Premium look at accessible price' },
      { icon: Eye, title: 'Seamless', desc: 'Invisible bezels unlike LCD video walls' },
      { icon: Zap, title: 'Low Maintenance', desc: 'Minimal ongoing costs' },
      { icon: Shield, title: 'Proven', desc: 'Mature, reliable technology' },
    ],
    viewingDistance: { min: '1.8m', optimal: '5m+', max: '27m' },
    priceRange: '$$',
    color: 'from-cyan-500 to-blue-600',
    bgGlow: 'bg-cyan-500/20',
  },
  'p2-0': {
    pitch: 'P2.0',
    name: 'Commercial P2.0',
    series: 'Commercial Series',
    seriesId: 'commercial',
    seriesLink: '/indoor-led',
    tagline: 'Retail & Public Spaces',
    technology: 'SMD / MiP',
    description: 'Optimized for retail environments and public spaces. P2.0 delivers vibrant visuals at distances where fine pitch is overkill. High brightness cuts through ambient light in busy commercial settings.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/1bd5cbd91c0734a688576c1f4456fe2d460034a918b2c8ae0815bf519daabf08.png',
    specs: {
      pixelPitch: '2.0mm',
      resolution: '250,000 pixels/m²',
      brightness: '800-1500 cd/m²',
      refreshRate: '3840Hz',
      contrast: '5,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '150W/m² avg',
      weight: '16kg/m²',
      cabinetSize: '500×500mm',
      ipRating: 'IP30 (Indoor)',
      operatingTemp: '0°C to 45°C',
    },
    applications: ['Retail Stores', 'Shopping Malls', 'Airports', 'Hotels', 'Banks', 'Quick Service Restaurants'],
    features: [
      { icon: Cpu, title: 'High Brightness', desc: 'Cuts through ambient light' },
      { icon: Eye, title: 'Vibrant Colors', desc: 'Eye-catching retail visuals' },
      { icon: Zap, title: 'Cost Effective', desc: 'Great value for larger displays' },
      { icon: Shield, title: 'Durable', desc: 'Built for high-traffic environments' },
    ],
    viewingDistance: { min: '2m', optimal: '5m+', max: '30m' },
    priceRange: '$$',
    color: 'from-emerald-500 to-teal-600',
    bgGlow: 'bg-emerald-500/20',
  },
  'p2-5': {
    pitch: 'P2.5',
    name: 'Commercial P2.5',
    series: 'Commercial Series',
    seriesId: 'commercial',
    seriesLink: '/indoor-led',
    tagline: 'Versatile Commercial',
    technology: 'SMD',
    description: 'The industry workhorse for indoor commercial applications. P2.5 is the go-to choice for most retail and public space installations, offering the perfect balance of resolution, reliability, and value.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/4d5489635e70b8f867ea4f914234325f9a969d77f2e849f0d7a706ec1c9a7712.png',
    specs: {
      pixelPitch: '2.5mm',
      resolution: '160,000 pixels/m²',
      brightness: '800-1500 cd/m²',
      refreshRate: '1920Hz',
      contrast: '5,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '130W/m² avg',
      weight: '14kg/m²',
      cabinetSize: '500×500mm',
      ipRating: 'IP30 (Indoor)',
      operatingTemp: '0°C to 45°C',
    },
    applications: ['Retail', 'Transit', 'Hospitality', 'Entertainment', 'F&B', 'Automotive Showrooms'],
    features: [
      { icon: Cpu, title: 'Industry Standard', desc: 'Most popular indoor pitch' },
      { icon: Eye, title: 'Reliable', desc: 'Millions of sqm installed worldwide' },
      { icon: Zap, title: 'Easy Sourcing', desc: 'Parts readily available' },
      { icon: Shield, title: 'Flexible', desc: 'Works for almost any indoor application' },
    ],
    viewingDistance: { min: '2.5m', optimal: '6m+', max: '35m' },
    priceRange: '$$',
    color: 'from-emerald-500 to-teal-600',
    bgGlow: 'bg-emerald-500/20',
  },
  'p3-0': {
    pitch: 'P3.0',
    name: 'Commercial P3.0',
    series: 'Commercial Series',
    seriesId: 'commercial',
    seriesLink: '/indoor-led',
    tagline: 'Value Champion',
    technology: 'SMD',
    description: 'Maximum value for larger indoor spaces. P3.0 delivers excellent visual impact at the lowest cost per square meter, perfect for sports bars, large retail spaces, and venues with longer viewing distances.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/d33d676eb1b2efaa913300daec1ef5e97f84176124528e3a532e4ac09765c039.png',
    specs: {
      pixelPitch: '3.0mm',
      resolution: '111,111 pixels/m²',
      brightness: '1000-2000 cd/m²',
      refreshRate: '1920Hz',
      contrast: '4,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '120W/m² avg',
      weight: '12kg/m²',
      cabinetSize: '500×500mm',
      ipRating: 'IP30 (Indoor)',
      operatingTemp: '0°C to 45°C',
    },
    applications: ['Large Retail', 'Auditoriums', 'Sports Bars', 'Event Spaces', 'Warehouses', 'Factory Floors'],
    features: [
      { icon: Cpu, title: 'Best Value', desc: 'Lowest cost per sqm in commercial range' },
      { icon: Eye, title: 'High Brightness', desc: 'Great for well-lit spaces' },
      { icon: Zap, title: 'Large Formats', desc: 'Economical for big displays' },
      { icon: Shield, title: 'Proven', desc: 'Decades of proven performance' },
    ],
    viewingDistance: { min: '3m', optimal: '8m+', max: '45m' },
    priceRange: '$',
    color: 'from-emerald-500 to-teal-600',
    bgGlow: 'bg-emerald-500/20',
  },
  'p3-9': {
    pitch: 'P3.9',
    name: 'Standard P3.9',
    series: 'Standard Series',
    seriesId: 'standard',
    seriesLink: '/indoor-led',
    tagline: 'Large Venue Standard',
    technology: 'SMD',
    description: 'Designed for auditoriums and large event spaces where viewing distances exceed 4 meters. P3.9 delivers impressive visual impact for concerts, conferences, and worship spaces.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/55c2bd23e375cb2b18f8950ed29bfb7c64a5965765833b8af328c95ba80b99ee.png',
    specs: {
      pixelPitch: '3.91mm',
      resolution: '65,746 pixels/m²',
      brightness: '1000-2000 cd/m²',
      refreshRate: '1920Hz',
      contrast: '4,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '100W/m² avg',
      weight: '10kg/m²',
      cabinetSize: '500×500mm',
      ipRating: 'IP30 (Indoor)',
      operatingTemp: '0°C to 45°C',
    },
    applications: ['Auditoriums', 'Houses of Worship', 'Concert Halls', 'Large Events', 'Convention Centers', 'Theaters'],
    features: [
      { icon: Cpu, title: 'Large Scale', desc: 'Perfect for massive displays' },
      { icon: Eye, title: 'Impact', desc: 'Impressive visual impact from distance' },
      { icon: Zap, title: 'Affordable', desc: 'Cover large areas economically' },
      { icon: Shield, title: 'Lightweight', desc: 'Easier rigging and installation' },
    ],
    viewingDistance: { min: '4m', optimal: '10m+', max: '60m' },
    priceRange: '$',
    color: 'from-amber-500 to-orange-600',
    bgGlow: 'bg-amber-500/20',
  },
  'p4-0': {
    pitch: 'P4.0',
    name: 'Standard P4.0',
    series: 'Standard Series',
    seriesId: 'standard',
    seriesLink: '/indoor-led',
    tagline: 'Budget Large Format',
    technology: 'SMD',
    description: 'Maximum coverage at minimum cost. P4.0 is ideal for very large indoor displays viewed from significant distances, delivering impressive visuals for sports arenas and convention centers.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/9f479f117b354b20a3e7cdcade2c555aaaaecc4035c6de8e71b009cd50b97a2e.png',
    specs: {
      pixelPitch: '4.0mm',
      resolution: '62,500 pixels/m²',
      brightness: '1000-2000 cd/m²',
      refreshRate: '1920Hz',
      contrast: '4,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '90W/m² avg',
      weight: '9kg/m²',
      cabinetSize: '500×500mm',
      ipRating: 'IP30 (Indoor)',
      operatingTemp: '0°C to 45°C',
    },
    applications: ['Sports Arenas', 'Convention Centers', 'Large Venues', 'Warehouses', 'Exhibition Halls', 'Stadiums'],
    features: [
      { icon: Cpu, title: 'Economical', desc: 'Lowest cost indoor option' },
      { icon: Eye, title: 'Coverage', desc: 'Maximum area for budget' },
      { icon: Zap, title: 'Simple', desc: 'Easy installation and maintenance' },
      { icon: Shield, title: 'Reliable', desc: 'Proven performance over years' },
    ],
    viewingDistance: { min: '4m', optimal: '10m+', max: '60m' },
    priceRange: '$',
    color: 'from-amber-500 to-orange-600',
    bgGlow: 'bg-amber-500/20',
  },
};

/* ============================================
   COMPLETE OUTDOOR LED PRODUCT DATA
   ============================================ */
const OUTDOOR_PRODUCTS = {
  'p2-5': {
    pitch: 'P2.5',
    name: 'OutdoorHD P2.5',
    series: 'OutdoorHD Series',
    seriesId: 'outdoor-hd',
    seriesLink: '/outdoor-led',
    tagline: 'Fine Pitch Outdoor',
    technology: 'SMD (GOB)',
    description: 'The finest pitch for outdoor use. P2.5 Outdoor brings indoor-quality resolution to weatherproof applications. Ideal for premium storefronts and transit stations where close viewing demands high pixel density.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/38bee6a202df409b76b210a30ef7a5c41a0a30536ddc1eb634e34ef9fc55d784.png',
    specs: {
      pixelPitch: '2.5mm',
      resolution: '160,000 pixels/m²',
      brightness: '6,000 cd/m²',
      refreshRate: '3840Hz',
      contrast: '5,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '350W/m² avg',
      weight: '35kg/m²',
      cabinetSize: '500×500mm',
      ipRating: 'IP65 Front / IP54 Rear',
      operatingTemp: '-20°C to 50°C',
    },
    applications: ['Premium Storefronts', 'Transit Stations', 'Urban Media', 'Outdoor Retail', 'Building Entrances', 'Bus Shelters'],
    features: [
      { icon: Sun, title: '6,000 nits', desc: 'Sunlight readable even in direct sun' },
      { icon: Shield, title: 'IP65 Rated', desc: 'Full weather protection' },
      { icon: Eye, title: 'HD Quality', desc: 'Indoor resolution outdoors' },
      { icon: Zap, title: 'GOB Protected', desc: 'Glue-on-Board surface protection' },
    ],
    viewingDistance: { min: '2.5m', optimal: '6m+', max: '35m' },
    priceRange: '$$$',
    color: 'from-cyan-500 to-blue-600',
    bgGlow: 'bg-cyan-500/20',
  },
  'p3-0': {
    pitch: 'P3.0',
    name: 'OutdoorHD P3.0',
    series: 'OutdoorHD Series',
    seriesId: 'outdoor-hd',
    seriesLink: '/outdoor-led',
    tagline: 'Premium Outdoor',
    technology: 'SMD (GOB)',
    description: 'High resolution outdoor display for close-viewing applications. Perfect balance of quality and durability for shopping centers, outdoor events, and building entrances.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c6d5b4abcf52bda71dccf67612fcbacf4b48607bbd586ada88807b84914b109b.png',
    specs: {
      pixelPitch: '3.0mm',
      resolution: '111,111 pixels/m²',
      brightness: '6,500 cd/m²',
      refreshRate: '3840Hz',
      contrast: '5,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '320W/m² avg',
      weight: '32kg/m²',
      cabinetSize: '500×500mm',
      ipRating: 'IP65 Front / IP54 Rear',
      operatingTemp: '-20°C to 50°C',
    },
    applications: ['Shopping Centers', 'Outdoor Events', 'Building Entrances', 'Sports Venues', 'Theme Parks', 'Retail Facades'],
    features: [
      { icon: Sun, title: '6,500 nits', desc: 'Excellent daytime visibility' },
      { icon: Shield, title: 'Weatherproof', desc: 'Rain, dust, and UV resistant' },
      { icon: Eye, title: 'Sharp Images', desc: 'Great for text and graphics' },
      { icon: Zap, title: 'Energy Efficient', desc: 'Smart power management' },
    ],
    viewingDistance: { min: '3m', optimal: '8m+', max: '45m' },
    priceRange: '$$$',
    color: 'from-cyan-500 to-blue-600',
    bgGlow: 'bg-cyan-500/20',
  },
  'p4-0': {
    pitch: 'P4.0',
    name: 'OutdoorPro P4.0',
    series: 'OutdoorPro Series',
    seriesId: 'outdoor-pro',
    seriesLink: '/outdoor-led',
    tagline: 'Professional Grade',
    technology: 'SMD',
    description: 'The workhorse of outdoor advertising. P4.0 delivers excellent visual quality for most outdoor applications with proven reliability and value.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/7224b70bfaa0d65f983d5239bc8fa72427b8d240aa62529778a255ce8de364fb.png',
    specs: {
      pixelPitch: '4.0mm',
      resolution: '62,500 pixels/m²',
      brightness: '7,000 cd/m²',
      refreshRate: '1920Hz',
      contrast: '4,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '280W/m² avg',
      weight: '28kg/m²',
      cabinetSize: '960×960mm',
      ipRating: 'IP65',
      operatingTemp: '-20°C to 50°C',
    },
    applications: ['Advertising', 'Sports Venues', 'Outdoor Events', 'Building Signage', 'Stadiums', 'Arenas'],
    features: [
      { icon: Sun, title: '7,000 nits', desc: 'Excellent all-day visibility' },
      { icon: Shield, title: 'IP65 Full', desc: 'Complete environmental protection' },
      { icon: Eye, title: 'Versatile', desc: 'Works for video and static content' },
      { icon: Zap, title: 'Cost Effective', desc: 'Great value for outdoor use' },
    ],
    viewingDistance: { min: '4m', optimal: '10m+', max: '60m' },
    priceRange: '$$',
    color: 'from-emerald-500 to-teal-600',
    bgGlow: 'bg-emerald-500/20',
  },
  'p5-0': {
    pitch: 'P5.0',
    name: 'OutdoorPro P5.0',
    series: 'OutdoorPro Series',
    seriesId: 'outdoor-pro',
    seriesLink: '/outdoor-led',
    tagline: 'Value Leader',
    technology: 'SMD',
    description: 'Excellent value for mid-distance outdoor viewing. P5.0 covers more area for less investment, perfect for stadium perimeters and outdoor events.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/9fb784cbaf37a50cfecd9e46ad52e8023abaf721566dfc4085c14a88f7c21a65.png',
    specs: {
      pixelPitch: '5.0mm',
      resolution: '40,000 pixels/m²',
      brightness: '7,500 cd/m²',
      refreshRate: '1920Hz',
      contrast: '4,000:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '250W/m² avg',
      weight: '26kg/m²',
      cabinetSize: '960×960mm',
      ipRating: 'IP65',
      operatingTemp: '-20°C to 50°C',
    },
    applications: ['Advertising Boards', 'Stadium Perimeter', 'Outdoor Events', 'Building Facades', 'Concerts', 'Festivals'],
    features: [
      { icon: Sun, title: '7,500 nits', desc: 'Outstanding brightness' },
      { icon: Shield, title: 'Rugged', desc: 'Built for harsh conditions' },
      { icon: Eye, title: 'Coverage', desc: 'More display for your budget' },
      { icon: Zap, title: 'Efficient', desc: 'Lower running costs' },
    ],
    viewingDistance: { min: '5m', optimal: '12m+', max: '75m' },
    priceRange: '$$',
    color: 'from-emerald-500 to-teal-600',
    bgGlow: 'bg-emerald-500/20',
  },
  'p6-0': {
    pitch: 'P6.0',
    name: 'Billboard P6.0',
    series: 'Billboard Series',
    seriesId: 'billboard',
    seriesLink: '/outdoor-led',
    tagline: 'Billboard Standard',
    technology: 'SMD',
    description: 'Industry standard for digital billboards. P6.0 delivers excellent visibility at typical billboard viewing distances, ideal for highway advertising and rooftop signs.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/d7e9c37914e606f8f5da16e70f2973db4973b251038ac4fa10a6e0943eed7488.png',
    specs: {
      pixelPitch: '6.0mm',
      resolution: '27,778 pixels/m²',
      brightness: '8,000 cd/m²',
      refreshRate: '1920Hz',
      contrast: '3,500:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '220W/m² avg',
      weight: '24kg/m²',
      cabinetSize: '960×960mm',
      ipRating: 'IP65',
      operatingTemp: '-20°C to 50°C',
    },
    applications: ['Billboards', 'Rooftop Signs', 'Highway Displays', 'Large Facades', 'Airport Exteriors', 'Shopping Centers'],
    features: [
      { icon: Sun, title: '8,000 nits', desc: 'Highway-visible brightness' },
      { icon: Shield, title: 'UV Resistant', desc: 'Long-term outdoor durability' },
      { icon: Eye, title: 'Impact', desc: 'Grabs attention from distance' },
      { icon: Zap, title: 'ROI', desc: 'Fastest payback period' },
    ],
    viewingDistance: { min: '6m', optimal: '15m+', max: '90m' },
    priceRange: '$',
    color: 'from-orange-500 to-amber-600',
    bgGlow: 'bg-orange-500/20',
  },
  'p6-67': {
    pitch: 'P6.67',
    name: 'Billboard P6.67',
    series: 'Billboard Series',
    seriesId: 'billboard',
    seriesLink: '/outdoor-led',
    tagline: 'Popular Billboard',
    technology: 'SMD',
    description: 'Most popular billboard pitch worldwide. P6.67 offers the ideal balance of resolution and cost for advertising, making it the go-to choice for outdoor media owners.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f6ba4a8831a428d30a0204d451a5aa1869833c5db55a730ea73a6f4571a6a4b5.png',
    specs: {
      pixelPitch: '6.67mm',
      resolution: '22,500 pixels/m²',
      brightness: '8,500 cd/m²',
      refreshRate: '1920Hz',
      contrast: '3,500:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '200W/m² avg',
      weight: '22kg/m²',
      cabinetSize: '960×960mm',
      ipRating: 'IP65',
      operatingTemp: '-20°C to 50°C',
    },
    applications: ['Highway Billboards', 'Urban Advertising', 'Stadium Screens', 'Event Displays', 'Building Wraps', 'Media Towers'],
    features: [
      { icon: Sun, title: '8,500 nits', desc: 'Excellent daylight performance' },
      { icon: Shield, title: 'Proven', desc: 'Most installed outdoor pitch' },
      { icon: Eye, title: 'Optimized', desc: 'Perfect for advertising content' },
      { icon: Zap, title: 'Value', desc: 'Best ROI for outdoor advertising' },
    ],
    viewingDistance: { min: '7m', optimal: '18m+', max: '100m' },
    priceRange: '$',
    color: 'from-orange-500 to-amber-600',
    bgGlow: 'bg-orange-500/20',
  },
  'p8-0': {
    pitch: 'P8.0',
    name: 'Billboard P8.0',
    series: 'Billboard Series',
    seriesId: 'billboard',
    seriesLink: '/outdoor-led',
    tagline: 'Large Scale Billboard',
    technology: 'SMD',
    description: 'Maximum coverage for large-scale outdoor installations. P8.0 delivers impressive impact at long viewing distances, ideal for giant billboards and building wraps.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/e1a435d21a61e2e53b2af54b8b0207d5bcedc6f69a0fa322b075a9079f22cf32.png',
    specs: {
      pixelPitch: '8.0mm',
      resolution: '15,625 pixels/m²',
      brightness: '10,000 cd/m²',
      refreshRate: '1920Hz',
      contrast: '3,500:1',
      viewingAngle: '160°/160°',
      grayScale: '14bit',
      colorTemp: '3200K-9300K',
      lifespan: '100,000 hours',
      power: '180W/m² avg',
      weight: '20kg/m²',
      cabinetSize: '960×960mm',
      ipRating: 'IP65',
      operatingTemp: '-20°C to 50°C',
    },
    applications: ['Giant Billboards', 'Building Wraps', 'Stadium Main Screens', 'Landmark Displays', 'Skyscrapers', 'Media Facades'],
    features: [
      { icon: Sun, title: '10,000 nits', desc: 'Maximum brightness available' },
      { icon: Shield, title: 'Heavy Duty', desc: 'Built for permanent installation' },
      { icon: Eye, title: 'Massive', desc: 'Cover enormous areas' },
      { icon: Zap, title: 'Economical', desc: 'Lowest cost per sqm' },
    ],
    viewingDistance: { min: '8m', optimal: '20m+', max: '120m' },
    priceRange: '$',
    color: 'from-orange-500 to-amber-600',
    bgGlow: 'bg-orange-500/20',
  },
};

/* ============================================
   HELPER FUNCTIONS
   ============================================ */

const getSeriesProducts = (products, seriesId) => {
  return Object.entries(products)
    .filter(([_, p]) => p.seriesId === seriesId)
    .map(([slug, p]) => ({ slug, ...p }));
};

/* ============================================
   COMPONENT: Specification Card
   ============================================ */
const SpecCard = ({ icon: Icon, label, value, unit, isDark }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-5 rounded-2xl ${isDark ? 'bg-white/[0.03] border border-white/[0.06]' : 'bg-white border border-neutral-200'}`}
  >
    <div className="flex items-start gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-50'}`}>
        <Icon className="w-5 h-5 text-cyan-400" />
      </div>
      <div>
        <p className={`text-xs uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{label}</p>
        <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          {value}
          {unit && <span className={`text-sm font-normal ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}> {unit}</span>}
        </p>
      </div>
    </div>
  </motion.div>
);

/* ============================================
   COMPONENT: Related Product Card
   ============================================ */
const RelatedProductCard = ({ product, slug, isIndoor, isDark }) => (
  <Link
    to={`/${isIndoor ? 'indoor' : 'outdoor'}-led/${slug}`}
    className={`block p-4 rounded-xl ${isDark ? 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]' : 'bg-neutral-50 hover:bg-neutral-100'} transition-all group`}
  >
    <div className="flex items-center gap-4">
      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
            {product.pitch}
          </span>
          <span className={`text-sm ${isDark ? 'text-white' : 'text-neutral-900'} truncate`}>
            {product.name}
          </span>
        </div>
        <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
          {product.specs.resolution}
        </p>
      </div>
      <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-neutral-600' : 'text-neutral-400'} group-hover:translate-x-1 transition-transform`} />
    </div>
  </Link>
);

/* ============================================
   MAIN COMPONENT: LED Product Detail Page
   ============================================ */
export default function LEDProductDetailPage() {
  const { pitch } = useParams();
  const { isDark } = useTheme();
  const [specsExpanded, setSpecsExpanded] = useState(false);
  
  // Determine if indoor or outdoor based on URL
  const isIndoor = window.location.pathname.includes('/indoor-led/');
  const products = isIndoor ? INDOOR_PRODUCTS : OUTDOOR_PRODUCTS;
  const product = products[pitch];

  // Theme classes
  const bgColor = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';

  // Get related products from the same series
  const relatedProducts = product 
    ? getSeriesProducts(products, product.seriesId).filter(p => p.slug !== pitch).slice(0, 3) 
    : [];

  // 404 handling
  if (!product) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className="text-center px-6">
          <h1 className={`text-2xl font-bold ${textPrimary} mb-4`}>Product Not Found</h1>
          <p className={`${textSecondary} mb-6`}>The requested product could not be found.</p>
          <Link 
            to={isIndoor ? '/indoor-led' : '/outdoor-led'} 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft size={16} /> Back to {isIndoor ? 'Indoor' : 'Outdoor'} LED Series
          </Link>
        </div>
      </div>
    );
  }

  // Key specs for bento grid
  const keySpecs = [
    { icon: Grid3X3, label: 'Pixel Pitch', value: product.specs.pixelPitch },
    { icon: Monitor, label: 'Resolution', value: product.specs.resolution },
    { icon: Sun, label: 'Brightness', value: product.specs.brightness },
    { icon: RefreshCw, label: 'Refresh Rate', value: product.specs.refreshRate },
    { icon: Layers, label: 'Contrast', value: product.specs.contrast },
    { icon: Eye, label: 'Viewing Angle', value: product.specs.viewingAngle },
  ];

  return (
    <div className={`min-h-screen ${bgColor}`} data-testid="led-product-detail">
      <SEO
        title={`${product.name} — ${product.pitch} ${isIndoor ? 'Indoor' : 'Outdoor'} LED Display | Brightluxx`}
        description={product.description}
        path={`/${isIndoor ? 'indoor' : 'outdoor'}-led/${pitch}`}
      />

      {/* ============================================
          SECTION 1: IMMERSIVE HERO
          ============================================ */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/80 to-transparent" />
          {/* Ambient Glow */}
          <div className={`absolute bottom-0 left-1/4 w-96 h-96 ${product.bgGlow} blur-[150px] opacity-50`} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-16 lg:pb-24">
          <Breadcrumbs 
            items={[
              { name: 'Home', path: '/' }, 
              { name: isIndoor ? 'Indoor LED' : 'Outdoor LED', path: isIndoor ? '/indoor-led' : '/outdoor-led' },
              { name: product.pitch, path: null }
            ]} 
            className="mb-6" 
          />

          <Link 
            to={product.seriesLink} 
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-cyan-400 transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Back to {product.series}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Series Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider bg-gradient-to-r ${product.color} text-white`}>
                {product.pitch}
              </span>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                {product.series}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-white/70">
                {product.technology}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
              {product.name}
            </h1>

            {/* Tagline */}
            <p className={`text-xl md:text-2xl font-medium bg-gradient-to-r ${product.color} bg-clip-text text-transparent mb-6`}>
              {product.tagline}
            </p>

            {/* Description */}
            <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {product.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className={`bg-gradient-to-r ${product.color} text-white font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-all shadow-lg`}
                data-testid="request-quote-btn"
              >
                Request Quote <ArrowRight size={16} />
              </Link>
              <button 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:bg-white/20 transition-all"
                data-testid="download-datasheet-btn"
              >
                <Download size={16} /> Download Datasheet
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: KEY SPECIFICATIONS (BENTO GRID)
          ============================================ */}
      <section className={`py-16 lg:py-24 ${isDark ? 'bg-[#050508]' : 'bg-neutral-50'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Technical Overview</p>
            <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>Key Specifications</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {keySpecs.map((spec, index) => (
              <SpecCard key={spec.label} {...spec} isDark={isDark} />
            ))}
          </div>

          {/* Viewing Distance Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.06]' : 'bg-white border border-neutral-200'}`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <p className={`text-xs uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-400'} mb-1`}>Optimal Viewing Distance</p>
                <p className={`text-2xl font-bold ${textPrimary}`}>{product.viewingDistance.optimal}</p>
              </div>
              <div className="flex-1">
                <div className="relative h-3 rounded-full bg-neutral-800 overflow-hidden">
                  <div className={`absolute left-0 h-full bg-gradient-to-r ${product.color} rounded-full`} style={{ width: '60%' }} />
                </div>
                <div className="flex justify-between mt-2 text-xs text-neutral-500">
                  <span>Min: {product.viewingDistance.min}</span>
                  <span>Max: {product.viewingDistance.max}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: KEY FEATURES
          ============================================ */}
      <section className={`py-16 lg:py-24 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Why Choose This Display</p>
            <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>Key Features</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl ${isDark ? 'bg-white/[0.03] border border-white/[0.06]' : 'bg-neutral-50'} group hover:border-cyan-500/30 transition-all`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-50'} group-hover:bg-cyan-500/20 transition-colors`}>
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className={`font-semibold ${textPrimary} mb-2`}>{feature.title}</h3>
                <p className={`text-sm ${textSecondary}`}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: FULL SPECIFICATIONS
          ============================================ */}
      <section className={`py-16 lg:py-24 ${isDark ? 'bg-[#050508]' : 'bg-neutral-50'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Complete Details</p>
              <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>Technical Specifications</h2>
            </div>
            <button
              onClick={() => setSpecsExpanded(!specsExpanded)}
              className={`flex items-center gap-2 text-sm ${textSecondary} hover:text-cyan-400 transition-colors`}
            >
              {specsExpanded ? 'Show Less' : 'Show All'}
              <ChevronDown className={`w-4 h-4 transition-transform ${specsExpanded ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>

          <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-white/[0.02] border border-white/[0.06]' : 'bg-white shadow-lg'}`}>
            <div className="grid md:grid-cols-2">
              {Object.entries(product.specs)
                .slice(0, specsExpanded ? undefined : 8)
                .map(([key, value], index) => (
                <div 
                  key={key} 
                  className={`flex justify-between items-center px-6 py-4 ${index % 2 === 0 ? '' : isDark ? 'bg-white/[0.01]' : 'bg-neutral-50'} ${isDark ? 'border-b border-white/[0.04]' : 'border-b border-neutral-100'}`}
                >
                  <span className={`${textSecondary} capitalize`}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`font-medium ${textPrimary}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: APPLICATIONS
          ============================================ */}
      <section className={`py-16 lg:py-24 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Ideal Use Cases</p>
            <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>Recommended Applications</h2>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {product.applications.map((app, index) => (
              <motion.span 
                key={app}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium ${isDark ? 'bg-white/[0.05] text-white/80 border border-white/[0.08]' : 'bg-neutral-100 text-neutral-700'} inline-flex items-center gap-2`}
              >
                <Check size={14} className="text-cyan-400" />
                {app}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: RELATED PRODUCTS
          ============================================ */}
      {relatedProducts.length > 0 && (
        <section className={`py-16 lg:py-24 ${isDark ? 'bg-[#050508]' : 'bg-neutral-50'}`}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">More From {product.series}</p>
              <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>Related Products</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4">
              {relatedProducts.map((related) => (
                <RelatedProductCard 
                  key={related.slug} 
                  product={related} 
                  slug={related.slug} 
                  isIndoor={isIndoor} 
                  isDark={isDark} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          SECTION 7: CTA
          ============================================ */}
      <section className={`py-16 lg:py-24 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 md:p-12 rounded-3xl text-center ${isDark ? 'bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06]' : 'bg-neutral-50'}`}
          >
            {/* Ambient glow */}
            <div className={`absolute inset-0 ${product.bgGlow} opacity-20 blur-3xl rounded-3xl`} />
            
            <div className="relative z-10">
              <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary} mb-4`}>
                Ready to specify {product.pitch}?
              </h2>
              <p className={`${textSecondary} mb-8 max-w-xl mx-auto`}>
                Get a custom quote with delivery timeline and installation support for your project.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/contact"
                  className={`bg-gradient-to-r ${product.color} text-white font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-all shadow-lg`}
                >
                  Get Custom Quote <ArrowRight size={16} />
                </Link>
                <Link
                  to="/calculator"
                  className={`${isDark ? 'bg-white/10 hover:bg-white/20 border border-white/20' : 'bg-neutral-100 hover:bg-neutral-200'} ${textPrimary} font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 transition-all`}
                >
                  Screen Calculator
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
