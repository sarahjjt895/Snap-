// --- Event functions ---

// Triggered when a new game is started
function onStartNewGame(ev) {
    // Reset the game state
    resetGame();

    // Shuffle the deck when starting a new game
    shuffledDeck = shuffleDeck(createDeck());

    // Draw the top card if there are cards remaining in the deck
    if (shuffledDeck.length > 0) {
        const topCard = shuffledDeck.shift(); // Draw the top card

        drawnCards.push(topCard); // Add the drawn card to the drawnCards array
        displayCard(topCard);

        // Update the counters for remaining cards and drawn cards
        const newCardLeftCounter = shuffledDeck.length;
        const newCardRightCounter = drawnCards.length;

        // Update the HTML elements to show the new counts
        updateDisplay('#cards-remaining', newCardLeftCounter);
        updateDisplay('#cards-played', newCardRightCounter);

    } else {
        console.log("No more cards in the deck!");
    }

    // Print shuffled deck for testing
    console.log(shuffledDeck);
}

// Triggered when the "Next Card" button is clicked
function onNextCard(ev) {
    let opponentAnimation = document.querySelector("#opponent-progress");
    resetAnimation(opponentAnimation, onOpponentAnimEnd);

    // Draw a card if there are cards remaining in the deck
    if (shuffledDeck.length > 0) {
        const topCard = shuffledDeck.shift(); // Draw the top card

        drawnCards.push(topCard); // Add the drawn card to the drawnCards array
        displayCard(topCard);

        // Update the counters for remaining cards and drawn cards
        const newCardLeftCounter = shuffledDeck.length;
        const newCardRightCounter = drawnCards.length;
        const cardsRemainingElement = document.getElementById('#cards-remaining');
        cardsRemainingElement.textContent = newCardLeftCounter;
        const cardsPointsElement = document.getElementById('#cards-played');
        cardsPointsElement.textContent = newCardRightCounter;

        // Start a 5 seconds timer
        timerCallback()

        console.log("Card drawn:", topCard.name);

    } else {
        console.log("No more cards in the deck!");
    }
    if (pointsPlayerOne + pointsPlayerTwo + drawnCards.length === 52) {
        updateWinnerLoserText();
    }
}

// Global variables to store the points for Player 1 and Player 2
let pointsPlayerOne = 0;
let pointsPlayerTwo = 0;

function onSnapCard(ev) {
    // Check if there are at least two drawn cards
    if (drawnCards.length >= 2) {
        const lastDrawnCard = drawnCards[drawnCards.length - 2];
        const newCard = drawnCards[drawnCards.length - 1];

        // Check if the last two drawn cards match
        if (lastDrawnCard.rank === newCard.rank) {
            // Determine which player gets the points based on button clicked
            pointsPlayerOne += drawnCards.length;
            updateDisplay('#player-score', pointsPlayerOne);
            updateDisplay('#cards-played', 0);

        } else {
            pointsPlayerTwo += drawnCards.length;
            updateDisplay('#opponent-score', pointsPlayerTwo);
            updateDisplay('#cards-played', 0);
        }
    } else {
        console.log("Not enough cards drawn for snap comparison.");
    }
    drawnCards.length = 0;
}

// Function to update the points display on the HTML page
function updateDisplay(elementId, points) {
    const cardsPointsPlayers = document.getElementById(elementId);
    cardsPointsPlayers.textContent = points;

}

// Triggered when the opponent's animation ends
// Triggered when the opponent's animation ends
function onOpponentAnimEnd(ev) {
    if (drawnCards.length >= 2) {

        const lastDrawnCard = drawnCards[drawnCards.length - 2];
        const newCard = drawnCards[drawnCards.length - 1];

        if (timerExpired && lastDrawnCard.rank === newCard.rank) {
            pointsPlayerTwo += drawnCards.length;
            updateDisplay('#opponent-score', pointsPlayerTwo);
            drawnCards.length = 0;
        }
    } else {
        console.log("Not enough cards drawn for snap comparison.");
    }

}

// Global variables to store the shuffled deck and drawn cards
let shuffledDeck = [];
let drawnCards = [];

// Function to create a deck of cards
function createDeck() {
    // Define the suits and ranks for a standard deck of cards
    const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
    const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

    const deck = [];

    // Create each card by combining suits and ranks
    for (const suit of suits) {
        for (const rank of ranks) {
            const card = {
                name: `${rank} of ${suit}`,
                suite: suit,
                rank: rank,
                image: `resources/playing-cards/card-${suit.toLowerCase()}-${rank.toLowerCase()}.png`
            };
            deck.push(card);
        }
    }

    return deck;
}

// Function to shuffle the deck using the Fisher-Yates algorithm
function shuffleDeck(deck) {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
}

// Function to display a card in the 'current-card' HTML element
function displayCard(card) {
    // Get the image source and text content from the card
    const newImageSource = card.image;
    const newTextContent = card.name;

    // Function to update the HTML content
    function updateCardContent() {
        // Update the image source
        const cardImage = document.querySelector(".card-border img");
        cardImage.src = newImageSource;

        // Update the text content using getElementById
        const cardNameParagraph = document.getElementById('#card-name');
        cardNameParagraph.textContent = newTextContent;
    }

    // Call the function to update the HTML content
    updateCardContent();
}

// Function to reset the game state
function resetGame() {
    // Clear displayed cards (replace with your actual logic)
    document.querySelector(".card-border img").src = "resources/playing-cards/card-blank.png";
    document.getElementById('#card-name').textContent = "Blank Card";

    document.getElementById('#player-score').textContent = "0";
    document.getElementById('#opponent-score').textContent = "0";
    document.getElementById('#cards-played').textContent = "0";

    document.getElementById('#winnerLoser').textContent = "Welcome to Snap";

    drawnCards.length = 0;
    pointsPlayerOne = 0;
    pointsPlayerTwo = 0;

}

// Flag variable to track button click
let buttonClicked = false;

// Variable to track whether the timer has expired
let timerExpired = false;

// Function to be executed after the timer
function timerCallback() {
    if (buttonClicked) {
        console.log("Button was clicked before the timer expired!");
    } else {
        console.log("Timer expired.");
        timerExpired = true;
    }
}

// Set a timer for 5 seconds (5000 milliseconds)
const timer = setTimeout(timerCallback, 5000);

// Event handler for the button click
function onSnapButtonClick() {
    // Set the flag to true when the button is clicked
    buttonClicked = true;

    // Cancel the timer
    clearTimeout(timer);

    console.log("Snap button clicked!");
    onSnapCard();
}
//Determine winner or loser by comparing the points of the two players, notify player on screen
function updateWinnerLoserText() {
    const winnerLoserElement = document.getElementById('#winnerLoser');

    if (pointsPlayerOne > pointsPlayerTwo) {
        winnerLoserElement.textContent = "Player Won :)";
    } else if (pointsPlayerTwo > pointsPlayerOne) {
        winnerLoserElement.textContent = "Opponent Won :(";
    } else {
        winnerLoserElement.textContent = "Draw - Play again";
    }
}


// Event handlers setup
function setup() {
    // Start new game onclick
    document
        .querySelector("#new-game-input")
        .addEventListener('pointerdown', onStartNewGame);

    // Next card onclick
    document
        .querySelector("#next-card")
        .addEventListener('pointerdown', onNextCard);

    // Snap button onclick
    document
        .querySelector("#snap-input")
        .addEventListener('pointerdown', onSnapButtonClick);

    // Opponent animation end
    document
        .querySelector("#opponent-progress")
        .addEventListener('animationend', onOpponentAnimEnd);
}

// Run the setup function when the page is fully loaded
window.onload = setup;

