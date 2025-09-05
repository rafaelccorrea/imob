import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Phone,
  Calendar,
  MapPin,
  DollarSign,
  User,
  MessageSquare,
  Clock
} from 'lucide-react';
import { mockLeads } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { Button, Card, CardContent, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import type { Lead } from '../types';
import { usePermissions } from '../hooks/usePermissions';

export const LeadsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const { hasPermission } = usePermissions();

  // Filtros
  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || lead.status === selectedStatus;
    const matchesSource = !selectedSource || lead.source === selectedSource;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'contacted': return 'secondary';
      case 'visit_scheduled': return 'secondary';
      case 'proposal': return 'warning';
      case 'closed': return 'success';
      case 'lost': return 'danger';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'contacted': return 'Em Contato';
      case 'visit_scheduled': return 'Visita Agendada';
      case 'proposal': return 'Proposta';
      case 'closed': return 'Fechado';
      case 'lost': return 'Perdido';
      default: return status;
    }
  };

  const getSourceText = (source: string) => {
    switch (source) {
      case 'website': return 'Website';
      case 'social_media': return 'Redes Sociais';
      case 'referral': return 'Indicação';
      case 'walk_in': return 'Visita';
      case 'phone': return 'Telefone';
      case 'other': return 'Outro';
      default: return source;
    }
  };

  const openLeadModal = (lead: Lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const getDaysSinceContact = (date: Date) => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - new Date(date).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-secondary-900 dark:text-white">
            Gestão de Leads
          </h1>
          <p className="text-sm md:text-base text-secondary-600 dark:text-secondary-400">
            Gerencie seus leads e clientes potenciais
          </p>
        </div>
        <ConditionalMenu requiredPermission="leads">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2 dark:text-white" />
            Novo Lead
          </Button>
        </ConditionalMenu>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os status</option>
              <option value="new">Novo</option>
              <option value="contacted">Em Contato</option>
              <option value="visit_scheduled">Visita Agendada</option>
              <option value="proposal">Proposta</option>
              <option value="closed">Fechado</option>
              <option value="lost">Perdido</option>
            </select>
            
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todas as origens</option>
              <option value="website">Website</option>
              <option value="social_media">Redes Sociais</option>
              <option value="referral">Indicação</option>
              <option value="walk_in">Visita</option>
              <option value="phone">Telefone</option>
              <option value="other">Outro</option>
            </select>
            
                         <Button variant="outline" className="flex items-center">
               <Filter className="h-4 w-4 mr-2 dark:text-white" />
               Mais Filtros
             </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Total de Leads</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-white">{mockLeads.length}</p>
              </div>
                                            <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                 <Users className="h-6 w-6 text-primary-600 dark:text-white" />
               </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Novos</p>
                <p className="text-2xl font-bold text-default-600 dark:text-white">
                  {mockLeads.filter(l => l.status === 'new').length}
                </p>
              </div>
                                            <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                 <Users className="h-6 w-6 text-secondary-600 dark:text-white" />
               </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Em Contato</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-white">
                  {mockLeads.filter(l => l.status === 'contacted').length}
                </p>
              </div>
                                            <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                 <MessageSquare className="h-6 w-6 text-primary-600 dark:text-white" />
               </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                                 <p className="text-sm font-medium text-secondary-600 dark:text-white">Fechados</p>
                 <p className="text-2xl font-bold text-success-600 dark:text-white">
                   {mockLeads.filter(l => l.status === 'closed').length}
                 </p>
              </div>
                                            <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                 <DollarSign className="h-6 w-6 text-success-600 dark:text-white" />
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Leads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600 dark:text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base md:text-lg dark:text-white truncate">{lead.name}</h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 truncate">{lead.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openLeadModal(lead)}
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
              
              <div className="space-y-3">
                 <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                   <Phone className="h-4 w-4 mr-2 dark:text-white" />
                   <span>{lead.phone}</span>
                 </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <Badge variant={getStatusColor(lead.status) as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'}>
                    {getStatusText(lead.status)}
                  </Badge>
                  <Badge variant="default">
                    {getSourceText(lead.source)}
                  </Badge>
                </div>
                
                 {lead.lastContact && (
                   <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                     <Clock className="h-4 w-4 mr-2 dark:text-white" />
                     <span>Último contato há {getDaysSinceContact(lead.lastContact)} dias</span>
                   </div>
                 )}
                 
                 {lead.interests.maxPrice && (
                   <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                     <DollarSign className="h-4 w-4 mr-2 dark:text-white" />
                     <span>Até {formatCurrency(lead.interests.maxPrice)}</span>
                   </div>
                 )}
                 
                 {lead.interests.neighborhoods.length > 0 && (
                   <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                     <MapPin className="h-4 w-4 mr-2 dark:text-white" />
                     <span>{lead.interests.neighborhoods.join(', ')}</span>
                   </div>
                 )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2 dark:text-white" />
                  Ligar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2 dark:text-white" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2 dark:text-white" />
                  Agendar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Lead: ${selectedLead?.name}`}
      >
        {selectedLead && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h4 className="font-semibold mb-3">Informações de Contato</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Nome:</strong> {selectedLead.name}</p>
                  <p><strong>Email:</strong> {selectedLead.email}</p>
                  <p><strong>Telefone:</strong> {selectedLead.phone}</p>
                  <p><strong>Status:</strong> {getStatusText(selectedLead.status)}</p>
                  <p><strong>Origem:</strong> {getSourceText(selectedLead.source)}</p>
                  {selectedLead.lastContact && (
                    <p><strong>Último contato:</strong> {formatDate(selectedLead.lastContact)}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Interesses</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Tipos de imóvel:</strong></p>
                  <div className="flex flex-wrap gap-1">
                    {selectedLead.interests.propertyTypes.map((type: string) => (
                      <Badge key={type} variant="default" className="text-xs">
                        {type === 'house' ? 'Casa' : 
                         type === 'apartment' ? 'Apartamento' : 
                         type === 'commercial' ? 'Comercial' : 
                         type === 'land' ? 'Terreno' : type}
                      </Badge>
                    ))}
                  </div>
                  
                  <p><strong>Bairros de interesse:</strong></p>
                  <div className="flex flex-wrap gap-1">
                    {selectedLead.interests.neighborhoods.map((neighborhood: string) => (
                      <Badge key={neighborhood} variant="outline" className="text-xs">
                        {neighborhood}
                      </Badge>
                    ))}
                  </div>
                  
                  {selectedLead.interests.maxPrice && (
                    <p><strong>Preço máximo:</strong> {formatCurrency(selectedLead.interests.maxPrice)}</p>
                  )}
                  
                  {selectedLead.interests.minBedrooms && (
                    <p><strong>Mínimo de quartos:</strong> {selectedLead.interests.minBedrooms}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Notas */}
            {selectedLead.notes.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Notas</h4>
                <div className="space-y-2">
                  {selectedLead.notes.map((note: string, index: number) => (
                    <div key={index} className="p-3 bg-secondary-50 rounded-lg text-sm">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
                             <Button>
                 <Edit className="h-4 w-4 mr-2 dark:text-white" />
                 Editar Lead
               </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
