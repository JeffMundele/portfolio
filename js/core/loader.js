// Charge un composant HTML dans un conteneur
async function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.warn(`Conteneur introuvable : ${containerId}`);
        return;
    }

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Impossible de charger ${filePath}`);
        }

        container.innerHTML = await response.text();

    } catch (error) {
        console.error(error);
    }
}

// Fonction appelée par app.js
export async function loadComponents() {

    await Promise.all([
        loadComponent("header-container", "composants/header.html"),
        loadComponent("footer-container", "composants/footer.html")
    ]);

}