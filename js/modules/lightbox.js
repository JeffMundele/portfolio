// Permet d'afficher une image de projet en plein écran, sans recadrage,
// pour que tous les détails (captures d'écran de sites, etc.) restent visibles.
export function initLightbox() {

    let overlay = document.getElementById("lightbox-overlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "lightbox-overlay";
        overlay.className = "lightbox-overlay";
        overlay.innerHTML = `
            <button type="button" class="lightbox-close" aria-label="Fermer">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <img src="" alt="">
        `;
        document.body.appendChild(overlay);
    }

    const imgEl = overlay.querySelector("img");

    function open(src, alt) {
        if (!src) return;
        imgEl.src = src;
        imgEl.alt = alt || "";
        overlay.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function close() {
        overlay.classList.remove("show");
        document.body.style.overflow = "";
    }

    // Délégation d'événements : fonctionne même si les cartes projet
    // sont (re)générées dynamiquement après ce point.
    document.addEventListener("click", (e) => {
        const zoomBtn = e.target.closest(".project-zoom");
        if (zoomBtn) {
            open(zoomBtn.dataset.img, zoomBtn.dataset.alt);
            return;
        }

        if (e.target.closest(".lightbox-close") || e.target === overlay) {
            close();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
    });
}
