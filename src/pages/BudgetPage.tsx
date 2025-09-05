import React, { useState } from 'react';
import { 
  Calculator, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  PieChart,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  XCircle as XCircleIcon,
  UserPlus,
  ClipboardList,
  Users,
  UserCheck,
  UserX,
  Crown,
  Medal,
  Trophy,
  Flag,
  Zap,
  Sparkles,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Droplets,
  Flame,
  Snowflake,
  Leaf,
  TreePine,
  Flower2,
  Bug,
  Fish,
  Bird,
} from 'lucide-react';
import { 
  mockBudgets
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu, Tabs } from '../components/ui';
import type { Budget, BudgetPlan } from '../types/financial';
import { usePermissions } from '../hooks/usePermissions';

export const BudgetPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'budgets' | 'plans'>('budgets');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { hasPermission } = usePermissions();

  // Filtros para orçamentos
  const filteredBudgets = mockBudgets.filter(budget => {
    const matchesSearch = budget.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || budget.category === selectedCategory;
    const matchesStatus = !selectedStatus || budget.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Filtros para planos orçamentários
  const filteredPlans = mockBudgets.filter(plan => {
    const matchesSearch = plan.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || plan.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track':
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'over_budget':
      case 'under_budget':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'active': 'Ativo',
      'inactive': 'Inativo',
      'pending': 'Pendente',
      'approved': 'Aprovado',
      'rejected': 'Rejeitado'
    };
    return statusMap[status] || status;
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const tabs = [
    { id: 'budgets', label: 'Orçamentos', icon: DollarSign },
    { id: 'plans', label: 'Planos Orçamentários', icon: Target }
  ];

  // Calcular métricas
  const totalBudgeted = mockBudgets.reduce((sum, b) => sum + b.plannedAmount, 0);
  const totalSpent = mockBudgets.reduce((sum, b) => sum + b.actualAmount, 0);
  const totalVariance = totalBudgeted - totalSpent;
  const activeBudgets = mockBudgets.filter(b => b.status === 'on_track').length;
  const activePlans = mockBudgets.filter(p => p.status === 'on_track').length;

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Orçamento e Planejamento
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Gestão de orçamentos e planejamento financeiro
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
              Novo Orçamento
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
                  Total Orçado
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {formatCurrency(totalBudgeted)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockBudgets.length} categorias
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <DollarSign className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Total Gasto
                </p>
                <p className={`text-2xl font-bold text-red-600 dark:text-red-400`}>
                  {formatCurrency(totalSpent)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {((totalSpent / totalBudgeted) * 100).toFixed(1)}% do orçado
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
                  Variação Total
                </p>
                <p className={`text-2xl font-bold ${totalVariance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {totalVariance >= 0 ? '+' : ''}{formatCurrency(totalVariance)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {totalVariance >= 0 ? 'Economia' : 'Excesso'}
                </p>
              </div>
              <div className={`p-3 rounded-full ${totalVariance >= 0 ? colors.iconBg.success : colors.iconBg.error}`}>
                {totalVariance >= 0 ? (
                  <TrendingUp className={`h-6 w-6 ${colors.icons.success}`} />
                ) : (
                  <TrendingDown className={`h-6 w-6 ${colors.icons.error}`} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Orçamentos Ativos
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {activeBudgets}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {activePlans} planos ativos
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <Target className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto custom-scroll px-4 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
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

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todas as categorias</option>
              <option value="Marketing">Marketing</option>
              <option value="Operacional">Operacional</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Vendas">Vendas</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="pending">Pendente</option>
              <option value="approved">Aprovado</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo das Tabs */}
      {activeTab === 'budgets' && (
        <div className="space-y-6">
          {/* Orçamentos */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Orçamentos ({filteredBudgets.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBudgets.map((budget) => {
                  const variance = budget.plannedAmount - budget.actualAmount;
                  const variancePercentage = budget.plannedAmount > 0 ? (variance / budget.plannedAmount) * 100 : 0;
                  
                  return (
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
                            {budget.category} • {budget.year}/{budget.month}
                          </p>
                          <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                            Orçado: {formatCurrency(budget.plannedAmount)} • Gasto: {formatCurrency(budget.actualAmount)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`font-bold ${variance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {variance >= 0 ? '+' : ''}{formatCurrency(variance)}
                          </p>
                          <p className={`text-sm ${variance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {variancePercentage >= 0 ? '+' : ''}{variancePercentage.toFixed(1)}%
                          </p>
                          <Badge variant={getStatusColor(budget.status) as any}>
                            {getStatusText(budget.status)}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openModal(budget)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="space-y-6">
          {/* Planos Orçamentários */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Planos Orçamentários ({filteredPlans.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${colors.iconBg.success}`}>
                        <Target className={`h-5 w-5 ${colors.icons.success}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {plan.category}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {plan.year}/{plan.month}
                        </p>
                        <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                          Planejado: {formatCurrency(plan.plannedAmount)} • Gasto: {formatCurrency(plan.actualAmount)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-bold text-blue-600 dark:text-blue-400`}>
                          {formatCurrency(plan.plannedAmount)}
                        </p>
                        <Badge variant={getStatusColor(plan.status) as any}>
                          {getStatusText(plan.status)}
                        </Badge>
                        <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1`}>
                          {formatDate(plan.createdAt)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openModal(plan)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
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
        title="Detalhes do Orçamento"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações Básicas</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Nome:</strong> {selectedItem.name || selectedItem.category}</p>
                  <p><strong>Descrição:</strong> {selectedItem.description}</p>
                  <p><strong>Período:</strong> {selectedItem.period}</p>
                  <p><strong>Status:</strong> {getStatusText(selectedItem.status)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Valores</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {selectedItem.plannedAmount && <p><strong>Valor Orçado:</strong> {formatCurrency(selectedItem.plannedAmount)}</p>}
                  {selectedItem.actualAmount && <p><strong>Valor Gasto:</strong> {formatCurrency(selectedItem.actualAmount)}</p>}
                  {selectedItem.totalBudget && <p><strong>Total do Orçamento:</strong> {formatCurrency(selectedItem.totalBudget)}</p>}
                  {selectedItem.budgetItems && <p><strong>Itens:</strong> {selectedItem.budgetItems.length}</p>}
                </div>
              </div>
            </div>
            
            {selectedItem.budgetItems && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Itens do Orçamento</h4>
                <div className="space-y-2">
                  {selectedItem.budgetItems.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.category}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
