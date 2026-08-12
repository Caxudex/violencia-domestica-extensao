// Passo 1 do login do painel administrativo (Decap CMS): redireciona para a
// tela de autorização do GitHub. Precisa das variáveis de ambiente
// OAUTH_CLIENT_ID e OAUTH_CLIENT_SECRET configuradas no painel do Netlify
// (Project configuration > Environment variables) — ver
// docs/painel-admin-decap-cms.md.
exports.handler = async (event) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    return {
      statusCode: 500,
      body: "OAUTH_CLIENT_ID não configurado nas variáveis de ambiente do Netlify.",
    };
  }

  const siteUrl = process.env.URL || `https://${event.headers.host}`;
  const redirectUri = `${siteUrl}/callback`;
  const authorizeUrl =
    "https://github.com/login/oauth/authorize" +
    `?client_id=${encodeURIComponent(clientId)}` +
    "&scope=repo,user" +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return {
    statusCode: 302,
    headers: { Location: authorizeUrl },
  };
};
