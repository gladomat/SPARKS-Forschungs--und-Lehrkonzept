import React, { createContext, useCallback } from 'react';
import { PresentationLayout } from './components/PresentationLayout';
import { PresenterLayout } from './components/PresenterLayout';
import { ShimmerOverlay } from './components/ShimmerOverlay';
import { SlideTitle } from './components/SlideTitle';
import { Slide02PositionInCurriculum } from './slides/Slide02PositionInCurriculum';
import { Slide03CoreThesis } from './slides/Slide03CoreThesis';
import { Slide04RunningCase } from './slides/Slide04RunningCase';
import { Slide04DetailMethods } from './slides/Slide04DetailMethods';
import { Slide05FiveWeekRoadmap } from './slides/Slide05FiveWeekRoadmap';
import { Slide06SelfStudyArchitecture } from './slides/Slide06SelfStudyArchitecture';
import { Slide07TwoLearningPaths } from './slides/Slide07TwoLearningPaths';
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
export const SlideNavContext = createContext<(id: string) => void>(() => {});

interface SlideDefinition {
  id: string;
  part: 'teaching' | 'forschung';
  section?: string;
  component: React.ReactNode;
  notes?: string;
  steps?: number;
  presenterTitle: string;
  /** Reachable only via an explicit button, not via arrow keys or the sidebar. */
  hidden?: boolean;
  /** Index of the slide this hidden slide belongs to (used for sidebar highlight + arrow-key return). */
  parent?: number;
}

export const SLIDES: SlideDefinition[] = [
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
      'Ich möchte Ihnen mein Forschungskonzept vorstellen. XAMA: Explainable and Auditable Memory for Data Analystics Agents. Hier geht es also um das Gedächtnis eines KI-Agenten.',
  },
  {
    id: 'xama-genealogy',
    part: 'forschung',
    section: 'forschung-ausgangspunkt',
    presenterTitle: 'Genealogie / Publikationsbrücke',
    component: <Slide12Genealogy />,
    steps: 5,
    notes:
      'Meine Forschung liegt an der Schnittstelle von angewandter KI, heterogenen Daten und Erklärbarkeit — etwa die multimodale Demenz-Forschungsarbeit, die sichtbar macht, welche Datenmodalitäten eine Entscheidung prägen.\n XAMA führt diese Linie weiter: Nicht nur das Modell, auch die Erinnerungsstrukturen eines Agenten müssen erklärbar sein. \n Die Idee vom Gedächtnis ist alt, wie zB dass, intelligentes Handeln ein Gedächtnis braucht oder die Wichtigkeit des episodischen Gedächtnisses. und moderne KI-Agenten bekommen nun persistente Gedächtnissysteme. \n Daraus entsteht die neue Frage: Wie kontrollieren, erklären und auditieren wir dieses Gedächtnis, wenn es reale Entscheidungen beeinflusst?',
  },
  {
    id: 'xama-leitfall',
    part: 'forschung',
    section: 'forschung-ausgangspunkt',
    presenterTitle: 'Leitfall: Data-Analytics-Agent',
    component: <Slide13Leitfall />,
    steps: 4,
    notes:
      'Stellen Sie sich einen Data-Analytics-Agenten in einer Agentur oder Marketingabteilung vor:\n- Er analysiert Kampagnendaten, lernt aus A/B-Tests,\n- speichert Zielgruppen- und Performance-Erkenntnisse und unterstützt die nächste Budget- oder Messaging-Entscheidung. Hier wird Memory kritisch \n— der Agent empfiehlt nicht nur auf Basis des Prompts, sondern auf Basis dessen, woran er sich erinnert. \n- Die zentrale These lautet: Agent Memory ist in datengetriebenen Kommunikationsprozessen keine Komfortfunktion, sondern eine zweite Entscheidungsebene. XAMA macht diese Ebene erklärbar und auditierbar.',
  },
  {
    id: 'xama-pillars',
    part: 'forschung',
    section: 'forschung-programm',
    presenterTitle: 'Drei Säulen',
    component: <Slide14ThreePillars />,
    steps: 4,
    notes:
      'XAMA besteht aus drei gleich starken Säulen. \nErstens Explainable Memory Retrieval: Warum erinnert sich der Agent an genau diese Kampagnenerfahrung? — Attribution, graphbasierte Erklärungen, Retrieval-Scoring. \n Zweitens Responsible Memory Lifecycle: Was darf der Agent speichern, konsolidieren, überschreiben, vergessen? — Write-Gating (Write-Gating ist ein Kontrollmechanismus, der entscheidet, ob ein Agent etwas in sein Langzeitgedächtnis schreiben darf — bevor es passiert. Wie ein Türsteher für den Memory-Store.), Validierung, Poisoning-Abwehr, technische Löschbarkeit. \n Drittens Evaluation & Benchmarking: Bestehende Systeme werden auf Abrufleistung geprüft, aber nicht auf Stabilität, Vollständigkeit und Auditierbarkeit der Erklärungen — dafür soll XAMA-Bench entstehen. Leitbegriff ist Accountability.',
  },
  {
    id: 'xama-research-questions',
    part: 'forschung',
    section: 'forschung-programm',
    presenterTitle: 'Technische Forschungsfragen',
    component: <Slide15ResearchQuestions />,
    steps: 3,
    notes:
      'Die drei Säulen werden über drei technische Fragen konkret. FF1: Lassen sich Shapley- und graphbasierte Attribution auf Multi-Turn Agent Memory übertragen, ohne nachträglich plausibel klingende Begründungen zu erzeugen? Im Leitfall: Welche Kampagnen oder A/B-Tests haben die Empfehlung wirklich beeinflusst? \n FF2: Wie müssen Write-Gating, Validierung und Forgetting gestaltet sein, damit verzerrte Annahmen, temporäre Effekte oder fehlerhafte Messungen nicht langfristig weiterwirken? \n FF3: Welche Metriken machen Faithfulness, Logging-Vollständigkeit, Erklärungsstabilität und Forgetting Correctness messbar? Jede Frage führt zum Data-Analytics-Agenten zurück.',
  },
  {
    id: 'xama-fit',
    part: 'forschung',
    section: 'forschung-umsetzung',
    presenterTitle: 'Fit zur Professur Data Science',
    component: <Slide16ProfessurFit />,
    steps: 4,
    notes:
      'Für die Professur Data Science ist XAMA ein klarer Forschungsanker. \n- Fachlich: Data-Analytics-Agenten arbeiten genau mit den prozessgenerierten Daten des Kommunikationsumfelds — Kampagnenmetriken, Zielgruppenreaktionen, Entscheidungslogs. \n- Methodisch: Datenqualität, Explainable AI, Evaluation, Audit Trails, agentische Systeme. \n- Lehr-Forschung unmittelbar: Studierende bauen solche Agenten, evaluieren Retrieval, untersuchen Bias-Propagation, testen XAMA-Bench. \n- Transfer + Drittmittel projektförmig gedacht: Ein Praxispartner bringt einen realen Agenten oder Datensatz ein. Der EU AI Act macht Logging, Transparenz und Aufsicht zusätzlich relevant — das Hauptargument ist aber breiter: Accountability, weil diese Agenten datenbasierte Entscheidungen in Organisationen beeinflussen.',
  },
  {
    id: 'xama-roadmap',
    part: 'forschung',
    section: 'forschung-umsetzung',
    presenterTitle: 'Erste 12 Monate',
    component: <Slide17TwelveMonths />,
    steps: 5,
    notes:
      'In den ersten zwölf Monaten in vier Schritten. \n Monat 1–3: den Leitfall präzisieren — welche Daten, was wird gespeichert, wann abgerufen, wo entstehen Accountability-Risiken; Baseline wählen, Praxispartner identifizieren. \n Monat 4–6: ein Prototyp für Explainable Memory Retrieval, der dokumentiert, welche gespeicherten Erfahrungen an einer Empfehlung beteiligt waren. \n Monat 7–9: XAMA-Bench v0.1 mit Metriken für Faithfulness, Logging und Erklärungsstabilität — gut in studentische Projekt- und Abschlussarbeiten integrierbar. \n Monat 10–12: Transfer und Publikation — Workshop-Paper, Drittmittel-Skizze, Integration in die Lehre. Schlussbotschaft: XAMA macht sichtbar, wie Data-Analytics-Agenten erinnern — und wie diese Erinnerungen erklärbar, auditierbar und verantwortbar werden. \n\n HAW-ForschungsPraxis (BMBF), ZIM (Das Zentrale Innovationsprogramm Mittelstand)',
  },
  {
    id: 'title',
    part: 'teaching',
    presenterTitle: 'Title',
    component: (
      <SlideTitle
        label="Module Concept: Data Science"
        title="Data Science"
        subtitle="From Media Data to Decisions — An Applied Data Science Workflow"
        meta="MIND module · Copy & Story · Media & Data · Design & Arts · 5th semester · 6 ECTS · 5 weeks"
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
    notes: 'Data Science is a MIND module taken by all three Bachelor programmes in Semester 5 — Copy & Story, Media & Data, and Design & Arts. They do not arrive empty-handed and they do not arrive identical. Every student shares a foundation: Scientific Methods for research questions and validity, Artificial Intelligence for algorithmic systems context, Coding & Prompting for notebooks and computational literacy, and Marketing Technologies for the data infrastructure of the field. What differs is the craft each programme brings — ranging over editorial judgement, data analystics, and visual and spatial thinking. Data Science is the convergence point: the shared spine plus each programme\'s craft integrate into one defensible, data-driven decision. This is also the bridge to the Practice Project and Bachelor Thesis that follow in Semesters 6 and 7. This is a cross-programme module, and later on I will show how I calibrate tool depth so a copywriter and a data analyst both succeed.',
  },
  {
    id: 'core-thesis',
    part: 'teaching',
    section: 'positioning',
    presenterTitle: 'Core Thesis',
    component: <Slide03CoreThesis />,
    steps: 5,
    notes: 'This is the thesis the whole module hangs on: Data Science is the workflow that turns media data into defensible decisions, the disciplined path from a business question to a data backed recommendation you can stand behind. By semester five every student already shares a foundation in AI and Coding & Prompting, and each programme brings its own craft on top — analytics, copy, or design. Data Science is where those strands integrate into one applied workflow. The driving question keeps the module honest: which media or marketing decision is actually justified by this data — and, just as important, which is not. The graduate we are aiming for is a communication professional, across data, copy, and design, who can run the workflow, weigh uncertainty and bias, and translate findings into a recommendation they can defend.',
  },
  {
    id: 'running-case',
    part: 'teaching',
    section: 'positioning',
    presenterTitle: 'Running Case & Workflow',
    component: <Slide04RunningCase />,
    steps: 3,
    notes: 'Students move through the full data-science cycle over the five weeks, always on the same running case — each week deepens one stage of the pipeline, in step with the Five-Week Roadmap. The pipeline — Question, Data, Cleaning, EDA, Statistics, Modelling, Evaluation, Interpretation, Recommendation — is the backbone of the module. The campaign dataset includes audience segments, creative variants, impressions/clicks/conversions, engagement metrics, channel information, and a recommendation or targeting component. It can be swapped each semester without restructuring the module.',
  },
  {
    id: 'two-learning-paths',
    part: 'teaching',
    section: 'didactic-design',
    presenterTitle: 'Two Learning Paths',
    component: <Slide07TwoLearningPaths />,
    steps: 3,
    notes: 'Here is how a copywriter and a data analyst both succeed in the same module. Because the cohort is genuinely mixed, the module runs two learning paths over one shared backbone. The Communication & Design path — Copy & Story and Design & Arts — works low-code and browser-based, AI-assisted, and focuses on interpreting, critiquing, visualizing, and explaining the evidence. The Media path — Media & Data and anyone quantitatively inclined — works in notebooks and the Python ecosystem and goes deeper: reproduce, extend, model, validate. Crucially, the paths are not two different courses. Same dataset, same research question, same evidence standards, same competencies — different tool depth, identical cognitive standard. A student is assessed on the quality of their reasoning and the defensibility of their decision, not on how much code they wrote. This is what makes a Data Science module honest for students who have never programmed.',
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
    notes: 'Because 130 of 150 hours are self-study, this phase must be carefully designed. The four-part loop, repeated weekly, gives students a predictable rhythm. The microlearning format is compatible with the SPARKS avatar production format — short, scriptable, modular units that can be updated each semester without rebuilding the course. Every week produces something concrete: a data audit, an EDA notebook, a statistical brief, a model evaluation, a final data story. The weekly checkpoint is mastery-oriented: the deliverable is not a one-shot test but a submit–feedback–revise loop students can repeat until they get it right — the goal stays fixed, the number of attempts varies. Feedback scales in three tiers: automated quizzes and flash cards give instant feedback, AI-assisted iteration on artifacts is allowed and documented, and peer review plus the live sessions handle what automation cannot judge. The model behind this is Flipped Classroom 2.0: foundations move into the asynchronous phase, but unlike the classic flipped classroom, the async phase is itself an active-learning loop — input, guided practice, applied task, checkpoint — not passive video-watching. Synchronous time is then reserved for the higher levels of Bloom’s taxonomy: applying, evaluating, defending. Karadeniz et al. (2025) validated this progression and found it particularly effective for students who work alongside their studies. The synchronous time is concentrated where students need it most — statistics in Week 3 gets two live sessions instead of one, to allow for more help for the mixed cohort on this harder subject.',
  },
  {
    id: 'data-science-studio',
    part: 'teaching',
    section: 'didactic-design',
    presenterTitle: 'The Data Science Studio',
    component: <Slide09DataScienceStudio />,
    steps: 3,
    notes: 'Sixteen hours on-site is precious. I use them for what asynchronous formats and AI avatars cannot do: collaborative model evaluation with real-time methodological critique, peer review, and judgment discussions that only work face-to-face. By Week 4, students have framed the problem, explored the data, and worked through statistical reasoning — the on-site phase is where they integrate everything into a defended workflow. Day 2 closes with a live presentation of the recommendation to a non-technical audience — the final stage of the Analyze → Model → Critique → Defend arc. How is everything assessed?',
  },
  {
    id: 'assessment-concept',
    part: 'teaching',
    section: 'assessment',
    presenterTitle: 'Assessment Concept',
    component: <Slide08AssessmentConcept />,
    steps: 8,
    notes: 'How is competence assured when students have free access to AI? The dual-lane approach follows Fawns et al. (2025): AI is allowed where professional judgment is assessed, restricted where personal competence must be verified. Four artefacts trace the weekly arc — Week 2 data audit + EDA notebook, Week 3 statistical reasoning brief, Week 4 live defense, Week 5 final data story. The live defense is the assured instrument you just saw at the close of the Studio: in-person, unaided, students answer methodological questions from a non-technical audience and own the limits of their analysis. The other three submissions are digital and may use AI — but AI use must be documented and reflected on. This is not an AI-ban policy; it is an AI-honest one.',
  },
  {
    id: 'why-this-works',
    part: 'teaching',
    presenterTitle: 'Why This Works',
    component: <Slide10WhyThisWorks />,
    steps: 5,
    notes: 'To close: this concept is designed for all three Bachelor programmes that meet in this MIND module — Copy & Story, Media & Data, and Design & Arts. It is data-science-heavy enough to match the curriculum — students do the full workflow from question through analysis to recommendation — but it stays anchored in media and communication practice, and the two learning paths let a copywriter and a data analyst succeed on the same cognitive standard. The on-site Studio is the didactic climax. The two-lane assessment handles AI honestly. The curricular integration across the bachelor is explicit. Students leave able to defend evidence-based recommendations under uncertainty — the competence they need for the Practice Project, the Bachelor Thesis, and professional work in media, communication, and digital marketing.',
  },
  {
    id: 'methods-detail',
    part: 'teaching',
    section: 'positioning',
    hidden: true,
    parent: 10, // running-case
    presenterTitle: 'Detail: Methods & Models',
    component: <Slide04DetailMethods />,
    notes:
      'Three blocks, oriented on the standard intro-DS canon. Week 3 statistics: descriptive stats and distributions, correlation vs. confounding, hypothesis testing / A/B tests, confidence intervals and effect size. Week 4 ML: supervised — linear and logistic regression, decision trees and random forests (deliberately interpretable models with feature importance, not black boxes); unsupervised — k-means for audience segmentation, PCA for dimensionality reduction. Evaluation: train/test split, baselines, confusion matrix, precision/recall, ROC/AUC, overfitting. Tools differ per learning path: Python/pandas/scikit-learn/Jupyter for Media & Data, browser-based low-code for Story & Design. Deep learning, transfer learning, reinforcement learning are named and contextualized but not trained hands-on — honest scope for a 5-week intro module with a mixed cohort.',
  },
]

/* ------------------------------------------------------------------ */
/*  Sections for sidebar navigation                                    */
/* ------------------------------------------------------------------ */

const NAV = [
  {
    id: 'forschung',
    label: 'Forschungskonzept',
    headerTarget: 1,
    sections: [
      {
        id: 'forschung-ausgangspunkt',
        label: 'Ausgangspunkt',
        slides: [
          { id: 'xama-genealogy', label: 'Genealogie', number: 2 },
          { id: 'xama-leitfall', label: 'Leitfall', number: 3 },
        ],
      },
      {
        id: 'forschung-programm',
        label: 'Forschungsprogramm',
        slides: [
          { id: 'xama-pillars', label: 'Drei Säulen', number: 4 },
          { id: 'xama-research-questions', label: 'Forschungsfragen', number: 5 },
        ],
      },
      {
        id: 'forschung-umsetzung',
        label: 'Umsetzung',
        slides: [
          { id: 'xama-fit', label: 'Fit zur Professur', number: 6 },
          { id: 'xama-roadmap', label: 'Erste 12 Monate', number: 7 },
        ],
      },
    ],
  },
  {
    id: 'teaching',
    label: 'Teaching Concept',
    headerTarget: 8,
    sections: [
      {
        id: 'positioning',
        label: 'Positioning',
        slides: [
          { id: 'position-in-curriculum', label: 'Curriculum Position', number: 9 },
          { id: 'core-thesis', label: 'Core Thesis', number: 10 },
          { id: 'running-case', label: 'Running Case & Workflow', number: 11 },
        ],
      },
      {
        id: 'didactic-design',
        label: 'Didactic Design',
        slides: [
          { id: 'two-learning-paths', label: 'Two Learning Paths', number: 12 },
          { id: 'five-week-roadmap', label: 'Five-Week Roadmap', number: 13 },
          { id: 'self-study-architecture', label: 'Self-Study Architecture', number: 14 },
          { id: 'data-science-studio', label: 'Data Science Studio', number: 15 },
        ],
      },
      {
        id: 'assessment',
        label: 'Assessment',
        slides: [
          { id: 'assessment-concept', label: 'Assessment Concept', number: 16 },
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

  const goToSlide = useCallback(
    (id: string) => {
      const i = SLIDES.findIndex((s) => s.id === id);
      if (i !== -1) navigateTo(i, 'keys');
    },
    [navigateTo],
  );

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
  // Hidden slides report their parent's number so the sidebar keeps the
  // parent highlighted and its section open for navigating back.
  const displayedNumber =
    currentSlide.hidden && currentSlide.parent !== undefined
      ? currentSlide.parent + 1
      : currentIndex + 1;

  return (
    <SlideNavContext.Provider value={goToSlide}>
      <PresentationLayout
        currentSlide={displayedNumber}
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
    </SlideNavContext.Provider>
  );
}
