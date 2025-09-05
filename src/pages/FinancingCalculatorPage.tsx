import React from 'react';
import { FinancingCalculator } from '../components/financing';
import { useAuthStore } from '../stores';

export default function FinancingCalculatorPage() {
  const { user } = useAuthStore();

  const handleSaveSimulation = (simulation: any) => {
    console.log('Salvar simulação:', simulation);
    // Aqui você implementaria a lógica para salvar a simulação
  };

  const handleShareSimulation = (simulation: any) => {
    console.log('Compartilhar simulação:', simulation);
    // Aqui você implementaria a lógica para compartilhar a simulação
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 custom-scroll">
      <FinancingCalculator
        agentId={user?.id || ''}
        onSaveSimulation={handleSaveSimulation}
        onShareSimulation={handleShareSimulation}
      />
    </div>
  );
}
