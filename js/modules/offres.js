import { offres } from "../data/offres.js";
import { renderCards } from "../core/renderer.js";

export function initOffres(){

    renderCards({

        containerId:"offres-container",

        data:offres,

        cardClass:"service",

        template:offre=>`

            <div class="service-icon">
                <i class="${offre.icone}"></i>
            </div>

            <h3>${offre.titre}</h3>

            <p>${offre.description}</p>

            <p class="offre-prix">
                <strong>${offre.prix}</strong>
            </p>

        `

    });

}