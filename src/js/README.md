# 📂 Módulos JavaScript - GoalWallet

Esta pasta contém os módulos JavaScript do sistema GoalWallet.

## 📄 Arquivos

### `utils.js` - Funções Utilitárias
Funções auxiliares para validação, formatação e operações comuns.

**Principais funções:**
- `generateId()` - Gera IDs únicos
- `validateEmail(email)` - Valida formato de email
- `validateCPF(cpf)` - Valida CPF (com dígitos verificadores)
- `validateSenha(senha)` - Valida senha (mínimo 6 caracteres)
- `formatCPF(cpf)` - Formata CPF (000.000.000-00)
- `hashSenha(senha)` - Hash simples de senha (apenas para demo)
- `showToast(message, type)` - Exibe notificações toast
- `sanitizeString(str)` - Previne XSS básico

### `auth.js` - Sistema de Autenticação
Gerencia autenticação de usuários usando localStorage.

**Principais funções:**
- `Auth.registrar(userData)` - Registra novo usuário
- `Auth.login(email, senha)` - Faz login
- `Auth.logout()` - Faz logout e redireciona
- `Auth.isAuthenticated()` - Verifica se há sessão ativa
- `Auth.getSession()` - Obtém dados da sessão
- `Auth.getCurrentUser()` - Obtém usuário logado
- `Auth.updateUser(userId, updates)` - Atualiza dados do usuário

**Estrutura de dados:**
```javascript
// Usuário
{
  id: "uuid",
  nome: "string",
  email: "string",
  cpf: "string",
  senha: "hash",
  dataCriacao: "timestamp"
}

// Sessão
{
  usuarioId: "uuid",
  email: "string",
  nome: "string",
  dataLogin: "timestamp"
}
```

### `route-guard.js` - Proteção de Rotas
Middleware para proteger páginas que requerem autenticação.

**Principais funções:**
- `RouteGuard.protect()` - Protege página atual
- `RouteGuard.redirectIfAuthenticated()` - Redireciona se já logado
- `RouteGuard.init()` - Inicializa proteção automática

**Páginas públicas (sem autenticação):**
- `index.html` (Login)
- `cadastro.html` (Cadastro)

**Páginas protegidas (requerem autenticação):**
- Todas as outras páginas

## 🔒 Segurança

**IMPORTANTE:** Esta implementação é para fins **educacionais** e usa localStorage.

### Limitações de Segurança:
1. ⚠️ **Hash de senha é simplificado** - Em produção, usar bcrypt no backend
2. ⚠️ **Dados em localStorage** - Acessíveis via JavaScript do navegador
3. ⚠️ **Sem HTTPS obrigatório** - Em produção, sempre usar HTTPS
4. ⚠️ **Sem rate limiting** - Vulnerável a tentativas de força bruta
5. ⚠️ **Sem tokens JWT** - Sessão pode ser facilmente manipulada

### Para Produção:
- ✅ Implementar backend com Node.js/PHP/Python
- ✅ Usar banco de dados (PostgreSQL, MySQL, MongoDB)
- ✅ Hash de senha com bcrypt/argon2
- ✅ Autenticação com JWT ou sessions server-side
- ✅ HTTPS obrigatório
- ✅ Rate limiting e proteção contra brute force
- ✅ Validação server-side
- ✅ CORS configurado corretamente

## 📖 Como Usar

### 1. Incluir scripts na página
```html
<script src="js/utils.js"></script>
<script src="js/auth.js"></script>
<script src="js/route-guard.js"></script>
```

### 2. Proteger uma página
```javascript
// No início do script
RouteGuard.protect();
```

### 3. Fazer login
```javascript
const result = Auth.login(email, senha);
if (result.success) {
  window.location.href = 'dashboard.html';
} else {
  Utils.showToast(result.message, 'error');
}
```

### 4. Registrar usuário
```javascript
const result = Auth.registrar({
  nome: 'João Silva',
  email: 'joao@email.com',
  cpf: '123.456.789-00',
  senha: 'senha123'
});
```

### 5. Obter usuário logado
```javascript
const user = Auth.getCurrentUser();
console.log(user.nome); // Nome do usuário
```

### 6. Fazer logout
```javascript
Auth.logout(); // Redireciona para login
```

## 🧪 Desenvolvimento

### Limpar todos os dados (desenvolvimento)
```javascript
Auth.clearAllData(); // Apaga tudo do localStorage
```

### Verificar dados no console
```javascript
console.log(localStorage.getItem('goalwallet_users'));
console.log(localStorage.getItem('goalwallet_session'));
```

## 🐛 Debug

### Ativar logs detalhados
Abra o console do navegador (F12) e verifique mensagens de erro.

### Problemas comuns:

**1. "Erro ao fazer login"**
- Verificar se email e senha estão corretos
- Verificar se usuário foi registrado
- Abrir console e verificar erros

**2. "Redirecionando para login constantemente"**
- Verificar se scripts estão carregados na ordem correta
- Verificar se há erros no console
- Limpar localStorage e tentar novamente

**3. "Validação de CPF falhando"**
- CPF deve ter 11 dígitos
- Usar CPF válido com dígitos verificadores corretos
- Teste com: 111.444.777-35 (válido para testes)

## 📝 Próximos Passos (Fases 2-6)

- [ ] Módulo de contas (`accounts.js`)
- [ ] Módulo de transações (`transactions.js`)
- [ ] Módulo de categorias (`categories.js`)
- [ ] Máscaras de input (`masks.js`)
- [ ] Validadores adicionais (`validators.js`)
- [ ] Projeções de saldo (`projections.js`)

---

**Desenvolvido para:** Projeto PMV-SI-2025-2-PE1-T5  
**Data:** Novembro 2025  
**Fase:** 1 - Autenticação e Navegação ✅
