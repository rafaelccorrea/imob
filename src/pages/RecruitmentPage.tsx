import React, { useState } from 'react';
import { 
  UserPlus, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Phone,
  Mail,
  Calendar,
  Briefcase,
  Users,
  ClipboardList,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  CalendarDays,
  UserCheck,
  AlertCircle,
  TrendingUp,
  Award,
  Target,
  BookOpen,
  GraduationCap,
  MapPin,
  Building,
  DollarSign,
  Percent,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { 
  mockJobPositions, 
  mockCandidates, 
  mockInterviews
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu, Tabs } from '../components/ui';
import type { JobPosition, Candidate, Interview } from '../types';
import { usePermissions } from '../hooks/usePermissions';

export const RecruitmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'positions' | 'candidates' | 'interviews'>('positions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { hasPermission } = usePermissions();

  // Filtros para vagas
  const filteredPositions = mockJobPositions.filter(position => {
    const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || position.department === selectedDepartment;
    const matchesStatus = !selectedStatus || position.status === selectedStatus;
    
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
      case 'open':
      case 'hired':
      case 'completed':
        return 'success';
      case 'screening':
      case 'interview':
      case 'test':
      case 'pending':
        return 'warning';
      case 'closed':
      case 'paused':
      case 'rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'open': 'Aberta',
      'closed': 'Fechada',
      'paused': 'Pausada',
      'applied': 'Candidatou-se',
      'screening': 'Triagem',
      'interview': 'Entrevista',
      'test': 'Teste',
      'hired': 'Contratado',
      'rejected': 'Rejeitado',
      'scheduled': 'Agendada',
      'completed': 'Concluída',
      'cancelled': 'Cancelada'
    };
    return statusMap[status] || status;
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const tabs = [
    { id: 'positions', label: 'Vagas Abertas', icon: Briefcase },
    { id: 'candidates', label: 'Candidatos', icon: Users },
    { id: 'interviews', label: 'Entrevistas', icon: CalendarDays }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Recrutamento e Seleção
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Gestão de vagas, candidatos e processo seletivo
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
              <span className="hidden sm:inline">Nova Vaga</span>
              <span className="sm:hidden">Nova Vaga</span>
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
                  Vagas Abertas
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {mockJobPositions.filter(p => p.status === 'open').length}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockJobPositions.length} total
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Candidatos
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {mockCandidates.length}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockCandidates.filter(c => c.status === 'interview').length} em entrevista
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Entrevistas Agendadas
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  {mockInterviews.filter(i => i.status === 'scheduled').length}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockInterviews.length} total
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Taxa de Conversão
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-secondary-600 dark:text-white">
                  {((mockCandidates.filter(c => c.status === 'hired').length / mockCandidates.length) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockCandidates.filter(c => c.status === 'hired').length} contratados
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-2 sm:space-x-4 md:space-x-8 overflow-x-auto custom-scroll px-2 sm:px-4 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.id === 'positions' ? 'Vagas' : tab.id === 'candidates' ? 'Candidatos' : 'Entrevistas'}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Filtros */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar..."
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
              <option value="open">Aberta</option>
              <option value="closed">Fechada</option>
              <option value="pending">Pendente</option>
              <option value="interview">Entrevista</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo das Tabs */}
      {activeTab === 'positions' && (
        <div className="space-y-6">
          {/* Vagas Abertas */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base text-secondary-900 dark:text-white">
                Vagas Abertas ({filteredPositions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {filteredPositions.map((position) => (
                  <div
                    key={position.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 sm:gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary-100 dark:bg-primary-900">
                        <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base text-secondary-900 dark:text-white truncate">
                          {position.title}
                        </p>
                        <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">
                          {position.department} • {formatCurrency(position.salaryRange.min)} - {formatCurrency(position.salaryRange.max)}
                        </p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-500 truncate">
                          {position.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                      <div className="text-left sm:text-right">
                        <Badge variant="success" className="text-xs mb-1">
                          {mockCandidates.filter(c => c.position === position.title).length} candidatos
                        </Badge>
                        <Badge variant={getStatusColor(position.status) as any} className="text-xs">
                          {getStatusText(position.status)}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(position)}
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 flex-shrink-0"
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'candidates' && (
        <div className="space-y-6">
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
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {candidate.score}/10
                            </span>
                          </div>
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

      {activeTab === 'interviews' && (
        <div className="space-y-6">
          {/* Entrevistas */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Entrevistas ({mockInterviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                        <CalendarDays className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {interview.candidateName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {interview.position} • Entrevistador: {interview.interviewerName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(interview.scheduledDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        {interview.score && (
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {interview.score}/10
                            </span>
                          </div>
                        )}
                        <Badge variant={getStatusColor(interview.status) as any}>
                          {getStatusText(interview.status)}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(interview)}
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
                  {selectedItem.title && <p><strong>Título:</strong> {selectedItem.title}</p>}
                  {selectedItem.email && <p><strong>Email:</strong> {selectedItem.email}</p>}
                  {selectedItem.phone && <p><strong>Telefone:</strong> {selectedItem.phone}</p>}
                  {selectedItem.position && <p><strong>Posição:</strong> {selectedItem.position}</p>}
                  {selectedItem.department && <p><strong>Departamento:</strong> {selectedItem.department}</p>}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações Adicionais</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {selectedItem.salaryRange && (
                    <p><strong>Faixa Salarial:</strong> {formatCurrency(selectedItem.salaryRange.min)} - {formatCurrency(selectedItem.salaryRange.max)}</p>
                  )}
                  {selectedItem.score && <p><strong>Nota:</strong> {selectedItem.score}/10</p>}
                  {selectedItem.status && <p><strong>Status:</strong> {getStatusText(selectedItem.status)}</p>}
                  {selectedItem.scheduledDate && <p><strong>Data Agendada:</strong> {formatDate(selectedItem.scheduledDate)}</p>}
                </div>
              </div>
            </div>
            
            {selectedItem.description && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Descrição</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedItem.description}
                </p>
              </div>
            )}
            
            {selectedItem.requirements && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Requisitos</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {selectedItem.requirements.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
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
