import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

interface SessionRow {
  time: string;
  text: string;
  assured?: boolean;
}

interface DayCardProps {
  day: string;
  title: string;
  rows: SessionRow[];
  visible: boolean;
}

const DayCard: React.FC<DayCardProps> = ({ day, title, rows, visible }) => (
  <motion.div
    initial={false}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
    transition={{ duration: 0.4 }}
    className="bg-white border border-surface-container-high rounded-lg p-6 flex flex-col gap-4"
  >
    <div>
      <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.15em] uppercase">
        {day}
      </span>
      <h3 className="font-headline text-lg font-bold text-deep-onyx leading-snug">
        {title}
      </h3>
    </div>
    <div className="flex flex-col gap-3">
      {rows.map((r) => (
        <div key={r.time} className="flex items-baseline gap-3">
          <span className={
            r.assured
              ? 'font-mono text-[0.6rem] font-bold text-action-orange tracking-wider uppercase w-16 shrink-0'
              : 'font-mono text-[0.6rem] text-data-gray tracking-wider uppercase w-16 shrink-0'
          }>
            {r.time}
          </span>
          <span className="font-body text-sm text-deep-onyx leading-relaxed">
            {r.text}
            {r.assured && (
              <span className="font-mono text-[0.55rem] text-action-orange tracking-[0.12em] uppercase ml-2">
                Assured Lane
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  </motion.div>
);

const ARC = ['Analyze', 'Model', 'Critique', 'Defend'];

export const Slide09DataScienceStudio: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Didactic Design" title="The Data Science Studio — On-Site Days">
      <div className="max-w-4xl flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <DayCard
            visible={step >= 0}
            day="Day 1 · On-site"
            title="Analyze, Model, Evaluate"
            rows={[
              { time: 'Morning', text: 'Dataset walkthrough; data quality and feature discussion; baseline model logic' },
              { time: 'Afternoon', text: 'Team-based model evaluation, metric choice, error analysis' },
              { time: 'Closing', text: 'Each team documents one concrete failure mode or bias risk' },
            ]}
          />
          <DayCard
            visible={step >= 1}
            day="Day 2 · On-site"
            title="Defend, Critique, Translate"
            rows={[
              { time: 'Morning', text: 'Peer review across teams; methodological critique' },
              { time: 'Midday', text: 'Discussion — when is a model good enough to inform a media decision?' },
              { time: 'Afternoon', text: 'Defended recommendation to a non-technical audience.' },
            ]}
          />
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 12 }}
          transition={{ duration: 0.4 }}
          className="border-2 border-action-orange bg-action-orange/[0.04] rounded-lg px-6 py-4 flex items-center justify-center gap-3"
        >
          {ARC.map((stage, i) => (
            <React.Fragment key={stage}>
              {i > 0 && (
                <svg width="22" height="10" viewBox="0 0 22 10" className="text-action-orange shrink-0">
                  <line x1="0" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="1.5" />
                  <polygon points="14,1 21,5 14,9" fill="currentColor" />
                </svg>
              )}
              <span className="font-headline text-sm font-bold text-deep-onyx">{stage}</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </SlideContent>
  );
};
