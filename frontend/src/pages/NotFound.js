import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight, Phone, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';

export default function NotFound() {
  const { isDark } = useTheme();
  
  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-white/[0.03]' : 'bg-white/80';
  const cardBorder = isDark ? 'border-white/[0.08]' : 'border-neutral-200';

  const popularPages = [
    { name: 'Products', path: '/products', desc: 'Browse our LED display range' },
    { name: 'Solutions', path: '/solutions', desc: 'Industry-specific solutions' },
    { name: 'PixelVue', path: '/pixelvue', desc: 'Commercial LED displays' },
    { name: 'Contact', path: '/contact', desc: 'Get a quote' },
    { name: 'About Us', path: '/about', desc: 'Learn about Brightluxx' },
    { name: 'Knowledge Hub', path: '/knowledge', desc: 'LED display guides' },
  ];

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-500`} data-testid="404-page">
      <SEO 
        title="Page Not Found (404)" 
        description="The page you're looking for doesn't exist. Browse our LED display products, solutions, or contact us for assistance."
        noIndex={true}
      />

      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        {/* 404 Hero */}
        <div className="mb-12">
          <div className="text-[120px] md:text-[180px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 mb-4">
            404
          </div>
          <h1 className={`text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4 ${textPrimary}`}>
            Page Not Found
          </h1>
          <p className={`${textSecondary} text-base md:text-lg max-w-md mx-auto`}>
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link 
            to="/" 
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
            data-testid="404-home-button"
          >
            <Home size={18} /> Go Home
          </Link>
          <Link 
            to="/contact" 
            className={`${isDark ? 'bg-white/5' : 'bg-neutral-900/5'} backdrop-blur-xl border ${isDark ? 'border-white/10' : 'border-neutral-300'} hover:border-cyan-500/30 ${textPrimary} font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2`}
            data-testid="404-contact-button"
          >
            <Phone size={18} /> Contact Us
          </Link>
        </div>

        {/* Popular Pages */}
        <div className="text-left">
          <h2 className={`text-lg font-bold uppercase tracking-wide mb-6 ${textPrimary} text-center`}>
            Popular Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularPages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`group p-5 rounded-lg backdrop-blur-xl ${cardBg} border ${cardBorder} hover:border-cyan-500/30 transition-all`}
                data-testid={`404-link-${page.path.replace('/', '')}`}
              >
                <h3 className={`font-bold uppercase tracking-wide text-sm mb-1 group-hover:text-cyan-400 transition-colors ${textPrimary}`}>
                  {page.name}
                </h3>
                <p className={`text-xs ${textSecondary}`}>{page.desc}</p>
                <div className="mt-3 text-cyan-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Visit <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className={`mt-16 p-8 rounded-lg backdrop-blur-xl ${cardBg} border ${cardBorder}`}>
          <h3 className={`font-bold uppercase tracking-wide mb-4 ${textPrimary}`}>
            Need Help?
          </h3>
          <p className={`${textSecondary} text-sm mb-4`}>
            If you believe this is an error, or need assistance finding specific information:
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:info@brightluxx.com" 
              className={`inline-flex items-center gap-2 ${textSecondary} hover:text-cyan-400 transition-colors text-sm`}
            >
              <Mail size={16} /> info@brightluxx.com
            </a>
            <a 
              href="tel:+971559954274" 
              className={`inline-flex items-center gap-2 ${textSecondary} hover:text-cyan-400 transition-colors text-sm`}
            >
              <Phone size={16} /> +971 55 995 4274
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
