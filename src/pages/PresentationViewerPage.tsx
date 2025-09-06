import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  X,
  Play,
  Pause
} from 'lucide-react';
import { usePresentationStore } from '../stores';
import type { Presentation as PresentationType, PresentationSlide } from '../types';

export const PresentationViewerPage: React.FC = () => {
  const { presentationId } = useParams<{ presentationId: string }>();
  const navigate = useNavigate();
  const { getPresentation } = usePresentationStore();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Encontrar a apresentação
  const presentation = getPresentation(presentationId || '');

  // Funções de navegação
  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (!presentation) {
      return;
    }
    if (currentSlideIndex < presentation.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const exitPresentation = () => {
    setIsPlaying(false);
    navigate('/presentations');
  };

  // Funções de swipe para mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNextSlide();
    }
    if (isRightSwipe) {
      goToPreviousSlide();
    }
  };

  useEffect(() => {
    if (!presentation) {
      navigate('/presentations');
      return;
    }
  }, [presentation, navigate]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => {
        if (prev >= presentation!.slides.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 5000); // 5 segundos por slide

    return () => clearInterval(interval);
  }, [isPlaying, presentation]);

  if (!presentation) {
    return null;
  }

  const renderSlide = (slide: PresentationSlide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div 
            className="w-full h-full flex flex-col justify-center items-center text-center p-8 sm:p-12 lg:p-16"
            style={{ 
              backgroundColor: slide.backgroundColor || '#1e40af',
              color: slide.textColor || '#ffffff'
            }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 lg:mb-10 px-4 sm:px-6 leading-tight">{slide.title}</h1>
            {slide.content.text && (
              <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl opacity-90 px-4 sm:px-6 max-w-5xl">{slide.content.text}</p>
            )}
          </div>
        );

      case 'metrics':
        return (
          <div className="w-full h-full p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-gray-900">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 lg:mb-16 text-gray-900 dark:text-white text-center">{slide.title}</h2>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 place-items-center">
              {slide.content.metrics?.map((metric, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-sm">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300">
                      {metric.label}
                    </span>
                    {metric.trend && (
                      <span className={`text-base sm:text-lg font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                        {metric.change && ` ${metric.change > 0 ? '+' : ''}${metric.change}%`}
                      </span>
                    )}
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="w-full h-full p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-gray-900">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 lg:mb-16 text-gray-900 dark:text-white text-center">{slide.title}</h2>
            <div className="flex-1 space-y-6 sm:space-y-8 lg:space-y-10 overflow-y-auto">
              {slide.content.teamData?.map((member, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 sm:p-8 lg:p-10 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 gap-6 sm:gap-8">
                  <div className="flex items-center gap-6 sm:gap-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-white">{member.agentName}</h3>
                      <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300">
                        #{member.ranking} • {member.sales} vendas • {member.conversionRate}% conversão
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">
                      R$ {member.commission.toLocaleString()}
                    </p>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300">Comissões</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'chart':
        return (
          <div className="w-full h-full p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-gray-900">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 lg:mb-16 text-gray-900 dark:text-white text-center">{slide.title}</h2>
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center px-8 sm:px-12">
                <svg className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 xl:h-32 xl:w-32 text-gray-400 mx-auto mb-6 sm:mb-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300">{slide.content.chartType}</p>
                <p className="text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400">
                  {slide.content.chartData?.length || 0} pontos de dados
                </p>
              </div>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="w-full h-full p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-gray-900">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 lg:mb-16 text-gray-900 dark:text-white text-center">{slide.title}</h2>
            <div className="flex-1 space-y-6 sm:space-y-8 lg:space-y-10 overflow-y-auto">
              {slide.content.goalsData?.map((goal, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 sm:p-8 lg:p-10 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">{goal.period}</h3>
                    <span className="text-base sm:text-lg lg:text-xl font-medium text-gray-600 dark:text-gray-300">
                      {goal.achieved}/{goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 sm:h-5 lg:h-6">
                    <div 
                      className="bg-blue-500 h-4 sm:h-5 lg:h-6 rounded-full transition-all duration-300"
                      style={{ width: `${goal.percentage}%` }}
                    />
                  </div>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mt-3 sm:mt-4">
                    {goal.percentage}% atingido
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full p-8 sm:p-12 lg:p-16 flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="text-center px-8 sm:px-12">
              <svg className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 xl:h-32 xl:w-32 text-gray-400 mx-auto mb-6 sm:mb-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300">Slide personalizado</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className="w-screen h-screen bg-gray-900 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide atual */}
      <div className="w-full h-full">
        {presentation && presentation.slides[currentSlideIndex] ? (
          renderSlide(presentation.slides[currentSlideIndex])
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Slide não encontrado</h1>
              <p className="text-gray-300">Slide {currentSlideIndex + 1} de {presentation?.slides?.length || 0}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Controles da apresentação */}
      {presentation && (
        <div className="absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-4 bg-black/80 backdrop-blur-sm rounded-xl px-3 sm:px-6 py-2 sm:py-4 z-50 w-[95%] sm:w-auto max-w-4xl">
        <button 
          onClick={goToPreviousSlide}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToPreviousSlide();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToPreviousSlide();
          }}
          disabled={currentSlideIndex === 0}
          className="text-white border border-white/40 hover:bg-white/20 active:bg-white/30 text-sm sm:text-base px-2 sm:px-4 py-2 sm:py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-200 touch-manipulation min-h-[44px] sm:min-h-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>
        
        {/* Play/Pause */}
        <button 
          onClick={togglePlayPause}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            togglePlayPause();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            togglePlayPause();
          }}
          className="text-white border border-white/40 hover:bg-white/20 active:bg-white/30 text-sm sm:text-base px-2 sm:px-4 py-2 sm:py-2 rounded cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-200 touch-manipulation min-h-[44px] sm:min-h-0"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span className="hidden sm:inline">{isPlaying ? 'Pausar' : 'Play'}</span>
        </button>
        
        {/* Indicador de progresso visual */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <span className="text-white text-sm sm:text-base font-medium whitespace-nowrap">
            {currentSlideIndex + 1} / {presentation.slides.length}
          </span>
          <div className="w-16 sm:w-24 lg:w-32 h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden flex-1">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${((currentSlideIndex + 1) / presentation.slides.length) * 100}%` }}
            />
          </div>
        </div>
        
        <button 
          onClick={goToNextSlide}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToNextSlide();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToNextSlide();
          }}
          disabled={currentSlideIndex === presentation.slides.length - 1}
          className="text-white border border-white/40 hover:bg-white/20 active:bg-white/30 text-sm sm:text-base px-2 sm:px-4 py-2 sm:py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-200 touch-manipulation min-h-[44px] sm:min-h-0"
        >
          <span className="hidden sm:inline">Próximo</span>
          <ArrowRight className="h-4 w-4" />
        </button>
        
        <div className="w-px h-6 bg-white/30 mx-2" />
        
        <button 
          onClick={exitPresentation}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            exitPresentation();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            exitPresentation();
          }}
          className="text-white border border-white/40 hover:bg-white/20 active:bg-white/30 text-sm sm:text-base px-2 sm:px-4 py-2 sm:py-2 rounded cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-200 touch-manipulation min-h-[44px] sm:min-h-0"
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
        </div>
      )}
      
      {/* Indicador de título */}
      {presentation && (
        <div className="absolute top-2 sm:top-6 left-2 sm:left-6 bg-black/60 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-1 sm:py-3 max-w-[calc(100%-4rem)] sm:max-w-none">
          <span className="text-white text-sm sm:text-base font-medium truncate">
            {presentation.name}
          </span>
        </div>
      )}
      
      {/* Dicas de controles */}
      {presentation && (
        <div className="absolute top-2 sm:top-6 right-2 sm:right-6 bg-black/60 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-1 sm:py-3 max-w-[calc(100%-4rem)] sm:max-w-none">
          <div className="text-white text-xs sm:text-sm space-y-1">
            <div className="flex items-center gap-1 sm:gap-2">
              <kbd className="px-1 sm:px-2 py-0.5 sm:py-1 bg-white/20 rounded text-xs">←</kbd>
              <kbd className="px-1 sm:px-2 py-0.5 sm:py-1 bg-white/20 rounded text-xs">→</kbd>
              <span className="text-xs hidden sm:inline">Navegar</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <kbd className="px-1 sm:px-2 py-0.5 sm:py-1 bg-white/20 rounded text-xs">Space</kbd>
              <span className="text-xs hidden sm:inline">Play/Pause</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <kbd className="px-1 sm:px-2 py-0.5 sm:py-1 bg-white/20 rounded text-xs">Esc</kbd>
              <span className="text-xs hidden sm:inline">Sair</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Controles de teclado */}
      <div className="absolute inset-0 focus:outline-none z-10" 
           tabIndex={0}
           onKeyDown={(e) => {
             if (e.key === 'ArrowLeft') {
               e.preventDefault();
               goToPreviousSlide();
             } else if (e.key === 'ArrowRight') {
               e.preventDefault();
               goToNextSlide();
             } else if (e.key === 'Escape') {
               e.preventDefault();
               exitPresentation();
             } else if (e.key === ' ') {
               e.preventDefault();
               togglePlayPause();
             } else if (e.key === 'Home') {
               e.preventDefault();
               setCurrentSlideIndex(0);
             } else if (e.key === 'End') {
               e.preventDefault();
               setCurrentSlideIndex(presentation.slides.length - 1);
             }
           }}
      />
    </div>
  );
};

