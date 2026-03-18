import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// ─── SCROLL REVEAL ANIMATION ───
export const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.8,
  className = '' 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      scale: direction === 'scale' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Apple's ease-out-expo
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── STAGGERED CHILDREN ANIMATION ───
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  className = '' 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── PARALLAX SECTION ───
export const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  className = '' 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y: smoothY }}>
        {children}
      </motion.div>
    </div>
  );
};

// ─── MAGNETIC BUTTON ───
export const MagneticButton = ({ 
  children, 
  className = '', 
  strength = 0.3,
  ...props 
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;
    setPosition({ x, y });
  };
  
  const reset = () => setPosition({ x: 0, y: 0 });
  
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// ─── GLASS CARD ───
export const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  ...props 
}) => {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-white/[0.08] to-white/[0.02]
        backdrop-blur-xl border border-white/[0.08]
        ${glow ? 'shadow-[0_0_40px_rgba(34,211,238,0.1)]' : 'shadow-xl'}
        ${className}
      `}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        boxShadow: glow 
          ? '0 20px 40px rgba(0,0,0,0.2), 0 0 60px rgba(34,211,238,0.15)'
          : '0 20px 40px rgba(0,0,0,0.2)'
      } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      {...props}
    >
      {/* Subtle gradient shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

// ─── ANIMATED COUNTER ───
export const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  prefix = '',
  duration = 2 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/,/g, ''), 10) : value;
  
  useEffect(() => {
    if (isInView && !isNaN(numericValue)) {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;
      
      const tick = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * numericValue));
        
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };
      
      requestAnimationFrame(tick);
    }
  }, [isInView, numericValue, duration]);
  
  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// ─── FLOATING ELEMENT ───
export const FloatingElement = ({ 
  children, 
  amplitude = 10, 
  duration = 6,
  delay = 0,
  className = '' 
}) => (
  <motion.div
    animate={{
      y: [-amplitude, amplitude, -amplitude],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── TEXT REVEAL ───
export const TextReveal = ({ 
  text, 
  className = '',
  delay = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');
  
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// ─── GRADIENT BORDER ───
export const GradientBorder = ({ 
  children, 
  className = '',
  borderWidth = 1,
  gradient = 'from-cyan-400 via-violet-400 to-rose-400'
}) => (
  <div className={`relative p-[${borderWidth}px] rounded-2xl bg-gradient-to-r ${gradient} ${className}`}>
    <div className="relative bg-[#0a0a0d] rounded-2xl h-full">
      {children}
    </div>
  </div>
);

// ─── BLUR FADE ───
export const BlurFade = ({ 
  children, 
  delay = 0,
  className = '' 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── MORPHING SHAPE ───
export const MorphingShape = ({ className = '' }) => (
  <motion.div
    className={`absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 90, 0],
      borderRadius: ['50%', '40%', '50%'],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

// ─── SPOTLIGHT CARD ───
export const SpotlightCard = ({ 
  children, 
  className = '' 
}) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  
  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34,211,238,0.1), transparent 40%)`
        }}
      />
      {children}
    </div>
  );
};

export default {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  ParallaxSection,
  MagneticButton,
  GlassCard,
  AnimatedCounter,
  FloatingElement,
  TextReveal,
  GradientBorder,
  BlurFade,
  MorphingShape,
  SpotlightCard
};
