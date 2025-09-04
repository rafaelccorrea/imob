import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../stores';
import { Button } from '../ui';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-10 h-10 p-0 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
      title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
      ) : (
        <Sun className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
      )}
    </Button>
  );
};
