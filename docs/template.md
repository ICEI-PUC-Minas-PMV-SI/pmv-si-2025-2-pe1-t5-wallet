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

> 
>
> - Home: Acesso ao dashboard.
> - Carteira: Gestão de contas e carteiras.
> - Configurações: Acesso a preferências e ajustes.
> - Adicionar: Criar nova entrada/saída.
> - Visibilidade: Mostrar/ocultar senha.
> - Gráfico: Acesso a relatórios e estatísticas.


