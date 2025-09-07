import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Building, 
  Users, 
  Calendar,
  Download,
  Filter,
  PieChart,
  Award,
  Clock,
  MapPin
} from 'lucide-react';
import { Button, Card, CardContent, Badge } from '../components/ui';
import { colors } from '../utils/colors';

// Mock data para relatórios
const mockReportData = {
  sales: {
    total: 1250000,
    monthly: 180000,
    growth: 12.5,
    properties: 45,
    averagePrice: 27777,
  },
  visits: {
    total: 234,
    confirmed: 189,
    completed: 156,
    conversion: 82.5,
    averageDuration: 75,
  },
  leads: {
    total: 567,
    qualified: 234,
    converted: 89,
    conversion: 38.0,
    averageTime: 15,
  },
  performance: {
    topAgent: 'João Santos',
    topAgentSales: 320000,
    topProperty: 'Apartamento Centro',
    topPropertyValue: 450000,
    averageDaysOnMarket: 28,
  }
};

const monthlyData = [
  { month: 'Jan', sales: 120000, visits: 18, leads: 45 },
  { month: 'Fev', sales: 180000, visits: 25, leads: 52 },
  { month: 'Mar', sales: 150000, visits: 22, leads: 48 },
  { month: 'Abr', sales: 200000, visits: 30, leads: 58 },
  { month: 'Mai', sales: 220000, visits: 35, leads: 62 },
  { month: 'Jun', sales: 250000, visits: 40, leads: 68 },
];

const propertyTypeData = [
  { type: 'Apartamento', count: 45, percentage: 60 },
  { type: 'Casa', count: 20, percentage: 27 },
  { type: 'Studio', count: 8, percentage: 11 },
  { type: 'Comercial', count: 2, percentage: 2 },
];

const neighborhoodData = [
  { neighborhood: 'Centro', sales: 320000, properties: 12 },
  { neighborhood: 'Jardim Europa', sales: 280000, properties: 8 },
  { neighborhood: 'Higienópolis', sales: 250000, properties: 10 },
  { neighborhood: 'Vila Madalena', sales: 200000, properties: 6 },
  { neighborhood: 'Pinheiros', sales: 180000, properties: 9 },
];

export const ReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? TrendingUp : TrendingDown;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text.title} truncate`}>
            Relatórios & Analytics
          </h1>
          <p className={`text-xs sm:text-sm ${colors.text.body}`}>
            Análises detalhadas do desempenho imobiliário
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm w-full sm:w-auto"
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Ano</option>
          </select>
          <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Exportar</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Vendas Totais</p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.icons.money}`}>
                  {formatCurrency(mockReportData.sales.total)}
                </p>
                <div className="flex items-center mt-1 sm:mt-2">
                  {(() => {
                    const GrowthIcon = getGrowthIcon(mockReportData.sales.growth);
                    return (
                      <>
                        <GrowthIcon className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${colors.icons.primary}`} />
                        <span className={`text-xs sm:text-sm ${colors.icons.primary}`}>
                          {mockReportData.sales.growth}%
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.money} flex items-center justify-center flex-shrink-0`}>
                <DollarSign className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Imóveis Vendidos</p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.text.title}`}>
                  {mockReportData.sales.properties}
                </p>
                <p className={`text-xs sm:text-sm ${colors.text.body} mt-1 sm:mt-2`}>
                  Média: <span className={colors.icons.money}>{formatCurrency(mockReportData.sales.averagePrice)}</span>
                </p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <Building className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Visitas Realizadas</p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.text.title}`}>
                  {mockReportData.visits.completed}
                </p>
                <p className={`text-xs sm:text-sm ${colors.text.body} mt-1 sm:mt-2`}>
                  Taxa: <span className={colors.icons.success}>{mockReportData.visits.conversion}%</span>
                </p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <Calendar className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Leads Convertidos</p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.text.title}`}>
                  {mockReportData.leads.converted}
                </p>
                <p className={`text-xs sm:text-sm ${colors.text.body} mt-1 sm:mt-2`}>
                  Taxa: <span className={colors.icons.success}>{mockReportData.leads.conversion}%</span>
                </p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <Users className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e Análises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {/* Vendas Mensais */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                Vendas Mensais
              </h3>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Exportar</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                        {data.month}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`font-medium text-sm sm:text-base ${colors.icons.money} truncate`}>
                        {formatCurrency(data.sales)}
                      </p>
                      <p className={`text-xs sm:text-sm ${colors.text.body}`}>
                        {data.visits} visitas • {data.leads} leads
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-20 sm:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(data.sales / 250000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Imóveis */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                Tipos de Imóveis
              </h3>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <PieChart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Gráfico</span>
                <span className="sm:hidden">Chart</span>
              </Button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {propertyTypeData.map((data, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 flex-shrink-0" />
                    <span className={`font-medium text-sm sm:text-base ${colors.text.title} truncate`}>
                      {data.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className={`text-xs sm:text-sm ${colors.text.body}`}>
                      {data.count} imóveis
                    </span>
                    <div className="w-16 sm:w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                    <span className={`text-xs sm:text-sm font-medium ${colors.text.title}`}>
                      {data.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance por Bairro */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                Performance por Bairro
              </h3>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Mapa</span>
                <span className="sm:hidden">Map</span>
              </Button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {neighborhoodData.map((data, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${colors.iconBg.success} flex items-center justify-center flex-shrink-0`}>
                      <MapPin className={`h-3 w-3 sm:h-4 sm:w-4 ${colors.icons.success}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`font-medium text-sm sm:text-base ${colors.text.title} truncate`}>
                        {data.neighborhood}
                      </p>
                      <p className={`text-xs sm:text-sm ${colors.text.body}`}>
                        {data.properties} imóveis
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium text-sm sm:text-base ${colors.icons.money}`}>
                      {formatCurrency(data.sales)}
                    </p>
                    <p className={`text-xs sm:text-sm ${colors.text.body}`}>
                      em vendas
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance dos Agentes */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                Top Performers
              </h3>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Ranking</span>
                <span className="sm:hidden">Rank</span>
              </Button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="font-semibold text-yellow-800 dark:text-yellow-200 text-sm sm:text-base">
                      Melhor Corretor
                    </span>
                  </div>
                  <Badge variant="warning" className="text-xs">1º Lugar</Badge>
                </div>
                <p className={`text-base sm:text-lg font-bold ${colors.text.title}`}>
                  {mockReportData.performance.topAgent}
                </p>
                <p className={`text-xs sm:text-sm ${colors.icons.money}`}>
                  {formatCurrency(mockReportData.performance.topAgentSales)} em vendas
                </p>
              </div>
              
              <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Building className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-blue-800 dark:text-blue-200 text-sm sm:text-base">
                      Imóvel Mais Vendido
                    </span>
                  </div>
                  <Badge variant="primary" className="text-xs">Top</Badge>
                </div>
                <p className={`text-base sm:text-lg font-bold ${colors.text.title}`}>
                  {mockReportData.performance.topProperty}
                </p>
                <p className={`text-xs sm:text-sm ${colors.icons.money}`}>
                  {formatCurrency(mockReportData.performance.topPropertyValue)}
                </p>
              </div>
              
              <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-green-800 dark:text-green-200 text-sm sm:text-base">
                      Tempo Médio no Mercado
                    </span>
                  </div>
                  <Badge variant="success" className="text-xs">Rápido</Badge>
                </div>
                <p className={`text-base sm:text-lg font-bold ${colors.text.title}`}>
                  {mockReportData.performance.averageDaysOnMarket} dias
                </p>
                <p className={`text-xs sm:text-sm ${colors.text.body}`}>
                  Média de venda
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relatórios Detalhados */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              Relatórios Detalhados
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Filtrar</span>
                <span className="sm:hidden">Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Excel
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <h4 className={`font-medium text-sm sm:text-base ${colors.text.title}`}>Vendas</h4>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className={colors.text.body}>Total:</span>
                  <span className={`font-medium ${colors.icons.money}`}>{formatCurrency(mockReportData.sales.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={colors.text.body}>Mensal:</span>
                  <span className={`font-medium ${colors.icons.money}`}>{formatCurrency(mockReportData.sales.monthly)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={colors.text.body}>Crescimento:</span>
                  <span className={`font-medium ${colors.icons.primary}`}>
                    {mockReportData.sales.growth}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className={`font-medium text-sm sm:text-base ${colors.text.title}`}>Visitas</h4>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className={colors.text.body}>Total:</span>
                  <span className={`font-medium ${colors.text.title}`}>{mockReportData.visits.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className={colors.text.body}>Confirmadas:</span>
                  <span className={`font-medium ${colors.text.title}`}>{mockReportData.visits.confirmed}</span>
                </div>
                <div className="flex justify-between">
                  <span className={colors.text.body}>Taxa Conversão:</span>
                  <span className={`font-medium ${colors.icons.success}`}>{mockReportData.visits.conversion}%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className={`font-medium text-sm sm:text-base ${colors.text.title}`}>Leads</h4>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className={colors.text.body}>Total:</span>
                  <span className={`font-medium ${colors.text.title}`}>{mockReportData.leads.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className={colors.text.body}>Qualificados:</span>
                  <span className={`font-medium ${colors.text.title}`}>{mockReportData.leads.qualified}</span>
                </div>
                <div className="flex justify-between">
                  <span className={colors.text.body}>Convertidos:</span>
                  <span className={`font-medium ${colors.icons.success}`}>{mockReportData.leads.converted}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
