import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Building, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Search,
  Filter,
  CalendarDays,
  Users,
  Car
} from 'lucide-react';
import { Button, Card, CardContent, Badge, Input, Modal } from '../components/ui';
import { colors } from '../utils/colors';
import type { Visit } from '../types';

// Mock data para visitas
const mockVisits = [
  {
    id: '1',
    propertyId: '1',
    propertyTitle: 'Apartamento Centro',
    clientName: 'Maria Silva',
    clientPhone: '(11) 99999-8888',
    clientEmail: 'maria@email.com',
    agentName: 'João Santos',
    date: '2024-02-20',
    time: '14:00',
    duration: 60,
    status: 'scheduled', // scheduled, confirmed, completed, cancelled, no-show
    notes: 'Cliente interessada em 2 quartos, tem cachorro',
    address: 'Rua das Flores, 123 - Centro',
    type: 'in-person', // in-person, virtual
    createdAt: '2024-02-15T10:30:00Z',
  },
  {
    id: '2',
    propertyId: '3',
    propertyTitle: 'Casa Jardim Europa',
    clientName: 'Carlos Oliveira',
    clientPhone: '(11) 88888-7777',
    clientEmail: 'carlos@email.com',
    agentName: 'Ana Costa',
    date: '2024-02-21',
    time: '16:30',
    duration: 90,
    status: 'confirmed',
    notes: 'Família com 2 filhos, procura casa com quintal',
    address: 'Av. Paulista, 1000 - Jardim Europa',
    type: 'in-person',
    createdAt: '2024-02-16T14:20:00Z',
  },
  {
    id: '3',
    propertyId: '2',
    propertyTitle: 'Studio Higienópolis',
    clientName: 'Pedro Lima',
    clientPhone: '(11) 77777-6666',
    clientEmail: 'pedro@email.com',
    agentName: 'João Santos',
    date: '2024-02-19',
    time: '10:00',
    duration: 45,
    status: 'completed',
    notes: 'Cliente solteiro, procura localização próxima ao metrô',
    address: 'Rua Augusta, 500 - Higienópolis',
    type: 'virtual',
    createdAt: '2024-02-14T09:15:00Z',
  },
];

const statusConfig = {
  scheduled: { label: 'Agendada', color: 'default', icon: Calendar },
  confirmed: { label: 'Confirmada', color: 'primary', icon: CheckCircle },
  completed: { label: 'Realizada', color: 'success', icon: CheckCircle },
  cancelled: { label: 'Cancelada', color: 'destructive', icon: XCircle },
  'no-show': { label: 'Não Compareceu', color: 'warning', icon: AlertCircle },
};

const typeConfig = {
  'in-person': { label: 'Presencial', color: 'primary', icon: Building },
  virtual: { label: 'Virtual', color: 'secondary', icon: Users },
};

export const VisitsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const filteredVisits = mockVisits.filter(visit => {
    const matchesSearch = 
      visit.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || visit.status === selectedStatus;
    const matchesType = !selectedType || visit.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
  };

  const getTypeConfig = (type: string) => {
    return typeConfig[type as keyof typeof typeConfig] || typeConfig['in-person'];
  };

  const openVisitModal = (visit: Visit) => {
    setSelectedVisit(visit);
    setShowModal(true);
  };

  const getStatusStats = () => {
    const stats = {
      scheduled: mockVisits.filter(v => v.status === 'scheduled').length,
      confirmed: mockVisits.filter(v => v.status === 'confirmed').length,
      completed: mockVisits.filter(v => v.status === 'completed').length,
      cancelled: mockVisits.filter(v => v.status === 'cancelled').length,
      'no-show': mockVisits.filter(v => v.status === 'no-show').length,
    };
    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${colors.text.title}`}>
            Visitas & Agendamentos
          </h1>
          <p className={colors.text.body}>
            Gerencie visitas e agendamentos de imóveis
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Visita
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar visitas..."
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
              <option value="scheduled">Agendada</option>
              <option value="confirmed">Confirmada</option>
              <option value="completed">Realizada</option>
              <option value="cancelled">Cancelada</option>
              <option value="no-show">Não Compareceu</option>
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Todos os tipos</option>
              <option value="in-person">Presencial</option>
              <option value="virtual">Virtual</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.body}`}>Total</p>
                <p className={`text-2xl font-bold ${colors.text.title}`}>{mockVisits.length}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center`}>
                <CalendarDays className={`h-6 w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.body}`}>Agendadas</p>
                <p className={`text-2xl font-bold ${colors.icons.info}`}>{stats.scheduled}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center`}>
                <Calendar className={`h-6 w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${colors.text.body}`}>Confirmadas</p>
                <p className={`text-2xl font-bold ${colors.icons.success}`}>{stats.confirmed}</p>
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
                <p className={`text-sm font-medium ${colors.text.body}`}>Realizadas</p>
                <p className={`text-2xl font-bold ${colors.icons.success}`}>{stats.completed}</p>
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
                <p className={`text-sm font-medium ${colors.text.body}`}>Canceladas</p>
                <p className={`text-2xl font-bold ${colors.icons.error}`}>{stats.cancelled + stats['no-show']}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${colors.iconBg.error} flex items-center justify-center`}>
                <XCircle className={`h-6 w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Visitas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVisits.map((visit) => {
          const status = getStatusConfig(visit.status);
          const type = getTypeConfig(visit.type);
          const StatusIcon = status.icon;
          const TypeIcon = type.icon;
          
          return (
            <Card key={visit.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                      <Building className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg ${colors.text.title}`}>
                        {visit.propertyTitle}
                      </h3>
                      <p className={`text-sm ${colors.text.body}`}>
                        {visit.clientName}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant={status.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                    <Badge variant={type.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'}>
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {type.label}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className={`flex items-center text-sm ${colors.text.body}`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(visit.date).toLocaleDateString('pt-BR')}</span>
                    <Clock className="h-4 w-4 ml-4 mr-2" />
                    <span>{visit.time} ({visit.duration}min)</span>
                  </div>
                  
                  <div className={`flex items-center text-sm ${colors.text.body}`}>
                    <User className="h-4 w-4 mr-2" />
                    <span>{visit.agentName}</span>
                    <Phone className="h-4 w-4 ml-4 mr-2" />
                    <span>{visit.clientPhone}</span>
                  </div>
                  
                  <div className={`flex items-center text-sm ${colors.text.body}`}>
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="truncate">{visit.address}</span>
                  </div>
                  
                  {visit.notes && (
                    <div className={`text-sm ${colors.text.body} bg-gray-50 dark:bg-gray-800 p-3 rounded-lg`}>
                      <strong>Observações:</strong> {visit.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => openVisitModal(visit)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Detalhes
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                  >
                    <Car className="h-4 w-4 mr-2" />
                    Rota
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
        {selectedVisit && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Detalhes da Visita
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    Imóvel
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Título:</strong> {selectedVisit.propertyTitle}</p>
                    <p><strong>Endereço:</strong> {selectedVisit.address}</p>
                    <p><strong>ID:</strong> {selectedVisit.propertyId}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Cliente
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Nome:</strong> {selectedVisit.clientName}</p>
                    <p><strong>Telefone:</strong> {selectedVisit.clientPhone}</p>
                    <p><strong>Email:</strong> {selectedVisit.clientEmail}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendamento
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Data:</strong> {new Date(selectedVisit.date).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Horário:</strong> {selectedVisit.time}</p>
                    <p><strong>Duração:</strong> {selectedVisit.duration} minutos</p>
                    <p><strong>Tipo:</strong> {getTypeConfig(selectedVisit.type).label}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Corretor
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Nome:</strong> {selectedVisit.agentName}</p>
                    <p><strong>Status:</strong> 
                      <Badge variant={getStatusConfig(selectedVisit.status).color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} className="ml-2">
                        {getStatusConfig(selectedVisit.status).label}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {selectedVisit.notes && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <h4 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">Observações</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">{selectedVisit.notes}</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button variant="outline">
                Editar
              </Button>
              <Button>
                Confirmar Visita
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
