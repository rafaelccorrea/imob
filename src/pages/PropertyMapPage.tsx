import React, { useState } from 'react';
import { 
  MapPin, 
  Filter, 
  Home, 
  Building, 
  Map,
  Eye,
  Star,
  DollarSign,
  Users,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

interface Property {
  id: string;
  name: string;
  address: string;
  fullAddress: string;
  type: 'apartment' | 'house' | 'commercial' | 'land';
  price: number;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'sold' | 'rented' | 'reserved';
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  photos: string[];
  description: string;
  features: string[];
  createdAt: string;
  views: number;
  isHighlighted: boolean;
}

const PropertyMapPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriceRange, setFilterPriceRange] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [mapView, setMapView] = useState<'map' | 'satellite' | 'hybrid'>('map');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - propriedades
  const properties: Property[] = [
    {
      id: '1',
      name: 'Apartamento Copacabana',
      address: 'Copacabana, RJ',
      fullAddress: 'Rua Nossa Senhora de Copacabana, 123 - Copacabana, Rio de Janeiro - RJ',
      type: 'apartment',
      price: 850000,
      area: 85,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      coordinates: { lat: -22.9711, lng: -43.1822 },
      status: 'available',
      agent: {
        name: 'João Silva',
        phone: '(21) 99999-9999',
        email: 'joao@imobiliaria.com'
      },
      photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
      description: 'Apartamento moderno com vista para o mar, localizado no coração de Copacabana.',
      features: ['Vista para o mar', 'Piscina', 'Academia', 'Portaria 24h'],
      createdAt: '2024-01-15',
      views: 245,
      isHighlighted: true
    },
    {
      id: '2',
      name: 'Casa Barra da Tijuca',
      address: 'Barra da Tijuca, RJ',
      fullAddress: 'Av. das Américas, 3500 - Barra da Tijuca, Rio de Janeiro - RJ',
      type: 'house',
      price: 1200000,
      area: 180,
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      coordinates: { lat: -23.0065, lng: -43.3644 },
      status: 'available',
      agent: {
        name: 'Maria Santos',
        phone: '(21) 88888-8888',
        email: 'maria@imobiliaria.com'
      },
      photos: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400'],
      description: 'Casa moderna com piscina, jardim e área de lazer completa.',
      features: ['Piscina', 'Jardim', 'Churrasqueira', 'Quarto de hóspedes'],
      createdAt: '2024-01-20',
      views: 189,
      isHighlighted: false
    },
    {
      id: '3',
      name: 'Loja Ipanema',
      address: 'Ipanema, RJ',
      fullAddress: 'Rua Visconde de Pirajá, 500 - Ipanema, Rio de Janeiro - RJ',
      type: 'commercial',
      price: 650000,
      area: 120,
      coordinates: { lat: -22.9848, lng: -43.2006 },
      status: 'available',
      agent: {
        name: 'Pedro Costa',
        phone: '(21) 77777-7777',
        email: 'pedro@imobiliaria.com'
      },
      photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
      description: 'Loja comercial em localização privilegiada em Ipanema.',
      features: ['Localização privilegiada', 'Fácil acesso', 'Estacionamento'],
      createdAt: '2024-01-25',
      views: 156,
      isHighlighted: false
    },
    {
      id: '4',
      name: 'Terreno Leblon',
      address: 'Leblon, RJ',
      fullAddress: 'Rua Dias Ferreira, 200 - Leblon, Rio de Janeiro - RJ',
      type: 'land',
      price: 950000,
      area: 300,
      coordinates: { lat: -22.9870, lng: -43.2205 },
      status: 'available',
      agent: {
        name: 'Ana Lima',
        phone: '(21) 66666-6666',
        email: 'ana@imobiliaria.com'
      },
      photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
      description: 'Terreno residencial em uma das melhores localizações do Leblon.',
      features: ['Zona residencial', 'Fácil acesso', 'Próximo ao metrô'],
      createdAt: '2024-02-01',
      views: 98,
      isHighlighted: true
    },
    {
      id: '5',
      name: 'Apartamento Botafogo',
      address: 'Botafogo, RJ',
      fullAddress: 'Rua Voluntários da Pátria, 100 - Botafogo, Rio de Janeiro - RJ',
      type: 'apartment',
      price: 720000,
      area: 75,
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      coordinates: { lat: -22.9519, lng: -43.1885 },
      status: 'sold',
      agent: {
        name: 'Carlos Oliveira',
        phone: '(21) 55555-5555',
        email: 'carlos@imobiliaria.com'
      },
      photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
      description: 'Apartamento com vista para o Pão de Açúcar.',
      features: ['Vista para o Pão de Açúcar', 'Piscina', 'Academia'],
      createdAt: '2024-01-10',
      views: 312,
      isHighlighted: false
    }
  ];

  const propertyTypes = [
    { value: 'all', label: 'Todos os Tipos', icon: Home },
    { value: 'apartment', label: 'Apartamento', icon: Building },
    { value: 'house', label: 'Casa', icon: Home },
    { value: 'commercial', label: 'Comercial', icon: Building },
    { value: 'land', label: 'Terreno', icon: MapPin }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'available', label: 'Disponível' },
    { value: 'sold', label: 'Vendido' },
    { value: 'rented', label: 'Alugado' },
    { value: 'reserved', label: 'Reservado' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Todos os Preços' },
    { value: '0-500000', label: 'Até R$ 500.000' },
    { value: '500000-1000000', label: 'R$ 500.000 - R$ 1.000.000' },
    { value: '1000000-2000000', label: 'R$ 1.000.000 - R$ 2.000.000' },
    { value: '2000000+', label: 'Acima de R$ 2.000.000' }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    
    let matchesPrice = true;
    if (filterPriceRange !== 'all') {
      const [min, max] = filterPriceRange.split('-').map(Number);
      if (max) {
        matchesPrice = property.price >= min && property.price <= max;
      } else {
        matchesPrice = property.price >= min;
      }
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesPrice;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'sold': return 'bg-red-500';
      case 'rented': return 'bg-blue-500';
      case 'reserved': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Disponível';
      case 'sold': return 'Vendido';
      case 'rented': return 'Alugado';
      case 'reserved': return 'Reservado';
      default: return status;
    }
  };

  const openPropertyModal = (property: Property) => {
    setSelectedProperty(property);
    setShowPropertyModal(true);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Mapa de Imóveis
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Visualize e explore imóveis em um mapa interativo
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
          <select
            value={mapView}
            onChange={(e) => setMapView(e.target.value as any)}
            className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
          >
            <option value="map">Mapa</option>
            <option value="satellite">Satélite</option>
            <option value="hybrid">Híbrido</option>
          </select>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total de Imóveis
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {properties.length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Disponíveis
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {properties.filter(p => p.status === 'available').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Vendidos
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">
                {properties.filter(p => p.status === 'sold').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
              <Star className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Valor Médio
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                {formatCurrency(properties.reduce((sum, p) => sum + p.price, 0) / properties.length)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      {showFilters && (
        <Card className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Buscar imóveis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
            >
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <select
              value={filterPriceRange}
              onChange={(e) => setFilterPriceRange(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </Card>
      )}

      {/* Mapa e Lista */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Mapa */}
        <div className="xl:col-span-2 order-2 xl:order-1">
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-lg font-semibold">Mapa Interativo</h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Disponível</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Vendido</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Reservado</span>
                </div>
              </div>
            </div>
            
            {/* Simulação do Mapa */}
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg h-64 sm:h-80 lg:h-96 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4">
                  <Map className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Mapa interativo seria implementado aqui
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Integração com Google Maps ou OpenStreetMap
                  </p>
                </div>
              </div>
              
              {/* Marcadores simulados */}
              {filteredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className={`absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform ${
                    property.status === 'available' ? 'bg-green-500' :
                    property.status === 'sold' ? 'bg-red-500' :
                    property.status === 'reserved' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}
                  style={{
                    left: `${15 + (index * 12) % 70}%`,
                    top: `${25 + (index * 8) % 50}%`
                  }}
                  onClick={() => openPropertyModal(property)}
                  title={property.name}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Lista de Imóveis */}
        <div className="xl:col-span-1 order-1 xl:order-2">
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">
              Imóveis ({filteredProperties.length})
            </h3>
            <div className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 xl:max-h-96 overflow-y-auto">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => openPropertyModal(property)}
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <img
                      src={property.photos[0]}
                      alt={property.name}
                      className="w-full sm:w-16 h-24 sm:h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <h4 className="font-medium text-sm truncate">{property.name}</h4>
                        <Badge className={`text-xs ${getStatusColor(property.status)} text-white self-start`}>
                          {getStatusLabel(property.status)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{property.address}</p>
                      <p className="text-sm font-semibold text-green-600">
                        {formatCurrency(property.price)}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>{property.area}m²</span>
                        {property.bedrooms && <span>{property.bedrooms} quartos</span>}
                        <span>{property.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal de Detalhes do Imóvel */}
      <Modal
        isOpen={showPropertyModal}
        onClose={() => setShowPropertyModal(false)}
        title={selectedProperty?.name || ''}
        size="lg"
      >
        {selectedProperty && (
          <div className="space-y-6">
            {/* Imagem Principal */}
            <img
              src={selectedProperty.photos[0]}
              alt={selectedProperty.name}
              className="w-full h-64 object-cover rounded"
            />

            {/* Informações Básicas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Preço</p>
                <p className="text-lg sm:text-xl font-bold text-green-600">
                  {formatCurrency(selectedProperty.price)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Área</p>
                <p className="text-base sm:text-lg font-semibold">{selectedProperty.area}m²</p>
              </div>
              {selectedProperty.bedrooms && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Quartos</p>
                  <p className="text-base sm:text-lg font-semibold">{selectedProperty.bedrooms}</p>
                </div>
              )}
              {selectedProperty.bathrooms && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Banheiros</p>
                  <p className="text-base sm:text-lg font-semibold">{selectedProperty.bathrooms}</p>
                </div>
              )}
            </div>

            {/* Endereço */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Endereço</p>
              <p className="text-gray-700">{selectedProperty.fullAddress}</p>
            </div>

            {/* Descrição */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Descrição</p>
              <p className="text-gray-700">{selectedProperty.description}</p>
            </div>

            {/* Características */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Características</p>
              <div className="flex flex-wrap gap-2">
                {selectedProperty.features.map((feature) => (
                  <Badge key={feature} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Informações do Agente */}
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-500 mb-3">Agente Responsável</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{selectedProperty.agent.name}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {selectedProperty.agent.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{selectedProperty.agent.email}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowPropertyModal(false)} className="w-full sm:w-auto">
                Fechar
              </Button>
              <Button className="w-full sm:w-auto">
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PropertyMapPage;
