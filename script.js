// script.js

// Tableau des scénarios
const scenarios = [
    {
        scenarioText: "Niveau 1 : Vous conduisez une voiture autonome lorsqu'un enfant traverse soudainement la route devant vous. Vous pouvez soit freiner brusquement et risquer une collision avec le véhicule derrière vous, soit dévier sur la voie opposée où arrive un motocycliste sans casque. Que faites-vous ?",
        choices: [
            {   
                text: "Freiner brusquement" 
            },
            {
                 text: "Dévier sur la voie opposée" 
            }
        ],
        assistantChoice: "Freiner brusquement",
        assistantExplanation: "L'IA choisirait de freiner brusquement pour protéger l'enfant, même si cela présente un risque de collision arrière. La vie de l'enfant est prioritaire, et il est préférable de risquer des dommages matériels plutôt que de mettre en danger la vie d'un piéton."
    },
    {
        scenarioText: "Niveau 2 : Vous êtes dans une voiture autonome lorsqu'un groupe de cinq piétons traverse illégalement devant vous. À droite, il y a un mur solide. Vous devez choisir entre percuter les piétons ou dévier et heurter le mur, mettant votre propre sécurité en danger. Que faites-vous ?",
        scenarioImage: "images/scenario2.jpg",
        choices: [
            { text: "Continuer tout droit et heurter les piétons" },
            { text: "Dévier et heurter le mur" }
        ],
        assistantChoice: "Dévier et heurter le mur",
        assistantExplanation: "L'IA choisirait de dévier et heurter le mur pour sauver le plus grand nombre de vies. Même si cela met en danger le conducteur, le principe éthique de minimiser les pertes humaines s'applique."
    },
    // Ajoutez d'autres scénarios ici
];

// Index du scénario actuel
let currentScenarioIndex = 0;

// Stockage des choix de l'utilisateur
let userChoices = [];



// Récupération des éléments du DOM
const scenarioTextElement = document.getElementById('scenario-text');
const scenarioImageElement = document.getElementById('scenario-image');
const choicesContainer = document.getElementById('choices-container');
const responseContainer = document.getElementById('response-container');
const assistantResponseElement = document.getElementById('assistant-response');
const nextButton = document.getElementById('next-button');

// Fonction pour afficher le scénario actuel
function displayScenario() {
    const currentScenario = scenarios[currentScenarioIndex];
    scenarioTextElement.textContent = currentScenario.scenarioText;
    scenarioImageElement.src = currentScenario.scenarioImage;

    // Réinitialiser les choix et la réponse
    choicesContainer.innerHTML = '';
    responseContainer.style.display = 'none';
    nextButton.style.display = 'none';

    // Générer les boutons de choix
    currentScenario.choices.forEach((choice) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.classList.add('choice-button');
        button.addEventListener('click', () => {
            handleChoice(choice);
        });
        choicesContainer.appendChild(button);
    });
}

// Fonction pour gérer le choix de l'utilisateur
function handleChoice(userSelectedChoice) {
    const currentScenario = scenarios[currentScenarioIndex];

    // Enregistrer le choix de l'utilisateur
    userChoices.push({
        scenario: currentScenario.scenarioText,
        userChoice: userSelectedChoice.text,
        assistantChoice: currentScenario.assistantChoice,
        assistantExplanation: currentScenario.assistantExplanation
    });

    // Afficher la réponse de l'IA
    responseContainer.style.display = 'block';

    // Afficher le choix de l'IA
    assistantResponseElement.innerHTML = `
        <p><strong>Choix de l'IA :</strong> ${currentScenario.assistantChoice}</p>
        <p><strong>Explication de l'IA :</strong> ${currentScenario.assistantExplanation}</p>
    `;

    const comparisonMessage = document.createElement('p');
    if (userSelectedChoice.text === currentScenario.assistantChoice) {
        comparisonMessage.textContent = "✅ Votre choix correspond à celui de l'IA.";
    } else {
        comparisonMessage.textContent = "❌ Votre choix est différent de celui de l'IA.";
    }
    assistantResponseElement.appendChild(comparisonMessage);

    // Désactiver les boutons de choix
    const buttons = document.querySelectorAll('.choice-button');
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Afficher le bouton "Niveau Suivant"
    nextButton.style.display = 'block';
}


// Gestion du bouton "Niveau Suivant"
nextButton.addEventListener('click', () => {
    currentScenarioIndex++;
    if (currentScenarioIndex < scenarios.length) {
        displayScenario();
    } else {
        displaySummary();
    }
});

// Au chargement de la page, afficher le premier scénario
window.onload = displayScenario;


function displaySummary() {
    // Effacer le contenu du jeu
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '<h2>Résumé de vos choix</h2>';

    // Créer une liste pour afficher les choix
    userChoices.forEach((choiceData, index) => {
        const div = document.createElement('div');
        div.classList.add('summary-item');
        div.innerHTML = `
            <h3>Niveau ${index + 1}</h3>
            <p><strong>Scénario :</strong> ${choiceData.scenario}</p>
            <p><strong>Votre choix :</strong> ${choiceData.userChoice}</p>
            <p><strong>Choix de l'IA :</strong> ${choiceData.assistantChoice}</p>
            <p><strong>Explication de l'IA :</strong> ${choiceData.assistantExplanation}</p>
        `;
        gameContainer.appendChild(div);
    });

    // Ajouter un message de fin
    const endMessage = document.createElement('p');
    endMessage.textContent = "Merci d'avoir joué !";
    gameContainer.appendChild(endMessage);
}
