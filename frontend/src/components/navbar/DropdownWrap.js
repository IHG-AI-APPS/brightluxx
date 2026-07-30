import React, { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DropdownWrap({ trigger, children, isOpen, setOpen, testId, alignRight = false }) {
  const timeout = useRef(null);
  const enter = useCallback(() => { clearTimeout(timeout.current); setOpen(true); }, [setOpen]);
  const leave = useCallback(() => { timeout.current = setTimeout(() => setOpen(false), 120); }, [setOpen]);
  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute top-full pt-2 ${alignRight ? 'right-0' : 'left-0'}`}
            data-testid={testId}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
