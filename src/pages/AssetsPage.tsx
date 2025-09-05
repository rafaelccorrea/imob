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
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${colors.text.title}`}>
            Patrimônio e Ativos
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300`}>
            Gestão de patrimônio, ativos e controle de depreciação
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <ConditionalMenu requiredPermission="financial">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </ConditionalMenu>
          <ConditionalMenu requiredPermission="financial">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Ativo
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
                  Valor Total dos Ativos
                </p>
                <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                  {formatCurrency(totalValue)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {mockAssets.length} ativos
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <DollarSign className={`h-6 w-6 ${colors.icons.money}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Custo Total de Aquisição
                </p>
                <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {formatCurrency(totalCost)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  Valor original
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.success}`}>
                <Building className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Depreciação Total
                </p>
                <p className={`text-2xl font-bold text-red-600 dark:text-red-400`}>
                  {formatCurrency(totalDepreciation)}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {((totalDepreciation / totalCost) * 100).toFixed(1)}% do custo
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.error}`}>
                <TrendingUp className={`h-6 w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-gray-600 dark:text-gray-300`}>
                  Ativos Ativos
                </p>
                <p className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}>
                  {activeAssets}
                </p>
                <p className={`text-xs text-gray-600 dark:text-gray-400`}>
                  {((activeAssets / mockAssets.length) * 100).toFixed(1)}% do total
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.iconBg.money}`}>
                <Award className={`h-6 w-6 ${colors.icons.money}`} />
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
                placeholder="Buscar ativos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="maintenance">Manutenção</option>
              <option value="inactive">Inativo</option>
              <option value="disposed">Descarte</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Ativos */}
      <Card>
        <CardHeader>
          <CardTitle className={colors.text.title}>
            Patrimônio ({filteredAssets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${colors.iconBg.money}`}>
                    <Building className={`h-5 w-5 ${colors.icons.money}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${colors.text.title}`}>
                      {asset.name}
                    </p>
                    <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                      {asset.category} • {asset.description}
                    </p>
                    <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                      Comprado em {formatDate(asset.purchaseDate)} • {asset.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-bold text-blue-600 dark:text-blue-400`}>
                      {formatCurrency(asset.currentValue)}
                    </p>
                    <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                      Custo: {formatCurrency(asset.purchaseValue)}
                    </p>
                    <Badge variant={getStatusColor(asset.status) as any}>
                      {getStatusText(asset.status)}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAssetModal(asset)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
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
        title={`Ativo: ${selectedAsset?.name}`}
      >
        {selectedAsset && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações do Ativo</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Nome:</strong> {selectedAsset.name}</p>
                  <p><strong>Categoria:</strong> {selectedAsset.category}</p>
                  <p><strong>Descrição:</strong> {selectedAsset.description}</p>
                  <p><strong>Localização:</strong> {selectedAsset.location}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações Financeiras</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Valor Atual:</strong> {formatCurrency(selectedAsset.currentValue)}</p>
                  <p><strong>Preço de Compra:</strong> {formatCurrency(selectedAsset.purchaseValue)}</p>
                  <p><strong>Depreciação:</strong> {formatCurrency(selectedAsset.accumulatedDepreciation)}</p>
                  <p><strong>Data de Compra:</strong> {formatDate(selectedAsset.purchaseDate)}</p>
                </div>
              </div>
            </div>
            
            {/* Manutenção */}
            {selectedAsset.maintenanceHistory && selectedAsset.maintenanceHistory.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Histórico de Manutenção</h4>
                <div className="space-y-2">
                  {selectedAsset.maintenanceHistory.map((maintenance, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{maintenance.description}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(maintenance.date)}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(maintenance.cost)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar Ativo
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
