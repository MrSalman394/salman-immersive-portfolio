export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function damp(current: number, target: number, smoothing: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-smoothing * delta));
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const normalized = (value - inMin) / (inMax - inMin);
  return outMin + (outMax - outMin) * normalized;
}
