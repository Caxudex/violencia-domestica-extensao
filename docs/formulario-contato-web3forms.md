# Formulário de Contato — Web3Forms (Modelo)

## Por que este documento existe

O formulário de Contato (`site/contato.html`) hoje só simula um envio (sem backend — RNF05). Para que as mensagens cheguem de verdade a um e-mail real, usamos o **Web3Forms**, um serviço gratuito que recebe o envio do formulário via `fetch` e encaminha por e-mail, sem exigir conta completa nem cartão de crédito.

## Passo a passo

1. Acesse [web3forms.com](https://web3forms.com).
2. Informe o e-mail que deve receber as mensagens (ex.: o e-mail institucional da Prefeitura, `recepcao.gabinete@indaial.sc.gov.br`, ou o seu durante os testes).
3. Você recebe uma **Access Key** (chave de acesso) por e-mail — confirme o e-mail para ativar.
4. Copie a Access Key.
5. Abra `site/contato.html` e substitua `SUBSTITUA_PELA_SUA_CHAVE_WEB3FORMS` (no campo oculto `access_key` do formulário) pela chave real.
6. Pronto — não precisa mudar mais nada no código. O `site/js/main.js` já está preparado para enviar para a API do Web3Forms.

## Como testar

1. Rode o site localmente (`scripts/iniciar-site.ps1`) e acesse a página Contato.
2. Preencha e envie o formulário.
3. Confira a caixa de entrada do e-mail cadastrado — a mensagem deve chegar em poucos segundos.

## Limites do plano gratuito

250 envios por mês, suficiente para um site institucional deste porte. Se precisar de mais, o Web3Forms tem planos pagos.

## Status

✅ **Configurado.** Chave de acesso cadastrada com o e-mail `felippeluizmenin@gmail.com` e já colada em `site/contato.html`. Teste automatizado via terminal foi bloqueado pela proteção anti-bot da Cloudflare do Web3Forms (esperado — só libera tráfego de navegador real); confirmação final feita manualmente pelo estudante, preenchendo o formulário no navegador.

Quando a instituição parceira for confirmada oficialmente, considere recriar a chave com o e-mail institucional (`recepcao.gabinete@indaial.sc.gov.br`) em vez do e-mail pessoal usado nos testes.
