import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  Award
} from 'lucide-react';
import { 
  mockFinancialCommissions,
  mockAgentFinancialSummaries
} from '../../utils/mockData';
import { formatCurrency, formatDate } from '../../utils';
import { colors } from '../../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal } from '../ui';
import type { Commission as FinancialCommission } from '../../types/financial';

interface FinancialCommissionsProps {
  searchTerm: string;
  selectedStatus: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const FinancialCommissions: React.FC<FinancialCommissionsProps> = ({
  searchTerm,
  selectedStatus,
  onSearchChange,
  onStatusChange
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<FinancialCommission | null>(null);

  // Filtrar comissões
  const filteredCommissions = mockFinancialCommissions.filter(commission => {
    const matchesSearch = commission.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || commission.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Calcular métricas
  const totalCommissions = filteredCommissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  const pendingCommissions = filteredCommissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.commissionAmount, 0);
  const paidCommissions = filteredCommissions
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.commissionAmount, 0);

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const openCommissionModal = (commission: FinancialCommission) => {
    setSelectedCommission(commission);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Comissões
                </p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(totalCommissions)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Pendentes
                </p>
                <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                  {formatCurrency(pendingCommissions)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                <Calendar className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Pagas
                </p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(paidCommissions)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance dos Corretores */}
      <Card>
        <CardHeader>
          <CardTitle className={colors.text.title}>
            Performance dos Corretores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAgentFinancialSummaries.map((agent) => (
              <div
                key={agent.agentId}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className={`font-medium ${colors.text.title}`}>
                      {agent.agentName}
                    </p>
                    <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                      {agent.dealsClosed} negócios • Taxa de conversão: {agent.conversionRate}%
                    </p>
                    <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                      Meta: {formatCurrency(agent.monthlyGoal)} • Realizado: {formatCurrency(agent.totalCommissions)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(agent.totalCommissions)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {(() => {
                      const monthlyGoal = agent.totalCommissions * 1.2; // Meta 20% maior que o atual
                      return ((agent.totalCommissions / monthlyGoal) * 100).toFixed(1);
                    })()}% da meta
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Comissões */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className={colors.text.title}>
              Comissões ({filteredCommissions.length})
            </CardTitle>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Comissão
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCommissions.map((commission) => (
              <div
                key={commission.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className={`font-medium ${colors.text.title}`}>
                      {commission.propertyTitle}
                    </p>
                    <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                      {commission.agentName} • {commission.propertyType} • {formatDate(commission.saleDate)}
                    </p>
                    <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                      Valor da Venda: {formatCurrency(commission.saleValue)} • Taxa: {commission.commissionRate}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(commission.commissionAmount)}
                    </p>
                    <Badge variant={getStatusColor(commission.status) as any}>
                      {commission.status === 'paid' ? 'Paga' : 
                       commission.status === 'pending' ? 'Pendente' : 'Cancelada'}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openCommissionModal(commission)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detalhes da Comissão"
      >
        {selectedCommission && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Propriedade
                </p>
                <p className={colors.text.title}>
                  {selectedCommission.propertyTitle}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Corretor
                </p>
                <p className={colors.text.title}>
                  {selectedCommission.agentName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Valor da Venda
                </p>
                <p className="font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(selectedCommission.saleValue)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Taxa de Comissão
                </p>
                <p className={colors.text.title}>
                  {selectedCommission.commissionRate}%
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Valor da Comissão
                </p>
                <p className="font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(selectedCommission.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Data da Venda
                </p>
                <p className={colors.text.title}>
                  {formatDate(selectedCommission.saleDate)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Status
                </p>
                <Badge variant={getStatusColor(selectedCommission.status) as any}>
                  {selectedCommission.status === 'paid' ? 'Paga' : 
                   selectedCommission.status === 'pending' ? 'Pendente' : 'Cancelada'}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Tipo de Propriedade
                </p>
                <p className={colors.text.title}>
                  {selectedCommission.propertyType}
                </p>
              </div>
            </div>
            
            {selectedCommission.notes && (
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Observações
                </p>
                <p className={colors.text.title}>
                  {selectedCommission.notes}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
