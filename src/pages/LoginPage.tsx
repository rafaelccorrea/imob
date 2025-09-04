import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Info, User, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../stores';
import { mockUsers } from '../utils/mockData';
import { Button, Alert, Modal } from '../components/ui';
import logo from '../assets/uniao-imobiliaria-logo.png';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');

    try {
      // Simulação de login com dados mock
      const mockUser = mockUsers.find(u => u.email === data.email);
      if (mockUser && data.password === '123456') {
        // Converter o mockUser para o tipo User esperado
        const user = {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role as 'owner' | 'manager' | 'agent' | 'financial' | 'hr',
        };
        login(user, 'mock-token-123');
        navigate('/dashboard');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding Section (60%) */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-gradient-to-br from-purple-500 to-blue-600">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-700/30"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white w-full px-8">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <img 
                src={logo} 
                alt="União Imobiliária" 
                className="h-20 w-auto mx-auto mb-8 drop-shadow-lg"
              />
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Sparkles className="h-6 w-6 text-yellow-300" />
                <h1 className="text-4xl font-bold">Sistema de Gestão</h1>
                <Sparkles className="h-6 w-6 text-yellow-300" />
              </div>
            </div>
            <h2 className="text-3xl font-semibold mb-6">Bem-vindo de volta!</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Acesse sua conta para gerenciar imóveis, clientes e transações de forma eficiente e organizada.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form (40%) */}
      <div className="flex-1 lg:w-2/5 flex items-center justify-center px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img 
              src={logo} 
              alt="União Imobiliária" 
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">Sistema de Gestão</h1>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
                <User className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Entrar no Sistema</h2>
              <p className="text-gray-600">
                Digite suas credenciais para acessar sua conta
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full h-14 px-4 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full h-14 px-4 pr-12 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar no Sistema'}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Esqueceu sua senha?
                </button>
                <button 
                  onClick={() => setShowCredentials(true)}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Info className="h-4 w-4" />
                  <span>Credenciais de Teste</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              © 2024 União Imobiliária. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Credentials Modal */}
      <Modal
        isOpen={showCredentials}
        onClose={() => setShowCredentials(false)}
        title="Credenciais de Demonstração"
      >
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-blue-900 mb-2">Usuário Administrador</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Email:</strong> admin@imob.com</p>
              <p><strong>Senha:</strong> 123456</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-purple-900 mb-2">Outros Usuários</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Gestor:</strong> manager@imob.com / 123456</p>
              <p><strong>Corretor:</strong> agent@imob.com / 123456</p>
              <p><strong>Financeiro:</strong> financial@imob.com / 123456</p>
              <p><strong>RH:</strong> hr@imob.com / 123456</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-black">
              <strong>Nota:</strong> Este é um sistema de demonstração. Use qualquer uma das credenciais acima para testar as diferentes funcionalidades.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
