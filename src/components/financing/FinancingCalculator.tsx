import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Banknote, 
  TrendingUp,
  Building,
  DollarSign,
  Calendar,
  Share2,
  Save,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Modal } from '../ui';
import { colors } from '../../utils/colors';
import { formatCurrency } from '../../utils';
import { mockBanks } from '../../utils/mockData';
import type { Bank, FinancingSimulation, ClientProfile } from '../../types';

// Função para aplicar máscara de moeda
const formatCurrencyInput = (value: string) => {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '');
  // Converte para número e formata
  const number = parseInt(numbers) || 0;
  return number.toLocaleString('pt-BR');
};

// Função para converter valor formatado de volta para número
const parseCurrencyInput = (value: string) => {
  return parseInt(value.replace(/\D/g, '')) || 0;
};

interface FinancingCalculatorProps {
  agentId: string;
  onSaveSimulation?: (simulation: FinancingSimulation) => void;
  onShareSimulation?: (simulation: FinancingSimulation) => void;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({
  agentId,
  onSaveSimulation,
  onShareSimulation
}) => {
  const [propertyValue, setPropertyValue] = useState<number>(500000);
  const [downPayment, setDownPayment] = useState<number>(100000);
  const [propertyValueFormatted, setPropertyValueFormatted] = useState<string>('500.000');
  const [downPaymentFormatted, setDownPaymentFormatted] = useState<string>('100.000');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(mockBanks[0]);
  const [loanTerm, setLoanTerm] = useState<number>(360);
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [simulation, setSimulation] = useState<FinancingSimulation | null>(null);
  const [comparisonSimulations, setComparisonSimulations] = useState<FinancingSimulation[]>([]);

  // Calcular simulação quando os valores mudarem
  useEffect(() => {
    if (selectedBank && propertyValue > 0 && downPayment > 0) {
      calculateSimulation();
    }
  }, [propertyValue, downPayment, selectedBank, loanTerm]);

  const calculateSimulation = () => {
    if (!selectedBank) return;

    const loanAmount = propertyValue - downPayment;
    const monthlyRate = selectedBank.interestRate / 100 / 12;
    const totalPayments = loanTerm;

    // Fórmula de financiamento: PMT = PV * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalAmount = monthlyPayment * totalPayments;
    const totalInterest = totalAmount - loanAmount;

    const newSimulation: FinancingSimulation = {
      id: `sim-${Date.now()}`,
      propertyValue,
      downPayment,
      loanAmount,
      bankId: selectedBank.id,
      bankName: selectedBank.name,
      interestRate: selectedBank.interestRate,
      loanTerm,
      monthlyPayment,
      totalInterest,
      totalAmount,
      createdAt: new Date().toISOString(),
      agentId,
      clientName: clientProfile?.name,
      clientEmail: clientProfile?.email,
    };

    setSimulation(newSimulation);
  };

  const calculateAllBanks = () => {
    const simulations: FinancingSimulation[] = mockBanks.map(bank => {
      const loanAmount = propertyValue - downPayment;
      const monthlyRate = bank.interestRate / 100 / 12;
      const totalPayments = Math.min(loanTerm, bank.maxLoanTerm);

      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                            (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      const totalAmount = monthlyPayment * totalPayments;
      const totalInterest = totalAmount - loanAmount;

      return {
        id: `sim-${bank.id}-${Date.now()}`,
        propertyValue,
        downPayment,
        loanAmount,
        bankId: bank.id,
        bankName: bank.name,
        interestRate: bank.interestRate,
        loanTerm: totalPayments,
        monthlyPayment,
        totalInterest,
        totalAmount,
        createdAt: new Date().toISOString(),
        agentId,
        clientName: clientProfile?.name,
        clientEmail: clientProfile?.email,
      };
    });

    setComparisonSimulations(simulations);
    setShowComparisonModal(true);
  };

  const getDownPaymentPercentage = () => {
    return ((downPayment / propertyValue) * 100).toFixed(1);
  };


  const isEligible = () => {
    if (!selectedBank || !clientProfile) return true;
    
    const loanAmount = propertyValue - downPayment;
    const monthlyPayment = simulation?.monthlyPayment || 0;
    
    return (
      loanAmount >= selectedBank.minLoanAmount &&
      loanAmount <= selectedBank.maxLoanAmount &&
      downPayment >= (propertyValue * selectedBank.minDownPayment / 100) &&
      monthlyPayment <= clientProfile.maxMonthlyPayment
    );
  };

  const getEligibilityStatus = () => {
    if (!clientProfile) return { status: 'info', message: 'Adicione o perfil do cliente para verificar elegibilidade' };
    
    if (isEligible()) {
      return { status: 'success', message: 'Cliente elegível para financiamento!' };
    } else {
      return { status: 'error', message: 'Cliente não atende aos critérios de elegibilidade' };
    }
  };

  const eligibility = getEligibilityStatus();

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text.title} truncate`}>
            Calculadora de Financiamento
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Simule diferentes cenários de financiamento para seus clientes
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={calculateAllBanks} className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Comparar Bancos</span>
            <span className="sm:hidden">Comparar</span>
          </Button>
          <Button variant="outline" onClick={() => setShowClientModal(true)} className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto">
            <Building className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Perfil do Cliente</span>
            <span className="sm:hidden">Cliente</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {/* Formulário de Entrada */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className={`${colors.text.title} text-sm sm:text-base`}>
              Parâmetros do Financiamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {/* Valor do Imóvel */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium ${colors.text.title} mb-1 sm:mb-2`}>
                Valor do Imóvel
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                <Input
                  type="text"
                  value={propertyValueFormatted}
                  onChange={(e) => {
                    const formatted = formatCurrencyInput(e.target.value);
                    setPropertyValueFormatted(formatted);
                    setPropertyValue(parseCurrencyInput(e.target.value));
                  }}
                  className="pl-8 sm:pl-10 text-xs sm:text-sm text-gray-900 dark:text-gray-100"
                  placeholder="500.000"
                />
              </div>
            </div>

            {/* Entrada */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium ${colors.text.title} mb-1 sm:mb-2`}>
                Entrada ({getDownPaymentPercentage()}%)
              </label>
              <div className="relative">
                <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                <Input
                  type="text"
                  value={downPaymentFormatted}
                  onChange={(e) => {
                    const formatted = formatCurrencyInput(e.target.value);
                    setDownPaymentFormatted(formatted);
                    setDownPayment(parseCurrencyInput(e.target.value));
                  }}
                  className="pl-8 sm:pl-10 text-xs sm:text-sm text-gray-900 dark:text-gray-100"
                  placeholder="100.000"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Valor do financiamento: {formatCurrency(propertyValue - downPayment)}
              </p>
            </div>

            {/* Banco */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium ${colors.text.title} mb-1 sm:mb-2`}>
                Banco
              </label>
              <select
                value={selectedBank?.id || ''}
                onChange={(e) => {
                  const bank = mockBanks.find(b => b.id === e.target.value);
                  setSelectedBank(bank || null);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
              >
                {mockBanks.map(bank => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name} - {bank.interestRate}% a.a.
                  </option>
                ))}
              </select>
            </div>

            {/* Prazo */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium ${colors.text.title} mb-1 sm:mb-2`}>
                Prazo (meses)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                <Input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="pl-8 sm:pl-10 text-xs sm:text-sm text-gray-900 dark:text-gray-100"
                  placeholder="360"
                  min={1}
                  max={selectedBank?.maxLoanTerm || 420}
                />
              </div>
            </div>

            {/* Status de Elegibilidade */}
            {clientProfile && (
              <div className={`p-2 sm:p-3 rounded-lg ${
                eligibility.status === 'success' ? 'bg-green-50 dark:bg-green-900/20' :
                eligibility.status === 'error' ? 'bg-red-50 dark:bg-red-900/20' :
                'bg-blue-50 dark:bg-blue-900/20'
              }`}>
                <div className="flex items-center gap-2">
                  {eligibility.status === 'success' && <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />}
                  {eligibility.status === 'error' && <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />}
                  {eligibility.status === 'info' && <Info className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />}
                  <span className={`text-xs sm:text-sm ${
                    eligibility.status === 'success' ? 'text-green-700 dark:text-green-300' :
                    eligibility.status === 'error' ? 'text-red-700 dark:text-red-300' :
                    'text-blue-700 dark:text-blue-300'
                  }`}>
                    {eligibility.message}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resultado da Simulação */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className={`${colors.text.title} text-sm sm:text-base`}>
              Resultado da Simulação
            </CardTitle>
          </CardHeader>
          <CardContent>
            {simulation ? (
              <div className="space-y-3 sm:space-y-4">
                {/* Informações Principais */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Parcela Mensal</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(simulation.monthlyPayment)}
                    </p>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total de Juros</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(simulation.totalInterest)}
                    </p>
                  </div>
                </div>

                {/* Detalhes */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Valor do Imóvel:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(simulation.propertyValue)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Entrada:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(simulation.downPayment)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Valor Financiado:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(simulation.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Taxa de Juros:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{simulation.interestRate}% a.a.</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Prazo:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{simulation.loanTerm} meses</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 sm:pt-3 text-sm sm:text-base">
                    <span className="text-gray-600 dark:text-gray-300">Total a Pagar:</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">{formatCurrency(simulation.totalAmount)}</span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4">
                  <Button 
                    onClick={() => onSaveSimulation?.(simulation)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Salvar Simulação</span>
                    <span className="sm:hidden">Salvar</span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onShareSimulation?.(simulation)}
                    className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Compartilhar</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Preencha os dados para ver a simulação</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal de Comparação */}
      <Modal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        title="Comparação de Bancos"
        size="xl"
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 md:space-y-6 pr-2">
          {/* Resumo da Simulação */}
          <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 text-sm sm:text-base">Parâmetros da Simulação</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-300">Valor do Imóvel:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{formatCurrency(propertyValue)}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">Entrada:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{formatCurrency(downPayment)}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">Valor Financiado:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{formatCurrency(propertyValue - downPayment)}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">Prazo:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{loanTerm} meses</span>
              </div>
            </div>
          </div>

          {/* Comparação dos Bancos */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">Comparação de Propostas</h3>
            {comparisonSimulations
              .sort((a, b) => a.monthlyPayment - b.monthlyPayment)
              .map((sim, index) => (
                <div key={sim.id} className={`p-3 sm:p-4 md:p-6 rounded-lg border-2 transition-all ${
                  index === 0 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}>
                  {/* Header do Banco */}
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${index === 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">{sim.bankName}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Taxa: {sim.interestRate}% a.a.</p>
                      </div>
                    </div>
                    {index === 0 && (
                      <Badge variant="success" className="flex items-center gap-1 text-xs flex-shrink-0">
                        <CheckCircle className="w-3 h-3" />
                        <span className="hidden sm:inline">Melhor Opção</span>
                        <span className="sm:hidden">Melhor</span>
                      </Badge>
                    )}
                  </div>

                  {/* Valores Principais */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                    <div className="text-center p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Parcela Mensal</p>
                      <p className="font-bold text-sm sm:text-base md:text-lg text-gray-900 dark:text-gray-100">{formatCurrency(sim.monthlyPayment)}</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Total de Juros</p>
                      <p className="font-bold text-sm sm:text-base md:text-lg text-red-600 dark:text-red-400">{formatCurrency(sim.totalInterest)}</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Total a Pagar</p>
                      <p className="font-bold text-sm sm:text-base md:text-lg text-gray-900 dark:text-gray-100">{formatCurrency(sim.totalAmount)}</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Economia</p>
                      <p className="font-bold text-sm sm:text-base md:text-lg text-green-600 dark:text-green-400">
                        {index === 0 ? '-' : formatCurrency(comparisonSimulations[0].totalAmount - sim.totalAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Detalhes Adicionais */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Valor Financiado:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{formatCurrency(sim.loanAmount)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Prazo:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{sim.loanTerm} meses</span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-600">
                    <Button size="sm" className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Salvar Proposta</span>
                      <span className="sm:hidden">Salvar</span>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Compartilhar</span>
                      <span className="sm:hidden">Compart.</span>
                    </Button>
                  </div>
                </div>
              ))}
          </div>

          {/* Resumo Comparativo */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 text-sm sm:text-base">Resumo Comparativo</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-300">Menor Parcela:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(Math.min(...comparisonSimulations.map(s => s.monthlyPayment)))}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">Menor Total:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(Math.min(...comparisonSimulations.map(s => s.totalAmount)))}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">Menor Taxa:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                  {Math.min(...comparisonSimulations.map(s => s.interestRate))}% a.a.
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-300">Economia Total:</span>
                <span className="ml-2 font-medium text-green-600 dark:text-green-400">
                  {formatCurrency(Math.max(...comparisonSimulations.map(s => s.totalAmount)) - Math.min(...comparisonSimulations.map(s => s.totalAmount)))}
                </span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </Modal>

      {/* Modal de Perfil do Cliente */}
      <Modal
        isOpen={showClientModal}
        onClose={() => setShowClientModal(false)}
        title="Perfil do Cliente"
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 max-h-[60vh] overflow-y-auto custom-scroll space-y-3 sm:space-y-4 pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={`block text-xs sm:text-sm font-medium ${colors.text.title} mb-1 sm:mb-2`}>
                  Nome
                </label>
                <Input
                  value={clientProfile?.name || ''}
                  onChange={(e) => setClientProfile(prev => ({ ...prev!, name: e.target.value }))}
                  placeholder="Nome do cliente"
                  className="text-xs sm:text-sm text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className={`block text-xs sm:text-sm font-medium ${colors.text.title} mb-1 sm:mb-2`}>
                  Email
                </label>
                <Input
                  type="email"
                  value={clientProfile?.email || ''}
                  onChange={(e) => setClientProfile(prev => ({ ...prev!, email: e.target.value }))}
                  placeholder="email@exemplo.com"
                  className="text-xs sm:text-sm text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <div>
              <label className={`block text-xs sm:text-sm font-medium ${colors.text.title} mb-1 sm:mb-2`}>
                Renda Mensal
              </label>
              <Input
                type="text"
                value={clientProfile?.monthlyIncome ? formatCurrencyInput(clientProfile.monthlyIncome.toString()) : ''}
                onChange={(e) => {
                  const value = parseCurrencyInput(e.target.value);
                  setClientProfile(prev => ({ ...prev!, monthlyIncome: value }));
                }}
                placeholder="15.000"
                className="text-xs sm:text-sm text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className={`block text-xs sm:text-sm font-medium ${colors.text.title} mb-1 sm:mb-2`}>
                Pagamento Máximo Mensal
              </label>
              <Input
                type="text"
                value={clientProfile?.maxMonthlyPayment ? formatCurrencyInput(clientProfile.maxMonthlyPayment.toString()) : ''}
                onChange={(e) => {
                  const value = parseCurrencyInput(e.target.value);
                  setClientProfile(prev => ({ ...prev!, maxMonthlyPayment: value }));
                }}
                placeholder="4.000"
                className="text-xs sm:text-sm text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4 flex-shrink-0">
            <Button onClick={() => setShowClientModal(false)} className="text-xs sm:text-sm">
              Salvar Perfil
            </Button>
            <Button variant="outline" onClick={() => setShowClientModal(false)} className="text-xs sm:text-sm">
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
