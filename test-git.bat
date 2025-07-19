@echo off
echo ========================================
echo    Test Git - Workout Alchemy
echo ========================================
echo.

echo Test de Git...
git --version
if %errorlevel% equ 0 (
    echo ✅ Git fonctionne correctement
    echo.
    echo Configuration Git...
    git config --global user.name "Korat"
    git config --global user.email "korat@example.com"
    echo ✅ Git configuré
    echo.
    echo Initialisation du dépôt...
    git init
    git add .
    git commit -m "Initial commit: Workout Alchemy app"
    echo ✅ Dépôt initialisé et premier commit créé
    echo.
    echo Prochaines étapes:
    echo 1. Créez un dépôt sur GitHub
    echo 2. Utilisez: git remote add origin URL_DU_DEPOT
    echo 3. Puis: git push -u origin main
) else (
    echo ❌ Git non trouvé
    echo Veuillez installer Git depuis: https://git-scm.com/download/win
)

echo.
pause 