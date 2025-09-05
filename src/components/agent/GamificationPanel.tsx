import React from 'react';
import { 
  Trophy, 
  Star, 
  Target, 
  TrendingUp,
  Award,
  Medal,
  Crown,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '../ui';
import { colors } from '../../utils/colors';
import { formatCurrency } from '../../utils';
import type { Achievement, AgentRanking, PersonalGoal } from '../../types';

interface GamificationPanelProps {
  achievements: Achievement[];
  ranking: AgentRanking;
  goals: PersonalGoal[];
  totalPoints: number;
}

export const GamificationPanel: React.FC<GamificationPanelProps> = ({
  achievements,
  ranking,
  goals,
  totalPoints
}) => {
  const getAchievementIcon = (category: string) => {
    switch (category) {
      case 'sales': return <Trophy className="h-5 w-5" />;
      case 'leads': return <Target className="h-5 w-5" />;
      case 'visits': return <TrendingUp className="h-5 w-5" />;
      case 'conversion': return <Award className="h-5 w-5" />;
      case 'special': return <Crown className="h-5 w-5" />;
      default: return <Medal className="h-5 w-5" />;
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
      case 'active': return 'Em Andamento';
      case 'failed': return 'Não Atingida';
      default: return 'Pendente';
    }
  };

  const getGoalTypeText = (type: string) => {
    switch (type) {
      case 'monthly_sales': return 'Vendas Mensais';
      case 'monthly_leads': return 'Leads Mensais';
      case 'conversion_rate': return 'Taxa de Conversão';
      case 'commission_target': return 'Meta de Comissão';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Ranking e Pontos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
              <Trophy className="h-5 w-5 text-yellow-500" />
              Seu Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">
                #{ranking.position}
              </div>
              <p className={`text-lg font-semibold ${colors.text.title}`}>
                {ranking.agentName}
              </p>
              <div className="flex justify-center items-center gap-4 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {ranking.sales}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Vendas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {ranking.conversionRate}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Conversão</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
              <Zap className="h-5 w-5 text-purple-500" />
              Pontos Totais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">
                {totalPoints.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Pontos acumulados
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="primary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {achievements.filter(a => a.unlockedAt).length} Conquistas
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metas Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
            <Target className="h-5 w-5 text-blue-500" />
            Metas Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold ${colors.text.title}`}>
                      {getGoalTypeText(goal.type)}
                    </h4>
                    <Badge variant={getGoalStatusColor(goal.status) as any}>
                      {getGoalStatusText(goal.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
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
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {goal.period}
                      </p>
                      {goal.reward && (
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {goal.reward}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conquistas */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
            <Award className="h-5 w-5 text-orange-500" />
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlockedAt 
                    ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-full ${
                    achievement.unlockedAt 
                      ? 'bg-yellow-100 dark:bg-yellow-800' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {getAchievementIcon(achievement.category)}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      achievement.unlockedAt 
                        ? 'text-yellow-800 dark:text-yellow-200' 
                        : colors.text.title
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {achievement.points} pontos
                    </p>
                  </div>
                </div>
                <p className={`text-sm ${
                  achievement.unlockedAt 
                    ? 'text-yellow-700 dark:text-yellow-300' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {achievement.description}
                </p>
                {achievement.unlockedAt && (
                  <div className="mt-2">
                    <Badge variant="success" className="text-xs">
                      Conquistada em {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
