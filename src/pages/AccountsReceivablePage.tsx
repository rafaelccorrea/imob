import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Building,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  CalendarDays,
  TrendingUp,
  AlertCircle,
  Award,
  Target,
  BookOpen,
  GraduationCap,
  MapPin,
  Heart,
  Car,
  Dumbbell,
  Shield,
  Star,
  BarChart3,
  PieChart,
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
  mockAccountsReceivable
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import type { AccountsReceivable } from '../types/financial';
import { usePermissions } from '../hooks/usePermissions';

export const AccountsReceivablePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedReceivable, setSelectedReceivable] = useState<AccountsReceivable | null>(null);
  const { hasPermission } = usePermissions();

  // Filtros para contas a receber
  const filteredReceivables = mockAccountsReceivable.filter(receivable => {
    const matchesSearch = receivable.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receivable.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || receivable.status === selectedStatus;
    const matchesCategory = !selectedCategory || receivable.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
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
      'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const getCategoryText = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'rent': 'Aluguel',
      'commission': 'Comissão',
      'service': 'Serviço',
      'other': 'Outros'
    };
    return categoryMap[category] || category;
  };

  const openReceivableModal = (receivable: AccountsReceivable) => {
    setSelectedReceivable(receivable);
    setShowModal(true);
  };

  // Calcular totais
  const totalPending = mockAccountsReceivable
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.amount, 0);
  
  const totalOverdue = mockAccountsReceivable
    .filter(r => r.status === 'overdue')
    .reduce((sum, r) => sum + r.amount, 0);
  
  const totalPaid = mockAccountsReceivable
    .filter(r => r.status === 'paid')
    .reduce((sum, r) => sum + (r.paidAmount || r.amount), 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Contas a Receber
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Gestão de clientes e contas a receber
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <ConditionalMenu requiredPermission="financial">
            <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Exportar</span>
              <span className="sm:hidden">Exportar</span>
            </Button>
          </ConditionalMenu>
          <ConditionalMenu requiredPermission="financial">
            <Button className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Nova Conta</span>
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
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total Pendente
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  {formatCurrency(totalPending)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockAccountsReceivable.filter(r => r.status === 'pending').length} contas
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
                  Total Vencido
                </p>
                <p className={`text-2xl font-bold text-red-600 dark:text-red-400`}>
                  {formatCurrency(totalOverdue)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockAccountsReceivable.filter(r => r.status === 'overdue').length} contas
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.error}`}>
                <AlertTriangle className={`h-6 w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total Recebido
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {formatCurrency(totalPaid)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockAccountsReceivable.filter(r => r.status === 'paid').length} contas
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <CheckCircle className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total Geral
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {formatCurrency(mockAccountsReceivable.reduce((sum, r) => sum + r.amount, 0))}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockAccountsReceivable.length} contas
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <Receipt className={`h-6 w-6 ${colors.icons.money}`} />
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
                placeholder="Buscar por descrição ou cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="pending">Pendente</option>
              <option value="paid">Pago</option>
              <option value="overdue">Vencido</option>
              <option value="cancelled">Cancelado</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todas as categorias</option>
              <option value="rent">Aluguel</option>
              <option value="commission">Comissão</option>
              <option value="service">Serviço</option>
              <option value="other">Outros</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Contas a Receber */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-sm sm:text-base text-secondary-900 dark:text-white">
            Contas a Receber ({filteredReceivables.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {filteredReceivables.map((receivable) => (
              <div
                key={receivable.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Receipt className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base text-secondary-900 dark:text-white truncate">
                      {receivable.description}
                    </p>
                    <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">
                      {receivable.clientName} • {getCategoryText(receivable.category)} • Vencimento: {formatDate(receivable.dueDate)}
                    </p>
                    {receivable.propertyTitle && (
                      <p className="text-xs text-secondary-500 dark:text-secondary-500 truncate">
                        Propriedade: {receivable.propertyTitle}
                      </p>
                    )}
                    {receivable.notes && (
                      <p className="text-xs text-secondary-500 dark:text-secondary-500 truncate">
                        {receivable.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-sm sm:text-base text-success-600 dark:text-success-400">
                      {formatCurrency(receivable.amount)}
                    </p>
                    {receivable.paidAmount && (
                      <p className="text-xs sm:text-sm text-primary-600 dark:text-primary-400">
                        Recebido: {formatCurrency(receivable.paidAmount)}
                      </p>
                    )}
                    <Badge variant={getStatusColor(receivable.status) as any} className="text-xs mt-1">
                      {getStatusText(receivable.status)}
                    </Badge>
                  </div>
                  <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openReceivableModal(receivable)}
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

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        {selectedReceivable && (
          <div className="flex flex-col h-full">
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
              {/* Header Personalizado do Modal */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Conta a Receber: {selectedReceivable.description}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Informações Básicas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Informações da Conta</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Descrição:</strong> {selectedReceivable.description}</p>
                    <p><strong>Cliente:</strong> {selectedReceivable.clientName}</p>
                    <p><strong>Categoria:</strong> {getCategoryText(selectedReceivable.category)}</p>
                    <p><strong>Valor:</strong> {formatCurrency(selectedReceivable.amount)}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Informações de Recebimento</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Data de Vencimento:</strong> {formatDate(selectedReceivable.dueDate)}</p>
                    <p><strong>Status:</strong> {getStatusText(selectedReceivable.status)}</p>
                    {selectedReceivable.paidAt && (
                      <p><strong>Data de Recebimento:</strong> {formatDate(selectedReceivable.paidAt)}</p>
                    )}
                    {selectedReceivable.paidAmount && (
                      <p><strong>Valor Recebido:</strong> {formatCurrency(selectedReceivable.paidAmount)}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Propriedade */}
              {selectedReceivable.propertyTitle && (
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Propriedade</h4>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {selectedReceivable.propertyTitle}
                  </p>
                </div>
              )}
              
              {/* Observações */}
              {selectedReceivable.notes && (
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Observações</h4>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {selectedReceivable.notes}
                  </p>
                </div>
              )}
            </div>
            
            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              {selectedReceivable.status === 'pending' && (
                <Button className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Marcar como Recebido</span>
                  <span className="sm:hidden">Recebido</span>
                </Button>
              )}
              <Button className="text-xs sm:text-sm">
                <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Editar</span>
                <span className="sm:hidden">Editar</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
