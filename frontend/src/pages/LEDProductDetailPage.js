import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Monitor, Cpu, Layers, Sun, Shield, Zap, Ruler, Eye, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../contexts/ThemeContext';

/* Complete Indoor LED Product Data */
const INDOOR_PRODUCTS = {
  'p0-5': {
    pitch: 'P0.5',
    name: 'UltraFine P0.5',
    series: 'UltraFine Series',
    seriesLink: '/indoor-led',
    tagline: 'Ultimate 8K Resolution',
    technology: 'MicroLED',
    description: 'The pinnacle of LED display technology. P0.5 MicroLED delivers unprecedented pixel density for mission-critical applications where every detail matters.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
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
    applications: ['8K Control Rooms', 'Broadcast Studios', 'Command Centers', 'Medical Imaging', 'Luxury Retail'],
    features: [
      { icon: Cpu, title: 'MicroLED Technology', desc: 'Self-emissive pixels with perfect blacks and infinite contrast' },
      { icon: Eye, title: '8K Ready', desc: 'Supports native 8K content at close viewing distances' },
      { icon: Zap, title: 'HDR Support', desc: 'Wide color gamut covering 100% DCI-P3' },
      { icon: Shield, title: '100,000 Hour Lifespan', desc: '24/7 operation capability with minimal maintenance' },
    ],
    viewingDistance: { min: '0.5m', optimal: '1.5m+' },
    priceRange: '$$$$$',
    color: 'from-purple-500 to-violet-600',
  },
  'p0-7': {
    pitch: 'P0.7',
    name: 'UltraFine P0.7',
    series: 'UltraFine Series',
    seriesLink: '/indoor-led',
    tagline: 'Premium 4K/8K Display',
    technology: 'MicroLED / COB',
    description: 'Exceptional resolution for control rooms and broadcast environments. P0.7 balances ultra-fine pitch with proven reliability.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
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
    applications: ['Control Rooms', 'Broadcast Studios', 'Corporate Boardrooms', 'Museums'],
    features: [
      { icon: Cpu, title: 'COB Technology', desc: 'Chip-on-Board for superior protection and contrast' },
      { icon: Eye, title: '4K Native', desc: 'Perfect for 4K content at close viewing' },
      { icon: Zap, title: 'Wide Color Gamut', desc: '95% DCI-P3 coverage' },
      { icon: Shield, title: 'Dust Sealed', desc: 'Fully sealed surface prevents debris damage' },
    ],
    viewingDistance: { min: '0.7m', optimal: '2m+' },
    priceRange: '$$$$',
    color: 'from-purple-500 to-violet-600',
  },
  'p0-9': {
    pitch: 'P0.9',
    name: 'UltraFine P0.9',
    series: 'UltraFine Series',
    seriesLink: '/indoor-led',
    tagline: 'High-End Commercial',
    technology: 'COB',
    description: 'The sweet spot for premium installations. P0.9 COB delivers outstanding image quality for boardrooms, lobbies, and high-end retail.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
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
    applications: ['Corporate Headquarters', 'Luxury Retail', 'Museums', 'Broadcast'],
    features: [
      { icon: Cpu, title: 'COB Technology', desc: 'Best-in-class contrast and protection' },
      { icon: Eye, title: 'Text Clarity', desc: 'Sharp text rendering for data-heavy content' },
      { icon: Zap, title: 'Energy Efficient', desc: 'Lower power consumption than older technologies' },
      { icon: Shield, title: 'Easy Maintenance', desc: 'Front-serviceable design' },
    ],
    viewingDistance: { min: '0.9m', optimal: '2.5m+' },
    priceRange: '$$$$',
    color: 'from-purple-500 to-violet-600',
  },
  'p1-2': {
    pitch: 'P1.2',
    name: 'ProFine P1.2',
    series: 'ProFine Series',
    seriesLink: '/indoor-led',
    tagline: 'Premium Corporate Grade',
    technology: 'COB / MiP',
    description: 'Ideal for boardrooms and corporate environments where image quality meets practical budgets. P1.2 delivers excellent resolution without premium pricing.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
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
    applications: ['Boardrooms', 'Conference Centers', 'Corporate Lobbies', 'Museums'],
    features: [
      { icon: Cpu, title: 'MiP Technology', desc: '85-90% COB quality at better value' },
      { icon: Eye, title: 'Sharp Visuals', desc: 'Excellent for presentations and video' },
      { icon: Zap, title: 'Value Leader', desc: 'Best price-performance in fine pitch' },
      { icon: Shield, title: 'Reliable', desc: 'Proven technology with long track record' },
    ],
    viewingDistance: { min: '1.2m', optimal: '3m+' },
    priceRange: '$$$',
    color: 'from-cyan-500 to-blue-600',
  },
  'p1-5': {
    pitch: 'P1.5',
    name: 'ProFine P1.5',
    series: 'ProFine Series',
    seriesLink: '/indoor-led',
    tagline: 'Mainstream Premium',
    technology: 'COB / MiP',
    description: 'The most popular fine-pitch option. P1.5 balances resolution, reliability, and cost for a wide range of professional applications.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
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
    applications: ['Meeting Rooms', 'Lobbies', 'Retail', 'Education'],
    features: [
      { icon: Cpu, title: 'Versatile', desc: 'Works for video, presentations, and signage' },
      { icon: Eye, title: 'Great Value', desc: 'Most cost-effective fine pitch' },
      { icon: Zap, title: 'Easy Upgrade', desc: 'Replace aging LCD video walls' },
      { icon: Shield, title: '24/7 Ready', desc: 'Designed for continuous operation' },
    ],
    viewingDistance: { min: '1.5m', optimal: '4m+' },
    priceRange: '$$$',
    color: 'from-cyan-500 to-blue-600',
  },
  'p1-8': {
    pitch: 'P1.8',
    name: 'ProFine P1.8',
    series: 'ProFine Series',
    seriesLink: '/indoor-led',
    tagline: 'Corporate Workhorse',
    technology: 'MiP / SMD',
    description: 'Excellent choice for larger meeting rooms and mid-sized venues. P1.8 offers outstanding value for most corporate applications.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
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
    applications: ['Large Meeting Rooms', 'Training Centers', 'Retail', 'Hospitality'],
    features: [
      { icon: Cpu, title: 'Budget Friendly', desc: 'Premium look at accessible price' },
      { icon: Eye, title: 'Seamless', desc: 'Invisible bezels unlike LCD video walls' },
      { icon: Zap, title: 'Low Maintenance', desc: 'Minimal ongoing costs' },
      { icon: Shield, title: 'Proven', desc: 'Mature, reliable technology' },
    ],
    viewingDistance: { min: '1.8m', optimal: '5m+' },
    priceRange: '$$',
    color: 'from-cyan-500 to-blue-600',
  },
  'p2-0': {
    pitch: 'P2.0',
    name: 'Commercial P2.0',
    series: 'Commercial Series',
    seriesLink: '/indoor-led',
    tagline: 'Retail & Public Spaces',
    technology: 'SMD / MiP',
    description: 'Optimized for retail environments and public spaces. P2.0 delivers vibrant visuals at distances where fine pitch is overkill.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
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
    applications: ['Retail Stores', 'Shopping Malls', 'Airports', 'Hotels'],
    features: [
      { icon: Cpu, title: 'High Brightness', desc: 'Cuts through ambient light' },
      { icon: Eye, title: 'Vibrant Colors', desc: 'Eye-catching retail visuals' },
      { icon: Zap, title: 'Cost Effective', desc: 'Great value for larger displays' },
      { icon: Shield, title: 'Durable', desc: 'Built for high-traffic environments' },
    ],
    viewingDistance: { min: '2m', optimal: '5m+' },
    priceRange: '$$',
    color: 'from-emerald-500 to-teal-600',
  },
  'p2-5': {
    pitch: 'P2.5',
    name: 'Commercial P2.5',
    series: 'Commercial Series',
    seriesLink: '/indoor-led',
    tagline: 'Versatile Commercial',
    technology: 'SMD',
    description: 'The industry workhorse for indoor commercial applications. P2.5 is the go-to choice for most retail and public space installations.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
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
    applications: ['Retail', 'Transit', 'Hospitality', 'Entertainment'],
    features: [
      { icon: Cpu, title: 'Industry Standard', desc: 'Most popular indoor pitch' },
      { icon: Eye, title: 'Reliable', desc: 'Millions of sqm installed worldwide' },
      { icon: Zap, title: 'Easy Sourcing', desc: 'Parts readily available' },
      { icon: Shield, title: 'Flexible', desc: 'Works for almost any indoor application' },
    ],
    viewingDistance: { min: '2.5m', optimal: '6m+' },
    priceRange: '$$',
    color: 'from-emerald-500 to-teal-600',
  },
  'p3-0': {
    pitch: 'P3.0',
    name: 'Commercial P3.0',
    series: 'Commercial Series',
    seriesLink: '/indoor-led',
    tagline: 'Value Champion',
    technology: 'SMD',
    description: 'Maximum value for larger indoor spaces. P3.0 delivers excellent visual impact at the lowest cost per square meter.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
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
    applications: ['Large Retail', 'Auditoriums', 'Sports Bars', 'Event Spaces'],
    features: [
      { icon: Cpu, title: 'Best Value', desc: 'Lowest cost per sqm in commercial range' },
      { icon: Eye, title: 'High Brightness', desc: 'Great for well-lit spaces' },
      { icon: Zap, title: 'Large Formats', desc: 'Economical for big displays' },
      { icon: Shield, title: 'Proven', desc: 'Decades of proven performance' },
    ],
    viewingDistance: { min: '3m', optimal: '8m+' },
    priceRange: '$',
    color: 'from-emerald-500 to-teal-600',
  },
  'p3-9': {
    pitch: 'P3.9',
    name: 'Standard P3.9',
    series: 'Standard Series',
    seriesLink: '/indoor-led',
    tagline: 'Large Venue Standard',
    technology: 'SMD',
    description: 'Designed for auditoriums and large event spaces where viewing distances exceed 4 meters.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
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
    applications: ['Auditoriums', 'Houses of Worship', 'Concert Halls', 'Large Events'],
    features: [
      { icon: Cpu, title: 'Large Scale', desc: 'Perfect for massive displays' },
      { icon: Eye, title: 'Impact', desc: 'Impressive visual impact from distance' },
      { icon: Zap, title: 'Affordable', desc: 'Cover large areas economically' },
      { icon: Shield, title: 'Lightweight', desc: 'Easier rigging and installation' },
    ],
    viewingDistance: { min: '4m', optimal: '10m+' },
    priceRange: '$',
    color: 'from-amber-500 to-orange-600',
  },
  'p4-0': {
    pitch: 'P4.0',
    name: 'Standard P4.0',
    series: 'Standard Series',
    seriesLink: '/indoor-led',
    tagline: 'Budget Large Format',
    technology: 'SMD',
    description: 'Maximum coverage at minimum cost. P4.0 is ideal for very large indoor displays viewed from significant distances.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
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
    applications: ['Sports Arenas', 'Convention Centers', 'Large Venues', 'Warehouses'],
    features: [
      { icon: Cpu, title: 'Economical', desc: 'Lowest cost indoor option' },
      { icon: Eye, title: 'Coverage', desc: 'Maximum area for budget' },
      { icon: Zap, title: 'Simple', desc: 'Easy installation and maintenance' },
      { icon: Shield, title: 'Reliable', desc: 'Proven performance over years' },
    ],
    viewingDistance: { min: '4m', optimal: '10m+' },
    priceRange: '$',
    color: 'from-amber-500 to-orange-600',
  },
};

/* Outdoor LED Product Data */
const OUTDOOR_PRODUCTS = {
  'p2-5': {
    pitch: 'P2.5',
    name: 'OutdoorHD P2.5',
    series: 'OutdoorHD Series',
    seriesLink: '/outdoor-led',
    tagline: 'Fine Pitch Outdoor',
    technology: 'SMD (GOB)',
    description: 'The finest pitch for outdoor use. P2.5 Outdoor brings indoor-quality resolution to weatherproof applications.',
    image: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800',
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
    applications: ['Premium Storefronts', 'Transit Stations', 'Urban Media', 'Outdoor Retail'],
    features: [
      { icon: Sun, title: '6,000 nits', desc: 'Sunlight readable even in direct sun' },
      { icon: Shield, title: 'IP65 Rated', desc: 'Full weather protection' },
      { icon: Eye, title: 'HD Quality', desc: 'Indoor resolution outdoors' },
      { icon: Zap, title: 'GOB Protected', desc: 'Glue-on-Board surface protection' },
    ],
    viewingDistance: { min: '2.5m', optimal: '6m+' },
    priceRange: '$$$',
    color: 'from-cyan-500 to-blue-600',
  },
  'p3-0': {
    pitch: 'P3.0',
    name: 'OutdoorHD P3.0',
    series: 'OutdoorHD Series',
    seriesLink: '/outdoor-led',
    tagline: 'Premium Outdoor',
    technology: 'SMD (GOB)',
    description: 'High resolution outdoor display for close-viewing applications. Perfect balance of quality and durability.',
    image: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800',
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
    applications: ['Shopping Centers', 'Outdoor Events', 'Building Entrances', 'Sports Venues'],
    features: [
      { icon: Sun, title: '6,500 nits', desc: 'Excellent daytime visibility' },
      { icon: Shield, title: 'Weatherproof', desc: 'Rain, dust, and UV resistant' },
      { icon: Eye, title: 'Sharp Images', desc: 'Great for text and graphics' },
      { icon: Zap, title: 'Energy Efficient', desc: 'Smart power management' },
    ],
    viewingDistance: { min: '3m', optimal: '8m+' },
    priceRange: '$$$',
    color: 'from-cyan-500 to-blue-600',
  },
  'p4-0': {
    pitch: 'P4.0',
    name: 'OutdoorPro P4.0',
    series: 'OutdoorPro Series',
    seriesLink: '/outdoor-led',
    tagline: 'Professional Grade',
    technology: 'SMD',
    description: 'The workhorse of outdoor advertising. P4.0 delivers excellent visual quality for most outdoor applications.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
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
    applications: ['Advertising', 'Sports Venues', 'Outdoor Events', 'Building Signage'],
    features: [
      { icon: Sun, title: '7,000 nits', desc: 'Excellent all-day visibility' },
      { icon: Shield, title: 'IP65 Full', desc: 'Complete environmental protection' },
      { icon: Eye, title: 'Versatile', desc: 'Works for video and static content' },
      { icon: Zap, title: 'Cost Effective', desc: 'Great value for outdoor use' },
    ],
    viewingDistance: { min: '4m', optimal: '10m+' },
    priceRange: '$$',
    color: 'from-emerald-500 to-teal-600',
  },
  'p5-0': {
    pitch: 'P5.0',
    name: 'OutdoorPro P5.0',
    series: 'OutdoorPro Series',
    seriesLink: '/outdoor-led',
    tagline: 'Value Leader',
    technology: 'SMD',
    description: 'Excellent value for mid-distance outdoor viewing. P5.0 covers more area for less investment.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
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
    applications: ['Advertising Boards', 'Stadium Perimeter', 'Outdoor Events', 'Building Facades'],
    features: [
      { icon: Sun, title: '7,500 nits', desc: 'Outstanding brightness' },
      { icon: Shield, title: 'Rugged', desc: 'Built for harsh conditions' },
      { icon: Eye, title: 'Coverage', desc: 'More display for your budget' },
      { icon: Zap, title: 'Efficient', desc: 'Lower running costs' },
    ],
    viewingDistance: { min: '5m', optimal: '12m+' },
    priceRange: '$$',
    color: 'from-emerald-500 to-teal-600',
  },
  'p6-0': {
    pitch: 'P6.0',
    name: 'Billboard P6.0',
    series: 'Billboard Series',
    seriesLink: '/outdoor-led',
    tagline: 'Billboard Standard',
    technology: 'SMD',
    description: 'Industry standard for digital billboards. P6.0 delivers excellent visibility at typical billboard viewing distances.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
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
    applications: ['Billboards', 'Rooftop Signs', 'Highway Displays', 'Large Facades'],
    features: [
      { icon: Sun, title: '8,000 nits', desc: 'Highway-visible brightness' },
      { icon: Shield, title: 'UV Resistant', desc: 'Long-term outdoor durability' },
      { icon: Eye, title: 'Impact', desc: 'Grabs attention from distance' },
      { icon: Zap, title: 'ROI', desc: 'Fastest payback period' },
    ],
    viewingDistance: { min: '6m', optimal: '15m+' },
    priceRange: '$',
    color: 'from-orange-500 to-amber-600',
  },
  'p6-67': {
    pitch: 'P6.67',
    name: 'Billboard P6.67',
    series: 'Billboard Series',
    seriesLink: '/outdoor-led',
    tagline: 'Popular Billboard',
    technology: 'SMD',
    description: 'Most popular billboard pitch worldwide. P6.67 offers the ideal balance of resolution and cost for advertising.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
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
    applications: ['Highway Billboards', 'Urban Advertising', 'Stadium Screens', 'Event Displays'],
    features: [
      { icon: Sun, title: '8,500 nits', desc: 'Excellent daylight performance' },
      { icon: Shield, title: 'Proven', desc: 'Most installed outdoor pitch' },
      { icon: Eye, title: 'Optimized', desc: 'Perfect for advertising content' },
      { icon: Zap, title: 'Value', desc: 'Best ROI for outdoor advertising' },
    ],
    viewingDistance: { min: '7m', optimal: '18m+' },
    priceRange: '$',
    color: 'from-orange-500 to-amber-600',
  },
  'p8-0': {
    pitch: 'P8.0',
    name: 'Billboard P8.0',
    series: 'Billboard Series',
    seriesLink: '/outdoor-led',
    tagline: 'Large Scale Billboard',
    technology: 'SMD',
    description: 'Maximum coverage for large-scale outdoor installations. P8.0 delivers impressive impact at long viewing distances.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
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
    applications: ['Giant Billboards', 'Building Wraps', 'Stadium Main Screens', 'Landmark Displays'],
    features: [
      { icon: Sun, title: '10,000 nits', desc: 'Maximum brightness available' },
      { icon: Shield, title: 'Heavy Duty', desc: 'Built for permanent installation' },
      { icon: Eye, title: 'Massive', desc: 'Cover enormous areas' },
      { icon: Zap, title: 'Economical', desc: 'Lowest cost per sqm' },
    ],
    viewingDistance: { min: '8m', optimal: '20m+' },
    priceRange: '$',
    color: 'from-orange-500 to-amber-600',
  },
};

export default function LEDProductDetailPage() {
  const { pitch } = useParams();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('specs');
  
  // Determine if indoor or outdoor based on URL
  const isIndoor = window.location.pathname.includes('/indoor-led/');
  const products = isIndoor ? INDOOR_PRODUCTS : OUTDOOR_PRODUCTS;
  const product = products[pitch];

  const bgColor = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';

  if (!product) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Product Not Found</h1>
          <p className={`${textSecondary} mt-2`}>The requested product could not be found.</p>
          <Link to={isIndoor ? '/indoor-led' : '/outdoor-led'} className="text-cyan-400 mt-4 inline-block hover:underline">
            ← Back to {isIndoor ? 'Indoor' : 'Outdoor'} LED Series
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor}`} data-testid="led-product-detail">
      <SEO
        title={`${product.name} — ${product.pitch} ${isIndoor ? 'Indoor' : 'Outdoor'} LED Display | Brightluxx`}
        description={product.description}
        path={`/${isIndoor ? 'indoor' : 'outdoor'}-led/${pitch}`}
      />

      {/* Hero */}
      <section className="pt-8 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <Breadcrumbs 
            items={[
              { name: 'Home', path: '/' }, 
              { name: isIndoor ? 'Indoor LED' : 'Outdoor LED', path: isIndoor ? '/indoor-led' : '/outdoor-led' },
              { name: product.pitch, path: null }
            ]} 
            className="mb-8" 
          />

          <Link 
            to={product.seriesLink} 
            className={`inline-flex items-center gap-2 text-sm ${textSecondary} hover:text-cyan-400 transition-colors mb-6`}
          >
            <ArrowLeft size={16} /> Back to {product.series}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video rounded-2xl overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-20`} />
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${product.color} text-white`}>
                  {product.pitch}
                </span>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className={`text-xs font-semibold tracking-wider uppercase mb-2 bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
                {product.series} • {product.technology}
              </p>
              <h1 className={`text-3xl md:text-4xl font-bold ${textPrimary} mb-2`}>
                {product.name}
              </h1>
              <p className={`text-lg ${textSecondary} mb-6`}>
                {product.tagline}
              </p>
              <p className={`${textSecondary} mb-8`}>
                {product.description}
              </p>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white'}`}>
                  <p className={`text-xs ${textSecondary} uppercase tracking-wider`}>Resolution</p>
                  <p className={`text-lg font-bold ${textPrimary}`}>{product.specs.resolution}</p>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white'}`}>
                  <p className={`text-xs ${textSecondary} uppercase tracking-wider`}>Brightness</p>
                  <p className={`text-lg font-bold ${textPrimary}`}>{product.specs.brightness}</p>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white'}`}>
                  <p className={`text-xs ${textSecondary} uppercase tracking-wider`}>Viewing Distance</p>
                  <p className={`text-lg font-bold ${textPrimary}`}>{product.viewingDistance.optimal}</p>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white'}`}>
                  <p className={`text-xs ${textSecondary} uppercase tracking-wider`}>Price Range</p>
                  <p className={`text-lg font-bold ${textPrimary}`}>{product.priceRange}</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className={`bg-gradient-to-r ${product.color} text-white font-semibold px-8 py-3 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-opacity`}
                >
                  Request Quote <ArrowRight size={16} />
                </Link>
                <button className={`${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-neutral-100 hover:bg-neutral-200'} ${textPrimary} font-semibold px-8 py-3 rounded-full inline-flex items-center gap-2 transition-colors`}>
                  <Download size={16} /> Datasheet
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`py-16 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={`text-2xl font-bold ${textPrimary} mb-8`}>Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-neutral-50'}`}
              >
                <feature.icon className={`w-8 h-8 mb-4 bg-gradient-to-r ${product.color} bg-clip-text`} style={{ color: 'transparent', background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`, WebkitBackgroundClip: 'text' }} />
                <h3 className={`font-semibold ${textPrimary} mb-2`}>{feature.title}</h3>
                <p className={`text-sm ${textSecondary}`}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Specifications */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={`text-2xl font-bold ${textPrimary} mb-8`}>Technical Specifications</h2>
          <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-white/[0.03]' : 'bg-white shadow-lg'}`}>
            <div className="grid md:grid-cols-2">
              {Object.entries(product.specs).map(([key, value], index) => (
                <div 
                  key={key} 
                  className={`flex justify-between items-center px-6 py-4 ${index % 2 === 0 ? '' : isDark ? 'bg-white/[0.02]' : 'bg-neutral-50'} ${isDark ? 'border-b border-white/5' : 'border-b border-neutral-100'}`}
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

      {/* Applications */}
      <section className={`py-16 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={`text-2xl font-bold ${textPrimary} mb-8`}>Recommended Applications</h2>
          <div className="flex flex-wrap gap-3">
            {product.applications.map((app) => (
              <span 
                key={app} 
                className={`px-4 py-2 rounded-full text-sm ${isDark ? 'bg-white/5 text-white/80' : 'bg-neutral-100 text-neutral-700'} inline-flex items-center gap-2`}
              >
                <Check size={14} className="text-green-400" />
                {app}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className={`text-2xl font-bold ${textPrimary} mb-4`}>Ready to specify {product.pitch}?</h2>
          <p className={`${textSecondary} mb-8 max-w-xl mx-auto`}>
            Get a custom quote with delivery timeline and installation support for your project.
          </p>
          <Link
            to="/contact"
            className={`bg-gradient-to-r ${product.color} text-white font-semibold px-8 py-3 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-opacity`}
          >
            Get Custom Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
