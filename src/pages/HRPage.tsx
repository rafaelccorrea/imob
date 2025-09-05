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
  mockEmployees, 
  mockJobPositions, 
  mockCandidates, 
  mockInterviews, 
  mockPerformanceReviews, 
  mockTrainings, 
  mockEmployeeTrainings, 
  mockPayrolls, 
  mockVacationRequests, 
  mockTimeTracking 
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu, Tabs } from '../components/ui';
import type { 
  Employee, 
  JobPosition, 
  Candidate, 
  Interview, 
  PerformanceReview, 
  Training, 
  EmployeeTraining, 
  Payroll, 
  VacationRequest, 
  TimeTracking 
} from '../types';
import { usePermissions } from '../hooks/usePermissions';

export const HRPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'employees' | 'recruitment' | 'performance' | 'training' | 'payroll' | 'time'>('employees');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { hasPermission } = usePermissions();

  // Filtros para funcionários
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || employee.department === selectedDepartment;
    const matchesStatus = !selectedStatus || (selectedStatus === 'active' ? employee.isActive : !employee.isActive);
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Filtros para candidatos
  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || candidate.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
      case 'approved':
      case 'completed':
      case 'hired':
        return 'success';
      case 'pending':
      case 'screening':
      case 'interview':
      case 'draft':
        return 'warning';
      case 'inactive':
      case 'rejected':
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'active': 'Ativo',
      'inactive': 'Inativo',
      'paid': 'Pago',
      'pending': 'Pendente',
      'approved': 'Aprovado',
      'rejected': 'Rejeitado',
      'screening': 'Triagem',
      'interview': 'Entrevista',
      'hired': 'Contratado',
      'completed': 'Concluído',
      'draft': 'Rascunho',
      'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const calculateYearsOfService = (hireDate: Date) => {
    const today = new Date();
    const hire = new Date(hireDate);
    return today.getFullYear() - hire.getFullYear();
  };

  const tabs = [
    { id: 'employees', label: 'Colaboradores', icon: Users },
    { id: 'recruitment', label: 'Recrutamento', icon: UserPlus },
    { id: 'performance', label: 'Performance', icon: Target },
    { id: 'training', label: 'Treinamentos', icon: GraduationCap },
    { id: 'payroll', label: 'Folha de Pagamento', icon: CreditCard },
    { id: 'time', label: 'Controle de Tempo', icon: Clock3 }
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Recursos Humanos
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Gestão completa de colaboradores e equipe
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
                  Vagas Abertas
                </p>
                <p className={`text-2xl font-bold text-orange-600 dark:text-orange-400`}>
                  {mockJobPositions.filter(p => p.status === 'open').length}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockCandidates.length} candidatos
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <Briefcase className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Folha Salarial
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {formatCurrency(mockEmployees.reduce((sum, e) => sum + e.salary, 0))}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Média: {formatCurrency(mockEmployees.reduce((sum, e) => sum + e.salary, 0) / mockEmployees.length)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <DollarSign className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Treinamentos Ativos
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {mockEmployeeTrainings.filter(t => t.status === 'in_progress').length}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockTrainings.length} cursos disponíveis
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <GraduationCap className={`h-6 w-6 ${colors.icons.money}`} />
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
      {activeTab === 'employees' && (
        <div className="space-y-6">
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
                        onClick={() => openModal(employee)}
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
                      <Badge variant={getStatusColor(employee.isActive ? 'active' : 'inactive') as any}>
                        {getStatusText(employee.isActive ? 'active' : 'inactive')}
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
        </div>
      )}

      {activeTab === 'recruitment' && (
        <div className="space-y-6">
          {/* Vagas Abertas */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Vagas Abertas ({mockJobPositions.filter(p => p.status === 'open').length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockJobPositions.filter(p => p.status === 'open').map((position) => (
                  <div
                    key={position.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                        <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {position.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {position.department} • {formatCurrency(position.salaryRange.min)} - {formatCurrency(position.salaryRange.max)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {position.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="success">
                        {mockCandidates.filter(c => c.position === position.title).length} candidatos
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(position)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Candidatos */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Candidatos ({filteredCandidates.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                        <UserPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {candidate.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {candidate.position} • {candidate.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {candidate.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        {candidate.score && (
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Nota: {candidate.score}/10
                          </p>
                        )}
                        <Badge variant={getStatusColor(candidate.status) as any}>
                          {getStatusText(candidate.status)}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(candidate)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Avaliações de Performance */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Avaliações de Performance ({mockPerformanceReviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPerformanceReviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                        <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {review.employeeName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Período: {review.period} • Avaliador: {review.reviewerName}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(review.overallScore)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {review.overallScore}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusColor(review.status) as any}>
                        {getStatusText(review.status)}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(review)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'training' && (
        <div className="space-y-6">
          {/* Treinamentos Disponíveis */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Treinamentos Disponíveis ({mockTrainings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrainings.map((training) => (
                  <div
                    key={training.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900">
                        <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {training.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {training.provider} • {training.duration}h • {formatCurrency(training.cost)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {training.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={training.type === 'mandatory' ? 'danger' : 'secondary'}>
                        {training.type === 'mandatory' ? 'Obrigatório' : 'Opcional'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(training)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Treinamentos dos Funcionários */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Treinamentos dos Funcionários ({mockEmployeeTrainings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEmployeeTrainings.map((employeeTraining) => (
                  <div
                    key={employeeTraining.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                        <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {employeeTraining.employeeName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {employeeTraining.trainingTitle}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {employeeTraining.startDate && `Início: ${formatDate(employeeTraining.startDate)}`}
                          {employeeTraining.completionDate && ` • Conclusão: ${formatDate(employeeTraining.completionDate)}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        {employeeTraining.score && (
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Nota: {employeeTraining.score}/10
                          </p>
                        )}
                        <Badge variant={getStatusColor(employeeTraining.status) as any}>
                          {getStatusText(employeeTraining.status)}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(employeeTraining)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'payroll' && (
        <div className="space-y-6">
          {/* Folha de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Folha de Pagamento ({mockPayrolls.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPayrolls.map((payroll) => (
                  <div
                    key={payroll.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                        <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {payroll.employeeName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Período: {payroll.period} • Salário Bruto: {formatCurrency(payroll.grossSalary)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Salário Líquido: {formatCurrency(payroll.netSalary)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusColor(payroll.status) as any}>
                        {getStatusText(payroll.status)}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(payroll)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'time' && (
        <div className="space-y-6">
          {/* Controle de Tempo */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Controle de Tempo ({mockTimeTracking.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTimeTracking.map((timeEntry) => (
                  <div
                    key={timeEntry.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900">
                        <Clock3 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {timeEntry.employeeName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(timeEntry.date)} • {timeEntry.checkIn} - {timeEntry.checkOut}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Total: {timeEntry.totalHours}h • Extra: {timeEntry.overtimeHours}h
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusColor(timeEntry.status) as any}>
                        {getStatusText(timeEntry.status)}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(timeEntry)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Solicitações de Férias */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Solicitações de Férias ({mockVacationRequests.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVacationRequests.map((vacation) => (
                  <div
                    key={vacation.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                        <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {vacation.employeeName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(vacation.startDate)} - {formatDate(vacation.endDate)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {vacation.days} dias • {vacation.reason}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusColor(vacation.status) as any}>
                        {getStatusText(vacation.status)}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(vacation)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
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
                  {selectedItem.name && <p><strong>Nome:</strong> {selectedItem.name}</p>}
                  {selectedItem.email && <p><strong>Email:</strong> {selectedItem.email}</p>}
                  {selectedItem.phone && <p><strong>Telefone:</strong> {selectedItem.phone}</p>}
                  {selectedItem.position && <p><strong>Cargo:</strong> {selectedItem.position}</p>}
                  {selectedItem.department && <p><strong>Departamento:</strong> {selectedItem.department}</p>}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações Adicionais</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {selectedItem.salary && <p><strong>Salário:</strong> {formatCurrency(selectedItem.salary)}</p>}
                  {selectedItem.hireDate && <p><strong>Data de Contratação:</strong> {formatDate(selectedItem.hireDate)}</p>}
                  {selectedItem.status && <p><strong>Status:</strong> {getStatusText(selectedItem.status)}</p>}
                  {selectedItem.score && <p><strong>Nota:</strong> {selectedItem.score}/10</p>}
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