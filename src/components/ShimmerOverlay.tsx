import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface ShimmerOverlayProps {
  /** Increment this to play the sweep once. Initial value 0 plays nothing. */
  trigger: number;
}

export const ShimmerOverlay: React.FC<ShimmerOverlayProps> = ({ trigger }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;
    setActive(true);
    const t = setTimeout(() => setActive(false), 850);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={trigger}
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="shimmer-band"
            initial={{ x: '-160%' }}
            animate={{ x: '160%' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
