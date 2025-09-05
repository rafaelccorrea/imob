import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building2, 
  Calendar,
  Plus,
  BarChart3,
  Target,
  Award,
  Crown,
  Eye,
  Settings,
  Shield,
  Globe,
  Briefcase,
  PieChart,
  Activity,
  Zap,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  Building,
  Home,
  MapPin,
  Percent,
  Calculator,
  FileText,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from '../components/ui';
import { colors } from '../utils/colors';
import { formatCurrency, formatDate } from '../utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { 
  mockTeamPerformanceMetrics,
  mockExecutiveMetrics
} from '../utils/mockData';

export default function OwnerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'strategy' | 'portfolio' | 'market' | 'governance'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('quarter');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'strategy', label: 'Estratégia', icon: Target },
    { id: 'portfolio', label: 'Portfólio', icon: Building2 },
    { id: 'market', label: 'Mercado', icon: Globe },
    { id: 'governance', label: 'Governança', icon: Shield }
  ];

  // Dados específicos para o dono da empresa
  const quarterlyData = [
    { quarter: 'Q1 2024', revenue: 450000, profit: 180000, roi: 12.5, marketShare: 8.2 },
    { quarter: 'Q2 2024', revenue: 520000, profit: 210000, roi: 13.8, marketShare: 8.7 },
    { quarter: 'Q3 2024', revenue: 610000, profit: 245000, roi: 15.2, marketShare: 9.1 },
    { quarter: 'Q4 2024', revenue: 680000, profit: 275000, roi: 16.8, marketShare: 9.5 },
  ];

  const portfolioData = [
    { name: 'Residencial', value: 65, color: '#3B82F6', revenue: 450000 },
    { name: 'Comercial', value: 20, color: '#10B981', revenue: 180000 },
    { name: 'Terrenos', value: 10, color: '#F59E0B', revenue: 80000 },
    { name: 'Luxo', value: 5, color: '#EF4444', revenue: 120000 },
  ];

  const marketData = [
    { region: 'Centro', properties: 45, avgPrice: 850000, growth: 8.5 },
    { region: 'Zona Sul', properties: 32, avgPrice: 1200000, growth: 12.3 },
    { region: 'Zona Norte', properties: 28, avgPrice: 650000, growth: 6.8 },
    { region: 'Zona Oeste', properties: 35, avgPrice: 750000, growth: 9.2 },
  ];

  const strategicGoals = [
    { id: 1, title: 'Expansão Regional', progress: 75, target: 'Q2 2025', status: 'on-track' },
    { id: 2, title: 'Digitalização Completa', progress: 60, target: 'Q1 2025', status: 'on-track' },
    { id: 3, title: 'Sustentabilidade', progress: 40, target: 'Q3 2025', status: 'behind' },
    { id: 4, title: 'Mercado Premium', progress: 85, target: 'Q4 2024', status: 'ahead' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Dashboard Proprietário
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Visão estratégica e governança empresarial - {formatDate(new Date().toISOString())}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Relatório Executivo
          </Button>
          <Button className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Buscar por região, tipo de imóvel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="month">Este Mês</option>
              <option value="quarter">Este Trimestre</option>
              <option value="year">Este Ano</option>
              <option value="ytd">Ano Atual</option>
            </select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros Avançados
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Valor do Portfólio
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {formatCurrency(25000000)}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400 flex items-center mt-1`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.5% este ano
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <Building className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  ROI Médio
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  15.2%
                </p>
                <p className={`text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1`}>
                  <Percent className="h-3 w-3 mr-1" />
                  Meta: 12%
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.primary}`}>
                <Calculator className={`h-6 w-6 ${colors.icons.primary}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Participação no Mercado
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  9.5%
                </p>
                <p className={`text-xs text-purple-600 dark:text-purple-400 flex items-center mt-1`}>
                  <Globe className="h-3 w-3 mr-1" />
                  Crescimento: +1.3%
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <Globe className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Score de Governança
                </p>
                <p className={`text-2xl font-bold text-orange-600 dark:text-orange-400`}>
                  8.7/10
                </p>
                <p className={`text-xs text-orange-600 dark:text-orange-400 flex items-center mt-1`}>
                  <Shield className="h-3 w-3 mr-1" />
                  Excelente
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <Shield className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto custom-scroll px-4 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trimestral */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Performance Trimestral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={quarterlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="profit" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Distribuição do Portfólio */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Distribuição do Portfólio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Metas Estratégicas */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Target className="h-5 w-5 text-blue-500" />
                Metas Estratégicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {strategicGoals.map((goal) => (
                  <div key={goal.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-medium ${colors.text.title}`}>{goal.title}</h4>
                      <Badge variant={goal.status === 'ahead' ? 'success' : goal.status === 'behind' ? 'destructive' : 'default'}>
                        {goal.status === 'ahead' ? 'Avançado' : goal.status === 'behind' ? 'Atrasado' : 'No Prazo'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                          <span>Progresso</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              goal.status === 'ahead' ? 'bg-green-500' : 
                              goal.status === 'behind' ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Meta: {goal.target}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'strategy' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Target className="h-5 w-5 text-blue-500" />
                Planejamento Estratégico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-semibold mb-3 ${colors.text.title}`}>Objetivos de Longo Prazo</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Expansão Nacional</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Meta: 2026</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Sustentabilidade ESG</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Meta: 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <Zap className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Tecnologia Avançada</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Meta: 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 ${colors.text.title}`}>KPIs Estratégicos</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <span className="text-sm">Market Share</span>
                      <span className="font-bold text-green-600 dark:text-green-400">9.5% ↗</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <span className="text-sm">ROI Médio</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">15.2% ↗</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <span className="text-sm">Satisfação Cliente</span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">4.8/5 ↗</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <span className="text-sm">Retenção Talentos</span>
                      <span className="font-bold text-orange-600 dark:text-orange-400">92% ↗</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Building2 className="h-5 w-5 text-green-500" />
                Análise do Portfólio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {portfolioData.map((item) => (
                  <div key={item.name} className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }}></div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.value}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{formatCurrency(item.revenue)}</p>
                  </div>
                ))}
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'market' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Globe className="h-5 w-5 text-blue-500" />
                Análise de Mercado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.map((region, index) => (
                  <div key={region.region} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                        <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {region.region}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {region.properties} imóveis • Preço médio: {formatCurrency(region.avgPrice)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`text-lg font-bold ${region.growth > 10 ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                          +{region.growth}%
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Crescimento
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'governance' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Shield className="h-5 w-5 text-green-500" />
                Governança Corporativa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-semibold mb-3 ${colors.text.title}`}>Compliance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">LGPD</span>
                      </div>
                      <Badge variant="success">Conforme</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">CRECI</span>
                      </div>
                      <Badge variant="success">Conforme</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm">Auditoria</span>
                      </div>
                      <Badge variant="default">Em Andamento</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 ${colors.text.title}`}>Riscos</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <span className="text-sm">Risco de Mercado</span>
                      <Badge variant="default">Baixo</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <span className="text-sm">Risco Operacional</span>
                      <Badge variant="default">Médio</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <span className="text-sm">Risco Legal</span>
                      <Badge variant="success">Baixo</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <span className="text-sm">Risco Tecnológico</span>
                      <Badge variant="default">Médio</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
