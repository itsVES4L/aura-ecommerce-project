import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const ThemeContext = createContext();

// Custom hook to use the theme context easily
export const useTheme = () => useContext(ThemeContext);

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // Function to get the initial theme
  const getInitialTheme = () => {
    // 1. Check localStorage for a saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // 2. Check user's system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    // 3. Default to dark
    return 'dark';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // This effect runs whenever the `theme` state changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the old theme class
    const oldTheme = theme === 'light' ? 'dark' : 'light';
    root.classList.remove(oldTheme);

    // Add the new theme class
    root.classList.add(theme);

    // Save the new theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};