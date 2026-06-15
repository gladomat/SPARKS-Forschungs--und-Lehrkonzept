import React, { useContext } from 'react';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

interface SlideTitleProps {
  label: string;
  title: string;
  subtitle: string;
  meta: string;
  author: string;
  image?: string;
  imageAlt?: string;
  /**
   * When provided, enables the step-driven acronym build-up (slide 1).
   * Maps a subtitle word to the step (1-based) at which it pulses for emphasis.
   * The title is split into letters; letter i latches (grows + recolors) at step i+1.
   */
  wordHighlights?: Record<string, number>;
}

// Snappy "pop" spring — used for the latching XAMA letters.
const POP = { type: 'spring', stiffness: 400, damping: 17 } as const;
// Timed up-and-back pulse for a subtitle word: rises fast, eases back down.
const PULSE = { duration: 0.6, ease: 'easeInOut', times: [0, 0.4, 1] } as const;

export const SlideTitle: React.FC<SlideTitleProps> = ({
  label,
  title,
  subtitle,
  meta,
  author,
  image,
  imageAlt = '',
  wordHighlights,
}) => {
  const step = useContext(SlideStepContext);
  const animated = !!wordHighlights;
  return (
    <div className="w-full h-full flex flex-col justify-center relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e2e2e2 1px, transparent 1px), linear-gradient(to bottom, #e2e2e2 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.4,
        }}
      />

      {/* Content */}
      <div className="px-16 xl:px-24 w-full relative z-10">
        <div className="grid grid-cols-12 gap-12 lg:gap-16 items-center max-w-[1280px] mx-auto">
          {/* Left column – text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-7 space-y-6 pr-12"
          >
            <div className="font-mono text-sm text-action-orange tracking-[0.2em] uppercase mb-4">
              {label}
            </div>

            <h1 className="font-headline text-[5.5rem] font-extrabold leading-[1.05] tracking-tight text-deep-onyx mb-6">
              {animated
                ? title.split('').map((letter, i) => {
                    const latched = step >= i + 1; // letter i latches at step i+1
                    return (
                      <motion.span
                        key={i}
                        className="inline-block"
                        style={{ transformOrigin: 'bottom center', whiteSpace: 'pre' }}
                        initial={false}
                        animate={{
                          scale: latched ? 1.25 : 1,
                          color: latched ? '#FF4E07' : '#0B0B0B',
                        }}
                        transition={POP}
                      >
                        {letter}
                      </motion.span>
                    );
                  })
                : title}
            </h1>

            <p className="font-body text-[1.35rem] italic text-secondary leading-relaxed max-w-2xl mb-8">
              {animated
                ? subtitle.split(' ').map((word, i) => {
                    const target = wordHighlights![word];
                    // Spotlight: only the word for the current step is enlarged; it
                    // returns to normal as soon as the next press advances the step.
                    const active = target !== undefined && step === target;
                    return (
                      <motion.span
                        key={i}
                        className="inline-block"
                        style={{ transformOrigin: 'bottom center', whiteSpace: 'pre' }}
                        initial={false}
                        animate={{ scale: active ? [1, 1.18, 1] : 1 }}
                        transition={active ? PULSE : { duration: 0 }}
                      >
                        {word}
                        {i < subtitle.split(' ').length - 1 ? ' ' : ''}
                      </motion.span>
                    );
                  })
                : subtitle}
            </p>

            <div className="w-24 h-[2px] bg-action-orange mb-8" />

            <div className="font-mono text-[13px] text-data-gray uppercase tracking-wider mb-4 flex flex-wrap items-center gap-3">
              {meta.split('·').map((part, i, arr) => (
                <React.Fragment key={i}>
                  <span>{part.trim()}</span>
                  {i < arr.length - 1 && <span className="text-action-orange">·</span>}
                </React.Fragment>
              ))}
            </div>

            <div className="font-body text-base text-deep-onyx">
              {author}
            </div>
          </motion.div>

          {/* Right column – floating image card */}
          {image && (
            <div className="col-span-5 relative z-10">
              {/* Stacked card shadows */}
              <div className="absolute -inset-6 bg-surface-container-low rounded-xl rotate-3 border border-surface-container-high" />
              <div className="absolute -inset-6 bg-white border border-surface-container-high shadow-xl rounded-xl -rotate-2" />

              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                className="relative bg-white p-3 rounded-lg border border-surface-container-high shadow-2xl"
              >
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-auto aspect-[4/3] object-cover rounded border border-surface-container-highest grayscale hover:grayscale-0 transition-all duration-700"
                />

                {/* LIVE DATA badge */}
                <div className="absolute bottom-6 right-6 bg-deep-onyx text-white font-mono text-[12px] px-3 py-1.5 rounded shadow-lg flex items-center gap-2 tracking-wider">
                  <span className="w-2 h-2 bg-action-orange rounded-full animate-pulse" />
                  LIVE DATA
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
