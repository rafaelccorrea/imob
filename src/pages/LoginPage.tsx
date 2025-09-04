import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Info, User, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../stores';
import { mockUsers } from '../utils/mockData';
import { Button, Input, Alert, Modal } from '../components/ui';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-neutral-50 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-secondary-100/20"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-200/30 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src={logo} 
                alt="União Imobiliária" 
                className="h-20 w-auto drop-shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-secondary-900 mb-2">Sistema de Gestão</h1>
          <p className="text-secondary-600">Acesse sua conta para continuar</p>
        </div>

        {/* Login Card */}
        <div className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl rounded-lg p-8">
          <div className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-secondary-900 mb-2">Entrar no Sistema</h2>
            <p className="text-secondary-600 text-sm">
              Digite suas credenciais para acessar sua conta
            </p>
          </div>

          <div className="space-y-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Input
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  error={errors.email?.message}
                  className="h-12"
                  {...register('email')}
                />
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Input
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    error={errors.password?.message}
                    className="h-12 pr-12"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-secondary-400 hover:text-secondary-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar no Sistema'}
              </Button>
            </form>

            <div className="flex items-center justify-between pt-4 border-t">
              <button className="text-sm text-secondary-600 hover:text-primary-600 transition-colors">
                Esqueceu sua senha?
              </button>
              <button 
                onClick={() => setShowCredentials(true)}
                className="flex items-center space-x-1 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <Info className="h-4 w-4" />
                <span>Credenciais de Teste</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-secondary-500">
            © 2024 União Imobiliária. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Credentials Modal */}
      <Modal
        isOpen={showCredentials}
        onClose={() => setShowCredentials(false)}
        title="Credenciais de Demonstração"
      >
        <div className="space-y-4">
          <div className="bg-primary-50 p-4 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-2">Usuário Administrador</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Email:</strong> admin@imob.com</p>
              <p><strong>Senha:</strong> 123456</p>
            </div>
          </div>
          
          <div className="bg-secondary-50 p-4 rounded-lg">
            <h3 className="font-medium text-secondary-900 mb-2">Outros Usuários</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Gestor:</strong> manager@imob.com / 123456</p>
              <p><strong>Corretor:</strong> agent@imob.com / 123456</p>
              <p><strong>Financeiro:</strong> financial@imob.com / 123456</p>
              <p><strong>RH:</strong> hr@imob.com / 123456</p>
            </div>
          </div>

          <div className="bg-warning-50 p-4 rounded-lg">
            <p className="text-sm text-warning-800">
              <strong>Nota:</strong> Este é um sistema de demonstração. Use qualquer uma das credenciais acima para testar as diferentes funcionalidades.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
