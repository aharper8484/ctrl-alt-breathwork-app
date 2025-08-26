import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type BreathPhase = "inhale" | "hold" | "exhale";

export type Durations = {
  inhale: number;
  hold: number;
  exhale: number;
};

type TimerState = {
  phase: BreathPhase;
  remainingSeconds: number;
  isRunning: boolean;
};

const PHASE_ORDER: BreathPhase[] = ["inhale", "hold", "exhale"];

export function useBreathTimer(initialDurations: Durations) {
  const [durations, setDurations] = useState<Durations>(initialDurations);
  const [state, setState] = useState<TimerState>(() => ({
    phase: "inhale",
    remainingSeconds: Math.max(1, Math.floor(initialDurations.inhale || 1)),
    isRunning: false,
  }));

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep durations in sync when inputs change from outside
  useEffect(() => {
    setDurations(initialDurations);
  }, [initialDurations]);

  const moveToNextPhase = useCallback((current: BreathPhase): BreathPhase => {
    const index = PHASE_ORDER.indexOf(current);
    const next = PHASE_ORDER[(index + 1) % PHASE_ORDER.length];
    return next;
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    setState((prev) => ({ ...prev, isRunning: true }));
    intervalRef.current = setInterval(() => {
      setState((prev) => {
        if (!prev.isRunning) return prev;
        if (prev.remainingSeconds > 1) {
          return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
        }
        // Transition to next phase
        const nextPhase = moveToNextPhase(prev.phase);
        const nextDuration = Math.max(1, Math.floor(durations[nextPhase] || 1));
        return {
          phase: nextPhase,
          remainingSeconds: nextDuration,
          isRunning: true,
        };
      });
    }, 1000);
  }, [durations, moveToNextPhase]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState({
      phase: "inhale",
      remainingSeconds: Math.max(1, Math.floor(durations.inhale || 1)),
      isRunning: false,
    });
  }, [durations.inhale]);

  // Reset remaining time if durations change while stopped and on current phase
  useEffect(() => {
    if (!state.isRunning) {
      const currentDuration = Math.max(
        1,
        Math.floor(durations[state.phase] || 1)
      );
      setState((prev) => ({ ...prev, remainingSeconds: currentDuration }));
    }
  }, [durations, state.isRunning, state.phase]);

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    },
    []
  );

  return useMemo(
    () => ({
      phase: state.phase,
      remainingSeconds: state.remainingSeconds,
      isRunning: state.isRunning,
      start,
      pause,
      reset,
    }),
    [pause, reset, start, state.isRunning, state.phase, state.remainingSeconds]
  );
}
