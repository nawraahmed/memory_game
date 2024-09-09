
////////////////////////////////
// Global Variables For Game Logic
let firstCard = '';
let secondCard = '';
let totalPairs = 0;
let matchedPairs = 0;

//select the game board
let gameBoard = document.querySelector('.game-board')

//array of images
let images = ['duck.png', 'glasses.png', 'coffee.png', 'js.png', 'break.png', 'error.png']

//duplicate the array to create pairs
let cardImages = images.concat(images)

let winnerScreen = document.querySelector('.winner');



////////////////////////////////
// Functions For Game Logic 

        //reset variables function
        resetCards = () => {
            firstCard = ''
            secondCard = ''
        }

        //check for a win function
        const checkForWin = (totalPairs, matchedPairs) => {
            console.log(`total pairs: ${totalPairs}`)
            console.log(`matched pairs: ${matchedPairs}`)

            if(totalPairs === matchedPairs){
                //If all pairs are matched, display a successful message
                winnerScreen.style.opacity = 1;
                winnerScreen.style.visibility = "visible";
            }
        }

        const compareCards = (firstCard, secondCard) => {
            //Compare firstCard and secondCard
            if (firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image')) {
                // It's a match!
                //console.log("IT's A MATCHHHH!!!")

                //increase the number of matchedPairs
                matchedPairs++;

                // Reset first and second cards after a match
                resetCards();

                //After every successful match, check if all pairs have been found
                checkForWin(totalPairs, matchedPairs)

            } else {
                console.log("cards are not matching");
                // If they don’t match: flip both cards back down after 1 sec
                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');

                    // Reset first and second cards after the flip
                    resetCards();
                }, 1000); // 1 second delay
            }
        }

        //Shuffle the array using sort with a random comparison function
        cardImages.sort(() => Math.random() - 0.5);
        console.log(cardImages)




     ////////////////////////////////
    // Event Listners For Game Logic 

// a loop to spread the cards on the game board
for (let i = 0; i < cardImages.length; i++) {

    //assign the number of pairs to the variable
    totalPairs = cardImages.length / 2;

    //card container that holds the front/back sides of the card
    const cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'card-container');
    gameBoard.appendChild(cardContainer);

    // Create the back side of the card (GA logo)
    const cardBack = document.createElement('div');
    cardBack.setAttribute('class', 'cardBack');
    cardContainer.appendChild(cardBack);

    const backImage = document.createElement('img');
    backImage.setAttribute('src', './images/ga.png');
    backImage.setAttribute('class', 'cardContent');
    cardBack.appendChild(backImage);


    // Create the front side of the card (random image)
    const cardFront = document.createElement('div');
    cardFront.setAttribute('class', 'cardFront');
    cardContainer.appendChild(cardFront);

    const frontImage = document.createElement('img');
    frontImage.setAttribute('src', `./images/${cardImages[i]}`);
    frontImage.setAttribute('class', 'cardContent');
    cardFront.appendChild(frontImage);

    //to identify images, use the name of the image
    cardContainer.setAttribute('data-image', cardImages[i]);

    // Flip on click
    cardContainer.addEventListener('click', () => {

        
        //flip the card (toggle the css class)
        cardContainer.classList.toggle('flipped');

        //store the whole card
        let clickedCard = cardContainer;

        //If firstCard is not set, set it to the clicked card
        if (firstCard == ''){
            //assign the first card
            firstCard = clickedCard

        }else{

            //If firstCard is set, set secondCard to the clicked card
            secondCard = clickedCard

            //both cards set, compare them
            compareCards(firstCard, secondCard)
        }
    });
}


//Keep score based on the number of moves or time taken




//function that randomize the array and resets the game.
//Reset all variables 
//or a cancel this function and navigate to the next level


