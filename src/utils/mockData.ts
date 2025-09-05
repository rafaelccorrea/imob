// Dados mockados para demonstração do sistema
import type { 
  User, 
  UserRole,
  Achievement,
  AgentRanking,
  PersonalGoal,
  PersonalContact,
  PersonalInteraction,
  TeamPerformance,
  TeamPerformanceMetrics,
  ExecutiveMetrics,
  PresentationSlide,
  PresentationTemplate,
  Presentation,
  PresentationSettings,
  Team,
  TeamAgent,
  TeamGoal,
  TeamAssignment
} from '../types';

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
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
    signedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    type: 'rent' as const,
    status: 'negotiating' as const,
    propertyId: '2',
    clientId: '2',
    agentId: '3',
    value: 2500,
    commission: 750,
    documents: ['proposta.pdf'],
    notes: ['Aguardando aprovação do proprietário'],
    createdAt: new Date('2024-01-14').toISOString(),
    updatedAt: new Date('2024-01-14').toISOString(),
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
      workCard: 'ctps_joao.pdf',
      bankAccount: 'dados_bancarios_joao.pdf',
    },
    benefits: {
      healthInsurance: true,
      mealTicket: 500,
      transportTicket: 200,
      gymPass: true,
      lifeInsurance: true,
    },
    emergencyContact: {
      name: 'Ana Silva',
      phone: '(11) 99999-8888',
      relationship: 'Esposa',
    },
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000-000',
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
      workCard: 'ctps_maria.pdf',
      bankAccount: 'dados_bancarios_maria.pdf',
    },
    benefits: {
      healthInsurance: true,
      mealTicket: 600,
      transportTicket: 200,
      gymPass: false,
      lifeInsurance: true,
    },
    emergencyContact: {
      name: 'Carlos Santos',
      phone: '(11) 88888-7777',
      relationship: 'Marido',
    },
    address: {
      street: 'Av. Paulista',
      number: '1000',
      complement: 'Conjunto 501',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
    },
    createdAt: new Date('2023-02-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
];

// Dados mock para RH expandido
import type { 
  JobPosition, 
  Candidate, 
  Interview, 
  PerformanceReview, 
  Training, 
  EmployeeTraining, 
  Payroll, 
  VacationRequest, 
  TimeTracking 
} from '../types';

export const mockJobPositions: JobPosition[] = [
  {
    id: 'jp1',
    title: 'Corretor de Imóveis',
    department: 'Vendas',
    description: 'Responsável por intermediar vendas e locações de imóveis',
    requirements: [
      'CRECI ativo',
      'Experiência mínima de 2 anos',
      'Conhecimento em imóveis comerciais e residenciais',
      'Boa comunicação e relacionamento interpessoal'
    ],
    salaryRange: { min: 2500, max: 5000 },
    status: 'open',
    createdBy: '2',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'jp2',
    title: 'Assistente Administrativo',
    department: 'Administrativo',
    description: 'Suporte administrativo e atendimento ao cliente',
    requirements: [
      'Ensino médio completo',
      'Conhecimento em informática',
      'Experiência com atendimento ao cliente',
      'Organização e proatividade'
    ],
    salaryRange: { min: 1800, max: 2500 },
    status: 'open',
    createdBy: '2',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: 'c1',
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    phone: '(11) 77777-7777',
    position: 'Corretor de Imóveis',
    resume: 'curriculo_pedro.pdf',
    status: 'interview',
    interviewDate: '2024-02-20T14:00:00',
    notes: ['CRECI ativo', 'Experiência em vendas'],
    score: 8.5,
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString(),
  },
  {
    id: 'c2',
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(11) 66666-6666',
    position: 'Assistente Administrativo',
    resume: 'curriculo_ana.pdf',
    status: 'screening',
    notes: ['Recém formada', 'Estagiou em imobiliária'],
    score: 7.0,
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString(),
  }
];

export const mockInterviews: Interview[] = [
  {
    id: 'i1',
    candidateId: 'c1',
    candidateName: 'Pedro Oliveira',
    position: 'Corretor de Imóveis',
    interviewerId: '2',
    interviewerName: 'Maria Santos',
    scheduledDate: '2024-02-20T14:00:00',
    status: 'scheduled',
    notes: ['Entrevista técnica', 'Avaliação de portfólio'],
    createdAt: new Date('2024-02-15').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString(),
  }
];

export const mockPerformanceReviews: PerformanceReview[] = [
  {
    id: 'pr1',
    employeeId: '1',
    employeeName: 'João Silva',
    reviewerId: '2',
    reviewerName: 'Maria Santos',
    period: '2024-Q1',
    goals: [
      {
        id: 'g1',
        description: 'Fechar 5 vendas no trimestre',
        target: 5,
        achieved: 4,
        weight: 40
      },
      {
        id: 'g2',
        description: 'Manter taxa de conversão acima de 15%',
        target: 15,
        achieved: 18,
        weight: 30
      },
      {
        id: 'g3',
        description: 'Atender 50 leads qualificados',
        target: 50,
        achieved: 45,
        weight: 30
      }
    ],
    competencies: [
      {
        id: 'c1',
        name: 'Comunicação',
        rating: 4,
        comments: 'Excelente comunicação com clientes'
      },
      {
        id: 'c2',
        name: 'Negociação',
        rating: 5,
        comments: 'Habilidade excepcional em negociação'
      },
      {
        id: 'c3',
        name: 'Proatividade',
        rating: 4,
        comments: 'Sempre busca novas oportunidades'
      }
    ],
    overallScore: 4.2,
    strengths: ['Excelente relacionamento com clientes', 'Conhecimento técnico sólido'],
    improvements: ['Melhorar follow-up pós-venda', 'Organizar melhor a agenda'],
    developmentPlan: ['Curso de técnicas avançadas de vendas', 'Workshop de CRM'],
    status: 'approved',
    createdAt: new Date('2024-03-31').toISOString(),
    updatedAt: new Date('2024-04-05').toISOString(),
  }
];

export const mockTrainings: Training[] = [
  {
    id: 't1',
    title: 'Técnicas Avançadas de Vendas',
    description: 'Curso completo sobre técnicas de vendas imobiliárias',
    type: 'mandatory',
    duration: 40,
    provider: 'CRECI-SP',
    cost: 500,
    status: 'active',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 't2',
    title: 'Gestão de CRM',
    description: 'Aprenda a usar sistemas de CRM para vendas',
    type: 'optional',
    duration: 20,
    provider: 'Tech Solutions',
    cost: 300,
    status: 'active',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  }
];

export const mockEmployeeTrainings: EmployeeTraining[] = [
  {
    id: 'et1',
    employeeId: '1',
    employeeName: 'João Silva',
    trainingId: 't1',
    trainingTitle: 'Técnicas Avançadas de Vendas',
    status: 'completed',
    startDate: '2024-01-15',
    completionDate: '2024-02-15',
    score: 9.2,
    certificate: 'certificado_joao_vendas.pdf',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString(),
  }
];

export const mockPayrolls: Payroll[] = [
  {
    id: 'p1',
    employeeId: '1',
    employeeName: 'João Silva',
    period: '2024-01',
    grossSalary: 3000,
    benefits: {
      healthInsurance: 200,
      mealTicket: 500,
      transportTicket: 200,
      gymPass: 100,
      lifeInsurance: 50,
    },
    deductions: {
      inss: 330,
      irrf: 150,
      transportTicket: 200,
      other: 0,
    },
    netSalary: 3120,
    status: 'paid',
    paidAt: '2024-02-05',
    createdAt: new Date('2024-01-31').toISOString(),
    updatedAt: new Date('2024-02-05').toISOString(),
  }
];

export const mockVacationRequests: VacationRequest[] = [
  {
    id: 'vr1',
    employeeId: '1',
    employeeName: 'João Silva',
    startDate: '2024-03-15',
    endDate: '2024-03-29',
    days: 15,
    status: 'approved',
    requestedAt: '2024-02-01',
    approvedBy: '2',
    approvedAt: '2024-02-05',
    reason: 'Férias anuais',
    notes: 'Aprovado pelo gestor',
  }
];

export const mockTimeTracking: TimeTracking[] = [
  {
    id: 'tt1',
    employeeId: '1',
    employeeName: 'João Silva',
    date: '2024-02-15',
    checkIn: '08:00',
    checkOut: '18:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    totalHours: 9,
    overtimeHours: 1,
    status: 'present',
    notes: 'Horário normal',
  }
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

// Dados mock para sistema financeiro expandido
export const mockSuppliers: Supplier[] = [
  {
    id: 's1',
    name: 'Tech Solutions Ltda',
    cnpj: '12.345.678/0001-90',
    email: 'contato@techsolutions.com',
    phone: '(11) 3333-3333',
    address: {
      street: 'Rua da Tecnologia',
      number: '100',
      neighborhood: 'Vila Tech',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
    },
    category: 'services',
    paymentTerms: 30,
    status: 'active',
    createdAt: new Date('2023-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 's2',
    name: 'Marketing Digital Pro',
    cnpj: '98.765.432/0001-10',
    email: 'contato@marketingpro.com',
    phone: '(11) 4444-4444',
    address: {
      street: 'Av. Marketing',
      number: '200',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000-000',
    },
    category: 'marketing',
    paymentTerms: 15,
    status: 'active',
    createdAt: new Date('2023-02-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  }
];

export const mockAccountsPayable: AccountsPayable[] = [
  {
    id: 'ap1',
    supplierId: 's1',
    supplierName: 'Tech Solutions Ltda',
    description: 'Manutenção sistema CRM',
    amount: 2500,
    dueDate: '2024-02-15',
    status: 'pending',
    category: 'Serviços',
    notes: 'Manutenção mensal',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'ap2',
    supplierId: 's2',
    supplierName: 'Marketing Digital Pro',
    description: 'Campanha Facebook Janeiro',
    amount: 3000,
    dueDate: '2024-02-10',
    status: 'paid',
    category: 'Marketing',
    paidAt: '2024-02-08',
    paidAmount: 3000,
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-02-08').toISOString(),
  }
];

export const mockAccountsReceivable: AccountsReceivable[] = [
  {
    id: 'ar1',
    clientId: 'client1',
    clientName: 'João Silva',
    description: 'Aluguel Apartamento Centro',
    amount: 2500,
    dueDate: '2024-02-15',
    status: 'pending',
    category: 'rent',
    propertyId: 'prop1',
    propertyTitle: 'Apartamento Centro - Rua A, 123',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'ar2',
    clientId: 'client2',
    clientName: 'Maria Santos',
    description: 'Comissão Venda Casa Jardins',
    amount: 15000,
    dueDate: '2024-02-20',
    status: 'paid',
    category: 'commission',
    propertyId: 'prop2',
    propertyTitle: 'Casa Jardins - Rua B, 456',
    paidAt: '2024-02-18',
    paidAmount: 15000,
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-02-18').toISOString(),
  }
];

export const mockBudgets: Budget[] = [
  {
    id: 'b1',
    year: 2024,
    month: 1,
    category: 'Marketing',
    plannedAmount: 5000,
    actualAmount: 3000,
    variance: -2000,
    variancePercentage: -40,
    status: 'under_budget',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-31').toISOString(),
  },
  {
    id: 'b2',
    year: 2024,
    month: 1,
    category: 'Salários',
    plannedAmount: 25000,
    actualAmount: 25000,
    variance: 0,
    variancePercentage: 0,
    status: 'on_track',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-31').toISOString(),
  }
];

export const mockBudgetPlans: BudgetPlan[] = [
  {
    id: 'bp1',
    year: 2024,
    department: 'Vendas',
    totalBudget: 100000,
    categories: [
      { category: 'Comissões', plannedAmount: 60000, actualAmount: 45000, variance: -15000 },
      { category: 'Marketing', plannedAmount: 20000, actualAmount: 15000, variance: -5000 },
      { category: 'Treinamentos', plannedAmount: 10000, actualAmount: 8000, variance: -2000 },
      { category: 'Equipamentos', plannedAmount: 10000, actualAmount: 12000, variance: 2000 },
    ],
    status: 'active',
    approvedBy: '1',
    approvedAt: '2023-12-15',
    createdAt: new Date('2023-12-01').toISOString(),
    updatedAt: new Date('2024-01-31').toISOString(),
  }
];

export const mockAssets: Asset[] = [
  {
    id: 'a1',
    name: 'Escritório Principal',
    category: 'property',
    description: 'Escritório sede da imobiliária',
    purchaseDate: '2020-01-01',
    purchaseValue: 500000,
    currentValue: 600000,
    depreciationRate: 2.5,
    accumulatedDepreciation: 50000,
    location: 'Centro - São Paulo',
    responsible: 'Maria Santos',
    status: 'active',
    insurance: {
      company: 'Seguradora ABC',
      policy: 'POL-123456',
      value: 600000,
      expiry: '2024-12-31',
    },
    createdAt: new Date('2020-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'a2',
    name: 'Computador Dell',
    category: 'equipment',
    description: 'Workstation para corretor',
    purchaseDate: '2023-06-01',
    purchaseValue: 8000,
    currentValue: 6000,
    depreciationRate: 20,
    accumulatedDepreciation: 1600,
    location: 'Escritório Principal',
    responsible: 'João Silva',
    status: 'active',
    createdAt: new Date('2023-06-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  }
];

export const mockInvestments: Investment[] = [
  {
    id: 'inv1',
    name: 'CDB Banco XYZ',
    type: 'cdb',
    description: 'CDB 110% CDI',
    amount: 100000,
    currentValue: 105000,
    returnRate: 12.5,
    purchaseDate: '2023-01-01',
    maturityDate: '2024-12-31',
    risk: 'low',
    status: 'active',
    broker: 'Corretora ABC',
    createdAt: new Date('2023-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'inv2',
    name: 'Fundo Imobiliário',
    type: 'funds',
    description: 'FII de shoppings',
    amount: 50000,
    currentValue: 52000,
    returnRate: 8.2,
    purchaseDate: '2023-03-01',
    risk: 'medium',
    status: 'active',
    broker: 'Corretora XYZ',
    createdAt: new Date('2023-03-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  }
];

export const mockTaxes: Tax[] = [
  {
    id: 'tax1',
    name: 'IRPJ',
    type: 'federal',
    description: 'Imposto de Renda Pessoa Jurídica',
    rate: 15,
    amount: 15000,
    dueDate: '2024-03-31',
    status: 'pending',
    referencePeriod: '2024-01',
    createdAt: new Date('2024-01-31').toISOString(),
    updatedAt: new Date('2024-01-31').toISOString(),
  },
  {
    id: 'tax2',
    name: 'ISS',
    type: 'municipal',
    description: 'Imposto sobre Serviços',
    rate: 5,
    amount: 5000,
    dueDate: '2024-02-10',
    status: 'paid',
    referencePeriod: '2024-01',
    paidAt: '2024-02-08',
    createdAt: new Date('2024-01-31').toISOString(),
    updatedAt: new Date('2024-02-08').toISOString(),
  }
];

export const mockTaxPlanning: TaxPlanning[] = [
  {
    id: 'tp1',
    year: 2024,
    totalTaxes: 50000,
    federalTaxes: 30000,
    stateTaxes: 15000,
    municipalTaxes: 5000,
    savings: 8000,
    strategies: [
      'Aproveitar incentivos fiscais',
      'Otimizar estrutura societária',
      'Investir em P&D',
    ],
    status: 'implemented',
    createdAt: new Date('2023-12-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  }
];

// Dados para Gamificação
export const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    name: 'Primeira Venda',
    description: 'Realize sua primeira venda',
    icon: '🎯',
    points: 100,
    category: 'sales',
    requirement: 1,
    unlockedAt: '2024-01-15'
  },
  {
    id: 'ach2',
    name: 'Vendedor do Mês',
    description: 'Seja o melhor vendedor do mês',
    icon: '🏆',
    points: 500,
    category: 'sales',
    requirement: 1
  },
  {
    id: 'ach3',
    name: 'Mestre dos Leads',
    description: 'Converta 10 leads em vendas',
    icon: '🎪',
    points: 300,
    category: 'conversion',
    requirement: 10
  },
  {
    id: 'ach4',
    name: 'Visitante Assíduo',
    description: 'Realize 50 visitas',
    icon: '🚶‍♂️',
    points: 200,
    category: 'visits',
    requirement: 50
  },
  {
    id: 'ach5',
    name: 'Networker',
    description: 'Cadastre 100 contatos',
    icon: '👥',
    points: 150,
    category: 'leads',
    requirement: 100
  }
];

export const mockAgentRankings: AgentRanking[] = [
  {
    agentId: '3',
    agentName: 'Pedro Lima',
    position: 1,
    points: 1250,
    sales: 8,
    conversionRate: 18.5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    agentId: '5',
    agentName: 'Carlos Oliveira',
    position: 2,
    points: 980,
    sales: 6,
    conversionRate: 15.2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    agentId: '7',
    agentName: 'Ana Silva',
    position: 3,
    points: 750,
    sales: 4,
    conversionRate: 12.8,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  }
];

export const mockPersonalGoals: PersonalGoal[] = [
  {
    id: 'goal1',
    agentId: '3',
    type: 'monthly_sales',
    target: 5,
    current: 3,
    period: '2024-02',
    status: 'active',
    reward: 'Bônus de R$ 2.000'
  },
  {
    id: 'goal2',
    agentId: '3',
    type: 'monthly_leads',
    target: 20,
    current: 15,
    period: '2024-02',
    status: 'active',
    reward: 'Dia de folga'
  },
  {
    id: 'goal3',
    agentId: '3',
    type: 'conversion_rate',
    target: 15,
    current: 18.5,
    period: '2024-02',
    status: 'completed',
    reward: 'Vale-presente R$ 500'
  }
];

// Dados para CRM Pessoal
export const mockPersonalContacts: PersonalContact[] = [
  {
    id: 'pc1',
    agentId: '3',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 99999-1111',
    type: 'client',
    source: 'Indicação',
    status: 'active',
    lastContact: '2024-02-15',
    notes: 'Interessada em apartamento de 2 quartos',
    tags: ['alto-potencial', 'centro'],
    createdAt: '2024-01-10'
  },
  {
    id: 'pc2',
    agentId: '3',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-2222',
    type: 'prospect',
    source: 'Site',
    status: 'active',
    lastContact: '2024-02-14',
    notes: 'Procurando casa com quintal',
    tags: ['casa', 'quintal'],
    createdAt: '2024-02-01'
  },
  {
    id: 'pc3',
    agentId: '3',
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(11) 99999-3333',
    type: 'referral',
    source: 'Cliente atual',
    status: 'converted',
    lastContact: '2024-02-10',
    notes: 'Já comprou apartamento',
    tags: ['convertido', 'referência'],
    createdAt: '2024-01-20'
  }
];

export const mockPersonalInteractions: PersonalInteraction[] = [
  {
    id: 'pi1',
    contactId: 'pc1',
    agentId: '3',
    type: 'call',
    description: 'Ligação para agendar visita',
    date: '2024-02-15',
    outcome: 'positive',
    nextAction: 'Visita agendada para sábado',
    nextActionDate: '2024-02-17'
  },
  {
    id: 'pi2',
    contactId: 'pc2',
    agentId: '3',
    type: 'visit',
    description: 'Visita ao apartamento',
    date: '2024-02-14',
    outcome: 'positive',
    nextAction: 'Enviar proposta',
    nextActionDate: '2024-02-16'
  },
  {
    id: 'pi3',
    contactId: 'pc3',
    agentId: '3',
    type: 'whatsapp',
    description: 'Mensagem de agradecimento',
    date: '2024-02-10',
    outcome: 'positive',
    nextAction: 'Pedir indicações',
    nextActionDate: '2024-02-20'
  }
];

// Dados para Dashboard Executivo
export const mockTeamPerformanceData: TeamPerformance[] = [
  {
    agentId: '3',
    agentName: 'Pedro Lima',
    sales: 8,
    leads: 45,
    conversionRate: 18.5,
    commission: 25000,
    ranking: 1,
    goals: mockPersonalGoals.filter(g => g.agentId === '3'),
    achievements: mockAchievements.filter(a => a.unlockedAt)
  },
  {
    agentId: '5',
    agentName: 'Carlos Oliveira',
    sales: 6,
    leads: 38,
    conversionRate: 15.2,
    commission: 18000,
    ranking: 2,
    goals: [],
    achievements: []
  },
  {
    agentId: '7',
    agentName: 'Ana Silva',
    sales: 4,
    leads: 32,
    conversionRate: 12.8,
    commission: 12000,
    ranking: 3,
    goals: [],
    achievements: []
  }
];

export const mockExecutiveMetrics: ExecutiveMetrics = {
  totalSales: 18,
  totalLeads: 115,
  averageConversion: 15.5,
  topPerformers: mockTeamPerformanceData,
  teamGoals: {
    monthly: 25,
    quarterly: 75,
    yearly: 300
  },
  marketInsights: {
    trend: 'up',
    seasonality: 'Alta temporada de vendas no primeiro trimestre',
    recommendations: [
      'Focar em leads de alto valor',
      'Aumentar visitas presenciais',
      'Melhorar follow-up com clientes'
    ]
  }
};

// Dados para Sistema de Apresentações Executivas
export const mockPresentationTemplates: PresentationTemplate[] = [
  {
    id: 'template1',
    name: 'Relatório Executivo Mensal',
    description: 'Template padrão para apresentações mensais da diretoria',
    category: 'executive',
    thumbnail: '/templates/executive-monthly.jpg',
    isDefault: true,
    createdBy: '1',
    createdAt: '2024-01-01',
    slides: [
      {
        type: 'title',
        title: 'Relatório Executivo - Janeiro 2024',
        content: {
          text: 'União Imobiliária - Performance e Resultados'
        },
        layout: 'full',
        position: 1
      },
      {
        type: 'metrics',
        title: 'Principais Indicadores',
        content: {
          metrics: [
            { label: 'Vendas Totais', value: '18', change: 12, trend: 'up' },
            { label: 'Receita Total', value: 'R$ 2.5M', change: 8, trend: 'up' },
            { label: 'Taxa de Conversão', value: '15.5%', change: 2, trend: 'up' },
            { label: 'Novos Leads', value: '115', change: -5, trend: 'down' }
          ]
        },
        layout: 'full',
        position: 2
      },
      {
        type: 'chart',
        title: 'Performance da Equipe',
        content: {
          chartType: 'bar',
          chartData: [
            { name: 'Pedro Lima', sales: 8, leads: 45 },
            { name: 'Carlos Oliveira', sales: 6, leads: 38 },
            { name: 'Ana Silva', sales: 4, leads: 32 }
          ]
        },
        layout: 'half',
        position: 3
      },
      {
        type: 'goals',
        title: 'Metas e Objetivos',
        content: {
          goalsData: [
            { period: 'Mensal', target: 25, achieved: 18, percentage: 72 },
            { period: 'Trimestral', target: 75, achieved: 54, percentage: 72 },
            { period: 'Anual', target: 300, achieved: 216, percentage: 72 }
          ]
        },
        layout: 'half',
        position: 4
      }
    ]
  },
  {
    id: 'template2',
    name: 'Apresentação para Investidores',
    description: 'Template para apresentações para investidores e stakeholders',
    category: 'executive',
    thumbnail: '/templates/investor-presentation.jpg',
    isDefault: false,
    createdBy: '1',
    createdAt: '2024-01-15',
    slides: [
      {
        type: 'title',
        title: 'União Imobiliária - Visão Estratégica 2024',
        content: {
          text: 'Crescimento Sustentável e Inovação no Mercado Imobiliário'
        },
        layout: 'full',
        position: 1
      },
      {
        type: 'metrics',
        title: 'Crescimento e Rentabilidade',
        content: {
          metrics: [
            { label: 'Crescimento Anual', value: '25%', change: 5, trend: 'up' },
            { label: 'Margem de Lucro', value: '18%', change: 3, trend: 'up' },
            { label: 'ROI', value: '22%', change: 4, trend: 'up' },
            { label: 'Market Share', value: '12%', change: 2, trend: 'up' }
          ]
        },
        layout: 'full',
        position: 2
      }
    ]
  }
];

export const mockPresentations: Presentation[] = [
  {
    id: 'pres1',
    name: 'Relatório Janeiro 2024',
    description: 'Apresentação mensal para diretoria',
    templateId: 'template1',
    slides: [
      {
        id: 'slide1',
        type: 'title',
        title: 'Relatório Executivo - Janeiro 2024',
        content: {
          text: 'União Imobiliária - Performance e Resultados'
        },
        layout: 'full',
        position: 1,
        backgroundColor: '#1e40af',
        textColor: '#ffffff'
      },
      {
        id: 'slide2',
        type: 'metrics',
        title: 'Principais Indicadores',
        content: {
          metrics: [
            { label: 'Vendas Totais', value: '18', change: 12, trend: 'up' },
            { label: 'Receita Total', value: 'R$ 2.5M', change: 8, trend: 'up' },
            { label: 'Taxa de Conversão', value: '15.5%', change: 2, trend: 'up' },
            { label: 'Novos Leads', value: '115', change: -5, trend: 'down' }
          ]
        },
        layout: 'full',
        position: 2
      }
    ],
    ownerId: '1',
    ownerRole: 'owner',
    status: 'published',
    lastPresented: '2024-02-01',
    createdAt: '2024-01-31',
    updatedAt: '2024-02-01'
  },
  {
    id: 'pres2',
    name: 'Performance da Equipe - Q1 2024',
    description: 'Apresentação trimestral para gestores',
    templateId: 'template1',
    slides: [
      {
        id: 'slide3',
        type: 'title',
        title: 'Performance da Equipe - Q1 2024',
        content: {
          text: 'Análise de Resultados e Metas do Primeiro Trimestre'
        },
        layout: 'full',
        position: 1
      },
      {
        id: 'slide4',
        type: 'team',
        title: 'Ranking da Equipe',
        content: {
          teamData: mockTeamPerformanceData
        },
        layout: 'full',
        position: 2
      }
    ],
    ownerId: '2',
    ownerRole: 'manager',
    status: 'draft',
    createdAt: '2024-03-31',
    updatedAt: '2024-03-31'
  }
];

export const mockPresentationSettings: PresentationSettings = {
  theme: 'corporate',
  logo: '/logo-uniao-imobiliaria.png',
  companyName: 'União Imobiliária',
  primaryColor: '#1e40af',
  secondaryColor: '#3b82f6',
  fontFamily: 'default',
  autoRefresh: true,
  refreshInterval: 30
};

// Dados para Sistema de Gestão de Equipes
export const mockTeams: Team[] = [
  {
    id: 'team1',
    name: 'Equipe Alpha',
    description: 'Equipe de vendas premium focada em imóveis de alto valor',
    managerId: '2',
    managerName: 'Maria Santos',
    color: '#3b82f6',
    isActive: true,
    agents: [
      {
        agentId: '3',
        agentName: 'Pedro Lima',
        role: 'leader',
        joinedAt: '2023-03-01',
        isActive: true,
        performance: {
          sales: 8,
          leads: 45,
          conversionRate: 18.5,
          commission: 25000
        }
      },
      {
        agentId: '5',
        agentName: 'Carlos Oliveira',
        role: 'member',
        joinedAt: '2023-05-01',
        isActive: true,
        performance: {
          sales: 6,
          leads: 38,
          conversionRate: 15.2,
          commission: 18000
        }
      }
    ],
    goals: [
      {
        id: 'goal1',
        teamId: 'team1',
        type: 'monthly_sales',
        target: 15,
        current: 14,
        period: '2024-02',
        status: 'active',
        reward: 'Bônus de R$ 5.000 para a equipe',
        createdAt: '2024-01-01',
        updatedAt: '2024-02-15'
      },
      {
        id: 'goal2',
        teamId: 'team1',
        type: 'monthly_leads',
        target: 80,
        current: 83,
        period: '2024-02',
        status: 'completed',
        reward: 'Dia de folga coletivo',
        createdAt: '2024-01-01',
        updatedAt: '2024-02-15'
      }
    ],
    createdAt: '2023-03-01',
    updatedAt: '2024-02-15'
  },
  {
    id: 'team2',
    name: 'Equipe Beta',
    description: 'Equipe focada em locações e imóveis comerciais',
    managerId: '2',
    managerName: 'Maria Santos',
    color: '#10b981',
    isActive: true,
    agents: [
      {
        agentId: '7',
        agentName: 'Ana Silva',
        role: 'leader',
        joinedAt: '2023-06-01',
        isActive: true,
        performance: {
          sales: 4,
          leads: 32,
          conversionRate: 12.8,
          commission: 12000
        }
      },
      {
        agentId: '8',
        agentName: 'Roberto Costa',
        role: 'member',
        joinedAt: '2023-08-01',
        isActive: true,
        performance: {
          sales: 3,
          leads: 25,
          conversionRate: 12.0,
          commission: 9000
        }
      },
      {
        agentId: '9',
        agentName: 'Fernanda Lima',
        role: 'trainee',
        joinedAt: '2024-01-01',
        isActive: true,
        performance: {
          sales: 1,
          leads: 15,
          conversionRate: 6.7,
          commission: 3000
        }
      }
    ],
    goals: [
      {
        id: 'goal3',
        teamId: 'team2',
        type: 'monthly_sales',
        target: 8,
        current: 8,
        period: '2024-02',
        status: 'completed',
        reward: 'Almoço da equipe',
        createdAt: '2024-01-01',
        updatedAt: '2024-02-15'
      }
    ],
    createdAt: '2023-06-01',
    updatedAt: '2024-02-15'
  },
  {
    id: 'team3',
    name: 'Equipe Gamma',
    description: 'Equipe de expansão para novos mercados',
    managerId: '2',
    managerName: 'Maria Santos',
    color: '#f59e0b',
    isActive: true,
    agents: [
      {
        agentId: '10',
        agentName: 'Lucas Pereira',
        role: 'leader',
        joinedAt: '2024-01-01',
        isActive: true,
        performance: {
          sales: 2,
          leads: 20,
          conversionRate: 10.0,
          commission: 6000
        }
      }
    ],
    goals: [
      {
        id: 'goal4',
        teamId: 'team3',
        type: 'monthly_sales',
        target: 5,
        current: 2,
        period: '2024-02',
        status: 'active',
        reward: 'Curso de especialização',
        createdAt: '2024-01-01',
        updatedAt: '2024-02-15'
      }
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-02-15'
  }
];

export const mockTeamAssignments: TeamAssignment[] = [
  {
    id: 'assign1',
    agentId: '3',
    agentName: 'Pedro Lima',
    teamId: 'team1',
    teamName: 'Equipe Alpha',
    assignedBy: '2',
    assignedAt: '2023-03-01',
    status: 'active',
    notes: 'Líder da equipe Alpha'
  },
  {
    id: 'assign2',
    agentId: '5',
    agentName: 'Carlos Oliveira',
    teamId: 'team1',
    teamName: 'Equipe Alpha',
    assignedBy: '2',
    assignedAt: '2023-05-01',
    status: 'active',
    notes: 'Membro sênior'
  },
  {
    id: 'assign3',
    agentId: '7',
    agentName: 'Ana Silva',
    teamId: 'team2',
    teamName: 'Equipe Beta',
    assignedBy: '2',
    assignedAt: '2023-06-01',
    status: 'active',
    notes: 'Líder da equipe Beta'
  },
  {
    id: 'assign4',
    agentId: '8',
    agentName: 'Roberto Costa',
    teamId: 'team2',
    teamName: 'Equipe Beta',
    assignedBy: '2',
    assignedAt: '2023-08-01',
    status: 'active',
    notes: 'Especialista em locações'
  },
  {
    id: 'assign5',
    agentId: '9',
    agentName: 'Fernanda Lima',
    teamId: 'team2',
    teamName: 'Equipe Beta',
    assignedBy: '2',
    assignedAt: '2024-01-01',
    status: 'active',
    notes: 'Estagiária em treinamento'
  },
  {
    id: 'assign6',
    agentId: '10',
    agentName: 'Lucas Pereira',
    teamId: 'team3',
    teamName: 'Equipe Gamma',
    assignedBy: '2',
    assignedAt: '2024-01-01',
    status: 'active',
    notes: 'Líder da equipe Gamma'
  }
];

export const mockTeamPerformanceMetrics: TeamPerformanceMetrics[] = [
  {
    teamId: 'team1',
    teamName: 'Equipe Alpha',
    totalSales: 14,
    totalLeads: 83,
    averageConversion: 16.9,
    totalCommission: 43000,
    agentsCount: 2,
    ranking: 1,
    goals: [],
    topPerformers: mockTeams.find(t => t.id === 'team1')?.agents || [],
    monthlyGrowth: 15.2,
    lastUpdated: '2024-02-15'
  },
  {
    teamId: 'team2',
    teamName: 'Equipe Beta',
    totalSales: 8,
    totalLeads: 72,
    averageConversion: 11.1,
    totalCommission: 24000,
    agentsCount: 3,
    ranking: 2,
    goals: [],
    topPerformers: mockTeams.find(t => t.id === 'team2')?.agents || [],
    monthlyGrowth: 8.5,
    lastUpdated: '2024-02-15'
  },
  {
    teamId: 'team3',
    teamName: 'Equipe Gamma',
    totalSales: 2,
    totalLeads: 20,
    averageConversion: 10.0,
    totalCommission: 6000,
    agentsCount: 1,
    ranking: 3,
    goals: [],
    topPerformers: mockTeams.find(t => t.id === 'team3')?.agents || [],
    monthlyGrowth: 5.0,
    lastUpdated: '2024-02-15'
  }
];
