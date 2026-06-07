import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

interface WeekCardProps {
  week: number;
  theme: string;
  question: string;
  output: string;
  visible: boolean;
  highlight?: boolean;
}

const WeekCard: React.FC<WeekCardProps> = ({ week, theme, question, output, visible, highlight }) => (
  <motion.div
    initial={false}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
    transition={{ duration: 0.4 }}
    className={
      highlight
        ? 'border-2 border-action-orange bg-action-orange/[0.04] rounded-lg p-5 flex flex-col gap-2'
        : 'bg-white border border-surface-container-high rounded-lg p-5 flex flex-col gap-2'
    }
  >
    <span
      className={
        highlight
          ? 'font-mono text-xs font-bold text-action-orange tracking-wider'
          : 'font-mono text-xs text-data-gray tracking-wider'
      }
    >
      W{week}
    </span>
    <span className="font-headline text-sm font-bold text-deep-onyx">{theme}</span>
    <span className="font-body text-xs text-secondary italic leading-relaxed">{question}</span>
    <span className="font-mono text-[0.6rem] text-data-gray tracking-wider uppercase mt-1">
      → {output}
    </span>
  </motion.div>
);

export const Slide05FiveWeekRoadmap: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Didactic Design" title="Five-Week Roadmap">
      <div className="flex flex-col gap-4 max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <WeekCard
            week={1}
            theme="Workflow for Media & Marketing"
            question="What makes a media problem a data-science problem?"
            output="Problem framing + data audit"
            visible={step >= 0}
          />
          <WeekCard
            week={2}
            theme="EDA, Data Quality & Features"
            question="What does the data show, hide, distort?"
            output="EDA notebook/report"
            visible={step >= 1}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <WeekCard
            week={3}
            theme="Statistical Reasoning & Experimentation"
            question="Which claims are statistically defensible?"
            output="Measurement claim brief"
            visible={step >= 2}
          />
          <WeekCard
            week={4}
            theme="Machine Learning for Media Decisions"
            question="Can we predict, segment, recommend responsibly?"
            output="Model evaluation + live defense"
            visible={step >= 3}
            highlight
          />
        </div>
        <div className="flex justify-center">
          <div className="w-1/2">
            <WeekCard
              week={5}
              theme="Decision Communication & Ethics"
              question="What should a team or client do next?"
              output="Final data story + reflection"
              visible={step >= 4}
            />
          </div>
        </div>
      </div>
    </SlideContent>
  );
};
