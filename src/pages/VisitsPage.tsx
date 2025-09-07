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

// Tipo local para os dados mock desta página
interface VisitData {
  id: string;
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  agentName: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
  address: string;
  type: 'in-person' | 'virtual';
  createdAt: string;
}

// Mock data para visitas
const mockVisits: VisitData[] = [
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
  const [selectedVisit, setSelectedVisit] = useState<VisitData | null>(null);

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

  const openVisitModal = (visit: VisitData) => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text.title} truncate`}>
            Visitas & Agendamentos
          </h1>
          <p className={`text-xs sm:text-sm ${colors.text.body}`}>
            Gerencie visitas e agendamentos de imóveis
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Nova Visita</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar visitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
              >
                <option value="">Todos os tipos</option>
                <option value="in-person">Presencial</option>
                <option value="virtual">Virtual</option>
              </select>
              
              <Button variant="outline" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Mais Filtros</span>
                <span className="sm:hidden">Filtros</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Total</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.text.title}`}>{mockVisits.length}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <CalendarDays className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Agendadas</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.info}`}>{stats.scheduled}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <Calendar className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Confirmadas</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.success}`}>{stats.confirmed}</p>
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
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Realizadas</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.success}`}>{stats.completed}</p>
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
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body} truncate`}>Canceladas</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.error}`}>{stats.cancelled + stats['no-show']}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.error} flex items-center justify-center flex-shrink-0`}>
                <XCircle className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.error}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Visitas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {filteredVisits.map((visit) => {
          const status = getStatusConfig(visit.status);
          const type = getTypeConfig(visit.type);
          const StatusIcon = status.icon;
          const TypeIcon = type.icon;
          
          return (
            <Card key={visit.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                      <Building className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-semibold text-sm sm:text-base md:text-lg ${colors.text.title} truncate`}>
                        {visit.propertyTitle}
                      </h3>
                      <p className={`text-xs sm:text-sm ${colors.text.body} truncate`}>
                        {visit.clientName}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <Badge variant={status.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive'} className="text-xs">
                      <StatusIcon className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">{status.label}</span>
                      <span className="sm:hidden">{status.label.charAt(0)}</span>
                    </Badge>
                    <Badge variant={type.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive'} className="text-xs">
                      <TypeIcon className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">{type.label}</span>
                      <span className="sm:hidden">{type.label.charAt(0)}</span>
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm ${colors.text.body}`}>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span>{new Date(visit.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span>{visit.time} ({visit.duration}min)</span>
                    </div>
                  </div>
                  
                  <div className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm ${colors.text.body}`}>
                    <div className="flex items-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="truncate">{visit.agentName}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="truncate">{visit.clientPhone}</span>
                    </div>
                  </div>
                  
                  <div className={`flex items-start text-xs sm:text-sm ${colors.text.body}`}>
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0 mt-0.5" />
                    <span className="truncate">{visit.address}</span>
                  </div>
                  
                  {visit.notes && (
                    <div className={`text-xs sm:text-sm ${colors.text.body} bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-lg`}>
                      <strong>Observações:</strong> {visit.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    onClick={() => openVisitModal(visit)}
                  >
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Detalhes</span>
                    <span className="sm:hidden">Ver</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Car className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Rota</span>
                    <span className="sm:hidden">Mapa</span>
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
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 flex items-center text-sm sm:text-base">
                    <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Imóvel
                  </h4>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Título:</strong> {selectedVisit.propertyTitle}</p>
                    <p><strong>Endereço:</strong> {selectedVisit.address}</p>
                    <p><strong>ID:</strong> {selectedVisit.propertyId}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 flex items-center text-sm sm:text-base">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Cliente
                  </h4>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Nome:</strong> {selectedVisit.clientName}</p>
                    <p><strong>Telefone:</strong> {selectedVisit.clientPhone}</p>
                    <p><strong>Email:</strong> {selectedVisit.clientEmail}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 flex items-center text-sm sm:text-base">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Agendamento
                  </h4>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Data:</strong> {new Date(selectedVisit.date).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Horário:</strong> {selectedVisit.time}</p>
                    <p><strong>Duração:</strong> {selectedVisit.duration} minutos</p>
                    <p><strong>Tipo:</strong> {getTypeConfig(selectedVisit.type).label}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 flex items-center text-sm sm:text-base">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Corretor
                  </h4>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Nome:</strong> {selectedVisit.agentName}</p>
                    <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <strong>Status:</strong> 
                      <Badge variant={getStatusConfig(selectedVisit.status).color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive'} className="text-xs w-fit">
                        {getStatusConfig(selectedVisit.status).label}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
              {selectedVisit.notes && (
                <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-blue-900 dark:text-blue-100 text-sm sm:text-base">Observações</h4>
                  <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">{selectedVisit.notes}</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              <Button variant="outline" className="text-xs sm:text-sm">
                Editar
              </Button>
              <Button className="text-xs sm:text-sm">
                Confirmar Visita
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
