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