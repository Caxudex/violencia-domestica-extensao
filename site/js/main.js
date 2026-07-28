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
  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
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
  setupContactForm();
});
