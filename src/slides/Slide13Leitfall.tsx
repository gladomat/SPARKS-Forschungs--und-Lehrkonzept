import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';
import { LineChart, Database, Lightbulb } from 'lucide-react';

const COLUMNS = [
  {
    icon: LineChart,
    title: 'Er analysiert',
    items: ['Kampagnenmetriken', 'Zielgruppenreaktionen', 'Conversion-Daten', 'frühere Briefings', 'A/B-Tests', 'Performance-Historien'],
  },
  {
    icon: Database,
    title: 'Er speichert',
    items: ['wiederverwendbare Erkenntnisse', 'Zielgruppenannahmen', 'Kanal- & Messaging-Erfahrungen', 'frühere Entscheidungen & Feedback'],
  },
  {
    icon: Lightbulb,
    title: 'Er empfiehlt',
    items: ['Welche Zielgruppe priorisieren?', 'Welche Botschaft testen?', 'Welcher Kanal performt historisch?', 'Welche Annahmen gelten noch?'],
  },
];

export const Slide13Leitfall: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Ausgangspunkt" title="Leitfall: Der Data-Analytics-Agent erinnert sich mit">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch max-w-6xl mt-2">
        {COLUMNS.map((col, i) => {
          const Icon = col.icon;
          return (
            <React.Fragment key={col.title}>
              {i > 0 && (
                <div className="flex items-center px-3">
                  <motion.svg
                    width="28" height="12" viewBox="0 0 28 12"
                    className="text-action-orange"
                    initial={false}
                    animate={{ opacity: step >= i ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <line x1="0" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="19,2 27,6 19,10" fill="currentColor" />
                  </motion.svg>
                </div>
              )}
              <motion.div
                initial={false}
                animate={{ opacity: step >= i ? 1 : 0, y: step >= i ? 0 : 20 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-surface-container-high rounded-lg p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-action-orange" strokeWidth={1.75} />
                  <h3 className="font-headline text-base font-bold text-deep-onyx">{col.title}</h3>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {col.items.map((it) => (
                    <li key={it} className="font-body text-[0.82rem] text-secondary leading-snug flex items-start gap-2">
                      <span className="text-action-orange mt-[2px]">·</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 12 }}
        transition={{ duration: 0.4 }}
        className="mt-8 max-w-6xl border-l-4 border-action-orange bg-surface-container-low/60 pl-5 py-3"
      >
        <p className="font-headline text-lg font-bold text-deep-onyx leading-snug">
          Agent Memory ist keine Komfortfunktion, sondern eine zweite Entscheidungsebene.
        </p>
        <p className="font-body text-sm text-secondary mt-1">
          XAMA macht diese Ebene erklärbar und auditierbar.
        </p>
      </motion.div>
    </SlideContent>
  );
};
