import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

const QUESTIONS = [
  {
    n: 'FF1',
    pillar: 'Explainable Memory Retrieval',
    question: 'Lässt sich nachvollziehbar machen, woran sich ein Agent erinnert — und warum?',
    method: 'Attributionsverfahren (Shapley, graphbasiert) für mehrstufiges Agenten-Gedächtnis, ohne nachträglich plausibel klingende Erklärungen.',
    case: 'Welche früheren Kampagnen, A/B-Tests oder Zielgruppenannahmen haben die aktuelle Empfehlung tatsächlich beeinflusst?',
  },
  {
    n: 'FF2',
    pillar: 'Responsible Memory Lifecycle',
    question: 'Was darf ein Agent dauerhaft lernen — und was muss er wieder verlernen?',
    method: 'Kontrolliertes Speichern (Write-Gating), Validierung und gezieltes Vergessen gegen verfälschtes Gedächtnis und sich fortpflanzende Verzerrungen.',
    case: 'Was darf der Agent aus früheren Kampagnen dauerhaft lernen — und was muss er korrigieren oder löschen?',
  },
  {
    n: 'FF3',
    pillar: 'Evaluation & Benchmarking',
    question: 'Wie misst man, ob das Gedächtnis eines Agenten vertrauenswürdig ist?',
    method: 'Kennzahlen für Treue der Erklärung (Faithfulness), Protokoll-Vollständigkeit, Stabilität und korrektes Vergessen.',
    case: 'Können Menschen die Agentenempfehlung prüfen und auditieren?',
  },
];

export const Slide15ResearchQuestions: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Forschungsprogramm" title="Technische Forschungsfragen">
      <div className="flex flex-col gap-3 max-w-6xl">
        {QUESTIONS.map((q, i) => (
          <motion.div
            key={q.n}
            initial={false}
            animate={{ opacity: step >= i ? 1 : 0, y: step >= i ? 0 : 16 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-surface-container-high rounded-lg p-4 grid grid-cols-[auto_1fr] gap-5 items-start"
          >
            <div className="flex flex-col items-center gap-1 pt-1">
              <span className="font-mono text-sm font-bold text-action-orange tracking-widest">{q.n}</span>
            </div>
            <div>
              <div className="font-mono text-[0.7rem] text-data-gray tracking-[0.12em] uppercase mb-2">
                {q.pillar}
              </div>
              <p className="font-headline text-[0.98rem] font-bold text-deep-onyx leading-snug mb-2">
                {q.question}
              </p>
              <p className="font-body text-xs text-data-gray italic leading-snug mb-2">
                <span className="font-semibold not-italic">Methodisch: </span>
                {q.method}
              </p>
              <p className="font-body text-sm text-secondary leading-relaxed">
                <span className="font-semibold text-action-orange">Im Leitfall: </span>
                {q.case}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideContent>
  );
};
