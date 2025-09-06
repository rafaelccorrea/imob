import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  User,
  Building,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Button, Card, CardContent, Badge, Input, Modal } from '../components/ui';
import { colors } from '../utils/colors';
import type { Contact } from '../types';

// Mock data para histórico de contatos
const mockContacts = [
  {
    id: '1',
    clientId: 'client-1',
    clientName: 'Maria Silva',
    clientPhone: '(11) 99999-1111',
    clientEmail: 'maria.silva@email.com',
    contactType: 'call', // call, email, whatsapp, visit, meeting
    contactMethod: 'outbound', // inbound, outbound
    subject: 'Consulta sobre apartamento 3 quartos',
    description: 'Cliente interessada em apartamento de 3 quartos no centro. Orçamento até R$ 500.000. Agendou visita para próxima semana.',
    outcome: 'positive', // positive, negative, neutral, pending
    followUpDate: '2024-01-25T10:00:00Z',
    followUpNotes: 'Enviar fotos do apartamento da Rua das Flores',
    agentName: 'João Corretor',
    agentId: 'agent-1',
    propertyId: 'prop-1',
    propertyTitle: 'Apartamento 3 quartos - Centro',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    clientId: 'client-2',
    clientName: 'João Santos',
    clientPhone: '(11) 99999-2222',
    clientEmail: 'joao.santos@email.com',
    contactType: 'whatsapp',
    contactMethod: 'inbound',
    subject: 'Dúvida sobre aluguel',
    description: 'Cliente perguntou sobre disponibilidade de casas para alugar próximo ao trabalho. Enviei lista de opções.',
    outcome: 'neutral',
    followUpDate: null,
    followUpNotes: null,
    agentName: 'Ana Corretora',
    agentId: 'agent-2',
    propertyId: null,
    propertyTitle: null,
    createdAt: '2024-01-19T16:45:00Z',
    updatedAt: '2024-01-19T16:45:00Z'
  },
  {
    id: '3',
    clientId: 'client-3',
    clientName: 'Ana Costa',
    clientPhone: '(11) 99999-3333',
    clientEmail: 'ana.costa@email.com',
    contactType: 'visit',
    contactMethod: 'outbound',
    subject: 'Visita ao apartamento Vila Madalena',
    description: 'Visita realizada com sucesso. Cliente gostou do imóvel e está considerando fazer uma proposta.',
    outcome: 'positive',
    followUpDate: '2024-01-22T15:00:00Z',
    followUpNotes: 'Enviar proposta de compra até quarta-feira',
    agentName: 'Carlos Corretor',
    agentId: 'agent-3',
    propertyId: 'prop-3',
    propertyTitle: 'Apartamento 2 quartos - Vila Madalena',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  }
];

const contactTypeConfig = {
  call: { label: 'Ligação', color: 'primary', icon: Phone },
  email: { label: 'Email', color: 'secondary', icon: Mail },
  whatsapp: { label: 'WhatsApp', color: 'success', icon: MessageSquare },
  visit: { label: 'Visita', color: 'warning', icon: Building },
  meeting: { label: 'Reunião', color: 'info', icon: Calendar }
};

const contactMethodConfig = {
  inbound: { label: 'Entrada', color: 'success', icon: CheckCircle },
  outbound: { label: 'Saída', color: 'primary', icon: Phone }
};

const outcomeConfig = {
  positive: { label: 'Positivo', color: 'success', icon: CheckCircle },
  negative: { label: 'Negativo', color: 'destructive', icon: AlertCircle },
  neutral: { label: 'Neutro', color: 'secondary', icon: MessageSquare },
  pending: { label: 'Pendente', color: 'warning', icon: Clock }
};

export const ContactsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || contact.contactType === selectedType;
    const matchesOutcome = !selectedOutcome || contact.outcome === selectedOutcome;
    const matchesAgent = !selectedAgent || contact.agentId === selectedAgent;
    return matchesSearch && matchesType && matchesOutcome && matchesAgent;
  });

  const getContactTypeConfig = (type: string) => {
    return contactTypeConfig[type as keyof typeof contactTypeConfig] || contactTypeConfig.call;
  };

  const getContactMethodConfig = (method: string) => {
    return contactMethodConfig[method as keyof typeof contactMethodConfig] || contactMethodConfig.outbound;
  };

  const getOutcomeConfig = (outcome: string) => {
    return outcomeConfig[outcome as keyof typeof outcomeConfig] || outcomeConfig.neutral;
  };

  const openContactModal = (contact: Contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const getContactStats = () => {
    return mockContacts.reduce((acc, contact) => {
      acc.total = (acc.total || 0) + 1;
      acc[contact.contactType] = (acc[contact.contactType] || 0) + 1;
      acc[contact.outcome] = (acc[contact.outcome] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const stats = getContactStats();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text.title} truncate`}>
            Histórico de Contatos
          </h1>
          <p className={`text-xs sm:text-sm ${colors.text.body}`}>
            Acompanhe todas as interações com seus clientes
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button className="w-full sm:w-auto">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Novo Contato</span>
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
            <Input
              placeholder="Buscar por cliente, assunto ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 sm:pl-10 text-xs sm:text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm"
          >
            <option value="">Todos os tipos</option>
            <option value="call">Ligação</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="visit">Visita</option>
            <option value="meeting">Reunião</option>
          </select>
          <select
            value={selectedOutcome}
            onChange={(e) => setSelectedOutcome(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm"
          >
            <option value="">Todos os resultados</option>
            <option value="positive">Positivo</option>
            <option value="negative">Negativo</option>
            <option value="neutral">Neutro</option>
            <option value="pending">Pendente</option>
          </select>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm"
          >
            <option value="">Todos os corretores</option>
            <option value="agent-1">João Corretor</option>
            <option value="agent-2">Ana Corretora</option>
            <option value="agent-3">Carlos Corretor</option>
          </select>
          <Button variant="outline" className="text-xs sm:text-sm">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Filtros</span>
            <span className="sm:hidden">Filt.</span>
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Total</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.text.title}`}>{stats.total || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <MessageSquare className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Ligações</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.primary}`}>{stats.call || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.primary} flex items-center justify-center flex-shrink-0`}>
                <Phone className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.primary}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Emails</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.info}`}>{stats.email || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.info} flex items-center justify-center flex-shrink-0`}>
                <Mail className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.info}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>WhatsApp</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.success}`}>{stats.whatsapp || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.success} flex items-center justify-center flex-shrink-0`}>
                <MessageSquare className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.success}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${colors.text.body}`}>Visitas</p>
                <p className={`text-xl sm:text-2xl font-bold ${colors.icons.warning}`}>{stats.visit || 0}</p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${colors.iconBg.warning} flex items-center justify-center flex-shrink-0`}>
                <Building className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icons.warning}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Contatos */}
      <div className="space-y-3 sm:space-y-4">
        {filteredContacts.map((contact) => {
          const typeConfig = getContactTypeConfig(contact.contactType);
          const methodConfig = getContactMethodConfig(contact.contactMethod);
          const outcomeConfig = getOutcomeConfig(contact.outcome);
          const TypeIcon = typeConfig.icon;
          const MethodIcon = methodConfig.icon;
          const OutcomeIcon = outcomeConfig.icon;

          return (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                      <TypeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-semibold text-sm sm:text-lg ${colors.text.title} truncate`}>
                        {contact.clientName}
                      </h3>
                      <p className={`text-xs sm:text-sm ${colors.text.body} truncate`}>
                        {contact.subject}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1 flex-shrink-0">
                    <Badge variant={typeConfig.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} className="text-xs">
                      <TypeIcon className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">{typeConfig.label}</span>
                      <span className="sm:hidden">{typeConfig.label.charAt(0)}</span>
                    </Badge>
                    <Badge variant={methodConfig.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} className="text-xs">
                      <MethodIcon className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">{methodConfig.label}</span>
                      <span className="sm:hidden">{methodConfig.label.charAt(0)}</span>
                    </Badge>
                    <Badge variant={outcomeConfig.color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} className="text-xs">
                      <OutcomeIcon className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">{outcomeConfig.label}</span>
                      <span className="sm:hidden">{outcomeConfig.label.charAt(0)}</span>
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className={`flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm ${colors.text.body} gap-1 sm:gap-4`}>
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="truncate">{contact.clientPhone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="truncate">{contact.clientEmail}</span>
                    </div>
                  </div>

                  <div className={`flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm ${colors.text.body} gap-1 sm:gap-4`}>
                    <div className="flex items-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="truncate">Corretor: {contact.agentName}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="truncate">{formatDate(contact.createdAt)}</span>
                    </div>
                  </div>

                  {contact.propertyTitle && (
                    <div className={`flex items-center text-xs sm:text-sm ${colors.text.body}`}>
                      <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="truncate">Imóvel: {contact.propertyTitle}</span>
                    </div>
                  )}

                  <div className={`text-xs sm:text-sm ${colors.text.body} bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-lg`}>
                    <strong>Descrição:</strong> {contact.description}
                  </div>

                  {contact.followUpDate && (
                    <div className={`flex items-center text-xs sm:text-sm ${colors.icons.warning} bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-lg`}>
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="truncate">Follow-up: {formatDate(contact.followUpDate)}</span>
                      {contact.followUpNotes && (
                        <span className="ml-1 sm:ml-2 truncate">- {contact.followUpNotes}</span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs sm:text-sm"
                    onClick={() => openContactModal(contact)}
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
                  <Button
                    size="sm"
                    className="flex-1 text-xs sm:text-sm"
                  >
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Contatar</span>
                    <span className="sm:hidden">Cont.</span>
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
        {selectedContact && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-lg sm:text-xl font-bold ${colors.text.title}`}>
                Detalhes do Contato
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
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Informações do Cliente
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    <p><strong>Nome:</strong> {selectedContact.clientName}</p>
                    <p><strong>Telefone:</strong> {selectedContact.clientPhone}</p>
                    <p><strong>Email:</strong> {selectedContact.clientEmail}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title} flex items-center`}>
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Detalhes do Contato
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    <p><strong>Tipo:</strong> {getContactTypeConfig(selectedContact.contactType).label}</p>
                    <p><strong>Método:</strong> {getContactMethodConfig(selectedContact.contactMethod).label}</p>
                    <p><strong>Assunto:</strong> {selectedContact.subject}</p>
                    <p><strong>Resultado:</strong> {getOutcomeConfig(selectedContact.outcome).label}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title} flex items-center`}>
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Corretor
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    <p><strong>Nome:</strong> {selectedContact.agentName}</p>
                    <p><strong>ID:</strong> {selectedContact.agentId}</p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title} flex items-center`}>
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Datas
                  </h4>
                  <div className={`space-y-1 sm:space-y-2 text-xs sm:text-sm ${colors.text.subtitle}`}>
                    <p><strong>Criado em:</strong> {formatDate(selectedContact.createdAt)}</p>
                    <p><strong>Atualizado em:</strong> {formatDate(selectedContact.updatedAt)}</p>
                    {selectedContact.followUpDate && (
                      <p><strong>Follow-up:</strong> {formatDate(selectedContact.followUpDate)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title}`}>
                Descrição
              </h4>
              <p className={`text-xs sm:text-sm ${colors.text.subtitle}`}>
                {selectedContact.description}
              </p>
            </div>
            
            {selectedContact.followUpNotes && (
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${colors.text.title}`}>
                  Notas de Follow-up
                </h4>
                <p className={`text-xs sm:text-sm ${colors.text.subtitle}`}>
                  {selectedContact.followUpNotes}
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">
                Fechar
              </Button>
              <Button className="text-xs sm:text-sm">
                <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Editar Contato
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
