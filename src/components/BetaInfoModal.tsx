import React, { useState, useEffect } from 'react';
import { X, Info, Shield, Eye, Zap, CheckCircle } from 'lucide-react';
import { Button } from './ui';

interface BetaInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClosePermanently: () => void;
}

export const BetaInfoModal: React.FC<BetaInfoModalProps> = ({
  isOpen,
  onClose,
  onClosePermanently
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Pequeno delay para animação suave
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClosePermanently = () => {
    onClosePermanently();
    setIsVisible(false);
  };

  const handleClose = () => {
    onClose();
    setIsVisible(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-2xl max-w-2xl w-full mx-auto max-h-[95vh] overflow-y-auto custom-scroll transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
                Sistema em Versão Beta
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                Informações importantes sobre esta versão
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 flex-shrink-0"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Main Message */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 sm:p-4 md:p-5">
            <div className="flex items-start gap-2 sm:gap-3">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm sm:text-base mb-1 sm:mb-2">
                  Versão Beta Ilustrativa
                </h3>
                <p className="text-blue-800 dark:text-blue-200 text-xs sm:text-sm leading-relaxed">
                  Este sistema é uma <strong>versão beta não funcional</strong> desenvolvida com propósito 
                  <strong> ilustrativo e demonstrativo</strong>. Ele apresenta as funcionalidades e 
                  capacidades que podem ser implementadas em um sistema financeiro completo, 
                  permitindo personalização e expansão conforme suas necessidades específicas.
                </p>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
              O que você pode explorar:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                    Interface Responsiva
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Design adaptável para todos os dispositivos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                    Funcionalidades Completas
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Dashboard, relatórios, gestão financeira
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                    Personalização Total
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Adaptável às suas necessidades específicas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                    Sistema Seguro
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Arquitetura preparada para produção
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3 sm:p-4 md:p-5">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 text-sm sm:text-base mb-1">
                  Importante
                </h4>
                <p className="text-amber-800 dark:text-amber-200 text-xs sm:text-sm">
                  Os dados exibidos são <strong>simulados</strong> e não representam informações reais. 
                  Este sistema serve como demonstração das possibilidades de desenvolvimento 
                  de uma solução financeira completa e personalizada.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-3 sm:p-4 md:p-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={handleClosePermanently}
            variant="outline"
            className="w-full sm:w-auto text-xs sm:text-sm order-2 sm:order-1"
          >
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Não mostrar novamente</span>
            <span className="sm:hidden">Não mostrar</span>
          </Button>
          <Button
            onClick={handleClose}
            className="w-full sm:w-auto text-xs sm:text-sm order-1 sm:order-2"
          >
            <span className="hidden sm:inline">Entendi, continuar</span>
            <span className="sm:hidden">Continuar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
