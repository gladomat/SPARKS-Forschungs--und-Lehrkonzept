import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';
import { Palette, Terminal, type LucideIcon } from 'lucide-react';

interface PathCardProps {
  label: string;
  audience: string;
  tool: string;
  focus: string;
  icon: LucideIcon;
  visible: boolean;
}

const PathCard: React.FC<PathCardProps> = ({ label, audience, tool, focus, icon: Icon, visible }) => (
  <motion.div
    initial={false}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
    transition={{ duration: 0.4 }}
    className="bg-white border border-surface-container-high rounded-lg p-6 flex flex-col gap-3 relative"
  >
    <Icon className="absolute top-5 right-5 w-4 h-4 text-surface-container-highest" strokeWidth={1.5} />
    <div>
      <h3 className="font-headline text-lg font-bold text-deep-onyx leading-snug">
        {label}
      </h3>
      <p className="font-mono text-[0.6rem] text-data-gray tracking-[0.12em] uppercase mt-1">
        {audience}
      </p>
    </div>
    <div className="flex flex-col gap-1">
      <span className="font-body text-sm text-deep-onyx">
        <span className="font-bold">Tools</span> — {tool}
      </span>
      <span className="font-body text-sm text-deep-onyx">
        <span className="font-bold">Focus</span> — {focus}
      </span>
    </div>
  </motion.div>
);

export const Slide07TwoLearningPaths: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Didactic Design" title="Two Learning Paths">
      <div className="max-w-3xl flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <PathCard
            visible={step >= 0}
            label="Communication & Design"
            audience="Design & Arts · Copy & Story"
            tool="low-code, browser-based"
            focus="interpret, critique, visualize, explain"
            icon={Palette}
          />
          <PathCard
            visible={step >= 1}
            label="Media & Performance"
            audience="Media & Data · quantitatively inclined"
            tool="notebook-based, Python ecosystem"
            focus="reproduce, extend, model, validate"
            icon={Terminal}
          />
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 16 }}
          transition={{ duration: 0.4 }}
          className="border-2 border-action-orange bg-action-orange/[0.04] rounded-lg px-6 py-5 flex flex-col gap-1"
        >
          <span className="font-mono text-[0.6rem] text-action-orange tracking-[0.15em] uppercase">
            Shared across both paths
          </span>
          <span className="font-body text-base text-deep-onyx leading-relaxed">
            Same dataset · same research question · same evidence standards · same
            competencies. <span className="font-bold">Different tool depth, identical cognitive standard.</span>
          </span>
        </motion.div>
      </div>
    </SlideContent>
  );
};
