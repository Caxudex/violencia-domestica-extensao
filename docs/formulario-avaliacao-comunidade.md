# Formulário de Avaliação da Comunidade (Google Forms)

## Por que este documento existe

O site é estático (HTML/CSS/JS, sem backend — RNF05), então ele sozinho não consegue **salvar** respostas de um formulário. Para que o formulário de avaliação/participação tenha respostas reais (e sirva como evidência para a **Atividade 31** do edital — "envio de link para a avaliação da comunidade"), usamos o **Google Forms**, que o próprio edital já sugere como ferramenta de coleta de dados (Etapa 2). As respostas ficam automaticamente organizadas numa planilha Google Sheets vinculada ao formulário.

Este documento é um guia para você (o estudante) criar o formulário real. Depois de criado, é só colar o link/código de incorporação no lugar indicado em `site/participe.html`.

## Passo a passo

1. Acesse [forms.google.com](https://forms.google.com) com uma conta Google e clique em **Formulário em branco**.
2. Título sugerido: **"Avaliação da Comunidade — Site sobre Enfrentamento à Violência Doméstica"**.
3. Descrição sugerida: *"Este formulário faz parte de uma atividade de extensão universitária. Sua participação é opcional e ajuda a avaliar o alcance e a utilidade deste site."*
4. Adicione os campos sugeridos (ver seção abaixo).
5. Em **Configurações** (ícone de engrenagem): NÃO marque "Limitar a 1 resposta" nem "Coletar e-mails automaticamente" (para preservar o anonimato de quem não quiser se identificar).
6. Clique em **Enviar** (canto superior direito) → aba **Incorporar** (`<>`) → copie o código `<iframe>` gerado.
7. Abra `site/participe.html` neste repositório e substitua o `<iframe>` de exemplo pelo código copiado (mantenha `width="100%"` para preservar a responsividade).
8. Para consultar as respostas: no próprio Google Forms, aba **Respostas** → ícone verde de planilha, que abre um Google Sheets com todas as submissões — pode ser anexado como evidência no relatório final.
9. Copie também o **link direto** do formulário (aba Enviar → ícone de link) — esse é o link que deve ser enviado como "avaliação da comunidade" na Atividade 31 do edital.

## Campos sugeridos para o formulário

| Campo | Tipo | Obrigatório? |
|---|---|---|
| Nome (opcional, para fins de registro de participação) | Resposta curta | Não |
| Como você chegou até este site? | Múltipla escolha (rede social, indicação, busca, instituição parceira, outro) | Não |
| As informações do site foram úteis? | Escala linear (1 a 5) | Sim |
| O site é fácil de navegar e entender? | Escala linear (1 a 5) | Sim |
| Você conhecia os canais de denúncia (180, 190, 100) antes de visitar o site? | Sim / Não / Parcialmente | Não |
| Sugestões ou comentários | Parágrafo | Não |
| Autorizo o uso desta resposta, de forma anônima, como avaliação da comunidade para fins de atividade extensionista acadêmica | Caixa de seleção (deve ser marcada para enviar) | Sim |

## Observação sobre privacidade (LGPD)

Como o formulário é público e pode coletar dados pessoais (nome, se informado), recomenda-se:
- Manter o campo "Nome" **opcional**.
- Incluir a checkbox de consentimento listada acima como campo obrigatório.
- Nunca publicar respostas individuais identificáveis no relatório final — reportar apenas dados agregados (ex.: "80% avaliaram o site como muito útil").
- Caso a instituição parceira solicite, é possível desativar a coleta de e-mails nas configurações do Google Forms para reforçar o anonimato.

## Status

⚠️ **Pendente:** este documento descreve como criar o formulário, mas o formulário em si precisa ser criado manualmente pelo estudante (requer login numa conta Google). Após criá-lo, atualize:
1. O `<iframe>` em `site/participe.html` com o código de incorporação real.
2. O link direto do formulário, para envio na Atividade 31 do Ambiente Virtual de Aprendizagem.
3. O status desta atividade em `docs/checklist-atividades.md`.
