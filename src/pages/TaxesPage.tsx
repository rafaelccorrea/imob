import React, { useState } from 'react';
import { 
  Scale, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  CalendarDays,
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
  mockTaxes
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu, Tabs } from '../components/ui';
import type { Tax, TaxPlanning } from '../types/financial';
import { usePermissions } from '../hooks/usePermissions';

export const TaxesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'taxes' | 'planning'>('taxes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { hasPermission } = usePermissions();

  // Filtros para impostos
  const filteredTaxes = mockTaxes.filter(tax => {
    const matchesSearch = tax.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tax.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || tax.type === selectedType;
    const matchesStatus = !selectedStatus || tax.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Filtros para planejamento tributário
  const filteredPlanning = mockTaxes.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || plan.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'danger';
      case 'cancelled':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'paid': 'Pago',
      'pending': 'Pendente',
      'overdue': 'Vencido',
      'cancelled': 'Cancelado',
      'active': 'Ativo',
      'inactive': 'Inativo'
    };
    return statusMap[status] || status;
  };

  const getTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'income_tax': 'Imposto de Renda',
      'property_tax': 'IPTU',
      'service_tax': 'ISS',
      'payroll_tax': 'INSS/FGTS',
      'sales_tax': 'ICMS'
    };
    return typeMap[type] || type;
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const tabs = [
    { id: 'taxes', label: 'Impostos', icon: Scale },
    { id: 'planning', label: 'Planejamento Tributário', icon: Calendar }
  ];

  // Calcular métricas
  const totalTaxes = mockTaxes.reduce((sum, t) => sum + t.amount, 0);
  const paidTaxes = mockTaxes.filter(t => t.status === 'paid').reduce((sum, t) => sum + t.amount, 0);
  const pendingTaxes = mockTaxes.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
  const overdueTaxes = mockTaxes.filter(t => t.status === 'overdue').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white">
            Impostos e Tributação
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Gestão de impostos e planejamento tributário
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <ConditionalMenu requiredPermission="financial">
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Exportar</span>
              <span className="sm:hidden">Exportar</span>
            </Button>
          </ConditionalMenu>
          <ConditionalMenu requiredPermission="financial">
            <Button className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Novo Imposto</span>
              <span className="sm:hidden">Novo</span>
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
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total de Impostos
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {formatCurrency(totalTaxes)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockTaxes.length} impostos
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Impostos Pagos
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {formatCurrency(paidTaxes)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {((paidTaxes / totalTaxes) * 100).toFixed(1)}% do total
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Impostos Pendentes
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  {formatCurrency(pendingTaxes)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Aguardando pagamento
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Impostos Vencidos
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-destructive-600 dark:text-white">
                  {formatCurrency(overdueTaxes)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Atenção necessária
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive-600 dark:text-white" />
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
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os tipos</option>
              <option value="income_tax">Imposto de Renda</option>
              <option value="property_tax">IPTU</option>
              <option value="service_tax">ISS</option>
              <option value="payroll_tax">INSS/FGTS</option>
              <option value="sales_tax">ICMS</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os status</option>
              <option value="paid">Pago</option>
              <option value="pending">Pendente</option>
              <option value="overdue">Vencido</option>
              <option value="cancelled">Cancelado</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo das Tabs */}
      {activeTab === 'taxes' && (
        <div className="space-y-6">
          {/* Impostos */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base text-secondary-900 dark:text-white">
                Impostos ({filteredTaxes.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {filteredTaxes.map((tax) => (
                  <div
                    key={tax.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 sm:gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base text-secondary-900 dark:text-white truncate">
                          {tax.name}
                        </p>
                        <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">
                          {getTypeText(tax.type)} • {tax.description}
                        </p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-500 truncate">
                          Vencimento: {formatDate(tax.dueDate)} • Referência: {tax.referencePeriod}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                      <div className="text-left sm:text-right">
                        <p className="font-bold text-sm sm:text-base text-destructive-600 dark:text-destructive-400">
                          {formatCurrency(tax.amount)}
                        </p>
                        <Badge variant={getStatusColor(tax.status) as any} className="text-xs mt-1">
                          {getStatusText(tax.status)}
                        </Badge>
                        {tax.paidDate && (
                          <p className="text-xs text-secondary-500 dark:text-secondary-500 mt-1">
                            Pago em {formatDate(tax.paidDate)}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openModal(tax)}
                          className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
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

      {activeTab === 'planning' && (
        <div className="space-y-6">
          {/* Planejamento Tributário */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Planejamento Tributário ({filteredPlanning.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPlanning.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${colors.iconBg.success}`}>
                        <Calendar className={`h-5 w-5 ${colors.icons.success}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {plan.name}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {plan.description} • {plan.period}
                        </p>
                        <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                          Economia estimada: {formatCurrency(plan.estimatedSavings)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-bold text-green-600 dark:text-green-400`}>
                          {formatCurrency(plan.estimatedSavings)}
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
        title="Detalhes"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações Básicas</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Nome:</strong> {selectedItem.name}</p>
                  <p><strong>Tipo:</strong> {getTypeText(selectedItem.type) || selectedItem.type}</p>
                  <p><strong>Descrição:</strong> {selectedItem.description}</p>
                  <p><strong>Status:</strong> {getStatusText(selectedItem.status)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações Financeiras</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Valor:</strong> {formatCurrency(selectedItem.amount || selectedItem.estimatedSavings)}</p>
                  {selectedItem.dueDate && <p><strong>Vencimento:</strong> {formatDate(selectedItem.dueDate)}</p>}
                  {selectedItem.paidDate && <p><strong>Data de Pagamento:</strong> {formatDate(selectedItem.paidDate)}</p>}
                  {selectedItem.referencePeriod && <p><strong>Período de Referência:</strong> {selectedItem.referencePeriod}</p>}
                </div>
              </div>
            </div>
            
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
