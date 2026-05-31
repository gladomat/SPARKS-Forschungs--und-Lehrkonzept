import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';
import { Database, FlaskConical, GraduationCap, Handshake } from 'lucide-react';

const QUADRANTS = [
  {
    icon: Database,
    title: 'Fachlicher Fit',
    body: 'Data-Analytics-Agenten arbeiten mit prozessgenerierten Daten — Kampagnenmetriken, Zielgruppenreaktionen und Entscheidungslogs sind typische Data-Science-Objekte im Kommunikationsumfeld. Memory macht sie über Zeit handlungsrelevant.',
  },
  {
    icon: FlaskConical,
    title: 'Methodischer Fit',
    body: 'Datenqualität · Explainable AI · Evaluation · Audit Trails · Dateninfrastruktur · Prompting & agentische Systeme.',
  },
  {
    icon: GraduationCap,
    title: 'Lehr-Forschungs-Fit',
    body: 'Studierende bauen Data-Analytics-Agenten, evaluieren Memory-Retrieval, analysieren Bias-Propagation, interpretieren Audit-Logs und testen XAMA-Bench-Prototypen.',
  },
  {
    icon: Handshake,
    title: 'Transfer- & Drittmittel-Fit',
    body: 'Anschlussfähig an anwendungsorientierte Förderlinien und Praxispartner aus Medien, Kommunikation und Marketing. EU AI Act (Logging, Transparenz, Aufsicht) macht die Frage zusätzlich relevant.',
  },
];

export const Slide16ProfessurFit: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Umsetzung" title="Fit zur Professur Data Science">
      <div className="grid grid-cols-2 gap-5 max-w-6xl mt-2">
        {QUADRANTS.map((q, i) => {
          const Icon = q.icon;
          return (
            <motion.div
              key={q.title}
              initial={false}
              animate={{ opacity: step >= i ? 1 : 0, y: step >= i ? 0 : 16 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-surface-container-high rounded-lg p-5 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-surface-container-low">
                  <Icon className="w-4 h-4 text-action-orange" strokeWidth={1.75} />
                </span>
                <h3 className="font-headline text-base font-bold text-deep-onyx">{q.title}</h3>
              </div>
              <p className="font-body text-[0.85rem] text-secondary leading-relaxed">
                {q.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SlideContent>
  );
};
