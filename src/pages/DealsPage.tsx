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
import type { Deal } from '../types';

export const DealsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Filtros
  const filteredDeals = mockDeals.filter(deal => {
    const property = mockProperties.find(p => p.id === deal.propertyId);
    const matchesSearch = property?.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || deal.type === selectedType;
    const matchesStatus = !selectedStatus || deal.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string): 'default' | 'success' | 'destructive' | 'primary' | 'warning' | 'secondary' | 'outline' => {
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

  const openDealModal = (deal: Deal) => {
    setSelectedDeal(deal);
    setShowModal(true);
  };

  const getPropertyTitle = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.title || 'Imóvel não encontrado';
  };



  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-secondary-900 dark:text-gray-100">
            Vendas & Locações
          </h1>
          <p className="text-sm md:text-base text-secondary-600 dark:text-secondary-400">
            Gerencie suas negociações e contratos
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nova Negociação
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
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
               <Filter className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
               Mais Filtros
             </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-gray-300">Total de Negociações</p>
                 <p className="text-2xl font-bold text-primary-600 dark:text-white">{mockDeals.length}</p>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-gray-300">Em Negociação</p>
                 <p className="text-2xl font-bold text-warning-600 dark:text-white">
                   {mockDeals.filter(d => d.status === 'negotiating').length}
                 </p>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-warning-100 dark:bg-warning-900/20 flex items-center justify-center">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-gray-300">Assinados</p>
                 <p className="text-2xl font-bold text-success-600 dark:text-white">
                   {mockDeals.filter(d => d.status === 'signed').length}
                 </p>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-success-100 dark:bg-success-900/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-gray-300">Valor Total</p>
                <p className="text-2xl font-bold text-success-600 dark:text-green-400">
                  {formatCurrency(mockDeals.reduce((sum, deal) => sum + deal.value, 0))}
                </p>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-success-100 dark:bg-success-900/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Negociações */}
      <div className="space-y-4">
        {filteredDeals.map((deal) => (
          <Card key={deal.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-success-100 dark:bg-success-900/20 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-success-600 dark:text-white" />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base md:text-lg dark:text-gray-100 truncate">
                      {getPropertyTitle(deal.propertyId)}
                    </h3>
                    <p className="text-sm text-secondary-600 dark:text-gray-300 truncate">
                      {getTypeText(deal.type)} • <span className="text-success-600 dark:text-green-400">{formatCurrency(deal.value)}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-success-600 dark:text-green-400">
                      {formatCurrency(deal.value)}
                    </p>
                    <p className="text-xs text-danger-600 dark:text-red-400">
                      Comissão: {formatCurrency(deal.commission)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(deal.status)}>
                      {getStatusText(deal.status)}
                    </Badge>
                    
                                         <Button
                       variant="ghost"
                       size="sm"
                       onClick={() => openDealModal(deal)}
                     >
                       <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                     </Button>
                     
                     <Button
                       variant="ghost"
                       size="sm"
                     >
                       <Edit className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                     </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 text-sm">
                                                                      <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                   <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                   <span>Criado em {formatDate(deal.createdAt)}</span>
                 </div>
                 
                 {deal.signedAt && (
                   <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                     <CheckCircle className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                     <span>Assinado em {formatDate(deal.signedAt)}</span>
                   </div>
                 )}
                 
                 <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                   <User className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
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
                  <p><strong>Valor:</strong> <span className="text-success-600 dark:text-green-400">{formatCurrency(selectedDeal.value)}</span></p>
                  <p><strong>Comissão:</strong> <span className="text-danger-600 dark:text-red-400">{formatCurrency(selectedDeal.commission)}</span></p>
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
                 <Edit className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                 Editar Negociação
               </Button>
                               {selectedDeal.status === 'approved' && (
                  <Button variant="primary">
                    <CheckCircle className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
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
