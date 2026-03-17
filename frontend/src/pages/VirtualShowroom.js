import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, MapPin, Calendar, ArrowRight, Info } from 'lucide-react';
import { createLead } from '../api';

const VirtualShowroom = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    preferredDate: ''
  });

  // Showroom environments
  const environments = [
    {
      id: 'retail',
      name: 'Luxury Retail Experience',
      description: 'Explore transparent LED displays and 3D holographic technology in premium retail settings',
      image: '/generated/transparent_led_retail.png',
      location: 'Dubai Mall Concept Store',
      highlights: [
        {
          x: 30,
          y: 40,
          title: 'Transparent LED Film',
          description: '70-85% transparency, 4000 nits brightness',
          specs: 'Perfect for window displays while maintaining visibility'
        },
        {
          x: 65,
          y: 55,
          title: 'Interactive Touchpoints',
          description: 'Customer engagement through interactive content',
          specs: 'Increases dwell time by 45%'
        }
      ]
    },
    {
      id: 'corporate',
      name: 'Executive Boardroom',
      description: 'Ultra-fine pitch LED video walls for premium corporate environments',
      image: '/generated/corporate_boardroom.png',
      location: 'Business Bay Executive Suite',
      highlights: [
        {
          x: 50,
          y: 35,
          title: 'MicroLED Video Wall',
          description: '0.9mm pixel pitch, 8K resolution',
          specs: 'Seamless bezel-free display for presentations'
        },
        {
          x: 75,
          y: 60,
          title: 'Color Calibration',
          description: 'Professional grade color accuracy',
          specs: '24/7 reliable operation'
        }
      ]
    },
    {
      id: 'outdoor',
      name: 'Outdoor DOOH Billboard',
      description: 'High-brightness displays engineered for Dubai\'s intense sunlight',
      image: '/generated/outdoor_dooh_dubai.png',
      location: 'Sheikh Zayed Road Installation',
      highlights: [
        {
          x: 45,
          y: 45,
          title: 'Outdoor DOOH Ultra',
          description: '8000 nits brightness, IP65 weatherproof',
          specs: 'Visible in direct sunlight, -20°C to +60°C operation'
        },
        {
          x: 70,
          y: 30,
          title: 'Energy Efficient',
          description: 'Common cathode technology',
          specs: '40% power savings vs traditional displays'
        }
      ]
    },
    {
      id: '3d-mall',
      name: '3D Holographic Display',
      description: 'Glasses-free 3D technology creating unforgettable customer experiences',
      image: '/generated/3d_holographic_mall.png',
      location: 'Mall of Emirates Installation',
      highlights: [
        {
          x: 50,
          y: 50,
          title: '3D Holographic Display',
          description: 'Glasses-free 3D, anamorphic content',
          specs: '120° 3D viewing zone, viral social media potential'
        },
        {
          x: 30,
          y: 70,
          title: 'Crowd Engagement',
          description: 'Creates memorable brand moments',
          specs: '200% increase in dwell time'
        }
      ]
    },
    {
      id: 'event',
      name: 'Event Stage Production',
      description: 'Massive LED walls for concerts, conferences, and live events',
      image: '/generated/event_stage_led.png',
      location: 'Dubai World Trade Centre Setup',
      highlights: [
        {
          x: 50,
          y: 40,
          title: 'Rental LED System',
          description: 'Modular, fast setup design',
          specs: 'Lightweight, scalable, tour-ready'
        },
        {
          x: 65,
          y: 65,
          title: 'High Refresh Rate',
          description: '3840Hz for flicker-free video',
          specs: 'Perfect for cameras and live streaming'
        }
      ]
    },
    {
      id: 'control-room',
      name: 'Command & Control Center',
      description: 'Fine-pitch LED walls for mission-critical operations and monitoring',
      image: '/generated/control_room_led.png',
      location: 'Dubai Smart City Operations',
      highlights: [
        {
          x: 45,
          y: 35,
          title: 'Fine Pitch LED Wall',
          description: '1.2mm pitch, ultra-high resolution',
          specs: '24/7 operation, zero dead pixels guarantee'
        },
        {
          x: 70,
          y: 55,
          title: 'Multi-Source Display',
          description: 'Video wall processor integration',
          specs: 'Display multiple feeds simultaneously'
        }
      ]
    }
  ];

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createLead({
        ...formData,
        city: 'Dubai',
        application: 'Showroom Visit',
        message: `Requesting showroom visit. Preferred date: ${formData.preferredDate || 'Flexible'}. Interested in: ${selectedEnvironment ? environments.find(e => e.id === selectedEnvironment)?.name : 'General tour'}`,
        source: 'virtual_showroom'
      });

      alert('Showroom visit scheduled! We\'ll contact you to confirm the date and time.');
      setShowScheduleForm(false);
      setFormData({ name: '', email: '', phone: '', company: '', preferredDate: '' });
    } catch (error) {
      alert('Failed to schedule. Please try WhatsApp or call us directly.');
    }
  };

  const EnvironmentViewer = ({ environment }) => {
    const [activeHotspot, setActiveHotspot] = useState(null);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex flex-col"
      >
        {/* Header */}
        <div className="bg-[var(--blx-bg)] border-b border-[var(--blx-border)] p-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-display">{environment.name}</h3>
            <div className="flex items-center gap-2 text-sm text-[var(--blx-text-2)] mt-1">
              <MapPin size={14} />
              <span>{environment.location}</span>
            </div>
          </div>
          <button
            onClick={() => setSelectedEnvironment(null)}
            className="w-10 h-10 rounded-lg bg-[var(--blx-panel)] border border-[var(--blx-border)] flex items-center justify-center hover:border-[var(--blx-gold-3)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Environment View */}
        <div className="flex-1 relative">
          <img
            src={environment.image}
            alt={environment.name}
            className="w-full h-full object-cover"
          />

          {/* Hotspots */}
          {environment.highlights.map((hotspot, index) => (
            <div
              key={index}
              className="absolute"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === index ? null : index)}
                className="w-8 h-8 rounded-full bg-[var(--blx-gold-3)] border-4 border-white/30 flex items-center justify-center animate-glow cursor-pointer hover:scale-125 transition-transform"
              >
                <Info size={16} className="text-[var(--blx-bg)]" />
              </button>

              {/* Hotspot Info Panel */}
              <AnimatePresence>
                {activeHotspot === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute top-10 left-0 w-72 bg-[var(--blx-panel)] border border-[var(--blx-gold-2)] rounded-xl p-4 shadow-2xl z-10"
                    style={{ backdropFilter: 'blur(12px)' }}
                  >
                    <h4 className="font-bold mb-2 text-[var(--blx-gold-3)]">{hotspot.title}</h4>
                    <p className="text-sm text-[var(--blx-text-2)] mb-2">{hotspot.description}</p>
                    <p className="text-xs text-[var(--blx-muted)]">{hotspot.specs}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
            <p className="text-[var(--blx-text-2)] mb-4">{environment.description}</p>
            <button
              onClick={() => {
                setSelectedEnvironment(null);
                setShowScheduleForm(true);
              }}
              className="btn-gold px-6 py-3"
            >
              Schedule Showroom Visit
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="py-20" data-testid="showroom-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="text-xs uppercase tracking-[0.24em] text-[var(--blx-gold-3)] mb-4 font-medium">
            Virtual Experience
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
            Explore Our <span className="text-gradient">Virtual Showroom</span>
          </h1>
          <p className="text-lg text-[var(--blx-text-2)] max-w-3xl mx-auto leading-relaxed">
            Tour our LED display installations across Dubai. Click on any environment to explore interactive hotspots 
            and learn about the technology in action.
          </p>
        </motion.div>

        {/* Showroom Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--blx-gold-3)] mb-2">50+</div>
            <div className="text-sm text-[var(--blx-text-2)]">UAE Installations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--blx-gold-3)] mb-2">6</div>
            <div className="text-sm text-[var(--blx-text-2)]">Virtual Environments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--blx-gold-3)] mb-2">24/7</div>
            <div className="text-sm text-[var(--blx-text-2)]">Physical Showroom</div>
          </div>
        </div>

        {/* Environment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {environments.map((env, index) => (
            <motion.div
              key={env.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedEnvironment(env.id)}
              className="tech-card group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={env.image}
                  alt={env.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[var(--blx-gold-3)] mb-2">
                      <MapPin size={12} />
                      <span>{env.location}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{env.name}</h3>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-[var(--blx-gold-3)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={18} className="text-[var(--blx-bg)]" />
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[var(--blx-text-2)] mb-4">{env.description}</p>
                <div className="flex items-center text-[var(--blx-gold-3)] text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                  <span>Explore Environment</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Physical Showroom CTA */}
        <div className="bg-[var(--blx-panel)] border-2 border-[var(--blx-gold-2)] rounded-2xl p-8 md:p-12 text-center relative blx-noise">
          <div className="relative z-10">
            <Calendar className="w-12 h-12 text-[var(--blx-gold-3)] mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-display">
              Visit Our Physical Showroom
            </h3>
            <p className="text-[var(--blx-text-2)] mb-6 max-w-2xl mx-auto">
              Experience our LED displays in person at our Dubai showroom. See the technology up close, 
              test content, and consult with our technical team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowScheduleForm(true)}
                className="btn-gold px-8 py-4"
              >
                Schedule a Visit
              </button>
              <a
                href={`https://wa.me/971559954274?text=${encodeURIComponent('Hi, I want to schedule a showroom visit')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass px-8 py-4"
              >
                WhatsApp Us
              </a>
            </div>
            <p className="text-xs text-[var(--blx-muted)] mt-4">
              Open Monday-Saturday, 9 AM - 6 PM UAE Time
            </p>
          </div>
        </div>
      </div>

      {/* Environment Viewer Modal */}
      <AnimatePresence>
        {selectedEnvironment && (
          <EnvironmentViewer
            environment={environments.find(e => e.id === selectedEnvironment)}
          />
        )}
      </AnimatePresence>

      {/* Schedule Form Modal */}
      {showScheduleForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold mb-4">Schedule Showroom Visit</h3>
            <p className="text-sm text-[var(--blx-text-2)] mb-6">
              Book a private tour of our Dubai showroom. We'll contact you to confirm availability.
            </p>

            <form onSubmit={handleScheduleSubmit} className="space-y-4">
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
              <input
                type="date"
                placeholder="Preferred Date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                className="w-full"
              />

              <div className="flex gap-3">
                <button type="submit" className="btn-gold flex-1">
                  Schedule Visit
                </button>
                <button
                  type="button"
                  onClick={() => setShowScheduleForm(false)}
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
  );
};

export default VirtualShowroom;
