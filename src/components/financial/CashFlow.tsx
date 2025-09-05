import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  BarChart3,
  PieChart
} from 'lucide-react';
import { 
  mockCashFlowEntries 
} from '../../utils/mockData';
import { formatCurrency, formatDate } from '../../utils';
import { colors } from '../../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal } from '../ui';
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
import type { CashFlowEntry } from '../../types/financial';

interface CashFlowProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const CashFlow: React.FC<CashFlowProps> = ({
  searchTerm,
  onSearchChange
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<CashFlowEntry | null>(null);
  const [viewMode, setViewMode] = useState<'chart' | 'list'>('chart');

  // Filtrar entradas do fluxo de caixa
  const filteredEntries = mockCashFlowEntries.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Dados para gráficos
  const chartData = filteredEntries.map(entry => ({
    date: formatDate(entry.date),
    income: entry.income,
    expense: entry.expense,
    balance: entry.balance,
    description: entry.description
  }));

  // Calcular métricas
  const totalIncome = filteredEntries.reduce((sum, e) => sum + e.income, 0);
  const totalExpense = filteredEntries.reduce((sum, e) => sum + e.expense, 0);
  const currentBalance = filteredEntries[filteredEntries.length - 1]?.balance || 0;
  const previousBalance = filteredEntries[filteredEntries.length - 2]?.balance || 0;
  const balanceChange = currentBalance - previousBalance;

  // Dados para gráfico de pizza (receitas vs despesas)
  const pieData = [
    { name: 'Receitas', value: totalIncome, color: '#10b981' },
    { name: 'Despesas', value: totalExpense, color: '#ef4444' }
  ];

  const COLORS = ['#10b981', '#ef4444'];

  const openEntryModal = (entry: CashFlowEntry) => {
    setSelectedEntry(entry);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Saldo Atual
                </p>
                <p className={`text-xl font-bold ${currentBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatCurrency(currentBalance)}
                </p>
                <p className={`text-xs ${balanceChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {balanceChange >= 0 ? '+' : ''}{formatCurrency(balanceChange)} vs anterior
                </p>
              </div>
              <div className={`p-2 rounded-full ${currentBalance >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                <DollarSign className={`h-5 w-5 ${currentBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Receitas
                </p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(totalIncome)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Despesas
                </p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(totalExpense)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20">
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Movimentações
                </p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {filteredEntries.length}
                </p>
              </div>
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles de Visualização */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'chart' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('chart')}
                className="flex items-center gap-2 text-gray-900 dark:text-white"
              >
                <BarChart3 className="h-4 w-4" />
                Gráficos
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex items-center gap-2 text-gray-900 dark:text-white"
              >
                <Calendar className="h-4 w-4" />
                Lista
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Entrada
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visualização de Gráficos */}
      {viewMode === 'chart' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Linha - Fluxo de Caixa */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Fluxo de Caixa (Últimos 30 dias)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={chartData}>
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
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Pizza - Receitas vs Despesas */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Receitas vs Despesas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Visualização em Lista */}
      {viewMode === 'list' && (
        <Card>
          <CardHeader>
            <CardTitle className={colors.text.title}>
              Movimentações ({filteredEntries.length})
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
                    <div className={`p-2 rounded-full ${entry.balance >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                      <DollarSign className={`h-5 w-5 ${entry.balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
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
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex gap-4 text-sm">
                        <div>
                          <p className="text-green-600 dark:text-green-400">
                            +{formatCurrency(entry.income)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Receitas</p>
                        </div>
                        <div>
                          <p className="text-red-600 dark:text-red-400">
                            -{formatCurrency(entry.expense)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Despesas</p>
                        </div>
                        <div>
                          <p className={`font-bold ${entry.balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {formatCurrency(entry.balance)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Saldo</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEntryModal(entry)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detalhes da Movimentação"
      >
        {selectedEntry && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Descrição
                </p>
                <p className={colors.text.title}>
                  {selectedEntry.description}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Categoria
                </p>
                <p className={colors.text.title}>
                  {selectedEntry.category}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Data
                </p>
                <p className={colors.text.title}>
                  {formatDate(selectedEntry.date)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Receitas
                </p>
                <p className="font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(selectedEntry.income)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Despesas
                </p>
                <p className="font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(selectedEntry.expense)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Saldo
                </p>
                <p className={`font-bold ${selectedEntry.balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatCurrency(selectedEntry.balance)}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
