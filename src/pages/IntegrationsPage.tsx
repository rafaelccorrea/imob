import React, { useState } from 'react';
import { 
  Plug, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Settings, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Zap,
  Globe,
  Smartphone,
  Building,
  TrendingUp,
  Users,
  BarChart3,
  Shield,
  Key,
  RefreshCw,
  Download,
  Upload,
  Sync,
  Activity
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import { usePermissions } from '../hooks/usePermissions';

// Mock data para integrações
const mockIntegrations = [
  {
    id: '1',
    name: 'Zap Imóveis',
    description: 'Plataforma líder em anúncios imobiliários',
    category: 'Portal Imobiliário',
    status: 'connected',
    logo: '🏠',
    color: 'blue',
    features: ['Sincronização automática', 'Relatórios de visualizações', 'Gestão de leads'],
    lastSync: new Date('2024-01-15T10:30:00'),
    propertiesCount: 45,
    leadsCount: 23,
    monthlyCost: 299.90,
    apiKey: 'zap_****_****_****_****',
    isActive: true
  },
  {
    id: '2',
    name: 'Viva Real',
    description: 'Portal imobiliário com alta visibilidade',
    category: 'Portal Imobiliário',
    status: 'connected',
    logo: '🏘️',
    color: 'green',
    features: ['Anúncios premium', 'Analytics avançado', 'Chat integrado'],
    lastSync: new Date('2024-01-15T09:15:00'),
    propertiesCount: 38,
    leadsCount: 31,
    monthlyCost: 199.90,
    apiKey: 'viva_****_****_****_****',
    isActive: true
  },
  {
    id: '3',
    name: 'OLX Imóveis',
    description: 'Classificados gratuitos com grande alcance',
    category: 'Classificados',
    status: 'disconnected',
    logo: '📱',
    color: 'orange',
    features: ['Anúncios gratuitos', 'Sincronização manual', 'Relatórios básicos'],
    lastSync: null,
    propertiesCount: 0,
    leadsCount: 0,
    monthlyCost: 0,
    apiKey: '',
    isActive: false
  },
  {
    id: '4',
    name: 'ImovelWeb',
    description: 'Portal especializado em imóveis',
    category: 'Portal Imobiliário',
    status: 'error',
    logo: '🌐',
    color: 'purple',
    features: ['Sincronização em tempo real', 'Gestão de preços', 'Fotos automáticas'],
    lastSync: new Date('2024-01-14T16:45:00'),
    propertiesCount: 22,
    leadsCount: 8,
    monthlyCost: 149.90,
    apiKey: 'web_****_****_****_****',
    isActive: false
  },
  {
    id: '5',
    name: 'Facebook Marketplace',
    description: 'Vendas sociais com alcance local',
    category: 'Rede Social',
    status: 'pending',
    logo: '📘',
    color: 'blue',
    features: ['Alcance local', 'Interação social', 'Anúncios promovidos'],
    lastSync: null,
    propertiesCount: 0,
    leadsCount: 0,
    monthlyCost: 0,
    apiKey: '',
    isActive: false
  },
  {
    id: '6',
    name: 'WhatsApp Business',
    description: 'Comunicação direta com clientes',
    category: 'Comunicação',
    status: 'connected',
    logo: '💬',
    color: 'green',
    features: ['Chat automático', 'Catálogo de imóveis', 'Respostas rápidas'],
    lastSync: new Date('2024-01-15T11:20:00'),
    propertiesCount: 0,
    leadsCount: 67,
    monthlyCost: 0,
    apiKey: 'wa_****_****_****_****',
    isActive: true
  }
];

const IntegrationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const { hasPermission } = usePermissions();

  // Filtros para integrações
  const filteredIntegrations = mockIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || integration.category === selectedCategory;
    const matchesStatus = !selectedStatus || integration.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'success';
      case 'disconnected': return 'secondary';
      case 'error': return 'destructive';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Conectado';
      case 'disconnected': return 'Desconectado';
      case 'error': return 'Erro';
      case 'pending': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'disconnected': return <XCircle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      case 'pending': return <RefreshCw className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Portal Imobiliário': return <Building className="h-4 w-4" />;
      case 'Classificados': return <Globe className="h-4 w-4" />;
      case 'Rede Social': return <Users className="h-4 w-4" />;
      case 'Comunicação': return <Smartphone className="h-4 w-4" />;
      default: return <Plug className="h-4 w-4" />;
    }
  };

  const openIntegrationModal = (integration: any) => {
    setSelectedIntegration(integration);
    setShowModal(true);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Nunca';
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Estatísticas
  const totalIntegrations = mockIntegrations.length;
  const connectedIntegrations = mockIntegrations.filter(i => i.status === 'connected').length;
  const totalProperties = mockIntegrations.reduce((sum, i) => sum + i.propertiesCount, 0);
  const totalLeads = mockIntegrations.reduce((sum, i) => sum + i.leadsCount, 0);
  const totalMonthlyCost = mockIntegrations.reduce((sum, i) => sum + i.monthlyCost, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Integrações
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Conecte com plataformas terceiras para venda de imóveis
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <ConditionalMenu requiredPermission="settings">
            <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Exportar</span>
              <span className="sm:hidden">Exportar</span>
            </Button>
          </ConditionalMenu>
          <ConditionalMenu requiredPermission="settings">
            <Button className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Nova Integração</span>
              <span className="sm:hidden">Nova</span>
            </Button>
          </ConditionalMenu>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total de Integrações
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {totalIntegrations}
                </p>
                <p className="text-xs text-success-600 dark:text-success-400">
                  {connectedIntegrations} conectadas
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Plug className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Imóveis Sincronizados
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {totalProperties}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Em todas as plataformas
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Leads Gerados
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  {totalLeads}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Este mês
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Custo Mensal
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-secondary-600 dark:text-white">
                  {formatCurrency(totalMonthlyCost)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Todas as integrações
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar integrações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todas as categorias</option>
              <option value="Portal Imobiliário">Portal Imobiliário</option>
              <option value="Classificados">Classificados</option>
              <option value="Rede Social">Rede Social</option>
              <option value="Comunicação">Comunicação</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os status</option>
              <option value="connected">Conectado</option>
              <option value="disconnected">Desconectado</option>
              <option value="error">Erro</option>
              <option value="pending">Pendente</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Integrações */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
                    {integration.logo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white truncate">
                      {integration.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openIntegrationModal(integration)}
                    className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                  >
                    <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {getCategoryIcon(integration.category)}
                  <span className="ml-2 truncate">{integration.category}</span>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={getStatusColor(integration.status) as any} className="text-xs flex items-center gap-1">
                    {getStatusIcon(integration.status)}
                    {getStatusText(integration.status)}
                  </Badge>
                  {integration.monthlyCost > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {formatCurrency(integration.monthlyCost)}/mês
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                    <span>{integration.propertiesCount} imóveis</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                    <span>{integration.leadsCount} leads</span>
                  </div>
                </div>
                
                <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <Activity className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Última sync: {formatDate(integration.lastSync)}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs sm:text-sm"
                  onClick={() => openIntegrationModal(integration)}
                >
                  <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Configurar</span>
                  <span className="sm:hidden">Config</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs sm:text-sm"
                >
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Acessar</span>
                  <span className="sm:hidden">Acessar</span>
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
        {selectedIntegration && (
          <div className="flex flex-col h-full">
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
              {/* Header Personalizado do Modal */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedIntegration.name}
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
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl sm:text-4xl">
                  {selectedIntegration.logo}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
                    {selectedIntegration.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                    {selectedIntegration.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={getStatusColor(selectedIntegration.status) as any} className="text-xs flex items-center gap-1">
                      {getStatusIcon(selectedIntegration.status)}
                      {getStatusText(selectedIntegration.status)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {selectedIntegration.category}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Informações Básicas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    Estatísticas
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Imóveis Sincronizados:</strong> {selectedIntegration.propertiesCount}</p>
                    <p><strong>Leads Gerados:</strong> {selectedIntegration.leadsCount}</p>
                    <p><strong>Última Sincronização:</strong> {formatDate(selectedIntegration.lastSync)}</p>
                    <p><strong>Custo Mensal:</strong> {formatCurrency(selectedIntegration.monthlyCost)}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    Configuração
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>API Key:</strong> {selectedIntegration.apiKey || 'Não configurado'}</p>
                    <p><strong>Status:</strong> {selectedIntegration.isActive ? 'Ativo' : 'Inativo'}</p>
                    <p><strong>Categoria:</strong> {selectedIntegration.category}</p>
                    <p><strong>ID da Integração:</strong> {selectedIntegration.id}</p>
                  </div>
                </div>
              </div>

              {/* Funcionalidades */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  Funcionalidades Disponíveis
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedIntegration.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              <Button className="text-xs sm:text-sm">
                <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Configurar Integração</span>
                <span className="sm:hidden">Configurar</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default IntegrationsPage;
