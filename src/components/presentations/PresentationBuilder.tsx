import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Presentation, 
  Plus, 
  Edit, 
  Download, 
  Settings, 
  Play,
  Save,
  Calendar,
  Users,
  BarChart3,
  FileText,
  Layout,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from '../ui';
import { colors } from '../../utils/colors';
import { formatDate } from '../../utils';
import { 
  mockPresentationTemplates,
  mockPresentationSettings
} from '../../utils/mockData';
import { usePresentationStore } from '../../stores';
import type { PresentationSlide, PresentationTemplate, Presentation as PresentationType } from '../../types';

interface PresentationBuilderProps {
  userRole: 'owner' | 'manager';
  userId: string;
}

export const PresentationBuilder: React.FC<PresentationBuilderProps> = ({
  userRole,
  userId
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { presentations, addPresentation } = usePresentationStore();
  const [activeTab, setActiveTab] = useState<'templates' | 'presentations' | 'builder' | 'settings'>('templates');
  const [currentPresentation, setCurrentPresentation] = useState<PresentationType | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Detectar mudanças na URL para atualizar a aba ativa
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['templates', 'presentations', 'builder', 'settings'].includes(tab)) {
      setActiveTab(tab as 'templates' | 'presentations' | 'builder' | 'settings');
    }
  }, [searchParams]);

  // Filtrar apresentações por usuário
  const userPresentations = presentations.filter(p => p.ownerId === userId);
  const availableTemplates = mockPresentationTemplates.filter(t => 
    t.category === 'executive' || (userRole === 'manager' && t.category === 'monthly')
  );

  const tabs = [
    { id: 'templates', label: 'Templates', icon: Layout },
    { id: 'presentations', label: 'Minhas Apresentações', icon: Presentation },
    { id: 'builder', label: 'Editor', icon: Edit },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      case 'archived': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publicada';
      case 'draft': return 'Rascunho';
      case 'archived': return 'Arquivada';
      default: return status;
    }
  };

  const handleCreateFromTemplate = (template: PresentationTemplate) => {
    const newPresentation: PresentationType = {
      id: `pres_${Date.now()}`,
      name: `${template.name} - ${new Date().toLocaleDateString()}`,
      description: `Criada a partir do template: ${template.name}`,
      templateId: template.id,
      slides: template.slides.map((slide, index) => ({
        ...slide,
        id: `slide_${Date.now()}_${index}`,
        position: index + 1
      })),
      ownerId: userId,
      ownerRole: userRole,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Adicionar ao store
    addPresentation(newPresentation);
    setCurrentPresentation(newPresentation);
    setActiveTab('builder');
  };

  const handleStartPresentation = (presentation: PresentationType) => {
    navigate(`/presentation/${presentation.id}`);
  };

  const renderSlide = (slide: PresentationSlide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div 
            className="w-full h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 lg:p-8"
            style={{ 
              backgroundColor: slide.backgroundColor || '#1e40af',
              color: slide.textColor || '#ffffff'
            }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 px-4 sm:px-6 leading-tight">{slide.title}</h1>
            {slide.content.text && (
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl opacity-90 px-4 sm:px-6 max-w-4xl">{slide.content.text}</p>
            )}
          </div>
        );

      case 'metrics':
        return (
          <div className="w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900 dark:text-white text-center">{slide.title}</h2>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 place-items-center">
              {slide.content.metrics?.map((metric, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 w-full max-w-sm">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300">
                      {metric.label}
                    </span>
                    {metric.trend && (
                      <span className={`text-sm sm:text-base font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                        {metric.change && ` ${metric.change > 0 ? '+' : ''}${metric.change}%`}
                      </span>
                    )}
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'chart':
        return (
          <div className="w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900 dark:text-white text-center">{slide.title}</h2>
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center px-4 sm:px-6">
                <BarChart3 className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300">{slide.content.chartType}</p>
                <p className="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400">
                  {slide.content.chartData?.length || 0} pontos de dados
                </p>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900 dark:text-white text-center">{slide.title}</h2>
            <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 overflow-y-auto">
              {slide.content.teamData?.map((member, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 gap-4 sm:gap-6">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base sm:text-lg lg:text-xl text-gray-900 dark:text-white">{member.agentName}</h3>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300">
                        #{member.ranking} • {member.sales} vendas • {member.conversionRate}% conversão
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                      R$ {member.commission.toLocaleString()}
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300">Comissões</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900 dark:text-white text-center">{slide.title}</h2>
            <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 overflow-y-auto">
              {slide.content.goalsData?.map((goal, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">{goal.period}</h3>
                    <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-600 dark:text-gray-300">
                      {goal.achieved}/{goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 sm:h-4 lg:h-5">
                    <div 
                      className="bg-blue-500 h-3 sm:h-4 lg:h-5 rounded-full transition-all duration-300"
                      style={{ width: `${goal.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
                    {goal.percentage}% atingido
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="text-center px-4 sm:px-6">
              <FileText className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300">Slide personalizado</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Apresentações Executivas
          </h1>
          <p className={`text-xs sm:text-sm text-gray-600 dark:text-gray-300`}>
            Crie e personalize apresentações para {userRole === 'owner' ? 'diretoria' : 'equipe'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center gap-2 text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
          <Button className="flex items-center gap-2 text-xs sm:text-sm">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Nova Apresentação</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto custom-scroll px-2 sm:px-4 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'templates' | 'presentations' | 'builder' | 'settings')}
                className={`flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Templates Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {availableTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-32 sm:h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Layout className="h-8 w-8 sm:h-16 sm:w-16 text-white" />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className={`font-semibold text-sm sm:text-base ${colors.text.title} mb-2 line-clamp-2`}>
                        {template.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2">
                        {template.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <Badge variant="secondary" className="text-xs w-fit">
                          {template.slides.length} slides
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={() => handleCreateFromTemplate(template)}
                          className="text-xs sm:text-sm w-full sm:w-auto"
                        >
                          Usar Template
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

      {activeTab === 'presentations' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Minhas Apresentações ({userPresentations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {userPresentations.map((presentation) => (
                  <div key={presentation.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 flex-shrink-0">
                        <Presentation className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-medium text-sm sm:text-base ${colors.text.title} truncate`}>
                          {presentation.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                          {presentation.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(presentation.createdAt)}
                          </span>
                          <span>{presentation.slides.length} slides</span>
                          {presentation.lastPresented && (
                            <span className="flex items-center gap-1">
                              <Play className="h-3 w-3" />
                              <span className="hidden sm:inline">Apresentada em {formatDate(presentation.lastPresented)}</span>
                              <span className="sm:hidden">Apresentada</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <Badge variant={getStatusColor(presentation.status) as 'success' | 'warning' | 'secondary'} className="text-xs self-start sm:self-center w-fit">
                        {getStatusText(presentation.status)}
                      </Badge>
                      <div className="flex gap-1 sm:gap-2 overflow-x-auto">
                        <Button variant="outline" size="sm" onClick={() => handleStartPresentation(presentation)} className="p-2 flex-shrink-0">
                          <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="p-2 flex-shrink-0">
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="p-2 flex-shrink-0">
                          <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="p-2 flex-shrink-0">
                          <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
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

      {activeTab === 'builder' && currentPresentation && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Edit className="h-5 w-5 text-blue-500" />
                Editor de Apresentação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Sidebar com slides */}
                <div className="lg:col-span-1">
                  <h3 className={`font-semibold mb-3 sm:mb-4 text-sm sm:text-base ${colors.text.title}`}>
                    Slides ({currentPresentation.slides.length})
                  </h3>
                  <div className="space-y-2">
                    {currentPresentation.slides.map((slide, index) => (
                      <div 
                        key={slide.id}
                        className={`p-2 sm:p-3 border rounded-lg cursor-pointer transition-colors ${
                          index === currentSlideIndex 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setCurrentSlideIndex(index)}
                      >
                        <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          {index + 1}. {slide.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {slide.type} • {slide.layout}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview do slide */}
                <div className="lg:col-span-3">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div 
                      className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] xl:aspect-[24/9] focus:outline-none" 
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
                          setCurrentSlideIndex(currentSlideIndex - 1);
                        } else if (e.key === 'ArrowRight' && currentSlideIndex < currentPresentation.slides.length - 1) {
                          setCurrentSlideIndex(currentSlideIndex + 1);
                        }
                      }}
                    >
                      {currentPresentation.slides[currentSlideIndex] && 
                        renderSlide(currentPresentation.slides[currentSlideIndex])
                      }
                    </div>
                  </div>
                  
                  {/* Controles melhorados */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3 sm:gap-0">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                        disabled={currentSlideIndex === 0}
                        className="text-xs sm:text-sm px-3 sm:px-4"
                      >
                        ← Anterior
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentSlideIndex(Math.min(currentPresentation.slides.length - 1, currentSlideIndex + 1))}
                        disabled={currentSlideIndex === currentPresentation.slides.length - 1}
                        className="text-xs sm:text-sm px-3 sm:px-4"
                      >
                        Próximo →
                      </Button>
                    </div>
                    
                    {/* Indicador de progresso */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {currentSlideIndex + 1} / {currentPresentation.slides.length}
                      </span>
                      <div className="w-16 sm:w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${((currentSlideIndex + 1) / currentPresentation.slides.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline ml-1">Salvar</span>
                      </Button>
                      <Button size="sm" onClick={() => handleStartPresentation(currentPresentation)} className="text-xs sm:text-sm">
                        <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline ml-1">Apresentar</span>
                        <span className="sm:hidden ml-1">Play</span>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Dica de navegação */}
                  <div className="mt-2 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Use as setas ← → do teclado para navegar
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
                <Settings className="h-5 w-5 text-blue-500" />
                Configurações da Apresentação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tema
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm">
                    <option value="corporate">Corporativo</option>
                    <option value="modern">Moderno</option>
                    <option value="minimal">Minimalista</option>
                    <option value="colorful">Colorido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cor Primária
                  </label>
                  <input 
                    type="color" 
                    className="w-full h-8 sm:h-10 border border-gray-300 dark:border-gray-600 rounded-md"
                    defaultValue={mockPresentationSettings.primaryColor}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome da Empresa
                  </label>
                  <Input defaultValue={mockPresentationSettings.companyName} className="text-sm" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fonte
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm">
                    <option value="default">Padrão</option>
                    <option value="serif">Serif</option>
                    <option value="sans-serif">Sans-serif</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
};
