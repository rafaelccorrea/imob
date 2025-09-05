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
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Recrutamento e Seleção
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Gestão de vagas, candidatos e processo seletivo
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
              Nova Vaga
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
                  Vagas Abertas
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {mockJobPositions.filter(p => p.status === 'open').length}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockJobPositions.length} total
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <Briefcase className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Candidatos
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {mockCandidates.length}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockCandidates.filter(c => c.status === 'interview').length} em entrevista
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <Users className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Entrevistas Agendadas
                </p>
                <p className={`text-2xl font-bold text-orange-600 dark:text-orange-400`}>
                  {mockInterviews.filter(i => i.status === 'scheduled').length}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockInterviews.length} total
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <CalendarDays className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Taxa de Conversão
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {((mockCandidates.filter(c => c.status === 'hired').length / mockCandidates.length) * 100).toFixed(1)}%
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockCandidates.filter(c => c.status === 'hired').length} contratados
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <TrendingUp className={`h-6 w-6 ${colors.icons.money}`} />
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
              <option value="open">Aberta</option>
              <option value="closed">Fechada</option>
              <option value="pending">Pendente</option>
              <option value="interview">Entrevista</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo das Tabs */}
      {activeTab === 'positions' && (
        <div className="space-y-6">
          {/* Vagas Abertas */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Vagas Abertas ({filteredPositions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPositions.map((position) => (
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
                      <div className="text-right">
                        <Badge variant="success">
                          {mockCandidates.filter(c => c.position === position.title).length} candidatos
                        </Badge>
                        <Badge variant={getStatusColor(position.status) as any}>
                          {getStatusText(position.status)}
                        </Badge>
                      </div>
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
