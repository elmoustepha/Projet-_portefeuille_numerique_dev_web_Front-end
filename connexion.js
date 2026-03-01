// Activer le bouton uniquement quand les champs sont remplis
const inputs = document.querySelectorAll("input");
const btn = document.getElementById("btnConnexion");
let isSubmitting = false;

function checkFormValidity() {
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    btn.disabled = !allFilled;
}

inputs.forEach(input => {
    input.addEventListener("input", checkFormValidity);
});

checkFormValidity();

// Fonction de connexion
function submitLogin() {
    if (isSubmitting) return;
    if (btn.disabled) return;

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    isSubmitting = true;
    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = "Connexion en cours...";

    fetch('http://.../api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Email ou mot de passe incorrect");
        }
        return data;
    })
    .then(result => {
        alert(result.message || "Connexion réussie !");
        localStorage.setItem('user', JSON.stringify(result.user));
        window.location.href = "accueil.html";  
    })
    .catch(error => {
        console.error("Erreur de connexion :", error);
        alert(error.message || "Erreur lors de la connexion. Vérifiez vos identifiants.");
    })
    .finally(() => {
        isSubmitting = false;
        btn.disabled = false;
        btn.textContent = originalText;
    });
}