import React, { useEffect, useState } from 'react';
import { DarkModeContext } from './DarkModeContext';

interface Props {
  children: React.ReactNode;
}

function DarkModeProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    setDarkMode(darkModeMediaQuery.matches);

    const handleDarkModePreferenceChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener(
      'change',
      handleDarkModePreferenceChange
    );

    return () => {
      darkModeMediaQuery.removeEventListener(
        'change',
        handleDarkModePreferenceChange
      );
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeProvider };
