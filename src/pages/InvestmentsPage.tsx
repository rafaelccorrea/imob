import React, { useState } from 'react';
import { 
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  DollarSign,
  Award,
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
  Cat,
  Dog,
  Rabbit,
  Mouse,
  Squirrel,
} from 'lucide-react';
import { 
  mockInvestments
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import type { Investment } from '../types/financial';
import { usePermissions } from '../hooks/usePermissions';

export const InvestmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const { hasPermission } = usePermissions();

  // Filtros para investimentos
  const filteredInvestments = mockInvestments.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || investment.type === selectedType;
    const matchesStatus = !selectedStatus || investment.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'matured':
        return 'money';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'active': 'Ativo',
      'matured': 'Vencido',
      'pending': 'Pendente',
      'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const getTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'fixed_income': 'Renda Fixa',
      'stocks': 'Ações',
      'funds': 'Fundos',
      'real_estate': 'Imóveis'
    };
    return typeMap[type] || type;
  };

  const openInvestmentModal = (investment: Investment) => {
    setSelectedInvestment(investment);
    setShowModal(true);
  };

  // Calcular métricas
  const totalInvested = mockInvestments.reduce((sum, i) => sum + i.amount, 0);
  const totalCurrentValue = mockInvestments.reduce((sum, i) => sum + i.currentValue, 0);
  const totalGain = totalCurrentValue - totalInvested;
  const totalGainPercentage = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;
  const activeInvestments = mockInvestments.filter(i => i.status === 'active').length;

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Investimentos
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Gestão de investimentos e aplicações financeiras
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
              Novo Investimento
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
                  Total Investido
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {formatCurrency(totalInvested)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockInvestments.length} investimentos
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
                  Valor Atual
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {formatCurrency(totalCurrentValue)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Valor de mercado
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <TrendingUp className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Ganho/Perda Total
                </p>
                <p className={`text-2xl font-bold ${totalGain >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {totalGain >= 0 ? '+' : ''}{formatCurrency(totalGain)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {totalGainPercentage >= 0 ? '+' : ''}{totalGainPercentage.toFixed(2)}%
                </p>
              </div>
              <div className={`p-3 rounded-full ${totalGain >= 0 ? colors.iconBg.success : colors.iconBg.error}`}>
                {totalGain >= 0 ? (
                  <TrendingUp className={`h-6 w-6 ${colors.icons.success}`} />
                ) : (
                  <TrendingUp className={`h-6 w-6 ${colors.icons.error}`} />
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
                  Investimentos Ativos
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {activeInvestments}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {((activeInvestments / mockInvestments.length) * 100).toFixed(1)}% do total
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <Award className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar investimentos..."
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
              <option value="fixed_income">Renda Fixa</option>
              <option value="stocks">Ações</option>
              <option value="funds">Fundos</option>
              <option value="real_estate">Imóveis</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="matured">Vencido</option>
              <option value="pending">Pendente</option>
              <option value="cancelled">Cancelado</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Investimentos */}
      <Card>
        <CardHeader>
          <CardTitle className={colors.text.title}>
            Investimentos ({filteredInvestments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInvestments.map((investment) => {
              const gain = investment.currentValue - investment.amount;
              const gainPercentage = investment.amount > 0 ? (gain / investment.amount) * 100 : 0;
              
              return (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${colors.iconBg.money}`}>
                      <TrendingUp className={`h-5 w-5 ${colors.icons.money}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${colors.text.title}`}>
                        {investment.name}
                      </p>
                      <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                        {getTypeText(investment.type)} • {investment.description}
                      </p>
                      <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                        Investido em {formatDate(investment.investmentDate)} • Vencimento: {formatDate(investment.maturityDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-bold text-blue-600 dark:text-blue-400`}>
                        {formatCurrency(investment.currentValue)}
                      </p>
                      <p className={`text-sm ${gain >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {gain >= 0 ? '+' : ''}{formatCurrency(gain)} ({gainPercentage >= 0 ? '+' : ''}{gainPercentage.toFixed(2)}%)
                      </p>
                      <Badge variant={getStatusColor(investment.status) as any}>
                        {getStatusText(investment.status)}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openInvestmentModal(investment)}
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

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Investimento: ${selectedInvestment?.name}`}
      >
        {selectedInvestment && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações do Investimento</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Nome:</strong> {selectedInvestment.name}</p>
                  <p><strong>Tipo:</strong> {getTypeText(selectedInvestment.type)}</p>
                  <p><strong>Descrição:</strong> {selectedInvestment.description}</p>
                  <p><strong>Status:</strong> {getStatusText(selectedInvestment.status)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações Financeiras</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Valor Investido:</strong> {formatCurrency(selectedInvestment.amount)}</p>
                  <p><strong>Valor Atual:</strong> {formatCurrency(selectedInvestment.currentValue)}</p>
                  <p><strong>Taxa de Retorno:</strong> {selectedInvestment.returnRate}%</p>
                  <p><strong>Data de Investimento:</strong> {formatDate(selectedInvestment.investmentDate)}</p>
                </div>
              </div>
            </div>
            
            {/* Datas */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Cronograma</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Data de Investimento</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(selectedInvestment.investmentDate)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Data de Vencimento</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(selectedInvestment.maturityDate)}</p>
                </div>
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar Investimento
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
