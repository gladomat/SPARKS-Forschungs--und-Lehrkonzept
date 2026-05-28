import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

interface LaneCardProps {
  name: string;
  mode: string;
  detail: string;
  assured?: boolean;
  visible: boolean;
}

const LaneCard: React.FC<LaneCardProps> = ({ name, mode, detail, assured, visible }) => (
  <motion.div
    initial={false}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
    transition={{ duration: 0.4 }}
    className={
      assured
        ? 'border-2 border-action-orange bg-action-orange/[0.04] rounded-lg p-5 flex flex-col gap-1'
        : 'bg-white border border-surface-container-high rounded-lg p-5 flex flex-col gap-1'
    }
  >
    <span className={
      assured
        ? 'font-mono text-[0.6rem] text-action-orange tracking-[0.15em] uppercase'
        : 'font-mono text-[0.6rem] text-data-gray tracking-[0.15em] uppercase'
    }>
      {mode}
    </span>
    <span className="font-headline text-base font-bold text-deep-onyx">{name}</span>
    <span className="font-body text-sm text-secondary leading-relaxed">{detail}</span>
  </motion.div>
);

interface RecordCardProps {
  week: string;
  format: string;
  assured?: boolean;
  visible: boolean;
}

const RecordCard: React.FC<RecordCardProps> = ({ week, format, assured, visible }) => (
  <motion.div
    initial={false}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
    transition={{ duration: 0.35 }}
    className={
      assured
        ? 'border-2 border-action-orange bg-action-orange/[0.04] rounded-lg p-4 flex flex-col gap-1'
        : 'bg-white border border-surface-container-high rounded-lg p-4 flex flex-col gap-1'
    }
  >
    <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.12em] uppercase">
      {week}
    </span>
    <span className="font-body text-sm font-bold text-deep-onyx leading-snug">{format}</span>
    <span className={
      assured
        ? 'font-mono text-[0.55rem] text-action-orange tracking-[0.12em] uppercase mt-1'
        : 'font-mono text-[0.55rem] text-data-gray tracking-[0.12em] uppercase mt-1'
    }>
      {assured ? 'Assured' : 'Integrated'}
    </span>
  </motion.div>
);

export const Slide08AssessmentConcept: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Assessment" title="Assessment Concept">
      <div className="max-w-4xl flex flex-col gap-5">
        <motion.div
          initial={false}
          animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 12 }}
          transition={{ duration: 0.4 }}
          className="border border-action-orange/20 bg-action-orange/[0.04] rounded-lg px-6 py-4"
        >
          <span className="font-body text-base text-deep-onyx leading-relaxed">
            <span className="font-bold">AI is allowed where professional judgment is assessed.</span>{' '}
            AI is restricted where personal competence must be verified.
          </span>
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          <LaneCard
            visible={step >= 1}
            mode="Lane 1 · in-person, no AI"
            name="Assured"
            detail="On-site pitch at the end of Week 4. Live, unaided."
            assured
          />
          <LaneCard
            visible={step >= 2}
            mode="Lane 2 · digital, AI documented"
            name="Integrated"
            detail="Written submissions with reflective documentation of AI use."
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <RecordCard visible={step >= 3} week="End of W2" format="EDA evidence memo" />
          <RecordCard visible={step >= 4} week="End of W3" format="Statistical reasoning brief" />
          <RecordCard visible={step >= 5} week="End of W4" format="On-site pitch — defend an analysis" assured />
          <RecordCard visible={step >= 6} week="End of W5" format="Reflection portfolio" />
        </div>
      </div>
    </SlideContent>
  );
};
