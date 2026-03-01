// Fonctions pour la sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
}

// Fonction pour soumettre le formulaire (mise à jour uniquement)
function submitForm() {
    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Vérification que tous les champs sont remplis
    if (!name || !email || !password || !confirmPassword) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Vérification que les mots de passe correspondent
    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
    }

    // Empêcher l'ajout d'un nouvel utilisateur (seule la mise à jour est autorisée)
    if (!id) {
        alert("Impossible d'ajouter un nouvel utilisateur. Seule la mise à jour est autorisée.");
        location.reload();
        return;
    }

    // Requête PUT pour mettre à jour l'utilisateur
    fetch(`http://.../api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
    .then(res => res.json())
    .then(result => {
        alert("Utilisateur mis à jour avec succès !");
        location.reload(); // Recharger la page pour rafraîchir la liste
    })
    .catch(err => {
        console.error("Erreur lors de la mise à jour :", err);
        alert("Erreur lors de la mise à jour de l'utilisateur.");
    });
}

// Fonction pour afficher tous les utilisateurs dans le tableau
function displayUsers() {
    fetch('http://...api/users')
    .then(res => res.json())
    .then(users => {
        // Sélectionner uniquement le <tbody> pour ne pas effacer le <thead>
        const userTableBody = document.querySelector('#userTable tbody');
        
        // Vider uniquement les anciennes lignes (sans toucher aux en-têtes)
        userTableBody.innerHTML = "";

        // Parcourir les utilisateurs et ajouter une ligne pour chacun
        users.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit-btn" onclick="editUser(${user.id})">Modifier</button>
                    <br>
                    <button class="delete-btn" onclick="deleteUser(${user.id})">Supprimer</button>
                </td>
            `;

            // Ajouter la ligne au tbody
            userTableBody.appendChild(row);
        });

    })
    .catch(err => {
        console.error("Erreur lors de l'affichage des utilisateurs :", err);
        alert("Impossible de charger la liste des utilisateurs.");
    });
}

// Fonction pour charger les données d'un utilisateur dans le formulaire (mode modification)
function editUser(id) {
    fetch(`http://.../api/users/${id}`)
    .then(res => res.json())
    .then(user => {
        // Remplir les champs du formulaire
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;

        // Si l'API renvoie le mot de passe (selon votre backend), le remplir
        if (user.password) {
            document.getElementById('password').value = user.password;
            document.getElementById('confirmPassword').value = user.password;
        } else {
            // Sinon, laisser les champs vides pour une nouvelle saisie
            document.getElementById('password').value = "";
            document.getElementById('confirmPassword').value = "";
        }

        // Stocker l'ID pour la mise à jour
        document.getElementById('userId').value = user.id;

        // Changer le texte du bouton si nécessaire
        const btn = document.querySelector('button.cree') || document.querySelector('.btn-primary');
        if (btn) btn.textContent = "Mettre à jour";
    })
    .catch(err => {
        console.error("Erreur lors du chargement de l'utilisateur :", err);
        alert("Erreur lors de la récupération des données.");
    });
}

// Fonction pour supprimer un utilisateur
function deleteUser(id) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
        return;
    }

    fetch(`http://.../api/users/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(result => {
        alert("Utilisateur supprimé avec succès !");
        displayUsers(); // Rafraîchir la liste après suppression
    })
    .catch(err => {
        console.error("Erreur lors de la suppression :", err);
        alert("Erreur lors de la suppression de l'utilisateur.");
    });
}

// Chargement initial de la liste des utilisateurs au chargement de la page
displayUsers();