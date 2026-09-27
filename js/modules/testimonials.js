import { testimonials } from "../data/testimonials.js";
import { renderCards } from "../core/renderer.js";

export function initTestimonials() {

    renderCards({
        containerId: "testimonials-container",
        data: testimonials,
        cardClass: "testimonial",
        template: testimonial => {

            const stars = Array.from(
                { length: testimonial.note },
                () => '<i class="fa-solid fa-star"></i>'
            ).join("");

            const commentaires = testimonial.commentaires
                .map(commentaire => `<p>${commentaire}</p>`)
                .join("");

            return `
                <div class="testimonial-header">

                    <img
                        src="${testimonial.photo}"
                        alt="${testimonial.nom}"
                    >

                    <div>
                        <h4>${testimonial.nom}</h4>
                        <span>${testimonial.poste}</span>
                    </div>

                </div>

                <div class="stars">
                    ${stars}
                </div>

                ${commentaires}
            `;
        }
    });

}