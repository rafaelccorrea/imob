import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import type { ModulePermissions } from '../../types/permissions';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission: keyof ModulePermissions;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  fallback = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Acesso Negado
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    </div>
  ),
}) => {
  const { canAccess } = usePermissions();

  if (!canAccess(requiredPermission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
