import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';
import { Search, ShieldCheck, Gauge } from 'lucide-react';

const PILLARS = [
  {
    n: '1',
    icon: Search,
    title: 'Explainable Memory Retrieval',
    question: 'Warum erinnert sich der Agent an genau diese Kampagnenerfahrung?',
    methods: ['Shapley-basierte Quellenattribution', 'graphbasierte Pfaderklärungen', 'Retrieval-Scoring', 'Faithfulness-Analyse'],
  },
  {
    n: '2',
    icon: ShieldCheck,
    title: 'Responsible Memory Lifecycle',
    question: 'Was darf der Agent speichern, aktualisieren oder vergessen?',
    methods: ['Write-Gating', 'Validierung vor Konsolidierung', 'Memory-Poisoning-Abwehr', 'technische Löschung & Forgetting Correctness'],
  },
  {
    n: '3',
    icon: Gauge,
    title: 'Evaluation & Benchmarking',
    question: 'Wie messen wir, ob Erinnerungen und Erklärungen belastbar sind?',
    methods: ['XAMA-Bench', 'Erklärungsstabilität', 'Logging-Vollständigkeit', 'Bias-Propagation', 'Auditierbarkeit für menschliche Aufsicht'],
  },
];

export const Slide14ThreePillars: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Forschungsprogramm" title="XAMA: Drei Säulen für accountable Agent Memory">
      <div className="grid grid-cols-3 gap-6 max-w-6xl mt-2">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.n}
              initial={false}
              animate={{ opacity: step >= i ? 1 : 0, y: step >= i ? 0 : 20 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-surface-container-high rounded-lg p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-deep-onyx text-white font-headline text-sm font-bold">
                  {p.n}
                </span>
                <Icon className="w-5 h-5 text-action-orange" strokeWidth={1.75} />
              </div>
              <h3 className="font-headline text-base font-bold text-deep-onyx leading-snug">
                {p.title}
              </h3>
              <p className="font-body text-sm text-secondary italic leading-relaxed border-l-2 border-action-orange/40 pl-3">
                {p.question}
              </p>
              <ul className="flex flex-col gap-1.5 mt-1">
                {p.methods.map((m) => (
                  <li key={m} className="font-mono text-[0.7rem] text-data-gray tracking-tight flex items-start gap-2">
                    <span className="text-action-orange mt-[1px]">·</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 12 }}
        transition={{ duration: 0.4 }}
        className="mt-8 max-w-6xl flex items-center gap-3"
      >
        <span className="font-mono text-xs text-action-orange tracking-[0.15em] uppercase">Leitbegriff</span>
        <span className="font-headline text-lg font-bold text-deep-onyx">
          Accountability — nachvollziehbar machen, worauf eine Empfehlung beruht.
        </span>
      </motion.div>
    </SlideContent>
  );
};
