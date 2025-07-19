@echo off
echo ========================================
echo    Configuration Git - Workout Alchemy
echo ========================================
echo.

REM Vérifier si Git est installé
echo Vérification de Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git non trouvé. Veuillez installer Git depuis:
    echo https://git-scm.com/download/win
    echo.
    echo Après l'installation, relancez ce script.
    pause
    exit /b 1
)

echo ✅ Git trouvé
echo.

REM Aller dans le répertoire du projet
cd /d "C:\Users\Korat\Desktop\workout-alchemy-app"

REM Initialiser Git si ce n'est pas déjà fait
if not exist ".git" (
    echo Initialisation du dépôt Git...
    git init
    echo ✅ Dépôt Git initialisé
) else (
    echo ✅ Dépôt Git déjà initialisé
)

REM Créer un .gitignore approprié
echo Configuration du .gitignore...
(
echo # Dependencies
echo node_modules/
echo npm-debug.log*
echo yarn-debug.log*
echo yarn-error.log*
echo.
echo # Build outputs
echo dist/
echo build/
echo.
echo # Environment variables
echo .env
echo .env.local
echo .env.development.local
echo .env.test.local
echo .env.production.local
echo.
echo # IDE files
echo .vscode/
echo .idea/
echo *.swp
echo *.swo
echo.
echo # OS files
echo .DS_Store
echo Thumbs.db
echo.
echo # Logs
echo *.log
echo.
echo # Runtime data
echo pids
echo *.pid
echo *.seed
echo *.pid.lock
echo.
echo # Coverage directory used by tools like istanbul
echo coverage/
echo.
echo # nyc test coverage
echo .nyc_output
echo.
echo # Dependency directories
echo jspm_packages/
echo.
echo # Optional npm cache directory
echo .npm
echo.
echo # Optional REPL history
echo .node_repl_history
echo.
echo # Output of 'npm pack'
echo *.tgz
echo.
echo # Yarn Integrity file
echo .yarn-integrity
echo.
echo # parcel-bundler cache (https://parceljs.org/)
echo .cache
echo .parcel-cache
echo.
echo # next.js build output
echo .next
echo.
echo # nuxt.js build output
echo .nuxt
echo.
echo # vuepress build output
echo .vuepress/dist
echo.
echo # Serverless directories
echo .serverless
echo.
echo # FuseBox cache
echo .fusebox/
echo.
echo # DynamoDB Local files
echo .dynamodb/
echo.
echo # TernJS port file
echo .tern-port
) > .gitignore

echo ✅ .gitignore créé

REM Ajouter tous les fichiers
echo Ajout des fichiers au dépôt...
git add .

REM Faire le premier commit
echo Création du premier commit...
git commit -m "Initial commit: Workout Alchemy app with improved algorithm and exercise library"

echo.
echo ✅ Configuration Git terminée !
echo.
echo Prochaines étapes pour GitHub:
echo 1. Créez un nouveau dépôt sur GitHub
echo 2. Suivez les instructions pour connecter votre dépôt local
echo 3. Utilisez: git remote add origin ^<URL_DE_VOTRE_DEPOT^>
echo 4. Puis: git push -u origin main
echo.
echo Pour ajouter de nouvelles modifications:
echo git add .
echo git commit -m "Description des modifications"
echo git push
echo.

pause 