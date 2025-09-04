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
  Bell,
  Target,
  GraduationCap,
  FolderOpen,
  Users
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
  financial: 'Financeiro',
  hr: 'RH',
  users: 'Usuários',
  settings: 'Configurações',
  reports: 'Relatórios',
  analytics: 'Analytics',
  commissions: 'Comissões',
  marketing: 'Marketing',
  training: 'Treinamento',
  documents: 'Documentos',
  notifications: 'Notificações',
};

const moduleIcons = {
  dashboard: BarChart3,
  properties: Building,
  leads: Users,
  deals: Target,
  financial: DollarSign,
  hr: Users,
  users: Users,
  settings: Settings,
  reports: FileText,
  analytics: BarChart3,
  commissions: DollarSign,
  marketing: Target,
  training: GraduationCap,
  documents: FolderOpen,
  notifications: Bell,
};

const moduleDescriptions = {
  dashboard: 'Visualizar dashboard principal',
  properties: 'Gerenciar portfólio de imóveis',
  leads: 'Gerenciar leads e clientes',
  deals: 'Acompanhar negociações',
  financial: 'Controle financeiro',
  hr: 'Gestão de recursos humanos',
  users: 'Gerenciar usuários do sistema',
  settings: 'Configurações do sistema',
  reports: 'Gerar relatórios',
  analytics: 'Análises e métricas',
  commissions: 'Controle de comissões',
  marketing: 'Campanhas de marketing',
  training: 'Gestão de treinamentos',
  documents: 'Documentos e contratos',
  notifications: 'Sistema de notificações',
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

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'owner': return 'danger';
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Configurar Permissões
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Defina as permissões de acesso para {user.name}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/users')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      {/* Informações do Usuário */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
              <User className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                             <div className="flex items-center space-x-2 mt-2">
                 <Badge variant={getRoleColor(user.role as UserRole) as any}>
                   {getRoleText(user.role as UserRole)}
                 </Badge>
                 <Badge variant={user.isActive ? 'success' : 'destructive'}>
                   {user.isActive ? 'Ativo' : 'Inativo'}
                 </Badge>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seleção de Perfil */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Perfil do Usuário</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(['owner', 'manager', 'agent', 'financial', 'hr'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRole === role
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Badge variant={getRoleColor(role) as any} className="mb-2">
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
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center mb-4">
            <Shield className="h-5 w-5 mr-2" />
            Permissões Detalhadas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {(Object.keys(permissions) as Array<keyof ModulePermissions>).map((module) => {
              const IconComponent = moduleIcons[module];
              return (
                <div
                  key={module}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    permissions[module]
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => togglePermission(module)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <h5 className="font-medium text-gray-900 dark:text-gray-100">
                        {moduleLabels[module]}
                      </h5>
                    </div>
                    <div className="flex items-center space-x-2">
                      {permissions[module] ? (
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {moduleDescriptions[module]}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resumo */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Resumo das Permissões</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
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
      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={() => navigate('/users')}>
          Cancelar
        </Button>
        <Button onClick={handleSavePermissions}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Permissões
        </Button>
      </div>

      {/* Modal de Confirmação */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center max-w-md mx-4">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Permissões Atualizadas!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              As permissões foram salvas com sucesso para {user.name}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
