import React from 'react';
import { motion } from 'motion/react';

interface SlideContentProps {
  label?: string;
  title: string;
  children?: React.ReactNode;
}

export const SlideContent: React.FC<SlideContentProps> = ({
  label,
  title,
  children,
}) => {
  return (
    <div className="w-full h-full flex flex-col pt-20 px-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {label && (
          <div className="font-mono text-xs text-action-orange tracking-[0.15em] uppercase mb-3">
            {label}
          </div>
        )}

        <h1 className="font-headline text-[2.5rem] font-bold leading-tight tracking-[-0.02em] text-deep-onyx mb-8">
          {title}
        </h1>

        <div className="asymmetric-rule mb-10" />
      </motion.div>

      <div className="flex-grow">
        {children ?? (
          <div className="flex items-center justify-center h-full">
            <p className="font-mono text-sm text-data-gray/50 tracking-wider uppercase">
              Content placeholder
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
