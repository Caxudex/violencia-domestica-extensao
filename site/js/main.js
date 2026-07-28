// Botão de saída rápida: redireciona imediatamente e substitui a entrada
// no histórico para reduzir o risco de a página ser reaberta com "voltar".
function setupExitButton() {
  var exitButtons = document.querySelectorAll(".exit-button");
  exitButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.location.replace("https://www.google.com");
    });
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

// Widget de avaliação rápida ("Esta informação foi útil?"), exibido apenas
// nas páginas de conteúdo (não na Home, Contato, Participe ou Documentação,
// que já têm seus próprios mecanismos de feedback/avaliação).
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
});
