////////////////////////////////////////////
// Setting Global variables / classes
////////////////////////////////////////////
// Creating variables to be used across the global scope

// Player class for user and AI
class Player {
    constructor (name) {
        this.name = name
        this.isTurn = false
        this.isWinner = false
        this.score = 0
    } 

    // Methods to set and get the above
    setName (name) {this.name = name}
    setTurn (turn) {this.turn = turn}
    setWinner (winner) {this.winner = winner}
    setScore (score) {this.score = score}
    getName () {return this.name}
    getTurn () {return this.isTurn}
    getWinner () {return this.isWinner}
    getScore () {return this.score}
    
}

// Instanciating 2 players of the above class, with basic info.
const player1 = new Player ("Player 1")
const player2 = new Player ("Player 2")

// Creates variable to track if game is still running
let matchOver = false;

// Variable to keep track of rounds
const roundNumber = 0

// Variable to keep track of turns (Player 1 = 1, Player 2 = -1)
// Initially set to Player 1's turn
let turn = 1

// Creates variable as an array with 3 nested arrays for each row and sets it to the board size of 3
let boardArr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

// Create array with each cell from .board class
const cellsArr = document.querySelectorAll(".cell")

// Add listener to each individual cell
cellsArr.forEach((cell, index) => {
    // Pass in the individual cell position as well as the index for the array
    cell.addEventListener("click", () => {
        // Calls the placeCell function and passes it the index for the array
        placeCell(index)
    })
})

// Creates variable to track Restart button in HTML
restartButton = document.querySelector(".restart-button")

// Adds listener for restartButton
restartButton.addEventListener("click", () => {restartGame()})

// Creates variable to store the result h3 element under the board
let matchResults = document.querySelector(".match-results")

// Creates variable to store the Score indicator in the HTML
let score1 = document.querySelector(".score1")
let score2 = document.querySelector(".score2")

////////////////////////////////////////////
// Game functionality
////////////////////////////////////////////
// Sets up the game, changes the grid

// Function for changing the turnIndicator div in the html to the current player's value.
const turnSetter = (currentTurn) => {
    if (currentTurn === 1) {
        turnIndicator.classList.remove("cellO")
        turnIndicator.classList.add("cellX")
    } else if (currentTurn === -1) {
        turnIndicator.classList.remove("cellX")
        turnIndicator.classList.add("cellO")
    }
}

// Create variable to store the moveIndicator value
const turnIndicator = document.querySelector(".turn-indicator")
turnSetter(turn)

// Sets the innerText for the scoreBoard variables to their current score
const scoreSetter = () => {
    score1.innerText = `${player1.name}: ${player1.score}`
    score2.innerText = `${player2.name}: ${player2.score}`
}
scoreSetter()

// Random number generator that takes a parameter to set max number
const randomNumberGen = (max) => {
    let ranNum = Math.floor(Math.random() * (max + 1))
    return ranNum
}

// Function that maps available empty spaces to an array and then selects one randomly
const computerMove = () => {
    let compSelection = randomNumberGen(8)
    console.log(boardArr);
    console.log(boardArr[compSelection]);
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {

        }
    }
    // while (boardArr[compSelection] !== 0) {
    //     compSelection = randomNumberGen(8)
    // }

}

// console.log(computerMove())

// Function for placing cells, input parameter is the grid index from the eventListener
const placeCell = (index) => {
    // create variable col to store column number (0-2). Dividing by the width of the grid gives you the col number.
    let col = index % 3
    // create variable row to store row number (0-2)
    let row = (index - col) / 3
    // Check if cell is empty
    if (boardArr[row][col] === 0 && matchOver === false) {
        // Mark that cell with the player code (1 for player / -1 for AI)
        boardArr[row][col] = turn
        // Change turn to other player
        turn *= -1
        turnSetter(turn)
        // Call drawCells function to populate / repopulate HTML grid
        drawCells()
        // Call check function to see if anyone has won
        checkWin()
    // If cell has already been picked (not a default value of 0)
    } else if (matchOver === true) {
        console.log("Match is over!");
    } else {
    (console.log("Cell is taken already!"))
    }
}

// Need to then take the boardArr after each turn and populate the html arena with Xs and Os

// Function to populate grid with Xs and Os in css from boardArr
const drawCells = () => {
    // Iterate over row in boardData array
    for (let row = 0; row < boardArr.length; row++) {
        // Iterate over columns in boardData array
        for (let col = 0; col < boardArr[row].length; col++) {
            // Check if player 1 (1)
            if (boardArr[row][col] === 1) {
                // Add cell class of cellX
                cellsArr[((row * 3) + col)].classList.add("cellX")
            // Else, check if player 2 (-1)
            } else if (boardArr[row][col] === -1) {
                // Add cell class of cellO
                cellsArr[((row * 3) + col)].classList.add("cellO")
            }
        }
    }
}

////////////////////////////////////////////
// Win / Draw checking
////////////////////////////////////////////
// Checks for win / draw situations and outputs the result

// Function that checks if there are 3 cells in a row with the same value (3 or -3)
// If 3 then returns 1 as the winner, if -3 returns -1 as the winner, otherwise returns 0 (no win)
const horiCheck = () => {
    // Creates a variable that will be the return value, as a default it is set to 0 (no win)
    let winner = 0
    // Creates a variable to store the sum of the rows and sets to 0
    let rowTotal = 0
    // Iterates through all the rows in the grid, adding the cells in a row together
    for(let i = 0; i < 3; i++) {
        rowTotal = boardArr[i][0] + boardArr[i][1] + boardArr[i][2]
        // Then checks if that value is 3, if so it sets the winner as Player 1 (1) and returns that value
        if (rowTotal === 3) {
            winner = 1
            return winner
        // Else, it checks to see if the value is -3, if so it sets the winner as Player 2(-1) and returns that value
        } else if (rowTotal === -3) {
            winner = -1
            return winner 
        } 
    }
    // If none of the above have been met, it returns the default value of 0 (no win)
    return winner
}

// Function that checks if the sum of any columns is 3 or -3
// If 3 then returns 1 as the winner, if -3 returns -1 as the winner, otherwise returns 0 (no win)
const vertCheck = () => {
    // Creates a variable that will be returns, and sets a default value of 0 (no win)
    let winner = 0
    // Creates a variable to store the sum of the columns and sets to 0
    let colTotal = 0
    // Iterates through the grid, adding all of the cells in a column together
    for(let i = 0; i < 3; i++) {
        colTotal = boardArr[0][i] + boardArr[1][i] + boardArr[2][i]
        // Checks to see if the value of that column is 3
        if (colTotal === 3) {
            // if so it sets the winner as Player 1 (1)
            winner = 1
            // and returns that value
            return winner
        // Else, it checks if the value of the column is -3
        } else if (colTotal === -3) {
            // if so it sets the winner as Player 2 (-1)
            winner = -1
            // and returns that value
            return winner 
        } 
    }
    // If none of the above have been met, it returns a 0 (no win)
    return winner
}

// Function to check if 3 cells diagonally (left to right / right to left) are the same value
const diagCheck = () => {
    // Creates a variable to store the winner and sets it to a default of no win (0)
    let winner = 0
    // Creates a variable to store the sum of all the cells top left to bottom right, diagonally.
    let diagTotal1 = boardArr[0][0] + boardArr[1][1] + boardArr[2][2]
    // Creates a variable to store the sum of all the cells bottom left to top right, diagonally
    let diagTotal2 = boardArr[2][0] + boardArr[1][1] + boardArr[0][2]
    // Checks if the first OR second variable is 3
    if (diagTotal1 === 3 || diagTotal2 === 3) {
        // If so, it sets the winner as Player 1 (1),
        winner = 1
        // and returns that value.
        return winner
    // Else, it checks if the first OR second variable is -3
    } else if (diagTotal1 === -3 || diagTotal2 === -3) {
        // If so, it sets the winner as Player 2 (-1),
        winner = -1
        // and returns that value.
        return winner
    // If neither of the above are valid
    } else {
        // the default value of no win (0) is returned
        return winner
    }
}

// Function to check if there is a draw (no empty cells left) and returns either true or false
const drawCheck = () => {
    // Creates a boolean variable to store the output
    let isDraw = true
    // Iterates through all the cells on each row and column
    for (let row = 0; row < boardArr.length; row++) {
        for (let col = 0; col < boardArr[row].length; col++) {
            // Checks if there are any cells containing 0
            if (boardArr[row][col] === 0) {
                // If so, it sets the isDraw to false
                isDraw = false
            }
        }
    }
    // Returns the isDraw value, if no 0s have been found then it remains true.
    return isDraw
}

// Function that checks if any of the above conditions have been met and passes the output to finishMatch to stop play.
const checkWin = () => {
    // If there is a value of 1 for any of the above checks it means Player 1 is the winner
    if (vertCheck() === 1 || horiCheck() === 1 || diagCheck() === 1) {
        // Sends the result to finishMatch with the parameter of the winner
        finishMatch(1)
    // Of theres is a value of -1 for any of the above checks it means Player 2 is the winner
    } else if (vertCheck() === -1 || horiCheck() === -1 || diagCheck() === -1) {
        // Send the result as a parameter to finishMatch
        finishMatch(-1)
    // If the result is a draw (0) it sends that as a parameter to the finishMatch callback
    } else if (drawCheck() == true) {
        finishMatch(0)
    }
}

////////////////////////////////////////////
// RESULTS
// Checking if match has an outcome and displaying result
////////////////////////////////////////////
// Receives a paramater from the above checkWin function and if there is an outcome it finishes the match.

const finishMatch = (result) => {
    // Creates a variable to store the winner
    let outcome = ""
    if (result === 1) {
        // Stores a string declaring player 1 the winner
        outcome = `${player1.name} is the winner!`
        // Set the player 1's winner' value to true
        player1.setWinner(true)
        // Increment the player.score value by one
        player1.score++
        // Sets the matchOver value to true, so no more moves can be played
        matchOver = true
    // Else, if the outcome of
    } else if (result === -1) {
        // Stores a string declaring player 2 the winner
        outcome = `${player2.name} is the winner!`
        // Sets player 2's winner value to true
        player2.setWinner(true)
        // Increment's player 2's score by 1
        player2.score++
        // Sets the matchOver value to 1 so no more moves can be played.
        matchOver = true
    // Else, if there is a draw
    } else if (result === 0) {
        // Store that outcome in the variable
        outcome = `The match was a draw!`
        // Set matchOver to true so no more moves can be played
        matchOver = true
    }
    // Calls the displayResult function and passes the outcome variable as a parameter.
    displayResult(outcome)
}

// Function to add the outcome from finishMatch to the h3 text under the board.
const displayResult = (outcome) => {
    // Adding the outcome variable to the h3 element under the board.
    matchResults.innerText = outcome
}

// Function to restart game if restart button is clicked
const restartGame = () => {
    console.log("Restart clicked");
    // Clears the data array and resets to zero
    boardArr = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    // Resets the css elements so the board is clear
    cellsArr.forEach(cell => {
        cell.classList.remove("cellX")
        cell.classList.remove("cellO")
    })
    // Resets matchover to false, allowing play to restart
    matchOver = false
    // Returns the turn tracker to 1, allowing Player 1 to make the first move
    turn = 1
    // Resets the turnIndicator to default
    turnSetter(turn)
    // Resets the results h3 to empty
    matchResults.innerText = ""
    // Runs the scoreSetter function to update player scores
    scoreSetter()
}

//

