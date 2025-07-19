# Script de configuration Git pour Workout Alchemy
Write-Host "Configuration Git pour Workout Alchemy" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Vérifier si Git est installé
Write-Host "Vérification de Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ Git trouvé: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git non trouvé. Veuillez installer Git depuis https://git-scm.com/download/win" -ForegroundColor Red
    Write-Host "Après l'installation, relancez ce script." -ForegroundColor Yellow
    pause
    exit 1
}

# Aller dans le répertoire du projet
Set-Location "C:\Users\Korat\Desktop\workout-alchemy-app"

# Initialiser Git si ce n'est pas déjà fait
if (-not (Test-Path ".git")) {
    Write-Host "Initialisation du dépôt Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Dépôt Git initialisé" -ForegroundColor Green
} else {
    Write-Host "✅ Dépôt Git déjà initialisé" -ForegroundColor Green
}

# Créer un .gitignore approprié
Write-Host "Configuration du .gitignore..." -ForegroundColor Yellow
$gitignore = @"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port
"@

$gitignore | Out-File -FilePath ".gitignore" -Encoding UTF8
Write-Host "✅ .gitignore créé" -ForegroundColor Green

# Ajouter tous les fichiers
Write-Host "Ajout des fichiers au dépôt..." -ForegroundColor Yellow
git add .

# Faire le premier commit
Write-Host "Création du premier commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Workout Alchemy app with improved algorithm and exercise library"

Write-Host ""
Write-Host "✅ Configuration Git terminée !" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines étapes pour GitHub :" -ForegroundColor Cyan
Write-Host "1. Créez un nouveau dépôt sur GitHub" -ForegroundColor White
Write-Host "2. Suivez les instructions pour connecter votre dépôt local" -ForegroundColor White
Write-Host "3. Utilisez : git remote add origin <URL_DE_VOTRE_DEPOT>" -ForegroundColor White
Write-Host "4. Puis : git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "Pour ajouter de nouvelles modifications :" -ForegroundColor Cyan
Write-Host "git add ." -ForegroundColor White
Write-Host "git commit -m 'Description des modifications'" -ForegroundColor White
Write-Host "git push" -ForegroundColor White
Write-Host ""

pause 