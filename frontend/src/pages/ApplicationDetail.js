import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Store, Building2, Briefcase, Stethoscope, Plane, Theater, Trophy, GraduationCap, Sun, CheckCircle, Zap, Eye, Ruler, DollarSign, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import CdnImage from '../components/CdnImage';

const API = process.env.REACT_APP_BACKEND_URL || '';

const useInView = (ref, threshold = 0.15) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
};

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden
    ${hover ? 'hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

const APPLICATIONS_DATA = {
  'shopfront-signage': {
    name: 'Shopfront Signage',
    tagline: 'High-Impact Retail Displays That Drive Foot Traffic',
    icon: Store,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/2a8354553d675b8761c0ae9c9361fb72e37971527a09dd533ec64fdfa97b8f42.png',
    description: 'Transform your storefront into a dynamic advertising platform with LED displays that capture attention day and night. From window displays to facade-mounted signage, our solutions are engineered for the demanding UAE retail environment.',
    challenges: [
      { title: 'High Ambient Light', desc: 'UAE storefronts face intense sunlight requiring 3,000-7,000+ nits brightness for visibility.' },
      { title: 'Space Constraints', desc: 'Narrow shopfronts and window installations need slim, lightweight solutions.' },
      { title: 'Content Flexibility', desc: 'Retail needs frequent content updates for promotions, sales, and seasonal campaigns.' },
      { title: '24/7 Operation', desc: 'Shopping districts operate late; displays must run continuously without overheating.' },
    ],
    solutions: [
      { title: 'Transparent LED', desc: 'See-through displays for glass facades that maintain natural light while showing content.', link: '/products/transparent-led' },
      { title: 'High-Brightness Outdoor', desc: 'P4-P10 outdoor-rated displays with 5,000-10,000 nits for direct sunlight visibility.', link: '/products?category=outdoor' },
      { title: 'Window LED Posters', desc: 'Slim LED poster displays for window installations with easy content management.', link: '/products/led-poster' },
    ],
    specs: [
      { label: 'Brightness', value: '3,000-10,000 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P2.5-P10', icon: Ruler },
      { label: 'IP Rating', value: 'IP65 (outdoor)', icon: Shield },
      { label: 'Viewing Distance', value: '1-30 meters', icon: Eye },
    ],
    caseStudyTags: ['retail', 'signage', 'shopfront'],
    faqs: [
      { q: 'What brightness is needed for a Dubai shopfront?', a: 'For direct sunlight exposure, 5,000-7,000 nits minimum. South/west-facing facades may need 8,000-10,000 nits. Shaded or covered areas can use 3,000-5,000 nits.' },
      { q: 'Can LED displays be installed on glass storefronts?', a: 'Yes, transparent LED displays are specifically designed for glass installations, offering 60-85% transparency while displaying vibrant content.' },
      { q: 'What is the lifespan of shopfront LED signage?', a: 'Quality outdoor LED displays last 50,000-100,000 hours (10-15 years) with proper maintenance and cooling.' },
    ],
    relatedSolution: 'retail',
  },
  'hospitality': {
    name: 'Hospitality & Hotels',
    tagline: 'Elevate Guest Experiences with Stunning Visual Displays',
    icon: Building2,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/7aee51984ef7428e636c2f56a202a90b74cac515bc9d49b80327e9c74a76d42e.png',
    description: 'Create memorable first impressions in hotel lobbies, enhance dining experiences in restaurants, and deliver seamless information in conference facilities. Our hospitality solutions blend technology with elegance for the UAE\'s world-class hotels and resorts.',
    challenges: [
      { title: 'Aesthetic Integration', desc: 'Displays must complement luxury interior design without appearing industrial.' },
      { title: 'Ambient Lighting Varies', desc: 'From bright lobbies to dim restaurants, displays need adaptive brightness.' },
      { title: 'Content Localization', desc: 'Multi-language support and culturally appropriate content for international guests.' },
      { title: 'Quiet Operation', desc: 'Guest areas require silent, fanless operation for comfortable environments.' },
    ],
    solutions: [
      { title: 'COB MicroLED', desc: 'Seamless, high-contrast displays with no visible pixel structure for premium lobbies.', link: '/technology/cob-led' },
      { title: 'All-in-One dvLED', desc: 'Integrated display systems with built-in processing for meeting rooms and conferences.', link: '/technology/all-in-one-dvled' },
      { title: 'Creative LED', desc: 'Custom shapes and curved displays for architectural feature walls.', link: '/technology/creative-led' },
    ],
    specs: [
      { label: 'Brightness', value: '400-1,500 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P0.9-P2.5', icon: Ruler },
      { label: 'Contrast', value: '10,000:1+', icon: Eye },
      { label: 'Power', value: '200-400 W/sqm', icon: Zap },
    ],
    caseStudyTags: ['hospitality', 'hotel', 'lobby', 'restaurant'],
    faqs: [
      { q: 'What pixel pitch is recommended for hotel lobbies?', a: 'For viewing distances of 3-8 meters typical in hotel lobbies, P1.2-P1.9 provides excellent image quality without visible pixels.' },
      { q: 'Can LED displays be curved for architectural features?', a: 'Yes, flexible LED modules allow concave and convex installations. Creative LED solutions can wrap around columns or create immersive curved walls.' },
      { q: 'How do you manage content across multiple hotel displays?', a: 'Centralized CMS platforms allow scheduling, multi-zone content, and remote management across all property displays.' },
    ],
    relatedSolution: 'hospitality',
  },
  'retail-malls': {
    name: 'Retail & Shopping Malls',
    tagline: 'Immersive Experiences That Transform Shopping Destinations',
    icon: Store,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/fe43f22500af65dab2a6a06f5df2fe660523726339ac9581b781476767b0b9b4.png',
    description: 'From spectacular atrium installations to interactive brand activations, LED displays are transforming UAE malls into entertainment destinations. Create landmark installations that drive social media engagement and foot traffic.',
    challenges: [
      { title: 'Large-Scale Installations', desc: 'Mall atriums require massive displays (100+ sqm) with complex structural integration.' },
      { title: 'High Foot Traffic', desc: 'Displays must withstand continuous viewing from multiple angles and distances.' },
      { title: 'Brand Experiences', desc: 'Retailers want interactive, immersive experiences that differentiate their stores.' },
      { title: 'Content Management', desc: 'Multiple advertisers and tenants need scheduled, zoned content delivery.' },
    ],
    solutions: [
      { title: '3D Anamorphic LED', desc: 'Glasses-free 3D content that creates viral social media moments.', link: '/technology/3d-anamorphic-led' },
      { title: 'Fine Pitch Indoor', desc: 'High-resolution displays for close-viewing retail environments.', link: '/technology/fine-pitch-led' },
      { title: 'Transparent LED', desc: 'Glass facade displays that maintain store visibility while advertising.', link: '/technology/transparent-led' },
    ],
    specs: [
      { label: 'Brightness', value: '800-2,000 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P1.5-P4', icon: Ruler },
      { label: 'Refresh Rate', value: '3,840 Hz+', icon: Zap },
      { label: 'Viewing Angle', value: '160°+', icon: Eye },
    ],
    caseStudyTags: ['retail', 'mall', 'shopping', 'brand'],
    faqs: [
      { q: 'What makes 3D anamorphic LED displays work?', a: '3D anamorphic displays use corner installations and specially created content to create depth illusions without glasses. The effect is strongest from specific viewing angles.' },
      { q: 'How are large mall displays installed?', a: 'Large installations require structural engineering, custom mounting systems, and phased installation. Our team handles everything from initial survey to final calibration.' },
      { q: 'Can multiple brands share advertising on mall displays?', a: 'Yes, CMS platforms support scheduled content from multiple advertisers with dayparting, duration control, and proof-of-play reporting.' },
    ],
    relatedSolution: 'retail',
  },
  'corporate': {
    name: 'Corporate & Offices',
    tagline: 'Professional Display Solutions for Modern Workplaces',
    icon: Briefcase,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/a379f5353c57d10c3ccb272e021b119bde5d9c6101d9a4d4f71817893955204d.png',
    description: 'Empower presentations, enhance collaboration, and create impressive reception areas with LED solutions designed for corporate environments. From boardrooms to command centers, we deliver professional-grade visual experiences.',
    challenges: [
      { title: 'Meeting Room Versatility', desc: 'Displays must work for presentations, video calls, and collaborative sessions.' },
      { title: 'Corporate AV Integration', desc: 'Seamless integration with existing VC systems, room controllers, and IT infrastructure.' },
      { title: 'Control Room Demands', desc: '24/7 operation for NOCs and command centers with critical uptime requirements.' },
      { title: 'Professional Aesthetics', desc: 'Clean, minimal designs that reflect corporate brand standards.' },
    ],
    solutions: [
      { title: 'All-in-One dvLED', desc: 'Plug-and-play meeting room displays with built-in Android and wireless sharing.', link: '/technology/all-in-one-dvled' },
      { title: 'COB MicroLED', desc: 'Ultra-fine pitch displays for executive boardrooms and close-viewing applications.', link: '/technology/cob-led' },
      { title: 'Fine Pitch Control Room', desc: '24/7 rated displays for command centers with 100,000+ hour lifespan.', link: '/products?category=control-room' },
    ],
    specs: [
      { label: 'Brightness', value: '400-800 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P0.7-P1.9', icon: Ruler },
      { label: 'Resolution', value: '4K-8K+', icon: Eye },
      { label: 'MTBF', value: '100,000 hrs', icon: Shield },
    ],
    caseStudyTags: ['corporate', 'office', 'boardroom', 'command center'],
    faqs: [
      { q: 'What size LED display replaces a projector in boardrooms?', a: 'Most boardrooms benefit from 138-165" (diagonal) displays, equivalent to 3m x 1.7m. This provides 4K resolution with P0.9-P1.2 pitch.' },
      { q: 'Do LED displays work with Microsoft Teams and Zoom?', a: 'Yes, All-in-One dvLED displays include native Teams/Zoom certification or HDMI inputs for external VC systems.' },
      { q: 'What maintenance do corporate LED displays require?', a: 'Minimal maintenance — annual calibration and periodic cleaning. Quality displays are designed for 50,000+ hours without module replacement.' },
    ],
    relatedSolution: 'corporate',
  },
  'healthcare': {
    name: 'Healthcare',
    tagline: 'Clear Communication for Critical Care Environments',
    icon: Stethoscope,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/20ff688183452b421340a26c5f7272a9fcb806cb4d30add3d3434cb033be1933.png',
    description: 'Improve patient experience and operational efficiency with LED displays designed for healthcare environments. From wayfinding to waiting room entertainment, our solutions meet the unique requirements of hospitals and medical facilities.',
    challenges: [
      { title: 'Infection Control', desc: 'Smooth, sealed surfaces that can be easily cleaned and disinfected.' },
      { title: 'Patient Comfort', desc: 'Low brightness options for sensitive environments, flicker-free for long viewing.' },
      { title: 'Critical Information', desc: 'Real-time integration with hospital systems for queue management and wayfinding.' },
      { title: 'Reliability', desc: 'Mission-critical displays for emergency departments and operating theaters.' },
    ],
    solutions: [
      { title: 'All-in-One dvLED', desc: 'Sealed, easy-to-clean displays for waiting areas and patient information.', link: '/technology/all-in-one-dvled' },
      { title: 'Fine Pitch Indoor', desc: 'High-resolution displays for detailed medical imaging and training.', link: '/technology/fine-pitch-led' },
    ],
    specs: [
      { label: 'Brightness', value: '300-600 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P1.2-P2.5', icon: Ruler },
      { label: 'Flicker', value: 'PWM 3,840 Hz+', icon: Eye },
      { label: 'Surface', value: 'IP30+ sealed', icon: Shield },
    ],
    caseStudyTags: ['healthcare', 'hospital', 'medical'],
    faqs: [
      { q: 'Are LED displays safe for hospital environments?', a: 'Yes, modern LED displays meet healthcare facility requirements. GOB and COB surfaces are sealed and easy to clean. Low EMI emissions are suitable for sensitive equipment areas.' },
      { q: 'Can displays integrate with hospital information systems?', a: 'Yes, displays can connect to queue management, wayfinding, and patient information systems via standard APIs and protocols.' },
      { q: 'What about patient privacy on waiting room displays?', a: 'Content management systems support zoned content, ensuring patient-specific information is only shown in appropriate areas.' },
    ],
    relatedSolution: 'corporate',
  },
  'transportation': {
    name: 'Transportation & Airports',
    tagline: 'Mission-Critical Displays for Transit Hubs',
    icon: Plane,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/51def6d71b2956b099c4c00d843cdad1fcde69379e77fa31d6d2c42ddcc07d60.png',
    description: 'Deliver critical information to millions of passengers with LED displays engineered for 24/7 operation in high-traffic environments. From flight information to advertising, our solutions power the UAE\'s world-class airports and transit systems.',
    challenges: [
      { title: '24/7 Reliability', desc: 'Airport FIDS displays cannot fail — redundancy and hot-swap capability required.' },
      { title: 'Readability', desc: 'Text-heavy content must be crisp and readable from varying distances and angles.' },
      { title: 'Integration', desc: 'Real-time feeds from flight information, metro scheduling, and advertising systems.' },
      { title: 'Scale', desc: 'Large installations across multiple terminals with centralized management.' },
    ],
    solutions: [
      { title: 'Fine Pitch Indoor', desc: 'High-resolution displays for FIDS and wayfinding with excellent text clarity.', link: '/technology/fine-pitch-led' },
      { title: 'Transparent LED', desc: 'Glass facade displays for terminal buildings and gate areas.', link: '/technology/transparent-led' },
      { title: 'Outdoor LED', desc: 'Weather-resistant displays for landside signage and parking structures.', link: '/products?category=outdoor' },
    ],
    specs: [
      { label: 'Uptime', value: '99.99%+', icon: Shield },
      { label: 'Pixel Pitch', value: 'P1.5-P4', icon: Ruler },
      { label: 'Redundancy', value: 'Hot-swap', icon: Zap },
      { label: 'Integration', value: 'ARINC/SITA', icon: Eye },
    ],
    caseStudyTags: ['transportation', 'airport', 'metro', 'transit'],
    faqs: [
      { q: 'What redundancy is built into airport LED displays?', a: 'Critical FIDS displays feature redundant power supplies, dual receiving cards, and hot-swappable modules for maintenance without downtime.' },
      { q: 'Can LED displays integrate with ARINC/SITA systems?', a: 'Yes, our displays integrate with standard airport information systems including ARINC, SITA, and custom FIDS platforms.' },
      { q: 'What pixel pitch is best for flight information displays?', a: 'P1.5-P2.5 is optimal for FIDS viewing distances of 5-15 meters, ensuring crisp text and flight codes.' },
    ],
    relatedSolution: 'transport',
  },
  'entertainment': {
    name: 'Entertainment & Cinemas',
    tagline: 'Immersive Experiences That Captivate Audiences',
    icon: Theater,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/085c5152d8cf0eebf7a6c56406448f78f7ffeaf9e345eec76fcfe22d45afa880.png',
    description: 'Create unforgettable experiences in cinemas, museums, theatres, and entertainment venues. From Cinema LED screens to immersive exhibition walls, our solutions deliver stunning visuals that transport audiences.',
    challenges: [
      { title: 'HDR & Color Accuracy', desc: 'Cinema-grade color reproduction for film and broadcast content.' },
      { title: 'Dark Environment Performance', desc: 'Deep blacks and high contrast ratios for theatrical viewing.' },
      { title: 'Large Format', desc: 'Cinema screens up to 20+ meters wide with seamless construction.' },
      { title: 'Content Standards', desc: 'DCI compliance for commercial cinema and broadcast production.' },
    ],
    solutions: [
      { title: 'Cinema LED', desc: 'DCI-certified LED screens for commercial cinemas with HDR and 4K+ resolution.', link: '/products/cinema-led' },
      { title: 'COB MicroLED', desc: 'Ultra-high contrast displays for premium screening rooms and museums.', link: '/technology/cob-led' },
      { title: 'Creative LED', desc: 'Immersive curved and shaped displays for exhibitions and attractions.', link: '/technology/creative-led' },
    ],
    specs: [
      { label: 'Contrast', value: '100,000:1+', icon: Eye },
      { label: 'Color Gamut', value: 'DCI-P3', icon: Sun },
      { label: 'Pixel Pitch', value: 'P0.9-P2.5', icon: Ruler },
      { label: 'HDR', value: 'Dolby Vision', icon: Sparkles },
    ],
    caseStudyTags: ['entertainment', 'cinema', 'museum', 'theatre'],
    faqs: [
      { q: 'How do LED cinema screens compare to projectors?', a: 'LED screens offer higher brightness (300+ nits vs 48 nits), better contrast, no light source replacement, and consistent image quality regardless of ambient light.' },
      { q: 'What is DCI certification?', a: 'DCI (Digital Cinema Initiatives) certification ensures displays meet Hollywood standards for color accuracy, resolution, and contrast for commercial film exhibition.' },
      { q: 'Can LED screens display 3D content?', a: 'Yes, LED cinema screens support passive 3D systems with excellent brightness retention compared to projector-based 3D.' },
    ],
    relatedSolution: 'entertainment',
  },
  'sports-events': {
    name: 'Sports & Events',
    tagline: 'Spectacular Displays for Live Experiences',
    icon: Trophy,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/07761210154255d013573596ebb872b6c03610990a806a27e4ded7164b327fd6.png',
    description: 'Bring the action to life with LED scoreboards, perimeter displays, and video walls designed for stadiums, arenas, and live events. Our solutions deliver broadcast-quality visuals that enhance spectator engagement and sponsor value.',
    challenges: [
      { title: 'Outdoor Durability', desc: 'Stadium displays must withstand sun, rain, heat, and occasional ball impacts.' },
      { title: 'High Refresh Rate', desc: 'Flicker-free broadcast capture for TV and slow-motion replays.' },
      { title: 'Long Viewing Distances', desc: 'Content must be visible from 50-200+ meters across the venue.' },
      { title: 'Fast Installation', desc: 'Event displays require rapid setup and teardown for touring productions.' },
    ],
    solutions: [
      { title: 'Stadium Perimeter', desc: 'Robust LED perimeter boards with virtual advertising capabilities.', link: '/products?category=stadium' },
      { title: 'Outdoor LED', desc: 'High-brightness scoreboards and video boards for main displays.', link: '/products?category=outdoor' },
      { title: 'Rental LED', desc: 'Quick-lock systems for concerts, events, and touring productions.', link: '/products?category=rental' },
    ],
    specs: [
      { label: 'Brightness', value: '5,000-10,000 nits', icon: Sun },
      { label: 'Refresh Rate', value: '7,680 Hz+', icon: Zap },
      { label: 'IP Rating', value: 'IP65/IP68', icon: Shield },
      { label: 'Pixel Pitch', value: 'P4-P16', icon: Ruler },
    ],
    caseStudyTags: ['sports', 'stadium', 'event', 'concert'],
    faqs: [
      { q: 'What refresh rate is needed for broadcast sports?', a: 'Minimum 3,840 Hz for standard broadcast, 7,680 Hz+ recommended for slow-motion replays and high-speed action sports.' },
      { q: 'How do perimeter LED boards handle ball impacts?', a: 'Stadium perimeter boards feature impact-resistant front surfaces, protective louvers, and modular design for quick panel replacement.' },
      { q: 'Can displays show virtual advertising for different broadcasts?', a: 'Yes, virtual advertising systems overlay sponsor graphics that can be customized for different broadcast regions in real-time.' },
    ],
    relatedSolution: 'sports-entertainment',
  },
  'education': {
    name: 'Education',
    tagline: 'Modern Learning Environments with Visual Impact',
    icon: GraduationCap,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ece677e88cab7bac3c4414cd4fb4457d8f4dd1bce07e43712f6e8bcdf764c9dd.png',
    description: 'Transform classrooms and lecture halls with LED displays that enhance teaching effectiveness and student engagement. From interactive whiteboards to auditorium displays, we support modern educational environments.',
    challenges: [
      { title: 'Budget Constraints', desc: 'Educational institutions need value-optimized solutions without compromising quality.' },
      { title: 'Ease of Use', desc: 'Teachers need simple, intuitive interfaces without technical complexity.' },
      { title: 'Multi-Purpose Spaces', desc: 'Displays must serve lectures, presentations, and collaborative sessions.' },
      { title: 'Long-Term Value', desc: 'Low maintenance and long lifespan for institutional investments.' },
    ],
    solutions: [
      { title: 'All-in-One dvLED', desc: 'Interactive displays with built-in whiteboard and wireless sharing for classrooms.', link: '/technology/all-in-one-dvled' },
      { title: 'Fine Pitch Indoor', desc: 'Large-format displays for lecture halls and auditoriums.', link: '/technology/fine-pitch-led' },
    ],
    specs: [
      { label: 'Brightness', value: '400-800 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P1.2-P2.5', icon: Ruler },
      { label: 'Touch', value: 'IR 20-point', icon: Eye },
      { label: 'Lifespan', value: '50,000+ hrs', icon: Shield },
    ],
    caseStudyTags: ['education', 'university', 'school', 'campus'],
    faqs: [
      { q: 'What size display is recommended for classrooms?', a: 'For typical 30-student classrooms, 86-110" displays (P1.5-P1.9) provide excellent visibility. Larger lecture halls may need 138-165" or custom video walls.' },
      { q: 'Do LED displays support interactive teaching?', a: 'Yes, All-in-One displays include IR touch (20+ point), built-in whiteboard software, and wireless screen sharing for BYOD environments.' },
      { q: 'What is the total cost of ownership vs projectors?', a: 'LED displays have higher upfront cost but lower 5-year TCO due to no lamp replacement, lower maintenance, and consistent brightness over time.' },
    ],
    relatedSolution: 'corporate',
  },
  'outdoor-billboards': {
    name: 'Outdoor & Billboards',
    tagline: 'High-Impact Advertising That Dominates the Skyline',
    icon: Sun,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/557b0ddabad0adc0fba81b320821a3adf782837c1aa705d6b13b9c4a5dac87eb.png',
    description: 'Command attention with outdoor LED billboards and media facades engineered for the demanding UAE climate. From highway billboards to architectural lighting, our solutions deliver unmatched visibility and durability.',
    challenges: [
      { title: 'Extreme Heat', desc: 'UAE temperatures exceed 50°C requiring advanced thermal management.' },
      { title: 'Direct Sunlight', desc: 'Displays must compete with intense Middle Eastern sun.' },
      { title: 'Sand & Dust', desc: 'Desert environment requires sealed enclosures and filtration.' },
      { title: 'Municipality Compliance', desc: 'RTA, Dubai Municipality, and local authority approvals required.' },
    ],
    solutions: [
      { title: 'Outdoor LED', desc: 'High-brightness, weather-resistant displays for billboards and signage.', link: '/products?category=outdoor' },
      { title: 'Media Facade', desc: 'Building-integrated LED systems for architectural lighting and advertising.', link: '/technology/media-facade' },
      { title: '3D Anamorphic', desc: 'Corner installations for viral 3D advertising content.', link: '/technology/3d-anamorphic-led' },
    ],
    specs: [
      { label: 'Brightness', value: '7,000-12,000 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P4-P20', icon: Ruler },
      { label: 'IP Rating', value: 'IP65/IP68', icon: Shield },
      { label: 'Operating Temp', value: '-20 to 60°C', icon: Zap },
    ],
    caseStudyTags: ['outdoor', 'billboard', 'facade', 'advertising'],
    faqs: [
      { q: 'What brightness is needed for Dubai outdoor displays?', a: 'Minimum 7,000 nits for typical installations, 10,000+ nits for south/west-facing displays in direct afternoon sun.' },
      { q: 'What approvals are needed for outdoor LED in Dubai?', a: 'Dubai Municipality approval, RTA approval for road-facing displays, and building permits. Our team handles the complete approval process.' },
      { q: 'How do displays handle UAE summer temperatures?', a: 'Our outdoor displays feature intelligent thermal management with ambient sensors, variable fan speed, and automatic brightness adjustment to prevent overheating.' },
    ],
    relatedSolution: 'outdoor-advertising',
  },
};

export default function ApplicationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [caseStudies, setCaseStudies] = useState([]);
  const app = APPLICATIONS_DATA[slug];

  useEffect(() => {
    if (!app) return;
    
    // Fetch related case studies
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch(`${API}/api/case-studies`);
        const data = await res.json();
        const studies = data.case_studies || data || [];
        // Filter by tags
        const related = studies.filter(cs => 
          app.caseStudyTags.some(tag => 
            cs.category?.toLowerCase().includes(tag) || 
            cs.title?.toLowerCase().includes(tag) ||
            cs.tags?.some(t => t.toLowerCase().includes(tag))
          )
        ).slice(0, 3);
        setCaseStudies(related);
      } catch (err) {
        console.error('Failed to fetch case studies:', err);
      }
    };
    fetchCaseStudies();
  }, [app]);

  if (!app) {
    return (
      <div className="bg-[#050508] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Application Not Found</h1>
          <Link to="/applications" className="text-cyan-400 hover:text-cyan-300">
            &larr; Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  const Icon = app.icon;

  return (
    <div className="bg-[#050508] min-h-screen" data-testid={`application-detail-${slug}`}>
      <SEO
        title={`${app.name} LED Displays — ${app.tagline} | Brightluxx UAE`}
        description={app.description}
        path={`/applications/${slug}`}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-0 overflow-hidden">
        <div className="absolute inset-0">
          <img src={app.heroImage} alt={app.name} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-[#050508]/40" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 pt-12 pb-20">
          <FadeInSection>
            <Link to="/applications" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm font-bold tracking-wider mb-6 transition-colors">
              <ArrowLeft size={16} /> All Applications
            </Link>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/20">
                <Icon size={32} className="text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-2" data-testid="application-title">
                  {app.name}
                </h1>
                <p className="text-lg text-cyan-400 font-medium tracking-wide">{app.tagline}</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-base md:text-lg max-w-3xl leading-relaxed">
              {app.description}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Quick Specs */}
      <section className="py-12 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection delay={1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {app.specs.map((spec, i) => (
                <GlassCard key={i} className="p-5 text-center" hover={false}>
                  <spec.icon size={20} className="text-cyan-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">{spec.value}</div>
                  <div className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">{spec.label}</div>
                </GlassCard>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Challenges */}
            <FadeInSection delay={2}>
              <h2 className="text-xl font-bold tracking-wide text-white mb-6">
                <span className="text-cyan-400">Industry</span> Challenges
              </h2>
              <div className="space-y-4">
                {app.challenges.map((c, i) => (
                  <GlassCard key={i} className="p-5" hover={false}>
                    <h3 className="text-sm font-bold tracking-wider text-white mb-2">{c.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </FadeInSection>

            {/* Solutions */}
            <FadeInSection delay={3}>
              <h2 className="text-xl font-bold tracking-wide text-white mb-6">
                <span className="text-cyan-400">Recommended</span> Solutions
              </h2>
              <div className="space-y-4">
                {app.solutions.map((s, i) => (
                  <Link key={i} to={s.link} className="block group">
                    <GlassCard className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-bold tracking-wider text-white mb-2 group-hover:text-cyan-400 transition-colors">{s.title}</h3>
                          <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                        </div>
                        <ArrowRight size={16} className="text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <FadeInSection delay={4}>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Real Projects</span>
                  <h2 className="text-2xl font-bold tracking-wide text-white">Related Case Studies</h2>
                </div>
                <Link to="/case-studies" className="text-sm font-bold tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </FadeInSection>

            <div className="grid md:grid-cols-3 gap-6">
              {caseStudies.map((cs, i) => (
                <FadeInSection key={cs._id || i} delay={5 + i}>
                  <Link to={`/case-studies/${cs.slug || cs._id}`} className="group block">
                    <GlassCard className="overflow-hidden">
                      <div className="relative h-40 overflow-hidden">
                        <CdnImage 
                          src={cs.image_url_card || cs.image_url || cs.images?.[0]} 
                          alt={cs.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          w={400}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                      </div>
                      <div className="p-5">
                        <div className="text-[9px] font-bold tracking-[0.15em] text-cyan-400 uppercase mb-2">{cs.category || cs.location}</div>
                        <h3 className="text-sm font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors">{cs.title}</h3>
                      </div>
                    </GlassCard>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection delay={6}>
            <h2 className="text-2xl font-bold tracking-wide text-white mb-8">
              Frequently Asked <span className="text-cyan-400">Questions</span>
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.faqs.map((faq, i) => (
              <FadeInSection key={i} delay={7 + i}>
                <GlassCard className="p-6 h-full" hover={false}>
                  <h3 className="text-sm font-bold tracking-wider text-white mb-3">{faq.q}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                </GlassCard>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection delay={8}>
            <GlassCard className="p-10 lg:p-14" hover={false}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Start Your {app.name} Project</span>
                  <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4">
                    Ready to
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-2">Get Started?</span>
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Our team specializes in {app.name.toLowerCase()} LED solutions for the UAE market. Get a custom quotation and site survey.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <Link 
                    to="/contact" 
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 text-sm"
                  >
                    Get Quote <ArrowRight size={16} />
                  </Link>
                  <Link 
                    to={`/solutions/${app.relatedSolution}`}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2 text-sm"
                  >
                    View Solutions <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
