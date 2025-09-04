// Tipos de usuário e perfis
export type UserRole = 'owner' | 'manager' | 'agent' | 'financial' | 'hr';

// Permissões por módulo
export interface ModulePermissions {
  dashboard: boolean;
  properties: boolean;
  leads: boolean;
  deals: boolean;
  financial: boolean;
  hr: boolean;
  users: boolean;
  settings: boolean;
  reports: boolean;
  analytics: boolean;
  commissions: boolean;
  marketing: boolean;
  training: boolean;
  documents: boolean;
  notifications: boolean;
}

// Configuração de permissões por perfil
export const ROLE_PERMISSIONS: Record<UserRole, ModulePermissions> = {
  owner: {
    dashboard: true,
    properties: true,
    leads: true,
    deals: true,
    financial: true,
    hr: true,
    users: true,
    settings: true,
    reports: true,
    analytics: true,
    commissions: true,
    marketing: true,
    training: true,
    documents: true,
    notifications: true,
  },
  manager: {
    dashboard: true,
    properties: true,
    leads: true,
    deals: true,
    financial: false,
    hr: false,
    users: true,
    settings: false,
    reports: true,
    analytics: true,
    commissions: true,
    marketing: true,
    training: true,
    documents: true,
    notifications: true,
  },
  agent: {
    dashboard: true,
    properties: true,
    leads: true,
    deals: true,
    financial: false,
    hr: false,
    users: false,
    settings: false,
    reports: false,
    analytics: false,
    commissions: true,
    marketing: false,
    training: true,
    documents: true,
    notifications: true,
  },
  financial: {
    dashboard: true,
    properties: false,
    leads: false,
    deals: true,
    financial: true,
    hr: false,
    users: false,
    settings: false,
    reports: true,
    analytics: true,
    commissions: true,
    marketing: false,
    training: false,
    documents: true,
    notifications: true,
  },
  hr: {
    dashboard: true,
    properties: false,
    leads: false,
    deals: false,
    financial: false,
    hr: true,
    users: true,
    settings: false,
    reports: true,
    analytics: false,
    commissions: false,
    marketing: false,
    training: true,
    documents: true,
    notifications: true,
  },
};
