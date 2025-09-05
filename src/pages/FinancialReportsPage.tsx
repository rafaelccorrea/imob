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
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Relatórios Financeiros
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            DRE, Balanço Patrimonial e relatórios financeiros avançados
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <ConditionalMenu requiredPermission="financial">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar Todos
            </Button>
          </ConditionalMenu>
          <ConditionalMenu requiredPermission="financial">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Relatório
            </Button>
          </ConditionalMenu>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Total de Relatórios
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {totalReports}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Relatórios gerados
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <FileSpreadsheet className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  DREs
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {dreReports}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Demonstrações de resultado
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <BarChart3 className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Balanços
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {balanceReports}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Balanços patrimoniais
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <PieChart className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Fluxo de Caixa
                </p>
                <p className={`text-2xl font-bold text-orange-600 dark:text-orange-400`}>
                  {cashFlowReports}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Relatórios de fluxo
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.warning}`}>
                <TrendingUp className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar relatórios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os períodos</option>
              <option value="Q1 2024">Q1 2024</option>
              <option value="Q2 2024">Q2 2024</option>
              <option value="Q3 2024">Q3 2024</option>
              <option value="Q4 2024">Q4 2024</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle className={colors.text.title}>
            Relatórios Financeiros ({filteredReports.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${colors.iconBg.money}`}>
                    <FileSpreadsheet className={`h-5 w-5 ${colors.icons.money}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${colors.text.title}`}>
                      {report.name}
                    </p>
                    <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                      {report.description} • {report.period}
                    </p>
                    <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                      Gerado em {formatDate(report.generatedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={getTypeColor(report.type) as any}>
                      {getTypeText(report.type)}
                    </Badge>
                    <p className={`text-sm text-gray-600 dark:text-gray-300 mt-1`}>
                      {report.fileSize}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openReportModal(report)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
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
        title={`Relatório: ${selectedReport?.name}`}
      >
        {selectedReport && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações do Relatório</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Nome:</strong> {selectedReport.name}</p>
                  <p><strong>Tipo:</strong> {getTypeText(selectedReport.type)}</p>
                  <p><strong>Período:</strong> {selectedReport.period}</p>
                  <p><strong>Descrição:</strong> {selectedReport.description}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Detalhes Técnicos</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Gerado em:</strong> {formatDate(selectedReport.generatedAt)}</p>
                  <p><strong>Tamanho do arquivo:</strong> {selectedReport.fileSize}</p>
                  <p><strong>Formato:</strong> {selectedReport.format}</p>
                  <p><strong>Status:</strong> {selectedReport.status}</p>
                </div>
              </div>
            </div>
            
            {/* Resumo dos Dados */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Resumo dos Dados</h4>
              <div className="space-y-2">
                {selectedReport.summary.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Baixar Relatório
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
