import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Building2, 
  Users, 
  FileText, 
  DollarSign, 
  UserCheck, 
  Settings,
  Menu,
  X,
  LogOut,
  User,
  Bell,
  Search
} from 'lucide-react';
import { useAuthStore, useUIStore } from '../../stores';
import { Button } from '../ui';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import logo from '../../assets/uniao-imobiliaria-logo.png';

// Utility function for combining class names
const cn = (...inputs: (string | undefined | null | false)[]) => {
  return twMerge(clsx(inputs));
};

interface SidebarItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  roles: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    roles: ['owner', 'manager', 'agent', 'financial', 'hr'],
  },
  {
    label: 'Imóveis',
    icon: Building2,
    href: '/properties',
    roles: ['owner', 'manager', 'agent'],
  },
  {
    label: 'Leads',
    icon: Users,
    href: '/leads',
    roles: ['owner', 'manager', 'agent'],
  },
  {
    label: 'Vendas & Locações',
    icon: FileText,
    href: '/deals',
    roles: ['owner', 'manager', 'agent'],
  },
  {
    label: 'Financeiro',
    icon: DollarSign,
    href: '/financial',
    roles: ['owner', 'manager', 'financial'],
  },
  {
    label: 'RH',
    icon: UserCheck,
    href: '/hr',
    roles: ['owner', 'hr'],
  },
  {
    label: 'Usuários',
    icon: Settings,
    href: '/users',
    roles: ['owner', 'manager'],
  },
  {
    label: 'Configurações',
    icon: Settings,
    href: '/settings',
    roles: ['owner', 'manager', 'agent', 'financial', 'hr'],
  },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const location = useLocation();

  const filteredItems = sidebarItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        'fixed left-0 top-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="União Imobiliária" 
                className="h-8 w-auto"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-4">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900'
                  )}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-secondary-500 truncate">
                  {user?.email}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => useAuthStore.getState().logout()}
                className="text-secondary-500 hover:text-secondary-700"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Header: React.FC = () => {
  const { toggleSidebar } = useUIStore();
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm lg:px-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
                  <div className="hidden lg:block">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="União Imobiliária" 
                className="h-8 w-auto"
              />
            </div>
          </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="h-9 w-64 rounded-md border border-secondary-200 bg-white pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-danger-500 text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User menu */}
        <div className="flex items-center space-x-2">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-secondary-900">
              {user?.name}
            </p>
            <p className="text-xs text-secondary-500">
              {user?.role === 'owner' && 'Proprietário'}
              {user?.role === 'manager' && 'Gestor'}
              {user?.role === 'agent' && 'Corretor'}
              {user?.role === 'financial' && 'Financeiro'}
              {user?.role === 'hr' && 'RH'}
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
    <div className="min-h-screen bg-secondary-50">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
