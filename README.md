# Site sobre Enfrentamento à Violência Doméstica

Projeto de extensão universitária: site de conscientização e combate à violência doméstica, desenvolvido com a **Secretaria de Assistência Social de Timbó** como instituição concedente de referência (parceria em processo de formalização - ver `docs/termo-de-parceria.md`).

## Status do projeto

Todas as etapas técnicas (1 a 9) estão documentadas e o site está implementado, testado e publicado (Lighthouse: Performance 96–100/100, Acessibilidade/Boas Práticas/SEO 100/100). Itens que ainda exigem ação pessoal do estudante antes da submissão final estão listados em [`docs/checklist-atividades.md`](docs/checklist-atividades.md), com a tabela oficial de acompanhamento (Atividade/CH/Finalizado) em [`docs/status-atividades-oficial.md`](docs/status-atividades-oficial.md).

## Estrutura do repositório

```
docs/       Documentação do processo (Etapas 1-9) e documentos de submissão
scripts/    Scripts para configurar e rodar o site localmente
site/       Código-fonte do site (HTML/CSS/JS estático)
```

## Como rodar o site

O site é estático (sem backend). Formas de rodar:

- **Mais simples:** dê duplo clique em [`scripts/iniciar-site.bat`](scripts/iniciar-site.bat) - abre o site automaticamente no navegador.
- **PowerShell:** `.\scripts\iniciar-site.ps1` (aceita `-Port` para trocar a porta). Veja [`scripts/README.md`](scripts/README.md) para detalhes.
- **Manual:** abra `site/index.html` diretamente no navegador.

## Documentação do processo (Etapas 1-9)

| Documento | Conteúdo |
|---|---|
| `docs/01-planejamento-pesquisa.md` | Etapa 1 - pesquisa bibliográfica, parceria e cronograma |
| `docs/02-levantamento-informacoes.md` | Etapa 2 - levantamento de necessidades com especialistas, com [Google Form real](https://docs.google.com/forms/d/e/1FAIpQLSfA6eaO5LOXyTP2DMPiCTXPM-f6n1N9j48hNhtiEX1L6mhgHg/viewform) |
| `docs/03-prototipacao-baixa-fidelidade.md` | Etapa 3 - wireframes |
| `docs/04-especificacao-requisitos.md` | Etapa 4 - requisitos funcionais e não funcionais |
| `docs/05-prototipacao-alta-fidelidade.md` | Etapa 5 - paleta de cores, tipografia, componentes |
| `docs/relatorio-final.md` | Etapa 9 - relatório detalhado do projeto |
| `docs/paper-academico.md` | Etapa 9 - paper acadêmico |

A documentação do processo não é mais publicada no site (removida por decisão de projeto - só existe aqui no repositório); o site publicado é 100% conteúdo voltado ao público.

## Documentos de apoio à submissão

| Documento | Para que serve |
|---|---|
| `docs/termo-de-parceria.md` | Modelo de termo de parceria/carta de aceite institucional, com os dados reais do CREAS de Timbó já preenchidos |
| `docs/declaracao-pertinencia-creas.md` | Transcrição da Declaração de Pertinência e Relevância Social recebida do CREAS de Timbó (12/08/2026) |
| `docs/ficha-de-frequencia.md` | Modelo de Registro/Ficha de Frequência com as 31 atividades e carga horária do edital |
| `docs/checklist-atividades.md` | Checklist das 31 atividades do edital, indicando o que já está pronto e o que depende de ação pessoal do estudante |
| `docs/status-atividades-oficial.md` | Tabela no formato oficial do edital (Atividade/CH/Finalizado), pronta para copiar no AVA |
| `docs/formulario-avaliacao-comunidade.md` | Guia para criar o Google Form de avaliação da comunidade (Atividade 31), embutido em `site/participe.html` |
| `docs/formulario-contato-web3forms.md` | Guia do Web3Forms usado no formulário de Contato (já configurado e testado) |
| `docs/painel-admin-decap-cms.md` | Guia do painel administrativo (Decap CMS) para editar os dados da instituição sem mexer em código |

## Página "Participe" - alcance e avaliação da comunidade

[`site/participe.html`](site/participe.html) é uma página pública com um formulário (Google Forms embutido) para visitantes avaliarem o site - usada tanto para ampliar o alcance do projeto quanto como evidência da Atividade 31 do edital ("envio de link para a avaliação da comunidade"). **Pendente:** o `<iframe>` na página ainda está com um link de exemplo - siga `docs/formulario-avaliacao-comunidade.md` para criar o formulário real e substituir o link.

## Painel administrativo

[`site/admin/`](site/admin/index.html) é um painel (Decap CMS) para editar os dados da instituição (nome, endereço, telefone, e-mail, texto da parceria) sem mexer em código — as mudanças viram commits neste repositório e o site publicado atualiza sozinho. **Pendente:** falta ativar o login (Netlify Identity + Git Gateway), passo que só pode ser feito por quem tem acesso às contas do GitHub/Netlify - siga `docs/painel-admin-decap-cms.md`.

## Manutenção futura

O site não depende de servidor, banco de dados ou build tools - qualquer edição pode ser feita diretamente nos arquivos `.html`, `css/style.css` e `js/main.js` dentro de `site/`, ou pelo painel administrativo acima para os dados da instituição. Para adicionar uma nova página, copie a estrutura de header/footer de uma página existente (ex.: `sobre.html`) e ajuste o conteúdo e o link `aria-current="page"` no menu.

## Observação sobre a entrega da atividade extensionista

Este repositório cobre a documentação técnica e o código do site. Itens de responsabilidade pessoal do estudante - registro fotográfico da visita à instituição, assinatura da ficha de frequência, autoavaliação e envio do link de avaliação da comunidade no Ambiente Virtual de Aprendizagem - não são gerados aqui e devem ser preenchidos separadamente. Veja a lista completa em [`docs/checklist-atividades.md`](docs/checklist-atividades.md).
