export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function parseSeconds(input: string, min: number, max: number): number {
  const numeric = Number(input.replace(/[^0-9]/g, "")) || 0;
  return clamp(numeric, min, max);
}
