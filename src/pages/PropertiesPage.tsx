import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit,
  MapPin,
  Bed,
  Bath,
  Car
} from 'lucide-react';
import { mockProperties } from '../utils/mockData';
import { formatCurrency } from '../utils';
import { Button, Card, CardContent, Badge, Input, Modal, ConditionalMenu } from '../components/ui';
import type { Property } from '../types';
import { usePermissions } from '../hooks/usePermissions';

export const PropertiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const { hasPermission } = usePermissions();

  // Função para detectar se está no modo dark
  const isDarkMode = () => {
    return document.documentElement.classList.contains('dark');
  };

  // Função para obter a cor baseada no valor e tipo
  const getValueColor = (value: number, type: string = 'income') => {
    const dark = isDarkMode();
    if (value < 0) {
      return dark ? '#f87171' : '#dc2626'; // Vermelho para valores negativos
    } else if (type === 'expense' || type === 'despesa') {
      return dark ? '#f87171' : '#dc2626'; // Vermelho para despesas
    } else {
      return dark ? '#4ade80' : '#16a34a'; // Verde para valores positivos
    }
  };

  // Filtros
  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || property.type === selectedType;
    const matchesStatus = !selectedStatus || property.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string): 'default' | 'success' | 'destructive' | 'primary' | 'warning' | 'secondary' | 'outline' => {
    switch (status) {
      case 'available': return 'success';
      case 'sold': return 'destructive';
      case 'rented': return 'primary';
      case 'reserved': return 'warning';
      case 'inactive': return 'secondary';
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

  const openPropertyModal = (property: Property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-secondary-900 dark:text-white">
            Gestão de Imóveis
          </h1>
          <p className="text-sm md:text-base text-secondary-600 dark:text-gray-300">
            Gerencie seu portfólio de imóveis
          </p>
        </div>
        <ConditionalMenu requiredPermission="properties">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2 dark:text-white" />
            Novo Imóvel
          </Button>
        </ConditionalMenu>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400 dark:text-gray-300" />
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
               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
             >
               <option value="">Todos os tipos</option>
               <option value="house" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Casa</option>
               <option value="apartment" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Apartamento</option>
               <option value="commercial" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Comercial</option>
               <option value="land" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Terreno</option>
               <option value="rural" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Rural</option>
             </select>
             
             <select
               value={selectedStatus}
               onChange={(e) => setSelectedStatus(e.target.value)}
               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
             >
               <option value="">Todos os status</option>
               <option value="available" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Disponível</option>
               <option value="sold" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Vendido</option>
               <option value="rented" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Alugado</option>
               <option value="reserved" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Reservado</option>
               <option value="inactive" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Inativo</option>
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
                 <p className="text-sm font-medium text-secondary-600 dark:text-gray-300">Total de Imóveis</p>
                                   <p className="text-2xl font-bold text-primary-600 dark:text-white">{mockProperties.length}</p>
               </div>
               <div className="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                 <Building2 className="h-6 w-6 text-primary-600 dark:text-white" />
               </div>
             </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
                         <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-secondary-600 dark:text-gray-300">Disponíveis</p>
                                   <p className="text-2xl font-bold text-success-600 dark:text-white">
                    {mockProperties.filter(p => p.status === 'available').length}
                  </p>
               </div>
               <div className="h-12 w-12 rounded-lg bg-success-100 dark:bg-success-900 flex items-center justify-center">
                 <Building2 className="h-6 w-6 text-success-600 dark:text-white" />
               </div>
             </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
                         <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-secondary-600 dark:text-gray-300">Vendidos</p>
                                   <p className="text-2xl font-bold text-danger-600 dark:text-white">
                    {mockProperties.filter(p => p.status === 'sold').length}
                  </p>
               </div>
               <div className="h-12 w-12 rounded-lg bg-danger-100 dark:bg-danger-900 flex items-center justify-center">
                 <Building2 className="h-6 w-6 text-danger-600 dark:text-white" />
               </div>
             </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
                         <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-secondary-600 dark:text-gray-300">Alugados</p>
                                   <p className="text-2xl font-bold text-primary-600 dark:text-white">
                    {mockProperties.filter(p => p.status === 'rented').length}
                  </p>
               </div>
               <div className="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                 <Building2 className="h-6 w-6 text-primary-600 dark:text-white" />
               </div>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Imóveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <Badge 
                variant={getStatusColor(property.status)}
                className="absolute top-4 left-4"
              >
                {getStatusText(property.status)}
              </Badge>
              <div className="absolute top-4 right-4 flex space-x-2">
                                 <Button
                   variant="ghost"
                   size="sm"
                   onClick={() => openPropertyModal(property)}
                   className="bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700"
                 >
                   <Eye className="h-4 w-4 dark:text-white" />
                 </Button>
                 <Button
                   variant="ghost"
                   size="sm"
                   className="bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700"
                 >
                   <Edit className="h-4 w-4 dark:text-white" />
                 </Button>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{property.title}</h3>
              
                             <div className="flex items-center text-secondary-600 dark:text-gray-300 mb-3">
                 <MapPin className="h-4 w-4 mr-1" />
                 <span className="text-sm">{property.address.neighborhood}, {property.address.city}</span>
               </div>
               
               <div className="flex items-center space-x-4 mb-4 text-sm text-secondary-600 dark:text-gray-300">
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
                  <p className="text-lg font-bold" style={{ color: getValueColor(property.price, 'income') }}>
                    {formatCurrency(property.price)}
                  </p>
                                                    {property.rentPrice && (
                    <p className="text-sm" style={{ color: getValueColor(property.rentPrice, 'income') }}>
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
      >
        {selectedProperty && (
          <div className="space-y-6">
            {/* Imagens */}
            <div className="grid grid-cols-2 gap-4">
              {selectedProperty.images?.map((image: string, index: number) => (
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
                 <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Informações do Imóvel</h4>
                 <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                   <p><strong>Tipo:</strong> {getTypeText(selectedProperty.type)}</p>
                   <p><strong>Status:</strong> {getStatusText(selectedProperty.status)}</p>
                   <p><strong>Área:</strong> {selectedProperty.features?.area}m²</p>
                   <p><strong>Área construída:</strong> {selectedProperty.features?.builtArea}m²</p>
                   <p><strong>Quartos:</strong> {selectedProperty.features?.bedrooms}</p>
                   <p><strong>Banheiros:</strong> {selectedProperty.features?.bathrooms}</p>
                   <p><strong>Vagas:</strong> {selectedProperty.features?.parkingSpaces}</p>
                 </div>
               </div>
               
               <div>
                 <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Valores</h4>
                 <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                   <p><strong>Preço de venda:</strong> <span className="text-success-600 dark:text-success-400">{formatCurrency(selectedProperty.price)}</span></p>
                   {selectedProperty.rentPrice && (
                     <p><strong>Preço de aluguel:</strong> <span className="text-primary-600 dark:text-primary-400">{formatCurrency(selectedProperty.rentPrice)}</span></p>
                   )}
                 </div>
                 
                 <h4 className="font-semibold mb-3 mt-6 text-gray-900 dark:text-gray-100">Endereço</h4>
                 <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
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
               <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Descrição</h4>
               <p className="text-sm text-secondary-600 dark:text-gray-300">{selectedProperty.description}</p>
             </div>
            
                         {/* Proprietário */}
             <div>
               <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Proprietário</h4>
               <div className="text-sm text-gray-700 dark:text-gray-300">
                 <p><strong>Nome:</strong> {selectedProperty.owner?.name}</p>
                 <p><strong>Telefone:</strong> {selectedProperty.owner?.phone}</p>
                 {selectedProperty.owner?.email && (
                   <p><strong>Email:</strong> {selectedProperty.owner.email}</p>
                 )}
               </div>
             </div>
            
                         {/* Ações */}
             <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
               <Button variant="outline" onClick={() => setShowModal(false)}>
                 Fechar
               </Button>
               <Button>
                 <Edit className="h-4 w-4 mr-2 dark:text-white" />
                 Editar Imóvel
               </Button>
             </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
