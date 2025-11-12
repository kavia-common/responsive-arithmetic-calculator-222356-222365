import React, { useCallback } from "react";

/**
 * PUBLIC_INTERFACE
 * KeyButton
 * A reusable calculator button with subtle ripple and scale micro-animations.
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
    padding: "0.8rem",
    borderRadius: "14px",
    fontSize: "1.125rem",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow:
      "0 6px 14px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.35)",
    transition:
      "transform 140ms var(--ease-soft, ease), box-shadow 140ms var(--ease-soft, ease), background 160ms var(--ease-soft, ease)",
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

  // Ripple handler: set CSS vars for position, toggle class
  const handleMouseDown = useCallback((e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty("--ripple-x", `${x}%`);
    btn.style.setProperty("--ripple-y", `${y}%`);
    btn.classList.add("pressed");
    btn.classList.add("rippling");
  }, []);

  const endRipple = useCallback((e) => {
    const btn = e.currentTarget;
    btn.classList.remove("pressed");
    // Allow ripple fade-out to complete
    window.requestAnimationFrame(() => {
      btn.classList.remove("rippling");
    });
  }, []);

  return (
    <button
      type="button"
      className={`key-button key-${variant} focus-ring`}
      aria-label={ariaLabel}
      aria-pressed="false"
      onClick={onPress}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={endRipple}
      onMouseLeave={endRipple}
      onBlur={endRipple}
      onTouchStart={(e) => {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const touch = e.touches[0];
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty("--ripple-x", `${x}%`);
        btn.style.setProperty("--ripple-y", `${y}%`);
        btn.classList.add("pressed");
        btn.classList.add("rippling");
      }}
      onTouchEnd={endRipple}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.currentTarget.classList.add("pressed");
        }
      }}
      onKeyUp={(e) => {
        e.currentTarget.classList.remove("pressed");
      }}
    >
      <span>{label}</span>
    </button>
  );
}

export default KeyButton;
