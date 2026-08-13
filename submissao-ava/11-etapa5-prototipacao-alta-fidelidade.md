# Etapa 5 - Prototipação de Alta Fidelidade

## Objetivo da etapa
Definir as decisões finais de design visual que servem de base direta para a implementação (Etapa 6): paleta de cores, tipografia e especificação dos componentes de interface.

## Paleta de cores

| Uso | Cor | Hex |
|---|---|---|
| Primária (header, botões principais) | Roxo institucional | `#6A1B9A` |
| Primária escura (hover, footer) | Roxo escuro | `#4A148C` |
| Destaque/alerta (botão "Sair rapidamente", denúncia) | Laranja/vermelho | `#D84315` |
| Fundo claro | Off-white | `#FAF7FC` |
| Texto principal | Cinza-quase-preto | `#212121` |
| Texto secundário | Cinza médio | `#5F5F5F` |
| Cards/bordas | Cinza claro | `#E0E0E0` |

Paleta escolhida por transmitir acolhimento (roxo é a cor símbolo do combate à violência contra a mulher) e por garantir contraste AA suficiente entre texto e fundo (RNF02).

## Tipografia

- Fonte: system font stack (`-apple-system, Segoe UI, Roboto, sans-serif`) - evita dependência de fontes externas (RNF06) e garante legibilidade em qualquer dispositivo.
- Tamanho base: 16px, com opção de aumento (`+A` / `-A`, opcional em versão futura).
- Títulos: peso 700, texto corrido: peso 400.

## Componentes de UI

- **Header fixo** (`position: sticky`): logo + nav + botão de saída em destaque (cor `#D84315`, sempre visível, inclusive em mobile via menu retrátil).
- **Cards**: fundo branco, borda `1px solid #E0E0E0`, `border-radius: 8px`, sombra leve.
- **Botões primários**: fundo `#6A1B9A`, texto branco, `border-radius: 6px`, hover `#4A148C`.
- **Botão de emergência**: fundo `#D84315`, texto branco, sempre com maior peso visual que os demais botões.
- **Footer**: fundo `#4A148C`, texto branco, links institucionais e créditos do projeto de extensão.
- **Formulário de contato**: campos com borda simples, foco com contorno azul de acessibilidade (`outline`), botão de envio no padrão de botão primário.

Essas decisões são aplicadas diretamente em `site/css/style.css` na Etapa 6.
