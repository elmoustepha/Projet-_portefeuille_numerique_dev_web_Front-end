// Activer le bouton d'inscription uniquement quand tous les champs sont remplis
const inputs = document.querySelectorAll("input:not([type='hidden'])");
const btn = document.getElementById("btnInscrire");
let isSubmitting = false;

// Fonction debounce simple pour limiter les vérifications lors de la saisie rapide
function debounce(fn, delay = 180) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Vérification si tous les champs sont remplis
function checkFormValidity() {
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    btn.disabled = !allFilled;
}

const debouncedCheck = debounce(checkFormValidity);

// Écouteurs d'événements
inputs.forEach(input => {
    input.addEventListener("input", debouncedCheck);
});

// Vérification initiale au chargement de la page
checkFormValidity();

// Fonction d'inscription de l'utilisateur
function submitForm() {
    if (isSubmitting) return;
    if (btn.disabled) return;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
        alert("⚠ Les mots de passe ne correspondent pas.");
        return;
    }

    // Bloquer les soumissions multiples
    isSubmitting = true;
    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = "Inscription en cours...";

    // Envoyer les données au serveur
    fetch('http://.../api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })
    .then(async response => {
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erreur lors de l'inscription");
        }

        return data;
    })
    .then(result => {
        alert(result.message || "Inscription réussie !");
        // Redirection vers la page d'accueil après inscription
        window.location.href = "accueil.html";
    })
    .catch(error => {
        console.error("Erreur lors de l'inscription :", error);
        alert(error.message || "Erreur lors de l'ajout de l'utilisateur.");
    })
    .finally(() => {
        isSubmitting = false;
        btn.disabled = false;
        btn.textContent = originalText;
    });
}