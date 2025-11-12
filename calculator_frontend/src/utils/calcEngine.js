/**
 * This file contains a pure, framework-agnostic calculator finite state engine.
 * State model:
 * {
 *   leftOperand: string|null,
 *   operator: ('+'|'−'|'×'|'÷'|null),
 *   rightOperand: string|null,
 *   inputMode: 'left'|'right', // which operand user is editing
 *   justEvaluated: boolean,    // true when last action was '='
 *   error: string|null         // non-null when in error (e.g., division by zero)
 * }
 *
 * All functions are pure and return a new state without mutating input.
 */

// Helpers
const isDigit = (d) => /^[0-9]$/.test(d);
const sanitizeNumberString = (s) => (typeof s === "string" ? s : String(s ?? ""));
const stripLeadingZeros = (s) => {
  if (s === null) return null;
  const str = sanitizeNumberString(s);
  if (str === "") return "0";
  // Preserve "0.xxx" and "-0.xxx"
  if (str.includes(".")) {
    const [sign, rest] = str.startsWith("-") ? ["-", str.slice(1)] : ["", str];
    const [int, frac] = rest.split(".");
    const intStr = String(parseInt(int || "0", 10));
    return `${sign}${intStr === "NaN" ? "0" : intStr}.${frac}`.replace(/^-NaN\./, "-0.");
  }
  const n = String(parseInt(str, 10));
  if (n === "NaN") return "0";
  return n;
};
const applyBackspace = (s) => {
  const str = sanitizeNumberString(s);
  if (str.length <= 1 || (str.length === 2 && str.startsWith("-"))) return "0";
  return str.slice(0, -1);
};

// Arithmetic
function compute(left, op, right) {
  const a = Number(left);
  const b = Number(right);
  if (!isFinite(a) || !isFinite(b)) return { error: "Invalid number" };
  switch (op) {
    case "+":
      return { value: a + b };
    case "−":
      return { value: a - b };
    case "×":
      return { value: a * b };
    case "÷":
      if (b === 0) return { error: "Cannot divide by zero" };
      return { value: a / b };
    default:
      return { error: "Unknown operator" };
  }
}

// PUBLIC_INTERFACE
export function createInitialState() {
  /** Create initial state for calculator FSM. */
  return {
    leftOperand: null,
    operator: null,
    rightOperand: null,
    inputMode: "left",
    justEvaluated: false,
    error: null,
  };
}

// INTERNAL: get active operand value
function getActiveValue(state) {
  return state.inputMode === "left" ? state.leftOperand : state.rightOperand;
}
function setActiveValue(state, newVal) {
  if (state.inputMode === "left") {
    return { ...state, leftOperand: newVal };
  }
  return { ...state, rightOperand: newVal };
}

// PUBLIC_INTERFACE
export function inputDigit(state, d) {
  /** Append a digit to the current input handling leading zeros and post-eval overwrite. */
  if (!isDigit(d)) return { ...state };
  if (state.error) return { ...state }; // ignore inputs while in error until AC

  // If just evaluated and no operator set, start a new entry on left
  let next = { ...state };
  if (state.justEvaluated && !state.operator) {
    next = { ...createInitialState(), leftOperand: null, inputMode: "left" };
  }

  const current = sanitizeNumberString(getActiveValue(next) ?? "0");
  // If entering right operand for the first time after setting operator
  const starting = current === null || current === "null";
  let newVal;
  if (current === "0" || starting || next.justEvaluated) {
    // replace leading zero unless decimal already present
    newVal = d === "0" && current.includes(".") ? `${current}${d}` : d;
  } else {
    newVal = `${current}${d}`;
  }
  // normalize
  if (!newVal.includes(".")) newVal = stripLeadingZeros(newVal);
  next = setActiveValue({ ...next, justEvaluated: false }, newVal);
  return next;
}

// PUBLIC_INTERFACE
export function inputDecimal(state) {
  /** Insert decimal point into current input if not present. */
  if (state.error) return { ...state };
  let next = { ...state };

  // If just evaluated and no operator set, start new left entry as "0."
  if (state.justEvaluated && !state.operator) {
    next = { ...createInitialState(), leftOperand: "0.", inputMode: "left" };
    return next;
  }

  const current = sanitizeNumberString(getActiveValue(next) ?? "0");
  if (current.includes(".")) return next; // no-op
  const base = current === "0" || current === null ? "0" : current;
  return setActiveValue({ ...next, justEvaluated: false }, `${base}.`);
}

// PUBLIC_INTERFACE
export function toggleSign(state) {
  /** Toggle the sign of the active operand; keep '0' positive. */
  if (state.error) return { ...state };
  const current = sanitizeNumberString(getActiveValue(state) ?? "0");
  if (current === "0") return state;
  const flipped = current.startsWith("-") ? current.slice(1) : `-${current}`;
  return setActiveValue({ ...state, justEvaluated: false }, flipped);
}

// PUBLIC_INTERFACE
export function setOperator(state, op) {
  /** Set or change operator; supports operator chaining by performing pending operation when right operand exists. */
  if (state.error) return { ...state };
  if (!["+", "−", "×", "÷"].includes(op)) return state;

  let next = { ...state };

  // If no left operand yet, treat current display as left (default 0)
  const left = sanitizeNumberString(next.leftOperand ?? "0");
  // If just evaluated, keep result in left and allow operator change
  if (next.justEvaluated) {
    next = { ...next, operator: op, inputMode: "right", justEvaluated: false, rightOperand: null };
    return next;
  }

  // If right operand exists, compute first (operator chaining)
  if (next.operator && next.rightOperand != null) {
    const res = compute(left, next.operator, sanitizeNumberString(next.rightOperand));
    if (res.error) {
      return { ...createInitialState(), error: res.error };
    }
    next = {
      ...createInitialState(),
      leftOperand: String(res.value),
      operator: op,
      inputMode: "right",
    };
    return next;
  }

  // Otherwise just set operator and move to right input
  next = {
    ...next,
    leftOperand: left,
    operator: op,
    inputMode: "right",
    rightOperand: next.rightOperand, // unchanged (likely null)
    justEvaluated: false,
  };
  return next;
}

// PUBLIC_INTERFACE
export function evaluate(state) {
  /** Evaluate current expression; supports repeated equals by reusing last right operand. */
  if (state.error) return state;
  const { leftOperand, operator, rightOperand } = state;

  // Nothing to evaluate
  if (leftOperand == null) {
    return { ...state, justEvaluated: true };
  }
  if (!operator) {
    // if user presses equals with no operator, just confirm the entry
    return { ...state, justEvaluated: true, inputMode: "left" };
  }

  // If right operand missing, use left (e.g., 5 + = -> 10) or reuse previous right if justEvaluated
  const right = rightOperand != null ? rightOperand : leftOperand;
  const res = compute(sanitizeNumberString(leftOperand), operator, sanitizeNumberString(right));
  if (res.error) {
    return { ...createInitialState(), error: res.error };
  }

  return {
    ...createInitialState(),
    leftOperand: String(res.value),
    inputMode: "left",
    justEvaluated: true,
  };
}

// PUBLIC_INTERFACE
export function clear(state) {
  /** Clear the current active entry to 0; keep other parts (like operator and other operand). */
  if (state.error) return createInitialState();
  if (state.inputMode === "left") {
    return { ...state, leftOperand: "0", justEvaluated: false };
    }
  return { ...state, rightOperand: "0", justEvaluated: false };
}

// PUBLIC_INTERFACE
export function allClear() {
  /** Reset calculator to initial state. */
  return createInitialState();
}

// PUBLIC_INTERFACE
export function backspace(state) {
  /** Delete last character in active operand; if result empty, set to "0". */
  if (state.error) return createInitialState();
  const current = sanitizeNumberString(getActiveValue(state) ?? "0");
  const updated = applyBackspace(current);
  return setActiveValue({ ...state, justEvaluated: false }, updated);
}

// PUBLIC_INTERFACE
export function getDisplayValue(state) {
  /** Determine what to show on the display from current state (prefers active operand or error). */
  if (!state) return "0";
  if (state.error) return state.error;
  const active = getActiveValue(state);
  if (active != null) return String(active);
  // When right mode but empty, show 0; if left has value show it.
  if (state.inputMode === "right") return "0";
  if (state.leftOperand != null) return String(state.leftOperand);
  return "0";
}
