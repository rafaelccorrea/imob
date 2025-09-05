// Tipos de usuário e perfis
export type UserRole = 'owner' | 'manager' | 'agent' | 'financial' | 'hr';

// Permissões por módulo
export interface ModulePermissions {
  dashboard: boolean;
  properties: boolean;
  leads: boolean;
  deals: boolean;
  visits: boolean;
  reports: boolean;
  documents: boolean;
  financial: boolean;
  hr: boolean;
  users: boolean;
  settings: boolean;
  keys: boolean; // NEW: Controle de chaves
  clients: boolean; // NEW: Perfis de clientes
  contacts: boolean; // NEW: Histórico de contatos
}

// Configuração de permissões por perfil
export const ROLE_PERMISSIONS: Record<UserRole, ModulePermissions> = {
  owner: {
    dashboard: true,
    properties: true,
    leads: true,
    deals: true,
    visits: true,
    reports: true,
    documents: true,
    financial: true,
    hr: true,
    users: true,
    settings: true,
    keys: true, // NEW
    clients: true, // NEW
    contacts: true, // NEW
  },
  manager: {
    dashboard: true,
    properties: true,
    leads: true,
    deals: true,
    visits: true,
    reports: true,
    documents: true,
    financial: false,
    hr: false,
    users: true,
    settings: false,
    keys: true, // NEW
    clients: true, // NEW
    contacts: true, // NEW
  },
  agent: {
    dashboard: true,
    properties: true,
    leads: true,
    deals: true,
    visits: true,
    reports: false,
    documents: true,
    financial: false,
    hr: false,
    users: false,
    settings: false,
    keys: true, // NEW
    clients: true, // NEW
    contacts: true, // NEW
  },
  financial: {
    dashboard: true,
    properties: false,
    leads: false,
    deals: false,
    visits: false,
    reports: true,
    documents: true,
    financial: true,
    hr: false,
    users: false,
    settings: false,
    keys: false, // NEW: Financial não precisa de controle de chaves
    clients: false, // NEW: Financial não precisa de perfis de clientes
    contacts: false, // NEW: Financial não precisa de histórico de contatos
  },
  hr: {
    dashboard: true,
    properties: false,
    leads: false,
    deals: false,
    visits: false,
    reports: false,
    documents: false,
    financial: false,
    hr: true,
    users: true,
    settings: false,
    keys: false, // NEW: HR não precisa de controle de chaves
    clients: false, // NEW: HR não precisa de perfis de clientes
    contacts: false, // NEW: HR não precisa de histórico de contatos
  },
};
