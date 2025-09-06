import React from 'react';
import { useAuthStore } from '../stores';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, ConditionalMenu } from '../components/ui';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building2, 
  Calendar,
  Plus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { usePermissions } from '../hooks/usePermissions';

// Dados mockados para demonstração
const monthlyData = [
  { month: 'Jan', vendas: 12, locacoes: 8, receita: 45000 },
  { month: 'Fev', vendas: 15, locacoes: 10, receita: 52000 },
  { month: 'Mar', vendas: 18, locacoes: 12, receita: 61000 },
  { month: 'Abr', vendas: 14, locacoes: 9, receita: 48000 },
  { month: 'Mai', vendas: 20, locacoes: 15, receita: 68000 },
  { month: 'Jun', vendas: 22, locacoes: 18, receita: 75000 },
];

const propertyTypeData = [
  { name: 'Casas', value: 45, color: '#3B82F6' },
  { name: 'Apartamentos', value: 35, color: '#10B981' },
  { name: 'Comercial', value: 15, color: '#F59E0B' },
  { name: 'Terrenos', value: 5, color: '#EF4444' },
];

const recentDeals = [
  {
    id: '1',
    type: 'Venda',
    property: 'Casa em Alphaville',
    client: 'João Silva',
    value: 850000,
    agent: 'Maria Santos',
    date: '2024-01-15',
    status: 'Fechado'
  },
  {
    id: '2',
    type: 'Locação',
    property: 'Apartamento Centro',
    client: 'Ana Costa',
    value: 2500,
    agent: 'Pedro Lima',
    date: '2024-01-14',
    status: 'Em Andamento'
  },
  {
    id: '3',
    type: 'Venda',
    property: 'Loja Comercial',
    client: 'Carlos Oliveira',
    value: 1200000,
    agent: 'Lucia Ferreira',
    date: '2024-01-13',
    status: 'Fechado'
  },
];

const expiringContracts = [
  {
    id: '1',
    property: 'Apartamento Jardins',
    tenant: 'Roberto Almeida',
    endDate: '2024-02-15',
    value: 3200
  },
  {
    id: '2',
    property: 'Casa Vila Madalena',
    tenant: 'Fernanda Lima',
    endDate: '2024-02-20',
    value: 4500
  },
];

const metrics = {
  totalRevenue: 1250000,
  monthlyRevenue: 75000,
  activeProperties: 156,
  soldProperties: 22,
  rentedProperties: 18,
  activeLeads: 89,
  closedDeals: 40,
  pendingCommissions: 12500,
  expiringContracts: 5,
};

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { hasPermission } = usePermissions();

  // Função para detectar se está no modo dark
  const isDarkMode = () => {
    return document.documentElement.classList.contains('dark');
  };

  // Função para obter a cor baseada no valor e tipo
  const getValueColor = (value: number, type: string = 'income') => {
    const dark = isDarkMode();
    if (value < 0) {
      return dark ? '#f87171' : '#dc2626'; // Vermelho para valores negativos
    } else if (type === 'expense' || type === 'despesa') {
      return dark ? '#f87171' : '#dc2626'; // Vermelho para despesas
    } else {
      return dark ? '#4ade80' : '#16a34a'; // Verde para valores positivos
    }
  };

  // Função para obter a cor do ícone baseada no tipo
  const getIconColor = (type: string) => {
    const dark = isDarkMode();
    if (type === 'profit' || type === 'income') {
      return dark ? '#4ade80' : '#16a34a'; // Verde para lucro/receita
    } else if (type === 'expense') {
      return dark ? '#f87171' : '#dc2626'; // Vermelho para despesa
    } else {
      return dark ? '#4ade80' : '#16a34a'; // Verde por padrão
    }
  };

  // Função para determinar a cor baseada no valor (mantida para compatibilidade)
  const getValueColorClass = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
    if (numValue > 0) return 'success';
    if (numValue < 0) return 'danger';
    return 'primary';
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    trend?: string;
    color?: string;
  }> = ({ title, value, icon: Icon, trend, color }) => {
    // Se não foi especificada uma cor, usar a cor baseada no valor
    const finalColor = color || getValueColorClass(value);
    
    // Verificar se é um valor monetário
    const isMonetary = typeof value === 'string' && value.includes('R$');
    
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-white">{title}</p>
              <p className={`text-2xl font-bold ${
                isMonetary 
                  ? `text-${finalColor}-600` 
                  : `text-${finalColor}-600 dark:text-white`
              }`}>{value}</p>
              {trend && (
                <p className={`text-xs flex items-center mt-1 ${
                  trend.includes('+') ? 'text-success-600 dark:text-white' : 'text-danger-600 dark:text-white'
                }`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {trend}
                </p>
              )}
            </div>
                         <div className={`h-12 w-12 rounded-lg bg-${finalColor}-100 dark:bg-${finalColor}-900 flex items-center justify-center`}>
               <Icon className={`h-6 w-6 text-${finalColor}-600 dark:text-white`} />
             </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-full space-y-4 md:space-y-6 p-4 md:p-6 custom-scroll overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-xl md:text-2xl font-bold ${colors.text.title}`}>
            Dashboard
          </h1>
          <p className={`text-sm md:text-base ${colors.text.body}`}>
            Bem-vindo de volta, {user?.name}! Aqui está um resumo do seu negócio.
          </p>
        </div>
        <ConditionalMenu requiredPermission="properties">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Novo Imóvel
          </Button>
        </ConditionalMenu>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.body}`}>Receita Total</p>
                <p className={`text-2xl font-bold ${colors.icons.money}`}>
                  {formatCurrency(metrics.totalRevenue)}
                </p>
                <p className={`text-xs ${colors.icons.success} flex items-center mt-1`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% este mês
                </p>
              </div>
              <div className={`h-10 w-10 md:h-12 md:w-12 rounded-lg ${colors.iconBg.money} flex items-center justify-center`}>
                <DollarSign className={`h-5 w-5 md:h-6 md:w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <MetricCard
          title="Imóveis Ativos"
          value={metrics.activeProperties}
          icon={Building2}
          color="primary"
        />
        <MetricCard
          title="Leads Ativos"
          value={metrics.activeLeads}
          icon={Users}
          color="primary"
        />
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Comissões Pendentes</p>
                <p className="text-2xl font-bold" style={{ color: getValueColor(metrics.pendingCommissions, 'expense') }}>
                  {formatCurrency(metrics.pendingCommissions)}
                </p>
              </div>
                             <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-danger-100 dark:bg-danger-900 flex items-center justify-center">
                 <DollarSign className="h-5 w-5 md:h-6 md:w-6" style={{ color: getIconColor('expense') }} />
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="dark:text-white">Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="receita" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Property Types Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="dark:text-white">Tipos de Imóveis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                >
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Deals */}
        <Card>
          <CardHeader>
            <CardTitle className="dark:text-white">Negociações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentDeals.map((deal) => (
                <div key={deal.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg dark:border-gray-700 min-w-0 gap-3 sm:gap-2">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      deal.type === 'Venda' ? 'bg-success-100 dark:bg-success-900' : 'bg-primary-100 dark:bg-primary-900'
                    }`}>
                      <DollarSign className="h-4 w-4" style={{ color: deal.type === 'Venda' ? getIconColor('income') : getIconColor('income') }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-secondary-900 dark:text-secondary-100 truncate text-sm sm:text-base">{deal.property}</p>
                      <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">{deal.client}</p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-500 truncate sm:hidden">{deal.agent}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-col sm:text-right gap-2 sm:gap-1">
                    <p className="font-medium text-sm sm:text-base" style={{ color: getValueColor(deal.value, 'income') }}>
                      {formatCurrency(deal.value)}
                    </p>
                    <div className="flex items-center justify-between sm:justify-end gap-2">
                      <Badge variant={deal.status === 'Fechado' ? 'default' : 'destructive'} className="text-xs">
                        {deal.status}
                      </Badge>
                      <span className="text-xs text-secondary-500 dark:text-secondary-500 sm:hidden">
                        {formatDate(deal.date)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expiring Contracts */}
        <Card>
          <CardHeader>
            <CardTitle className="dark:text-white">Contratos Vencendo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {expiringContracts.map((contract) => (
                <div key={contract.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg dark:border-gray-700 min-w-0 gap-3 sm:gap-2">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="h-8 w-8 rounded-full bg-warning-100 dark:bg-warning-900 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-4 w-4 text-warning-600 dark:text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-secondary-900 dark:text-secondary-100 truncate text-sm sm:text-base">{contract.property}</p>
                      <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">{contract.tenant}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-col sm:text-right gap-2 sm:gap-1">
                    <p className="font-medium text-sm sm:text-base" style={{ color: getValueColor(contract.value, 'income') }}>
                      {formatCurrency(contract.value)}
                    </p>
                    <p className="text-xs sm:text-sm text-warning-600 dark:text-white">
                      Vence em {formatDate(contract.endDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="dark:text-white">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Button variant="outline" className="h-16 sm:h-20 flex-col p-3 sm:p-4">
              <Plus className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm font-medium">Novo Imóvel</span>
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col p-3 sm:p-4">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm font-medium">Novo Lead</span>
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col p-3 sm:p-4">
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm font-medium">Nova Venda</span>
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col p-3 sm:p-4">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm font-medium">Agendar Visita</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
