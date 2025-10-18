# Template padrão do site

## Introdução
Este documento técnico, elaborado em conformidade com as normas da ABNT, apresenta a documentação do projeto GoalWallet, uma aplicação web desenvolvida para o controle de finanças pessoais. O trabalho visa detalhar as diretrizes de identidade visual, a arquitetura de design das interfaces e o fluxo de usuário planejado, assegurando consistência e usabilidade em todas as telas do sistema.

A documentação aborda o Guia de Estilo completo, que define os elementos de design como paleta de cores, tipografia, iconografia e componentes padrão. Além disso, apresenta a visão geral da interação do usuário através dos protótipos interativos (wireframes) e do fluxo de usuário (User Flow), que mapeiam as possíveis ações e caminhos do usuário no sistema. O objetivo principal é fornecer uma base sólida para o desenvolvimento da aplicação, garantindo que os requisitos funcionais, não-funcionais e as histórias de usuário sejam atendidos de forma coesa, prática e visualmente agradável.

## Design
Guia de estilo - GoalWallet
Esta seção detalha os princípios e padrões de design que compõem a identidade visual do GoalWallet, servindo como guia para o desenvolvimento e padronização da interface.
> - Identidade Visual
A identidade visual do GoalWallet foi concebida para transmitir confiança, modernidade e praticidade. Com um estilo minimalista e inspirado em fintechs, a aplicação utiliza uma paleta de cores baseada em tons de azul, com alto contraste em branco e cores de apoio (verde e vermelho) para sinalizar entradas e saídas de forma intuitiva.
> - Layout Padrão do Site/App
O layout da aplicação foi projetado com uma estrutura responsiva, adaptável tanto para dispositivos móveis (mobile) quanto para desktops. O design utiliza cards arredondados com bordas suaves e um grid system (Flexbox/Grid) para organizar os blocos de conteúdo de maneira fluida.

Elementos fixos:

> - Cabeçalho: Contém o logo do sistema, posicionado no canto superior central ou esquerdo, e ícones de acesso rápido.
> - Rodapé: Consiste em uma barra de navegação inferior com ícones para acesso rápido (Home, Carteiras, Configurações).

Componentes principais:
> - Dashboard (Home): Exibe o saldo consolidado, botões de ação rápida (Registrar Entrada/Saída), uma lista de movimentações recentes e um gráfico de gastos.

## Cores
A paleta de cores principal é composta por tons de azul que evocam confiança e seriedade. As cores de apoio, como verde e vermelho, são utilizadas para reforçar a semântica das transações.

|Função         |Cor         |Hexadecimal |
|---------------|------------|------------|
|Azul Principal |Azul Escuro |#0A3D91     |
|Contraste      |Branco      |#FFFFFF     |
|Entrada        |Verde       |#2ECC71     |
|Saída          |Vermelho    |#E74C3C     |
|Neutro         |Cinza Claro |#F4F6F8     |

## Tipografia

As fontes Poppins e Inter foram escolhidas para garantir a legibilidade e a consistência visual. A tabela abaixo detalha o uso de cada fonte e seu propósito na interface.

|Uso                    |Fonte             |Peso |Características             |
|-----------------------|------------------|-----|----------------------------|
|Título de Página       |Poppins Bold      |700  |Moderna, forte, destaque.   |
|Título de Seção        |Poppins SemiBold  |600  |Consistente, intermediário. |
|Rótulos de Componentes |Inter Medium      |500  |Alta legibilidade, direto.  |
|Corpo de Texto         |Inter Regular     |400  |Leve, leitura confortável.  |

## Iconografia
Os ícones seguem um estilo flat e minimalista, com a cor branca sobre fundos escuros. A biblioteca Font Awesome é utilizada como referência para os ícones.

> - Home: Acesso ao dashboard.
> - Carteira: Gestão de contas e carteiras.
> - Configurações: Acesso a preferências e ajustes.
> - Adicionar: Criar nova entrada/saída.
> - Visibilidade: Mostrar/ocultar senha.
> - Gráfico: Acesso a relatórios e estatísticas.

## Componentes Padrão
> -	Botões:	Primário (ação principal): Fundo branco, texto azul, bordas arredondadas.
> - Secundário (alternativo): Fundo azul escuro, borda branca, texto branco.
> - Cards: Fundo azul mais claro com bordas arredondadas (radius 12-16px) e uma leve sombra.
> - Campos de Formulário: Fundo transparente, borda inferior branca e texto cinza/azul escuro. Possuem ícones de apoio para validação.

## FLUXO DO USUÁRIO E PROTÓTIPOS
Esta seção apresenta as interfaces da plataforma, discutindo como elas foram elaboradas para atender aos requisitos funcionais e não-funcionais, além de mapear a jornada do usuário.

> - User Flow
O fluxo de usuário (User Flow) é uma técnica fundamental para mapear as sequências de telas e as possíveis ações do usuário. Para o GoalWallet, essa técnica foi utilizada para alinhar os caminhos de navegação, como o processo de login e cadastro, e garantir que a transição entre as telas seja fluida e intuitiva.

> - Protótipos e Interfaces
Os protótipos (wireframes) ilustram a estrutura de cada tela e a relação entre elas, atendendo diretamente aos requisitos do sistema. Abaixo, são apresentadas as principais interfaces da plataforma, com os links para o código CSS que define o estilo de cada uma.


Tela Inicial (Splash/Boas-vindas): É a primeira tela que o usuário vê quando abre o aplicativo ou entra no site. Normalmente é simples, com pouco conteúdo, para causar uma boa primeira impressão.

Exibe a logo centralizada: O logotipo da aplicação/marca aparece bem no centro da tela, como destaque principal. Isso ajuda o usuário a reconhecer imediatamente onde ele está.

Botões "Entrar" e "Criar Conta":
Abaixo do logo (ou em posição de destaque), ficam dois botões:

Entrar → para quem já tem cadastro e só precisa colocar login e senha.

Criar Conta → para novos usuários que ainda não têm acesso e precisam se registrar.

## Tela de Cadastro: 

a página/tela onde o usuário que ainda não tem conta fornece seus dados para criar um perfil no sistema.
Solicita dados pessoais:

Os campos geralmente aparecem em formato de formulário:

Nome → campo de texto para o usuário digitar o nome completo.

E-mail → usado como identificação e para comunicação.

CPF → em apps brasileiros, usado para autenticação ou integração com serviços.

Senha → o usuário cria uma senha que será usada depois para login.

## Tela de Login: 
Campos para E-mail e Senha

Campo de texto onde o usuário digita o e-mail (ou outro identificador, como CPF/usuário).

Campo de senha, ocultando os caracteres digitados para segurança.

Link para recuperação de senha

Geralmente escrito como “Esqueci minha senha”.

Redireciona para um fluxo de redefinição, onde o usuário pode criar uma nova senha via e-mail, SMS ou outro método.

Botão "Entrar"

Após preencher e-mail e senha, o usuário clica nesse botão para acessar sua conta.

O sistema valida as credenciais e libera o acesso.

Opções de login social

Botões extras para entrar usando contas externas, como:

⦁	Google
⦁	Facebook
⦁	Outros provedores (ex: LinkedIn, GitHub etc., dependendo do app)
Isso agiliza o login, sem necessidade de criar/lembrar senha.

# Dashboard (Home): 
Saudação personalizada

Um texto no topo, tipo: “Olá, Fernanda 👋” ou “Bem-vinda de volta!”.
Dá um toque mais humano e próximo ao usuário. 

⦁	Saldo total em destaque

Um card centralizado e grande, mostrando o valor principal (ex.: saldo da conta ou carteira).
Fica em evidência para o usuário ver logo de cara sua situação atual.

> - Ações rápidas
Ícones ou botões que levam direto para funções mais usadas, como:
> -	Registrar gasto
> -	Adicionar receita
> -	Transferir dinheiro
> - Lista de movimentações

Mostra as transações do usuário em formato de lista.

Ex.: Compra no Mercado – R$ 50,00 ou Depósito – R$ 200,00.
Pode ter filtros (últimos 7 dias, este mês, etc.).

Últimas transações
Uma versão reduzida da lista, só mostrando as mais recentes.
Às vezes fica em um card separado, com botão “Ver todas”.

Botão para registrar entrada e saída
Normalmente um botão flutuante (+) no canto inferior.
O usuário pode escolher Entrada (receita) ou Saída (despesa).

Adicionar demais coisas
Expansões futuras:
⦁	gráficos de despesas
⦁	metas de economia

## Tela de Perfil do Usuário: 
> ⦁	Foto:
Um avatar ou foto de perfil do usuário, geralmente no topo da tela.
Serve para personalizar a experiência e facilitar a identificação.

> ⦁	Nome:
O nome do usuário exibido logo abaixo ou ao lado da foto.
Pode vir acompanhado de informações adicionais, como e-mail ou username.

> ⦁	Resumo de uso:
Pequeno painel com informações principais sobre o uso do app.
Exemplos em um app financeiro: saldo, total gasto no mês, quantidade de transações.
Em outros contextos pode ser: número de posts, atividades concluídas, progresso etc.

> ⦁	Gráfico de gastos:
Um elemento visual (geralmente de pizza, barras ou linhas) que mostra como o usuário está gastando/destinando recursos.

## Tela de Configurações: 

Um menu com diversas opções

A tela é basicamente uma lista de itens clicáveis, cada um levando para uma seção específica de configuração.

Exemplos de opções mais comuns:

> ⦁	Central de contas → onde o usuário pode gerenciar login, senha, dados pessoais, segurança etc.

> ⦁	Notificações → ativar/desativar alertas por push, e-mail ou SMS.

> ⦁	Suporte → acesso a FAQ, chat de atendimento ou envio de solicitação de ajuda.

> ⦁	Sobre → informações sobre o app/sistema (versão, termos de uso, política de privacidade).

> ⦁	Outras opções → como tema (claro/escuro), idioma, acessibilidade, permissões etc.

## Tela de Erro no Login: 

Mensagem de erro em destaque

Aparece logo no topo (acima dos campos de e-mail e senha).

Geralmente em vermelho ou com um ícone de alerta (⚠️).

Texto comum: “E-mail ou senha incorretos. Tente novamente.”

Mantém os campos preenchidos

Para não frustrar o usuário, o sistema costuma manter o e-mail digitado e limpar apenas a senha.

Assim ele não precisa digitar tudo de novo.

Botão "Entrar" continua visível

O usuário pode corrigir os dados e tentar novamente.

Links auxiliares

Ex.: “Esqueci minha senha” → ajuda quando o problema é realmente o esquecimento.

## Aspectos de Responsividade da Aplicação

A aplicação foi projetada seguindo princípios modernos de design responsivo, garantindo uma experiência consistente, acessível e eficiente em qualquer dispositivo, desde celulares até desktops grandes.

> 1. Filosofia Mobile-First
   
O design prioriza primeiro a experiência em dispositivos móveis, adaptando o conteúdo e a navegação para telas pequenas.
Após a otimização para mobile, a interface é gradualmente expandida para tablets e desktops, garantindo que todos os elementos sejam dimensionados corretamente e que a experiência do usuário seja fluida.

Vantagem: usuários móveis que representam a maior parte do tráfego têm uma interface limpa, rápida e funcional.

> 2. Dimensão de Elementos Interativos

Botões e ícones foram dimensionados para serem facilmente clicáveis com o dedo:
Tamanho mínimo recomendado: 44px × 44px, seguindo as diretrizes de acessibilidade da Apple e Google.
Isso evita toques errados e melhora a experiência de navegação, principalmente em telas pequenas.
Ícones, botões e links possuem espaçamento adequado entre si para prevenir confusão durante a interação.

> 3. Unidades de Medida Flexíveis
   
O texto e outros elementos utilizam unidades relativas:

rem (baseada na raiz do documento)

em (baseada no elemento pai)

Benefícios:

> - Permite que o layout e tipografia se adaptem ao tamanho da tela.

> - Facilita a acessibilidade, pois usuários que aumentam o zoom ou configuram fontes maiores veem o conteúdo corretamente.

> - Elementos como margens, paddings e tamanhos de containers também usam unidades relativas sempre que possível, garantindo harmonia visual em diferentes resoluções..


|clara é feia
|----------------
|
|
|
|
|
|






