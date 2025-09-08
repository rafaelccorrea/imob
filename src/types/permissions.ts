// Tipos de usuário e perfis
export type UserRole = 'admin' | 'owner' | 'manager' | 'agent' | 'financial' | 'hr';

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
  integrations: boolean; // NEW: Integrações com plataformas terceiras
  ownerDashboard: boolean; // NEW: Dashboard exclusivo do proprietário
  dataManagement: boolean; // NEW: Gerenciamento de dados e backup
  executiveReports: boolean; // NEW: Relatórios executivos e analytics
  auditLogs: boolean; // NEW: Logs de auditoria e monitoramento
  franchiseManagement: boolean; // NEW: Gestão de franquias e múltiplas unidades
  alertsNotifications: boolean; // NEW: Sistema de alertas e notificações
  salesAnalysis: boolean; // NEW: Análise de vendas e concorrência
  agentsRanking: boolean; // NEW: Ranking de agentes
  propertyGallery: boolean; // NEW: Galeria de fotos dos imóveis
  propertyMap: boolean; // NEW: Mapa de imóveis
}

// Configuração de permissões por perfil
export const ROLE_PERMISSIONS: Record<UserRole, ModulePermissions> = {
  admin: {
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
    keys: true,
    clients: true,
    contacts: true,
    integrations: true,
    ownerDashboard: true,
    dataManagement: true,
    executiveReports: true,
    auditLogs: true,
    franchiseManagement: true,
    alertsNotifications: true,
    salesAnalysis: true,
    agentsRanking: true,
    propertyGallery: true,
    propertyMap: true,
  },
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
    integrations: true,
    ownerDashboard: true,
    dataManagement: true,
    executiveReports: true,
    auditLogs: true,
    franchiseManagement: true,
    alertsNotifications: true, // NEW
    salesAnalysis: true,
    agentsRanking: true,
    propertyGallery: true,
    propertyMap: true,
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
    integrations: true,
    ownerDashboard: true,
    dataManagement: true,
    executiveReports: true,
    auditLogs: true,
    franchiseManagement: true,
    alertsNotifications: true, // NEW
    salesAnalysis: true,
    agentsRanking: true,
    propertyGallery: true,
    propertyMap: true,
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
    integrations: true,
    ownerDashboard: true,
    dataManagement: true,
    executiveReports: true,
    auditLogs: true,
    franchiseManagement: true,
    alertsNotifications: true, // NEW
    salesAnalysis: true,
    agentsRanking: true,
    propertyGallery: true,
    propertyMap: true,
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
    integrations: false, // NEW: Financial não precisa de integrações
    ownerDashboard: false, // NEW: Financial não tem acesso ao dashboard do proprietário
    dataManagement: false, // NEW: Financial não tem acesso ao gerenciamento de dados
    executiveReports: false, // NEW: Financial não tem acesso aos relatórios executivos
    auditLogs: false, // NEW: Financial não tem acesso aos logs de auditoria
    franchiseManagement: false, // NEW: Financial não tem acesso à gestão de franquias
    alertsNotifications: false, // NEW: Financial não tem acesso aos alertas
    salesAnalysis: false, // NEW: Financial não tem acesso à análise de vendas
    agentsRanking: false, // NEW: Financial não tem acesso ao ranking de agentes
    propertyGallery: false, // NEW: Financial não tem acesso à galeria de fotos
    propertyMap: false, // NEW: Financial não tem acesso ao mapa de imóveis
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
    integrations: false, // NEW: HR não precisa de integrações
    ownerDashboard: false, // NEW: HR não tem acesso ao dashboard do proprietário
    dataManagement: false, // NEW: HR não tem acesso ao gerenciamento de dados
    executiveReports: false, // NEW: HR não tem acesso aos relatórios executivos
    auditLogs: false, // NEW: HR não tem acesso aos logs de auditoria
    franchiseManagement: false, // NEW: HR não tem acesso à gestão de franquias
    alertsNotifications: false, // NEW: HR não tem acesso aos alertas
    salesAnalysis: false, // NEW: HR não tem acesso à análise de vendas
    agentsRanking: false, // NEW: HR não tem acesso ao ranking de agentes
    propertyGallery: false, // NEW: HR não tem acesso à galeria de fotos
    propertyMap: false, // NEW: HR não tem acesso ao mapa de imóveis
  },
};
