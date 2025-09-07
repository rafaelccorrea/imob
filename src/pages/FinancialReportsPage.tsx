import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  XCircle as XCircleIcon,
  UserPlus,
  ClipboardList,
  Users,
  UserCheck,
  UserX,
  Crown,
  Medal,
  Trophy,
  Flag,
  Zap,
  Sparkles,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Droplets,
  Flame,
  Snowflake,
  Leaf,
  TreePine,
  Flower2,
  Bug,
  Fish,
  Bird,
} from 'lucide-react';
import { 
  mockFinancialEntries,
  mockFinancialCommissions,
  mockCashFlowEntries,
  mockFinancialMetrics
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import type { FinancialReport } from '../types/financial';
import { usePermissions } from '../hooks/usePermissions';

export const FinancialReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<FinancialReport | null>(null);
  const { hasPermission } = usePermissions();

  // Filtros para relatórios
  const filteredReports = mockFinancialEntries.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || entry.type === selectedType;
    const matchesPeriod = !selectedPeriod || entry.date.includes(selectedPeriod);
    
    return matchesSearch && matchesType && matchesPeriod;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'income_statement':
        return 'success';
      case 'balance_sheet':
        return 'money';
      case 'cash_flow':
        return 'warning';
      case 'budget_variance':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const getTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'income_statement': 'DRE',
      'balance_sheet': 'Balanço Patrimonial',
      'cash_flow': 'Fluxo de Caixa',
      'budget_variance': 'Variação Orçamentária'
    };
    return typeMap[type] || type;
  };

  const openReportModal = (report: FinancialReport) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Calcular métricas
  const totalReports = mockFinancialEntries.length;
  const dreReports = mockFinancialEntries.filter(r => r.type === 'income').length;
  const balanceReports = mockFinancialEntries.filter(r => r.type === 'expense').length;
  const cashFlowReports = mockFinancialEntries.filter(r => r.type === 'commission').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white truncate">
            Relatórios Financeiros
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            DRE, Balanço Patrimonial e relatórios financeiros avançados
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <ConditionalMenu requiredPermission="financial">
            <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Exportar Todos</span>
              <span className="sm:hidden">Exportar</span>
            </Button>
          </ConditionalMenu>
          <ConditionalMenu requiredPermission="financial">
            <Button className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Novo Relatório</span>
              <span className="sm:hidden">Novo</span>
            </Button>
          </ConditionalMenu>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Total de Relatórios
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {totalReports}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Relatórios gerados
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  DREs
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {dreReports}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Demonstrações de resultado
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Balanços
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-secondary-600 dark:text-white">
                  {balanceReports}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Balanços patrimoniais
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <PieChart className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Fluxo de Caixa
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-warning-600 dark:text-white">
                  {cashFlowReports}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Relatórios de fluxo
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600 dark:text-white" />
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
                placeholder="Buscar relatórios..."
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
              <option value="income_statement">DRE</option>
              <option value="balance_sheet">Balanço Patrimonial</option>
              <option value="cash_flow">Fluxo de Caixa</option>
              <option value="budget_variance">Variação Orçamentária</option>
            </select>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os períodos</option>
              <option value="Q1 2024">Q1 2024</option>
              <option value="Q2 2024">Q2 2024</option>
              <option value="Q3 2024">Q3 2024</option>
              <option value="Q4 2024">Q4 2024</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Relatórios */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-sm sm:text-base text-secondary-900 dark:text-white">
            Relatórios Financeiros ({filteredReports.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base text-secondary-900 dark:text-white truncate">
                      {report.name}
                    </p>
                    <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">
                      {report.description} • {report.period}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-500">
                      Gerado em {formatDate(report.generatedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                  <div className="text-left sm:text-right">
                    <Badge variant={getTypeColor(report.type) as any} className="text-xs">
                      {getTypeText(report.type)}
                    </Badge>
                    <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                      {report.fileSize}
                    </p>
                  </div>
                  <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openReportModal(report)}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        {selectedReport && (
          <div className="flex flex-col h-full">
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
              {/* Header Personalizado do Modal */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Relatório: {selectedReport.name}
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
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Informações do Relatório</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Nome:</strong> {selectedReport.name}</p>
                    <p><strong>Tipo:</strong> {getTypeText(selectedReport.type)}</p>
                    <p><strong>Período:</strong> {selectedReport.period}</p>
                    <p><strong>Descrição:</strong> {selectedReport.description}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Detalhes Técnicos</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Gerado em:</strong> {formatDate(selectedReport.generatedAt)}</p>
                    <p><strong>Tamanho do arquivo:</strong> {selectedReport.fileSize}</p>
                    <p><strong>Formato:</strong> {selectedReport.format}</p>
                    <p><strong>Status:</strong> {selectedReport.status}</p>
                  </div>
                </div>
              </div>
              
              {/* Resumo dos Dados */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Resumo dos Dados</h4>
                <div className="space-y-2">
                  {selectedReport.summary.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate">{item.label}</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white flex-shrink-0">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              <Button className="text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Baixar Relatório</span>
                <span className="sm:hidden">Baixar</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
