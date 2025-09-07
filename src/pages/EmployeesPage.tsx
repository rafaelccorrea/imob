import React, { useState } from 'react';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Phone,
  Mail,
  Calendar,
  DollarSign,
  User,
  FileText,
  Download,
  CheckCircle,
  Clock,
  Users,
  Target,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Award,
  CalendarDays,
  Clock3,
  Building,
  MapPin,
  Heart,
  Car,
  Dumbbell,
  Shield,
  Star,
  BarChart3,
  PieChart,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  UserPlus,
  ClipboardList,
  BookOpen,
  CreditCard,
  Calendar as CalendarIcon,
  Filter as FilterIcon
} from 'lucide-react';
import { 
  mockEmployees
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import type { Employee } from '../types';
import { usePermissions } from '../hooks/usePermissions';

export const EmployeesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { hasPermission } = usePermissions();

  // Filtros para funcionários
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || employee.department === selectedDepartment;
    const matchesStatus = !selectedStatus || (selectedStatus === 'active' ? employee.isActive : !employee.isActive);
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'danger';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Ativo' : 'Inativo';
  };

  const openEmployeeModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const calculateYearsOfService = (hireDate: Date) => {
    const today = new Date();
    const hire = new Date(hireDate);
    return today.getFullYear() - hire.getFullYear();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Colaboradores
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Gestão de colaboradores e equipe
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
              <span className="hidden sm:inline">Novo Colaborador</span>
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
                  Total de Colaboradores
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {mockEmployees.length}
                </p>
                <p className="text-xs text-success-600 dark:text-success-400">
                  +2 este mês
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Colaboradores Ativos
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {mockEmployees.filter(e => e.isActive).length}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {((mockEmployees.filter(e => e.isActive).length / mockEmployees.length) * 100).toFixed(1)}% do total
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
                  Folha Salarial Total
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  {formatCurrency(mockEmployees.reduce((sum, e) => sum + e.salary, 0))}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Média: {formatCurrency(mockEmployees.reduce((sum, e) => sum + e.salary, 0) / mockEmployees.length)}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Tempo Médio de Empresa
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-secondary-600 dark:text-white">
                  {Math.round(mockEmployees.reduce((sum, e) => sum + calculateYearsOfService(e.hireDate), 0) / mockEmployees.length)} anos
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Experiência média
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-600 dark:text-white" />
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
                placeholder="Buscar colaboradores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os departamentos</option>
              <option value="Vendas">Vendas</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Marketing">Marketing</option>
              <option value="Financeiro">Financeiro</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Colaboradores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white truncate">{employee.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{employee.position}</p>
                  </div>
                </div>
                <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEmployeeModal(employee)}
                    className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{employee.email}</span>
                </div>
                
                <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{employee.phone}</span>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="default" className="text-xs">
                    {employee.department}
                  </Badge>
                  <Badge variant={getStatusColor(employee.isActive) as any} className="text-xs">
                    {getStatusText(employee.isActive)}
                  </Badge>
                </div>
                
                <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{formatCurrency(employee.salary)}</span>
                </div>
                
                <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Contratado em {formatDate(employee.hireDate)}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Documentos</span>
                  <span className="sm:hidden">Docs</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Contrato</span>
                  <span className="sm:hidden">Contrato</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        {selectedEmployee && (
          <div className="flex flex-col h-full">
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
              {/* Header Personalizado do Modal */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Colaborador: {selectedEmployee.name}
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
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Informações Pessoais</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Nome:</strong> {selectedEmployee.name}</p>
                    <p><strong>Email:</strong> {selectedEmployee.email}</p>
                    <p><strong>Telefone:</strong> {selectedEmployee.phone}</p>
                    <p><strong>Cargo:</strong> {selectedEmployee.position}</p>
                    <p><strong>Departamento:</strong> {selectedEmployee.department}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Informações Profissionais</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Salário:</strong> {formatCurrency(selectedEmployee.salary)}</p>
                    <p><strong>Data de Contratação:</strong> {formatDate(selectedEmployee.hireDate)}</p>
                    <p><strong>Tempo de Empresa:</strong> {calculateYearsOfService(selectedEmployee.hireDate)} anos</p>
                    <p><strong>Status:</strong> {getStatusText(selectedEmployee.isActive)}</p>
                  </div>
                </div>
              </div>
            
              {/* Benefícios */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Benefícios</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Plano de Saúde: {selectedEmployee.benefits.healthInsurance ? 'Sim' : 'Não'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Vale Refeição: {formatCurrency(selectedEmployee.benefits.mealTicket || 0)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Vale Transporte: {formatCurrency(selectedEmployee.benefits.transportTicket || 0)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Dumbbell className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Academia: {selectedEmployee.benefits.gymPass ? 'Sim' : 'Não'}</span>
                  </div>
                </div>
              </div>
            
              {/* Documentos */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Documentos</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center min-w-0 flex-1">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-gray-600 dark:text-gray-300 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate">Contrato de Trabalho</span>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-shrink-0">
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center min-w-0 flex-1">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-gray-600 dark:text-gray-300 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate">Carteira de Identidade</span>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-shrink-0">
                      Download
                    </Button>
                  </div>
                  
                  {selectedEmployee.documents.medicalExam && (
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center min-w-0 flex-1">
                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-gray-600 dark:text-gray-300 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate">Exame Médico</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-shrink-0">
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            
            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              <Button className="text-xs sm:text-sm">
                <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Editar Colaborador</span>
                <span className="sm:hidden">Editar</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
