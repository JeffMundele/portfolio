export function renderCards({

    containerId,
    data,
    cardClass,
    template,
    aos = "fade-up"

}) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    data.forEach(item => {

        const card = document.createElement("div");

        card.className = cardClass;

        card.setAttribute("data-aos", aos);

        card.innerHTML = template(item);

        container.appendChild(card);

    });

}