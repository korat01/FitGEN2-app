# Script pour lancer l'application Workout Alchemy
# Ajouter Node.js au PATH
$env:PATH += ";C:\Program Files\nodejs"

# Vérifier que Node.js est disponible
Write-Host "Vérification de Node.js..." -ForegroundColor Green
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js non trouvé. Vérifiez l'installation." -ForegroundColor Red
    exit 1
}

# Vérifier que npm est disponible
Write-Host "Vérification de npm..." -ForegroundColor Green
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm non trouvé. Vérifiez l'installation." -ForegroundColor Red
    exit 1
}

# Aller dans le répertoire du projet
Set-Location "C:\Users\Korat\Desktop\workout-alchemy-app"

# Installer les dépendances si nécessaire
Write-Host "Vérification des dépendances..." -ForegroundColor Green
if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dépendances..." -ForegroundColor Yellow
    npm install
}

# Lancer l'application
Write-Host "Lancement de l'application..." -ForegroundColor Green
Write-Host "L'application sera accessible à: http://localhost:8080" -ForegroundColor Cyan
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
Write-Host ""

npm run dev 