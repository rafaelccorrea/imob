# 🏠 ImobSystem - Sistema de Gestão Imobiliária

Um sistema completo de gestão imobiliária desenvolvido com React, TypeScript e Vite, focado em fornecer uma solução robusta e moderna para imobiliárias.

## ✨ Características Principais

### 🎯 Módulos do Sistema
- **Dashboard Executivo** - Visão geral com KPIs e métricas
- **Gestão de Imóveis** - Cadastro, listagem e gestão de propriedades
- **Gestão de Leads/CRM** - Funil de vendas e gestão de clientes
- **Gestão de Vendas & Locações** - Controle de negociações e contratos
- **Financeiro** - Controle financeiro e comissões
- **RH/Colaboradores** - Gestão de equipe e performance
- **Usuários & Perfis** - Controle de acesso e permissões
- **Configurações** - Personalização do sistema

### 👥 Perfis de Usuário
- **Dono** - Acesso completo e relatórios executivos
- **Gestor** - Gestão de equipe e propriedades
- **Corretor** - Portfolio de imóveis e CRM simplificado
- **Financeiro** - Controle de receitas e despesas
- **RH** - Gestão de colaboradores

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilização
- **Shadcn/UI** - Componentes UI
- **React Router DOM** - Roteamento
- **Zustand** - Gerenciamento de estado
- **React Hook Form** - Formulários
- **Zod** - Validação de schemas
- **TanStack Query** - Data fetching
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones
- **Axios** - Cliente HTTP

### Utilitários
- **date-fns** - Manipulação de datas
- **clsx** - Combinação de classes CSS
- **tailwind-merge** - Merge de classes Tailwind

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/           # Componentes base (Button, Input, etc.)
│   └── layout/       # Layout principal (Sidebar, Header)
├── pages/           # Páginas da aplicação
├── stores/          # Estado global (Zustand)
├── services/        # Serviços de API
├── hooks/           # Custom hooks
├── utils/           # Utilitários (formatação, validação)
├── types/           # Definições de tipos TypeScript
└── assets/          # Recursos estáticos
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20.19+ ou 22.12+
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd imob

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Linting
npm run type-check   # Verificação de tipos
```

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=ImobSystem
```

### Configuração do Tailwind
O projeto já está configurado com Tailwind CSS e inclui:
- Design system personalizado
- Componentes responsivos
- Tema claro/escuro (preparado)

## 📱 Funcionalidades por Página

### Dashboard
- Métricas em tempo real
- Gráficos de vendas
- Atividades recentes
- Alertas do sistema

### Imóveis
- Listagem com filtros avançados
- Cadastro completo de propriedades
- Upload de imagens
- Histórico de visitas

### Leads/CRM
- Funil de vendas (Kanban)
- Integração WhatsApp
- Atribuição de leads
- Histórico de contatos

### Vendas & Locações
- Controle de propostas
- Status de negociações
- Upload de documentos
- Geração de contratos

### Financeiro
- Controle de receitas/despesas
- Comissões automáticas
- Fluxo de caixa
- Relatórios contábeis

### RH
- Cadastro de colaboradores
- Avaliações de performance
- Gestão de documentos
- Controle de contratos

### Usuários
- Gestão de perfis
- Controle de permissões
- Histórico de atividades
- Configurações de acesso

### Configurações
- Perfil pessoal
- Segurança (2FA, sessões)
- Notificações
- Aparência
- Exportação/Importação

## 🎨 Design System

### Cores
- **Primary**: Azul corporativo
- **Secondary**: Cinza neutro
- **Success**: Verde
- **Warning**: Amarelo
- **Error**: Vermelho

### Componentes
- Botões com variantes (primary, secondary, outline, ghost, destructive)
- Inputs com validação
- Cards responsivos
- Modais e overlays
- Tabelas com paginação
- Gráficos interativos

## 🔐 Autenticação

O sistema utiliza JWT para autenticação com:
- Login/Logout
- Refresh tokens
- Proteção de rotas
- Controle de sessões

## 📊 Dados Mock

Para demonstração, o projeto inclui dados mock completos:
- Usuários com diferentes perfis
- Propriedades variadas
- Leads em diferentes estágios
- Transações financeiras
- Colaboradores

## 🚧 Status do Projeto

### ✅ Concluído
- [x] Estrutura base do projeto
- [x] Sistema de autenticação
- [x] Todas as páginas principais
- [x] Componentes UI completos
- [x] Navegação e roteamento
- [x] Estado global com Zustand
- [x] Formulários com validação
- [x] Gráficos e visualizações
- [x] Responsividade
- [x] Dados mock

### 🔄 Em Desenvolvimento
- [ ] Integração com backend real
- [ ] Upload de arquivos
- [ ] Notificações push
- [ ] Exportação PDF/Excel
- [ ] Tema escuro
- [ ] Testes automatizados

### 📋 Próximos Passos
- [ ] Backend API
- [ ] Banco de dados
- [ ] Deploy em produção
- [ ] Documentação da API
- [ ] Testes E2E

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@imobsystem.com ou abra uma issue no GitHub.

---

**Desenvolvido com ❤️ para o mercado imobiliário brasileiro**
