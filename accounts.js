// Fonction pour vérifier que le texte contient uniquement des lettres et des espaces
function isValidText(text) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(text);
}

// Variables pour la pagination
let currentCryptoPage = 1;
let currentTransferPage = 1;
const itemsPerPage = 1;

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

// Fonction pour déconnecter (si nécessaire, ajouter logique ici)
function logout() {
    // Logique de déconnexion, par exemple redirection
    window.location.href = 'connexion.html';
}

// Ajouter une nouvelle cryptomonnaie
async function addCrypto() {
    const name = document.getElementById('cryptoName').value.trim();
    const quantite = parseFloat(document.getElementById('cryptoQuantite').value);

    if (!name || !isValidText(name)) {
        alert('Le nom doit contenir uniquement des lettres et des espaces.');
        return;
    }
    if (isNaN(quantite) || quantite <= 0) {
        alert('La quantité doit être un nombre positif supérieur à 0.');
        return;
    }

    const dateAjoute = new Date().toISOString();
    try {
        const response = await fetch('http://.../api/cryptos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, quantite, date_ajoute: dateAjoute })
        });

        if (!response.ok) {
            throw new Error(`Erreur de serveur: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message || 'Cryptomonnaie ajoutée avec succès');
        document.getElementById('addCryptoForm').reset();
        showCryptos();
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la cryptomonnaie:', error);
        alert('Erreur lors de l\'ajout de la cryptomonnaie. Vérifiez votre connexion.');
    }
}

// Ajouter un nouveau transfert
async function addTransfers() {
    const sourceName = document.getElementById('sourceName').value.trim();
    const destinationName = document.getElementById('destinationName').value.trim();
    const quantite = parseFloat(document.getElementById('transfersQuantite').value);

    if (!sourceName || !isValidText(sourceName)) {
        alert('La source doit contenir uniquement des lettres et des espaces.');
        return;
    }
    if (!destinationName || !isValidText(destinationName)) {
        alert('La destination doit contenir uniquement des lettres et des espaces.');
        return;
    }
    if (isNaN(quantite) || quantite <= 0) {
        alert('La quantité doit être un nombre positif supérieur à 0.');
        return;
    }

    const dateTransfert = new Date().toISOString();
    try {
        const response = await fetch('http://...api/transfers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ source_name: sourceName, destination_name: destinationName, quantite, date_transfert: dateTransfert })
        });

        if (!response.ok) {
            throw new Error(`Erreur de serveur: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message || 'Transfert ajouté avec succès');
        document.getElementById('addTransfersForm').reset();
        showTransfers();
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la transfer:', error);
        alert('Erreur lors de l\'ajout du transfert. Vérifiez votre connexion.');
    }
}

// Fonction pour formater la chaîne de date ISO au format souhaité
function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Fonction pour afficher les cryptomonnaies avec pagination
async function showCryptos() {
    try {
        const response = await fetch('http://.../api/cryptos');
        if (!response.ok) {
            throw new Error(`Erreur de serveur: ${response.status}`);
        }
        const data = await response.json();
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const start = (currentCryptoPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = data.slice(start, end);

        const cryptoTableBody = document.querySelector('#cryptoTable tbody');
        cryptoTableBody.innerHTML = '';
        paginatedData.forEach(crypto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${crypto.name}</td>
                <td>${crypto.quantite_account}</td>
                <td>${crypto.date_ajoute ? formatDate(crypto.date_ajoute) : 'Non défini'}</td>
                <td><button onclick="deleteCrypto(${crypto.id})">Supprimer</button></td>
            `;
            cryptoTableBody.appendChild(row);
        });

        // Afficher le tableau et la pagination
        document.querySelector('#cryptoTable').closest('.table-container').classList.add('show');
        const pagination = document.getElementById('cryptoPagination');
        const pageInfo = document.getElementById('cryptoPageInfo');
        if (totalPages > 1) {
            pagination.style.display = 'flex';
            pageInfo.textContent = `Page ${currentCryptoPage} sur ${totalPages}`;
            document.querySelector('#cryptoPagination button:first-child').disabled = currentCryptoPage === 1;
            document.querySelector('#cryptoPagination button:last-child').disabled = currentCryptoPage === totalPages;
        } else {
            pagination.style.display = 'none';
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        alert('Erreur lors du chargement des cryptomonnaies.');
    }
}

// Fonction pour afficher les transferts avec pagination
async function showTransfers() {
    try {
        const response = await fetch('http://.../api/transfers');
        if (!response.ok) {
            throw new Error(`Erreur de serveur: ${response.status}`);
        }
        const data = await response.json();
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const start = (currentTransferPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = data.slice(start, end);

        const transferTableBody = document.querySelector('#transferTable tbody');
        transferTableBody.innerHTML = '';
        paginatedData.forEach(transfer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transfer.source_name}</td>
                <td>${transfer.destination_name}</td>
                <td>${transfer.quantite}</td>
                <td>${transfer.date_transfert ? formatDate(transfer.date_transfert) : 'Non défini'}</td>
                <td><button onclick="deleteTransfers(${transfer.id})">Supprimer</button></td>
            `;
            transferTableBody.appendChild(row);
        });

        // Afficher le tableau et la pagination
        document.querySelector('#transferTable').closest('.table-container').classList.add('show');
        const pagination = document.getElementById('transferPagination');
        const pageInfo = document.getElementById('transferPageInfo');
        if (totalPages > 1) {
            pagination.style.display = 'flex';
            pageInfo.textContent = `Page ${currentTransferPage} sur ${totalPages}`;
            document.querySelector('#transferPagination button:first-child').disabled = currentTransferPage === 1;
            document.querySelector('#transferPagination button:last-child').disabled = currentTransferPage === totalPages;
        } else {
            pagination.style.display = 'none';
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        alert('Erreur lors du chargement des transferts.');
    }
}

// Fonctions pour la pagination des cryptomonnaies
function nextCryptoPage() {
    currentCryptoPage++;
    showCryptos();
}

function prevCryptoPage() {
    currentCryptoPage--;
    showCryptos();
}

// Fonctions pour la pagination des transferts
function nextTransferPage() {
    currentTransferPage++;
    showTransfers();
}

function prevTransferPage() {
    currentTransferPage--;
    showTransfers();
}

// Fonction pour supprimer une cryptomonnaie
function deleteCrypto(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette cryptomonnaie ?')) {
        fetch(`http://.../api/cryptos/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                currentCryptoPage = 1; // Réinitialiser à la première page après suppression
                showCryptos();
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de la cryptomonnaie:', error);
                alert('Erreur lors de la suppression de la cryptomonnaie');
            });
    }
}

// Fonction pour supprimer un transfert
function deleteTransfers(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce transfert ?')) {
        fetch(`http://.../api/transfers/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                currentTransferPage = 1; // Réinitialiser à la première page après suppression
                showTransfers();
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du transfert:', error);
                alert('Erreur lors de la suppression du transfert');
            });
    }
}