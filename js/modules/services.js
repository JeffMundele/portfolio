import { services } from "../data/services.js";
import { renderCards } from "../core/renderer.js";

export function initServices() {

    renderCards({

        containerId: "services-container",

        data: services,

        cardClass: "service",

        template: service => `

            <div class="service-icon">
                <i class="${service.icone}"></i>
            </div>

            <h3>${service.titre}</h3>

            <p>${service.description}</p>

        `

    });

}