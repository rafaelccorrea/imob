import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  Grid, 
  List, 
  Eye, 
  Download, 
  Edit, 
  Plus,
  Image as ImageIcon,
  Home
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

interface PropertyPhoto {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  category: 'exterior' | 'interior' | 'amenities' | 'neighborhood' | 'other';
  tags: string[];
  uploadedBy: string;
  uploadedAt: string;
  fileSize: number;
  dimensions: string;
  isMain: boolean;
  views: number;
  downloads: number;
}

interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  price: number;
  photos: PropertyPhoto[];
  totalPhotos: number;
  lastUpdate: string;
}

const PropertyGalleryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PropertyPhoto | null>(null);

  // Mock data - propriedades
  const properties: Property[] = [
    {
      id: '1',
      name: 'Apartamento Copacabana',
      address: 'Copacabana, RJ',
      type: 'Apartamento',
      price: 850000,
      totalPhotos: 24,
      lastUpdate: '2024-01-15',
      photos: []
    },
    {
      id: '2',
      name: 'Casa Barra da Tijuca',
      address: 'Barra da Tijuca, RJ',
      type: 'Casa',
      price: 1200000,
      totalPhotos: 18,
      lastUpdate: '2024-01-20',
      photos: []
    },
    {
      id: '3',
      name: 'Loja Ipanema',
      address: 'Ipanema, RJ',
      type: 'Comercial',
      price: 650000,
      totalPhotos: 12,
      lastUpdate: '2024-01-25',
      photos: []
    }
  ];

  // Mock data - fotos
  const photosData: PropertyPhoto[] = [
    {
      id: '1',
      propertyId: '1',
      propertyName: 'Apartamento Copacabana',
      propertyAddress: 'Copacabana, RJ',
      url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200',
      title: 'Fachada Principal',
      description: 'Vista frontal do apartamento com arquitetura moderna',
      category: 'exterior',
      tags: ['fachada', 'moderno', 'principal'],
      uploadedBy: 'João Silva',
      uploadedAt: '2024-01-15',
      fileSize: 2.5,
      dimensions: '1920x1080',
      isMain: true,
      views: 45,
      downloads: 12
    },
    {
      id: '2',
      propertyId: '1',
      propertyName: 'Apartamento Copacabana',
      propertyAddress: 'Copacabana, RJ',
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200',
      title: 'Sala de Estar',
      description: 'Sala ampla com vista para o mar',
      category: 'interior',
      tags: ['sala', 'vista', 'mar'],
      uploadedBy: 'João Silva',
      uploadedAt: '2024-01-15',
      fileSize: 3.2,
      dimensions: '1920x1080',
      isMain: false,
      views: 38,
      downloads: 8
    },
    {
      id: '3',
      propertyId: '1',
      propertyName: 'Apartamento Copacabana',
      propertyAddress: 'Copacabana, RJ',
      url: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=200',
      title: 'Quarto Principal',
      description: 'Quarto master com closet integrado',
      category: 'interior',
      tags: ['quarto', 'master', 'closet'],
      uploadedBy: 'João Silva',
      uploadedAt: '2024-01-15',
      fileSize: 2.8,
      dimensions: '1920x1080',
      isMain: false,
      views: 32,
      downloads: 6
    },
    {
      id: '4',
      propertyId: '2',
      propertyName: 'Casa Barra da Tijuca',
      propertyAddress: 'Barra da Tijuca, RJ',
      url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=200',
      title: 'Fachada da Casa',
      description: 'Casa moderna com jardim frontal',
      category: 'exterior',
      tags: ['casa', 'jardim', 'moderna'],
      uploadedBy: 'Maria Santos',
      uploadedAt: '2024-01-20',
      fileSize: 4.1,
      dimensions: '1920x1080',
      isMain: true,
      views: 52,
      downloads: 15
    },
    {
      id: '5',
      propertyId: '2',
      propertyName: 'Casa Barra da Tijuca',
      propertyAddress: 'Barra da Tijuca, RJ',
      url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200',
      title: 'Piscina',
      description: 'Área de lazer com piscina e churrasqueira',
      category: 'amenities',
      tags: ['piscina', 'lazer', 'churrasqueira'],
      uploadedBy: 'Maria Santos',
      uploadedAt: '2024-01-20',
      fileSize: 3.5,
      dimensions: '1920x1080',
      isMain: false,
      views: 41,
      downloads: 9
    },
    {
      id: '6',
      propertyId: '3',
      propertyName: 'Loja Ipanema',
      propertyAddress: 'Ipanema, RJ',
      url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200',
      title: 'Interior da Loja',
      description: 'Espaço comercial amplo e bem iluminado',
      category: 'interior',
      tags: ['comercial', 'amplo', 'iluminado'],
      uploadedBy: 'Pedro Costa',
      uploadedAt: '2024-01-25',
      fileSize: 2.9,
      dimensions: '1920x1080',
      isMain: true,
      views: 28,
      downloads: 5
    }
  ];

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'exterior', label: 'Exterior' },
    { value: 'interior', label: 'Interior' },
    { value: 'amenities', label: 'Comodidades' },
    { value: 'neighborhood', label: 'Vizinhança' },
    { value: 'other', label: 'Outras' }
  ];

  const filteredPhotos = photosData.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || photo.category === filterCategory;
    const matchesProperty = selectedProperty === 'all' || photo.propertyId === selectedProperty;
    
    return matchesSearch && matchesCategory && matchesProperty;
  });

  const formatFileSize = (sizeInMB: number) => {
    return `${sizeInMB} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const openPhotoModal = (photo: PropertyPhoto) => {
    setSelectedPhoto(photo);
    setShowPhotoModal(true);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Galeria de Fotos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie e organize as fotos dos imóveis
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="flex items-center gap-2"
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            {viewMode === 'grid' ? 'Lista' : 'Grade'}
          </Button>
          <Button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total de Fotos
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {photosData.length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <ImageIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Imóveis
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {properties.length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Home className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Visualizações
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                {photosData.reduce((sum, photo) => sum + photo.views, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Downloads
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                {photosData.reduce((sum, photo) => sum + photo.downloads, 0)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <Download className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por título, imóvel ou tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
          >
            <option value="all">Todos os Imóveis</option>
            {properties.map(property => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Galeria */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={photo.thumbnail}
                  alt={photo.title}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => openPhotoModal(photo)}
                />
                {photo.isMain && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500">
                    Principal
                  </Badge>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    onClick={() => openPhotoModal(photo)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1 truncate">{photo.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{photo.propertyName}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {photo.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {photo.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{photo.tags.length - 2}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatFileSize(photo.fileSize)}</span>
                  <span>{photo.views} views</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPhotos.map((photo) => (
            <Card key={photo.id} className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={photo.thumbnail}
                  alt={photo.title}
                  className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded cursor-pointer"
                  onClick={() => openPhotoModal(photo)}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{photo.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{photo.propertyName}</p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{photo.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {photo.isMain && (
                        <Badge className="bg-yellow-500 text-xs">Principal</Badge>
                      )}
                      <Badge variant="outline" className="text-xs">{photo.category}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-500">
                    <span>{formatFileSize(photo.fileSize)}</span>
                    <span className="hidden sm:inline">{photo.dimensions}</span>
                    <span>{photo.views} views</span>
                    <span>{photo.downloads} downloads</span>
                    <span className="hidden sm:inline">{formatDate(photo.uploadedAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end sm:justify-start">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openPhotoModal(photo)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Upload */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload de Fotos"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Selecionar Imóvel</label>
            <select className="w-full px-3 py-2 border rounded-md">
              {properties.map(property => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Arquivos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Arraste e solte as fotos aqui</p>
              <p className="text-sm text-gray-500">ou clique para selecionar</p>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancelar
            </Button>
            <Button>Upload</Button>
          </div>
        </div>
      </Modal>

      {/* Modal de Visualização da Foto */}
      <Modal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        title={selectedPhoto?.title || ''}
        size="lg"
      >
        {selectedPhoto && (
          <div className="space-y-4">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full h-96 object-cover rounded"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Imóvel</p>
                <p className="text-gray-600 truncate">{selectedPhoto.propertyName}</p>
              </div>
              <div>
                <p className="font-medium">Categoria</p>
                <p className="text-gray-600">{selectedPhoto.category}</p>
              </div>
              <div>
                <p className="font-medium">Tamanho</p>
                <p className="text-gray-600">{selectedPhoto.dimensions}</p>
              </div>
              <div>
                <p className="font-medium">Arquivo</p>
                <p className="text-gray-600">{formatFileSize(selectedPhoto.fileSize)}</p>
              </div>
              <div>
                <p className="font-medium">Upload</p>
                <p className="text-gray-600">{formatDate(selectedPhoto.uploadedAt)}</p>
              </div>
              <div>
                <p className="font-medium">Por</p>
                <p className="text-gray-600 truncate">{selectedPhoto.uploadedBy}</p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Tags</p>
              <div className="flex flex-wrap gap-1">
                {selectedPhoto.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowPhotoModal(false)}>
                Fechar
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PropertyGalleryPage;
