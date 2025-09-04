import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import type { ModulePermissions } from '../../types/permissions';

interface ConditionalMenuProps {
  children: React.ReactNode;
  requiredPermission: keyof ModulePermissions;
  fallback?: React.ReactNode;
}

export const ConditionalMenu: React.FC<ConditionalMenuProps> = ({
  children,
  requiredPermission,
  fallback = null,
}) => {
  const { canAccess } = usePermissions();

  if (!canAccess(requiredPermission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
