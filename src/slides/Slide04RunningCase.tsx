import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext, SlideNavContext } from '../App';
import {
  Search,
  Database,
  Sparkles,
  BarChart3,
  FunctionSquare,
  Brain,
  ClipboardCheck,
  Lightbulb,
  Megaphone,
  TrendingUp,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

type Step = { label: string; icon: LucideIcon };

const ROWS: Step[][] = [
  [
    { label: 'Question', icon: Search },
    { label: 'Data', icon: Database },
    { label: 'Cleaning', icon: Sparkles },
  ],
  [
    { label: 'EDA', icon: BarChart3 },
    { label: 'Statistics', icon: FunctionSquare },
    { label: 'Modelling', icon: Brain },
  ],
  [
    { label: 'Evaluation', icon: ClipboardCheck },
    { label: 'Interpretation', icon: Lightbulb },
    { label: 'Recommendation', icon: Megaphone },
  ],
];

const ROW_INDENTS = ['ml-0', 'ml-24', 'ml-48'];

const InRowArrow: React.FC = () => (
  <svg
    width="18"
    height="10"
    viewBox="0 0 18 10"
    className="text-action-orange shrink-0"
  >
    <line x1="0" y1="5" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" />
    <polygon points="11,1.5 17,5 11,8.5" fill="currentColor" />
  </svg>
);

const StepBox = React.forwardRef<HTMLDivElement, Step>(({ label, icon: Icon }, ref) => (
  <div
    ref={ref}
    className="flex items-stretch bg-white border border-surface-container-high rounded overflow-hidden"
  >
    <div className="flex items-center justify-center bg-action-orange/10 px-2">
      <Icon className="w-3.5 h-3.5 text-action-orange" strokeWidth={2} />
    </div>
    <span className="font-mono text-xs text-deep-onyx tracking-wider px-2.5 py-1.5">
      {label}
    </span>
  </div>
));
StepBox.displayName = 'StepBox';

type ArrowPath = { d: string };

export const Slide04RunningCase: React.FC = () => {
  const step = useContext(SlideStepContext);
  const goToSlide = useContext(SlideNavContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const rowEndRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowStartRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [wrapPaths, setWrapPaths] = useState<ArrowPath[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      setSvgSize({ w: cRect.width, h: cRect.height });

      const paths: ArrowPath[] = [];
      // Two wrap arrows: row0 end → row1 start, row1 end → row2 start
      // Shape: vertical down from last box's bottom, kink left across the inter-row gap,
      // kink down into the first box of the next row (arrowhead points down).
      for (let i = 0; i < 2; i++) {
        const from = rowEndRefs.current[i];
        const to = rowStartRefs.current[i + 1];
        if (!from || !to) continue;
        const fr = from.getBoundingClientRect();
        const tr = to.getBoundingClientRect();
        const x1 = fr.left + fr.width / 2 - cRect.left;
        const y1 = fr.bottom - cRect.top;
        const x2 = tr.left + tr.width / 2 - cRect.left;
        const y2 = tr.top - cRect.top;
        const midY = (y1 + y2) / 2;
        const d = `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2 - 4}`;
        paths.push({ d });
      }
      setWrapPaths(paths);
    };

    measure();
    window.addEventListener('resize', measure);
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <SlideContent label="Positioning" title="Running Case & Workflow">
      <div className="max-w-4xl flex flex-col gap-8">
        {/* Workflow */}
        <motion.div
          initial={false}
          animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 16 }}
          transition={{ duration: 0.4 }}
          ref={containerRef}
          className="relative flex flex-col gap-6"
        >
          {ROWS.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className={`flex items-center gap-2 ${ROW_INDENTS[rowIdx]}`}
            >
              {row.map((stepItem, i) => {
                const isFirst = i === 0;
                const isLast = i === row.length - 1;
                return (
                  <React.Fragment key={stepItem.label}>
                    {i > 0 && <InRowArrow />}
                    <StepBox
                      label={stepItem.label}
                      icon={stepItem.icon}
                      ref={(el) => {
                        if (isFirst) rowStartRefs.current[rowIdx] = el;
                        if (isLast) rowEndRefs.current[rowIdx] = el;
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          ))}

          {/* Wrap-around arrows overlay */}
          <svg
            width={svgSize.w}
            height={svgSize.h}
            viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
            className="absolute inset-0 pointer-events-none text-action-orange"
            aria-hidden
          >
            <defs>
              <marker
                id="wrap-arrowhead"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>
            {wrapPaths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                markerEnd="url(#wrap-arrowhead)"
              />
            ))}
          </svg>
        </motion.div>

        {/* Info cards (side by side) */}
        <div className="grid grid-cols-12 gap-4">
          {/* Running case */}
          <motion.div
            initial={false}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 16 }}
            transition={{ duration: 0.4 }}
            className="col-span-7 relative bg-white border border-surface-container-high rounded-lg p-6 flex flex-col gap-3 overflow-hidden"
          >
            <Database className="absolute top-4 right-4 w-10 h-10 text-action-orange/15" />
            <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.15em] uppercase">
              The running case (semester-swappable)
            </span>
            <p className="font-body text-base text-deep-onyx leading-relaxed">
              A campaign or platform-performance dataset with audience segments, creative variants,
              impressions/clicks/conversions, engagement metrics, channel information, and a
              recommendation or targeting component.
            </p>
          </motion.div>

          {/* Emphasis */}
          <motion.div
            initial={false}
            animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 12 }}
            transition={{ duration: 0.4 }}
            className="col-span-5 border border-action-orange/20 bg-action-orange/[0.04] rounded-lg px-6 py-4 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-action-orange/10 flex items-center justify-center text-action-orange shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="font-body text-base text-deep-onyx leading-relaxed">
              Students move through the full cycle,{' '}
              <span className="font-bold">every week, on one running case</span> — building deepening
              competence across all five weeks.
            </span>
          </motion.div>
        </div>

        {/* Discreet jump to the hidden methods detail slide */}
        <motion.button
          initial={false}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => goToSlide('methods-detail')}
          className="self-end flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.15em] uppercase text-data-gray hover:text-action-orange transition-colors cursor-pointer"
        >
          Detail: Methods & Models
          <ArrowRight className="w-3 h-3" />
        </motion.button>
      </div>
    </SlideContent>
  );
};
