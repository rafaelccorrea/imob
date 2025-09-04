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
  User,
  Building2,
  CreditCard,
  Wallet,
  PieChart,
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuthStore } from '../stores';
import { mockTransactions, mockCommissions } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Input, Modal } from '../components/ui';

export const FinancialPage: React.FC = () => {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

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
    return type === 'income' ? 'success' : 'danger';
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

  const openTransactionModal = (transaction: any) => {
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
          <h1 className="text-2xl font-bold text-secondary-900">
            Financeiro
          </h1>
          <p className="text-secondary-600">
            Controle financeiro e relatórios
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Receitas Totais</p>
                <p className="text-2xl font-bold text-success-600">
                  {formatCurrency(totalIncome)}
                </p>
                <p className="text-xs text-success-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% este mês
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Despesas Totais</p>
                <p className="text-2xl font-bold text-danger-600">
                  {formatCurrency(totalExpenses)}
                </p>
                <p className="text-xs text-danger-600 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  +8% este mês
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-danger-100 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-danger-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Lucro Líquido</p>
                <p className="text-2xl font-bold text-primary-600">
                  {formatCurrency(netProfit)}
                </p>
                <p className="text-xs text-primary-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% este mês
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Comissões Pendentes</p>
                <p className="text-2xl font-bold text-warning-600">
                  {formatCurrency(pendingCommissions)}
                </p>
                <p className="text-xs text-warning-600 flex items-center mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  A pagar
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-warning-600" />
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
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
              className="input"
            >
              <option value="">Todos os tipos</option>
              <option value="income">Receitas</option>
              <option value="expense">Despesas</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
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
              <Filter className="h-4 w-4 mr-2" />
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
                    <DollarSign className={`h-6 w-6 ${
                      transaction.type === 'income' ? 'text-success-600' : 'text-danger-600'
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{transaction.description}</h3>
                    <p className="text-sm text-secondary-600">
                      {getCategoryText(transaction.category)} • {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      transaction.type === 'income' ? 'text-success-600' : 'text-danger-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-secondary-600">
                      ID: {transaction.id}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={getTypeColor(transaction.type) as any}>
                      {getTypeText(transaction.type)}
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openTransactionModal(transaction)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
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
        className="max-w-2xl"
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
                  <p><strong>Valor:</strong> {formatCurrency(selectedTransaction.amount)}</p>
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
                <Edit className="h-4 w-4 mr-2" />
                Editar Transação
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
