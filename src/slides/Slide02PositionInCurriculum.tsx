import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

const SPINE = [
  'Scientific Methods',
  'Artificial Intelligence',
  'Coding & Prompting',
  'Marketing Technologies',
];

interface TrackProps {
  program: string;
  craft: string;
  modules: string[];
}

const TRACKS: TrackProps[] = [
  {
    program: 'Copy & Story',
    craft: 'Narrative Craft',
    modules: ['Editorial & Longcopy', 'Social Media Writing', 'Screenwriting'],
  },
  {
    program: 'Media & Data',
    craft: 'Analytics Craft',
    modules: ['Data Analytics', 'Predictive Modelling', 'Performance Metrics'],
  },
  {
    program: 'Design & Arts',
    craft: 'Visual Craft',
    modules: ['UI / UX', '3D / Spatial Design', 'Film Editing'],
  },
];

const TrackCard: React.FC<TrackProps> = ({ program, craft, modules }) => (
  <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-3">
    <h3 className="font-headline text-lg font-bold text-deep-onyx leading-snug">{program}</h3>
    <span className="self-start rounded-full bg-action-orange/10 px-3 py-1 font-mono text-[0.6rem] font-bold text-action-orange tracking-[0.12em] uppercase">
      {craft}
    </span>
    <ul className="flex flex-col gap-1.5 mt-1">
      {modules.map((m) => (
        <li key={m} className="font-body text-sm text-secondary leading-relaxed">
          {m}
        </li>
      ))}
    </ul>
  </div>
);

export const Slide02PositionInCurriculum: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Positioning" title="Position in the Curriculum">
      <div className="max-w-5xl flex flex-col gap-4">
        {/* Three program tracks on a warm ground */}
        <motion.div
          initial={false}
          animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 16 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-action-orange/[0.05] p-5"
        >
          <div className="grid grid-cols-3 gap-5">
            {TRACKS.map((t) => (
              <TrackCard key={t.program} {...t} />
            ))}
          </div>
        </motion.div>

        {/* Shared spine — every programme */}
        <motion.div
          initial={false}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 16 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-2"
        >
          <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.12em] uppercase">
            Shared foundation · all three programmes (Sem 1–5)
          </span>
          <div className="flex flex-wrap gap-2">
            {SPINE.map((m) => (
              <span
                key={m}
                className="bg-white border border-surface-container-high rounded-md px-3 py-1.5 font-body text-sm text-deep-onyx"
              >
                {m}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Convergence node */}
        <motion.div
          initial={false}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 12 }}
          transition={{ duration: 0.4 }}
          className="border-2 border-action-orange bg-action-orange/[0.05] rounded-lg px-6 py-4 flex flex-col gap-1"
        >
          <span className="font-mono text-[0.6rem] text-action-orange tracking-[0.15em] uppercase">
            Data Science · Semester 5 — where they converge
          </span>
          <span className="font-body text-base text-deep-onyx leading-relaxed">
            The shared spine and each programme's craft integrate into{' '}
            <span className="font-bold">one defensible, data-driven decision.</span>
          </span>
        </motion.div>

        {/* Prepares for */}
        <motion.span
          initial={false}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 12 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[0.6rem] text-data-gray tracking-[0.12em] uppercase"
        >
          Prepares for · Practice Project · Bachelor Thesis (Sem 6–7)
        </motion.span>
      </div>
    </SlideContent>
  );
};
