// Charger l'historique au démarrage
document.addEventListener("DOMContentLoaded", () => {
    displayHistory();
});

function generatePassword() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*";
    
    const length = parseInt(document.querySelector('input[name="length"]:checked').value);
    
    const minRequirements = [
        letters[Math.floor(Math.random() * letters.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];
    
    const allChars = letters + numbers + symbols;
    let password = minRequirements.join("");
    for (let i = minRequirements.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');
    document.getElementById("passwordOutput").value = password;

    // Sauvegarder le mot de passe dans l'historique
    savePassword(password);
    displayHistory();
}

function copyPassword() {
    const passwordField = document.getElementById("passwordOutput");
    navigator.clipboard.writeText(passwordField.value)
        .then(() => alert("Mot de passe copié dans le presse-papiers !"))
        .catch(err => console.error("Erreur de copie : ", err));
}

function toggleTheme() {
    document.body.classList.toggle("dark");
    const themeButton = document.getElementById("themeToggle");
    themeButton.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// Sauvegarder un mot de passe dans localStorage
function savePassword(password) {
    let history = JSON.parse(localStorage.getItem("passwordHistory")) || [];
    history.unshift(password); // Ajouter au début
    if (history.length > 10) {
        history = history.slice(0, 10); // Limiter à 10
    }
    localStorage.setItem("passwordHistory", JSON.stringify(history));
}

// Afficher l'historique
function displayHistory() {
    const historyList = document.getElementById("passwordHistory");
    const history = JSON.parse(localStorage.getItem("passwordHistory")) || [];
    historyList.innerHTML = "";
    history.forEach((password, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${password}
            <div>
                <button onclick="copyFromHistory('${password}')">Copier</button>
                <button onclick="deletePassword(${index})">Supprimer</button>
            </div>
        `;
        historyList.appendChild(li);
    });
}

// Copier un mot de passe depuis l'historique
function copyFromHistory(password) {
    navigator.clipboard.writeText(password)
        .then(() => alert("Mot de passe copié dans le presse-papiers !"))
        .catch(err => console.error("Erreur de copie : ", err));
}

// Supprimer un mot de passe de l'historique
function deletePassword(index) {
    let history = JSON.parse(localStorage.getItem("passwordHistory")) || [];
    history.splice(index, 1);
    localStorage.setItem("passwordHistory", JSON.stringify(history));
    displayHistory();
}

// Vider l'historique
function clearHistory() {
    localStorage.removeItem("passwordHistory");
    displayHistory();
}
