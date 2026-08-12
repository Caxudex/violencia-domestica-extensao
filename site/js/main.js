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
    infoLink.setAttribute("aria-label", "O que o botão de saída faz (e não faz) - dicas de segurança digital");
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

// Dados da instituição parceira (nome, endereço, telefone, e-mail, texto da
// parceria), lidos de site/content/institution.json — o mesmo arquivo que o
// painel administrativo (site/admin/, Decap CMS) edita. Qualquer elemento
// com data-institution="campo" tem o texto substituído; data-institution-href
// atualiza o atributo href (ex.: tel:/mailto:). O HTML já traz os valores
// reais como fallback, então a página funciona normalmente mesmo se o fetch
// falhar — isto só sincroniza com edições feitas depois pelo painel admin.
function setupInstitutionContent() {
  var targets = document.querySelectorAll("[data-institution], [data-institution-href]");
  if (!targets.length) return;

  fetch("content/institution.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Falha ao carregar dados da instituição");
      return response.json();
    })
    .then(function (data) {
      document.querySelectorAll("[data-institution]").forEach(function (el) {
        var field = el.getAttribute("data-institution");
        if (data[field] !== undefined) el.textContent = data[field];
      });
      document.querySelectorAll("[data-institution-href]").forEach(function (el) {
        var spec = el.getAttribute("data-institution-href");
        var parts = spec.split(":");
        var prefix = parts[0];
        var field = parts[1];
        if (data[field] !== undefined) el.setAttribute("href", prefix + ":" + data[field]);
      });
    })
    .catch(function () {
      // Mantém os valores estáticos já presentes no HTML.
    });
}

// Trilha de navegação ("Você está em: Home > Página"), injetada no topo de
// <main> a partir deste script único, sem precisar editar cada HTML.
// Usa o link com aria-current="page" do menu como fonte do rótulo; quando a
// página não está no menu principal (ex.: Segurança Digital), cai para o
// início do <title>. Página de erro (404, com meta robots noindex) e a
// própria Home (que já é o topo da trilha) não recebem o componente.
function setupBreadcrumbs() {
  var main = document.querySelector("#conteudo");
  if (!main || document.querySelector('meta[name="robots"]')) return;

  var current = document.querySelector(".main-nav a[aria-current='page']");
  var label = current ? current.textContent.trim() : (document.title.split("-")[0] || "").trim();
  if (!label || label === "Home") return;

  var nav = document.createElement("nav");
  nav.className = "breadcrumbs";
  nav.setAttribute("aria-label", "Trilha de navegação");
  nav.innerHTML =
    '<ol><li><a href="index.html">Home</a></li>' +
    '<li aria-current="page">' + label + "</li></ol>";
  main.insertBefore(nav, main.firstChild);
}

// Botão "Alto contraste" (padrão comum em sites gov.br), injetado ao lado do
// controle de tamanho de fonte. Alterna o atributo data-contrast="high" na
// raiz do documento, que o CSS usa para aplicar o tema preto/amarelo.
function setupContrastControl() {
  var STORAGE_KEY = "contrast-pref";
  var anchor = document.querySelector(".font-size-control") || document.querySelector(".logo");
  if (!anchor) return;

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "contrast-btn";
  btn.textContent = "Alto contraste";
  btn.setAttribute("aria-pressed", "false");
  anchor.insertAdjacentElement("afterend", btn);

  function apply(enabled) {
    if (enabled) {
      document.documentElement.setAttribute("data-contrast", "high");
    } else {
      document.documentElement.removeAttribute("data-contrast");
    }
    btn.setAttribute("aria-pressed", enabled ? "true" : "false");
    localStorage.setItem(STORAGE_KEY, enabled ? "high" : "normal");
  }

  apply(localStorage.getItem(STORAGE_KEY) === "high");

  btn.addEventListener("click", function () {
    apply(document.documentElement.getAttribute("data-contrast") !== "high");
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
// avaliação) e mostra dois números - total de avaliações, e quantas têm o
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
        // Registro local apenas (sem backend nesta entrega - RNF05).
        // Quando o Google Form real da Etapa/Atividade 31 estiver pronto,
        // este evento pode ser conectado a ele (ver docs/formulario-avaliacao-comunidade.md).
        localStorage.setItem(storageKey, btn.getAttribute("data-answer"));
        showThanks();
      });
    });
  }
}

// Remove tags HTML de uma string (defesa em profundidade: mesmo que este
// campo nunca seja re-inserido no DOM hoje, evita que passe adiante se o
// formulário vier a ser conectado a um backend/serviço no futuro).
function stripHtml(value) {
  return value.replace(/<[^>]*>/g, "");
}

function setupContactForm() {
  var form = document.querySelector("#contact-form");
  if (!form) return;
  var status = document.querySelector("#form-status");
  var RATE_LIMIT_KEY = "contact-form-last-submit";
  var RATE_LIMIT_MS = 30000; // 30 segundos entre envios

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Honeypot: campo invisível que só bots costumam preencher.
    // Finge sucesso para não revelar a detecção, mas não processa nada.
    var honeypot = form.elements["website"];
    if (honeypot && honeypot.value.trim() !== "") {
      status.textContent = "Mensagem registrada. Em caso de emergência, ligue 190.";
      status.className = "form-status success";
      form.reset();
      return;
    }

    // Rate limiting básico (client-side, não é proteção robusta contra um
    // atacante determinado, mas reduz reenvios acidentais/abuso casual).
    var lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastSubmit && (Date.now() - parseInt(lastSubmit, 10)) < RATE_LIMIT_MS) {
      status.textContent = "Aguarde um momento antes de enviar novamente.";
      status.className = "form-status error";
      return;
    }

    var name = stripHtml(form.elements["name"].value.trim()).slice(0, 120);
    var email = stripHtml(form.elements["email"].value.trim()).slice(0, 180);
    var message = stripHtml(form.elements["message"].value.trim()).slice(0, 2000);
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

    // Envio real via Web3Forms (serviço gratuito, sem backend próprio -
    // RNF05 continua respeitado, já que não hospedamos servidor algum).
    // Guia de configuração: docs/formulario-contato-web3forms.md
    var accessKey = form.getAttribute("data-web3forms-key") || "";
    if (!accessKey || accessKey.indexOf("SUBSTITUA") !== -1) {
      status.textContent = "O envio ainda não foi configurado. Em caso de emergência, ligue 190.";
      status.className = "form-status error";
      return;
    }

    var submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    status.textContent = "Enviando…";
    status.className = "form-status";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: (form.elements["subject"] && form.elements["subject"].value) || "Nova mensagem - IndaCity",
        name: name,
        email: email,
        message: message
      })
    })
      .then(function (response) { return response.json(); })
      .then(function (result) {
        if (result.success) {
          localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
          status.textContent = "Mensagem enviada com sucesso! Em caso de emergência, ligue 190.";
          status.className = "form-status success";
          form.reset();
        } else {
          status.textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
          status.className = "form-status error";
        }
      })
      .catch(function () {
        status.textContent = "Não foi possível enviar agora. Verifique sua conexão e tente de novo.";
        status.className = "form-status error";
      })
      .finally(function () {
        if (submitButton) submitButton.disabled = false;
      });
  });
}

// Widget VLibras (tradutor de Libras do governo federal), injetado em todas
// as páginas a partir deste script único. Padrão comum em sites públicos
// brasileiros, por exigência de acessibilidade (LBI - Lei 13.146/2015).
// Entrada suave das seções ao rolar a página. Progressive enhancement: a
// classe .reveal só é adicionada aqui, então sem JS (ou com
// prefers-reduced-motion) o conteúdo permanece visível normalmente.
function setupScrollReveal() {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  var main = document.querySelector("main");
  if (!main) return;
  var sections = main.querySelectorAll(":scope > section");
  if (!sections.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  sections.forEach(function (section) {
    section.classList.add("reveal");
    observer.observe(section);
  });
}

function setupVLibras() {
  var wrapper = document.createElement("div");
  wrapper.setAttribute("vw", "");
  wrapper.className = "enabled";
  wrapper.innerHTML =
    '<div vw-access-button class="active"></div>' +
    '<div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
  document.body.appendChild(wrapper);

  var script = document.createElement("script");
  script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
  script.onload = function () {
    if (window.VLibras) {
      new window.VLibras.Widget("https://vlibras.gov.br/app");
    }
  };
  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function () {
  setupExitButton();
  setupNavToggle();
  setupFontSizeControl();
  setupContrastControl();
  setupInstitutionContent();
  setupBreadcrumbs();
  setupContactForm();
  setupFeedbackWidget();
  setupFormEmbed();
  setupParticipantCounter();
  setupVLibras();
  setupScrollReveal();
});
