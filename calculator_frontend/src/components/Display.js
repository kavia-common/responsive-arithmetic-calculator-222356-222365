import React from "react";

/**
 * PUBLIC_INTERFACE
 * Display
 * Renders the calculator's current display value.
 *
 * Props:
 * - value: string - the string to show on the display
 * - Any additional aria-* attributes are forwarded (e.g., aria-label, aria-live)
 */
function Display({ value = "0", ...ariaProps }) {
  return (
    <div
      role="region"
      {...ariaProps}
      className="calc-display"
      style={{
        background: "var(--surface)",
        color: "var(--ocean-text)",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "0.75rem",
        border: "1px solid var(--ocean-border)",
        minHeight: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        fontSize: "2rem",
        fontWeight: 700,
        letterSpacing: "0.5px",
        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <span data-testid="display-value">{String(value)}</span>
    </div>
  );
}

export default Display;
