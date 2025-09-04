import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import { AgentDashboard } from './AgentDashboard';
import { DashboardPage } from '../../pages/DashboardPage';

export const DashboardFactory: React.FC = () => {
  const { userRole } = usePermissions();

  // Renderiza o dashboard específico baseado no perfil
  switch (userRole) {
    case 'agent':
      return <AgentDashboard />;
    case 'manager':
    case 'owner':
    case 'financial':
    case 'hr':
    default:
      return <DashboardPage />;
  }
};
