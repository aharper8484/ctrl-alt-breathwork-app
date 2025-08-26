import type { Durations } from "../hooks/useBreathTimer";

export const DEFAULT_DURATIONS: Durations = {
  inhale: 4,
  hold: 4,
  exhale: 6,
};

export const MIN_SECONDS = 0;
export const MAX_SECONDS = 60;
