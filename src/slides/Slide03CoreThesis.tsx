import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

const PILLARS = [
  { term: 'Data', craft: 'analytics' },
  { term: 'Copy', craft: 'narrative' },
  { term: 'Design', craft: 'visual' },
];

const FlowArrow: React.FC<{ visible: boolean }> = ({ visible }) => (
  <motion.div
    initial={false}
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: 0.4 }}
    className="self-center shrink-0 text-action-orange"
    aria-hidden
  >
    <svg width="30" height="14" viewBox="0 0 30 14">
      <line x1="0" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="20,2 29,7 20,12" fill="currentColor" />
    </svg>
  </motion.div>
);

interface StageCardProps {
  kicker: string;
  title: string;
  detail: string;
  emphasis?: boolean;
  visible: boolean;
}

const StageCard: React.FC<StageCardProps> = ({ kicker, title, detail, emphasis, visible }) => (
  <motion.div
    initial={false}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
    transition={{ duration: 0.4 }}
    className={
      emphasis
        ? 'flex-1 border-2 border-action-orange bg-action-orange/[0.05] rounded-2xl p-6 flex flex-col gap-2'
        : 'flex-1 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-2'
    }
  >
    <span
      className={
        emphasis
          ? 'font-mono text-[0.6rem] font-bold text-action-orange tracking-[0.15em] uppercase'
          : 'font-mono text-[0.6rem] text-data-gray tracking-[0.15em] uppercase'
      }
    >
      {kicker}
    </span>
    <h3 className="font-headline text-xl font-bold text-deep-onyx leading-snug">{title}</h3>
    <p className="font-body text-sm text-secondary leading-relaxed">{detail}</p>
  </motion.div>
);

export const Slide03CoreThesis: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Positioning" title="Core Thesis">
      <div className="max-w-5xl flex flex-col gap-8">
        {/* Three pillars — bold anchor terms */}
        <motion.div
          initial={false}
          animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 12 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-3"
        >
          <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.15em] uppercase">
            Three pillars · one workflow
          </span>
          <div className="flex items-end gap-6">
            {PILLARS.map((p, i) => (
              <React.Fragment key={p.term}>
                {i > 0 && <span className="w-px h-8 bg-surface-container-highest" aria-hidden />}
                <div className="flex flex-col">
                  <span className="font-headline text-2xl font-bold text-deep-onyx leading-none">
                    {p.term}
                  </span>
                  <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.12em] uppercase mt-1">
                    {p.craft}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Pipeline: Media Data -> Workflow -> Defensible Decisions */}
        <div className="flex items-stretch gap-3">
          <StageCard
            visible={step >= 1}
            kicker="Input"
            title="Media Data"
            detail="Campaign and platform signals — the raw material every decision starts from."
          />
          <FlowArrow visible={step >= 2} />
          <StageCard
            visible={step >= 2}
            kicker="The integration point"
            title="The Applied Workflow"
            detail="Question → analysis → modelling, where Data, Copy and Design converge."
            emphasis
          />
          <FlowArrow visible={step >= 3} />
          <StageCard
            visible={step >= 3}
            kicker="Output"
            title="Defensible Decisions"
            detail="A media or marketing recommendation you can stand behind."
          />
        </div>

        {/* Driving question */}
        <motion.div
          initial={false}
          animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 12 }}
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
      </div>
    </SlideContent>
  );
};
