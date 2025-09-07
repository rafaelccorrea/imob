import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Eye, 
  Edit, 
  Phone, 
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  MessageSquare,
  Bell
} from 'lucide-react';
import { 
  mockFinancialVisits,
  mockProperties,
  mockUsers
} from '../utils/mockData';
import type { Visit } from '../types/financial';
import { formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal } from '../components/ui';

export const VisitsManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  // Debug: verificar se os dados estão sendo carregados
  console.log('VisitsManagementPage carregada');
  console.log('mockFinancialVisits:', mockFinancialVisits);
  console.log('mockProperties:', mockProperties);
  console.log('mockUsers:', mockUsers);

  // Verificar se há dados
  if (!mockFinancialVisits || mockFinancialVisits.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Gestão de Visitas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Nenhuma visita encontrada. Verifique os dados mock.
          </p>
        </div>
      </div>
    );
  }

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'warning';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'destructive';
      case 'rescheduled':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  // Função para obter o texto do status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Agendada';
      case 'completed': return 'Realizada';
      case 'cancelled': return 'Cancelada';
      case 'rescheduled': return 'Reagendada';
      default: return status;
    }
  };

  // Filtrar visitas
  const filteredVisits = mockFinancialVisits.filter(visit => {
    const matchesSearch = visit.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || visit.status === selectedStatus;
    const matchesAgent = !selectedAgent || visit.agentId === selectedAgent;
    const matchesDate = !selectedDate || visit.scheduledDate.startsWith(selectedDate);
    return matchesSearch && matchesStatus && matchesAgent && matchesDate;
  });

  // Estatísticas
  const totalVisits = mockFinancialVisits.length;
  const scheduledVisits = mockFinancialVisits.filter(v => v.status === 'scheduled').length;
  const completedVisits = mockFinancialVisits.filter(v => v.status === 'completed').length;
  const cancelledVisits = mockFinancialVisits.filter(v => v.status === 'cancelled').length;
  const conversionRate = totalVisits > 0 ? (completedVisits / totalVisits) * 100 : 0;

  // Visitas de hoje
  const todayVisits = mockFinancialVisits.filter(visit => {
    const visitDate = new Date(visit.scheduledDate);
    const today = new Date();
    return visitDate.toDateString() === today.toDateString();
  });


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text.title} truncate`}>
            Gestão de Visitas
          </h1>
          <p className={`text-xs sm:text-sm ${colors.text.subtitle}`}>
            Agende e acompanhe visitas aos imóveis
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
            <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Lembretes</span>
            <span className="sm:hidden">Lemb.</span>
          </Button>
          <Button className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto" onClick={() => setShowScheduleModal(true)}>
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Agendar Visita</span>
            <span className="sm:hidden">Agendar</span>
          </Button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle} truncate`}>
                  Total de Visitas
                </p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.text.title}`}>
                  {totalVisits}
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.primary} flex-shrink-0`}>
                <Calendar className={`h-4 w-4 sm:h-6 sm:w-6 text-primary-600 dark:text-white`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle} truncate`}>
                  Agendadas
                </p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.warning}`}>
                  {scheduledVisits}
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.warning} flex-shrink-0`}>
                <Clock className={`h-4 w-4 sm:h-6 sm:w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle} truncate`}>
                  Realizadas
                </p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.success}`}>
                  {completedVisits}
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.success} flex-shrink-0`}>
                <CheckCircle className={`h-4 w-4 sm:h-6 sm:w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle} truncate`}>
                  Canceladas
                </p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.error}`}>
                  {cancelledVisits}
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.error} flex-shrink-0`}>
                <XCircle className={`h-4 w-4 sm:h-6 sm:w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle} truncate`}>
                  Taxa de Conversão
                </p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.success}`}>
                  {conversionRate.toFixed(1)}%
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.success} flex-shrink-0`}>
                <Star className={`h-4 w-4 sm:h-6 sm:w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitas de Hoje */}
      {todayVisits.length > 0 && (
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className={`${colors.text.title} flex items-center gap-2 text-sm sm:text-base`}>
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-white" />
              Visitas de Hoje ({todayVisits.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {todayVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                    <div className={`p-2 rounded-full ${colors.iconBg.warning} flex-shrink-0`}>
                      <Clock className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icons.warning}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`font-medium text-sm sm:text-base ${colors.text.title} truncate`}>
                        {visit.clientName}
                      </p>
                      <p className={`text-xs sm:text-sm ${colors.text.subtitle} truncate`}>
                        {visit.propertyTitle}
                      </p>
                      <p className={`text-xs ${colors.text.subtitle} truncate`}>
                        {formatDate(visit.scheduledDate)} • {visit.agentName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setSelectedVisit(visit);
                        setShowModal(true);
                      }}
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <Input
                placeholder="Buscar por cliente, propriedade ou corretor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos os status</option>
                <option value="scheduled">Agendada</option>
                <option value="completed">Realizada</option>
                <option value="cancelled">Cancelada</option>
                <option value="rescheduled">Reagendada</option>
              </select>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos os corretores</option>
                {mockUsers.filter(u => u.role === 'agent').map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert dark:[&::-webkit-calendar-picker-indicator]:filter dark:[&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Visitas */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className={`${colors.text.title} text-sm sm:text-base`}>
            Todas as Visitas ({filteredVisits.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {filteredVisits.map((visit) => (
              <div
                key={visit.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                  <div className={`p-2 rounded-full flex-shrink-0 ${
                    visit.status === 'scheduled' ? colors.iconBg.warning :
                    visit.status === 'completed' ? colors.iconBg.success :
                    visit.status === 'cancelled' ? colors.iconBg.error :
                    colors.iconBg.primary
                  }`}>
                    {visit.status === 'scheduled' ? (
                      <Clock className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icons.warning}`} />
                    ) : visit.status === 'completed' ? (
                      <CheckCircle className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icons.success}`} />
                    ) : visit.status === 'cancelled' ? (
                      <XCircle className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icons.error}`} />
                    ) : (
                      <Calendar className={`h-4 w-4 sm:h-5 sm:w-5 text-primary-600 dark:text-white`} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-medium text-sm sm:text-base ${colors.text.title} truncate`}>
                      {visit.clientName}
                    </p>
                    <p className={`text-xs sm:text-sm ${colors.text.subtitle} truncate`}>
                      {visit.propertyTitle}
                    </p>
                    <p className={`text-xs ${colors.text.subtitle} truncate`}>
                      {visit.clientPhone} • {visit.clientEmail}
                    </p>
                    <p className={`text-xs ${colors.text.subtitle} truncate`}>
                      Agendada para: {formatDate(visit.scheduledDate)} • 
                      Corretor: {visit.agentName}
                    </p>
                    {visit.notes && (
                      <p className={`text-xs ${colors.text.subtitle} mt-1 truncate`}>
                        Observações: {visit.notes}
                      </p>
                    )}
                    {visit.feedback && (
                      <p className={`text-xs ${colors.text.subtitle} mt-1 truncate`}>
                        Feedback: {visit.feedback}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex flex-col sm:items-end gap-1 sm:gap-2">
                    <Badge variant={getStatusColor(visit.status) as 'warning' | 'success' | 'destructive' | 'primary' | 'secondary'} className="text-xs">
                      <span className="hidden sm:inline">{getStatusText(visit.status)}</span>
                      <span className="sm:hidden">{getStatusText(visit.status).charAt(0)}</span>
                    </Badge>
                    {visit.rating && (
                      <div className="flex items-center gap-1">
                        <Star className={`h-3 w-3 sm:h-4 sm:w-4 ${colors.icons.warning}`} />
                        <span className={`text-xs sm:text-sm ${colors.text.title}`}>
                          {visit.rating}/5
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setSelectedVisit(visit);
                        setShowModal(true);
                      }}
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
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
        title="Detalhes da Visita"
      >
        {selectedVisit && (
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                  Cliente
                </p>
                <p className={`text-sm sm:text-base ${colors.text.title}`}>
                  {selectedVisit.clientName}
                </p>
              </div>
              <div>
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                  Telefone
                </p>
                <p className={`text-sm sm:text-base ${colors.text.title}`}>
                  {selectedVisit.clientPhone}
                </p>
              </div>
            </div>
            
            <div>
              <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                Email
              </p>
              <p className={`text-sm sm:text-base ${colors.text.title}`}>
                {selectedVisit.clientEmail}
              </p>
            </div>
            
            <div>
              <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                Propriedade
              </p>
              <p className={`text-sm sm:text-base ${colors.text.title}`}>
                {selectedVisit.propertyTitle}
              </p>
            </div>
            
            <div>
              <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                Data Agendada
              </p>
              <p className={`text-sm sm:text-base ${colors.text.title}`}>
                {formatDate(selectedVisit.scheduledDate)}
              </p>
            </div>
            
            <div>
              <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                Status
              </p>
              <Badge variant={getStatusColor(selectedVisit.status) as 'warning' | 'success' | 'destructive' | 'primary' | 'secondary'} className="text-xs">
                {getStatusText(selectedVisit.status)}
              </Badge>
            </div>
            
            {selectedVisit.notes && (
              <div>
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                  Observações
                </p>
                <p className={`text-sm sm:text-base ${colors.text.title}`}>
                  {selectedVisit.notes}
                </p>
              </div>
            )}
            
            {selectedVisit.feedback && (
              <div>
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                  Feedback
                </p>
                <p className={`text-sm sm:text-base ${colors.text.title}`}>
                  {selectedVisit.feedback}
                </p>
              </div>
            )}
            
            {selectedVisit.rating && (
              <div>
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                  Avaliação
                </p>
                <div className="flex items-center gap-1">
                  <Star className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icons.warning}`} />
                  <span className={`text-sm sm:text-lg font-bold ${colors.text.title}`}>
                    {selectedVisit.rating}/5
                  </span>
                </div>
              </div>
            )}
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Agendamento */}
      <Modal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Agendar Nova Visita"
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-3 sm:space-y-4">
          <div>
            <label className={`block text-xs sm:text-sm font-medium ${colors.text.subtitle} mb-1 sm:mb-2`}>
              Cliente
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
              <option value="">Selecione um cliente</option>
              {/* Aqui você pode listar os clientes disponíveis */}
            </select>
          </div>
          
          <div>
            <label className={`block text-xs sm:text-sm font-medium ${colors.text.subtitle} mb-1 sm:mb-2`}>
              Propriedade
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
              <option value="">Selecione uma propriedade</option>
              {mockProperties.map(property => (
                <option key={property.id} value={property.id}>
                  {property.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={`block text-xs sm:text-sm font-medium ${colors.text.subtitle} mb-1 sm:mb-2`}>
              Data e Hora
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert dark:[&::-webkit-calendar-picker-indicator]:filter dark:[&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
          
          <div>
            <label className={`block text-xs sm:text-sm font-medium ${colors.text.subtitle} mb-1 sm:mb-2`}>
              Observações
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
              placeholder="Observações sobre a visita..."
            />
          </div>
          
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-3 sm:pt-4 flex-shrink-0">
            <Button variant="outline" onClick={() => setShowScheduleModal(false)} className="text-xs sm:text-sm">
              Cancelar
            </Button>
            <Button onClick={() => setShowScheduleModal(false)} className="text-xs sm:text-sm">
              Agendar Visita
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
