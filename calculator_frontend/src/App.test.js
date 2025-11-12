import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

/**
 * Helper to click a sequence of keys by label text.
 * Accepts array of labels (strings), e.g., ["2", "+", "3", "="]
 */
function clickKeys(labels) {
  for (const label of labels) {
    const btn = screen.getByRole('button', { name: label });
    fireEvent.click(btn);
  }
}

/**
 * Read the calculator display content.
 * The Display component renders a span with data-testid="display-value".
 */
function readDisplay() {
  return screen.getByTestId('display-value').textContent;
}

describe('Responsive Calculator - UI and basic flows', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders all primary keypad keys', () => {
    // Actions
    expect(screen.getByRole('button', { name: 'All clear' })).toBeInTheDocument(); // AC
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument(); // C
    expect(screen.getByRole('button', { name: 'Backspace' })).toBeInTheDocument(); // ⌫

    // Operators
    expect(screen.getByRole('button', { name: 'Divide' })).toBeInTheDocument(); // ÷
    expect(screen.getByRole('button', { name: 'Multiply' })).toBeInTheDocument(); // ×
    expect(screen.getByRole('button', { name: 'Subtract' })).toBeInTheDocument(); // −
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument(); // +

    // Equals
    expect(screen.getByRole('button', { name: 'Equals' })).toBeInTheDocument(); // =

    // Digits and decimal
    for (const d of ['0','1','2','3','4','5','6','7','8','9']) {
      expect(screen.getByRole('button', { name: d })).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'Decimal point' })).toBeInTheDocument(); // .
  });

  test('performs 2 + 3 = 5', () => {
    clickKeys(['2', '+', '3', 'Equals']);
    expect(readDisplay()).toBe('5');
  });

  test('handles division by zero with friendly error', () => {
    clickKeys(['5', 'Divide', '0', 'Equals']);
    expect(readDisplay()).toMatch(/divide by zero|Cannot divide by zero|Error/i);
  });

  test('allows decimal input and trims correctly', () => {
    // Enter 1.2 + 3.4 = 4.6
    clickKeys(['1', 'Decimal point', '2', 'Add', '3', 'Decimal point', '4', 'Equals']);
    expect(readDisplay()).toBe('4.6');

    // Enter 0.50 + 0.50 = 1
    clickKeys(['All clear']); // reset
    clickKeys(['0', 'Decimal point', '5', '0', 'Add', '0', 'Decimal point', '5', '0', 'Equals']);
    expect(readDisplay()).toBe('1');
  });

  test('clear (C) clears only active entry, AC resets all', () => {
    // Start: 12 + 34; press C should clear current (right operand)
    clickKeys(['1', '2', 'Add', '3', '4']);
    expect(readDisplay()).toBe('34');
    fireEvent.click(screen.getByRole('button', { name: 'Clear' })); // C
    expect(readDisplay()).toBe('0'); // right cleared
    // Now enter 5 and evaluate => 12 + 5 = 17
    clickKeys(['5', 'Equals']);
    expect(readDisplay()).toBe('17');

    // AC resets everything to initial state (display "0")
    fireEvent.click(screen.getByRole('button', { name: 'All clear' })); // AC
    expect(readDisplay()).toBe('0');
  });

  test('backspace deletes last digit and stops at 0', () => {
    // Type 123 then backspace thrice => 0
    clickKeys(['1', '2', '3']);
    expect(readDisplay()).toBe('123');

    const backspaceBtn = screen.getByRole('button', { name: 'Backspace' });
    fireEvent.click(backspaceBtn);
    expect(readDisplay()).toBe('12');
    fireEvent.click(backspaceBtn);
    expect(readDisplay()).toBe('1');
    fireEvent.click(backspaceBtn);
    expect(readDisplay()).toBe('0');

    // Backspace at 0 keeps it 0
    fireEvent.click(backspaceBtn);
    expect(readDisplay()).toBe('0');
  });
});
