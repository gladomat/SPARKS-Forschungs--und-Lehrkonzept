import React, { createContext } from 'react';
import { PresentationLayout } from './components/PresentationLayout';
import { PresenterLayout } from './components/PresenterLayout';
import { ShimmerOverlay } from './components/ShimmerOverlay';
import { SlideTitle } from './components/SlideTitle';
import { Slide02PositionInCurriculum } from './slides/Slide02PositionInCurriculum';
import { Slide03CoreThesis } from './slides/Slide03CoreThesis';
import { Slide04RunningCase } from './slides/Slide04RunningCase';
import { Slide05FiveWeekRoadmap } from './slides/Slide05FiveWeekRoadmap';
import { Slide06SelfStudyArchitecture } from './slides/Slide06SelfStudyArchitecture';
import { Slide08AssessmentConcept } from './slides/Slide08AssessmentConcept';
import { Slide09DataScienceStudio } from './slides/Slide09DataScienceStudio';
import { Slide10WhyThisWorks } from './slides/Slide10WhyThisWorks';
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
        subtitle="From Media Data to Decisions — An Applied Data Science Workflow"
        meta="MIND module · Media & Data Bachelor · 5th semester · 6 ECTS · 5 weeks"
        author="Dr. Paul-Glad Mihai, 19.06.2026, Professur Data Science – SPARKS University of Applied Sciences, Brands & Communication"
        image="/images/image-slide1.png"
        imageAlt="Data Science visualization"
      />
    ),
  },
  {
    id: 'position-in-curriculum',
    part: 'teaching',
    section: 'positioning',
    presenterTitle: 'Position in the Curriculum',
    component: <Slide02PositionInCurriculum />,
    steps: 4,
    notes: 'This module is not designed in a vacuum. Students arrive with significant foundations — they have done coding, analytics, predictive modelling, and AI work. In Semester 5 they are also working through Marketing, Marketing Technologies, Performance Metrics, and Creative Media. Data Science is positioned as the methodological integration point: how do all these strands come together to support a defensible media decision? This is also the bridge to the Practice Project and Bachelor Thesis that follow. Curricular alignment: Scientific Methods provides research questions and validity; Media & Data 1–3 provides media datasets and platform logic; AI provides algorithmic systems context; Coding & Prompting provides notebooks and workflows; Data Analytics provides EDA and dashboards; Predictive Modelling provides prediction and validation; Conversion Optimization provides experiments and causal pitfalls; Marketing Technologies provides data infrastructure; Performance Metrics provides KPI logic and measurement quality.',
  },
  {
    id: 'core-thesis',
    part: 'teaching',
    section: 'positioning',
    presenterTitle: 'Core Thesis',
    component: <Slide03CoreThesis />,
    steps: 4,
    notes: 'The running case anchors the module in concrete data work across all five weeks. Students don\'t switch datasets between modules — they live with one realistic campaign dataset and build deepening competence around it. The cycle from question to recommendation is what makes this Data Science rather than data literacy. The case can be swapped each semester without rebuilding the module.',
  },
  {
    id: 'running-case',
    part: 'teaching',
    section: 'positioning',
    presenterTitle: 'Running Case & Workflow',
    component: <Slide04RunningCase />,
    steps: 3,
    notes: 'Students move through the full data-science cycle every week on the same running case. The pipeline — Question, Data, Cleaning, EDA, Statistics, Modelling, Evaluation, Interpretation, Recommendation — is the backbone of the module. The campaign dataset includes audience segments, creative variants, impressions/clicks/conversions, engagement metrics, channel information, and a recommendation or targeting component. It can be swapped each semester without restructuring the module.',
  },
  {
    id: 'five-week-roadmap',
    part: 'teaching',
    section: 'didactic-design',
    presenterTitle: 'Five-Week Roadmap',
    component: <Slide05FiveWeekRoadmap />,
    steps: 5,
    notes: 'The weekly structure follows the logic of a real data-science project. Week 1 frames the problem and audits the data — many DS failures start before modelling, in a vague question or a wrong target variable. Week 2 is hands-on EDA, with the understanding that platform metrics already contain assumptions. Week 3 is the statistical core — when is a difference meaningful, when is causal language dangerous in media analytics. Week 4 brings simple ML workflows: train/test split, baselines, classification or clustering, model evaluation metrics, feature importance. Week 5 closes with decision communication — what the analysis supports, what it doesn\'t, how AI was used, whether the workflow is reproducible. Each week has five competency-oriented learning objectives mapped to the official module goals.',
  },
  {
    id: 'self-study-architecture',
    part: 'teaching',
    section: 'didactic-design',
    presenterTitle: 'Self-Study Architecture',
    component: <Slide06SelfStudyArchitecture />,
    steps: 5,
    notes: 'Because 130 of 150 hours are self-study, this phase must be carefully designed. The four-part loop, repeated weekly, gives students a predictable rhythm. The microlearning format is compatible with the SPARKS avatar production format — short, scriptable, modular units that can be updated each semester without rebuilding the course. Every week produces something concrete: a data audit, an EDA notebook, a statistical brief, a model evaluation, a final data story. The synchronous time is concentrated where students need it most — statistics in Week 3 gets two surgery sessions instead of one.',
  },
  {
    id: 'assessment-concept',
    part: 'teaching',
    section: 'assessment',
    presenterTitle: 'Assessment Concept',
    component: <Slide08AssessmentConcept />,
    steps: 7,
    notes: 'A Data Science module in 2026 cannot ignore that students will use AI tools. The core principle — AI where judgment is assessed, AI restricted where competence is verified — handles this honestly. Four assessments, four formats, four cognitive demands. The Week 2 data audit + EDA notebook gives early diagnostic information. The Week 3 statistical brief verifies the foundation before the on-site phase. The Week 4 live defense is the assured component — students must personally explain what they did, why it is valid, and where the limits are. The Week 5 final data story closes with professional communication. AI use is allowed in digital submissions but must be documented and reflected on.',
  },
  {
    id: 'data-science-studio',
    part: 'teaching',
    section: 'assessment',
    presenterTitle: 'The Data Science Studio',
    component: <Slide09DataScienceStudio />,
    steps: 3,
    notes: 'Sixteen hours on-site is precious. I use them for what asynchronous formats and AI avatars cannot do: collaborative model evaluation with real-time methodological critique, peer review, and judgment discussions that only work face-to-face. By Week 4, students have framed the problem, explored the data, and worked through statistical reasoning — the on-site phase is where they integrate everything into a defended workflow. The live defense at the end is the assured assessment: students must explain their own work, including its limits, under questioning from a non-technical audience.',
  },
  {
    id: 'why-this-works',
    part: 'teaching',
    presenterTitle: 'Why This Works',
    component: <Slide10WhyThisWorks />,
    steps: 5,
    notes: 'To close: this concept is designed specifically for the Media & Data Bachelor. It is data-science-heavy enough to match the curriculum — students do the full workflow from question through modelling to recommendation — but it remains anchored in media and marketing practice. The on-site Studio is the assessed climax. The two-lane assessment handles AI honestly. The curricular integration is explicit. Students leave able to defend evidence-based recommendations under uncertainty — the competence they need for the Practice Project, the Bachelor Thesis, and professional work in media analytics, planning, and digital marketing.',
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
          { id: 'position-in-curriculum', label: 'Curriculum Position', number: 2 },
          { id: 'core-thesis', label: 'Core Thesis', number: 3 },
          { id: 'running-case', label: 'Running Case & Workflow', number: 4 },
        ],
      },
      {
        id: 'didactic-design',
        label: 'Didactic Design',
        slides: [
          { id: 'five-week-roadmap', label: 'Five-Week Roadmap', number: 5 },
          { id: 'self-study-architecture', label: 'Self-Study Architecture', number: 6 },
        ],
      },
      {
        id: 'assessment',
        label: 'Assessment',
        slides: [
          { id: 'assessment-concept', label: 'Assessment Concept', number: 7 },
          { id: 'data-science-studio', label: 'Data Science Studio', number: 8 },
        ],
      },
    ],
  },
  {
    id: 'forschung',
    label: 'Forschungskonzept',
    headerTarget: 10,
    sections: [
      {
        id: 'forschung-ausgangspunkt',
        label: 'Ausgangspunkt',
        slides: [
          { id: 'xama-genealogy', label: 'Genealogie', number: 11 },
          { id: 'xama-leitfall', label: 'Leitfall', number: 12 },
        ],
      },
      {
        id: 'forschung-programm',
        label: 'Forschungsprogramm',
        slides: [
          { id: 'xama-pillars', label: 'Drei Säulen', number: 13 },
          { id: 'xama-research-questions', label: 'Forschungsfragen', number: 14 },
        ],
      },
      {
        id: 'forschung-umsetzung',
        label: 'Umsetzung',
        slides: [
          { id: 'xama-fit', label: 'Fit zur Professur', number: 15 },
          { id: 'xama-roadmap', label: 'Erste 12 Monate', number: 16 },
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
