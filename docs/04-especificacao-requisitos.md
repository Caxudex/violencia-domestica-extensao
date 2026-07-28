# Etapa 4 — Especificação de Requisitos

## Objetivo da etapa
Definir de forma clara e verificável os requisitos funcionais (RF) e não funcionais (RNF) do site, com base nas necessidades levantadas na Etapa 2 e nos wireframes da Etapa 3.

## Requisitos Funcionais (RF)

| ID | Requisito |
|---|---|
| RF01 | O site deve exibir, em toda página, um botão de "Sair rapidamente" que redirecione imediatamente para um site neutro (ex.: Google), sem manter histórico de navegação recuperável na mesma aba. |
| RF02 | A Home deve exibir com destaque os canais de denúncia: Disque 180, 190 e Ligue 100. |
| RF03 | O site deve conter uma página explicando os cinco tipos de violência doméstica (física, psicológica, sexual, econômica, patrimonial) e uma seção específica sobre violência contra crianças e adolescentes. |
| RF04 | O site deve conter uma página de legislação com resumo da Lei Maria da Penha (11.340/2006) e da Política Nacional de Enfrentamento à Violência contra as Mulheres, com links para os textos oficiais. |
| RF05 | O site deve conter uma página "Como Denunciar" com canais oficiais e passo a passo para solicitação de medida protetiva. |
| RF06 | O site deve conter uma página "Rede de Apoio" listando CRAS, CREAS, ONGs parceiras e a Casa da Mulher Brasileira. |
| RF07 | O site deve conter um formulário de contato (nome, e-mail, mensagem) com validação client-side, exibindo aviso de que não substitui atendimento de emergência. |
| RF08 | A navegação principal deve estar acessível a partir de qualquer página do site (header fixo). |

## Requisitos Não Funcionais (RNF)

| ID | Requisito |
|---|---|
| RNF01 | O site deve ser responsivo, adaptando-se a telas mobile, tablet e desktop. |
| RNF02 | O site deve manter contraste de cores adequado (mínimo AA de WCAG) entre texto e fundo. |
| RNF03 | Todos os elementos interativos (links, botões, formulário) devem ser navegáveis via teclado, com foco visível. |
| RNF04 | O site não deve realizar coleta de dados sensíveis sem consentimento explícito do usuário. |
| RNF05 | O site deve ser implementado em HTML/CSS/JS estático, sem dependência de backend, para facilitar hospedagem e manutenção pela instituição parceira. |
| RNF06 | O tempo de carregamento de qualquer página deve ser mínimo, evitando bibliotecas externas pesadas. |
| RNF07 | O código-fonte deve ser entregue de forma organizada e documentada (README), permitindo manutenção futura pela equipe da instituição parceira. |

## Rastreabilidade com a Etapa 2

| Necessidade (Etapa 2) | Requisito(s) correspondente(s) |
|---|---|
| Botão de saída rápida | RF01 |
| Canais de denúncia em destaque | RF02, RF05 |
| Explicação acessível dos tipos de violência | RF03 |
| Medidas protetivas e legislação | RF04, RF05 |
| Rede de apoio | RF06 |
| Contato simples, sem dados sensíveis | RF07, RNF04 |
| Acessibilidade e responsividade | RNF01, RNF02, RNF03 |
