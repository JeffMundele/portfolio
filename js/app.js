import { loadComponents } from "./core/loader.js";

import { initMenu } from "./modules/menu.js";
import { initTheme } from "./modules/theme.js";
import { initHeaderScroll } from "./modules/scroll.js";
import { initForm } from "./modules/form.js";
import { initAOS } from "./modules/aos.js";

import { initServices } from "./modules/services.js";
import { initOffres } from "./modules/offres.js";
import { initSkills } from "./modules/skills.js";
import { initAvantages } from "./modules/avantages.js";
import { initTestimonials } from "./modules/testimonials.js";
import { initSteps } from "./modules/steps.js";
import { initProjects } from "./modules/projets.js";
import { initLightbox } from "./modules/lightbox.js";


// Si l'URL contient une ancre (ex: index.html#skills), le navigateur essaie
// d'y défiler dès le chargement de la page — mais à ce moment-là les sections
// injectées dynamiquement (services, offres, compétences...) sont encore
// vides. Une fois remplies, la page grandit et tout ce qui suit se décale
// vers le bas : la position de défilement initiale ne correspond alors plus
// à la bonne section (c'est ce qui provoquait l'atterrissage sur "Mes offres"
// au lieu de "Compétences"). On recale donc l'ancre une fois le rendu stable.
function realignToHash() {
    if (!window.location.hash) return;

    const target = document.querySelector(window.location.hash);
    if (!target) return;

    // Double requestAnimationFrame : on attend que le navigateur ait fini
    // de peindre la mise en page finale avant de recalculer la position.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: "auto", block: "start" });
        });
    });
}

async function init() {

    await loadComponents();

    initMenu();
    initTheme();
    initHeaderScroll();

    initServices();
    initOffres();
    initSkills();
    initAvantages();
    initTestimonials();
    initSteps();
    initProjects();

    initForm();
    initAOS();
    initLightbox();

    realignToHash();
}

document.addEventListener("DOMContentLoaded", init);