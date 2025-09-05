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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${colors.text.title}`}>
            Controle de Chaves
          </h1>
          <p className={colors.text.body}>
            Gerencie o empréstimo e devolução de chaves dos imóveis
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Chave
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por imóvel, código da chave ou endereço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">Todos os status</option>
            <option value="available">Disponível</option>
            <option value="borrowed">Emprestada</option>
            <option value="lost">Perdida</option>
            <option value="maintenance">Manutenção</option>
          </select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.body}`}>Total</p>
                <p className={`text-2xl font-bold ${colors.text.title}`}>{mockKeys.length}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center`}>
                <KeyIcon className={`h-6 w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.body}`}>Disponíveis</p>
                <p className={`text-2xl font-bold ${colors.icons.success}`}>{stats.available || 0}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${colors.iconBg.success} flex items-center justify-center`}>
                <CheckCircle className={`h-6 w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.body}`}>Emprestadas</p>
                <p className={`text-2xl font-bold ${colors.icons.warning}`}>{stats.borrowed || 0}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${colors.iconBg.warning} flex items-center justify-center`}>
                <Clock className={`h-6 w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.body}`}>Problemas</p>
                <p className={`text-2xl font-bold ${colors.icons.error}`}>{(stats.lost || 0) + (stats.maintenance || 0)}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${colors.iconBg.error} flex items-center justify-center`}>
                <AlertCircle className={`h-6 w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Chaves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredKeys.map((key) => {
          const status = getStatusConfig(key.status);
          const StatusIcon = status.icon;

          return (
            <Card key={key.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                      <KeyIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg ${colors.text.title}`}>
                        {key.propertyTitle}
                      </h3>
                      <p className={`text-sm ${colors.text.body}`}>
                        Código: {key.keyCode}
                      </p>
                    </div>
                  </div>
                  <Badge variant={status.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className={`flex items-center text-sm ${colors.text.body}`}>
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="truncate">{key.propertyAddress}</span>
                  </div>

                  {key.borrowedBy && (
                    <div className={`flex items-center text-sm ${colors.text.body}`}>
                      <User className="h-4 w-4 mr-2" />
                      <span>Emprestada para: {key.borrowedBy}</span>
                    </div>
                  )}

                  {key.borrowedAt && (
                    <div className={`flex items-center text-sm ${colors.text.body}`}>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Emprestada em: {new Date(key.borrowedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}

                  {key.notes && (
                    <div className={`text-sm ${colors.text.body} bg-gray-50 dark:bg-gray-800 p-3 rounded-lg`}>
                      <strong>Observações:</strong> {key.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openKeyModal(key)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  {key.status === 'available' && (
                    <Button
                      size="sm"
                      className="flex-1"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Emprestar
                    </Button>
                  )}
                  {key.status === 'borrowed' && (
                    <Button
                      size="sm"
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Devolver
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
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-xl font-bold ${colors.text.title}`}>
                Detalhes da Chave
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <AlertCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-3 ${colors.text.title} flex items-center`}>
                    <KeyIcon className="h-4 w-4 mr-2" />
                    Informações da Chave
                  </h4>
                  <div className={`space-y-2 text-sm ${colors.text.subtitle}`}>
                    <p><strong>Código:</strong> {selectedKey.keyCode}</p>
                    <p><strong>Status:</strong> {getStatusConfig(selectedKey.status).label}</p>
                    <p><strong>Observações:</strong> {selectedKey.notes}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-3 ${colors.text.title} flex items-center`}>
                    <Building className="h-4 w-4 mr-2" />
                    Imóvel
                  </h4>
                  <div className={`space-y-2 text-sm ${colors.text.subtitle}`}>
                    <p><strong>Título:</strong> {selectedKey.propertyTitle}</p>
                    <p><strong>Endereço:</strong> {selectedKey.propertyAddress}</p>
                    <p><strong>ID:</strong> {selectedKey.propertyId}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-3 ${colors.text.title} flex items-center`}>
                    <User className="h-4 w-4 mr-2" />
                    Empréstimo
                  </h4>
                  <div className={`space-y-2 text-sm ${colors.text.subtitle}`}>
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
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-3 ${colors.text.title} flex items-center`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Histórico
                  </h4>
                  <div className={`space-y-2 text-sm ${colors.text.subtitle}`}>
                    <p><strong>Criada em:</strong> {new Date(selectedKey.createdAt).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Atualizada em:</strong> {new Date(selectedKey.updatedAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar Chave
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
