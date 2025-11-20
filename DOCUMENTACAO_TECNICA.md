# 🔧 GoalWallet - Documentação Técnica

## 📋 Índice
1. [Arquitetura do Sistema](#arquitetura)
2. [Estrutura de Diretórios](#estrutura)
3. [Módulos JavaScript](#módulos)
4. [Armazenamento de Dados](#dados)
5. [Fluxo de Autenticação](#autenticação)
6. [API de Módulos](#api)
7. [Padrões de Código](#padrões)
8. [Como Contribuir](#contribuir)

---

## 🏗️ Arquitetura do Sistema {#arquitetura}

### **Stack Tecnológico**
- **Frontend:** HTML5, CSS3, JavaScript ES6+ (Vanilla)
- **Armazenamento:** localStorage (Web Storage API)
- **Arquitetura:** MVC simplificado com módulos
- **Sem dependências externas** (sem frameworks/bibliotecas)

### **Padrão de Módulos**
```javascript
const ModuleName = {
  // Funções públicas
  publicMethod() { },
  
  // Dados privados (closure)
  _privateData: [],
  
  // Retorna objeto com API pública
};
```

---

## 📁 Estrutura de Diretórios {#estrutura}

```
src/
├── index.html              # Página de login
├── cadastro.html           # Página de cadastro
├── dashboard.html          # Dashboard principal
├── contas.html             # Gerenciamento de contas
├── historico.html          # Histórico de transações
├── configuracoes.html      # Configurações do usuário
├── suporte.html            # Página de suporte
├── css/
│   ├── style.css           # Estilos globais e dashboard
│   ├── historico.css       # Estilos do histórico
│   └── contas.css          # Estilos de contas
├── js/
│   ├── utils.js            # Funções utilitárias
│   ├── auth.js             # Autenticação e sessão
│   ├── route-guard.js      # Proteção de rotas
│   ├── accounts.js         # CRUD de contas
│   ├── transactions.js     # CRUD de transações
│   ├── categories.js       # Sistema de categorias
│   └── goals.js            # Sistema de metas
└── img/
    └── logo.png            # Logo da aplicação
```

---

## 📦 Módulos JavaScript {#módulos}

### **1. utils.js** - Funções Utilitárias

#### **Principais Funções:**

```javascript
Utils.generateId()
// Retorna: string
// Gera ID único baseado em timestamp + random

Utils.validateEmail(email)
// Retorna: boolean
// Valida formato de email com regex

Utils.validateCPF(cpf)
// Retorna: boolean
// Valida CPF com dígitos verificadores

Utils.validateSenha(senha)
// Retorna: { valida, fraca, mensagem }
// Valida senha (mínimo 6 caracteres)

Utils.getSenhaStrength(senha)
// Retorna: { nivel, texto, cor, progresso }
// Calcula força da senha (0-100)

Utils.showToast(mensagem, tipo)
// Exibe notificação toast
// tipo: 'success' | 'error' | 'info'

Utils.showLoading(mensagem)
// Exibe overlay de carregamento

Utils.hideLoading()
// Remove overlay de carregamento

Utils.showConfirm(mensagem, confirmarTexto, cancelarTexto)
// Retorna: Promise<boolean>
// Modal de confirmação customizado

Utils.sanitizeString(str)
// Retorna: string
// Escapa caracteres HTML (previne XSS)

Utils.setLocalStorage(key, value)
// Retorna: boolean
// Salva no localStorage com tratamento de erros

Utils.getLocalStorage(key, defaultValue)
// Retorna: any
// Recupera do localStorage com fallback

Utils.isLocalStorageAvailable()
// Retorna: boolean
// Verifica disponibilidade do localStorage
```

---

### **2. auth.js** - Autenticação

#### **Estrutura de Dados:**

```javascript
// Usuário
{
  id: "1234567890-1234",
  nome: "João Silva",
  email: "joao@email.com",
  cpf: "12345678901",
  senha: "hashedPassword",
  dataCriacao: "2024-01-01T10:00:00.000Z"
}

// Sessão
{
  usuarioId: "1234567890-1234",
  email: "joao@email.com",
  dataLogin: "2024-01-01T10:00:00.000Z"
}
```

#### **API Pública:**

```javascript
Auth.registrar({ nome, email, cpf, senha })
// Retorna: { success, message, user? }
// Cria novo usuário

Auth.login(email, senha)
// Retorna: { success, message, user? }
// Autentica usuário

Auth.logout()
// Remove sessão e redireciona para login

Auth.isAuthenticated()
// Retorna: boolean
// Verifica se há sessão ativa

Auth.getCurrentUser()
// Retorna: User | null
// Retorna usuário logado

Auth.getSession()
// Retorna: Session | null
// Retorna sessão ativa

Auth.atualizarPerfil(dados)
// Retorna: { success, message }
// Atualiza dados do usuário

Auth.alterarSenha(senhaAtual, novaSenha)
// Retorna: { success, message }
// Troca senha do usuário
```

---

### **3. route-guard.js** - Proteção de Rotas

#### **Uso:**

```javascript
// No topo de páginas protegidas
RouteGuard.protect();
// Redireciona para login se não autenticado

RouteGuard.redirectIfAuthenticated();
// Redireciona para dashboard se já logado
// Usar em index.html e cadastro.html
```

---

### **4. accounts.js** - Contas Bancárias

#### **Estrutura de Dados:**

```javascript
{
  id: "1234567890-1234",
  usuarioId: "user-id",
  nome: "Nubank",
  tipo: "corrente", // corrente | poupanca | investimento | carteira
  saldo: 1500.50,
  cor: "#8fffa5",
  dataCriacao: "2024-01-01T10:00:00.000Z"
}
```

#### **API Pública:**

```javascript
Accounts.criar({ nome, tipo, saldoInicial, cor })
// Retorna: { success, message, account? }

Accounts.atualizar(id, { nome, tipo, cor })
// Retorna: { success, message }

Accounts.excluir(id)
// Retorna: { success, message }

Accounts.getById(id)
// Retorna: Account | null

Accounts.getByUser()
// Retorna: Account[]

Accounts.getSaldoConsolidado()
// Retorna: number

Accounts.getEstatisticas()
// Retorna: { totalContas, saldoTotal, contaPositiva, contaNegativa }

Accounts.atualizarSaldo(accountId, novoSaldo)
// Atualiza saldo (usado por transações)

Accounts.formatarSaldo(valor)
// Retorna: string
// Formata número como moeda brasileira
```

---

### **5. transactions.js** - Transações

#### **Estrutura de Dados:**

```javascript
{
  id: "1234567890-1234",
  usuarioId: "user-id",
  contaId: "account-id",
  categoriaId: "category-id",
  tipo: "receita", // receita | despesa
  descricao: "Salário",
  valor: 5000.00,
  data: "2024-01-01",
  status: "pago", // pago | pendente
  dataCriacao: "2024-01-01T10:00:00.000Z"
}
```

#### **API Pública:**

```javascript
Transactions.criar({ contaId, categoriaId, tipo, descricao, valor, data, status })
// Retorna: { success, message, transaction? }
// Atualiza saldo da conta automaticamente

Transactions.atualizar(id, dados)
// Retorna: { success, message }
// Recalcula saldo se valor/conta/status mudou

Transactions.excluir(id)
// Retorna: { success, message }
// Reverte saldo da conta

Transactions.getById(id)
// Retorna: Transaction | null

Transactions.getByUser()
// Retorna: Transaction[]

Transactions.getByAccount(contaId)
// Retorna: Transaction[]

Transactions.getFiltered({ dataInicio, dataFim, tipo, categoriaId, contaId, status })
// Retorna: Transaction[]
// Todos os filtros são opcionais

Transactions.getEstatisticas(filtros)
// Retorna: { 
//   totalReceitas, totalDespesas, saldo,
//   quantidadeReceitas, quantidadeDespesas, quantidadeTotal
// }

Transactions.getPorCategoria(filtros)
// Retorna: [{ categoriaId, total, quantidade }]

Transactions.formatarValor(valor, mostrarSinal)
// Retorna: string
// Formata valor como moeda
```

---

### **6. categories.js** - Categorias

#### **Estrutura de Dados:**

```javascript
{
  id: "cat-receita-1",
  nome: "Salário",
  cor: "#8fffa5",
  icone: "💰",
  custom: false, // true para categorias do usuário
  usuarioId: null // só para custom = true
}
```

#### **Categorias Padrão:**
- **10 Receitas:** Salário, Freelance, Presente, Investimento, Prêmio, etc.
- **10 Despesas:** Alimentação, Transporte, Moradia, Contas, Lazer, etc.

#### **API Pública:**

```javascript
Categories.init()
// Inicializa categorias padrão (chamar no início)

Categories.getAll()
// Retorna: Category[]

Categories.getByType(tipo)
// Retorna: Category[]
// tipo: 'receita' | 'despesa'

Categories.criar(tipo, { nome, icone, cor })
// Retorna: { success, message, category? }
// Cria categoria personalizada

Categories.atualizar(id, dados)
// Retorna: { success, message }
// Só permite editar custom = true

Categories.excluir(id, tipo)
// Retorna: { success, message }
// Valida se não há transações usando

Categories.getEstatisticas(categoriaId)
// Retorna: { totalGasto, quantidadeTransacoes }
```

---

### **7. goals.js** - Metas Financeiras

#### **Estrutura de Dados:**

```javascript
{
  id: "1234567890-1234",
  usuarioId: "user-id",
  titulo: "Viagem Europa",
  descricao: "Férias em julho",
  valorMeta: 10000.00,
  valorAtual: 3500.00,
  tipo: "economia", // economia | reducao | investimento
  categoria: null, // opcional
  dataInicio: "2024-01-01",
  dataFim: "2024-12-31",
  status: "ativa", // ativa | concluida | cancelada
  cor: "#a5c9ff",
  dataCriacao: "2024-01-01T10:00:00.000Z"
}
```

#### **API Pública:**

```javascript
Goals.criar({ titulo, descricao, valorMeta, tipo, categoria, dataFim, cor })
// Retorna: { success, message, goal? }

Goals.atualizar(id, dados)
// Retorna: { success, message }

Goals.adicionarProgresso(id, valor)
// Adiciona ao valorAtual

Goals.excluir(id)
// Retorna: { success, message }

Goals.getById(id)
// Retorna: Goal | null

Goals.getByUser()
// Retorna: Goal[]

Goals.getProgresso(id)
// Retorna: number (0-100)
// Percentual de progresso

Goals.getDiasRestantes(id)
// Retorna: number
// Dias até dataFim

Goals.atualizarProgressoAutomatico(contaId, valor, tipo, data)
// Atualiza metas baseado em transações

Goals.formatarValor(valor)
// Retorna: string
// Formata como moeda
```

---

## 💾 Armazenamento de Dados {#dados}

### **localStorage Keys:**

```javascript
'goalwallet_users'       // Array<User>
'goalwallet_session'     // Session | null
'goalwallet_accounts'    // Array<Account>
'goalwallet_transactions' // Array<Transaction>
'goalwallet_categories'  // Array<Category>
'goalwallet_goals'       // Array<Goal>
```

### **Estrutura:**

```javascript
// Exemplo de leitura
const users = JSON.parse(localStorage.getItem('goalwallet_users')) || [];

// Exemplo de escrita
localStorage.setItem('goalwallet_users', JSON.stringify(users));

// Com tratamento de erros (RECOMENDADO)
const users = Utils.getLocalStorage('goalwallet_users', []);
Utils.setLocalStorage('goalwallet_users', users);
```

### **Limites:**
- **Tamanho:** ~5-10MB por domínio
- **Persistência:** Dados permanecem até serem explicitamente removidos
- **Sincronização:** Não sincroniza entre dispositivos
- **Privacidade:** Dados acessíveis por qualquer script no mesmo domínio

---

## 🔐 Fluxo de Autenticação {#autenticação}

### **1. Cadastro**

```
Usuário preenche formulário
  ↓
Validações client-side (Utils.validateEmail, validateCPF, validateSenha)
  ↓
Auth.registrar({ nome, email, cpf, senha })
  ↓
Verifica se email já existe
  ↓
Cria usuário com ID único
  ↓
Salva em localStorage
  ↓
Cria sessão automaticamente
  ↓
Redireciona para dashboard.html
```

### **2. Login**

```
Usuário digita email e senha
  ↓
Auth.login(email, senha)
  ↓
Busca usuário por email
  ↓
Compara senha (texto plano - NOTA: não usar em produção real)
  ↓
Cria sessão com usuarioId e email
  ↓
Salva sessão em localStorage
  ↓
Redireciona para dashboard.html
```

### **3. Proteção de Rotas**

```
Página carrega
  ↓
RouteGuard.protect() é executado
  ↓
Verifica Auth.isAuthenticated()
  ↓
Se NÃO autenticado: redireciona para index.html
Se autenticado: continua carregamento
```

### **4. Logout**

```
Usuário clica em "Sair"
  ↓
Utils.showConfirm("Deseja sair?")
  ↓
Se confirmar:
  ↓
Auth.logout()
  ↓
Remove sessão do localStorage
  ↓
Redireciona para index.html
```

---

## 📚 API de Módulos {#api}

### **Convenções de Retorno**

#### **Sucesso:**
```javascript
{
  success: true,
  message: "Operação realizada com sucesso",
  data: { /* objeto criado/atualizado */ }
}
```

#### **Erro:**
```javascript
{
  success: false,
  message: "Mensagem de erro descritiva"
}
```

### **Convenções de Nomes**

- **Funções públicas:** `camelCase`
- **Funções privadas:** `_camelCase` (com underscore)
- **Constantes:** `UPPER_SNAKE_CASE`
- **Módulos:** `PascalCase`

---

## 🎨 Padrões de Código {#padrões}

### **CSS**

#### **Variáveis CSS:**
```css
:root {
  --bg-start: #0d2b6b;
  --bg-end: #0f4aa8;
  --text: #eaf1ff;
  --muted: #9fb3d9;
  --card: #123a82;
  --primary: #58a6ff;
  --danger: #ff5a5f;
  --radius: 14px;
  --shadow: 0 10px 24px rgba(0,0,0,.25);
}
```

#### **Classes Utilitárias:**
```css
.container-center       /* Centraliza verticalmente */
.container-dashboard    /* Layout do dashboard */
.card                   /* Card com sombra */
.button                 /* Botão primário */
.button.outline         /* Botão outline */
.button.small           /* Botão menor */
.input                  /* Campo de input */
.field                  /* Container de campo */
.label                  /* Label de campo */
.alert                  /* Mensagem de alerta */
```

### **JavaScript**

#### **Estrutura de Módulo:**
```javascript
const ModuleName = {
  // Dados privados
  _data: [],
  _storageKey: 'key_name',

  // Função de inicialização
  init() {
    this._loadData();
  },

  // Funções privadas
  _loadData() {
    this._data = Utils.getLocalStorage(this._storageKey, []);
  },

  _saveData() {
    Utils.setLocalStorage(this._storageKey, this._data);
  },

  // Funções públicas (API)
  criar(dados) {
    // Validações
    if (!dados.campo) {
      return { success: false, message: 'Campo obrigatório' };
    }

    // Lógica
    const item = {
      id: Utils.generateId(),
      ...dados,
      dataCriacao: new Date().toISOString()
    };

    this._data.push(item);
    this._saveData();

    return { success: true, message: 'Criado com sucesso', data: item };
  },

  getAll() {
    return [...this._data]; // Retorna cópia
  }
};
```

### **HTML**

#### **Estrutura Semântica:**
```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Descrição da página" />
  <title>Título da Página</title>
</head>
<body>
  <main role="main" aria-labelledby="page-title">
    <h1 id="page-title">Título</h1>
    <!-- Conteúdo -->
  </main>
</body>
</html>
```

#### **Formulários Acessíveis:**
```html
<form aria-label="Descrição do formulário">
  <div class="field">
    <label for="campo-id">Nome do Campo</label>
    <input 
      type="text" 
      id="campo-id" 
      required 
      aria-required="true"
      aria-describedby="campo-feedback"
      autocomplete="name"
    />
    <div id="campo-feedback" role="alert" aria-live="polite"></div>
  </div>
</form>
```

---

## 🤝 Como Contribuir {#contribuir}

### **1. Setup do Projeto**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/goalwallet.git

# Abra no navegador
# Não precisa build ou instalação
# Apenas abra src/index.html
```

### **2. Estrutura de Branches**

```
main          # Produção (protegida)
develop       # Desenvolvimento
feature/xxx   # Novas funcionalidades
fix/xxx       # Correções de bugs
```

### **3. Commits**

Use mensagens descritivas:
```bash
git commit -m "feat: adiciona validação de CPF"
git commit -m "fix: corrige cálculo de saldo"
git commit -m "docs: atualiza README"
git commit -m "refactor: melhora performance dos filtros"
```

### **4. Pull Requests**

- Descreva as mudanças claramente
- Adicione screenshots se for UI
- Teste em múltiplos navegadores
- Atualize documentação se necessário

### **5. Code Review**

Verifique:
- ✅ Código segue padrões do projeto
- ✅ Funções têm JSDoc comentado
- ✅ Validações estão implementadas
- ✅ Tratamento de erros presente
- ✅ Sem console.log em produção
- ✅ Performance otimizada

---

## 🚀 Roadmap Futuro

### **Fase 7: Melhorias Avançadas**
- [ ] Importação de dados (CSV/JSON)
- [ ] Temas claro/escuro
- [ ] Multi-idioma (i18n)
- [ ] Gráficos com Chart.js
- [ ] PWA (Progressive Web App)
- [ ] Notificações de metas próximas
- [ ] Backup automático em nuvem
- [ ] Compartilhamento de relatórios

### **Fase 8: Mobile**
- [ ] App nativo (React Native)
- [ ] Sincronização cross-device
- [ ] Biometria (Touch ID / Face ID)

---

## 📞 Contato

Para dúvidas técnicas:
- Abra uma **Issue** no GitHub
- Acesse a página de **Suporte** no app
- Envie e-mail para suporte@goalwallet.com

---

**Desenvolvido com 💙 por estudantes para estudantes**
