import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

interface WeekCardProps {
  week: number;
  theme: string;
  detail: string;
  visible: boolean;
  highlight?: boolean;
}

const WeekCard: React.FC<WeekCardProps> = ({ week, theme, detail, visible, highlight }) => (
  <motion.div
    initial={false}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
    transition={{ duration: 0.4 }}
    className={
      highlight
        ? 'border-2 border-action-orange bg-action-orange/[0.04] rounded-lg p-5 flex items-baseline gap-4'
        : 'bg-white border border-surface-container-high rounded-lg p-5 flex items-baseline gap-4'
    }
  >
    <span className={
      highlight
        ? 'font-mono text-xs font-bold text-action-orange tracking-wider shrink-0'
        : 'font-mono text-xs text-data-gray tracking-wider shrink-0'
    }>
      W{week}
    </span>
    <div>
      <span className="font-headline text-sm font-bold text-deep-onyx">{theme}</span>
      <span className="font-body text-sm text-secondary ml-2">· {detail}</span>
    </div>
  </motion.div>
);

export const Slide05FiveWeekRoadmap: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Didactic Design" title="Five-Week Roadmap">
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="grid grid-cols-2 gap-4">
          <WeekCard week={1} theme="Introduction to Data Science" detail="kickoff (1h VC)" visible={step >= 0} />
          <WeekCard week={2} theme="Foundations of Data Analysis" detail="methods clinic (1h VC)" visible={step >= 1} />
        </div>
        <div className="flex justify-center">
          <div className="w-1/2">
            <WeekCard week={3} theme="Statistical Methods" detail="2× statistics surgery (1h each)" visible={step >= 2} />
          </div>
        </div>
        <WeekCard week={4} theme="Data Science Studio" detail="on-site days 1–2 (16h)" visible={step >= 3} highlight />
        <WeekCard week={5} theme="Data in Practice" detail="synthesis & Q&A (30 min VC)" visible={step >= 4} />
      </div>
    </SlideContent>
  );
};
