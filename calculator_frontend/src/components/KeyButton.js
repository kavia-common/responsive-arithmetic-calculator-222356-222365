import React from "react";

/**
 * PUBLIC_INTERFACE
 * KeyButton
 * A reusable calculator button.
 *
 * Props:
 * - label: string | ReactNode - visible label on the button
 * - ariaLabel: string (optional) - accessible label
 * - variant: 'digit' | 'operator' | 'action' | 'equals' - visual style
 * - onPress: function - click handler
 */
function KeyButton({ label, ariaLabel, variant = "digit", onPress }) {
  const baseStyle = {
    appearance: "none",
    border: "1px solid var(--ocean-border)",
    background: "var(--button-bg)",
    color: "var(--button-text)",
    padding: "0.75rem",
    borderRadius: "12px",
    fontSize: "1.125rem",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.35)",
    transition: "transform 120ms ease, box-shadow 120ms ease, background 160ms ease",
    outline: "none",
  };

  const variants = {
    digit: {
      background: "var(--ocean-surface-strong)",
      color: "var(--ocean-text)",
    },
    operator: {
      background:
        "linear-gradient(135deg, var(--ocean-secondary-600), var(--ocean-secondary-500))",
      color: "#fff",
    },
    action: {
      background:
        "linear-gradient(135deg, var(--ocean-primary-600), var(--ocean-primary-500))",
      color: "#fff",
    },
    equals: {
      background:
        "linear-gradient(135deg, var(--ocean-success-600), var(--ocean-success-500))",
      color: "#fff",
    },
  };

  const style = { ...baseStyle, ...(variants[variant] || {}) };

  return (
    <button
      type="button"
      className={`key-button key-${variant} focus-ring`}
      aria-label={ariaLabel}
      onClick={onPress}
      style={style}
      onMouseDown={(e) => e.currentTarget.classList.add("pressed")}
      onMouseUp={(e) => e.currentTarget.classList.remove("pressed")}
      onBlur={(e) => e.currentTarget.classList.remove("pressed")}
    >
      <span>{label}</span>
    </button>
  );
}

export default KeyButton;
