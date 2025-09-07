import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  DollarSign,
  Users,
  Calendar,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  XCircle as XCircleIcon,
  UserPlus,
  ClipboardList,
  Target,
  MapPin,
  Heart,
  Car,
  Dumbbell,
  Shield,
  Star,
  BarChart3,
  PieChart,
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
  mockPayrolls,
  mockEmployees
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import type { Payroll, Employee } from '../types';
import { usePermissions } from '../hooks/usePermissions';

export const PayrollPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);
  const { hasPermission } = usePermissions();

  // Filtros para folha de pagamento
  const filteredPayrolls = mockPayrolls.filter(payroll => {
    const employee = mockEmployees.find(e => e.id === payroll.employeeId);
    const matchesSearch = employee?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = !selectedPeriod || payroll.period === selectedPeriod;
    const matchesStatus = !selectedStatus || payroll.status === selectedStatus;
    
    return matchesSearch && matchesPeriod && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'processing':
        return 'secondary';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'paid': 'Pago',
      'pending': 'Pendente',
      'processing': 'Processando',
      'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const openPayrollModal = (payroll: Payroll) => {
    setSelectedPayroll(payroll);
    setShowModal(true);
  };

  // Calcular métricas
  const totalGrossSalary = mockPayrolls.reduce((sum, p) => sum + p.grossSalary, 0);
  const totalNetSalary = mockPayrolls.reduce((sum, p) => sum + p.netSalary, 0);
  const totalTaxes = mockPayrolls.reduce((sum, p) => sum + p.deductions.inss + p.deductions.irrf + p.deductions.transportTicket + p.deductions.other, 0);
  const totalBenefits = mockPayrolls.reduce((sum, p) => sum + p.benefits.healthInsurance + p.benefits.mealTicket + p.benefits.transportTicket + p.benefits.gymPass + p.benefits.lifeInsurance, 0);
  const paidPayrolls = mockPayrolls.filter(p => p.status === 'paid').length;
  const pendingPayrolls = mockPayrolls.filter(p => p.status === 'draft').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Folha de Pagamento
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Gestão de salários, benefícios e descontos
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <ConditionalMenu requiredPermission="hr">
            <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Exportar</span>
              <span className="sm:hidden">Exportar</span>
            </Button>
          </ConditionalMenu>
          <ConditionalMenu requiredPermission="hr">
            <Button className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Processar Folha</span>
              <span className="sm:hidden">Processar</span>
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
                  Salário Bruto Total
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {formatCurrency(totalGrossSalary)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockPayrolls.length} funcionários
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
                  Salário Líquido Total
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {formatCurrency(totalNetSalary)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Após descontos
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
                  Total de Impostos
                </p>
                <p className={`text-2xl font-bold text-red-600 dark:text-red-400`}>
                  {formatCurrency(totalTaxes)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {((totalTaxes / totalGrossSalary) * 100).toFixed(1)}% do bruto
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
                  Total de Benefícios
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {formatCurrency(totalBenefits)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Vale refeição, transporte, etc.
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
                placeholder="Buscar por funcionário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os períodos</option>
              <option value="Janeiro 2024">Janeiro 2024</option>
              <option value="Fevereiro 2024">Fevereiro 2024</option>
              <option value="Março 2024">Março 2024</option>
              <option value="Abril 2024">Abril 2024</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="paid">Pago</option>
              <option value="pending">Pendente</option>
              <option value="processing">Processando</option>
              <option value="cancelled">Cancelado</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Folha de Pagamento */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-sm sm:text-base text-secondary-900 dark:text-white">
            Folha de Pagamento ({filteredPayrolls.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {filteredPayrolls.map((payroll) => {
              const employee = mockEmployees.find(e => e.id === payroll.employeeId);
              return (
                <div
                  key={payroll.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base text-secondary-900 dark:text-white truncate">
                        {employee?.name}
                      </p>
                      <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">
                        {payroll.period} • {employee?.position}
                      </p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-500 truncate">
                        Bruto: {formatCurrency(payroll.grossSalary)} • Líquido: {formatCurrency(payroll.netSalary)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-sm sm:text-base text-success-600 dark:text-success-400">
                        {formatCurrency(payroll.netSalary)}
                      </p>
                      <Badge variant={getStatusColor(payroll.status) as any} className="text-xs mt-1">
                        {getStatusText(payroll.status)}
                      </Badge>
                      <p className="text-xs text-secondary-500 dark:text-secondary-500">
                        {formatDate(payroll.payDate)}
                      </p>
                    </div>
                    <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPayrollModal(payroll)}
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
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Folha de Pagamento: ${selectedPayroll ? mockEmployees.find(e => e.id === selectedPayroll.employeeId)?.name : ''}`}
      >
        {selectedPayroll && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações do Funcionário</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Nome:</strong> {mockEmployees.find(e => e.id === selectedPayroll.employeeId)?.name}</p>
                  <p><strong>Período:</strong> {selectedPayroll.period}</p>
                  <p><strong>Cargo:</strong> {mockEmployees.find(e => e.id === selectedPayroll.employeeId)?.position}</p>
                  <p><strong>Data de Pagamento:</strong> {formatDate(selectedPayroll.payDate)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Valores</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Salário Bruto:</strong> {formatCurrency(selectedPayroll.grossSalary)}</p>
                  <p><strong>Salário Líquido:</strong> {formatCurrency(selectedPayroll.netSalary)}</p>
                  <p><strong>Impostos:</strong> {formatCurrency(selectedPayroll.deductions.inss + selectedPayroll.deductions.irrf + selectedPayroll.deductions.transportTicket + selectedPayroll.deductions.other)}</p>
                  <p><strong>Benefícios:</strong> {formatCurrency(selectedPayroll.benefits.healthInsurance + selectedPayroll.benefits.mealTicket + selectedPayroll.benefits.transportTicket + selectedPayroll.benefits.gymPass + selectedPayroll.benefits.lifeInsurance)}</p>
                </div>
              </div>
            </div>
            
            {/* Descontos */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Descontos</h4>
              <div className="space-y-2">
                {selectedPayroll.deductions.map((deduction, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{deduction.description}</span>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      -{formatCurrency(deduction.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Benefícios */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Benefícios</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Plano de Saúde</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    +{formatCurrency(selectedPayroll.benefits.healthInsurance)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Vale Refeição</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    +{formatCurrency(selectedPayroll.benefits.mealTicket)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Vale Transporte</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    +{formatCurrency(selectedPayroll.benefits.transportTicket)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Academia</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    +{formatCurrency(selectedPayroll.benefits.gymPass)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Seguro de Vida</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    +{formatCurrency(selectedPayroll.benefits.lifeInsurance)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Baixar Holerite
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
