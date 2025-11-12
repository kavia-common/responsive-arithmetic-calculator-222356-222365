import React from "react";
import KeyButton from "./KeyButton";

/**
 * PUBLIC_INTERFACE
 * Keypad
 * Grid layout for calculator keys.
 *
 * Props:
 * - onDigit(d)
 * - onDecimal()
 * - onOperator(op)
 * - onEquals()
 * - onClear()
 * - onAllClear()
 * - onBackspace()
 * - onToggleSign()
 */
function Keypad({
  onDigit = () => {},
  onDecimal = () => {},
  onOperator = () => {},
  onEquals = () => {},
  onClear = () => {},
  onAllClear = () => {},
  onBackspace = () => {},
  onToggleSign = () => {},
}) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "0.5rem",
  };

  return (
    <div className="calc-keypad" style={gridStyle} role="group" aria-label="Calculator keypad">
      {/* Row: AC, C, ⌫, ÷ */}
      <KeyButton
        label="AC"
        ariaLabel="All clear"
        variant="action"
        onPress={onAllClear}
      />
      <KeyButton
        label="C"
        ariaLabel="Clear"
        variant="action"
        onPress={onClear}
      />
      <KeyButton
        label="⌫"
        ariaLabel="Backspace"
        variant="action"
        onPress={onBackspace}
      />
      <KeyButton
        label="÷"
        ariaLabel="Divide"
        variant="operator"
        onPress={() => onOperator("÷")}
      />

      {/* Row: 7 8 9 × */}
      <KeyButton label="7" variant="digit" onPress={() => onDigit("7")} />
      <KeyButton label="8" variant="digit" onPress={() => onDigit("8")} />
      <KeyButton label="9" variant="digit" onPress={() => onDigit("9")} />
      <KeyButton
        label="×"
        ariaLabel="Multiply"
        variant="operator"
        onPress={() => onOperator("×")}
      />

      {/* Row: 4 5 6 - */}
      <KeyButton label="4" variant="digit" onPress={() => onDigit("4")} />
      <KeyButton label="5" variant="digit" onPress={() => onDigit("5")} />
      <KeyButton label="6" variant="digit" onPress={() => onDigit("6")} />
      <KeyButton
        label="−"
        ariaLabel="Subtract"
        variant="operator"
        onPress={() => onOperator("−")}
      />

      {/* Row: 1 2 3 + */}
      <KeyButton label="1" variant="digit" onPress={() => onDigit("1")} />
      <KeyButton label="2" variant="digit" onPress={() => onDigit("2")} />
      <KeyButton label="3" variant="digit" onPress={() => onDigit("3")} />
      <KeyButton
        label="+"
        ariaLabel="Add"
        variant="operator"
        onPress={() => onOperator("+")}
      />

      {/* Row: ± 0 . = */}
      <KeyButton
        label="±"
        ariaLabel="Toggle sign"
        variant="action"
        onPress={onToggleSign}
      />
      <KeyButton label="0" variant="digit" onPress={() => onDigit("0")} />
      <KeyButton label="." ariaLabel="Decimal point" variant="digit" onPress={onDecimal} />
      <KeyButton
        label="="
        ariaLabel="Equals"
        variant="equals"
        onPress={onEquals}
      />
    </div>
  );
}

export default Keypad;
