import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  Building,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button, Card, CardContent, Badge, Input, Modal } from '../components/ui';
import { colors } from '../utils/colors';

// Mock data para documentos
const mockDocuments = [
  {
    id: '1',
    title: 'Contrato de Venda - Apartamento Centro',
    type: 'contract',
    category: 'sales',
    status: 'active',
    propertyId: '1',
    propertyTitle: 'Apartamento Centro',
    clientName: 'Maria Silva',
    agentName: 'João Santos',
    createdAt: '2024-02-15T10:30:00Z',
    updatedAt: '2024-02-18T14:20:00Z',
    expiresAt: '2024-03-15T10:30:00Z',
    size: '2.5 MB',
    version: '1.0',
    isSigned: true,
    isArchived: false,
    priority: 'high',
  },
  {
    id: '2',
    title: 'Proposta de Compra - Casa Jardim Europa',
    type: 'proposal',
    category: 'purchase',
    status: 'pending',
    propertyId: '3',
    propertyTitle: 'Casa Jardim Europa',
    clientName: 'Carlos Oliveira',
    agentName: 'Ana Costa',
    createdAt: '2024-02-16T14:20:00Z',
    updatedAt: '2024-02-16T14:20:00Z',
    expiresAt: '2024-02-23T14:20:00Z',
    size: '1.8 MB',
    version: '1.0',
    isSigned: false,
    isArchived: false,
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Documentação do Imóvel - Studio Higienópolis',
    type: 'documentation',
    category: 'property',
    status: 'active',
    propertyId: '2',
    propertyTitle: 'Studio Higienópolis',
    clientName: 'Pedro Lima',
    agentName: 'João Santos',
    createdAt: '2024-02-14T09:15:00Z',
    updatedAt: '2024-02-14T09:15:00Z',
    expiresAt: null,
    size: '5.2 MB',
    version: '2.1',
    isSigned: true,
    isArchived: false,
    priority: 'low',
  },
  {
    id: '4',
    title: 'Contrato de Locação - Apartamento Pinheiros',
    type: 'contract',
    category: 'rental',
    status: 'expired',
    propertyId: '4',
    propertyTitle: 'Apartamento Pinheiros',
    clientName: 'Fernanda Santos',
    agentName: 'Ana Costa',
    createdAt: '2023-12-01T10:00:00Z',
    updatedAt: '2024-01-15T16:30:00Z',
    expiresAt: '2024-01-31T10:00:00Z',
    size: '3.1 MB',
    version: '1.0',
    isSigned: true,
    isArchived: true,
    priority: 'low',
  },
];

const typeConfig = {
  contract: { label: 'Contrato', color: 'primary', icon: FileText },
  proposal: { label: 'Proposta', color: 'warning', icon: FileText },
  documentation: { label: 'Documentação', color: 'secondary', icon: FileText },
  receipt: { label: 'Recibo', color: 'success', icon: CheckCircle },
  report: { label: 'Relatório', color: 'default', icon: FileText },
};

const statusConfig = {
  active: { label: 'Ativo', color: 'success', icon: CheckCircle },
  pending: { label: 'Pendente', color: 'warning', icon: Clock },
  expired: { label: 'Expirado', color: 'destructive', icon: AlertCircle },
  archived: { label: 'Arquivado', color: 'secondary', icon: FileText },
};

const priorityConfig = {
  high: { label: 'Alta', color: 'destructive', icon: AlertCircle },
  medium: { label: 'Média', color: 'warning', icon: Clock },
  low: { label: 'Baixa', color: 'success', icon: CheckCircle },
};

export const DocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || doc.type === selectedType;
    const matchesStatus = !selectedStatus || doc.status === selectedStatus;
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const getTypeConfig = (type: string) => {
    return typeConfig[type as keyof typeof typeConfig] || typeConfig.documentation;
  };

  const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  };

  const getPriorityConfig = (priority: string) => {
    return priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.low;
  };

  const openDocumentModal = (document: any) => {
    setSelectedDocument(document);
    setShowModal(true);
  };

  const getDocumentStats = () => {
    const stats = {
      total: mockDocuments.length,
      active: mockDocuments.filter(d => d.status === 'active').length,
      pending: mockDocuments.filter(d => d.status === 'pending').length,
      expired: mockDocuments.filter(d => d.status === 'expired').length,
      signed: mockDocuments.filter(d => d.isSigned).length,
      contracts: mockDocuments.filter(d => d.type === 'contract').length,
    };
    return stats;
  };

  const stats = getDocumentStats();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isExpiringSoon = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    const daysUntilExpiry = Math.ceil((new Date(expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  };

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt).getTime() < new Date().getTime();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${colors.text.title}`}>
            Documentos & Contratos
          </h1>
          <p className={colors.text.body}>
            Gestão completa de documentação imobiliária
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Documento
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar documentos..."
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
              <option value="contract">Contrato</option>
              <option value="proposal">Proposta</option>
              <option value="documentation">Documentação</option>
              <option value="receipt">Recibo</option>
              <option value="report">Relatório</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="pending">Pendente</option>
              <option value="expired">Expirado</option>
              <option value="archived">Arquivado</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todas as categorias</option>
              <option value="sales">Venda</option>
              <option value="purchase">Compra</option>
              <option value="rental">Locação</option>
              <option value="property">Imóvel</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.body}`}>Total</p>
                <p className={`text-2xl font-bold ${colors.text.title}`}>{stats.total}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center`}>
                <FileText className={`h-6 w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.body}`}>Ativos</p>
                <p className={`text-2xl font-bold ${colors.icons.success}`}>{stats.active}</p>
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
                <p className={`text-sm font-medium ${colors.text.body}`}>Pendentes</p>
                <p className={`text-2xl font-bold ${colors.icons.warning}`}>{stats.pending}</p>
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
                <p className={`text-sm font-medium ${colors.text.body}`}>Expirados</p>
                <p className={`text-2xl font-bold ${colors.icons.error}`}>{stats.expired}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${colors.iconBg.error} flex items-center justify-center`}>
                <AlertCircle className={`h-6 w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.body}`}>Assinados</p>
                <p className={`text-2xl font-bold ${colors.icons.success}`}>{stats.signed}</p>
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
                <p className={`text-sm font-medium ${colors.text.body}`}>Contratos</p>
                <p className={`text-2xl font-bold ${colors.icons.info}`}>{stats.contracts}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center`}>
                <FileText className={`h-6 w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Documentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDocuments.map((doc) => {
          const type = getTypeConfig(doc.type);
          const status = getStatusConfig(doc.status);
          const priority = getPriorityConfig(doc.priority);
          const TypeIcon = type.icon;
          const StatusIcon = status.icon;
          const PriorityIcon = priority.icon;
          
          return (
            <Card 
              key={doc.id} 
              className={`hover:shadow-lg transition-shadow ${
                isExpiringSoon(doc.expiresAt) ? 'border-yellow-300 dark:border-yellow-600' : ''
              } ${isExpired(doc.expiresAt) ? 'border-red-300 dark:border-red-600' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                      <TypeIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg ${colors.text.title}`}>
                        {doc.title}
                      </h3>
                      <p className={`text-sm ${colors.text.body}`}>
                        {doc.propertyTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant={type.color as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'}>
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {type.label}
                    </Badge>
                    <Badge variant={status.color as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                    <Badge variant={priority.color as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'}>
                      <PriorityIcon className="h-3 w-3 mr-1" />
                      {priority.label}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className={`flex items-center text-sm ${colors.text.body}`}>
                    <User className="h-4 w-4 mr-2" />
                    <span>{doc.clientName}</span>
                    <User className="h-4 w-4 ml-4 mr-2" />
                    <span>{doc.agentName}</span>
                  </div>
                  
                  <div className={`flex items-center text-sm ${colors.text.body}`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Criado: {formatDate(doc.createdAt)}</span>
                    {doc.expiresAt && (
                      <>
                        <Calendar className="h-4 w-4 ml-4 mr-2" />
                        <span className={isExpired(doc.expiresAt) ? colors.icons.error : 
                                       isExpiringSoon(doc.expiresAt) ? colors.icons.warning : colors.text.body}>
                          Expira: {formatDate(doc.expiresAt)}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className={`flex items-center justify-between text-sm ${colors.text.body}`}>
                    <span>Versão: {doc.version}</span>
                    <span>Tamanho: {doc.size}</span>
                  </div>
                  
                  {doc.isSigned && (
                    <div className={`flex items-center text-sm ${colors.icons.success}`}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Documento assinado</span>
                    </div>
                  )}
                  
                  {isExpiringSoon(doc.expiresAt) && (
                    <div className={`flex items-center text-sm ${colors.icons.warning} ${colors.statusBg.pending} p-2 rounded-lg`}>
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <span>Expira em breve</span>
                    </div>
                  )}
                  
                  {isExpired(doc.expiresAt) && (
                    <div className={`flex items-center text-sm ${colors.icons.error} ${colors.statusBg.cancelled} p-2 rounded-lg`}>
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <span>Documento expirado</span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => openDocumentModal(doc)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
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
        {selectedDocument && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-xl font-bold ${colors.text.title}`}>
                Detalhes do Documento
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
                    <FileText className="h-4 w-4 mr-2" />
                    Informações do Documento
                  </h4>
                  <div className={`space-y-2 text-sm ${colors.text.subtitle}`}>
                    <p><strong>Título:</strong> {selectedDocument.title}</p>
                    <p><strong>Tipo:</strong> {getTypeConfig(selectedDocument.type).label}</p>
                    <p><strong>Categoria:</strong> {selectedDocument.category}</p>
                    <p><strong>Versão:</strong> {selectedDocument.version}</p>
                    <p><strong>Tamanho:</strong> {selectedDocument.size}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-3 ${colors.text.title} flex items-center`}>
                    <Building className="h-4 w-4 mr-2" />
                    Imóvel
                  </h4>
                  <div className={`space-y-2 text-sm ${colors.text.subtitle}`}>
                    <p><strong>Título:</strong> {selectedDocument.propertyTitle}</p>
                    <p><strong>ID:</strong> {selectedDocument.propertyId}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-3 ${colors.text.title} flex items-center`}>
                    <User className="h-4 w-4 mr-2" />
                    Envolvidos
                  </h4>
                  <div className={`space-y-2 text-sm ${colors.text.subtitle}`}>
                    <p><strong>Cliente:</strong> {selectedDocument.clientName}</p>
                    <p><strong>Corretor:</strong> {selectedDocument.agentName}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-3 ${colors.text.title} flex items-center`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Datas
                  </h4>
                  <div className={`space-y-2 text-sm ${colors.text.subtitle}`}>
                    <p><strong>Criado:</strong> {formatDate(selectedDocument.createdAt)}</p>
                    <p><strong>Atualizado:</strong> {formatDate(selectedDocument.updatedAt)}</p>
                    {selectedDocument.expiresAt && (
                      <p><strong>Expira:</strong> {formatDate(selectedDocument.expiresAt)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
