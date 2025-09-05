// Re-exportações de permissões
export type { UserRole, ModulePermissions } from './permissions';
export { ROLE_PERMISSIONS } from './permissions';

// Re-exportações de tipos financeiros
export type { 
  FinancialEntry, 
  Commission as FinancialCommission, 
  CashFlowEntry, 
  FinancialMetrics, 
  AgentFinancialSummary,
  Visit as FinancialVisit,
  Lead as FinancialLead,
  AgentDashboard as FinancialAgentDashboard
} from './financial';


// Tipos para as entidades do sistema

// Tipos para as entidades do sistema
export interface Property {
  id: string;
  title: string;
  description: string;
  address: {
    street: string;
    number?: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  price: number;
  rentPrice?: number;
  status: 'available' | 'sold' | 'rented' | 'reserved' | 'inactive';
  type: 'house' | 'apartment' | 'commercial' | 'land';
  bedrooms: number;
  bathrooms: number;
  area: number;
  responsibleAgentId: string;
  images?: string[];
  features?: {
    bedrooms: number;
    bathrooms: number;
    parkingSpaces?: number;
    area: number;
    builtArea?: number;
  };
  owner?: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'visit_scheduled' | 'qualified' | 'closed';
  source: 'website' | 'referral' | 'social_media' | 'other';
  maxPrice: number;
  neighborhoods: string[];
  lastContact: string;
  assignedAgentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  propertyId: string;
  clientId: string;
  agentId: string;
  type: 'sale' | 'rent';
  status: 'negotiating' | 'approved' | 'signed' | 'cancelled';
  value: number;
  commission: number;
  createdAt: string;
  updatedAt: string;
  signedAt?: string;
  documents: string[];
  notes: string[];
}

export interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'expense';
  category: 'commission' | 'rent' | 'sale' | 'maintenance' | 'marketing' | 'salary' | 'other';
  amount: number;
  date: string;
  relatedDealId?: string;
  relatedPropertyId?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: import('./permissions').UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Commission {
  id: string;
  dealId: string;
  agentId: string;
  amount: number;
  status: 'pending' | 'paid';
  dueDate: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos específicos por perfil
export interface AgentDashboard {
  myProperties: Property[];
  myLeads: Lead[];
  myDeals: Deal[];
  myCommissions: Commission[];
  performance: {
    totalSales: number;
    totalCommissions: number;
    conversionRate: number;
    ranking: number;
  };
}

export interface ManagerDashboard {
  teamPerformance: {
    totalSales: number;
    totalLeads: number;
    conversionRate: number;
    topAgents: User[];
  };
  properties: Property[];
  leads: Lead[];
  deals: Deal[];
}

export interface OwnerDashboard {
  businessMetrics: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    growthRate: number;
  };
  teamOverview: {
    totalEmployees: number;
    activeAgents: number;
    performance: number;
  };
  marketAnalysis: {
    topRegions: string[];
    marketTrends: Array<{ month: string; value: number }>;
  };
}

export interface FinancialDashboard {
  cashFlow: {
    income: number;
    expenses: number;
    netCash: number;
  };
  pendingCommissions: Commission[];
  transactions: Transaction[];
  reports: Array<{ id: string; title: string; type: string; date: string }>;
}

export interface HRDashboard {
  employees: User[];
  recruitment: {
    openPositions: number;
    candidates: number;
    interviews: number;
  };
  training: {
    activeCourses: number;
    completedCourses: number;
    certifications: number;
  };
}

// Tipos de dashboard
export interface DashboardMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  activeProperties: number;
  soldProperties: number;
  rentedProperties: number;
  activeLeads: number;
  closedDeals: number;
  pendingCommissions: number;
  expiringContracts: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

// Tipos de filtros
export interface PropertyFilters {
  type?: Property['type'];
  status?: Property['status'];
  minPrice?: number;
  maxPrice?: number;
  neighborhood?: string;
  bedrooms?: number;
  agentId?: string;
}

export interface LeadFilters {
  status?: Lead['status'];
  source?: Lead['source'];
  agentId?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Tipos de API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


// Tipos adicionais para entidades específicas
export interface Contact {
  id: string;
  clientId: string;
  agentId: string;
  type: 'call' | 'email' | 'visit' | 'meeting';
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'contract' | 'proposal' | 'invoice' | 'receipt' | 'other';
  category?: string;
  status?: string;
  version?: string;
  size?: string;
  fileUrl: string;
  relatedDealId?: string;
  relatedPropertyId?: string;
  propertyId?: string;
  propertyTitle?: string;
  clientName?: string;
  agentName?: string;
  expiresAt?: string;
  priority?: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'buyer' | 'seller' | 'tenant' | 'landlord';
  status: 'active' | 'inactive' | 'prospect';
  createdAt: string;
  updatedAt: string;
}

export interface Key {
  id: string;
  propertyId: string;
  keyNumber: string;
  location: string;
  status: 'available' | 'borrowed' | 'lost';
  borrowedBy?: string;
  borrowedAt?: string;
  returnedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Visit {
  id: string;
  propertyId: string;
  clientId: string;
  agentId: string;
  scheduledDate: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'inactive' | 'terminated';
  createdAt: string;
  updatedAt: string;
}
