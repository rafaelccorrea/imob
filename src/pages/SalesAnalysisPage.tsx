import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  DollarSign, 
  Target, 
  AlertTriangle,
  Plus,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Calendar,
  MapPin,
  Users,
  Award,
  TrendingUp as Growth
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Tabs, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Progress } from '../components/ui/Progress';
import { LineChart, BarChart, PieChart as RechartsPieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Line, Bar, Cell, Pie } from 'recharts';

interface Sale {
  id: string;
  property: string;
  value: number;
  date: string;
  realEstateAgency: string;
  isOwnAgency: boolean;
  agent: string;
  propertyType: string;
  location: string;
  commission: number;
  status: 'completed' | 'lost' | 'pending';
}

interface CompetitorAnalysis {
  agency: string;
  totalSales: number;
  totalValue: number;
  marketShare: number;
  avgPrice: number;
  growth: number;
}

const SalesAnalysisPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddSaleModal, setShowAddSaleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAgency, setFilterAgency] = useState('all');

  // Mock data - vendas
  const salesData: Sale[] = [
    {
      id: '1',
      property: 'Apartamento Copacabana',
      value: 850000,
      date: '2024-01-15',
      realEstateAgency: 'Imobiliária Própria',
      isOwnAgency: true,
      agent: 'João Silva',
      propertyType: 'Apartamento',
      location: 'Copacabana, RJ',
      commission: 25500,
      status: 'completed'
    },
    {
      id: '2',
      property: 'Casa Barra da Tijuca',
      value: 1200000,
      date: '2024-01-20',
      realEstateAgency: 'Concorrente A',
      isOwnAgency: false,
      agent: 'Maria Santos',
      propertyType: 'Casa',
      location: 'Barra da Tijuca, RJ',
      commission: 0,
      status: 'lost'
    },
    {
      id: '3',
      property: 'Loja Ipanema',
      value: 650000,
      date: '2024-01-25',
      realEstateAgency: 'Imobiliária Própria',
      isOwnAgency: true,
      agent: 'Pedro Costa',
      propertyType: 'Comercial',
      location: 'Ipanema, RJ',
      commission: 19500,
      status: 'completed'
    },
    {
      id: '4',
      property: 'Apartamento Leblon',
      value: 950000,
      date: '2024-02-01',
      realEstateAgency: 'Concorrente B',
      isOwnAgency: false,
      agent: 'Ana Lima',
      propertyType: 'Apartamento',
      location: 'Leblon, RJ',
      commission: 0,
      status: 'lost'
    }
  ];

  // Mock data - análise de concorrentes
  const competitorData: CompetitorAnalysis[] = [
    {
      agency: 'Imobiliária Própria',
      totalSales: 15,
      totalValue: 12500000,
      marketShare: 35,
      avgPrice: 833333,
      growth: 12
    },
    {
      agency: 'Concorrente A',
      totalSales: 12,
      totalValue: 9800000,
      marketShare: 28,
      avgPrice: 816667,
      growth: 8
    },
    {
      agency: 'Concorrente B',
      totalSales: 10,
      totalValue: 8500000,
      marketShare: 24,
      avgPrice: 850000,
      growth: 15
    },
    {
      agency: 'Concorrente C',
      totalSales: 8,
      totalValue: 6200000,
      marketShare: 18,
      avgPrice: 775000,
      growth: -5
    }
  ];

  // Cálculos
  const ownSales = salesData.filter(sale => sale.isOwnAgency);
  const lostSales = salesData.filter(sale => !sale.isOwnAgency);
  const totalOwnValue = ownSales.reduce((sum, sale) => sum + sale.value, 0);
  const totalLostValue = lostSales.reduce((sum, sale) => sum + sale.value, 0);
  const totalOwnCommission = ownSales.reduce((sum, sale) => sum + sale.commission, 0);
  const marketShare = (totalOwnValue / (totalOwnValue + totalLostValue)) * 100;

  // Dados para gráficos
  const salesTrendData = [
    { month: 'Jan', own: 2, lost: 1, total: 3 },
    { month: 'Fev', own: 3, lost: 2, total: 5 },
    { month: 'Mar', own: 4, lost: 1, total: 5 },
    { month: 'Abr', own: 3, lost: 3, total: 6 },
    { month: 'Mai', own: 5, lost: 2, total: 7 },
    { month: 'Jun', own: 4, lost: 1, total: 5 }
  ];

  const propertyTypeData = [
    { name: 'Apartamento', value: 45, count: 9 },
    { name: 'Casa', value: 30, count: 6 },
    { name: 'Comercial', value: 15, count: 3 },
    { name: 'Terreno', value: 10, count: 2 }
  ];

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

  const filteredSales = salesData.filter(sale => {
    const matchesSearch = sale.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.agent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgency = filterAgency === 'all' || 
                         (filterAgency === 'own' && sale.isOwnAgency) ||
                         (filterAgency === 'competitor' && !sale.isOwnAgency);
    return matchesSearch && matchesAgency;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Análise de Vendas e Concorrência
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Acompanhe suas vendas e analise a concorrência no mercado
          </p>
        </div>
        <Button 
          onClick={() => setShowAddSaleModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Cadastrar Venda
        </Button>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Vendas Próprias
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {ownSales.length}
              </p>
              <p className="text-sm text-gray-500">
                {formatCurrency(totalOwnValue)}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Vendas Perdidas
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">
                {lostSales.length}
              </p>
              <p className="text-sm text-gray-500">
                {formatCurrency(totalLostValue)}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Market Share
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {marketShare.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500">
                Participação no mercado
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Comissões Ganhas
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                {formatCurrency(totalOwnCommission)}
              </p>
              <p className="text-sm text-gray-500">
                Receita total
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-wrap gap-2 mb-6">
          <TabsTrigger 
            value="overview" 
            onClick={() => setActiveTab('overview')}
            className={activeTab === 'overview' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' : ''}
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger 
            value="sales" 
            onClick={() => setActiveTab('sales')}
            className={activeTab === 'sales' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' : ''}
          >
            Vendas Detalhadas
          </TabsTrigger>
          <TabsTrigger 
            value="competitors" 
            onClick={() => setActiveTab('competitors')}
            className={activeTab === 'competitors' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' : ''}
          >
            Análise de Concorrentes
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            onClick={() => setActiveTab('analytics')}
            className={activeTab === 'analytics' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' : ''}
          >
            Analytics
          </TabsTrigger>
        </div>

        {/* Visão Geral */}
        {activeTab === 'overview' && (
          <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Tendência */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tendência de Vendas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="own" stroke="#10B981" strokeWidth={2} name="Vendas Próprias" />
                  <Line type="monotone" dataKey="lost" stroke="#EF4444" strokeWidth={2} name="Vendas Perdidas" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Gráfico de Tipos de Imóveis */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tipos de Imóveis Vendidos</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, count }) => `${name} (${count})`}
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Análise de Concorrentes */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Ranking de Concorrentes</h3>
            <div className="space-y-4">
              {competitorData.map((competitor, index) => (
                <div key={competitor.agency} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20">
                      <span className="text-sm font-bold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{competitor.agency}</p>
                      <p className="text-sm text-gray-500">
                        {competitor.totalSales} vendas • {formatCurrency(competitor.totalValue)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{competitor.marketShare}%</p>
                    <p className="text-sm text-gray-500">
                      {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        )}

        {/* Vendas Detalhadas */}
        {activeTab === 'sales' && (
          <TabsContent value="sales" className="space-y-6">
          {/* Filtros */}
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por imóvel ou agente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <select
                value={filterAgency}
                onChange={(e) => setFilterAgency(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
              >
                <option value="all">Todas as agências</option>
                <option value="own">Própria</option>
                <option value="competitor">Concorrentes</option>
              </select>
            </div>
          </Card>

          {/* Lista de Vendas */}
          <div className="space-y-4">
            {filteredSales.map((sale) => (
              <Card key={sale.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{sale.property}</h3>
                      <Badge variant={sale.isOwnAgency ? 'success' : 'destructive'}>
                        {sale.isOwnAgency ? 'Própria' : 'Concorrente'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs sm:text-sm">Valor</p>
                        <p className="font-medium text-xs sm:text-sm truncate">{formatCurrency(sale.value)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs sm:text-sm">Agência</p>
                        <p className="font-medium text-xs sm:text-sm truncate">{sale.realEstateAgency}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs sm:text-sm">Agente</p>
                        <p className="font-medium text-xs sm:text-sm truncate">{sale.agent}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs sm:text-sm">Comissão</p>
                        <p className="font-medium text-xs sm:text-sm truncate">
                          {sale.commission > 0 ? formatCurrency(sale.commission) : '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        )}

        {/* Análise de Concorrentes */}
        {activeTab === 'competitors' && (
          <TabsContent value="competitors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Share */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Market Share por Agência</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={competitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="agency" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="marketShare" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Crescimento */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Crescimento das Agências</h3>
              <div className="space-y-4">
                {competitorData.map((competitor) => (
                  <div key={competitor.agency} className="flex items-center justify-between">
                    <span className="font-medium">{competitor.agency}</span>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={Math.abs(competitor.growth)} 
                        className="w-20"
                      />
                      <span className={`text-sm font-medium ${
                        competitor.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Análise de Perdas</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">
                    {formatCurrency(totalLostValue)}
                  </p>
                  <p className="text-sm text-gray-500">Valor perdido</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {lostSales.length}
                  </p>
                  <p className="text-sm text-gray-500">Vendas perdidas</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {((ownSales.length / (ownSales.length + lostSales.length)) * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">Taxa de sucesso</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(totalOwnValue / ownSales.length)}
                  </p>
                  <p className="text-sm text-gray-500">Ticket médio</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recomendações</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <p className="text-sm">
                    Foque em apartamentos - 45% das vendas
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                  <p className="text-sm">
                    Concorrente B está crescendo 15%
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-blue-500 mt-0.5" />
                  <p className="text-sm">
                    Melhore em Barra da Tijuca
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        )}
      </Tabs>

      {/* Modal de Cadastro de Venda */}
      <Modal
        isOpen={showAddSaleModal}
        onClose={() => setShowAddSaleModal(false)}
        title="Cadastrar Nova Venda"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Imóvel</label>
            <Input placeholder="Nome do imóvel" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Valor</label>
            <Input placeholder="R$ 0,00" type="number" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Agência Responsável</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option value="own">Imobiliária Própria</option>
              <option value="competitor">Concorrente</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Agente</label>
            <Input placeholder="Nome do agente" />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddSaleModal(false)}>
              Cancelar
            </Button>
            <Button>Cadastrar Venda</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SalesAnalysisPage;
