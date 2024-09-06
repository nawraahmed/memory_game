console.log("JS connected")

//Global variables

//selet the game board
let gameBoard = document.querySelector('.game-board')
console.log(gameBoard)

//an array of cardImages with the images/icons (duck, GA logo, etc.)
let images = ['ga.png', 'glasses.png']

// a loop to spread the cards on the game board
for(let i = 0; i < 15; i++){

    const cardBorder = document.createElement('div')
    cardBorder.setAttribute('class', 'cardBorder')
    gameBoard.appendChild(cardBorder)

        const card = document.createElement('img')
        card.setAttribute('src', './images/ga.png')
        card.setAttribute('class', 'cardContent')
        cardBorder.appendChild(card)


        //onClick even on the card, the card should flip to display the 2nd face of the card
    
}





//Duplicate the cardImages array to create pairs of each image

//randomize the positions of the cards


//Loop through the randomized array + assign each image to a card element on the grid

//Add an event listener to each card for when it’s clicked

//When a card is clicked, flip the card (show the image)

//If firstCard is not set, set it to the clicked card

//If firstCard is set, set secondCard to the clicked card

//Compare firstCard and secondCard

//If they match: Keep them flipped.

//If they don’t match: flip both cards back down

//Keep score based on the number of moves or time taken

//After every successful match, check if all pairs have been found.

//If all pairs are matched, display a successful message


//function that randomize the array and resets the game.
//Reset all variables 
//or a cancel this function and navigate to the next level




//functions


//event listners

