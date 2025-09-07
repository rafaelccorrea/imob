import React, { useState } from 'react';
import { 
  Shield, 
  Eye, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  User,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Key,
  Lock,
  Unlock,
  Edit,
  Trash2,
  Plus,
  Settings,
  FileText,
  BarChart3,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ExternalLink,
  Copy,
  Bell,
  Zap,
  Building,
  Users,
  DollarSign,
  Target,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Star,
  Award,
  Heart,
  Car,
  Dumbbell,
  CreditCard,
  Receipt,
  Scale,
  PieChart,
  Globe,
  Smartphone,
  Archive,
  Cloud,
  HardDrive,
  Printer,
  Share2,
  Upload
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import { usePermissions } from '../hooks/usePermissions';

// Mock data para logs de auditoria
const mockAuditLogs = [
  {
    id: '1',
    timestamp: new Date('2024-01-15T14:30:00'),
    user: 'João Silva',
    userRole: 'admin',
    action: 'login',
    resource: 'Sistema',
    details: 'Login realizado com sucesso',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success',
    severity: 'info',
    category: 'authentication'
  },
  {
    id: '2',
    timestamp: new Date('2024-01-15T14:25:00'),
    user: 'Maria Santos',
    userRole: 'manager',
    action: 'create',
    resource: 'Imóvel',
    details: 'Novo imóvel cadastrado: Apartamento 3 quartos no centro',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    status: 'success',
    severity: 'info',
    category: 'data_modification'
  },
  {
    id: '3',
    timestamp: new Date('2024-01-15T14:20:00'),
    user: 'Carlos Lima',
    userRole: 'agent',
    action: 'update',
    resource: 'Cliente',
    details: 'Dados do cliente atualizados: João da Silva',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
    status: 'success',
    severity: 'info',
    category: 'data_modification'
  },
  {
    id: '4',
    timestamp: new Date('2024-01-15T14:15:00'),
    user: 'Ana Costa',
    userRole: 'financial',
    action: 'delete',
    resource: 'Transação',
    details: 'Transação removida: ID #12345',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success',
    severity: 'warning',
    category: 'data_modification'
  },
  {
    id: '5',
    timestamp: new Date('2024-01-15T14:10:00'),
    user: 'Pedro Oliveira',
    userRole: 'hr',
    action: 'export',
    resource: 'Relatório',
    details: 'Exportação de relatório de funcionários realizada',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    status: 'success',
    severity: 'info',
    category: 'data_export'
  },
  {
    id: '6',
    timestamp: new Date('2024-01-15T14:05:00'),
    user: 'Sistema',
    userRole: 'system',
    action: 'backup',
    resource: 'Banco de Dados',
    details: 'Backup automático realizado com sucesso',
    ipAddress: '127.0.0.1',
    userAgent: 'Sistema Automático',
    status: 'success',
    severity: 'info',
    category: 'system'
  },
  {
    id: '7',
    timestamp: new Date('2024-01-15T14:00:00'),
    user: 'Usuário Desconhecido',
    userRole: 'unknown',
    action: 'login_failed',
    resource: 'Sistema',
    details: 'Tentativa de login falhada: admin@imob.com',
    ipAddress: '203.0.113.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'failed',
    severity: 'warning',
    category: 'security'
  },
  {
    id: '8',
    timestamp: new Date('2024-01-15T13:55:00'),
    user: 'João Silva',
    userRole: 'admin',
    action: 'permission_change',
    resource: 'Usuário',
    details: 'Permissões alteradas para usuário: Maria Santos',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success',
    severity: 'warning',
    category: 'permissions'
  }
];

const mockAuditStats = {
  totalLogs: 1247,
  todayLogs: 89,
  failedAttempts: 12,
  criticalEvents: 3,
  usersActive: 8,
  lastBackup: new Date('2024-01-15T02:00:00'),
  retentionDays: 90
};

const AuditLogsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const { hasPermission } = usePermissions();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      case 'info': return 'default';
      default: return 'secondary';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical': return 'Crítico';
      case 'warning': return 'Aviso';
      case 'info': return 'Informativo';
      default: return 'Desconhecido';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Sucesso';
      case 'failed': return 'Falhou';
      default: return 'Desconhecido';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login': return <Key className="h-4 w-4" />;
      case 'create': return <Plus className="h-4 w-4" />;
      case 'update': return <Edit className="h-4 w-4" />;
      case 'delete': return <Trash2 className="h-4 w-4" />;
      case 'export': return <Download className="h-4 w-4" />;
      case 'backup': return <Database className="h-4 w-4" />;
      case 'login_failed': return <XCircle className="h-4 w-4" />;
      case 'permission_change': return <Shield className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return <Key className="h-4 w-4" />;
      case 'data_modification': return <Edit className="h-4 w-4" />;
      case 'data_export': return <Download className="h-4 w-4" />;
      case 'system': return <Database className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'permissions': return <Lock className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || log.category === selectedCategory;
    const matchesSeverity = !selectedSeverity || log.severity === selectedSeverity;
    const matchesUser = !selectedUser || log.user === selectedUser;
    
    return matchesSearch && matchesCategory && matchesSeverity && matchesUser;
  });

  const openLogModal = (log: any) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Logs de Auditoria
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Monitoramento de atividades e segurança do sistema
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Atualizar</span>
            <span className="sm:hidden">Atualizar</span>
          </Button>
          <Button className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Exportar Logs</span>
            <span className="sm:hidden">Exportar</span>
          </Button>
        </div>
      </div>

      {/* Estatísticas de Auditoria */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total de Logs
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {mockAuditStats.totalLogs.toLocaleString()}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockAuditStats.todayLogs} hoje
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Tentativas Falhadas
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  {mockAuditStats.failedAttempts}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Últimas 24h
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Eventos Críticos
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-destructive-600 dark:text-white">
                  {mockAuditStats.criticalEvents}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Requer atenção
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-destructive-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Usuários Ativos
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {mockAuditStats.usersActive}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Última hora
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
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
                placeholder="Buscar logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todas as categorias</option>
              <option value="authentication">Autenticação</option>
              <option value="data_modification">Modificação de Dados</option>
              <option value="data_export">Exportação de Dados</option>
              <option value="system">Sistema</option>
              <option value="security">Segurança</option>
              <option value="permissions">Permissões</option>
            </select>
            
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os níveis</option>
              <option value="critical">Crítico</option>
              <option value="warning">Aviso</option>
              <option value="info">Informativo</option>
            </select>
            
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os usuários</option>
              <option value="João Silva">João Silva</option>
              <option value="Maria Santos">Maria Santos</option>
              <option value="Carlos Lima">Carlos Lima</option>
              <option value="Ana Costa">Ana Costa</option>
              <option value="Pedro Oliveira">Pedro Oliveira</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Logs */}
      <div className="space-y-3 sm:space-y-4">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    {getActionIcon(log.action)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white truncate">
                      {log.details}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <strong>{log.user}</strong> ({log.userRole}) • {log.resource}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        {formatDate(log.timestamp)}
                      </span>
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(log.category)}
                        {log.category.replace('_', ' ')}
                      </span>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Badge variant={getSeverityColor(log.severity) as any} className="text-xs">
                    {getSeverityText(log.severity)}
                  </Badge>
                  <Badge variant={getStatusColor(log.status) as any} className="text-xs">
                    {getStatusText(log.status)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openLogModal(log)}
                    className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes do Log */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        {selectedLog && (
          <div className="flex flex-col h-full">
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
              {/* Header Personalizado do Modal */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Detalhes do Log
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

              {/* Informações do Log */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    Informações da Ação
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Ação:</strong> {selectedLog.action}</p>
                    <p><strong>Recurso:</strong> {selectedLog.resource}</p>
                    <p><strong>Detalhes:</strong> {selectedLog.details}</p>
                    <p><strong>Status:</strong> {getStatusText(selectedLog.status)}</p>
                    <p><strong>Severidade:</strong> {getSeverityText(selectedLog.severity)}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    Informações do Usuário
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Usuário:</strong> {selectedLog.user}</p>
                    <p><strong>Perfil:</strong> {selectedLog.userRole}</p>
                    <p><strong>IP:</strong> {selectedLog.ipAddress}</p>
                    <p><strong>Timestamp:</strong> {formatDate(selectedLog.timestamp)}</p>
                    <p><strong>Categoria:</strong> {selectedLog.category}</p>
                  </div>
                </div>
              </div>

              {/* User Agent */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  Informações Técnicas
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>User Agent:</strong></p>
                  <p className="break-all bg-white dark:bg-gray-700 p-2 rounded border">
                    {selectedLog.userAgent}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              <Button variant="outline" className="text-xs sm:text-sm">
                <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Copiar Detalhes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AuditLogsPage;
