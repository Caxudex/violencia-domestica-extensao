# Relatório Detalhado - Atividade Extensionista
## Desenvolvimento de site sobre Enfrentamento à Violência Doméstica

**Instituição concedente de referência:** Secretaria de Assistência Social de Timbó (parceria em processo de formalização)
**Carga horária total do projeto:** 149 horas

---

## 1. Introdução

Este relatório documenta o processo de desenvolvimento de um site colaborativo de conscientização e combate à violência doméstica, elaborado como atividade extensionista. O projeto teve como objetivo disponibilizar informações e instruções normativas sobre violência doméstica junto a um órgão de assistência social, ampliando a adesão a ações sociais de denúncia e combate.

## 2. Desenvolvimento por etapa

### Etapa 1 - Planejamento e Pesquisa (15h, 10h presenciais)
Foi realizada pesquisa bibliográfica sobre a Lei Maria da Penha (11.340/2006), a Política Nacional de Enfrentamento à Violência contra as Mulheres e o ECA. Foi definida a instituição concedente de referência (Secretaria de Assistência Social de Timbó, parceria a ser formalizada) e a estrutura inicial do site. Documento produzido: `docs/01-planejamento-pesquisa.md`.

### Etapa 2 - Levantamento de Informações (15h, 10h presenciais)
Levantamento com profissionais da rede de proteção (assistente social do CREAS, ONG, Polícia Civil e Militar), utilizando um [Google Form real](https://docs.google.com/forms/d/e/1FAIpQLSfA6eaO5LOXyTP2DMPiCTXPM-f6n1N9j48hNhtiEX1L6mhgHg/viewform) como instrumento estruturado de coleta, conforme sugerido pelo edital. Identificadas as necessidades centrais: canais de denúncia visíveis, botão de saída rápida por segurança digital, linguagem acessível e informações sobre medidas protetivas. Documento produzido: `docs/02-levantamento-informacoes.md`.

### Etapa 3 - Prototipação de Baixa Fidelidade (15h, 10h presenciais)
Desenvolvidos wireframes em texto para todas as páginas do site (Home, Sobre, Tipos de Violência, Legislação, Como Denunciar, Rede de Apoio, Contato), destacando a posição do botão de saída rápida no cabeçalho. Documento produzido: `docs/03-prototipacao-baixa-fidelidade.md`.

### Etapa 4 - Especificação de Requisitos (15h, 10h presenciais)
Definidos 8 requisitos funcionais e 7 requisitos não funcionais, com rastreabilidade direta às necessidades levantadas na Etapa 2. Ferramentas: documentação em Markdown. Documento produzido: `docs/04-especificacao-requisitos.md`.

### Etapa 5 - Prototipação de Alta Fidelidade (15h, 5h presenciais)
Definida a paleta de cores (roxo institucional + laranja de alerta para o botão de emergência), tipografia baseada em fontes do sistema e especificação dos componentes visuais (cards, botões, header fixo). Documento produzido: `docs/05-prototipacao-alta-fidelidade.md`.

### Etapa 6 - Implementação da Solução (45h, 15h/semana)

**Escolha tecnológica:** o edital cita o WordPress apenas como exemplo ("pode-se utilizar do CMS WordPress ou desenvolver com base em outra tecnologia que se sinta à vontade"). Optou-se por HTML5, CSS3 e JavaScript puro em vez de WordPress porque: (i) elimina a necessidade de servidor, banco de dados e atualizações de CMS/plugins (sem exposição a vulnerabilidades de plugins como Wordfence precisaria mitigar), o que é mais adequado para uma instituição pública sem equipe de TI dedicada para manutenção contínua; (ii) permite hospedagem gratuita e de baixa manutenção via GitHub Pages, com deploy automatizado (`.github/workflows/deploy-pages.yml`); (iii) resulta num site mais leve e rápido (Lighthouse Performance 96-100/100, ver Etapa 7); e (iv) atende ao requisito não funcional RNF05 (`docs/04-especificacao-requisitos.md`) de solução sem backend próprio. O código-fonte entregue à instituição parceira ao final do projeto (Etapa 8) pode ser editado diretamente nos arquivos `.html`/`.css`/`.js`, sem exigir conhecimento de WordPress.

O site foi implementado em HTML5, CSS3 e JavaScript puro (sem dependência de backend ou CMS), com 7 páginas: `index.html`, `sobre.html`, `tipos-de-violencia.html`, `legislacao.html`, `como-denunciar.html`, `rede-de-apoio.html` e `contato.html`. Recursos implementados:
- Header fixo com navegação e botão de "Sair rapidamente" (redirecionamento imediato por segurança da vítima).
- Layout responsivo (mobile, tablet, desktop) via CSS Grid/Flexbox.
- Acessibilidade: contraste adequado, navegação por teclado com foco visível, link de "pular para o conteúdo".
- Formulário de contato com validação client-side.
- Conteúdo sobre tipos de violência, legislação, canais de denúncia e rede de apoio.

Arquivos: `site/index.html` e demais páginas, `site/css/style.css`, `site/js/main.js`.

Foi também criada a página `site/participe.html`, com um formulário (Google Forms embutido) de avaliação da comunidade e registro de participação, para ampliar o alcance do site e servir como evidência da Atividade 31 do edital ("envio de link para a avaliação da comunidade"). A página distingue duas formas de participação: avaliação anônima e **registro de participação institucional** (nome, instituição/organização e cargo, opcionais), este último pensado como evidência documentável para o relatório apresentado à instituição parceira e à universidade. A página também exibe um contador de participantes (oculto até ser configurado com a planilha real). O guia de criação do formulário está em `docs/formulario-avaliacao-comunidade.md`.

### Etapa 7 - Verificação e Validação (15h, 5h presenciais)
As páginas foram verificadas quanto à navegação entre todas as seções, funcionamento do botão de saída rápida, responsividade em diferentes larguras de tela e validação do formulário de contato (campos obrigatórios e formato de e-mail). Todos os requisitos funcionais (RF01–RF08) e não funcionais (RNF01–RNF07) especificados na Etapa 4 foram conferidos item a item.

**Feedback real da comunidade e ação tomada:** através do formulário de avaliação (`site/participe.html`), foi recebida a seguinte sugestão de um participante: *"a maioria das pessoas tendem a permanecer em sites ou blogs informativos, quando usamos imagens ou gráficos [...] Talvez seja interessante mesclar os textos com desenhos ou ícones. Ainda mais que o tema é de EXTREMA importância e DEVE ser de conhecimento de todos."* Em resposta, foram adicionados ícones ilustrativos (SVG) em todos os cards do site e uma ilustração no hero da página inicial, reforçando o apelo visual do conteúdo sem comprometer a performance (ícones vetoriais embutidos, sem imagens externas) nem o modo de alto contraste.

**Auditoria final (versão oficial, 13/08/2026):** reexecutado o Lighthouse após todas as mudanças (ícones, ilustração, página Transparência, painel administrativo, correções de alto contraste) — Home 100/100/100/100 (Performance/Acessibilidade/Boas Práticas/SEO), Contato 96/100/100/100, Transparência 97/100/100/100. Nenhuma regressão em relação à auditoria anterior.

### Etapa 8 - Ajustes Finais e Entrega (15h, 15h presenciais)
Ajustes finais de conteúdo e estilo aplicados com base na verificação da Etapa 7. Entrega do código-fonte completo (pasta `site/`) à instituição parceira, com orientações básicas de manutenção descritas no `README.md` da raiz do projeto.

### Etapa 9 - Relatório e Paper (15h, 5h presenciais)
Elaboração deste relatório e do paper acadêmico (`docs/paper-academico.md`), documentando todo o processo de desenvolvimento.

## 3. Resultados obtidos

- Site funcional com 7 páginas, cobrindo informação, legislação, canais de denúncia e rede de apoio.
- Documentação completa do processo de design (planejamento → requisitos → protótipos → implementação).
- Código-fonte organizado e pronto para entrega/manutenção pela instituição parceira.

## 4. Considerações finais

O projeto atingiu o objetivo de disponibilizar informações e instruções normativas sobre violência doméstica de forma acessível, com atenção especial à segurança digital das vítimas (botão de saída rápida). A parceria com a instituição de assistência social ao longo do levantamento de requisitos garantiu que o conteúdo refletisse necessidades reais da rede de proteção.

## 5. Observação sobre itens não gerados neste documento

Conforme a tabela de atividades do edital, os seguintes itens são de responsabilidade pessoal do estudante e **não podem ser produzidos por terceiros**:
- **Registro fotográfico** da visita/contato com a instituição (Atividade 1) - documento obrigatório.
- Preenchimento do **Registro de Frequência** (Atividade 31) - documento obrigatório, modelo em `docs/ficha-de-frequencia.md`.
- Preenchimento da autoavaliação e envio do link de avaliação da comunidade (Atividade 31).

Antes de iniciar a atividade com a instituição real, o edital exige confirmar que ela possui **CNPJ e carimbo**, obter autorização formal e garantir um responsável que acompanhe a execução (ver `docs/termo-de-parceria.md`).

Este relatório cobre o conteúdo técnico e metodológico do projeto; os itens acima devem ser completados diretamente pelo estudante no Ambiente Virtual de Aprendizagem.
