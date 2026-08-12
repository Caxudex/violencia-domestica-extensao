# Painel Administrativo (Decap CMS)

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
- `site/js/main.js` (função `setupInstitutionContent`) — todas as páginas leem esse JSON e atualizam automaticamente a barra do topo, o rodapé, e as páginas Contato e Sobre. Os valores reais também já estão escritos direto no HTML como reserva, então o site funciona normalmente mesmo se esse arquivo falhar ao carregar.

## Passo a passo (só quem tem acesso às contas pode fazer)

O projeto Netlify `incomparable-toffee-9df996` já foi criado e conectado ao GitHub. Falta:

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

O painel não cria nenhum privilégio novo: qualquer pessoa com acesso de escrita ao repositório já poderia editar esses arquivos direto pelo GitHub. O Client Secret fica só nas variáveis de ambiente do Netlify (nunca no código do site), e o Decap CMS só consegue editar exatamente os campos definidos em `site/admin/config.yml` — hoje, só os dados da instituição.

## Ampliando o que é editável

Hoje só `site/content/institution.json` é editável pelo painel. Se fizer sentido, o mesmo padrão pode ser estendido para outros textos que mudam com frequência (ex.: números de emergência, texto da Home) — é só criar um novo arquivo de dados, marcar os elementos correspondentes no HTML com `data-institution="campo"` e adicionar o campo em `config.yml`. Avise se quiser que eu faça isso para outra parte do site.
