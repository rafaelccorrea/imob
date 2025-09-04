import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Database, 
  Save,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Alert,
  AlertTitle,
  AlertDescription,
  Checkbox
} from '../components/ui';
import { useThemeStore } from '../stores';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { theme, setTheme } = useThemeStore();

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
    setIsLoading(false);
  };

  const handleExport = async () => {
    setIsLoading(true);
    setMessage(null);
    
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setMessage({ type: 'success', text: 'Dados exportados com sucesso!' });
    setIsLoading(false);
  };

  const handleImport = async () => {
    setIsLoading(true);
    setMessage(null);
    
    // Simulate import
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setMessage({ type: 'success', text: 'Dados importados com sucesso!' });
    setIsLoading(false);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Configurações</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie suas configurações pessoais e do sistema</p>
        </div>
        <Button onClick={handleSave} loading={isLoading} disabled={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      {/* Alert */}
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertTitle>{message.type === 'error' ? 'Erro' : 'Sucesso'}</AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            Dados
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nome Completo" placeholder="Seu nome completo" />
                <Input label="Email" type="email" placeholder="seu@email.com" />
                <Input label="Telefone" placeholder="(11) 99999-9999" />
                <Input label="CPF" placeholder="000.000.000-00" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input label="CEP" placeholder="00000-000" />
                <Input label="Cidade" placeholder="Sua cidade" />
                <Input label="Estado" placeholder="Seu estado" />
              </div>
              <Input label="Endereço Completo" placeholder="Rua, número, complemento" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Cargo" placeholder="Seu cargo atual" />
                <Input label="Departamento" placeholder="Seu departamento" />
              </div>
              <Input label="Biografia" placeholder="Uma breve descrição sobre você" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Senha Atual" type="password" placeholder="Digite sua senha atual" />
              <Input label="Nova Senha" type="password" placeholder="Digite a nova senha" />
              <Input label="Confirmar Nova Senha" type="password" placeholder="Confirme a nova senha" />
              <Button variant="outline">Alterar Senha</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autenticação de Dois Fatores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Autenticação de Dois Fatores</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Adicione uma camada extra de segurança à sua conta</p>
                </div>
                <Checkbox label="" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sessões Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Chrome - Windows</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Último acesso: há 2 horas</p>
                  </div>
                  <Button variant="outline" size="sm">Encerrar</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Safari - iPhone</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Último acesso: há 1 dia</p>
                  </div>
                  <Button variant="outline" size="sm">Encerrar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Novos Leads</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receber notificações quando novos leads forem criados</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Atualizações de Propriedades</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receber notificações sobre mudanças nas propriedades</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Comissões</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receber notificações sobre comissões disponíveis</p>
                  </div>
                  <Checkbox label="" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Relatórios</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receber notificações sobre relatórios disponíveis</p>
                  </div>
                  <Checkbox label="" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Canais de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receber notificações por email</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Push Notifications</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receber notificações push no navegador</p>
                  </div>
                  <Checkbox label="" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">SMS</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receber notificações por SMS</p>
                  </div>
                  <Checkbox label="" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Tema do Sistema</label>
                <select 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  value={theme}
                  onChange={(e) => handleThemeChange(e.target.value)}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Tamanho da Fonte</label>
                <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <option value="small">Pequeno</option>
                  <option value="medium">Médio</option>
                  <option value="large">Grande</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Mostrar Gráficos</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Exibir gráficos no dashboard</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Mostrar Atividades Recentes</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Exibir atividades recentes no dashboard</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Mostrar Alertas</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Exibir alertas no dashboard</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exportar Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Exporte seus dados pessoais e do sistema em diferentes formatos.
              </p>
              <div className="flex gap-2">
                <Button onClick={handleExport} loading={isLoading} disabled={isLoading}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Excel
                </Button>
                <Button onClick={handleExport} loading={isLoading} disabled={isLoading}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Importar Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Importe dados de outros sistemas ou arquivos.
              </p>
              <div className="flex gap-2">
                <Button onClick={handleImport} loading={isLoading} disabled={isLoading}>
                  <Upload className="w-4 h-4 mr-2" />
                  Importar Excel
                </Button>
                <Button onClick={handleImport} loading={isLoading} disabled={isLoading}>
                  <Upload className="w-4 h-4 mr-2" />
                  Importar CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limpar Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Limpe dados desnecessários ou obsoletos do sistema.
              </p>
              <div className="flex gap-2">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Limpar Cache
                </Button>
                <Button variant="destructive">
                  Limpar Dados Temporários
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
