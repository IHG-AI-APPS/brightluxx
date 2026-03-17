/**
 * Theme utility classes for consistent styling across the site
 * Use with the useTheme hook from ThemeContext
 */

/**
 * Get theme-aware background classes
 * @param {boolean} isDark - Whether dark mode is active
 * @returns {object} Object with common theme classes
 */
export const getThemeClasses = (isDark) => ({
  // Main backgrounds
  pageBg: isDark ? 'bg-[#050508]' : 'bg-neutral-50',
  pageBgAlt: isDark ? 'bg-[#0A0A0D]' : 'bg-neutral-100',
  pageBgSection: isDark ? 'bg-neutral-900/30' : 'bg-neutral-100/50',
  
  // Text colors
  textPrimary: isDark ? 'text-white' : 'text-neutral-900',
  textSecondary: isDark ? 'text-neutral-400' : 'text-neutral-600',
  textMuted: isDark ? 'text-gray-500' : 'text-gray-500',
  textAccent: 'text-cyan-400', // Consistent accent
  
  // Borders
  borderColor: isDark ? 'border-white/[0.08]' : 'border-neutral-200',
  borderColorStrong: isDark ? 'border-white/10' : 'border-neutral-300',
  borderColorHover: isDark ? 'border-cyan-500/30' : 'border-cyan-500/50',
  
  // Glass cards
  cardBg: isDark ? 'bg-white/[0.03]' : 'bg-white/80',
  cardBgHover: isDark ? 'bg-white/[0.06]' : 'bg-white',
  cardBorder: isDark ? 'border-white/[0.08]' : 'border-neutral-200',
  
  // Input fields
  inputBg: isDark ? 'bg-white/5' : 'bg-white',
  inputBorder: isDark ? 'border-white/10' : 'border-neutral-300',
  inputText: isDark ? 'text-white' : 'text-neutral-900',
  inputPlaceholder: isDark ? 'placeholder:text-gray-600' : 'placeholder:text-gray-400',
  
  // Gradient overlays
  gradientOverlay: isDark 
    ? 'from-[#050508] via-[#050508]/60 to-transparent' 
    : 'from-white via-white/60 to-transparent',
  gradientOverlayHero: isDark 
    ? 'from-[#050508] via-[#050508]/40 to-transparent' 
    : 'from-neutral-50 via-neutral-50/40 to-transparent',
    
  // Icons and accents
  iconBg: isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/10',
  iconBorder: isDark ? 'border-cyan-500/20' : 'border-cyan-500/30',
  
  // Decorative elements
  decorGlow: isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10',
});

/**
 * GlassCard component styles generator
 * @param {boolean} isDark - Whether dark mode is active
 * @param {boolean} hover - Whether to include hover states
 * @returns {string} Tailwind classes string
 */
export const getGlassCardClasses = (isDark, hover = true) => {
  const base = `backdrop-blur-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white/80'} border ${isDark ? 'border-white/[0.08]' : 'border-neutral-200'} rounded-lg`;
  const hoverClasses = hover 
    ? `hover:${isDark ? 'bg-white/[0.06]' : 'bg-white'} hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]`
    : '';
  return `${base} ${hoverClasses} transition-all duration-500`;
};

export default getThemeClasses;
