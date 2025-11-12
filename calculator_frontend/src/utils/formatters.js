/**
 * Formatting rules:
 * - Trim trailing zeros after decimal (e.g., 12.3400 -> 12.34; 12.000 -> 12)
 * - Max length 12 for normal notation; if overflow use scientific with 6 significant digits
 * - Preserve sign
 */

// Constants
const MAX_DISPLAY_LEN = 12;
const SCI_THRESHOLD = 1e12; // when abs >= threshold use sci
const MIN_SCI_THRESHOLD = 1e-9; // when 0<abs<threshold use sci

// PUBLIC_INTERFACE
export function formatNumber(n) {
  /** Format a number or numeric string into human-readable display text. */
  if (n === null || n === undefined) return "0";
  if (typeof n === "string" && (n === "" || n === "null")) return "0";
  if (typeof n === "string" && /^[\-\+]?\d+(\.)?\d*$/.test(n)) {
    // valid numeric string possibly with trailing dot (typing state)
    if (n.endsWith(".")) return n; // keep editing state
  }
  let num = Number(n);
  if (!isFinite(num)) return "Error";

  const abs = Math.abs(num);

  // Use scientific for large/small magnitudes
  if ((abs >= SCI_THRESHOLD || (abs > 0 && abs < MIN_SCI_THRESHOLD)) && abs !== 0) {
    // 6 significant digits
    return num.toExponential(6).replace(/(\.0+|0+)e/, "e");
  }

  let s = String(num);
  if (s.includes("e") || s.includes("E")) {
    // normalize sci produced by JS
    return num.toExponential(6).replace(/(\.0+|0+)e/, "e");
  }

  // Trim trailing zeros after decimal
  if (s.includes(".")) {
    s = s.replace(/(\.\d*?[1-9])0+$/, "$1"); // remove trailing zeros
    s = s.replace(/\.0+$/, ""); // remove .0
  }

  // Enforce length
  if (s.replace("-", "").length > MAX_DISPLAY_LEN) {
    return abs.toExponential(6).replace(/(\.0+|0+)e/, "e");
  }
  return s;
}

// PUBLIC_INTERFACE
export function safeDisplay(s) {
  /** Ensure display string is non-empty and safe. */
  const str = String(s ?? "");
  return str.trim() === "" ? "0" : str;
}
