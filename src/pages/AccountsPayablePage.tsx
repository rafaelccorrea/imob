import React, { useState } from 'react';
import { 
  CreditCard, 
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
  TrendingDown,
  AlertCircle,
  TrendingUp,
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
  mockAccountsPayable
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import type { AccountsPayable, Supplier } from '../types/financial';
import { usePermissions } from '../hooks/usePermissions';

export const AccountsPayablePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPayable, setSelectedPayable] = useState<AccountsPayable | null>(null);
  const { hasPermission } = usePermissions();

  // Filtros para contas a pagar
  const filteredPayables = mockAccountsPayable.filter(payable => {
    const matchesSearch = payable.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payable.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || payable.status === selectedStatus;
    const matchesCategory = !selectedCategory || payable.category === selectedCategory;
    
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

  const openPayableModal = (payable: AccountsPayable) => {
    setSelectedPayable(payable);
    setShowModal(true);
  };

  // Calcular totais
  const totalPending = mockAccountsPayable
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalOverdue = mockAccountsPayable
    .filter(p => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalPaid = mockAccountsPayable
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + (p.paidAmount || p.amount), 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Contas a Pagar
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Gestão de fornecedores e contas a pagar
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
                  {mockAccountsPayable.filter(p => p.status === 'pending').length} contas
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
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-destructive-600 dark:text-white">
                  {formatCurrency(totalOverdue)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockAccountsPayable.filter(p => p.status === 'overdue').length} contas
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total Pago
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {formatCurrency(totalPaid)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockAccountsPayable.filter(p => p.status === 'paid').length} contas
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
                  Total Geral
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {formatCurrency(mockAccountsPayable.reduce((sum, p) => sum + p.amount, 0))}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockAccountsPayable.length} contas
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar por descrição ou fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
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
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todas as categorias</option>
              <option value="Serviços">Serviços</option>
              <option value="Marketing">Marketing</option>
              <option value="Equipamentos">Equipamentos</option>
              <option value="Utilitários">Utilitários</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Contas a Pagar */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-sm sm:text-base text-secondary-900 dark:text-white">
            Contas a Pagar ({filteredPayables.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {filteredPayables.map((payable) => (
              <div
                key={payable.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-destructive-600 dark:text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base text-secondary-900 dark:text-white truncate">
                      {payable.description}
                    </p>
                    <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">
                      {payable.supplierName} • {payable.category} • Vencimento: {formatDate(payable.dueDate)}
                    </p>
                    {payable.installments && (
                      <p className="text-xs text-secondary-500 dark:text-secondary-500">
                        Parcela {payable.installments.current} de {payable.installments.total}
                      </p>
                    )}
                    {payable.notes && (
                      <p className="text-xs text-secondary-500 dark:text-secondary-500 truncate">
                        {payable.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-sm sm:text-base text-destructive-600 dark:text-destructive-400">
                      {formatCurrency(payable.amount)}
                    </p>
                    {payable.paidAmount && (
                      <p className="text-xs sm:text-sm text-success-600 dark:text-success-400">
                        Pago: {formatCurrency(payable.paidAmount)}
                      </p>
                    )}
                    <Badge variant={getStatusColor(payable.status) as any} className="text-xs mt-1">
                      {getStatusText(payable.status)}
                    </Badge>
                  </div>
                  <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openPayableModal(payable)}
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
        title={`Conta a Pagar: ${selectedPayable?.description}`}
      >
        {selectedPayable && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações da Conta</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Descrição:</strong> {selectedPayable.description}</p>
                  <p><strong>Fornecedor:</strong> {selectedPayable.supplierName}</p>
                  <p><strong>Categoria:</strong> {selectedPayable.category}</p>
                  <p><strong>Valor:</strong> {formatCurrency(selectedPayable.amount)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações de Pagamento</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Data de Vencimento:</strong> {formatDate(selectedPayable.dueDate)}</p>
                  <p><strong>Status:</strong> {getStatusText(selectedPayable.status)}</p>
                  {selectedPayable.paidAt && (
                    <p><strong>Data de Pagamento:</strong> {formatDate(selectedPayable.paidAt)}</p>
                  )}
                  {selectedPayable.paidAmount && (
                    <p><strong>Valor Pago:</strong> {formatCurrency(selectedPayable.paidAmount)}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Parcelas */}
            {selectedPayable.installments && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Parcelas</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Parcela {selectedPayable.installments.current} de {selectedPayable.installments.total}
                  </p>
                </div>
              </div>
            )}
            
            {/* Observações */}
            {selectedPayable.notes && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Observações</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedPayable.notes}
                  </p>
                </div>
              </div>
            )}
            
            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              {selectedPayable.status === 'pending' && (
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marcar como Pago
                </Button>
              )}
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
