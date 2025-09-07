import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <svg
        className="animate-spin text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible, 
  message = 'Carregando...' 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner animado moderno */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-primary-600"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-primary-400 opacity-20"></div>
          </div>
          
          {/* Texto de loading */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {message}
            </h3>
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LoginLoadingProps {
  isVisible: boolean;
  userType?: string;
}

export const LoginLoading: React.FC<LoginLoadingProps> = ({ 
  isVisible, 
  userType = 'usuário' 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo animado */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full animate-ping opacity-20"></div>
          </div>
          
          {/* Spinner principal */}
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-primary-600"></div>
          </div>
          
          {/* Texto de loading */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Entrando no sistema...
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Autenticando {userType}
            </p>
            
            {/* Barra de progresso animada */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 h-2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
