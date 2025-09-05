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
  AgentDashboard as FinancialAgentDashboard,
  Supplier,
  AccountsPayable,
  AccountsReceivable,
  Budget,
  BudgetPlan,
  FinancialReport,
  Asset,
  Investment,
  Tax,
  TaxPlanning
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

// Financing Calculator Types
export interface Bank {
  id: string;
  name: string;
  logo: string;
  interestRate: number;
  minDownPayment: number;
  maxLoanTerm: number;
  minLoanAmount: number;
  maxLoanAmount: number;
  isActive: boolean;
}

export interface FinancingSimulation {
  id: string;
  propertyValue: number;
  downPayment: number;
  loanAmount: number;
  bankId: string;
  bankName: string;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  createdAt: string;
  agentId: string;
  clientName?: string;
  clientEmail?: string;
}

export interface FinancingComparison {
  simulations: FinancingSimulation[];
  bestOption: FinancingSimulation;
  savings: number;
  createdAt: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  monthlyIncome: number;
  creditScore: 'excellent' | 'good' | 'fair' | 'poor';
  employmentStatus: 'employed' | 'self_employed' | 'retired' | 'unemployed';
  downPaymentAvailable: number;
  maxMonthlyPayment: number;
  preferredLoanTerm: number;
  createdAt: string;
  agentId: string;
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
  documents: {
    contract?: string;
    idCard?: string;
    medicalExam?: string;
    workCard?: string;
    bankAccount?: string;
  };
  benefits: {
    healthInsurance?: boolean;
    mealTicket?: number;
    transportTicket?: number;
    gymPass?: boolean;
    lifeInsurance?: boolean;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Novos tipos para RH expandido
export interface JobPosition {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  status: 'open' | 'closed' | 'paused';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: string;
  status: 'applied' | 'screening' | 'interview' | 'test' | 'hired' | 'rejected';
  interviewDate?: string;
  notes: string[];
  score?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  interviewerId: string;
  interviewerName: string;
  scheduledDate: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  score?: number;
  feedback?: string;
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewerId: string;
  reviewerName: string;
  period: string;
  goals: Array<{
    id: string;
    description: string;
    target: number;
    achieved: number;
    weight: number;
  }>;
  competencies: Array<{
    id: string;
    name: string;
    rating: 1 | 2 | 3 | 4 | 5;
    comments: string;
  }>;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  developmentPlan: string[];
  status: 'draft' | 'submitted' | 'approved';
  createdAt: string;
  updatedAt: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  type: 'mandatory' | 'optional' | 'certification';
  duration: number; // em horas
  provider: string;
  cost: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeTraining {
  id: string;
  employeeId: string;
  employeeName: string;
  trainingId: string;
  trainingTitle: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'expired';
  startDate?: string;
  completionDate?: string;
  score?: number;
  certificate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string; // YYYY-MM
  grossSalary: number;
  benefits: {
    healthInsurance: number;
    mealTicket: number;
    transportTicket: number;
    gymPass: number;
    lifeInsurance: number;
  };
  deductions: {
    inss: number;
    irrf: number;
    transportTicket: number;
    other: number;
  };
  netSalary: number;
  status: 'draft' | 'approved' | 'paid';
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VacationRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  reason?: string;
  notes?: string;
}

export interface TimeTracking {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  breakStart?: string;
  breakEnd?: string;
  totalHours: number;
  overtimeHours: number;
  status: 'present' | 'absent' | 'late' | 'half_day';
  notes?: string;
}

// Tipos para Gamificação
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  category: 'sales' | 'leads' | 'visits' | 'conversion' | 'special';
  requirement: number;
  unlockedAt?: string;
}

export interface AgentRanking {
  agentId: string;
  agentName: string;
  position: number;
  points: number;
  sales: number;
  conversionRate: number;
  avatar?: string;
}

export interface PersonalGoal {
  id: string;
  agentId: string;
  type: 'monthly_sales' | 'monthly_leads' | 'conversion_rate' | 'commission_target';
  target: number;
  current: number;
  period: string;
  status: 'active' | 'completed' | 'failed';
  reward?: string;
}

// Tipos para CRM Pessoal
export interface PersonalContact {
  id: string;
  agentId: string;
  name: string;
  email?: string;
  phone?: string;
  type: 'client' | 'prospect' | 'referral';
  source: string;
  status: 'active' | 'inactive' | 'converted';
  lastContact: string;
  notes: string;
  tags: string[];
  createdAt: string;
}

export interface PersonalInteraction {
  id: string;
  contactId: string;
  agentId: string;
  type: 'call' | 'email' | 'visit' | 'meeting' | 'whatsapp';
  description: string;
  date: string;
  outcome: 'positive' | 'neutral' | 'negative';
  nextAction?: string;
  nextActionDate?: string;
}

// Tipos para Dashboard Executivo
export interface TeamPerformance {
  agentId: string;
  agentName: string;
  sales: number;
  leads: number;
  conversionRate: number;
  commission: number;
  ranking: number;
  goals: PersonalGoal[];
  achievements: Achievement[];
}

export interface ExecutiveMetrics {
  totalSales: number;
  totalLeads: number;
  averageConversion: number;
  topPerformers: TeamPerformance[];
  teamGoals: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  marketInsights: {
    trend: 'up' | 'down' | 'stable';
    seasonality: string;
    recommendations: string[];
  };
}

// Tipos para Sistema de Apresentações Executivas
export interface PresentationSlide {
  id: string;
  type: 'title' | 'metrics' | 'chart' | 'team' | 'goals' | 'custom';
  title: string;
  content: {
    text?: string;
    metrics?: {
      label: string;
      value: string | number;
      change?: number;
      trend?: 'up' | 'down' | 'stable';
    }[];
    chartType?: 'bar' | 'line' | 'pie' | 'area';
    chartData?: any[];
    teamData?: TeamPerformance[];
    goalsData?: {
      period: string;
      target: number;
      achieved: number;
      percentage: number;
    }[];
  };
  layout: 'full' | 'half' | 'quarter';
  position: number;
  backgroundColor?: string;
  textColor?: string;
}

export interface PresentationTemplate {
  id: string;
  name: string;
  description: string;
  category: 'executive' | 'monthly' | 'quarterly' | 'annual' | 'custom';
  slides: Omit<PresentationSlide, 'id'>[];
  thumbnail: string;
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
}

export interface Presentation {
  id: string;
  name: string;
  description: string;
  templateId?: string;
  slides: PresentationSlide[];
  ownerId: string;
  ownerRole: 'owner' | 'manager';
  status: 'draft' | 'published' | 'archived';
  lastPresented?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PresentationSettings {
  theme: 'corporate' | 'modern' | 'minimal' | 'colorful';
  logo?: string;
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: 'default' | 'serif' | 'sans-serif';
  autoRefresh: boolean;
  refreshInterval: number; // em minutos
}

// Tipos para Sistema de Gestão de Equipes
export interface Team {
  id: string;
  name: string;
  description: string;
  managerId: string;
  managerName: string;
  agents: TeamAgent[];
  goals: TeamGoal[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  color: string; // cor para identificação visual
}

export interface TeamAgent {
  agentId: string;
  agentName: string;
  role: 'leader' | 'member' | 'trainee';
  joinedAt: string;
  isActive: boolean;
  performance: {
    sales: number;
    leads: number;
    conversionRate: number;
    commission: number;
  };
}

export interface TeamGoal {
  id: string;
  teamId: string;
  type: 'monthly_sales' | 'monthly_leads' | 'conversion_rate' | 'revenue';
  target: number;
  current: number;
  period: string;
  status: 'active' | 'completed' | 'failed';
  reward?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamPerformanceMetrics {
  teamId: string;
  teamName: string;
  totalSales: number;
  totalLeads: number;
  averageConversion: number;
  totalCommission: number;
  agentsCount: number;
  ranking: number;
  goals: TeamGoal[];
  topPerformers: TeamAgent[];
  monthlyGrowth: number;
  lastUpdated: string;
}

export interface TeamAssignment {
  id: string;
  agentId: string;
  agentName: string;
  teamId: string;
  teamName: string;
  assignedBy: string;
  assignedAt: string;
  status: 'active' | 'inactive' | 'transferred';
  notes?: string;
}
