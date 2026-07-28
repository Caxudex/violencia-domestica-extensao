// Caminho relativo para páginas em site/documentos/, que ficam um nível abaixo.
function getBasePrefix() {
  return window.location.pathname.indexOf("/documentos/") !== -1 ? "../" : "";
}

// Botão de saída rápida: redireciona imediatamente e substitui a entrada
// no histórico para reduzir o risco de a página ser reaberta com "voltar".
// Também é retirado do menu mobile (que fica escondido por padrão) e
// colocado direto no cabeçalho, para nunca ficar oculto atrás do "☰ Menu",
// além de ganhar um atalho de teclado (Esc) para não depender de mirar no botão.
function setupExitButton() {
  var headerInner = document.querySelector(".header-inner");
  var navToggle = document.querySelector(".nav-toggle");
  var exitBtn = document.querySelector(".exit-button");
  if (!exitBtn) return;

  if (headerInner && navToggle && exitBtn.parentElement !== headerInner) {
    var wrapper = document.createElement("div");
    wrapper.className = "exit-wrapper";
    wrapper.appendChild(exitBtn);

    var infoLink = document.createElement("a");
    infoLink.className = "exit-info-link";
    infoLink.href = getBasePrefix() + "seguranca-digital.html";
    infoLink.textContent = "ⓘ";
    infoLink.setAttribute("aria-label", "O que o botão de saída faz (e não faz) — dicas de segurança digital");
    wrapper.appendChild(infoLink);

    headerInner.insertBefore(wrapper, navToggle);
  }

  function exit() {
    window.location.replace("https://www.google.com");
  }

  exitBtn.addEventListener("click", exit);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      exit();
    }
  });
}

function setupNavToggle() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  if (!nav.id) {
    nav.id = "main-nav";
  }
  toggle.setAttribute("aria-controls", nav.id);

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    toggle.textContent = isOpen ? "✕ Fechar" : "☰ Menu";
  });
}

// Controle de tamanho de fonte (A- / A+), injetado em todas as páginas
// a partir deste script único, sem precisar editar cada HTML.
function setupFontSizeControl() {
  var STORAGE_KEY = "font-size-pref";
  var LEVELS = ["normal", "lg", "xl"];
  var headerInner = document.querySelector(".header-inner");
  var logo = document.querySelector(".logo");
  if (!headerInner || !logo) return;

  var wrapper = document.createElement("div");
  wrapper.className = "font-size-control";
  wrapper.setAttribute("role", "group");
  wrapper.setAttribute("aria-label", "Ajustar tamanho do texto");

  var decBtn = document.createElement("button");
  decBtn.type = "button";
  decBtn.className = "font-size-btn";
  decBtn.textContent = "A-";
  decBtn.setAttribute("aria-label", "Diminuir tamanho do texto");

  var incBtn = document.createElement("button");
  incBtn.type = "button";
  incBtn.className = "font-size-btn";
  incBtn.textContent = "A+";
  incBtn.setAttribute("aria-label", "Aumentar tamanho do texto");

  wrapper.appendChild(decBtn);
  wrapper.appendChild(incBtn);
  logo.insertAdjacentElement("afterend", wrapper);

  function currentLevel() {
    var level = document.documentElement.getAttribute("data-font-size");
    return LEVELS.indexOf(level) === -1 ? "normal" : level;
  }

  function apply(level) {
    if (level === "normal") {
      document.documentElement.removeAttribute("data-font-size");
    } else {
      document.documentElement.setAttribute("data-font-size", level);
    }
    localStorage.setItem(STORAGE_KEY, level);
  }

  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved && LEVELS.indexOf(saved) !== -1) {
    apply(saved);
  }

  decBtn.addEventListener("click", function () {
    var idx = Math.max(0, LEVELS.indexOf(currentLevel()) - 1);
    apply(LEVELS[idx]);
  });
  incBtn.addEventListener("click", function () {
    var idx = Math.min(LEVELS.length - 1, LEVELS.indexOf(currentLevel()) + 1);
    apply(LEVELS[idx]);
  });
}

// Enquanto o Google Form real da página Participe não for configurado, o
// iframe placeholder mostra um erro feio do Google Drive ("Sorry, the file
// you have requested does not exist"). Troca isso por uma mensagem amigável,
// mantendo a área visível em vez de escondida.
function setupFormEmbed() {
  var container = document.querySelector("#form-embed");
  if (!container) return;
  var iframe = container.querySelector("iframe");
  if (!iframe) return;
  var src = iframe.getAttribute("src") || "";
  if (src.indexOf("SUBSTITUA") === -1) return;

  container.innerHTML =
    '<div class="form-pending">' +
    "<p><strong>O formulário está sendo preparado.</strong> Em breve você poderá avaliar o site diretamente aqui.</p>" +
    '<p>Enquanto isso, você pode <a href="contato.html">falar com a instituição pelo formulário de contato</a>.</p>' +
    "</div>";

  var directLink = document.querySelector("#form-direct-link");
  var introParagraph = directLink && directLink.closest("p");
  if (introParagraph) {
    introParagraph.hidden = true;
  }
}

// Parser simples de CSV que respeita campos entre aspas (necessário porque
// respostas de texto livre do formulário podem conter vírgulas).
function parseCsv(text) {
  var rows = [];
  var row = [];
  var field = "";
  var inQuotes = false;
  for (var i = 0; i < text.length; i++) {
    var char = text[i];
    var next = text[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function findColumnIndex(headerRow, keyword) {
  var normalized = keyword.toLowerCase();
  for (var i = 0; i < headerRow.length; i++) {
    if ((headerRow[i] || "").toLowerCase().indexOf(normalized) !== -1) {
      return i;
    }
  }
  return -1;
}

// Contador de participantes na página Participe: lê a planilha de respostas
// do Google Sheets publicada na web como CSV (vinculada ao formulário de
// avaliação) e mostra dois números — total de avaliações, e quantas têm o
// campo "Instituição/Organização" preenchido (presença institucional
// registrada). Enquanto o link não for configurado (ver
// docs/formulario-avaliacao-comunidade.md), o elemento fica oculto.
function setupParticipantCounter() {
  var el = document.querySelector("#participant-counter");
  if (!el) return;
  var csvUrl = el.getAttribute("data-csv-url");
  if (!csvUrl || csvUrl.indexOf("SUBSTITUA") !== -1) return;

  fetch(csvUrl)
    .then(function (response) {
      if (!response.ok) throw new Error("Falha ao carregar contagem");
      return response.text();
    })
    .then(function (text) {
      var rows = parseCsv(text).filter(function (r) {
        return r.length > 1 || (r.length === 1 && (r[0] || "").trim() !== "");
      });
      if (rows.length < 1) {
        el.hidden = true;
        return;
      }

      var header = rows[0];
      var dataRows = rows.slice(1);
      var total = dataRows.length;
      var instIndex = findColumnIndex(header, "institui");
      var comPresenca = instIndex === -1 ? 0 : dataRows.filter(function (r) {
        return ((r[instIndex] || "").trim() !== "");
      }).length;

      var totalText = total === 1 ? "1 pessoa avaliou o site" : total + " pessoas avaliaram o site";
      var presencaText = instIndex === -1 ? "" : (
        " · " + (comPresenca === 1
          ? "1 com presença institucional registrada"
          : comPresenca + " com presença institucional registrada")
      );

      el.textContent = totalText + presencaText;
      el.hidden = false;
    })
    .catch(function () {
      el.hidden = true;
    });
}

function setupFeedbackWidget() {
  var CONTENT_PAGES = [
    "sobre.html",
    "tipos-de-violencia.html",
    "legislacao.html",
    "como-denunciar.html",
    "rede-de-apoio.html"
  ];
  var path = window.location.pathname.split("/").pop() || "index.html";
  if (CONTENT_PAGES.indexOf(path) === -1) return;

  var main = document.querySelector("main");
  if (!main) return;

  var widget = document.createElement("section");
  widget.className = "feedback-widget";
  widget.setAttribute("aria-labelledby", "feedback-heading");
  widget.innerHTML =
    '<p id="feedback-heading">Esta informação foi útil?</p>' +
    '<div class="feedback-actions">' +
    '<button type="button" class="feedback-btn" data-answer="sim">Sim</button>' +
    '<button type="button" class="feedback-btn" data-answer="nao">Não</button>' +
    "</div>";
  main.appendChild(widget);

  var storageKey = "feedback-" + path;

  function showThanks() {
    widget.innerHTML =
      '<p class="feedback-thanks">Obrigado pelo retorno! Quer contar mais detalhes? ' +
      '<a href="participe.html">Avalie o site completo</a>.</p>';
  }

  if (localStorage.getItem(storageKey)) {
    showThanks();
  } else {
    widget.querySelectorAll(".feedback-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        // Registro local apenas (sem backend nesta entrega — RNF05).
        // Quando o Google Form real da Etapa/Atividade 31 estiver pronto,
        // este evento pode ser conectado a ele (ver docs/formulario-avaliacao-comunidade.md).
        localStorage.setItem(storageKey, btn.getAttribute("data-answer"));
        showThanks();
      });
    });
  }
}

function setupContactForm() {
  var form = document.querySelector("#contact-form");
  if (!form) return;
  var status = document.querySelector("#form-status");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = form.elements["name"].value.trim();
    var email = form.elements["email"].value.trim();
    var message = form.elements["message"].value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      status.textContent = "Por favor, preencha todos os campos.";
      status.className = "form-status error";
      return;
    }
    if (!emailPattern.test(email)) {
      status.textContent = "Informe um e-mail válido.";
      status.className = "form-status error";
      return;
    }

    // Sem backend nesta entrega (RNF05): a integração com e-mail/CRM real
    // fica a cargo da instituição parceira ao adotar o site.
    status.textContent = "Mensagem registrada. Em caso de emergência, ligue 190.";
    status.className = "form-status success";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupExitButton();
  setupNavToggle();
  setupFontSizeControl();
  setupContactForm();
  setupFeedbackWidget();
  setupFormEmbed();
  setupParticipantCounter();
});
