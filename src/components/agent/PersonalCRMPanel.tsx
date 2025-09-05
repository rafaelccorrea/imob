import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Phone, 
  Mail, 
  Calendar,
  MessageCircle,
  MapPin,
  Tag,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Modal } from '../ui';
import { colors } from '../../utils/colors';
import { formatDate } from '../../utils';
import type { PersonalContact, PersonalInteraction } from '../../types';

interface PersonalCRMPanelProps {
  contacts: PersonalContact[];
  interactions: PersonalInteraction[];
  onAddContact: (contact: Omit<PersonalContact, 'id'>) => void;
  onAddInteraction: (interaction: Omit<PersonalInteraction, 'id'>) => void;
  onUpdateContact: (id: string, contact: Partial<PersonalContact>) => void;
  onDeleteContact: (id: string) => void;
}

export const PersonalCRMPanel: React.FC<PersonalCRMPanelProps> = ({
  contacts,
  interactions,
  onAddContact,
  onAddInteraction,
  onUpdateContact,
  onDeleteContact
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<PersonalContact | null>(null);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'prospect' as 'client' | 'prospect' | 'referral',
    source: '',
    notes: '',
    tags: [] as string[]
  });

  // Filtrar contatos
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone?.includes(searchTerm);
    const matchesType = !selectedType || contact.type === selectedType;
    const matchesStatus = !selectedStatus || contact.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Obter interações de um contato
  const getContactInteractions = (contactId: string) => {
    return interactions.filter(i => i.contactId === contactId);
  };

  // Obter próxima ação pendente
  const getPendingActions = () => {
    return interactions.filter(i => i.nextActionDate && new Date(i.nextActionDate) >= new Date())
      .sort((a, b) => new Date(a.nextActionDate!).getTime() - new Date(b.nextActionDate!).getTime());
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'success';
      case 'prospect': return 'primary';
      case 'referral': return 'warning';
      default: return 'secondary';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'client': return 'Cliente';
      case 'prospect': return 'Prospect';
      case 'referral': return 'Indicação';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'converted': return 'primary';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'converted': return 'Convertido';
      default: return status;
    }
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'visit': return <MapPin className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'positive': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'negative': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'neutral': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleAddContact = () => {
    if (newContact.name) {
      onAddContact({
        ...newContact,
        agentId: '3', // ID do agente atual
        status: 'active',
        lastContact: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });
      setNewContact({
        name: '',
        email: '',
        phone: '',
        type: 'prospect',
        source: '',
        notes: '',
        tags: []
      });
      setShowContactModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header e Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Buscar contatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Todos os tipos</option>
                <option value="client">Cliente</option>
                <option value="prospect">Prospect</option>
                <option value="referral">Indicação</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Todos os status</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="converted">Convertido</option>
              </select>
              <Button onClick={() => setShowContactModal(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Novo Contato
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Próximas Ações */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
            <Clock className="h-5 w-5 text-orange-500" />
            Próximas Ações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getPendingActions().slice(0, 5).map((interaction) => {
              const contact = contacts.find(c => c.id === interaction.contactId);
              return (
                <div key={interaction.id} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-full">
                      {getInteractionIcon(interaction.type)}
                    </div>
                    <div>
                      <p className={`font-medium ${colors.text.title}`}>
                        {contact?.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {interaction.nextAction}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      {formatDate(interaction.nextActionDate!)}
                    </p>
                    <Badge variant="warning" className="text-xs">
                      Pendente
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Contatos */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${colors.text.title}`}>
            <Users className="h-5 w-5 text-blue-500" />
            Meus Contatos ({filteredContacts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContacts.map((contact) => {
              const contactInteractions = getContactInteractions(contact.id);
              const lastInteraction = contactInteractions.sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
              )[0];

              return (
                <div key={contact.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className={`font-medium ${colors.text.title}`}>
                        {contact.name}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                        {contact.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {contact.email}
                          </span>
                        )}
                        {contact.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getTypeColor(contact.type) as any}>
                          {getTypeText(contact.type)}
                        </Badge>
                        <Badge variant={getStatusColor(contact.status) as any}>
                          {getStatusText(contact.status)}
                        </Badge>
                        {contact.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {lastInteraction && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Último contato: {formatDate(lastInteraction.date)} - {lastInteraction.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowInteractionModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowContactModal(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteContact(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Novo Contato */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title={selectedContact ? "Editar Contato" : "Novo Contato"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome
            </label>
            <Input
              value={newContact.name}
              onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              placeholder="Nome do contato"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <Input
                value={newContact.email}
                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                placeholder="email@exemplo.com"
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Telefone
              </label>
              <Input
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo
              </label>
              <select
                value={newContact.type}
                onChange={(e) => setNewContact({...newContact, type: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="prospect">Prospect</option>
                <option value="client">Cliente</option>
                <option value="referral">Indicação</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fonte
              </label>
              <Input
                value={newContact.source}
                onChange={(e) => setNewContact({...newContact, source: e.target.value})}
                placeholder="Site, Indicação, etc."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Observações
            </label>
            <textarea
              value={newContact.notes}
              onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
              placeholder="Observações sobre o contato..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowContactModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddContact}>
              {selectedContact ? "Salvar" : "Adicionar"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de Interação */}
      <Modal
        isOpen={showInteractionModal}
        onClose={() => setShowInteractionModal(false)}
        title={`Histórico - ${selectedContact?.name}`}
      >
        {selectedContact && (
          <div className="space-y-4">
            <div className="space-y-3">
              {getContactInteractions(selectedContact.id).map((interaction) => (
                <div key={interaction.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    {getInteractionIcon(interaction.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`font-medium ${colors.text.title}`}>
                        {interaction.description}
                      </p>
                      {getOutcomeIcon(interaction.outcome)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(interaction.date)}
                    </p>
                    {interaction.nextAction && (
                      <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                        <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                          Próxima ação: {interaction.nextAction}
                        </p>
                        {interaction.nextActionDate && (
                          <p className="text-xs text-orange-600 dark:text-orange-400">
                            {formatDate(interaction.nextActionDate)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
