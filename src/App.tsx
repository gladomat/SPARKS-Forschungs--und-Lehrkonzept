import React, { createContext } from 'react';
import { PresentationLayout } from './components/PresentationLayout';
import { PresenterLayout } from './components/PresenterLayout';
import { ShimmerOverlay } from './components/ShimmerOverlay';
import { SlideTitle } from './components/SlideTitle';
import { Slide02ModuleAtAGlance } from './slides/Slide02ModuleAtAGlance';
import { Slide03WhatDataScienceMeansHere } from './slides/Slide03WhatDataScienceMeansHere';
import { Slide04CompetencyClusters } from './slides/Slide04CompetencyClusters';
import { Slide05FiveWeekRoadmap } from './slides/Slide05FiveWeekRoadmap';
import { Slide06SelfStudyArchitecture } from './slides/Slide06SelfStudyArchitecture';
import { Slide07TwoLearningPaths } from './slides/Slide07TwoLearningPaths';
import { Slide08AssessmentConcept } from './slides/Slide08AssessmentConcept';
import { Slide09DataScienceStudio } from './slides/Slide09DataScienceStudio';
import { Slide10WhyThisConceptWorks } from './slides/Slide10WhyThisConceptWorks';
import { Slide12Genealogy } from './slides/Slide12Genealogy';
import { Slide13Leitfall } from './slides/Slide13Leitfall';
import { Slide14ThreePillars } from './slides/Slide14ThreePillars';
import { Slide15ResearchQuestions } from './slides/Slide15ResearchQuestions';
import { Slide16ProfessurFit } from './slides/Slide16ProfessurFit';
import { Slide17TwelveMonths } from './slides/Slide17TwelveMonths';
import { AnimatePresence, motion } from 'motion/react';
import { useSyncedNavigation, getTransitionVariants } from './lib/useSyncedNavigation';

/* ------------------------------------------------------------------ */
/*  Slide definitions                                                  */
/* ------------------------------------------------------------------ */

export const SlideStepContext = createContext(Infinity);

interface SlideDefinition {
  id: string;
  part: 'teaching' | 'forschung';
  section?: string;
  component: React.ReactNode;
  notes?: string;
  steps?: number;
  presenterTitle: string;
}

export const SLIDES: SlideDefinition[] = [
  {
    id: 'title',
    part: 'teaching',
    presenterTitle: 'Title',
    component: (
      <SlideTitle
        label="Module Concept: Data Science"
        title="Data Science"
        subtitle="Data Science as Scientific Judgment for Communication Professionals"
        meta="A MIND module for the 5th semester · 6 ECTS · 5 weeks"
        author="Dr. Paul-Glad Mihai, 19.06.2026, Professur Data Science – SPARKS University of Applied Sciences, Brands & Communication"
        image="/images/image-slide1.png"
        imageAlt="Data Science visualization"
      />
    ),
  },
  {
    id: 'module-at-a-glance',
    part: 'teaching',
    section: 'positioning',
    presenterTitle: 'Module at a Glance',
    component: <Slide02ModuleAtAGlance />,
    notes: 'The official constraints. The concept is designed to fit them, not to negotiate around them.',
  },
  {
    id: 'what-ds-means-here',
    part: 'teaching',
    section: 'positioning',
    presenterTitle: 'What Data Science Means Here',
    component: <Slide03WhatDataScienceMeansHere />,
    steps: 6,
    notes: 'This is the central positioning. Media & Data already covers operational analytics. Information Technology covers the engineering. Data Science as a MIND module sits between them: it is the scientific reasoning layer that all three programs need. Designers need it to question the briefs they are given. Copywriters need it to evaluate the claims they make. Media strategists need it to defend their measurement choices. The running case — a real campaign dataset — anchors the module in concrete data work, not abstract critique. Students see the same dataset evolve across all five weeks: first as raw data to explore, then statistically, then through an algorithmic system. A campaign dashboard shows rising engagement: is this a real effect, a platform artifact, a targeting bias, a seasonality issue, or a vanity metric? That question is what this module trains them to answer.',
  },
  {
    id: 'competency-clusters',
    part: 'teaching',
    section: 'positioning',
    presenterTitle: 'Competency Clusters',
    component: <Slide04CompetencyClusters />,
    steps: 3,
    notes: "I've regrouped the five module goals into three clusters. Cluster A is conceptual data literacy. Cluster B is statistical reading — the part most communication professionals are missing and need most. Cluster C is hands-on ML at the right scope: students do not become ML engineers, but they run a simple supervised model on the campaign dataset, evaluate it, and discuss what it can and cannot do. Each of the five weeks has five competency-oriented learning objectives in the 'students will be able to …' format, mapped onto these three clusters. Students see them from week one — they know exactly what they need to demonstrate, and when.",
  },
  {
    id: 'five-week-roadmap',
    part: 'teaching',
    section: 'didactic-design',
    presenterTitle: 'Five-Week Roadmap',
    component: <Slide05FiveWeekRoadmap />,
    steps: 5,
    notes: 'The same campaign dataset runs through all five weeks. Week 1: introduction and orientation. Week 2: exploratory analysis. Week 3: statistical reasoning, with doubled virtual-classroom support because statistics is where students most often need real-time clarification. Week 4 is the on-site climax — the Data Science Studio — where students do hands-on modeling, encounter bias in their own work, and defend their judgment. Week 5 closes with reflection and bias work in broader ethical context.',
  },
  {
    id: 'self-study-architecture',
    part: 'teaching',
    section: 'didactic-design',
    presenterTitle: 'Self-Study Architecture',
    component: <Slide06SelfStudyArchitecture />,
    steps: 5,
    notes: 'The four-part loop, repeated every week, gives students a predictable rhythm. The microlearning format is compatible with the avatar production format — short, scriptable, modular units that can be updated each semester without rebuilding the course. Roughly 8 hours input, 10 hours guided practice, 4 hours reflection, 4 hours checkpoint per week. The checkpoint is mastery-oriented with repeatable feedback — continuous formative diagnostics, not pass-fail. Synchronous time is reserved for the cognitive work where having a teacher actually matters, and it is concentrated where students need it most.',
  },
  {
    id: 'two-learning-paths',
    part: 'teaching',
    section: 'didactic-design',
    presenterTitle: 'Two Learning Paths',
    component: <Slide07TwoLearningPaths />,
    steps: 3,
    notes: 'This is the answer to the central MIND challenge at SPARKS. A communication student needs data literacy as critical reading. A media student needs it as operational competence. Forcing both into one format either bores the media students or loses the designers. Two paths, common core dataset, common evidence standards — both must demonstrate the same five qualification goals, but through different evidence. The fairness logic is explicit: same dataset, same research question, same standards of evidence quality and uncertainty communication. The tool depth differs; the cognitive standard does not.',
  },
  {
    id: 'assessment-concept',
    part: 'teaching',
    section: 'assessment',
    presenterTitle: 'Assessment Concept',
    component: <Slide08AssessmentConcept />,
    steps: 7,
    notes: "A Data Science module in 2026 cannot ignore that students will use AI tools. The core principle — AI where judgment is assessed, AI restricted where competence is verified — handles this honestly. Four assessments, four formats, four different cognitive demands. The Week 2 EDA gives early diagnostic information. The Week 3 brief is the second checkpoint before the on-site phase. Week 4 on-site pitch is the Assured Lane. Week 5 portfolio is deliberately lighter — reflective synthesis, not a fourth full deliverable. The frameworks I reference are well-established: Two-Lane assessment from Sydney, the AI Assessment Scale from Perkins and colleagues.",
  },
  {
    id: 'data-science-studio',
    part: 'teaching',
    section: 'assessment',
    presenterTitle: 'The Data Science Studio',
    component: <Slide09DataScienceStudio />,
    steps: 3,
    notes: "Sixteen hours on-site is precious. I use them for what asynchronous formats and AI avatars cannot do: collaborative analysis with real-time feedback, methodological critique, and judgment discussions that only work face-to-face. The two days share one case and one narrative — explore the data, build something simple, probe its weaknesses, critique it methodologically, then translate the analysis for a non-technical audience. That final pitch is not decorative. For a communication audience, the ability to explain a data-driven decision honestly to clients and creative colleagues — including what the data and the model cannot do — is the core deliverable of this module.",
  },
  {
    id: 'why-this-concept-works',
    part: 'teaching',
    presenterTitle: 'Why This Concept Works',
    component: <Slide10WhyThisConceptWorks />,
    steps: 4,
    notes: "The concept rests on four design choices. First, Data Science framed as scientific judgment for communication, anchored in a concrete campaign case students work with all five weeks. Second, a four-part weekly self-study loop compatible with the SPARKS avatar production format, with synchronous support where students need it most. Third, two learning paths that take the heterogeneous audience seriously. Fourth, a Two-Lane assessment model that handles AI honestly, with the on-site Studio as the assessed climax. The goal is graduates who can use data without becoming naïve about it — and communicate evidence without overstating it.",
  },
  {
    id: 'xama-title',
    part: 'forschung',
    section: 'forschung-intro',
    presenterTitle: 'XAMA — Forschungskonzept',
    component: (
      <SlideTitle
        label="Forschungskonzept"
        title="XAMA"
        subtitle="Explainable and Auditable Memory for Data-Analytics Agents"
        meta="Professur Data Science"
        author="Dr. Paul-Glad Mihai, 19.06.2026, SPARKS University of Applied Sciences, Brands & Communication"
        image="/images/xama-brain.png"
        imageAlt="XAMA — Gedächtnis und Auditierbarkeit für KI-Agenten"
      />
    ),
    notes:
      'Nicht lange auf der Titelfolie bleiben. Direkt in die wissenschaftliche Linie einsteigen: XAMA — erklärbares und auditierbares Gedächtnis für Data-Analytics-Agenten. Leitmotiv: Agent → Memory → Accountability.',
  },
  {
    id: 'xama-genealogy',
    part: 'forschung',
    section: 'forschung-ausgangspunkt',
    presenterTitle: 'Genealogie / Publikationsbrücke',
    component: <Slide12Genealogy />,
    steps: 5,
    notes:
      'Meine Forschung liegt an der Schnittstelle von angewandter KI, heterogenen Daten und Erklärbarkeit — etwa die multimodale Alzheimer-/FTD-Arbeit, die sichtbar macht, welche Datenmodalitäten eine Entscheidung prägen. XAMA führt diese Linie weiter: Nicht nur das Modell, auch die Erinnerungsstrukturen müssen erklärbar sein. Die Idee vom Gedächtnis ist alt — Soar, Tulving —, und moderne KI-Agenten bekommen nun persistente Gedächtnissysteme. Daraus entsteht die neue angewandte Frage: Wie kontrollieren, erklären und auditieren wir dieses Gedächtnis, wenn es reale Entscheidungen beeinflusst? (Folie 1 ist keine CV-Folie — die Publikation ist nur Glaubwürdigkeitsbrücke.)',
  },
  {
    id: 'xama-leitfall',
    part: 'forschung',
    section: 'forschung-ausgangspunkt',
    presenterTitle: 'Leitfall: Data-Analytics-Agent',
    component: <Slide13Leitfall />,
    steps: 4,
    notes:
      'Stellen Sie sich einen Data-Analytics-Agenten in einer Agentur oder Marketingabteilung vor: Er analysiert Kampagnendaten, lernt aus A/B-Tests, speichert Zielgruppen- und Performance-Erkenntnisse und unterstützt die nächste Budget- oder Messaging-Entscheidung. Hier wird Memory kritisch — der Agent empfiehlt nicht nur auf Basis des Prompts, sondern auf Basis dessen, woran er sich erinnert. Die zentrale These: Agent Memory ist in datengetriebenen Kommunikationsprozessen keine Komfortfunktion, sondern eine zweite Entscheidungsebene. XAMA macht diese Ebene erklärbar und auditierbar.',
  },
  {
    id: 'xama-pillars',
    part: 'forschung',
    section: 'forschung-programm',
    presenterTitle: 'Drei Säulen',
    component: <Slide14ThreePillars />,
    steps: 4,
    notes:
      'XAMA besteht aus drei gleich starken Säulen. Erstens Explainable Memory Retrieval: Warum erinnert sich der Agent an genau diese Kampagnenerfahrung? — Attribution, graphbasierte Erklärungen, Retrieval-Scoring. Zweitens Responsible Memory Lifecycle: Was darf der Agent speichern, konsolidieren, überschreiben, vergessen? — Write-Gating, Validierung, Poisoning-Abwehr, technische Löschbarkeit. Drittens Evaluation & Benchmarking: Bestehende Systeme werden auf Abrufleistung geprüft, aber nicht auf Stabilität, Vollständigkeit und Auditierbarkeit der Erklärungen — dafür soll XAMA-Bench entstehen. Leitbegriff ist Accountability. (Keine Methoden-Enzyklopädie — Cluster nur kurz nennen.)',
  },
  {
    id: 'xama-research-questions',
    part: 'forschung',
    section: 'forschung-programm',
    presenterTitle: 'Technische Forschungsfragen',
    component: <Slide15ResearchQuestions />,
    steps: 3,
    notes:
      'Die drei Säulen werden über drei technische Fragen konkret. FF1: Lassen sich Shapley- und graphbasierte Attribution auf Multi-Turn Agent Memory übertragen, ohne nachträglich plausibel klingende Begründungen zu erzeugen? Im Leitfall: Welche Kampagnen oder A/B-Tests haben die Empfehlung wirklich beeinflusst? FF2: Wie müssen Write-Gating, Validierung und Forgetting gestaltet sein, damit verzerrte Annahmen, temporäre Effekte oder fehlerhafte Messungen nicht langfristig weiterwirken? FF3: Welche Metriken machen Faithfulness, Logging-Vollständigkeit, Erklärungsstabilität und Forgetting Correctness messbar? Jede Frage führt zum Data-Analytics-Agenten zurück.',
  },
  {
    id: 'xama-fit',
    part: 'forschung',
    section: 'forschung-umsetzung',
    presenterTitle: 'Fit zur Professur Data Science',
    component: <Slide16ProfessurFit />,
    steps: 4,
    notes:
      'Für die Professur Data Science ist XAMA ein klarer Forschungsanker. Fachlich: Data-Analytics-Agenten arbeiten genau mit den prozessgenerierten Daten des Kommunikationsumfelds — Kampagnenmetriken, Zielgruppenreaktionen, Entscheidungslogs. Methodisch: Datenqualität, Explainable AI, Evaluation, Audit Trails, agentische Systeme. Lehr-Forschung unmittelbar: Studierende bauen solche Agenten, evaluieren Retrieval, untersuchen Bias-Propagation, testen XAMA-Bench. Drittmittel projektförmig gedacht: Ein Praxispartner bringt einen realen Agenten oder Datensatz ein. Der EU AI Act macht Logging, Transparenz und Aufsicht zusätzlich relevant — das Hauptargument ist aber breiter: Accountability, weil diese Agenten datenbasierte Entscheidungen in Organisationen beeinflussen. (Sparks-Fit zeigen, XAMA nicht für die ganze Hochschule überverkaufen.)',
  },
  {
    id: 'xama-roadmap',
    part: 'forschung',
    section: 'forschung-umsetzung',
    presenterTitle: 'Erste 12 Monate',
    component: <Slide17TwelveMonths />,
    steps: 5,
    notes:
      'In den ersten zwölf Monaten in vier Schritten. Monat 1–3: den Leitfall präzisieren — welche Daten, was wird gespeichert, wann abgerufen, wo entstehen Accountability-Risiken; Baseline wählen, Praxispartner identifizieren. Monat 4–6: ein Prototyp für Explainable Memory Retrieval, der dokumentiert, welche gespeicherten Erfahrungen an einer Empfehlung beteiligt waren. Monat 7–9: XAMA-Bench v0.1 mit Metriken für Faithfulness, Logging und Erklärungsstabilität — gut in studentische Projekt- und Abschlussarbeiten integrierbar. Monat 10–12: Transfer und Publikation — Workshop-Paper, Drittmittel-Skizze, Integration in die Lehre. Schlussbotschaft: XAMA macht sichtbar, wie Data-Analytics-Agenten erinnern — und wie diese Erinnerungen erklärbar, auditierbar und verantwortbar werden. (Umsetzungsreif wirken, nicht überambitioniert.)',
  },
];

/* ------------------------------------------------------------------ */
/*  Sections for sidebar navigation                                    */
/* ------------------------------------------------------------------ */

const NAV = [
  {
    id: 'teaching',
    label: 'Teaching Concept',
    headerTarget: 1,
    sections: [
      {
        id: 'positioning',
        label: 'Positioning',
        slides: [
          { id: 'module-at-a-glance', label: 'Module at a Glance', number: 2 },
          { id: 'what-ds-means-here', label: 'What DS Means Here', number: 3 },
          { id: 'competency-clusters', label: 'Competency Clusters', number: 4 },
        ],
      },
      {
        id: 'didactic-design',
        label: 'Didactic Design',
        slides: [
          { id: 'five-week-roadmap', label: 'Five-Week Roadmap', number: 5 },
          { id: 'self-study-architecture', label: 'Self-Study Architecture', number: 6 },
          { id: 'two-learning-paths', label: 'Two Learning Paths', number: 7 },
        ],
      },
      {
        id: 'assessment',
        label: 'Assessment',
        slides: [
          { id: 'assessment-concept', label: 'Assessment Concept', number: 8 },
          { id: 'data-science-studio', label: 'Data Science Studio', number: 9 },
        ],
      },
    ],
  },
  {
    id: 'forschung',
    label: 'Forschungskonzept',
    headerTarget: 11,
    sections: [
      {
        id: 'forschung-ausgangspunkt',
        label: 'Ausgangspunkt',
        slides: [
          { id: 'xama-genealogy', label: 'Genealogie', number: 12 },
          { id: 'xama-leitfall', label: 'Leitfall', number: 13 },
        ],
      },
      {
        id: 'forschung-programm',
        label: 'Forschungsprogramm',
        slides: [
          { id: 'xama-pillars', label: 'Drei Säulen', number: 14 },
          { id: 'xama-research-questions', label: 'Forschungsfragen', number: 15 },
        ],
      },
      {
        id: 'forschung-umsetzung',
        label: 'Umsetzung',
        slides: [
          { id: 'xama-fit', label: 'Fit zur Professur', number: 16 },
          { id: 'xama-roadmap', label: 'Erste 12 Monate', number: 17 },
        ],
      },
    ],
  },
];

const PART_LABELS: Record<string, string> = {
  teaching: 'Teaching Concept',
  forschung: 'Forschungskonzept',
};

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const { state, navigateTo } = useSyncedNavigation(SLIDES);
  const { index: currentIndex, step: currentStep } = state;

  const isPrint = window.location.search.includes('print');
  const showNotes = window.location.search.includes('notes');
  const isPresenter = window.location.search.includes('presenter');

  const currentSlide = SLIDES[currentIndex];
  const showSidebar = !!currentSlide.section;

  const variants = getTransitionVariants(state.transitionType, state.transitionDirection);

  if (isPresenter) {
    return (
      <PresenterLayout
        slides={SLIDES}
        currentIndex={currentIndex}
        currentStep={currentStep}
      />
    );
  }

  /* Print mode */
  if (isPrint) {
    return (
      <div className="print-mode bg-background">
        {SLIDES.map((slide, i) => (
          <React.Fragment key={slide.id}>
            <div className="print-slide-container">
              <PresentationLayout
                currentSlide={i + 1}
                totalSlides={SLIDES.length}
                showSidebar={false}
                parts={[]}
              >
                {slide.component}
              </PresentationLayout>
            </div>
            {showNotes && slide.notes && (
              <div className="print-notes-container px-24 py-8 border-b border-surface-container-high">
                <div className="font-mono text-xs text-action-orange tracking-[0.15em] uppercase mb-2">
                  Speaker Notes
                </div>
                <p className="font-body text-sm text-deep-onyx leading-relaxed whitespace-pre-wrap">
                  {slide.notes}
                </p>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  /* Interactive mode */
  return (
    <PresentationLayout
      currentSlide={currentIndex + 1}
      totalSlides={SLIDES.length}
      showSidebar={showSidebar}
      onNavigate={(num) => navigateTo(num - 1, 'sidebar')}
      parts={NAV}
      partLabel={PART_LABELS[currentSlide.part]}
    >
      <ShimmerOverlay trigger={state.shimmerTrigger} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          data-shimmer-slide
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ duration: state.transitionType === 'shimmer' ? 0.7 : 0.3, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          <SlideStepContext.Provider value={currentStep}>
            {currentSlide.component}
          </SlideStepContext.Provider>
        </motion.div>
      </AnimatePresence>
    </PresentationLayout>
  );
}
