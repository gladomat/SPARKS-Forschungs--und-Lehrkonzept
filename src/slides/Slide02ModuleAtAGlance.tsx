import React from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { BookOpen, Weight, CalendarDays, Laptop, Users, type LucideIcon } from 'lucide-react';

interface GlanceCardProps {
  label: string;
  value: string;
  detail?: string;
  index: number;
  icon: LucideIcon;
}

const GlanceCard: React.FC<GlanceCardProps> = ({ label, value, detail, index, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
    className="bg-white border border-surface-container-high rounded-lg p-6 flex flex-col gap-1 relative"
  >
    <Icon className="absolute top-5 right-5 w-4 h-4 text-surface-container-highest" strokeWidth={1.5} />
    <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.15em] uppercase">
      {label}
    </span>
    <span className="font-headline text-lg font-bold text-deep-onyx leading-snug">
      {value}
    </span>
    {detail && (
      <span className="font-body text-sm text-secondary leading-relaxed">
        {detail}
      </span>
    )}
  </motion.div>
);

export const Slide02ModuleAtAGlance: React.FC = () => (
  <SlideContent label="Positioning" title="Module at a Glance">
    <div className="grid grid-cols-3 gap-5 max-w-4xl">
      <GlanceCard index={0} label="Type" value="MIND" detail="mandatory, cross-program" icon={BookOpen} />
      <GlanceCard index={1} label="ECTS / Workload" value="6 ECTS" detail="150 hours total" icon={Weight} />
      <GlanceCard index={2} label="Semester / Duration" value="5 weeks" detail="5th semester" icon={CalendarDays} />
      <GlanceCard index={3} label="Format" value="130h self-study" detail="16h on-site · 4h virtual classroom" icon={Laptop} />
      <GlanceCard index={4} label="Audience" value="Design & Arts · Copy & Story · Media & Data" icon={Users} />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 + 5 * 0.08 }}
        className="border border-action-orange/20 bg-action-orange/[0.04] rounded-lg p-6 flex items-center justify-center"
      >
        <span className="font-headline text-sm font-bold text-action-orange leading-snug text-center">
          Scientific judgment for communication professionals
        </span>
      </motion.div>
    </div>
  </SlideContent>
);
