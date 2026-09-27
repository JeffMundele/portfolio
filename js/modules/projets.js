import { projets } from "../data/projets.js";
import { renderCards } from "../core/renderer.js";

export function initProjects() {

    renderCards({
        containerId: "projects-container",
        data: projets,
        cardClass: "project-card",
        template: projet => `
            <div class="project-image">

                <img
                    src="${projet.image}"
                    alt="${projet.titre}"
                >

                <div class="project-overlay">

                    <a
                        href="${projet.site}"
                        target="_blank"
                        class="btn"
                    >
                        Voir le site
                    </a>

                    <a
                        href="${projet.code}"
                        target="_blank"
                        class="btn btn-outline"
                    >
                        Code
                    </a>

                    <button
                        type="button"
                        class="project-zoom"
                        data-img="${projet.image}"
                        data-alt="${projet.titre}"
                        aria-label="Agrandir l'image du projet"
                    >
                        <i class="fa-solid fa-magnifying-glass-plus"></i>
                    </button>

                </div>

            </div>

            <div class="project-content">

                <h3>${projet.titre}</h3>

                <p class="project-desc">
                    ${projet.description}
                </p>

                <div class="project-tech">
                    ${projet.technologies
                        .map(tech => `<span>${tech}</span>`)
                        .join("")}
                </div>

            </div>
        `
    });

}