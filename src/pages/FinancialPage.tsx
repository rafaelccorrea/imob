import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  Download,
  Eye,
  Clock,
  Users,
  Target
} from 'lucide-react';
import { usePermissions } from '../hooks/usePermissions';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { 
  mockFinancialEntries, 
  mockFinancialCommissions, 
  mockCashFlowEntries, 
  mockFinancialMetrics,
  mockAgentFinancialSummaries
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import type { FinancialEntry, Commission as FinancialCommission } from '../types/financial';

export const FinancialPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'entries' | 'commissions' | 'cashflow'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<FinancialEntry | FinancialCommission | null>(null);
  const { hasPermission } = usePermissions();


  // Função para obter a cor baseada no valor e tipo
  const getValueColor = (value: number, type: string = 'income') => {
    if (value < 0) {
      return 'text-red-600 dark:text-red-400';
    } else if (type === 'expense' || type === 'despesa') {
      return 'text-red-600 dark:text-red-400';
    } else {
      return 'text-green-600 dark:text-green-400';
    }
  };


  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'pago':
        return 'success';
      case 'pending':
      case 'pendente':
        return 'warning';
      case 'overdue':
      case 'vencido':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Filtrar entradas financeiras
  const filteredEntries = mockFinancialEntries.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || entry.type === selectedType;
    const matchesStatus = !selectedStatus || entry.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Filtrar comissões
  const filteredCommissions = mockFinancialCommissions.filter(commission => {
    const matchesSearch = commission.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || commission.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Dados para gráficos
  const cashFlowData = mockCashFlowEntries.map(entry => ({
    date: formatDate(entry.date),
    income: entry.income,
    expense: entry.expense,
    balance: entry.balance
  }));

  const categoryData = mockFinancialMetrics.topCategories.map(cat => ({
    name: cat.category,
    value: cat.amount,
    percentage: cat.percentage
  }));

  const agentPerformanceData = mockAgentFinancialSummaries.map(agent => ({
    name: agent.agentName.split(' ')[0], // Apenas primeiro nome
    commissions: agent.totalCommissions,
    deals: agent.dealsClosed,
    conversion: agent.conversionRate
  }));

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Target },
    { id: 'entries', label: 'Entradas/Saídas', icon: DollarSign },
    { id: 'commissions', label: 'Comissões', icon: Users },
    { id: 'cashflow', label: 'Fluxo de Caixa', icon: TrendingUp }
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Financeiro
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Controle financeiro completo da imobiliária
           </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <ConditionalMenu requiredPermission="financial">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </ConditionalMenu>
          <ConditionalMenu requiredPermission="financial">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Entrada
            </Button>
          </ConditionalMenu>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Receita Total
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {formatCurrency(mockFinancialMetrics.totalIncome)}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400`}>
                  +12.5% vs mês anterior
                 </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <TrendingUp className={`h-6 w-6 ${colors.icons.money}`} />
               </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Despesas Totais
                </p>
                <p className={`text-2xl font-bold text-red-600 dark:text-red-400`}>
                  {formatCurrency(mockFinancialMetrics.totalExpense)}
                </p>
                <p className={`text-xs text-red-600 dark:text-red-400`}>
                  +8.2% vs mês anterior
                 </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.error}`}>
                <TrendingDown className={`h-6 w-6 ${colors.icons.error}`} />
               </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Saldo Líquido
                </p>
                <p className={`text-2xl font-bold ${mockFinancialMetrics.netBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatCurrency(mockFinancialMetrics.netBalance)}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400`}>
                  +15.3% vs mês anterior
                 </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <DollarSign className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Comissões Pendentes
                </p>
                <p className={`text-2xl font-bold text-yellow-600 dark:text-yellow-400`}>
                  {formatCurrency(mockFinancialMetrics.pendingCommissions)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  3 corretores
                 </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <Clock className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
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
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fluxo de Caixa */}
        <Card>
          <CardHeader>
                <CardTitle className={colors.text.title}>
                  Fluxo de Caixa (Últimos 30 dias)
                </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), '']}
                      labelFormatter={(label) => `Data: ${label}`}
                />
                <Line 
                  type="monotone" 
                      dataKey="income" 
                      stroke="#10b981" 
                  strokeWidth={2}
                  name="Receitas"
                />
                <Line 
                  type="monotone" 
                      dataKey="expense" 
                      stroke="#ef4444" 
                  strokeWidth={2}
                  name="Despesas"
                />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Saldo"
                    />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

            {/* Categorias */}
        <Card>
          <CardHeader>
                <CardTitle className={colors.text.title}>
                  Despesas por Categoria
                </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                    <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

          {/* Performance dos Corretores */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Performance dos Corretores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={agentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'conversion' ? `${value}%` : formatCurrency(value),
                      name === 'commissions' ? 'Comissões' : 
                      name === 'deals' ? 'Negócios' : 'Conversão'
                    ]}
                  />
                  <Bar dataKey="commissions" fill="#10b981" name="Comissões" />
                  <Bar dataKey="deals" fill="#3b82f6" name="Negócios" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'entries' && (
        <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
              <Input
                    placeholder="Buscar por descrição ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
                             <option value="">Todos os tipos</option>
                  <option value="income">Receitas</option>
                  <option value="expense">Despesas</option>
            </select>
            <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Todos os status</option>
                  <option value="paid">Pago</option>
                  <option value="pending">Pendente</option>
                  <option value="overdue">Vencido</option>
            </select>
          </div>
        </CardContent>
      </Card>

          {/* Lista de Entradas */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Entradas e Saídas ({filteredEntries.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
      <div className="space-y-4">
                {filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${colors.iconBg[entry.type === 'income' ? 'money' : 'error']}`}>
                        {entry.type === 'income' ? (
                          <TrendingUp className={`h-5 w-5 ${colors.icons.money}`} />
                        ) : (
                          <TrendingDown className={`h-5 w-5 ${colors.icons.error}`} />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {entry.description}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {entry.category} • {formatDate(entry.date)}
                        </p>
                        {entry.tags && (
                          <div className="flex gap-1 mt-1">
                            {entry.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-bold ${getValueColor(entry.amount, entry.type)}`}>
                          {entry.type === 'expense' ? '-' : '+'}{formatCurrency(entry.amount)}
                        </p>
                        <Badge variant={getStatusColor(entry.status) as any}>
                          {entry.status === 'paid' ? 'Pago' : 
                           entry.status === 'pending' ? 'Pendente' : 'Vencido'}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEntry(entry);
                          setShowModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'commissions' && (
        <div className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <Input
                    placeholder="Buscar por corretor ou propriedade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Todos os status</option>
                  <option value="paid">Pago</option>
                  <option value="pending">Pendente</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Comissões */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Comissões ({filteredCommissions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCommissions.map((commission) => (
                  <div
                    key={commission.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${colors.iconBg.success}`}>
                        <Users className={`h-5 w-5 ${colors.icons.success}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {commission.agentName}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {commission.propertyTitle}
                        </p>
                        <p className={`text-xs text-gray-600 dark:text-gray-300`}>
                          {commission.dealType === 'sale' ? 'Venda' : 'Locação'} • 
                          Taxa: {(commission.commissionRate * 100).toFixed(1)}% • 
                          Vencimento: {formatDate(commission.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-bold text-green-600 dark:text-green-400`}>
                          {formatCurrency(commission.commissionAmount)}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          Valor do negócio: {formatCurrency(commission.dealValue)}
                        </p>
                        <Badge variant={getStatusColor(commission.status) as any}>
                          {commission.status === 'paid' ? 'Pago' : 
                           commission.status === 'pending' ? 'Pendente' : 'Cancelado'}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEntry(commission);
                          setShowModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'cashflow' && (
        <div className="space-y-6">
          {/* Resumo do Fluxo de Caixa */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                      Entradas do Mês
                    </p>
                    <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                      {formatCurrency(mockFinancialMetrics.totalIncome)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                    <TrendingUp className={`h-6 w-6 ${colors.icons.money}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
                  
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                      Saídas do Mês
                    </p>
                    <p className={`text-2xl font-bold text-red-600 dark:text-red-400`}>
                      {formatCurrency(mockFinancialMetrics.totalExpense)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${colors.iconBg.error}`}>
                    <TrendingDown className={`h-6 w-6 ${colors.icons.error}`} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                      Saldo Atual
                    </p>
                    <p className={`text-2xl font-bold ${mockFinancialMetrics.netBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(mockFinancialMetrics.netBalance)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                    <DollarSign className={`h-6 w-6 ${colors.icons.success}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico Detalhado */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Fluxo de Caixa Detalhado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      formatCurrency(value),
                      name === 'income' ? 'Receitas' : 
                      name === 'expense' ? 'Despesas' : 'Saldo'
                    ]}
                    labelFormatter={(label) => `Data: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Receitas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expense" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="Despesas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Saldo"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Lista de Movimentações */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Movimentações Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCashFlowEntries.slice().reverse().map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        entry.income > 0 ? colors.iconBg.money : colors.iconBg.error
                      }`}>
                        {entry.income > 0 ? (
                          <TrendingUp className={`h-5 w-5 ${colors.icons.money}`} />
                        ) : (
                          <TrendingDown className={`h-5 w-5 ${colors.icons.error}`} />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {entry.description}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {entry.category} • {formatDate(entry.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        entry.balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {formatCurrency(entry.balance)}
                      </p>
                      <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                        {entry.income > 0 && `+${formatCurrency(entry.income)}`}
                        {entry.expense > 0 && `-${formatCurrency(entry.expense)}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
      </div>
      )}

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detalhes"
      >
        {selectedEntry && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Descrição
                </p>
                <p className={colors.text.title}>
                  {'description' in selectedEntry ? selectedEntry.description : selectedEntry.propertyTitle}
                </p>
              </div>
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Valor
                </p>
                <p className={`font-bold text-green-600 dark:text-green-400`}>
                  {formatCurrency('amount' in selectedEntry ? selectedEntry.amount : selectedEntry.commissionAmount)}
                </p>
              </div>
            </div>
            
            {'agentName' in selectedEntry && (
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Corretor
                </p>
                <p className={colors.text.title}>
                  {selectedEntry.agentName}
                </p>
              </div>
            )}
            
            <div>
              <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                Status
              </p>
              <Badge variant={getStatusColor(selectedEntry.status) as any}>
                {selectedEntry.status === 'paid' ? 'Pago' : 
                 selectedEntry.status === 'pending' ? 'Pendente' : 'Vencido'}
              </Badge>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};