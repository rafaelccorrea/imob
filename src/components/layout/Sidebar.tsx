import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../ui/utils';
import { 
  Home, 
  Building2, 
  Users, 
  FileText, 
  DollarSign, 
  UserCheck, 
  Settings, 
  X, 
  User, 
  ChevronDown, 
  ChevronRight,
  Calendar,
  BarChart3,
  Key,
  UserPlus,
  MessageSquare,
  Calculator,
  Target,
  LogOut,
  GraduationCap,
  CreditCard,
  Clock3,
  Receipt,
  Scale,
  TrendingUp,
  Building,
  FileSpreadsheet,
  Presentation,
  Plus,
  Layout,
  Plug,
  Crown,
  Database,
  Shield,
  Bell,
  TrendingUp as SalesAnalysis,
  Trophy,
  Camera,
  Map
} from 'lucide-react';
import { useAuthStore, useUIStore } from '../../stores';
import { usePermissions } from '../../hooks/usePermissions';
import logo from '../../assets/uniao-imobiliaria-logo.png';


interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  roles: string[];
  subItems?: SidebarSubItem[];
  children?: SidebarSubItem[];
}

interface SidebarSubItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  roles: string[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'Administração',
    items: [
      {
        label: 'Administração',
        icon: Crown,
        href: '/owner-dashboard',
        roles: ['admin', 'owner'],
        subItems: [
          {
            label: 'Dashboard Executivo',
            icon: Crown,
            href: '/owner-dashboard',
            roles: ['admin', 'owner'],
          },
          {
            label: 'Relatórios Executivos',
            icon: BarChart3,
            href: '/executive-reports',
            roles: ['admin', 'owner'],
          },
          {
            label: 'Gestão de Franquias',
            icon: Building2,
            href: '/franchise-management',
            roles: ['admin', 'owner'],
          },
          {
            label: 'Alertas e Notificações',
            icon: Bell,
            href: '/alerts-notifications',
            roles: ['admin', 'owner'],
          },
          {
            label: 'Análise de Vendas',
            icon: SalesAnalysis,
            href: '/sales-analysis',
            roles: ['admin', 'owner'],
          },
          {
            label: 'Ranking de Agentes',
            icon: Trophy,
            href: '/agents-ranking',
            roles: ['admin', 'owner'],
          },
        ],
      },
      {
        label: 'Sistema',
        icon: Settings,
        href: '/data-management',
        roles: ['admin', 'owner'],
        subItems: [
          {
            label: 'Gerenciamento de Dados',
            icon: Database,
            href: '/data-management',
            roles: ['admin', 'owner'],
          },
          {
            label: 'Logs de Auditoria',
            icon: Shield,
            href: '/audit-logs',
            roles: ['admin', 'owner'],
          },
          {
            label: 'Configurações',
            icon: Settings,
            href: '/settings',
            roles: ['admin', 'owner'],
          },
        ],
      },
    ],
  },
  {
    title: 'Principal',
    items: [
      {
        label: 'Dashboard',
        icon: Home,
        href: '/dashboard',
        roles: ['owner', 'manager', 'agent', 'financial', 'hr'],
        subItems: [
          {
            label: 'Visão Geral',
            icon: Home,
            href: '/dashboard',
            roles: ['owner', 'agent', 'financial', 'hr'],
          },
          {
            label: 'Dashboard Gerencial',
            icon: BarChart3,
            href: '/manager-dashboard',
            roles: ['manager'],
          },
        ],
      },
      {
        label: 'Apresentações',
        icon: Presentation,
        href: '/presentations',
        roles: ['admin', 'owner', 'manager'],
        subItems: [
          {
            label: 'Criar Apresentação',
            icon: Plus,
            href: '/presentations',
            roles: ['admin', 'owner', 'manager'],
          },
          {
            label: 'Templates',
            icon: Layout,
            href: '/presentations?tab=templates',
            roles: ['admin', 'owner', 'manager'],
          },
          {
            label: 'Minhas Apresentações',
            icon: FileText,
            href: '/presentations?tab=presentations',
            roles: ['admin', 'owner', 'manager'],
          },
        ],
      },
      {
        label: 'Equipes',
        icon: Users,
        href: '/teams',
        roles: ['admin', 'manager'],
        subItems: [
          {
            label: 'Gestão de Equipes',
            icon: Users,
            href: '/teams',
            roles: ['admin', 'manager'],
          },
          {
            label: 'Performance',
            icon: TrendingUp,
            href: '/teams?tab=performance',
            roles: ['admin', 'manager'],
          },
          {
            label: 'Atribuições',
            icon: UserCheck,
            href: '/teams?tab=assignments',
            roles: ['admin', 'manager'],
          },
        ],
      },
    ],
  },
  {
    title: 'Vendas & Imóveis',
    items: [
      {
        label: 'Imóveis',
        icon: Building2,
        href: '/properties',
        roles: ['admin', 'owner', 'manager', 'agent'],
        subItems: [
          {
            label: 'Todos os Imóveis',
            icon: Building2,
            href: '/properties',
            roles: ['admin', 'owner', 'manager', 'agent'],
          },
          {
            label: 'Controle de Chaves',
            icon: Key,
            href: '/keys',
            roles: ['admin', 'owner', 'manager', 'agent'],
          },
          {
            label: 'Galeria de Fotos',
            icon: Camera,
            href: '/property-gallery',
            roles: ['admin', 'owner', 'manager', 'agent'],
          },
          {
            label: 'Mapa de Imóveis',
            icon: Map,
            href: '/property-map',
            roles: ['admin', 'owner', 'manager', 'agent'],
          },
        ],
      },
      {
        label: 'Clientes',
        icon: UserPlus,
        href: '/clients',
        roles: ['admin', 'owner', 'manager', 'agent'],
        subItems: [
          {
            label: 'Perfis de Clientes',
            icon: UserPlus,
            href: '/clients',
            roles: ['admin', 'owner', 'manager', 'agent'],
          },
          {
            label: 'Histórico de Contatos',
            icon: MessageSquare,
            href: '/contacts',
            roles: ['admin', 'owner', 'manager', 'agent'],
          },
          {
            label: 'Leads',
            icon: Users,
            href: '/leads',
            roles: ['admin', 'owner', 'manager', 'agent'],
          },
        ],
      },
      {
        label: 'Vendas & Locações',
        icon: FileText,
        href: '/deals',
        roles: ['admin', 'owner', 'manager', 'agent', 'financial'],
        subItems: [
          {
            label: 'Negociações',
            icon: FileText,
            href: '/deals',
            roles: ['admin', 'owner', 'manager', 'agent', 'financial'],
          },
          {
            label: 'Visitas',
            icon: Calendar,
            href: '/visits',
            roles: ['admin', 'owner', 'manager', 'agent'],
          },
          {
            label: 'Gestão de Visitas',
            icon: Calendar,
            href: '/visits-management',
            roles: ['admin', 'owner', 'manager', 'agent'],
          },
          {
            label: 'Calculadora de Comissões',
            icon: Calculator,
            href: '/commission-calculator',
            roles: ['admin', 'owner', 'manager', 'agent'],
          },
          {
            label: 'Calculadora de Financiamento',
            icon: Calculator,
            href: '/financing-calculator',
            roles: ['admin', 'agent'],
          },
          {
            label: 'Metas & Gamificação',
            icon: Target,
            href: '/goals-gamification',
            roles: ['admin', 'owner', 'manager', 'agent'],
          },
        ],
      },
    ],
  },
  {
    title: 'Gestão & Documentos',
    items: [
      {
        label: 'Documentos',
        icon: FileText,
        href: '/documents',
        roles: ['admin', 'owner', 'manager', 'agent', 'financial'],
      },
      {
        label: 'Relatórios',
        icon: BarChart3,
        href: '/reports',
        roles: ['admin', 'owner', 'manager', 'financial'],
      },
    ],
  },
  {
    title: 'Financeiro',
    items: [
      {
        label: 'Financeiro',
        icon: DollarSign,
        href: '/financial',
        roles: ['admin', 'owner', 'financial'],
        subItems: [
          {
            label: 'Visão Geral',
            icon: DollarSign,
            href: '/financial',
            roles: ['admin', 'owner', 'financial'],
          },
          {
            label: 'Contas a Pagar',
            icon: CreditCard,
            href: '/accounts-payable',
            roles: ['admin', 'owner', 'financial'],
          },
          {
            label: 'Contas a Receber',
            icon: Receipt,
            href: '/accounts-receivable',
            roles: ['admin', 'owner', 'financial'],
          },
          {
            label: 'Orçamento',
            icon: Calculator,
            href: '/budget',
            roles: ['admin', 'owner', 'financial'],
          },
          {
            label: 'Relatórios',
            icon: FileSpreadsheet,
            href: '/financial-reports',
            roles: ['admin', 'owner', 'financial'],
          },
          {
            label: 'Patrimônio',
            icon: Building,
            href: '/assets',
            roles: ['admin', 'owner', 'financial'],
          },
          {
            label: 'Investimentos',
            icon: TrendingUp,
            href: '/investments',
            roles: ['admin', 'owner', 'financial'],
          },
          {
            label: 'Impostos',
            icon: Scale,
            href: '/taxes',
            roles: ['admin', 'owner', 'financial'],
          },
        ],
      },
      {
        label: 'RH',
        icon: UserCheck,
        href: '/hr',
        roles: ['admin', 'owner', 'hr'],
        subItems: [
          {
            label: 'Colaboradores',
            icon: Users,
            href: '/employees',
            roles: ['admin', 'owner', 'hr'],
          },
          {
            label: 'Recrutamento',
            icon: UserPlus,
            href: '/recruitment',
            roles: ['admin', 'owner', 'hr'],
          },
          {
            label: 'Performance',
            icon: Target,
            href: '/performance',
            roles: ['admin', 'owner', 'hr'],
          },
          {
            label: 'Treinamentos',
            icon: GraduationCap,
            href: '/training',
            roles: ['admin', 'owner', 'hr'],
          },
          {
            label: 'Folha de Pagamento',
            icon: CreditCard,
            href: '/payroll',
            roles: ['admin', 'owner', 'hr'],
          },
          {
            label: 'Controle de Tempo',
            icon: Clock3,
            href: '/time-tracking',
            roles: ['admin', 'owner', 'hr'],
          },
        ],
      },
      {
        label: 'Usuários',
        icon: User,
        href: '/users',
        roles: ['admin', 'owner', 'manager', 'hr'],
      },
      {
        label: 'Integrações',
        icon: Plug,
        href: '/integrations',
        roles: ['admin', 'owner', 'manager'],
      },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { getRoleName } = usePermissions();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemLabel: string) => {
    setExpandedItems(prev => 
      prev.includes(itemLabel) 
        ? prev.filter(label => label !== itemLabel)
        : [...prev, itemLabel]
    );
  };

  const isItemExpanded = (itemLabel: string) => {
    return expandedItems.includes(itemLabel);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const isSubItemActive = (subItemHref: string) => {
    const currentPath = location.pathname;
    const currentSearch = location.search;
    
    // If subItem has query parameters, check both path and search
    if (subItemHref.includes('?')) {
      const [path, search] = subItemHref.split('?');
      return currentPath === path && currentSearch === `?${search}`;
    }
    
    // If no query parameters, just check path
    return currentPath === subItemHref;
  };

  const hasActiveSubItem = (subItems: SidebarSubItem[]) => {
    return subItems.some(subItem => isSubItemActive(subItem.href));
  };

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
        'fixed left-0 top-0 z-50 h-full w-64 sm:w-72 lg:w-64 transform bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4">
            <div className="flex items-center justify-center flex-1">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav 
            className="flex-1 overflow-y-auto py-3 sidebar-scroll"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#6366f1 transparent'
            }}
          >
            <div className="space-y-3 px-2">
              {sidebarSections.map((section) => {
                const filteredItems = section.items.filter(item => 
                  item.roles.includes(user?.role || '')
                );

                if (filteredItems.length === 0) return null;

                return (
                  <div key={section.title}>
                    <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {filteredItems.map((item) => {
                        const subItems = item.subItems || item.children || [];
                        const hasSubItems = subItems.length > 0;
                        const isExpanded = isItemExpanded(item.label);
                        const hasActiveChild = hasSubItems && hasActiveSubItem(subItems);

                        return (
                          <div key={item.label}>
                            {hasSubItems ? (
                              <button
                                onClick={() => toggleExpanded(item.label)}
                                className={cn(
                                  "w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors",
                                  hasActiveChild
                                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                )}
                              >
                                <div className="flex items-center">
                                  <item.icon className="mr-3 h-5 w-5" />
                                  {item.label}
                                </div>
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </button>
                            ) : (
                              <Link
                                to={item.href!}
                                className={cn(
                                  "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                                  isActive(item.href!)
                                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                )}
                                onClick={() => {
                                  if (window.innerWidth < 1024) {
                                    toggleSidebar();
                                  }
                                }}
                              >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                              </Link>
                            )}
                            
                            {hasSubItems && isExpanded && (
                              <div className="ml-6 mt-1 space-y-1">
                                {subItems
                                  .filter(subItem => subItem.roles.includes(user?.role || ''))
                                  .map((subItem) => (
                                    <Link
                                      key={subItem.label}
                                      to={subItem.href}
                                      className={cn(
                                        "flex items-center px-2 py-2 text-sm rounded-md transition-colors",
                                        isSubItemActive(subItem.href)
                                          ? "bg-primary-50 text-primary-600 dark:bg-primary-900/10 dark:text-primary-400"
                                          : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                                      )}
                                      onClick={() => {
                                        if (window.innerWidth < 1024) {
                                          toggleSidebar();
                                        }
                                      }}
                                    >
                                      <subItem.icon className="mr-3 h-4 w-4" />
                                      {subItem.label}
                                    </Link>
                                  ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* User info */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.role && getRoleName(user.role)}
                </p>
              </div>
            </div>
            
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-2 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
