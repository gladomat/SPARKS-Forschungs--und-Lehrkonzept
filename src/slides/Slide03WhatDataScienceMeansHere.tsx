import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion, AnimatePresence } from 'motion/react';
import { SlideStepContext } from '../App';

const COMPETENCIES = [
  { verb: 'Read evidence', desc: 'distinguish a real signal from a vanity metric' },
  { verb: 'Question claims', desc: 'recognize when "the data says X" actually means something else' },
  { verb: 'Design measurement', desc: 'know what counts, what doesn’t, and why' },
  { verb: 'Assess veracity', desc: 'judge whether sources, methods, and reasoning are trustworthy' },
  { verb: 'Communicate uncertainty', desc: 'translate analysis honestly to clients and audiences' },
];

export const Slide03WhatDataScienceMeansHere: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Positioning" title="What Data Science Means Here">
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
              Not a technical specialism.{' '}
              <span className="font-bold">
                A scientific judgment competence for brand and communication.
              </span>
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-5">
          <AnimatePresence>
            {COMPETENCIES.map((c, i) =>
              step >= i + 1 ? (
                <motion.div
                  key={c.verb}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-baseline gap-4"
                >
                  <span className="w-1 h-1 rounded-full bg-action-orange mt-2 shrink-0" />
                  <div>
                    <span className="font-headline text-base font-bold text-deep-onyx">
                      {c.verb}
                    </span>
                    <span className="font-body text-base text-secondary ml-2">
                      — {c.desc}
                    </span>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideContent>
  );
};
