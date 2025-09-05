import React from 'react';
import { PresentationBuilder } from '../components/presentations/PresentationBuilder';
import { useAuthStore } from '../stores';

export default function PresentationsPage() {
  const { user } = useAuthStore();

  return (
    <PresentationBuilder 
      userRole={user?.role as 'owner' | 'manager'} 
      userId={user?.id || ''} 
    />
  );
}
