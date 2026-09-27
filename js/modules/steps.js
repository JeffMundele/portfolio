import { steps } from "../data/steps.js";
import { renderCards } from "../core/renderer.js";

export function initSteps() {

    renderCards({
        containerId: "steps-container",
        data: steps,
        cardClass: "service",
        template: step => `
            <div class="service-icon">
                <i class="${step.icone}"></i>
            </div>

            <span class="step-number">
                ${step.numero}
            </span>

            <h3>${step.titre}</h3>

            <p>${step.description}</p>
        `
    });

}