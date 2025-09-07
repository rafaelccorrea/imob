import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info, 
  Zap, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Clock, 
  User, 
  Building, 
  DollarSign, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  Key, 
  Database, 
  Activity, 
  BarChart3, 
  PieChart, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Star, 
  Award, 
  Heart, 
  Car, 
  Dumbbell, 
  CreditCard, 
  Receipt, 
  Scale, 
  Globe, 
  Smartphone, 
  Archive, 
  Cloud, 
  HardDrive, 
  Lock, 
  Unlock, 
  Copy, 
  ExternalLink, 
  Download, 
  Upload, 
  RefreshCw, 
  Calendar,
  FileText,
  Printer,
  Share2
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import { usePermissions } from '../hooks/usePermissions';

// Mock data para alertas e notificações
const mockAlerts = [
  {
    id: '1',
    title: 'Meta mensal em risco',
    description: 'Faltam apenas 15% para atingir a meta de vendas do mês. Ação recomendada: intensificar campanhas de marketing.',
    type: 'critical',
    category: 'sales',
    priority: 'high',
    status: 'active',
    createdAt: new Date('2024-01-15T10:00:00'),
    expiresAt: new Date('2024-01-31T23:59:59'),
    assignedTo: 'João Silva',
    createdBy: 'Sistema',
    actions: [
      { id: '1', label: 'Ver relatório de vendas', action: 'view_sales_report' },
      { id: '2', label: 'Criar campanha promocional', action: 'create_campaign' },
      { id: '3', label: 'Contatar leads pendentes', action: 'contact_leads' }
    ],
    metrics: {
      currentProgress: 85,
      target: 100,
      daysRemaining: 16
    }
  },
  {
    id: '2',
    title: 'Agente com baixa performance',
    description: 'João Silva está 30% abaixo da meta mensal. Recomenda-se reunião de acompanhamento.',
    type: 'warning',
    category: 'performance',
    priority: 'medium',
    status: 'active',
    createdAt: new Date('2024-01-15T09:30:00'),
    expiresAt: new Date('2024-01-20T18:00:00'),
    assignedTo: 'Maria Santos',
    createdBy: 'Sistema',
    actions: [
      { id: '1', label: 'Agendar reunião', action: 'schedule_meeting' },
      { id: '2', label: 'Ver relatório de performance', action: 'view_performance' },
      { id: '3', label: 'Oferecer treinamento', action: 'offer_training' }
    ],
    metrics: {
      currentPerformance: 70,
      target: 100,
      trend: 'down'
    }
  },
  {
    id: '3',
    title: 'Nova integração disponível',
    description: 'Zap Imóveis lançou nova funcionalidade de relatórios avançados. Atualize sua integração.',
    type: 'info',
    category: 'integration',
    priority: 'low',
    status: 'active',
    createdAt: new Date('2024-01-15T08:45:00'),
    expiresAt: new Date('2024-02-15T23:59:59'),
    assignedTo: 'Carlos Lima',
    createdBy: 'Sistema',
    actions: [
      { id: '1', label: 'Atualizar integração', action: 'update_integration' },
      { id: '2', label: 'Ver novidades', action: 'view_features' },
      { id: '3', label: 'Configurar relatórios', action: 'configure_reports' }
    ],
    metrics: {
      integrationVersion: '2.1.0',
      currentVersion: '2.0.5',
      newFeatures: 3
    }
  },
  {
    id: '4',
    title: 'Backup automático falhou',
    description: 'O backup automático de hoje falhou devido a problemas de conectividade. Backup manual necessário.',
    type: 'critical',
    category: 'system',
    priority: 'high',
    status: 'resolved',
    createdAt: new Date('2024-01-15T02:00:00'),
    resolvedAt: new Date('2024-01-15T08:30:00'),
    assignedTo: 'Sistema',
    createdBy: 'Sistema',
    actions: [
      { id: '1', label: 'Executar backup manual', action: 'manual_backup' },
      { id: '2', label: 'Verificar conectividade', action: 'check_connectivity' },
      { id: '3', label: 'Configurar backup alternativo', action: 'setup_backup' }
    ],
    metrics: {
      backupSize: '2.4 GB',
      lastSuccessfulBackup: new Date('2024-01-14T02:00:00'),
      retryCount: 3
    }
  },
  {
    id: '5',
    title: 'Cliente insatisfeito',
    description: 'Cliente João da Silva reportou problema com atendimento. Avaliação: 2/5 estrelas.',
    type: 'warning',
    category: 'customer',
    priority: 'medium',
    status: 'active',
    createdAt: new Date('2024-01-15T14:20:00'),
    expiresAt: new Date('2024-01-17T18:00:00'),
    assignedTo: 'Ana Costa',
    createdBy: 'Sistema',
    actions: [
      { id: '1', label: 'Contatar cliente', action: 'contact_customer' },
      { id: '2', label: 'Ver histórico do atendimento', action: 'view_history' },
      { id: '3', label: 'Propor solução', action: 'propose_solution' }
    ],
    metrics: {
      customerRating: 2,
      previousRating: 4,
      complaintsCount: 1
    }
  }
];

const mockNotificationSettings = {
  email: {
    enabled: true,
    critical: true,
    warning: true,
    info: false
  },
  sms: {
    enabled: false,
    critical: true,
    warning: false,
    info: false
  },
  push: {
    enabled: true,
    critical: true,
    warning: true,
    info: true
  },
  webhook: {
    enabled: true,
    url: 'https://hooks.slack.com/services/...',
    critical: true,
    warning: true,
    info: false
  }
};

const AlertsNotificationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const { hasPermission } = usePermissions();

  const formatDate = (date: Date) => {
    return new Intl.NumberFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      case 'info': return 'default';
      default: return 'secondary';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'critical': return 'Crítico';
      case 'warning': return 'Aviso';
      case 'info': return 'Informativo';
      default: return 'Desconhecido';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'info': return <Info className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'warning';
      case 'resolved': return 'success';
      case 'dismissed': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'resolved': return 'Resolvido';
      case 'dismissed': return 'Dispensado';
      default: return 'Desconhecido';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sales': return <TrendingUp className="h-4 w-4" />;
      case 'performance': return <Target className="h-4 w-4" />;
      case 'integration': return <Zap className="h-4 w-4" />;
      case 'system': return <Database className="h-4 w-4" />;
      case 'customer': return <User className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || alert.type === selectedType;
    const matchesStatus = !selectedStatus || alert.status === selectedStatus;
    const matchesCategory = !selectedCategory || alert.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const openAlertModal = (alert: any) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  // Estatísticas
  const totalAlerts = mockAlerts.length;
  const activeAlerts = mockAlerts.filter(a => a.status === 'active').length;
  const criticalAlerts = mockAlerts.filter(a => a.type === 'critical' && a.status === 'active').length;
  const resolvedToday = mockAlerts.filter(a => a.status === 'resolved' && 
    a.resolvedAt && a.resolvedAt.toDateString() === new Date().toDateString()).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Alertas e Notificações
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Sistema de alertas críticos e notificações inteligentes
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Configurações</span>
            <span className="sm:hidden">Config</span>
          </Button>
          <Button className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Novo Alerta</span>
            <span className="sm:hidden">Novo</span>
          </Button>
        </div>
      </div>

      {/* Estatísticas de Alertas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total de Alertas
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {totalAlerts}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {activeAlerts} ativos
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Alertas Críticos
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-destructive-600 dark:text-white">
                  {criticalAlerts}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Requer atenção
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Resolvidos Hoje
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {resolvedToday}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Problemas solucionados
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
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Tempo Médio
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  2.5h
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Para resolução
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600 dark:text-white" />
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
                placeholder="Buscar alertas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os tipos</option>
              <option value="critical">Crítico</option>
              <option value="warning">Aviso</option>
              <option value="info">Informativo</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="resolved">Resolvido</option>
              <option value="dismissed">Dispensado</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todas as categorias</option>
              <option value="sales">Vendas</option>
              <option value="performance">Performance</option>
              <option value="integration">Integração</option>
              <option value="system">Sistema</option>
              <option value="customer">Cliente</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Alertas */}
      <div className="space-y-3 sm:space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white truncate">
                      {alert.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        {formatDate(alert.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(alert.category)}
                        {alert.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                        {alert.assignedTo}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Badge variant={getTypeColor(alert.type) as any} className="text-xs">
                    {getTypeText(alert.type)}
                  </Badge>
                  <Badge variant={getStatusColor(alert.status) as any} className="text-xs">
                    {getStatusText(alert.status)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openAlertModal(alert)}
                    className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Ações Rápidas */}
              {alert.status === 'active' && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {alert.actions.slice(0, 3).map((action) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes do Alerta */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        {selectedAlert && (
          <div className="flex flex-col h-full">
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
              {/* Header Personalizado do Modal */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedAlert.title}
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

              {/* Informações do Alerta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    Informações Gerais
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Tipo:</strong> {getTypeText(selectedAlert.type)}</p>
                    <p><strong>Categoria:</strong> {selectedAlert.category}</p>
                    <p><strong>Prioridade:</strong> {selectedAlert.priority}</p>
                    <p><strong>Status:</strong> {getStatusText(selectedAlert.status)}</p>
                    <p><strong>Criado por:</strong> {selectedAlert.createdBy}</p>
                    <p><strong>Responsável:</strong> {selectedAlert.assignedTo}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    Datas e Prazos
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Criado em:</strong> {formatDate(selectedAlert.createdAt)}</p>
                    <p><strong>Expira em:</strong> {formatDate(selectedAlert.expiresAt)}</p>
                    {selectedAlert.resolvedAt && (
                      <p><strong>Resolvido em:</strong> {formatDate(selectedAlert.resolvedAt)}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  Descrição
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  {selectedAlert.description}
                </p>
              </div>

              {/* Métricas */}
              {selectedAlert.metrics && (
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    Métricas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {Object.entries(selectedAlert.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </p>
                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                          {typeof value === 'number' ? value : value.toString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ações Disponíveis */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  Ações Disponíveis
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedAlert.actions.map((action: any) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      size="sm"
                      className="text-xs sm:text-sm justify-start"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              {selectedAlert.status === 'active' && (
                <>
                  <Button variant="outline" className="text-xs sm:text-sm">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Marcar como Resolvido
                  </Button>
                  <Button className="text-xs sm:text-sm">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Executar Ação
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AlertsNotificationsPage;
