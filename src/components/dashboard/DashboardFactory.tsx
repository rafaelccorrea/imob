import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import AgentDashboardPage from '../../pages/AgentDashboardPage';
import ManagerDashboardPage from '../../pages/ManagerDashboardPage';
import OwnerDashboardPage from '../../pages/OwnerDashboardPage';
import { DashboardPage } from '../../pages/DashboardPage';

export const DashboardFactory: React.FC = () => {
  const { userRole } = usePermissions();

  // Debug: verificar qual dashboard está sendo renderizado
  console.log('🏭 DashboardFactory - userRole:', userRole);

  // Renderiza o dashboard específico baseado no perfil
  switch (userRole) {
    case 'agent':
      console.log('👤 Renderizando AgentDashboardPage');
      return <AgentDashboardPage />;
    case 'manager':
      console.log('👔 Renderizando ManagerDashboardPage');
      return <ManagerDashboardPage />;
    case 'owner':
    case 'admin':
      console.log('👑 Renderizando OwnerDashboardPage');
      return <OwnerDashboardPage />;
    case 'financial':
    case 'hr':
    default:
      console.log('📊 Renderizando DashboardPage padrão');
      return <DashboardPage />;
  }
};
