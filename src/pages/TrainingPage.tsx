import React, { useState } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  BookOpen,
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
  mockTrainings,
  mockEmployeeTrainings,
  mockEmployees
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu, Tabs } from '../components/ui';
import type { Training, EmployeeTraining } from '../types';
import { usePermissions } from '../hooks/usePermissions';

export const TrainingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trainings' | 'employee-trainings'>('trainings');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { hasPermission } = usePermissions();

  // Filtros para treinamentos
  const filteredTrainings = mockTrainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || training.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filtros para treinamentos de funcionários
  const filteredEmployeeTrainings = mockEmployeeTrainings.filter(empTraining => {
    const employee = mockEmployees.find(e => e.id === empTraining.employeeId);
    const training = mockTrainings.find(t => t.id === empTraining.trainingId);
    const matchesSearch = employee?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training?.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || empTraining.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'not_started':
        return 'secondary';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'completed': 'Concluído',
      'in_progress': 'Em Andamento',
      'not_started': 'Não Iniciado',
      'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const tabs = [
    { id: 'trainings', label: 'Treinamentos Disponíveis', icon: BookOpen },
    { id: 'employee-trainings', label: 'Treinamentos dos Funcionários', icon: Users }
  ];

  // Calcular métricas
  const totalTrainings = mockTrainings.length;
  const completedTrainings = mockEmployeeTrainings.filter(et => et.status === 'completed').length;
  const inProgressTrainings = mockEmployeeTrainings.filter(et => et.status === 'in_progress').length;
  const totalParticipants = mockEmployeeTrainings.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Treinamentos e Certificações
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Gestão de cursos, treinamentos e desenvolvimento profissional
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
              <span className="hidden sm:inline">Novo Treinamento</span>
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
                  Treinamentos Disponíveis
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {totalTrainings}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Cursos ativos
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Treinamentos Concluídos
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {completedTrainings}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {totalParticipants} participantes
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
                  Em Andamento
                </p>
                <p className={`text-2xl font-bold text-yellow-600 dark:text-yellow-400`}>
                  {inProgressTrainings}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Cursos em progresso
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
                  Taxa de Conclusão
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {totalParticipants > 0 ? ((completedTrainings / totalParticipants) * 100).toFixed(1) : 0}%
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Eficiência dos treinamentos
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
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todas as categorias</option>
              <option value="Técnico">Técnico</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Compliance">Compliance</option>
              <option value="Liderança">Liderança</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="completed">Concluído</option>
              <option value="in_progress">Em Andamento</option>
              <option value="not_started">Não Iniciado</option>
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
      {activeTab === 'trainings' && (
        <div className="space-y-6">
          {/* Treinamentos Disponíveis */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base text-secondary-900 dark:text-white">
                Treinamentos Disponíveis ({filteredTrainings.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {filteredTrainings.map((training) => (
                  <div
                    key={training.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 sm:gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base text-secondary-900 dark:text-white truncate">
                          {training.title}
                        </p>
                        <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">
                          {training.category} • {training.duration} horas
                        </p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-500 truncate">
                          {training.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                      <div className="text-left sm:text-right">
                        <Badge variant="default" className="text-xs mb-1">
                          {training.category}
                        </Badge>
                        <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
                          {training.duration}h
                        </p>
                      </div>
                      <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openModal(training)}
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

      {activeTab === 'employee-trainings' && (
        <div className="space-y-6">
          {/* Treinamentos dos Funcionários */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Treinamentos dos Funcionários ({filteredEmployeeTrainings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEmployeeTrainings.map((empTraining) => {
                  const employee = mockEmployees.find(e => e.id === empTraining.employeeId);
                  const training = mockTrainings.find(t => t.id === empTraining.trainingId);
                  return (
                    <div
                      key={empTraining.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${colors.iconBg.success}`}>
                          <Users className={`h-5 w-5 ${colors.icons.success}`} />
                        </div>
                        <div>
                          <p className={`font-medium ${colors.text.title}`}>
                            {employee?.name}
                          </p>
                          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                            {training?.title} • {training?.category}
                          </p>
                          <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                            Iniciado em {formatDate(empTraining.startDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          {empTraining.completionPercentage && (
                            <p className={`text-sm font-medium text-gray-900 dark:text-white`}>
                              {empTraining.completionPercentage}% concluído
                            </p>
                          )}
                          <Badge variant={getStatusColor(empTraining.status) as any}>
                            {getStatusText(empTraining.status)}
                          </Badge>
                          {empTraining.completedAt && (
                            <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1`}>
                              Concluído em {formatDate(empTraining.completedAt)}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openModal(empTraining)}
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
        title="Detalhes do Treinamento"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações do Treinamento</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Título:</strong> {selectedItem.title}</p>
                  <p><strong>Categoria:</strong> {selectedItem.category}</p>
                  <p><strong>Duração:</strong> {selectedItem.duration} horas</p>
                  <p><strong>Descrição:</strong> {selectedItem.description}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações Adicionais</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {selectedItem.status && <p><strong>Status:</strong> {getStatusText(selectedItem.status)}</p>}
                  {selectedItem.completionPercentage && <p><strong>Progresso:</strong> {selectedItem.completionPercentage}%</p>}
                  {selectedItem.startDate && <p><strong>Data de Início:</strong> {formatDate(selectedItem.startDate)}</p>}
                  {selectedItem.completedAt && <p><strong>Data de Conclusão:</strong> {formatDate(selectedItem.completedAt)}</p>}
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
