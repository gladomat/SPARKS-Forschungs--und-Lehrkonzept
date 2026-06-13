import React from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import {
  FunctionSquare,
  Brain,
  ClipboardCheck,
  Wrench,
  Telescope,
  type LucideIcon,
} from 'lucide-react';

type Method = { name: string; example: string };

const MethodRow: React.FC<Method> = ({ name, example }) => (
  <div className="flex flex-col gap-0.5">
    <span className="font-body text-xs font-bold text-deep-onyx">{name}</span>
    <span className="font-body text-[0.7rem] text-data-gray leading-snug italic">
      {example}
    </span>
  </div>
);

const SubLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-[0.6rem] text-action-orange tracking-[0.15em] uppercase mt-0.5">
    {children}
  </span>
);

interface ColumnProps {
  icon: LucideIcon;
  title: string;
  week: string;
  children: React.ReactNode;
  delay: number;
}

const Column: React.FC<ColumnProps> = ({ icon: Icon, title, week, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white border border-surface-container-high rounded-lg p-4 flex flex-col gap-2.5"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded bg-action-orange/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-action-orange" strokeWidth={2} />
        </div>
        <span className="font-headline text-sm font-bold text-deep-onyx">{title}</span>
      </div>
      <span className="font-mono text-[0.6rem] text-data-gray tracking-wider">{week}</span>
    </div>
    {children}
  </motion.div>
);

export const Slide04DetailMethods: React.FC = () => {
  return (
    <SlideContent label="Positioning · Detail" title="Methods & Models — A Closer Look">
      <div className="max-w-5xl flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-4">
          <Column icon={FunctionSquare} title="Statistical Foundations" week="W3" delay={0}>
            <MethodRow
              name="Descriptive statistics & distributions"
              example="What does engagement actually look like?"
            />
            <MethodRow
              name="Correlation & confounding"
              example="Creative effect — or just more reach?"
            />
            <MethodRow
              name="Hypothesis testing & A/B tests"
              example="Is the lift between variants real, or noise?"
            />
            <MethodRow
              name="Confidence intervals & effect size"
              example="How sure — and big enough to act on?"
            />
          </Column>

          <Column icon={Brain} title="Machine Learning" week="W4" delay={0.1}>
            <SubLabel>Supervised</SubLabel>
            <MethodRow
              name="Linear & logistic regression"
              example="Predict engagement; will this segment convert?"
            />
            <MethodRow
              name="Decision trees & random forests"
              example="Conversion drivers via feature importance."
            />
            <SubLabel>Unsupervised</SubLabel>
            <MethodRow
              name="k-means clustering"
              example="Segments from behaviour, not demographics."
            />
            <MethodRow
              name="PCA / dimensionality reduction"
              example="Many campaign metrics → a few patterns."
            />
          </Column>

          <Column icon={ClipboardCheck} title="Evaluation & Validation" week="W4–5" delay={0.2}>
            <MethodRow
              name="Train/test split & baselines"
              example="Never judge a model on data it memorized."
            />
            <MethodRow
              name="Confusion matrix, precision & recall"
              example="Which kind of error can the campaign afford?"
            />
            <MethodRow
              name="ROC / AUC"
              example="How well does the model rank prospects?"
            />
            <MethodRow
              name="Overfitting & generalization"
              example="Does the result hold beyond this dataset?"
            />
          </Column>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="col-span-7 bg-white border border-surface-container-high rounded-lg px-4 py-3 flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded bg-action-orange/10 flex items-center justify-center shrink-0">
              <Wrench className="w-4 h-4 text-action-orange" strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[0.6rem] text-data-gray tracking-[0.15em] uppercase">
                Toolchain — per learning path
              </span>
              <span className="font-body text-xs text-deep-onyx leading-relaxed">
                <span className="font-bold">Media & Data:</span> Python · pandas ·
                scikit-learn · Jupyter.{' '}
                <span className="font-bold">Copy & Story / Design & Arts:</span> browser-based,
                low-code, AI-assisted — same data, same evidence standards.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="col-span-5 border border-action-orange/20 bg-action-orange/[0.04] rounded-lg px-4 py-3 flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded-full bg-action-orange/10 flex items-center justify-center shrink-0">
              <Telescope className="w-4 h-4 text-action-orange" strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[0.6rem] text-action-orange tracking-[0.15em] uppercase">
                Named, not trained
              </span>
              <span className="font-body text-xs text-deep-onyx leading-relaxed">
                Neural nets & deep learning, transfer & reinforcement learning — contextualized,
                while hands-on depth stays with the core methods.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideContent>
  );
};
