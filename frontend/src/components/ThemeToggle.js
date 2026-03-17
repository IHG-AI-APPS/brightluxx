import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-all duration-300 ${
        isDark 
          ? 'bg-white/10 hover:bg-white/20 text-white' 
          : 'bg-neutral-900/10 hover:bg-neutral-900/20 text-neutral-900'
      } ${className}`}
      whileTap={{ scale: 0.95 }}
      data-testid="theme-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Sun size={20} className="text-yellow-400" />
        ) : (
          <Moon size={20} className="text-indigo-600" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
