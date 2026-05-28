import React from 'react';
import { SlideStepContext } from '../App';

interface PresenterSlide {
  id: string;
  presenterTitle: string;
  notes?: string;
  steps?: number;
  component: React.ReactNode;
}

interface PresenterLayoutProps {
  slides: PresenterSlide[];
  currentIndex: number;
  currentStep: number;
}

/** Renders a slide component scaled into a fixed 16:9 thumbnail. */
const Thumbnail: React.FC<{ node: React.ReactNode; step: number; scale?: number }> = ({
  node,
  step,
  scale = 0.25,
}) => (
  <div
    className="relative overflow-hidden rounded-lg border border-surface-container-high bg-background shrink-0"
    style={{ width: 1280 * scale, height: 720 * scale }}
  >
    <div className="origin-top-left" style={{ width: 1280, height: 720, transform: `scale(${scale})` }}>
      <SlideStepContext.Provider value={step}>{node}</SlideStepContext.Provider>
    </div>
  </div>
);

export const PresenterLayout: React.FC<PresenterLayoutProps> = ({
  slides,
  currentIndex,
  currentStep,
}) => {
  const current = slides[currentIndex];
  const next = slides[currentIndex + 1];
  const maxStep = (current.steps ?? 1) - 1;

  return (
    <div className="w-full h-screen bg-deep-onyx text-white flex flex-col overflow-hidden">
      <header className="flex justify-between items-center px-10 h-14 border-b border-white/10 shrink-0">
        <span className="font-headline font-extrabold tracking-tighter">Presenter View</span>
        <span className="font-mono text-xs tracking-widest uppercase text-white/60">
          Slide {currentIndex + 1} / {slides.length}
          {current.steps ? ` · step ${currentStep + 1} / ${current.steps}` : ''}
        </span>
      </header>

      <div className="flex-grow flex gap-8 px-10 py-8 overflow-hidden">
        {/* Notes */}
        <section className="flex-grow flex flex-col gap-3 overflow-hidden">
          <div className="font-mono text-sm text-action-orange tracking-[0.15em] uppercase">
            Speaker Notes — {current.presenterTitle}
          </div>
          <p className="font-body text-3xl leading-relaxed text-white/90 overflow-y-auto pr-4 whitespace-pre-wrap">
            {current.notes ?? 'No notes for this slide.'}
          </p>
          {currentStep < maxStep && (
            <div className="font-mono text-xs text-white/40 tracking-wider uppercase mt-auto">
              {maxStep - currentStep} more reveal{maxStep - currentStep > 1 ? 's' : ''} on this slide
            </div>
          )}
        </section>

        {/* Thumbnails */}
        <aside className="flex flex-col gap-6 shrink-0">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[0.6rem] text-white/40 tracking-[0.15em] uppercase">
              Current
            </span>
            <Thumbnail node={current.component} step={currentStep} scale={0.44} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[0.6rem] text-white/40 tracking-[0.15em] uppercase">
              Next{next ? ` — ${next.presenterTitle}` : ''}
            </span>
            {next ? (
              <Thumbnail node={next.component} step={Infinity} />
            ) : (
              <div
                className="flex items-center justify-center rounded-lg border border-white/10 text-white/30 font-mono text-xs uppercase tracking-wider"
                style={{ width: 320, height: 180 }}
              >
                End of deck
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
