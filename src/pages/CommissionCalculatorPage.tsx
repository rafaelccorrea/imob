import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  TrendingUp, 
  Target, 
  Star,
  Award,
  Trophy,
  Zap,
  Crown,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { formatCurrency } from '../utils';
import { colors } from '../utils/colors';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Modal } from '../components/ui';

interface CommissionCalculation {
  propertyValue: number;
  commissionRate: number;
  commissionAmount: number;
  dealType: 'sale' | 'rent';
  agentLevel: 'junior' | 'senior' | 'expert' | 'master';
  bonusMultiplier: number;
  finalCommission: number;
}

interface CommissionTier {
  level: string;
  minDeals: number;
  rate: number;
  bonus: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

const commissionTiers: CommissionTier[] = [
  {
    level: 'Junior',
    minDeals: 0,
    rate: 0.02, // 2%
    bonus: 0,
    color: 'text-blue-600',
    icon: Star
  },
  {
    level: 'Senior',
    minDeals: 5,
    rate: 0.025, // 2.5%
    bonus: 0.1,
    color: 'text-green-600',
    icon: Award
  },
  {
    level: 'Expert',
    minDeals: 15,
    rate: 0.03, // 3%
    bonus: 0.2,
    color: 'text-purple-600',
    icon: Crown
  },
  {
    level: 'Master',
    minDeals: 30,
    rate: 0.035, // 3.5%
    bonus: 0.3,
    color: 'text-yellow-600',
    icon: Trophy
  }
];

export const CommissionCalculatorPage: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(500000);
  const [dealType, setDealType] = useState<'sale' | 'rent'>('sale');
  const [agentLevel, setAgentLevel] = useState<'junior' | 'senior' | 'expert' | 'master'>('senior');
  const [customRate, setCustomRate] = useState<number>(0);
  const [useCustomRate, setUseCustomRate] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [calculationHistory, setCalculationHistory] = useState<CommissionCalculation[]>([]);

  // Calcular comissão
  const calculateCommission = (): CommissionCalculation => {
    const tier = commissionTiers.find(t => t.level.toLowerCase() === agentLevel) || commissionTiers[0];
    const rate = useCustomRate ? customRate / 100 : tier.rate;
    const commissionAmount = propertyValue * rate;
    const bonusMultiplier = 1 + tier.bonus;
    const finalCommission = commissionAmount * bonusMultiplier;

    return {
      propertyValue,
      commissionRate: rate,
      commissionAmount,
      dealType,
      agentLevel,
      bonusMultiplier,
      finalCommission
    };
  };

  const calculation = calculateCommission();
  const currentTier = commissionTiers.find(t => t.level.toLowerCase() === agentLevel) || commissionTiers[0];

  // Salvar cálculo no histórico
  const saveCalculation = () => {
    const newCalculation = { ...calculation };
    setCalculationHistory(prev => [newCalculation, ...prev.slice(0, 9)]); // Manter apenas os últimos 10
    setShowModal(true);
  };

  // Obter próxima meta
  const getNextGoal = () => {
    const currentIndex = commissionTiers.findIndex(t => t.level.toLowerCase() === agentLevel);
    if (currentIndex < commissionTiers.length - 1) {
      return commissionTiers[currentIndex + 1];
    }
    return null;
  };

  const nextGoal = getNextGoal();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${colors.text.title}`}>
            Calculadora de Comissões
          </h1>
          <p className={`text-sm ${colors.text.subtitle}`}>
            Simule suas comissões e veja seu potencial de ganhos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Minhas Metas
          </Button>
          <Button className="flex items-center gap-2" onClick={saveCalculation}>
            <Star className="h-4 w-4" />
            Salvar Cálculo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculadora */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`${colors.text.title} flex items-center gap-2`}>
                <Calculator className="h-5 w-5" />
                Simulador de Comissão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Valor do Imóvel */}
              <div>
                <label className={`block text-sm font-medium ${colors.text.subtitle} mb-2`}>
                  Valor do Imóvel
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="pl-10 text-lg"
                    placeholder="500000"
                  />
                </div>
              </div>

              {/* Tipo de Negócio */}
              <div>
                <label className={`block text-sm font-medium ${colors.text.subtitle} mb-2`}>
                  Tipo de Negócio
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={dealType === 'sale' ? 'default' : 'outline'}
                    onClick={() => setDealType('sale')}
                    className="flex items-center gap-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Venda
                  </Button>
                  <Button
                    variant={dealType === 'rent' ? 'default' : 'outline'}
                    onClick={() => setDealType('rent')}
                    className="flex items-center gap-2"
                  >
                    <DollarSign className="h-4 w-4" />
                    Locação
                  </Button>
                </div>
              </div>

              {/* Nível do Corretor */}
              <div>
                <label className={`block text-sm font-medium ${colors.text.subtitle} mb-2`}>
                  Seu Nível Atual
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {commissionTiers.map((tier) => {
                    const Icon = tier.icon;
                    return (
                      <Button
                        key={tier.level}
                        variant={agentLevel === tier.level.toLowerCase() ? 'default' : 'outline'}
                        onClick={() => setAgentLevel(tier.level.toLowerCase() as any)}
                        className="flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        {tier.level}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Taxa Personalizada */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="customRate"
                    checked={useCustomRate}
                    onChange={(e) => setUseCustomRate(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="customRate" className={`text-sm font-medium ${colors.text.subtitle}`}>
                    Usar taxa personalizada
                  </label>
                </div>
                {useCustomRate && (
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      value={customRate}
                      onChange={(e) => setCustomRate(Number(e.target.value))}
                      className="pl-10"
                      placeholder="2.5"
                      step="0.1"
                      min="0"
                      max="10"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Resultado */}
          <Card>
            <CardHeader>
              <CardTitle className={colors.text.title}>
                Resultado da Simulação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className={`text-sm ${colors.text.subtitle}`}>Taxa Base</p>
                    <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                      {(calculation.commissionRate * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className={`text-sm ${colors.text.subtitle}`}>Comissão Base</p>
                    <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                      {formatCurrency(calculation.commissionAmount)}
                    </p>
                  </div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                  <p className={`text-sm ${colors.text.subtitle} mb-2`}>Comissão Final</p>
                  <p className={`text-4xl font-bold text-green-600 dark:text-green-400`}>
                    {formatCurrency(calculation.finalCommission)}
                  </p>
                  {calculation.bonusMultiplier > 1 && (
                    <p className={`text-sm text-green-600 dark:text-green-400 mt-2`}>
                      +{((calculation.bonusMultiplier - 1) * 100).toFixed(0)}% de bônus por nível!
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Nível Atual */}
          <Card>
            <CardHeader>
              <CardTitle className={`${colors.text.title} flex items-center gap-2`}>
                <currentTier.icon className="h-5 w-5" />
                Seu Nível: {currentTier.level}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${currentTier.color}`}>
                    {(currentTier.rate * 100).toFixed(1)}%
                  </div>
                  <p className={`text-sm ${colors.text.subtitle}`}>Taxa de Comissão</p>
                </div>
                
                {currentTier.bonus > 0 && (
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${colors.text.success}`}>
                      +{(currentTier.bonus * 100).toFixed(0)}%
                    </div>
                    <p className={`text-sm ${colors.text.subtitle}`}>Bônus por Nível</p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={colors.text.subtitle}>Negócios para Senior:</span>
                    <span className={colors.text.title}>5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={colors.text.subtitle}>Negócios para Expert:</span>
                    <span className={colors.text.title}>15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={colors.text.subtitle}>Negócios para Master:</span>
                    <span className={colors.text.title}>30</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próxima Meta */}
          {nextGoal && (
            <Card>
              <CardHeader>
                <CardTitle className={`${colors.text.title} flex items-center gap-2`}>
                  <Target className="h-5 w-5" />
                  Próxima Meta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className={`p-4 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20`}>
                    <nextGoal.icon className={`h-8 w-8 mx-auto ${nextGoal.color}`} />
                  </div>
                  <div>
                    <p className={`font-bold ${colors.text.title}`}>{nextGoal.level}</p>
                    <p className={`text-sm ${colors.text.subtitle}`}>
                      {nextGoal.minDeals} negócios fechados
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={colors.text.subtitle}>Nova taxa:</span>
                      <span className={`font-bold text-green-600 dark:text-green-400`}>
                        {(nextGoal.rate * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={colors.text.subtitle}>Bônus:</span>
                      <span className={`font-bold ${colors.text.success}`}>
                        +{(nextGoal.bonus * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Alcançar Meta
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dicas */}
          <Card>
            <CardHeader>
              <CardTitle className={`${colors.text.title} flex items-center gap-2`}>
                <Info className="h-5 w-5" />
                Dicas de Ouro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className={`h-4 w-4 ${colors.icons.success} mt-0.5 flex-shrink-0`} />
                  <p className={colors.text.subtitle}>
                    Foque em negócios de alto valor para maximizar comissões
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className={`h-4 w-4 ${colors.icons.success} mt-0.5 flex-shrink-0`} />
                  <p className={colors.text.subtitle}>
                    Mantenha uma taxa de conversão alta para alcançar metas
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className={`h-4 w-4 ${colors.icons.success} mt-0.5 flex-shrink-0`} />
                  <p className={colors.text.subtitle}>
                    Use a calculadora para definir metas realistas
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className={`h-4 w-4 ${colors.icons.success} mt-0.5 flex-shrink-0`} />
                  <p className={colors.text.subtitle}>
                    Acompanhe seu progresso mensalmente
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Histórico de Cálculos */}
      {calculationHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className={colors.text.title}>
              Histórico de Cálculos ({calculationHistory.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {calculationHistory.map((calc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${colors.iconBg.money}`}>
                      <DollarSign className={`h-4 w-4 ${colors.icons.money}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${colors.text.title}`}>
                        {formatCurrency(calc.propertyValue)} • {calc.dealType === 'sale' ? 'Venda' : 'Locação'}
                      </p>
                      <p className={`text-sm ${colors.text.subtitle}`}>
                        {calc.agentLevel} • {(calc.commissionRate * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-green-600 dark:text-green-400`}>
                      {formatCurrency(calc.finalCommission)}
                    </p>
                    <p className={`text-xs ${colors.text.subtitle}`}>
                      {calc.bonusMultiplier > 1 ? `+${((calc.bonusMultiplier - 1) * 100).toFixed(0)}% bônus` : 'Sem bônus'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de Confirmação */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Cálculo Salvo!"
      >
        <div className="space-y-4">
          <div className="text-center">
            <CheckCircle className={`h-12 w-12 ${colors.icons.success} mx-auto mb-4`} />
            <p className={`text-lg font-medium ${colors.text.title}`}>
              Cálculo salvo com sucesso!
            </p>
            <p className={`text-sm ${colors.text.subtitle}`}>
              Você pode acompanhar seu histórico de simulações abaixo.
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className={`text-sm ${colors.text.subtitle}`}>Comissão calculada:</p>
            <p className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
              {formatCurrency(calculation.finalCommission)}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
