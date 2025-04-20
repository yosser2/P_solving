// Fonction pour initialiser le carousel
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-image');
    let index = 0;

    setInterval(() => {
        index = (index + 1) % images.length;
        const offset = -index * 100; // Décalage horizontal en %
        carouselContainer.style.transform = `translateX(${offset}%)`;
    }, 3000); // Changer l'image toutes les 3 secondes
});

// Fonction pour vérifier que les mots de passe correspondent
function validatePasswords(password, confirmPassword) {
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas. Veuillez les saisir à nouveau.');
        return false;
    }
    return true;
}

// Fonction générale pour gérer la soumission des formulaires
function handleFormSubmit(event, formId) {
    event.preventDefault(); // Empêche l'envoi réel du formulaire
    const form = document.getElementById(formId);
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    // Vérification pour les formulaires d'inscription
    if (formId === 'inscriptionForm') {
        const confirmPassword = form.querySelector('#confirmPassword').value;
        if (!validatePasswords(password, confirmPassword)) {
            return;
        }

        const existingEmail = localStorage.getItem('email');
        if (existingEmail === email) {
            alert('Cet email est déjà utilisé. Veuillez en choisir un autre.');
            return;
        }

        // Enregistrer dans le localStorage
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('authenticated', 'true'); // Authentification réussie
        alert('Inscription réussie !');
        window.location.href = 'connexion.html'; // Redirige vers la page de connexion
    }

    // Vérification pour les formulaires de connexion
    if (formId === 'connexionForm') {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        const errorMessage = document.getElementById('error-message');

        if (!storedEmail || !storedPassword) {
            errorMessage.style.display = 'block'; // Affiche le message d'erreur
            return;
        }

        if (email === storedEmail && password === storedPassword) {
            alert('Connexion réussie !');
            localStorage.setItem('authenticated', 'true'); // Authentification réussie
            window.location.href = '../index.html'; // Redirige vers la page d'accueil après connexion
        } else {
            alert('vous etes connecté.');
            
        }
    }
}

// Ajouter l'écouteur d'événements pour chaque formulaire
document.getElementById('inscriptionForm')?.addEventListener('submit', (event) => handleFormSubmit(event, 'inscriptionForm'));
document.getElementById('connexionForm')?.addEventListener('submit', (event) => handleFormSubmit(event, 'connexionForm'));
document.getElementById('contactForm')?.addEventListener('submit', (event) => handleFormSubmit(event, 'contactForm'));

// Gérer l'accès au formulaire de service
document.addEventListener('DOMContentLoaded', () => {
    const authButton = document.getElementById('authButton');
    const signupButton = document.getElementById('signupButton'); // Sélectionner le bouton "S'inscrire"
    const serviceForm = document.getElementById('serviceForm');
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';

    // Si l'utilisateur est authentifié, mettre à jour le bouton "Connexion"
    if (isAuthenticated) {
        authButton.textContent = 'Déconnexion';
        // Cacher le bouton "S'inscrire" si l'utilisateur est authentifié
        if (signupButton) {
            signupButton.style.display = 'none';
        }
    } else {
        authButton.textContent = 'Connexion';
        // Afficher le bouton "S'inscrire" si l'utilisateur n'est pas authentifié
        if (signupButton) {
            signupButton.style.display = 'inline-block';
        }
    }

    // Si l'utilisateur n'est pas authentifié, on empêche l'accès au formulaire de service
    if (serviceForm && !isAuthenticated) {
        alert('Vous devez être connecté pour accéder à ce formulaire.');
        window.location.href = 'connexion.html'; // Redirige vers la page de connexion si non authentifié
    }

    // Gérer la déconnexion
    authButton.addEventListener('click', () => {
        if (isAuthenticated) {
            // Déconnexion
            localStorage.removeItem('authenticated');
            authButton.textContent = 'Connexion';
            alert('Vous êtes maintenant déconnecté.');
            window.location.href = '../index.html'; // Redirige vers la page d'accueil après déconnexion
        } else {
            // Connexion
            window.location.href = 'connexion.html'; // Redirige vers la page de connexion
        }
    });
});

// Gestion du menu hamburger
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });

    // Cacher le menu lors d'un clic sur un lien
    navLinks.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('open');
});

// Carousel pour la section "Nos services"
let currentIndex = 0;
const services = document.querySelectorAll('.service-item');
const totalServices = services.length;

function updateCarousel() {
    const carousel = document.querySelector('.slick-carousel');
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.getElementById('next-btn')?.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % totalServices;
    updateCarousel();
    toggleButtons();
});

document.getElementById('prev-btn')?.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + totalServices) % totalServices;
    updateCarousel();
    toggleButtons();
});

function toggleButtons() {
    document.getElementById('next-btn').disabled = currentIndex === totalServices - 1;
    document.getElementById('prev-btn').disabled = currentIndex === 0;
}

// Désactivation initiale des boutons
toggleButtons();
