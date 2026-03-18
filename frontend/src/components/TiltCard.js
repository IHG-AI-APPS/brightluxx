import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * TiltCard - A 3D tilt effect component based on mouse position
 * 
 * Usage:
 * <TiltCard className="your-classes" tiltIntensity={15} glareEnabled>
 *   <YourContent />
 * </TiltCard>
 */
const TiltCard = ({
  children,
  className = '',
  tiltIntensity = 10, // Max tilt angle in degrees
  scale = 1.02, // Scale on hover
  glareEnabled = true,
  glareMaxOpacity = 0.15,
  perspective = 1000,
  transitionDuration = 0.3,
  resetOnLeave = true,
  disabled = false,
  ...props
}) => {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (disabled || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    
    // Get mouse position relative to card center
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate position as percentage from center (-0.5 to 0.5)
    const xPercent = (mouseX / cardWidth) - 0.5;
    const yPercent = (mouseY / cardHeight) - 0.5;
    
    // Calculate tilt (inverted for natural feel)
    const rotateY = xPercent * tiltIntensity * 2;
    const rotateX = -yPercent * tiltIntensity * 2;
    
    setTiltStyle({
      rotateX,
      rotateY,
      scale,
    });

    // Update glare position
    if (glareEnabled) {
      setGlarePosition({
        x: (mouseX / cardWidth) * 100,
        y: (mouseY / cardHeight) * 100,
      });
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovering(false);
    
    if (resetOnLeave) {
      setTiltStyle({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tiltStyle.rotateX,
        rotateY: tiltStyle.rotateY,
        scale: tiltStyle.scale,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: transitionDuration,
      }}
      {...props}
    >
      {children}
      
      {/* Glare overlay */}
      {glareEnabled && isHovering && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          style={{ zIndex: 10 }}
        >
          <div
            className="absolute w-full h-full"
            style={{
              background: `radial-gradient(
                circle at ${glarePosition.x}% ${glarePosition.y}%,
                rgba(255, 255, 255, ${glareMaxOpacity}) 0%,
                rgba(255, 255, 255, 0) 60%
              )`,
              transition: 'opacity 0.2s ease',
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default TiltCard;
