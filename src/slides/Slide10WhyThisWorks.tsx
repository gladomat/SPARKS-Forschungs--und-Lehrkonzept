import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

interface AngleCardProps {
  audience: string;
  points: string[];
  emphasis?: boolean;
  visible: boolean;
}

const AngleCard: React.FC<AngleCardProps> = ({ audience, points, emphasis, visible }) => (
  <motion.div
    initial={false}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
    transition={{ duration: 0.4 }}
    className={
      emphasis
        ? 'border-2 border-action-orange bg-action-orange/[0.04] rounded-lg p-6 flex flex-col gap-3'
        : 'bg-white border border-surface-container-high rounded-lg p-6 flex flex-col gap-3'
    }
  >
    <span
      className={
        emphasis
          ? 'font-mono text-[0.6rem] text-action-orange tracking-[0.15em] uppercase'
          : 'font-mono text-[0.6rem] text-data-gray tracking-[0.15em] uppercase'
      }
    >
      {audience}
    </span>
    <ul className="flex flex-col gap-2">
      {points.map((p) => (
        <li key={p} className="flex items-baseline gap-2">
          <span className="w-1 h-1 rounded-full bg-action-orange mt-2 shrink-0" />
          <span className="font-body text-sm text-deep-onyx leading-relaxed">{p}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export const Slide10WhyThisWorks: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Closing" title="Why This Works for SPARKS Media & Data">
      <div className="max-w-5xl flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-5 items-stretch">
          <AngleCard
            visible={step >= 0}
            audience="For students"
            points={[
              'A complete applied data-science workflow on a realistic media case',
              'One running dataset across five weeks',
              'Predictable weekly rhythm',
              'Adjustable technical depth',
            ]}
          />
          <AngleCard
            visible={step >= 1}
            audience="For the Media & Data programme"
            points={[
              'Integrates AI, coding, analytics, predictive modelling, and performance metrics',
              'Prepares for Practice Project and Thesis',
              'Synchronous time where it matters most',
              'Honest answer to AI in assessment',
            ]}
          />
          <AngleCard
            visible={step >= 2}
            audience="For the SPARKS format"
            emphasis
            points={[
              'Modular, avatar-compatible self-study',
              'Strong theoretical anchor',
              'On-site Studio as didactic climax',
              'Curricular integration across the bachelor',
            ]}
          />
        </div>

        <motion.p
          initial={false}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 12 }}
          transition={{ duration: 0.4 }}
          className="font-headline text-lg font-bold text-deep-onyx text-center"
        >
          Graduates who turn media data into defensible decisions.
        </motion.p>

      
      </div>
    </SlideContent>
  );
};
