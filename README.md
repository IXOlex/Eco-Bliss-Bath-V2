<div align="center">

# OpenClassrooms - Eco-Bliss-Bath
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

# Prérequis
Pour démarrer cet applicatif web vous devez avoir les outils suivants:
- Docker
- NodeJs

# Installation et démarrage
Clonez le projet pour le récupérer
``` 
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```
Pour démarrer l'API avec ça base de données.
```
docker compose up -d
```
# Pour démarrer le frontend de l'applicatif
Rendez-vous dans le dossier frontend
```
cd ./frontend
```
Installez les dépendances du projet
```
npm i
ou
npm install (si vous préférez)
```
Démarrez le frontend Angular :

```bash
npm start
```

Le frontend sera disponible sur :

```text
http://localhost:4200
```
# Installation de Cypress

Depuis le dossier frontend :

```bash
npm install cypress --save-dev
```
# Lancer les tests

## Mode interface graphique

```bash
npx cypress open
```

## Mode terminal

```bash
npx cypress run
```
# Structure des tests

```text
cypress/e2e/
├── auth.cy.js
├── cart.cy.js
├── products.cy.js
├── reviews.cy.js
├── smoke.cy.js
└── xss.cy.js
```
# Tests automatisés réalisés

- Tests API
- Smoke tests
- Tests XSS
- Tests fonctionnels critiques

## Documentation

Le bilan de campagne de test est disponible dans :

```text
/docs/bilan-campagne-test.pdf
