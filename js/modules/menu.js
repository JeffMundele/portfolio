export function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      toggle.classList.remove("active");
    });
  });

  setActiveNavLink(nav);
}

// Met en surbrillance le lien du menu correspondant à la page actuelle
function setActiveNavLink(nav) {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  nav.querySelectorAll("a").forEach(link => {
    const linkPage = link.getAttribute("href").split("#")[0] || "index.html";
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}