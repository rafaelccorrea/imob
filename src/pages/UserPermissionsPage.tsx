import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Check, 
  X, 
  Save, 
  User, 
  ArrowLeft,
  Settings,
  Building,
  FileText,
  BarChart3,
  DollarSign,
  Target,
  FolderOpen,
  Users,
  Calendar,
  Key,
  MessageSquare
} from 'lucide-react';
import { mockUsers } from '../utils/mockData';
import { Button, Card, CardContent, Badge } from '../components/ui';
import { ROLE_PERMISSIONS } from '../types/permissions';
import type { UserRole, ModulePermissions } from '../types/permissions';

const moduleLabels = {
  dashboard: 'Dashboard',
  properties: 'Imóveis',
  leads: 'Leads',
  deals: 'Negociações',
  visits: 'Visitas',
  financial: 'Financeiro',
  hr: 'RH',
  users: 'Usuários',
  settings: 'Configurações',
  reports: 'Relatórios',
  documents: 'Documentos',
  keys: 'Chaves',
  clients: 'Clientes',
  contacts: 'Contatos',
};

const moduleIcons = {
  dashboard: BarChart3,
  properties: Building,
  leads: Users,
  deals: Target,
  visits: Calendar,
  financial: DollarSign,
  hr: Users,
  users: Users,
  settings: Settings,
  reports: FileText,
  documents: FolderOpen,
  keys: Key,
  clients: Users,
  contacts: MessageSquare,
};

const moduleDescriptions = {
  dashboard: 'Visualizar dashboard principal',
  properties: 'Gerenciar portfólio de imóveis',
  leads: 'Gerenciar leads e clientes',
  deals: 'Acompanhar negociações',
  visits: 'Agendar e gerenciar visitas',
  financial: 'Controle financeiro',
  hr: 'Gestão de recursos humanos',
  users: 'Gerenciar usuários do sistema',
  settings: 'Configurações do sistema',
  reports: 'Gerar relatórios',
  documents: 'Documentos e contratos',
  keys: 'Controle de chaves dos imóveis',
  clients: 'Gerenciar perfis de clientes',
  contacts: 'Histórico de contatos',
};

export const UserPermissionsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('agent');
  const [permissions, setPermissions] = useState<ModulePermissions>({} as ModulePermissions);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Buscar usuário pelos dados mock
  const user = mockUsers.find(u => u.id === userId);

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role as UserRole);
      setPermissions(ROLE_PERMISSIONS[user.role as UserRole]);
    }
  }, [user]);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setPermissions(ROLE_PERMISSIONS[role]);
  };

  const togglePermission = (module: keyof ModulePermissions) => {
    setPermissions(prev => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  const handleSavePermissions = () => {
    // Aqui você implementaria a lógica para salvar as permissões
    console.log('Salvando permissões para usuário:', user?.id, permissions);
    setShowSaveModal(true);
    setTimeout(() => {
      setShowSaveModal(false);
      navigate('/users');
    }, 2000);
  };

  const getRoleColor = (role: UserRole): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' => {
    switch (role) {
      case 'owner': return 'destructive';
      case 'manager': return 'warning';
      case 'agent': return 'primary';
      case 'financial': return 'success';
      case 'hr': return 'default';
      default: return 'default';
    }
  };

  const getRoleText = (role: UserRole) => {
    switch (role) {
      case 'owner': return 'Proprietário';
      case 'manager': return 'Gestor';
      case 'agent': return 'Corretor';
      case 'financial': return 'Financeiro';
      case 'hr': return 'RH';
      default: return role;
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Usuário não encontrado
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            O usuário que você está procurando não existe.
          </p>
          <Button onClick={() => navigate('/users')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Usuários
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">
            Configurar Permissões
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Defina as permissões de acesso para {user.name}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/users')} className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Voltar</span>
          <span className="sm:hidden">Voltar</span>
        </Button>
      </div>

      {/* Informações do Usuário */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">{user.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant={getRoleColor(user.role as UserRole)} className="text-xs">
                  {getRoleText(user.role as UserRole)}
                </Badge>
                <Badge variant={user.isActive ? 'success' : 'destructive'} className="text-xs">
                  {user.isActive ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seleção de Perfil */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Perfil do Usuário</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {(['owner', 'manager', 'agent', 'financial', 'hr'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                  selectedRole === role
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Badge variant={getRoleColor(role)} className="mb-2 text-xs">
                  {getRoleText(role)}
                </Badge>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {Object.values(ROLE_PERMISSIONS[role]).filter(Boolean).length} permissões
                </p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Permissões */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center mb-3 sm:mb-4">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Permissões Detalhadas
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-h-96 overflow-y-auto">
            {(Object.keys(permissions) as Array<keyof ModulePermissions>).map((module) => {
              const IconComponent = moduleIcons[module] || Settings; // Fallback para Settings se não encontrar
              return (
                <div
                  key={module}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    permissions[module]
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => togglePermission(module)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                      <h5 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100 truncate">
                        {moduleLabels[module] || module}
                      </h5>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {permissions[module] ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {moduleDescriptions[module] || `Módulo ${module}`}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resumo */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <h4 className="font-semibold text-sm sm:text-base text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">Resumo das Permissões</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 dark:text-blue-300">Total de módulos:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{Object.keys(permissions).length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-700 dark:text-green-300">Permitidos:</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                {Object.values(permissions).filter(Boolean).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-700 dark:text-red-300">Negados:</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                {Object.values(permissions).filter(p => !p).length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
        <Button variant="outline" onClick={() => navigate('/users')} className="w-full sm:w-auto text-xs sm:text-sm">
          Cancelar
        </Button>
        <Button onClick={handleSavePermissions} className="w-full sm:w-auto text-xs sm:text-sm">
          <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Salvar Permissões</span>
          <span className="sm:hidden">Salvar</span>
        </Button>
      </div>

      {/* Modal de Confirmação */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 text-center max-w-md w-full mx-4">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Permissões Atualizadas!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              As permissões foram salvas com sucesso para {user.name}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
