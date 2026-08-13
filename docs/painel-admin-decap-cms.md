# Painel Administrativo (Decap CMS)

## Status

✅ **Configurado e testado de ponta a ponta**: login via GitHub OAuth funcionando, edição publicada gera commit real no repositório, e o site atualiza automaticamente em seguida. Acesso: `https://caxudex.github.io/violencia-domestica-extensao/admin/`.

Cobre hoje **45 campos** em duas coleções: dados da instituição parceira (nome, endereço, telefone, e-mail, horário, status da parceria) e conteúdo geral do site (hero de cada página, cards descritivos de apresentação, rodapé).

## Por que o escopo é limitado (e não o site inteiro)

O edital não exige um CMS completo — ele só pede para "desenvolver o site" (WordPress é citado como exemplo de ferramenta possível, não obrigação; ver justificativa da escolha tecnológica em `docs/relatorio-final.md`, Etapa 6). Dentro disso, o painel edita apenas dados que **mudam de verdade** e são **de baixo risco ou críticos de estarem certos** (contato, apresentação) — nunca conteúdo normativo.

Fica **fora** do painel de propósito:

- Os **números** de emergência em si (180/190/100) e seus links `tel:`.
- Os resumos das leis em Legislação, as definições legais dos tipos de violência e a citação acadêmica em Tipos de Violência.
- O passo a passo de solicitação de medida protetiva em Como Denunciar (contém prazo estatutário de 48h).
- As definições de CRAS/CREAS em Rede de Apoio (mandato legal de instituições públicas reais).
- A página inteira de Segurança Digital (conteúdo de segurança, não de apresentação).

É referência legal/normativa ou informação de segurança que não deveria ser editável livremente sem revisão. Esse conteúdo continua sob controle de código, revisado como qualquer outra mudança no repositório.

## Por que Decap CMS em vez de WordPress

Como o site é estático (RNF05, `docs/04-especificacao-requisitos.md`), o Decap CMS foi escolhido porque dá um painel de login real sem precisar de servidor/banco de dados próprio (cada edição vira um commit versionado), sem a manutenção de plugins/segurança que o WordPress exigiria, e sem alterar a hospedagem atual no GitHub Pages.

O login usa um GitHub OAuth App combinado com duas funções pequenas (`netlify/functions/auth.js` e `callback.js`) hospedadas de graça num projeto Netlify — o Netlify entra só para viabilizar o login, não hospeda o site em si.

## Nota de segurança

O painel não cria nenhum privilégio novo: qualquer pessoa com acesso de escrita ao repositório já poderia editar esses arquivos direto pelo GitHub. O Client Secret do OAuth fica só em variáveis de ambiente da Netlify — nunca no código do site. O Decap CMS só consegue editar exatamente os campos definidos em `site/admin/config.yml`.

## Ampliando o que é editável

O padrão está pronto para reaproveitar: criar um novo arquivo em `site/content/*.json`, marcar os elementos correspondentes no HTML com `data-{prefixo}="campo"`, chamar `loadJsonContent("content/arquivo.json", "prefixo")` numa nova função em `site/js/main.js`, e adicionar a coleção em `config.yml`. Avise se quiser que eu faça isso para outra parte do site.
