import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion, AnimatePresence } from 'motion/react';
import { SlideStepContext } from '../App';

export const Slide03CoreThesis: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Positioning" title="Core Thesis">
      <div className="max-w-3xl flex flex-col gap-10">
        <AnimatePresence>
          {step >= 0 && (
            <motion.p
              key="thesis"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-body text-xl text-deep-onyx leading-relaxed"
            >
              <span className="font-bold">
                Data Science is the workflow that turns media data into defensible decisions.
              </span>
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 1 && (
            <motion.p
              key="context"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-body text-base text-secondary leading-relaxed"
            >
              By semester five, students have encountered AI, coding, data analytics, predictive
              modelling, conversion optimization, and performance metrics.{' '}
              <span className="text-deep-onyx font-bold">
                Data Science is the integration point
              </span>{' '}
              that brings these strands together into one applied workflow.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border-2 border-action-orange bg-action-orange/[0.04] rounded-lg px-6 py-5"
            >
              <span className="font-mono text-[0.6rem] text-action-orange tracking-[0.15em] uppercase block mb-2">
                The driving question
              </span>
              <span className="font-headline text-lg font-bold text-deep-onyx italic">
                Which media or marketing decision is justified by this data — and which is not?
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <motion.p
              key="target"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-body text-sm text-secondary leading-relaxed"
            >
              The professional target is media/data professionals who can run an applied workflow,
              evaluate uncertainty and bias, and translate findings into defensible recommendations —
              not ML engineers.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </SlideContent>
  );
};
