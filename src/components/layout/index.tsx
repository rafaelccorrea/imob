import React, { useState } from 'react';
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
  ChevronDown,
  ChevronRight,
  Shield
} from 'lucide-react';
import { useAuthStore, useUIStore, useSearchStore } from '../../stores';
import { Button, ThemeToggle, GlobalSearch } from '../ui';
import { usePermissions } from '../../hooks/usePermissions';
import type { UserRole } from '../../types/permissions';
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
  subItems?: SidebarSubItem[];
}

interface SidebarSubItem {
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
    roles: ['owner', 'manager', 'agent', 'financial'],
  },
  {
    label: 'Financeiro',
    icon: DollarSign,
    href: '/financial',
    roles: ['owner', 'financial'],
  },
  {
    label: 'RH',
    icon: UserCheck,
    href: '/hr',
    roles: ['owner', 'hr'],
  },
  {
    label: 'Usuários',
    icon: User,
    href: '/users',
    roles: ['owner', 'manager', 'hr'],
  },
  {
    label: 'Configurações',
    icon: Settings,
    href: '/settings',
    roles: ['owner'],
  },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { permissions } = usePermissions();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isExpanded = (href: string) => expandedItems.includes(href);

  const filteredItems = sidebarItems.filter(item => {
    // Verifica se o usuário tem permissão para acessar o módulo
    const hasModulePermission = item.roles.some(role => {
      switch (item.href) {
        case '/dashboard': return permissions.dashboard;
        case '/properties': return permissions.properties;
        case '/leads': return permissions.leads;
        case '/deals': return permissions.deals;
        case '/financial': return permissions.financial;
        case '/hr': return permissions.hr;
        case '/users': return permissions.users;
        case '/settings': return permissions.settings;
        default: return true;
      }
    });
    
    // Se tem subitens, filtra os subitens também
    if (item.subItems) {
      const filteredSubItems = item.subItems.filter(subItem => {
        const hasSubPermission = subItem.roles.some(role => {
          switch (subItem.href) {
            case '/permissions': return permissions.users;
            default: return true;
          }
        });
        return hasSubPermission;
      });
      
      // Retorna true se o item principal tem permissão ou se algum subitem tem permissão
      return hasModulePermission || filteredSubItems.length > 0;
    }
    
    return hasModulePermission;
  }).map(item => {
    // Filtra os subitens se existirem
    if (item.subItems) {
      return {
        ...item,
        subItems: item.subItems.filter(subItem => {
          const hasSubPermission = subItem.roles.some(role => {
            switch (subItem.href) {
              case '/permissions': return permissions.users;
              default: return true;
            }
          });
          return hasSubPermission;
        })
      };
    }
    return item;
  });

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
        'fixed left-0 top-0 z-50 h-full w-64 transform bg-white dark:bg-secondary-900 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-secondary-200 dark:border-secondary-700 px-6">
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
              const isActive = location.pathname === item.href || 
                             (item.subItems && item.subItems.some(subItem => location.pathname === subItem.href));
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const expanded = isExpanded(item.href);
              
              return (
                <div key={item.href}>
                  {hasSubItems ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.href)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                            : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 hover:text-secondary-900 dark:hover:text-secondary-100'
                        )}
                      >
                        <div className="flex items-center">
                          <Icon className="mr-3 h-5 w-5" />
                          {item.label}
                        </div>
                        {expanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      
                      {expanded && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.subItems?.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = location.pathname === subItem.href;
                            
                            return (
                              <Link
                                key={subItem.href}
                                to={subItem.href}
                                className={cn(
                                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                  isSubActive
                                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 hover:text-secondary-900 dark:hover:text-secondary-100'
                                )}
                                onClick={() => {
                                  if (window.innerWidth < 1024) {
                                    toggleSidebar();
                                  }
                                }}
                              >
                                <SubIcon className="mr-3 h-5 w-5" />
                                {subItem.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 hover:text-secondary-900 dark:hover:text-secondary-100'
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
                  )}
                </div>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-secondary-200 dark:border-secondary-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 px-4 shadow-sm lg:px-6">
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
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-danger-500 text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User menu */}
        <div className="flex items-center space-x-2">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
              {user?.name}
            </p>
            <p className="text-xs text-secondary-500 dark:text-secondary-400">
              {user?.role && getRoleName(user.role as any)}
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
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-4 lg:p-6 bg-secondary-50 dark:bg-secondary-900">
          {children}
        </main>
      </div>
    </div>
  );
};
