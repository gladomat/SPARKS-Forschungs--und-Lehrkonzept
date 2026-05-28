import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

const CLUSTERS = [
  {
    letter: 'A',
    title: 'Foundations of Data Reasoning',
    subtitle: 'Understand and apply data science fundamentals',
  },
  {
    letter: 'B',
    title: 'Statistical Reading & Analysis',
    subtitle: 'Explain analytical methods · apply statistical techniques',
  },
  {
    letter: 'C',
    title: 'Algorithmic Systems & Applied Judgment',
    subtitle: 'Use ML to solve problems · derive and evaluate insights',
  },
];

export const Slide04CompetencyClusters: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Positioning" title="Competency Clusters">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start max-w-4xl mt-4">
        {CLUSTERS.map((c, i) => (
          <React.Fragment key={c.letter}>
            {i > 0 && (
              <div className="flex items-center pt-12 px-3">
                <motion.svg
                  width="28"
                  height="12"
                  viewBox="0 0 28 12"
                  className="text-action-orange"
                  initial={false}
                  animate={{ opacity: step >= i ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <line x1="0" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1.5" />
                  <polygon points="19,2 27,6 19,10" fill="currentColor" />
                </motion.svg>
              </div>
            )}
            <motion.div
              initial={false}
              animate={{ opacity: step >= i ? 1 : 0, y: step >= i ? 0 : 20 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-surface-container-high rounded-lg p-6 flex flex-col gap-3"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-deep-onyx text-white font-headline text-sm font-bold">
                {c.letter}
              </span>
              <div>
                <h3 className="font-headline text-base font-bold text-deep-onyx leading-snug">
                  {c.title}
                </h3>
                <p className="font-body text-sm text-secondary leading-relaxed mt-1">
                  {c.subtitle}
                </p>
              </div>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </SlideContent>
  );
};
