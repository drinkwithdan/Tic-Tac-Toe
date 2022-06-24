////////////////////////////////////////////////////////////////
// 5x5 GRID FUNCTIONS
////////////////////////////////////////////////////////////////

// Function sets up board with cells and css styling

const game5x5 = () => {
    turnSetter(turn)
    scoreSetter()
}

let boardArr5 = [
    [0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0,],
]


const setupBoard5 = () => {
    turnSetter(turn)
    scoreSetter()
    boardSize = 5
    let middlePanel = document.querySelector(".middle-panel")
    let rightPanel = document.querySelector(".right")
    let board = document.createElement("div")
    board.classList.add("board-5x5")
    for (i = 0; i < (boardSize * boardSize); i++) {
        let cell = document.createElement("div")
        cell.setAttribute("id", "cell")
        board.appendChild(cell)
    }
    middlePanel.insertBefore(board, rightPanel)
    cellsArr = document.querySelectorAll("#cell")
    cellsArr.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            // scribbleSound1.play()
            placeCell5(index)
        })
    })
}

// Function for placing cells, input parameter is the grid index from the eventListener
const placeCell5 = (index) => {
    let col = index % 5
    let row = (index - col) / 5
    if (boardArr5[row][col] === 0 && matchOver === false) {
        boardArr5[row][col] = turn
        scribbleSound1.play()
        drawCells5()
        checkWin5()
        turn *= -1
        turnSetter(turn)
    } else if (matchOver === true) {
        // console.log("Match is over!");
    } else {
    nopeSound.play()
    }
}

// Function to populate grid with Xs and Os in css from boardArr
const drawCells5 = () => {
    for (let row = 0; row < boardArr5.length; row++) {
        for (let col = 0; col < boardArr5[row].length; col++) {
            // Check if player 1 (1)
            if (boardArr5[row][col] === 1) {
                cellsArr[((row * 5) + col)].classList.add("cellX")
            // Else, check if player 2 (-1)
            } else if (boardArr5[row][col] === -1) {
                cellsArr[((row * 5) + col)].classList.add("cellO")
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
const horiCheck5 = () => {
    let winner = 0
    let rowTotal = 0
    // Iterates through all the rows in the grid, adding the cells in a row together
    for(let i = 0; i < 5; i++) {
        rowTotal = boardArr5[i][0] + boardArr5[i][1] + boardArr5[i][2] + boardArr5[i][3] + boardArr5[i][4]
        // Then checks if that value is 3, if so it sets the winner as Player 1 (1) and returns that value
        if (rowTotal === 5) {
            winner = 1
            return winner
        // Else, it checks to see if the value is -3, if so it sets the winner as Player 2(-1) and returns that value
        } else if (rowTotal === -5) {
            winner = -1
            return winner 
        } 
    }
    return winner
}

// Function that checks if the sum of any columns is 3 or -3
// If 3 then returns 1 as the winner, if -3 returns -1 as the winner, otherwise returns 0 (no win)
const vertCheck5 = () => {
    let winner = 0
    let colTotal = 0
    // Iterates through the grid, adding all of the cells in a column together
    for(let i = 0; i < 5; i++) {
        colTotal = boardArr5[0][i] + boardArr5[1][i] + boardArr5[2][i]+ boardArr5[3][i]+ boardArr5[4][i]
        // Checks to see if the value of that column is 3
        if (colTotal === 5) {
            winner = 1
            return winner
        // Else, it checks if the value of the column is -3
        } else if (colTotal === -5) {
            winner = -1
            return winner 
        } 
    }
    return winner
}

// Function to check if 3 cells diagonally (left to right / right to left) are the same value
const diagCheck5 = () => {
    let winner = 0
    let diagTotal1 = boardArr5[0][0] + boardArr5[1][1] + boardArr5[2][2] + boardArr5[3][3] + boardArr5[4][4]
    let diagTotal2 = boardArr5[4][0] + boardArr5[3][1] + boardArr5[2][2] + boardArr5[1][3] + boardArr5[0][4]
    // Checks if the first OR second variable is 3
    if (diagTotal1 === 5 || diagTotal2 === 5) {
        winner = 1
        return winner
    // Else, it checks if the first OR second variable is -3
    } else if (diagTotal1 === -5 || diagTotal2 === -5) {
        winner = -1
        return winner
    } else {
        return winner
    }
}

// Function to check if there is a draw (no empty cells left) and returns either true or false
const drawCheck5 = () => {
    let isDraw = true
    // Iterates through all the cells on each row and column
    for (let row = 0; row < boardArr5.length; row++) {
        for (let col = 0; col < boardArr5[row].length; col++) {
            // Checks if there are any cells containing 0
            if (boardArr5[row][col] === 0) {
                isDraw = false
            }
        }
    }
    return isDraw
}

// Function that checks if any of the above conditions have been met and passes the output to finishMatch to stop play.
const checkWin5 = () => {
    // If there is a value of 1 for any of the above checks it means Player 1 is the winner
    if (vertCheck5() === 1 || horiCheck5() === 1 || diagCheck5() === 1) {
        finishMatch(1)
    // Of theres is a value of -1 for any of the above checks it means Player 2 is the winner
    } else if (vertCheck5() === -1 || horiCheck5() === -1 || diagCheck5() === -1) {
        finishMatch(-1)
    // If the result is a draw (0) it sends that as a parameter to the finishMatch callback
    } else if (drawCheck5() == true) {
        finishMatch(0)
    }
}


