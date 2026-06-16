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
  /** Hidden slides are reachable only via explicit navigation (e.g. a button), never via arrow keys. */
  hidden?: boolean;
  /** Index of the slide arrow keys return to when leaving a hidden slide. */
  parent?: number;
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
      const isForward = e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown';
      const isBackward = e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp';
      if (!isForward && !isBackward) return;

      const current = slides[state.index];
      if (current?.hidden) {
        navigateTo(current.parent ?? 0, 'keys');
        return;
      }

      const maxStep = (current?.steps ?? 1) - 1;
      if (isForward) {
        if (state.step < maxStep) {
          setState((s) => ({ ...s, step: s.step + 1 }));
        } else if (!slides[state.index + 1]?.hidden) {
          navigateTo(state.index + 1, 'keys');
        }
      } else {
        if (state.step > 0) {
          setState((s) => ({ ...s, step: s.step - 1 }));
        } else if (!slides[state.index - 1]?.hidden) {
          navigateTo(state.index - 1, 'keys');
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.index, state.step, slides, navigateTo]);

  return { state, navigateTo };
}
