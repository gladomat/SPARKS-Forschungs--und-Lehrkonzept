import React, { useContext } from 'react';
import { SlideContent } from '../components/SlideContent';
import { motion } from 'motion/react';
import { SlideStepContext } from '../App';

const NODES = [
  {
    tag: 'Kognitive Architekturen',
    text: 'Intelligentes Handeln braucht Gedächtnis — schon in Soar war Memory Voraussetzung, nicht Zusatz.',
  },
  {
    tag: 'Tulving',
    text: 'Episodisches Gedächtnis ist kein Archiv, sondern Grundlage situierten Handelns über Zeit.',
  },
  {
    tag: 'Moderne KI-Agenten',
    text: 'Persistentes Memory speichert Präferenzen, frühere Entscheidungen, Feedback und Kontext.',
  },
  {
    tag: 'Neue Frage',
    text: 'Wenn Agenten sich erinnern, beeinflusst Memory ihre Empfehlungen — und muss erklärbar werden.',
  },
];

export const Slide12Genealogy: React.FC = () => {
  const step = useContext(SlideStepContext);

  return (
    <SlideContent label="Ausgangspunkt" title="Von erklärbarer KI zu erklärbarem Agentengedächtnis">
      <div className="grid grid-cols-[1.4fr_1fr] gap-12 max-w-6xl mt-2">
        {/* Genealogy timeline */}
        <div className="relative pl-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-action-orange/20" />
          <div className="flex flex-col gap-5">
            {NODES.map((node, i) => (
              <motion.div
                key={node.tag}
                initial={false}
                animate={{ opacity: step >= i ? 1 : 0, x: step >= i ? 0 : -12 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-action-orange ring-4 ring-background" />
                <div className="font-mono text-xs text-action-orange tracking-[0.12em] uppercase mb-1">
                  {node.tag}
                </div>
                <p className="font-body text-[0.95rem] text-deep-onyx leading-relaxed">
                  {node.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Prior-work credibility card */}
        <motion.div
          initial={false}
          animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 16 }}
          transition={{ duration: 0.4 }}
          className="self-center bg-white border border-surface-container-high rounded-lg p-6"
        >
          <div className="font-mono text-xs text-action-orange tracking-[0.15em] uppercase mb-3">
            Selected prior work
          </div>
          <p className="font-body text-sm text-deep-onyx leading-relaxed">
            Guarnier et al., <span className="italic">„Cascaded Multimodal Deep Learning in the Differential
            Diagnosis, Progression Prediction, and Staging of Alzheimer's and Frontotemporal Dementia"</span>,
            medRxiv, 2024.
          </p>
          <div className="asymmetric-rule my-4" />
          <p className="font-body text-sm text-secondary leading-relaxed">
            Multimodale Daten entscheidungsnah nutzbar machen — und sichtbar machen, welche Modalitäten die
            Entscheidung prägen. XAMA verschiebt diese Linie: nicht nur das Modell, auch die Erinnerung muss
            erklärbar sein.
          </p>
        </motion.div>
      </div>
    </SlideContent>
  );
};
