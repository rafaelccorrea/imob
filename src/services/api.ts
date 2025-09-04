import axios from 'axios';

// Types for API parameters
interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: unknown;
}

interface PropertyData {
  title: string;
  description: string;
  price: number;
  type: string;
  status: string;
  address: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  [key: string]: unknown;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  interests?: string[];
  notes?: string;
  [key: string]: unknown;
}

interface DealData {
  propertyId: string;
  clientName: string;
  type: 'sale' | 'rent';
  value: number;
  commission: number;
  status: string;
  documents?: File[];
  [key: string]: unknown;
}

interface TransactionData {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  [key: string]: unknown;
}

interface EmployeeData {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  [key: string]: unknown;
}

interface UserData {
  name: string;
  email: string;
  role: string;
  password?: string;
  [key: string]: unknown;
}

interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  [key: string]: unknown;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// API base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Property service
export const propertyService = {
  // Get all properties
  getAll: async (params?: QueryParams) => {
    const response = await api.get('/properties', { params });
    return response.data;
  },

  // Get property by ID
  getById: async (id: string) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  // Create new property
  create: async (data: PropertyData) => {
    const response = await api.post('/properties', data);
    return response.data;
  },

  // Update property
  update: async (id: string, data: PropertyData) => {
    const response = await api.put(`/properties/${id}`, data);
    return response.data;
  },

  // Delete property
  delete: async (id: string) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },

  // Upload property images
  uploadImages: async (id: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    
    const response = await api.post(`/properties/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Lead service
export const leadService = {
  // Get all leads
  getAll: async (params?: QueryParams) => {
    const response = await api.get('/leads', { params });
    return response.data;
  },

  // Get lead by ID
  getById: async (id: string) => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },

  // Create new lead
  create: async (data: LeadData) => {
    const response = await api.post('/leads', data);
    return response.data;
  },

  // Update lead
  update: async (id: string, data: LeadData) => {
    const response = await api.put(`/leads/${id}`, data);
    return response.data;
  },

  // Delete lead
  delete: async (id: string) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },

  // Assign lead to agent
  assign: async (id: string, agentId: string) => {
    const response = await api.post(`/leads/${id}/assign`, { agentId });
    return response.data;
  },

  // Update lead status
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/leads/${id}/status`, { status });
    return response.data;
  },
};

// Deal service
export const dealService = {
  // Get all deals
  getAll: async (params?: QueryParams) => {
    const response = await api.get('/deals', { params });
    return response.data;
  },

  // Get deal by ID
  getById: async (id: string) => {
    const response = await api.get(`/deals/${id}`);
    return response.data;
  },

  // Create new deal
  create: async (data: DealData) => {
    const response = await api.post('/deals', data);
    return response.data;
  },

  // Update deal
  update: async (id: string, data: DealData) => {
    const response = await api.put(`/deals/${id}`, data);
    return response.data;
  },

  // Delete deal
  delete: async (id: string) => {
    const response = await api.delete(`/deals/${id}`);
    return response.data;
  },

  // Update deal status
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/deals/${id}/status`, { status });
    return response.data;
  },

  // Upload deal documents
  uploadDocuments: async (id: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('documents', file);
    });
    
    const response = await api.post(`/deals/${id}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Financial service
export const financialService = {
  // Get all transactions
  getAllTransactions: async (params?: QueryParams) => {
    const response = await api.get('/financial/transactions', { params });
    return response.data;
  },

  // Get transaction by ID
  getTransactionById: async (id: string) => {
    const response = await api.get(`/financial/transactions/${id}`);
    return response.data;
  },

  // Create new transaction
  createTransaction: async (data: TransactionData) => {
    const response = await api.post('/financial/transactions', data);
    return response.data;
  },

  // Update transaction
  updateTransaction: async (id: string, data: TransactionData) => {
    const response = await api.put(`/financial/transactions/${id}`, data);
    return response.data;
  },

  // Delete transaction
  deleteTransaction: async (id: string) => {
    const response = await api.delete(`/financial/transactions/${id}`);
    return response.data;
  },

  // Get commissions
  getCommissions: async (params?: QueryParams) => {
    const response = await api.get('/financial/commissions', { params });
    return response.data;
  },

  // Pay commission
  payCommission: async (id: string) => {
    const response = await api.post(`/financial/commissions/${id}/pay`);
    return response.data;
  },

  // Get cash flow
  getCashFlow: async (params?: QueryParams) => {
    const response = await api.get('/financial/cash-flow', { params });
    return response.data;
  },

  // Get financial reports
  getReports: async (params?: QueryParams) => {
    const response = await api.get('/financial/reports', { params });
    return response.data;
  },
};

// HR service
export const hrService = {
  // Get all employees
  getAllEmployees: async (params?: QueryParams) => {
    const response = await api.get('/hr/employees', { params });
    return response.data;
  },

  // Get employee by ID
  getEmployeeById: async (id: string) => {
    const response = await api.get(`/hr/employees/${id}`);
    return response.data;
  },

  // Create new employee
  createEmployee: async (data: EmployeeData) => {
    const response = await api.post('/hr/employees', data);
    return response.data;
  },

  // Update employee
  updateEmployee: async (id: string, data: EmployeeData) => {
    const response = await api.put(`/hr/employees/${id}`, data);
    return response.data;
  },

  // Delete employee
  deleteEmployee: async (id: string) => {
    const response = await api.delete(`/hr/employees/${id}`);
    return response.data;
  },

  // Upload employee documents
  uploadDocuments: async (id: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('documents', file);
    });
    
    const response = await api.post(`/hr/employees/${id}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get performance evaluations
  getEvaluations: async (params?: QueryParams) => {
    const response = await api.get('/hr/evaluations', { params });
    return response.data;
  },

  // Create performance evaluation
  createEvaluation: async (data: Record<string, unknown>) => {
    const response = await api.post('/hr/evaluations', data);
    return response.data;
  },
};

// User service
export const userService = {
  // Get all users
  getAll: async (params?: QueryParams) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // Get user by ID
  getById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Create new user
  create: async (data: UserData) => {
    const response = await api.post('/users', data);
    return response.data;
  },

  // Update user
  update: async (id: string, data: UserData) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  // Delete user
  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: ProfileData) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  // Change password
  changePassword: async (data: PasswordData) => {
    const response = await api.post('/users/change-password', data);
    return response.data;
  },

  // Get user permissions
  getPermissions: async () => {
    const response = await api.get('/users/permissions');
    return response.data;
  },
};

// Dashboard service
export const dashboardService = {
  // Get dashboard metrics
  getMetrics: async () => {
    const response = await api.get('/dashboard/metrics');
    return response.data;
  },

  // Get sales chart data
  getSalesChart: async (params?: QueryParams) => {
    const response = await api.get('/dashboard/sales-chart', { params });
    return response.data;
  },

  // Get recent activities
  getRecentActivities: async (params?: QueryParams) => {
    const response = await api.get('/dashboard/recent-activities', { params });
    return response.data;
  },

  // Get alerts
  getAlerts: async () => {
    const response = await api.get('/dashboard/alerts');
    return response.data;
  },
};

// Export service
export const exportService = {
  // Export to Excel
  toExcel: async (endpoint: string, params?: QueryParams, filename?: string) => {
    const response = await api.get(`/export/${endpoint}/excel`, {
      params,
      responseType: 'blob',
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename || `${endpoint}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  // Export to PDF
  toPDF: async (endpoint: string, params?: QueryParams, filename?: string) => {
    const response = await api.get(`/export/${endpoint}/pdf`, {
      params,
      responseType: 'blob',
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename || `${endpoint}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};

export default api;
