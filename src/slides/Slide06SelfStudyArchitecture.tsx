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
        <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.15em] uppercase">
          The weekly loop · repeated each week
        </span>
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
            title="Hands-on Practice"
            detail="Work the running case in notebooks or low-code tools"
            icon={Wrench}
          />
          <LoopCard
            visible={step >= 2}
            label="03 · Applied Task"
            title="Produce an Artifact"
            detail="Notebook, brief, dashboard, model evaluation, or data story; quizzes and flash cards for self-study"
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
          className="group relative border border-action-orange/20 bg-action-orange/[0.04] rounded-lg px-6 py-4 flex flex-col gap-2 cursor-help"
        >
          <div>
            <span className="font-headline text-sm font-bold text-action-orange">
              Flipped Classroom 2.0
            </span>
            <span className="font-body text-sm text-secondary ml-2">
              — async time for foundations, synchronous time reserved for higher-order
              work and concentrated where students need it most.
            </span>
          </div>
          <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.12em] uppercase border-t border-action-orange/15 pt-2">
            Validated model · Karadeniz et al. (2025) · Bloom-taxonomy progression · particularly effective for working professionals
          </span>

          {/* Hover detail */}
          <div className="pointer-events-none absolute bottom-full left-0 right-0 mb-3 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 z-20">
            <div className="bg-white border border-action-orange/30 rounded-lg px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col gap-2.5">
              <span className="font-mono text-[0.6rem] text-action-orange tracking-[0.15em] uppercase">
                Karadeniz et al. · Open Praxis 17(2), 2025
              </span>
              <ul className="font-body text-xs text-deep-onyx leading-relaxed flex flex-col gap-1.5">
                <li className="flex gap-2">
                  <span className="text-action-orange shrink-0 mt-[1px]">▸</span>
                  <span>14-week ODL syllabus with structured pre-class / in-class phasing</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-action-orange shrink-0 mt-[1px]">▸</span>
                  <span>Pre-class (async): lectures, videos, readings — Bloom <em>remember</em> + <em>understand</em></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-action-orange shrink-0 mt-[1px]">▸</span>
                  <span>In-class (sync): application, discussion, problem-solving — <em>apply, analyze, evaluate, create</em></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-action-orange shrink-0 mt-[1px]">▸</span>
                  <span>Open & Distance Learning context — adult learners balancing work and study</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-action-orange shrink-0 mt-[1px]">▸</span>
                  <span>Validated effects: improved learning experience, perception, and AI literacy</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideContent>
  );
};
