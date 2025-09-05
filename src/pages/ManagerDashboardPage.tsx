import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Target,
  Award,
  BarChart3,
  PieChart,
  Download,
  Eye,
  Calendar,
  DollarSign,
  Percent,
  Crown,
  Star,
  AlertTriangle,
  CheckCircle,
  Plus,
  Settings,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from '../components/ui';
import { colors } from '../utils/colors';
import { formatCurrency, formatDate } from '../utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { 
  mockTeamPerformanceData,
  mockExecutiveMetrics
} from '../utils/mockData';

export default function ManagerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'performance' | 'goals' | 'reports'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Dados para gráficos
  const monthlySalesData = [
    { month: 'Jan', vendas: 8, leads: 45, conversao: 17.8 },
    { month: 'Fev', vendas: 12, leads: 52, conversao: 23.1 },
    { month: 'Mar', vendas: 15, leads: 48, conversao: 31.3 },
    { month: 'Abr', vendas: 18, leads: 55, conversao: 32.7 },
    { month: 'Mai', vendas: 22, leads: 62, conversao: 35.5 },
    { month: 'Jun', vendas: 25, leads: 68, conversao: 36.8 },
  ];

  const teamPerformanceData = [
    { name: 'João Silva', vendas: 8, comissao: 24000, conversao: 28.5 },
    { name: 'Maria Santos', vendas: 6, comissao: 18000, conversao: 24.0 },
    { name: 'Pedro Costa', vendas: 5, comissao: 15000, conversao: 20.8 },
    { name: 'Ana Oliveira', vendas: 4, comissao: 12000, conversao: 19.2 },
    { name: 'Carlos Lima', vendas: 2, comissao: 6000, conversao: 12.5 },
  ];

  const conversionData = [
    { name: 'Alto', value: 35, color: '#10B981' },
    { name: 'Médio', value: 45, color: '#F59E0B' },
    { name: 'Baixo', value: 20, color: '#EF4444' },
  ];

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'team', label: 'Equipe', icon: Users },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'reports', label: 'Relatórios', icon: PieChart }
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Dashboard Executivo
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Visão estratégica da equipe e performance geral
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Buscar corretores..."
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
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
              <option value="quarter">Este Trimestre</option>
              <option value="year">Este Ano</option>
            </select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

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
        <div className="space-y-6">
          {/* Métricas Principais do Gestor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                      Equipe Ativa
                    </p>
                    <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                      {mockTeamPerformanceData.length}
                    </p>
                    <p className={`text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1`}>
                      <Users className="h-3 w-3 mr-1" />
                      {mockTeamPerformanceData.reduce((sum, agent) => sum + 1, 0)} corretores
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${colors.iconBg.primary}`}>
                    <Users className={`h-6 w-6 ${colors.icons.primary}`} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                      Vendas do Mês
                    </p>
                    <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                      {mockExecutiveMetrics.totalSales}
                    </p>
                    <p className={`text-xs text-green-600 dark:text-green-400 flex items-center mt-1`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15% vs mês anterior
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                    <Target className={`h-6 w-6 ${colors.icons.success}`} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                      Meta Mensal
                    </p>
                    <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                      {Math.round((mockExecutiveMetrics.totalSales / 25) * 100)}%
                    </p>
                    <p className={`text-xs text-purple-600 dark:text-purple-400 flex items-center mt-1`}>
                      <Award className="h-3 w-3 mr-1" />
                      Meta: 25 vendas
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                    <Award className={`h-6 w-6 ${colors.icons.warning}`} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                      Taxa de Conversão
                    </p>
                    <p className={`text-2xl font-bold text-orange-600 dark:text-orange-400`}>
                      {mockExecutiveMetrics.averageConversion.toFixed(1)}%
                    </p>
                    <p className={`text-xs text-orange-600 dark:text-orange-400 flex items-center mt-1`}>
                      <Percent className="h-3 w-3 mr-1" />
                      Meta: 15%
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                    <Percent className={`h-6 w-6 ${colors.icons.warning}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos de Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Vendas Mensais */}
            <Card>
              <CardHeader>
                <CardTitle className={colors.text.title}>
                  Vendas Mensais da Equipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlySalesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #ccc',
                          borderRadius: '4px'
                        }}
                      />
                      <Area type="monotone" dataKey="vendas" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="leads" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de Conversão */}
            <Card>
              <CardHeader>
                <CardTitle className={colors.text.title}>
                  Distribuição de Conversão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={conversionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {conversionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #ccc',
                          borderRadius: '4px'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Individual da Equipe */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Performance Individual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => `${value} vendas`}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                    />
                    <Bar dataKey="vendas" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Resumo da Equipe */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Users className="h-5 w-5 text-blue-500" />
                Ranking da Equipe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamPerformanceData.map((agent, index) => (
                  <div key={agent.name} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                        {index === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
                        {index === 1 && <Award className="h-5 w-5 text-gray-400" />}
                        {index === 2 && <Star className="h-5 w-5 text-orange-500" />}
                        {index > 2 && <span className="text-sm font-bold text-gray-600 dark:text-gray-300">#{index + 1}</span>}
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {agent.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {agent.vendas} vendas • {agent.conversao}% conversão
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Comissão</span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(agent.comissao)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Users className="h-5 w-5 text-blue-500" />
                Gestão da Equipe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTeamPerformanceData.map((agent) => (
                  <div key={agent.agentId} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${colors.text.title}`}>
                          {agent.agentName}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Ranking #{agent.ranking}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Vendas:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {agent.sales}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Leads:</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {agent.leads}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Conversão:</span>
                        <span className="font-medium text-purple-600 dark:text-purple-400">
                          {agent.conversionRate}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Comissões:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {formatCurrency(agent.commission)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <TrendingUp className="h-5 w-5 text-green-500" />
                Análise de Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className={`font-semibold ${colors.text.title}`}>
                    Top Performers
                  </h4>
                  <div className="space-y-3">
                    {mockTeamPerformanceData.slice(0, 3).map((agent, index) => (
                      <div key={agent.agentId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                            {index === 0 && <Crown className="h-4 w-4 text-yellow-500" />}
                            {index === 1 && <Star className="h-4 w-4 text-gray-400" />}
                            {index === 2 && <Award className="h-4 w-4 text-orange-500" />}
                          </div>
                          <div>
                            <p className={`font-medium ${colors.text.title}`}>
                              {agent.agentName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {agent.sales} vendas • {agent.conversionRate}% conversão
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600 dark:text-green-400">
                            {formatCurrency(agent.commission)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className={`font-semibold ${colors.text.title}`}>
                    Métricas Gerais
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">
                        Vendas Totais
                      </span>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        {mockExecutiveMetrics.totalSales}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Leads Totais
                      </span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {mockExecutiveMetrics.totalLeads}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                        Conversão Média
                      </span>
                      <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {mockExecutiveMetrics.averageConversion.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Target className="h-5 w-5 text-green-500" />
                Metas e Objetivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {mockExecutiveMetrics.teamGoals.monthly}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Meta Mensal</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${(mockExecutiveMetrics.totalSales / mockExecutiveMetrics.teamGoals.monthly) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {((mockExecutiveMetrics.totalSales / mockExecutiveMetrics.teamGoals.monthly) * 100).toFixed(1)}% atingida
                  </p>
                </div>
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {mockExecutiveMetrics.teamGoals.quarterly}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Meta Trimestral</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${(mockExecutiveMetrics.totalSales * 3 / mockExecutiveMetrics.teamGoals.quarterly) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {((mockExecutiveMetrics.totalSales * 3 / mockExecutiveMetrics.teamGoals.quarterly) * 100).toFixed(1)}% atingida
                  </p>
                </div>
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {mockExecutiveMetrics.teamGoals.yearly}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Meta Anual</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-purple-500 h-3 rounded-full"
                      style={{ width: `${(mockExecutiveMetrics.totalSales * 12 / mockExecutiveMetrics.teamGoals.yearly) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {((mockExecutiveMetrics.totalSales * 12 / mockExecutiveMetrics.teamGoals.yearly) * 100).toFixed(1)}% atingida
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <PieChart className="h-5 w-5 text-blue-500" />
                Relatórios Executivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center gap-2 h-20">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Relatório Mensal</div>
                    <div className="text-sm text-gray-500">Vendas e performance</div>
                  </div>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 h-20">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Relatório de Equipe</div>
                    <div className="text-sm text-gray-500">Performance individual</div>
                  </div>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 h-20">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Análise de Mercado</div>
                    <div className="text-sm text-gray-500">Tendências e insights</div>
                  </div>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 h-20">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Relatório Financeiro</div>
                    <div className="text-sm text-gray-500">Comissões e custos</div>
                  </div>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 h-20">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Relatório de Leads</div>
                    <div className="text-sm text-gray-500">Conversão e fontes</div>
                  </div>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 h-20">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Relatório Personalizado</div>
                    <div className="text-sm text-gray-500">Criar relatório</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
