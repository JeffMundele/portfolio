import { skills } from "../data/skills.js";

export function initSkills() {

    const container = document.getElementById("skills-container");

    if (!container) return;

    container.innerHTML = "";

    skills.forEach(skillGroup => {

        const box = document.createElement("div");

        box.className = "skill-box";
        box.setAttribute("data-aos", "zoom-out");

        box.innerHTML = `

            <h3 class="skill-title">
                <i class="${skillGroup.icone}"></i>
                ${skillGroup.categorie}
            </h3>

            ${skillGroup.competences.map(skill => `

                <div class="skill-item">

                    <div class="skill-header">
                        <p>${skill.nom}</p>
                        <span>${skill.niveau}%</span>
                    </div>

                    <div class="progress">
                        <span style="width:${skill.niveau}%"></span>
                    </div>

                </div>

            `).join("")}

        `;

        container.appendChild(box);

    });

}