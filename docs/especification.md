# Especificações do Projeto
## Perfis de Usuários 

|Perfil 1: Mariana – A Universitária Planejadora|
|-----------------------------------------------|
|Descrição: Estudante de 21 anos, cursando Administração, com renda baixa (estágio + ajuda dos pais). Costuma gastar muito em pequenas despesas diárias, como transporte por aplicativo e alimentação. Apesar da falta de controle financeiro, tem interesse em aprender a organizar melhor suas finanças e começar a guardar parte do que recebe. Busca |mais autonomia e quer se preparar financeiramente para o futuro.|
|Necessidades:  Um aplicativo simples para registrar gastos cotidianos e entender| 

|Perfil 2: João – O Jovem Trabalhador|
|-----------------------------------------------|
|Descrição: Vendedor de 29 anos, com renda média-baixa (salário fixo + comissão). Tem despesas fixas como aluguel e transporte, mas costuma perder o controle financeiro no fim do mês. Busca equilibrar os gastos essenciais e começar a poupar para projetos pessoais, como a compra de uma moto.|
|Necessidades: Registro de despesas fixas e repetidas e uma projeção do saldo para acompanhar se o dinheiro será suficiente até o fim do mês.| 

|Perfil 3: Carla – A mãe Organizada|
|-----------------------------------------------|
|Descrição: Auxiliar administrativa de 37 anos, com renda média, responsável por administrar os gastos da família. Lida com despesas como escola dos filhos, mercado e contas fixas, mas tem dificuldade em visualizar para onde vai a maior parte do dinheiro. Seu objetivo é reduzir dívidas, manter as contas em dia e planejar férias em família.|
|Necessidades: Interface simples e relatórios visuais que ajudem a identificar os maiores gastos.|

|Perfil 4: Roberto – O adulto Endividado|
|-----------------------------------------------|
|Descrição: Motorista de aplicativo de 45 anos, com renda variável baseada nas corridas do dia a dia. Possui várias dívidas em aberto, utiliza o cartão de crédito com frequência e não acompanha com precisão quanto entra ou sai. Seu objetivo é quitar as dívidas aos poucos, organizar melhor os ganhos e construir uma reserva de emergência.|
|Necessidades: Ferramenta clara para registrar movimentações, analisar padrões de gastos e visualizar alerta sobre despesas excessivas.| 

## Personas

Maria - Estudante de 21 anos, cursando Administração, com renda baixa (estágio + ajuda dos pais). Costuma gastar muito em pequenas despesas diárias, como transporte por aplicativo e alimentação. Apesar da falta de controle financeiro, tem interesse em aprender a organizar melhor suas finanças e começar a guardar parte do que recebe. Busca |mais autonomia e quer se preparar financeiramente para o futuro.

João - Vendedor de 29 anos, com renda média-baixa (salário fixo + comissão). Tem despesas fixas como aluguel e transporte, mas costuma perder o controle financeiro no fim do mês. Busca equilibrar os gastos essenciais e começar a poupar para projetos pessoais, como a compra de uma moto.

Carla - Auxiliar administrativa de 37 anos, com renda média, responsável por administrar os gastos da família. Lida com despesas como escola dos filhos, mercado e contas fixas, mas tem dificuldade em visualizar para onde vai a maior parte do dinheiro. Seu objetivo é reduzir dívidas, manter as contas em dia e planejar férias em família.

Roberto - Motorista de aplicativo de 45 anos, com renda variável baseada nas corridas do dia a dia. Possui várias dívidas em aberto, utiliza o cartão de crédito com frequência e não acompanha com precisão quanto entra ou sai. Seu objetivo é quitar as dívidas aos poucos, organizar melhor os ganhos e construir uma reserva de emergência.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA` | QUERO/PRECISO ... `FUNCIONALIDADE`                               | PARA ... `MOTIVO/VALOR`                                                     |
|-----------------------|------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Mariana               | Quero registrar todas as minhas despesas diárias de transporte e alimentação | Para entender quanto do meu orçamento é consumido nessas categorias          |
| Mariana               | Quero classificar minhas despesas em categorias como alimentação, transporte e lazer | Para identificar quais áreas exigem maior controle                           |
| João                  | Quero cadastrar meu salário e contas fixas como transações recorrentes | Para não precisar registrá-las manualmente todo mês                          |
| João                  | Quero visualizar a projeção do meu saldo até o fim do mês        | Para saber se conseguirei pagar todas as despesas sem entrar no negativo     |
| Carla                 | Quero separar os gastos da casa por categorias (alimentação, escola, transporte, lazer) | Para ter clareza sobre onde está sendo gasto mais dinheiro                   |
| Carla                 | Quero acessar uma projeção mensal de saldo                      | Para planejar os próximos meses e evitar dívidas                            |
| Roberto               | Quero registrar diariamente meus ganhos variáveis e minhas despesas com gasolina | Para ter clareza sobre meu lucro real                                       |
| Roberto               | Quero criar uma meta de “quitar dívida do cartão de crédito”     | Para acompanhar meu progresso e manter a motivação em sair do endividamento  |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| Permitir o registro de receitas e despesas, vinculadas a contas.  | Alta |  
|RF-002| Permitir o cadastro e acompanhamento de múltiplas contas (carteira, corrente, poupança).    | Alta |
|RF-003| Exibir saldo atualizado por conta e saldo consolidado.    | Alta | 
|RF-004| Listar histórico de transações realizadas.    | Alta | 
|RF-005| Cadastrar transações fixas e repetidas (salário, aluguel, contas  mensais).    | MÉDIA | 
|RF-006| Permitir a categorização de receitas e despesas, incluindo categorias e subcategorias personalizadas.   | MÉDIA | 
|RF-007| Exibir projeção de saldo futuro, com base em transações fixas e planejadas.     | Baixa | 
|RF-008| Permitir a criação e o acompanhamento de metas financeiras (ex.: viagem, quitar dívida, comprar bem).   |Baixa | 


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001|O sistema deve possuir interface simples e intuitiva, adequada a iniciantes.   | Alta | 
|RNF-002| Deve garantir resposta rápida às interações do usuário.   |  Alta |
|RNF-003| Deve ser compatível com navegadores modernos (Chrome,  Firefox, Edge) e diferentes resoluções de tela.   |  Alta | 
|RNF-004| Deve garantir a integridade e confiabilidade dos dados.   |  Alta | 
|RNF-005| Implementar validações mínimas nos campos (ex: valores  numéricos, datas válidas) para reduzir erros.   |  Média | 
|RNF-006| O sistema deve ser leve e acessível em conexões de internet  de baixa velocidade.   |  Média | 
|RNF-007| O sistema deve estar disponível em padrão responsivo,  funcionando bem em desktop, tablet e smartphone.   |  Baixa | 


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID | Restrição                                                                          |
| -- | ---------------------------------------------------------------------------------- |
| 01 | O sistema deve possuir interface simples e intuitiva, adequada a iniciantes        |
| 02 | Deve garantir resposta rápida às interações do usuário                             |
| 03 | Deve ser compatível apenas com navegadores modernos (Chrome, Firefox, Edge)        |
| 04 | Deve garantir a integridade e confiabilidade dos dados                             |
| 05 | Deve implementar validações mínimas nos campos (valores numéricos, datas)          |
| 06 | O sistema deve ser leve e acessível em conexões de internet de baixa velocidade    |
| 07 | O sistema deve estar disponível em padrão responsivo (desktop, tablet, smartphone) |
| 08 | O escopo não inclui integração com bancos ou serviços financeiros externos         |
| 09 | O projeto deverá ser concluído dentro do semestre letivo                           |

