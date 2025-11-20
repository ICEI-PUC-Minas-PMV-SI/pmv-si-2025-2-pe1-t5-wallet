# 📱 GoalWallet - Manual do Usuário

## 🎯 Visão Geral

**GoalWallet** é um sistema completo de gerenciamento financeiro pessoal desenvolvido em HTML, CSS e JavaScript puro (vanilla). O aplicativo permite controlar contas bancárias, registrar transações, definir metas financeiras, categorizar despesas e visualizar relatórios.

---

## 🚀 Como Começar

### 1. **Cadastro**
1. Acesse `index.html` no navegador
2. Clique em "Criar Conta"
3. Preencha o formulário com:
   - **Nome completo**
   - **CPF** (formato: 000.000.000-00)
   - **E-mail** (será seu login)
   - **Senha** (mínimo 6 caracteres)
4. Clique em "Criar Conta"

**Validações:**
- ✅ CPF válido com dígitos verificadores
- ✅ E-mail no formato correto
- ✅ Senha forte (indicador visual de força)
- ✅ Feedback em tempo real nos campos

### 2. **Login**
1. Digite seu e-mail e senha
2. Clique em "Entrar"
3. Você será redirecionado para o Dashboard

---

## 💼 Funcionalidades

### 📊 Dashboard
**O que você vê:**
- **Saldo Total** consolidado de todas as contas
- **Suas Contas** (até 3 contas principais)
- **Estatísticas** do mês atual (receitas e despesas)
- **Gráficos visuais:**
  - Top 5 categorias de despesas
  - Evolução dos últimos 6 meses
- **Metas Ativas** com barras de progresso

**Ações rápidas:**
- Registrar entrada/saída
- Acessar contas, histórico, configurações e suporte

---

### 💳 Gerenciar Contas

#### **Criar Nova Conta**
1. Acesse "Contas" no menu
2. Clique em "+ Nova Conta"
3. Preencha:
   - **Nome** (ex: "Nubank", "Bradesco")
   - **Tipo** (Corrente, Poupança, Investimento, Carteira)
   - **Saldo Inicial**
   - **Cor** (escolha entre 5 opções)
4. Clique em "Salvar"

#### **Editar/Excluir Conta**
1. Clique no ícone de **lápis** ao lado da conta
2. Modifique os dados desejados
3. Clique em "Salvar" ou "Excluir" (com confirmação)

**⚠️ Importante:** O saldo da conta é atualizado automaticamente pelas transações.

---

### 📝 Histórico de Transações

#### **Adicionar Transação**
1. Acesse "Histórico"
2. Clique em:
   - **"Adicionar Receita"** (verde) para entradas
   - **"Adicionar Despesa"** (vermelho) para saídas
3. Preencha:
   - **Descrição** (ex: "Salário", "Supermercado")
   - **Valor**
   - **Data**
   - **Conta** (onde o dinheiro entra/sai)
   - **Categoria** (selecione ou crie nova)
   - **Status:** Pago ou Pendente
4. Clique em "Salvar"

#### **Editar Transação**
1. Ative o modo de edição clicando em "Editar"
2. Clique no **lápis** da transação
3. Modifique os dados
4. Salve as alterações

#### **Filtros Avançados** 🔍
1. Clique em "🔍 Filtros Avançados"
2. Configure:
   - **Data Início/Fim**
   - **Categoria** específica
   - **Conta** específica
3. Clique em "Aplicar"
4. Use "Limpar" para remover filtros

#### **Exportar Dados** 💾
1. Configure filtros (opcional)
2. Clique em "📥 Exportar"
3. Escolha o formato:
   - **CSV** (para Excel/Google Sheets)
   - **JSON** (formato técnico)
4. O arquivo será baixado automaticamente

---

### 📁 Categorias Personalizadas

#### **Categorias Padrão**
**Receitas (10):**
- 💰 Salário
- 💼 Freelance
- 🎁 Presente
- 💸 Investimento
- 🏆 Prêmio
- 📈 Dividendos
- 🔄 Reembolso
- 💵 Renda Extra
- 🤝 Empréstimo Recebido
- 📊 Lucro

**Despesas (10):**
- 🍔 Alimentação
- 🚗 Transporte
- 🏠 Moradia
- ⚡ Contas
- 🎮 Lazer
- 🏥 Saúde
- 📚 Educação
- 👕 Vestuário
- 🛒 Compras
- 💳 Outros

#### **Criar Categoria Personalizada**
1. No histórico, ao adicionar transação
2. Clique em "⚙️ Gerenciar Categorias"
3. Selecione a aba (Receitas ou Despesas)
4. Preencha:
   - **Nome** (ex: "Pet Shop")
   - **Ícone** (emoji, ex: 🐶)
   - **Cor** (picker de cores)
5. Clique em "Adicionar"

#### **Excluir Categoria**
- Só categorias personalizadas podem ser excluídas
- Não é possível excluir se houver transações usando a categoria
- Clique em "Excluir" ao lado da categoria desejada

---

### 🎯 Metas Financeiras

#### **Criar Meta**
1. No Dashboard, clique em "+ Nova Meta"
2. Preencha:
   - **Título** (ex: "Viagem para Europa")
   - **Descrição** (opcional)
   - **Valor Meta** (R$ 10.000,00)
   - **Tipo:**
     - 💰 Economia (juntar dinheiro)
     - 📉 Redução Despesa (gastar menos)
     - 📈 Investimento (aumentar patrimônio)
   - **Data Limite**
   - **Cor** (escolha entre 5 opções)
3. Clique em "Criar Meta"

#### **Acompanhar Progresso**
- **Barra de progresso** visual (%)
- **Dias restantes** para alcançar
- **Valor atual** vs **Valor meta**
- **Atualização automática** baseada em transações

#### **Celebração de Meta** 🎉
Quando atingir 100% da meta, o sistema:
- Exibe mensagem de parabéns
- Marca a meta como "Concluída"
- Remove da lista de metas ativas

---

### 📈 Relatórios e Gráficos

#### **Despesas por Categoria**
- **Top 5 categorias** do mês atual
- Barras horizontais proporcionais
- Cores personalizadas de cada categoria
- Valores totais exibidos

#### **Evolução Mensal**
- **Últimos 6 meses** em gráfico de barras
- Barras duplas: Receitas (verde) × Despesas (vermelho)
- Comparação visual mês a mês
- Legenda colorida

---

## ⚙️ Configurações

### **Alterar Dados Pessoais**
1. Acesse "Configurações"
2. Modifique Nome, CPF ou E-mail
3. Clique em "Salvar Alterações"

### **Trocar Senha**
1. Na mesma tela de configurações
2. Digite a senha atual
3. Digite a nova senha (2x)
4. Clique em "Alterar Senha"

### **Sair da Conta**
1. Clique em "Sair" no topo direito
2. Confirme no modal
3. Você será deslogado e redirecionado para o login

---

## 🔒 Segurança e Privacidade

### **Armazenamento Local**
- Todos os dados ficam no **localStorage** do navegador
- **Nenhum dado é enviado para servidores externos**
- Dados persistem mesmo após fechar o navegador

### **Validações de Segurança**
- ✅ CPF com validação de dígitos verificadores
- ✅ Senhas com indicador de força
- ✅ Proteção de rotas (não acessa sem login)
- ✅ Sanitização de inputs (previne XSS)
- ✅ Confirmações em ações críticas (excluir conta/transação)

### **Limitações**
- ⚠️ Dados ficam apenas no navegador (não há backup em nuvem)
- ⚠️ Se limpar o cache do navegador, perde os dados
- ⚠️ Não compartilhe seu dispositivo sem logout

---

## 🎨 Dicas de Uso

### **Organização**
1. **Crie categorias personalizadas** para suas necessidades específicas
2. **Use cores diferentes** para contas e metas (facilita visualização)
3. **Registre transações pendentes** para não esquecer de pagar
4. **Exporte dados mensalmente** como backup

### **Controle Financeiro**
1. **Defina metas realistas** com prazos alcançáveis
2. **Revise o dashboard semanalmente** para acompanhar gastos
3. **Use filtros** para analisar períodos específicos
4. **Compare evolução mensal** nos gráficos

### **Boas Práticas**
- ✅ Registre transações assim que ocorrerem
- ✅ Revise transações pendentes regularmente
- ✅ Mantenha categorias organizadas e relevantes
- ✅ Faça logout ao usar computadores públicos

---

## ❓ Perguntas Frequentes

### **Como faço backup dos meus dados?**
Use a função "Exportar" no histórico e salve o arquivo JSON. Atualmente não há função de importação, mas o arquivo serve como registro.

### **Posso usar em vários dispositivos?**
Não. Os dados ficam apenas no navegador onde você criou a conta. Para usar em outro dispositivo, precisa criar uma nova conta.

### **Esqueci minha senha, como recuperar?**
Não há recuperação de senha no momento. Você precisará criar uma nova conta.

### **Quanto posso armazenar?**
O localStorage tem limite de ~5-10MB. Para uso pessoal normal, isso é suficiente para milhares de transações.

### **Posso ter múltiplas contas de usuário?**
Sim, mas apenas uma sessão ativa por vez no mesmo navegador.

### **Os gráficos são atualizados automaticamente?**
Sim! Ao adicionar/editar transações, todos os gráficos e estatísticas são recalculados.

---

## 🐛 Problemas Conhecidos

### **Navegador**
- Use navegadores modernos (Chrome, Firefox, Edge, Safari atualizados)
- Habilite JavaScript
- Não use modo anônimo (dados não persistem)

### **Performance**
- Com +1000 transações, filtros podem ficar lentos
- Recomenda-se exportar e arquivar dados antigos

---

## 📞 Suporte

Acesse a página de **Suporte** no menu para:
- Reportar bugs
- Sugerir melhorias
- Tirar dúvidas

---

## 📄 Licença

GoalWallet é um projeto acadêmico desenvolvido para fins educacionais.

---

**Desenvolvido com 💙 para ajudar você a alcançar suas metas financeiras! 🎯**
