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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 truncate">Configurações</h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Gerencie suas configurações pessoais e do sistema</p>
        </div>
        <Button onClick={handleSave} loading={isLoading} disabled={isLoading} className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <Save className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Salvar Alterações</span>
          <span className="sm:hidden">Salvar</span>
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
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
          <TabsTrigger value="profile" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
            <span className="hidden sm:inline">Perfil</span>
            <span className="sm:hidden">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
            <span className="hidden sm:inline">Segurança</span>
            <span className="sm:hidden">Seg.</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
            <span className="hidden sm:inline">Notificações</span>
            <span className="sm:hidden">Notif.</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Palette className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
            <span className="hidden sm:inline">Aparência</span>
            <span className="sm:hidden">Apar.</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Database className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
            <span className="hidden sm:inline">Dados</span>
            <span className="sm:hidden">Dados</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-3 sm:space-y-4 md:space-y-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input label="Nome Completo" placeholder="Seu nome completo" className="text-xs sm:text-sm" />
                <Input label="Email" type="email" placeholder="seu@email.com" className="text-xs sm:text-sm" />
                <Input label="Telefone" placeholder="(11) 99999-9999" className="text-xs sm:text-sm" />
                <Input label="CPF" placeholder="000.000.000-00" className="text-xs sm:text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <Input label="CEP" placeholder="00000-000" className="text-xs sm:text-sm" />
                <Input label="Cidade" placeholder="Sua cidade" className="text-xs sm:text-sm" />
                <Input label="Estado" placeholder="Seu estado" className="text-xs sm:text-sm" />
              </div>
              <Input label="Endereço Completo" placeholder="Rua, número, complemento" className="text-xs sm:text-sm" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Informações Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input label="Cargo" placeholder="Seu cargo atual" className="text-xs sm:text-sm" />
                <Input label="Departamento" placeholder="Seu departamento" className="text-xs sm:text-sm" />
              </div>
              <Input label="Biografia" placeholder="Uma breve descrição sobre você" className="text-xs sm:text-sm" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-3 sm:space-y-4 md:space-y-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Alterar Senha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <Input label="Senha Atual" type="password" placeholder="Digite sua senha atual" className="text-xs sm:text-sm" />
              <Input label="Nova Senha" type="password" placeholder="Digite a nova senha" className="text-xs sm:text-sm" />
              <Input label="Confirmar Nova Senha" type="password" placeholder="Confirme a nova senha" className="text-xs sm:text-sm" />
              <Button variant="outline" className="text-xs sm:text-sm">Alterar Senha</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Autenticação de Dois Fatores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Autenticação de Dois Fatores</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Adicione uma camada extra de segurança à sua conta</p>
                </div>
                <Checkbox label="" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Sessões Ativas</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Chrome - Windows</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Último acesso: há 2 horas</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-shrink-0">Encerrar</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Safari - iPhone</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Último acesso: há 1 dia</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-shrink-0">Encerrar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-3 sm:space-y-4 md:space-y-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Novos Leads</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Receber notificações quando novos leads forem criados</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Atualizações de Propriedades</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Receber notificações sobre mudanças nas propriedades</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Comissões</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Receber notificações sobre comissões disponíveis</p>
                  </div>
                  <Checkbox label="" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Relatórios</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Receber notificações sobre relatórios disponíveis</p>
                  </div>
                  <Checkbox label="" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Canais de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Email</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Receber notificações por email</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Push Notifications</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Receber notificações push no navegador</p>
                  </div>
                  <Checkbox label="" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">SMS</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Receber notificações por SMS</p>
                  </div>
                  <Checkbox label="" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-3 sm:space-y-4 md:space-y-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Tema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">Tema do Sistema</label>
                <select 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
                  value={theme}
                  onChange={(e) => handleThemeChange(e.target.value)}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">Tamanho da Fonte</label>
                <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                  <option value="small">Pequeno</option>
                  <option value="medium">Médio</option>
                  <option value="large">Grande</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Mostrar Gráficos</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Exibir gráficos no dashboard</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Mostrar Atividades Recentes</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Exibir atividades recentes no dashboard</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100">Mostrar Alertas</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Exibir alertas no dashboard</p>
                  </div>
                  <Checkbox label="" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data" className="space-y-3 sm:space-y-4 md:space-y-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Exportar Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Exporte seus dados pessoais e do sistema em diferentes formatos.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleExport} loading={isLoading} disabled={isLoading} className="text-xs sm:text-sm">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Exportar Excel</span>
                  <span className="sm:hidden">Excel</span>
                </Button>
                <Button onClick={handleExport} loading={isLoading} disabled={isLoading} className="text-xs sm:text-sm">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Exportar PDF</span>
                  <span className="sm:hidden">PDF</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Importar Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Importe dados de outros sistemas ou arquivos.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleImport} loading={isLoading} disabled={isLoading} className="text-xs sm:text-sm">
                  <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Importar Excel</span>
                  <span className="sm:hidden">Excel</span>
                </Button>
                <Button onClick={handleImport} loading={isLoading} disabled={isLoading} className="text-xs sm:text-sm">
                  <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Importar CSV</span>
                  <span className="sm:hidden">CSV</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Limpar Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Limpe dados desnecessários ou obsoletos do sistema.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="text-xs sm:text-sm">
                  <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Limpar Cache</span>
                  <span className="sm:hidden">Cache</span>
                </Button>
                <Button variant="destructive" className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">Limpar Dados Temporários</span>
                  <span className="sm:hidden">Limpar</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
