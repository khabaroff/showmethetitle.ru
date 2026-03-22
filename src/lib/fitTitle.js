const MIN_SCALE = 0.62;
const STEP = 0.04;

export function getNextScale({ fits, currentScale }) {
  if (fits) return currentScale;
  return Math.max(MIN_SCALE, Number((currentScale - STEP).toFixed(2)));
}
