# 🏠 ImobSystem - Sistema de Gestão Imobiliária

Um sistema completo de gestão imobiliária desenvolvido com React, TypeScript e Vite.

## 🚀 Deploy na Vercel

### Pré-requisitos
- Node.js 20.19+ ou 22.12+
- Conta na Vercel

### Passos para Deploy

1. **Fork/Clone o repositório**
   ```bash
   git clone https://github.com/rafaelccorrea/imob.git
   cd imob
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Build local (opcional)**
   ```bash
   npm run build
   ```

4. **Deploy na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte sua conta GitHub
   - Importe o repositório `imob`
   - Configure:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

### ⚙️ Configurações da Vercel

O projeto já inclui um arquivo `vercel.json` com as configurações otimizadas:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 🔧 Variáveis de Ambiente (Opcional)

Se necessário, adicione no painel da Vercel:

```env
VITE_API_URL=https://sua-api.com/api
VITE_APP_NAME=ImobSystem
```

### 📱 Funcionalidades

- ✅ **Dashboard Executivo** - Visão geral com KPIs
- ✅ **Gestão de Imóveis** - Cadastro e listagem
- ✅ **CRM/Leads** - Funil de vendas
- ✅ **Vendas & Locações** - Controle de negociações
- ✅ **Financeiro** - Controle financeiro e comissões
- ✅ **RH/Colaboradores** - Gestão de equipe
- ✅ **Usuários & Perfis** - Controle de acesso
- ✅ **Calculadora de Financiamento** - Simulação de financiamentos
- ✅ **Sistema de Apresentações** - Criação de apresentações
- ✅ **Gestão de Equipes** - Controle de equipes

### 👥 Perfis de Usuário

- **Admin** - Acesso completo a todas as funcionalidades
- **Owner** - Acesso completo e relatórios executivos
- **Manager** - Gestão de equipe e propriedades
- **Agent** - Portfolio de imóveis e CRM
- **Financial** - Controle de receitas e despesas
- **HR** - Gestão de colaboradores

### 🎯 Credenciais de Teste

**Admin:**
- Email: `admin@imob.com`
- Senha: `123456`

**Owner:**
- Email: `owner@imob.com`
- Senha: `123456`

**Manager:**
- Email: `manager@imob.com`
- Senha: `123456`

**Agent:**
- Email: `agent@imob.com`
- Senha: `123456`

### 🛠️ Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **React Router** - Roteamento
- **Zustand** - Estado global
- **Recharts** - Gráficos
- **Lucide React** - Ícones

### 📊 Status do Projeto

✅ **Pronto para Produção**
- Build funcionando
- Configuração da Vercel otimizada
- Todas as funcionalidades implementadas
- Dados mock para demonstração

### 🚀 Deploy Automático

Após conectar o repositório na Vercel, cada push para a branch `master` irá gerar um deploy automático.

### 📞 Suporte

Para suporte ou dúvidas sobre o deploy, abra uma issue no GitHub.
