import React from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import "../assets/theme.css";
import { useCalculator } from "../hooks/useCalculator";

/**
 * PUBLIC_INTERFACE
 * Calculator
 * A top-level component that composes Display and Keypad using the useCalculator hook.
 */
function Calculator() {
  const {
    displayValue,
    onDigit,
    onDecimal,
    onOperator,
    onEquals,
    onClear,
    onAllClear,
    onBackspace,
    onToggleSign,
  } = useCalculator();

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
        onDigit={onDigit}
        onDecimal={onDecimal}
        onOperator={onOperator}
        onEquals={onEquals}
        onClear={onClear}
        onAllClear={onAllClear}
        onBackspace={onBackspace}
        onToggleSign={onToggleSign}
      />
    </div>
  );
}

export default Calculator;
