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
  User,
  Shield,
  CheckCircle,
  Key
} from 'lucide-react';
import { mockUsers } from '../utils/mockData';
import { formatDate } from '../utils';
import { Button, Card, CardContent, Badge, Input, Modal } from '../components/ui';
import { useNavigate } from 'react-router-dom';

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Filtros
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesStatus = !selectedStatus || (selectedStatus === 'active' ? user.isActive : !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'danger';
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

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'danger';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Ativo' : 'Inativo';
  };

  const openUserModal = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const openUserPermissions = (userId: string) => {
    navigate(`/users/${userId}/permissions`);
  };

  return (
    <div className="space-y-6">
             {/* Header */}
       <div className="flex items-center justify-between">
         <div>
           <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
             Usuários & Perfis
           </h1>
           <p className="text-secondary-600 dark:text-secondary-400">
             Gestão de usuários e permissões
           </p>
         </div>
         <Button>
           <Plus className="h-4 w-4 mr-2 dark:text-white" />
           Novo Usuário
         </Button>
       </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
            
                         <Button variant="outline" className="flex items-center">
               <Filter className="h-4 w-4 mr-2 dark:text-white" />
               Mais Filtros
             </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Total de Usuários</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-white">{mockUsers.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Ativos</p>
                <p className="text-2xl font-bold text-success-600 dark:text-white">
                  {mockUsers.filter(u => u.isActive).length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Gestores</p>
                <p className="text-2xl font-bold text-warning-600 dark:text-white">
                  {mockUsers.filter(u => u.role === 'manager').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Corretores</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-white">
                  {mockUsers.filter(u => u.role === 'agent').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Usuários */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600 dark:text-white" />
                  </div>
                  <div>
                                         <h3 className="font-semibold text-lg dark:text-white">{user.name}</h3>
                                         <p className="text-sm text-secondary-600 dark:text-secondary-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                                     <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => openUserModal(user)}
                   >
                     <Eye className="h-4 w-4 dark:text-white" />
                   </Button>
                   <Button
                     variant="ghost"
                     size="sm"
                   >
                     <Edit className="h-4 w-4 dark:text-white" />
                   </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                                 <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                   <Phone className="h-4 w-4 mr-2 dark:text-white" />
                   <span>{user.phone}</span>
                 </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant={getRoleColor(user.role) as any}>
                    {getRoleText(user.role)}
                  </Badge>
                  <Badge variant={getStatusColor(user.isActive) as any}>
                    {getStatusText(user.isActive)}
                  </Badge>
                </div>
                
                                 <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                   <Calendar className="h-4 w-4 mr-2 dark:text-white" />
                   <span>Criado em {formatDate(user.createdAt)}</span>
                 </div>
              </div>
              
                                                          <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                 <Button variant="outline" size="sm" className="flex-1">
                   <Key className="h-4 w-4 mr-2 dark:text-white" />
                   Senha
                 </Button>
                 <Button 
                   variant="outline" 
                   size="sm" 
                   className="flex-1"
                   onClick={() => openUserPermissions(user.id)}
                 >
                   <Shield className="h-4 w-4 mr-2 dark:text-white" />
                   Permissões
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
           <div className="space-y-6">
             {/* Header Personalizado do Modal */}
             <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
               <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                 Detalhes do Usuário
               </h2>
               <button
                 onClick={() => setShowModal(false)}
                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
               >
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
             </div>
             
             {/* Header do Modal */}
             {/* Header do Modal */}
             <div className="flex items-center space-x-4 pb-4 border-b border-gray-200 dark:border-gray-700">
               <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                 <User className="h-8 w-8 text-white" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{selectedUser.name}</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400">{selectedUser.email}</p>
                 <div className="flex items-center space-x-2 mt-1">
                   <Badge variant={getRoleColor(selectedUser.role) as any}>
                     {getRoleText(selectedUser.role)}
                   </Badge>
                   <Badge variant={getStatusColor(selectedUser.isActive) as any}>
                     {getStatusText(selectedUser.isActive)}
                   </Badge>
                 </div>
               </div>
             </div>
                         {/* Informações Básicas */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                 <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center">
                   <User className="h-4 w-4 mr-2" />
                   Informações Pessoais
                 </h4>
                 <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                   <p><strong>Nome:</strong> {selectedUser.name}</p>
                   <p><strong>Email:</strong> {selectedUser.email}</p>
                   <p><strong>Telefone:</strong> {selectedUser.phone}</p>
                   <p><strong>Perfil:</strong> {getRoleText(selectedUser.role)}</p>
                   <p><strong>Status:</strong> {getStatusText(selectedUser.isActive)}</p>
                 </div>
               </div>
               
               <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                 <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center">
                   <Settings className="h-4 w-4 mr-2" />
                   Informações do Sistema
                 </h4>
                 <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                   <p><strong>ID:</strong> {selectedUser.id}</p>
                   <p><strong>Criado em:</strong> {formatDate(selectedUser.createdAt)}</p>
                   <p><strong>Atualizado em:</strong> {formatDate(selectedUser.updatedAt)}</p>
                 </div>
               </div>
             </div>
            
                         {/* Permissões */}
             <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
               <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center">
                 <Shield className="h-4 w-4 mr-2" />
                 Permissões do Perfil
               </h4>
               <div className="space-y-2">
                {selectedUser.role === 'owner' && (
                  <div className="p-3 bg-danger-50 dark:bg-danger-900/20 rounded-lg">
                    <p className="text-sm font-medium text-danger-800 dark:text-danger-200">Proprietário</p>
                    <p className="text-xs text-danger-600 dark:text-danger-300">Acesso completo a todos os módulos</p>
                  </div>
                )}
                
                {selectedUser.role === 'manager' && (
                  <div className="p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                    <p className="text-sm font-medium text-warning-800 dark:text-warning-200">Gestor</p>
                    <p className="text-xs text-warning-600 dark:text-warning-300">Gerenciamento de imóveis, leads e equipe</p>
                  </div>
                )}
                
                {selectedUser.role === 'agent' && (
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <p className="text-sm font-medium text-primary-800 dark:text-primary-200">Corretor</p>
                    <p className="text-xs text-primary-600 dark:text-primary-300">Carteira de imóveis e CRM simplificado</p>
                  </div>
                )}
                
                {selectedUser.role === 'financial' && (
                  <div className="p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
                    <p className="text-sm font-medium text-success-800 dark:text-success-200">Financeiro</p>
                    <p className="text-xs text-success-600 dark:text-success-300">Controle financeiro e comissões</p>
                  </div>
                )}
                
                                 {selectedUser.role === 'hr' && (
                   <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
                     <p className="text-sm font-medium text-secondary-800 dark:text-secondary-200">RH</p>
                     <p className="text-xs text-secondary-600 dark:text-secondary-300">Gestão de colaboradores</p>
                   </div>
                 )}
              </div>
            </div>
            
                         {/* Ações */}
             <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
               <Button variant="outline" onClick={() => setShowModal(false)}>
                 Fechar
               </Button>
             </div>
           </div>
         )}
       </Modal>
     </div>
   );
 };
