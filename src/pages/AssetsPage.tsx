import React, { useState } from 'react';
import { 
  Building, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
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
  mockAssets
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import type { Asset } from '../types/financial';
import { usePermissions } from '../hooks/usePermissions';

export const AssetsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { hasPermission } = usePermissions();

  // Filtros para patrimônio
  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || asset.category === selectedCategory;
    const matchesStatus = !selectedStatus || asset.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'inactive':
        return 'danger';
      case 'disposed':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'active': 'Ativo',
      'maintenance': 'Manutenção',
      'inactive': 'Inativo',
      'disposed': 'Descarte'
    };
    return statusMap[status] || status;
  };

  const openAssetModal = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowModal(true);
  };

  // Calcular métricas
  const totalValue = mockAssets.reduce((sum, a) => sum + a.currentValue, 0);
  const totalCost = mockAssets.reduce((sum, a) => sum + a.purchaseValue, 0);
  const totalDepreciation = mockAssets.reduce((sum, a) => sum + a.accumulatedDepreciation, 0);
  const activeAssets = mockAssets.filter(a => a.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white">
            Patrimônio e Ativos
          </h1>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            Gestão de patrimônio, ativos e controle de depreciação
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <ConditionalMenu requiredPermission="financial">
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Exportar</span>
              <span className="sm:hidden">Exportar</span>
            </Button>
          </ConditionalMenu>
          <ConditionalMenu requiredPermission="financial">
            <Button className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Novo Ativo</span>
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
                  Valor Total dos Ativos
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {formatCurrency(totalValue)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {mockAssets.length} ativos
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Custo Total de Aquisição
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-success-600 dark:text-white">
                  {formatCurrency(totalCost)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Valor original
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="h-5 w-5 sm:h-6 sm:w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Depreciação Total
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-destructive-600 dark:text-white">
                  {formatCurrency(totalDepreciation)}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {((totalDepreciation / totalCost) * 100).toFixed(1)}% do custo
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-destructive-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-secondary-600 dark:text-white truncate">
                  Ativos Ativos
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-white">
                  {activeAssets}
                </p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  {((activeAssets / mockAssets.length) * 100).toFixed(1)}% do total
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
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
                placeholder="Buscar ativos..."
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
              <option value="Imóveis">Imóveis</option>
              <option value="Equipamentos">Equipamentos</option>
              <option value="Veículos">Veículos</option>
              <option value="Tecnologia">Tecnologia</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="maintenance">Manutenção</option>
              <option value="inactive">Inativo</option>
              <option value="disposed">Descarte</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Ativos */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-sm sm:text-base text-secondary-900 dark:text-white">
            Patrimônio ({filteredAssets.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base text-secondary-900 dark:text-white truncate">
                      {asset.name}
                    </p>
                    <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">
                      {asset.category} • {asset.description}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-500 truncate">
                      Comprado em {formatDate(asset.purchaseDate)} • {asset.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-sm sm:text-base text-primary-600 dark:text-primary-400">
                      {formatCurrency(asset.currentValue)}
                    </p>
                    <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
                      Custo: {formatCurrency(asset.purchaseValue)}
                    </p>
                    <Badge variant={getStatusColor(asset.status) as any} className="text-xs mt-1">
                      {getStatusText(asset.status)}
                    </Badge>
                  </div>
                  <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAssetModal(asset)}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                    >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
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
        {selectedAsset && (
          <div className="flex flex-col h-full">
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
              {/* Header Personalizado do Modal */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Ativo: {selectedAsset.name}
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
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Informações do Ativo</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Nome:</strong> {selectedAsset.name}</p>
                    <p><strong>Categoria:</strong> {selectedAsset.category}</p>
                    <p><strong>Descrição:</strong> {selectedAsset.description}</p>
                    <p><strong>Localização:</strong> {selectedAsset.location}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Informações Financeiras</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Valor Atual:</strong> {formatCurrency(selectedAsset.currentValue)}</p>
                    <p><strong>Preço de Compra:</strong> {formatCurrency(selectedAsset.purchaseValue)}</p>
                    <p><strong>Depreciação:</strong> {formatCurrency(selectedAsset.accumulatedDepreciation)}</p>
                    <p><strong>Data de Compra:</strong> {formatDate(selectedAsset.purchaseDate)}</p>
                  </div>
                </div>
              </div>
              
              {/* Manutenção */}
              {selectedAsset.maintenanceHistory && selectedAsset.maintenanceHistory.length > 0 && (
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Histórico de Manutenção</h4>
                  <div className="space-y-2">
                    {selectedAsset.maintenanceHistory.map((maintenance, index) => (
                      <div key={index} className="flex justify-between items-center p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate">{maintenance.description}</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(maintenance.date)}</p>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white flex-shrink-0">
                          {formatCurrency(maintenance.cost)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              <Button className="text-xs sm:text-sm">
                <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Editar Ativo</span>
                <span className="sm:hidden">Editar</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
