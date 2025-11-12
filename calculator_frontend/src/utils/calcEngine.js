/**
 * PUBLIC_INTERFACE
 * createInitialState
 * Create and return the initial calculator state object.
 * @returns {{accumulator: string|null, input: string, operator: string|null, justEvaluated: boolean}}
 */
export function createInitialState() {
  return {
    accumulator: null,
    input: "0",
    operator: null,
    justEvaluated: false,
  };
}

/**
 * PUBLIC_INTERFACE
 * inputDigit
 * Append a digit to the current input.
 * @param {object} state - calculator state
 * @param {string} d - single digit 0-9
 * @returns {object} next state
 */
export function inputDigit(state, d) {
  void d; // placeholder usage
  return { ...state };
}

/**
 * PUBLIC_INTERFACE
 * inputDecimal
 * Adds a decimal point to the current input if not present.
 * @param {object} state
 * @returns {object}
 */
export function inputDecimal(state) {
  return { ...state };
}

/**
 * PUBLIC_INTERFACE
 * toggleSign
 * Toggles the sign of the current input.
 * @param {object} state
 * @returns {object}
 */
export function toggleSign(state) {
  return { ...state };
}

/**
 * PUBLIC_INTERFACE
 * setOperator
 * Sets an operator and prepares accumulator/input for next entry.
 * @param {object} state
 * @param {'+'|'−'|'×'|'÷'} op
 * @returns {object}
 */
export function setOperator(state, op) {
  void op;
  return { ...state };
}

/**
 * PUBLIC_INTERFACE
 * evaluate
 * Performs evaluation based on current state and returns new state.
 * @param {object} state
 * @returns {object}
 */
export function evaluate(state) {
  return { ...state, justEvaluated: true };
}

/**
 * PUBLIC_INTERFACE
 * clear
 * Clears only the current input to "0".
 * @param {object} state
 * @returns {object}
 */
export function clear(state) {
  return { ...state, input: "0" };
}

/**
 * PUBLIC_INTERFACE
 * allClear
 * Resets calculator to its initial state.
 * @returns {object}
 */
export function allClear() {
  return createInitialState();
}

/**
 * PUBLIC_INTERFACE
 * backspace
 * Deletes the last character from input.
 * @param {object} state
 * @returns {object}
 */
export function backspace(state) {
  return { ...state };
}

/**
 * PUBLIC_INTERFACE
 * getDisplayValue
 * Returns a safe string for the display based on current state.
 * @param {object} state
 * @returns {string}
 */
export function getDisplayValue(state) {
  if (!state || typeof state.input !== "string") return "0";
  return state.input;
}
