import { useAuthStore } from '../stores/authStore';
import type { ModulePermissions, UserRole } from '../types/permissions';
import { ROLE_PERMISSIONS } from '../types/permissions';

export const usePermissions = () => {
  const { user } = useAuthStore();
  
  const getUserPermissions = (): ModulePermissions => {
    if (!user?.role) {
      return {
        dashboard: false,
        properties: false,
        leads: false,
        deals: false,
        financial: false,
        hr: false,
        users: false,
        settings: false,
        reports: false,
        analytics: false,
        commissions: false,
        marketing: false,
        training: false,
        documents: false,
        notifications: false,
      };
    }
    
    return ROLE_PERMISSIONS[user.role as UserRole];
  };
  
  const hasPermission = (module: keyof ModulePermissions): boolean => {
    const permissions = getUserPermissions();
    return permissions[module];
  };
  
  const canAccess = (module: keyof ModulePermissions): boolean => {
    return hasPermission(module);
  };
  
  const getRoleName = (role: UserRole): string => {
    const roleNames = {
      owner: 'Proprietário',
      manager: 'Gestor',
      agent: 'Corretor',
      financial: 'Financeiro',
      hr: 'RH',
    };
    
    return roleNames[role] || role;
  };
  
  return {
    permissions: getUserPermissions(),
    hasPermission,
    canAccess,
    getRoleName,
    userRole: user?.role as UserRole,
  };
};
