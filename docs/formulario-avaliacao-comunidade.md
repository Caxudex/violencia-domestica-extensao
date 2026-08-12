# Formulário de Avaliação da Comunidade (Google Forms)

## Por que este documento existe

O site é estático (HTML/CSS/JS, sem backend - RNF05), então ele sozinho não consegue **salvar** respostas de um formulário. Para que o formulário de avaliação/participação tenha respostas reais (e sirva como evidência para a **Atividade 31** do edital - "envio de link para a avaliação da comunidade"), usamos o **Google Forms**, que o próprio edital já sugere como ferramenta de coleta de dados (Etapa 2). As respostas ficam automaticamente organizadas numa planilha Google Sheets vinculada ao formulário.

Este documento é um guia para você (o estudante) criar o formulário real. Depois de criado, é só colar o link/código de incorporação no lugar indicado em `site/participe.html`.

## Passo a passo

1. Acesse [forms.google.com](https://forms.google.com) com uma conta Google e clique em **Formulário em branco**.
2. Título sugerido: **"Avaliação da Comunidade - Site sobre Enfrentamento à Violência Doméstica"**.
3. Descrição sugerida: *"Este formulário faz parte de uma atividade de extensão universitária. Sua participação é opcional e ajuda a avaliar o alcance e a utilidade deste site."*
4. Adicione os campos sugeridos (ver seção abaixo).
5. Em **Configurações** (ícone de engrenagem): NÃO marque "Limitar a 1 resposta" nem "Coletar e-mails automaticamente" (para preservar o anonimato de quem não quiser se identificar).
6. Clique em **Enviar** (canto superior direito) → aba **Incorporar** (`<>`) → copie o código `<iframe>` gerado.
7. Abra `site/participe.html` neste repositório e substitua o `<iframe>` de exemplo pelo código copiado (mantenha `width="100%"` para preservar a responsividade).
8. Para consultar as respostas: no próprio Google Forms, aba **Respostas** → ícone verde de planilha, que abre um Google Sheets com todas as submissões - pode ser anexado como evidência no relatório final.
9. Copie também o **link direto** do formulário (aba Enviar → ícone de link) - esse é o link que deve ser enviado como "avaliação da comunidade" na Atividade 31 do edital.

## Campos sugeridos para o formulário

| Campo | Tipo | Obrigatório? |
|---|---|---|
| Nome (opcional - preencha se quiser registro formal de participação) | Resposta curta | Não |
| Instituição/Organização que você representa (opcional) | Resposta curta | Não |
| Cargo/Função (opcional) | Resposta curta | Não |
| Como você chegou até este site? | Múltipla escolha (rede social, indicação, busca, instituição parceira, outro) | Não |
| As informações do site foram úteis? | Escala linear (1 a 5) | Sim |
| O site é fácil de navegar e entender? | Escala linear (1 a 5) | Sim |
| Você conhecia os canais de denúncia (180, 190, 100) antes de visitar o site? | Sim / Não / Parcialmente | Não |
| Sugestões ou comentários | Parágrafo | Não |
| Autorizo o uso desta resposta como avaliação da comunidade para fins de atividade extensionista acadêmica (de forma anônima, ou identificada se nome/instituição forem informados) | Caixa de seleção (deve ser marcada para enviar) | Sim |

## Registro de Participação Institucional

Os campos "Instituição/Organização" e "Cargo/Função" são o que diferencia uma resposta **anônima** (útil para medir alcance geral) de uma resposta que vira **evidência formal de participação institucional** - por exemplo, um profissional do CREAS, de uma ONG parceira ou da Polícia Civil/Militar que queira que sua participação conste documentada no relatório apresentado à instituição de ensino e à instituição parceira.

Na página `site/participe.html`, a seção "Registro de Participação Institucional" explica isso ao visitante antes de ele preencher o formulário. Como a planilha do Google Sheets registra data e hora automaticamente em cada resposta, não é preciso adicionar um campo manual de data.

Para gerar a lista de participantes institucionais para o relatório: abra a planilha de respostas (Google Forms → aba Respostas → ícone de planilha), filtre as linhas em que "Instituição/Organização" não está em branco, e exporte essas linhas (ex.: PDF ou CSV) para anexar como evidência.

## Contador de participantes na página Participe (opcional)

A página `site/participe.html` tem um contador ("X pessoas já avaliaram o site") que fica **oculto até ser configurado**. Para ativá-lo:

1. Abra a planilha de respostas do formulário (Google Forms → aba Respostas → ícone de planilha, abre o Google Sheets).
2. No Sheets, vá em **Arquivo → Compartilhar → Publicar na web**.
3. Selecione a aba com as respostas e o formato **CSV**, depois clique em **Publicar**.
4. Copie o link gerado (algo como `https://docs.google.com/spreadsheets/d/e/.../pub?output=csv`).
5. Abra `site/participe.html` e substitua `SUBSTITUA_PELA_URL_CSV_PUBLICADA` (no atributo `data-csv-url` do elemento `#participant-counter`) por esse link.

O contador (implementado em `site/js/main.js`, função `setupParticipantCounter`) busca esse CSV via `fetch` e mostra **dois números**: o total de respostas ("X pessoas avaliaram o site") e, separadamente, quantas delas preencheram o campo "Instituição/Organização" ("Y com presença institucional registrada") - nenhuma outra alteração de código é necessária, desde que o campo do formulário continue com "Instituição" no nome (é assim que o script encontra a coluna certa na planilha). Enquanto o link não for configurado, o contador simplesmente permanece invisível, sem quebrar a página.

**Atenção de privacidade:** publicar a planilha "na web" a torna acessível a qualquer pessoa com o link, incluindo todas as respostas (nomes e instituições informados). Se isso for uma preocupação, publique apenas as colunas de avaliação (sem nome/instituição) numa aba separada, ou pule esta funcionalidade - ela é opcional.

## Observação sobre privacidade (LGPD)

Como o formulário é público e pode coletar dados pessoais (nome, instituição, cargo, se informados), recomenda-se:
- Manter os campos "Nome", "Instituição/Organização" e "Cargo/Função" **opcionais** - só quem quer registro formal os preenche.
- Incluir a checkbox de consentimento listada acima como campo obrigatório.
- Nunca publicar respostas individuais identificáveis no relatório final além do que a pessoa explicitamente autorizou - reportar o restante apenas de forma agregada (ex.: "80% avaliaram o site como muito útil").
- Caso a instituição parceira solicite, é possível desativar a coleta de e-mails nas configurações do Google Forms para reforçar o anonimato.

## Widget de avaliação rápida nas páginas de conteúdo

Além do formulário completo em `site/participe.html`, cada página de conteúdo (Sobre, Tipos de Violência, Legislação, Como Denunciar, Rede de Apoio) agora exibe um pequeno widget "Esta informação foi útil? Sim / Não" no rodapé, implementado em `site/js/main.js` (função `setupFeedbackWidget`). Ele existe para capturar feedback rápido sem exigir que a pessoa saia da página.

**Limitação atual:** como o site é estático, esse widget hoje só salva a resposta localmente no navegador da pessoa (`localStorage`), apenas para não perguntar de novo na mesma página - a resposta **não é enviada a lugar nenhum** ainda. Depois que o Google Form real de `site/participe.html` estiver pronto, é possível conectar os cliques desse widget a ele (submissão via `fetch` com `mode: "no-cors"` para a URL de submissão do Forms, usando os IDs de campo `entry.XXXXXXX` do formulário), registrando também qual página gerou a resposta. Essa conexão fica pendente até o formulário real existir.

## Status

⚠️ **Pendente:** este documento descreve como criar o formulário, mas o formulário em si precisa ser criado manualmente pelo estudante (requer login numa conta Google). Após criá-lo, atualize:
1. O `<iframe>` em `site/participe.html` com o código de incorporação real.
2. O link direto do formulário, para envio na Atividade 31 do Ambiente Virtual de Aprendizagem.
3. O status desta atividade em `docs/checklist-atividades.md`.
4. (Opcional) Publicar a planilha como CSV e configurar o contador de participantes (`data-csv-url` em `site/participe.html`).
5. (Opcional) Conectar o widget de avaliação rápida das páginas de conteúdo ao formulário real, conforme descrito acima.
6. Quando houver respostas com instituição preenchida, exportar a lista de participação institucional para anexar ao relatório apresentado à instituição parceira e à universidade.
