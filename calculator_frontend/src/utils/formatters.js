/**
 * PUBLIC_INTERFACE
 * formatNumber
 * Formats a number or numeric string for display.
 * Placeholder: returns input as string.
 * @param {number|string} n
 * @returns {string}
 */
export function formatNumber(n) {
  return String(n);
}

/**
 * PUBLIC_INTERFACE
 * safeDisplay
 * Ensures display string is safe and non-empty.
 * @param {string} s
 * @returns {string}
 */
export function safeDisplay(s) {
  const str = String(s ?? "");
  return str.trim() === "" ? "0" : str;
}
