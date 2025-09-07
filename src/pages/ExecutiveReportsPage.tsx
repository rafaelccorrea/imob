import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Download, 
  Filter, 
  Calendar,
  Eye,
  FileText,
  DollarSign,
  Users,
  Building,
  Target,
  Activity,
  Clock,
  MapPin,
  Star,
  Award,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Printer,
  Share2,
  Mail,
  MessageSquare,
  Bell,
  Zap,
  Shield,
  Key,
  Database,
  Archive,
  Cloud,
  HardDrive,
  Lock,
  Unlock,
  Copy,
  Upload
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import { usePermissions } from '../hooks/usePermissions';

// Mock data para relatórios executivos
const mockReports = [
  {
    id: '1',
    name: 'Relatório Financeiro Executivo - Q4 2023',
    type: 'financial',
    category: 'Financeiro',
    period: 'Trimestral',
    status: 'completed',
    createdAt: new Date('2024-01-15T10:30:00'),
    lastUpdated: new Date('2024-01-15T10:30:00'),
    size: '2.4 MB',
    format: 'PDF',
    description: 'Análise completa de receitas, despesas e lucratividade',
    metrics: {
      totalRevenue: 2450000,
      totalExpenses: 1850000,
      netProfit: 600000,
      profitMargin: 24.5,
      growthRate: 12.5
    },
    charts: ['revenue_trend', 'expense_breakdown', 'profit_margin'],
    isScheduled: true,
    scheduleFrequency: 'monthly'
  },
  {
    id: '2',
    name: 'Performance de Vendas - Dezembro 2023',
    type: 'sales',
    category: 'Vendas',
    period: 'Mensal',
    status: 'completed',
    createdAt: new Date('2024-01-10T14:20:00'),
    lastUpdated: new Date('2024-01-10T14:20:00'),
    size: '1.8 MB',
    format: 'Excel',
    description: 'Análise de performance dos agentes e conversões',
    metrics: {
      totalSales: 28,
      totalRevenue: 1850000,
      averageDealValue: 66071,
      conversionRate: 7.1,
      topAgent: 'Maria Santos'
    },
    charts: ['sales_trend', 'agent_performance', 'conversion_funnel'],
    isScheduled: true,
    scheduleFrequency: 'weekly'
  },
  {
    id: '3',
    name: 'Análise de Mercado Imobiliário - Q4 2023',
    type: 'market',
    category: 'Mercado',
    period: 'Trimestral',
    status: 'processing',
    createdAt: new Date('2024-01-14T09:15:00'),
    lastUpdated: new Date('2024-01-14T09:15:00'),
    size: '3.2 MB',
    format: 'PDF',
    description: 'Tendências de mercado, preços e demanda por região',
    metrics: {
      marketShare: 12.5,
      averagePrice: 420000,
      demandIndex: 8.2,
      inventoryLevel: 156,
      daysOnMarket: 45
    },
    charts: ['market_trends', 'price_analysis', 'demand_heatmap'],
    isScheduled: false,
    scheduleFrequency: null
  },
  {
    id: '4',
    name: 'Relatório de Clientes e Leads - Janeiro 2024',
    type: 'clients',
    category: 'CRM',
    period: 'Mensal',
    status: 'completed',
    createdAt: new Date('2024-01-12T16:45:00'),
    lastUpdated: new Date('2024-01-12T16:45:00'),
    size: '1.2 MB',
    format: 'CSV',
    description: 'Análise da base de clientes e pipeline de leads',
    metrics: {
      totalClients: 234,
      newClients: 23,
      activeLeads: 89,
      leadConversion: 15.2,
      customerSatisfaction: 4.8
    },
    charts: ['client_growth', 'lead_sources', 'satisfaction_trends'],
    isScheduled: true,
    scheduleFrequency: 'monthly'
  }
];

const mockAnalytics = {
  revenue: {
    current: 185000,
    previous: 164000,
    growth: 12.8,
    trend: 'up'
  },
  sales: {
    current: 28,
    previous: 24,
    growth: 16.7,
    trend: 'up'
  },
  leads: {
    current: 89,
    previous: 76,
    growth: 17.1,
    trend: 'up'
  },
  conversion: {
    current: 7.1,
    previous: 6.8,
    growth: 4.4,
    trend: 'up'
  }
};

const mockCharts = {
  revenueTrend: [
    { month: 'Jan', value: 164000 },
    { month: 'Fev', value: 178000 },
    { month: 'Mar', value: 192000 },
    { month: 'Abr', value: 185000 }
  ],
  salesByRegion: [
    { region: 'Centro', sales: 8, revenue: 1280000 },
    { region: 'Zona Sul', sales: 12, revenue: 2100000 },
    { region: 'Zona Norte', sales: 5, revenue: 750000 },
    { region: 'Zona Oeste', sales: 3, revenue: 520000 }
  ],
  agentPerformance: [
    { name: 'Maria Santos', sales: 8, revenue: 1250000, conversion: 17.8 },
    { name: 'Carlos Lima', sales: 6, revenue: 980000, conversion: 15.8 },
    { name: 'Ana Costa', sales: 5, revenue: 750000, conversion: 15.6 },
    { name: 'Pedro Oliveira', sales: 4, revenue: 620000, conversion: 12.3 },
    { name: 'João Silva', sales: 3, revenue: 480000, conversion: 8.9 }
  ]
};

const ExecutiveReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const { hasPermission } = usePermissions();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.NumberFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'processing': return 'Processando';
      case 'failed': return 'Falhou';
      default: return 'Desconhecido';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'financial': return <DollarSign className="h-4 w-4" />;
      case 'sales': return <TrendingUp className="h-4 w-4" />;
      case 'market': return <MapPin className="h-4 w-4" />;
      case 'clients': return <Users className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openReportModal = (report: any) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Relatórios Executivos
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Analytics avançados e relatórios estratégicos para tomada de decisão
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Atualizar</span>
            <span className="sm:hidden">Atualizar</span>
          </Button>
          <Button className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Novo Relatório</span>
            <span className="sm:hidden">Novo</span>
          </Button>
        </div>
      </div>

      {/* Analytics em Tempo Real */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Receita Mensal
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {formatCurrency(mockAnalytics.revenue.current)}
                </p>
                <p className="text-xs text-success-600 dark:text-success-400 flex items-center gap-1">
                  {getTrendIcon(mockAnalytics.revenue.trend)}
                  +{mockAnalytics.revenue.growth}% vs mês anterior
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Vendas Realizadas
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {mockAnalytics.sales.current}
                </p>
                <p className="text-xs text-success-600 dark:text-success-400 flex items-center gap-1">
                  {getTrendIcon(mockAnalytics.sales.trend)}
                  +{mockAnalytics.sales.growth}% vs mês anterior
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Leads Ativos
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  {mockAnalytics.leads.current}
                </p>
                <p className="text-xs text-success-600 dark:text-success-400 flex items-center gap-1">
                  {getTrendIcon(mockAnalytics.leads.trend)}
                  +{mockAnalytics.leads.growth}% vs mês anterior
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Taxa de Conversão
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-secondary-600 dark:text-white">
                  {mockAnalytics.conversion.current}%
                </p>
                <p className="text-xs text-success-600 dark:text-success-400 flex items-center gap-1">
                  {getTrendIcon(mockAnalytics.conversion.trend)}
                  +{mockAnalytics.conversion.growth}% vs mês anterior
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-600 dark:text-white" />
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
                placeholder="Buscar relatórios..."
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
              <option value="Financeiro">Financeiro</option>
              <option value="Vendas">Vendas</option>
              <option value="Mercado">Mercado</option>
              <option value="CRM">CRM</option>
            </select>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
              <option value="quarter">Este Trimestre</option>
              <option value="year">Este Ano</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Relatórios */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    {getTypeIcon(report.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white truncate">
                      {report.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        {formatDate(report.createdAt)}
                      </span>
                      <span>{report.format}</span>
                      <span>{report.size}</span>
                      <span>{report.period}</span>
                      {report.isScheduled && (
                        <Badge variant="outline" className="text-xs">
                          Agendado
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Badge variant={getStatusColor(report.status) as any} className="text-xs">
                    {getStatusText(report.status)}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openReportModal(report)}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes do Relatório */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        {selectedReport && (
          <div className="flex flex-col h-full">
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
              {/* Header Personalizado do Modal */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedReport.name}
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

              {/* Informações do Relatório */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    Informações Gerais
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Categoria:</strong> {selectedReport.category}</p>
                    <p><strong>Período:</strong> {selectedReport.period}</p>
                    <p><strong>Formato:</strong> {selectedReport.format}</p>
                    <p><strong>Tamanho:</strong> {selectedReport.size}</p>
                    <p><strong>Criado em:</strong> {formatDate(selectedReport.createdAt)}</p>
                    <p><strong>Última atualização:</strong> {formatDate(selectedReport.lastUpdated)}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    Métricas Principais
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {Object.entries(selectedReport.metrics).map(([key, value]) => (
                      <p key={key}>
                        <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {
                          typeof value === 'number' && value > 1000 
                            ? formatCurrency(value)
                            : value
                        }
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gráficos Incluídos */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  Gráficos Incluídos
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedReport.charts.map((chart: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        {chart.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
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
              <Button variant="outline" className="text-xs sm:text-sm">
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Compartilhar
              </Button>
              <Button className="text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Baixar Relatório
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ExecutiveReportsPage;
