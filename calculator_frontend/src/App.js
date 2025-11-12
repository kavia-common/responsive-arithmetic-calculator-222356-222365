import React, { useState, useEffect } from 'react';
import './assets/theme.css'; // Theme tokens first so App.css can rely on vars
import './App.css';
import Calculator from './components/Calculator';

// PUBLIC_INTERFACE
function App() {
  /** Root application wrapper that manages the theme and renders the Calculator. */
  const [theme, setTheme] = useState('light');

  // Apply theme as a data attribute for CSS to target
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Toggle between light and dark theme modes. */
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App" role="main">
      <header className="App-header">
        <button
          className="theme-toggle focus-ring"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <Calculator />
      </header>
    </div>
  );
}

export default App;
