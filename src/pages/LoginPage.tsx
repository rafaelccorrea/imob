import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Info, User, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../stores';
import { mockUsers } from '../utils/mockData';
import { Button, Alert } from '../components/ui';
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
          role: mockUser.role as 'admin' | 'owner' | 'manager' | 'agent' | 'financial' | 'hr',
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

  const handleQuickLogin = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    setShowCredentials(false);

    try {
      // Simulação de login com dados mock
      const mockUser = mockUsers.find(u => u.email === email);
      if (mockUser && password === '123456') {
        // Converter o mockUser para o tipo User esperado
        const user = {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role as 'admin' | 'owner' | 'manager' | 'agent' | 'financial' | 'hr',
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
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, rgba(183, 59, 38, 0.8) 0%, rgba(166, 56, 31, 0.8) 100%), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80") center/cover'
      }}>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white w-full px-8">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="bg-black/30 rounded-lg p-4 mb-8 inline-block">
                <img 
                  src={logo} 
                  alt="União Imobiliária" 
                  className="h-24 w-auto mx-auto drop-shadow-lg"
                />
              </div>
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
              className="h-20 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">Sistema de Gestão</h1>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, #B73B26 0%, #A6381F 100%)' }}>
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
                  className="w-full h-14 px-4 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:border-gray-400"
                  style={{ '--tw-ring-color': '#B73B26' } as React.CSSProperties}
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
                    className="w-full h-14 px-4 pr-12 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:border-gray-400"
                    style={{ '--tw-ring-color': '#B73B26' } as React.CSSProperties}
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
                className="w-full h-14 text-base font-semibold text-white"
                style={{ 
                  background: 'linear-gradient(90deg, #B73B26 0%, #A6381F 100%)',
                  '--tw-ring-color': '#B73B26'
                } as React.CSSProperties}
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar no Sistema'}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button className="text-sm text-gray-600 transition-colors" style={{ '--hover-color': '#B73B26' } as React.CSSProperties}>
                  Esqueceu sua senha?
                </button>
                <button 
                  onClick={() => setShowCredentials(true)}
                  className="flex items-center space-x-1 text-sm text-gray-600 transition-colors"
                  style={{ '--hover-color': '#A6A597' } as React.CSSProperties}
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
      <div className={`fixed inset-0 z-50 flex items-center justify-center ${showCredentials ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setShowCredentials(false)} />
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3" style={{ background: 'linear-gradient(135deg, #B73B26 0%, #A6381F 100%)' }}>
                <Info className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Credenciais de Teste</h2>
              <p className="text-sm text-gray-600">Clique para fazer login automaticamente</p>
            </div>

            {/* Users List */}
            <div className="space-y-3">
              {/* Admin */}
              <button
                onClick={() => handleQuickLogin('admin@imob.com', '123456')}
                className="w-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3 hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-blue-900">Administrador</h4>
                    <p className="text-xs text-blue-700">admin@imob.com</p>
                  </div>
                  <div className="text-blue-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Manager */}
              <button
                onClick={() => handleQuickLogin('manager@imob.com', '123456')}
                className="w-full bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-3 hover:from-purple-100 hover:to-purple-200 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-purple-900">Gestor</h4>
                    <p className="text-xs text-purple-700">manager@imob.com</p>
                  </div>
                  <div className="text-purple-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Agent */}
              <button
                onClick={() => handleQuickLogin('agent@imob.com', '123456')}
                className="w-full bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-3 hover:from-green-100 hover:to-green-200 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-green-900">Corretor</h4>
                    <p className="text-xs text-green-700">agent@imob.com</p>
                  </div>
                  <div className="text-green-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Financial */}
              <button
                onClick={() => handleQuickLogin('financial@imob.com', '123456')}
                className="w-full bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-3 hover:from-yellow-100 hover:to-yellow-200 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-yellow-900">Financeiro</h4>
                    <p className="text-xs text-yellow-700">financial@imob.com</p>
                  </div>
                  <div className="text-yellow-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* HR */}
              <button
                onClick={() => handleQuickLogin('hr@imob.com', '123456')}
                className="w-full bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 rounded-lg p-3 hover:from-pink-100 hover:to-pink-200 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-pink-900">RH</h4>
                    <p className="text-xs text-pink-700">hr@imob.com</p>
                  </div>
                  <div className="text-pink-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            {/* Close Button */}
            <div className="flex justify-center mt-6 pt-4 border-t border-gray-200">
              <Button 
                variant="outline"
                onClick={() => setShowCredentials(false)}
                className="px-6"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
