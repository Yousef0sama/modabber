// ===================== formatDateTime ===================== //

/**
 * formatDateTime
 *
 * @description
 * - This function can handle both string and Date inputs.
 * - It formats the date into a human-readable string.
 * - Formats a date into the format: "DD Mon YYYY HH:mm:ss"
 * - Example: "31 May 2025 01:17:30"
 *
 * @param {string | Date} dateInput - The date to format (can be a string or Date object).
 * @returns {string} - A formatted date-time string.
 */
export default function formatDateTime(dateInput: string | Date): string {
  const date = new Date(dateInput);

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}
