import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Home,
  Building,
  TrendingUp,
  Star,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Target,
  AlertCircle
} from 'lucide-react';
import { Button, Card, CardContent, Badge, Input, Modal } from '../components/ui';
import { colors } from '../utils/colors';
import type { Client } from '../types';

// Mock data para perfis de clientes
const mockClients = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 99999-1111',
    address: 'Rua das Flores, 123 - Centro',
    clientType: 'buyer', // buyer, renter, investor
    budget: 500000,
    preferences: {
      propertyType: 'apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: 80,
      neighborhood: 'Centro',
      hasParking: true,
      hasElevator: true
    },
    status: 'active', // active, inactive, converted
    priority: 'high', // high, medium, low
    source: 'website', // website, referral, social, ad
    notes: 'Cliente interessada em apartamentos de 3 quartos no centro. Orçamento até R$ 500.000.',
    lastContact: '2024-01-20T10:30:00Z',
    totalContacts: 15,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao.santos@email.com',
    phone: '(11) 99999-2222',
    address: 'Av. Paulista, 456 - Jardins',
    clientType: 'renter',
    budget: 3000,
    preferences: {
      propertyType: 'house',
      bedrooms: 2,
      bathrooms: 1,
      area: 60,
      neighborhood: 'Jardins',
      hasParking: false,
      hasElevator: false
    },
    status: 'active',
    priority: 'medium',
    source: 'referral',
    notes: 'Procurando casa para alugar próximo ao trabalho. Orçamento até R$ 3.000/mês.',
    lastContact: '2024-01-19T14:15:00Z',
    totalContacts: 8,
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-19T14:15:00Z'
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(11) 99999-3333',
    address: 'Rua Harmonia, 789 - Vila Madalena',
    clientType: 'investor',
    budget: 800000,
    preferences: {
      propertyType: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 70,
      neighborhood: 'Vila Madalena',
      hasParking: true,
      hasElevator: true
    },
    status: 'converted',
    priority: 'high',
    source: 'social',
    notes: 'Investidora experiente. Já comprou 3 imóveis conosco. Interessada em apartamentos para aluguel.',
    lastContact: '2024-01-18T16:45:00Z',
    totalContacts: 25,
    createdAt: '2024-01-05T08:30:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  }
];

const clientTypeConfig = {
  buyer: { label: 'Comprador', color: 'primary', icon: Home },
  renter: { label: 'Locatário', color: 'secondary', icon: Building },
  investor: { label: 'Investidor', color: 'success', icon: TrendingUp }
};

const statusConfig = {
  active: { label: 'Ativo', color: 'success', icon: Target },
  inactive: { label: 'Inativo', color: 'secondary', icon: User },
  converted: { label: 'Convertido', color: 'primary', icon: Star }
};

const priorityConfig = {
  high: { label: 'Alta', color: 'destructive', icon: Star },
  medium: { label: 'Média', color: 'warning', icon: Target },
  low: { label: 'Baixa', color: 'secondary', icon: User }
};

export const ClientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.phone.includes(searchTerm);
    const matchesType = !selectedType || client.clientType === selectedType;
    const matchesStatus = !selectedStatus || client.status === selectedStatus;
    const matchesPriority = !selectedPriority || client.priority === selectedPriority;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const getClientTypeConfig = (type: string) => {
    return clientTypeConfig[type as keyof typeof clientTypeConfig] || clientTypeConfig.buyer;
  };

  const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  };

  const getPriorityConfig = (priority: string) => {
    return priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
  };

  const openClientModal = (client: Client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const getClientStats = () => {
    return mockClients.reduce((acc, client) => {
      acc.total = (acc.total || 0) + 1;
      acc[client.clientType] = (acc[client.clientType] || 0) + 1;
      acc[client.status] = (acc[client.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const stats = getClientStats();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text.title} truncate`}>
            Perfis de Clientes
          </h1>
          <p className={`text-xs sm:text-sm ${colors.text.body}`}>
            Gerencie informações e preferências dos seus clientes
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button className="w-full sm:w-auto">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Novo Cliente</span>
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 sm:pl-10 text-xs sm:text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm"
          >
            <option value="">Todos os tipos</option>
            <option value="buyer">Comprador</option>
            <option value="renter">Locatário</option>
            <option value="investor">Investidor</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm"
          >
            <option value="">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
            <option value="converted">Convertido</option>
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm"
          >
            <option value="">Todas as prioridades</option>
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </select>
          <Button variant="outline" className="text-xs sm:text-sm">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Filtros</span>
            <span className="sm:hidden">Filt.</span>
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Total</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.text.title}`}>{stats.total || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <User className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Compradores</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.money}`}>{stats.buyer || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.money} flex items-center justify-center flex-shrink-0`}>
                <Home className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Locatários</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.info}`}>{stats.renter || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <Building className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Investidores</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.success}`}>{stats.investor || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.success} flex items-center justify-center flex-shrink-0`}>
                <TrendingUp className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Convertidos</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.success}`}>{stats.converted || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.success} flex items-center justify-center flex-shrink-0`}>
                <Star className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredClients.map((client) => {
          const typeConfig = getClientTypeConfig(client.clientType);
          const statusConfig = getStatusConfig(client.status);
          const priorityConfig = getPriorityConfig(client.priority);
          const TypeIcon = typeConfig.icon;
          const StatusIcon = statusConfig.icon;
          const PriorityIcon = priorityConfig.icon;

          return (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-semibold text-sm sm:text-lg ${colors.text.title} truncate`}>
                        {client.name}
                      </h3>
                      <p className={`text-xs sm:text-sm ${colors.text.body} truncate`}>
                        {client.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1 flex-shrink-0">
                    <Badge variant={typeConfig.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} className="text-xs">
                      <TypeIcon className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">{typeConfig.label}</span>
                      <span className="sm:hidden">{typeConfig.label.charAt(0)}</span>
                    </Badge>
                    <Badge variant={statusConfig.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} className="text-xs">
                      <StatusIcon className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">{statusConfig.label}</span>
                      <span className="sm:hidden">{statusConfig.label.charAt(0)}</span>
                    </Badge>
                    <Badge variant={priorityConfig.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} className="text-xs">
                      <PriorityIcon className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">{priorityConfig.label}</span>
                      <span className="sm:hidden">{priorityConfig.label.charAt(0)}</span>
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className={`flex items-center text-xs sm:text-sm ${colors.text.body}`}>
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">{client.phone}</span>
                  </div>

                  <div className={`flex items-center text-xs sm:text-sm ${colors.text.body}`}>
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">{client.address}</span>
                  </div>

                  <div className={`flex items-center text-xs sm:text-sm ${colors.text.body}`}>
                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className={`truncate ${colors.icons.money}`}>
                      Orçamento: {formatCurrency(client.budget)}
                      {client.clientType === 'renter' ? '/mês' : ''}
                    </span>
                  </div>

                  <div className={`flex items-center text-xs sm:text-sm ${colors.text.body}`}>
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">Último contato: {new Date(client.lastContact).toLocaleDateString('pt-BR')}</span>
                  </div>

                  <div className={`flex items-center text-xs sm:text-sm ${colors.text.body}`}>
                    <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">Total de contatos: {client.totalContacts}</span>
                  </div>

                  {client.notes && (
                    <div className={`text-xs sm:text-sm ${colors.text.body} bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-lg`}>
                      <strong>Observações:</strong> {client.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs sm:text-sm"
                    onClick={() => openClientModal(client)}
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Ver Detalhes</span>
                    <span className="sm:hidden">Ver</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs sm:text-sm"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Editar</span>
                    <span className="sm:hidden">Edit.</span>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 text-xs sm:text-sm"
                  >
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Contatar</span>
                    <span className="sm:hidden">Cont.</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        {selectedClient && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-lg sm:text-xl font-bold ${colors.text.title}`}>
                Perfil do Cliente
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
              >
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title} flex items-center`}>
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Informações Pessoais
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    <p><strong>Nome:</strong> {selectedClient.name}</p>
                    <p><strong>Email:</strong> {selectedClient.email}</p>
                    <p><strong>Telefone:</strong> {selectedClient.phone}</p>
                    <p><strong>Endereço:</strong> {selectedClient.address}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title} flex items-center`}>
                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Informações Financeiras
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    <p><strong>Tipo:</strong> {getClientTypeConfig(selectedClient.clientType).label}</p>
                    <p><strong>Orçamento:</strong> 
                      <span className={colors.icons.money}>
                        {formatCurrency(selectedClient.budget)}
                        {selectedClient.clientType === 'renter' ? '/mês' : ''}
                      </span>
                    </p>
                    <p><strong>Prioridade:</strong> {getPriorityConfig(selectedClient.priority).label}</p>
                    <p><strong>Status:</strong> {getStatusConfig(selectedClient.status).label}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title} flex items-center`}>
                    <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Preferências
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    <p><strong>Tipo:</strong> {selectedClient.preferences.propertyType === 'apartment' ? 'Apartamento' : 'Casa'}</p>
                    <p><strong>Quartos:</strong> {selectedClient.preferences.bedrooms}</p>
                    <p><strong>Banheiros:</strong> {selectedClient.preferences.bathrooms}</p>
                    <p><strong>Área:</strong> {selectedClient.preferences.area}m²</p>
                    <p><strong>Bairro:</strong> {selectedClient.preferences.neighborhood}</p>
                    <p><strong>Vaga:</strong> {selectedClient.preferences.hasParking ? 'Sim' : 'Não'}</p>
                    <p><strong>Elevador:</strong> {selectedClient.preferences.hasElevator ? 'Sim' : 'Não'}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title} flex items-center`}>
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Histórico
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    <p><strong>Último contato:</strong> {new Date(selectedClient.lastContact).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Total de contatos:</strong> {selectedClient.totalContacts}</p>
                    <p><strong>Criado em:</strong> {new Date(selectedClient.createdAt).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Atualizado em:</strong> {new Date(selectedClient.updatedAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {selectedClient.notes && (
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title}`}>
                  Observações
                </h4>
                <p className={`text-xs sm:text-sm ${colors.text.subtitle}`}>
                  {selectedClient.notes}
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              <Button className="text-xs sm:text-sm">
                <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Editar Cliente
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
