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
