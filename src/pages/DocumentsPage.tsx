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
import type { Document } from '../types';

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
    fileUrl: '/documents/contract-1.pdf',
    uploadedBy: 'admin',
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
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

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

  const openDocumentModal = (document: Document) => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text.title} truncate`}>
            Documentos & Contratos
          </h1>
          <p className={`text-xs sm:text-sm ${colors.text.body}`}>
            Gestão completa de documentação imobiliária
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
            <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Importar</span>
            <span className="sm:hidden">Import.</span>
          </Button>
          <Button className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Novo Documento</span>
            <span className="sm:hidden">Novo</span>
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
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
              className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
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
              className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
            >
              <option value="">Todas as categorias</option>
              <option value="sales">Venda</option>
              <option value="purchase">Compra</option>
              <option value="rental">Locação</option>
              <option value="property">Imóvel</option>
            </select>
            
            <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mais Filtros</span>
              <span className="sm:hidden">Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Total</p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.text.title}`}>{stats.total}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <FileText className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Ativos</p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.icons.success}`}>{stats.active}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.success} flex items-center justify-center flex-shrink-0`}>
                <CheckCircle className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Pendentes</p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.icons.warning}`}>{stats.pending}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.warning} flex items-center justify-center flex-shrink-0`}>
                <Clock className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Expirados</p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.icons.error}`}>{stats.expired}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.error} flex items-center justify-center flex-shrink-0`}>
                <AlertCircle className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Assinados</p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.icons.success}`}>{stats.signed}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.success} flex items-center justify-center flex-shrink-0`}>
                <CheckCircle className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Contratos</p>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.icons.info}`}>{stats.contracts}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <FileText className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Documentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
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
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                      <TypeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-semibold text-sm sm:text-base md:text-lg ${colors.text.title} truncate`}>
                        {doc.title}
                      </h3>
                      <p className={`text-xs sm:text-sm ${colors.text.body} truncate`}>
                        {doc.propertyTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <Badge variant={type.color as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'} className="text-xs">
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {type.label}
                    </Badge>
                    <Badge variant={status.color as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'} className="text-xs">
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                    <Badge variant={priority.color as 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'default'} className="text-xs">
                      <PriorityIcon className="h-3 w-3 mr-1" />
                      {priority.label}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm ${colors.text.body}`}>
                    <div className="flex items-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="truncate">{doc.clientName}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="truncate">{doc.agentName}</span>
                    </div>
                  </div>
                  
                  <div className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm ${colors.text.body}`}>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span>Criado: {formatDate(doc.createdAt)}</span>
                    </div>
                    {doc.expiresAt && (
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className={isExpired(doc.expiresAt) ? colors.icons.error : 
                                       isExpiringSoon(doc.expiresAt) ? colors.icons.warning : colors.text.body}>
                          Expira: {formatDate(doc.expiresAt)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs sm:text-sm ${colors.text.body}`}>
                    <span>Versão: {doc.version}</span>
                    <span>Tamanho: {doc.size}</span>
                  </div>
                  
                  {doc.isSigned && (
                    <div className={`flex items-center text-xs sm:text-sm ${colors.icons.success}`}>
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span>Documento assinado</span>
                    </div>
                  )}
                  
                  {isExpiringSoon(doc.expiresAt) && (
                    <div className={`flex items-center text-xs sm:text-sm ${colors.icons.warning} ${colors.statusBg.pending} p-2 rounded-lg`}>
                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span>Expira em breve</span>
                    </div>
                  )}
                  
                  {isExpired(doc.expiresAt) && (
                    <div className={`flex items-center text-xs sm:text-sm ${colors.icons.error} ${colors.statusBg.cancelled} p-2 rounded-lg`}>
                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span>Documento expirado</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    onClick={() => openDocumentModal(doc)}
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Visualizar</span>
                    <span className="sm:hidden">Ver</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Baixar</span>
                    <span className="sm:hidden">Download</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Upload</span>
                    <span className="sm:hidden">↑</span>
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
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <h2 className={`text-lg sm:text-xl font-bold ${colors.text.title} truncate`}>
                Detalhes do Documento
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
              >
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 md:space-y-6 pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className={`font-semibold mb-2 sm:mb-3 ${colors.text.title} flex items-center text-sm sm:text-base`}>
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Informações do Documento
                    </h4>
                    <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                      <p><strong>Título:</strong> {selectedDocument.title}</p>
                      <p><strong>Tipo:</strong> {getTypeConfig(selectedDocument.type).label}</p>
                      <p><strong>Categoria:</strong> {selectedDocument.category}</p>
                      <p><strong>Versão:</strong> {selectedDocument.version}</p>
                      <p><strong>Tamanho:</strong> {selectedDocument.size}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className={`font-semibold mb-2 sm:mb-3 ${colors.text.title} flex items-center text-sm sm:text-base`}>
                      <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Imóvel
                    </h4>
                    <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                      <p><strong>Título:</strong> {selectedDocument.propertyTitle}</p>
                      <p><strong>ID:</strong> {selectedDocument.propertyId}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className={`font-semibold mb-2 sm:mb-3 ${colors.text.title} flex items-center text-sm sm:text-base`}>
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Envolvidos
                    </h4>
                    <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                      <p><strong>Cliente:</strong> {selectedDocument.clientName}</p>
                      <p><strong>Corretor:</strong> {selectedDocument.agentName}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className={`font-semibold mb-2 sm:mb-3 ${colors.text.title} flex items-center text-sm sm:text-base`}>
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Datas
                    </h4>
                    <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                      <p><strong>Criado:</strong> {formatDate(selectedDocument.createdAt)}</p>
                      <p><strong>Atualizado:</strong> {formatDate(selectedDocument.updatedAt)}</p>
                      {selectedDocument.expiresAt && (
                        <p><strong>Expira:</strong> {formatDate(selectedDocument.expiresAt)}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              <Button variant="outline" className="text-xs sm:text-sm">
                <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Editar
              </Button>
              <Button className="text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Baixar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
