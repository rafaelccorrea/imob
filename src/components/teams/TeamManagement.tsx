import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Plus, 
  Edit, 
  Eye, 
  Settings, 
  UserPlus,
  Target,
  TrendingUp,
  Award,
  Crown,
  Star,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Copy,
  Share,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserCheck,
  UserX,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Modal } from '../ui';
import { colors } from '../../utils/colors';
import { formatCurrency, formatDate } from '../../utils';
import { 
  mockTeams,
  mockTeamAssignments,
  mockTeamPerformanceMetrics,
  mockUsers
} from '../../utils/mockData';
import type { Team, TeamAgent, TeamGoal, TeamPerformanceMetrics } from '../../types';

interface TeamManagementProps {
  managerId: string;
}

export const TeamManagement: React.FC<TeamManagementProps> = ({ managerId }) => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'teams' | 'assignments' | 'performance'>('overview');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showAssignAgentModal, setShowAssignAgentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeamForAssignment, setSelectedTeamForAssignment] = useState<string>('');

  // Detectar mudanças na URL para atualizar a aba ativa
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'teams', 'assignments', 'performance'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  // Filtrar equipes do gestor
  const managerTeams = mockTeams.filter(team => team.managerId === managerId);
  const availableAgents = mockUsers.filter(user => user.role === 'agent' && user.isActive);

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'teams', label: 'Minhas Equipes', icon: Users },
    { id: 'assignments', label: 'Atribuições', icon: UserCheck },
    { id: 'performance', label: 'Performance', icon: TrendingUp }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'leader': return 'primary';
      case 'member': return 'success';
      case 'trainee': return 'warning';
      default: return 'secondary';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'leader': return 'Líder';
      case 'member': return 'Membro';
      case 'trainee': return 'Estagiário';
      default: return role;
    }
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'active': return 'primary';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getGoalStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluída';
      case 'active': return 'Ativa';
      case 'failed': return 'Não Atingida';
      default: return status;
    }
  };

  const getGoalTypeText = (type: string) => {
    switch (type) {
      case 'monthly_sales': return 'Vendas Mensais';
      case 'monthly_leads': return 'Leads Mensais';
      case 'conversion_rate': return 'Taxa de Conversão';
      case 'revenue': return 'Receita';
      default: return type;
    }
  };

  const handleCreateTeam = () => {
    // Lógica para criar nova equipe
    console.log('Criar nova equipe');
    setShowCreateTeamModal(false);
  };

  const handleAssignAgent = () => {
    // Lógica para atribuir agente
    console.log('Atribuir agente');
    setShowAssignAgentModal(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Gestão de Equipes
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Gerencie suas equipes e acompanhe a performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Relatório
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowCreateTeamModal(true)}
          >
            <Plus className="h-4 w-4" />
            Nova Equipe
          </Button>
        </div>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Total de Equipes
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {managerTeams.length}
                </p>
                <p className={`text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1`}>
                  <Users className="h-3 w-3 mr-1" />
                  {managerTeams.reduce((sum, team) => sum + team.agents.length, 0)} corretores
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
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Vendas Totais
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {mockTeamPerformanceMetrics.reduce((sum, team) => sum + team.totalSales, 0)}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400 flex items-center mt-1`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% este mês
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
                  Conversão Média
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {(mockTeamPerformanceMetrics.reduce((sum, team) => sum + team.averageConversion, 0) / mockTeamPerformanceMetrics.length).toFixed(1)}%
                </p>
                <p className={`text-xs text-purple-600 dark:text-purple-400 flex items-center mt-1`}>
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Meta: 15%
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <BarChart3 className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Comissões Totais
                </p>
                <p className={`text-2xl font-bold text-orange-600 dark:text-orange-400`}>
                  {formatCurrency(mockTeamPerformanceMetrics.reduce((sum, team) => sum + team.totalCommission, 0))}
                </p>
                <p className={`text-xs text-orange-600 dark:text-orange-400 flex items-center mt-1`}>
                  <Award className="h-3 w-3 mr-1" />
                  Este mês
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <Award className={`h-6 w-6 ${colors.icons.warning}`} />
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
          {/* Ranking das Equipes */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Crown className="h-5 w-5 text-yellow-500" />
                Ranking das Equipes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeamPerformanceMetrics.map((team, index) => (
                  <div key={team.teamId} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                        {index === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
                        {index === 1 && <Star className="h-5 w-5 text-gray-400" />}
                        {index === 2 && <Award className="h-5 w-5 text-orange-500" />}
                        {index > 2 && <span className="text-sm font-bold text-gray-600 dark:text-gray-300">#{index + 1}</span>}
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {team.teamName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {team.agentsCount} corretores • {team.totalSales} vendas • {team.averageConversion.toFixed(1)}% conversão
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(team.totalCommission)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Comissões
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metas das Equipes */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Target className="h-5 w-5 text-green-500" />
                Metas das Equipes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {managerTeams.map((team) => (
                  <div key={team.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: team.color }}
                      />
                      <h3 className={`font-semibold ${colors.text.title}`}>
                        {team.name}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {team.goals.map((goal) => (
                        <div key={goal.id}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {getGoalTypeText(goal.type)}
                            </span>
                            <Badge variant={getGoalStatusColor(goal.status) as any}>
                              {getGoalStatusText(goal.status)}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                            <span>{goal.current}</span>
                            <span>{goal.target}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                goal.status === 'completed' ? 'bg-green-500' :
                                goal.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'
                              }`}
                              style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                            />
                          </div>
                          {goal.reward && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                              Recompensa: {goal.reward}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Minhas Equipes ({managerTeams.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {managerTeams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: team.color }}
                      >
                        {team.name.charAt(0)}
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {team.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {team.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {team.agents.length} corretores
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Criada em {formatDate(team.createdAt)}
                          </span>
                          <Badge variant={team.isActive ? 'success' : 'secondary'}>
                            {team.isActive ? 'Ativa' : 'Inativa'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedTeam(team);
                          setSelectedTeamForAssignment(team.id);
                          setShowAssignAgentModal(true);
                        }}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Atribuições de Corretores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeamAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {assignment.agentName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {assignment.teamName}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Atribuído em {formatDate(assignment.assignedAt)}
                          </span>
                          {assignment.notes && (
                            <span>{assignment.notes}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={assignment.status === 'active' ? 'success' : 'secondary'}>
                        {assignment.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <UserX className="h-4 w-4" />
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

      {activeTab === 'performance' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <TrendingUp className="h-5 w-5 text-green-500" />
                Performance por Equipe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockTeamPerformanceMetrics.map((team) => (
                  <div key={team.teamId} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: mockTeams.find(t => t.id === team.teamId)?.color }}
                      />
                      <h3 className={`font-semibold ${colors.text.title}`}>
                        {team.teamName}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {team.totalSales}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Vendas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {team.totalLeads}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Leads</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {team.averageConversion.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Conversão</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {formatCurrency(team.totalCommission)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Comissões</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className={`font-medium ${colors.text.title}`}>
                        Top Performers
                      </h4>
                      {team.topPerformers.slice(0, 2).map((agent, index) => (
                        <div key={agent.agentId} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">
                            {index + 1}. {agent.agentName}
                          </span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {agent.performance.sales} vendas
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Criar Equipe */}
      <Modal
        isOpen={showCreateTeamModal}
        onClose={() => setShowCreateTeamModal(false)}
        title="Nova Equipe"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome da Equipe
            </label>
            <Input placeholder="Ex: Equipe Alpha" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              placeholder="Descreva o foco da equipe..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cor da Equipe
            </label>
            <input type="color" className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md" defaultValue="#3b82f6" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCreateTeamModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateTeam}>
              Criar Equipe
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de Atribuir Agente */}
      <Modal
        isOpen={showAssignAgentModal}
        onClose={() => setShowAssignAgentModal(false)}
        title="Atribuir Corretor"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Equipe
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {managerTeams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Corretor
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {availableAgents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Função na Equipe
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option value="member">Membro</option>
              <option value="leader">Líder</option>
              <option value="trainee">Estagiário</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Observações
            </label>
            <textarea
              placeholder="Observações sobre a atribuição..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAssignAgentModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAssignAgent}>
              Atribuir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
