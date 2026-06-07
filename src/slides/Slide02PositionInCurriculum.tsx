import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

interface ModuleChipProps {
  label: string;
  highlight?: boolean;
}

const ModuleChip: React.FC<ModuleChipProps> = ({ label, highlight }) => (
  <div
    className={
      highlight
        ? 'border-2 border-action-orange bg-action-orange/[0.06] rounded-md px-3 py-2 font-headline text-sm font-bold text-deep-onyx'
        : 'bg-white border border-surface-container-high rounded-md px-3 py-2 font-body text-sm text-deep-onyx'
    }
  >
    {label}
  </div>
);

const COLUMNS = [
  {
    header: 'Already encountered (Sem 1–4)',
    modules: [
      'Scientific Methods',
      'Media & Data 1–3',
      'Artificial Intelligence',
      'Coding & Prompting',
      'Data Analytics',
      'Predictive Modelling',
      'Conversion Optimization',
    ],
  },
  {
    header: 'Running parallel (Sem 5)',
    modules: ['Marketing', 'Marketing Technologies', 'Performance Metrics', 'Creative Media'],
    highlight: 'Data Science',
  },
  {
    header: 'Prepares for (Sem 6–7)',
    modules: ['Job Module', 'Practice Project', 'Bachelor Thesis'],
  },
];

export const Slide02PositionInCurriculum: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Positioning" title="Position in the Curriculum">
      <div className="max-w-5xl flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
          {COLUMNS.map((col, ci) => (
            <motion.div
              key={col.header}
              initial={false}
              animate={{ opacity: step >= ci ? 1 : 0, y: step >= ci ? 0 : 16 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-3"
            >
              <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.12em] uppercase">
                {col.header}
              </span>
              <div className="flex flex-col gap-2">
                {col.modules.map((m) => (
                  <ModuleChip key={m} label={m} />
                ))}
                {col.highlight && <ModuleChip label={col.highlight} highlight />}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 12 }}
          transition={{ duration: 0.4 }}
          className="border border-action-orange/20 bg-action-orange/[0.04] rounded-lg px-6 py-4"
        >
          <span className="font-body text-base text-deep-onyx leading-relaxed">
            <span className="font-bold">The module's role:</span> consolidate prior technical and
            methodological foundations into one end-to-end analytical workflow.
          </span>
        </motion.div>
      </div>
    </SlideContent>
  );
};
