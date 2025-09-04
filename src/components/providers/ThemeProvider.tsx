import React, { useEffect } from 'react';
import { useThemeStore } from '../../stores';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { setTheme } = useThemeStore();

  useEffect(() => {
    // Verificar se o usuário tem preferência salva
    const savedTheme = localStorage.getItem('theme-storage');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        if (parsed.state?.theme) {
          setTheme(parsed.state.theme);
        }
      } catch (error) {
        console.error('Erro ao carregar tema salvo:', error);
      }
    } else {
      // Verificar preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [setTheme]);

  return <>{children}</>;
};
