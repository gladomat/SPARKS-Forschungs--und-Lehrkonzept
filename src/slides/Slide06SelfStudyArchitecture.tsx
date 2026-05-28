import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';
import { PlayCircle, Wrench, MessageCircle, Target, type LucideIcon } from 'lucide-react';

interface LoopCardProps {
  label: string;
  title: string;
  detail: string;
  icon: LucideIcon;
  visible: boolean;
}

const LoopCard: React.FC<LoopCardProps> = ({ label, title, detail, icon: Icon, visible }) => (
  <motion.div
    initial={false}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
    transition={{ duration: 0.4 }}
    className="bg-white border border-surface-container-high rounded-lg p-6 flex flex-col gap-1 relative"
  >
    <Icon className="absolute top-5 right-5 w-4 h-4 text-surface-container-highest" strokeWidth={1.5} />
    <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.15em] uppercase">
      {label}
    </span>
    <span className="font-headline text-lg font-bold text-deep-onyx leading-snug">
      {title}
    </span>
    <span className="font-body text-sm text-secondary leading-relaxed">
      {detail}
    </span>
  </motion.div>
);

export const Slide06SelfStudyArchitecture: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Didactic Design" title="Self-Study Architecture">
      <div className="max-w-3xl flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-5">
          <LoopCard
            visible={step >= 0}
            label="01 · Input"
            title="Microlearning"
            detail="Avatar-narrated units, 15–30 min, modular and swappable"
            icon={PlayCircle}
          />
          <LoopCard
            visible={step >= 1}
            label="02 · Guided Practice"
            title="Worked Examples"
            detail="On the campaign dataset, low-code first"
            icon={Wrench}
          />
          <LoopCard
            visible={step >= 2}
            label="03 · Reflection"
            title="Connect to Program"
            detail="Tie the week's content to the student's home discipline"
            icon={MessageCircle}
          />
          <LoopCard
            visible={step >= 3}
            label="04 · Checkpoint"
            title="Mastery-Oriented"
            detail="Small deliverable with repeatable feedback loops"
            icon={Target}
          />
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 16 }}
          transition={{ duration: 0.4 }}
          className="border border-action-orange/20 bg-action-orange/[0.04] rounded-lg px-6 py-4"
        >
          <span className="font-headline text-sm font-bold text-action-orange">
            Flipped Classroom 2.0
          </span>
          <span className="font-body text-sm text-secondary ml-2">
            — async time for foundations, synchronous time reserved for higher-order
            work and concentrated where students need it most.
          </span>
        </motion.div>
      </div>
    </SlideContent>
  );
};
