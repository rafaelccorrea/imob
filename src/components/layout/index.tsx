import React from 'react';
import { 
  Menu, 
  LogOut, 
  User, 
  Bell
} from 'lucide-react';
import { useAuthStore, useUIStore, useSearchStore } from '../../stores';
import { Button, ThemeToggle, GlobalSearch } from '../ui';
import { usePermissions } from '../../hooks/usePermissions';
import { Sidebar } from './Sidebar';

export const Header: React.FC = () => {
  const { toggleSidebar } = useUIStore();
  const { user } = useAuthStore();
  const { setIsSearchOpen } = useSearchStore();
  const { getRoleName } = usePermissions();

  // Atalho de teclado para abrir busca (Ctrl+K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 shadow-sm lg:px-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:flex items-center space-x-2">
          <GlobalSearch />
        </div>

        <ThemeToggle />

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User menu */}
        <div className="flex items-center space-x-2">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.role && getRoleName(user.role)}
            </p>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="h-4 w-4 text-primary-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};