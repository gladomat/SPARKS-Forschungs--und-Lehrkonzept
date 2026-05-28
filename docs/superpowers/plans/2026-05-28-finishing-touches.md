# SPARKS Presentation — Finishing Touches Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close out the four remaining items on the SPARKS Lehrkonzept presentation: an initial git baseline, the shimmer section-transition, presenter mode with cross-window sync, and a visual verification pass.

**Architecture:** A React 19 + Vite + Tailwind v4 + `motion/react` single-page presentation. Navigation state (slide index, sub-step, transition type) currently lives in `App.tsx` `useState` + a keydown effect. This plan extracts that state into a `useSyncedNavigation` hook backed by a `BroadcastChannel` so a second `?presenter` window can mirror and drive navigation. The shimmer is a CSS light-band overlay played on a trigger counter when crossing sections via the sidebar.

**Tech Stack:** React 19, TypeScript ~5.8, Vite 6, Tailwind v4 (`@theme` in `src/index.css`, no config file), `motion` 12 (`motion/react`), `lucide-react`, `BroadcastChannel` (browser-native).

**Testing note:** This repo has **no test framework** (no vitest/jest in `package.json`) and the work is visual/interaction-heavy. So the standard TDD loop does not apply. The verification step for every task is `npm run lint` (which runs `tsc --noEmit`) plus the manual browser checklist in Task 5. Do **not** add a test framework for this plan.

**Dev server:** `npm run dev` serves on `http://localhost:3000` (`--host=0.0.0.0`). URL params already supported: `?print` (print layout), `?notes` (adds speaker notes under each print slide). This plan adds `?presenter`.

---

## File Structure

| File | Responsibility | Change |
|---|---|---|
| `src/index.css` | Design tokens, blob + print styles | **Modify** — add `.shimmer-band` styles + keyframe |
| `src/lib/useSyncedNavigation.ts` | Owns nav state (index/step/transition/shimmer), keyboard handling, BroadcastChannel sync | **Create** |
| `src/components/ShimmerOverlay.tsx` | Renders the sweeping light band when its `trigger` prop changes | **Create** |
| `src/components/PresenterLayout.tsx` | Presenter view: speaker notes, progress, current + next slide thumbnails | **Create** |
| `src/App.tsx` | Wires the hook, the shimmer overlay, and the `?presenter` branch | **Modify** |

The existing `SlideStepContext` (exported from `App.tsx`) is reused by the presenter thumbnails. To avoid a circular import (hook ← App, App ← hook), the shared transition types move into the hook file and `App.tsx` imports them from there.

---

## Task 1: Git baseline commit

Save the current working state (scaffold + all ten slides) before adding new code, so later tasks have a clean diff to review and revert against.

**Files:**
- Verify: `.gitignore` (already present per initial `git status`)

- [ ] **Step 1: Confirm the working tree and that node_modules is ignored**

Run:
```bash
git status --short && echo "---" && git check-ignore node_modules || echo "node_modules NOT ignored"
```
Expected: a list of untracked files (`src/`, `docs/`, `index.html`, `package.json`, etc.), and `node_modules` is printed by `git check-ignore` (meaning it is ignored). If `node_modules NOT ignored` prints, open `.gitignore` and add a line `node_modules` before continuing.

- [ ] **Step 2: Confirm the project type-checks before committing**

Run:
```bash
npm run lint
```
Expected: no output, exit code 0.

- [ ] **Step 3: Stage source and config, excluding build/dependency artifacts**

Run:
```bash
git add src public index.html package.json package-lock.json tsconfig.json vite.config.ts .gitignore docs CONTEXT.md
git status --short
```
Expected: all listed files staged (`A`). Confirm `node_modules/` and `dist/` are NOT in the staged list. Do **not** stage `.superpowers/` unless the user wants it tracked — leave it untracked.

- [ ] **Step 4: Commit**

```bash
git commit -m "$(cat <<'EOF'
Initial commit: SPARKS Data Science Lehrkonzept presentation

React + Vite + Tailwind v4 presentation app with all ten content
slides, step-based progressive reveal, sidebar navigation, and
print/notes layouts.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
git log --oneline -1
```
Expected: one commit printed.

---

## Task 2: Shimmer section-transition

Replace the fade placeholder for `type === 'shimmer'` with a diagonal light band that sweeps across the screen when the user jumps to a different section via the sidebar. The slide content keeps a gentle fade; the band is an overlay driven by a trigger counter.

**Files:**
- Modify: `src/index.css` (append after the blob animations, before `@media print`)
- Create: `src/components/ShimmerOverlay.tsx`
- Modify: `src/App.tsx` (wired fully in Task 4 — this task builds the overlay in isolation)

- [ ] **Step 1: Add the shimmer band styles to `src/index.css`**

Insert immediately before the `@media print {` block (around line 93):

```css
/* Shimmer section-transition light band */
.shimmer-band {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 45%;
  transform: skewX(-12deg);
  filter: blur(6px);
  background: linear-gradient(
    105deg,
    transparent 0%,
    rgba(255, 78, 7, 0.0) 25%,
    rgba(255, 255, 255, 0.65) 50%,
    rgba(255, 78, 7, 0.18) 62%,
    transparent 100%
  );
}
```

- [ ] **Step 2: Create `src/components/ShimmerOverlay.tsx`**

```tsx
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface ShimmerOverlayProps {
  /** Increment this to play the sweep once. Initial value 0 plays nothing. */
  trigger: number;
}

export const ShimmerOverlay: React.FC<ShimmerOverlayProps> = ({ trigger }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;
    setActive(true);
    const t = setTimeout(() => setActive(false), 850);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={trigger}
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="shimmer-band"
            initial={{ x: '-160%' }}
            animate={{ x: '160%' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

- [ ] **Step 3: Type-check**

Run:
```bash
npm run lint
```
Expected: no output, exit code 0. (The component is not yet rendered — Task 4 wires it. This step only confirms it compiles.)

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/components/ShimmerOverlay.tsx
git commit -m "$(cat <<'EOF'
Add shimmer light-band overlay for section transitions

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Extract navigation into a synced hook

Move all navigation state out of `App.tsx` into `src/lib/useSyncedNavigation.ts`. The hook owns slide index, sub-step, transition type/direction, and the shimmer trigger; installs the keyboard handler; and mirrors state across windows via `BroadcastChannel`. This is the foundation presenter mode builds on, and it removes duplicated key logic between the two windows.

**Files:**
- Create: `src/lib/useSyncedNavigation.ts`
- Modify: `src/App.tsx` (replace inline state + key effect + `getTransitionVariants`/`getSectionForIndex` helpers)

- [ ] **Step 1: Create `src/lib/useSyncedNavigation.ts`**

```tsx
import { useState, useEffect, useCallback, useRef } from 'react';

export type TransitionType = 'horizontal' | 'vertical' | 'shimmer';
export type TransitionDirection = 'forward' | 'backward';

export interface NavState {
  index: number;
  step: number;
  transitionType: TransitionType;
  transitionDirection: TransitionDirection;
  shimmerTrigger: number;
}

export interface SlideMeta {
  section?: string;
  steps?: number;
}

const CHANNEL_NAME = 'sparks-presentation';

const INITIAL: NavState = {
  index: 0,
  step: 0,
  transitionType: 'horizontal',
  transitionDirection: 'forward',
  shimmerTrigger: 0,
};

export function getTransitionVariants(type: TransitionType, direction: TransitionDirection) {
  if (type === 'horizontal') {
    const xOffset = direction === 'forward' ? 300 : -300;
    return {
      initial: { opacity: 0, x: xOffset },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -xOffset },
    };
  }
  if (type === 'vertical') {
    const yOffset = direction === 'forward' ? 300 : -300;
    return {
      initial: { opacity: 0, y: yOffset },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -yOffset },
    };
  }
  // shimmer — slide fades; the sweep is handled by <ShimmerOverlay>
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
}

export function useSyncedNavigation(slides: SlideMeta[]) {
  const [state, setState] = useState<NavState>(INITIAL);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const fromRemoteRef = useRef(false);

  // Wire the channel: receive remote state, mark it so we don't echo it back.
  useEffect(() => {
    const ch = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = ch;
    ch.onmessage = (e: MessageEvent) => {
      if (e.data?.type === 'nav') {
        fromRemoteRef.current = true;
        setState(e.data.state as NavState);
      }
    };
    return () => ch.close();
  }, []);

  // Broadcast local changes only (skip echoes of received state).
  useEffect(() => {
    if (fromRemoteRef.current) {
      fromRemoteRef.current = false;
      return;
    }
    channelRef.current?.postMessage({ type: 'nav', state });
  }, [state]);

  const navigateTo = useCallback(
    (nextIndex: number, source: 'keys' | 'sidebar') => {
      setState((prev) => {
        if (nextIndex < 0 || nextIndex >= slides.length || nextIndex === prev.index) {
          return prev;
        }
        const direction: TransitionDirection = nextIndex > prev.index ? 'forward' : 'backward';
        const crossingSection = slides[prev.index]?.section !== slides[nextIndex]?.section;

        let transitionType: TransitionType;
        if (source === 'sidebar' && crossingSection) transitionType = 'shimmer';
        else if (crossingSection) transitionType = 'vertical';
        else transitionType = 'horizontal';

        const nextSlide = slides[nextIndex];
        const step = direction === 'backward' && nextSlide.steps ? nextSlide.steps - 1 : 0;

        return {
          index: nextIndex,
          step,
          transitionType,
          transitionDirection: direction,
          shimmerTrigger:
            transitionType === 'shimmer' ? prev.shimmerTrigger + 1 : prev.shimmerTrigger,
        };
      });
    },
    [slides],
  );

  // Keyboard: arrows step through sub-steps first, then move between slides.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const maxStep = (slides[state.index]?.steps ?? 1) - 1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (state.step < maxStep) {
          setState((s) => ({ ...s, step: s.step + 1 }));
        } else {
          navigateTo(state.index + 1, 'keys');
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (state.step > 0) {
          setState((s) => ({ ...s, step: s.step - 1 }));
        } else {
          navigateTo(state.index - 1, 'keys');
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.index, state.step, slides, navigateTo]);

  return { state, navigateTo };
}
```

- [ ] **Step 2: Rewrite `src/App.tsx` to consume the hook**

Replace the top imports block (lines 1–13) so `React` no longer needs `useState/useEffect/useCallback` for navigation, and the transition types come from the hook:

```tsx
import React, { createContext } from 'react';
import { PresentationLayout } from './components/PresentationLayout';
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
import { AnimatePresence, motion } from 'motion/react';
import { useSyncedNavigation, getTransitionVariants } from './lib/useSyncedNavigation';
```

Delete from `App.tsx`:
- the local `type TransitionType` / `type TransitionDirection` declarations (now imported),
- the `getSectionForIndex` helper,
- the local `getTransitionVariants` function (now imported),
- the `useState` declarations for `currentIndex`, `currentStep`, `transitionType`, `transitionDirection`,
- the `navigateTo` `useCallback`,
- the `maxStep` const and the keydown `useEffect`.

Replace the body of `export default function App()` (everything from the old `const [currentIndex...]` down to the `const variants = ...` line) with:

```tsx
  const { state, navigateTo } = useSyncedNavigation(SLIDES);
  const { index: currentIndex, step: currentStep } = state;

  const isPrint = window.location.search.includes('print');
  const showNotes = window.location.search.includes('notes');

  const currentSlide = SLIDES[currentIndex];
  const showSidebar = !!currentSlide.section;

  function navigateToSlideId(id: string) {
    const idx = SLIDES.findIndex((s) => s.id === id);
    if (idx !== -1) navigateTo(idx, 'sidebar');
  }

  const variants = getTransitionVariants(state.transitionType, state.transitionDirection);
```

Keep the existing print-mode block unchanged. In the interactive-mode `return`, add the overlay as the first child inside `PresentationLayout` (immediately before `<AnimatePresence mode="wait">`):

```tsx
      <ShimmerOverlay trigger={state.shimmerTrigger} />
```

Leave `SlideStepContext` exported exactly as before (`export const SlideStepContext = createContext(Infinity);`).

- [ ] **Step 3: Type-check**

Run:
```bash
npm run lint
```
Expected: no output, exit code 0. If you see "Cannot find name 'useState'" or similar, you left a stale reference to deleted state — remove it.

- [ ] **Step 4: Manual smoke check**

Run `npm run dev`, open `http://localhost:3000`. Verify: arrow keys step through reveals then advance slides exactly as before; clicking a sidebar item in a different section plays the shimmer sweep. (Cross-window sync is verified in Task 4/5.)

- [ ] **Step 5: Commit**

```bash
git add src/lib/useSyncedNavigation.ts src/App.tsx
git commit -m "$(cat <<'EOF'
Extract navigation into BroadcastChannel-synced hook

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Presenter mode

Add a `?presenter` window that shows the current slide's speaker notes, progress, and live thumbnails of the current and next slides. Because both windows use `useSyncedNavigation`, navigating in either window updates both. Intended use: presenter laptop shows `?presenter`; projector/extended display shows the plain URL. (`BroadcastChannel` is same-origin, same-browser — both windows must be in one browser on one machine.)

**Files:**
- Create: `src/components/PresenterLayout.tsx`
- Modify: `src/App.tsx` (add the `?presenter` branch + export a slide-label map)

- [ ] **Step 1: Export a presenter label for each slide from `App.tsx`**

The presenter "Next up" line needs a human title. Add a `presenterTitle` field to the `SlideDefinition` interface and to each slide in `SLIDES`. Update the interface:

```tsx
interface SlideDefinition {
  id: string;
  section?: string;
  component: React.ReactNode;
  notes?: string;
  steps?: number;
  presenterTitle: string;
}
```

Add `presenterTitle` to each entry (values, in slide order):
- `title` → `'Title'`
- `module-at-a-glance` → `'Module at a Glance'`
- `what-ds-means-here` → `'What Data Science Means Here'`
- `competency-clusters` → `'Competency Clusters'`
- `five-week-roadmap` → `'Five-Week Roadmap'`
- `self-study-architecture` → `'Self-Study Architecture'`
- `two-learning-paths` → `'Two Learning Paths'`
- `assessment-concept` → `'Assessment Concept'`
- `data-science-studio` → `'The Data Science Studio'`
- `why-this-concept-works` → `'Why This Concept Works'`

Export the array so the presenter layout can read titles/notes/steps:
```tsx
export const SLIDES: SlideDefinition[] = [ /* ... */ ];
```
(Add the `export` keyword to the existing `const SLIDES` declaration.)

- [ ] **Step 2: Create `src/components/PresenterLayout.tsx`**

```tsx
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

/** Renders a slide component scaled into a fixed 320x180 (16:9) thumbnail. */
const Thumbnail: React.FC<{ node: React.ReactNode; step: number }> = ({ node, step }) => (
  <div
    className="relative overflow-hidden rounded-lg border border-surface-container-high bg-background shrink-0"
    style={{ width: 320, height: 180 }}
  >
    <div className="origin-top-left" style={{ width: 1280, height: 720, transform: 'scale(0.25)' }}>
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
          <div className="font-mono text-xs text-action-orange tracking-[0.15em] uppercase">
            Speaker Notes — {current.presenterTitle}
          </div>
          <p className="font-body text-lg leading-relaxed text-white/90 overflow-y-auto pr-4 whitespace-pre-wrap">
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
            <Thumbnail node={current.component} step={currentStep} />
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
```

- [ ] **Step 3: Wire the `?presenter` branch in `App.tsx`**

Add the import near the other component imports:
```tsx
import { PresenterLayout } from './components/PresenterLayout';
```

In `App()`, after the `isPrint` / `showNotes` lines, add:
```tsx
  const isPresenter = window.location.search.includes('presenter');
```

Immediately before the `if (isPrint) {` block, add the presenter branch:
```tsx
  if (isPresenter) {
    return (
      <PresenterLayout
        slides={SLIDES}
        currentIndex={currentIndex}
        currentStep={currentStep}
      />
    );
  }
```
(The keyboard handler in the hook is active in this window too, so arrow keys here drive both windows.)

- [ ] **Step 4: Type-check**

Run:
```bash
npm run lint
```
Expected: no output, exit code 0.

- [ ] **Step 5: Manual two-window sync check**

Run `npm run dev`. Open `http://localhost:3000` in one window and `http://localhost:3000/?presenter` in a second window of the **same browser**. Verify:
- Pressing arrow keys in either window advances slides/steps in **both**.
- The presenter window shows the current slide's notes, a "step x / y" counter, and current + next thumbnails.
- The next thumbnail shows the upcoming slide fully revealed; "End of deck" appears on the last slide.

- [ ] **Step 6: Commit**

```bash
git add src/components/PresenterLayout.tsx src/App.tsx
git commit -m "$(cat <<'EOF'
Add presenter mode with cross-window navigation sync

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Visual verification pass

A single deliberate walkthrough of the whole deck in the browser, since none of slides 6–10 or the new transitions have been seen rendered. Fix any layout/animation defects found, then make a final commit if changes were needed.

**Files:** none unless defects are found.

- [ ] **Step 1: Start the dev server**

Run:
```bash
npm run dev
```
Open `http://localhost:3000`.

- [ ] **Step 2: Walk every slide and its reveals**

For each slide, press the right arrow through all sub-steps and confirm against this checklist:
- **Slide 1 (Title):** no sidebar; title/subtitle/author render.
- **Slide 2:** 3×2 card grid; icons top-right; orange thesis card; cards stagger in.
- **Slide 3:** thesis then 5 bullets reveal one per press (6 steps total).
- **Slide 4:** A→B→C cards with orange arrows; cards do **not** resize as each appears.
- **Slide 5:** weeks reveal 1→5; Week 4 has the orange border/tint.
- **Slide 6:** 2×2 loop grid reveals four cards then the Flipped Classroom 2.0 band (5 steps); cards don't resize.
- **Slide 7:** two path cards then orange shared-core band (3 steps).
- **Slide 8:** principle band → two lane cards → four record cards one by one (7 steps); the W4 record + Assured lane are orange.
- **Slide 9:** Day 1 → Day 2 → arc strip (3 steps); "Assured Lane" tag on Day 2 afternoon; arc arrows render.
- **Slide 10:** three angle columns reveal then "Thank you" (4 steps); institution column is orange.

- [ ] **Step 3: Verify transitions**

- Arrow-navigating within a section → horizontal slide.
- Arrow-navigating across a section boundary → vertical slide.
- Clicking a sidebar entry in a **different** section → shimmer light band sweeps across.
- Navigating **backward** into a stepped slide shows it fully revealed (no re-stepping).

- [ ] **Step 4: Verify print + notes layouts**

Open `http://localhost:3000/?print` and `http://localhost:3000/?print&notes`. Confirm all ten slides stack as A4-landscape pages and (with `&notes`) speaker notes appear beneath each.

- [ ] **Step 5: Fix any defects, then re-run lint**

If you changed any file:
```bash
npm run lint
```
Expected: no output, exit code 0.

- [ ] **Step 6: Final commit (only if Step 5 changed files)**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Fix layout/transition defects found in verification pass

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review

**Spec coverage** (the four points): ① initial git commit → Task 1; ② shimmer transition → Task 2 (overlay) + Task 3 (trigger wiring); ③ presenter mode → Task 3 (synced hook) + Task 4 (view + branch); ④ visual verification → Task 5. All four covered.

**Type consistency:** `NavState`, `SlideMeta`, `getTransitionVariants`, `useSyncedNavigation` defined in Task 3 Step 1 and consumed in Task 3 Step 2. `SlideStepContext` stays exported from `App.tsx` and is imported by `PresenterLayout` (Task 4) and existing slides. `presenterTitle` added to `SlideDefinition` (Task 4 Step 1) is required by `PresenterLayout`'s `PresenterSlide` shape. `SLIDES` gains an `export` in Task 4 Step 1, used by the presenter branch. The shimmer overlay's `trigger` prop (Task 2) matches `state.shimmerTrigger` produced by the hook (Task 3).

**Known constraint to flag during execution:** `BroadcastChannel` syncs only within one browser on one machine (same origin). That fits the "presenter laptop + extended-display projector" setup but will **not** sync across two separate devices. If the user later needs cross-device sync, that's a follow-up (e.g. a tiny WebSocket relay) — out of scope here.
