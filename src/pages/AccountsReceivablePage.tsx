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
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Contas a Receber
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Gestão de clientes e contas a receber
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
              Nova Conta
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
                  Total Pendente
                </p>
                <p className={`text-2xl font-bold text-yellow-600 dark:text-yellow-400`}>
                  {formatCurrency(totalPending)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockAccountsReceivable.filter(r => r.status === 'pending').length} contas
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <Clock className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Total Vencido
                </p>
                <p className={`text-2xl font-bold text-red-600 dark:text-red-400`}>
                  {formatCurrency(totalOverdue)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockAccountsReceivable.filter(r => r.status === 'overdue').length} contas
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.error}`}>
                <AlertTriangle className={`h-6 w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Total Recebido
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {formatCurrency(totalPaid)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockAccountsReceivable.filter(r => r.status === 'paid').length} contas
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <CheckCircle className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Total Geral
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {formatCurrency(mockAccountsReceivable.reduce((sum, r) => sum + r.amount, 0))}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
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
      <Card>
        <CardHeader>
          <CardTitle className={colors.text.title}>
            Contas a Receber ({filteredReceivables.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReceivables.map((receivable) => (
              <div
                key={receivable.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${colors.iconBg.money}`}>
                    <Receipt className={`h-5 w-5 ${colors.icons.money}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${colors.text.title}`}>
                      {receivable.description}
                    </p>
                    <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                      {receivable.clientName} • {getCategoryText(receivable.category)} • Vencimento: {formatDate(receivable.dueDate)}
                    </p>
                    {receivable.propertyTitle && (
                      <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                        Propriedade: {receivable.propertyTitle}
                      </p>
                    )}
                    {receivable.notes && (
                      <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                        {receivable.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-bold text-green-600 dark:text-green-400`}>
                      {formatCurrency(receivable.amount)}
                    </p>
                    {receivable.paidAmount && (
                      <p className={`text-sm text-blue-600 dark:text-blue-400`}>
                        Recebido: {formatCurrency(receivable.paidAmount)}
                      </p>
                    )}
                    <Badge variant={getStatusColor(receivable.status) as any}>
                      {getStatusText(receivable.status)}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openReceivableModal(receivable)}
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

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Conta a Receber: ${selectedReceivable?.description}`}
      >
        {selectedReceivable && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações da Conta</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Descrição:</strong> {selectedReceivable.description}</p>
                  <p><strong>Cliente:</strong> {selectedReceivable.clientName}</p>
                  <p><strong>Categoria:</strong> {getCategoryText(selectedReceivable.category)}</p>
                  <p><strong>Valor:</strong> {formatCurrency(selectedReceivable.amount)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações de Recebimento</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
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
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Propriedade</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedReceivable.propertyTitle}
                  </p>
                </div>
              </div>
            )}
            
            {/* Observações */}
            {selectedReceivable.notes && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Observações</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedReceivable.notes}
                  </p>
                </div>
              </div>
            )}
            
            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              {selectedReceivable.status === 'pending' && (
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marcar como Recebido
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
