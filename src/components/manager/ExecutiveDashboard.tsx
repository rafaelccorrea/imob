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
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '../ui';
import { colors } from '../../utils/colors';
import { formatCurrency, formatDate } from '../../utils';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import type { TeamPerformance, ExecutiveMetrics } from '../../types';

interface ExecutiveDashboardProps {
  teamPerformance: TeamPerformance[];
  metrics: ExecutiveMetrics;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  teamPerformance,
  metrics
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Dados para gráficos
  const salesData = teamPerformance.map(agent => ({
    name: agent.agentName.split(' ')[0],
    sales: agent.sales,
    leads: agent.leads,
    conversion: agent.conversionRate
  }));

  const performanceData = teamPerformance.map(agent => ({
    name: agent.agentName.split(' ')[0],
    performance: agent.conversionRate,
    commission: agent.commission
  }));

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400';
      case 'down': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getTrendText = (trend: string) => {
    switch (trend) {
      case 'up': return 'Crescimento';
      case 'down': return 'Declínio';
      default: return 'Estável';
    }
  };

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Vendas Totais
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {metrics.totalSales}
                </p>
                <p className={`text-xs flex items-center gap-1 ${getTrendColor(metrics.marketInsights.trend)}`}>
                  {getTrendIcon(metrics.marketInsights.trend)}
                  {getTrendText(metrics.marketInsights.trend)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Leads Totais
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {metrics.totalLeads}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {teamPerformance.length} corretores
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Conversão Média
                </p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {metrics.averageConversion.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Meta: 15%
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                <Percent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Meta Mensal
                </p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {metrics.teamGoals.monthly}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {((metrics.totalSales / metrics.teamGoals.monthly) * 100).toFixed(1)}% atingida
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance da Equipe */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={colors.text.title}>
              Performance da Equipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#10b981" name="Vendas" />
                <Bar dataKey="leads" fill="#3b82f6" name="Leads" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={colors.text.title}>
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Conversão']} />
                <Bar dataKey="performance" fill="#8b5cf6" name="Conversão %" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Ranking da Equipe */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
            <Crown className="h-5 w-5 text-yellow-500" />
            Ranking da Equipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamPerformance.map((agent, index) => (
              <div key={agent.agentId} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                    {index === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
                    {index === 1 && <Star className="h-5 w-5 text-gray-400" />}
                    {index === 2 && <Award className="h-5 w-5 text-orange-500" />}
                    {index > 2 && <span className="text-sm font-bold text-gray-600 dark:text-gray-300">#{index + 1}</span>}
                  </div>
                  <div>
                    <p className={`font-medium ${colors.text.title}`}>
                      {agent.agentName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {agent.sales} vendas • {agent.leads} leads • {agent.conversionRate}% conversão
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(agent.commission)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Comissões
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights de Mercado */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Insights de Mercado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-semibold mb-3 ${colors.text.title}`}>
                Tendência do Mercado
              </h4>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {getTrendIcon(metrics.marketInsights.trend)}
                <div>
                  <p className={`font-medium ${colors.text.title}`}>
                    {getTrendText(metrics.marketInsights.trend)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {metrics.marketInsights.seasonality}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${colors.text.title}`}>
                Recomendações
              </h4>
              <div className="space-y-2">
                {metrics.marketInsights.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metas da Equipe */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
            <Target className="h-5 w-5 text-green-500" />
            Metas da Equipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {metrics.teamGoals.monthly}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Meta Mensal</p>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(metrics.totalSales / metrics.teamGoals.monthly) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {((metrics.totalSales / metrics.teamGoals.monthly) * 100).toFixed(1)}% atingida
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {metrics.teamGoals.quarterly}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Meta Trimestral</p>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(metrics.totalSales * 3 / metrics.teamGoals.quarterly) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {((metrics.totalSales * 3 / metrics.teamGoals.quarterly) * 100).toFixed(1)}% atingida
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {metrics.teamGoals.yearly}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Meta Anual</p>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(metrics.totalSales * 12 / metrics.teamGoals.yearly) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {((metrics.totalSales * 12 / metrics.teamGoals.yearly) * 100).toFixed(1)}% atingida
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
