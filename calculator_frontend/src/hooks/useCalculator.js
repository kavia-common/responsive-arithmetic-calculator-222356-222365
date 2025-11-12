import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createInitialState,
  inputDigit,
  inputDecimal,
  toggleSign,
  setOperator,
  evaluate,
  clear,
  allClear,
  backspace,
  getDisplayValue,
} from "../utils/calcEngine";
import { formatNumber, safeDisplay } from "../utils/formatters";

/**
 * PUBLIC_INTERFACE
 * useCalculator
 * Hook to manage calculator interactions, state transitions, and keyboard bindings.
 * Returns handlers and the formatted display value.
 *
 * @returns {{
 *   displayValue: string,
 *   onDigit: (d: string) => void,
 *   onDecimal: () => void,
 *   onOperator: (op: '+'|'−'|'×'|'÷') => void,
 *   onEquals: () => void,
 *   onClear: () => void,
 *   onAllClear: () => void,
 *   onBackspace: () => void,
 *   onToggleSign: () => void
 * }}
 */
export function useCalculator() {
  const [state, setState] = useState(() => createInitialState());

  // Handlers
  const onDigit = useCallback((d) => {
    setState((prev) => inputDigit(prev, d));
  }, []);

  const onDecimal = useCallback(() => {
    setState((prev) => inputDecimal(prev));
  }, []);

  const onOperator = useCallback((op) => {
    setState((prev) => setOperator(prev, op));
  }, []);

  const onEquals = useCallback(() => {
    setState((prev) => evaluate(prev));
  }, []);

  const onClear = useCallback(() => {
    setState((prev) => clear(prev));
  }, []);

  const onAllClear = useCallback(() => {
    setState(() => allClear());
  }, []);

  const onBackspace = useCallback(() => {
    setState((prev) => backspace(prev));
  }, []);

  const onToggleSign = useCallback(() => {
    setState((prev) => toggleSign(prev));
  }, []);

  // Keyboard integration
  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      // Prevent default for calculator relevant keys to avoid form/scroll side effects
      if (/^[0-9]$/.test(key) || ["+", "-", "*", "/", "Enter", "=", "Backspace", "Escape", "c", "C", ".", ","].includes(key)) {
        e.preventDefault();
      }
      if (/^[0-9]$/.test(key)) {
        onDigit(key);
        return;
      }
      if (key === "." || key === ",") {
        onDecimal();
        return;
      }
      if (key === "+" ) {
        onOperator("+");
        return;
      }
      if (key === "-") {
        // Ambiguity: minus key is operator; sign toggle provided via 's' or '±' button, not keyboard '-' to avoid confusion
        onOperator("−");
        return;
      }
      if (key === "*" ) {
        onOperator("×");
        return;
      }
      if (key === "/") {
        onOperator("÷");
        return;
      }
      if (key === "Enter" || key === "=") {
        onEquals();
        return;
      }
      if (key === "Backspace") {
        onBackspace();
        return;
      }
      if (key === "Escape") {
        onAllClear();
        return;
      }
      if (key === "c" || key === "C") {
        onClear();
        return;
      }
    };

    window.addEventListener("keydown", handler, { passive: false });
    return () => window.removeEventListener("keydown", handler);
  }, [onDigit, onDecimal, onOperator, onEquals, onBackspace, onAllClear, onClear]);

  // Compute display value
  const displayValue = useMemo(() => {
    const raw = getDisplayValue(state);
    const formatted = formatNumber(raw);
    return safeDisplay(formatted);
  }, [state]);

  return {
    displayValue,
    onDigit,
    onDecimal,
    onOperator,
    onEquals,
    onClear,
    onAllClear,
    onBackspace,
    onToggleSign,
  };
}

export default useCalculator;
