import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  DollarSign,
  Calendar,
  User,
  CheckCircle,
  Clock
} from 'lucide-react';
import { mockDeals, mockProperties } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { Button, Card, CardContent, Badge, Input, Modal } from '../components/ui';

export const DealsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);

  // Filtros
  const filteredDeals = mockDeals.filter(deal => {
    const property = mockProperties.find(p => p.id === deal.propertyId);
    const matchesSearch = property?.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || deal.type === selectedType;
    const matchesStatus = !selectedStatus || deal.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'negotiating': return 'warning';
      case 'approved': return 'primary';
      case 'signed': return 'success';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'negotiating': return 'Em Negociação';
      case 'approved': return 'Aprovado';
      case 'signed': return 'Assinado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'sale': return 'Venda';
      case 'rent': return 'Locação';
      default: return type;
    }
  };

  const openDealModal = (deal: any) => {
    setSelectedDeal(deal);
    setShowModal(true);
  };

  const getPropertyTitle = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.title || 'Imóvel não encontrado';
  };

  // Função para detectar se está no modo dark
  const isDarkMode = () => {
    return document.documentElement.classList.contains('dark');
  };

  // Função para obter a cor do valor baseada no tipo
  const getValueColor = (type: string) => {
    const dark = isDarkMode();
    if (type === 'sale') {
      return dark ? '#4ade80' : '#16a34a'; // Verde para vendas
    } else {
      return dark ? '#4ade80' : '#16a34a'; // Verde para locações também
    }
  };

  // Função para obter a cor da comissão (sempre vermelho)
  const getCommissionColor = () => {
    const dark = isDarkMode();
    return dark ? '#f87171' : '#dc2626'; // Vermelho para comissões
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
                     <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
             Vendas & Locações
           </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Gerencie suas negociações e contratos
          </p>
        </div>
                 <Button>
           <Plus className="h-4 w-4 mr-2 dark:text-white" />
           Nova Negociação
         </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400 dark:text-gray-300" />
              <Input
                placeholder="Buscar negociações..."
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
              <option value="sale" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Venda</option>
              <option value="rent" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Locação</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="negotiating" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Em Negociação</option>
              <option value="approved" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Aprovado</option>
              <option value="signed" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Assinado</option>
              <option value="cancelled" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Cancelado</option>
            </select>
            
                         <Button variant="outline" className="flex items-center">
               <Filter className="h-4 w-4 mr-2 dark:text-white" />
               Mais Filtros
             </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Total de Negociações</p>
                 <p className="text-2xl font-bold text-primary-600 dark:text-white">{mockDeals.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Em Negociação</p>
                 <p className="text-2xl font-bold text-warning-600 dark:text-white">
                   {mockDeals.filter(d => d.status === 'negotiating').length}
                 </p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Assinados</p>
                 <p className="text-2xl font-bold text-success-600 dark:text-white">
                   {mockDeals.filter(d => d.status === 'signed').length}
                 </p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Valor Total</p>
                                 <p className="text-2xl font-bold text-success-600 dark:text-success-400" style={{ color: getValueColor('sale') }}>
                   {formatCurrency(mockDeals.reduce((sum, deal) => sum + deal.value, 0))}
                 </p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Negociações */}
      <div className="space-y-4">
        {filteredDeals.map((deal) => (
          <Card key={deal.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                                         <DollarSign className={`h-6 w-6 ${
                       deal.type === 'sale' ? 'text-success-600 dark:text-white' : 'text-primary-600 dark:text-white'
                     }`} />
                  </div>
                  
                  <div>
                                         <h3 className="font-semibold text-lg dark:text-white">
                       {getPropertyTitle(deal.propertyId)}
                     </h3>
                     <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {getTypeText(deal.type)} • {formatCurrency(deal.value)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                                         <p className="text-sm font-medium text-success-600 dark:text-success-400" style={{ color: getValueColor(deal.type) }}>
                       {formatCurrency(deal.value)}
                     </p>
                                          <p className="text-xs text-secondary-600 dark:text-secondary-400" style={{ color: getCommissionColor() }}>
                       Comissão: {formatCurrency(deal.commission)}
                     </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(deal.status) as any}>
                      {getStatusText(deal.status)}
                    </Badge>
                    
                                         <Button
                       variant="ghost"
                       size="sm"
                       onClick={() => openDealModal(deal)}
                     >
                       <Eye className="h-4 w-4 dark:text-white" />
                     </Button>
                     
                     <Button
                       variant="ghost"
                       size="sm"
                     >
                       <Edit className="h-4 w-4 dark:text-white" />
                     </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                                      <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                   <Calendar className="h-4 w-4 mr-2 dark:text-white" />
                   <span>Criado em {formatDate(deal.createdAt)}</span>
                 </div>
                 
                 {deal.signedAt && (
                   <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                     <CheckCircle className="h-4 w-4 mr-2 dark:text-white" />
                     <span>Assinado em {formatDate(deal.signedAt)}</span>
                   </div>
                 )}
                 
                 <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                   <User className="h-4 w-4 mr-2 dark:text-white" />
                   <span>Corretor ID: {deal.agentId}</span>
                 </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Negociação: ${selectedDeal ? getPropertyTitle(selectedDeal.propertyId) : ''}`}
        className="max-w-4xl"
      >
        {selectedDeal && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações da Negociação</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Tipo:</strong> {getTypeText(selectedDeal.type)}</p>
                  <p><strong>Status:</strong> {getStatusText(selectedDeal.status)}</p>
                  <p><strong>Valor:</strong> {formatCurrency(selectedDeal.value)}</p>
                  <p><strong>Comissão:</strong> {formatCurrency(selectedDeal.commission)}</p>
                  <p><strong>Corretor ID:</strong> {selectedDeal.agentId}</p>
                  <p><strong>Cliente ID:</strong> {selectedDeal.clientId}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Datas</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Criado em:</strong> {formatDate(selectedDeal.createdAt)}</p>
                  <p><strong>Atualizado em:</strong> {formatDate(selectedDeal.updatedAt)}</p>
                  {selectedDeal.signedAt && (
                    <p><strong>Assinado em:</strong> {formatDate(selectedDeal.signedAt)}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Imóvel */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Imóvel</h4>
              <div className="p-4 bg-secondary-50 dark:bg-gray-800 rounded-lg">
                <p className="font-medium text-gray-900 dark:text-gray-100">{getPropertyTitle(selectedDeal.propertyId)}</p>
                <p className="text-sm text-secondary-600 dark:text-gray-300">ID: {selectedDeal.propertyId}</p>
              </div>
            </div>
            
            {/* Documentos */}
            {selectedDeal.documents.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Documentos</h4>
                <div className="space-y-2">
                  {selectedDeal.documents.map((doc: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-900 dark:text-gray-100">{doc}</span>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Notas */}
            {selectedDeal.notes.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Notas</h4>
                <div className="space-y-2">
                  {selectedDeal.notes.map((note: string, index: number) => (
                    <div key={index} className="p-3 bg-secondary-50 dark:bg-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100">
                      {note}
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
                 <Edit className="h-4 w-4 mr-2 dark:text-white" />
                 Editar Negociação
               </Button>
                               {selectedDeal.status === 'approved' && (
                  <Button variant="primary">
                    <CheckCircle className="h-4 w-4 mr-2 dark:text-white" />
                    Gerar Contrato
                  </Button>
                )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
