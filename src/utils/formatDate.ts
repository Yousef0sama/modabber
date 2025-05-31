/**
 * Formats a date into the format: "DD Mon YYYY HH:mm:ss"
 * Example: "31 May 2025 01:17:30"
 *
 * @param dateInput - The date to format (can be a string or Date object)
 * @returns A formatted date-time string
 */
export default function formatDateTime(dateInput: string | Date): string {
  // Convert input to a Date object
  const date = new Date(dateInput);

  // Extract and format day (2 digits)
  const day = date.getDate().toString().padStart(2, "0");

  // Get abbreviated month name (e.g., Jan, Feb, Mar)
  const month = date.toLocaleString("en-US", { month: "short" });

  // Get full year (e.g., 2025)
  const year = date.getFullYear();

  // Extract and format hours, minutes, and seconds (2 digits each)
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Return the final formatted string
  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}
