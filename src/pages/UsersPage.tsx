import React, { useState } from 'react';
import { 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Phone,
  Calendar,
  User as UserIcon,
  Shield,
  CheckCircle,
  Key
} from 'lucide-react';
import { mockUsers } from '../utils/mockData';
import { formatDate } from '../utils';
import { Button, Card, CardContent, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import { usePermissions } from '../hooks/usePermissions';

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { hasPermission } = usePermissions();

  // Filtros
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesStatus = !selectedStatus || (selectedStatus === 'active' ? user.isActive : !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string): 'default' | 'success' | 'destructive' | 'primary' | 'warning' | 'secondary' | 'outline' => {
    switch (role) {
      case 'owner': return 'destructive';
      case 'manager': return 'warning';
      case 'agent': return 'primary';
      case 'financial': return 'success';
      case 'hr': return 'default';
      default: return 'default';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'owner': return 'Proprietário';
      case 'manager': return 'Gestor';
      case 'agent': return 'Corretor';
      case 'financial': return 'Financeiro';
      case 'hr': return 'RH';
      default: return role;
    }
  };

  const getStatusColor = (isActive: boolean): 'default' | 'success' | 'destructive' | 'primary' | 'warning' | 'secondary' | 'outline' => {
    return isActive ? 'success' : 'destructive';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Ativo' : 'Inativo';
  };

  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const openUserPermissions = (userId: string) => {
    navigate(`/users/${userId}/permissions`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Usuários & Perfis
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Gestão de usuários e permissões
          </p>
        </div>
        <ConditionalMenu requiredPermission="users">
          <Button className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 dark:text-white" />
            <span className="hidden sm:inline">Novo Usuário</span>
            <span className="sm:hidden">Novo</span>
          </Button>
        </ConditionalMenu>
      </div>

      {/* Filtros */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os perfis</option>
              <option value="owner">Proprietário</option>
              <option value="manager">Gestor</option>
              <option value="agent">Corretor</option>
              <option value="financial">Financeiro</option>
              <option value="hr">RH</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4 dark:text-white" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">Total de Usuários</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">{mockUsers.length}</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">Ativos</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {mockUsers.filter(u => u.isActive).length}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">Gestores</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  {mockUsers.filter(u => u.role === 'manager').length}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">Corretores</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {mockUsers.filter(u => u.role === 'agent').length}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Usuários */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg dark:text-white truncate">{user.name}</h3>
                    <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openUserModal(user)}
                    className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 dark:text-white" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 dark:text-white" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2 dark:text-white flex-shrink-0" />
                  <span className="truncate">{user.phone}</span>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={getRoleColor(user.role)} className="text-xs">
                    {getRoleText(user.role)}
                  </Badge>
                  <Badge variant={getStatusColor(user.isActive)} className="text-xs">
                    {getStatusText(user.isActive)}
                  </Badge>
                </div>
                
                <div className="flex items-center text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 dark:text-white flex-shrink-0" />
                  <span className="truncate">Criado em {formatDate(user.createdAt)}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm">
                  <Key className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 dark:text-white" />
                  <span className="hidden sm:inline">Senha</span>
                  <span className="sm:hidden">Senha</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs sm:text-sm"
                  onClick={() => openUserPermissions(user.id)}
                >
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 dark:text-white" />
                  <span className="hidden sm:inline">Permissões</span>
                  <span className="sm:hidden">Perm.</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        {selectedUser && (
          <div className="flex flex-col h-full">
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
              {/* Header Personalizado do Modal */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Detalhes do Usuário
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
             
              {/* Header do Modal */}
              <div className="flex items-center space-x-3 sm:space-x-4 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 truncate">{selectedUser.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={getRoleColor(selectedUser.role)} className="text-xs">
                      {getRoleText(selectedUser.role)}
                    </Badge>
                    <Badge variant={getStatusColor(selectedUser.isActive)} className="text-xs">
                      {getStatusText(selectedUser.isActive)}
                    </Badge>
                  </div>
                </div>
              </div>
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center">
                    <UserIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Informações Pessoais
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Nome:</strong> {selectedUser.name}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Telefone:</strong> {selectedUser.phone}</p>
                    <p><strong>Perfil:</strong> {getRoleText(selectedUser.role)}</p>
                    <p><strong>Status:</strong> {getStatusText(selectedUser.isActive)}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center">
                    <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Informações do Sistema
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>ID:</strong> {selectedUser.id}</p>
                    <p><strong>Criado em:</strong> {formatDate(selectedUser.createdAt)}</p>
                    <p><strong>Atualizado em:</strong> {formatDate(selectedUser.updatedAt)}</p>
                  </div>
                </div>
              </div>
            
              {/* Permissões */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Permissões do Perfil
                </h4>
                <div className="space-y-2">
                  {selectedUser.role === 'owner' && (
                    <div className="p-2 sm:p-3 bg-danger-50 dark:bg-danger-900/20 rounded-lg">
                      <p className="text-xs sm:text-sm font-medium text-danger-800 dark:text-danger-200">Proprietário</p>
                      <p className="text-xs text-danger-600 dark:text-danger-300">Acesso completo a todos os módulos</p>
                    </div>
                  )}
                  
                  {selectedUser.role === 'manager' && (
                    <div className="p-2 sm:p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                      <p className="text-xs sm:text-sm font-medium text-warning-800 dark:text-warning-200">Gestor</p>
                      <p className="text-xs text-warning-600 dark:text-warning-300">Gerenciamento de imóveis, leads e equipe</p>
                    </div>
                  )}
                  
                  {selectedUser.role === 'agent' && (
                    <div className="p-2 sm:p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      <p className="text-xs sm:text-sm font-medium text-primary-800 dark:text-primary-200">Corretor</p>
                      <p className="text-xs text-primary-600 dark:text-primary-300">Carteira de imóveis e CRM simplificado</p>
                    </div>
                  )}
                  
                  {selectedUser.role === 'financial' && (
                    <div className="p-2 sm:p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
                      <p className="text-xs sm:text-sm font-medium text-success-800 dark:text-success-200">Financeiro</p>
                      <p className="text-xs text-success-600 dark:text-success-300">Controle financeiro e comissões</p>
                    </div>
                  )}
                  
                  {selectedUser.role === 'hr' && (
                    <div className="p-2 sm:p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
                      <p className="text-xs sm:text-sm font-medium text-secondary-800 dark:text-secondary-200">RH</p>
                      <p className="text-xs text-secondary-600 dark:text-secondary-300">Gestão de colaboradores</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
            </div>
          </div>
        )}
      </Modal>
     </div>
   );
 };
