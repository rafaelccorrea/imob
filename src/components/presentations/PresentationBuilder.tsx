import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Presentation, 
  Plus, 
  Edit, 
  Eye, 
  Download, 
  Settings, 
  Play,
  Pause,
  RotateCcw,
  Save,
  Trash2,
  Copy,
  Share,
  Calendar,
  Users,
  BarChart3,
  Target,
  FileText,
  Image,
  Layout,
  Palette,
  Type,
  Grid,
  List,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Modal } from '../ui';
import { colors } from '../../utils/colors';
import { formatDate } from '../../utils';
import { 
  mockPresentationTemplates,
  mockPresentations,
  mockPresentationSettings,
  mockTeamPerformanceData,
  mockExecutiveMetrics
} from '../../utils/mockData';
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
  const [activeTab, setActiveTab] = useState<'templates' | 'presentations' | 'builder' | 'settings'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<PresentationTemplate | null>(null);
  const [currentPresentation, setCurrentPresentation] = useState<PresentationType | null>(null);
  const [isPresenting, setIsPresenting] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showPresentationModal, setShowPresentationModal] = useState(false);

  // Detectar mudanças na URL para atualizar a aba ativa
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['templates', 'presentations', 'builder', 'settings'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  // Filtrar apresentações por usuário
  const userPresentations = mockPresentations.filter(p => p.ownerId === userId);
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
    setCurrentPresentation(newPresentation);
    setActiveTab('builder');
  };

  const handleStartPresentation = (presentation: PresentationType) => {
    setCurrentPresentation(presentation);
    setIsPresenting(true);
    setCurrentSlideIndex(0);
  };

  const renderSlide = (slide: PresentationSlide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div 
            className="w-full h-full flex flex-col justify-center items-center text-center p-8"
            style={{ 
              backgroundColor: slide.backgroundColor || '#1e40af',
              color: slide.textColor || '#ffffff'
            }}
          >
            <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
            {slide.content.text && (
              <p className="text-xl opacity-90">{slide.content.text}</p>
            )}
          </div>
        );

      case 'metrics':
        return (
          <div className="w-full h-full p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-6">
              {slide.content.metrics?.map((metric, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {metric.label}
                    </span>
                    {metric.trend && (
                      <span className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                        {metric.change && ` ${metric.change > 0 ? '+' : ''}${metric.change}%`}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'chart':
        return (
          <div className="w-full h-full p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{slide.title}</h2>
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-300">Gráfico: {slide.content.chartType}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {slide.content.chartData?.length || 0} pontos de dados
                </p>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="w-full h-full p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{slide.title}</h2>
            <div className="space-y-4">
              {slide.content.teamData?.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{member.agentName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        #{member.ranking} • {member.sales} vendas • {member.conversionRate}% conversão
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      R$ {member.commission.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Comissões</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="w-full h-full p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{slide.title}</h2>
            <div className="space-y-6">
              {slide.content.goalsData?.map((goal, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.period}</h3>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {goal.achieved}/{goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${goal.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {goal.percentage}% atingido
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full p-8 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Slide personalizado</p>
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
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Apresentações Executivas
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Crie e personalize apresentações para {userRole === 'owner' ? 'diretoria' : 'equipe'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Apresentação
          </Button>
        </div>
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
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Templates Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Layout className="h-16 w-16 text-white" />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-semibold ${colors.text.title} mb-2`}>
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          {template.slides.length} slides
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={() => handleCreateFromTemplate(template)}
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
              <div className="space-y-4">
                {userPresentations.map((presentation) => (
                  <div key={presentation.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <Presentation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className={`font-medium ${colors.text.title}`}>
                          {presentation.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {presentation.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(presentation.createdAt)}
                          </span>
                          <span>{presentation.slides.length} slides</span>
                          {presentation.lastPresented && (
                            <span className="flex items-center gap-1">
                              <Play className="h-3 w-3" />
                              Apresentada em {formatDate(presentation.lastPresented)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusColor(presentation.status) as any}>
                        {getStatusText(presentation.status)}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleStartPresentation(presentation)}>
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
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
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar com slides */}
                <div className="lg:col-span-1">
                  <h3 className={`font-semibold mb-4 ${colors.text.title}`}>
                    Slides ({currentPresentation.slides.length})
                  </h3>
                  <div className="space-y-2">
                    {currentPresentation.slides.map((slide, index) => (
                      <div 
                        key={slide.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          index === currentSlideIndex 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setCurrentSlideIndex(index)}
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
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
                    <div className="aspect-video">
                      {currentPresentation.slides[currentSlideIndex] && 
                        renderSlide(currentPresentation.slides[currentSlideIndex])
                      }
                    </div>
                  </div>
                  
                  {/* Controles */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                        disabled={currentSlideIndex === 0}
                      >
                        Anterior
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentSlideIndex(Math.min(currentPresentation.slides.length - 1, currentSlideIndex + 1))}
                        disabled={currentSlideIndex === currentPresentation.slides.length - 1}
                      >
                        Próximo
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => handleStartPresentation(currentPresentation)}>
                        <Play className="h-4 w-4" />
                        Apresentar
                      </Button>
                    </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tema
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    <option value="corporate">Corporativo</option>
                    <option value="modern">Moderno</option>
                    <option value="minimal">Minimalista</option>
                    <option value="colorful">Colorido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cor Primária
                  </label>
                  <input 
                    type="color" 
                    className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md"
                    defaultValue={mockPresentationSettings.primaryColor}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome da Empresa
                  </label>
                  <Input defaultValue={mockPresentationSettings.companyName} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fonte
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
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

      {/* Modal de Apresentação */}
      {isPresenting && currentPresentation && (
        <Modal
          isOpen={isPresenting}
          onClose={() => setIsPresenting(false)}
          title=""
          className="max-w-7xl"
        >
          <div className="relative">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              {renderSlide(currentPresentation.slides[currentSlideIndex])}
            </div>
            
            {/* Controles da apresentação */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                disabled={currentSlideIndex === 0}
                className="text-white border-white/30 hover:bg-white/10"
              >
                Anterior
              </Button>
              <span className="text-white text-sm">
                {currentSlideIndex + 1} / {currentPresentation.slides.length}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentSlideIndex(Math.min(currentPresentation.slides.length - 1, currentSlideIndex + 1))}
                disabled={currentSlideIndex === currentPresentation.slides.length - 1}
                className="text-white border-white/30 hover:bg-white/10"
              >
                Próximo
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsPresenting(false)}
                className="text-white border-white/30 hover:bg-white/10"
              >
                Sair
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
