import React, { useState, useEffect } from 'react';
import { Shield, Check, X, Save, User } from 'lucide-react';
import { Modal, Button, Badge } from '../ui';
import { ROLE_PERMISSIONS } from '../../types/permissions';
import type { UserRole, ModulePermissions } from '../../types/permissions';

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSave: (userId: string, permissions: ModulePermissions) => void;
}

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

export const PermissionsModal: React.FC<PermissionsModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const [permissions, setPermissions] = useState<ModulePermissions>({} as ModulePermissions);
  const [selectedRole, setSelectedRole] = useState<UserRole>(user?.role || 'agent');

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role);
      setPermissions(ROLE_PERMISSIONS[user.role]);
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

  const handleSave = () => {
    onSave(user.id, permissions);
    onClose();
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

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configurar Permissões"
      size="xl"
    >
      <div className="space-y-6">
        {/* Header do Usuário */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Seleção de Perfil */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Perfil do Usuário</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {(['owner', 'manager', 'agent', 'financial', 'hr'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedRole === role
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
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
        </div>

        {/* Lista de Permissões */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Permissões Detalhadas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {(Object.keys(permissions) as Array<keyof ModulePermissions>).map((module) => (
              <div
                key={module}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  permissions[module]
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
                onClick={() => togglePermission(module)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900 dark:text-gray-100">
                    {moduleLabels[module]}
                  </h5>
                  <div className="flex items-center space-x-2">
                    {permissions[module] ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {moduleDescriptions[module]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Resumo das Permissões</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 dark:text-blue-300">Total de módulos:</span>
              <span className="font-medium">{Object.keys(permissions).length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-700 dark:text-green-300">Permitidos:</span>
              <span className="font-medium text-green-600">
                {Object.values(permissions).filter(Boolean).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-700 dark:text-red-300">Negados:</span>
              <span className="font-medium text-red-600">
                {Object.values(permissions).filter(p => !p).length}
              </span>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Permissões
          </Button>
        </div>
      </div>
    </Modal>
  );
};
