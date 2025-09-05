import React from 'react';
import { TeamManagement } from '../components/teams/TeamManagement';
import { useAuthStore } from '../stores';

export default function TeamsPage() {
  const { user } = useAuthStore();

  return (
    <TeamManagement managerId={user?.id || ''} />
  );
}
