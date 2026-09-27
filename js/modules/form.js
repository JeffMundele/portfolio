if (window.emailjs) {
  emailjs.init("phqw0IEizahCDEGyU");
}

// Affiche une notification (toast) en bas à droite de l'écran
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

const isValidEmailFormat = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Applique l'état visuel (rouge/vert) + le message d'erreur sur un champ.
function setFieldState(input, isValid, message) {
  const errorEl = input.nextElementSibling;

  if (isValid) {
    input.classList.remove("error");
    input.classList.add("success");
    if (errorEl) errorEl.textContent = "";
  } else {
    input.classList.remove("success");
    input.classList.add("error");
    if (errorEl) errorEl.textContent = message;
  }
}

// Efface l'état visuel d'un champ (utilisé quand il est vide et pas
// encore "touché", pour ne pas afficher une erreur avant que l'utilisateur
// ait commencé à écrire).
function clearFieldState(input) {
  const errorEl = input.nextElementSibling;
  input.classList.remove("error", "success");
  if (errorEl) errorEl.textContent = "";
}

function validateName(input, { showEmptyError = false } = {}) {
  const value = input.value.trim();

  if (value.length === 0) {
    if (showEmptyError) {
      setFieldState(input, false, "Le nom est requis.");
    } else {
      clearFieldState(input);
    }
    return false;
  }

  if (value.length < 3) {
    setFieldState(input, false, "Le nom doit contenir au moins 3 caractères.");
    return false;
  }

  setFieldState(input, true, "");
  return true;
}

function validateEmailField(input, { showEmptyError = false } = {}) {
  const value = input.value.trim();

  if (value.length === 0) {
    if (showEmptyError) {
      setFieldState(input, false, "L'email est requis.");
    } else {
      clearFieldState(input);
    }
    return false;
  }

  if (!isValidEmailFormat(value)) {
    setFieldState(input, false, "Veuillez saisir un email valide.");
    return false;
  }

  setFieldState(input, true, "");
  return true;
}

function validateMessage(input, { showEmptyError = false } = {}) {
  const value = input.value.trim();

  if (value.length === 0) {
    if (showEmptyError) {
      setFieldState(input, false, "Le message est requis.");
    } else {
      clearFieldState(input);
    }
    return false;
  }

  if (value.length < 10) {
    setFieldState(input, false, "Le message doit contenir au moins 10 caractères.");
    return false;
  }

  setFieldState(input, true, "");
  return true;
}

export function initForm() {
  const form = document.querySelector("form");
  if (!form) return;

  const btn = document.getElementById("submit-btn");
  const text = btn.querySelector(".btn-text");
  const loader = btn.querySelector(".loader");

  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const messageInput = form.querySelector("#message");

  let isSending = false;

  // Validation en temps réel : à chaque frappe, et à nouveau (avec message
  // "champ requis" si vide) quand l'utilisateur quitte le champ.
  if (nameInput) {
    nameInput.addEventListener("input", () => validateName(nameInput));
    nameInput.addEventListener("blur", () => validateName(nameInput, { showEmptyError: true }));
  }
  if (emailInput) {
    emailInput.addEventListener("input", () => validateEmailField(emailInput));
    emailInput.addEventListener("blur", () => validateEmailField(emailInput, { showEmptyError: true }));
  }
  if (messageInput) {
    messageInput.addEventListener("input", () => validateMessage(messageInput));
    messageInput.addEventListener("blur", () => validateMessage(messageInput, { showEmptyError: true }));
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (isSending) return;

    const nameOk = nameInput ? validateName(nameInput, { showEmptyError: true }) : true;
    const emailOk = emailInput ? validateEmailField(emailInput, { showEmptyError: true }) : true;
    const messageOk = messageInput ? validateMessage(messageInput, { showEmptyError: true }) : true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!nameOk || !emailOk || !messageOk) {
      showToast("Merci de remplir correctement le formulaire ⚠️", "error");
      return;
    }

    isSending = true;
    btn.disabled = true;
    text.textContent = "Envoi...";
    loader.classList.remove("hidden");

    const templateParams = {
      from_name: name,
      from_email: email,
      message,
    };

    try {
      // 1. Notification envoyée à Jeff
      await emailjs.send("service_c74aen5", "template_y8hm5qm", templateParams);

      // 2. Réponse automatique envoyée au visiteur
      // (échec silencieux : si ça rate, on ne bloque pas le succès du formulaire,
      // puisque le message principal est bien arrivé)
      try {
        await emailjs.send("service_c74aen5", "template_xbm0fto", templateParams);
      } catch (autoReplyErr) {
        console.warn("Réponse automatique non envoyée :", autoReplyErr);
      }

      showToast("Message envoyé ✅", "success");
      form.reset();

    } catch (err) {
      console.error("Erreur EmailJS :", err);
      showToast("Erreur d'envoi ❌", "error");
    }

    isSending = false;
    btn.disabled = false;
    text.textContent = "Envoyer";
    loader.classList.add("hidden");
  });
}
