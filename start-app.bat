@echo off
echo ========================================
echo    Workout Alchemy - Lancement
echo ========================================
echo.

REM Ajouter Node.js au PATH
set PATH=%PATH%;C:\Program Files\nodejs

REM Vérifier Node.js
echo Vérification de Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js non trouvé. Vérifiez l'installation.
    pause
    exit /b 1
)

REM Vérifier npm
echo Vérification de npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm non trouvé. Vérifiez l'installation.
    pause
    exit /b 1
)

echo ✅ Node.js et npm sont disponibles
echo.

REM Aller dans le répertoire du projet
cd /d "C:\Users\Korat\Desktop\workout-alchemy-app"

REM Installer les dépendances si nécessaire
if not exist "node_modules" (
    echo Installation des dépendances...
    npm install
)

echo.
echo 🚀 Lancement de l'application...
echo 📱 L'application sera accessible à: http://localhost:8080
echo ⏹️  Appuyez sur Ctrl+C pour arrêter le serveur
echo.

npm run dev 