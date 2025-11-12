# Responsive Arithmetic Calculator (React CRA)

A simple, user-friendly, and fully responsive arithmetic calculator supporting addition, subtraction, multiplication, and division. Built with Create React App (CRA) using idiomatic React and lightweight, themeable CSS.

Live dev URL (when running locally): http://localhost:3000

## Overview and Features

- Basic operations: +, −, ×, ÷ with equals
- Clear controls:
  - C: clear current entry
  - AC: reset all state
  - ⌫: backspace last digit
  - ±: toggle sign
- Keyboard support: digits, operators, Enter/=, Backspace, Escape, C, decimal
- Accessible by design:
  - aria-labels on buttons
  - focus-visible styles
  - polite live region for display
- Responsive layout: adapts from mobile to desktop
- Theming: light/dark using CSS variables and [data-theme] attribute
- Tests: UI smoke tests and core operation flows via React Testing Library

## Getting Started

This is a CRA-style app; use the standard scripts.

- npm install
- npm start
- npm test
- npm run build

Environment variables
The app does not require external services. CRA exposes vars prefixed with REACT_APP_. Available vars (optional for tooling/integration):
- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_NEXT_TELEMETRY_DISABLED
- REACT_APP_ENABLE_SOURCE_MAPS
- REACT_APP_PORT
- REACT_APP_TRUST_PROXY
- REACT_APP_LOG_LEVEL
- REACT_APP_HEALTHCHECK_PATH
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

If you need to configure any, create .env in the project root (do not commit secrets).

## Usage Guide

- Click/tap the on-screen keys or use keyboard input to enter expressions.
- Example 1: 2 + 3 =
  - Result: 5
- Example 2: 5 ÷ 0 =
  - Shows a friendly division-by-zero error. Press AC to reset.
- Example 3: Decimals
  - Enter 1 . 2 + 3 . 4 = → 4.6
- Clear semantics
  - C clears only the active entry (left or right operand)
  - AC resets everything
- Backspace
  - Deletes one character from the active entry; stops at 0
- Sign toggle (±)
  - Toggles the sign of the active entry (0 remains positive)

## Keyboard Shortcuts

- Digits: 0–9
- Decimal: . or ,
- Operators:
  - + → addition
  - - → subtraction
  - * → multiplication
  - / → division
- Enter or = → equals
- Backspace → delete last character
- Escape → all clear (AC)
- C or c → clear current entry (C)

Notes:
- Minus (-) on keyboard is treated as the subtraction operator. Use the on-screen ± key for sign toggling.

## Accessibility Notes

- Buttons include descriptive aria-labels (e.g., “Divide”, “Backspace”, “All clear”).
- Display is a region with aria-live="polite" so results are announced to assistive tech without being intrusive.
- Focus-visible outlines are provided to support keyboard navigation; see focus styles in src/index.css and focus ring token in src/assets/theme.css.
- Landmark roles:
  - The app root uses role="main".
  - Calculator container uses role="application".
  - Keypad uses role="group".
  - Display uses role="region".

## Responsive Behavior

- Layout centers the calculator with a maximum width for comfortable reading.
- The keypad uses a 4-column grid that scales with the available width.
- Mobile (≤480px):
  - Tighter gaps and padding for better hit targets.
  - Slightly reduced font sizes and border radii for compactness.
- Tablet/Desktop:
  - More generous spacing and larger display typography.
- See src/App.css and src/assets/theme.css for media queries and grid definitions.

## Theming

- Theme tokens are defined in src/assets/theme.css (Ocean Professional – Playful).
- App-level styles are in src/App.css and leverage CSS variables for colors, backgrounds, focus rings, and gradients.
- The active theme is applied using the data-theme attribute on <html>. Two modes are supported:
  - data-theme="light" (default)
  - data-theme="dark"
- The app includes a theme toggle button in the header. You can also toggle by setting:
  document.documentElement.setAttribute('data-theme', 'dark');

Key files:
- src/assets/theme.css: base tokens (colors, gradients, focus ring)
- src/App.css: component styles and responsive rules using tokens
- Components apply classes like key-button, key-digit, key-operator, key-action, key-equals, calc-display, calc-keypad

## Testing

- Run tests: npm test
- Framework: React Testing Library + Jest (CRA defaults)
- Coverage includes:
  - Rendering and presence of primary controls
  - Core flows: addition, division-by-zero handling, decimal arithmetic
  - Control semantics: C vs AC, backspace behavior
- See src/App.test.js for scenarios and helpers.

## Project Structure (Selected)

- src/components/Calculator.js: Compose display + keypad with behavior hooks
- src/components/Display.js: Accessible display region
- src/components/Keypad.js: Grid of buttons with aria-labels
- src/components/KeyButton.js: Reusable, theme-aware button
- src/hooks/useCalculator.js: State machine integration, keyboard handling
- src/utils/calcEngine.js: Pure calculator finite state engine
- src/utils/formatters.js: Safe display formatting rules
- src/assets/theme.css and src/App.css: Theme tokens and layout

## Limitations and Future Improvements

- No memory or history: Only the current expression is stored.
- No advanced functions: Percentage, parentheses, scientific ops not included.
- Sign toggle via keyboard is not bound to a specific key to avoid ambiguity with the minus operator; only the on-screen ± is supported.
- Potential enhancements:
  - Calculation history with keyboard navigation
  - Percentage and more scientific operations
  - Haptic feedback on mobile (where supported)
  - Internationalization and locale-aware number formatting
  - Improved error recovery flows with more granular messages

## CRA Docs

For CRA-specific topics (code splitting, analyzing bundle size, PWA, advanced config, deployment, troubleshooting), see:
https://create-react-app.dev/docs/getting-started
