import React, { useState } from 'react';
import { 
  Clock3, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Clock,
  Users,
  Calendar,
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
  mockTimeTracking,
  mockVacationRequests,
  mockEmployees
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu, Tabs } from '../components/ui';
import type { TimeTracking, VacationRequest, Employee } from '../types';
import { usePermissions } from '../hooks/usePermissions';

export const TimeTrackingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'time-tracking' | 'vacation-requests'>('time-tracking');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { hasPermission } = usePermissions();

  // Filtros para controle de tempo
  const filteredTimeTracking = mockTimeTracking.filter(timeEntry => {
    const employee = mockEmployees.find(e => e.id === timeEntry.employeeId);
    const matchesSearch = employee?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmployee = !selectedEmployee || timeEntry.employeeId === selectedEmployee;
    
    return matchesSearch && matchesEmployee;
  });

  // Filtros para solicitações de férias
  const filteredVacationRequests = mockVacationRequests.filter(vacation => {
    const employee = mockEmployees.find(e => e.id === vacation.employeeId);
    const matchesSearch = employee?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmployee = !selectedEmployee || vacation.employeeId === selectedEmployee;
    const matchesStatus = !selectedStatus || vacation.status === selectedStatus;
    
    return matchesSearch && matchesEmployee && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'approved': 'Aprovado',
      'pending': 'Pendente',
      'rejected': 'Rejeitado',
      'cancelled': 'Cancelado',
      'completed': 'Concluído'
    };
    return statusMap[status] || status;
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const tabs = [
    { id: 'time-tracking', label: 'Controle de Ponto', icon: Clock },
    { id: 'vacation-requests', label: 'Solicitações de Férias', icon: CalendarDays }
  ];

  // Calcular métricas
  const totalHoursWorked = mockTimeTracking.reduce((sum, t) => sum + t.totalHours, 0);
  const averageHoursPerDay = mockTimeTracking.length > 0 ? totalHoursWorked / mockTimeTracking.length : 0;
  const pendingVacationRequests = mockVacationRequests.filter(v => v.status === 'pending').length;
  const approvedVacationRequests = mockVacationRequests.filter(v => v.status === 'approved').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Controle de Tempo
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Gestão de ponto, férias e controle de horas trabalhadas
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
              <span className="hidden sm:inline">Nova Solicitação</span>
              <span className="sm:hidden">Nova</span>
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
                  Total de Horas Trabalhadas
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {totalHoursWorked.toFixed(1)}h
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockTimeTracking.length} registros
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <Clock className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Média de Horas por Dia
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {averageHoursPerDay.toFixed(1)}h
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Por funcionário
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
                  Solicitações Pendentes
                </p>
                <p className={`text-2xl font-bold text-yellow-600 dark:text-yellow-400`}>
                  {pendingVacationRequests}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Aguardando aprovação
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <AlertTriangle className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Férias Aprovadas
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {approvedVacationRequests}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockVacationRequests.length} total
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <Award className={`h-6 w-6 ${colors.icons.money}`} />
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
                placeholder="Buscar por funcionário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os funcionários</option>
              {mockEmployees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="approved">Aprovado</option>
              <option value="pending">Pendente</option>
              <option value="rejected">Rejeitado</option>
              <option value="cancelled">Cancelado</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo das Tabs */}
      {activeTab === 'time-tracking' && (
        <div className="space-y-6">
          {/* Controle de Ponto */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base text-secondary-900 dark:text-white">
                Controle de Ponto ({filteredTimeTracking.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {filteredTimeTracking.map((timeEntry) => {
                  const employee = mockEmployees.find(e => e.id === timeEntry.employeeId);
                  return (
                    <div
                      key={timeEntry.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 sm:gap-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base text-secondary-900 dark:text-white truncate">
                            {employee?.name}
                          </p>
                          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">
                            {formatDate(timeEntry.date)} • {timeEntry.totalHours}h trabalhadas
                          </p>
                          <p className="text-xs text-secondary-500 dark:text-secondary-500 truncate">
                            Entrada: {timeEntry.checkIn} • Saída: {timeEntry.checkOut}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                        <div className="text-left sm:text-right">
                          <p className="font-bold text-sm sm:text-base text-primary-600 dark:text-primary-400">
                            {timeEntry.totalHours}h
                          </p>
                          <Badge variant="default" className="text-xs mt-1">
                            {timeEntry.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openModal(timeEntry)}
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
        </div>
      )}

      {activeTab === 'vacation-requests' && (
        <div className="space-y-6">
          {/* Solicitações de Férias */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base text-secondary-900 dark:text-white">
                Solicitações de Férias ({filteredVacationRequests.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {filteredVacationRequests.map((vacation) => {
                  const employee = mockEmployees.find(e => e.id === vacation.employeeId);
                  return (
                    <div
                      key={vacation.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 sm:gap-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base text-secondary-900 dark:text-white truncate">
                            {employee?.name}
                          </p>
                          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">
                            {formatDate(vacation.startDate)} - {formatDate(vacation.endDate)}
                          </p>
                          <p className="text-xs text-secondary-500 dark:text-secondary-500 truncate">
                            {vacation.days} dias • {vacation.reason}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                        <div className="text-left sm:text-right">
                          <p className="font-bold text-sm sm:text-base text-primary-600 dark:text-primary-400">
                            {vacation.days} dias
                          </p>
                          <Badge variant={getStatusColor(vacation.status) as any} className="text-xs mt-1">
                            {getStatusText(vacation.status)}
                          </Badge>
                          <p className="text-xs text-secondary-500 dark:text-secondary-500">
                            {formatDate(vacation.requestDate)}
                          </p>
                        </div>
                        <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openModal(vacation)}
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
                  <p><strong>Funcionário:</strong> {mockEmployees.find(e => e.id === selectedItem.employeeId)?.name}</p>
                  {selectedItem.date && <p><strong>Data:</strong> {formatDate(selectedItem.date)}</p>}
                  {selectedItem.totalHours && <p><strong>Horas Trabalhadas:</strong> {selectedItem.totalHours}h</p>}
                  {selectedItem.type && <p><strong>Tipo:</strong> {selectedItem.type}</p>}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações Adicionais</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {selectedItem.checkIn && <p><strong>Entrada:</strong> {selectedItem.checkIn}</p>}
                  {selectedItem.checkOut && <p><strong>Saída:</strong> {selectedItem.checkOut}</p>}
                  {selectedItem.status && <p><strong>Status:</strong> {getStatusText(selectedItem.status)}</p>}
                  {selectedItem.days && <p><strong>Dias:</strong> {selectedItem.days}</p>}
                </div>
              </div>
            </div>
            
            {selectedItem.reason && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Motivo</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedItem.reason}
                  </p>
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
