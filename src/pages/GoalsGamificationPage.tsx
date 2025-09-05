import React, { useState } from 'react';
import { 
  Target, 
  Trophy, 
  Award, 
  Star, 
  Zap, 
  Crown,
  Medal,
  Flame,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  Gift,
  Users,
  Building,
  DollarSign
} from 'lucide-react';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, Progress } from '../components/ui';

interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'sales' | 'visits' | 'leads' | 'commission' | 'conversion';
  target: number;
  current: number;
  deadline: string;
  status: 'active' | 'completed' | 'expired';
  reward: {
    points: number;
    badge?: string;
    bonus?: number;
  };
  category: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

interface AgentStats {
  level: number;
  experience: number;
  experienceToNext: number;
  totalPoints: number;
  rank: number;
  streak: number;
  achievements: number;
  goalsCompleted: number;
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Meta de Vendas Mensal',
    description: 'Feche 3 negócios este mês',
    type: 'sales',
    target: 3,
    current: 2,
    deadline: '2024-02-29',
    status: 'active',
    reward: { points: 500, badge: 'Vendedor do Mês', bonus: 0.1 },
    category: 'monthly'
  },
  {
    id: '2',
    title: 'Meta de Visitas',
    description: 'Realize 10 visitas esta semana',
    type: 'visits',
    target: 10,
    current: 7,
    deadline: '2024-02-18',
    status: 'active',
    reward: { points: 200, badge: 'Visitador Incansável' },
    category: 'weekly'
  },
  {
    id: '3',
    title: 'Meta de Comissão',
    description: 'Ganhe R$ 50.000 em comissões',
    type: 'commission',
    target: 50000,
    current: 35000,
    deadline: '2024-03-31',
    status: 'active',
    reward: { points: 1000, badge: 'Comissão de Ouro', bonus: 0.15 },
    category: 'quarterly'
  },
  {
    id: '4',
    title: 'Meta Diária de Leads',
    description: 'Capture 5 novos leads hoje',
    type: 'leads',
    target: 5,
    current: 3,
    deadline: '2024-02-15',
    status: 'active',
    reward: { points: 100, badge: 'Caçador de Leads' },
    category: 'daily'
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Primeiro Negócio',
    description: 'Feche seu primeiro negócio',
    icon: Star,
    unlocked: true,
    unlockedAt: '2024-01-15',
    rarity: 'common',
    points: 100
  },
  {
    id: '2',
    title: 'Vendedor de Elite',
    description: 'Feche 10 negócios em um mês',
    icon: Crown,
    unlocked: false,
    rarity: 'legendary',
    points: 1000
  },
  {
    id: '3',
    title: 'Visitador Incansável',
    description: 'Realize 50 visitas em um mês',
    icon: Building,
    unlocked: true,
    unlockedAt: '2024-01-30',
    rarity: 'rare',
    points: 500
  },
  {
    id: '4',
    title: 'Mestre das Comissões',
    description: 'Ganhe R$ 100.000 em comissões',
    icon: DollarSign,
    unlocked: false,
    rarity: 'epic',
    points: 2000
  },
  {
    id: '5',
    title: 'Sequência de Sucesso',
    description: 'Mantenha uma sequência de 7 dias com negócios',
    icon: Flame,
    unlocked: false,
    rarity: 'rare',
    points: 750
  }
];

const mockStats: AgentStats = {
  level: 12,
  experience: 2450,
  experienceToNext: 500,
  totalPoints: 8750,
  rank: 3,
  streak: 5,
  achievements: 2,
  goalsCompleted: 8
};

export const GoalsGamificationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'goals' | 'achievements' | 'ranking' | 'rewards'>('goals');
  const [showModal, setShowModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  // Função para obter a cor da raridade
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
      case 'rare': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'epic': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'legendary': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  // Função para obter a cor do tipo de meta
  const getGoalTypeColor = (type: string) => {
    switch (type) {
      case 'sales': return colors.iconBg.success;
      case 'visits': return colors.iconBg.warning;
      case 'leads': return colors.iconBg.primary;
      case 'commission': return colors.iconBg.money;
      case 'conversion': return colors.iconBg.info;
      default: return colors.iconBg.secondary;
    }
  };

  // Função para obter o ícone do tipo de meta
  const getGoalTypeIcon = (type: string) => {
    switch (type) {
      case 'sales': return Trophy;
      case 'visits': return Building;
      case 'leads': return Users;
      case 'commission': return DollarSign;
      case 'conversion': return TrendingUp;
      default: return Target;
    }
  };

  // Calcular progresso da meta
  const getGoalProgress = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  // Verificar se a meta está próxima do prazo
  const isGoalNearDeadline = (goal: Goal) => {
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  const tabs = [
    { id: 'goals', label: 'Minhas Metas', icon: Target },
    { id: 'achievements', label: 'Conquistas', icon: Award },
    { id: 'ranking', label: 'Ranking', icon: Trophy },
    { id: 'rewards', label: 'Recompensas', icon: Gift }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${colors.text.title}`}>
            Metas & Gamificação
          </h1>
          <p className={`text-sm ${colors.text.subtitle}`}>
            Alcance suas metas e desbloqueie conquistas incríveis!
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendário
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Meta
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Nível Atual
                </p>
                <p className={`text-2xl font-bold ${colors.text.title}`}>
                  {mockStats.level}
                </p>
                <p className={`text-xs ${colors.text.subtitle}`}>
                  {mockStats.experience}/{mockStats.experience + mockStats.experienceToNext} XP
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.primary}`}>
                <Star className={`h-6 w-6 ${colors.icons.primary}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Pontos Totais
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {mockStats.totalPoints.toLocaleString()}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400`}>
                  +250 esta semana
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <Zap className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Ranking
                </p>
                <p className={`text-2xl font-bold ${colors.text.title}`}>
                  #{mockStats.rank}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400`}>
                  Top 10 da equipe
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <Trophy className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Sequência
                </p>
                <p className={`text-2xl font-bold text-yellow-600 dark:text-yellow-400`}>
                  {mockStats.streak} dias
                </p>
                <p className={`text-xs text-yellow-600 dark:text-yellow-400`}>
                  Mantenha o fogo!
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <Flame className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className={`font-medium ${colors.text.title}`}>
                Progresso para o Próximo Nível
              </p>
              <p className={`text-sm ${colors.text.subtitle}`}>
                Nível {mockStats.level} → Nível {mockStats.level + 1}
              </p>
            </div>
            <div className="text-right">
              <p className={`font-bold text-green-600 dark:text-green-400`}>
                {mockStats.experience}/{mockStats.experience + mockStats.experienceToNext}
              </p>
              <p className={`text-sm ${colors.text.subtitle}`}>XP</p>
            </div>
          </div>
          <Progress 
            value={(mockStats.experience / (mockStats.experience + mockStats.experienceToNext)) * 100} 
            className="h-3"
          />
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
      {activeTab === 'goals' && (
        <div className="space-y-6">
          {/* Metas Ativas */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Metas Ativas ({mockGoals.filter(g => g.status === 'active').length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockGoals.filter(g => g.status === 'active').map((goal) => {
                  const TypeIcon = getGoalTypeIcon(goal.type);
                  const progress = getGoalProgress(goal);
                  const isNearDeadline = isGoalNearDeadline(goal);
                  
                  return (
                    <div
                      key={goal.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${getGoalTypeColor(goal.type)}`}>
                            <TypeIcon className={`h-5 w-5 ${colors.icons[goal.type === 'sales' ? 'success' : goal.type === 'visits' ? 'warning' : goal.type === 'leads' ? 'primary' : goal.type === 'commission' ? 'money' : 'info']}`} />
                          </div>
                          <div>
                            <p className={`font-medium ${colors.text.title}`}>
                              {goal.title}
                            </p>
                            <p className={`text-sm ${colors.text.subtitle}`}>
                              {goal.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={goal.category === 'daily' ? 'destructive' : goal.category === 'weekly' ? 'warning' : 'default'}>
                            {goal.category === 'daily' ? 'Diária' : goal.category === 'weekly' ? 'Semanal' : goal.category === 'monthly' ? 'Mensal' : 'Trimestral'}
                          </Badge>
                          {isNearDeadline && (
                            <Badge variant="destructive">
                              <Clock className="h-3 w-3 mr-1" />
                              Urgente
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className={colors.text.subtitle}>
                            Progresso: {goal.current}/{goal.target}
                          </span>
                          <span className={colors.text.title}>
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-xs">
                          <span className={colors.text.subtitle}>
                            Prazo: {formatDate(goal.deadline)}
                          </span>
                          <span className="text-green-600 dark:text-green-400">
                            +{goal.reward.points} pontos
                          </span>
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

      {activeTab === 'achievements' && (
        <div className="space-y-6">
          {/* Conquistas Desbloqueadas */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Conquistas Desbloqueadas ({mockAchievements.filter(a => a.unlocked).length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAchievements.filter(a => a.unlocked).map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-full ${colors.iconBg.success}`}>
                          <Icon className={`h-5 w-5 ${colors.icons.success}`} />
                        </div>
                        <div>
                          <p className={`font-medium ${colors.text.title}`}>
                            {achievement.title}
                          </p>
                          <Badge variant="success" className="text-xs">
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                      <p className={`text-sm ${colors.text.subtitle} mb-2`}>
                        {achievement.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm text-green-600 dark:text-green-400`}>
                          +{achievement.points} pontos
                        </span>
                        <span className={`text-xs ${colors.text.subtitle}`}>
                          {achievement.unlockedAt && formatDate(achievement.unlockedAt)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Conquistas Bloqueadas */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Conquistas Bloqueadas ({mockAchievements.filter(a => !a.unlocked).length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAchievements.filter(a => !a.unlocked).map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg opacity-60"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                          <Icon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className={`font-medium ${colors.text.title}`}>
                            {achievement.title}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                      <p className={`text-sm ${colors.text.subtitle} mb-2`}>
                        {achievement.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm text-green-600 dark:text-green-400`}>
                          +{achievement.points} pontos
                        </span>
                        <span className={`text-xs ${colors.text.subtitle}`}>
                          Bloqueada
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'ranking' && (
        <div className="space-y-6">
          {/* Ranking da Equipe */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Ranking da Equipe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Carlos Oliveira', points: 12500, deals: 8, level: 15 },
                  { name: 'Maria Santos', points: 11200, deals: 7, level: 14 },
                  { name: 'Pedro Lima', points: 8750, deals: 5, level: 12 },
                  { name: 'Ana Costa', points: 7200, deals: 4, level: 11 },
                  { name: 'João Silva', points: 6800, deals: 3, level: 10 }
                ].map((agent, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index === 2 ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800' : 'border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-gray-100 text-gray-600' :
                        index === 2 ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {index === 0 ? <Crown className="h-4 w-4" /> :
                         index === 1 ? <Medal className="h-4 w-4" /> :
                         index === 2 ? <Award className="h-4 w-4" /> :
                         <span className="text-sm font-bold">{index + 1}</span>}
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {agent.name} {index === 2 && '(Você)'}
                        </p>
                        <p className={`text-sm ${colors.text.subtitle}`}>
                          Nível {agent.level} • {agent.deals} negócios
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-green-600 dark:text-green-400`}>
                        {agent.points.toLocaleString()} pts
                      </p>
                      <p className={`text-xs ${colors.text.subtitle}`}>
                        {index === 0 ? '🥇 Líder' : index === 1 ? '🥈 Vice' : index === 2 ? '🥉 Terceiro' : `#${index + 1}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="space-y-6">
          {/* Recompensas Disponíveis */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Recompensas Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Bônus de Comissão', description: '5% extra na próxima comissão', cost: 1000, icon: DollarSign },
                  { title: 'Dia de Folga', description: 'Um dia de folga remunerado', cost: 2500, icon: Calendar },
                  { title: 'Curso Premium', description: 'Acesso a curso de vendas avançado', cost: 1500, icon: Award },
                  { title: 'Equipamento', description: 'Tablet profissional para visitas', cost: 5000, icon: Building },
                  { title: 'Viagem', description: 'Viagem para conferência imobiliária', cost: 10000, icon: Trophy },
                  { title: 'Mentoria', description: '1h de mentoria com especialista', cost: 800, icon: Users }
                ].map((reward, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-full ${colors.iconBg.primary}`}>
                        <reward.icon className={`h-5 w-5 ${colors.icons.primary}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {reward.title}
                        </p>
                        <p className={`text-sm ${colors.text.subtitle}`}>
                          {reward.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`font-bold text-green-600 dark:text-green-400`}>
                        {reward.cost.toLocaleString()} pts
                      </span>
                      <Button 
                        size="sm" 
                        disabled={mockStats.totalPoints < reward.cost}
                        className="flex items-center gap-1"
                      >
                        <Gift className="h-3 w-3" />
                        Resgatar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Detalhes da Meta */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detalhes da Meta"
      >
        {selectedGoal && (
          <div className="space-y-4">
            <div>
              <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                Título
              </p>
              <p className={colors.text.title}>
                {selectedGoal.title}
              </p>
            </div>
            
            <div>
              <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                Descrição
              </p>
              <p className={colors.text.title}>
                {selectedGoal.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Progresso
                </p>
                <p className={colors.text.title}>
                  {selectedGoal.current}/{selectedGoal.target}
                </p>
              </div>
              <div>
                <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                  Prazo
                </p>
                <p className={colors.text.title}>
                  {formatDate(selectedGoal.deadline)}
                </p>
              </div>
            </div>
            
            <div>
              <p className={`text-sm font-medium ${colors.text.subtitle}`}>
                Recompensa
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="success">
                  +{selectedGoal.reward.points} pontos
                </Badge>
                {selectedGoal.reward.badge && (
                  <Badge variant="primary">
                    {selectedGoal.reward.badge}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
