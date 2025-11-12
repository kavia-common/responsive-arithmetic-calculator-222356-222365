import React, { useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * Display
 * Renders the calculator's current display value with a gentle update animation.
 *
 * Props:
 * - value: string - the string to show on the display
 * - Any additional aria-* attributes are forwarded (e.g., aria-label, aria-live)
 */
function Display({ value = "0", ...ariaProps }) {
  const valRef = useRef(null);
  const prev = useRef(value);

  // Add a brief animation class when value changes
  useEffect(() => {
    if (prev.current !== value && valRef.current) {
      const el = valRef.current;
      el.classList.remove("value-updated"); // reset if still applied
      // Force reflow to restart animation
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      el.classList.add("value-updated");
      prev.current = value;
    }
  }, [value]);

  return (
    <div
      role="region"
      {...ariaProps}
      className="calc-display"
      style={{
        background: "var(--surface)",
        color: "var(--ocean-text)",
        borderRadius: "16px",
        padding: "1rem 1.25rem",
        marginBottom: "0.75rem",
        border: "1px solid var(--ocean-border)",
        minHeight: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        fontSize: "2rem",
        fontWeight: 800,
        letterSpacing: "0.5px",
        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <span ref={valRef} className="" data-testid="display-value">
        {String(value)}
      </span>
    </div>
  );
}

export default Display;
