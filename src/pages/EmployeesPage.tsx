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
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Colaboradores
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Gestão de colaboradores e equipe
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <ConditionalMenu requiredPermission="hr">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </ConditionalMenu>
          <ConditionalMenu requiredPermission="hr">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Colaborador
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
                  Total de Colaboradores
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {mockEmployees.length}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400`}>
                  +2 este mês
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <Users className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Colaboradores Ativos
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {mockEmployees.filter(e => e.isActive).length}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {((mockEmployees.filter(e => e.isActive).length / mockEmployees.length) * 100).toFixed(1)}% do total
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
                  Folha Salarial Total
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {formatCurrency(mockEmployees.reduce((sum, e) => sum + e.salary, 0))}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Média: {formatCurrency(mockEmployees.reduce((sum, e) => sum + e.salary, 0) / mockEmployees.length)}
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
                  Tempo Médio de Empresa
                </p>
                <p className={`text-2xl font-bold text-orange-600 dark:text-orange-400`}>
                  {Math.round(mockEmployees.reduce((sum, e) => sum + calculateYearsOfService(e.hireDate), 0) / mockEmployees.length)} anos
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Experiência média
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <Clock className={`h-6 w-6 ${colors.icons.warning}`} />
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
                placeholder="Buscar colaboradores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Colaboradores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{employee.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{employee.position}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEmployeeModal(employee)}
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
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{employee.email}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{employee.phone}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="default">
                    {employee.department}
                  </Badge>
                  <Badge variant={getStatusColor(employee.isActive) as any}>
                    {getStatusText(employee.isActive)}
                  </Badge>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{formatCurrency(employee.salary)}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Contratado em {formatDate(employee.hireDate)}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentos
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Contrato
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
        title={`Colaborador: ${selectedEmployee?.name}`}
      >
        {selectedEmployee && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações Pessoais</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Nome:</strong> {selectedEmployee.name}</p>
                  <p><strong>Email:</strong> {selectedEmployee.email}</p>
                  <p><strong>Telefone:</strong> {selectedEmployee.phone}</p>
                  <p><strong>Cargo:</strong> {selectedEmployee.position}</p>
                  <p><strong>Departamento:</strong> {selectedEmployee.department}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações Profissionais</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Salário:</strong> {formatCurrency(selectedEmployee.salary)}</p>
                  <p><strong>Data de Contratação:</strong> {formatDate(selectedEmployee.hireDate)}</p>
                  <p><strong>Tempo de Empresa:</strong> {calculateYearsOfService(selectedEmployee.hireDate)} anos</p>
                  <p><strong>Status:</strong> {getStatusText(selectedEmployee.isActive)}</p>
                </div>
              </div>
            </div>
            
            {/* Benefícios */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Benefícios</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Plano de Saúde: {selectedEmployee.benefits.healthInsurance ? 'Sim' : 'Não'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Vale Refeição: {formatCurrency(selectedEmployee.benefits.mealTicket || 0)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Vale Transporte: {formatCurrency(selectedEmployee.benefits.transportTicket || 0)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dumbbell className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Academia: {selectedEmployee.benefits.gymPass ? 'Sim' : 'Não'}</span>
                </div>
              </div>
            </div>
            
            {/* Documentos */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Documentos</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Contrato de Trabalho</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Carteira de Identidade</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                
                {selectedEmployee.documents.medicalExam && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Exame Médico</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar Colaborador
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
