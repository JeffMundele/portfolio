import { avantages } from "../data/avantages.js";
import { renderCards } from "../core/renderer.js";

export function initAvantages(){

    renderCards({

        containerId:"avantages-container",

        data:avantages,

        cardClass:"service",

        template:item=>`

            <div class="service-icon">

                <i class="${item.icone}"></i>

            </div>

            <h3>${item.titre}</h3>

            <p>${item.description}</p>

        `

    });

}