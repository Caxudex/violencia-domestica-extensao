# Site sobre Enfrentamento à Violência Doméstica

Projeto de extensão universitária: um site de conscientização e combate à violência doméstica, desenvolvido em parceria com a **Secretaria de Assistência Social de Timbó** (veja `docs/termo-de-parceria.md`).

## Status do projeto

O site está pronto, testado e publicado. No Lighthouse, a nota fica entre 96 e 100 em Performance, e em 100 em Acessibilidade, Boas Práticas e SEO. Todas as etapas técnicas (1 a 9) estão documentadas em `docs/`.

O que ainda depende de uma ação pessoal do estudante, fora do código, está listado em [`docs/checklist-atividades.md`](docs/checklist-atividades.md), com a tabela oficial de acompanhamento em [`docs/status-atividades-oficial.md`](docs/status-atividades-oficial.md).

## Estrutura do repositório

```
docs/       Documentação do processo (etapas 1 a 9) e documentos de apoio à submissão
site/       Código-fonte do site (HTML, CSS e JS estático)
netlify/    Funções serverless usadas pelo painel administrativo
```

## Como rodar o site

O site é estático, sem backend. É só abrir `site/index.html` diretamente no navegador.

## Documentação do processo (etapas 1 a 9)

| Documento | Conteúdo |
|---|---|
| `docs/01-planejamento-pesquisa.md` | Etapa 1: pesquisa bibliográfica, parceria e cronograma |
| `docs/02-levantamento-informacoes.md` | Etapa 2: levantamento de necessidades com especialistas, com [Google Form real](https://docs.google.com/forms/d/e/1FAIpQLSfA6eaO5LOXyTP2DMPiCTXPM-f6n1N9j48hNhtiEX1L6mhgHg/viewform) |
| `docs/03-prototipacao-baixa-fidelidade.md` | Etapa 3: wireframes |
| `docs/04-especificacao-requisitos.md` | Etapa 4: requisitos funcionais e não funcionais |
| `docs/05-prototipacao-alta-fidelidade.md` | Etapa 5: paleta de cores, tipografia, componentes |
| `docs/relatorio-final.md` | Etapa 9: relatório detalhado do projeto |
| `docs/paper-academico.md` | Etapa 9: paper acadêmico |

A documentação do processo não é mais publicada no site (isso foi uma decisão do projeto). Ela existe só aqui no repositório; o site publicado é 100% conteúdo voltado ao público.

## Documentos de apoio à submissão

| Documento | Para que serve |
|---|---|
| `docs/termo-de-parceria.md` | Modelo de termo de parceria e carta de aceite institucional, já com os dados reais do CREAS de Timbó |
| `docs/declaracao-pertinencia-creas.md` | Transcrição da Declaração de Pertinência e Relevância Social recebida do CREAS de Timbó (12/08/2026) |
| `docs/ficha-de-frequencia.md` | Modelo de registro/ficha de frequência com as 31 atividades e carga horária do edital |
| `docs/checklist-atividades.md` | Checklist das 31 atividades do edital, mostrando o que já está pronto e o que depende de ação pessoal do estudante |
| `docs/status-atividades-oficial.md` | Tabela no formato oficial do edital (atividade, carga horária, finalizado), pronta para copiar no AVA |
| `docs/formulario-avaliacao-comunidade.md` | Guia para criar o Google Form de avaliação da comunidade (Atividade 31), embutido em `site/participe.html` |
| `docs/formulario-contato-web3forms.md` | Guia do Web3Forms usado no formulário de Contato (já configurado e testado) |
| `docs/painel-admin-decap-cms.md` | Guia do painel administrativo (Decap CMS) para editar os dados da instituição sem mexer em código |

## Página "Participe": alcance e avaliação da comunidade

[`site/participe.html`](site/participe.html) é uma página pública com um formulário (Google Forms embutido) para visitantes avaliarem o site. Ela serve tanto para ampliar o alcance do projeto quanto como evidência da Atividade 31 do edital ("envio de link para a avaliação da comunidade").

**Pendente:** o `<iframe>` da página ainda está com um link de exemplo. Siga `docs/formulario-avaliacao-comunidade.md` para criar o formulário real e substituir o link.

## Painel administrativo

[`site/admin/`](site/admin/index.html) é um painel (Decap CMS) que permite editar os dados da instituição e o conteúdo geral do site (45 campos) sem mexer em código. As mudanças viram commits neste repositório e o site publicado atualiza sozinho. O login via GitHub OAuth já está configurado e testado de ponta a ponta. Detalhes em `docs/painel-admin-decap-cms.md`.

## Manutenção futura

O site não depende de servidor, banco de dados ou build tools. Qualquer edição pode ser feita diretamente nos arquivos `.html`, `css/style.css` e `js/main.js` dentro de `site/`, ou pelo painel administrativo, para os dados da instituição. Para adicionar uma nova página, copie a estrutura de header e footer de uma página existente (por exemplo `sobre.html`) e ajuste o conteúdo e o link `aria-current="page"` no menu.

## Observação sobre a entrega da atividade extensionista

Este repositório cobre a documentação técnica e o código do site. Itens de responsabilidade pessoal do estudante, como o registro fotográfico da visita à instituição, a assinatura da ficha de frequência, a autoavaliação e o envio do link de avaliação da comunidade no Ambiente Virtual de Aprendizagem, não são gerados aqui e devem ser preenchidos separadamente. Veja a lista completa em [`docs/checklist-atividades.md`](docs/checklist-atividades.md).

O pacote final de submissão (relatório, paper, termo de parceria, ficha de frequência, declaração do CREAS e tabela oficial de status, organizados e mapeados às 31 atividades do edital) fica em `submissao-ava/`, mantido apenas localmente e fora do controle de versão.
