# 🧪 GUIA DE TESTES - FASE 1
## Sistema de Autenticação - GoalWallet

Este documento guia você através dos testes da Fase 1 do projeto.

---

## ✅ PRÉ-REQUISITOS

1. **Navegador moderno** (Chrome, Firefox, Edge)
2. **Extensão Live Server** no VS Code (recomendado) ou servidor HTTP local
3. **Console do navegador aberto** (F12) para debug

---

## 🚀 COMO INICIAR

### Opção 1: Usando Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `src/index.html`
3. Selecione "Open with Live Server"
4. O navegador abrirá automaticamente

### Opção 2: Abrindo diretamente
1. Navegue até `src/index.html`
2. Abra com navegador (duplo clique)

**⚠️ ATENÇÃO:** Algumas funcionalidades podem não funcionar ao abrir direto do disco por questões de CORS. Prefira usar Live Server.

---

## 📋 ROTEIRO DE TESTES

### TESTE 1: Cadastro de Novo Usuário ✅

**Objetivo:** Verificar se o sistema registra novos usuários corretamente.

**Passos:**
1. Acesse a página inicial (`index.html`)
2. Clique em "Cadastre-se"
3. Preencha o formulário:
   - **Nome:** João da Silva
   - **Email:** joao@teste.com
   - **CPF:** 111.444.777-35 (ou use gerador de CPF válido)
   - **Senha:** teste123
4. Clique em "Criar Conta"

**Resultado Esperado:**
- ✅ Mensagem de sucesso aparece no topo da tela
- ✅ Após 1 segundo, redireciona para tela de login
- ✅ Sem erros no console

**Validações testadas:**
- ✅ Máscara de CPF aplicada automaticamente
- ✅ Validação de email
- ✅ Validação de CPF (dígitos verificadores)
- ✅ Senha com mínimo 6 caracteres

---

### TESTE 2: Validações do Cadastro ❌

**Objetivo:** Verificar se as validações impedem dados inválidos.

**Cenários de erro:**

#### 2.1 Email Inválido
- **Email:** teste@invalido (sem domínio completo)
- **Resultado:** Mensagem de erro "Email inválido"

#### 2.2 CPF Inválido
- **CPF:** 111.111.111-11 (todos dígitos iguais)
- **Resultado:** Mensagem de erro "CPF inválido"

#### 2.3 Senha Curta
- **Senha:** 123 (menos de 6 caracteres)
- **Resultado:** Mensagem de erro "Senha deve ter pelo menos 6 caracteres"

#### 2.4 Nome Curto
- **Nome:** Jo (menos de 3 caracteres)
- **Resultado:** Mensagem de erro "Nome deve ter pelo menos 3 caracteres"

#### 2.5 Email Duplicado
- Tente cadastrar novamente com **joao@teste.com**
- **Resultado:** Mensagem "Este email já está cadastrado"

---

### TESTE 3: Login com Sucesso ✅

**Objetivo:** Verificar autenticação funcional.

**Passos:**
1. Na tela de login (`index.html`)
2. Digite:
   - **Email:** joao@teste.com
   - **Senha:** teste123
3. Clique em "Entrar"

**Resultado Esperado:**
- ✅ Mensagem de sucesso
- ✅ Redireciona para `dashboard.html`
- ✅ Nome do usuário aparece no dashboard ("Olá, João!")
- ✅ Botão "Sair" visível no topo

---

### TESTE 4: Login com Credenciais Inválidas ❌

**Objetivo:** Verificar proteção contra acessos inválidos.

**Cenários:**

#### 4.1 Senha Incorreta
- **Email:** joao@teste.com
- **Senha:** senhaerrada
- **Resultado:** "Email ou senha incorretos"

#### 4.2 Email Não Cadastrado
- **Email:** inexistente@teste.com
- **Senha:** qualquer
- **Resultado:** "Email ou senha incorretos"

#### 4.3 Campos Vazios
- Deixar campos em branco
- **Resultado:** "Preencha todos os campos"

---

### TESTE 5: Proteção de Rotas 🔒

**Objetivo:** Verificar que páginas protegidas não são acessíveis sem login.

**Passos:**
1. Faça logout (se estiver logado)
2. Tente acessar diretamente as URLs:
   - `dashboard.html`
   - `contas.html`
   - `historico.html`
   - `configuracoes.html`

**Resultado Esperado:**
- ✅ Mensagem de erro aparece
- ✅ Redireciona automaticamente para `index.html`
- ✅ Não consegue acessar a página protegida

---

### TESTE 6: Navegação entre Páginas ✅

**Objetivo:** Verificar navegação funcional.

**Passos:**
1. Faça login
2. No dashboard, clique nos botões:
   - 💳 Contas → Abre `contas.html`
   - 📊 Histórico → Abre `historico.html`
   - ⚙️ Configurações → Abre `configuracoes.html`
   - 💬 Suporte → Abre `suporte.html`

**Resultado Esperado:**
- ✅ Todas as páginas abrem corretamente
- ✅ Nenhuma redireciona para login (usuário está autenticado)
- ✅ Botões e links funcionam

---

### TESTE 7: Logout Funcional ✅

**Objetivo:** Verificar que logout limpa sessão.

**Passos:**
1. Estando logado no dashboard
2. Clique no botão "Sair"
3. Confirme no popup

**Resultado Esperado:**
- ✅ Redireciona para `index.html`
- ✅ Sessão é limpa
- ✅ Tentar acessar `dashboard.html` redireciona para login

**Teste adicional:**
1. Faça logout
2. Clique no botão "Voltar" do navegador
3. **Resultado:** Deve redirecionar para login (sessão inválida)

---

### TESTE 8: Persistência de Dados 💾

**Objetivo:** Verificar que dados são salvos no localStorage.

**Passos:**
1. Cadastre um usuário
2. Faça login
3. **Feche o navegador completamente**
4. Abra novamente e acesse `dashboard.html`

**Resultado Esperado:**
- ✅ Ainda está logado (sessão persistiu)
- ✅ Nome do usuário aparece corretamente

**Teste de limpeza:**
1. Abra Console do Navegador (F12)
2. Digite: `localStorage.clear()`
3. Atualize a página
4. **Resultado:** Redireciona para login (dados apagados)

---

### TESTE 9: Redirecionamento Automático ✅

**Objetivo:** Verificar que usuário logado não acessa login/cadastro.

**Passos:**
1. Faça login normalmente
2. Digite na barra de endereço: `index.html`
3. Digite na barra de endereço: `cadastro.html`

**Resultado Esperado:**
- ✅ Em ambos os casos, redireciona para `dashboard.html`
- ✅ Não permite acessar login/cadastro quando logado

---

### TESTE 10: Múltiplos Navegadores 🌐

**Objetivo:** Verificar compatibilidade.

**Passos:**
1. Teste o fluxo completo (cadastro → login → navegação → logout) em:
   - ✅ Google Chrome
   - ✅ Mozilla Firefox
   - ✅ Microsoft Edge

**Resultado Esperado:**
- ✅ Funciona em todos os navegadores
- ✅ Sem diferenças de comportamento
- ✅ Sem erros no console

---

## 🐛 VERIFICAÇÃO DE ERROS NO CONSOLE

Abra o Console (F12 → Console) e verifique:

**✅ SEM ERROS:**
- Não deve haver mensagens de erro em vermelho
- Avisos (warnings) são aceitáveis

**❌ SE HOUVER ERROS:**
1. Anote o erro completo
2. Verifique se os arquivos JS estão carregando:
   ```javascript
   typeof Auth !== 'undefined'  // deve retornar true
   typeof Utils !== 'undefined' // deve retornar true
   typeof RouteGuard !== 'undefined' // deve retornar true
   ```

---

## 🔍 INSPEÇÃO DE DADOS (Console)

Para ver os dados armazenados:

```javascript
// Ver todos os usuários (sem senhas expostas via console direto)
console.log(localStorage.getItem('goalwallet_users'));

// Ver sessão atual
console.log(localStorage.getItem('goalwallet_session'));

// Ver usuário logado
console.log(Auth.getCurrentUser());

// Verificar se está autenticado
console.log(Auth.isAuthenticated()); // true ou false
```

---

## ✅ CHECKLIST DE VALIDAÇÃO FINAL

Marque cada item após testar:

### Funcionalidades Básicas
- [ ] Cadastro de novo usuário funciona
- [ ] Login com credenciais corretas funciona
- [ ] Logout funciona e limpa sessão
- [ ] Validações de email, CPF e senha funcionam
- [ ] Mensagens de erro aparecem corretamente

### Proteção e Segurança
- [ ] Páginas protegidas redirecionam se não autenticado
- [ ] Usuário logado não acessa login/cadastro
- [ ] Senha não aparece no localStorage (está hasheada)
- [ ] Dados persistem após fechar navegador

### Navegação
- [ ] Menu do dashboard funciona
- [ ] Botões de navegação funcionam
- [ ] Voltar/avançar do navegador não quebra fluxo
- [ ] Redirecionamentos acontecem corretamente

### Interface
- [ ] Nome do usuário aparece no dashboard
- [ ] Botão "Sair" aparece e funciona
- [ ] Mensagens toast (notificações) aparecem
- [ ] Máscara de CPF funciona no cadastro

### Compatibilidade
- [ ] Funciona no Chrome
- [ ] Funciona no Firefox
- [ ] Funciona no Edge
- [ ] Sem erros no console

---

## 🎯 CRITÉRIOS DE SUCESSO DA FASE 1

A Fase 1 está **COMPLETA** quando:

✅ **Usuário consegue:**
1. Criar uma conta
2. Fazer login
3. Acessar o dashboard
4. Navegar entre páginas protegidas
5. Fazer logout

✅ **Sistema possui:**
1. Validações funcionando
2. Proteção de rotas ativa
3. Persistência de dados
4. Redirecionamentos corretos

✅ **Sem bugs críticos:**
1. Nenhum erro no console
2. Todas as páginas carregam
3. Navegação fluida
4. Dados salvos corretamente

---

## 🚨 PROBLEMAS COMUNS E SOLUÇÕES

### Problema: "Uncaught ReferenceError: Auth is not defined"
**Solução:** Verificar se scripts estão na ordem correta:
```html
<script src="js/utils.js"></script>      <!-- 1º -->
<script src="js/auth.js"></script>       <!-- 2º -->
<script src="js/route-guard.js"></script> <!-- 3º -->
```

### Problema: Redirecionamento infinito
**Solução:** 
```javascript
// Limpar localStorage
localStorage.clear();
// Recarregar página
location.reload();
```

### Problema: CPF não aceita
**Solução:** Use CPFs válidos para teste:
- 111.444.777-35
- 123.456.789-09
- Ou gere em: https://www.4devs.com.br/gerador_de_cpf

### Problema: Dados não persistem
**Solução:**
- Verificar se está usando Live Server
- Verificar se localStorage está habilitado
- Testar em janela anônima (sem extensões)

---

## 📊 RELATÓRIO DE TESTE

Após concluir todos os testes, preencha:

**Data do Teste:** ___/___/2025  
**Navegador:** _______________  
**Testador:** _______________  

**Resultado Geral:**
- [ ] ✅ Todos os testes passaram
- [ ] ⚠️ Testes passaram com ressalvas
- [ ] ❌ Falhas encontradas

**Observações:**
```
_________________________________________________
_________________________________________________
_________________________________________________
```

---

## 🎓 PRÓXIMOS PASSOS

Após validar a Fase 1, prosseguir para:

**FASE 2:** Gestão de Contas Bancárias
- Implementar `accounts.js`
- Conectar `contas.html` com localStorage
- CRUD completo de contas

**FASE 3:** Sistema de Transações
- Implementar `transactions.js`
- Receitas e despesas
- Cálculo de saldos

---

**Documento criado:** 20/11/2025  
**Fase:** 1 - Autenticação ✅  
**Status:** Pronto para testes
