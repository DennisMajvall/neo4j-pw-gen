export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** Examples (maxDecimals 2): \
 * Converts 2.0000000000000004 to **2** \
 * Converts 2.555555 to **2.56**
 */
export const roundToMaxDecimals = (
  value: number,
  maxDecimals: number
): number => Number(value.toFixed(maxDecimals));
