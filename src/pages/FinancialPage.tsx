import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  TrendingUp,
  TrendingDown,
  Calendar,
  CreditCard
} from 'lucide-react';
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
  Cell
} from 'recharts';
import { mockTransactions, mockCommissions } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal } from '../components/ui';
import type { Transaction } from '../types';


export const FinancialPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

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

  // Dados para gráficos
  const monthlyData = [
    { month: 'Jan', receitas: 45000, despesas: 15000, lucro: 30000 },
    { month: 'Fev', receitas: 52000, despesas: 18000, lucro: 34000 },
    { month: 'Mar', receitas: 61000, despesas: 22000, lucro: 39000 },
    { month: 'Abr', receitas: 48000, despesas: 16000, lucro: 32000 },
    { month: 'Mai', receitas: 68000, despesas: 25000, lucro: 43000 },
    { month: 'Jun', receitas: 75000, despesas: 28000, lucro: 47000 },
  ];

  const categoryData = [
    { name: 'Vendas', value: 45, color: '#3B82F6' },
    { name: 'Aluguéis', value: 25, color: '#10B981' },
    { name: 'Comissões', value: 20, color: '#F59E0B' },
    { name: 'Outros', value: 10, color: '#EF4444' },
  ];

  // Filtros
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || transaction.type === selectedType;
    const matchesCategory = !selectedCategory || transaction.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const getTypeColor = (type: string) => {
    return type === 'income' ? 'success' : 'destructive';
  };

  const getTypeText = (type: string) => {
    return type === 'income' ? 'Receita' : 'Despesa';
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'commission': return 'Comissão';
      case 'rent': return 'Aluguel';
      case 'sale': return 'Venda';
      case 'maintenance': return 'Manutenção';
      case 'marketing': return 'Marketing';
      case 'salary': return 'Salário';
      case 'other': return 'Outro';
      default: return category;
    }
  };

  const openTransactionModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  // Cálculos
  const totalIncome = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const pendingCommissions = mockCommissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
                     <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
             Financeiro
           </h1>
                     <p className="text-secondary-600 dark:text-secondary-400">
             Controle financeiro e relatórios
           </p>
        </div>
                 <Button>
           <Plus className="h-4 w-4 mr-2 dark:text-white" />
           Nova Transação
         </Button>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                                 <p className="text-sm font-medium text-secondary-600 dark:text-white">Receitas Totais</p>
                <p className="text-2xl font-bold" style={{ color: getValueColor(totalIncome, 'income') }}>
                  {formatCurrency(totalIncome)}
                </p>
                                 <p className="text-xs text-success-600 dark:text-white flex items-center mt-1">
                   <TrendingUp className="h-3 w-3 mr-1" />
                   +12% este mês
                 </p>
              </div>
                             <div className="h-12 w-12 rounded-lg bg-success-100 flex items-center justify-center">
                 <TrendingUp className="h-6 w-6" style={{ color: getIconColor('income') }} />
               </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                                 <p className="text-sm font-medium text-secondary-600 dark:text-white">Despesas Totais</p>
                <p className="text-2xl font-bold" style={{ color: getValueColor(totalExpenses, 'expense') }}>
                  {formatCurrency(totalExpenses)}
                </p>
                                 <p className="text-xs text-danger-600 dark:text-white flex items-center mt-1">
                   <TrendingDown className="h-3 w-3 mr-1" />
                   +8% este mês
                 </p>
              </div>
                             <div className="h-12 w-12 rounded-lg bg-danger-100 flex items-center justify-center">
                 <TrendingDown className="h-6 w-6" style={{ color: getIconColor('expense') }} />
               </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                                 <p className="text-sm font-medium text-secondary-600 dark:text-white">Lucro Líquido</p>
                <p className="text-2xl font-bold" style={{ color: getValueColor(netProfit, 'profit') }}>
                  {formatCurrency(netProfit)}
                </p>
                                 <p className="text-xs text-primary-600 dark:text-white flex items-center mt-1">
                   <TrendingUp className="h-3 w-3 mr-1" />
                   +15% este mês
                 </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success-100 dark:bg-success-900 flex items-center justify-center">
                <DollarSign className="h-6 w-6" style={{ color: getIconColor('profit') }} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                                 <p className="text-sm font-medium text-secondary-600 dark:text-white">Comissões Pendentes</p>
                                 <p className="text-2xl font-bold" style={{ color: getValueColor(pendingCommissions, 'expense') }}>
                   {formatCurrency(pendingCommissions)}
                 </p>
                                 <p className="text-xs text-warning-600 dark:text-white flex items-center mt-1">
                   <Calendar className="h-3 w-3 mr-1" />
                   A pagar
                 </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning-100 flex items-center justify-center">
                                 <CreditCard className="h-6 w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fluxo de Caixa */}
        <Card>
          <CardHeader>
            <CardTitle>Fluxo de Caixa Mensal</CardTitle>
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
                  dataKey="receitas" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Receitas"
                />
                <Line 
                  type="monotone" 
                  dataKey="despesas" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Despesas"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Receitas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar transações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
                             <option value="">Todos os tipos</option>
               <option value="income" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Receita</option>
               <option value="expense" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Despesa</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todas as categorias</option>
              <option value="commission">Comissão</option>
              <option value="rent">Aluguel</option>
              <option value="sale">Venda</option>
              <option value="maintenance">Manutenção</option>
              <option value="marketing">Marketing</option>
              <option value="salary">Salário</option>
              <option value="other">Outro</option>
            </select>
            
                         <Button variant="outline" className="flex items-center">
               <Filter className="h-4 w-4 mr-2 dark:text-white" />
               Mais Filtros
             </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Transações */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-success-100' : 'bg-danger-100'
                  }`}>
                                         <DollarSign className="h-6 w-6" style={{ color: getIconColor(transaction.type) }} />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg dark:text-white">{transaction.description}</h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {getCategoryText(transaction.category)} • {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                                     <div className="text-right">
                     <p className="text-lg font-bold" style={{ color: getValueColor(transaction.amount, transaction.type) }}>
                       {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                     </p>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">
                      ID: {transaction.id}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                                         <Badge variant={getTypeColor(transaction.type) as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'}>
                       {getTypeText(transaction.type)}
                     </Badge>
                    
                                         <Button
                       variant="ghost"
                       size="sm"
                       onClick={() => openTransactionModal(transaction)}
                     >
                       <Eye className="h-4 w-4 dark:text-white" />
                     </Button>
                     
                     <Button
                       variant="ghost"
                       size="sm"
                     >
                       <Edit className="h-4 w-4 dark:text-white" />
                     </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Transação: ${selectedTransaction?.description}`}
      >
        {selectedTransaction && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Informações da Transação</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Descrição:</strong> {selectedTransaction.description}</p>
                  <p><strong>Tipo:</strong> {getTypeText(selectedTransaction.type)}</p>
                  <p><strong>Categoria:</strong> {getCategoryText(selectedTransaction.category)}</p>
                                     <p><strong>Valor:</strong> <span style={{ color: getValueColor(selectedTransaction.amount, selectedTransaction.type) }}>{formatCurrency(selectedTransaction.amount)}</span></p>
                  <p><strong>Data:</strong> {formatDate(selectedTransaction.date)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Relacionamentos</h4>
                <div className="space-y-2 text-sm">
                  {selectedTransaction.relatedDealId && (
                    <p><strong>Negociação ID:</strong> {selectedTransaction.relatedDealId}</p>
                  )}
                  {selectedTransaction.relatedPropertyId && (
                    <p><strong>Imóvel ID:</strong> {selectedTransaction.relatedPropertyId}</p>
                  )}
                  <p><strong>Criado por:</strong> {selectedTransaction.createdBy}</p>
                  <p><strong>Criado em:</strong> {formatDate(selectedTransaction.createdAt)}</p>
                  <p><strong>Atualizado em:</strong> {formatDate(selectedTransaction.updatedAt)}</p>
                </div>
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
                             <Button>
                 <Edit className="h-4 w-4 mr-2 dark:text-white" />
                 Editar Transação
               </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
