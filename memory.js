const symbols = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];
let shuffledSymbols = [];

const memoryGameContainer = document.getElementById("memory-game-container");
const startGameButton = document.getElementById("start-game-button");

let flippedCards = [];
let matchedPairs = 0;

// Shuffle the symbols
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}




// Create card elements
function createCard(symbol) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = "?";
    card.dataset.symbol = symbol;

    card.addEventListener("click", () => {
        if (!card.classList.contains("matched") && flippedCards.length < 2) {
            flipCard(card);
            checkForMatch();
        }
    });

    // Add a "dblclick" event listener to each card
    card.addEventListener("dblclick", () => {
        if (!card.classList.contains("matched") && card.textContent === "?") {
            flipCard(card);
            checkForMatch();
        }
    });

    return card;
}
// Flip a card
function flipCard(card) {
    if (!card.classList.contains("matched") && !card.classList.contains("flipped") && flippedCards.length < 2) {
        card.textContent = card.dataset.symbol;
        flippedCards.push(card);
        card.classList.add("flipped");

        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;
            if (card1.dataset.symbol === card2.dataset.symbol) {
                card1.classList.add("matched");
                card2.classList.add("matched");
                matchedPairs++;
                if (matchedPairs === symbols.length / 2) {
                    const audio = document.getElementById("background-music");
                    audio.pause();
                    const correctAudio = document.getElementById("correct-audio");
                    correctAudio.play(); // Play correct audio feedback
                    const clapAudio = document.getElementById("clap-audio");
                    clapAudio.play(); // Play correct audio feedback
                    alert("Congratulations! You've won the game.");
                }
            } else {
                setTimeout(() => {
                    card1.textContent = "?";
                    card2.textContent = "?";
                    card1.classList.remove("flipped");
                    card2.classList.remove("flipped");
                }, 1000);
            }
            flippedCards = [];
        }
    }
}



// Check for a match
function checkForMatch() {
    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (card1.dataset.symbol === card2.dataset.symbol) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedPairs++;
            if (matchedPairs === symbols.length / 2) {
                alert("Congratulations! You've won the game.");
            }
        } else {
            setTimeout(() => {
                card1.textContent = "?";
                card2.textContent = "?";
            }, 1000);
        }
        flippedCards = [];
    }
}

// Initialize the game
function initializeGame() {
   
    shuffledSymbols = [...symbols];
    shuffleArray(shuffledSymbols);
    matchedPairs = 0;
    flippedCards = [];
    memoryGameContainer.innerHTML = "";

    for (const symbol of shuffledSymbols) {
        const card = createCard(symbol);
        memoryGameContainer.appendChild(card);
    }
    setTimeout(() => {
        audio.play();
    }, 500);

}

startGameButton.addEventListener("click", () => {
    initializeGame();
});

initializeGame(); // Initialize the game on page load




const audio = document.getElementById("background-music");
audio.play();
