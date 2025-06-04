// ===================== Utilities ===================== //

/**
 * getWaitTime
 *
 * @description
 * Calculates the waiting time based on the number of attempts made by the user.
 * Returns the waiting time in milliseconds based on the number of attempts.
 * Rules:
 * - If attempts ≥ 6 → returns 8 hours.
 * - Otherwise → uses predefined delays from the array.
 * * Predefined delays:
 *   - 1 attempts: 30 seconds
 *   - 2 attempt: 60 seconds
 *   - 3 attempts: 90 seconds
 *   - 4 attempts: 120 seconds
 *   - 5 attempts: 300 seconds
 *
 * @param {number} attempt - The number of times the user has attempted the action.
 * @returns {number} Wait time in milliseconds.
 */
export const getWaitTime = (attempt: number): number => {
  if (attempt >= 6) return 8 * 60 * 60 * 1000; // 8 hours in ms

  const seconds = [30, 60, 90, 120, 300]; // Predefined durations in seconds

  return seconds[attempt] * 1000; // Convert to milliseconds
};

/**
 * formatCountdown
 *
 * @description
 * - Converts a duration (in seconds) into a formatted string.
 * - Example: 7388 → "2h 3m 8s"
 *
 * @param {number} seconds - Total seconds remaining.
 * @returns {string} Formatted string (e.g., "1h 20m 5s").
 */
export const formatCountdown = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return `${h > 0 ? `${h}h ` : ""}${m > 0 ? `${m}m ` : ""}${s}s`;
};
