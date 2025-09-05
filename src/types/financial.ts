export interface FinancialEntry {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid' | 'overdue';
  propertyId?: string;
  agentId?: string;
  dealId?: string;
  tags?: string[];
}

export interface Commission {
  id: string;
  agentId: string;
  agentName: string;
  dealId: string;
  propertyId: string;
  propertyTitle: string;
  dealType: 'sale' | 'rent';
  dealValue: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'pending' | 'paid' | 'cancelled';
  dueDate: string;
  paidDate?: string;
  notes?: string;
}

export interface CashFlowEntry {
  id: string;
  date: string;
  income: number;
  expense: number;
  balance: number;
  description: string;
  category: string;
}

export interface FinancialMetrics {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  pendingCommissions: number;
  overduePayments: number;
  monthlyGrowth: number;
  topCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

export interface AgentFinancialSummary {
  agentId: string;
  agentName: string;
  totalCommissions: number;
  pendingCommissions: number;
  paidCommissions: number;
  dealsClosed: number;
  conversionRate: number;
  averageDealValue: number;
  ranking: number;
}

export interface Visit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  agentId: string;
  agentName: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  scheduledDate: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  feedback?: string;
  rating?: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'visit_scheduled' | 'proposal' | 'closed' | 'lost';
  source: string;
  assignedAgentId: string;
  assignedAgentName: string;
  propertyPreferences: {
    type: string[];
    minPrice: number;
    maxPrice: number;
    neighborhoods: string[];
    bedrooms: number;
    bathrooms: number;
  };
  lastContact: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentDashboard {
  agentId: string;
  agentName: string;
  totalLeads: number;
  activeLeads: number;
  visitsScheduled: number;
  dealsClosed: number;
  totalCommissions: number;
  pendingCommissions: number;
  conversionRate: number;
  ranking: number;
  recentActivities: Array<{
    type: 'lead' | 'visit' | 'deal' | 'commission';
    description: string;
    date: string;
    value?: number;
  }>;
}

// Novos tipos para Financeiro expandido
export interface Supplier {
  id: string;
  name: string;
  cnpj?: string;
  cpf?: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  category: 'services' | 'products' | 'utilities' | 'marketing' | 'other';
  paymentTerms: number; // dias para pagamento
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface AccountsPayable {
  id: string;
  supplierId: string;
  supplierName: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  category: string;
  installments?: {
    current: number;
    total: number;
  };
  paidAt?: string;
  paidAmount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountsReceivable {
  id: string;
  clientId: string;
  clientName: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  category: 'rent' | 'commission' | 'service' | 'other';
  propertyId?: string;
  propertyTitle?: string;
  paidAt?: string;
  paidAmount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  year: number;
  month: number;
  category: string;
  plannedAmount: number;
  actualAmount: number;
  variance: number;
  variancePercentage: number;
  status: 'on_track' | 'over_budget' | 'under_budget';
  createdAt: string;
  updatedAt: string;
}

export interface BudgetPlan {
  id: string;
  year: number;
  department: string;
  totalBudget: number;
  categories: Array<{
    category: string;
    plannedAmount: number;
    actualAmount: number;
    variance: number;
  }>;
  status: 'draft' | 'approved' | 'active';
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialReport {
  id: string;
  type: 'dre' | 'balance_sheet' | 'cash_flow' | 'profit_loss';
  period: string;
  title: string;
  data: any; // Estrutura específica para cada tipo de relatório
  status: 'draft' | 'final';
  generatedBy: string;
  generatedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Asset {
  id: string;
  name: string;
  category: 'property' | 'equipment' | 'vehicle' | 'furniture' | 'investment';
  description: string;
  purchaseDate: string;
  purchaseValue: number;
  currentValue: number;
  depreciationRate: number;
  accumulatedDepreciation: number;
  location: string;
  responsible: string;
  status: 'active' | 'inactive' | 'sold' | 'disposed';
  insurance?: {
    company: string;
    policy: string;
    value: number;
    expiry: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'funds' | 'real_estate' | 'cdb' | 'other';
  description: string;
  amount: number;
  currentValue: number;
  returnRate: number;
  purchaseDate: string;
  maturityDate?: string;
  risk: 'low' | 'medium' | 'high';
  status: 'active' | 'matured' | 'sold';
  broker?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tax {
  id: string;
  name: string;
  type: 'federal' | 'state' | 'municipal';
  description: string;
  rate: number;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  referencePeriod: string;
  paidAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaxPlanning {
  id: string;
  year: number;
  totalTaxes: number;
  federalTaxes: number;
  stateTaxes: number;
  municipalTaxes: number;
  savings: number;
  strategies: string[];
  status: 'draft' | 'approved' | 'implemented';
  createdAt: string;
  updatedAt: string;
}