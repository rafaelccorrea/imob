import React from 'react';
import { useAuthStore } from '../stores';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '../components/ui';
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

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    trend?: string;
    color?: string;
  }> = ({ title, value, icon: Icon, trend, color = 'primary' }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-600">{title}</p>
            <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
            {trend && (
              <p className="text-xs text-success-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className={`h-12 w-12 rounded-lg bg-${color}-100 flex items-center justify-center`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">
            Dashboard
          </h1>
          <p className="text-secondary-600">
            Bem-vindo de volta, {user?.name}! Aqui está um resumo do seu negócio.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Imóvel
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Receita Total"
          value={formatCurrency(metrics.totalRevenue)}
          icon={DollarSign}
          trend="+12% este mês"
          color="success"
        />
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
          color="warning"
        />
        <MetricCard
          title="Comissões Pendentes"
          value={formatCurrency(metrics.pendingCommissions)}
          icon={DollarSign}
          color="danger"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
            <CardTitle>Tipos de Imóveis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deals */}
        <Card>
          <CardHeader>
            <CardTitle>Negociações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeals.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      deal.type === 'Venda' ? 'bg-success-100' : 'bg-primary-100'
                    }`}>
                      <DollarSign className={`h-4 w-4 ${
                        deal.type === 'Venda' ? 'text-success-600' : 'text-primary-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">{deal.property}</p>
                      <p className="text-sm text-secondary-600">{deal.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-secondary-900">
                      {formatCurrency(deal.value)}
                    </p>
                    <Badge variant={deal.status === 'Fechado' ? 'default' : 'destructive'}>
                      {deal.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expiring Contracts */}
        <Card>
          <CardHeader>
            <CardTitle>Contratos Vencendo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringContracts.map((contract) => (
                <div key={contract.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-warning-100 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-warning-600" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">{contract.property}</p>
                      <p className="text-sm text-secondary-600">{contract.tenant}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-secondary-900">
                      {formatCurrency(contract.value)}
                    </p>
                    <p className="text-sm text-warning-600">
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
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Novo Imóvel
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Novo Lead
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              Nova Venda
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Agendar Visita
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
