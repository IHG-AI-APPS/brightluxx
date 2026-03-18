import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, Layers, Phone, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileBottomNav = ({ onMenuClick }) => {
  const location = useLocation();
  
  // Shorter labels for better mobile fit
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'products', icon: Grid3X3, label: 'Shop', path: '/products' },
    { id: 'solutions', icon: Layers, label: 'Solutions', path: '/solutions' },
    { id: 'contact', icon: Phone, label: 'Contact', path: '/contact' },
    { id: 'menu', icon: Menu, label: 'More', path: null },
  ];
  
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (!path) return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className="mobile-bottom-nav lg:hidden fixed bottom-0 left-0 right-0 z-50"
      data-testid="mobile-bottom-nav"
      style={{
        background: 'rgba(5,5,8,0.98)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
      }}
    >
      <div className="grid grid-cols-5 w-full max-w-md mx-auto px-1 sm:px-4 pt-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          
          if (item.id === 'menu') {
            return (
              <motion.button
                key={item.id}
                onClick={onMenuClick}
                className="flex flex-col items-center justify-center py-2"
                whileTap={{ scale: 0.9 }}
                data-testid="mobile-bottom-nav-menu"
              >
                <div className="relative flex items-center justify-center w-8 h-8">
                  <Icon 
                    size={20} 
                    className="text-neutral-400 transition-colors duration-200" 
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-[9px] sm:text-[10px] mt-0.5 text-neutral-400 tracking-wide font-medium uppercase">
                  {item.label}
                </span>
              </motion.button>
            );
          }
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex flex-col items-center justify-center py-2"
              data-testid={`mobile-bottom-nav-${item.id}`}
            >
              <motion.div 
                className="relative flex items-center justify-center w-8 h-8"
                whileTap={{ scale: 0.9 }}
              >
                <Icon 
                  size={20} 
                  className={`transition-colors duration-200 ${active ? 'text-cyan-400' : 'text-neutral-400'}`}
                  strokeWidth={active ? 2 : 1.5}
                />
                {active && (
                  <motion.div 
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                    initial={false}
                  />
                )}
              </motion.div>
              <span className={`text-[9px] sm:text-[10px] mt-0.5 tracking-wide font-medium uppercase transition-colors duration-200 ${active ? 'text-cyan-400' : 'text-neutral-400'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
