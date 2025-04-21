document.addEventListener('DOMContentLoaded', function () {
    const projectsGallery = document.querySelector('.projets-gallery');

    // Récupérer les projets depuis le localStorage
    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    // Fonction pour afficher les projets
    function displayProjects() {
        projectsGallery.innerHTML = ''; // Vider la galerie avant d'afficher

        projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('projet-item');
            projectItem.innerHTML = `
                <img src="${project.image}" alt="Image du projet">
                <h3 class="projet-title">${project.name}</h3>
                <p id="projet-description">${project.description}</p>
            `;
            projectsGallery.appendChild(projectItem);
        });
    }

    // Afficher les projets au chargement de la page
    displayProjects();
})