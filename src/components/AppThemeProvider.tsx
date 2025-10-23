import React from 'react';
import { ThemeProvider } from '../hooks/useTheme';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  return (
    <ThemeProvider defaultMode="light" defaultVariant="futuristic">
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
