import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { 
  mockFinancialEntries 
} from '../../utils/mockData';
import { formatCurrency, formatDate } from '../../utils';
import { colors } from '../../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal } from '../ui';
import type { FinancialEntry } from '../../types/financial';

interface FinancialEntriesProps {
  searchTerm: string;
  selectedType: string;
  selectedStatus: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const FinancialEntries: React.FC<FinancialEntriesProps> = ({
  searchTerm,
  selectedType,
  selectedStatus,
  onSearchChange,
  onTypeChange,
  onStatusChange
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<FinancialEntry | null>(null);

  // Filtrar entradas financeiras
  const filteredEntries = mockFinancialEntries.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || entry.type === selectedType;
    const matchesStatus = !selectedStatus || entry.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calcular métricas
  const totalIncome = filteredEntries
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);
  
  const totalExpense = filteredEntries
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const netBalance = totalIncome - totalExpense;

  // Função para obter a cor baseada no valor e tipo
  const getValueColor = (value: number, type: string = 'income') => {
    if (value < 0) {
      return 'text-red-600 dark:text-red-400';
    } else if (type === 'expense') {
      return 'text-red-600 dark:text-red-400';
    } else {
      return 'text-green-600 dark:text-green-400';
    }
  };

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'pago':
      case 'approved':
        return 'success';
      case 'pending':
      case 'pendente':
        return 'warning';
      case 'overdue':
      case 'vencido':
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const openEntryModal = (entry: FinancialEntry) => {
    setSelectedEntry(entry);
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
                  Total Receitas
                </p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(totalIncome)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Despesas
                </p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(totalExpense)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20">
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Saldo Líquido
                </p>
                <p className={`text-xl font-bold ${netBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatCurrency(netBalance)}
                </p>
              </div>
              <div className={`p-2 rounded-full ${netBalance >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                <DollarSign className={`h-5 w-5 ${netBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Entradas */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className={colors.text.title}>
              Entradas/Saídas ({filteredEntries.length})
            </CardTitle>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Entrada
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${entry.type === 'income' ? colors.iconBg.success : colors.iconBg.error}`}>
                    <DollarSign className={`h-5 w-5 ${entry.type === 'income' ? colors.icons.success : colors.icons.error}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${colors.text.title}`}>
                      {entry.description}
                    </p>
                    <p className={`text-sm text-gray-600 dark:text-gray-300`}>
                      {entry.category} • {formatDate(entry.date)}
                    </p>
                    {entry.paymentMethod && (
                      <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                        Método: {entry.paymentMethod}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-bold ${getValueColor(entry.amount, entry.type)}`}>
                      {entry.type === 'expense' ? '-' : '+'}{formatCurrency(entry.amount)}
                    </p>
                    <Badge variant={getStatusColor(entry.status) as any}>
                      {entry.status === 'paid' ? 'Pago' : 
                       entry.status === 'pending' ? 'Pendente' : 
                       entry.status === 'overdue' ? 'Vencido' : 'Cancelado'}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEntryModal(entry)}
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
        title="Detalhes da Entrada"
      >
        {selectedEntry && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Descrição
                </p>
                <p className={colors.text.title}>
                  {selectedEntry.description}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Valor
                </p>
                <p className={`font-bold ${getValueColor(selectedEntry.amount, selectedEntry.type)}`}>
                  {selectedEntry.type === 'expense' ? '-' : '+'}{formatCurrency(selectedEntry.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Categoria
                </p>
                <p className={colors.text.title}>
                  {selectedEntry.category}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Data
                </p>
                <p className={colors.text.title}>
                  {formatDate(selectedEntry.date)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Status
                </p>
                <Badge variant={getStatusColor(selectedEntry.status) as any}>
                  {selectedEntry.status === 'paid' ? 'Pago' : 
                   selectedEntry.status === 'pending' ? 'Pendente' : 
                   selectedEntry.status === 'overdue' ? 'Vencido' : 'Cancelado'}
                </Badge>
              </div>
              {selectedEntry.paymentMethod && (
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Método de Pagamento
                  </p>
                  <p className={colors.text.title}>
                    {selectedEntry.paymentMethod}
                  </p>
                </div>
              )}
            </div>
            
            {selectedEntry.notes && (
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Observações
                </p>
                <p className={colors.text.title}>
                  {selectedEntry.notes}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
