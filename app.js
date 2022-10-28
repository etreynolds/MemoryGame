const gameContainer = document.getElementById("game");
const attempts = document.getElementById('attempts');
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;
let numberOfAttempts = 1;

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

let shuffledColors = shuffle(COLORS);
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
    }
}

// TODO: Implement this function!
function handleCardClick(e) {
    if (noClicking) return;
    if (e.target.classList.contains('flipped')) return;
    let lastClickedCard = e.target;
    lastClickedCard.style.backgroundColor = lastClickedCard.classList[0];

    // checks to see if card1 or card2 is falsey. if falsey, then "true" and code runs
    if (!card1 || !card2) {
        // adds .flipped class to lastClickedCard
        lastClickedCard.classList.add("flipped");

        // if card1 truthy, set card1 to card1 or lastClickedCard
        card1 = card1 || lastClickedCard;
        card2 = lastClickedCard === card1 ? null : lastClickedCard;
    }


    if (card1 && card2) {
        // if card1 and card2 are truthy, turn noClicking on
        attempts.innerText = `Attempts: ${numberOfAttempts++}`;
        noClicking = true;
        let cardColor1 = card1.className;
        let cardColor2 = card2.className;

        if (cardColor1 === cardColor2) {
            cardsFlipped += 2;
            card1.removeEventListener("click", handleCardClick);
            card2.removeEventListener("click", handleCardClick);
            card1 = null;
            card2 = null;
            noClicking = false;
        } else {
            setTimeout(function () {
                card1.style.backgroundColor = "";
                card2.style.backgroundColor = "";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1 = null;
                card2 = null;
                noClicking = false;
            }, 1000);
        }
    }

    if (cardsFlipped === COLORS.length) alert(`You win! It took you ${numberOfAttempts - 1} attempts.`);
}

// checked for 2 flipped cards
// if cards match, keep them showing color
// if cards do not match, flip again and remove color

// when the DOM loads
createDivsForColors(shuffledColors);

/* */