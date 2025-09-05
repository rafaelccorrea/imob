// Sistema de cores padronizado para o sistema imobiliário

export const colors = {
  // Cores monetárias
  money: {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400',
  },
  
  // Cores de ícones
  icons: {
    money: 'text-green-600 dark:text-green-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400',
    primary: 'text-primary-600 dark:text-primary-400',
  },
  
  // Cores de fundo para ícones
  iconBg: {
    money: 'bg-green-100 dark:bg-green-900/20',
    success: 'bg-green-100 dark:bg-green-900/20',
    warning: 'bg-yellow-100 dark:bg-yellow-900/20',
    error: 'bg-red-100 dark:bg-red-900/20',
    info: 'bg-blue-100 dark:bg-blue-900/20',
    primary: 'bg-primary-100 dark:bg-primary-900/20',
  },
  
  // Cores de texto
  text: {
    title: 'text-gray-900 dark:text-white',
    subtitle: 'text-gray-700 dark:text-gray-300',
    body: 'text-gray-600 dark:text-gray-400',
    muted: 'text-gray-500 dark:text-gray-500',
  },
  
  // Cores de status
  status: {
    active: 'text-green-600 dark:text-green-400',
    pending: 'text-yellow-600 dark:text-yellow-400',
    inactive: 'text-red-600 dark:text-red-400',
    completed: 'text-green-600 dark:text-green-400',
    cancelled: 'text-red-600 dark:text-red-400',
  },
  
  // Cores de fundo para status
  statusBg: {
    active: 'bg-green-50 dark:bg-green-900/20',
    pending: 'bg-yellow-50 dark:bg-yellow-900/20',
    inactive: 'bg-red-50 dark:bg-red-900/20',
    completed: 'bg-green-50 dark:bg-green-900/20',
    cancelled: 'bg-red-50 dark:bg-red-900/20',
  },
};

// Função para formatar valores monetários com cores
export const formatCurrencyWithColor = (value: number, showSign = false): { text: string; color: string } => {
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(value));
  
  const sign = value < 0 ? '-' : showSign && value > 0 ? '+' : '';
  const text = `${sign}${formatted}`;
  const color = value < 0 ? colors.money.negative : colors.money.positive;
  
  return { text, color };
};

// Função para obter cor de crescimento
export const getGrowthColor = (growth: number): string => {
  return growth >= 0 ? colors.money.positive : colors.money.negative;
};

// Função para obter cor de status
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'ativo':
    case 'completed':
    case 'realizado':
    case 'confirmado':
      return colors.status.active;
    case 'pending':
    case 'pendente':
    case 'agendado':
      return colors.status.pending;
    case 'inactive':
    case 'inativo':
    case 'cancelled':
    case 'cancelado':
    case 'expirado':
      return colors.status.inactive;
    default:
      return colors.text.body;
  }
};

// Função para obter cor de fundo de status
export const getStatusBgColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'ativo':
    case 'completed':
    case 'realizado':
    case 'confirmado':
      return colors.statusBg.active;
    case 'pending':
    case 'pendente':
    case 'agendado':
      return colors.statusBg.pending;
    case 'inactive':
    case 'inativo':
    case 'cancelled':
    case 'cancelado':
    case 'expirado':
      return colors.statusBg.inactive;
    default:
      return 'bg-gray-50 dark:bg-gray-800';
  }
};
