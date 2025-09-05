import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Users,
  Building,
  MessageSquare,
  Bell
} from 'lucide-react';
import { 
  mockFinancialVisits,
  mockProperties,
  mockUsers
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal } from '../components/ui';
import { useAuthStore } from '../stores/authStore';
import type { FinancialVisit } from '../types/financial';

export const VisitsManagementPage: React.FC = () => {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<FinancialVisit | null>(null);

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

  // Visitas desta semana
  const weekVisits = mockFinancialVisits.filter(visit => {
    const visitDate = new Date(visit.scheduledDate);
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return visitDate >= weekStart && visitDate <= weekEnd;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${colors.text.title}`}>
            Gestão de Visitas
          </h1>
          <p className={`text-sm ${colors.text.subtitle}`}>
            Agende e acompanhe visitas aos imóveis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Lembretes
          </Button>
          <Button className="flex items-center gap-2" onClick={() => setShowScheduleModal(true)}>
            <Plus className="h-4 w-4" />
            Agendar Visita
          </Button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Total de Visitas
                </p>
                <p className={`text-2xl font-bold ${colors.text.title}`}>
                  {totalVisits}
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.primary}`}>
                <Calendar className={`h-6 w-6 ${colors.icons.primary}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Agendadas
                </p>
                <p className={`text-2xl font-bold ${colors.text.warning}`}>
                  {scheduledVisits}
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
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Realizadas
                </p>
                <p className={`text-2xl font-bold ${colors.text.success}`}>
                  {completedVisits}
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
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Canceladas
                </p>
                <p className={`text-2xl font-bold ${colors.text.error}`}>
                  {cancelledVisits}
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.error}`}>
                <XCircle className={`h-6 w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Taxa de Conversão
                </p>
                <p className={`text-2xl font-bold ${colors.text.success}`}>
                  {conversionRate.toFixed(1)}%
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <Star className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitas de Hoje */}
      {todayVisits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className={`${colors.text.title} flex items-center gap-2`}>
              <Calendar className="h-5 w-5" />
              Visitas de Hoje ({todayVisits.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-blue-50 dark:bg-blue-900/20"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${colors.iconBg.warning}`}>
                      <Clock className={`h-5 w-5 ${colors.icons.warning}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${colors.text.title}`}>
                        {visit.clientName}
                      </p>
                      <p className={`text-sm ${colors.text.subtitle}`}>
                        {visit.propertyTitle}
                      </p>
                      <p className={`text-xs ${colors.text.subtitle}`}>
                        {formatDate(visit.scheduledDate)} • {visit.agentName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedVisit(visit);
                        setShowModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Buscar por cliente, propriedade ou corretor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Visitas */}
      <Card>
        <CardHeader>
          <CardTitle className={colors.text.title}>
            Todas as Visitas ({filteredVisits.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredVisits.map((visit) => (
              <div
                key={visit.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    visit.status === 'scheduled' ? colors.iconBg.warning :
                    visit.status === 'completed' ? colors.iconBg.success :
                    visit.status === 'cancelled' ? colors.iconBg.error :
                    colors.iconBg.primary
                  }`}>
                    {visit.status === 'scheduled' ? (
                      <Clock className={`h-5 w-5 ${colors.icons.warning}`} />
                    ) : visit.status === 'completed' ? (
                      <CheckCircle className={`h-5 w-5 ${colors.icons.success}`} />
                    ) : visit.status === 'cancelled' ? (
                      <XCircle className={`h-5 w-5 ${colors.icons.error}`} />
                    ) : (
                      <Calendar className={`h-5 w-5 ${colors.icons.primary}`} />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${colors.text.title}`}>
                      {visit.clientName}
                    </p>
                    <p className={`text-sm ${colors.text.subtitle}`}>
                      {visit.propertyTitle}
                    </p>
                    <p className={`text-xs ${colors.text.subtitle}`}>
                      {visit.clientPhone} • {visit.clientEmail}
                    </p>
                    <p className={`text-xs ${colors.text.subtitle}`}>
                      Agendada para: {formatDate(visit.scheduledDate)} • 
                      Corretor: {visit.agentName}
                    </p>
                    {visit.notes && (
                      <p className={`text-xs ${colors.text.subtitle} mt-1`}>
                        Observações: {visit.notes}
                      </p>
                    )}
                    {visit.feedback && (
                      <p className={`text-xs ${colors.text.subtitle} mt-1`}>
                        Feedback: {visit.feedback}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={getStatusColor(visit.status) as any}>
                      {getStatusText(visit.status)}
                    </Badge>
                    {visit.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <Star className={`h-4 w-4 ${colors.icons.warning}`} />
                        <span className={`text-sm ${colors.text.title}`}>
                          {visit.rating}/5
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedVisit(visit);
                        setShowModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Cliente
                </p>
                <p className={colors.text.title}>
                  {selectedVisit.clientName}
                </p>
              </div>
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Telefone
                </p>
                <p className={colors.text.title}>
                  {selectedVisit.clientPhone}
                </p>
              </div>
            </div>
            
            <div>
              <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                Email
              </p>
              <p className={colors.text.title}>
                {selectedVisit.clientEmail}
              </p>
            </div>
            
            <div>
              <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                Propriedade
              </p>
              <p className={colors.text.title}>
                {selectedVisit.propertyTitle}
              </p>
            </div>
            
            <div>
              <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                Data Agendada
              </p>
              <p className={colors.text.title}>
                {formatDate(selectedVisit.scheduledDate)}
              </p>
            </div>
            
            <div>
              <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                Status
              </p>
              <Badge variant={getStatusColor(selectedVisit.status) as any}>
                {getStatusText(selectedVisit.status)}
              </Badge>
            </div>
            
            {selectedVisit.notes && (
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Observações
                </p>
                <p className={colors.text.title}>
                  {selectedVisit.notes}
                </p>
              </div>
            )}
            
            {selectedVisit.feedback && (
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Feedback
                </p>
                <p className={colors.text.title}>
                  {selectedVisit.feedback}
                </p>
              </div>
            )}
            
            {selectedVisit.rating && (
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Avaliação
                </p>
                <div className="flex items-center gap-1">
                  <Star className={`h-5 w-5 ${colors.icons.warning}`} />
                  <span className={`text-lg font-bold ${colors.text.title}`}>
                    {selectedVisit.rating}/5
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Modal de Agendamento */}
      <Modal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Agendar Nova Visita"
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${colors.text.subtitle} mb-2`}>
              Cliente
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option value="">Selecione um cliente</option>
              {/* Aqui você pode listar os clientes disponíveis */}
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${colors.text.subtitle} mb-2`}>
              Propriedade
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option value="">Selecione uma propriedade</option>
              {mockProperties.map(property => (
                <option key={property.id} value={property.id}>
                  {property.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${colors.text.subtitle} mb-2`}>
              Data e Hora
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${colors.text.subtitle} mb-2`}>
              Observações
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Observações sobre a visita..."
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowScheduleModal(false)}>
              Agendar Visita
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
