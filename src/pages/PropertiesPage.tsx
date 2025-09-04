import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Bed,
  Bath,
  Car,
  DollarSign,
  Calendar
} from 'lucide-react';
import { useAuthStore } from '../stores';
import { mockProperties } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Input, Modal } from '../components/ui';

export const PropertiesPage: React.FC = () => {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  // Filtros
  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || property.type === selectedType;
    const matchesStatus = !selectedStatus || property.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'sold': return 'danger';
      case 'rented': return 'primary';
      case 'reserved': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponível';
      case 'sold': return 'Vendido';
      case 'rented': return 'Alugado';
      case 'reserved': return 'Reservado';
      case 'inactive': return 'Inativo';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'house': return 'Casa';
      case 'apartment': return 'Apartamento';
      case 'commercial': return 'Comercial';
      case 'land': return 'Terreno';
      case 'rural': return 'Rural';
      default: return type;
    }
  };

  const openPropertyModal = (property: any) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">
            Gestão de Imóveis
          </h1>
          <p className="text-secondary-600">
            Gerencie seu portfólio de imóveis
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Imóvel
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar imóveis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input"
            >
              <option value="">Todos os tipos</option>
              <option value="house">Casa</option>
              <option value="apartment">Apartamento</option>
              <option value="commercial">Comercial</option>
              <option value="land">Terreno</option>
              <option value="rural">Rural</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input"
            >
              <option value="">Todos os status</option>
              <option value="available">Disponível</option>
              <option value="sold">Vendido</option>
              <option value="rented">Alugado</option>
              <option value="reserved">Reservado</option>
              <option value="inactive">Inativo</option>
            </select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
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
                <p className="text-sm font-medium text-secondary-600">Total de Imóveis</p>
                <p className="text-2xl font-bold text-primary-600">{mockProperties.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Disponíveis</p>
                <p className="text-2xl font-bold text-success-600">
                  {mockProperties.filter(p => p.status === 'available').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Vendidos</p>
                <p className="text-2xl font-bold text-danger-600">
                  {mockProperties.filter(p => p.status === 'sold').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-danger-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-danger-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Alugados</p>
                <p className="text-2xl font-bold text-primary-600">
                  {mockProperties.filter(p => p.status === 'rented').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Imóveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <Badge 
                variant={getStatusColor(property.status) as any}
                className="absolute top-4 left-4"
              >
                {getStatusText(property.status)}
              </Badge>
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openPropertyModal(property)}
                  className="bg-white/80 hover:bg-white"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/80 hover:bg-white"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
              
              <div className="flex items-center text-secondary-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.address.neighborhood}, {property.address.city}</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-4 text-sm text-secondary-600">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.features.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.features.bathrooms}</span>
                </div>
                <div className="flex items-center">
                  <Car className="h-4 w-4 mr-1" />
                  <span>{property.features.parkingSpaces}</span>
                </div>
                <div className="flex items-center">
                  <span>{property.features.area}m²</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-primary-600">
                    {formatCurrency(property.price)}
                  </p>
                  {property.rentPrice && (
                    <p className="text-sm text-secondary-600">
                      Aluguel: {formatCurrency(property.rentPrice)}
                    </p>
                  )}
                </div>
                <Badge variant="default">
                  {getTypeText(property.type)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedProperty?.title}
        className="max-w-4xl"
      >
        {selectedProperty && (
          <div className="space-y-6">
            {/* Imagens */}
            <div className="grid grid-cols-2 gap-4">
              {selectedProperty.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedProperty.title} ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
            
            {/* Informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Informações do Imóvel</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Tipo:</strong> {getTypeText(selectedProperty.type)}</p>
                  <p><strong>Status:</strong> {getStatusText(selectedProperty.status)}</p>
                  <p><strong>Área:</strong> {selectedProperty.features.area}m²</p>
                  <p><strong>Área construída:</strong> {selectedProperty.features.builtArea}m²</p>
                  <p><strong>Quartos:</strong> {selectedProperty.features.bedrooms}</p>
                  <p><strong>Banheiros:</strong> {selectedProperty.features.bathrooms}</p>
                  <p><strong>Vagas:</strong> {selectedProperty.features.parkingSpaces}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Valores</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Preço de venda:</strong> {formatCurrency(selectedProperty.price)}</p>
                  {selectedProperty.rentPrice && (
                    <p><strong>Preço de aluguel:</strong> {formatCurrency(selectedProperty.rentPrice)}</p>
                  )}
                </div>
                
                <h4 className="font-semibold mb-3 mt-6">Endereço</h4>
                <div className="space-y-1 text-sm">
                  <p>{selectedProperty.address.street}, {selectedProperty.address.number}</p>
                  {selectedProperty.address.complement && (
                    <p>{selectedProperty.address.complement}</p>
                  )}
                  <p>{selectedProperty.address.neighborhood}</p>
                  <p>{selectedProperty.address.city} - {selectedProperty.address.state}</p>
                  <p>CEP: {selectedProperty.address.zipCode}</p>
                </div>
              </div>
            </div>
            
            {/* Descrição */}
            <div>
              <h4 className="font-semibold mb-3">Descrição</h4>
              <p className="text-sm text-secondary-600">{selectedProperty.description}</p>
            </div>
            
            {/* Proprietário */}
            <div>
              <h4 className="font-semibold mb-3">Proprietário</h4>
              <div className="text-sm">
                <p><strong>Nome:</strong> {selectedProperty.owner.name}</p>
                <p><strong>Telefone:</strong> {selectedProperty.owner.phone}</p>
                {selectedProperty.owner.email && (
                  <p><strong>Email:</strong> {selectedProperty.owner.email}</p>
                )}
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar Imóvel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
