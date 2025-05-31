/**
 * Returns the waiting time in milliseconds based on the number of attempts.
 * - If attempts >= 6, wait time is 8 hours.
 * - Otherwise, returns a predefined wait time from the `seconds` array.
 *
 * @param attempt - The number of times the user has requested a reset link.
 * @returns Wait time in milliseconds.
 */
export const getWaitTime = (attempt: number): number => {
  if (attempt >= 6) return 8 * 60 * 60 * 1000; // 8 hours in ms

  // Predefined wait durations (in seconds) for each attempt
  const seconds = [30, 60, 90, 120, 300];

  // Return corresponding wait time or default to 480 seconds (8 minutes)
  return seconds[attempt] * 1000;
};

/**
 * Converts a countdown duration from seconds to a formatted string.
 * Example: 7388 => "2h 3m 8s"
 *
 * @param seconds - Total seconds remaining.
 * @returns Formatted countdown string (e.g., "1h 20m 5s").
 */
export const formatCountdown = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return `${h > 0 ? `${h}h ` : ""}${m > 0 ? `${m}m ` : ""}${s}s`;
};
