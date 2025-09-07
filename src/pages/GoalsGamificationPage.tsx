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
      default: return colors.iconBg.primary;
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text.title} truncate`}>
            Metas & Gamificação
          </h1>
          <p className={`text-xs sm:text-sm ${colors.text.subtitle}`}>
            Alcance suas metas e desbloqueie conquistas incríveis!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline text-gray-900 dark:text-gray-100">Calendário</span>
            <span className="sm:hidden text-gray-900 dark:text-gray-100">Cal.</span>
          </Button>
          <Button className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline text-gray-900 dark:text-gray-100">Nova Meta</span>
            <span className="sm:hidden text-gray-900 dark:text-gray-100">Nova</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle} truncate`}>
                  Nível Atual
                </p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.text.title}`}>
                  {mockStats.level}
                </p>
                <p className={`text-xs ${colors.text.subtitle}`}>
                  {mockStats.experience}/{mockStats.experience + mockStats.experienceToNext} XP
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.primary} flex-shrink-0`}>
                <Star className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.primary}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle} truncate`}>
                  Pontos Totais
                </p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {mockStats.totalPoints.toLocaleString()}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400`}>
                  +250 esta semana
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.money} flex-shrink-0`}>
                <Zap className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle} truncate`}>
                  Ranking
                </p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.text.title}`}>
                  #{mockStats.rank}
                </p>
                <p className={`text-xs text-green-600 dark:text-green-400`}>
                  Top 10 da equipe
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.success} flex-shrink-0`}>
                <Trophy className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle} truncate`}>
                  Sequência
                </p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold text-yellow-600 dark:text-yellow-400`}>
                  {mockStats.streak} dias
                </p>
                <p className={`text-xs text-yellow-600 dark:text-yellow-400`}>
                  Mantenha o fogo!
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${colors.iconBg.warning} flex-shrink-0`}>
                <Flame className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="min-w-0 flex-1">
              <p className={`font-medium ${colors.text.title} text-sm sm:text-base`}>
                Progresso para o Próximo Nível
              </p>
              <p className={`text-xs sm:text-sm ${colors.text.subtitle}`}>
                Nível {mockStats.level} → Nível {mockStats.level + 1}
              </p>
            </div>
            <div className="text-right sm:text-right">
              <p className={`font-bold text-green-600 dark:text-green-400 text-sm sm:text-base`}>
                {mockStats.experience}/{mockStats.experience + mockStats.experienceToNext}
              </p>
              <p className={`text-xs sm:text-sm ${colors.text.subtitle}`}>XP</p>
            </div>
          </div>
          <Progress 
            value={(mockStats.experience / (mockStats.experience + mockStats.experienceToNext)) * 100} 
            className="h-2 sm:h-3"
          />
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex flex-wrap gap-2 sm:gap-4 md:gap-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1 sm:gap-2 py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.id === 'goals' ? 'Metas' :
                   tab.id === 'achievements' ? 'Conq.' :
                   tab.id === 'ranking' ? 'Rank' :
                   'Recomp.'}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'goals' && (
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Metas Ativas */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className={`${colors.text.title} text-sm sm:text-base`}>
                Metas Ativas ({mockGoals.filter(g => g.status === 'active').length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {mockGoals.filter(g => g.status === 'active').map((goal) => {
                  const TypeIcon = getGoalTypeIcon(goal.type);
                  const progress = getGoalProgress(goal);
                  const isNearDeadline = isGoalNearDeadline(goal);
                  
                  return (
                    <div
                      key={goal.id}
                      className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div className={`p-2 rounded-full ${getGoalTypeColor(goal.type)} flex-shrink-0`}>
                            <TypeIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icons[goal.type === 'sales' ? 'success' : goal.type === 'visits' ? 'warning' : goal.type === 'leads' ? 'primary' : goal.type === 'commission' ? 'money' : 'info']}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`font-medium ${colors.text.title} text-sm sm:text-base truncate`}>
                              {goal.title}
                            </p>
                            <p className={`text-xs sm:text-sm ${colors.text.subtitle} truncate`}>
                              {goal.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                          <Badge variant={goal.category === 'daily' ? 'destructive' : goal.category === 'weekly' ? 'warning' : 'default'} className="text-xs">
                            {goal.category === 'daily' ? 'Diária' : goal.category === 'weekly' ? 'Semanal' : goal.category === 'monthly' ? 'Mensal' : 'Trimestral'}
                          </Badge>
                          {isNearDeadline && (
                            <Badge variant="destructive" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              <span className="hidden sm:inline">Urgente</span>
                              <span className="sm:hidden">Urg.</span>
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className={colors.text.subtitle}>
                            Progresso: {goal.current}/{goal.target}
                          </span>
                          <span className={colors.text.title}>
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs">
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
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Conquistas Desbloqueadas */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className={`${colors.text.title} text-sm sm:text-base`}>
                Conquistas Desbloqueadas ({mockAchievements.filter(a => a.unlocked).length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {mockAchievements.filter(a => a.unlocked).map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className={`p-2 rounded-full ${colors.iconBg.success} flex-shrink-0`}>
                          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icons.success}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`font-medium ${colors.text.title} text-sm sm:text-base truncate`}>
                            {achievement.title}
                          </p>
                          <Badge variant="success" className="text-xs">
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                      <p className={`text-xs sm:text-sm ${colors.text.subtitle} mb-2`}>
                        {achievement.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className={`text-xs sm:text-sm text-green-600 dark:text-green-400`}>
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
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className={`${colors.text.title} text-sm sm:text-base`}>
                Conquistas Bloqueadas ({mockAchievements.filter(a => !a.unlocked).length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {mockAchievements.filter(a => !a.unlocked).map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg opacity-60"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`font-medium ${colors.text.title} text-sm sm:text-base truncate`}>
                            {achievement.title}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                      <p className={`text-xs sm:text-sm ${colors.text.subtitle} mb-2`}>
                        {achievement.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className={`text-xs sm:text-sm text-green-600 dark:text-green-400`}>
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
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Ranking da Equipe */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className={`${colors.text.title} text-sm sm:text-base`}>
                Ranking da Equipe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { name: 'Carlos Oliveira', points: 12500, deals: 8, level: 15 },
                  { name: 'Maria Santos', points: 11200, deals: 7, level: 14 },
                  { name: 'Pedro Lima', points: 8750, deals: 5, level: 12 },
                  { name: 'Ana Costa', points: 7200, deals: 4, level: 11 },
                  { name: 'João Silva', points: 6800, deals: 3, level: 10 }
                ].map((agent, index) => (
                  <div
                    key={index}
                    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg gap-3 sm:gap-4 ${
                      index === 2 ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800' : 'border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
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
                      <div className="min-w-0 flex-1">
                        <p className={`font-medium ${colors.text.title} text-sm sm:text-base truncate`}>
                          {agent.name} {index === 2 && '(Você)'}
                        </p>
                        <p className={`text-xs sm:text-sm ${colors.text.subtitle}`}>
                          Nível {agent.level} • {agent.deals} negócios
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className={`font-bold text-green-600 dark:text-green-400 text-sm sm:text-base`}>
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
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Recompensas Disponíveis */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className={`${colors.text.title} text-sm sm:text-base`}>
                Recompensas Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
                    className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className={`p-2 rounded-full ${colors.iconBg.primary} flex-shrink-0`}>
                        <reward.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icons.primary}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-medium ${colors.text.title} text-sm sm:text-base truncate`}>
                          {reward.title}
                        </p>
                        <p className={`text-xs sm:text-sm ${colors.text.subtitle} truncate`}>
                          {reward.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                      <span className={`font-bold text-green-600 dark:text-green-400 text-sm sm:text-base`}>
                        {reward.cost.toLocaleString()} pts
                      </span>
                      <Button 
                        size="sm" 
                        disabled={mockStats.totalPoints < reward.cost}
                        className="flex items-center justify-center gap-1 text-xs sm:text-sm w-full sm:w-auto"
                      >
                        <Gift className="h-3 w-3" />
                        <span className="text-gray-900 dark:text-gray-100">Resgatar</span>
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
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-3 sm:space-y-4">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                  Título
                </p>
                <p className={`${colors.text.title} text-sm sm:text-base`}>
                  {selectedGoal.title}
                </p>
              </div>
              
              <div>
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                  Descrição
                </p>
                <p className={`${colors.text.title} text-sm sm:text-base`}>
                  {selectedGoal.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                    Progresso
                  </p>
                  <p className={`${colors.text.title} text-sm sm:text-base`}>
                    {selectedGoal.current}/{selectedGoal.target}
                  </p>
                </div>
                <div>
                  <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                    Prazo
                  </p>
                  <p className={`${colors.text.title} text-sm sm:text-base`}>
                    {formatDate(selectedGoal.deadline)}
                  </p>
                </div>
              </div>
              
              <div>
                <p className={`text-xs sm:text-sm font-medium ${colors.text.subtitle}`}>
                  Recompensa
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success" className="text-xs">
                    +{selectedGoal.reward.points} pontos
                  </Badge>
                  {selectedGoal.reward.badge && (
                    <Badge variant="primary" className="text-xs">
                      {selectedGoal.reward.badge}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
