
////////////////////////////////
// Global Variables For Game Logic
let firstCard = '';
let secondCard = '';
let totalPairs = 0;
let matchedPairs = 0;
let win = false;
let images = ['duck.png', 'glasses.png', 'coffee.png', 'js.png', 'break.png', 'error.png'];

//query selectors
let gameBoard = document.querySelector('.game-board');
let winnerScreen = document.querySelector('.winner');
let losingScreen = document.querySelector('.loser');
const resetButton = document.querySelector('#resetButton');
let timerDisplay = document.querySelector('#timer');

//duplicate the array to create pairs
let cardImages = images.concat(images);


////////////////////////////////
// Functions For Game Logic 

        //reset variables function
        resetCards = () => {
            firstCard = ''
            secondCard = ''
        }

        //check for a win 
        const checkForWin = (totalPairs, matchedPairs) => {
            console.log(`total pairs: ${totalPairs}`)
            console.log(`matched pairs: ${matchedPairs}`)

            if(totalPairs === matchedPairs){
                //If all pairs are matched, display a successful message
                winnerScreen.style.opacity = 1;
                winnerScreen.style.visibility = "visible";

                //assign win to true
                win = true
            }
        }
        
        const disableCardsClicking = (status) => {
            if(status === 'add'){
                // Disable clicking on all cards
                document.querySelectorAll('.card-container').forEach(card => card.classList.add('disabled'));
            }else{
                document.querySelectorAll('.card-container').forEach(card => card.classList.remove('disabled'));
            }
        }

        //compare both cards, to check if they match or not
        const compareCards = (firstCard, secondCard) => {
            // Disable clicking on all cards
            disableCardsClicking('add')

            //Compare firstCard and secondCard
            if (firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image')) {
                
                //increase the number of matchedPairs
                matchedPairs++;

                // Reset first and second cards after a match
                resetCards();

                // Re-enable clicking on all cards
                disableCardsClicking('remove')


                //After every successful match, check if all pairs have been found
                checkForWin(totalPairs, matchedPairs);

            } else {
                console.log("cards are not matching");

                // If they don’t match: flip both cards back down after 1 sec
                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');

                    // Reset first and second cards after the flip
                    resetCards();

                    // Re-enable clicking on all cards
                    disableCardsClicking('remove')
                }, 1000); // 1 second delay
            }
        }

        //countdown to handle losing cases
        const startTimer = ()=>{
            let time = 90;
            const timer = setInterval(() => {
                time--;
                timerDisplay.innerHTML = `timer: ${time} seconds`
                
                if (time === 0 && totalPairs !== matchedPairs) {

                    win = false;
                    clearInterval(timer);
                    // Show losing screen here
                    losingScreen.style.visibility = "visible";
                    losingScreen.style.opacity = 1;
                }

                //disable the timer in case the user wins
                if(win){
                    clearInterval(timer);
                }
            }, 1000);
        } 




     ////////////////////////////////
    // Event Listners For Game Logic 

// Initialize or reset the game
const initializeGame = () => {
    // Clear existing cards from the game board
    gameBoard.innerHTML = '';

    // Shuffle the card images
    cardImages.sort(() => Math.random() - 0.5);

    // Assign the number of pairs to the variable
    totalPairs = cardImages.length / 2;

    // Create cards and add them to the game board
    for (let i = 0; i < cardImages.length; i++) {

        // Card container that holds the front/back sides of the card
        const cardContainer = document.createElement('div');
        cardContainer.setAttribute('class', 'card-container');
        gameBoard.appendChild(cardContainer);

        // Create the back side of the card
        const cardBack = document.createElement('div');
        cardBack.setAttribute('class', 'cardBack');
        cardContainer.appendChild(cardBack);

        const backImage = document.createElement('img');
        backImage.setAttribute('src', './images/ga.png');
        backImage.setAttribute('class', 'cardContent');
        cardBack.appendChild(backImage);

        // Create the front side of the card
        const cardFront = document.createElement('div');
        cardFront.setAttribute('class', 'cardFront');
        cardContainer.appendChild(cardFront);

        const frontImage = document.createElement('img');
        frontImage.setAttribute('src', `./images/${cardImages[i]}`);
        frontImage.setAttribute('class', 'cardContent');
        cardFront.appendChild(frontImage);

        // To identify images, use the name of the image
        cardContainer.setAttribute('data-image', cardImages[i]);

        // Flip on click
        cardContainer.addEventListener('click', () => {
            cardContainer.classList.toggle('flipped');
            let clickedCard = cardContainer;

            if (firstCard === '') {
                firstCard = clickedCard;
            } else {
                secondCard = clickedCard;
                compareCards(firstCard, secondCard);
            }
        });
    }

    // Reset game variables
    firstCard = '';
    secondCard = '';
    matchedPairs = 0;

    // Hide Winner and Losing Screens
    winnerScreen.style.opacity = 0;
    losingScreen.style.opacity = 0;
    losingScreen.style.visibility = "hidden";

    // Restart the timer
    startTimer();

    // Reset win variable
    win = false;
}

//reset the global variables
resetButton.addEventListener('click', () => {
    //Recall the game function
    initializeGame();
})

initializeGame();




