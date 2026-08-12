# Painel Administrativo (Decap CMS)

## Status

✅ **Configurado e testado de ponta a ponta** (12/08/2026): login via GitHub OAuth funcionando, edição publicada gerou commit real no repositório (`68ba6d7`, corrigido em seguida por `18d0e81`), e o arquivo `site/content/institution.json` atualizou corretamente. Acesso: `https://caxudex.github.io/violencia-domestica-extensao/admin/`.

Escopo ampliado no mesmo dia com a coleção "Conteúdo geral do site" (`site/content/site.json`: hero da Home + descrições dos números de emergência), usando o mesmo mecanismo já testado.

## Por que o escopo é limitado (e não o site inteiro)

O edital não exige um CMS completo — ele só pede para "desenvolver o site" (WordPress é citado como exemplo de ferramenta possível, não obrigação; ver justificativa da escolha tecnológica em `docs/relatorio-final.md`, Etapa 6) e, na entrega (Etapa 8), passar o código-fonte com orientações básicas de manutenção. Dentro disso, o painel cobre duas coleções, escolhidas pelo mesmo critério:

- **Instituição parceira** (`site/content/institution.json`): nome, endereço, telefone, e-mail, horário, status da parceria, texto sobre a parceria.
- **Conteúdo geral do site** (`site/content/site.json`): título/texto do hero da Home e as descrições (não os números) do Disque 180/190/Ligue 100.

Ambas reúnem dados que:

- **Mudam de verdade** ao longo do tempo (telefone, endereço, situação da parceria, texto de apresentação).
- **São de baixo risco ou críticos de estarem certos** — um contato errado numa página de apoio a vítimas de violência doméstica é um risco real, não só estético; já o texto do hero é só apresentação, sem carga normativa.

Conteúdo normativo (Legislação, Tipos de Violência, Como Denunciar, e os **números** de emergência em si) fica **fora** do painel de propósito: é referência legal (Lei Maria da Penha, ECA etc.) ou informação de segurança que não deveria ser editável livremente sem revisão — um erro ali é risco jurídico/de informação. Esse conteúdo continua sob controle de código, revisado como qualquer outra mudança no repositório.

O padrão (`data-institution="campo"` / `data-site="campo"` + `site/content/*.json` + coleção em `config.yml`) é reaproveitável caso surja necessidade real de tornar mais algum campo editável — não é preciso redesenhar nada, só estender (ver "Ampliando o que é editável" abaixo).

## Por que Decap CMS em vez de WordPress

O edital cita o WordPress apenas como exemplo ("pode-se utilizar do CMS WordPress ou desenvolver com base em outra tecnologia que se sinta à vontade"). Como o site é estático (RNF05, `docs/04-especificacao-requisitos.md`), o Decap CMS foi escolhido porque:

- Dá um **painel de login real**, com formulários amigáveis — não é preciso editar HTML.
- Continua sem servidor/banco de dados próprio: cada edição feita no painel vira um **commit no repositório**, versionado e reversível (diferente do WordPress, onde o conteúdo fica só num banco de dados).
- Não introduz a manutenção de plugins/segurança que o WordPress exigiria (Wordfence, atualizações, etc.).
- O site publicado no GitHub Pages continua exatamente como está — o Netlify só entra para fornecer o login do painel, não substitui a hospedagem atual.

> **Histórico:** a primeira tentativa foi usar Netlify Identity + Git Gateway (login pronto, sem escrever código de autenticação). Não deu certo porque a Netlify **descontinuou o Identity para projetos novos** — não existe mais essa opção no painel deles. Por isso o caminho atual usa um GitHub OAuth App + duas pequenas funções de login (`netlify/functions/auth.js` e `callback.js`), hospedadas de graça no mesmo projeto Netlify.

## O que já está pronto neste repositório

- `site/admin/index.html` + `site/admin/config.yml` — a página do painel, configurada com `backend: github` e `base_url` apontando para o site Netlify.
- `netlify/functions/auth.js` e `netlify/functions/callback.js` — implementam a troca de login com o GitHub (protocolo padrão do Decap CMS para "Custom OAuth Client").
- `netlify.toml` — publica a pasta `site/` e expõe essas funções nas rotas `/auth` e `/callback`.
- `site/content/institution.json` — os dados que o painel edita: nome da instituição, nome curto, endereço, telefone, e-mail, horário e o texto sobre a parceria.
- `site/content/site.json` — título/texto do hero da Home e as descrições dos números de emergência.
- `site/js/main.js` (função `loadJsonContent`, usada por `setupInstitutionContent` e `setupSiteContent`) — todas as páginas leem esses JSONs e atualizam automaticamente a barra do topo, o rodapé, as páginas Contato e Sobre, e a Home/404. Os valores reais também já estão escritos direto no HTML como reserva, então o site funciona normalmente mesmo se o fetch falhar.

## Passo a passo (concluído — mantido como referência)

O projeto Netlify `incomparable-toffee-9df996` já foi criado e conectado ao GitHub, e todos os passos abaixo já foram concluídos e testados. Fica documentado caso seja preciso recriar o login em outro projeto/domínio no futuro.

1. **Corrigir o "Publish directory"** — hoje a raiz do site Netlify está dando 404. Vá em Project configuration → Build & deploy → Continuous deployment (ou "Build settings") → confira/edite o campo **"Publish directory"** para `site` → salve → em "Deploys", clique em "Trigger deploy" → "Deploy site". Depois disso, `https://incomparable-toffee-9df996.netlify.app/` deve mostrar a Home do site normalmente.

2. **Criar um GitHub OAuth App**: GitHub → clique na sua foto de perfil → Settings → Developer settings (no fim do menu) → OAuth Apps → "New OAuth App".
   - Application name: `IndaCity Admin` (ou o nome que preferir).
   - Homepage URL: `https://incomparable-toffee-9df996.netlify.app`
   - Authorization callback URL: `https://incomparable-toffee-9df996.netlify.app/callback`
   - Clique em "Register application", depois em "Generate a new client secret".
   - Guarde o **Client ID** e o **Client Secret** gerados (o secret só aparece uma vez).

3. **Configurar as variáveis de ambiente no Netlify**: no projeto `incomparable-toffee-9df996` → Project configuration → Environment variables → "Add a variable" (duas vezes):
   - `OAUTH_CLIENT_ID` = o Client ID do passo 2.
   - `OAUTH_CLIENT_SECRET` = o Client Secret do passo 2.
   - Depois de salvar, faça um novo deploy (Deploys → Trigger deploy) para as funções pegarem as variáveis novas.

4. **Garantir acesso de escrita ao repositório**: o login usa as permissões do próprio GitHub — quem for logar no painel (você, e opcionalmente alguém do CREAS) precisa ser dono ou colaborador com permissão de escrita no repositório `Caxudex/violencia-domestica-extensao`.

5. **Testar**: acesse `https://caxudex.github.io/violencia-domestica-extensao/admin/` (o painel funciona a partir do GitHub Pages normalmente — só o login passa pelo Netlify), clique em "Login with GitHub", autorize o app, e confira se o formulário "Dados de contato e parceria" abre com os dados atuais. Faça uma edição de teste, publique, e confirme que apareceu um novo commit no repositório e que o site publicado atualizou em seguida.

Me avisa depois de cada passo (ou manda print se travar) — os passos 1 a 4 só podem ser feitos por quem tem acesso às contas do GitHub e da Netlify.

## Nota de segurança

O painel não cria nenhum privilégio novo: qualquer pessoa com acesso de escrita ao repositório já poderia editar esses arquivos direto pelo GitHub. O Client Secret fica só nas variáveis de ambiente do Netlify (nunca no código do site), e o Decap CMS só consegue editar exatamente os campos definidos em `site/admin/config.yml` — hoje, os dados da instituição e o conteúdo geral descrito acima.

## Ampliando o que é editável

O padrão está pronto para reaproveitar: criar um novo arquivo em `site/content/*.json`, marcar os elementos correspondentes no HTML com `data-{prefixo}="campo"` (ou `data-{prefixo}-href="tel:campo"` para links), chamar `loadJsonContent("content/arquivo.json", "prefixo")` numa nova função em `site/js/main.js`, e adicionar a coleção em `config.yml`. Avise se quiser que eu faça isso para outra parte do site.
