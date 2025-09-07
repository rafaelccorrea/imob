import React, { useState } from 'react';
import { 
  Building2, 
  Building,
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Settings,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  Award,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Shield,
  Key,
  Database,
  Archive,
  Cloud,
  HardDrive,
  Lock,
  Unlock,
  Copy,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  Bell,
  MessageSquare,
  Globe,
  Smartphone,
  CreditCard,
  Receipt,
  Scale,
  Heart,
  Car,
  Dumbbell,
  FileText,
  Printer,
  Share2
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import { usePermissions } from '../hooks/usePermissions';

// Mock data para franquias
const mockFranchises = [
  {
    id: '1',
    name: 'União Imobiliária - Centro',
    code: 'UI-CENTRO-001',
    type: 'Matriz',
    status: 'active',
    address: 'Rua das Flores, 123 - Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    phone: '(11) 3333-4444',
    email: 'centro@uniaoimob.com.br',
    manager: 'João Silva',
    managerEmail: 'joao.silva@uniaoimob.com.br',
    managerPhone: '(11) 99999-1111',
    establishedDate: new Date('2020-01-15'),
    lastInspection: new Date('2024-01-10'),
    nextInspection: new Date('2024-04-10'),
    metrics: {
      totalProperties: 45,
      activeProperties: 42,
      totalAgents: 8,
      activeAgents: 7,
      monthlyRevenue: 185000,
      monthlyLeads: 89,
      conversionRate: 7.1,
      customerSatisfaction: 4.8
    },
    compliance: {
      licenseValid: true,
      insuranceValid: true,
      contractValid: true,
      lastAudit: new Date('2024-01-05'),
      nextAudit: new Date('2024-07-05')
    },
    performance: {
      rating: 4.9,
      rank: 1,
      growthRate: 12.5,
      targetAchievement: 105.2
    }
  },
  {
    id: '2',
    name: 'União Imobiliária - Zona Sul',
    code: 'UI-SUL-002',
    type: 'Franquia',
    status: 'active',
    address: 'Av. Paulista, 1000 - Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    phone: '(11) 3333-5555',
    email: 'zona.sul@uniaoimob.com.br',
    manager: 'Maria Santos',
    managerEmail: 'maria.santos@uniaoimob.com.br',
    managerPhone: '(11) 99999-2222',
    establishedDate: new Date('2021-03-20'),
    lastInspection: new Date('2024-01-08'),
    nextInspection: new Date('2024-04-08'),
    metrics: {
      totalProperties: 38,
      activeProperties: 35,
      totalAgents: 6,
      activeAgents: 5,
      monthlyRevenue: 142000,
      monthlyLeads: 67,
      conversionRate: 6.8,
      customerSatisfaction: 4.7
    },
    compliance: {
      licenseValid: true,
      insuranceValid: true,
      contractValid: true,
      lastAudit: new Date('2024-01-03'),
      nextAudit: new Date('2024-07-03')
    },
    performance: {
      rating: 4.7,
      rank: 2,
      growthRate: 8.3,
      targetAchievement: 98.5
    }
  },
  {
    id: '3',
    name: 'União Imobiliária - Zona Norte',
    code: 'UI-NORTE-003',
    type: 'Franquia',
    status: 'active',
    address: 'Rua Augusta, 500 - Consolação',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01305-000',
    phone: '(11) 3333-6666',
    email: 'zona.norte@uniaoimob.com.br',
    manager: 'Carlos Lima',
    managerEmail: 'carlos.lima@uniaoimob.com.br',
    managerPhone: '(11) 99999-3333',
    establishedDate: new Date('2022-06-10'),
    lastInspection: new Date('2024-01-12'),
    nextInspection: new Date('2024-04-12'),
    metrics: {
      totalProperties: 32,
      activeProperties: 28,
      totalAgents: 5,
      activeAgents: 4,
      monthlyRevenue: 98000,
      monthlyLeads: 45,
      conversionRate: 6.2,
      customerSatisfaction: 4.5
    },
    compliance: {
      licenseValid: true,
      insuranceValid: false,
      contractValid: true,
      lastAudit: new Date('2024-01-01'),
      nextAudit: new Date('2024-07-01')
    },
    performance: {
      rating: 4.3,
      rank: 3,
      growthRate: 5.1,
      targetAchievement: 92.3
    }
  },
  {
    id: '4',
    name: 'União Imobiliária - Zona Oeste',
    code: 'UI-OESTE-004',
    type: 'Franquia',
    status: 'pending',
    address: 'Rua Oscar Freire, 200 - Jardins',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01426-000',
    phone: '(11) 3333-7777',
    email: 'zona.oeste@uniaoimob.com.br',
    manager: 'Ana Costa',
    managerEmail: 'ana.costa@uniaoimob.com.br',
    managerPhone: '(11) 99999-4444',
    establishedDate: new Date('2024-01-01'),
    lastInspection: null,
    nextInspection: new Date('2024-04-01'),
    metrics: {
      totalProperties: 0,
      activeProperties: 0,
      totalAgents: 0,
      activeAgents: 0,
      monthlyRevenue: 0,
      monthlyLeads: 0,
      conversionRate: 0,
      customerSatisfaction: 0
    },
    compliance: {
      licenseValid: false,
      insuranceValid: false,
      contractValid: false,
      lastAudit: null,
      nextAudit: new Date('2024-07-01')
    },
    performance: {
      rating: 0,
      rank: 0,
      growthRate: 0,
      targetAchievement: 0
    }
  }
];

const FranchiseManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState<any>(null);
  const { hasPermission } = usePermissions();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Intl.NumberFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'inactive': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'pending': return 'Pendente';
      case 'inactive': return 'Inativo';
      default: return 'Desconhecido';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Matriz': return 'primary';
      case 'Franquia': return 'default';
      default: return 'secondary';
    }
  };

  const getComplianceStatus = (compliance: any) => {
    const validCount = Object.values(compliance).filter(value => value === true).length;
    const totalCount = Object.keys(compliance).length - 2; // Excluir lastAudit e nextAudit
    return { valid: validCount, total: totalCount };
  };

  const filteredFranchises = mockFranchises.filter(franchise => {
    const matchesSearch = franchise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         franchise.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         franchise.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || franchise.type === selectedType;
    const matchesStatus = !selectedStatus || franchise.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const openFranchiseModal = (franchise: any) => {
    setSelectedFranchise(franchise);
    setShowModal(true);
  };

  // Estatísticas gerais
  const totalFranchises = mockFranchises.length;
  const activeFranchises = mockFranchises.filter(f => f.status === 'active').length;
  const totalRevenue = mockFranchises.reduce((sum, f) => sum + f.metrics.monthlyRevenue, 0);
  const totalProperties = mockFranchises.reduce((sum, f) => sum + f.metrics.totalProperties, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Gestão de Franquias
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Controle de múltiplas unidades e franquias
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Exportar</span>
            <span className="sm:hidden">Exportar</span>
          </Button>
          <Button className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Nova Franquia</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total de Unidades
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {totalFranchises}
                </p>
                <p className="text-xs text-success-600 dark:text-success-400">
                  {activeFranchises} ativas
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Receita Total
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {formatCurrency(totalRevenue)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Mês atual
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total de Imóveis
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  {totalProperties}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Em todas as unidades
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Compliance Médio
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-secondary-600 dark:text-white">
                  {Math.round(mockFranchises.reduce((sum, f) => {
                    const compliance = getComplianceStatus(f.compliance);
                    return sum + (compliance.valid / compliance.total * 100);
                  }, 0) / mockFranchises.length)}%
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Conformidade geral
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar franquias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os tipos</option>
              <option value="Matriz">Matriz</option>
              <option value="Franquia">Franquia</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="pending">Pendente</option>
              <option value="inactive">Inativo</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Franquias */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
        {filteredFranchises.map((franchise) => (
          <Card key={franchise.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white truncate">
                      {franchise.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {franchise.code} • {franchise.manager}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                        {franchise.city}, {franchise.state}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                        {franchise.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        Desde {formatDate(franchise.establishedDate)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Badge variant={getTypeColor(franchise.type) as any} className="text-xs">
                    {franchise.type}
                  </Badge>
                  <Badge variant={getStatusColor(franchise.status) as any} className="text-xs">
                    {getStatusText(franchise.status)}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openFranchiseModal(franchise)}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                      <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Métricas da Franquia */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Receita</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {formatCurrency(franchise.metrics.monthlyRevenue)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Imóveis</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {franchise.metrics.totalProperties}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Agentes</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {franchise.metrics.totalAgents}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Conversão</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {franchise.metrics.conversionRate}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes da Franquia */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        {selectedFranchise && (
          <div className="flex flex-col h-full">
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
              {/* Header Personalizado do Modal */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedFranchise.name}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Informações Básicas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    Informações da Unidade
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Código:</strong> {selectedFranchise.code}</p>
                    <p><strong>Tipo:</strong> {selectedFranchise.type}</p>
                    <p><strong>Status:</strong> {getStatusText(selectedFranchise.status)}</p>
                    <p><strong>Endereço:</strong> {selectedFranchise.address}</p>
                    <p><strong>Cidade:</strong> {selectedFranchise.city}, {selectedFranchise.state}</p>
                    <p><strong>CEP:</strong> {selectedFranchise.zipCode}</p>
                    <p><strong>Telefone:</strong> {selectedFranchise.phone}</p>
                    <p><strong>Email:</strong> {selectedFranchise.email}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    Gestor Responsável
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Nome:</strong> {selectedFranchise.manager}</p>
                    <p><strong>Email:</strong> {selectedFranchise.managerEmail}</p>
                    <p><strong>Telefone:</strong> {selectedFranchise.managerPhone}</p>
                    <p><strong>Estabelecida em:</strong> {formatDate(selectedFranchise.establishedDate)}</p>
                    <p><strong>Última inspeção:</strong> {formatDate(selectedFranchise.lastInspection)}</p>
                    <p><strong>Próxima inspeção:</strong> {formatDate(selectedFranchise.nextInspection)}</p>
                  </div>
                </div>
              </div>

              {/* Métricas de Performance */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  Métricas de Performance
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Receita Mensal</p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                      {formatCurrency(selectedFranchise.metrics.monthlyRevenue)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Imóveis Ativos</p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                      {selectedFranchise.metrics.activeProperties}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Taxa de Conversão</p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                      {selectedFranchise.metrics.conversionRate}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Satisfação</p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                      {selectedFranchise.metrics.customerSatisfaction}/5
                    </p>
                  </div>
                </div>
              </div>

              {/* Compliance */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  Status de Compliance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Licença Válida</span>
                    <Badge variant={selectedFranchise.compliance.licenseValid ? 'success' : 'destructive'} className="text-xs">
                      {selectedFranchise.compliance.licenseValid ? 'Válida' : 'Inválida'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Seguro Válido</span>
                    <Badge variant={selectedFranchise.compliance.insuranceValid ? 'success' : 'destructive'} className="text-xs">
                      {selectedFranchise.compliance.insuranceValid ? 'Válido' : 'Inválido'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Contrato Válido</span>
                    <Badge variant={selectedFranchise.compliance.contractValid ? 'success' : 'destructive'} className="text-xs">
                      {selectedFranchise.compliance.contractValid ? 'Válido' : 'Inválido'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Última Auditoria</span>
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {formatDate(selectedFranchise.compliance.lastAudit)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              <Button variant="outline" className="text-xs sm:text-sm">
                <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Editar Franquia
              </Button>
              <Button className="text-xs sm:text-sm">
                <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FranchiseManagementPage;
