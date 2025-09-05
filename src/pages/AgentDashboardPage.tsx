import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Target, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  MessageSquare,
  Building,
  Home,
  Car,
  Bed,
  Bath,
  Ruler
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  mockFinancialAgentDashboard,
  mockFinancialLeads,
  mockFinancialVisits,
  mockFinancialCommissions,
  mockProperties
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal } from '../components/ui';
import { useAuthStore } from '../stores/authStore';
import type { Lead as FinancialLead, Visit as FinancialVisit, Commission as FinancialCommission } from '../types/financial';

const AgentDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'visits' | 'commissions' | 'properties'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FinancialLead | FinancialVisit | FinancialCommission | null>(null);

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
      case 'scheduled':
      case 'paid':
        return 'success';
      case 'contacted':
      case 'visit_scheduled':
      case 'pending':
        return 'warning';
      case 'closed':
      case 'completed':
        return 'primary';
      case 'lost':
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Função para obter o texto do status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'contacted': return 'Contatado';
      case 'visit_scheduled': return 'Visita Agendada';
      case 'proposal': return 'Proposta';
      case 'closed': return 'Fechado';
      case 'lost': return 'Perdido';
      case 'scheduled': return 'Agendada';
      case 'completed': return 'Realizada';
      case 'cancelled': return 'Cancelada';
      case 'rescheduled': return 'Reagendada';
      case 'paid': return 'Pago';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  // Filtrar leads
  const filteredLeads = mockFinancialLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm);
    const matchesStatus = !selectedStatus || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Filtrar visitas
  const filteredVisits = mockFinancialVisits.filter(visit => {
    const matchesSearch = visit.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || visit.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Filtrar comissões
  const filteredCommissions = mockFinancialCommissions.filter(commission => {
    const matchesSearch = commission.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || commission.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Filtrar propriedades do corretor
  const agentProperties = mockProperties.filter(prop => prop.responsibleAgentId === user?.id);

  // Dados para gráficos
  const performanceData = [
    { month: 'Jan', leads: 12, visits: 8, deals: 2 },
    { month: 'Fev', leads: 15, visits: 10, deals: 3 },
    { month: 'Mar', leads: 18, visits: 12, deals: 4 },
    { month: 'Abr', leads: 14, visits: 9, deals: 2 },
    { month: 'Mai', leads: 16, visits: 11, deals: 3 },
    { month: 'Jun', leads: 20, visits: 14, deals: 5 }
  ];

  const leadStatusData = [
    { name: 'Novos', value: 3, color: '#10b981' },
    { name: 'Contatados', value: 5, color: '#f59e0b' },
    { name: 'Visitas Agendadas', value: 4, color: '#3b82f6' },
    { name: 'Propostas', value: 2, color: '#8b5cf6' },
    { name: 'Fechados', value: 1, color: '#ef4444' }
  ];

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Target },
    { id: 'leads', label: 'Meus Leads', icon: Users },
    { id: 'visits', label: 'Visitas', icon: Calendar },
    { id: 'commissions', label: 'Comissões', icon: DollarSign },
    { id: 'properties', label: 'Minhas Propriedades', icon: Building }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${colors.text.title}`}>
            Meu Dashboard
          </h1>
          <p className={`text-sm ${colors.text.subtitle}`}>
            Bem-vindo, {user?.name}! Acompanhe sua performance e gerencie seus leads
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            WhatsApp
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Total de Leads
                </p>
                <p className={`text-2xl font-bold ${colors.text.title}`}>
                  {mockFinancialAgentDashboard.totalLeads}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400`}>
                  +3 este mês
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.primary}`}>
                <Users className={`h-6 w-6 ${colors.icons.primary}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Visitas Agendadas
                </p>
                <p className={`text-2xl font-bold ${colors.text.title}`}>
                  {mockFinancialAgentDashboard.visitsScheduled}
                </p>
                <p className={`text-xs text-yellow-600 dark:text-yellow-400`}>
                  2 esta semana
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <Calendar className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Negócios Fechados
                </p>
                <p className={`text-2xl font-bold ${colors.text.title}`}>
                  {mockFinancialAgentDashboard.dealsClosed}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400`}>
                  +1 este mês
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
                  Comissões Pendentes
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {formatCurrency(mockFinancialAgentDashboard.pendingCommissions)}
                </p>
                <p className={`text-xs text-yellow-600 dark:text-yellow-400`}>
                  Taxa de conversão: {mockFinancialAgentDashboard.conversionRate}%
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <DollarSign className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ranking */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <Star className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
              <div>
                <p className={`text-lg font-bold ${colors.text.title}`}>
                  Você está em #{mockFinancialAgentDashboard.ranking} no ranking da equipe!
                </p>
                <p className={`text-sm ${colors.text.subtitle}`}>
                  Continue assim! Sua performance está excelente este mês.
                </p>
              </div>
            </div>
            <Badge variant="default" className="text-lg px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Top Performer
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
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

      {/* Conteúdo das Tabs */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Mensal */}
            <Card>
              <CardHeader>
                <CardTitle className={colors.text.title}>
                  Performance Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="leads" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Leads"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Visitas"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="deals" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      name="Negócios"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status dos Leads */}
            <Card>
              <CardHeader>
                <CardTitle className={colors.text.title}>
                  Status dos Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={leadStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {leadStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Atividades Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFinancialAgentDashboard.recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className={`p-2 rounded-full ${
                      activity.type === 'deal' ? colors.iconBg.success :
                      activity.type === 'visit' ? colors.iconBg.warning :
                      activity.type === 'lead' ? colors.iconBg.primary :
                      colors.iconBg.money
                    }`}>
                      {activity.type === 'deal' ? (
                        <CheckCircle className={`h-5 w-5 ${colors.icons.success}`} />
                      ) : activity.type === 'visit' ? (
                        <Calendar className={`h-5 w-5 ${colors.icons.warning}`} />
                      ) : activity.type === 'lead' ? (
                        <Users className={`h-5 w-5 ${colors.icons.primary}`} />
                      ) : (
                        <DollarSign className={`h-5 w-5 ${colors.icons.money}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${colors.text.title}`}>
                        {activity.description}
                      </p>
                      <p className={`text-sm ${colors.text.subtitle}`}>
                        {formatDate(activity.date)}
                      </p>
                    </div>
                    {activity.value && (
                      <div className="text-right">
                        <p className={`font-bold text-green-600 dark:text-green-400`}>
                          {formatCurrency(activity.value)}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'leads' && (
        <div className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <Input
                    placeholder="Buscar por nome, email ou telefone..."
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
                  <option value="new">Novo</option>
                  <option value="contacted">Contatado</option>
                  <option value="visit_scheduled">Visita Agendada</option>
                  <option value="proposal">Proposta</option>
                  <option value="closed">Fechado</option>
                  <option value="lost">Perdido</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Leads */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Meus Leads ({filteredLeads.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${colors.iconBg.primary}`}>
                        <Users className={`h-5 w-5 ${colors.icons.primary}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {lead.name}
                        </p>
                        <p className={`text-sm ${colors.text.subtitle}`}>
                          {lead.email} • {lead.phone}
                        </p>
                        <p className={`text-xs ${colors.text.subtitle}`}>
                          Origem: {lead.source} • Último contato: {formatDate(lead.lastContact)}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {lead.propertyPreferences.type.join(', ')}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            R$ {formatCurrency(lead.propertyPreferences.minPrice)} - {formatCurrency(lead.propertyPreferences.maxPrice)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusColor(lead.status) as any}>
                        {getStatusText(lead.status)}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(lead);
                            setShowModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
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
        </div>
      )}

      {activeTab === 'visits' && (
        <div className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <Input
                    placeholder="Buscar por cliente ou propriedade..."
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
              </div>
            </CardContent>
          </Card>

          {/* Lista de Visitas */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Minhas Visitas ({filteredVisits.length})
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
                      <div className={`p-2 rounded-full ${colors.iconBg.warning}`}>
                        <Calendar className={`h-5 w-5 ${colors.icons.warning}`} />
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
                          Agendada para: {formatDate(visit.scheduledDate)}
                        </p>
                        {visit.notes && (
                          <p className={`text-xs ${colors.text.subtitle} mt-1`}>
                            Observações: {visit.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusColor(visit.status) as any}>
                        {getStatusText(visit.status)}
                      </Badge>
                      {visit.rating && (
                        <div className="flex items-center gap-1">
                          <Star className={`h-4 w-4 ${colors.icons.warning}`} />
                          <span className={`text-sm ${colors.text.title}`}>
                            {visit.rating}/5
                          </span>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(visit);
                            setShowModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
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

      {activeTab === 'commissions' && (
        <div className="space-y-6">
          {/* Resumo de Comissões */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                      Total de Comissões
                    </p>
                    <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                      {formatCurrency(mockFinancialAgentDashboard.totalCommissions)}
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
                    <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                      Comissões Pagas
                    </p>
                    <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                      {formatCurrency(mockFinancialAgentDashboard.totalCommissions - mockFinancialAgentDashboard.pendingCommissions)}
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
                      Comissões Pendentes
                    </p>
                    <p className={`text-2xl font-bold text-yellow-600 dark:text-yellow-400`}>
                      {formatCurrency(mockFinancialAgentDashboard.pendingCommissions)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                    <Clock className={`h-6 w-6 ${colors.icons.warning}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Comissões */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Minhas Comissões ({filteredCommissions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCommissions.map((commission) => (
                  <div
                    key={commission.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${colors.iconBg.success}`}>
                        <DollarSign className={`h-5 w-5 ${colors.icons.success}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {commission.propertyTitle}
                        </p>
                        <p className={`text-sm ${colors.text.subtitle}`}>
                          {commission.dealType === 'sale' ? 'Venda' : 'Locação'} • 
                          Taxa: {(commission.commissionRate * 100).toFixed(1)}%
                        </p>
                        <p className={`text-xs ${colors.text.subtitle}`}>
                          Valor do negócio: {formatCurrency(commission.dealValue)} • 
                          Vencimento: {formatDate(commission.dueDate)}
                        </p>
                        {commission.notes && (
                          <p className={`text-xs ${colors.text.subtitle} mt-1`}>
                            Observações: {commission.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-bold text-green-600 dark:text-green-400`}>
                          {formatCurrency(commission.commissionAmount)}
                        </p>
                        <Badge variant={getStatusColor(commission.status) as any}>
                          {getStatusText(commission.status)}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(commission);
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
        </div>
      )}

      {activeTab === 'properties' && (
        <div className="space-y-6">
          {/* Lista de Propriedades */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Minhas Propriedades ({agentProperties.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-medium ${colors.text.title} mb-2`}>
                        {property.title}
                      </h3>
                      <p className={`text-sm ${colors.text.subtitle} mb-2`}>
                        {property.address.neighborhood}, {property.address.city}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          {property.bedrooms}
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          {property.bathrooms}
                        </div>
                        <div className="flex items-center gap-1">
                          <Ruler className="h-4 w-4" />
                          {property.area}m²
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-bold text-green-600 dark:text-green-400`}>
                            {formatCurrency(property.price)}
                          </p>
                          {property.rentPrice && (
                            <p className={`text-sm ${colors.text.subtitle}`}>
                              Aluguel: {formatCurrency(property.rentPrice)}
                            </p>
                          )}
                        </div>
                        <Badge variant="default">
                          {'Disponível'}
                        </Badge>
                      </div>
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
          <div className="space-y-4">
            {'name' in selectedItem && (
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Nome
                </p>
                <p className={colors.text.title}>
                  {selectedItem.name}
                </p>
              </div>
            )}
            
            {'clientName' in selectedItem && (
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Cliente
                </p>
                <p className={colors.text.title}>
                  {selectedItem.clientName}
                </p>
              </div>
            )}
            
            {'propertyTitle' in selectedItem && (
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Propriedade
                </p>
                <p className={colors.text.title}>
                  {selectedItem.propertyTitle}
                </p>
              </div>
            )}
            
            <div>
              <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                Status
              </p>
              <Badge variant={getStatusColor(selectedItem.status) as any}>
                {getStatusText(selectedItem.status)}
              </Badge>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AgentDashboardPage;