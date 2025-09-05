import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Star,
  TrendingUp,
  TrendingDown,
  Award,
  Users,
  Calendar,
  Download,
  CheckCircle,
  Clock
} from 'lucide-react';
import { 
  mockPerformanceReviews,
  mockEmployees
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import type { PerformanceReview, Employee } from '../types';
import { usePermissions } from '../hooks/usePermissions';

export const PerformancePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
  const { hasPermission } = usePermissions();

  // Filtros para avaliações
  const filteredReviews = mockPerformanceReviews.filter(review => {
    const employee = mockEmployees.find(e => e.id === review.employeeId);
    const matchesSearch = employee?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.goals.some(goal => goal.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesEmployee = !selectedEmployee || review.employeeId === selectedEmployee;
    const matchesPeriod = !selectedPeriod || review.period === selectedPeriod;
    
    return matchesSearch && matchesEmployee && matchesPeriod;
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'success';
    if (rating >= 3) return 'warning';
    return 'danger';
  };

  const getRatingText = (rating: number) => {
    if (rating >= 4) return 'Excelente';
    if (rating >= 3) return 'Bom';
    if (rating >= 2) return 'Regular';
    return 'Precisa Melhorar';
  };

  const openReviewModal = (review: PerformanceReview) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  // Calcular métricas
  const averageRating = mockPerformanceReviews.reduce((sum, r) => sum + r.overallScore, 0) / mockPerformanceReviews.length;
  const completedReviews = mockPerformanceReviews.filter(r => r.status === 'approved').length;
  const pendingReviews = mockPerformanceReviews.filter(r => r.status === 'draft').length;
  const totalGoals = mockPerformanceReviews.reduce((sum, r) => sum + r.goals.length, 0);

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Avaliação de Performance
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Gestão de metas, KPIs e avaliações de colaboradores
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
              Nova Avaliação
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
                  Avaliações Concluídas
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {completedReviews}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockPerformanceReviews.length} total
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
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Avaliações Pendentes
                </p>
                <p className={`text-2xl font-bold text-yellow-600 dark:text-yellow-400`}>
                  {pendingReviews}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Aguardando feedback
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
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Nota Média Geral
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {averageRating.toFixed(1)}/5
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {getRatingText(averageRating)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <Star className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Total de Metas
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {totalGoals}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockPerformanceReviews.length} colaboradores
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <Target className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por colaborador ou meta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os colaboradores</option>
              {mockEmployees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os períodos</option>
              <option value="Q1 2024">Q1 2024</option>
              <option value="Q2 2024">Q2 2024</option>
              <option value="Q3 2024">Q3 2024</option>
              <option value="Q4 2024">Q4 2024</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Avaliações */}
      <Card>
        <CardHeader>
          <CardTitle className={colors.text.title}>
            Avaliações de Performance ({filteredReviews.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReviews.map((review) => {
              const employee = mockEmployees.find(e => e.id === review.employeeId);
              return (
                <div
                  key={review.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${colors.iconBg.money}`}>
                      <Target className={`h-5 w-5 ${colors.icons.money}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${colors.text.title}`}>
                        {employee?.name}
                      </p>
                      <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                        {review.period} • {employee?.position || 'N/A'}
                      </p>
                      <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                        {review.goals.length} metas • {review.competencies.length} competências
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className={`font-bold text-lg ${colors.text.title}`}>
                          {review.overallScore}/5
                        </span>
                      </div>
                      <Badge variant={getRatingColor(review.overallScore) as any}>
                        {getRatingText(review.overallScore)}
                      </Badge>
                      <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1`}>
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReviewModal(review)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Avaliação de Performance: ${selectedReview ? mockEmployees.find(e => e.id === selectedReview.employeeId)?.name : ''}`}
      >
        {selectedReview && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações da Avaliação</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Colaborador:</strong> {mockEmployees.find(e => e.id === selectedReview.employeeId)?.name}</p>
                  <p><strong>Período:</strong> {selectedReview.period}</p>
                  <p><strong>Cargo:</strong> {mockEmployees.find(e => e.id === selectedReview.employeeId)?.position || 'N/A'}</p>
                  <p><strong>Data da Avaliação:</strong> {formatDate(selectedReview.createdAt)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Resultados</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Nota Geral:</strong> {selectedReview.overallScore}/5</p>
                  <p><strong>Status:</strong> {selectedReview.status === 'approved' ? 'Aprovada' : selectedReview.status === 'submitted' ? 'Enviada' : 'Rascunho'}</p>
                  <p><strong>Metas:</strong> {selectedReview.goals.length}</p>
                  <p><strong>Competências:</strong> {selectedReview.competencies.length}</p>
                </div>
              </div>
            </div>
            
            {/* Metas */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Metas</h4>
              <div className="space-y-2">
                {selectedReview.goals.map((goal, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* KPIs */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Competências</h4>
              <div className="space-y-2">
                {selectedReview.competencies.map((competency, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{competency.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Nota: {competency.rating}/5</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{competency.comments}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pontos Fortes */}
            {selectedReview.strengths && selectedReview.strengths.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Pontos Fortes</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {selectedReview.strengths.map((strength, index) => (
                      <li key={index}>• {strength}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Áreas de Melhoria */}
            {selectedReview.improvements && selectedReview.improvements.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Áreas de Melhoria</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {selectedReview.improvements.map((improvement, index) => (
                      <li key={index}>• {improvement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar Avaliação
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
