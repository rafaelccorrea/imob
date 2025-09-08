import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  TrendingDown,
  Star,
  Target,
  DollarSign,
  Crown,
  Zap,
  BarChart3
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Line } from 'recharts';

interface Agent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  position: number;
  previousPosition: number;
  totalSales: number;
  totalValue: number;
  totalCommissions: number;
  conversionRate: number;
  avgDealTime: number;
  clientSatisfaction: number;
  monthlyGoal: number;
  monthlyProgress: number;
  streak: number;
  badges: string[];
  performance: {
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
    lastYear: number;
  };
}

const AgentsRankingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('month');

  // Mock data - ranking de agentes
  const agentsData: Agent[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@imobiliaria.com',
      position: 1,
      previousPosition: 2,
      totalSales: 15,
      totalValue: 12500000,
      totalCommissions: 375000,
      conversionRate: 85,
      avgDealTime: 45,
      clientSatisfaction: 4.8,
      monthlyGoal: 8,
      monthlyProgress: 6,
      streak: 12,
      badges: ['Top Seller', 'Client Favorite', 'Rising Star'],
      performance: {
        thisMonth: 6,
        lastMonth: 4,
        thisYear: 15,
        lastYear: 12
      }
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@imobiliaria.com',
      position: 2,
      previousPosition: 1,
      totalSales: 14,
      totalValue: 11800000,
      totalCommissions: 354000,
      conversionRate: 82,
      avgDealTime: 52,
      clientSatisfaction: 4.7,
      monthlyGoal: 8,
      monthlyProgress: 5,
      streak: 8,
      badges: ['Consistent Performer', 'Team Player'],
      performance: {
        thisMonth: 5,
        lastMonth: 6,
        thisYear: 14,
        lastYear: 15
      }
    },
    {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro@imobiliaria.com',
      position: 3,
      previousPosition: 4,
      totalSales: 12,
      totalValue: 9800000,
      totalCommissions: 294000,
      conversionRate: 78,
      avgDealTime: 38,
      clientSatisfaction: 4.6,
      monthlyGoal: 7,
      monthlyProgress: 4,
      streak: 15,
      badges: ['Fast Closer', 'Newcomer'],
      performance: {
        thisMonth: 4,
        lastMonth: 3,
        thisYear: 12,
        lastYear: 8
      }
    },
    {
      id: '4',
      name: 'Ana Lima',
      email: 'ana@imobiliaria.com',
      position: 4,
      previousPosition: 3,
      totalSales: 11,
      totalValue: 9200000,
      totalCommissions: 276000,
      conversionRate: 75,
      avgDealTime: 48,
      clientSatisfaction: 4.9,
      monthlyGoal: 6,
      monthlyProgress: 3,
      streak: 6,
      badges: ['Client Champion', 'Detail Oriented'],
      performance: {
        thisMonth: 3,
        lastMonth: 4,
        thisYear: 11,
        lastYear: 10
      }
    },
    {
      id: '5',
      name: 'Carlos Oliveira',
      email: 'carlos@imobiliaria.com',
      position: 5,
      previousPosition: 5,
      totalSales: 9,
      totalValue: 7500000,
      totalCommissions: 225000,
      conversionRate: 70,
      avgDealTime: 55,
      clientSatisfaction: 4.5,
      monthlyGoal: 5,
      monthlyProgress: 2,
      streak: 3,
      badges: ['Steady Performer'],
      performance: {
        thisMonth: 2,
        lastMonth: 2,
        thisYear: 9,
        lastYear: 7
      }
    }
  ];

  // Dados para gráficos
  const performanceData = agentsData.map(agent => ({
    name: agent.name.split(' ')[0],
    sales: agent.totalSales,
    value: agent.totalValue / 1000000, // em milhões
    conversion: agent.conversionRate
  }));

  const monthlyTrendData = [
    { month: 'Jan', sales: 45, value: 38.5 },
    { month: 'Fev', sales: 52, value: 42.1 },
    { month: 'Mar', sales: 48, value: 39.8 },
    { month: 'Abr', sales: 61, value: 48.2 },
    { month: 'Mai', sales: 55, value: 44.7 },
    { month: 'Jun', sales: 58, value: 46.9 }
  ];

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{position}</span>;
    }
  };

  const getPositionChange = (current: number, previous: number) => {
    const change = previous - current;
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    } else {
      return <span className="w-4 h-4 text-gray-400">—</span>;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const filteredAgents = agentsData.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Ranking de Agentes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Acompanhe a performance e competição saudável entre a equipe
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
          >
            <option value="month">Este Mês</option>
            <option value="quarter">Este Trimestre</option>
            <option value="year">Este Ano</option>
          </select>
        </div>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total de Vendas
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {agentsData.reduce((sum, agent) => sum + agent.totalSales, 0)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Valor Total
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {formatCurrency(agentsData.reduce((sum, agent) => sum + agent.totalValue, 0))}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Taxa Média
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                {(agentsData.reduce((sum, agent) => sum + agent.conversionRate, 0) / agentsData.length).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Satisfação Média
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                {(agentsData.reduce((sum, agent) => sum + agent.clientSatisfaction, 0) / agentsData.length).toFixed(1)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <Button
          variant={activeTab === 'overall' ? 'default' : 'outline'}
          onClick={() => setActiveTab('overall')}
          className="flex items-center gap-2 text-sm sm:text-base"
        >
          <Trophy className="w-4 h-4" />
          <span className="hidden sm:inline">Ranking Geral</span>
          <span className="sm:hidden">Geral</span>
        </Button>
        <Button
          variant={activeTab === 'performance' ? 'default' : 'outline'}
          onClick={() => setActiveTab('performance')}
          className="flex items-center gap-2 text-sm sm:text-base"
        >
          <BarChart3 className="w-4 h-4" />
          <span className="hidden sm:inline">Performance</span>
          <span className="sm:hidden">Perf.</span>
        </Button>
        <Button
          variant={activeTab === 'analytics' ? 'default' : 'outline'}
          onClick={() => setActiveTab('analytics')}
          className="flex items-center gap-2 text-sm sm:text-base"
        >
          <TrendingUp className="w-4 h-4" />
          <span className="hidden sm:inline">Analytics</span>
          <span className="sm:hidden">Analytics</span>
        </Button>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'overall' && (
        <div className="space-y-6">
          {/* Filtros */}
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          {/* Ranking */}
          <div className="space-y-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="p-4 sm:p-6">
                <div className="flex flex-col xl:flex-row xl:items-center gap-4">
                  {/* Posição e Avatar */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 dark:bg-gray-800">
                      {getPositionIcon(agent.position)}
                    </div>
                    <div className="flex items-center gap-2">
                      {getPositionChange(agent.position, agent.previousPosition)}
                    </div>
                  </div>

                  {/* Informações do Agente */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{agent.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{agent.email}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {agent.badges.map((badge) => (
                            <Badge key={badge} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right sm:text-left sm:ml-4">
                        <p className="text-xs sm:text-sm text-gray-500">Streak</p>
                        <p className="text-sm sm:text-lg font-bold text-orange-600">{agent.streak} dias</p>
                      </div>
                    </div>
                  </div>

                  {/* Métricas */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500">Vendas</p>
                      <p className="text-sm sm:text-lg font-bold text-blue-600">{agent.totalSales}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500">Valor</p>
                      <p className="text-xs sm:text-lg font-bold text-green-600 truncate">
                        {formatCurrency(agent.totalValue)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500">Conversão</p>
                      <p className="text-sm sm:text-lg font-bold text-purple-600">{agent.conversionRate}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500">Satisfação</p>
                      <p className="text-sm sm:text-lg font-bold text-orange-600">{agent.clientSatisfaction}</p>
                    </div>
                  </div>
                </div>

                {/* Progresso da Meta Mensal */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Meta Mensal</span>
                    <span className="text-sm text-gray-500">
                      {agent.monthlyProgress}/{agent.monthlyGoal}
                    </span>
                  </div>
                  <Progress 
                    value={(agent.monthlyProgress / agent.monthlyGoal) * 100} 
                    className="h-2"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Vendas */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Vendas por Agente</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Gráfico de Valor */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Valor em Vendas (Milhões)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}M`, 'Valor']} />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Gráfico de Conversão */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Taxa de Conversão</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Conversão']} />
                <Bar dataKey="conversion" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Tendência Mensal */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tendência de Vendas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} name="Vendas" />
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} name="Valor (M)" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Performers */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
            <div className="space-y-4">
              {agentsData.slice(0, 3).map((agent, index) => (
                <div key={agent.id} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                    {getPositionIcon(index + 1)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-gray-500">{agent.totalSales} vendas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {formatCurrency(agent.totalCommissions)}
                    </p>
                    <p className="text-xs text-gray-500">comissões</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Estatísticas */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Estatísticas Gerais</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Agentes Ativos</span>
                <span className="font-semibold">{agentsData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Venda Média</span>
                <span className="font-semibold">
                  {formatCurrency(agentsData.reduce((sum, agent) => sum + agent.totalValue, 0) / agentsData.length)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tempo Médio</span>
                <span className="font-semibold">
                  {Math.round(agentsData.reduce((sum, agent) => sum + agent.avgDealTime, 0) / agentsData.length)} dias
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Meta Mensal</span>
                <span className="font-semibold">
                  {Math.round(agentsData.reduce((sum, agent) => sum + agent.monthlyProgress, 0) / agentsData.reduce((sum, agent) => sum + agent.monthlyGoal, 0) * 100)}%
                </span>
              </div>
            </div>
          </Card>

          {/* Insights */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Insights</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                <p className="text-sm">
                  <strong>{agentsData[0].name}</strong> está em alta com {agentsData[0].streak} dias de streak
                </p>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                <p className="text-sm">
                  Taxa de conversão média aumentou 5% este mês
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-blue-500 mt-0.5" />
                <p className="text-sm">
                  {agentsData.filter(a => a.monthlyProgress >= a.monthlyGoal).length} agentes atingiram a meta
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-4 h-4 text-purple-500 mt-0.5" />
                <p className="text-sm">
                  Satisfação média dos clientes: {(agentsData.reduce((sum, agent) => sum + agent.clientSatisfaction, 0) / agentsData.length).toFixed(1)}/5
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AgentsRankingPage;
