// Tipos de usuário e perfis
export type UserRole = 'owner' | 'manager' | 'agent' | 'financial' | 'hr';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de imóveis
export type PropertyType = 'house' | 'apartment' | 'commercial' | 'land' | 'rural';
export type PropertyStatus = 'available' | 'sold' | 'rented' | 'reserved' | 'inactive';

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  rentPrice?: number;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    area: number; // em m²
    builtArea?: number;
  };
  images: string[];
  responsibleAgentId: string;
  owner: {
    name: string;
    phone: string;
    email?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de leads/CRM
export type LeadStatus = 'new' | 'contacted' | 'visit_scheduled' | 'proposal' | 'closed' | 'lost';
export type LeadSource = 'website' | 'social_media' | 'referral' | 'walk_in' | 'phone' | 'other';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  assignedAgentId?: string;
  interests: {
    propertyTypes: PropertyType[];
    neighborhoods: string[];
    maxPrice?: number;
    minBedrooms?: number;
  };
  notes: string[];
  lastContact?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de vendas e locações
export type DealStatus = 'negotiating' | 'approved' | 'signed' | 'cancelled';
export type DealType = 'sale' | 'rent';

export interface Deal {
  id: string;
  type: DealType;
  status: DealStatus;
  propertyId: string;
  clientId: string;
  agentId: string;
  value: number;
  commission: number;
  documents: string[];
  notes: string[];
  createdAt: Date;
  updatedAt: Date;
  signedAt?: Date;
}

// Tipos financeiros
export type TransactionType = 'income' | 'expense';
export type TransactionCategory = 'commission' | 'rent' | 'sale' | 'maintenance' | 'marketing' | 'salary' | 'other';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  amount: number;
  date: Date;
  relatedDealId?: string;
  relatedPropertyId?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de comissões
export type CommissionStatus = 'pending' | 'paid' | 'cancelled';

export interface Commission {
  id: string;
  agentId: string;
  dealId: string;
  amount: number;
  status: CommissionStatus;
  dueDate: Date;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de colaboradores/RH
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  hireDate: Date;
  isActive: boolean;
  documents: {
    contract: string;
    idCard: string;
    medicalExam?: string;
  };
  createdAt: Date;
  updatedAt: Date;
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
  type?: PropertyType;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  neighborhood?: string;
  bedrooms?: number;
  agentId?: string;
}

export interface LeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
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
