import React, { useState } from 'react';
import {
  Key as KeyIcon,
  User,
  Calendar,
  Clock,
  MapPin,
  Building,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
} from 'lucide-react';
import { Button, Card, CardContent, Badge, Input, Modal } from '../components/ui';
import { colors } from '../utils/colors';
import type { Key } from '../types';

// Mock data para controle de chaves
const mockKeys = [
  {
    id: '1',
    propertyId: 'prop-1',
    propertyTitle: 'Apartamento 3 quartos - Centro',
    propertyAddress: 'Rua das Flores, 123 - Centro',
    keyCode: 'CHV-001',
    status: 'available', // available, borrowed, lost, maintenance
    borrowedBy: null,
    borrowedAt: null,
    returnedAt: null,
    notes: 'Chave principal do apartamento',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    propertyId: 'prop-2',
    propertyTitle: 'Casa 4 quartos - Jardins',
    propertyAddress: 'Av. Paulista, 456 - Jardins',
    keyCode: 'CHV-002',
    status: 'borrowed',
    borrowedBy: 'João Silva',
    borrowedAt: '2024-01-20T14:30:00Z',
    returnedAt: null,
    notes: 'Chave da casa com garagem',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    propertyId: 'prop-3',
    propertyTitle: 'Sobrado 2 quartos - Vila Madalena',
    propertyAddress: 'Rua Harmonia, 789 - Vila Madalena',
    keyCode: 'CHV-003',
    status: 'maintenance',
    borrowedBy: null,
    borrowedAt: null,
    returnedAt: null,
    notes: 'Chave em manutenção - fechadura com problema',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-22T09:15:00Z'
  }
];

const statusConfig = {
  available: { label: 'Disponível', color: 'success', icon: CheckCircle },
  borrowed: { label: 'Emprestada', color: 'warning', icon: Clock },
  lost: { label: 'Perdida', color: 'destructive', icon: AlertCircle },
  maintenance: { label: 'Manutenção', color: 'secondary', icon: AlertCircle }
};

export const KeysPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);

  const filteredKeys = mockKeys.filter(key => {
    const matchesSearch = key.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          key.keyCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          key.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || key.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.available;
  };

  const openKeyModal = (key: Key) => {
    setSelectedKey(key);
    setShowModal(true);
  };

  const getStatusStats = () => {
    return mockKeys.reduce((acc, key) => {
      acc[key.status] = (acc[key.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const stats = getStatusStats();

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text.title} truncate`}>
            Controle de Chaves
          </h1>
          <p className={`text-xs sm:text-sm ${colors.text.body}`}>
            Gerencie o empréstimo e devolução de chaves dos imóveis
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button className="w-full sm:w-auto">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Nova Chave</span>
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
            <Input
              placeholder="Buscar por imóvel, código da chave ou endereço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 sm:pl-10 text-xs sm:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm"
          >
            <option value="">Todos os status</option>
            <option value="available">Disponível</option>
            <option value="borrowed">Emprestada</option>
            <option value="lost">Perdida</option>
            <option value="maintenance">Manutenção</option>
          </select>
          <Button variant="outline" className="text-xs sm:text-sm">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Filtros</span>
            <span className="sm:hidden">Filt.</span>
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Total</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.text.title}`}>{mockKeys.length}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <KeyIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Disponíveis</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.success}`}>{stats.available || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.success} flex items-center justify-center flex-shrink-0`}>
                <CheckCircle className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Emprestadas</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.warning}`}>{stats.borrowed || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.warning} flex items-center justify-center flex-shrink-0`}>
                <Clock className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Problemas</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.error}`}>{(stats.lost || 0) + (stats.maintenance || 0)}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.error} flex items-center justify-center flex-shrink-0`}>
                <AlertCircle className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Chaves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredKeys.map((key) => {
          const status = getStatusConfig(key.status);
          const StatusIcon = status.icon;

          return (
            <Card key={key.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                      <KeyIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-semibold text-sm sm:text-lg ${colors.text.title} truncate`}>
                        {key.propertyTitle}
                      </h3>
                      <p className={`text-xs sm:text-sm ${colors.text.body} truncate`}>
                        Código: {key.keyCode}
                      </p>
                    </div>
                  </div>
                  <Badge variant={status.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} className="text-xs flex-shrink-0">
                    <StatusIcon className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline">{status.label}</span>
                    <span className="sm:hidden">{status.label.charAt(0)}</span>
                  </Badge>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className={`flex items-center text-xs sm:text-sm ${colors.text.body}`}>
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">{key.propertyAddress}</span>
                  </div>

                  {key.borrowedBy && (
                    <div className={`flex items-center text-xs sm:text-sm ${colors.text.body}`}>
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="truncate">Emprestada para: {key.borrowedBy}</span>
                    </div>
                  )}

                  {key.borrowedAt && (
                    <div className={`flex items-center text-xs sm:text-sm ${colors.text.body}`}>
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="truncate">Emprestada em: {new Date(key.borrowedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}

                  {key.notes && (
                    <div className={`text-xs sm:text-sm ${colors.text.body} bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-lg`}>
                      <strong>Observações:</strong> {key.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs sm:text-sm"
                    onClick={() => openKeyModal(key)}
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Ver Detalhes</span>
                    <span className="sm:hidden">Ver</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs sm:text-sm"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Editar</span>
                    <span className="sm:hidden">Edit.</span>
                  </Button>
                  {key.status === 'available' && (
                    <Button
                      size="sm"
                      className="flex-1 text-xs sm:text-sm"
                    >
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Emprestar</span>
                      <span className="sm:hidden">Emp.</span>
                    </Button>
                  )}
                  {key.status === 'borrowed' && (
                    <Button
                      size="sm"
                      className="flex-1 text-xs sm:text-sm"
                    >
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Devolver</span>
                      <span className="sm:hidden">Dev.</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        {selectedKey && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-lg sm:text-xl font-bold ${colors.text.title}`}>
                Detalhes da Chave
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
              >
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title} flex items-center`}>
                    <KeyIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Informações da Chave
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    <p><strong>Código:</strong> {selectedKey.keyCode}</p>
                    <p><strong>Status:</strong> {getStatusConfig(selectedKey.status).label}</p>
                    <p><strong>Observações:</strong> {selectedKey.notes}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title} flex items-center`}>
                    <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Imóvel
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    <p><strong>Título:</strong> {selectedKey.propertyTitle}</p>
                    <p><strong>Endereço:</strong> {selectedKey.propertyAddress}</p>
                    <p><strong>ID:</strong> {selectedKey.propertyId}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title} flex items-center`}>
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Empréstimo
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    {selectedKey.borrowedBy ? (
                      <>
                        <p><strong>Emprestada para:</strong> {selectedKey.borrowedBy}</p>
                        <p><strong>Data do empréstimo:</strong> {new Date(selectedKey.borrowedAt).toLocaleDateString('pt-BR')}</p>
                        {selectedKey.returnedAt && (
                          <p><strong>Data da devolução:</strong> {new Date(selectedKey.returnedAt).toLocaleDateString('pt-BR')}</p>
                        )}
                      </>
                    ) : (
                      <p>Chave disponível</p>
                    )}
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title} flex items-center`}>
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Histórico
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    <p><strong>Criada em:</strong> {new Date(selectedKey.createdAt).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Atualizada em:</strong> {new Date(selectedKey.updatedAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              <Button className="text-xs sm:text-sm">
                <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Editar Chave
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
