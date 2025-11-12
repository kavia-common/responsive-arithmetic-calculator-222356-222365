import React from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import "../assets/theme.css";

/**
 * PUBLIC_INTERFACE
 * Calculator
 * A top-level component that composes Display and Keypad.
 * Currently wires placeholder no-op handlers; logic will be provided by useCalculator.
 */
function Calculator() {
  // Placeholder state and handlers (no-ops for now)
  const displayValue = "0";

  const handleDigit = () => {};
  const handleDecimal = () => {};
  const handleOperator = () => {};
  const handleEquals = () => {};
  const handleClear = () => {};
  const handleAllClear = () => {};
  const handleBackspace = () => {};
  const handleToggleSign = () => {};

  return (
    <div
      className="calc-container gradient-surface"
      style={{
        maxWidth: 360,
        margin: "2rem auto",
        padding: "1rem",
        borderRadius: "16px",
        background: "var(--surface)",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        border: "1px solid var(--ocean-border)",
      }}
      aria-label="Calculator"
      role="application"
    >
      <Display
        value={displayValue}
        aria-label="Calculator display"
        aria-live="polite"
      />
      <Keypad
        onDigit={handleDigit}
        onDecimal={handleDecimal}
        onOperator={handleOperator}
        onEquals={handleEquals}
        onClear={handleClear}
        onAllClear={handleAllClear}
        onBackspace={handleBackspace}
        onToggleSign={handleToggleSign}
      />
    </div>
  );
}

export default Calculator;
