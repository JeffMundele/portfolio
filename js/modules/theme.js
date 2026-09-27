export function initTheme() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const icon = btn.querySelector("i");
  const body = document.body;

  const saved = localStorage.getItem("theme");

  if (saved === "light") {
    body.classList.add("light");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  btn.addEventListener("click", () => {
    const isLight = body.classList.toggle("light");

    icon.classList.toggle("fa-moon", !isLight);
    icon.classList.toggle("fa-sun", isLight);

    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}