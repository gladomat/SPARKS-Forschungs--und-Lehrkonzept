import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

const PHASES = [
  {
    months: 'Monat 1–3',
    title: 'XAMA-Spezifikation & Use-Case-Design',
    items: ['Leitfall definieren', 'Memory-Lifecycle modellieren', 'technische Baseline wählen', 'Praxispartner identifizieren'],
  },
  {
    months: 'Monat 4–6',
    title: 'Prototyp: Explainable Memory Retrieval',
    items: ['Retrieval-Attribution implementieren', 'erste Audit-Logs definieren', 'Kampagnen- / Simulationsdaten nutzen'],
  },
  {
    months: 'Monat 7–9',
    title: 'XAMA-Bench v0.1',
    items: ['Metriken: Faithfulness, Logging, Erklärungsstabilität', 'erste studentische Projekt- & Abschlussarbeiten'],
  },
  {
    months: 'Monat 10–12',
    title: 'Transfer & Publikation',
    items: ['Workshop-Paper / Forschungsbeitrag', 'Drittmittel-Skizze mit Praxispartner', 'Integration in Data-Science-Lehre'],
  },
];

export const Slide17TwelveMonths: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Umsetzung" title="Erste 12 Monate">
      <div className="grid grid-cols-4 gap-4 max-w-6xl mt-2">
        {PHASES.map((p, i) => (
          <motion.div
            key={p.months}
            initial={false}
            animate={{ opacity: step >= i ? 1 : 0, y: step >= i ? 0 : 16 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-action-orange shrink-0" />
              <span className="font-mono text-[0.7rem] text-action-orange tracking-[0.12em] uppercase">{p.months}</span>
            </div>
            <div className="h-[2px] bg-action-orange/20 -mt-1" />
            <h3 className="font-headline text-[0.92rem] font-bold text-deep-onyx leading-snug">{p.title}</h3>
            <ul className="flex flex-col gap-1.5">
              {p.items.map((it) => (
                <li key={it} className="font-body text-[0.78rem] text-secondary leading-snug flex items-start gap-1.5">
                  <span className="text-action-orange mt-[1px]">·</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 12 }}
        transition={{ duration: 0.4 }}
        className="mt-8 max-w-6xl border-l-4 border-action-orange bg-surface-container-low/60 pl-5 py-4"
      >
        <div className="font-mono text-xs text-action-orange tracking-[0.15em] uppercase mb-1">Schlussbotschaft</div>
        <p className="font-headline text-lg font-bold text-deep-onyx leading-snug">
          XAMA macht sichtbar, wie Data-Analytics-Agenten erinnern — und wie diese Erinnerungen erklärbar,
          auditierbar und verantwortbar werden.
        </p>
      </motion.div>
    </SlideContent>
  );
};
