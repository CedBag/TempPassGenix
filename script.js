function generatePassword() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*";
    
    const length = parseInt(document.querySelector('input[name="length"]:checked').value);
    
    // Assurer au moins un caractère de chaque type
    const minRequirements = [
        letters[Math.floor(Math.random() * letters.length)], // 1 lettre
        numbers[Math.floor(Math.random() * numbers.length)], // 1 chiffre
        symbols[Math.floor(Math.random() * symbols.length)]  // 1 symbole
    ];
    
    // Compléter avec des caractères aléatoires
    const allChars = letters + numbers + symbols;
    let password = minRequirements.join("");
    for (let i = minRequirements.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    // Mélanger le mot de passe pour éviter un ordre prévisible
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    document.getElementById("passwordOutput").value = password;
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