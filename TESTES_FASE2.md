# 🧪 GUIA DE TESTES - FASE 2
## Gestão de Contas Bancárias - GoalWallet

**Data:** 20/11/2025  
**Fase:** 2 - Gestão de Contas  
**Pré-requisito:** Fase 1 (Autenticação) completa

---

## ✅ PRÉ-REQUISITOS

1. **Fase 1 concluída** - Sistema de autenticação funcionando
2. **Usuário cadastrado** - Tenha um usuário criado para testar
3. **Navegador moderno** (Chrome, Firefox, Edge)
4. **Live Server** ou servidor HTTP local
5. **Console do navegador** aberto (F12) para debug

---

## 🎯 OBJETIVOS DA FASE 2

- ✅ CRUD completo de contas bancárias
- ✅ Persistência de dados no localStorage
- ✅ Vinculação de contas ao usuário
- ✅ Cálculo de saldo consolidado
- ✅ Integração com dashboard
- ✅ Estatísticas de contas

---

## 📋 ROTEIRO DE TESTES

### TESTE 1: Criar Nova Conta ✅

**Objetivo:** Verificar criação de conta bancária.

**Passos:**
1. Faça login no sistema
2. Acesse "💳 Contas" no dashboard
3. Clique em "＋ Adicionar nova conta"
4. Preencha:
   - **Nome do banco:** Nubank
   - **Tipo de conta:** Conta corrente
   - **Data (mm/aa):** 01/24
   - **Saldo (R$):** 1500.50
5. Clique em "Salvar"

**Resultado Esperado:**
- ✅ Mensagem "Conta criada com sucesso!" aparece
- ✅ Nova conta aparece na lista
- ✅ Avatar com iniciais "NU" é gerado
- ✅ Saldo formatado corretamente: R$ 1.500,50
- ✅ Cor aleatória aplicada ao avatar

---

### TESTE 2: Criar Múltiplas Contas ✅

**Objetivo:** Testar criação de várias contas.

**Passos:**
1. Crie as seguintes contas:

**Conta 1:**
- Nome: Banco do Brasil
- Tipo: Poupança
- Data: 03/22
- Saldo: 850.00

**Conta 2:**
- Nome: Inter
- Tipo: Conta digital
- Data: 07/23
- Saldo: -200.00 (saldo negativo)

**Conta 3:**
- Nome: Caixa Econômica
- Tipo: Conta corrente
- Data: 12/21
- Saldo: 0

**Resultado Esperado:**
- ✅ Todas as 4 contas aparecem na lista
- ✅ Saldo negativo aparece em vermelho
- ✅ Saldo positivo aparece em verde
- ✅ Cada conta tem cor diferente
- ✅ Iniciais corretas (BB, I, CE)

---

### TESTE 3: Editar Conta ✅

**Objetivo:** Verificar edição de dados da conta.

**Passos:**
1. Na lista de contas, clique em "Editar"
2. Selecione a conta "Nubank"
3. Clique no botão de editar (✎)
4. Altere:
   - **Saldo:** 2000.00
   - **Data:** 02/24
5. Clique em "Salvar"

**Resultado Esperado:**
- ✅ Mensagem "Conta atualizada com sucesso!"
- ✅ Saldo atualizado para R$ 2.000,00
- ✅ Data atualizada para 02/24
- ✅ Outros dados permanecem inalterados

---

### TESTE 4: Excluir Conta ✅

**Objetivo:** Verificar exclusão de conta.

**Passos:**
1. Clique em "Editar"
2. Selecione a conta "Caixa Econômica"
3. Clique no botão de excluir (🗑)
4. Confirme no popup

**Resultado Esperado:**
- ✅ Popup de confirmação aparece
- ✅ Mensagem "Conta excluída com sucesso!"
- ✅ Conta desaparece da lista
- ✅ Saldo total é recalculado
- ✅ Estatísticas atualizadas

---

### TESTE 5: Validações de Criação ❌

**Objetivo:** Testar validações ao criar conta.

#### 5.1 Nome Muito Curto
- **Nome:** A (1 caractere)
- **Resultado:** "Nome do banco deve ter pelo menos 2 caracteres"

#### 5.2 Sem Tipo
- Deixe "Tipo de conta" vazio
- **Resultado:** Erro de validação

#### 5.3 Data Inválida
- **Data:** 13/99 (mês inválido)
- **Resultado:** Formato aceito, mas validação pode ser melhorada

#### 5.4 Saldo Inválido
- **Saldo:** abc123
- **Resultado:** Convertido para 0 ou erro

---

### TESTE 6: Saldo Consolidado no Dashboard ✅

**Objetivo:** Verificar cálculo e exibição de saldo total.

**Passos:**
1. Com as contas criadas nos testes anteriores:
   - Nubank: R$ 2.000,00
   - Banco do Brasil: R$ 850,00
   - Inter: -R$ 200,00
2. Acesse o Dashboard

**Resultado Esperado:**
- ✅ Saldo Total exibido: R$ 2.650,00 (2000 + 850 - 200)
- ✅ Cor verde para saldo positivo
- ✅ Atualização automática ao criar/editar/excluir

**Se saldo for negativo:**
- ✅ Cor vermelha
- ✅ Sinal de menos (-) visível

---

### TESTE 7: Lista de Contas no Dashboard ✅

**Objetivo:** Verificar exibição de contas no dashboard.

**Passos:**
1. Acesse o Dashboard
2. Verifique a seção "Suas Contas"

**Resultado Esperado:**
- ✅ Até 3 contas são exibidas
- ✅ Nome do banco visível
- ✅ Saldo formatado e colorido
- ✅ Se houver mais de 3 contas, link "+ X conta(s)" aparece
- ✅ Link "Ver todas as contas" funciona

---

### TESTE 8: Estatísticas de Contas ✅

**Objetivo:** Verificar cálculo de estatísticas.

**Passos:**
1. Acesse o Dashboard
2. Verifique a seção "Visão Geral"

**Resultado Esperado:**
- ✅ Total de contas cadastradas correto
- ✅ Contas com saldo positivo contadas
- ✅ Contas com saldo negativo contadas
- ✅ Atualização automática

---

### TESTE 9: Persistência de Dados 💾

**Objetivo:** Verificar que dados são salvos e carregados.

**Passos:**
1. Crie 2 contas novas
2. **Feche o navegador completamente**
3. Abra novamente
4. Faça login
5. Acesse "Contas"

**Resultado Esperado:**
- ✅ Todas as contas ainda estão lá
- ✅ Dados corretos (nome, saldo, tipo, data)
- ✅ Cores mantidas
- ✅ Saldo consolidado correto

---

### TESTE 10: Isolamento por Usuário 🔒

**Objetivo:** Verificar que cada usuário vê apenas suas contas.

**Passos:**
1. Com usuário A logado, crie 2 contas
2. Faça logout
3. Cadastre um novo usuário B
4. Faça login com usuário B
5. Acesse "Contas"

**Resultado Esperado:**
- ✅ Lista de contas vazia para usuário B
- ✅ Não vê as contas do usuário A
- ✅ Pode criar suas próprias contas
- ✅ Saldo consolidado independente

**Teste de reversão:**
1. Logout do usuário B
2. Login novamente com usuário A
3. **Resultado:** Contas do usuário A ainda estão lá

---

### TESTE 11: Edição Simultânea (Modo Editar) ✅

**Objetivo:** Testar botão "Editar" / "Concluir".

**Passos:**
1. Acesse "Contas"
2. Clique em "Editar" (canto superior direito)
3. Observe mudança visual nos cards

**Resultado Esperado:**
- ✅ Botão muda para "Concluir"
- ✅ Botões de editar (✎) e excluir (🗑) aparecem
- ✅ Cards ficam em modo de edição
- ✅ Ao clicar "Concluir", volta ao normal

---

### TESTE 12: Formatação de Valores 💰

**Objetivo:** Verificar formatação de moeda.

**Teste com diferentes valores:**

| Entrada | Esperado |
|---------|----------|
| 1500 | R$ 1.500,00 |
| 1500.50 | R$ 1.500,50 |
| -200 | R$ -200,00 |
| 0 | R$ 0,00 |
| 999999.99 | R$ 999.999,99 |

**Resultado Esperado:**
- ✅ Todos formatados corretamente
- ✅ Separador de milhares (.)
- ✅ Separador de centavos (,)
- ✅ Símbolo R$ presente

---

### TESTE 13: Responsividade Mobile 📱

**Objetivo:** Testar em tela pequena.

**Passos:**
1. Abra DevTools (F12)
2. Ative modo responsivo (Ctrl+Shift+M)
3. Teste com:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)

**Resultado Esperado:**
- ✅ Cards de contas se ajustam
- ✅ Botões acessíveis
- ✅ Texto legível
- ✅ Modal se adapta
- ✅ Sem scroll horizontal

---

### TESTE 14: Navegação entre Páginas ✅

**Objetivo:** Testar fluxo de navegação.

**Fluxo:**
1. Dashboard → Contas → Adicionar Conta → Salvar → Dashboard
2. Verificar saldo atualizado

**Resultado Esperado:**
- ✅ Navegação fluida
- ✅ Dados persistem entre páginas
- ✅ Dashboard atualiza ao voltar
- ✅ Sem perda de dados

---

### TESTE 15: Contas Sem Saldo Inicial ✅

**Objetivo:** Criar conta sem preencher saldo.

**Passos:**
1. Criar nova conta
2. Deixar campo "Saldo" vazio
3. Salvar

**Resultado Esperado:**
- ✅ Conta criada com saldo R$ 0,00
- ✅ Sem erros
- ✅ Pode editar depois para adicionar saldo

---

## 🔍 INSPEÇÃO DE DADOS (Console)

### Ver todas as contas
```javascript
console.log(Accounts.getByUser());
```

### Ver saldo consolidado
```javascript
console.log(Accounts.getSaldoConsolidado());
console.log(Accounts.formatarSaldo(Accounts.getSaldoConsolidado()));
```

### Ver estatísticas
```javascript
console.log(Accounts.getEstatisticas());
```

### Ver todas as contas (todos os usuários)
```javascript
console.log(localStorage.getItem('goalwallet_accounts'));
```

### Limpar contas do usuário atual
```javascript
Accounts.limparContasUsuario();
```

---

## ✅ CHECKLIST DE VALIDAÇÃO FINAL

### Funcionalidades CRUD
- [ ] Criar conta funciona
- [ ] Editar conta funciona
- [ ] Excluir conta funciona
- [ ] Listar contas funciona
- [ ] Validações impedem dados inválidos

### Cálculos e Exibição
- [ ] Saldo consolidado correto
- [ ] Formatação de moeda correta
- [ ] Cores de saldo (verde/vermelho) corretas
- [ ] Iniciais dos bancos geradas corretamente
- [ ] Estatísticas calculadas corretamente

### Integração
- [ ] Dashboard exibe dados reais
- [ ] Dados persistem no localStorage
- [ ] Isolamento entre usuários funciona
- [ ] Navegação entre páginas mantém dados

### Interface
- [ ] Modo editar/concluir funciona
- [ ] Modal abre e fecha corretamente
- [ ] Mensagens de sucesso/erro aparecem
- [ ] Responsivo em mobile

### Qualidade
- [ ] Sem erros no console
- [ ] Dados salvos corretamente
- [ ] Performance adequada
- [ ] Código organizado

---

## 🚨 PROBLEMAS COMUNS E SOLUÇÕES

### Problema: Contas não aparecem
**Solução:**
```javascript
// Verificar se há contas
console.log(Accounts.getByUser());
// Se vazio, criar uma conta de teste
```

### Problema: Saldo não atualiza no dashboard
**Solução:**
- Recarregar página (F5)
- Verificar se conta foi salva
- Limpar cache do navegador

### Problema: "Uncaught ReferenceError: Accounts is not defined"
**Solução:**
Verificar ordem dos scripts em `contas.html` e `dashboard.html`:
```html
<script src="js/utils.js"></script>
<script src="js/auth.js"></script>
<script src="js/route-guard.js"></script>
<script src="js/accounts.js"></script> <!-- Deve estar aqui -->
```

### Problema: Usuários veem contas uns dos outros
**Solução:**
- Limpar localStorage: `localStorage.clear()`
- Fazer logout e login novamente
- Verificar se `usuarioId` está correto

---

## 📊 RELATÓRIO DE TESTE - FASE 2

**Data do Teste:** ___/___/2025  
**Navegador:** _______________  
**Testador:** _______________  

### Funcionalidades Testadas

| Funcionalidade | Status | Observações |
|----------------|--------|-------------|
| Criar conta | ☐ OK ☐ FALHOU | |
| Editar conta | ☐ OK ☐ FALHOU | |
| Excluir conta | ☐ OK ☐ FALHOU | |
| Listar contas | ☐ OK ☐ FALHOU | |
| Saldo consolidado | ☐ OK ☐ FALHOU | |
| Dashboard integrado | ☐ OK ☐ FALHOU | |
| Estatísticas | ☐ OK ☐ FALHOU | |
| Persistência | ☐ OK ☐ FALHOU | |
| Isolamento usuários | ☐ OK ☐ FALHOU | |
| Validações | ☐ OK ☐ FALHOU | |

**Resultado Geral:**
- [ ] ✅ Todos os testes passaram
- [ ] ⚠️ Testes passaram com ressalvas
- [ ] ❌ Falhas encontradas

**Bugs Encontrados:**
```
_________________________________________________
_________________________________________________
_________________________________________________
```

---

## 🎯 CRITÉRIOS DE SUCESSO DA FASE 2

A Fase 2 está **COMPLETA** quando:

✅ **CRUD Funcional:**
1. Criar conta salva corretamente
2. Editar conta atualiza dados
3. Excluir conta remove e recalcula
4. Listar contas carrega do localStorage

✅ **Cálculos Corretos:**
1. Saldo consolidado soma todas as contas
2. Estatísticas calculadas corretamente
3. Formatação de moeda funciona

✅ **Integração:**
1. Dashboard exibe dados reais
2. Navegação entre páginas mantém estado
3. Dados persistem após fechar navegador

✅ **Qualidade:**
1. Sem erros no console
2. Validações impedem dados inválidos
3. Isolamento entre usuários
4. Interface responsiva

---

## ➡️ PRÓXIMOS PASSOS

Após validar a Fase 2, prosseguir para:

**FASE 3:** Sistema de Transações (4-5 dias)
- Implementar `transactions.js`
- CRUD de receitas e despesas
- Vincular transações a contas
- Calcular impacto no saldo
- Integrar com `historico.html`
- Atualizar dashboard com movimentações

---

**Documento criado:** 20/11/2025  
**Fase:** 2 - Gestão de Contas ✅  
**Status:** Pronto para testes
