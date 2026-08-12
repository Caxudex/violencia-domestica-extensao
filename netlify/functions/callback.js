// Passo 2 do login do painel administrativo (Decap CMS): o GitHub redireciona
// para cá com um "code" de autorização; trocamos esse code por um token de
// acesso e entregamos ao painel via postMessage (protocolo de OAuth client
// customizado do Decap CMS - https://decapcms.org/docs/custom-oauth-client/).
exports.handler = async (event) => {
  const { code, error, error_description: errorDescription } = event.queryStringParameters || {};

  if (error) {
    return htmlResponse(renderError(error, errorDescription || ""));
  }
  if (!code) {
    return htmlResponse(renderError("missing_code", "Nenhum código de autorização recebido do GitHub."));
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return htmlResponse(
      renderError("missing_config", "OAUTH_CLIENT_ID/OAUTH_CLIENT_SECRET não configurados nas variáveis de ambiente do Netlify.")
    );
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await tokenResponse.json();

    if (data.error) {
      return htmlResponse(renderError(data.error, data.error_description || ""));
    }

    return htmlResponse(renderSuccess(data.access_token));
  } catch (err) {
    return htmlResponse(renderError("exchange_failed", String(err)));
  }
};

function htmlResponse(body) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body,
  };
}

function renderSuccess(token) {
  const payload = JSON.stringify({ token: token, provider: "github" });
  return (
    "<!DOCTYPE html><html><body><p>Login concluído. Pode fechar esta janela.</p><script>" +
    "(function() {" +
    "function receiveMessage(e) {" +
    "window.opener.postMessage('authorization:github:success:" + payload.replace(/'/g, "\\'") + "', e.origin);" +
    'window.removeEventListener("message", receiveMessage, false);' +
    "}" +
    'window.addEventListener("message", receiveMessage, false);' +
    'window.opener.postMessage("authorizing:github", "*");' +
    "})();" +
    "</script></body></html>"
  );
}

function renderError(code, description) {
  var safeCode = String(code).replace(/</g, "&lt;");
  var safeDescription = String(description).replace(/</g, "&lt;");
  return (
    "<!DOCTYPE html><html><body><p>Falha no login: " + safeCode + " - " + safeDescription + "</p><script>" +
    "(function() {" +
    "function receiveMessage(e) {" +
    'window.opener.postMessage("authorization:github:error:' + safeCode + '", e.origin);' +
    'window.removeEventListener("message", receiveMessage, false);' +
    "}" +
    'window.addEventListener("message", receiveMessage, false);' +
    'window.opener.postMessage("authorizing:github", "*");' +
    "})();" +
    "</script></body></html>"
  );
}
