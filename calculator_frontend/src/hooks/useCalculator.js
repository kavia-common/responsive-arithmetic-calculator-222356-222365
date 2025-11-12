import { useMemo } from "react";

/**
 * PUBLIC_INTERFACE
 * useCalculator
 * Hook to manage calculator interactions and state.
 * Returns handlers and the computed display value.
 *
 * @returns {{
 *   displayValue: string,
 *   onDigit: function,
 *   onDecimal: function,
 *   onOperator: function,
 *   onEquals: function,
 *   onClear: function,
 *   onAllClear: function,
 *   onBackspace: function,
 *   onToggleSign: function
 * }}
 */
export function useCalculator() {
  // Placeholder: static display and no-op handlers
  const displayValue = "0";

  const handlers = useMemo(
    () => ({
      onDigit: () => {},
      onDecimal: () => {},
      onOperator: () => {},
      onEquals: () => {},
      onClear: () => {},
      onAllClear: () => {},
      onBackspace: () => {},
      onToggleSign: () => {},
    }),
    []
  );

  return {
    displayValue,
    ...handlers,
  };
}

export default useCalculator;
