import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building2, 
  Calendar,
  Target,
  Award,
  BarChart3
} from 'lucide-react';
import { useAuthStore } from '../../stores';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { formatCurrency, formatDate } from '../../utils';
import { mockProperties, mockLeads, mockDeals, mockCommissions } from '../../utils/mockData';

export const AgentDashboard: React.FC = () => {
  const { user } = useAuthStore();

  // Simular dados específicos do agente
  const myProperties = mockProperties.filter(p => p.responsibleAgentId === user?.id);
  const myLeads = mockLeads.filter(l => l.assignedAgentId === user?.id);
  const myDeals = mockDeals.filter(d => d.agentId === user?.id);
  const myCommissions = mockCommissions.filter(c => c.agentId === user?.id);

  // Cálculos de performance
  const totalSales = myDeals.filter(d => d.status === 'signed').length;
  const totalCommissions = myCommissions.reduce((sum, c) => sum + c.amount, 0);
  const conversionRate = myLeads.length > 0 ? (totalSales / myLeads.length) * 100 : 0;
  const ranking = 3; // Simulado

  // Função para detectar se está no modo dark
  const isDarkMode = () => {
    return document.documentElement.classList.contains('dark');
  };

  // Função para obter a cor baseada no valor
  const getValueColor = (value: number, type: string = 'income') => {
    const dark = isDarkMode();
    if (value < 0) {
      return dark ? '#f87171' : '#dc2626';
    } else if (type === 'expense') {
      return dark ? '#f87171' : '#dc2626';
    } else {
      return dark ? '#4ade80' : '#16a34a';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Meu Dashboard
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Bem-vindo de volta, {user?.name}! Aqui está seu resumo pessoal.
          </p>
        </div>
      </div>

      {/* Métricas Pessoais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Minhas Vendas</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-white">{totalSales}</p>
                <p className="text-xs text-success-600 dark:text-white flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% este mês
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Comissões</p>
                <p className="text-2xl font-bold" style={{ color: getValueColor(totalCommissions, 'income') }}>
                  {formatCurrency(totalCommissions)}
                </p>
                <p className="text-xs text-success-600 dark:text-white flex items-center mt-1">
                  <DollarSign className="h-3 w-3 mr-1" />
                  +8% este mês
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success-100 dark:bg-success-900 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-warning-600 dark:text-white">
                  {conversionRate.toFixed(1)}%
                </p>
                <p className="text-xs text-warning-600 dark:text-white flex items-center mt-1">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Meta: 25%
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning-100 dark:bg-warning-900 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-warning-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-white">Ranking</p>
                <p className="text-2xl font-bold text-info-600 dark:text-white">#{ranking}</p>
                <p className="text-xs text-info-600 dark:text-white flex items-center mt-1">
                  <Award className="h-3 w-3 mr-1" />
                  Top 5
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-info-100 dark:bg-info-900 flex items-center justify-center">
                <Award className="h-6 w-6 text-info-600 dark:text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seções Específicas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meus Imóveis */}
        <Card>
          <CardHeader>
            <CardTitle className="dark:text-white">Meus Imóveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myProperties.slice(0, 5).map((property) => (
                <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-secondary-100">
                      {property.title}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {property.address.neighborhood}, {property.address.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium" style={{ color: getValueColor(property.price, 'income') }}>
                      {formatCurrency(property.price)}
                    </p>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">
                      {property.status === 'available' ? 'Disponível' : 
                       property.status === 'sold' ? 'Vendido' : 'Alugado'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meus Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="dark:text-white">Meus Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myLeads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-secondary-100">
                      {lead.name}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {lead.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {formatDate(lead.lastContact)}
                    </p>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">
                      {lead.status === 'new' ? 'Novo' :
                       lead.status === 'contacted' ? 'Contactado' :
                       lead.status === 'visit_scheduled' ? 'Visita Agendada' :
                       lead.status === 'qualified' ? 'Qualificado' : 'Fechado'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="dark:text-white">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="h-20 flex-col border rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors">
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-sm">Agendar Visita</span>
            </button>
            <button className="h-20 flex-col border rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Novo Lead</span>
            </button>
            <button className="h-20 flex-col border rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors">
              <Building2 className="h-6 w-6 mb-2" />
              <span className="text-sm">Meus Imóveis</span>
            </button>
            <button className="h-20 flex-col border rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors">
              <DollarSign className="h-6 w-6 mb-2" />
              <span className="text-sm">Minhas Comissões</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
