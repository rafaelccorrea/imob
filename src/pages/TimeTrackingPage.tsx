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
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Controle de Tempo
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Gestão de ponto, férias e controle de horas trabalhadas
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
              Nova Solicitação
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
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Controle de Ponto ({filteredTimeTracking.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTimeTracking.map((timeEntry) => {
                  const employee = mockEmployees.find(e => e.id === timeEntry.employeeId);
                  return (
                    <div
                      key={timeEntry.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${colors.iconBg.money}`}>
                          <Clock3 className={`h-5 w-5 ${colors.icons.money}`} />
                        </div>
                        <div>
                          <p className={`font-medium ${colors.text.title}`}>
                            {employee?.name}
                          </p>
                          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                            {formatDate(timeEntry.date)} • {timeEntry.totalHours}h trabalhadas
                          </p>
                          <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                            Entrada: {timeEntry.checkIn} • Saída: {timeEntry.checkOut}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`font-bold text-blue-600 dark:text-blue-400`}>
                            {timeEntry.totalHours}h
                          </p>
                          <Badge variant="default">
                            {timeEntry.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openModal(timeEntry)}
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
        </div>
      )}

      {activeTab === 'vacation-requests' && (
        <div className="space-y-6">
          {/* Solicitações de Férias */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Solicitações de Férias ({filteredVacationRequests.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredVacationRequests.map((vacation) => {
                  const employee = mockEmployees.find(e => e.id === vacation.employeeId);
                  return (
                    <div
                      key={vacation.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${colors.iconBg.success}`}>
                          <CalendarDays className={`h-5 w-5 ${colors.icons.success}`} />
                        </div>
                        <div>
                          <p className={`font-medium ${colors.text.title}`}>
                            {employee?.name}
                          </p>
                          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                            {formatDate(vacation.startDate)} - {formatDate(vacation.endDate)}
                          </p>
                          <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                            {vacation.days} dias • {vacation.reason}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`font-bold text-purple-600 dark:text-purple-400`}>
                            {vacation.days} dias
                          </p>
                          <Badge variant={getStatusColor(vacation.status) as any}>
                            {getStatusText(vacation.status)}
                          </Badge>
                          <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1`}>
                            {formatDate(vacation.requestDate)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openModal(vacation)}
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
