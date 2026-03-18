import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, Layers, Phone, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileBottomNav = ({ onMenuClick }) => {
  const location = useLocation();
  
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'products', icon: Grid3X3, label: 'Products', path: '/products' },
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
        background: 'rgba(5,5,8,0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center justify-around px-2 pt-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          
          if (item.id === 'menu') {
            return (
              <motion.button
                key={item.id}
                onClick={onMenuClick}
                className="flex flex-col items-center justify-center py-1.5 px-3 min-w-[60px]"
                whileTap={{ scale: 0.9 }}
                data-testid="mobile-bottom-nav-menu"
              >
                <div className="relative">
                  <Icon 
                    size={22} 
                    className="text-neutral-400 transition-colors duration-200" 
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-[10px] mt-1 text-neutral-400 tracking-wider font-medium">
                  {item.label}
                </span>
              </motion.button>
            );
          }
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex flex-col items-center justify-center py-1.5 px-3 min-w-[60px]"
              data-testid={`mobile-bottom-nav-${item.id}`}
            >
              <motion.div 
                className="relative"
                whileTap={{ scale: 0.9 }}
              >
                <Icon 
                  size={22} 
                  className={`transition-colors duration-200 ${active ? 'text-cyan-400' : 'text-neutral-400'}`}
                  strokeWidth={active ? 2 : 1.5}
                />
                {active && (
                  <motion.div 
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                    initial={false}
                  />
                )}
              </motion.div>
              <span className={`text-[10px] mt-1 tracking-wider font-medium transition-colors duration-200 ${active ? 'text-cyan-400' : 'text-neutral-400'}`}>
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
