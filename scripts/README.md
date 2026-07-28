# Scripts de configuração e execução

Scripts para rodar o site localmente sem precisar decorar comandos.

## Como usar

**Opção 1 — duplo clique (mais simples):**
Dê duplo clique em `iniciar-site.bat`. Uma janela abrirá o site em `http://localhost:8000` no navegador padrão.

**Opção 2 — PowerShell:**
```powershell
.\scripts\iniciar-site.ps1
```

Para usar outra porta (ex.: 9000):
```powershell
.\scripts\iniciar-site.ps1 -Port 9000
```

## Requisitos

- Python instalado (via `py` ou `python3` no PATH). Verifique com `py --version`.
  Sem servidor local, também é possível abrir `site/index.html` diretamente no navegador, mas alguns recursos (como o formulário) funcionam melhor servidos via HTTP.

## Parar o servidor

Com a janela do terminal em foco, pressione `Ctrl+C`. Se usou o `.bat`, feche a janela ou pressione `Ctrl+C` e depois qualquer tecla no aviso de pausa.
