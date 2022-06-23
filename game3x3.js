////////////////////////////////////////////////////////////////
// 3x3 GRID FUNCTIONS
////////////////////////////////////////////////////////////////

////////////////////////////////////////////
// Game functionality
////////////////////////////////////////////
// Sets up the game, changes the grid

const cleanBoard = () => {
    if (boardSize === 3) {
        let board3 = document.querySelector(".board-3x3")
        board3.remove()
    } else if (boardSize === 5) {
        let board5 = document.querySelector(".board-5x5")
        board5.remove()
    }
}

const setupBoard3 = () => {
    turnSetter(turn)
    scoreSetter()
    boardSize = 3
    let middlePanel = document.querySelector(".middle-panel")
    let rightPanel = document.querySelector(".right")
    let board = document.createElement("div")
    board.classList.add("board-3x3")
    for (i = 0; i < (boardSize * boardSize); i++) {
        let cell = document.createElement("div")
        cell.setAttribute("id", "cell")
        board.appendChild(cell)
    }
    middlePanel.insertBefore(board, rightPanel)
    cellsArr = document.querySelectorAll("#cell")
    cellsArr.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            scribbleSound1.play()
            placeCell(index)
        })
    })
}

// Creates variable as an array with 3 nested arrays for each row and sets it to the board size of 3
let boardArr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

// Function to check if PVP or PVE
const pvpCheck = () => {
    if (pvp === false && matchOver === false) {
       computerMove()  
    }
}

// Function for changing the turnIndicator div in the html to the current player's value.
const turnSetter = (currentTurn) => {
    if (currentTurn === 1) {
        turnIndicator.classList.remove("cellO")
        turnIndicator.classList.add("cellX")
    } else if (currentTurn === -1) {
        turnIndicator.classList.remove("cellX")
        turnIndicator.classList.add("cellO")
        pvpCheck()
    }
}

// Sets the innerText for the scoreBoard variables to their current score
const scoreSetter = () => {
    score1.innerText = `${player1.name}: ${player1.score}`
    score2.innerText = `${player2.name}: ${player2.score}`
}

// Random number generator that takes a parameter to set max number
const randomNumberGen = (max) => {
    let ranNum = Math.floor(Math.random() * max)
    return ranNum
}

// Function to populate filteredArr with free spaces from cells arr
const filterArray = () => {
    filteredArr = []
    // Iterate over cellsArr
    for (let i = 0; i < cellsArr.length; i++) {
        if (cellsArr[i].className !== "cellX" && cellsArr[i].className !== "cellO") {
            filteredArr.push(i)
        }
    }
}

// Function for computer to select a random index from filteredArr
const computerMove = () => {
    filterArray()
    let compChoice = filteredArr[randomNumberGen(filteredArr.length)]
    if (boardSize === 3) {placeCell(compChoice)}
    if (boardSize === 5) {placeCell5(compChoice)}
}

// Function for placing cells, input parameter is the grid index from the eventListener
const placeCell = (index) => {
    let col = index % 3
    let row = (index - col) / 3
    if (boardArr[row][col] === 0 && matchOver === false) {
        boardArr[row][col] = turn
        drawCells()
        checkWin()
        turn *= -1
        turnSetter(turn)
        // scribbleSound1.play()
    } else if (matchOver === true) {
        console.log("Match is over!");
    } else {
    (console.log("Cell is taken already!"))
    }
}

// Function to populate grid with Xs and Os in css from boardArr
const drawCells = () => {
    for (let row = 0; row < boardArr.length; row++) {
        for (let col = 0; col < boardArr[row].length; col++) {
            // Check if player 1 (1)
            if (boardArr[row][col] === 1) {
                cellsArr[((row * 3) + col)].classList.add("cellX")
            // Else, check if player 2 (-1)
            } else if (boardArr[row][col] === -1) {
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
    let winner = 0
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
    return winner
}

// Function that checks if the sum of any columns is 3 or -3
// If 3 then returns 1 as the winner, if -3 returns -1 as the winner, otherwise returns 0 (no win)
const vertCheck = () => {
    let winner = 0
    let colTotal = 0
    // Iterates through the grid, adding all of the cells in a column together
    for(let i = 0; i < 3; i++) {
        colTotal = boardArr[0][i] + boardArr[1][i] + boardArr[2][i]
        // Checks to see if the value of that column is 3
        if (colTotal === 3) {
            winner = 1
            return winner
        // Else, it checks if the value of the column is -3
        } else if (colTotal === -3) {
            winner = -1
            return winner 
        } 
    }
    return winner
}

// Function to check if 3 cells diagonally (left to right / right to left) are the same value
const diagCheck = () => {
    let winner = 0
    let diagTotal1 = boardArr[0][0] + boardArr[1][1] + boardArr[2][2]
    let diagTotal2 = boardArr[2][0] + boardArr[1][1] + boardArr[0][2]
    // Checks if the first OR second variable is 3
    if (diagTotal1 === 3 || diagTotal2 === 3) {
        winner = 1
        return winner
    // Else, it checks if the first OR second variable is -3
    } else if (diagTotal1 === -3 || diagTotal2 === -3) {
        winner = -1
        return winner
    } else {
        return winner
    }
}

// Function to check if there is a draw (no empty cells left) and returns either true or false
const drawCheck = () => {
    let isDraw = true
    // Iterates through all the cells on each row and column
    for (let row = 0; row < boardArr.length; row++) {
        for (let col = 0; col < boardArr[row].length; col++) {
            // Checks if there are any cells containing 0
            if (boardArr[row][col] === 0) {
                isDraw = false
            }
        }
    }
    return isDraw
}

// Function that checks if any of the above conditions have been met and passes the output to finishMatch to stop play.
const checkWin = () => {
    // If there is a value of 1 for any of the above checks it means Player 1 is the winner
    if (vertCheck() === 1 || horiCheck() === 1 || diagCheck() === 1) {
        finishMatch(1)
    // Of theres is a value of -1 for any of the above checks it means Player 2 is the winner
    } else if (vertCheck() === -1 || horiCheck() === -1 || diagCheck() === -1) {
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
    let outcome = ""
    // If the outcome is 1, set Player 1 as the winner.
    if (result === 1) {
        outcome = `${player1.name} is the winner!`
        player1.setWinner(true)
        player1.score++
        matchOver = true
        ahhSound1.play()
    // Else, if the outcome of -1, set Player 2 as the winner
    } else if (result === -1) {
        outcome = `${player2.name} is the winner!`
        player2.setWinner(true)
        player2.score++
        matchOver = true
        ahhSound2.play()
    // Else, if there is a draw
    } else if (result === 0) {
        outcome = `The match was a draw!`
        matchOver = true
        hmmSound.play()
    }
    // Calls the displayResult function and passes the outcome variable as a parameter.
    displayResult(outcome)
    nextMatchVisible()
}

// Function to add the outcome from finishMatch to the h3 text under the board.
const displayResult = (outcome) => {
    matchResults.innerText = outcome
}

// Makes nextmatchButton visible and adds eventListener
const nextMatchVisible = () => {
    nextMatchBtn = document.createElement("button")
    bottomRightDiv = document.querySelector(".bottom-right")
    nextMatchBtn.innerText = "Next Match"
    nextMatchBtn.classList.add("nextmatch-button")
    bottomRightDiv.appendChild(nextMatchBtn)
    nextMatchBtn.addEventListener("click", ()=>{nextMatch()})
    nextMatchBtn.style.fontFamily = "'Gloria Hallelujah', cursive;"
}

// Makes next match button invisible
const nextMatchRemove = () => {
    bottomRightDiv = document.querySelector(".bottom-right")
    if (bottomRightDiv.hasChildNodes()) {
        nextMatchBtn = document.querySelector(".nextmatch-button")
        bottomRightDiv.removeChild(nextMatchBtn)
    }
}

// Function to restart game if restart button is clicked
const restartGame = () => {
    console.log("Restart clicked");
    if (boardSize === 3) {
        boardArr = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
    ]
    } else if (boardSize === 5) {
        boardArr5 = [
            [0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0,],
        ]
    }
    cellsArr.forEach(cell => {
        cell.classList.remove("cellX")
        cell.classList.remove("cellO")
    })
    matchOver = false
    player1.score = 0
    player2.score = 0
    turn = 1
    turnSetter(turn)
    matchResults.innerText = ""
    scoreSetter()
    nextMatchRemove()

}

// Function to restart game if restart button is clicked
const nextMatch = () => {
    if (boardSize === 3) {
        boardArr = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    } else if (boardSize === 5) {
        boardArr5 = [
            [0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0,],
        ]
    }
    cellsArr.forEach(cell => {
        cell.classList.remove("cellX")
        cell.classList.remove("cellO")
    })
    matchOver = false
    turn = 1
    turnSetter(turn)
    matchResults.innerText = ""
    scoreSetter()
    nextMatchRemove()
}

//

