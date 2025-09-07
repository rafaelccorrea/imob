import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Archive,
  Cloud,
  HardDrive,
  RefreshCw,
  Settings,
  Eye,
  Trash2,
  Plus,
  Calendar,
  User,
  Building,
  DollarSign,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Key,
  Lock,
  Unlock,
  Copy,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import { usePermissions } from '../hooks/usePermissions';

// Mock data para gerenciamento de dados
const mockBackups = [
  {
    id: '1',
    name: 'Backup Completo - Janeiro 2024',
    type: 'full',
    size: '2.4 GB',
    createdAt: new Date('2024-01-15T02:00:00'),
    status: 'completed',
    description: 'Backup completo do sistema incluindo todos os dados',
    tables: 45,
    records: 125000,
    location: 'cloud'
  },
  {
    id: '2',
    name: 'Backup Incremental - 14 Jan',
    type: 'incremental',
    size: '156 MB',
    createdAt: new Date('2024-01-14T02:00:00'),
    status: 'completed',
    description: 'Backup incremental das alterações do dia',
    tables: 12,
    records: 2500,
    location: 'cloud'
  },
  {
    id: '3',
    name: 'Backup Completo - Dezembro 2023',
    type: 'full',
    size: '2.1 GB',
    createdAt: new Date('2023-12-31T02:00:00'),
    status: 'completed',
    description: 'Backup de fim de ano',
    tables: 42,
    records: 118000,
    location: 'local'
  },
  {
    id: '4',
    name: 'Backup Incremental - 13 Jan',
    type: 'incremental',
    size: '89 MB',
    createdAt: new Date('2024-01-13T02:00:00'),
    status: 'failed',
    description: 'Falha na conexão com servidor',
    tables: 0,
    records: 0,
    location: 'cloud'
  }
];

const mockExports = [
  {
    id: '1',
    name: 'Relatório Financeiro - Q4 2023',
    type: 'financial',
    format: 'Excel',
    size: '15.2 MB',
    createdAt: new Date('2024-01-10T14:30:00'),
    status: 'completed',
    description: 'Relatório completo de receitas e despesas',
    records: 2500,
    requestedBy: 'João Silva'
  },
  {
    id: '2',
    name: 'Base de Clientes - Atual',
    type: 'clients',
    format: 'CSV',
    size: '8.7 MB',
    createdAt: new Date('2024-01-12T09:15:00'),
    status: 'completed',
    description: 'Exportação completa da base de clientes',
    records: 12000,
    requestedBy: 'Maria Santos'
  },
  {
    id: '3',
    name: 'Inventário de Imóveis',
    type: 'properties',
    format: 'PDF',
    size: '45.8 MB',
    createdAt: new Date('2024-01-14T16:45:00'),
    status: 'processing',
    description: 'Relatório detalhado de todos os imóveis',
    records: 850,
    requestedBy: 'Carlos Lima'
  }
];

const mockDataStats = {
  totalRecords: 125000,
  totalSize: '2.4 GB',
  lastBackup: new Date('2024-01-15T02:00:00'),
  backupFrequency: 'daily',
  retentionDays: 30,
  cloudStorage: '85%',
  localStorage: '15%',
  tables: [
    { name: 'users', records: 150, size: '2.1 MB' },
    { name: 'properties', records: 850, size: '45.8 MB' },
    { name: 'clients', records: 12000, size: '8.7 MB' },
    { name: 'deals', records: 2500, size: '15.2 MB' },
    { name: 'financial_transactions', records: 15000, size: '12.3 MB' },
    { name: 'visits', records: 8500, size: '6.8 MB' },
    { name: 'leads', records: 25000, size: '18.5 MB' },
    { name: 'employees', records: 45, size: '1.2 MB' }
  ]
};

const DataManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('backups');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { hasPermission } = usePermissions();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'processing': return 'Processando';
      case 'failed': return 'Falhou';
      default: return 'Desconhecido';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full': return <Database className="h-4 w-4" />;
      case 'incremental': return <RefreshCw className="h-4 w-4" />;
      case 'financial': return <DollarSign className="h-4 w-4" />;
      case 'clients': return <Users className="h-4 w-4" />;
      case 'properties': return <Building className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'cloud': return <Cloud className="h-4 w-4" />;
      case 'local': return <HardDrive className="h-4 w-4" />;
      default: return <Archive className="h-4 w-4" />;
    }
  };

  const filteredBackups = mockBackups.filter(backup =>
    backup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    backup.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredExports = mockExports.filter(export_ =>
    export_.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    export_.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Gerenciamento de Dados
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Backup, exportação e segurança dos dados do sistema
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Restaurar</span>
            <span className="sm:hidden">Restaurar</span>
          </Button>
          <Button className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Database className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Novo Backup</span>
            <span className="sm:hidden">Backup</span>
          </Button>
        </div>
      </div>

      {/* Estatísticas dos Dados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total de Registros
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {mockDataStats.totalRecords.toLocaleString()}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockDataStats.tables.length} tabelas
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Database className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Tamanho Total
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {mockDataStats.totalSize}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Último backup: {formatDate(mockDataStats.lastBackup)}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <HardDrive className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Armazenamento Cloud
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  {mockDataStats.cloudStorage}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockDataStats.localStorage} local
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Cloud className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Retenção
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-secondary-600 dark:text-white">
                  {mockDataStats.retentionDays} dias
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Backup {mockDataStats.backupFrequency}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Navegação */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('backups')}
          className={`flex-1 px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
            activeTab === 'backups'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Backups
        </button>
        <button
          onClick={() => setActiveTab('exports')}
          className={`flex-1 px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
            activeTab === 'exports'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Exportações
        </button>
        <button
          onClick={() => setActiveTab('tables')}
          className={`flex-1 px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
            activeTab === 'tables'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Tabelas
        </button>
      </div>

      {/* Filtros */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo das Tabs */}
      {activeTab === 'backups' && (
        <div className="space-y-3 sm:space-y-4">
          {filteredBackups.map((backup) => (
            <Card key={backup.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 min-w-0 flex-1">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                      {getTypeIcon(backup.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white truncate">
                        {backup.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {backup.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          {formatDate(backup.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          {getLocationIcon(backup.location)}
                          {backup.location}
                        </span>
                        <span>{backup.size}</span>
                        <span>{backup.records.toLocaleString()} registros</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Badge variant={getStatusColor(backup.status) as any} className="text-xs">
                      {getStatusText(backup.status)}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                        <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'exports' && (
        <div className="space-y-3 sm:space-y-4">
          {filteredExports.map((export_) => (
            <Card key={export_.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 min-w-0 flex-1">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      {getTypeIcon(export_.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white truncate">
                        {export_.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {export_.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          {formatDate(export_.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3 sm:h-4 sm:w-4" />
                          {export_.requestedBy}
                        </span>
                        <span>{export_.format}</span>
                        <span>{export_.size}</span>
                        <span>{export_.records.toLocaleString()} registros</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Badge variant={getStatusColor(export_.status) as any} className="text-xs">
                      {getStatusText(export_.status)}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                        <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'tables' && (
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
            <CardTitle className="text-sm sm:text-base md:text-lg">
              Estrutura do Banco de Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {mockDataStats.tables.map((table) => (
                <div key={table.name} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                      <Database className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                        {table.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {table.records.toLocaleString()} registros
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 flex-shrink-0">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {table.size}
                    </span>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                        <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataManagementPage;
