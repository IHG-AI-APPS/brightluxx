import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ShowreelModal - lightweight, self-contained video lightbox.
 *
 * Rendered via a portal to document.body so it always covers the full viewport
 * regardless of any transformed / overflow-hidden ancestor (e.g. framer-motion
 * hero sections). Renders nothing until `open` is true and unmounts the <video>
 * on close, so playback (and audio) stops automatically.
 *
 * Props:
 *   open    - boolean, whether the modal is visible
 *   onClose - callback to close the modal
 *   src     - video URL to play
 *   title   - accessible label (optional)
 */
export default function ShowreelModal({ open, onClose, src, title = 'Showreel' }) {
  // Close on Escape + lock body scroll while open (restored on close/unmount).
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Guard against server-side prerender where document is unavailable.
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          data-testid="showreel-modal"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            data-testid="showreel-backdrop"
          />

          {/* Video container */}
          <motion.div
            className="relative w-full max-w-5xl aspect-video max-h-[85vh] rounded-2xl overflow-hidden bg-black shadow-2xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              aria-label="Close showreel"
              data-testid="showreel-close"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              src={src}
              className="w-full h-full object-contain bg-black"
              controls
              autoPlay
              playsInline
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
