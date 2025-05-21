import { createContext } from 'react';
import { DarkModeContextData } from '../types';

const DarkModeContext = createContext<DarkModeContextData>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export { DarkModeContext };
