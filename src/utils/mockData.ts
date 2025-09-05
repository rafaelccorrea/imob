// Dados mockados para demonstração do sistema
import type { User, UserRole } from '../types';

export const mockUsers: User[] = [
  {
    id: '0',
    name: 'Administrador',
    email: 'admin@imob.com',
    role: 'owner' as UserRole,
    phone: '(11) 99999-9999',
    isActive: true,
    createdAt: new Date('2023-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '1',
    name: 'João Silva',
    email: 'owner@imob.com',
    role: 'owner' as UserRole,
    phone: '(11) 99999-9999',
    isActive: true,
    createdAt: new Date('2023-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'manager@imob.com',
    role: 'manager' as UserRole,
    phone: '(11) 88888-8888',
    isActive: true,
    createdAt: new Date('2023-02-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '3',
    name: 'Pedro Lima',
    email: 'agent@imob.com',
    role: 'agent' as UserRole,
    phone: '(11) 77777-7777',
    isActive: true,
    createdAt: new Date('2023-03-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'financial@imob.com',
    role: 'financial' as UserRole,
    phone: '(11) 66666-6666',
    isActive: true,
    createdAt: new Date('2023-04-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '5',
    name: 'Carlos Oliveira',
    email: 'hr@imob.com',
    role: 'hr' as UserRole,
    phone: '(11) 55555-5555',
    isActive: true,
    createdAt: new Date('2023-05-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
];

export const mockProperties = [
  {
    id: '1',
    title: 'Casa em Alphaville',
    description: 'Casa moderna com 4 quartos, 3 banheiros, garagem para 2 carros',
    type: 'house' as const,
    status: 'available' as const,
    price: 850000,
    rentPrice: 4500,
    address: {
      street: 'Rua das Palmeiras',
      number: '123',
      complement: 'Casa 1',
      neighborhood: 'Alphaville',
      city: 'Barueri',
      state: 'SP',
      zipCode: '06455-000',
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      parkingSpaces: 2,
      area: 280,
      builtArea: 220,
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
    ],
    responsibleAgentId: '3',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    owner: {
      name: 'Roberto Almeida',
      phone: '(11) 44444-4444',
      email: 'roberto@email.com',
    },
    createdAt: new Date('2023-12-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    title: 'Apartamento no Centro',
    description: 'Apartamento bem localizado, próximo ao metrô',
    type: 'apartment' as const,
    status: 'rented' as const,
    price: 350000,
    rentPrice: 2500,
    address: {
      street: 'Rua Augusta',
      number: '456',
      complement: 'Apto 101',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-000',
    },
    features: {
      bedrooms: 2,
      bathrooms: 1,
      parkingSpaces: 1,
      area: 65,
      builtArea: 55,
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    ],
    responsibleAgentId: '3',
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    owner: {
      name: 'Fernanda Lima',
      phone: '(11) 33333-3333',
      email: 'fernanda@email.com',
    },
    createdAt: new Date('2023-11-15').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '3',
    title: 'Loja Comercial',
    description: 'Loja em localização privilegiada, ideal para comércio',
    type: 'commercial' as const,
    status: 'sold' as const,
    price: 1200000,
    address: {
      street: 'Rua Oscar Freire',
      number: '789',
      complement: 'Loja 1',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-003',
    },
    features: {
      bedrooms: 0,
      bathrooms: 1,
      parkingSpaces: 0,
      area: 120,
      builtArea: 100,
    },
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
    ],
    responsibleAgentId: '3',
    bedrooms: 0,
    bathrooms: 1,
    area: 120,
    owner: {
      name: 'Carlos Oliveira',
      phone: '(11) 22222-2222',
      email: 'carlos@email.com',
    },
    createdAt: new Date('2023-10-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
];

export const mockLeads = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    status: 'new',
    source: 'website',
    assignedAgentId: '3',
    interests: {
      propertyTypes: ['house', 'apartment'],
      neighborhoods: ['Alphaville', 'Vila Madalena'],
      maxPrice: 1000000,
      minBedrooms: 3,
    },
    notes: ['Interessado em casas com garagem'],
    lastContact: new Date('2024-01-10'),
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(11) 88888-8888',
    status: 'contacted',
    source: 'social_media',
    assignedAgentId: '3',
    interests: {
      propertyTypes: ['apartment'],
      neighborhoods: ['Centro', 'Vila Madalena'],
      maxPrice: 400000,
      minBedrooms: 2,
    },
    notes: ['Prefere apartamentos novos'],
    lastContact: new Date('2024-01-12'),
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos@email.com',
    phone: '(11) 77777-7777',
    status: 'visit_scheduled',
    source: 'referral',
    assignedAgentId: '3',
    interests: {
      propertyTypes: ['commercial'],
      neighborhoods: ['Jardins', 'Vila Madalena'],
      maxPrice: 1500000,
      minBedrooms: 0,
    },
    notes: ['Procurando loja para restaurante'],
    lastContact: new Date('2024-01-14'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-14'),
  },
];

export const mockDeals = [
  {
    id: '1',
    type: 'sale' as const,
    status: 'signed' as const,
    propertyId: '3',
    clientId: '1',
    agentId: '3',
    value: 1200000,
    commission: 36000,
    documents: ['contrato.pdf', 'documentos.pdf'],
    notes: ['Venda finalizada com sucesso'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    signedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    type: 'rent',
    status: 'negotiating',
    propertyId: '2',
    clientId: '2',
    agentId: '3',
    value: 2500,
    commission: 750,
    documents: ['proposta.pdf'],
    notes: ['Aguardando aprovação do proprietário'],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
];

export const mockTransactions = [
  {
    id: '1',
    type: 'income',
    category: 'sale',
    description: 'Venda da Loja Comercial',
    amount: 1200000,
    date: new Date('2024-01-15'),
    relatedDealId: '1',
    relatedPropertyId: '3',
    createdBy: '3',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    type: 'expense',
    category: 'commission',
    description: 'Comissão da venda da Loja Comercial',
    amount: 36000,
    date: new Date('2024-01-15'),
    relatedDealId: '1',
    createdBy: '4',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    type: 'income',
    category: 'rent',
    description: 'Aluguel do Apartamento Centro',
    amount: 2500,
    date: new Date('2024-01-01'),
    relatedPropertyId: '2',
    createdBy: '4',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockCommissions = [
  {
    id: '1',
    agentId: '3',
    dealId: '1',
    amount: 36000,
    status: 'paid',
    dueDate: new Date('2024-01-15'),
    paidAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    agentId: '3',
    dealId: '2',
    amount: 750,
    status: 'pending',
    dueDate: new Date('2024-02-01'),
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
];

export const mockEmployees = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@imob.com',
    phone: '(11) 99999-9999',
    position: 'Corretor',
    department: 'Vendas',
    salary: 3000,
    hireDate: new Date('2023-01-01'),
    isActive: true,
    documents: {
      contract: 'contrato_joao.pdf',
      idCard: 'rg_joao.pdf',
      medicalExam: 'exame_joao.pdf',
    },
    createdAt: new Date('2023-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@imob.com',
    phone: '(11) 88888-8888',
    position: 'Gestora',
    department: 'Administrativo',
    salary: 5000,
    hireDate: new Date('2023-02-01'),
    isActive: true,
    documents: {
      contract: 'contrato_maria.pdf',
      idCard: 'rg_maria.pdf',
      medicalExam: 'exame_maria.pdf',
    },
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Dados mock para sistema financeiro avançado
import type { 
  FinancialEntry, 
  Commission as FinancialCommission, 
  CashFlowEntry, 
  FinancialMetrics, 
  AgentFinancialSummary,
  Visit as FinancialVisit,
  Lead as FinancialLead,
  AgentDashboard as FinancialAgentDashboard
} from '../types/financial';

export const mockFinancialEntries: FinancialEntry[] = [
  {
    id: 'fe1',
    type: 'income',
    category: 'Aluguel',
    description: 'Aluguel Apartamento Centro - Rua A, 123',
    amount: 2500,
    date: '2024-01-15',
    status: 'paid',
    propertyId: 'prop1',
    agentId: '3',
    tags: ['recorrente', 'aluguel']
  },
  {
    id: 'fe2',
    type: 'income',
    category: 'Venda',
    description: 'Comissão Venda Casa Jardins - Rua B, 456',
    amount: 15000,
    date: '2024-01-20',
    status: 'paid',
    propertyId: 'prop2',
    agentId: '3',
    dealId: 'deal1',
    tags: ['comissão', 'venda']
  },
  {
    id: 'fe3',
    type: 'expense',
    category: 'Comissão',
    description: 'Pagamento Comissão Pedro Lima - Venda Casa Jardins',
    amount: 15000,
    date: '2024-01-25',
    status: 'paid',
    agentId: '3',
    dealId: 'deal1',
    tags: ['comissão', 'pagamento']
  },
  {
    id: 'fe4',
    type: 'expense',
    category: 'Salário',
    description: 'Salário Janeiro - Equipe',
    amount: 25000,
    date: '2024-01-31',
    status: 'paid',
    tags: ['salário', 'recorrente']
  },
  {
    id: 'fe5',
    type: 'expense',
    category: 'Marketing',
    description: 'Campanha Facebook - Janeiro',
    amount: 3000,
    date: '2024-01-10',
    status: 'paid',
    tags: ['marketing', 'digital']
  },
  {
    id: 'fe6',
    type: 'income',
    category: 'Taxa',
    description: 'Taxa de Administração - Apartamento Centro',
    amount: 250,
    date: '2024-01-15',
    status: 'pending',
    propertyId: 'prop1',
    tags: ['taxa', 'administração']
  }
];

export const mockFinancialCommissions: FinancialCommission[] = [
  {
    id: 'fc1',
    agentId: '3',
    agentName: 'Pedro Lima',
    dealId: 'deal1',
    propertyId: 'prop2',
    propertyTitle: 'Casa Jardins - Rua B, 456',
    dealType: 'sale',
    dealValue: 500000,
    commissionRate: 0.03,
    commissionAmount: 15000,
    status: 'paid',
    dueDate: '2024-01-25',
    paidDate: '2024-01-25',
    notes: 'Comissão paga conforme acordo'
  },
  {
    id: 'fc2',
    agentId: '3',
    agentName: 'Pedro Lima',
    dealId: 'deal2',
    propertyId: 'prop3',
    propertyTitle: 'Apartamento Centro - Rua C, 789',
    dealType: 'rent',
    dealValue: 2500,
    commissionRate: 0.1,
    commissionAmount: 250,
    status: 'pending',
    dueDate: '2024-02-15',
    notes: 'Aguardando confirmação do pagamento'
  },
  {
    id: 'fc3',
    agentId: '5',
    agentName: 'Carlos Oliveira',
    dealId: 'deal3',
    propertyId: 'prop4',
    propertyTitle: 'Casa Vila Madalena - Rua D, 101',
    dealType: 'sale',
    dealValue: 750000,
    commissionRate: 0.03,
    commissionAmount: 22500,
    status: 'pending',
    dueDate: '2024-02-20',
    notes: 'Negócio fechado, aguardando documentação'
  }
];

export const mockCashFlowEntries: CashFlowEntry[] = [
  {
    id: 'cfe1',
    date: '2024-01-01',
    income: 2500,
    expense: 0,
    balance: 2500,
    description: 'Saldo inicial',
    category: 'Inicial'
  },
  {
    id: 'cfe2',
    date: '2024-01-15',
    income: 2500,
    expense: 0,
    balance: 5000,
    description: 'Aluguel Apartamento Centro',
    category: 'Aluguel'
  },
  {
    id: 'cfe3',
    date: '2024-01-20',
    income: 15000,
    expense: 0,
    balance: 20000,
    description: 'Comissão Venda Casa Jardins',
    category: 'Comissão'
  },
  {
    id: 'cfe4',
    date: '2024-01-25',
    income: 0,
    expense: 15000,
    balance: 5000,
    description: 'Pagamento Comissão Pedro Lima',
    category: 'Comissão'
  },
  {
    id: 'cfe5',
    date: '2024-01-31',
    income: 0,
    expense: 25000,
    balance: -20000,
    description: 'Salários Janeiro',
    category: 'Salário'
  }
];

export const mockFinancialMetrics: FinancialMetrics = {
  totalIncome: 52500,
  totalExpense: 43000,
  netBalance: 9500,
  pendingCommissions: 22750,
  overduePayments: 0,
  monthlyGrowth: 12.5,
  topCategories: [
    { category: 'Comissões', amount: 37750, percentage: 45.2 },
    { category: 'Aluguéis', amount: 2500, percentage: 3.0 },
    { category: 'Salários', amount: 25000, percentage: 29.9 },
    { category: 'Marketing', amount: 3000, percentage: 3.6 },
    { category: 'Taxas', amount: 250, percentage: 0.3 }
  ]
};

export const mockAgentFinancialSummaries: AgentFinancialSummary[] = [
  {
    agentId: '3',
    agentName: 'Pedro Lima',
    totalCommissions: 15250,
    pendingCommissions: 250,
    paidCommissions: 15000,
    dealsClosed: 2,
    conversionRate: 15.5,
    averageDealValue: 251250,
    ranking: 1
  },
  {
    agentId: '5',
    agentName: 'Carlos Oliveira',
    totalCommissions: 22500,
    pendingCommissions: 22500,
    paidCommissions: 0,
    dealsClosed: 1,
    conversionRate: 8.2,
    averageDealValue: 750000,
    ranking: 2
  }
];

export const mockFinancialVisits: FinancialVisit[] = [
  {
    id: 'fv1',
    propertyId: 'prop1',
    propertyTitle: 'Apartamento Centro - Rua A, 123',
    agentId: '3',
    agentName: 'Pedro Lima',
    clientId: 'client1',
    clientName: 'João Silva',
    clientPhone: '(11) 99999-1111',
    clientEmail: 'joao@email.com',
    scheduledDate: '2024-02-15T14:00:00',
    status: 'scheduled',
    notes: 'Cliente interessado em apartamento de 2 quartos'
  },
  {
    id: 'fv2',
    propertyId: 'prop2',
    propertyTitle: 'Casa Jardins - Rua B, 456',
    agentId: '3',
    agentName: 'Pedro Lima',
    clientId: 'client2',
    clientName: 'Maria Santos',
    clientPhone: '(11) 99999-2222',
    clientEmail: 'maria@email.com',
    scheduledDate: '2024-02-10T10:00:00',
    status: 'completed',
    notes: 'Visita realizada com sucesso',
    feedback: 'Cliente muito interessado, aguardando proposta',
    rating: 5
  }
];

export const mockFinancialLeads: FinancialLead[] = [
  {
    id: 'fl1',
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(11) 99999-3333',
    status: 'new',
    source: 'Website',
    assignedAgentId: '3',
    assignedAgentName: 'Pedro Lima',
    propertyPreferences: {
      type: ['apartment'],
      minPrice: 200000,
      maxPrice: 400000,
      neighborhoods: ['Centro', 'Jardins'],
      bedrooms: 2,
      bathrooms: 1
    },
    lastContact: '2024-02-01T10:00:00',
    notes: 'Cliente procura apartamento para investimento',
    createdAt: '2024-02-01T10:00:00',
    updatedAt: '2024-02-01T10:00:00'
  },
  {
    id: 'fl2',
    name: 'Roberto Silva',
    email: 'roberto@email.com',
    phone: '(11) 99999-4444',
    status: 'visit_scheduled',
    source: 'Indicação',
    assignedAgentId: '5',
    assignedAgentName: 'Carlos Oliveira',
    propertyPreferences: {
      type: ['house'],
      minPrice: 500000,
      maxPrice: 800000,
      neighborhoods: ['Vila Madalena', 'Pinheiros'],
      bedrooms: 3,
      bathrooms: 2
    },
    lastContact: '2024-02-05T15:30:00',
    notes: 'Família com filhos, procura casa com quintal',
    createdAt: '2024-02-05T15:30:00',
    updatedAt: '2024-02-05T15:30:00'
  }
];

export const mockFinancialAgentDashboard: FinancialAgentDashboard = {
  agentId: '3',
  agentName: 'Pedro Lima',
  totalLeads: 15,
  activeLeads: 8,
  visitsScheduled: 5,
  dealsClosed: 2,
  totalCommissions: 15250,
  pendingCommissions: 250,
  conversionRate: 15.5,
  ranking: 1,
  recentActivities: [
    {
      type: 'deal',
      description: 'Venda Casa Jardins - R$ 500.000',
      date: '2024-01-20T16:00:00',
      value: 500000
    },
    {
      type: 'visit',
      description: 'Visita Apartamento Centro com João Silva',
      date: '2024-02-10T14:00:00'
    },
    {
      type: 'lead',
      description: 'Novo lead: Ana Costa - Apartamento Centro',
      date: '2024-02-01T10:00:00'
    },
    {
      type: 'commission',
      description: 'Comissão paga - Casa Jardins',
      date: '2024-01-25T10:00:00',
      value: 15000
    }
  ]
};
