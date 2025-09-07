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
  Target,
  CreditCard,
  Receipt,
  Building,
  Calculator,
  FileSpreadsheet,
  Scale
} from 'lucide-react';
// usePermissions import removed as it's not used in this component
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart as RechartsBarChart,
  Bar
} from 'recharts';
import { 
  mockCashFlowEntries, 
  mockFinancialMetrics,
  mockAgentFinancialSummaries,
  mockAccountsPayable,
  mockAccountsReceivable,
  mockBudgets,
  mockAssets,
  mockInvestments,
  mockTaxes
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import { FinancialEntries, FinancialCommissions, CashFlow } from '../components/financial';
// Types are used implicitly in the component

export const FinancialPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'entries' | 'commissions' | 'cashflow' | 'payables' | 'receivables' | 'budget' | 'reports' | 'assets' | 'investments' | 'taxes'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  // Função para obter a cor baseada no valor e tipo (mantida para uso futuro)
  // const getValueColor = (value: number, type: string = 'income') => {
  //   if (value < 0) {
  //     return 'text-red-600 dark:text-red-400';
  //   } else if (type === 'expense' || type === 'despesa') {
  //     return 'text-red-600 dark:text-red-400';
  //   } else {
  //     return 'text-green-600 dark:text-green-400';
  //   }
  // };

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'pago':
      case 'approved':
      case 'active':
        return 'success';
      case 'pending':
      case 'pendente':
      case 'draft':
        return 'warning';
      case 'overdue':
      case 'vencido':
      case 'rejected':
      case 'inactive':
        return 'destructive';
      default:
        return 'secondary';
    }
  };



  // Filtrar contas a pagar
  const filteredPayables = mockAccountsPayable.filter(payable => {
    const matchesSearch = payable.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payable.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || payable.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Filtrar contas a receber
  const filteredReceivables = mockAccountsReceivable.filter(receivable => {
    const matchesSearch = receivable.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receivable.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || receivable.status === selectedStatus;
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
    { id: 'cashflow', label: 'Fluxo de Caixa', icon: TrendingUp },
    { id: 'payables', label: 'Contas a Pagar', icon: CreditCard },
    { id: 'receivables', label: 'Contas a Receber', icon: Receipt },
    { id: 'budget', label: 'Orçamento', icon: Calculator },
    { id: 'reports', label: 'Relatórios', icon: FileSpreadsheet },
    { id: 'assets', label: 'Patrimônio', icon: Building },
    { id: 'investments', label: 'Investimentos', icon: TrendingUp },
    { id: 'taxes', label: 'Impostos', icon: Scale }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text.title} truncate`}>
            Financeiro
          </h1>
          <p className={`text-xs sm:text-sm text-gray-600 dark:text-gray-300`}>
            Controle financeiro completo da imobiliária
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <ConditionalMenu requiredPermission="financial">
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Exportar</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </ConditionalMenu>
          <ConditionalMenu requiredPermission="financial">
            <Button className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Nova Entrada</span>
              <span className="sm:hidden">Nova</span>
            </Button>
          </ConditionalMenu>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 truncate`}>
                  Receita Total
                </p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {formatCurrency(mockFinancialMetrics.totalIncome)}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400`}>
                  +12.5% vs mês anterior
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.money} flex-shrink-0`}>
                <TrendingUp className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 truncate`}>
                  Despesas Totais
                </p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold text-red-600 dark:text-red-400`}>
                  {formatCurrency(mockFinancialMetrics.totalExpense)}
                </p>
                <p className={`text-xs text-red-600 dark:text-red-400`}>
                  +8.2% vs mês anterior
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.error} flex-shrink-0`}>
                <TrendingDown className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 truncate`}>
                  Saldo Líquido
                </p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${mockFinancialMetrics.netBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatCurrency(mockFinancialMetrics.netBalance)}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400`}>
                  +15.3% vs mês anterior
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.success} flex-shrink-0`}>
                <DollarSign className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 truncate`}>
                  Comissões Pendentes
                </p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold text-yellow-600 dark:text-yellow-400`}>
                  {formatCurrency(mockFinancialMetrics.pendingCommissions)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  3 corretores
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.warning} flex-shrink-0`}>
                <Clock className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex flex-wrap gap-2 sm:gap-4 md:gap-8 overflow-x-auto custom-scroll px-2 sm:px-4 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.label === 'Visão Geral' ? 'Geral' :
                   tab.label === 'Entradas/Saídas' ? 'Entradas' :
                   tab.label === 'Fluxo de Caixa' ? 'Caixa' :
                   tab.label === 'Contas a Pagar' ? 'Pagar' :
                   tab.label === 'Contas a Receber' ? 'Receber' :
                   tab.label === 'Relatórios' ? 'Relatórios' :
                   tab.label === 'Investimentos' ? 'Invest.' :
                   tab.label === 'Comissões' ? 'Comissões' :
                   tab.label === 'Orçamento' ? 'Orçamento' :
                   tab.label === 'Patrimônio' ? 'Patrimônio' :
                   tab.label === 'Impostos' ? 'Impostos' : tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Filtros */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <Input
                placeholder="Buscar por descrição ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs sm:text-sm"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm w-full sm:w-auto"
            >
              <option value="">Todos os tipos</option>
              <option value="income">Receitas</option>
              <option value="expense">Despesas</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm w-full sm:w-auto"
            >
              <option value="">Todos os status</option>
              <option value="paid">Pago</option>
              <option value="pending">Pendente</option>
              <option value="overdue">Vencido</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo das Tabs */}
      {activeTab === 'overview' && (
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Fluxo de Caixa */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className={`text-sm sm:text-base md:text-lg ${colors.text.title}`}>
                  Fluxo de Caixa (Últimos 30 dias)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsLineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis fontSize={12} />
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
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Categorias */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className={`text-sm sm:text-base md:text-lg ${colors.text.title}`}>
                  Despesas por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={70}
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
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className={`text-sm sm:text-base md:text-lg ${colors.text.title}`}>
                Performance dos Corretores
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ResponsiveContainer width="100%" height={250}>
                <RechartsBarChart data={agentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'conversion' ? `${value}%` : formatCurrency(value),
                      name === 'commissions' ? 'Comissões' : 
                      name === 'deals' ? 'Negócios' : 'Conversão'
                    ]}
                  />
                  <Bar dataKey="commissions" fill="#10b981" name="Comissões" />
                  <Bar dataKey="deals" fill="#3b82f6" name="Negócios" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'entries' && (
        <FinancialEntries
          searchTerm={searchTerm}
          selectedType={selectedType}
          selectedStatus={selectedStatus}
          onSearchChange={setSearchTerm}
          onTypeChange={setSelectedType}
          onStatusChange={setSelectedStatus}
        />
      )}

      {activeTab === 'commissions' && (
        <FinancialCommissions
          searchTerm={searchTerm}
          selectedStatus={selectedStatus}
          onSearchChange={setSearchTerm}
          onStatusChange={setSelectedStatus}
        />
      )}

      {activeTab === 'cashflow' && (
        <CashFlow
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      )}

      {activeTab === 'payables' && (
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Contas a Pagar */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className={`text-sm sm:text-base md:text-lg ${colors.text.title}`}>
                Contas a Pagar ({filteredPayables.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {filteredPayables.map((payable) => (
                  <div
                    key={payable.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className={`p-2 rounded-full ${colors.iconBg.error} flex-shrink-0`}>
                        <CreditCard className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icons.error}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-medium text-sm sm:text-base ${colors.text.title} truncate`}>
                          {payable.description}
                        </p>
                        <p className={`text-xs sm:text-sm text-gray-600 dark:text-gray-300`}>
                          {payable.supplierName} • {payable.category} • Vencimento: {formatDate(payable.dueDate)}
                        </p>
                        {payable.installments && (
                          <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                            Parcela {payable.installments.current} de {payable.installments.total}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="text-right">
                        <p className={`font-bold text-red-600 dark:text-red-400 text-sm sm:text-base`}>
                          {formatCurrency(payable.amount)}
                        </p>
                        <Badge variant={getStatusColor(payable.status) as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'} className="text-xs">
                          {payable.status === 'paid' ? 'Pago' : 
                           payable.status === 'pending' ? 'Pendente' : 
                           payable.status === 'overdue' ? 'Vencido' : 'Cancelado'}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => {
                          setSelectedEntry(payable);
                          setShowModal(true);
                        }}
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'receivables' && (
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Contas a Receber */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className={`text-sm sm:text-base md:text-lg ${colors.text.title}`}>
                Contas a Receber ({filteredReceivables.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {filteredReceivables.map((receivable) => (
                  <div
                    key={receivable.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className={`p-2 rounded-full ${colors.iconBg.money} flex-shrink-0`}>
                        <Receipt className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icons.money}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-medium text-sm sm:text-base ${colors.text.title} truncate`}>
                          {receivable.description}
                        </p>
                        <p className={`text-xs sm:text-sm text-gray-600 dark:text-gray-300`}>
                          {receivable.clientName} • {receivable.category} • Vencimento: {formatDate(receivable.dueDate)}
                        </p>
                        {receivable.propertyTitle && (
                          <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                            Propriedade: {receivable.propertyTitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="text-right">
                        <p className={`font-bold text-green-600 dark:text-green-400 text-sm sm:text-base`}>
                          {formatCurrency(receivable.amount)}
                        </p>
                        <Badge variant={getStatusColor(receivable.status) as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'} className="text-xs">
                          {receivable.status === 'paid' ? 'Pago' : 
                           receivable.status === 'pending' ? 'Pendente' : 
                           receivable.status === 'overdue' ? 'Vencido' : 'Cancelado'}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => {
                          setSelectedEntry(receivable);
                          setShowModal(true);
                        }}
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="space-y-6">
          {/* Orçamento */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Orçamento 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBudgets.map((budget) => (
                  <div
                    key={budget.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${colors.iconBg.money}`}>
                        <Calculator className={`h-5 w-5 ${colors.icons.money}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {budget.category}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {budget.year}/{budget.month.toString().padStart(2, '0')}
                        </p>
                        <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                          Planejado: {formatCurrency(budget.plannedAmount)} • Realizado: {formatCurrency(budget.actualAmount)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-bold ${budget.variance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {budget.variance >= 0 ? '+' : ''}{formatCurrency(budget.variance)}
                        </p>
                        <p className={`text-sm ${budget.variance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {budget.variancePercentage >= 0 ? '+' : ''}{budget.variancePercentage.toFixed(1)}%
                        </p>
                        <Badge variant={getStatusColor(budget.status) as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'}>
                          {budget.status === 'on_track' ? 'No Prazo' : 
                           budget.status === 'over_budget' ? 'Acima do Orçamento' : 'Abaixo do Orçamento'}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEntry(budget);
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

      {activeTab === 'assets' && (
        <div className="space-y-6">
          {/* Patrimônio */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Patrimônio ({mockAssets.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${colors.iconBg.money}`}>
                        <Building className={`h-5 w-5 ${colors.icons.money}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {asset.name}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {asset.category} • {asset.location} • Responsável: {asset.responsible}
                        </p>
                        <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                          Valor Atual: {formatCurrency(asset.currentValue)} • Depreciação: {asset.depreciationRate}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-bold text-blue-600 dark:text-blue-400`}>
                          {formatCurrency(asset.currentValue)}
                        </p>
                        <Badge variant={getStatusColor(asset.status) as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'}>
                          {asset.status === 'active' ? 'Ativo' : 
                           asset.status === 'inactive' ? 'Inativo' : 
                           asset.status === 'sold' ? 'Vendido' : 'Descartado'}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEntry(asset);
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

      {activeTab === 'investments' && (
        <div className="space-y-6">
          {/* Investimentos */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Investimentos ({mockInvestments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInvestments.map((investment) => (
                  <div
                    key={investment.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${colors.iconBg.success}`}>
                        <TrendingUp className={`h-5 w-5 ${colors.icons.success}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {investment.name}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {investment.type} • {investment.description}
                        </p>
                        <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                          Investido: {formatCurrency(investment.amount)} • Retorno: {investment.returnRate}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-bold text-green-600 dark:text-green-400`}>
                          {formatCurrency(investment.currentValue)}
                        </p>
                        <p className={`text-sm text-green-600 dark:text-green-400`}>
                          +{formatCurrency(investment.currentValue - investment.amount)}
                        </p>
                        <Badge variant={investment.risk === 'low' ? 'success' : investment.risk === 'medium' ? 'warning' : 'destructive'}>
                          Risco {investment.risk === 'low' ? 'Baixo' : investment.risk === 'medium' ? 'Médio' : 'Alto'}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEntry(investment);
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

      {activeTab === 'reports' && (
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Relatórios Financeiros */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Relatório de Receitas */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className={`text-sm sm:text-base md:text-lg ${colors.text.title}`}>
                  Relatório de Receitas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-200">Vendas de Imóveis</span>
                    <span className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(mockFinancialMetrics.totalIncome * 0.7)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200">Comissões</span>
                    <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(mockFinancialMetrics.totalIncome * 0.2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="text-xs sm:text-sm font-medium text-purple-800 dark:text-purple-200">Serviços</span>
                    <span className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(mockFinancialMetrics.totalIncome * 0.1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Relatório de Despesas */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className={`text-sm sm:text-base md:text-lg ${colors.text.title}`}>
                  Relatório de Despesas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-200">Salários</span>
                    <span className="text-xs sm:text-sm font-bold text-red-600 dark:text-red-400">
                      {formatCurrency(mockFinancialMetrics.totalExpense * 0.4)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <span className="text-xs sm:text-sm font-medium text-orange-800 dark:text-orange-200">Marketing</span>
                    <span className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400">
                      {formatCurrency(mockFinancialMetrics.totalExpense * 0.25)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="text-xs sm:text-sm font-medium text-yellow-800 dark:text-yellow-200">Operacional</span>
                    <span className="text-xs sm:text-sm font-bold text-yellow-600 dark:text-yellow-400">
                      {formatCurrency(mockFinancialMetrics.totalExpense * 0.35)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Relatório de Performance */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className={`text-sm sm:text-base md:text-lg ${colors.text.title}`}>
                Relatório de Performance Mensal
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(mockFinancialMetrics.netBalance)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Lucro Líquido</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+15.3% vs mês anterior</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {mockFinancialMetrics.topCategories.length}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Categorias Ativas</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">+2 novas categorias</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {mockAgentFinancialSummaries.length}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Corretores Ativos</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">100% de participação</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações de Relatório */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className={`text-sm sm:text-base md:text-lg ${colors.text.title}`}>
                Exportar Relatórios
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <Button variant="outline" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Relatório Mensal</span>
                  <span className="sm:hidden">Mensal</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Relatório Anual</span>
                  <span className="sm:hidden">Anual</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">DRE Completo</span>
                  <span className="sm:hidden">DRE</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Fluxo de Caixa</span>
                  <span className="sm:hidden">Caixa</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'taxes' && (
        <div className="space-y-6">
          {/* Impostos */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Impostos ({mockTaxes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTaxes.map((tax) => (
                  <div
                    key={tax.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${colors.iconBg.warning}`}>
                        <Scale className={`h-5 w-5 ${colors.icons.warning}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {tax.name}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {tax.type} • {tax.description} • Período: {tax.referencePeriod}
                        </p>
                        <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                          Taxa: {tax.rate}% • Vencimento: {formatDate(tax.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-bold text-orange-600 dark:text-orange-400`}>
                          {formatCurrency(tax.amount)}
                        </p>
                        <Badge variant={getStatusColor(tax.status) as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'}>
                          {tax.status === 'paid' ? 'Pago' : 
                           tax.status === 'pending' ? 'Pendente' : 'Vencido'}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEntry(tax);
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

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detalhes"
      >
        {selectedEntry && (
          <div className="flex flex-col h-full">
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300`}>
                    Descrição
                  </p>
                  <p className={`text-sm sm:text-base ${colors.text.title} truncate`}>
                    {selectedEntry.description || selectedEntry.name}
                  </p>
                </div>
                <div>
                  <p className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300`}>
                    Valor
                  </p>
                  <p className={`font-bold text-green-600 dark:text-green-400 text-sm sm:text-base`}>
                    {formatCurrency(selectedEntry.amount || selectedEntry.currentValue)}
                  </p>
                </div>
              </div>
              
              <div>
                <p className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Status
                </p>
                <Badge variant={getStatusColor(selectedEntry.status) as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'} className="text-xs">
                  {selectedEntry.status === 'paid' ? 'Pago' : 
                   selectedEntry.status === 'pending' ? 'Pendente' : 
                   selectedEntry.status === 'overdue' ? 'Vencido' : 
                   selectedEntry.status === 'active' ? 'Ativo' : 
                   selectedEntry.status === 'inactive' ? 'Inativo' : 'Outro'}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};