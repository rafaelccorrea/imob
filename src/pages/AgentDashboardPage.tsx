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
  Ruler,
  BarChart3,
  PieChart,
  Award,
  Trophy,
  Zap
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
  mockProperties,
  mockAchievements,
  mockAgentRankings,
  mockPersonalGoals,
  mockPersonalContacts,
  mockPersonalInteractions
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Modal } from '../components/ui';
import { GamificationPanel, PersonalCRMPanel } from '../components/agent';
import { useAuthStore } from '../stores';

export default function AgentDashboardPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'gamification' | 'crm' | 'properties' | 'leads' | 'commissions'>('overview');

  // Simular dados específicos do agente
  const myProperties = mockProperties.filter(p => p.responsibleAgentId === user?.id);
  const myLeads = mockFinancialLeads.filter(l => l.assignedAgentId === user?.id);
  const myVisits = mockFinancialVisits.filter(v => v.agentId === user?.id);
  const myCommissions = mockFinancialCommissions.filter(c => c.agentId === user?.id);

  // Dados para gamificação
  const myAchievements = mockAchievements.filter(a => a.unlockedAt);
  const myRanking = mockAgentRankings.find(r => r.agentId === user?.id) || mockAgentRankings[0];
  const myGoals = mockPersonalGoals.filter(g => g.agentId === user?.id);
  const myContacts = mockPersonalContacts.filter(c => c.agentId === user?.id);
  const myInteractions = mockPersonalInteractions.filter(i => i.agentId === user?.id);

  // Cálculos de performance
  const totalSales = myLeads.filter(l => l.status === 'converted').length;
  const totalCommissions = myCommissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  const conversionRate = myLeads.length > 0 ? (totalSales / myLeads.length) * 100 : 0;
  const totalPoints = myAchievements.reduce((sum, a) => sum + a.points, 0);

  // Dados para gráficos
  const performanceData = [
    { month: 'Jan', sales: 2, leads: 15 },
    { month: 'Fev', sales: 3, leads: 18 },
    { month: 'Mar', sales: 1, leads: 12 },
    { month: 'Abr', sales: 4, leads: 20 },
    { month: 'Mai', sales: 2, leads: 16 },
    { month: 'Jun', sales: 3, leads: 19 }
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'gamification', label: 'Gamificação', icon: Trophy },
    { id: 'crm', label: 'CRM Pessoal', icon: Users },
    { id: 'properties', label: 'Minhas Propriedades', icon: Building },
    { id: 'leads', label: 'Meus Leads', icon: Target },
    { id: 'commissions', label: 'Comissões', icon: DollarSign }
  ];

  const handleAddContact = (contact: any) => {
    console.log('Adicionar contato:', contact);
  };

  const handleAddInteraction = (interaction: any) => {
    console.log('Adicionar interação:', interaction);
  };

  const handleUpdateContact = (id: string, contact: any) => {
    console.log('Atualizar contato:', id, contact);
  };

  const handleDeleteContact = (id: string) => {
    console.log('Deletar contato:', id);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Meu Dashboard
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Bem-vindo de volta, {user?.name}! Aqui está seu resumo pessoal.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Lead
          </Button>
          <Button className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Agendar Visita
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Minhas Vendas
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {totalSales}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400 flex items-center mt-1`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% este mês
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <Target className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Comissões
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {formatCurrency(totalCommissions)}
                </p>
                <p className={`text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1`}>
                  <DollarSign className="h-3 w-3 mr-1" />
                  {myCommissions.filter(c => c.status === 'pending').length} pendentes
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
                  Taxa de Conversão
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {conversionRate.toFixed(1)}%
                </p>
                <p className={`text-xs text-purple-600 dark:text-purple-400 flex items-center mt-1`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Meta: 15%
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <TrendingUp className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Meu Ranking
                </p>
                <p className={`text-2xl font-bold text-yellow-600 dark:text-yellow-400`}>
                  #{myRanking.position}
                </p>
                <p className={`text-xs text-yellow-600 dark:text-yellow-400 flex items-center mt-1`}>
                  <Trophy className="h-3 w-3 mr-1" />
                  {totalPoints} pontos
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <Trophy className={`h-6 w-6 ${colors.icons.warning}`} />
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

      {/* Conteúdo das Tabs */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Gráfico de Performance */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Performance dos Últimos 6 Meses
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
                    dataKey="sales" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Vendas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Leads"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Próximas Visitas */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Próximas Visitas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myVisits.slice(0, 5).map((visit) => (
                  <div key={visit.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {visit.propertyTitle}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {visit.clientName} • {formatDate(visit.scheduledDate)}
                        </p>
                        <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                          {visit.type} • {visit.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'gamification' && (
        <GamificationPanel
          achievements={myAchievements}
          ranking={myRanking}
          goals={myGoals}
          totalPoints={totalPoints}
        />
      )}

      {activeTab === 'crm' && (
        <PersonalCRMPanel
          contacts={myContacts}
          interactions={myInteractions}
          onAddContact={handleAddContact}
          onAddInteraction={handleAddInteraction}
          onUpdateContact={handleUpdateContact}
          onDeleteContact={handleDeleteContact}
        />
      )}

      {activeTab === 'properties' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Minhas Propriedades ({myProperties.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myProperties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                        <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {property.title}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {property.address} • {property.type}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Bed className="h-3 w-3" />
                            {property.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="h-3 w-3" />
                            {property.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Ruler className="h-3 w-3" />
                            {property.area}m²
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(property.price)}
                        </p>
                        <Badge variant={property.status === 'available' ? 'success' : 'secondary'}>
                          {property.status === 'available' ? 'Disponível' : 'Vendido'}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
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

      {activeTab === 'leads' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Meus Leads ({myLeads.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {lead.name}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {lead.email} • {lead.phone}
                        </p>
                        <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                          Fonte: {lead.source} • Status: {lead.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(lead.createdAt)}
                        </p>
                        <Badge variant={lead.status === 'converted' ? 'success' : lead.status === 'qualified' ? 'primary' : 'secondary'}>
                          {lead.status === 'converted' ? 'Convertido' : 
                           lead.status === 'qualified' ? 'Qualificado' : 'Novo'}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
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
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Minhas Comissões ({myCommissions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myCommissions.map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {commission.propertyTitle}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                          {commission.dealType} • {formatDate(commission.saleDate)}
                        </p>
                        <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                          Taxa: {commission.commissionRate}% • Valor: {formatCurrency(commission.dealValue)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(commission.commissionAmount)}
                        </p>
                        <Badge variant={commission.status === 'paid' ? 'success' : 'warning'}>
                          {commission.status === 'paid' ? 'Paga' : 'Pendente'}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
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
    </div>
  );
}