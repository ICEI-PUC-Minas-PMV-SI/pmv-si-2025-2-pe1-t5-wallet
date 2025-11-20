# 💰 GoalWallet - Sistema de Gestão Financeira Pessoal

`CURSO: Sistemas de Informação`  
`DISCIPLINA: Projeto - Aplicações Web`  
`SEMESTRE: 1º`

**GoalWallet** é uma aplicação web completa e intuitiva para controle financeiro pessoal. Permite registrar receitas e despesas, gerenciar múltiplas contas, criar categorias personalizadas, definir metas financeiras e visualizar relatórios gráficos — tudo de forma simples, rápida e sem necessidade de cadastro em serviços externos.

---

## 👥 Integrantes

* Arlann Henrique Silva Rocha
* Eduardo Mazei Sobrinho
* Fernanda dos Santos Fraga
* Pedro Augusto Cruz de Almeida
* Dario Vieira Diniz Filho
* Larissa Evelyn Marques da Silva

## 👨‍🏫 Orientador

* Alisson Rabelo Arantes

---

## 🎯 Funcionalidades

### ✅ **Fase 1: Autenticação**
- [x] Sistema de cadastro com validação de CPF
- [x] Login/Logout seguro
- [x] Proteção de rotas
- [x] Validação de senha com indicador de força

### ✅ **Fase 2: Gerenciamento de Contas**
- [x] Criar, editar e excluir contas bancárias
- [x] Saldo consolidado de todas as contas
- [x] Cores personalizadas para cada conta
- [x] 4 tipos de conta: Corrente, Poupança, Investimento, Carteira

### ✅ **Fase 3: Transações**
- [x] Adicionar receitas e despesas
- [x] Status: Pago ou Pendente
- [x] Atualização automática de saldo
- [x] Edição e exclusão de transações
- [x] Histórico completo

### ✅ **Fase 4: Validações e UX**
- [x] Validações em tempo real
- [x] Feedback visual em campos
- [x] Loading states
- [x] Modais de confirmação customizados
- [x] Toasts de notificação

### ✅ **Fase 5: Funcionalidades Avançadas**
- [x] **Categorias personalizadas** (20 padrão + ilimitadas customizadas)
- [x] **Filtros avançados** (data, categoria, conta)
- [x] **Exportação de dados** (CSV e JSON)
- [x] **Metas financeiras** com progresso automático
- [x] **Relatórios gráficos** (despesas por categoria, evolução mensal)

### ✅ **Fase 6: Testes e Refinamento**
- [x] Tratamento robusto de erros
- [x] Validação de localStorage
- [x] Documentação completa (Usuário + Técnica)
- [x] Manual de uso detalhado
- [ ] Testes de responsividade
- [ ] Testes de acessibilidade (WCAG)

---

## 🚀 Como Usar

### **Instalação**
Não requer instalação! Basta abrir o arquivo `src/index.html` no navegador.

### **Requisitos**
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- JavaScript habilitado
- localStorage disponível

### **Primeiro Acesso**
1. Abra `src/index.html`
2. Clique em "Criar Conta"
3. Preencha seus dados e faça login
4. Comece criando sua primeira conta bancária!

---

## 📚 Documentação

### 📖 Para Usuários
- **[Manual do Usuário](MANUAL_DO_USUARIO.md)** - Guia completo de uso com screenshots e FAQs

### 🔧 Para Desenvolvedores
- **[Documentação Técnica](DOCUMENTACAO_TECNICA.md)** - Arquitetura, API de módulos, padrões de código

### 📋 Documentação do Projeto
- [Documentação de Contexto](docs/context.md)
- [Especificação do Projeto](docs/especification.md)
- [Projeto de Interface](docs/interface.md)
- [Template Padrão](docs/template.md)
- [Desenvolvimento](docs/development.md)
- [Testes](docs/tests.md)

---

## 🗂️ Estrutura do Projeto

```
pmv-si-2025-2-pe1-t5-wallet/
├── src/
│   ├── index.html              # Login
│   ├── cadastro.html           # Cadastro
│   ├── dashboard.html          # Dashboard principal
│   ├── contas.html             # Gerenciar contas
│   ├── historico.html          # Transações
│   ├── configuracoes.html      # Configurações
│   ├── css/                    # Estilos
│   ├── js/                     # Módulos JavaScript
│   │   ├── utils.js            # Utilitários
│   │   ├── auth.js             # Autenticação
│   │   ├── accounts.js         # Contas
│   │   ├── transactions.js     # Transações
│   │   ├── categories.js       # Categorias
│   │   └── goals.js            # Metas
│   └── img/                    # Imagens
├── docs/                       # Documentação do projeto
├── presentation/               # Apresentação
├── MANUAL_DO_USUARIO.md        # Manual do usuário
├── DOCUMENTACAO_TECNICA.md     # Doc técnica
└── README.md                   # Este arquivo
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna (gradientes, flexbox, grid)
- **JavaScript ES6+** - Lógica de negócio (vanilla, sem frameworks)
- **localStorage** - Persistência de dados
- **Web Storage API** - Gerenciamento de sessão

**Diferenciais:**
- ✅ Zero dependências externas
- ✅ 100% frontend (roda offline)
- ✅ Código modular e documentado
- ✅ Padrões modernos de JavaScript

---

## 📊 Planejamento

| Etapa | Atividades | Status |
|:-----:|----------- |:------:|
| **ETAPA 1** | [Documentação de Contexto](docs/context.md) <br> [Especificação do Projeto](docs/especification.md) | ✅ |
| **ETAPA 2** | [Projeto de Interface](docs/interface.md) <br> [Template Padrão](docs/template.md) | ✅ |
| **ETAPA 3** | [Programação - HTML e CSS](docs/development.md) | ✅ |
| **ETAPA 4** | [Programação - Javascript](docs/development.md) <br> [Testes](docs/tests.md) | ✅ |
| **ETAPA 5** | [Apresentação](presentation/README.md) | ✅ |
| **ETAPA 6** | Refinamento e Documentação | ✅ |

---

## 🎨 Capturas de Tela

### Dashboard
- Saldo consolidado
- Contas principais
- Estatísticas mensais
- Gráficos de despesas
- Metas financeiras com progresso

### Histórico
- Lista de transações (pagas e pendentes)
- Filtros avançados
- Exportação de dados
- Gerenciamento de categorias

### Gerenciar Contas
- CRUD completo
- Cores personalizadas
- Saldos atualizados automaticamente

---

## 🔐 Segurança e Privacidade

- ✅ Todos os dados ficam **apenas no navegador do usuário**
- ✅ Nenhuma informação é enviada para servidores externos
- ✅ Validação de CPF com dígitos verificadores
- ✅ Sanitização de inputs (proteção XSS)
- ✅ Confirmações em ações críticas

**⚠️ Importante:**
- Dados persistem no localStorage do navegador
- Limpar cache remove todos os dados
- Não há backup automático em nuvem
- Use a função "Exportar" para fazer backups manuais

---

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Convenções de Commit
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `refactor:` Refatoração de código
- `style:` Formatação, sem mudança de lógica
- `test:` Adição/correção de testes

---

## 📞 Suporte

Para dúvidas, sugestões ou reportar bugs:
- Abra uma **Issue** no repositório
- Acesse a página de **Suporte** dentro da aplicação
- Entre em contato com a equipe de desenvolvimento

---

## 📄 Licença

Este projeto foi desenvolvido como trabalho acadêmico para a disciplina de **Projeto - Aplicações Web** do curso de **Sistemas de Informação**.

---

## 🏆 Agradecimentos

- Professor **Alisson Rabelo Arantes** pela orientação
- Toda a equipe de desenvolvimento pelo empenho
- Comunidade open-source pelas referências

---

**Desenvolvido com 💙 pela Turma PMV-SI-2025-2-PE1-T5**  
*PUC Minas - Sistemas de Informação*

---

## 📌 Links Rápidos

- 📖 [Manual do Usuário](MANUAL_DO_USUARIO.md)
- 🔧 [Documentação Técnica](DOCUMENTACAO_TECNICA.md)
- 💻 [Código Fonte](src/)
- 🎤 [Apresentação](presentation/)
- 📚 [Documentação Completa](docs/)

---

**✨ GoalWallet - Alcance suas metas financeiras! 🎯**
