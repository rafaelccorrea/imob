import React, { useState } from 'react';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Phone,
  Mail,
  Calendar,
  DollarSign,
  User,
  FileText,
  Download,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useAuthStore } from '../stores';
import { mockEmployees } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils';
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Input, Modal } from '../components/ui';

export const HRPage: React.FC = () => {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Filtros
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || employee.department === selectedDepartment;
    const matchesStatus = !selectedStatus || (selectedStatus === 'active' ? employee.isActive : !employee.isActive);
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'danger';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Ativo' : 'Inativo';
  };

  const openEmployeeModal = (employee: any) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const calculateYearsOfService = (hireDate: Date) => {
    const today = new Date();
    const hire = new Date(hireDate);
    return today.getFullYear() - hire.getFullYear();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">
            Recursos Humanos
          </h1>
          <p className="text-secondary-600">
            Gestão de colaboradores e equipe
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Colaborador
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
              <Input
                placeholder="Buscar colaboradores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input"
            >
              <option value="">Todos os departamentos</option>
              <option value="Vendas">Vendas</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Marketing">Marketing</option>
              <option value="Financeiro">Financeiro</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
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
                <p className="text-sm font-medium text-secondary-600">Total de Colaboradores</p>
                <p className="text-2xl font-bold text-primary-600">{mockEmployees.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Ativos</p>
                <p className="text-2xl font-bold text-success-600">
                  {mockEmployees.filter(e => e.isActive).length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Folha Salarial</p>
                <p className="text-2xl font-bold text-warning-600">
                  {formatCurrency(mockEmployees.reduce((sum, e) => sum + e.salary, 0))}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Tempo Médio</p>
                <p className="text-2xl font-bold text-primary-600">
                  {Math.round(mockEmployees.reduce((sum, e) => sum + calculateYearsOfService(e.hireDate), 0) / mockEmployees.length)} anos
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Colaboradores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{employee.name}</h3>
                    <p className="text-sm text-secondary-600">{employee.position}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEmployeeModal(employee)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-secondary-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{employee.email}</span>
                </div>
                
                <div className="flex items-center text-sm text-secondary-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{employee.phone}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="default">
                    {employee.department}
                  </Badge>
                  <Badge variant={getStatusColor(employee.isActive) as any}>
                    {getStatusText(employee.isActive)}
                  </Badge>
                </div>
                
                <div className="flex items-center text-sm text-secondary-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{formatCurrency(employee.salary)}</span>
                </div>
                
                <div className="flex items-center text-sm text-secondary-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Contratado em {formatDate(employee.hireDate)}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentos
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Contrato
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
        title={`Colaborador: ${selectedEmployee?.name}`}
        className="max-w-2xl"
      >
        {selectedEmployee && (
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Informações Pessoais</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Nome:</strong> {selectedEmployee.name}</p>
                  <p><strong>Email:</strong> {selectedEmployee.email}</p>
                  <p><strong>Telefone:</strong> {selectedEmployee.phone}</p>
                  <p><strong>Cargo:</strong> {selectedEmployee.position}</p>
                  <p><strong>Departamento:</strong> {selectedEmployee.department}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Informações Profissionais</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Salário:</strong> {formatCurrency(selectedEmployee.salary)}</p>
                  <p><strong>Data de Contratação:</strong> {formatDate(selectedEmployee.hireDate)}</p>
                  <p><strong>Tempo de Empresa:</strong> {calculateYearsOfService(selectedEmployee.hireDate)} anos</p>
                  <p><strong>Status:</strong> {getStatusText(selectedEmployee.isActive)}</p>
                </div>
              </div>
            </div>
            
            {/* Documentos */}
            <div>
              <h4 className="font-semibold mb-3">Documentos</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-secondary-600" />
                    <span className="text-sm">Contrato de Trabalho</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-secondary-600" />
                    <span className="text-sm">Carteira de Identidade</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                
                {selectedEmployee.documents.medicalExam && (
                  <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-secondary-600" />
                      <span className="text-sm">Exame Médico</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
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
                Editar Colaborador
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
